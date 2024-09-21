// export function updateDOM(oldVDOM, vdom, root) {
//     const patches = diff(oldVDOM, vdom, root, root);

//     patch(root, patches);
// }

// function patch(parent, patches, index = 0) {
//     if (!patches) { return; }

//     switch (patches?.type) {
//         case 'ADD':
//             const newEl = createElement(patches.newNode); // Crée un nouvel élément à partir du nouveau DOM virtuel
//             patches.parent.appendChild(newEl);
//             break;

//         case 'REMOVE':
//             patches.element.remove();
//             break;

//         case 'UPDATE':
//             if (!parent.childNodes[index]) {
//                 return;
//             }

//             const $el = parent.childNodes[index];

//             // Mettre à jour les propriétés
//             patches.props.forEach(({ key, value }) => {
//                 if ($el[key] !== value && key !== 'on') {
//                     $el[key] = value; // Appliquer les nouvelles propriétés uniquement si elles ont changé
//                 }
//             });

//             // Mettre à jour les enfants
//             patches.children.forEach((childPatch, i) => {
//                 patch($el, childPatch, i); // Patch récursif sur les enfants
//             });
//             break;

//         case 'REMOVE':
//             // Suppression de l'enfant basé sur l'index
//             if (parent.childNodes[index]) {
//                 parent.removeChild(parent.childNodes[index]); // Supprimer l'enfant à l'index donné
//             }
//             break;

//         case 'PASS':
//             break;
//     }
// }

// function diff(oldVNode, newVNode, element, parentEl = null) {

//     if (!newVNode) {
//         return { type: 'REMOVE', element: element }; // Si le nouveau VNode est absent, on le supprime
//     }

//     if (oldVNode?.tag !== newVNode?.tag) {
//         return { type: 'ADD', parent: parentEl, element: element, newNode: newVNode }; // Remplacer si les balises sont différentes
//     }

//     if (newVNode.props === null || newVNode.props === undefined) { return; }

//     const patchProps = [];
//     // Comparer les props (attributs)
//     Object.keys(newVNode.props).forEach(key => {
//         if (newVNode.props[key] !== oldVNode.props[key]) {
//             patchProps.push({ key, value: newVNode.props[key] });
//         }
//     });

//     const patchChildren = [];
//     const maxChildrenLength = Math.max(oldVNode.children.length, newVNode.children.length);
//     for (let i = 0; i < maxChildrenLength; i++) {
//         const child = diff(oldVNode.children[i], newVNode.children[i], element.childNodes[i], element)
//         if (child !== undefined) {
//             patchChildren.push(child);
//         }
//     }

//     if (patchProps.length === 0 && patchChildren.length === 0) {
//         return { type: 'PASS', element: element, parent: parentEl };
//     }

//     return {
//         type: 'UPDATE',
//         element: element,
//         props: patchProps,
//         children: patchChildren,
//         parent: parentEl
//     };
// }

// function createElement(vnode) {
//     if (vnode.type === 'text') {
//         return document.createTextNode(vnode.value);
//     }

//     const el = document.createElement(vnode.tag);

//     // Appliquer les props
//     if (vnode.props) {
//         Object.keys(vnode.props).forEach(key => {
//             el[key] = vnode.props[key];
//         });
//     }

//     if (!vnode.children) { return el; }

//     // Ajouter les enfants
//     vnode.children.forEach(child => {
//         const childEl = createElement(child);
//         el.appendChild(childEl);
//     });

//     return el;
// }

function updateDOM(oldVDOM, vdom, root) {
    const patches = diff(oldVDOM, vdom, root);
    console.log("$$$$$$$$$$$$$$$$$$$$")
    console.log("PATCHES: ", patches);
    console.log("&&&&&&&&&&&&&&&&&&&&")

    patch(root, patches);
}

function patch(parent, patches, index = 0) {
    if (!patches) { return; }

    switch (patches?.type) {
        case 'ADD':
            // Si un élément doit être ajouté, on le crée à partir du Virtual DOM
            const newEl = createElement(patches.newNode); // Crée un nouvel élément à partir du nouveau DOM virtuel
            if (patches.parent) {
                patches.parent.appendChild(newEl); // Ajoute le nouvel élément à son parent
            } else {
                parent.appendChild(newEl); // Ajoute l'élément au parent par défaut
            }
            break;

        case 'REMOVE':
            if (patches.element) {
                patches.element.remove(); // Supprime l'élément s'il existe
            } else if (parent.childNodes[index]) {
                parent.removeChild(parent.childNodes[index]); // Supprime l'enfant basé sur l'index
            }
            break;

        case 'UPDATE':
            // Met à jour les propriétés et enfants d'un élément existant
            const $el = parent.childNodes[index];
            if (!$el) {
                return; // Si l'élément n'existe pas, on arrête
            }

            // Mettre à jour les propriétés de l'élément
            patches.props.forEach(({ key, value }) => {
                if ($el[key] !== value && key !== 'on') {
                    $el[key] = value; // Applique les nouvelles propriétés uniquement si elles ont changé
                }
            });

            // Appliquer récursivement les patches sur les enfants
            patches.children.forEach((childPatch, i) => {
                patch($el, childPatch, i); // Patch récursif sur les enfants
            });
            break;

        case 'PASS':
            // Aucun changement à faire
            break;

        default:
            console.error('Patch non reconnu', patches);
            break;
    }
}


// function patch(parent, patches, index = 0) {

//     if (!patches) { return }

//     console.log("Calling patch on parent: ", parent, "with index:", index, "with parent.nodeType:", parent.nodeType);

//     console.log(`parent.childNodes: `, parent.childNodes);
//     console.log(`parent.childNodes.length: `, parent.childNodes.length);
//     console.log("Patches ******: ", patches);

