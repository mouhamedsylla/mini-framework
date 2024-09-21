## MINI-FRAMEWORK

# Domino Framework

**Domino** is a lightweight, JSX-like framework that leverages the Virtual DOM for building dynamic and scalable web applications. It is designed to streamline the creation of components, manage state efficiently, and handle routing seamlessly, all while keeping a minimalistic structure. Domino aims to provide an intuitive and powerful toolkit for developers who are familiar with virtual DOM and component-based architecture.

## Key Features

- **JSX-like Syntax**: Domino allows developers to write components using a JSX-like syntax, which is later compiled into Virtual DOM structures. This approach simplifies UI development and makes it easier to read and manage components.
  
- **Virtual DOM**: The framework uses its own Virtual DOM system to manage the rendering and updating of the user interface. Components can be defined declaratively, and Domino takes care of efficiently rendering and updating the real DOM when the state changes.

- **Component-based Architecture**: Domino encourages building UIs by composing components. Components are isolated units that manage their own logic and context but can interact with a shared state when needed.

- **Global State Management**: Domino incorporates a global state store, similar to Redux, allowing developers to manage and share the state across different components. Actions dispatched from components trigger state updates, which lead to re-rendering of the UI.

- **Routing**: Domino has a built-in routing system that supports dynamic URL routing. It maps routes to components and ensures that the appropriate view is rendered when navigating through the application.

## Project Structure

Here is the project structure used in Domino:

```
.
├── _bin
│   └── mini.js               # Binary for executing the framework
├── docs
│   └── USE.md                # Documentation file
├── example
│   ├── components            # Sample components
│   ├── index.html            # Entry HTML file for example app
├── _lib
│   ├── core                  # Core libraries of the framework
│   │   ├── router            # Router logic
│   │   ├── runtime           # Framework runtime
│   │   ├── stateManager      # State management system
│   │   ├── vdom              # Virtual DOM utilities
│   └── templates             # Templates for building applications
├── server.js                 # Server setup for serving the example
└── package.json              # Project metadata and dependencies
```

## How Domino Works

1. **Component Declaration**: Components in Domino are defined using a JSX-like template. These templates are parsed and converted into a virtual DOM. Each component returns its own structure and context.

2. **JSX Compilation**: Domino doesn’t directly render JSX. The JSX-like syntax is first evaluated to handle any JavaScript expressions, and then it is compiled into a virtual DOM object. This abstraction allows Domino to optimize the rendering process.

3. **State Management**: Domino uses a global store to manage state across the application. The state can be updated by dispatching actions, and components that are subscribed to the state will automatically re-render when the relevant state changes.

4. **Routing**: The router listens for changes in the browser’s URL and maps the path to a corresponding component. It updates the view dynamically as users navigate between different parts of the application.

## Run todo example
Run this cammand and access to our todo in url **http://localhost/todo:3000**
```bash
npm run start
```