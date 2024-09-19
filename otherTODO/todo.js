import Store from "../../../_lib/core/stateManager/store.js";
import Domino from "../_lib/core/runtime/runtime.js";

// Exemple de reducer pour le store
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return { ...state, todos: [...state.todos || [], action.payload] };
        case "TOGGLE_TODO":
            return {
                ...state,
                todos: state.todos.map((todo, index) =>
                    index === action.payload ? { ...todo, completed: !todo.completed } : todo
                )
            };
        case "REMOVE_TODO":
            return { ...state, todos: state.todos.filter((_, index) => index !== action.payload) };
        default:
            return state;
    }
};

// Crée une instance du store
const store = new Store({ reducer });

// Crée une instance de Domino en passant le store
const domino = new Domino(store);

// Définir un contexte de composant avec des handlers d'événements
const context = {
    todos: [],
    input: "",
    addTodo: () => store.dispatch({ type: "ADD_TODO", payload: { text: context.input, completed: false } }),
    toggleTodo: (index) => store.dispatch({ type: "TOGGLE_TODO", payload: index }),
    removeTodo: (index) => store.dispatch({ type: "REMOVE_TODO", payload: index }),
    setInput: (input) => {
        context.input = input;
    },
    handleChange: (e) => {
        context.setInput(e.target.value);
        context.addTodo()
        console.log("e.target.value************************************************: ", e.target.value)
        e.target.value = ""
    },
    getText: (todo) => todo.text,
};

// Définir un composant
const appComponent = `
    <mini>
        <section className="todoapp" id="root">
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
                        value="{input}"
                    />

                    <label className="visually-hidden" htmlFor="todo-input">New Todo Input</label>
                </div>
            </header>

            <main class="main" data-testid="main">
                <ul className="todo-list" data-testid="todo-list">
                    {context.todos.map((todo) => 
                        "<li class>" + "<span>" + getText(todo) + "</span>" + "</li>" 
                    ).join('')}
                </ul>
            </main>
        </section>

        <footer className="info">
            <p>Double-click to edit a todo</p>
            <p>Created by the TodoMVC Team</p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    </mini>
`;

// Connecter le composant au store et au DOM
domino.connectComponent(context, appComponent, document.getElementById("app"));