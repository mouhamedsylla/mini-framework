import Compiler from '../compiler/compile-mini.js';
import { EvalJS } from './evalJS.js';
import { updateDOM } from '../vdom/update.js';
import { mountDOM } from '../vdom/vdom.js';

class Domino {
    constructor(store) {
        this.compiler = new Compiler(); // Instance du compilateur pour transformer les templates en VDOM
        this.vdom = null;               // Virtual DOM actuel
        this.oldVDOM = null;            // Ancien Virtual DOM pour les mises à jour
        this.store = store;             // Store global pour la gestion de l'état
        this.initialComponent = null;   // Composant initial pour les mises à jour
    }

    /**
     * Exécute un composant avec un contexte donné et le monte dans le DOM.
     */
    run(context, component, root) {
        console.log("Running component with context: ", context);

        // if (!this.initialComponent) {
        //     this.initialComponent = component;
        // } 
        // Évaluation du code du composant avec le contexte
        const evaluatedCode = EvalJS(component, context);
        console.log("Evaluated code: ", evaluatedCode);
        this.compiler.setCode(evaluatedCode);
        this.compiler.setContext(context);
        this.vdom = this.compiler.compile(); // Compilation en Virtual DOM

        // Mise à jour du DOM réel à partir du VDOM
        if (this.oldVDOM) {
            updateDOM(this.oldVDOM, this.vdom, root); // Mise à jour si l'ancien VDOM existe
        } else {
            mountDOM(this.vdom, root, 1); // Premier montage
        }

        this.oldVDOM = Object.assign({}, this.vdom); // Sauvegarde du VDOM actuel pour les mises à jour futures
    }

    /**
     * Connecte un composant au store et gère les changements d'état.
     */
    connectComponent(context, component, root) {
        const updateUI = (newState) => {
            console.log("State changed: ", JSON.parse(JSON.stringify(newState)));
            this.run({ ...context, ...JSON.parse(JSON.stringify(newState)) }, this.initialComponent, root); // Met à jour l'UI avec le nouvel état
        };

        this.initialComponent = component; // Sauvegarde le composant initial
        this.store.events.subscribe("stateChange", updateUI); // S'abonne aux changements d'état
        this.run({ ...context, ...this.store.state }, this.initialComponent, root); // Exécute le composant avec l'état initial
    }
}


// const domino = new Domino();
export default Domino;