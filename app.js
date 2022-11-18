const express = require("express");
const cats = "./emercado-api-main/cats/cat.json"
const app = express();
const port = 80;
const prodcuts = "./emercado-api-main/products/40281.json"

app.get("/", (req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>HOLA</h1>`);
    console.log(prodcuts)
});

app.listen(port, ()=>{
    console.log('ESTA VIVO')
})