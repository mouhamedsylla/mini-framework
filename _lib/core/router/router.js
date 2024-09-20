class Router {
    constructor(domino, routes, root) {
        this.domino = domino;  // Instance de Domino pour gérer les composants
        this.routes = routes;  // Table de routage
        this.root = root;      // Élément racine où les composants seront montés
        this.currentPath = null;  // Garder la trace de la route actuelle
        this.initialize();
    }

    /**
     * Initialisation du router pour écouter les changements d'URL.
     */
    initialize() {
        // Attache un écouteur sur les changements d'historique
        window.onpopstate = () => {
            this.navigate(window.location.pathname);
        };

        // Navigation initiale
        this.navigate(window.location.pathname);
    }

    /**
     * Navigue vers une route spécifique et met à jour l'URL.
     * @param {string} path - Le chemin de la route
     * @param {boolean} pushState - Si vrai, on ajoute la route à l'historique
     */
    navigate(path, pushState = true) {
        console.log("path: ", path)
        const route = this.routes[path];  // Obtenir le composant correspondant à la route
        console.log(this.routes)
        //console.log(route.context)
        console.log(route.component)

        if (route) {
            console.log("On y est")
            if (pushState && this.currentPath !== path) {
                window.history.pushState({}, "", path)
                this.currentPath = path
            }

            this.domino.connectComponent(route.context, route.component, this.root, path)
        } else {
            console.log("path: ", path)
            //this.handleRouteNotFound(path);
        }
    }

    /**
     * Gère les routes non trouvées.
     */
    handleRouteNotFound(path) {
        console.log(path)
        this.root.innerHTML = "<h1>404 - Page Not Found</h1>";
    }
}

export default Router;
