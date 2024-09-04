class DOMElement {
    constructor(tag, attrs = {}, children = []) {
        this.tag = tag;
        this.attrs = attrs;
        this.children = children;
    }

    // Méthode pour générer l'élément DOM réel
    render() {
        const element = document.createElement(this.tag);

        // Appliquer les attributs
        Object.keys(this.attrs).forEach(attr => {
            element.setAttribute(attr, this.attrs[attr]);
        });

        // Récursivement rendre les enfants
        this.children.forEach(child => {
            if (child instanceof DOMElement) {
                element.appendChild(child.render());
            } else {
                element.appendChild(document.createTextNode(child));
            }
        });

        return element;
    }

    // Méthode statique pour créer un nouvel élément
    static create(tag, attrs, ...children) {
        return new DOMElement(tag, attrs, children);
    }

    // Méthode pour ajouter un événement
    on(eventType, callback) {
        this.render().addEventListener(eventType, callback);
    }
}

// Fonction pour simplifier la création d'éléments
function createElement(tag, attrs, ...children) {
    return DOMElement.create(tag, attrs, ...children);
}

// Exemple d'utilisation
const app = createElement('div', { id: 'app' }, 
    createElement('h1', { class: 'title' }, 'Hello World'),
    createElement('p', {}, 'This is a paragraph.')
);

// Insérer l'élément dans le DOM
document.body.appendChild(app.render());

// Ajouter un événement à un élément
app.on('click', () => alert('App clicked!'));

export { DOMElement, createElement };
