import Compiler from '../compiler/compile-mini.js';
import { EvalJS } from './evalJS.js';
import { updateDOM } from '../vdom/update.js';
import { mountDOM } from '../vdom/vdom.js';


// class Domino {
//     constructor(store) {
//         this.compiler = new Compiler(); 
//         this.vdom = null;              
//         this.oldVDOM = null;            
//         this.store = store;             
//         this.initialComponent = null;
//         this.actualRoute = "/"
//         this.routeChange = false
//     }

//     /**
//      * Exécute un composant avec un contexte donné et le monte dans le DOM.
//      */
//     run(context, component, root, route) {
//         console.log("RUN")
//         if (!this.initialComponent) {
//             this.initialComponent = component;
//             //this.actualRoute = route
//         } 

//         // Évaluation du code du composant avec le contexte
//         const evaluatedCode = EvalJS(component, context);
//         this.compiler.setCode(evaluatedCode);
//         this.compiler.setContext(context);
//         this.vdom = this.compiler.compile(); // Compilation en Virtual DOM

//         if (this.oldVDOM) {
//             console.log("UPDATE")
//             console.log("OLD VDOM: ",this.oldVDOM)
//             console.log("NEW VDOM: ",this.vdom)
//             updateDOM(this.oldVDOM, this.vdom, root); 
//         } else {
//             mountDOM(this.vdom, root, null); // Premier montage
//         }

//         this.oldVDOM = Object.assign({}, this.vdom);
//     }

//     /**
//      * Connecte un composant au store et gère les changements d'état.
//      */
//     connectComponent(context, component, root, path) {
//         const updateUI = (newState) => {  
//             this.run({ ...context, ...JSON.parse(JSON.stringify(newState)) }, this.initialComponent, root, this.actualRoute); // Met à jour l'UI avec le nouvel état
//         };

//         if (path !== this.actualRoute) {
//             this.routeChange = true
//             this.actualRoute = path
//             this.initialComponent = null
//         }
//         this.store.events.subscribe("stateChange", updateUI);
//         this.run({ ...context, ...this.store.state }, component, root, path); 
//     }

// }


// // const domino = new Domino();
// export default Domino;

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

        if (!this.initialComponent) {
            this.initialComponent = component;
        } 
        // Évaluation du code du composant avec le contexte
        const evaluatedCode = EvalJS(component, context);
        this.compiler.setCode(evaluatedCode);
        this.compiler.setContext(context);
        this.vdom = this.compiler.compile(); // Compilation en Virtual DOM

        // Mise à jour du DOM réel à partir du VDOM
        if (this.oldVDOM) {
            updateDOM(this.oldVDOM, this.vdom, root); // Mise à jour si l'ancien VDOM existe
        } else {
            mountDOM(this.vdom, root, null); // Premier montage
        }

        this.oldVDOM = Object.assign({}, this.vdom); // Sauvegarde du VDOM actuel pour les mises à jour futures
        //console.log('this.oldVDOM', this.oldVDOM)
    }

    /**
     * Connecte un composant au store et gère les changements d'état.
     */
    connectComponent(context, component, root) {
        const updateUI = (newState) => {
            this.run({ ...context, ...JSON.parse(JSON.stringify(newState)) }, this.initialComponent, root); // Met à jour l'UI avec le nouvel état
        };

        this.store.events.subscribe("stateChange", updateUI); // S'abonne aux changements d'état
        //this.initialComponent = component; // Sauvegarde le composant initial pour les mises à jour
       // console.log('this.initialComponent', component)
        this.run({ ...context, ...this.store.state }, component, root); // Exécute le composant avec l'état initial
    }
}


// const domino = new Domino();
export default Domino;