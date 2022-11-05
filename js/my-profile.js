let firstName = document.getElementById("firstName");
let secondName = document.getElementById("secondName");
let lastName1 = document.getElementById("lastName1");
let lastName2 = document.getElementById("lastName2");
let userEmail = document.getElementById("userEmail");
let phoneNumber = document.getElementById("phoneNumber");
let saveData = document.getElementById("saveData");

//the "save changes" button saves the data that the user introduced in the inputs,
//makes it into a string and creates a localstorage item with the values
saveData.addEventListener('click', function(){ 
    if(firstName.value != "" &&
       lastName1.value != "" &&
       userEmail.value != "" &&
       phoneNumber.value != ""){
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
    }else{
        if(firstName.value === "" ||
    lastName1.value === "" ||
    userEmail.value === "" ||
    phoneNumber.value === ""){
        alertError();
    }
}
           
});

function alertSuccess(){ //alert to show when the data is correct
document.getElementById("main").innerHTML+= `
<div class="alert alert-success alert-dismissible fade show" role="alert">
<h4 class="alert-heading">¡Bien hecho!</h4>
<p>Tu información ha sido guardada correctamente.</p>
<hr>
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

`   
};

function alertError(){ //alert to show when the data is incomplete
    document.getElementById("main").innerHTML+= `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <h4 class="alert-heading">Oops...</h4>
    <p>Debes completar los campos requeridos.</p>
    <hr>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    
    `   
};

//If the user is already created and saved in the localstorage the info will be displayed
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
    userEmail.value = localStorage.getItem("Email"); //when user access their profile the email is the one used to log in
    showSavedUser();
});

