Estructura de la página

En las 3 páginas se han definido 2 clases de pantallas, una para escritorio y otra para responsive
Las mismas se definieron como main y main2 respectivamente

Dentro de la clase main se han creado 2 clases de columnas, col_izq, en donde representa la columna izquierda donde se encuentra definido el menú de opciones y col_der, la columna derecha donde se encuentra definido el contenido de la página (Formulario, resultados de búsqueda, mapas, etc.)

En la clase main2 se ha creado la clase col donde esta definida la subclase col2, en donde se encuentra el navegador responsivo definido por un id llamado navegador. (No se ha utilizado ningun Framework)
Para ello se tuvo en cuenta que para un display mayor a 600px (tablets y escritorio) se oculta la clase main2 y con un display menor a 600px (móviles) se oculta la clase main mediante el parametro display:none en css.

Funcionalidad

Estructura de la página

En las 3 páginas se han definido 2 clases de pantallas, una para escritorio y otra para responsive
Las mismas se definieron como main y main2 respectivamente

Dentro de la clase main se han creado 2 clases de columnas, col_izq, en donde representa la columna izquierda donde se encuentra definido el menú de opciones y col_der, la columna derecha donde se encuentra definido el contenido de la página (Formulario, resultados de búsqueda, mapas, etc.)

En la clase main2 se ha creado la clase col donde esta definida la subclase col2, en donde se encuentra el navegador responsivo definido por un id llamado navegador. (No se ha utilizado ningun Framework)
Para ello se tuvo en cuenta que para un display mayor a 600px (tablets y escritorio) se oculta la clase main2 y con un display menor a 600px (móviles) se oculta la clase main mediante el parametro display:none en css.

Funcionalidad

<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Pokemon</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='css/style.css'>
    <link rel="icon" type="image/x-icon" href="img/pokeball-logo.png">
    <link href="https://fonts.cdnfonts.com/css/pokemon-solid" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src='js/main2.js'></script>
</head>

<body>
    <div class="main">
        <div class="col_izq">
            <div class="imagen"> <a href="index.html"><img src='img/International_Pokémon_logo.svg.png'></a></div>
            <p><a href="contacto.html">CONTACTO</a></p>
            <p><a href="compartir.html">COMPARTIR</a></p>
            <p><a href="index2.html">INDEX nuevo</a></p>
        </div>
        <div class="col_der">
            <input class="id_nombre" id="nombre" type="text" placeholder="Ingresar el nombre de un pokemon o ID de Pokemon">
            <select name="" id="filtro">
                <!--option value="sel" id="opciones">---Seleccionar opción---</option-->
                <option value="nombre" id="opciones">Nombre</option>
                <option value="tipos" id="opciones">Tipos</option>
                <option value="item" id="opciones">Item</option>
            </select>
            <button class="boton_busqueda" id="busqueda" type="button">Buscar</button>
            <div class="datos_pokemon"></div>
            <div class="descripcion"></div>
            <div class="datos_item"></div>     
        </div>
    </div>
    
    <div class="main2">
        <div class="col">
            <div class="imagen"><a href="index.html"></a><img src='img/International_Pokémon_logo.svg.png'></div>
            <div class="col2">
                <nav id="navegador">
                    <a href="javascript:void(0);" class="icon" onclick="navegador()">&#9776; </a>
                    <a href="contacto.html">CONTACTO</a>
                    <a href="compartir.html">COMPARTIR</a>
                </nav>
            </div>
            <input class="nombre_res" id="nombre_res" type="text" placeholder="Ingresar el nombre de un pokemon o ID de Pokemon">
            <select name="" id="filtro2">
          <!--       <option value="sel" id="opciones">---Seleccionar opción---</option> -->
                <option value="nombre" id="opciones">Nombre</option>
                <option value="tipos" id="opciones">Tipos</option>
                <option value="item" id="opciones">Item</option>
            </select>
            <button class="busqueda_res" id="busqueda_res" type="button">Buscar</button>
            <div class="datos_pokemon"></div> 
            <div class="descripcion"></div>
            <div class="datos_item"></div> 
        </div>
    </div>
</body>
<!-- <footer>
    Pokemon
</footer> -->

</html>

function iniciarMap(){
    var coord = {lat:-34.922883333333, lng:-57.956316666667};
    var map = new google.maps.Map(document.getElementById('googleMap'),{
        zoom: 10,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });
}



// function Mostrar(){
//     let indice_res = localStorage.getItem('datos_pokemon');
//     $(".comentario_res").val(localStorage.getItem(indice_res));
//     localStorage.clear();
// }

function Mostrar(dato_pokemon){
    let dato = dato_pokemon.dato;
    localStorage.setItem('dato_pokemon', dato);
    window.location.href='compartir.html';
};

function compartir() {
    location.href = "compartir.html";
    localStorage.setItem("datos_pokemon", guardarPokemon); 
}

function enviar_resultado(comentario){
    let guardarPokemon= JSON.parse(guardarPersona);
}

function cancelar() {
    var respuesta = confirm('Desea volver a la pagina principal?');
    if (respuesta == true){
        location.href = "index.html"
    }
    else{
        return false;
    }
};

