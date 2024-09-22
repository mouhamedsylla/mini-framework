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
    }
    return context;
};

export default header;
