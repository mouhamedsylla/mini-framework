import Compiler from '../compiler/compile-mini.js';
import { EvalJS } from './evalJS.js';
import { updateDOM } from '../vdom/rendering.js';
import { mountDOM } from '../vdom/vdom.js';

// const compiler = new Compiler()
// let vdom = null

// function run(context, component) {
//     const evalutedCode = EvalJS(component, context)
//     compiler.setCode(evalutedCode)
//     compiler.setContext(context)
//     vdom = compiler.compile()
// }

class Domino {
    constructor(store) {
        this.compiler = new Compiler(); 
        this.vdom = null;              
        this.oldVDOM = null;            
        this.store = store;             
        this.initialComponent = null; 
    }

    /**
     * Exécute un composant avec un contexte donné et le monte dans le DOM.
     */
    run(context, component, root) {

        if (!this.initialComponent) {
            this.initialComponent = component;
        } 

        // Évaluation du code du composant avec le contexte
        const evaluatedCode = EvalJS(component, context);
        this.compiler.setCode(evaluatedCode);
        this.compiler.setContext(context);
        this.vdom = this.compiler.compile(); // Compilation en Virtual DOM

        if (this.oldVDOM) {
            updateDOM(this.oldVDOM, this.vdom, root); 
        } else {
            mountDOM(this.vdom, root, null); // Premier montage
        }

        this.oldVDOM = Object.assign({}, this.vdom);
    }

    /**
     * Connecte un composant au store et gère les changements d'état.
     */
    connectComponent(context, component, root) {
        const updateUI = (newState) => {  
            this.run({ ...context, ...JSON.parse(JSON.stringify(newState)) }, this.initialComponent, root); // Met à jour l'UI avec le nouvel état
        };

        this.store.events.subscribe("stateChange", updateUI);
        this.run({ ...context, ...this.store.state }, component, root); 
    }
}


// const domino = new Domino();
export default Domino;