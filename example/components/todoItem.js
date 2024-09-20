const todoItem = (task) => {
    const component = `
        <li className="{isCompleted ? "completed" : ''}" data-testid="todo-item">
            <div className="view">
                <input className="toggle" type="checkbox" data-testid="todo-item-toggle" />
                <label data-testid="todo-item-label">{task}</label>
                <button className="destroy" data-testid="todo-item-button"></button>
            </div>
        </li>
    `

    const context = {
        TodoItem: () => component,
        task: task,
        isCompleted: false
    }
    return context;
}

export default todoItem;