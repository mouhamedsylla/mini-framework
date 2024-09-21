const todoItem = (payload) => {
    const context = {
        TodoItem: () => component,
        ...payload,
    }

    const component = `
        <li className="${context.isCompleted ? "completed" : ""}" data-testid="todo-item">
            <div className="view">
                <input className="toggle" type="checkbox" data-testid="todo-item-toggle" />
                <label data-testid="todo-item-label">${context.task}</label>
                <button onClick=handleRemove className="destroy" data-id="${context.index}"></button>
            </div>
        </li>
    `

    return context;
}

export default todoItem;