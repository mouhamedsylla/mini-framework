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
    <section className="todoapp" id="root">
        {context.Header()}
    </section>
    
    {context.Footer()}
    `
    return context;
}

const context = app();

run(
    context,
    context.App(),
    document.getElementById('app')
)