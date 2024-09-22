const markCompleted =  () => {
    const component = `
        <input onChange=handleMarkCompleted className="toggle-all" type="checkbox" />
        <label className="toggle-all-label" for="toggle-all">Mark all as complete</label>
    `
    const context = {
        MarkCompleted: () => component,
    }
    return context;
}

export default markCompleted;