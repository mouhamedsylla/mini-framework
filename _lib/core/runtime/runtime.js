import Compiler from '../compiler/compile-mini.js';
import { EvalJS } from './evalJS.js';
import { mountDOM } from '../vdom/vdom.js';

const compiler = new Compiler()

function run(context, component, root) {
    const evalutedCode = EvalJS(component, context)
    compiler.setCode(evalutedCode)
    compiler.setContext(context)
    const vdom = compiler.compile()
    console.log(vdom)
    mountDOM(vdom, root)
}

export { run }