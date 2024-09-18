import { run, vdom } from "../runtime/runtime.js";
import { mountDOM, unmountDOM } from "../vdom/vdom.js"

let globalContext = null;
let globalRoot = null;

function setContext(context) {
    globalContext = context;
}

function setRoot(root) {
    globalRoot = root;
}

function render() {
    const oldVDOM = Object.assign({}, vdom)

    run(
        globalContext,
        globalContext.App(),
    )

    const patches = diff(oldVDOM, vdom);
    patch(globalRoot, patches);

    mountDOM(vdom, globalRoot)
}

function patch(parent, patches, index = 0) {

    const $el = parent.childNodes[index]; // Le nœud DOM correspondant
    if (!$el) {
        return;
    }

    console.log("patches.type: ", patches.type);
    
    switch (patches.type) {
        case 'REPLACE':
            //const newEl = render(patches.newNode); // Crée un nouvel élément à partir du nouveau DOM virtuel
            //parent.replaceChild(newEl, $el);       // Remplace l'ancien élément
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
    console.log("oldVNode: ", oldVNode);
    console.log("newVNode: ", newVNode);
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

export { render, setContext, setRoot }