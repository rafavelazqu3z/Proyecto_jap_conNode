let rangeMin = document.getElementById("rangeFilterCountMin")
let rangeMax = document.getElementById("rangeFilterCountMax")
let searchBar = document.getElementById('busqueda')
let catNames = {101: "Autos",102: "Juguetes",103: "Muebles",104: "Herramientas",105: "Computadoras",106: "Vestimenta",  107: "Electrodomésticos",108: "Deporte",109: "Celulares"
}   ;
let productList = ""

function sortByPriceDesc(a,b){
    return a.cost - b.cost  
}

function sortByPriceAsc(a,b){
    return b.cost - a.cost
}

function sortByRel(a,b){
    return b.soldCount - a.soldCount
}

function productSortMore(){
    showCategoriesList(productList.sort(sortByPriceDesc));
}

function productSortLess(){
    showCategoriesList(productList.sort(sortByPriceAsc));
}

function productSortRel(){
    showCategoriesList(productList.sort(sortByRel));
}

function productsClean(){
    showCategoriesList(productList);
    document.getElementById("rangeFilterCountMin").value = undefined;
    document.getElementById("rangeFilterCountMax").value = undefined;
    document.getElementById('busqueda').value= ''
}

//Filtro y busqueda
function searchAndFilter(){
    let filteredProducts = productList;
    
    if(rangeMin.value != ""){
        filteredProducts = filteredProducts.filter(product => 
        product.cost > rangeFilterCountMin.value)};
    if(rangeMax.value != ""){
        filteredProducts = filteredProducts.filter(product => 
        product.cost < rangeFilterCountMax.value)};
    if(searchBar.value != ""){
        filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(busqueda.value.toLowerCase()))
    }
    
    showCategoriesList(filteredProducts) 
    
}
function guardarIdProducto(id){
    localStorage.setItem('prodID', id)
    console.log(localStorage.getItem('prodID', id))
    location.href = "product-info.html"
}


//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(list){
    let htmlContentToAppend = "";
    for(let i = 0; i < list.length; i++){ 
        let category = list[i];
        
        htmlContentToAppend += `
        <div onclick="guardarIdProducto(`+category.id+`)" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name +" "+"- "+category.currency+" "+ category.cost+`</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        

        document.getElementById("listado_auto").innerHTML = htmlContentToAppend; 
    }
    catText() 
}

//Aqui sacamos el nombre de la categoria en la que nos encontramos
function catText(){
    document.getElementById("descripcion_cat").innerHTML = "Verás aqui todos los productos de la categoria "+ catNames[localStorage.getItem("catID")]
}
/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                productList = resultObj.data.products;
                showCategoriesList(productList);
            }
        });
        
    });

    document.getElementById('busqueda').addEventListener('input', searchAndFilter);
    document.getElementById("rangeFilterCountMin").addEventListener('input', searchAndFilter);
    document.getElementById("rangeFilterCountMax").addEventListener('input', searchAndFilter);

    