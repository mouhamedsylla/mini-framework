export function updateDOM(oldVDOM, vdom, root) {
    const patches = diff(oldVDOM, vdom, root, root);
    patch(root, patches);
}

function patch(parent, patches, index = 0) {
    if (!patches) { return; }

    switch (patches?.type) {
        case 'ADD':
            const newEl = createElement(patches.newNode); // Crée un nouvel élément à partir du nouveau DOM virtuel
            patches.parent.appendChild(newEl);
            break;

        case 'REMOVE':
            patches.element.remove();
            break;

        case 'UPDATE':
            if (!parent.childNodes[index]) {
                return;
            }

            const $el = parent.childNodes[index];

            // Mettre à jour les propriétés
            patches.props.forEach(({ key, value }) => {
                if ($el[key] !== value && key !== 'on') {
                    $el[key] = value; // Appliquer les nouvelles propriétés uniquement si elles ont changé
                }
            });

            // Mettre à jour les enfants
            patches.children.forEach((childPatch, i) => {
                patch($el, childPatch, i); // Patch récursif sur les enfants
            });
            break;

        case 'REMOVE':
            // Suppression de l'enfant basé sur l'index
            if (parent.childNodes[index]) {
                parent.removeChild(parent.childNodes[index]); // Supprimer l'enfant à l'index donné
            }
            break;

        case 'PASS':
            break;
    }
}

function diff(oldVNode, newVNode, element, parentEl = null) {

    console.log("newVNode: ", newVNode);
    if (!newVNode) {
        return { type: 'REMOVE', element: element }; // Si le nouveau VNode est absent, on le supprime
    }

    if (oldVNode?.tag !== newVNode?.tag) {
        return { type: 'ADD', parent: parentEl, element: element, newNode: newVNode }; // Remplacer si les balises sont différentes
    }

    if (newVNode.props === null || newVNode.props === undefined) { return; }

    const patchProps = [];
    // Comparer les props (attributs)
    Object.keys(newVNode.props).forEach(key => {
        if (newVNode.props[key] !== oldVNode.props[key]) {
            patchProps.push({ key, value: newVNode.props[key] });
        }
    });

    const patchChildren = [];
    const maxChildrenLength = Math.max(oldVNode.children.length, newVNode.children.length);
    for (let i = 0; i < maxChildrenLength; i++) {
        const child = diff(oldVNode.children[i], newVNode.children[i], element.childNodes[i], element)
        if (child !== undefined) {
            patchChildren.push(child);
        }
    }

    if (patchProps.length === 0 && patchChildren.length === 0) {
        return { type: 'PASS', element: element, parent: parentEl };
    }

    return {
        type: 'UPDATE',
        element: element,
        props: patchProps,
        children: patchChildren,
        parent: parentEl
    };
}

function createElement(vnode) {
    if (vnode.type === 'text') {
        return document.createTextNode(vnode.value);
    }

    const el = document.createElement(vnode.tag);

    // Appliquer les props
    if (vnode.props) {
        Object.keys(vnode.props).forEach(key => {
            el[key] = vnode.props[key];
        });
    }

    if (!vnode.children) { return el; }

    // Ajouter les enfants
    vnode.children.forEach(child => {
        const childEl = createElement(child);
        el.appendChild(childEl);
    });

    return el;
}
