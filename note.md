## Virtual DOM
The `virtual` DOM is is a representation of the actual DOM in the browser. The DOM is an in-memory tree structure managed by the browser engine, representing the HTML structure of the web
page. By contrast, the virtual DOM is a JavaScript-based in-memory tree of virtual nodes that mirrors the structure of the actual DOM.

Each node in this virtual tree is called a `virtual node`, and  the entire construct is the virtual DOM.

The nodes in the actual DOM are heavy objects that have hundreds of properties, whereas the virtual nodes are lightweight objects that contain only the information needed to render the view.