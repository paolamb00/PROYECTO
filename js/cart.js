const PRODUCT_CART = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let cart_list = "";
let prodImg = document.getElementById("imgProduct");
let prodNam = document.getElementById("nameProduct");
let prodCost = document.getElementById("costProduct");
let prodCant = document.getElementById("cantProd");
let prodSub = document.getElementById("subProduct");
let DOLLAR_SIGN = "USD";
const CARRITO_DATA = "https://japceibal.github.io/emercado-api/user_cart/";
let carrito_prod = CARRITO_DATA + localStorage.getItem("product") + ".json";
let prod_cart = "";




function showCart(cart_data){
    for(let i = 0; i < cart_data.length; i++){
       prodImg.innerHTML += `<img src="${cart_data[i].image}">`
       prodNam.textContent += `${cart_data[i].name}`
       prodCost.innerHTML += `${cart_data[i].currency} ${cart_data[i].unitCost}` 
       prodCant.value = `${cart_data[i].count}`
       let subPrice = `${cart_data[i].unitCost}` * prodCant.value;
       prodSub.innerHTML = `${cart_data[i].currency}` + subPrice
       
    }
};

// CALCULAR SUBTOTAL EN TIEMPO REAL
function upgradeSub(){
   let unitPrice = document.getElementById("costProduct").value;
   let amount = document.getElementById("cantProd").value;
   let subTot = unitPrice * amount;
    prodSub.innerHTML = subTot;
};

document.getElementById("cantProd").addEventListener("change", function(){
    upgradeSub();
});

//DESAFIATE








document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            cart_list = resultObj.data.articles
            console.log(cart_list)
            showCart(cart_list)
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

upgradeSub();