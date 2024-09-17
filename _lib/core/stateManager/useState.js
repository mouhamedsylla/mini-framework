/* let hooks = [];
let hookIndex = 0;

    export function useState(initialValue) {
    const state = hooks[hookIndex] || initialValue;
    const currentIndex = hookIndex;

    const setState = (newValue) => {
        hooks[currentIndex] = newValue;
        reRender(); // Déclenche le re-rendering
    };

    hookIndex++;
    return [state, setState];
} */

/* export function useState(initialValue) {
    let _val = initialValue
    const state = _val
    const setState = newValue => {
        _val = newValue
    }
    return [state, setState];
}

function reRender() {
    hookIndex = 0; // Réinitialise les hooks pour le prochain rendu
    const newVNode = App(); // Génére un nouveau Virtual DOM
    const patches = diff(oldVNode, newVNode); // Compare l'ancien et le nouveau DOM virtuel
    patch(document.body, patches); // Applique les changements au vrai DOM
    oldVNode = newVNode; // Sauvegarde le nouveau Virtual DOM
}

function patch(parent, patches, index = 0) {
    const $el = parent.childNodes[index]; // Le nœud DOM correspondant

    switch (patches.type) {
        case 'REPLACE':
            const newEl = render(patches.newNode); // Crée un nouvel élément à partir du nouveau DOM virtuel
            parent.replaceChild(newEl, $el);       // Remplace l'ancien élément
            break;

        case 'UPDATE':
            // Mettre à jour les props
            patches.props.forEach(({ key, value }) => {
                $el[key] = value; // Applique les nouvelles propriétés
            });

            // Mettre à jour les enfants
            patches.children.forEach((childPatch, i) => {
                patch($el, childPatch, i); // Applique récursivement les patchs sur les enfants
            });
            break;
    }
}

function diff(oldVNode, newVNode) {
    if (oldVNode.tag !== newVNode.tag) {
        return { type: 'REPLACE', newNode: newVNode }; // Remplacer si les balises sont différentes
    }

    const patchProps = [];
    // Comparer les props (attributs)
    Object.keys(newVNode.props).forEach(key => {
        if (newVNode.props[key] !== oldVNode.props[key]) {
            patchProps.push({ key, value: newVNode.props[key] });
        }
    });

    const patchChildren = [];
    // Comparer les enfants
    for (let i = 0; i < newVNode.children.length; i++) {
        patchChildren.push(diff(oldVNode.children[i], newVNode.children[i]));
    }

    return {
        type: 'UPDATE',
        props: patchProps,
        children: patchChildren
    };
}
 */

class useState {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = { ...newState };
        this.notify();
        //this.reRender()
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    reRender() {
        const newVNode = App(); // Génére un nouveau Virtual DOM
        const patches = diff(oldVNode, newVNode); // Compare l'ancien et le nouveau DOM virtuel
        patch(document.body, patches); // Applique les changements au vrai DOM
        oldVNode = newVNode; // Sauvegarde le nouveau Virtual DOM
    }

    patch(parent, patches, index = 0) {
        const $el = parent.childNodes[index]; // Le nœud DOM correspondant

        switch (patches.type) {
            case 'REPLACE':
                const newEl = render(patches.newNode); // Crée un nouvel élément à partir du nouveau DOM virtuel
                parent.replaceChild(newEl, $el);       // Remplace l'ancien élément
                break;

            case 'UPDATE':
                // Mettre à jour les props
                patches.props.forEach(({ key, value }) => {
                    $el[key] = value; // Applique les nouvelles propriétés
                });

                // Mettre à jour les enfants
                patches.children.forEach((childPatch, i) => {
                    patch($el, childPatch, i); // Applique récursivement les patchs sur les enfants
                });
                break;
        }
    }

    diff(oldVNode, newVNode) {
        if (oldVNode.tag !== newVNode.tag) {
            return { type: 'REPLACE', newNode: newVNode }; // Remplacer si les balises sont différentes
        }

        const patchProps = [];
        // Comparer les props (attributs)
        Object.keys(newVNode.props).forEach(key => {
            if (newVNode.props[key] !== oldVNode.props[key]) {
                patchProps.push({ key, value: newVNode.props[key] });
            }
        });

        const patchChildren = [];
        // Comparer les enfants
        for (let i = 0; i < newVNode.children.length; i++) {
            patchChildren.push(diff(oldVNode.children[i], newVNode.children[i]));
        }

        return {
            type: 'UPDATE',
            props: patchProps,
            children: patchChildren
        };
    }
}

export default useState