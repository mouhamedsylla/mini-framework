import  EventEmitter  from './emitter.js';

export default class Store {
    constructor(params) {
        let self = this;
        self.state = params.state || {};
        self.reducer = params.reducer || null;
        self.middlewares = params.middlewares || [];
        self.events = new EventEmitter();
        self.state = new Proxy(self.state, {
            set: function(state, key, value) {
                state[key] = value;
                self.events.publish("stateChange", self.state);
                return true;
            }
        });
    }

    dispatch(action) {
        let self = this;
        self.middlewares.forEach(middleware => {
            middleware(self, action);
        });

        self.commit(action);
        return true;
    }

    commit(action) {
        let self = this;
        let newState = self.reducer(self.state, action);
        self.state = Object.assign(self.state, newState);
        return true
    }
}