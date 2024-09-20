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
        this.actualRoute = "/"
        this.routeChange = false
    }

    /**
     * Exécute un composant avec un contexte donné et le monte dans le DOM.
     */
    run(context, component, root, route) {
        console.log("EXECUTION")
        if (route !== this.actualRoute || !this.initialComponent) {
            console.log("Component: ", component)
            console.log("Route: ", route)
            console.log("Initial Component: ", this.initialComponent)
            console.log("Actual Route: ", this.actualRoute)
            this.initialComponent = component;
            //this.actualRoute = route
        } 

        // Évaluation du code du composant avec le contexte
        const evaluatedCode = EvalJS(component, context);
        this.compiler.setCode(evaluatedCode);
        this.compiler.setContext(context);
        this.vdom = this.compiler.compile(); // Compilation en Virtual DOM

        if (this.oldVDOM && !this.routeChange) {
            updateDOM(this.oldVDOM, this.vdom, root); 
        } else {
            mountDOM(this.vdom, root, null); // Premier montage
        }

        this.oldVDOM = Object.assign({}, this.vdom);
    }

    /**
     * Connecte un composant au store et gère les changements d'état.
     */
    connectComponent(context, component, root, path) {
        const updateUI = (newState) => {  
            this.run({ ...context, ...JSON.parse(JSON.stringify(newState)) }, this.initialComponent, root, this.actualRoute); // Met à jour l'UI avec le nouvel état
        };

        if (path !== this.actualRoute) {
            this.routeChange = true
            this.actualRoute = path
            this.initialComponent = null
        }
        this.store.events.subscribe("stateChange", updateUI);
        this.run({ ...context, ...this.store.state }, component, root, path); 
    }

}


// const domino = new Domino();
export default Domino;