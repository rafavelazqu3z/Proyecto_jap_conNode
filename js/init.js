const CATEGORIES_URL = "http://localhost/categories";
const PUBLISH_PRODUCT_URL = "http://localhost/sell";
const PRODUCTS_URL = "http://localhost/cats_products/"+localStorage.getItem('catID');
const PRODUCT_INFO_URL = "http://localhost/products/"+localStorage.getItem('prodID')+".json";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost/products_comments/"+localStorage.getItem('prodID')+".json";
const CART_INFO_URL = "http://localhost/carrito";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}