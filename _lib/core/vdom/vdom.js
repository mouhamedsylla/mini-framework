import {
    DOM_TYPES,
    mapTextNodes,
    setAttributes,
    addEventListeners,
    extractPropsAndEvents,
    removeEventListeners,
} from './helper.js'

// create an virtual element
export function h(tag, props = {}, children = []) {
    return {
        tag,
        props,
        children: mapTextNodes(children),
        type: DOM_TYPES.ELEMENT,
    }
}

// create an virtual text node
export function hString(str) {
    return {
        value: String(str),
        type: DOM_TYPES.TEXT,
    }
}


function createTextNode(vdom, parentEl) {
    const { value } = vdom

    const textNode = document.createTextNode(value)
    vdom.el = textNode
    parentEl.appendChild(textNode)
}

export function createElementNode(vdom, parentEl) {
    const { tag, children } = vdom
    var toMount 
    if (tag !== "mini") {
        const element = document.createElement(tag)
        addProps(element, vdom)
        vdom.el = element
        toMount = element
    } else {
        toMount = parentEl
    }

    children.forEach(child => mountDOM(child, toMount))
    parentEl !== toMount && parentEl.appendChild(toMount)
}



function removeTextNode(vdom) {
    const { el } = vdom
    if (!el) { return }
    el.remove()
}

function removeElementNode(vdom) {
    const { el, children, listeners } = vdom
    children.forEach(unmountDOM)
    if (!el) { return }
    el.remove()

    if (listeners) {
        removeEventListeners(listeners, el)
        delete vdom.listeners
    }
}

function addProps(el, vdom) {
    const { props: attrs, events } = extractPropsAndEvents(vdom)
    vdom.listeners = addEventListeners(events, el)
    setAttributes(el, attrs)
}

// mounting a virtual node to a real node
export function mountDOM(vdom, parentEl) {
    switch (vdom.type) {
        case DOM_TYPES.TEXT:
            createTextNode(vdom, parentEl)
            break
        case DOM_TYPES.ELEMENT:
            createElementNode(vdom, parentEl)
            break
        default:
            console.error('Unknown vdom type:', vdom.type)
    }
}

export function unmountDOM(vdom) {
    const { type } = vdom

    switch (type) {
        case DOM_TYPES.TEXT: {
            removeTextNode(vdom)
            break
        }

        case DOM_TYPES.ELEMENT: {
            removeElementNode(vdom)
            break
        }

        default: {
            console.error('Unknown vdom type:', type)
        }
    }
}

