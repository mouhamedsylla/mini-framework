class State {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = [];
    }

    // Méthode pour obtenir l'état actuel
    getState() {
        return this.state;
    }

    // Méthode pour mettre à jour l'état
    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
        this.notify();
    }

    // Méthode pour souscrire à des changements d'état
    subscribe(listener) {
        this.listeners.push(listener);
    }

    // Méthode pour notifier tous les abonnés lors d'un changement d'état
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

// Fonction pour créer un état global
function createStore(initialState = {}) {
    return new State(initialState);
}

// Exemple d'utilisation
const store = createStore({ count: 0 });

// Souscrire à des changements d'état
store.subscribe((state) => {
    console.log("L'état a changé :", state);
});

// Mettre à jour l'état
store.setState({ count: store.getState().count + 1 });

export { State, createStore };
