const footer = () => {
    const component = `
            <footer className="footer">
                <span className="todo-count"></span>
                <ul className="filters">
                    <li>
                        <a href="#/" className="selected">All</a>
                    </li>
                    <li>
                        <a href="#/active">Active</a>
                    </li>
                    <li>
                        <a href="#/completed">Completed</a>
                    </li>
                </ul>
                <button className="clear-completed">Clear completed</button>
            </footer>
    `
    const context = {
        Footer: () => component,
        handleClearCompleted: () => {
            store.dispatch({ type: "CLEAR_COMPLETED" });
        }
    }
    return context;
}

export default footer;