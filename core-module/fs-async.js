
const fs = require("fs");

const data = "Hello World secara Asynchronous"

fs.writeFile("data/test-async.txt", data, "utf-8", (err) => {
    if (err) {
        throw err;
    };
    console.log("The file has been saved");
})
