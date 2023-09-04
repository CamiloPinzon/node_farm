const fs = require("fs");

// Blocking syncronous way
/*const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
const textOutput = `This is what we know about the avocado: ${textInput} \nCreated on: ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOutput);
console.log("File Created");*/

//NON-Blocking asycronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.error("Your file has been written!");
      });
    });
  });
});
console.log("Reading data ...");
