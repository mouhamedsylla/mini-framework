import todoItem from "../../example/components/todoItem.js";

const main = () => {
    const component = `
            <main className="main">
                <div className="toggle-all-container">
                    <input className="toggle-all" type="checkbox" />
                    <label className="toggle-all-label" for="toggle-all">Mark all as complete</label>
                </div>
                <ul className="todo-list">{"test"}</ul>
            </main>
    `
    const context = {
        Main: () => component,
        Todos: [],
        test: "Hello world",
    }
    return context;
}

export default main;

