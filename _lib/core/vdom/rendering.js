export function updateDOM(oldVDOM, vdom, root) {


    const patches = diff(oldVDOM, vdom);
    console.log("patches: ", patches);

    patch(root, patches);
}

function patch(parent, patches, index = 0) {

    console.log("parent in patch: ", parent);
    //console.log(`parent.childNodes (${index}): `, parent.childNodes);
    //console.log(`parent.childNodes[5]: `, parent.childNodes[5]);
    const $el = parent.childNodes[index];
    if (!$el) {
        parent.appendChild(createElement(patches.newNode));
        return
        // const $el = parent.childNodes[index];
        // if (patches.children > 0) {
        //     patches.children.forEach((child, i) => {
        //         patch($el, child, i);
        //     });
        // }
    }

    console.log("Patches ******: ", patches);

    switch (patches?.type) {
        case 'REPLAzdzedCE':
            const newEl = createElement(patches.newNode); // Crée un nouvel élément à partir du nouveau DOM virtuel
            console.log("newEl: ", newEl);
            parent.replaceChild(newEl, $el);       // Remplace l'ancien élément
            break;

        case 'UPDATE':
            // Mettre à jour les 
            console.log("patches.props-------: ", patches.props);
            patches.props.forEach(({ key, value }) => {
                if ($el[key] !== value && key !== 'on') {
                    console.log("key: ", key);
                    console.log("VALUE ********: ", value);
                    $el[key] = value; // Appliquer les nouvelles propriétés uniquement si elles ont changé
                }
            });

            // Mettre à jour les enfants
            console.log("patches.children: ", patches.children);
            for (let i = 0; i < patches.children.length; i++) {
                console.log("CHILD PATCHS:", patches.children[i], $el); 
                
                patch($el, patches.children[i], i); // Patch récursif sur les enfants
            }
            break;

    }
}

function diff(oldVNode, newVNode) {

    if (oldVNode?.tag !== newVNode?.tag) {
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
    if (vnode.type === 'text') {
        return document.createTextNode(vnode.value); // Créer un nœud de texte
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
