import { run, vdom } from "../../_lib/core/runtime/runtime.js";
import { mountDOM } from "../../_lib/core/vdom/vdom.js";
import footer from "./components/footer.js";
import header from "./components/header.js";

const app = () => {

    const context = {
        App: () => component,
        ...header(),
        ...footer(),
    }
    const component = 
    `
    <div id="app">

        <section className="todoapp" id="root">
            {context.Header()}
        </section>
        
        {context.Footer()}

    </div>
    `
    return context;
}

const context = app();

run(
    context,
    context.App(),
)

mountDOM(vdom, document.body)

function render() {
    const oldVDOM = Object.assign({}, vdom)

    run(
        context,
        context.App(),
    )

    

}