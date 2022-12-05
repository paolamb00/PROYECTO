const ORDER_ASC_BY_COST = "1-2";
const ORDER_DESC_BY_COST = "2-1";
const ORDER_BY_PROD_SOLDCOUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let products_content = PRODUCTS_URL + localStorage.getItem("catID") + ".json" //forma con la que se accede a los productos de cada categoría según el id
let catName = {101:"Autos", 102:"Juguetes", 103:"Muebles", 104:"Herramientas", 105:"Computadoras", 106:"Vestimenta",
107:"Electrodomésticos", 108:"Deporte", 109:"Celulares"}; //nombres de categorías de acuerdo a su id
let product_list = "";
let priceMin = document.getElementById("FilterPriceMin");
let priceMax = document.getElementById("FilterPriceMax");
let search = document.getElementById("searchBar");

//MOSTRAR PRODUCTOS EN HTML
//esta función muestra los productos (con sus características) a partir del JSON de productos
function showProductList(list){
    let htmlContentToAppend = "";
    for(let i = 0; i < list.length; i++){
        let product =  list[i]
        htmlContentToAppend += `
        <div onclick="redirecting(`+product.id+`)" class="list-group-item list-group-item-action cursor-active" id="productDetail">
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
//esta función muestra el nombre de la categoría a la que pertenecen los productos de acuerdo a lo seleccionado por
//el usuario
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
//esta función es la que filtra los productos por precio (asc y desc) como también por cantidad de productos vendidos
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST){
        result = array.sort(function(a, b) {
            return b.cost - a.cost
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            return a.cost - b.cost
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            return  b.soldCount - a.soldCount
        });
    }
    console.log(result)
    showProductList(result);
}

//cada botón para filtrar lo hace de acuerdo a su criterio previamente asignado
//y muestra la lista de productos ordenada conforme a este
document.getElementById("sortPriceDesc").addEventListener('click', function(){
    let filtered = sortProducts(ORDER_DESC_BY_COST, product_list);
    showProductList(filtered);
});

document.getElementById("sortPriceAsc").addEventListener('click', function(){
    let filtered = sortProducts(ORDER_ASC_BY_COST, product_list);
    showProductList(filtered);
});

document.getElementById("sortBySoldCount").addEventListener('click', function(){
    let filtered = sortProducts(ORDER_BY_PROD_SOLDCOUNT, product_list);
    showProductList(filtered);
});



//LIMPIAR FILTRO
//el botón de limpiar vacía los campos de filtros y la barra de búsqueda
//y vuelve a mostrar la lista inicial
limpiar.addEventListener("click",function(){
    document.getElementById("FilterPriceMin").value = "";
    document.getElementById("FilterPriceMax").value = "";
    document.getElementById("searchBar").value = "";
    
    showProductList(product_list);
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