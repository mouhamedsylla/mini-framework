import { DOM_TYPES, mapTextNodes, setAttributes } from './helper.js'

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

function createElementNode(vdom, parentEl) {
    const { tag, children } = vdom

    const element = document.createElement(tag)
    addProps(element, vdom)
    vdom.el = element

    children.forEach(child => mountDOM(child, element))
    parentEl.appendChild(element)           
}

function addProps(el, vdom) {
    //const { ...props } = vdom.props
    setAttributes(el, vdom.props)
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