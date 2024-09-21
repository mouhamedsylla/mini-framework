export function extractPropsAndEvents(vdom) {
    const { on: events = {}, ...props } = vdom.props
    delete props.key
  
    return { props, events }
  }

export function addEventListeners(listeners = {}, el) {
    const addedListeners = {}

    Object.entries(listeners).forEach(([eventName, handler]) => {
      const listener = addEventListener(eventName, handler, el)
      addedListeners[eventName] = listener
    })
  
    return addedListeners
}

export function addEventListener(eventName, handler, el) {
    function boundHandler() {
        handler(...arguments)
    }
    el.addEventListener(eventName, boundHandler)
    return boundHandler
}

export function removeEventListeners(listeners = {}, el) {
    Object.entries(listeners).forEach(([eventName, handler]) => {
      el.removeEventListener(eventName, handler)
    })
}

