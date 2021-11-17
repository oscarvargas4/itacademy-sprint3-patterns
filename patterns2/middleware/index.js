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
  pipeline.execute(operationsToObject);
});
