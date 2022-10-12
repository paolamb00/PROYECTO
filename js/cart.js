const PRODUCT_CART = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let cart_list = "";
let prodImg = document.getElementById("imgProduct");
let prodNam = document.getElementById("nameProduct");
let prodCost = document.getElementById("costProduct");
let prodCant = document.getElementById("cantProd");
let prodSub = document.getElementById("subProduct");
const CARRITO_DATA = "https://japceibal.github.io/emercado-api/user_cart/";
let carrito_prod = CARRITO_DATA + localStorage.getItem("product") + ".json";
let prod_cart = "";




function showCart(cart_data){
    for(let i = 0; i < cart_data.length; i++){
        prodImg.innerHTML += `<img src="${cart_data[i].image}">`
        prodNam.textContent += `${cart_data[i].name}`
        prodCost.innerHTML += `${cart_data[i].currency} ${cart_data[i].unitCost}` 
        prodCant.value = `${cart_data[i].count}`
       
    }
    
};

// CALCULAR SUBTOTAL EN TIEMPO REAL
function upgradeSub(cart){
    for(let i =0; i < cart.length;i++){
      let subTot = `${cart[i].unitCost}` * prodCant.value;
      prodSub.innerHTML = `${cart[i].currency} ` + subTot;  
    }
};

prodCant.addEventListener('click', function(){
    upgradeSub(cart_list)
});

//DESAFIATE



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            cart_list = resultObj.data.articles
            console.log(cart_list)
            showCart(cart_list)
            upgradeSub(cart_list)
        }
    })
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(carrito_prod).then(function(resultObj){
        if (resultObj.status === "ok"){
            prod_cart = resultObj.data.articles
            console.log(prod_cart)
            
        }
    })
});
