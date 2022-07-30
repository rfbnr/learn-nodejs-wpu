
const fs = require("fs");

fs.readFile("data/test-async.txt", "utf-8", (err, data) => {
    if (err) {
        throw err;
    } else {
        console.log(data);
    };
})
