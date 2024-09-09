function Mostrar(dato_pokemon){
    let dato = dato_pokemon.dato;
    localStorage.setItem('dato_pokemon', dato);
    window.location.href='compartir.html';
};

function reset(){
    location.reload(true)
}



$(document).ready(function () {
    const $searchButton = $('.search-button');
    const $searchInput = $('.search-input');
    const $pokemonContainer = $('.pokemons');
    const $fireButton = $('.fire');
    const $waterButton = $('.water');
    const $grassButton = $('.grass');
    const $electricButton = $('.electric');
    const $normalButton = $('.normal');


    $searchButton.on('click', function () {
        const searchTerm = $searchInput.val().trim().toLowerCase();

        if (!searchTerm) {
            alert('Por favor, ingresa un nombre, ID o tipo de Pokémon.');
            return;
        }

        $pokemonContainer.empty(); // Limpiar las cards actuales

        if (isNaN(searchTerm)) {
            // Si no es un número, buscar por nombre o tipo
            if (isValidType(searchTerm)) {
                searchByType(searchTerm);
            } else {
                searchByName(searchTerm);
            }
        } else {
            searchById(searchTerm);
        }
    });

    $fireButton.on('click', function () {
        searchByType('fire');
    });

    $waterButton.on('click', function () {
        searchByType('water');
    });

    $grassButton.on('click', function () {
        searchByType('grass');
    });

    $electricButton.on('click', function () {
        searchByType('electric');
    });

    $normalButton.on('click', function () {
        searchByType('normal');
    });

    function isValidType(type) {
        const validTypes = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
        return validTypes.includes(type);
    }

    function searchByName(name) {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${name}`,
            method: 'GET',
            success: function (pokemon) {
                addPokemonCard(pokemon);
            },
            error: function () {
                alert('Pokémon no encontrado.');
            }
        });
    }

    function searchById(id) {
        $.ajax({
            url: `https://pokeapi.co/api/v2/pokemon/${id}`,
            method: 'GET',
            success: function (pokemon) {
                addPokemonCard(pokemon);
            },
            error: function () {
                alert('Pokémon no encontrado.');
            }
        });
    }

    function searchByType(type) {
        $.ajax({
            url: `https://pokeapi.co/api/v2/type/${type}`,
            method: 'GET',
            success: function(typeData) {
                // Borra todas las cards de Pokémon que hay actualmente en el contenedor
                $('.pokemons').empty();

                let pokemons10 = []; // Crea un array donde solo va a haber 10 pokemones
    
                // Crea un array de promesas para obtener detalles de cada Pokémon
                const pokemonDetailsPromises = typeData.pokemon.map(pokemonEntry => {
                    return $.ajax({
                        url: pokemonEntry.pokemon.url,
                        type: 'GET',
                        dataType: 'json'
                    });
                });

                pokemons10 = pokemonDetailsPromises.slice(0, 10);
    
                // Espera a que todas las solicitudes AJAX estén completas
                Promise.all(pokemons10)
                    .then(detailsArray => {
                        
                        detailsArray.sort((a, b) => a.id - b.id);
    
                        // Recorre el array ordenado y construye las cards
                        detailsArray.forEach(details => {
                            addPokemonCard(details);
                        });
                    })
                    .catch(error => {
                        console.log('Error al obtener detalles de los Pokémon:', error);
                    });
            },
            error: function() {
                alert('Tipo no encontrado.');
            }
        });
    }

    function addPokemonCard(details) {
        const card = `
            <div class="pokemon">
                <img src="${details.sprites.other['official-artwork'].front_default}" alt="${details.name}">
                <p id="idnum">#${details.id.toString().padStart(3, '0')}</p>
                <p>${details.name.charAt(0).toUpperCase() + details.name.slice(1)}</p>
                <div class="types extra-content">
                    ${details.types.map(type => `<p class="${type.type.name}">${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</p>`).join('')}
                </div>
                <button class='compartir' alt='compartir' onClick='Mostrar(this)'><i class='fa fa-share-alt' aria-hidden='true'></i></button>
            </div>
        `;
        // Agrega la card al contenedor principal
        $('.pokemons').append(card);
        
    }
});
