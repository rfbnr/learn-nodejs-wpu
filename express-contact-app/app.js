const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const {
    loadContacts,
    findContact,
    addContact,
    checkDuplicateName,
    deleteContact,
    updateContact
} = require("./utils/contacts");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts); // Third-Party middleware
app.use(express.static("public")); // Built-in middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(session(
    {
        cookie: {
            maxAge: 6000
        },
        secret: "secret",
        resave: true,
        saveUninitialized: true
    }
));
app.use(flash());

app.get("/", (req, res) => {
    const mahasiswa = [
        {
            name: "Ridwan",
            email: "ridwan@gmail.com",
        },
        {
            name: "Ryan",
            email: "ryan@gmail.com",
        },
        {
            name: "Raka",
            email: "raka@gmail.com",
        },
    ];

    res.render("index", {
        name: "Ridwan",
        title: "Home",
        layout: "layouts/main-layout.ejs",
        mahasiswa,
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        layout: "layouts/main-layout.ejs",
    });
});

app.get("/contact", (req, res) => {
    const contacts = loadContacts();

    res.render("contact", {
        title: "Contact",
        layout: "layouts/main-layout.ejs",
        msg: req.flash("msg"),
        contacts,
    });
});

app.get("/contact/add", (req, res) => {
    res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout.ejs",
    });
});

app.post(
    "/contact",
    [
        body("nama").custom((value) => {
            const duplicateName = checkDuplicateName(value);
            if (duplicateName) {
                throw new Error("Nama contact sudah digunakan!");
            }
            return true;
        }),
        check("email")
            .isEmail()
            .withMessage("Email Tidak Valid!"),
        check("nohp")
            .isMobilePhone("id-ID")
            .withMessage("No Hp Tidak Valid!")
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("add-contact", {
                title: "Form Tambah Data Contact",
                layout: "layouts/main-layout.ejs",
                errors: errors.array(),
            });
        } else {
            addContact(req.body);
            req.flash("msg", "data contact berhasil ditambahkan");
            res.redirect("/contact");
        };
    }
);

app.get("/contact/delete/:nama", (req, res) => {
    const contact = findContact(req.params.nama);

    if (!contact) {
        res.status(404);
        res.send(
            `<h2>Tidak ada yang dihapus, nama contact tidak ditemukan</h2>`,
        );
    } else {
        deleteContact(req.params.nama);
        req.flash("msg", "data contact berhasil dihapus");
        res.redirect("/contact");
    };
});

app.get("/contact/edit/:nama", (req, res) => {
    const contact = findContact(req.params.nama);

    res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layout.ejs",
        contact,
    });
});

app.post(
    "/contact/update",
    [
        body("nama").custom((value, {req}) => {
            const duplicateName = checkDuplicateName(value);
            if (value !== req.body.oldNama && duplicateName) {
                throw new Error("Nama contact sudah digunakan!");
            }
            return true;
        }),
        check("email")
            .isEmail()
            .withMessage("Email Tidak Valid!"),
        check("nohp")
            .isMobilePhone("id-ID")
            .withMessage("No Hp Tidak Valid!"),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("edit-contact", {
                title: "Form Ubah Data Contact",
                layout: "layouts/main-layout.ejs",
                contact: req.body,
                errors: errors.array(),
            });
        } else {
            updateContact(req.body);
            req.flash("msg", "data contact berhasil diubah");
            res.redirect("/contact");
        };
    },
);

app.get("/contact/:nama", (req, res) => {
    const contact = findContact(req.params.nama);

    res.render("detail-contact", {
        title: "Detail Contact",
        layout: "layouts/main-layout.ejs",
        contact,
    });
});

app.use("/", (req, res) => {
    res.status(404);
    res.send("404 Not Found");
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
