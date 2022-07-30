
const yargs = require('yargs');
const { saveContacts, listContacts, detailContact, deleteContact } = require('./contacts');


yargs.command({
    command: "add",
    describe: "Menambahkan Contact Baru",
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string",
        },
        email: {
            describe: "Nama Lengkap",
            demandOption: false,
            type: "string",
        },
        noHP: {
            describe: "Nomor HandPhone",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        saveContacts(argv.nama, argv.email, argv.noHP);
    },
}).demandCommand();

yargs.command({
    command: "list",
    describe: "Menampilkan semua nama & no HP contact",
    handler() {
        listContacts();
    }
});

yargs.command({
    command: "detail",
    describe: "Menampilkan detail sebuah contact berdasarkan nama",
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string",
        }
    },
    handler(argv) {
        detailContact(argv.nama);
    }
})

yargs.command({
    command: "delete",
    describe: "Menghapus sebuah contact berdasarkan nama",
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        deleteContact(argv.nama);
    },
});

yargs.parse()

