import { render, setContext, setRoot } from "../../_lib/core/stateManager/rendering.js";
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

setContext(app());
setRoot(document.body)

render();