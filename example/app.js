import Domino from "../_lib/core/runtime/runtime.js"
import Router from "../_lib/core/router/router.js"
import Store from "../_lib/core/stateManager/store.js"
import reducer from "./reducer.js"
import header from "../example/components/header.js"
import main from "../example/components/main.js"
import footer from "../example/components/footer.js"



const app = () => {
    const component = `
        <mini> 
            <section className="todoapp" id="root">
                <Header />
                <Main />
                <Footer />
            </section>
            <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>Created by the TodoMVC Team</p>
                <p>Part of<a href="http://todomvc.com">TodoMVC </a></p>
            </footer>
        </mini>
    `

    const context = {
        App: () => component,
        ...header(),
        ...main(),
        ...footer(),
        handleRemove: (e) => { store.dispatch({ type: "REMOVE_TODO", payload: { index: +e.target.dataset.id } }) },
        handleCheckClick: (e) => {
            store.dispatch({
                type: "TOGGLE_TODO",
                payload: { index: +e.target.dataset.id, isCompleted: e.target.checked }
            });
        },
        makeEditable: (e) => {
            e.target.contentEditable = true;
            e.target.focus();
            e.target.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    e.target.contentEditable = false;
                    store.dispatch({ 
                        type: "EDIT_TODO", 
                        payload: { index: +e.target.previousElementSibling.dataset.id, task: e.target.innerText } 
                    });
                }
            });
        }
    }
    return context;
}

const store = new Store({ reducer, initialState: { Todos: [], Completed_Todos: [], Active_Todos: [], Active_Filter: "" } });
const domino = new Domino(store);

const appContext = app();
const appComponent = appContext.App();
const root = document.body;
const route = {
    "/todo": { context: appContext, component: appComponent },
}

new Router(domino, route, root);

export default store;


