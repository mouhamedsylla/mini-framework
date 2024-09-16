const Header = () => {
    const Component = `
        <div className="header" data-testid="header">
            <h1>todos</h1>
            <div className="input-container">
                <input 
                    className="new-todo" 
                    id="todo-input" 
                    type="text" 
                    data-testid="text-input" 
                    placeholder="What needs to be done?" 
                    value=""
                >
    
                <label className="visually-hidden" for="todo-input">New Todo Input</label>
            </div>
        </div>
    `
    return {
        Header: () => Component,
        handleChange: (e) => {
            console.log(e.target.value)
        },
        handleClick: (e) => {
            console.log("clicked")
        }
    }
}

export default Header;