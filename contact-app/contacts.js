
const fs = require("fs");
const validator = require("validator");
const chalk = require("chalk");


if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
};

if (!fs.existsSync("./data/contacts.json")) {
    fs.writeFileSync("./data/contacts.json", "[]", "utf8");
};


const loadContact = () => {
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contact = JSON.parse(file);
    return contact;
}

const saveContacts = (nama, email, noHP) => {
    const person = { nama, email, noHP };
    
    const contact = loadContact();

    // cek duplicate name
    const duplicateName = contact.find(contact => contact.nama === nama);
    if (duplicateName) {
        console.log(chalk.red.bold(`Contact "${nama}" sudah terdaftar, gunakan nama lain!`));
        return false;
    };

    // cek duplicate no hp
    const duplicateHp = contact.find(contact => contact.noHP === noHP);
    if (duplicateHp) {
        console.log(chalk.red.bold("No Hp sudah terdaftar!"));
        return false;
    }

    // cek email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.bold("Email Tidak Valid!"));
            return false;
        };
    };

    // cek no hp
    if (!validator.isMobilePhone(noHP, "id-ID")) {
        console.log(chalk.red.bold("No Hp Tidak Valid!"));
        return false;
    }


    contact.push(person);

    fs.writeFileSync("data/contacts.json", JSON.stringify(contact));

    console.log(chalk.green.bold("Terimakasih sudah memasukkan data"));

};

const listContacts = () => {
    const contacts = loadContact();
    console.log(chalk.green.bold("Daftar Kontak Anda :"));
    contacts.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.nama} - ${contact.noHP}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if (!contact) {
        console.log(chalk.red.bold(`"${nama}" Tidak ditemukan!`));
        return false;
    };

    const listDetailContact = () => {
        const email = chalk.red.bold("none")
        if (contact.email) {
            return (`nama: ${chalk.green.bold(`${contact.nama}`)}\nemail: ${contact.email}\nnoHP: ${contact.noHP}`);
        } else {
            return (`nama: ${chalk.green.bold(`${contact.nama}`)}\nemail: ${email}\nnoHP: ${contact.noHP}`);
        };
    };

    console.log(listDetailContact());
    
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === newContact.length) {
        console.log(chalk.red.bold(`"${nama}" Tidak ditemukan!`))
        return false;
    };

    fs.writeFileSync("data/contacts.json", JSON.stringify(newContact));

    console.log(chalk.green.bold(`Data contact "${nama}", berhasil dihapus!`));

}

module.exports = { saveContacts, listContacts, detailContact, deleteContact };
