class Router {
    constructor(domino, routes, root) {
        this.routes = routes
        this.domino = domino
        this.root = root
        this.initialize()
    }

    initialize() {
        window.addEventListener("popstate", () => { 
            this.renderView(window.location.pathname) 
        })
        document.addEventListener("DOMContentLoaded", () => {
            this.navigateTo(window.location.pathname)
            document.addEventListener("click", (event) => { this.handleLinkClick(event) })

        })
    }

    handleLinkClick(event) {
        if (event.target.matches("[data-link]")) {
            event.preventDefault()
            const route = event.target.getAttribute("href")
            if (route) {
                this.navigateTo(route)
            }
        }
    }

    renderView(path) {
        const route = this.routes[path]
        if (route) {
            this.domino.connectComponent(route.context, route.component, this.root)
        } else {
            this.root.innerHTML = "<h1>404 - Page Not Found</h1>"
        }
    }

    navigateTo(path) {
        history.pushState(null, "", path)
        this.renderView(path)
    }
}

export default Router;
