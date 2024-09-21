import store from "../app.js";

const footer = () => {
    const component = `
            {Todos != 0 ? footerBloc() : ""}
    `
    const context = {
        Footer: () => component,
        Todos: [],
        ...footerBloc(),
    }
    return context;
}

const footerBloc =  () => {
    const component = `
        <footer className="footer">
                <span className="todo-count">{todoCount === 1 ? todoCount + " item left!" : todoCount + " items left!"}</span>
                <ul className="filters">
                    <li>
                        <a href="#/" className="{Active_Filter == "all" ? "selected" : ""}" onClick="handleFilterAll">All</a>
                    </li>
                    <li>
                        <a href="#/active" className="{Active_Filter == "active" ? "selected" : ""}" onClick="handleFilterActive">Active</a>
                    </li>
                    <li>
                        <a href="#/completed" className="{Active_Filter == "completed" ? "selected" : ""}" onClick="handleFilterCompleted">Completed</a>
                    </li>
                </ul>
                <button className="clear-completed" onClick="handleClearCompleted">Clear completed</button>
            </footer>
    `
    const context = {
        footerBloc: () => component,
        handleFilterAll: () => {
            console.log("store.state: ", store.state);
            store.dispatch({ type: "FILTER_ALL" });
        },
        handleFilterActive: () => {
            store.dispatch({ type: "FILTER_ACTIVE" });
        },
        handleFilterCompleted: () => {
            store.dispatch({ type: "FILTER_COMPLETED" });
        },
        handleClearCompleted: () => {
            store.dispatch({ type: "CLEAR_COMPLETED" });
        },
        todoCount: 1,
        Active_Filter: "all",
    }
    return context;
}



export default footer;