
const express = require("express");
const expressLayouts = require("express-ejs-layouts")
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);

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
        layout: "layouts/main-layout.ejs"
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact",
        layout: "layouts/main-layout.ejs",
    });
});

app.get("/products/:id/:name", (req, res) => {
    res.status(200);
    res.json({
        productsID: req.params.id,
        productsNames: req.params.name,
        productsPrices: req.query.price, 
    });
})

app.use("/", (req, res) => {
    res.status(404);
    res.send("Not Found");
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
