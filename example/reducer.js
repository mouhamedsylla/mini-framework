const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                Todos: [...state.Todos || [], action.payload],
                Active_Todos: [
                    ...state.Active_Todos || [],
                    !action.payload.isCompleted ? action.payload : null
                ].filter(todo => todo !== null),
                Completed_Todos: [
                    ...state.Completed_Todos || [],
                    action.payload.isCompleted ? action.payload : null
                ].filter(todo => todo !== null),
                seeMarkCompleted: true,
                todoCount: (state.Todos?.filter(todo => !todo.isCompleted).length || 0) + 1,
            };

        case "REMOVE_TODO":
            return {
                ...state,
                Todos: state.Todos.filter((todo) => todo.index !== action.payload.index),
                seeMarkCompleted: state.Todos.length > 1,
                todoCount: state.Todos.filter(todo => !todo.isCompleted && todo.index !== action.payload.index).length
            };

        case "MARK_COMPLETED":
            return {
                ...state,
                Todos: state.Todos.map(todo => ({ ...todo, isCompleted: action.payload.isCompleted })),
                todoCount: action.payload.isCompleted ? 0 : state.Todos.length
            };

        case "TOGGLE_TODO":
            return {
                ...state,
                Todos: state.Todos.map(todo => todo.index === action.payload.index ? { ...todo, isCompleted: action.payload.isCompleted } : todo),
                todoCount: state.Todos.filter(todo => !todo.isCompleted).length + (action.payload.isCompleted ? -1 : 1)
            };

        case "EDIT_TODO":
            return { 
                ...state, 
                Todos: state.Todos.map(todo => todo.index === action.payload.index ? { ...todo, task: action.payload.task } : todo)
            };

        case "CLEAR_COMPLETED":
            return { ...state, Todos: state.Todos.filter(todo => !todo.isCompleted) };

        case "FILTER_ALL":
            return { ...state, Active_Filter: "all" };

        case "FILTER_ACTIVE":
            return { ...state, Active_Filter: "active" };

        case "FILTER_COMPLETED":
            return { ...state, Active_Filter: "completed" };

        default:
            return state;
    }
}


export default reducer;