//     console.log(`parent.childNodes[${index}]: `, parent.childNodes[index]);



//     switch (patches?.type) {
//         case 'ADD':
//             const newEl = createElement(patches.newNode); // Crée un nouvel élément à partir du nouveau DOM virtuel
//             patches.parent.insertBefore(newEl, patches.parent.firstChild);
//             break;

//         case 'UPDATE':
//             // Mettre à jour les 
//             if (!parent.childNodes[index]) {
//                 return
//             }

//             const $el = parent.childNodes[index];

//             patches.props.forEach(({ key, value }) => {
//                 if ($el[key] !== value && key !== 'on') {
//                     console.log("key: ", key);
//                     console.log("VALUE ********: ", value);
//                     $el[key] = value; // Appliquer les nouvelles propriétés uniquement si elles ont changé
//                 }
//             });

//             //console.log("patches.children", patches.children);
//             // Mettre à jour les enfants
//             patches.children.forEach((childPatch, i) => {
//                 patch($el, childPatch, i); // Patch récursif sur les enfants
//             });

//             break;
//         case 'PASS':
//             break
//     }
// }

function diff(oldVNode, newVNode, parentEl) {
    if (oldVNode?.tag !== newVNode?.tag) {
        return { type: 'ADD', parent: parentEl, newNode: newVNode }; // Remplacer si les balises sont différentes
    }

    if (oldVNode.type === 'text' && newVNode.type === 'text') {
        if (oldVNode.value !== newVNode.value) {
            return { type: 'UPDATE', element: parentEl, newNode: newVNode };
        }
    }


    // Comparer les props (attributs)
    const patchProps = [];
    // Object.keys(oldVNode.props).forEach(key => {
    //     if (!newVNode.props[key]) {
    //         patchProps.push({ key, value: null });
    //     }
    // });

    // Object.keys(newVNode.props).forEach(key => {
    //     if (newVNode.props[key] !== oldVNode.props[key]) {
    //         patchProps.push({ key, value: newVNode.props[key] });
    //     }
    //     if (key === 'on') {
    //         Object.keys(newVNode.props[key]).forEach(event => {
    //             if (newVNode.props[key][event] !== oldVNode.props[key][event]) {
    //                 patchProps.push({ key, value: newVNode.props[key] });
    //             }
    //         });
    //     }
    //     if (key === 'style') {
    //         Object.keys(newVNode.props[key]).forEach(style => {
    //             if (newVNode.props[key][style] !== oldVNode.props[key][style]) {
    //                 patchProps.push({ key, value: newVNode.props[key] });
    //             }
    //         });
    //     }

    // });


    const patchChildren = [];
    // Comparer les enfants
    console.log("ParentEl: ", parentEl);
    for (let i = 0; i < newVNode.children?.length; i++) {
        if (parentEl?.childNodes[i]?.nodeName === '#text') {
            const child = diff(oldVNode.children[i], newVNode.children[i], parentEl);
            if (child !== undefined) {
                patchChildren.push(child);
            }
        } else {
            const child = diff(oldVNode.children[i], newVNode.children[i], parentEl);
            if (child !== undefined) {
                patchChildren.push(child);
            }
        }
    }

    if (patchProps.length === 0 && patchChildren.length === 0) {
        return { type: 'PASS', element: parentEl };
    }

    return {
        type: 'UPDATE',
        props: patchProps,
        children: patchChildren,
        parent: parentEl
    };
}

// function diff(oldVNode, newVNode, element, parentEl = null) {
//     console.log("OLD VNODE: ", oldVNode);
//     console.log("NEW VNODE: ", newVNode);
//     if (!newVNode) {
//         // Si le nouveau VNode est absent, on supprime l'élément
//         return { type: 'REMOVE', element };
//     }

//     // Si l'ancien ou le nouveau VNode est de type 'text'
//     if (oldVNode?.type === 'text' || newVNode?.type === 'text') {
//         if (oldVNode?.value !== newVNode?.value) {
//             return {
//                 type: 'UPDATE',
//                 props: [{ key: 'nodeValue', value: newVNode.value }],
//             };
//         }
//         return { type: 'PASS' }; // Pas de changement si les valeurs sont identiques
//     }

//     // Si les balises sont différentes, on remplace entièrement
//     if (oldVNode?.tag !== newVNode?.tag) {
//         return { type: 'ADD', parent: parentEl, newNode: newVNode };
//     }

//     // Comparaison des propriétés (attributs)
//     const patchProps = [];
//     if (newVNode.props && oldVNode.props) {
//         Object.keys(newVNode.props).forEach((key) => {
//             if (newVNode.props[key] !== oldVNode.props[key]) {
//                 patchProps.push({ key, value: newVNode.props[key] });
//             }
//         });
//     }

//     const patchChildren = [];
//     // Comparer les enfants
//     for (let i = 0; i < newVNode.children.length; i++) {
//         const child = diff(oldVNode.children[i], newVNode.children[i], element.childNodes[i], element)
//         if (child !== undefined) {
//             patchChildren.push(child);
//         }
//     }

//     // Si rien n'a changé, on passe
//     if (patchProps.length === 0 && patchChildren.length === 0) {
//         return { type: 'PASS', element, parent: parentEl };
//     }

//     return {
//         type: 'UPDATE',
//         element,
//         props: patchProps,
//         children: patchChildren,
//         parent: parentEl,
//     };
// }


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

    if (!vnode.children) { return el }

    // Ajouter les enfants
    vnode.children.forEach(child => {
        const childEl = createElement(child);
        el.appendChild(childEl);
    });

    return el;
}
