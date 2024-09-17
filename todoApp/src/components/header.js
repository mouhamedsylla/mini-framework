import useState from "../../../_lib/core/stateManager/useState";


const Header = () => {

    const myState = new useState({ task: "Initial Task" });

    console.log("myState.getState(av): ", myState.getState);
    myState.setState({ task: "New Task" });
    console.log("myState.getState(ap): ", myState.getState);
    

    const Component = `
        <div className="header" data-testid="header">
            <h1>todos</h1>
            <div className="input-container">
                <input 
                    className="new-todo" 
                    id="todo-input"
                    onChange=handleChange
                    type="text" 
                    data-testid="text-input" 
                    placeholder="What needs to be done?" 
                    value=${myState.getState}
                />

                <label className="visually-hidden" htmlFor="todo-input">New Todo Input</label>
            </div>
        </div>`

    return {
        Header: () => Component,
        handleChange: (e) => {
            if (e.target.value.length < 2) {

                return
            }
            console.log("newTask(av): ", newTask);
            setNewTask("aaaaaa")
            console.log("newTask(ap): ", newTask);
            console.log(e.target.value)
        },
        handleClick: (e) => {
            console.log("clicked")
        }
    }
}

export default Header;