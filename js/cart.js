const PRODUCT_CART = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let cart_list = "";
let prodImg = document.getElementById("imgProduct");
let prodNam = document.getElementById("nameProduct");
let prodCost = document.getElementById("costProduct");
let prodCant = document.getElementById("cantProd");
let prodSub = document.getElementById("subProduct");

function showCart(cart_data){
    for(let i = 0; i < cart_data.length; i++){
       prodNam.textContent += `${cart_data[i].name}`
       prodCost.innerHTML += `${cart_data[i].currency} ${cart_data[i].unitCost}` 
       prodCant.innerHTML += `${cart_data[i].count}`
    }
};



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            cart_list = resultObj.data.articles
            console.log(cart_list)
            showCart(cart_list)
            
        }
    })
});