
const fs = require("fs");

const readFile = fs.readFileSync("data/test-sync.txt", "utf8");

console.log(readFile);
