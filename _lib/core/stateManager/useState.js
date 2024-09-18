import { render } from "./rendering.js";

function useState(initialValue) {
    let stateContainer = { value: initialValue };

    const getState = () => stateContainer.value;

    const setState = newValue => {
        stateContainer.value = newValue;

        console.log("getState(): ", getState());

        render()
    };

    return [getState(), setState];
}


export default useState