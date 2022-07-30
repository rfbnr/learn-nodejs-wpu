
const fs = require("fs");
const readLine = require("readline");

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Masukkan Nama Anda: ", (name) => {
    rl.question("Masukkan No Hp Anda: ", (no) => {
        const person = {
            Nama: name,
            NoHp: no
        };

        const file = fs.readFileSync("data/contacts.json", "utf-8");
        const contact = JSON.parse(file);
        
        contact.push(person);

        fs.writeFileSync("data/contacts.json", JSON.stringify(contact));

        console.log("Terima Kasih");


        rl.close();
    })
})
