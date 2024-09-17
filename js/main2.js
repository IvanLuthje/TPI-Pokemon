
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

function reset(){
    location.reload(true)
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

function reestablecer(){
    HTMLInputElement.reset()
}

function navegador() {
    var x = document.getElementById("navegador");
    if (x.className === "navegador") {
        x.className += " responsive";
    } else {
        x.className = "navegador";
    }
} 



$(document).ready(function() {

    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon?limit=10',
        method: 'GET',
        success: function(dato_pokemon) {
            var listaPokemon = dato_pokemon.results;
            
            listaPokemon.forEach(function(dato_pokemon) {
                $.ajax({
                    url: dato_pokemon.url,
                    method: 'GET',
                    success: function(dato_pokemon) {
                        var id = dato_pokemon.id;
                        var nombre = dato_pokemon.name;
                        var imagen = dato_pokemon.sprites.front_default;
                        
                        // Agregar Pokémon a la lista
                        $(".datos_pokemon").append(
                            "<div class='datos'>" + 
                            "<h2>" + id + "</h2>"  +  
                            "<div class='pokemon'>" + "<img src='" + imagen + "'>" +  "</div>" +
                            "<h1>" + nombre + "</h1>" + 
                            "<button class='compartir' alt='compartir' onClick='Mostrar(this)'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>" + "</div>");
                    },
              
                });
            });
        },
    });


   

    $("#busqueda").click(function(){
        let filtro = document.querySelector('#filtro'); // Se declara el comportamiento de los filtros de nombre, items entre otros
        var id_nombre = $("#nombre").val().toLowerCase().replace(/[^a-zA-Z0-9]/g, '');   

    if (filtro.value == 'nombre'){
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon/' + id_nombre, 
            type: "GET",
            dataType: "json",
            

            
            success: function(dato_pokemon){ 
               var nombre = dato_pokemon.name
               var imagen = dato_pokemon.sprites.front_default
               var experiencia = dato_pokemon.base_experience
               var id = dato_pokemon.id 
               var peso = dato_pokemon.weight/10
               var altura = dato_pokemon.height*10

               $(".datos_pokemon").html(
                "<div class='datos'>" +
                "<h2>#" + id + "</h2>"  +  
                "<div class='pokemon'>" + "<img src='" + imagen + "'>" + 
                "<h1>" + nombre + "</h1>"  + 
                "</div>"  + 
                "<p>Exp:" + experiencia + "</p>" + "<strong>Peso: </strong>" + peso
                 + "kg</p>" + "<p><strong>Altura: </strong>" + altura
                 + "cm</p>" + "<div>");
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
                $(".descripcion").html("<p>" + "Descripción: " + descripcion + "</p>" + "<button class='compartir' alt='compartir' onClick='Mostrar(this)'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>");},

            
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

        
});

function validar() {
    const form = document.getElementById('formulario');
    const nombre = form.nombre.value;
    const apellido = form.apellido.value;
    const nacimiento = form.nacimiento.value;
    const genero = form.genero.value;
    const calificacion = form.calificacion.value;
    const email = form.email.value;
    const comentario = form.comentario.value;
    
    if (nombre == "") {
        alert("El nombre no debe quedar vacio");
        return false;
    }

    if (nombre.search(/[^0-9]/g)) {
        alert("El nombre no debe contener números");
        return false;
    }
    
    if (nombre.search(/[^a-z]/g)) {
		alert("El nombre debe contener mayus");
        return false;

    }
    
    if (apellido == "") {
        alert("El apellido no debe estar vacio");
        return false;
    }

    if (apellido.search(/[^0-9]/g)) {
        alert("El apellido no debe contener números");
        return false;
    }

    if (apellido.search(/[^a-z]/g)) {
		alert("El apellido debe contener mayus");
        return false;

    }

    if (nacimiento == "") {
        alert("Debe ingresar fecha de nacimiento");
        return false;
    }

    if (calificacion == "") {
        alert("Debe calificar la página");
        return false;
    }

    if (email == "") {
        alert("Debe ingresar el correo electrónico");
        return false;
    }

    if (email == "r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]") {
        alert("Debe ingresar el correo electrónico válido");
        return false;
    }


    // Muestra los datos en un alert
    alert(` Nombre: ${nombre}\n Apellido: ${apellido}\n Fecha de nacimiento: ${nacimiento}\n Género: ${genero}\n Valoración de la página: ${calificacion}\n Correo Electrónico: ${email}\n Mensaje: ${comentario}`);


}

function enviar() {
    const form = document.getElementById('formulario_compartir');
    const emaile = form.email_emisor.value;
    const emailr = form.email_receptor.value;

    const comentario = form.comentario.value;

    if (emaile == "") {
        alert("Debe ingresar el correo electrónico");
        return false;
    }

    if (emaile == "r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]") {
        alert("Debe ingresar el correo electrónico válido");
        return false;
    }
    
    
    if (emailr == "") {
        alert("Debe ingresar el correo electrónico");
        return false;
    }

    if (emailr == "r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]") {
        alert("Debe ingresar el correo electrónico válido");
        return false;
    }


    // Muestra los datos en un alert
    alert(` Nombre: ${nombre}\n Apellido: ${apellido}\n Fecha de nacimiento: ${nacimiento}\n Género: ${genero}\n Valoración de la página: ${calificacion}\n Correo Electrónico: ${email}\n Mensaje: ${comentario}`);


}



