const PRODUCT_CART = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let cart_list = "";






document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_CART).then(function(resultObj){
        if (resultObj.status === "ok"){
            cart_list = resultObj.data
            console.log(cart_list)
            
        }
    })
});