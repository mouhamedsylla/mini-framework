import { areNodeEqual, objectDiff, toClassList, arraysDiffSequence, ARRAY_DIFF_OP, arraysDiff, DOM_TYPES, extractChildren } from "./helper.js"
import { setAttribute, removeAttribute, setStyle, removeStyle } from "./attributes.js"
import { mountDOM, unmountDOM } from "./vdom.js"

export function updateDOM(oldvDom, newvDom, parentEl) {
    if (!areNodeEqual(oldvDom, newvDom)) {
        unmountDOM(oldvDom)
        mountDOM(newvDom, parentEl)
        return
    }
    newvDom.el = oldvDom.el
    
    switch (newvDom.type) {
        case DOM_TYPES.ELEMENT:
            updateElementNode(oldvDom, newvDom)
            break
        case DOM_TYPES.TEXT:
            updateTextNode(oldvDom, newvDom)
            break
    }

    updateChildren(oldvDom, newvDom)
}

function updateElementNode(oldvDom, newvDom) {
    const { class: newClass, style: newStyle, on: newEvents, ...newAttrs } = newvDom.props
    const { class: oldClass, style: oldStyle, on: oldEvents, ...oldAttrs } = oldvDom.props
    const { listeners: oldListeners } = oldvDom
    updateAttributes(oldvDom.el, oldAttrs, newAttrs)
    updateClasses(oldvDom.el, oldClass, newClass)
    updateStyles(oldvDom.el, oldStyle, newStyle)
    newvDom.listeners = updateEvents(oldvDom.el, oldEvents, newEvents, oldListeners)
}

function updateTextNode(oldvDom, newvDom) {
    const el = newvDom.el
    const { value: newtext } = newvDom
    const { value: oldText } = oldvDom
    if (newtext !== oldText) {
        el.nodeValue = newtext
    }
}


function updateClasses(el, oldClass, newClass) {
    const oldClasses = toClassList(oldClass)
    const newClasses = toClassList(newClass)
  
    const { added, removed } = arraysDiff(oldClasses, newClasses)
  
    if (removed.length > 0) {
      el.classList.remove(...removed)
    }
    if (added.length > 0) {
      el.classList.add(...added)
    }
}

function updateStyles(el, oldStyle = {}, newStyle = {}) {
    const { added, removed, updated } = objectDiff(oldStyle, newStyle)

    added.forEach(style => setStyle(el, style, newStyle[style]))
    removed.forEach(style => removeStyle(el, style))
    updated.forEach(style => setStyle(el, style, newStyle[style]))
}

function updateAttributes(el, oldAttrs, newAttrs) {
    const { added, removed, updated } = objectDiff(oldAttrs, newAttrs)

    added.forEach(attr => setAttribute(el, attr, newAttrs[attr]))
    removed.forEach(attr => removeAttribute(el, attr))
    updated.forEach(attr => setAttribute(el, attr, newAttrs[attr]))
}

function updateEvents(el, oldEvents = {}, newEvents = {}, oldListeners = {}) {
    const { added, removed, updated } = objectDiff(oldEvents, newEvents)

    for (const eventName of removed.concat(updated)) {
        el.removeEventListener(eventName, oldListeners[eventName])
      }
    
      const addedListeners = {}
    
      for (const eventName of added.concat(updated)) {
        const listener = addEventListener(eventName, newEvents[eventName], el)
        addedListeners[eventName] = listener
      }
    
      return addedListeners
}

function updateChildren(oldVdom, newVdom) {
    const oldChildren = extractChildren(oldVdom)
    const newChildren = extractChildren(newVdom)
    const parentEl = oldVdom.el
  
    const diffSeq = arraysDiffSequence(
      oldChildren,
      newChildren,
      areNodeEqual
    )
  
    for (const operation of diffSeq) {
      const { originalIndex, index, item } = operation
  
      switch (operation.op) {
        case ARRAY_DIFF_OP.ADD: {
          console.log('adding', item)
          mountDOM(item, parentEl, index)
          break
        }
  
        case ARRAY_DIFF_OP.REMOVE: {
          unmountDOM(item)
          break
        }
  
        case ARRAY_DIFF_OP.MOVE: {
          const oldChild = oldChildren[originalIndex]
          const newChild = newChildren[index]
          const el = oldChild.el
          const elAtTargetIndex = parentEl.childNodes[index]
  
          parentEl.insertBefore(el, elAtTargetIndex)
          updateDOM(oldChild, newChild, parentEl)
  
          break
        }
  
        case ARRAY_DIFF_OP.NOOP: {
          //console.log('noop', item)
          updateDOM(
            oldChildren[originalIndex],
            newChildren[index],
            parentEl,
          )
          break
        }
      }
    }
  }
  