$(document).ready(function() {      // Espera a que el DOM esté completamente cargado antes de ejecutar el código.
    function cargarPokemonesPrimeraGeneracion() {
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon?limit=151',
            type: 'GET',
            dataType: 'json',
            success: function(data) { //data: respueesta del servidor
                
                $('.pokemons').empty(); // Borra todas las cards de Pokémon que hay por defecto en el main (cargados en el HTML)
                
                // creo el arreglo pokemonDetailsPromises usando .map para cada solicitud AJAX que obtiene detalles del Pokémon.
                const pokemonDetailsPromises = data.results.map(pokemon => {
                    // Retorna una promesa para cada solicitud AJAX, de los pokemones que están en la lista results, obtengo la info de
                    //cada uno y lo almaceno en un nuevo array (pokemonDetailsPromises)
                    return $.ajax({
                        url: pokemon.url,
                        type: 'GET',
                        dataType: 'json'
                    });
                });

                // Espera a que todas las solicitudes AJAX estén completas
                Promise.all(pokemonDetailsPromises)
                    .then(detailsArray => {
                        // Ordena el array de detalles por el ID del Pokémon
                        detailsArray.sort((a, b) => a.id - b.id);

                        // Recorre el array ordenado y construye las cards
                        detailsArray.forEach(details => {
                            const card = `
                                <div class="pokemon">
                                    <img src="${details.sprites.other['official-artwork'].front_default}" alt="${details.name}">
                                    <p id="idnum">#${details.id.toString().padStart(3, '0')}</p>
                                    <p>${details.name.charAt(0).toUpperCase() + details.name.slice(1)}</p>
                                    <div class="types extra-content">
                                        ${details.types.map(type => `<p class="${type.type.name}">${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</p>`).join('')}
                                    </div>
                                </div>
                            `;
                            // Agrega la card al contenedor principal
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

    // Llama a la función al cargar la página
    cargarPokemonesPrimeraGeneracion();
});
