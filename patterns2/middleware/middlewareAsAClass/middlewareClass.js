// MIDDLEWARE CLASS

class Middleware {
  constructor() {
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  executeMiddleware(middlewares, data, next) {
    const composition = middlewares.reduceRight(
      (next, fn) => (v) => {
        // collect next data
        let obj = data;
        fn(obj, next);
      },
      next
    );
    composition(data);
  }

  run(data) {
    this.executeMiddleware(this.middlewares, data, (obj, next) => {
      // console.log(data);
    });
  }
}
module.exports = Middleware;

// Exemple:
// In index.js file:
// const Middleware = require('./Middleware');
// const middleware = new Middleware();

// "use strict";
// let obj = { msg: '' };

// middleware.use(function(obj, next) {
//     obj.msg += ' World';
//     next();
// });

// middleware.use(function(obj, next) {
//     obj.msg += ' !!!';
//     next();
// });

// // Run the middleware with initial value
// middleware.run({msg: 'Hello'});

// Output: 'Hello World !!!'
