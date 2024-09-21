import todoItem from "../../example/components/todoItem.js";
import store from "../app.js";

const main = () => {
    
    const context = {
        Main: () => component,
        Todos: [],
        createItem: (todo) => todoItem(todo).TodoItem(),
        ...markCompleted(),
        seeMarkCompleted: false,
    }
    const component = `
            <main className="main">
                <div className="toggle-all-container">
                    {seeMarkCompleted ? MarkCompleted() : ""}
                </div>
                <ul className="todo-list">
                    {Todos.map(todo => createItem(todo)).join("")}
                </ul>
            </main>
    `
    return context;
}

const markCompleted =  () => {
    const component = `
        <input onChange=handleMarkCompleted className="toggle-all" type="checkbox" />
        <label className="toggle-all-label" for="toggle-all">Mark all as complete</label>
    `
    const context = {
        MarkCompleted: () => component,
        handleMarkCompleted: (e) => {
            store.dispatch({ type: "MARK_COMPLETED", payload: { isCompleted: e.target.checked } });
        }
    }
    return context;
}

export default main;

