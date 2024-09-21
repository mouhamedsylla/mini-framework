import todoItem from "../../example/components/todoItem.js";

const main = () => {
    const context = {
        Main: () => component,
        Todos: [],
        createItem: (todo) => todoItem(todo).TodoItem()
    }

    const component = `
            <main className="main">
                <div className="toggle-all-container">
                    <input className="toggle-all" type="checkbox" />
                    <label className="toggle-all-label" for="toggle-all">Mark all as complete</label>
                </div>
                <ul className="todo-list">
                    {Todos.map(todo => createItem(todo)).join("")}
                </ul>
            </main>
    `
    return context;
}

export default main;

