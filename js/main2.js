
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




function Compartir(datos){
    window.location.href='compartir.html';
    var id = datos.id;
    var nombre = datos.name;
    
};




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
        url: 'https://pokeapi.co/api/v2/pokemon?limit=21',
        method: 'GET',
        success: function(datos) {
            var listaPokemon = datos.results;
            
            listaPokemon.forEach(function(datos) {
                $.ajax({
                    url: datos.url,
                    method: 'GET',
                    success: function(datos) {
                        var id = datos.id;
                        var nombre = datos.name;
                        var imagen = datos.sprites.front_default;
                        
                        // Agregar Pokémon a la lista
                        $(".info").append(
                            "<div class='datos'>" + 
                            "<h2> #" + id + "</h2>"  +  
                            "<div class='pokemon'>" + "<img src='" + imagen + "'>" +  "</div>" +
                            "<h1>" + nombre + "</h1>" + 
                            "<button class='compartir' alt='compartir' onClick='Compartir(this)'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>" + 
                            "<button class='descripcion' alt='compartir' onClick='Descripcion(this)'> " + "<i class='fa fa-binoculars' aria-hidden='true'></i>" + "</button>" + 
                            "<button class='favoritos' alt='favoritos'> " + "<i class='fa fa-heart' aria-hidden='true'></i>" + "</button>" +                 
                            "</div>");
                    },

                    error: function(xhr, status) {
                        $(".info").html("Pokémon " + id_nombre + " no disponible");
                    }
                    
                    
              
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
            

            //Mostrar cada pokemon
            success: function(datos){ 
               var nombre = datos.name
               var imagen = datos.sprites.front_default
               var experiencia = datos.base_experience
               var id = datos.id 
               var peso = datos.weight/10
               var altura = datos.height*10

               $(".info").html(
                "<div class='datos'>" +
                "<h2>#" + id + "</h2>"  +  
                "<div class='pokemon'>" + "<img src='" + imagen + "'>" + 
                "<h1>" + nombre + "</h1>"  + 
                "</div>"  + 
                "<p>Exp:" + experiencia + "</p>" + "<strong>Peso: </strong>" + peso
                 + "kg</p>" + "<p><strong>Altura: </strong>" + altura
                 + "cm</p>" + "<div>" +
                 "<button class='compartir' alt='compartir' onClick='Mostrar(this)'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>" + 
                 "<button class='descripcion' alt='compartir' onClick='Mostrar(this)'> " + "<i class='fa fa-binoculars' aria-hidden='true'></i>" + "</button>" + 
                 "<button class='favoritos' alt='favoritos' onClick='Mostrar(this)'> " + "<i class='fa fa-heart' aria-hidden='true'></i>" + "</button>" +                 
                 "</div>");
               let results = datos;
            },
            
            error: function(xhr, status) {
              $(".info").html("Pokémon " + id_nombre + " no disponible");
            },

        
            
        });

        // $.ajax({
        //     url: 'https://pokeapi.co/api/v2/pokemon-species/' + id_nombre, 
        //     type: "GET",
        //     dataType: "json",
            

            
        //     success: function(datos){ 
        //         var descripcion = datos.flavor_text_entries[26].flavor_text;
        //         $(".descripcion").html("<p>" + "Descripción: " + descripcion + "</p>" + "<button class='compartir' alt='compartir' onClick='Mostrar(this)'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>");},

            
        // });


        
      }
      if (filtro.value == 'item'){
        $.ajax({
            url: "https://pokeapi.co/api/v2/item/" + id_nombre, 
            type: "GET",
            dataType: "json",
            success: function(datos){ 
                var nombre = datos.names[5].name
                var imagen = datos.sprites.default
                var costo = datos.cost
                var tipo = datos.category.name
                var id = datos.id 
      
               $(".info").html(
                "<div class ='datos'>" +
                "<h2>#" + id + "</h2>"  +  
                "<h1>" + nombre + "</h1>" + 
                "<div class='item'>" + "<img src='" + imagen + "'>" +  "</div>" + 
                "<p>" + "Costo:  " + costo  +  "</p>" + 
                "<p>" + "Tipo:  " +  tipo +  "</p>" + 
                // "Descripción: " + datos.flavor_text_entries[13].text + "</p>" + 
                "<button class='compartir' alt='compartir' onClick='Mostrar(this)'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>" + 
                "<button class='descripcion' alt='compartir' onClick='Mostrar(this)'> " + "<i class='fa fa-binoculars' aria-hidden='true'></i>" + "</button>" + 
                "<button class='favoritos' alt='favoritos'> " + "<i class='fa fa-heart' aria-hidden='true'></i>" + "</button>" +                                 "</div>");
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
            success: function(datos){
               // $(".info").html("<h1>" + datos.name + "</h1><img src='" + datos.sprites.front_default + "' alt='" + datos.name + "'><p>Peso: " + datos.weight + "</p><p>Altura: " + datos.height + "cm</p>");
               $(".info").html("");
            },
            error: function(xhr, status) {
                alert("Tipo no disponible");
            }

        


        });
      }

      
    });

    $('#pokemon-list').on('click', '.favoritos', function() {
        var pokemonName = $(this).data('name');
        $('#favoritos').append('<li>' + pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) + ' <span class="eliminar">Eliminar</span></li>');
    });

    // Eliminar Pokémon de la lista de favoritos
    $('#favoritos').on('click', '.eliminar', function() {
        $(this).parent().remove();
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

    if (emaile == "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/") {
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

    else{
        alert("Redireccionando al gestor de correo")
        window.location = 'mailto: ' + $("#email_receptor").val() + '?subject=' + 'Compartir&body=' + $("#comentario").val();
        return true;
    }


    // Muestra los datos en un alert
    alert(` Nombre: ${nombre}\n Apellido: ${apellido}\n Fecha de nacimiento: ${nacimiento}\n Género: ${genero}\n Valoración de la página: ${calificacion}\n Correo Electrónico: ${email}\n Mensaje: ${comentario}`);


}



