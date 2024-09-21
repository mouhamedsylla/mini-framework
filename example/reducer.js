const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return { ...state, Todos: [...state.Todos || [], action.payload ] };
        case "REMOVE_TODO":
            return { ...state, Todos: state.Todos.filter((_, index) => index !== +action.payload.index) };
        default:
            return state;
    }
}

export default reducer;