class Router {
    constructor(routes) {
        this.routes = routes; // Un objet avec des chemins en clé et des callbacks en valeur
        this.currentPath = '';
        this._loadInitialRoute();
    }

    // Méthode pour naviguer vers une route
    navigate(path) {
        if (path === this.currentPath) return; // Évite de recharger la même route

        this.currentPath = path;
        window.history.pushState({}, '', path); // Change l'URL sans recharger la page

        this._renderRoute(path);
    }

    // Méthode privée pour rendre une route
    _renderRoute(path) {
        const route = this.routes[path];

        if (route) {
            route(); // Appel du callback associé à la route
        } else {
            console.error(`La route ${path} n'existe pas.`);
        }
    }

    // Méthode pour charger la route initiale en fonction de l'URL actuelle
    _loadInitialRoute() {
        const path = window.location.pathname;
        this.navigate(path);
    }

    // Méthode pour écouter les changements d'URL via les boutons du navigateur
    start() {
        window.onpopstate = () => {
            this._renderRoute(window.location.pathname);
        };
    }
}

// Fonction pour créer le routeur
function createRouter(routes) {
    return new Router(routes);
}

// Exemple d'utilisation
const routes = {
    '/': () => console.log('Accueil'),
    '/about': () => console.log('À propos'),
    '/contact': () => console.log('Contact')
};

const router = createRouter(routes);
router.start();

// Naviguer vers une autre route après 2 secondes
setTimeout(() => {
    router.navigate('/about');
}, 2000);

export { Router, createRouter };
