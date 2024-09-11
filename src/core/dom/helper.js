import { hString } from './vdom.js'

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
}


export function mapTextNodes(children) {
    return children
    .filter(item => item != null)
    .map(child => {
        if (typeof child === 'string' ||
            typeof child === 'number' ||
            typeof child === 'boolean'
        ) {
            return hString(child)
        }
        return child
    })
}

export function setAttributes(el, attrs) {
    const {className, style, ...rest} = attrs

    for (const [name, value] of Object.entries(rest)) {
        setAttribute(el, name, value)
    }

    if (className) {
        setClass(el, className)
    }

    if (style) {
        Object.entries(style).forEach(([name, value]) => {
            setStyle(el, name, value)
        })
    }
}

export function setAttribute(el, name, value) {
    if (value == null) {
        removeAttribute(el, name)
    } else if (name.startWith('data-')) {
        el.setAttribute(name, value)
    } else {
        el[name] = value
    }
}

export function removeAttribute(el, name) {
    el[name] = null
    el.removeAttribute(name)
}

function setClass(el, className) {
    el.className =''

    if (typeof className === 'string') {
        el.className = className
    }

    if (Array.isArray(className)) {
        el.className = className.join(' ')
    }
}

export function setStyle(el, name, value) {
    el.style[name] = value
}