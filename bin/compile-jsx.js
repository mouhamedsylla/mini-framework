import fs from 'fs';
import { h, hString } from '../src/core/dom/vdom.js';

const filePath = './src/App.jsx';
const code = fs.readFileSync(filePath, 'utf-8');
const regex = /(?<=\()\s*<[^>]+>([^]*?)<\/[^>]+>\s*(?=\))/;

let vdom = null;

const parse = (markup) => {
    const pattern = /<!--([^]*?(?=-->))-->|<(\/|!)?([a-z][a-z0-9-]*)\s*([^>]*?)(\/?)>/gi;
    let lastIndex = 0;
    let match = null;

    //let children = [];
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
            //const props = getAttributes(attributes);
            const node = h(tagName, {}, []);
            node.props = getAttributes(attributes);
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

function getAttributes(attributes) {
    const props = {};
    attributes = attributes.trim();
    if (!attributes) {
        return props;
    }

    const attrPattern = /([a-z][\w-.:]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/gi;
    let match = null;
    while ((match = attrPattern.exec(attributes)) !== null) {
        const name = match[1];
        const value = match[2] || match[3] || match[4] || '';
        props[name] = value;
    }
    return props;
}

export default function compileJSX() {
    let jsx;
    
    const match = code.match(regex);
    if (match) {
        jsx = match[0].trim();
        parse(jsx);
    }

     
    return vdom
}

console.log(compileJSX());