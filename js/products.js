const ORDER_ASC_BY_COST = "1-2";
const ORDER_DESC_BY_COST = "2-1";
const ORDER_BY_PROD_SOLDCOUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let products_content = PRODUCTS_URL + localStorage.getItem("catID") + ".json"
let catName = {101:"Autos", 102:"Juguetes", 103:"Muebles", 104:"Herramientas", 105:"Computadoras", 106:"Vestimenta",
107:"Electrodomésticos", 108:"Deporte", 109:"Celulares"};
let product_list = "";
let priceMin = document.getElementById("FilterPriceMin");
let priceMax = document.getElementById("FilterPriceMax");
let search = document.getElementById("searchBar");

//MOSTRAR PRODUCTOS EN HTML

function showProductList(list){
    let htmlContentToAppend = "";
    for(let i = 0; i < list.length; i++){
        let product =  list[i]
        htmlContentToAppend += `
        <div onclick="redirecting(`+product.id+`)" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
                <div class="col-3">
                     <img src="`+product.image+`" alt="product" class="img-thumbnail">
                 </div>
                 <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h4>`+product.name+` - $ `+product.currency+` `+product.cost+`</h4>
                    <br>
                    <p>`+product.description+`</p>
                    </div>
                   <small class="text-muted">`+product.soldCount+` artículos</small>
                </div>
            </div>
        </div>
    </div>
    `
    }
    document.getElementById("productos").innerHTML = htmlContentToAppend;
    catNames();
}

//MOSTRAR NOMBRE DE CATEGORÍA ACTUAL

function catNames(){
    document.getElementById("catNom").innerHTML = "Verás aquí todos los productos de la categoría " + catName[localStorage.getItem("catID")]
}



//FILTROS

function filter(){
    let filterResults = product_list; 

    if(priceMin.value != ""){
        filterResults = filterResults.filter(product => product.cost > priceMin.value)};
    if(priceMax.value != ""){
        filterResults = filterResults.filter(product => product.cost < priceMax.value)};
    if(search.value != ""){
        filterResults = filterResults.filter(product => product.name.toLowerCase().includes(search.value.toLowerCase()))}
    
        showProductList(filterResults)
    }

//BOTONES DE FILTRO

function sortProducts(criteria, array){
    let arraySorted = [];
    if (criteria === ORDER_ASC_BY_COST){
        arraySorted = array.sort(function(a, b) {
            return a.cost - b.cost
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        arraySorted = array.sort(function(a, b) {
            return b.cost - a.cost
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        arraySorted = array.sort(function(a, b) {
            return  b.soldCount - a.soldCount
        });
    }
    showProductList(arraySorted);
}


function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductList();
}

document.getElementById("sortPriceDesc").addEventListener('click', function(){
    sortAndShowProducts(ORDER_DESC_BY_COST);
});

document.getElementById("sortPriceAsc").addEventListener('click', function(){
    sortAndShowProducts(ORDER_ASC_BY_COST);
});

document.getElementById("sortBySoldCount").addEventListener('click', function(){
    sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
});



//LIMPIAR FILTRO

limpiar.addEventListener("click",function(){
    document.getElementById("FilterPriceMin").value = "";
    document.getElementById("FilterPriceMax").value = "";
    document.getElementById("searchBar").value = "";
    
    showProductList();
})


//PARA MOSTRAR LOS DATOS 

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(products_content).then(function(resultObj){
        if(resultObj.status === "ok"){
            product_list = resultObj.data.products;
            console.log(product_list)
            showProductList(product_list);
        }
    })
})

//REDIRIGIR A CADA PRODUCTO
function redirecting(id) {
    localStorage.setItem("product", id);
    window.location = "product-info.html"
}

document.getElementById("FilterPriceMin").addEventListener('input', filter);
document.getElementById("FilterPriceMax").addEventListener('input', filter);
document.getElementById("searchBar").addEventListener('input', filter);

mostrarUsuarios();