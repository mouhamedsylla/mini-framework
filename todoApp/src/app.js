import { vdom } from "../../_lib/core/runtime/runtime.js";
import { globalRoot, render, setContext, setRoot } from "../../_lib/core/stateManager/rendering.js";
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
    <mini>

        <section className="todoapp" id="root">
            {context.Header()}
        </section>
        
        {context.Footer()}

    </mini>
    `
    return context;
}

setContext(app());
setRoot(document.body)

render();
mountDOM(vdom, globalRoot)