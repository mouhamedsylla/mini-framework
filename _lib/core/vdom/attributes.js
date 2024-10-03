export function setAttributes(el, attrs) {
    const {className, style, ...rest} = attrs

    for (const [name, value] of Object.entries(rest)) {
        setAttribute(el, name, value)
    }

    if (className) {
        setClass(el, className)
    }

    if (style) {
        const allStyles = style.split(';').map(s => s.trim())
        console.log(allStyles)
        allStyles.forEach(style => {
            const [name, value] = style.split(':').map(s => s.trim())
            setStyle(el, name, value)
        })
    }
}


export function setAttribute(el, name, value) {
    if (value == null) {
        removeAttribute(el, name)
    } else if (name.startsWith('data-')) {
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
    console.log("SET STYLE", el, name, value)
    el.style[name] = value
}

export function removeStyle(el, name) {
    el.style[name] = null
}