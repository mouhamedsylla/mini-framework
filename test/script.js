// import { h, hString } from "../src/core/dom/vdom.js";

// let vdom = null;

// const parse = (markup) => {
//     const pattern = /<!--([^]*?(?=-->))-->|<(\/|!)?([a-z][a-z0-9-]*)\s*([^>]*?)(\/?)>/gi;
//     let lastIndex = 0;
//     let match = null;

//     let children = null;
//     let openedParents = []; 
//     let lastCloseNode = null;

//     while ((match = pattern.exec(markup)) !== null) {
//         console.log(openedParents)
//         const [, comment, bangOrClosingSlash, tagName, attributes, selfClosingSlash] = match;

//         // Ajouter le texte entre les balises comme un nœud texte
//         if (match.index > lastIndex) {
//             let text = markup.slice(lastIndex, match.index).trim();
//             if (text) {
//                 const node = hString(text);
//                 openedParents[openedParents.length - 1].children.push(node);  // Add to the current open element
//             }
//         }
        
//         lastIndex = pattern.lastIndex;

//         // Si c'est une balise auto-fermante
//         if (selfClosingSlash) {
//             const node = h(tagName, {}, []);
//             openedParents[openedParents.length - 1].children.push(node);  // Add to current open element
//             continue;
//         }

//         // Si c'est une balise de fermeture
//         if (bangOrClosingSlash) {
//             if (openedParents.length > 1) {
//                 openedParents.pop();  // Close the last opened element
//             }
//             lastCloseNode = tagName;
//             continue;
//         }

//         // Si c'est une nouvelle balise ouvrante
//         if (tagName) {
//             const node = h(tagName, {}, []);

//             if (!children) {
//                 children = node
//                 vdom = node
//                 openedParents.push(node);
//             }

//             openedParents[openedParents.length - 1].children.push(node);  // Add to current open element
//             if (!selfClosingSlash) {
//                 openedParents.push(node);  // Keep track of the open element
//             }
//         }
//     }

//     // Ajouter le texte restant après la dernière balise
//     if (lastIndex < markup.length) {
//         let text = markup.slice(lastIndex).trim();
//         if (text) {
//             const node = hString(text);
//             openedParents[openedParents.length - 1].children.push(node);
//         }
//     }
// }


import { h, hString } from '../src/core/dom/vdom.js';


const regex = /<([^>]+)>([^]*?)<\/\1>/g;

let vdom = null;

const parse = (markup) => {
    const pattern = /<!--([^]*?(?=-->))-->|<(\/|!)?([a-z][a-z0-9-]*)\s*([^>]*?)(\/?)>/gi;
    let lastIndex = 0;
    let match = null;

    let children = [];
    let openedParents = [];

    while ((match = pattern.exec(markup)) !== null) {
        const [, comment, bangOrClosingSlash, tagName, attributes, selfClosingSlash] = match;

        // Ajouter le texte entre les balises comme un nœud texte
        if (match.index > lastIndex) {
            let text = markup.slice(lastIndex, match.index).trim();
            if (text) {
                const node = hString(text);
                if (openedParents.length > 0) {
                    openedParents[openedParents.length - 1].children.push(node);
                }
            }
        }
        
        lastIndex = pattern.lastIndex;

        // Si c'est une balise auto-fermante
        if (selfClosingSlash) {
            const node = h(tagName, {}, []);
            if (openedParents.length > 0) {
                openedParents[openedParents.length - 1].children.push(node);
            }
            continue;
        }

        // Si c'est une balise de fermeture
        if (bangOrClosingSlash) {
            if (openedParents.length > 1) {
                openedParents.pop();  // Fermer le dernier élément ouvert
            }
            continue;
        }

        // Si c'est une nouvelle balise ouvrante
        if (tagName) {
            const node = h(tagName, {}, []);
            if (!vdom) {
                vdom = node;
            }
            if (openedParents.length > 0) {
                openedParents[openedParents.length - 1].children.push(node);
            }
            if (!selfClosingSlash) {
                openedParents.push(node);  // Garder la trace de l'élément ouvert
            }
        }
    }

    // Ajouter le texte restant après la dernière balise
    if (lastIndex < markup.length) {
        let text = markup.slice(lastIndex).trim();
        if (text) {
            const node = hString(text);
            if (openedParents.length > 0) {
                openedParents[openedParents.length - 1].children.push(node);
            }
        }
    }
}


const htmlString = `
<div>
<img src="image.jpg" alt="Image" />
</div>
`



parse(htmlString);
console.log(vdom);