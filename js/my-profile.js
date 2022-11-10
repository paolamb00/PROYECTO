let firstName = document.getElementById("firstName");
let secondName = document.getElementById("secondName");
let lastName1 = document.getElementById("lastName1");
let lastName2 = document.getElementById("lastName2");
let userEmail = document.getElementById("userEmail");
let phoneNumber = document.getElementById("phoneNumber");
let saveData = document.getElementById("saveData");
let profilePic = document.getElementById("output");



let userForm = document.getElementById("user-info"); 
userForm.addEventListener("submit", function(e){
    e.preventDefault(); 
    e.preventDefault();
    let dataMissing = false;

    firstName.classList.remove('is-invalid');
    lastName1.classList.remove('is-invalid');
    userEmail.classList.remove('is-invalid');
    phoneNumber.classList.remove('is-invalid');

    //the name, lastname, email and phone number inputs can´t be empty and if they are an alert will be displayed 
    //where the info is required
    if (firstName.value === "")
        {
            firstName.classList.add('is-invalid');
            dataMissing = true;
        }

    if (lastName1.value === "")
        {
            lastName1.classList.add('is-invalid');
            dataMissing = true;
        }

    if (userEmail.value === "")
        {
            userEmail.classList.add('is-invalid');
            dataMissing = true;
        }

    if (phoneNumber.value === "")
        {
            phoneNumber.classList.add('is-invalid');
            dataMissing = true;
        }
         
        //if the data is complete the button saves the data that the user introduced in the inputs,
       //turns it into a string and creates a localstorage item with their values
    if(!dataMissing){ 
        const newProfile = {
            firstName: firstName.value,
            secondName: secondName.value,
            lastName1: lastName1.value,
            lastName2: lastName2.value,
            userEmail: userEmail.value,
            phoneNumber: phoneNumber.value,
        }
        let newUserProfile = JSON.stringify(newProfile);
        localStorage.setItem("userData", newUserProfile); 
        alertSuccess();
    }    
        
} );
 //function to change profile picture 
 //función para cambiar foto de perfil
 document.getElementById("file").addEventListener('change', function(event){
    profilePic.src = URL.createObjectURL(event.target.files[0]);
 });



 function alertSuccess(){ //alert to show when the data is correct / alerta para mostrar cuando la info esté correcta
   document.getElementById("main").innerHTML+= `
   <div class="alert alert-success alert-dismissible fade show" role="alert">
   <h4 class="alert-heading">¡Bien hecho!</h4>
   <p>Tu información ha sido guardada correctamente.</p>
   <hr>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
 `   
};


//If the user is already created and saved in the localstorage the info will be displayed
//si el usuario ya está creado y almacenado en el localStorage se mostrará la información respectiva
function showSavedUser(){
    let userData = localStorage.getItem("userData");
    if(userData !== null){
        let profileData = JSON.parse(userData);
        firstName.value = profileData.firstName;
        secondName.value = profileData.secondName;
        lastName1.value = profileData.lastName1;
        lastName2.value = profileData.lastName2;
        userEmail.value = profileData.userEmail;
        phoneNumber.value = profileData.phoneNumber;
    }

};


document.addEventListener("DOMContentLoaded", function (e) {
    userEmail.value = localStorage.getItem("Email"); //cuando el usuario accede a su perfil el email que se muestra es el que se utilizó para ingresar
    showSavedUser();
});

