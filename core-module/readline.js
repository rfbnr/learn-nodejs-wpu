
const readLine = require("readline");

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Masukkan Nama Anda: ", (name) => {
    rl.question("Umur Anda Saat Ini: ", (umur) => {
        if (umur < 18) {
            console.log("Anda belum cukup umur");
        } else {
            console.log(`Welcome To The Club, ${name}`);
        }
        rl.close();
    });
})
