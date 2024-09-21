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
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </mini>
    `

    const context = {
        App: () => component,
        ...header(),
        ...main(),
        ...footer(),
        handleRemove: (e) => {
            store.dispatch({ type: "REMOVE_TODO", payload: { index: +e.target.dataset.id } });
        }
    }
    return context;
}

const store = new Store({ reducer });
const domino = new Domino(store);

const appContext = app();
const appComponent = appContext.App();
const root = document.body;
const route = {
    "/": {context: appContext, component: appComponent},
}

new Router(domino, route, root);

export default store;


