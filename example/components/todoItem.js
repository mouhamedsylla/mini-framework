const todoItem = (payload) => {
    const context = {
        TodoItem: () => component,
        ...payload,
    }

    const component = `
        <li className="${context.isCompleted ? "completed" : ""}" data-testid="todo-item">
            <div className="view">
                <input 
                    onClick=handleCheckClick 
                    className="toggle" 
                    type="checkbox" 
                    checked="${context.isCompleted ? "true" : ""}"
                    data-id="${context.index}" 
                />
                <label data-testid="todo-item-label">${context.task}</label>
                <button onClick=handleRemove className="destroy" data-id="${context.index}"></button>
            </div>
        </li>
    `

    return context;
}

export default todoItem;