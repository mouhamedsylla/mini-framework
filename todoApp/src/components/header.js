const Header = () => {
    const Component = `
        <div className="mt-3">
            <div className="input-group mb-3">
                <input onChange=handleChange type="text" className="form-control" placeholder="add something" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                    <button onClick=handleClick className="btn btn-outline-secondary" type="button">Add</button>
                </div>
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