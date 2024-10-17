function iniciarMap() {
    var coord = { lat: -34.922883333333, lng: -57.956316666667 };
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 10,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });
}

function Compartir() {
    window.location.href = 'compartir.html';
    $("#comentario").html(nombre, desc)

};

function abrirFav() {
    document.getElementById("navegador").style.width = "200px";
}

function cerrarFav() {
    document.getElementById("navegador").style.width = "0";

}



$(document).ready(function () {





    $('.cancel').click(function () {
        var respuesta = confirm('Desea volver a la pagina principal?');
        if (respuesta == true) {
            location.href = "index.html"
        }
        else {
            return false;
        }
    });


    $('.reset').click(function () {
        location.reload(true)
    });





    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokemon?limit=21',
        method: 'GET',
        success: function (datos) {
            var listaPokemon = datos.results;

            listaPokemon.forEach(function (datos) {
                $.ajax({
                    url: datos.url,
                    method: 'GET',
                    success: function (datos) {
                        var id = datos.id;
                        var nombre = datos.name;
                        var imagen = datos.sprites.front_default;
                        var experiencia = datos.base_experience
                        var id = datos.id
                        var peso = datos.weight / 10
                        var altura = datos.height * 10


                        $('.descripcion').click(function () {

                            $.ajax({
                                url: 'https://pokeapi.co/api/v2/pokemon-species/' + nombre,
                                type: "GET",
                                dataType: "json",
                                success: function (datos) {
                                    var desc = datos.flavor_text_entries[26].flavor_text;
                                    modal.style.display = "block";
                                    $(".info").html(
                                        "<h1>" + nombre + "</h1>" +
                                        "</div>" +
                                        "<div class='pokemon'>" + "<img src='" + imagen + "'>" +
                                        "<p><strong>Exp: </strong>" + experiencia + "</p>" + "<strong>Peso: </strong>" + peso
                                        + "kg</p>" + "<p><strong>Altura: </strong>" + altura
                                        + "cm</p>" + "<div>" +
                                        "<p>" + "<strong> Descripción: </strong>" + desc + "</p>" +
                                        "<button class='compartir'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>");
                                },

                            });


                        });

                        $(".info_id").append(
                            "<div class='datos'>" +
                            "<h2> #" + id + "</h2>" +
                            "<div class='pokemon'>" + "<img src='" + imagen + "'>" + "</div>" +
                            "<h1>" + nombre + "</h1>" +
                            "<button class='compartir'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>" +
                            "<button class='descripcion'> " + "<i class='fa fa-binoculars' aria-hidden='true'></i>" + "</button>" +
                            "<button class='favoritos' alt='favoritos'> " + "<i class='fa fa-heart' aria-hidden='true'></i>" + "</button>" +
                            "</div>");

                        $('.favoritos').click(function () {
                            agregarFavoritos()
                        });



                        function agregarFavoritos(nombre) {
                            let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                            if (!favoritos.includes(nombre)) {
                                favoritos.push(nombre);
                                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                                $(".info").html('Se ha agregado un pokemon');
                                mostrarFavoritos();

                            }

                            else {
                                var modal = document.getElementById("modal");
                                modal.style.display = "block";
                                $(".info").html(`El pokemon ${nombre} ya está en favoritos.`);
                            }
                        }







                        function mostrarFavoritos() {
                            const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                            $('.lista_favoritos').empty();
                            $('.lista_favoritos').html('<h2>Favoritos</h2>' + '</br>');
                            if (favoritos.length) {
                                favoritos.forEach(pokemon => {
                                    $('.lista_favoritos').append(`
                                                         ${pokemon} 
                                                         <button id="eliminar" data-name="${pokemon}">&times;</button>
                                                         </br>
                                                 `);
                                });
                            }
                            else {
                                $('.lista_favoritos').html('<h2>Favoritos</h2>' + '</br>' + 'No se encuentran favoritos');
                            }
                        }











                        $('.cerrar').click(function () {
                            modal.style.display = "none";
                        });



                        $('#eliminar').click(function () {
                            removerFavoritos();
                        });

                        $('#eliminar-todos').click(function () {
                            localStorage.clear();
                            mostrarFavoritos();

                        });

                        function removerFavoritos() {
                            const nom = $(this).data('nombre');
                            localStorage.removeItem(nom);
                        }




                        mostrarFavoritos();
                        mostrarHistorial();



                    },

                    error: function () {
                        modal.style.display = "block";
                        $(".info").html("Pokémon " + id_nombre + " no disponible");
                    }



                });

            });
        },
    });


    $("#busqueda").click(function () {

        let filtro = document.querySelector('#filtro'); // Se declara el comportamiento de los filtros de nombre, items entre otros
        var id_nombre = $("#nombre").val().toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

        if (filtro.value == 'nombre') {

            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon/' + id_nombre,
                type: "GET",
                dataType: "json",


                //Mostrar cada pokemon
                success: function (datos) {
                    var nombre = datos.name
                    var imagen = datos.sprites.front_default
                    var experiencia = datos.base_experience
                    var id = datos.id
                    var peso = datos.weight / 10
                    var altura = datos.height * 10

                    $(".info_id").html(
                        "<div class='datos'>" +
                        "<h2>#" + id + "</h2>" +
                        "<div class='pokemon'>" + "<img src='" + imagen + "'>" +
                        "<h1>" + nombre + "</h1>" +
                        "</div>" +
                        "<button class='compartir'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>" +
                        "<button class='descripcion'> " + "<i class='fa fa-binoculars' aria-hidden='true'></i>" + "</button>" +
                        "<button class='favoritos'> " + "<i class='fa fa-heart' aria-hidden='true'></i>" + "</button>" +
                        "</div>");
                    $('.favoritos').click(function () {
                        agregarFavoritos(nombre);
                    });





                    function agregarFavoritos(nombre) {
                        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                        if (!favoritos.includes(nombre)) {
                            favoritos.push(nombre);
                            localStorage.setItem('favoritos', JSON.stringify(favoritos));
                            $(".info").html('Se ha agregado un pokemon');
                            mostrarFavoritos();
                        }

                        else {
                            var modal = document.getElementById("modal");
                            modal.style.display = "block";
                            $(".info").html(`El pokemon ${nombre} ya está en favoritos.`);
                        }
                    }


                    function removerFavoritos() {
                        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                        favoritos = favoritos.filter(f => f !== pokemon);
                        localStorage.setItem('favoritos', JSON.stringify(favoritos));
                        mostrarFavoritos();
                    }




                    function mostrarFavoritos() {
                        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                        $('.lista_favoritos').empty();
                        $('.lista_favoritos').html('<h2>Favoritos</h2>' + '</br>');
                        if (favoritos.length) {
                            favoritos.forEach(pokemon => {
                                $('.lista_favoritos').append(`
                                                ${pokemon} 
                                                <button id="eliminar" data-name="${pokemon}">&times;</button>
                                                </br>
                                        `);
                            });
                        } else {
                            $('.lista_favoritos').html('<h2>Favoritos</h2>' + '</br>' + 'No se encuentran favoritos');
                        }
                    }


                    function mostrarHistorial() {
                        const hist = JSON.parse(localStorage.getItem('favoritos')) || [];
                        $('.historial_favoritos').empty();
                        if (hist.length) {
                            hist.forEach(pokemon => {
                                $('.historial_favoritos').append(
                                    "<div class='datos'>" +
                                    "<h2> #" + id + "</h2>" +
                                    "<div class='pokemon'>" + "<img src='" + imagen + "'>" + "</div>" +
                                    "<h1>" + nombre + "</h1>" +
                                    "<button class='compartir'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>" +
                                    "<button class='descripcion'> " + "<i class='fa fa-binoculars' aria-hidden='true'></i>" + "</button>" +
                                    "<button class='favoritos' alt='favoritos'> " + "<i class='fa fa-heart' aria-hidden='true'></i>" + "</button>" +
                                    "</div>");
                            });
                        }

                        else {
                            $('.historial_favoritos').html('<h1>Favoritos</h1>' + '</br>' + 'No se encuentran favoritos');
                        }



                    }






                    $('#eliminar').click(function () {
                        removerFavoritos();
                    });

                    $('#eliminar-todos').click(function () {
                        localStorage.clear();
                        mostrarFavoritos();
                        mostrarHistorial();
                    });


                    mostrarFavoritos();
                    mostrarHistorial();




                    $('.descripcion').click(function () {



                        $.ajax({
                            url: 'https://pokeapi.co/api/v2/pokemon-species/' + id_nombre,
                            type: "GET",
                            dataType: "json",
                            success: function (datos) {
                                var desc = datos.flavor_text_entries[26].flavor_text;
                                var modal = document.getElementById("modal");
                                modal.style.display = "block";
                                $(".info").html(
                                    "<h1>" + nombre + "</h1>" +
                                    "</div>" +
                                    "<div class='pokemon'>" + "<img src='" + imagen + "'>" +
                                    "<p><strong>Exp: </strong>" + experiencia + "</p>" + "<strong>Peso: </strong>" + peso
                                    + "kg</p>" + "<p><strong>Altura: </strong>" + altura
                                    + "cm</p>" + "<div>" +
                                    "<p>" + "<strong> Descripción: </strong>" + desc + "</p>");
                            },

                        });




                    });
                    $('.cerrar').click(function () {
                        modal.style.display = "none";
                    });

                    $('.compartir').click(function () {
                        window.location.href = 'compartir.html';
                        document.getElementById("#subject").innerHTML = `
                         ${nombre}
                        `;
                    });




                },

                error: function () {
                    var modal = document.getElementById("modal");
                    modal.style.display = "block";
                    $(".info").html("Pokémon " + id_nombre + " no disponible");
                }



            });


        }
        if (filtro.value == 'item') {
            $.ajax({
                url: "https://pokeapi.co/api/v2/item/" + id_nombre,
                type: "GET",
                dataType: "json",
                success: function (datos) {
                    var nombre = datos.names[5].name
                    var imagen = datos.sprites.default
                    var costo = datos.cost
                    var tipo = datos.category.name
                    var id = datos.id

                    $(".info_id").html(
                        "<div class ='datos'>" +
                        "<h2>#" + id + "</h2>" +
                        "<h1>" + nombre + "</h1>" +
                        "<div class='item'>" + "<img src='" + imagen + "'>" + "</div>" +

                        "<button class='compartir' onclick='Compartir()'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>" +
                        "<button class='descripcion' alt='compartir' onClick='Mostrar(this)'> " + "<i class='fa fa-binoculars' aria-hidden='true'></i>" + "</button>" +
                        "<button class='favoritos' alt='favoritos'> " + "<i class='fa fa-heart' aria-hidden='true'></i>" + "</button>" + "</div>");
                    $('.favoritos').click(function () {
                        agregarFavoritos(nombre);
                    });


                    function agregarFavoritos(nombre) {
                        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                        if (!favoritos.includes(nombre)) {
                            favoritos.push(nombre);
                            localStorage.setItem('favoritos', JSON.stringify(favoritos));
                            mostrarFavoritos();

                        }

                        else {
                            var modal = document.getElementById("modal");
                            modal.style.display = "block";
                            $(".info").html(`El item ${nombre} ya está en favoritos.`);
                        }
                    }


                    function removerFavoritos(nombre) {
                        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                        favoritos = favoritos.filter(f => f !== pokemon);
                        localStorage.setItem('favoritos', JSON.stringify(favoritos));
                        mostrarFavoritos();
                    }

                    function mostrarFavoritos() {
                        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                        $('.lista_favoritos').html('<h1>Favoritos</h1>' + '</br>');
                        if (favoritos.length) {
                            favoritos.forEach(pokemon => {
                                $('.lista_favoritos').append(`
                                                ${pokemon} 
                                                <button id="eliminar" data-name="${pokemon}">&times;</button>
                                                </br>
                                        `);
                            });
                        } else {
                            ('.lista_favoritos').text("No se encuentran favoritos");
                        }
                    }


                    function mostrarHistorial() {
                        const hist = JSON.parse(localStorage.getItem('favoritos')) || [];
                        $('.historial_favoritos').empty();
                        if (hist.length) {
                            hist.forEach(pokemon => {
                                $('.historial_favoritos').append(`
                                    ${pokemon}
                                    <div class='datos'> +
                                    <h2> #" + id + "</h2> +
                                    <button id="eliminar" data-name="${pokemon}">&times;</button>
                                    <div class='pokemon'>" + "<img src='" + imagen + "'>" + </div> +
                                    "<h1>" + nombre + "</h1>" +
                                    "<button class='compartir'> " + "<i class='fa fa-share-alt' aria-hidden='true'></i>" + "</button>" +
                                    "<button class='descripcion'> " + "<i class='fa fa-binoculars' aria-hidden='true'></i>" + "</button>" +
                                    "<button class='favoritos' alt='favoritos'> " + "<i class='fa fa-heart' aria-hidden='true'></i>" + "</button>" +
                                    "</div>"`);
                            });

                        }

                        else {
                            $('.historial_favoritos').html('<h1>Favoritos</h1>' + '</br>' + 'No se encuentran favoritos');
                        }



                    }



                    $('#eliminar').click(function () {
                        removerFavoritos(nombre);
                        mostrarFavoritos();
                    });

                    $('#eliminar-todos').click(function () {
                        localStorage.clear();
                        mostrarFavoritos();
                        mostrarHistorial();
                    });


                    mostrarFavoritos();




                    $('.descripcion').click(function () {
                        var modal = document.getElementById("modal");
                        modal.style.display = "block";
                        $(".info").html(
                            "<h1>" + nombre + "</h1>" +
                            "<div class='item'>" + "<img src='" + imagen + "'>" + "</div>" +
                            "<p>" + "Costo:  " + costo + "</p>" +
                            "<p>" + "Tipo:  " + tipo + "</p>" +
                            "Descripción: " + datos.flavor_text_entries[13].text + "</p>"


                        );



                        $('.cerrar').click(function () {
                            modal.style.display = "none";
                        });

                        $('.compartir').click(function () {
                            window.location.href = 'compartir.html';
                            document.getElementById("#comentario").innerHTML = `
                                <p>Compartiendo Información de ${nombre}</p>
                                <p>Costo: ${costo}</p>
                                <p>Tipo: ${tipo}</p>
                            `;

                        });
                    });

                },
                error: function () {
                    var modal = document.getElementById("modal");
                    modal.style.display = "block";
                    $(".info").html("El item " + id_nombre + " no se ha encontrado");
                }

            });
        }


    });



});



function enviar() {
    const form = document.getElementById('formulario_compartir');
    // const emaile = form.email_emisor.value;
    const emailr = form.email_receptor.value;

    const comentario = form.comentario.value;

    // if (emaile == "") {
    //     $(".alert").html("Debe ingresar el correo electrónico");
    //     return false;
    // }

    // if (emaile == "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/") {
    //     $(".alert").html("Debe ingresar el correo electrónico válido");
    //     return false;
    // }


    if (emailr == "") {
        $(".alert").html("Debe ingresar el correo electrónico");
        return false;
    }

    if (emailr == "/^([\w.]+)@([\w.]+)$/") {
        $(".alert").html("Debe ingresar el correo electrónico válido");
        return true;
    }

    else {
        $(".alert").html("Redireccionando al gestor de correo")
        window.location = 'mailto: ' + $("#email_receptor").val() + '?subject=' + $("#subject").val() + '&body=' + $("#comentario").val();
        return true;
    }


}



