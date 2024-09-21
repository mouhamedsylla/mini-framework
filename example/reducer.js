const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return { ...state, Todos: [...state.Todos || [], action.payload ], seeMarkCompleted: true };
        case "REMOVE_TODO":
            return { ...state, Todos: state.Todos.filter((todo) => todo.index !== action.payload.index), seeMarkCompleted: state.Todos.length > 1 };
        case "MARK_COMPLETED":
            return { ...state, Todos: state.Todos.map(todo => ({ ...todo, isCompleted: action.payload.isCompleted })) };
        case "TOGGLE_TODO":
            return { ...state, Todos: state.Todos.map(todo => todo.index === action.payload.index ? { ...todo, isCompleted: action.payload.isCompleted } : todo) };
        case "CLEAR_COMPLETED":
            return { ...state, Todos: state.Todos.filter(todo => !todo.isCompleted) };
        default:
            return state;
    }
}

export default reducer;