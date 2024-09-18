import  EventEmitter  from './emitter.js';

export default class Store {
    constructor(params) {
        let self = this;
        self.state = {};
        self.reducer = params.reducer || null;
        self.middlewares = params.middlewares || [];
        self.events = new EventEmitter();
        self.state = new Proxy(self.state, {
            set: function(state, key, value) {
                state[key] = value;
                console.log('stateChange', key, value);
                self.events.publish("stateChange", self.state);
                console.log('new state: ', state);

                return true;
            }
        });
    }

    dispatch(action) {
        console.log('dispatching', action);
        let self = this;

        self.middlewares.forEach(middleware => {
            middleware(self, action);
        });

        self.commit(action);
        return true;
    }

    commit(action) {
        console.log('committing', action);
        let self = this;
        let newState = self.reducer(self.state, action);
        self.state = Object.assign(self.state, newState);
        return true
    }
}