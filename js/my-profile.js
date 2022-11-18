let emailInput = document.getElementById('emailPerfil')
let imgPerfil = document.getElementById('formFile');
let divImgPerfil = document.getElementById('imgPerfil');
let btnGuardarPerfil = document.getElementById('guardarPerfil');
let primerNombre = document.getElementById('nombrePerfil1');
let segundoNombre = document.getElementById('nombrePerfil2');
let primerApellido = document.getElementById('apellidoPerfil1');
let segundoApellido = document.getElementById('apellidoPerfil2');   
let telefonoPerfil = document.getElementById('numTelefonoPerfil');

document.addEventListener("DOMContentLoaded", function(e){
    divImgPerfil.src = localStorage.getItem('imgPerfil')
    emailInput.value = localStorage.getItem('email');
    if(localStorage.getItem('perfil')){
        perfil = JSON.parse(localStorage.getItem('perfil'))
        primerNombre.value = perfil.primerNombre
        segundoNombre.value = perfil.segundoNombre
        primerApellido.value = perfil.primerApellido
        segundoApellido.value = perfil.segundoApellido
        telefonoPerfil.value = perfil.telefonoPerfil
    }
    guardadoDePerfil()

})

function guardadoDePerfil(){
    let perfil = {};
    let emailInput = document.getElementById('emailPerfil').value
    let primerNombre = document.getElementById('nombrePerfil1').value;
    let segundoNombre = document.getElementById('nombrePerfil2').value;
    let primerApellido = document.getElementById('apellidoPerfil1').value;
    let segundoApellido = document.getElementById('apellidoPerfil2').value;   
    let telefonoPerfil = document.getElementById('numTelefonoPerfil').value;
    if(primerNombre && segundoNombre && primerApellido && segundoApellido && telefonoPerfil !== ""){

        perfil = {primerNombre,segundoNombre,primerApellido,segundoApellido,emailInput,telefonoPerfil}

        localStorage.setItem('perfil',JSON.stringify(perfil));
        
    }
}

btnGuardarPerfil.addEventListener("click",function(e){
    guardadoDePerfil()
})

imgPerfil.addEventListener("change",(event) =>{
        url = URL.createObjectURL(event.target.files[0]);
        divImgPerfil.src = url
        localStorage.setItem('imgPerfil', divImgPerfil.src)
})