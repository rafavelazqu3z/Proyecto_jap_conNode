let productInfo = [];
let comentariosProd = [];
let products = [];
let productsRel = "";
let comments = "";
let estrellas = 0;
let d = new Date();
let date = d.getDate();
let month = d.getMonth() + 1;
let year = d.getFullYear();
let hour = d.getHours();
let min = d.getMinutes();
let sec = d.getSeconds();
let dateStr = year +"-"+month+"-"+date+" "+hour+":"+min+":"+sec;

function guardarIdProducto(id){
    localStorage.setItem('prodID', id)
    console.log(localStorage.getItem('prodID', id))
    location.href = "product-info.html"
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfo = resultObj.data
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            products = resultObj.data
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comentariosProd = resultObj.data
            showProductInfo(productInfo,products,comentariosProd)
        }
    });
    
});


let botonCompra = document.getElementById('btnCompra')

botonCompra.addEventListener("click", function(e){

    localStorage.setItem('article',JSON.stringify(productInfo))
    window.location = 'cart.html'
    
})



function showProductInfo(productInfo,products,comentariosProd ){
    // PRODUCTOS
    let name = document.getElementById('productName')
    let desc = document.getElementById('productDesc')
    let cost = document.getElementById('productCost')
    let count = document.getElementById('productCount')
    let categoria = document.getElementById('productCat')
    let imgs = "";
    name.innerHTML = productInfo.name;
    desc.innerHTML = productInfo.description
    cost.innerHTML = productInfo.currency+" "+productInfo.cost
    count.innerHTML = productInfo.soldCount
    categoria.innerHTML = products.catName

    for (let i = 0; i < productInfo.images.length; i++) {
        if(i == 0){
        imgs += `<div class="carousel-item active">
                <img src="${productInfo.images[i]}" class="d-block">
            </div>`
        }else{
            imgs += `<div class="carousel-item">
                <img src="${productInfo.images[i]}" class="d-block" >
            </div>`
        }
        document.getElementById('imagenesIlus').innerHTML = imgs;
    };

    //PRODUCTOS RELACIONADOS
    

    for(let productsRelated of productInfo.relatedProducts){
            
                productsRel+=`
                <div class="row" style="display:inline-block;" onclick="guardarIdProducto(`+productsRelated.id+`)">
                    <div  class="col-md-2">
                    <div class="card text-left m-4" style="width: 18rem;  cursor:pointer;">
                        <img src="`+productsRelated.image+`" class="card-img-top">
                    <div class="card-body">
                        <h5>`+productsRelated.name+`</h5>
                    </div>
                </div>
            </div>
        </div>`
            
            console.log(productsRelated)
            document.getElementById("productos_rel").innerHTML= productsRel;

    };
    

    //COMENTARIOS

    for (let comment in comentariosProd){
        comments +=`<div class="card">
        <div class="card-body">
            <div class="">
            <p small mb-0 ms-2><b>`+comentariosProd[comment].user+`</b> - `+comentariosProd[comment].dateTime+` - 
            `
    switch(comentariosProd[comment].score){
        case 1:
            comments += `<span class="fa fa-star checked"></span>
        <span class="far fa-star "></span>
        <span class="far fa-star "></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        </p>
        <p>`+comentariosProd[comment].description+`</p>
            </div>
        </div>
        </div>            
        `
        document.getElementById('seccionComentarios').innerHTML = comments;
            break;
        case 2:
            comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="far fa-star "></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        </p>
        <p>`+comentariosProd[comment].description+`</p>
            </div>
        </div>
        </div>            
         
        `
        document.getElementById('seccionComentarios').innerHTML = comments;
            break;
        case 3:
            comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        </p>
        <p>`+comentariosProd[comment].description+`</p>
            </div>
        </div>
        </div>            
          
        `
        document.getElementById('seccionComentarios').innerHTML = comments;
            break;
        case 4:
            comments += `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="far fa-star"></span>
            </p>
            <p>`+comentariosProd[comment].description+`</p>
            </div>
        </div>
        </div> 
            `
            document.getElementById('seccionComentarios').innerHTML = comments;
            break;
        case 5:
            comments += `<span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                </p>
                <p>`+comentariosProd[comment].description+`</p>
            </div>
        </div>
        </div>            
                  
                `
                document.getElementById('seccionComentarios').innerHTML = comments;
            break;
        default:
            comments += `<span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </p>
        <p>`+comentariosProd[comment].description+`</p>
            </div>
        </div>
        </div>           
          
        `
        document.getElementById('seccionComentarios').innerHTML = comments;
        break;
    }
       
    }


    
}

//MI COMENTARIO
let btnComentario = document.getElementById('btnComentar');


btnComentario.addEventListener('click', function(e){
    let puntuacion = document.getElementById('puntuacion').value;
    let comentario = document.getElementById('opinion').value;
    let usuario = localStorage.getItem('email')
    if(puntuacion > "0" && puntuacion <= "5" && comentario != ""){
        comments +=`<div class="card">
        <div class="card-body">
            <div class=""d-flex flex-row align-items-center">
            <p small mb-0 ms-2><b>`+usuario+`</b> - `+dateStr+`
            `
    switch(puntuacion){
        case "1":
            comments += `<span class="fa fa-star checked"></span>
        <span class="far fa-star "></span>
        <span class="far fa-star "></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        </p>
        <p>`+comentario+`</p>
            </div>
        </div>
        </div>            
        `
        document.getElementById('seccionComentarios').innerHTML = comments;
            break;
        case "2":
            comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="far fa-star "></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        </p>
        <p>`+comentario+`</p>
            </div>
        </div>
        </div>            
         
        `
        document.getElementById('seccionComentarios').innerHTML = comments;
            break;
        case "3":
            comments += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        </p>
        <p>`+comentario+`</p>
            </div>
        </div>
        </div>            
          
        `
        document.getElementById('seccionComentarios').innerHTML = comments;
            break;
        case "4":
            comments += `<span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="far fa-star"></span>
            </p>
            <p>`+comentario+`</p>
            </div>
        </div>
        </div> 
            `
            document.getElementById('seccionComentarios').innerHTML = comments;
            break;
        case "5":
            comments += `<span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                </p>
                <p>`+comentario+`</p>
            </div>
        </div>
        </div>            
                  
                `
                document.getElementById('seccionComentarios').innerHTML = comments;
            break;
        default:
            comments += `<span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </p>
        <p>`+comentario+`</p>
            </div>
        </div>
        </div>           
          
        `
        document.getElementById('seccionComentarios').innerHTML = comments;
    }

    }else{
        alert("Ingrese una Puntuacion entre 1-5 y un comentario")
    }

    
});


