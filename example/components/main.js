import todoItem from "./todoItem.js";
import markCompleted from "./markcompleted.js";

const main = () => {
    
    const context = {
        Main: () => component,
        createItem: (todo) => todoItem(todo).TodoItem(),
        ...markCompleted(),
        seeMarkCompleted: false,
        filter: (Fncreate, todos, path) => {
            if (path === "/#/active") {
                return todos.filter(todo => !todo.isCompleted).map((todo) => Fncreate(todo)).join("");
            }
            if (path === "/#/completed") {
                return todos.filter(todo => todo.isCompleted).map((todo) => Fncreate(todo)).join("");
            }
            return todos.map((todo) => Fncreate(todo)).join("");
        }
    }

    const component = `
            <main className="main">
                <div className="toggle-all-container">
                    {seeMarkCompleted ? MarkCompleted() : ""}
                </div>
                <ul className="todo-list">
                    { filter(createItem, Todos, path)}
                </ul>
            </main>
    `
    return context;
}

export default main;

