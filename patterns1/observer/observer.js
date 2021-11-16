const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

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

  subscribe(fn) {
    this.observers.push(fn);
    console.log(`${fn.name} has been subscribed to ${this.themeName} theme\n`);
  }

  unsubscribe(fnToRemove) {
    this.observers = this.observers.filter((fn) => {
      if (fn != fnToRemove) {
        return fn;
      }
    });
    console.log(
      `${fnToRemove.name} has been unsubscribed to ${this.themeName} theme\n`
    );
  }

  notify() {
    eventEmitter.on(this.themeName, (personName, message) => {
      console.log(`${this.themeName}: ${personName} has posted a message\n`);
      this.observers.forEach((fn) => {
        console.log(
          `${fn.name} has listened message from Theme ${this.themeName}: ${personName} has posted the next message: ${message}\n`
        );
      });
    });
  }
}

class User {
  constructor(name) {
    this.name = name;
  }

  post(themeName, name, message) {
    if (name == this.name) {
      eventEmitter.emit(themeName, this.name, message);
    } else {
      throw new Error("Incorrect Name");
    }
  }
}

const football = new Theme("Football");
const cyclism = new Theme("Cyclism");

const oscar = new User("Oscar Vargas");
const josep = new User("Josep Pedredol");
const alberto = new User("Alberto Contador");

football.subscribe(oscar);
football.subscribe(josep);

cyclism.subscribe(oscar);
cyclism.subscribe(alberto);

football.notify();
cyclism.notify();

oscar.post("Football", oscar.name, "Messi and Ronaldo are incomparable");
oscar.post("Cyclism", oscar.name, "Eddy Merckx is the best cyclist ever");

football.unsubscribe(josep);
oscar.post("Football", oscar.name, "Ronaldo is incomparable");
