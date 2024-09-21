# Domino Framework - User Guide

This guide will walk you through creating a component with **state management**, **event listeners**, and **routing** using the Domino framework.

### Table of Contents
1. [Creating a Component](#creating-a-component)
2. [Adding Event Listeners](#adding-event-listeners)
3. [Managing State](#managing-state)
4. [Component Mounting](#component-mounting)
5. [Setting Up Routing](#setting-up-routing)

---

## 1. Creating a Component

In Domino, a component is defined with a JSX-like syntax and returns both an **HTML structure** and a **context**. The context includes the component itself and any additional properties (like event handlers and state) that are required during the lifecycle of the component.

### Example: Counter Component

Here's how to create a simple counter component:

```js
const counter = () => {
    const component = `
        <div className="counter-app">
            <h1>Counter: <span id="counter-value">{counterValue}</span></h1>
            <button onClick=incrementCounter id="increment-button">Increment</button>
        </div>
    `;

    const context = {
        Counter: () => component,   // The component function
        counterValue: 0,            // Initial state for the counter
        incrementCounter: () => {   // Event handler for incrementing the counter
            store.dispatch({ type: "INCREMENT" });
        }
    };

    return context;
};
```

### Key Points:
- **HTML Definition**: The component's structure is defined in JSX-like syntax.
- **Context**: The context object holds the component function (`Counter`) and additional properties like `counterValue` (state) and `incrementCounter` (event handler).

---

## 2. Adding Event Listeners

Domino allows event listeners to be directly attached to HTML elements in the component. In the example above, the `onClick` event is attached to the button element.

```html
<button onClick=incrementCounter id="increment-button">Increment</button>
```

- The `onClick` attribute points to the `incrementCounter` function, which is part of the component's context.
- When the button is clicked, the event handler updates the state via the `store.dispatch()` function.

---

## 3. Managing State

Domino uses a **global store** (similar to Redux) to manage state. You define a `reducer` function that handles actions and updates the state accordingly.

### Step 1: Define the Reducer

The reducer manages the state for the counter. In this case, it listens for the `INCREMENT` action and updates the `counterValue`.

```js
const initialState = { counterValue: 0 };

const reducer = (state, action) => {
    switch(action.type) {
        case "INCREMENT":
            return { counterValue: state.counterValue + 1 };
        default:
            return state;
    }
};
```

### Step 2: Create the Store

The store is initialized with the reducer and the initial state.

```js
const store = new Store({ reducer, state: initialState });
```

### Step 3: Dispatch Actions

Inside the `incrementCounter` function, we dispatch an `INCREMENT` action to update the state:

```js
incrementCounter: () => { 
    store.dispatch({ type: "INCREMENT" });
}
```

Whenever the state changes, Domino will re-render the component automatically.

---

## 4. Component Mounting

To mount a component to the DOM, Domino provides the `connectComponent` method. This method links the component's context and HTML structure to the actual DOM element (in this case, the root element).

```js
const counterContext = counter();
const counterComponent = counterContext.Counter();
const root = document.body;  // You can use a specific DOM element as root if needed

domino.connectComponent(counterContext, counterComponent, root);
```

Here’s what happens:
- `counterContext` holds both the component and the necessary state.
- `counterComponent` renders the component HTML.
- `domino.connectComponent()` mounts the component into the root element and ensures it's updated as state changes.

---

## 5. Setting Up Routing

Domino includes a simple router system to manage navigation between different views or pages in your application. 

### Step 1: Define Routes

First, we define different routes. Each route maps to a component context and its rendered component.

```js
const routes = {
    "/": { context: homeContext, component: homeContext.Home() },  // Home page
    "/counter": { context: counterContext, component: counterComponent }  // Counter page
};
```

### Step 2: Initialize the Router

The router listens for URL changes and loads the appropriate component based on the current path.

```js
import Router from "../_lib/core/router/router.js";

const root = document.body;  // Root element for the app

new Router(domino, routes, root);
```

### Example: Home Page Component

Here is a simple home page component that includes a link to navigate to the counter page:

```js
const home = () => {
    const component = `
        <mini>
            <h1>Home</h1>
            <p>This is the home page</p>
            <a href="/counter" data-link>Go to counter</a>
        </mini>
    `;

    const context = {
        Home: () => component
    };

    return context;
};

const homeContext = home();
```

### Step 3: Handle Navigation

When a user clicks on the link to `/counter`, the router will load the counter component automatically. The router manages URL updates and component rendering, so there’s no need to manually call `domino.connectComponent()` when using the router.

---

## Conclusion

- **Component Creation**: Domino allows you to define components with JSX-like syntax and handle state and event management using a global store.
- **State Management**: Use the `Store` class to manage application state and dispatch actions via the `reducer`.
- **Event Listeners**: Add event listeners directly to HTML elements within your components.
- **Routing**: The built-in router makes it easy to manage multiple views within your application, enabling seamless navigation.

This documentation provides a clear overview of how to use Domino to build dynamic, state-driven applications with routing capabilities.