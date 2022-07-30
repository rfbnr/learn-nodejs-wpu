const fs = require("fs");

if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
}

if (!fs.existsSync("./data/contacts.json")) {
    fs.writeFileSync("./data/contacts.json", "[]", "utf8");
}

const loadContacts = () => {
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contact = JSON.parse(file);
    return contact;
};

const findContact = (nama) => {
    const contacts = loadContacts();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

const saveContact = (contacts) => {
    fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));
}

const addContact = (contact) => {
    const contacts = loadContacts();
    contacts.push(contact);
    saveContact(contacts);
};

const checkDuplicateName = (nama) => {
    const contacts = loadContacts();
    return contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
};

const deleteContact = (nama) => {
    const contacts = loadContacts();
    const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
    saveContact(filteredContacts);
};

const updateContact = (newContact) => {
    const contacts = loadContacts();
    const filteredContacts = contacts.filter((contact) => contact.nama !== newContact.oldNama);
    delete newContact.oldNama
    filteredContacts.push(newContact)
    saveContact(filteredContacts);
}

module.exports = {
    loadContacts,
    findContact,
    addContact,
    checkDuplicateName,
    deleteContact,
    updateContact
};
