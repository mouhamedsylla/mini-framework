import Compiler from '../compiler/compile-mini.js';
import { EvalJS } from './evalJS.js';
import { mountDOM } from '../vdom/vdom.js';

const compiler = new Compiler()
let vdom = null

function run(context, component, root) {
    const evalutedCode = EvalJS(component, context)
    compiler.setCode(evalutedCode)
    compiler.setContext(context)
    vdom = compiler.compile()
    mountDOM(vdom, root)
}

export { run, vdom }