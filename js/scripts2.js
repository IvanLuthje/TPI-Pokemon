$(document).ready(function () {
    const $searchButton = $('.search-button');
    const $searchInput = $('.search-input');
    const $pokemonContainer = $('.pokemons');

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
            // Buscar por ID (es un número)
            searchById(searchTerm);
        }
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
            success: function (typeData) {
                typeData.pokemon.forEach(function (pokemonEntry) {
                    $.ajax({
                        url: pokemonEntry.pokemon.url,
                        method: 'GET',
                        success: function (pokemon) {
                            addPokemonCard(pokemon);
                        }
                    });
                });
            },
            error: function () {
                alert('Tipo no encontrado.');
            }
        });
    }

    function addPokemonCard2(details) {
        const pokemonCard = $('<div>').addClass('pokemon-card');
        pokemonCard.html(`
            <h3>${details.name}</h3>
            <img src="${details.sprites.other['official-artwork'].front_default}" alt="${details.name}">
            <p>ID: ${details.id}</p>
            <p>Type: ${details.types.map(type => type.type.name).join(', ')}</p>
        `);
        $pokemonContainer.append(pokemonCard);
    }

    function addPokemonCard(details) {
        //tiene que haber una función que se fije si es un elemento o una lista de elementos


        // Borra todas las cards de Pokémon que hay por defecto en el main
        $('.pokemons').empty();

        $('#water').empty();
        $('#grass').empty();
        $('#electric').empty();
        $('#normal').empty();

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
        $('.pokemons').append(card); //cuando es mas de un pokemon se pisan entre si y se muestra el último
        
    }
});
