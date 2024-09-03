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

