import useState from "../../../_lib/core/stateManager/useState.js";


const Header = () => {

    const [state, setState] = new useState("");

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
                    value=${state}
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

            setState("AAA");
            console.log(e.target.value)
        },
        handleClick: (e) => {
            console.log("clicked")
        }
    }
}

export default Header;