function navegador() {
    var x = document.getElementById("navegador");
    if (x.className === "navegador") {
        x.className += " responsive";
    } else {
        x.className = "navegador";
    }
} 



$(document).ready(function(){
    $("#busqueda").click(function(){
        let filtro = document.querySelector('#filtro');
        var id_nombre = $("#nombre").val().toLowerCase().replace(/[^a-zA-Z0-9]/g, '');    

    if (filtro.value == 'nombre'){
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon/' + id_nombre, 
            type: "GET",
            dataType: "json",
            

            
            success: function(dato_pokemon){ 
               // $(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1><img src='" + dato_pokemon.sprites.front_default + "' alt='" + dato_pokemon.name + "'><p>Peso: " + dato_pokemon.weight + "</p><p>Altura: " + dato_pokemon.height + "cm</p>");
               //$(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1>" + "<div class='pokemon'>" + "<img src='" + dato_pokemon.sprites.front_default + "'>" + "</div>" + "<p>Exp:" + dato_pokemon.base_experience + "</p>" + "<p>Peso:" + dato_pokemon.weight + "Kg</p>"  +  "<p>Altura: " + dato_pokemon.height + "m</p>" + "<button class='compartir' onClick='compartir()'> " + "Compartir" + "</button>");
               $(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1>"  + "<div class='pokemon'>" + "<img src='" + dato_pokemon.sprites.front_default + "'>" + "</div>"  +  "ID:" + dato_pokemon.id + "</p>"  +  "<p>Exp:" + dato_pokemon.base_experience + "</p>" + "<p>Peso:" + dato_pokemon.weight + "Kg</p>" + "<p>Altura: " + dato_pokemon.height + "m</p>");
               let results = dato_pokemon;
            },
            
            error: function(xhr, status) {
                alert("Pokémon " + id_nombre + " no disponible");
            },
            
        });

        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon-species/' + id_nombre, 
            type: "GET",
            dataType: "json",
            

            
            success: function(dato_pokemon){ 
                var descripcion = dato_pokemon.flavor_text_entries[26].flavor_text;
               $(".descripcion").html("<p>" + "Descripción: " + descripcion + "</p>" + "<button class='compartir' onClick='Mostrar(this)'> " + "Compartir" + "</button>");
            },

            
        });


        
      }
      if (filtro.value == 'item'){
        $.ajax({
            url: "https://pokeapi.co/api/v2/item/" + id_nombre, 
            type: "GET",
            dataType: "json",
            success: function(dato_pokemon){

               // $(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1><img src='" + dato_pokemon.sprites.front_default + "' alt='" + dato_pokemon.name + "'><p>Peso: " + dato_pokemon.weight + "</p><p>Altura: " + dato_pokemon.height + "cm</p>");
               $(".datos_pokemon").html("<div class ='titulo'>" + "<h1>" + dato_pokemon.names[5].name + "</h1>" + "</div>" + "<div class='item'>" + "<img src='" + dato_pokemon.sprites.default + "'>" +  "</div>" + "<p>" + "Costo:  " +  dato_pokemon.cost +  "</p>" + "<p>" + "Tipo:  " +  dato_pokemon.category.name +  "</p>" + "Descripción: " + dato_pokemon.flavor_text_entries[13].text + "</p>" + "<button class='compartir' onClick='compartir()'> " + "Compartir" + "</button>");
            },
            error: function(xhr, status) {
                alert("El item " + id_nombre + " no se ha encontrado");
            }
           
        });
      }
      if (filtro.value == 'tipos'){
        $.ajax({
            url: "https://pokeapi.co/api/v2/type/" + "nombre_tipos", 
            type: "GET",
            dataType: "json",
            success: function(dato_pokemon){
               // $(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1><img src='" + dato_pokemon.sprites.front_default + "' alt='" + dato_pokemon.name + "'><p>Peso: " + dato_pokemon.weight + "</p><p>Altura: " + dato_pokemon.height + "cm</p>");
               $(".datos_pokemon").html("");
            },
            error: function(xhr, status) {
                alert("Tipo no disponible");
            }




        });
      }

      
    });

function desc(){
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon-species/' + id_nombre, 
        type: "GET",
        dataType: "json",

        
        success: function(dato_pokemon){ 

           // $(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1><img src='" + dato_pokemon.sprites.front_default + "' alt='" + dato_pokemon.name + "'><p>Peso: " + dato_pokemon.weight + "</p><p>Altura: " + dato_pokemon.height + "cm</p>");
           //$(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1>" + "<div class='pokemon'>" + "<img src='" + dato_pokemon.sprites.front_default + "'>" + "</div>" + "<p>Exp:" + dato_pokemon.base_experience + "</p>" + "<p>Peso:" + dato_pokemon.weight + "Kg</p>"  +  "<p>Altura: " + dato_pokemon.height + "m</p>" + "<button class='compartir' onClick='compartir()'> " + "Compartir" + "</button>");
           $(".datos_pokemon2").html(descripcion);

        },
        error: function(xhr, status) {
            alert("Pokémon " + id_nombre + " no disponible");
        },
        
    });
}
    

