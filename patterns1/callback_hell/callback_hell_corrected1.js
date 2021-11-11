const { readdir, readFile, writeFile } = require("fs");
const { join } = require("path");
const inbox = join(__dirname, "inbox");
const outbox = join(__dirname, "outbox");

const reverseText = (str) => str.split("").reverse().join("");

const directoryFiles = (error, files) => {
  if (error) return console.log("Error: Folder inaccessible");
  files.forEach((file) => readElements(file));
};

const readElements = (file) => {
  const readResult = (error, data) => {
    if (error) return console.log("Error: File error");
    fileReversion(data);
  };

  const fileReversion = (data) => {
    writeFile(join(outbox, file), reverseText(data), (error) => {
      if (error) return console.log("Error: File could not be saved!");
      console.log(`${file} was successfully saved in the outbox!`);
    });
  };
  
  readFile(join(inbox, file), "utf8", readResult);
};

// Read and reverse contents of text files in a directory
readdir(inbox, directoryFiles);
