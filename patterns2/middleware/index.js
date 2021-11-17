const fs = require("fs");
const path = require("path");

const obj = {
  sum: [100, 200],
  substraction: [1999, 999],
  multiply: [11, 11],
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
  const operationsToObject = JSON.parse(data);
  objectOperationsIterator(operationsToObject);
});

const objectOperationsIterator = (obj) => {
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
};
