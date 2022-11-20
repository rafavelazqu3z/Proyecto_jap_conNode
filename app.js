const express = require("express");
const cats = "./emercado-api-main/cats/cat.json"
const app = express();
const port = 80;
const prodcuts = "./emercado-api-main/products"

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    next();
});

app.get("/categories", function (req, res){
    res.json(require("./emercado-api-main/cats/cat.json"));
});

app.get("/sell", function (req, res){
    res.json(require("./emercado-api-main/sell/publish.json"))
})

app.get("/carrito", function(req, res){
    res.json(require("./emercado-api-main/user_cart/25801.json"))
})

app.get("/cats_products/:catID", function (req, res){
    res.json(require("./emercado-api-main/cats_products/"+req.params.catID));
})

app.get("/products/:prodID" , function(req, res){
    res.json(require("./emercado-api-main/products/"+req.params.prodID))
})

app.get("/products_comments/:prodID", function(req, res){
    res.json(require("./emercado-api-main/products_comments/"+req.params.prodID))
})

app.listen(port, ()=>{
    console.log('ESTA VIVO')
})