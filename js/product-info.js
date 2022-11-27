const PRODUCT_API_INFO = "https://japceibal.github.io/emercado-api/products/";
let product_info = PRODUCT_API_INFO + localStorage.getItem("product") + ".json"
let info_list ="";
const COMMENTS_API_INFO = "https://japceibal.github.io/emercado-api/products_comments/";
let product_comments = COMMENTS_API_INFO + localStorage.getItem("product") + ".json"
let comments_list = "";
let commentsArray = [];
let sortCriteria = undefined;
const ORDER_ASC_BY_RATING = "1-2";
const ORDER_DESC_BY_RATING = "2-1";

//MOSTRAR INFO DEL PRODUCTO

function showProductInfo(inf_list){
    let htmlContentToAppend ="";
        htmlContentToAppend += `
        <div class="information">
        <div class="prTitle">
        <br>
        <h1>`+inf_list.name+`</h1> 
        </div>
        <br>
        <div class="prData">
        <hr>
        <p id="volver"><i class="bi bi-arrow-left"></i>
        <a href="products.html">Volver al listado</a>
        </p>
        <h4><i class="bi bi-cash-stack"></i> Precio:</h4>
        <p>`+inf_list.currency+` `+inf_list.cost+`</p>
        <h4><i class="bi bi-info-circle"></i> Descripción:</h4>
        <p>`+inf_list.description+`</p>
        <h4><i class="bi bi-tags"></i> Categoría:</h4>
        <p>`+inf_list.category+`</p>
        <h4><i class="bi bi-truck"></i> Cantidad de vendidos:</h4>
        <p>`+inf_list.soldCount+`</p>
        </div>
        
        `
     document.getElementById("infoProd").innerHTML = htmlContentToAppend;
   }

//MOSTRAR IMÁGENES

function productImg(){
    let htmlContentToAppend = "";
    for(let i = 0; i < info_list.images.length; i++){
     htmlContentToAppend += `  
         <img src="`+info_list.images[i]+`">                        
    `
  }
      document.getElementById("imgProd").innerHTML = htmlContentToAppend;
};
     

//MOSTRAR COMENTARIOS

function userComment(comment_list){

    let ratingScore = `<span class="fa fa-star checked"></span>`.repeat(5);
    let htmlContentToAppend = "";
    for( let i = 0; i < comment_list.length; i++ ){
        if(comment_list[i].score > 0 && comment_list[i].score <=5){
            ratingScore = `<span class="fa fa-star checked"></span>`.repeat(comment_list[i].score);
            ratingScore += `<span class="fa fa-star"></span>`.repeat(5-comment_list[i].score);
        }
     htmlContentToAppend +=`
    <div class="list-group-item list-group-item-action cursor-active">
    <ul>
    <p><b>${comment_list[i].user}</b> <span class="text-muted">${comment_list[i].dateTime}</span> ${ratingScore}
    </p>
    <p>${comment_list[i].description}</p>
    </ul>
    </div>
    `    
    }
    
    document.getElementById("comments").innerHTML = htmlContentToAppend
}

//FUNCIÓN PARA FILTRAR COMENTARIOS (en desarrollo)
function filterComments(criteria, array){
    let result = [];
    if (criteria === ORDER_DESC_BY_RATING){
        result = array.sort(function(a, b) {
            return b.score - a.score
        });
    }else if (criteria === ORDER_ASC_BY_RATING){
        result = array.sort(function(a, b) {
            return a.score - b.score
        });
    }
    console.log(result);
    userComment(result);
};

document.getElementById("sortBest").addEventListener('click', function(){
let order = filterComments(ORDER_DESC_BY_RATING, comments_list);
userComment(order);
});

document.getElementById("sortWorst").addEventListener('click', function(){
    let order = filterComments(ORDER_ASC_BY_RATING, comments_list);
    userComment(order);
});

//PRODUCTOS RELACIONADOS

function relatedProducts(){
    let htmlContentToAppend= "";
    for(let i = 0; i < info_list.relatedProducts.length; i++){
    htmlContentToAppend += `
    <div onclick="redirecting(`+info_list.relatedProducts[i].id+`)" class="list-group-item list-group-item-action cursor-active">
       <img class="card-img-top" src="`+info_list.relatedProducts[i].image+`" alt="Card image cap">
        <div class="card-body">
         <p class="card-text">`+info_list.relatedProducts[i].name+`</p>
      </div>
    </div>  
    `
    }
    
    document.getElementById("relatedProd").innerHTML = htmlContentToAppend
}

//AGREGAR COMENTARIO

document.getElementById("btnComment").addEventListener('click', function(){
    let correo1 =  localStorage.getItem("Email");
    let nuevoComentario = document.getElementById("FormControlTextarea").value;
    let nuevaPuntuacion = document.getElementById("FormControlSelect").value;
    if(nuevaPuntuacion <=5){
        nuevaPuntuacion = `<span class="fa fa-star checked"></span>`.repeat(nuevaPuntuacion);
    }else{
        if(nuevaPuntuacion > 0){
          nuevaPuntuacion += `<span class="fa fa-star"></span>`.repeat(5-nuevaPuntuacion);  
        }      
    } 
   document.getElementById("comments").innerHTML+= `
   <div class="list-group-item list-group-item-action cursor-active">
    <ul>
    <p>
     <b>`+correo1+`</b>  `+nuevaPuntuacion+`
    </p>
    <p>
    `+nuevoComentario+` 
    </p>
    </ul>
    </div>
    `    
});

//REDIRIGIR A CARRITO DE COMPRAS
document.getElementById("carritoID").addEventListener('click', function(e){
     if(localStorage.getItem("addToCart")){
      let cartList = JSON.parse(localStorage.getItem("addToCart"));
      cartList.push(info_list);
      localStorage.setItem("addToCart", JSON.stringify(cartList));
    }else{
    localStorage.setItem("addToCart", JSON.stringify([info_list]))
}
    window.location = "cart.html";
});
        

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(product_info).then(function(resultObj){
        if (resultObj.status === "ok"){
            info_list = resultObj.data
            console.log(info_list)
            showProductInfo(info_list)
            productImg(info_list)
            relatedProducts(info_list)
        }
    })
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(product_comments).then(function(resultObj){
        if (resultObj.status === "ok"){
            comments_list = resultObj.data
            console.log(comments_list)
            userComment(comments_list)
        }
    })
});