const fs = require("fs");
const path = require("path");
const pipeline = require("./middleware.js");

const obj = {
  sum: [100, 200],
  substraction: [1999, 999],
  multiply: [11, 12],
  divide: [9, 3],
};

const operationsToJSON = JSON.stringify(obj);

fs.writeFile("operationsFile.JSON", operationsToJSON, "utf8", (error) => {
  if (error) {
    throw new Error(error);
  }
});

const readdir = path.join(__dirname, "operationsFile.JSON");

fs.readFile(readdir, (error, data) => {
  if (error) {
    throw new Error(error);
  }
  let operationsToObject = JSON.parse(data);
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

  pipeline.execute(operationsToObject);
});
