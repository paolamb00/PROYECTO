// const PRODUCT_CART = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
// let cart_list = "";
// let prodImg = document.getElementById("imgProduct");
// let prodNam = document.getElementById("nameProduct");
// let prodCost = document.getElementById("costProduct");
// let prodCant = document.getElementById("cantProd");
// let prodSub = document.getElementById("subProduct");
let cantPr = 1;
let subtotalProducts = [];
let subTotalValue = 0;
let totalValue = 0;
let deliveryValue = 0;
let premium = document.getElementById("premiumradio");
let express = document.getElementById("expressradio");
let standard = document.getElementById("standardradio");
let cardNumber = document.getElementById("cardN");
let cardSecurity = document.getElementById("cardSec");
let cardDate = document.getElementById("cardDate");
let saveData = document.getElementById("btnModal");
let dolarPrice = 41;





// //FUNCIÓN PARA MOSTRAR PRODUCTO ORIGINAL
// function showCart(cart_data){
//     for(let i = 0; i < cart_data.length; i++){
//         prodImg.innerHTML += `<img src="${cart_data[i].image}">`
//         prodNam.textContent += `${cart_data[i].name}`
//         prodCost.innerHTML += `${cart_data[i].currency} ${cart_data[i].unitCost}` 
//         prodCant.value = `${cart_data[i].count}`
       
//     }
    
// };

// // CALCULAR SUBTOTAL EN TIEMPO REAL
// function upgradeSub(cart){
//     for(let i =0; i < cart.length;i++){
//       let subTot = `${cart[i].unitCost}` * prodCant.value;
//       prodSub.innerHTML = `${cart[i].currency} ` + subTot;  
//     }
// };


// prodCant.addEventListener('click', function(){
//     upgradeSub(cart_list)
// });


// document.addEventListener("DOMContentLoaded", function(e){
//     getJSONData(PRODUCT_CART).then(function(resultObj){
//         if (resultObj.status === "ok"){
//             cart_list = resultObj.data.articles
//             console.log(cart_list)
//             showCart(cart_list)
//             upgradeSub(cart_list)
//         }
//     })
// });

//CARRITO DE COMPRAS (+- NO APARECE LA MONEDA EN EL SUBTOTAL CUANDO SE ACTUALIZA EL INPUT)
function cartPrNew(new_product){
    let htmlContentToAppend ="";
    for(let i= 0; i < new_product.length;i++){
        const { name, currency, cost } = new_product[i];
        let productValue = cost;
        htmlContentToAppend+=`
    <tr">
      <td><img src="${new_product[i].images[0]}" id="prTh"></td>
      <td>`+ name + `</td>
      <td>`+ currency + ` `+ productValue + `</td>
      <td><input type="number" id="cantidad${i}" onchange="updateSubtotal(`+ productValue + `, ${i})" class="form-control" value="1" min="1" style="width: 4em;" required></td>
      <td id="subtotalItem${i}"><b>`+ currency + ` `+(cantPr * productValue)+` </td>
      <td>
      <button type="button" id="trashCan"><i class="bi-trash" style="color:red"></i></button></td>
    </tr>
    `
    }
    document.getElementById("cartB").innerHTML = htmlContentToAppend;
    updateSubtotal(productValue, index);
    updateTotal();
};

//SUBTOTAL 
function updateSubtotal(cost, i){ //como parámetros el precio y el índice del artículo en el array
        subTotalValue = 0;
        if(i >=0){
            cantPr = document.getElementById('cantidad' + i).value; //cantidad de artículos que surgen del input
            let subtotalItem = cost * cantPr; //el subtotal es precio * cantidad
            subtotalProducts[i] = subtotalItem; //el subtotal de un producto se agrega al array que contiene todos los subtotales
            subtotalProducts.forEach(subPr =>{
                subTotalValue += subPr //cada subtotal se suma al subtotal general de los productos
            });
            document.getElementById("subtotalItem" + i).innerHTML = subtotalItem; //se muestra el subtotal de cada producto(falta mostrar la moneda)
        }  
        document.getElementById("productCostText").innerHTML = Math.round(subTotalValue); //se muestra el subtotal de todos los productos
        updateTotal();
};  


//TOTAL EN BASE A SUBTOTAL Y FORMA DE ENVÍO
function updateTotal(){
    if(premium.checked){ //se fija que radio (tipo de envío) está seleccionado y en base a ello calcula un porcentaje sobre el subtotal
        deliveryValue = subTotalValue * 0.15;
    }
    if(standard.checked){
        deliveryValue = subTotalValue * 0.05;
    }
    if(express.checked){
        deliveryValue = subTotalValue * 0.07;
    }
    totalValue = Math.round(deliveryValue) + Math.round(subTotalValue); //el total se modifica en base al subtotal y el envío
    document.getElementById("comissionText").innerHTML =  Math.round(deliveryValue);
    document.getElementById("totalCostText").innerHTML =  Math.round(totalValue);
};

//FUNCIÓN PARA VALIDAR FORMULARIO
(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

//CHECKBOX DISABLED
function check(){
    if(document.getElementById("cardRadio").checked){ //si se selecciona tarjeta se desactiva la opción para ingresar una cuenta bancaria
        document.getElementById("bankAccount").disabled = true;
    }else{
        document.getElementById("bankAccount").disabled = false;
    }
    if(document.getElementById("bankRadio").checked){ //si se selecciona transferencia se desactivan los campos para tarjeta de crédito
        document.getElementById("cardN").disabled = true;
        document.getElementById("cardSec").disabled = true;
        document.getElementById("cardDate").disabled = true;
        document.getElementById("paymentType").value = "Transferencia bancaria"
    }else{
        document.getElementById("cardN").disabled = false;
        document.getElementById("cardSec").disabled = false;
        document.getElementById("cardDate").disabled = false;
        document.getElementById("paymentType").value = "Tarjeta de crédito"
    }
   
};



document.addEventListener("DOMContentLoaded", function(e){
    const saveInfo = JSON.parse(localStorage.getItem("addToCart"))
    console.log(saveInfo)
    cartPrNew(saveInfo);
 });

 premium.addEventListener('change', function(){
    updateTotal()
 });

 express.addEventListener('change', function(){
    updateTotal()
 });

 standard.addEventListener('change', function(){
    updateTotal()
 });


