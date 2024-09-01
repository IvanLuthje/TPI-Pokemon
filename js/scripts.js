//Script se va a usar para cargar los pokemones de la primera generacion cuando carga el index

$(document).ready(function() {
    function cargarPokemonesPrimeraGeneracion() {
        // Realiza una solicitud AJAX a la PokeAPI
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon?limit=151',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                // Borra todas las cards de Pokémon que hay por defecto en el main
                $('.pokemons').empty();

                // Recorre todos los resultados obtenidos de la API
                data.results.forEach(function(pokemon) {
                    // Para cada Pokémon, realiza otra solicitud para obtener sus detalles
                    $.ajax({
                        url: pokemon.url,
                        type: 'GET',
                        dataType: 'json',
                        success: function(details) {
                            // Construye la card del Pokémon
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
                        },
                        error: function() {
                            console.log('Error al obtener detalles del Pokémon.');
                        }
                    });
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
