import Domino from "../_lib/core/runtime/runtime.js"
import Router from "../_lib/core/router/router.js"
import Store from "../_lib/core/stateManager/store.js"
import reducer from "./reducer.js"
import app from "./pages/home.js"
import active from "./pages/active.js"
import completed from "./pages/completed.js"

const store = new Store({ 
    reducer, 
    initialState: { 
        Todos: [], 
    }
});

const USER_ACTIONS = {
    index: 0,
    handleRemove: (e) => { store.dispatch({ type: "REMOVE_TODO", payload: { index: +e.target.dataset.id } }) },
    handleCheckClick: (e) => {
        store.dispatch({
            type: "TOGGLE_TODO",
            payload: { index: +e.target.dataset.id, isCompleted: e.target.checked }
        });
    },
    handleMarkCompleted: (e) => { store.dispatch({ type: "MARK_COMPLETED", payload: { isCompleted: e.target.checked } });},
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
    },
    handleChange: (e) => {
        if (e.target.value.length < 2) { return }
        store.dispatch({ type: "ADD_TODO", payload: { task: e.target.value, isCompleted: false, index: USER_ACTIONS.index } })
        e.target.value = ""
        USER_ACTIONS.index++
    },
}

const domino = new Domino(store);

// home page
const appContext = app();
const appComponent = appContext.App();

// active page
const activeContext = active();
const activeComponent = activeContext.Active();

// complete page
const completeContext = completed();
const completeComponent = completeContext.Completed();

const root = document.body;

// routing
const route = {
    "/todo": { context: {
        ...appContext, 
        ...USER_ACTIONS,
    }, component: appComponent },

    "/#/active": { context: {
        ...activeContext, 
        ...USER_ACTIONS, 
    }, component: activeComponent },

    "/#/completed": { context: {
        ...completeContext, 
        ...USER_ACTIONS, 
    }, component: completeComponent },
}

const router = new Router(domino, route, root);

export default router


