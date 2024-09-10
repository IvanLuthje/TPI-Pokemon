$(document).ready(function() {  
    let pokemonCount = 0;       // Variable para contar los Pokémon seleccionados.
    let selectedPokemons = [];  // Inicializa un arreglo para almacenar los nombres de los Pokémon seleccionados.
    let pokemonArray = []; // Arreglo de pokemones
    let nav = $('#types_nav');

    // Función para cargar los Pokémon de la primera generación.
    function cargarPokemonesPrimeraGeneracion() {
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon?limit=151', //`https://pokeapi.co/api/v2/generation/${generationId}/`
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                $('.pokemons').empty();  // Limpia cualquier card existente.

                const pokemonDetailsPromises = data.results.map(pokemon => {
                    return $.ajax({
                        url: pokemon.url,
                        type: 'GET',
                        dataType: 'json'
                    });
                });

                Promise.all(pokemonDetailsPromises)
                    .then(detailsArray => {
                        detailsArray.sort((a, b) => a.id - b.id);  // Ordena los Pokémon por ID.
                        pokemonArray = detailsArray;

                        detailsArray.forEach(details => {
                            // Crea una card para cada Pokémon.
                            const card = `
                                <div class="pokemon">
                                    <img class="pokemon-img" src="${details.sprites.other['official-artwork'].front_default}" alt="${details.name}">
                                    <p id="idnum">#${details.id.toString().padStart(3, '0')}</p>
                                    <p>${details.name.charAt(0).toUpperCase() + details.name.slice(1)}</p>
                                    <div class="types extra-content">
                                        ${details.types.map(type => `<p class="${type.type.name}">${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</p>`).join('')}
                                    </div>
                                </div>
                            `;
                            // Agrega la card al contenedor principal.
                            $('.pokemons').append(card);
                        });
                    })
                    .catch(error => {
                        console.log('Error al obtener detalles de los Pokémon:', error);
                    });
            },
            error: function() {
                console.log('Error al obtener los Pokémon de la primera generación.');
            }
        });
    }

    // Delegación de eventos para manejar el click en imágenes cargadas dinámicamente.
    $(document).on('click', 'div.pokemon img', function() {
        let $this = $(this);  // La imagen clickeada.
        let $pokemon = $this.closest('.pokemon');  // El contenedor de la card del Pokémon.
        let pokemonName = $pokemon.find('p').eq(1).text();  // Obtiene el nombre del Pokémon desde el segundo párrafo dentro del contenedor.
        let pokemonImg = $this.attr('src');  // Obtiene la URL de la imagen del Pokémon. Osea que obtiene el atributo src de la imagen.
        let pokemonIdString = $pokemon.find('#idnum').text(); //Obtiene la cadena de string del ID
        let pokemonId = pokemonIdString.replace('#', ''); // Elimina el símbolo '#'

        // Verifica si el Pokémon ya está seleccionado.
        if ($this.hasClass('selected')) {       // Si está seleccionado, se deselecciona
            $this.removeClass('selected').css('opacity', '1');  // Quita la clase 'selected' y restablece la opacidad a 1.
            $pokemon.css('background-color', '');  // Restablece el color de fondo
            pokemonCount--;
            if (pokemonCount == 0) nav.css('position', 'sticky');
            
            // Elimina el nombre del Pokémon del arreglo de seleccionados.
            selectedPokemons = selectedPokemons.filter(pokemon => pokemon.name !== pokemonName);
        } else{ // Si no está seleccionado, se selecciona
            if(pokemonCount <= 5){
                $this.addClass('selected').css('opacity', '0.6');  // Agrega la clase 'selected' a la imagen y ajusta la opacidad a 0.6.
                $pokemon.css('background-color', '#f0f0f0');
                nav.css('position', 'relative'); // El nav no sigue al usuario por pantalla
                pokemonCount++;
                
                // Si el pokemon no está en la lista (busca por id), agrega el nombre, la imagen y el ID
                if (!selectedPokemons.some(pokemon => pokemon.id === pokemonId)) {
                    selectedPokemons.push({name: pokemonName, img: pokemonImg, id: pokemonId}); //guarda un objeto con nombre, imagen e ID
                }
            }
            else{
                alert('No puedes seleccionar mas de 6 pokemones');
            }
            
        }

        updatePokemonTotal(); // Actualiza el texto del total de pokemones y muestra u oculta el aside
        updatePokemonList(); // Actualiza el contenido del aside
    });

    // Función para actualizar el texto del total de Pokémon en la página.
    function updatePokemonTotal() {
        $('#pokemon-total').text('Pokemones seleccionados: ' + pokemonCount);

        // Muestra u oculta el aside basado en la cantidad de Pokémon seleccionados.
        if (pokemonCount > 0) {
            $('#teamSelected').fadeIn();
        } else {
            $('#teamSelected').fadeOut();
        }
    }

    // Función para actualizar el contenido del aside con los Pokémon seleccionados.
    function updatePokemonList() {
        let $teamSelected = $('#teamSelected'); //obtiene el elemento aside del DOM

        // Elimina los pokemones existentes en el aside.
        $teamSelected.find('section.pokemon-entry').remove();

        // Añade un nuevo pokemon con la imagen, nombre y gif. Recorre la lista de los pokes seleccionados.
        selectedPokemons.forEach((pokemon) => { //Recorre y por cada poke agrega una section con la imagen de la pokebola, el nombre y el gif
            var pokemonGif = findPokemonGifByID(parseInt(pokemon.id)); // Obtiene el gif del pokemon seleccionado

            if ($teamSelected.find('section.pokemon-entry').length < 6) {
                let newSection = `
                    <section class="pokemon-entry teamColor">
                        <img class="pkm-img" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Ícono personalizado">
                        <p> ${pokemon.name} </p>
                        <img class="pokemon-gif" src="${pokemonGif}">
                    </section>
                `;
                $teamSelected.append(newSection);

                // Llama a la función de animación para hacer que la imagen gire un poco
                animatePokemonImage($('.pkm-img').last());
            }

        });

        // Si ya existe el botón, lo elimina
        $teamSelected.find('.round-button').remove();

        // Añade un botón al final del aside.
        let roundButton = `
            <button class="round-button">Borrar selección</button>
        `;
        $teamSelected.append(roundButton);

        // Añade un evento para eliminar la selección cuando se presione el botón.
        $('.round-button').on('click', function() {
            // Vacía el array de Pokémon seleccionados y reinicia el contador.
            selectedPokemons = [];
            pokemonCount = 0;

            // Borra todos los sections (pokemones)
            $teamSelected.find('section.pokemon-entry').remove();

            // Restablece el contador de Pokémon seleccionados (borra aside).
            updatePokemonTotal();
            if (pokemonCount == 0) {nav.css('position', 'sticky');};

            // Restablece el estado de las imágenes de Pokémon a no seleccionadas.
            $('img.selected').removeClass('selected').css('opacity', '1');
            $('.pokemon').css('background-color', '');
        });
    }

    function findPokemonGifByID(id) { //recibe un entero id
        let foundPokemon = pokemonArray.find(pokemonArray => pokemonArray.id === id); //busca el pokemon con ese id
        return foundPokemon.sprites.other['showdown'].front_default; //retorna el gif de ese pokemon
    }

    // Función para animar la pokebola
    function animatePokemonImage($image) {
        
        // Define el ángulo inicial de rotación. Comienza con -15 grados (giro hacia la izquierda).
        let rotateAngle = -15;
        
        // '1' significa rotar hacia la derecha, y '-1' rotar hacia la izquierda.
        let direction = 1;

        //bucle
        setInterval(function() {
            rotateAngle = direction * 15;

            $image.animate({ value: rotateAngle }, {
                
                step: function(now) {
                    $(this).css('transform', 'rotate(' + now + 'deg)');
                },

                duration: 200,

                // 'swing' hace que la animación sea más suave al principio y al final.
                easing: 'swing',

                complete: function() {
                    direction *= -1;
                }
            });
        }, 500);
    }

    // Llama a la función para cargar los Pokémon al cargar la página.
    cargarPokemonesPrimeraGeneracion();
});
