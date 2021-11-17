function Pipeline(...middlewares) {
  const stack = middlewares;

  const push = (...middlewares) => {
    stack.push(...middlewares);
  };

  const execute = async (context) => {
    let prevIndex = -1;

    const runner = async (index) => {
      if (index === prevIndex) {
        throw new Error("next() called multiple times");
      }

      prevIndex = index;

      const middleware = stack[index];

      if (middleware) {
        await middleware(context, () => {
          return runner(index + 1);
        });
      }
    };

    await runner(0);
  };

  return { push, execute };
}

//  create a middleware pipeline
const pipeline = Pipeline(
  // with an initial middleware - number^2
  (obj, next) => {
    console.log("Initial numbers:", obj);
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      obj[key][0] = Math.pow(obj[key][0], 2);
    });
    keys.forEach((key) => {
      obj[key][1] = Math.pow(obj[key][1], 2);
    });

    console.log("Squaring the numbers:", obj);
    next();
  }
);

pipeline.push(
  // middleware - number^3
  (obj, next) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      obj[key][0] = Math.pow(obj[key][0], 3);
    });
    keys.forEach((key) => {
      obj[key][1] = Math.pow(obj[key][1], 3);
    });

    console.log("Cubing the numbers:", obj);
    next();
  },

  // middleware - dividing items
  (obj, next) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      const firstDivision = obj[key][0] / obj[key][1];
      const secondDivision = obj[key][1] / obj[key][0];
      obj[key][0] = firstDivision;
      obj[key][1] = secondDivision;
    });

    console.log("Dividing the numbers:", obj);
    next();
  },

  // last middleware - sum, substraction, multiply, divide
  (obj, next) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      switch (key) {
        case "sum":
          const sum = obj[key][0] + obj[key][1];
          console.log(`${key}: ${obj[key]} equals to: ${sum}`);
          break;
        case "substraction":
          const substraction = obj[key][0] - obj[key][1];
          console.log(`${key}: ${obj[key]} equals to: ${substraction}`);
          break;
        case "multiply":
          const multiply = obj[key][0] * obj[key][1];
          console.log(`${key}: ${obj[key]} equals to: ${multiply}`);
          break;
        case "divide":
          const divide = obj[key][0] / obj[key][1];
          console.log(`${key}: ${obj[key]} equals to: ${divide}`);
          break;
      }
    });
  }
);

module.exports = pipeline;
