import { h, hString } from '../vdom/vdom.js';

export default class Compiler {
    constructor() {
        this.vdom = null;
        this.code = null
        this.regex = /(?<=\()\s*<[^>]+>([^]*?)<\/[^>]+>\s*(?=\))/;
        this.context = {};
    }

    parse() {
        const pattern = /<!--([^]*?(?=-->))-->|<(\/|!)?([a-z][a-z0-9-]*)\s*([^>]*?)(\/?)>/gi;
        let lastIndex = 0;
        let match = null;
        this.vdom = null;

        let openedParents = [];

        while ((match = pattern.exec(this.code)) !== null) {
            const [, comment, bangOrClosingSlash, tagName, attributes, selfClosingSlash] = match;

            if (match.index > lastIndex) {
                let text = this.code.slice(lastIndex, match.index);
                
                if (text) {
                    const node = hString(text);

                    if (openedParents.length > 0) {
                        openedParents[openedParents.length - 1].children.push(node);
                    }
                }
            }

            lastIndex = pattern.lastIndex;

            if (selfClosingSlash) {
                const node = h(tagName, {}, []);
                node.props = this.getAttributes(attributes);
                if (openedParents.length > 0) {
                    openedParents[openedParents.length - 1].children.push(node);
                }
                continue;
            }

            if (bangOrClosingSlash) {
                if (openedParents.length > 1) {
                    openedParents.pop();
                }
                continue;
            }

            if (tagName) {
                const node = h(tagName, {}, []);
                node.props = this.getAttributes(attributes);
                if (!this.vdom) {
                    this.vdom = node;
                }
                if (openedParents.length > 0) {
                    openedParents[openedParents.length - 1].children.push(node);
                }
                if (!selfClosingSlash) {
                    openedParents.push(node);
                }
            }
        }

        if (lastIndex < this.code.length) {
            let text = this.code.slice(lastIndex).trim();
            if (text) {
                const node = hString(text);
                if (openedParents.length > 0) {
                    openedParents[openedParents.length - 1].children.push(node);
                }
            }
        }
    }


    getAttributes(attributes) {
        const props = {};
        attributes = attributes.trim();
        if (!attributes) {
            return props;
        }

        const attrPattern = /([a-z][\w-.:]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/gi;
        let match = null;
        while ((match = attrPattern.exec(attributes)) !== null) {
            const name = match[1];
            let value = match[2] || match[3] || match[4] || '';
  
            let eventHanlder = {};
            if (name.startsWith('on')) {
                const event = name.slice(2).toLowerCase();
                eventHanlder[`${event}`] = this.context[value];
            }

            name.startsWith('on') ? props['on'] = eventHanlder : props[name] = value;

        }
        return props;
    }


    setCode(code) {
        this.code = code;
    }

    setContext(context) {
        this.context = context;
    }

    compile() {
        this.parse()
        return this.vdom;
    }
}