// Modo responsivo

/* function iniciarMapRes(){
    var coord = {lat:-34.922883333333, lng:-57.956316666667};
    var map = new google.maps.Map(document.getElementById('googleMap2'),{
        zoom: 10,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });
} */


    $("#busqueda_res").click(function(){
        let filtro = document.querySelector('#filtro2');
        var id_nombre = $("#nombre_res").val().toLowerCase().replace(/[^a-zA-Z0-9]/g, '');


    if (filtro.value == 'nombre'){
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon/' + id_nombre,
            type: "GET",
            timeout: 0,
            dataType: "json",
            
            success: function(dato_pokemon){ 
            // $(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1><img src='" + dato_pokemon.sprites.front_default + "' alt='" + dato_pokemon.name + "'><p>Peso: " + dato_pokemon.weight + "</p><p>Altura: " + dato_pokemon.height + "cm</p>");
            //$(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1>" + "<div class='pokemon'>" + "<img src='" + dato_pokemon.sprites.front_default + "'>" + "</div>" + "<p>Exp:" + dato_pokemon.base_experience + "</p>" + "<p>Peso:" + dato_pokemon.weight + "Kg</p>"  +  "<p>Altura: " + dato_pokemon.height + "m</p>" + "<button class='compartir' onClick='compartir()'> " + "Compartir" + "</button>");
            if (id_nombre!=''){
                $(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1>"  + "<div class='pokemon'>" + "<img src='" + dato_pokemon.sprites.front_default + "'>" + "</div>"  +  "<p>ID:" + dato_pokemon.id + "</p>"  +  "<p>Exp:" + dato_pokemon.base_experience + "</p>" + "<p>Peso:" + dato_pokemon.weight + "Kg</p>" + "<p>Descripcion:" + dato_pokemon.flavor_text + "</p>"  +  "<p>Altura: " + dato_pokemon.height + "m</p>" + "<button class='compartir' onClick='compartir(this)'> " + "Compartir" + "</button>");
            }

            

            else{
                
            }
            let results = dato_pokemon;
            console.log(dato_pokemon); 
            },
            error: function(xhr, status) {
                alert("Pokémon " + id_nombre + " no disponible");
            },
            
        });
    }

    
    if (filtro.value == 'item'){
        $.ajax({
            url: "https://pokeapi.co/api/v2/item/" + id_nombre, 
            type: "GET",
            dataType: "json",
            success: function(dato_pokemon){

            // $(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1><img src='" + dato_pokemon.sprites.front_default + "' alt='" + dato_pokemon.name + "'><p>Peso: " + dato_pokemon.weight + "</p><p>Altura: " + dato_pokemon.height + "cm</p>");
            $(".datos_pokemon").html("<div class ='titulo'>" + "<h1>" + dato_pokemon.names[5].name + "</h1>" + "<div class='item'>" + "<img src='" + dato_pokemon.sprites.default + "'>" +  "</div>" + "</div>" + "<p>" + "Costo:  " +  dato_pokemon.cost +  "</p>" + "<p>" + "Tipo:  " +  dato_pokemon.category.name +  "</p>" + "<p>" + "Descripción: " + dato_pokemon.flavor_text_entries[13].text + "</p>" + "<button class='compartir' onClick='compartir(this)'>" + "Compartir" + "</button>");
            },
            error: function(xhr, status) {
                alert("El item " + id_nombre + " no se ha encontrado");
            }
        
        });
    }
    if (filtro.value == 'tipos'){
        $.ajax({
            url: "https://pokeapi.co/api/v2/type/" + "id_nombre", 
            type: "GET",
            dataType: "json",
            success: function(dato_pokemon){
            // $(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1><img src='" + dato_pokemon.sprites.front_default + "' alt='" + dato_pokemon.name + "'><p>Peso: " + dato_pokemon.weight + "</p><p>Altura: " + dato_pokemon.height + "cm</p>");
            $(".datos_pokemon").html("");
            },
            error: function(xhr, status) {
                alert("Tipo no disponible");
            }
        });
    }
    });
  

});

/* $(document).ready(function(){
    $("#compartir").click(function(){
        var id_nombre = $("#nombre").val();
        $.ajax({
            //url: "https://pokeapi.co/api/v2/pokemon/" + id_nombre.toLowerCase(),
            url: "https://pokeapi.co/api/v2/pokemon/" + id_nombre,
            type: "GET",
            dataType: "json",
            success: function(dato_pokemon){
            $(".datos_pokemon").html("<h1>" + dato_pokemon.name + "</h1>" + "<div class='pokemon'>" + "<img src='" + dato_pokemon.sprites.front_default + "'>" + "</div>" + "<p>Peso:" + dato_pokemon.weight + "Kg</p>"  + "<p>Formas:" + dato_pokemon.forms + "Kg</p>" + "<p>Altura: " + dato_pokemon.height + "m</p>");
            },
            error: function(xhr, status) {
                alert("Pokémon no disponible");
            }
        });
    });
}); */

