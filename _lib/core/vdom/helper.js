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

export function extractChildren(vdom) {
  if (vdom.children == null) {
    return []
  }

  const children = []

  for (const child of vdom.children) {
    if (child.type === DOM_TYPES.FRAGMENT) {
      children.push(...extractChildren(child, children))
    } else {
      children.push(child)
    }
  }

  return children
}

function isNotEmptyString(str) {
    return str !== ''
}
  
function isNotBlankOrEmptyString(str) {
    return isNotEmptyString(str.trim())
}

export function arraysDiff(oldArray, newArray) {
    return {
      added: newArray.filter((newItem) => !oldArray.includes(newItem)),
      removed: oldArray.filter((oldItem) => !newArray.includes(oldItem)),
    }
  }
  

export function areNodeEqual(node1, node2) {
    if (node1.type !== node2.type) {
        return false
    }
    const { tag: tag1, props: { key: key1 } = {} } = node1
    const { tag: tag2, props: { key: key2 } = {} } = node2
    return tag1 === tag2 && key1 === key2
}


export function objectDiff(oldObj, newObj) {
  const oldKeys = Object.keys(oldObj)
  const newKeys = Object.keys(newObj)

  return {
    added: newKeys.filter((key) => !(key in oldObj)),
    removed: oldKeys.filter((key) => !(key in newObj)),
    updated: newKeys.filter(
      (key) => key in oldObj && oldObj[key] !== newObj[key]
    ),
  }
}

export function toClassList(classes = '') {
    return Array.isArray(classes)
      ? classes.filter(isNotBlankOrEmptyString)
      : classes.split(/(\s+)/).filter(isNotBlankOrEmptyString)
}

export function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new Error(message)
  }
}

export const ARRAY_DIFF_OP = {
    ADD: 'add',
    REMOVE: 'remove',
    MOVE: 'move',
    NOOP: 'noop',
  }

export function arraysDiffSequence(
    oldArray,
    newArray,
    equalsFn = (a, b) => a === b
  ) {
    const sequence = []
    const array = new ArrayWithOriginalIndices(oldArray, equalsFn)
  
    for (let index = 0; index < newArray.length; index++) {
      if (array.isRemoval(index, newArray)) {
        sequence.push(array.removeItem(index))
        index--
        continue
      }
  
      if (array.isNoop(index, newArray)) {
        sequence.push(array.noopItem(index))
        continue
      }
  
      const item = newArray[index]
  
      if (array.isAddition(item, index)) {
        sequence.push(array.addItem(item, index))
        continue
      }
  
      sequence.push(array.moveItem(item, index))
    }
  
    sequence.push(...array.removeItemsAfter(newArray.length))
  
    return sequence
  }

  class ArrayWithOriginalIndices {
    #array = []
    #originalIndices = []
    #equalsFn
  
 
    constructor(array, equalsFn) {
      this.#array = [...array]
      this.#originalIndices = array.map((_, i) => i)
      this.#equalsFn = equalsFn
    }
  

    get length() {
      return this.#array.length
    }
  

    originalIndexAt(index) {
      return this.#originalIndices[index]
    }
  

    findIndexFrom(item, fromIndex) {
      for (let i = fromIndex; i < this.length; i++) {
        if (this.#equalsFn(item, this.#array[i])) {
          return i
        }
      }
  
      return -1
    }

    isRemoval(index, newArray) {
      // If the index is beyond the length of the array, it can't be a removal.
      if (index >= this.length) {
        return false
      }
  
      const item = this.#array[index]
      const indexInNewArray = newArray.findIndex((newItem) =>
        this.#equalsFn(item, newItem)
      )
  
      return indexInNewArray === -1
    }
  
    removeItem(index) {
      const operation = {
        op: ARRAY_DIFF_OP.REMOVE,
        index,
        item: this.#array[index],
      }
  
      this.#array.splice(index, 1)
      this.#originalIndices.splice(index, 1)
  
      return operation
    }

    isNoop(index, newArray) {
      // If the index is beyond the length of the array, it can't be a noop.
      if (index >= this.length) {
        return false
      }
  
      const item = this.#array[index]
      const newItem = newArray[index]
  
      return this.#equalsFn(item, newItem)
    }
  
    noopItem(index) {
      return {
        op: ARRAY_DIFF_OP.NOOP,
        index,
        originalIndex: this.originalIndexAt(index),
        item: this.#array[index],
      }
    }
  

    isAddition(item, fromIdx) {
      return this.findIndexFrom(item, fromIdx) === -1
    }

    addItem(item, index) {
      const operation = {
        op: ARRAY_DIFF_OP.ADD,
        index,
        item,
      }
  
      this.#array.splice(index, 0, item)
      this.#originalIndices.splice(index, 0, -1)
  
      return operation
    }
  
    moveItem(item, toIndex) {
      const fromIndex = this.findIndexFrom(item, toIndex)
  
      const operation = {
        op: ARRAY_DIFF_OP.MOVE,
        originalIndex: this.originalIndexAt(fromIndex),
        from: fromIndex,
        index: toIndex,
        item: this.#array[fromIndex],
      }
  
      const [_item] = this.#array.splice(fromIndex, 1)
      this.#array.splice(toIndex, 0, _item)
  
      const [originalIndex] = this.#originalIndices.splice(fromIndex, 1)
      this.#originalIndices.splice(toIndex, 0, originalIndex)
  
      return operation
    }
  

    removeItemsAfter(index) {
      const operations = []
  
      while (this.length > index) {
        operations.push(this.removeItem(index))
      }
  
      return operations
    }
  }