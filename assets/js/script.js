// Venusaur, Charizard, Blastoise, Mew, Dragonite, Gyarados (edited)
var venusaurFront;
var venusaurBack;

var charizardFront;
var charizardBack;

var blastoiseFront;
var blastoiseBack;

var mewFront;
var mewBack;

var dragoniteFront;
var dragoniteBack;

var gyardosFront;
var gyaradosBack;

document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.message .delete') || []).forEach(($delete) => {
      const $message = $delete.parentNode;
  
      $delete.addEventListener('click', () => {
        $message.parentNode.removeChild($message);
      });
    });
  });

var fetchVenusaur = function() {
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/venusaur";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var pokeName = data.species.name;
                    console.log(pokeName);

                    var pokeSpriteFrontUrl = data.sprites.front_shiny;
                    var venusaurFront = pokeSpriteFrontUrl;
                    console.log(venusaurFront);

                    var pokeSpriteBackUrl = data.sprites.back_shiny;
                    var venusaurBack = pokeSpriteBackUrl;
                    console.log(venusaurBack);

                    var newImgEl = $("<img/>");
                    newImgEl.attr("src", venusaurFront);
                    $(".poke").append(newImgEl);
                })
            }
        })
}

var fetchCharizard = function() {
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/charizard";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var pokeName = data.species.name;
                    console.log(pokeName);

                    var pokeSpriteFrontUrl = data.sprites.front_shiny;
                    var charizardFront = pokeSpriteFrontUrl;
                    console.log(charizardFront);

                    var pokeSpriteBackUrl = data.sprites.back_shiny;
                    var charizardBack = pokeSpriteBackUrl;
                    console.log(charizardBack);

                    var newImgEl = $("<img/>");
                    newImgEl.attr("src", charizardFront);
                    $(".poke").append(newImgEl);
                })
            }
        })
}

var fetchBlastoise = function() {
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/blastoise";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var pokeName = data.species.name;
                    console.log(pokeName);

                    var pokeSpriteFrontUrl = data.sprites.front_shiny;
                    var blastoiseFront = pokeSpriteFrontUrl;
                    console.log(blastoiseFront);

                    var pokeSpriteBackUrl = data.sprites.back_shiny;
                    var blastoiseBack = pokeSpriteBackUrl;
                    console.log(blastoiseBack);

                    var newImgEl = $("<img/>");
                    newImgEl.attr("src", blastoiseFront);
                    $(".poke").append(newImgEl);
                })
            }
        })
}

var fetchMew = function() {
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/mew";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var pokeName = data.species.name;
                    console.log(pokeName);

                    var pokeSpriteFrontUrl = data.sprites.front_shiny;
                    var mewFront = pokeSpriteFrontUrl;
                    console.log(mewFront);

                    var pokeSpriteBackUrl = data.sprites.back_shiny;
                    var mewBack = pokeSpriteBackUrl;
                    console.log(mewBack);

                    var newImgEl = $("<img/>");
                    newImgEl.attr("src", mewFront);
                    $(".poke").append(newImgEl);
                })
            }
        })
}

var fetchDragonite = function() {
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/dragonite";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var pokeName = data.species.name;
                    console.log(pokeName);

                    var pokeSpriteFrontUrl = data.sprites.front_shiny;
                    var dragoniteFront = pokeSpriteFrontUrl;
                    console.log(dragoniteFront);

                    var pokeSpriteBackUrl = data.sprites.back_shiny;
                    var dragoniteBack = pokeSpriteBackUrl;
                    console.log(dragoniteBack);

                    var newImgEl = $("<img/>");
                    newImgEl.attr("src", dragoniteFront);
                    $(".poke").append(newImgEl);
                })
            }
        })
}

var fetchGyarados = function() {
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/gyarados";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var pokeName = data.species.name;
                    console.log(pokeName);

                    var pokeSpriteFrontUrl = data.sprites.front_shiny;
                    var gyardosFront = pokeSpriteFrontUrl;
                    console.log(gyardosFront);

                    var pokeSpriteBackUrl = data.sprites.back_shiny;
                    var gyaradosBack = pokeSpriteBackUrl;
                    console.log(gyaradosBack);

                    var newImgEl = $("<img/>");
                    newImgEl.attr("src", gyardosFront);
                    $(".poke").append(newImgEl);
                })
            }
            
        })
}

fetchGyarados();

fetchMew();

fetchDragonite();

fetchBlastoise();

fetchVenusaur();

fetchCharizard();