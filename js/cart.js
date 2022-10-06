const PRODUCT_CART = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let cart_list = "";
let prodImg = document.getElementById("imgProduct");
let prodNam = document.getElementById("nameProduct");
let prodCost = document.getElementById("costProduct");
let prodCant = document.getElementById("cantProd");
let prodSub = document.getElementById("subProduct");


function showCart(cart_data){
    for(let i = 0; i < cart_data.length; i++){
       prodImg.innerHTML += `<img src="${cart_data[i].image}">`
       prodNam.textContent += `${cart_data[i].name}`
       prodCost.innerHTML += `${cart_data[i].currency} ${cart_data[i].unitCost}` 
       prodCant.value = `${cart_data[i].count}`
    }
};

//SUBTOTAL (INCOMPLETO)
function subTot(cart_total){
    for(let i=0; i< cart_total.length;i++){
    let cantidad = prodCant.value;
      let subTotal = `${cart_total[i].unitCost}` * cantidad;
      prodSub.innerHTML += `${cart_total[i].currency} ` + subTotal;
      console.log(subTotal)
    }   
};

//DESAFIATE




document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            cart_list = resultObj.data.articles
            console.log(cart_list)
            showCart(cart_list)
            subTot(cart_list)
            
        }
    })
});