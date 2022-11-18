let cantidad = ""
"use strict";
function showAlertSuccess() {
    Swal.fire({
        title: "Compra Realizada",
        text: "Has comprado correctamente",
        icon: "success",
        backdrop: true,
        timer: 2000,
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
        showConfirmButton: false
    });
  }
  
  function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
    esconderAlert()
  }
  
  
  function esconderAlert(){
    $('#alert-success').delay(2500).hide(300);
    $('#alert-danger').delay(2500).hide(300);
    setTimeout(function(e){
        document.getElementById("alert-success").classList.add("d-none")
    },300)
  }

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartInfo = resultObj.data
            ShowCartInfo(cartInfo)
            if(localStorage.getItem('article')){
                guardarProductoCarrito()
             }
            precioCarrito()
            cantidad = document.getElementById('cantProduct')
            cantidad.addEventListener("click", function(e){
                let valor = cartInfo.articles[0].unitCost
                let currency = cartInfo.articles[0].currency
                let coste = document.getElementById('totalProd')
                coste.innerHTML="<b>"+currency +" "+ cantidad.value * valor+"</b>"
            })
        }
    });
});







function ShowCartInfo(cartInfo){
    let img = document.getElementById('productImg')
    let nombre = document.getElementById('productName')
    let precio = document.getElementById('productCurrency')
    let total = document.getElementById('totalProd')
    let currency = cartInfo.articles[0].currency;
    let unitCost = cartInfo.articles[0].unitCost
    img.src = cartInfo.articles[0].image
    nombre.innerText = cartInfo.articles[0].name
    precio.innerText = currency+" "+unitCost
    total.innerHTML="<b>"+currency+" "+unitCost+"</b>"
}

function guardarProductoCarrito(){
    let productCart = ""
    let productInfo = JSON.parse(localStorage.getItem('article'));
    if(productInfo.id == cartInfo.articles[0].id){
        document.getElementById('cantProduct').value = 2;
        document.getElementById('totalProd').innerHTML="<b>"+cartInfo.articles[0].currency+" "+cartInfo.articles[0].unitCost*2+"</b>"
    }else{
        
    productCart+=`<div class="row" id="productoAgregado">
    <img src="`+productInfo.images[0]+`" style="width: 90px; height:40px;">
    <div class="col-md-1" style="width: 120px;">
      `+productInfo.name+`
    </div>
    <div class="col-md-1">
     `+productInfo.currency+" "+productInfo.cost+`
    </div>
    <div class="col-md-1">
      <input id="inputCantidad" class="form-control" min="1" type="number" value="1" style="width: 60px; height: 40px;" onclick="carritoCalculos()">
    </div>
    <div class="col-md-1" id="precioTotalArt">
    <b>`+productInfo.currency+" "+productInfo.cost+`</b>
    </div>
    <div class="col-md-1">
    <button type="button" class="btn btn-outline-danger fa fa-trash" onclick="eliminarProductoCarrito()"></button>
    </div>
    </div>
    `
    document.getElementById('articulos').innerHTML += productCart;
    }


    

   
}

function eliminarProductoCarrito(){
    localStorage.removeItem('article')
    document.getElementById('productoAgregado').innerHTML = ""
    precioCarrito()
}


function carritoCalculos(){
    calcularValor()
    precioCarrito()
}

function precioCarrito(){
    let producto = JSON.parse(localStorage.getItem('article'));
    let inputAutoPreCargado = document.getElementById('cantProduct').value
    let premium = document.getElementById('flexRadioDefault1');
    let express = document.getElementById('flexRadioDefault2');
    let standar = document.getElementById('flexRadioDefault3');
    let precioAutoPreCargado = cartInfo.articles[0].unitCost*inputAutoPreCargado
    let precio = "";


    if(producto){
        if(producto.id !== cartInfo.articles[0].id){
        let cantidadProducto = document.getElementById('inputCantidad').value
        let precioProducto = producto.cost * cantidadProducto
        if(producto.currency == "UYU"){
            let productoEnDolares = producto.cost/= 42
            precioProducto = Math.trunc(productoEnDolares * cantidadProducto)
        }
        precio = precioAutoPreCargado+precioProducto;
    
        }else{
            
            precio = precioAutoPreCargado
        }
        
    }else{
        precio = precioAutoPreCargado
    }   
    
   
    let subtotalCarrito = document.getElementById('costoProdCarr');
    let costeEnvioCarr = document.getElementById('costeEnvioCarr');
    let totalCarrito = document.getElementById('totalCosteCarr');
    
    if (premium.checked){
        envio = Math.trunc(precio * 0.15)
        costeEnvioCarr.innerHTML = "USD " + envio
        total= precio+envio
        totalCarrito.innerHTML = "USD " + total;
    }
    premium.addEventListener("click", function(e){
        envio = Math.trunc(precio * 0.15)
        costeEnvioCarr.innerHTML = "USD " + envio
        total= precio+envio
        totalCarrito.innerHTML = "USD " + total;
    })

    express.addEventListener("click", function(e){
        envio = Math.trunc(precio * 0.07)
        costeEnvioCarr.innerHTML = "USD " + envio
        total= precio+envio
        totalCarrito.innerHTML = "USD " + total;
    })

    standar.addEventListener("click", function(e){
        envio = Math.trunc(precio * 0.05)
        costeEnvioCarr.innerHTML = "USD " + envio
        total= precio+envio
        totalCarrito.innerHTML = "USD " + total;
    })
    let subtotalCarritoMostrar = "USD " + precio;

    
    subtotalCarrito.innerHTML = subtotalCarritoMostrar


}
function calcularValor(){
    let producto = JSON.parse(localStorage.getItem('article'));
    let cantidadArt = document.getElementById('inputCantidad').value;
    let totalArt = document.getElementById('precioTotalArt')
    totalArt.innerHTML = `<b>`+producto.currency+" "+ producto.cost * cantidadArt+`</b>`
}


let checkboxTarj = document.getElementById('checkboxTarjeta')
let checkboxBanco = document.getElementById('checkboxTransferencia')


function comprobarCheckbox(){
    let divError = document.getElementById('textoError')
    if(checkboxBanco.checked || checkboxTarj.checked){
        divError.classList.add("d-none")
    }else{
        divError.classList.remove("d-none")
        divError.classList.add("text-danger")
    }
}

checkboxBanco.addEventListener("click",function(e){
    checkboxTarj.checked = false
    document.getElementById('inputNumTarj').readOnly = true
    document.getElementById('inputCodigoSeguridad').readOnly = true
    document.getElementById('inputVencimiento').readOnly = true
    document.getElementById('inputNumCuenta').readOnly = false
    document.getElementById('metodoDePago').innerText = 'Transferencia Bancaria'
    comprobarCheckbox()
    
})

checkboxTarj.addEventListener("click",function(e){
    checkboxBanco.checked = false
    document.getElementById('inputNumTarj').readOnly = false
    document.getElementById('inputCodigoSeguridad').readOnly = false
    document.getElementById('inputVencimiento').readOnly = false
    document.getElementById('inputNumCuenta').readOnly = true
    document.getElementById('metodoDePago').innerText = 'Tarjeta de credito'
    comprobarCheckbox()
    
})