const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

class Subject {
  constructor(subjectName) {
    this.subjectName = subjectName;
    this.observers = [];
  }

  get name() {
    return this.subjectName;
  }

  get observersArray() {
    return this.observers;
  }

  subscribe(fn) {
    this.observers.push(fn);
    console.log(`${fn.name} has been subscribed to ${this.subjectName} subject\n`);
  }

  unsubscribe(fnToRemove) {
    this.observers = this.observers.filter((fn) => {
      if (fn != fnToRemove) {
        return fn;
      }
    });
    console.log(
      `${fnToRemove.name} has been unsubscribed to ${this.subjectName} subject\n`
    );
  }

  notify() {
    eventEmitter.on(this.subjectName, (personName, message) => {
      console.log(`${this.subjectName}: ${personName} has posted a message\n`);
      this.observers.forEach((fn) => {
        console.log(
          `${fn.name} has listened message from ${this.subjectName} Subject: ${personName} has posted the next message: ${message}\n`
        );
      });
    });
  }
}

class User {
  constructor(name) {
    this.name = name;
  }

  post(subjectName, name, message) {
    if (name == this.name) {
      eventEmitter.emit(subjectName, this.name, message);
    } else {
      throw new Error("Incorrect Name");
    }
  }
}

const football = new Subject("Football");
const cyclism = new Subject("Cyclism");

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
