import Compiler from '../compiler/compile-mini.js';
import { EvalJS } from './evalJS.js';

const compiler = new Compiler()
let vdom = null

function run(context, component) {
    const evalutedCode = EvalJS(component, context)
    compiler.setCode(evalutedCode)
    compiler.setContext(context)
    vdom = compiler.compile()
}

export { run, vdom }