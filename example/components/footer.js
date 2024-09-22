//import store from "../app.js";

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
                        <a href="/#" className="selected">All</a>
                    </li>
                    <li>
                        <a href="/#/active" data-link>Active</a>
                    </li>
                    <li>
                        <a href="/#/completed" data-link>Completed</a>
                    </li>
                </ul>
                <button className="clear-completed" onClick="handleClearCompleted">Clear completed</button>
            </footer>
    `
    const context = {
        footerBloc: () => component,
        // handleClearCompleted: () => {
        //     store.dispatch({ type: "CLEAR_COMPLETED" });
        // },
        todoCount: 1,
    }
    return context;
}



export default footer;