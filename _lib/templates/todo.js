// import Store from "../../../_lib/core/stateManager/store.js";
// import Domino from "../_lib/core/runtime/runtime.js";
// import Router from "../_lib/core/router/router.js";
// // Exemple de reducer pour le store
// const reducer = (state, action) => {
//     switch (action.type) {
//         case "ADD_TODO":
//             return { ...state, todos: [action.payload, ...state.todos || []] };
//         case "TOGGLE_TODO":
//             return {
//                 ...state,
//                 todos: state.todos.map((todo, index) =>
//                     index === action.payload ? { ...todo, completed: !todo.completed } : todo
//                 )
//             };
//         case "REMOVE_TODO":
//             return { ...state, todos: state.todos.filter((_, index) => index !== action.payload) };
//         default:
//             return state;
//     }
// };

// // Crée une instance du store
// const store = new Store({ reducer });

// // Crée une instance de Domino en passant le store
// const domino = new Domino(store);

// // Définir un contexte de composant avec des handlers d'événements
// const context = {
//     todos: [],
//     input: "",
//     addTodo: () => store.dispatch({ type: "ADD_TODO", payload: { text: context.input, completed: false } }),
//     toggleTodo: (index) => store.dispatch({ type: "TOGGLE_TODO", payload: index }),
//     removeTodo: (index) => store.dispatch({ type: "REMOVE_TODO", payload: index }),
//     setInput: (input) => {
//         context.input = input;
//     },
//     handleChange: (e) => {
//         context.setInput(e.target.value);
//         context.addTodo()
//         console.log("e.target.value************************************************: ", e.target.value)
//         e.target.value = ""
//     },
//     getText: (todo) => todo.text,
//     pushHome: (e) => {
//         e.preventDefault()
//         router.navigate("/home")
//     }
// };

// // Définir un composant
// const appComponent = `
//     <mini>
//         <section className="todoapp" id="root">


//             <main class="main" data-testid="main">
//                 <ul className="todo-list" data-testid="todo-list">
//                     {context.todos.map((todo) => 
//                         "<li class>" + "<span>" + getText(todo) + "</span>" + "</li>" 
//                     ).join('')}
//                 </ul>
//             </main>
//         </section>

        // <footer className="info">
        //     <p>Double-click to edit a todo</p>
        //     <p>Created by the TodoMVC Team</p>
        //     <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        // </footer>
//         <button onClick=pushHome>home</button>
//     </mini>
// `;

// const homeComponent = `
//     <div>
//         <h1>IN HOME! YES WE CAN!!!</h1>
//     </div>
// `

// const root = document.getElementById("app")
// const routes = {
//     "/": {context: context, component: appComponent},
//     "/home": {context: {}, component: homeComponent}
// }

// const router = new Router(domino, routes, root)
// router.navigate("/")
// // Connecter le composant au store et au DOM
// //domino.connectComponent(context, appComponent, document.getElementById("app"));