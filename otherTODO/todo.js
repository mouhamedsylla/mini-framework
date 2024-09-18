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
    },
    getText: (todo) => todo.text,
};

// Définir un composant
const appComponent = `
    <div>
        <h1>To-Do List</h1>
        <input type="text" value="{input}" onChange=handleChange />
        <button onClick=addTodo>Add</button>
        <ul>
            {context.todos.map((todo) =>
                "<li>" + "<span>" + getText(todo) + "</span>" + "</li>" 
            ).join('')}
        </ul>
    </div>
`;

// Connecter le composant au store et au DOM
domino.connectComponent(context, appComponent, document.getElementById('app'));