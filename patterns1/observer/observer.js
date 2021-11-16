const EventEmitter = require('events');
const eventEmitter = new EventEmitter()


class Theme {
    constructor(themeName) {
        this.themeName = themeName;
        this.observers = [];
    }

    get name() {
        return this.themeName;
    }

    get observersArray() {
        return this.observers;
    }

    subscribe (fn) {
        this.observers.push(fn);
        console.log(`${fn.name} has been subscribed to ${this.themeName} theme`);

        this.notify()
    } 

    unsubscribe (fnToRemove) {
        this.observers = this.observers.filter(fn => {
            if (fn != fnToRemove) {
                return fn;
            }
        })
        console.log(`${fnToRemove.name} has been unsubscribed to ${this.themeName} theme`);

        this.notify()
    }

    notify () {
        eventEmitter.on(this.themeName, (personName, message) => {
            console.log(`${this.themeName}: ${personName} has posted a message\n`)
        })
        this.observers.forEach(fn => {
            eventEmitter.on(this.themeName, (personName, message) => {
                console.log(`${fn.name} has listened message from Theme ${this.themeName}: ${personName} has posted the next message: ${message}`);
            })
        })
    }
}

class User {
    constructor(name) {
        this.name = name;
    }

    post(themeName, name, message) {
        eventEmitter.emit(themeName, this.name, message);
    }
}

const football = new Theme("football");
const cyclism = new Theme("cyclism");

const oscar = new User("Oscar Vargas");
const josep = new User("Josep Pedredol");
const alberto = new User("Alberto Contador")

football.subscribe(oscar);
football.subscribe(josep);
// football.notify();
// console.log(football.observersArray);

cyclism.subscribe(oscar);
cyclism.subscribe(alberto);

oscar.post("football", oscar.name, "Messi and Ronaldo are incomparable");
oscar.post("cyclism", oscar.name, "Eddy Merckx is the best cyclist ever");

football.unsubscribe(josep);
// console.log(football.observersArray);
oscar.post("football", oscar.name, "Ronaldo is incomparable");