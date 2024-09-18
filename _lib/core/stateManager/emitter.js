export default class EventEmitter {
    constructor() {
        this.events = {}
    }

    subscribe(event, callback) {
        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = []
        }
        console.log("subscribing to event", event)
        this.events[event].push(callback)
    }

    publish(event, data = {}) {
        if (!this.events.hasOwnProperty(event)) {
            return []
        }

        console.log("publishing event", event)
        console.log("publishing event", event)
        return this.events[event].map(callback => callback(data))
    }
}