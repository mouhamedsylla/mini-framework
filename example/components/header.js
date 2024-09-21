import store from "../app.js";

const header = () => {
  const component = `
            <header className="header" data-testid="header">
                <h1>todos</h1>
                <div className="input-container">
                    <input 
                        className="new-todo" 
                        id="todo-input"
                        onChange=handleChange
                        type="text" 
                        data-testid="text-input" 
                        placeholder="What needs to be done?" 
                        value=""
                    />
                    <label className="visually-hidden" htmlFor="todo-input">New Todo Input</label>
                </div>
            </header>
    `;

    const context = {
        Header: () => component,
        index: 0,
        handleChange: (e) => {
            store.dispatch({ type: "ADD_TODO", payload: { task: e.target.value, isCompleted: false, index: context.index } })
            context.index ++
            e.target.value = "";
        },
    }
    return context;
};

export default header;
