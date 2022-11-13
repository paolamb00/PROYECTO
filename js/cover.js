function mostrarUsuarios(){
    let htmlContentToAppend ="";
        let correo1 =  localStorage.getItem("Email");
        if(localStorage.getItem("Email") == null){
            htmlContentToAppend +=`
            <div class="dropdown">
             <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
             `+correo1+`
             </button>
           <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
           <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
           <li"><a class="dropdown-item" href="index.html">Cerrar sesión</a></li>
     </ul>
   </div>
          `
            
        }else{
           htmlContentToAppend +=`
         <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-person-circle"></i> `+correo1+`
          </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="cart.html"><i class="bi bi-cart4"></i> Mi carrito</a></li>
        <li><a class="dropdown-item" href="my-profile.html"><i class="bi bi-person-badge"></i> Mi perfil</a></li>
        <li"><a class="dropdown-item" href="index.html" onclick="deleteUser()"><i class="bi bi-box-arrow-right"></i> Cerrar sesión</a></li>
  </ul>
</div>
       `  
        }
           
         document.getElementById("usuario").innerHTML = htmlContentToAppend; 
    };



document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//ELIMINAR USUARIO AUTENTICADO AL CERRAR CESIÓN
function deleteUser(){
  localStorage.removeItem("Email");
};
mostrarUsuarios();


