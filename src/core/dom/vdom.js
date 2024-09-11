import { DOM_TYPES, mapTextNodes } from './helper.js'

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

// create an virtual fragment
export function hFragment(children) {
    return {
        children: mapTextNodes(children),
        type: DOM_TYPES.FRAGMENT,
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
    vdom.el = element

    children.forEach(child => mountDOM(child, element))
    parentEl.appendChild(element)           
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