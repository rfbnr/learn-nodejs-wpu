const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const { body, validationResult, check } = require("express-validator");


require("./utils/db");
const Contact = require("./model/contact")

const app = express();
const port = 3000;

// Setup Method Override
app.use(methodOverride("_method"));

// Setup EJS
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Konfigurasi Flash
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(
    session({
        cookie: {
            maxAge: 6000,
        },
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    }),
);
app.use(flash());

// Halaman Home
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

// Halaman About
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        layout: "layouts/main-layout.ejs",
    });
});

// Halaman Contact
app.get("/contact", async (req, res) => {
    const contacts = await Contact.find();

    res.render("contact", {
        title: "Contact",
        layout: "layouts/main-layout.ejs",
        msg: req.flash("msg"),
        contacts,
    });
});

// Halaman form tambah data contact
app.get("/contact/add", (req, res) => {
    res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout.ejs",
    });
});

// Proses tambah data contact
app.post(
    "/contact",
    [
        body("nama").custom(async (value) => {
            const duplicateName = await Contact.findOne({ nama: value });
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
            .withMessage("No Hp Tidak Valid!"),
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
            Contact.insertMany(req.body, () => {
                req.flash("msg", "data contact berhasil ditambahkan");
                res.redirect("/contact");
            })
        };
    },
);

// Menghapus data contact
app.delete("/contact", (req, res) => {
    Contact.deleteOne({ nama: req.body.nama }, () => {
        req.flash("msg", "data contact berhasil dihapus");
        res.redirect("/contact");
    });
});
// app.get("/contact/delete/:nama", async (req, res) => {
//     const contact = await Contact.findOne({nama: req.params.nama});

//     if (!contact) {
//         res.status(404);
//         res.send(
//             `<h2>Tidak ada yang dihapus, nama contact tidak ditemukan</h2>`,
//         );
//     } else {
//         Contact.deleteOne({ nama: req.params.nama }, () => {
//             req.flash("msg", "data contact berhasil dihapus");
//             res.redirect("/contact");
//         });
//     }
// });

// Halaman Form edit data contact
app.get("/contact/edit/:nama", async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });

    res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layout.ejs",
        contact,
    });
});

// Proses edit data contact
app.put(
    "/contact",
    [
        body("nama").custom( async (value, { req }) => {
            const duplicateName = await Contact.findOne({ nama: value });
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
            Contact.updateOne(
                {
                    _id: req.body._id
                },
                {
                    $set: {
                        nama: req.body.nama,
                        nohp: req.body.nohp,
                        email: req.body.email
                    }
                }
            ).then(() => {
                req.flash("msg", "data contact berhasil diubah");
                res.redirect("/contact");
            });
        };
    },
);

// Halaman Detail Contacts
app.get("/contact/:nama", async (req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });

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
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});
