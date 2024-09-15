import { run } from "../../_lib/core/runtime/runtime.js";
import header from "./components/header.js";

const app = () => {
    const context = {
        App: () => component,
        ...header()
    }
    const component = 
    `
    <div className="d-flex flex-column align-items-center justify-content-center">
        <h1>Todo App</h1>
        {context.Header()}
    </div>
    `

    return context;
}

const root = document.getElementById('app')
const context = app()
const component = context.App()

run(context, component, root)