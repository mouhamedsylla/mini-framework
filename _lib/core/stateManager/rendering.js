import { run, vdom } from "../runtime/runtime.js";

let globalContext = null;
let globalRoot = null;

function setContext(context) {
    globalContext = context;
}

function setRoot(root) {
    globalRoot = root;
}

function render() {
    const oldVDOM = vdom ? Object.assign({}, vdom) : null;

    run(
        globalContext,
        globalContext.App(),
    )

    const patches = diff(oldVDOM, vdom);
    console.log("patches: ", patches);

    patch(globalRoot, patches);
}

function patch(parent, patches, index = 0) {

    //console.log(`parent.childNodes (${index}): `, parent.childNodes);
    //console.log(`parent.childNodes[5]: `, parent.childNodes[5]);
    if (!parent.childNodes[5]) { return }
    const $el = parent.childNodes[index];
    if (!$el) { return }

    console.log("patches.type: ", patches.type);

    switch (patches.type) {
        case 'REPLACE':
            const newEl = createElement(patches.newNode); // Crée un nouvel élément à partir du nouveau DOM virtuel
            parent.replaceChild(newEl, $el);       // Remplace l'ancien élément
            break;

        case 'UPDATE':
            // Mettre à jour les props
            patches.props.forEach(({ key, value }) => {
                if ($el[key] !== value) {
                    $el[key] = value; // Appliquer les nouvelles propriétés uniquement si elles ont changé
                }
            });

            // Mettre à jour les enfants
            for (let i = 0; i < patches.children.length; i++) {
                patch($el, patches.children[i], i); // Patch récursif sur les enfants
            }
            break;
        case 'START':
            break

    }
}

function diff(oldVNode, newVNode) {
    /* console.log("oldVNode: ", oldVNode);
    console.log("newVNode: ", newVNode); */
    if (oldVNode === null) {
        return { type: 'START' }
    }

    if (oldVNode.tag !== newVNode.tag) {
        return { type: 'REPLACE', newNode: newVNode }; // Remplacer si les balises sont différentes
    }

    if (newVNode.props === null || newVNode.props === undefined) { return }

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

function createElement(vnode) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return document.createTextNode(vnode); // Créer un nœud de texte
    }

    const el = document.createElement(vnode.tag);
    // Appliquer les props
    if (vnode.props) {
        Object.keys(vnode.props).forEach(key => {
            el[key] = vnode.props[key];
        });
    }

    if (!vnode.children) { return el }

    // Ajouter les enfants
    vnode.children.forEach(child => {
        const childEl = createElement(child);
        el.appendChild(childEl);
    });

    return el;
}


export { render, setContext, setRoot, globalRoot }