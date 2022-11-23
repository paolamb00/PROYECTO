let email = document.getElementById("email");
let password = document.getElementById("password");

function guardarUser(){
const correo = document.getElementById("email").value;
  localStorage.setItem("Email", correo);
}

function mostrarUser(){
  localStorage.getItem("Email");
}

function showAlertError() {
  if(document.getElementById("alert-danger").classList.contains("show")){
  document.getElementById("alert-danger").classList.remove("show");}
}

function cambiarColor(campo){
  document.getElementById(campo).style.borderColor="red";
}

document.addEventListener("DOMContentLoaded", function(e){
  document.getElementById("btn").addEventListener('click', function(e){
    let todoCompleto = true;
  if(email.value === '') {
    showAlertError();
    cambiarColor("email");
    todoCompleto = false;
  }

  if(password.value === '') {
    showAlertError();
    cambiarColor("password");
    todoCompleto = false;

  }
  if (todoCompleto == true){
    document.getElementById("alert-danger").classList.remove("show");
    guardarUser();
    window.location.href = 'cover.html';
    mostrarUser();

  }

});
})






 


