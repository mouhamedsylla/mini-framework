import { run } from "../../_lib/core/runtime/runtime.js";
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
    document.body
)