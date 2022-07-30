
const express = require("express");
const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.status(200);
    res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
    res.status(200);
    res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
    res.status(200);
    res.sendFile("./contact.html", { root: __dirname });
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
    console.log(`Example app listening on port ${port}`);
});
