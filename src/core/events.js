class EventEmitter {
    constructor() {
        this.events = {};
    }

    // Méthode pour enregistrer un événement avec un callback
    on(eventType, listener) {
        if (!this.events[eventType]) {
            this.events[eventType] = [];
        }
        this.events[eventType].push(listener);
    }

    // Méthode pour déclencher un événement
    emit(eventType, ...args) {
        if (this.events[eventType]) {
            this.events[eventType].forEach(listener => {
                listener(...args);
            });
        }
    }

    // Méthode pour supprimer un auditeur d'événement spécifique
    off(eventType, listener) {
        if (!this.events[eventType]) return;

        this.events[eventType] = this.events[eventType].filter(
            registeredListener => registeredListener !== listener
        );
    }

    // Méthode pour enregistrer un événement qui se déclenche une seule fois
    once(eventType, listener) {
        const wrapper = (...args) => {
            listener(...args);
            this.off(eventType, wrapper);
        };
        this.on(eventType, wrapper);
    }
}

// Exemple d'utilisation
const eventEmitter = new EventEmitter();

// Enregistrer un événement
eventEmitter.on('sayHello', (name) => {
    console.log(`Hello, ${name}!`);
});

// Déclencher l'événement
eventEmitter.emit('sayHello', 'Alice');

// Supprimer un auditeur d'événement
const goodbyeListener = (name) => console.log(`Goodbye, ${name}!`);
eventEmitter.on('sayGoodbye', goodbyeListener);
eventEmitter.emit('sayGoodbye', 'Bob');
eventEmitter.off('sayGoodbye', goodbyeListener);
eventEmitter.emit('sayGoodbye', 'Bob'); // Aucun message ne sera affiché car l'auditeur a été supprimé

// Enregistrer un événement qui se déclenche une seule fois
eventEmitter.once('greetOnce', (name) => {
    console.log(`Hello for the first and only time, ${name}!`);
});
eventEmitter.emit('greetOnce', 'Charlie');
eventEmitter.emit('greetOnce', 'Charlie'); // Ne sera pas déclenché une seconde fois

export { EventEmitter };
