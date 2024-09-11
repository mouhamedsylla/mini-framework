//import { mountDOM, h, hString } from "../src/core/dom/vdom.js";

// const text = hString('Hello World!')
// const vdom = h('div', {}, [
//     "Hello World!",
//     text,
//     h('p', {}, [
//         hString('This is a paragraph.'),
//         h('br', {}, []),
//         hString('This is another paragraph.'),
//     ]),
// ])

// mountDOM(vdom, document.getElementById('app'))

// console.log(vdom.el)

// setTimeout(() => {
//     const div2 = document.getElementById('app2')
//     vdom.el = div2
//     mountDOM(vdom, div2)
// }, 3000)

const div = document.getElementById('app')

div["onclick"] = () => {
    console.log('clicked')
}

div["onchange"] = () => {
    console.log('changed')
}

div.setAttribute('myAttr', 'myValue')

div.style['backgroundColor'] = 'green'

