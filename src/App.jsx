function ExampleComponent({ user, isDisabled }) {
    return (
      <div className="example" id="example-id">
        <h1>Welcome, {user.name}</h1>
        <input type="checkbox" checked={user.isChecked} />
        <button disabled={isDisabled} onClick={() => alert('Clicked!')}>Click Me</button>
        {/* This is a comment */}
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    );
  }
  