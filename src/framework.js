// src/framework.js

import { createElement, DOMElement } from './core/dom';
import { createStore } from './core/state';
import { createRouter } from './core/router';
import { EventEmitter } from './core/events';

class Framework {
    constructor({ initialState = {}, routes = {} }) {
        // Initialisation de l'état global
        this.store = createStore(initialState);

        // Initialisation du routeur
        this.router = createRouter(routes);
        this.router.start();

        // Initialisation de l'EventEmitter pour la gestion des événements
        this.eventEmitter = new EventEmitter();
    }

    // Méthode pour créer un élément DOM via le framework
    createElement(tag, attrs, ...children) {
        return createElement(tag, attrs, ...children);
    }

    // Méthode pour ajouter un événement à un élément
    on(eventType, listener) {
        this.eventEmitter.on(eventType, listener);
    }

    // Méthode pour déclencher un événement
    emit(eventType, ...args) {
        this.eventEmitter.emit(eventType, ...args);
    }

    // Méthode pour accéder à l'état actuel
    getState() {
        return this.store.getState();
    }

    // Méthode pour mettre à jour l'état
    setState(newState) {
        this.store.setState(newState);
    }

    // Méthode pour naviguer vers une nouvelle route
    navigate(path) {
        this.router.navigate(path);
    }
}

// Exemple d'utilisation du framework
const appFramework = new Framework({
    initialState: { count: 0 },
    routes: {
        '/': () => console.log('Accueil'),
        '/about': () => console.log('À propos'),
        '/contact': () => console.log('Contact')
    }
});

// Créer un élément DOM et l'ajouter au corps de la page
const appElement = appFramework.createElement('div', { id: 'app' }, 
    appFramework.createElement('h1', { class: 'title' }, 'Hello World'),
    appFramework.createElement('button', { id: 'incrementBtn' }, 'Increment')
);
document.body.appendChild(appElement.render());

// Gestion d'événements pour le bouton d'incrémentation
const incrementButton = document.getElementById('incrementBtn');
incrementButton.addEventListener('click', () => {
    const currentState = appFramework.getState();
    appFramework.setState({ count: currentState.count + 1 });
    console.log('State updated:', appFramework.getState());
});

// Navigation via le framework après 2 secondes
setTimeout(() => {
    appFramework.navigate('/about');
}, 2000);

export default Framework;
