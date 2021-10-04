// Venusaur, Charizard, Blastoise, Mew, Dragonite, Gyarados (edited)

var venusaurObj = {
    health: 100,
    attack: 20,
    effective: 40,
    noteffective: 5
}

var charizardObj = {
    health: 100,
    attack: 20,
    effective: 40,
    noteffective: 5
}

var blastoiseObj = {
    health: 100,
    attack: 20,
    effective: 40,
    noteffective: 5
}

var mewObj = {
    health: 100,
    attack: 20,
    effective: 40,
    noteffective: 5
}

var dragoniteObj = {
    health: 100,
    attack: 20,
    effective: 40,
    noteffective: 5
}

var gyaradosObj = {
    health: 100,
    attack: 20,
    effective: 40,
    noteffective: 5
}

var userPokeObj = {};

var enemyPokeObj = {};

var wins = 0;
var losses = 0;

var battleRecords = [];

//create fetch request to display the 6 pokemon
var fetchPokemon = function(poke) {
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + poke;

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayPokemon(data);
                })
            }
            else {
                // modal to show that the fetch didn't work
            }
        })
}

var displayPokemon = function(data) {

    var pokeName = data.name;
    var front = data.sprites.front_shiny;
    var back = data.sprites.back_shiny;

    updateObjects(data);

    var pokeHeader = $("<h2></h2>");
    pokeHeader.text(pokeName);
    $("#show-poke").append(pokeHeader);

    var pokeImg = $("<img/>");
    pokeImg.attr("src", front);
    pokeImg.attr("id", "pokeId");
    pokeHeader.append(pokeImg);

}

var updateObjects = function (data) {
    if (data.name === "charizard") {
        charizardObj.name = data.name;
        charizardObj.front = data.sprites.front_shiny;
        charizardObj.back = data.sprites.back_shiny;
    }
    else if (data.name === "venusaur") {
        venusaurObj.name - data.name;
        venusaurObj.front = data.sprites.front_shiny;
        venusaurObj.back = data.sprites.back_shiny;
    }
    else if (data.name === "mew") {
        mewObj.name = data.name;
        mewObj.front = data.sprites.front_shiny;
        mewObj.back = data.sprites.back_shiny;
    }
    else if (data.name === "dragonite") {
        dragoniteObj.name = data.name;
        dragoniteObj.front = data.sprites.front_shiny;
        dragoniteObj.back = data.sprites.back_shiny;
    }
    else if (data.name === "blastoise") {
        blastoiseObj.name = data.name;
        blastoiseObj.front = data.sprites.front_shiny;
        blastoiseObj.back = data.sprites.back_shiny;
    }
    else if (data.name === "gyarados") {
        gyaradosObj.name = data.name;
        gyaradosObj.front = data.sprites.front_shiny;
        gyaradosObj.back = data.sprites.back_shiny;
    }
}

var fetchAll = function() {
    fetchPokemon("charizard");
    fetchPokemon("venusaur");
    fetchPokemon("blastoise");
    fetchPokemon("mew");
    fetchPokemon("dragonite");
    fetchPokemon("gyarados");
}

// var fetchDice = async function(sides) {

//     var apiUrl = "http://roll.diceapi.com/json/" + sides;

//     fetch(apiUrl)
//         .then(function(response) {
//             if (response.ok) {
//                 response.json().then(function(data) {
//                     var result = data.dice[0].value;

//                 })
//             }
//             else {
//                 // insert modal for bad fetch
//             }
//         })
// }

var userAttack = function(sides) {
    
    var apiUrl = "http://roll.diceapi.com/json/" + sides;

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var dice = data.dice[0].value;
                    
                    if (dice === 1) {
                        // miss attack
                    }
                    else if (dice === 2) {
                        // regular attack
                        enemyPokeObj.health -= userPokeObj.attack;
                        console.log(enemyPokeObj.health);
                        checkHealth();
                    }
                    else if (dice === 3) {
                        // super effective attack
                        enemyPokeObj.health -= userPokeObj.effective;
                        console.log(enemyPokeObj.health);
                        checkHealth();
                    }
                    else if (dice === 4) {
                        // not very effective attack
                        enemyPokeObj.health -= userPokeObj.noteffective;
                        console.log(enemyPokeObj.health);
                        checkHealth();
                    }

                })
            }
            else {
                // insert modal for bad fetch
            }
        })
    
}

var enemyAttack = function(sides) {

    var apiUrl = "http://roll.diceapi.com/json/" + sides;

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var dice = data.dice[0].value;

                    if (dice === 1) {
                        // miss attack
                    }
                    else if (dice === 2) {
                        // regular attack
                        userPokeObj.health -= enemyPokeObj.attack;
                        console.log(enemyPokeObj.health);
                        checkHealth();
                    }
                    else if (dice === 3) {
                        // super effective attack
                        userPokeObj.health -= enemyPokeObj.effective;
                        console.log(enemyPokeObj.health);
                        checkHealth();
                    }
                    else if (dice === 4) {
                        // not very effective attack
                        userPokeObj.health -= enemyPokeObj.noteffective;
                        console.log(enemyPokeObj.health);
                        checkHealth();
                    }

                })
            }
            else {
                // insert modal for bad fetch
            }
        })
}

var checkHealth = function() {

    if (userPokeObj.health <= 0) {
        //game over you lose
        losses++;
        $("#battle-div").empty();
        $("#win-lose").text("You Lose!");
        $("#game-over").css("display", "flex");
        $("#game-over").show();

    }
    else if (enemyPokeObj.health <= 0) {
        // game over you win!
        wins++;
        $("#battle-div").empty();
        $("#win-lose").text("You Win!");
        $("#game-over").css("display", "flex");
        $("#game-over").show();
    }
}



var selectPokemon = function(event) {

    var target = event.target;
    var parent = target.parentElement;
    $(target).remove();
    $(parent).remove();

    $("#show-poke").off("click");

    var imgSrc = $(target).attr("src");
    if (imgSrc === charizardObj.front) {
        userPokeObj = charizardObj;
    }
    else if (imgSrc === venusaurObj.front) {
        userPokeObj = venusaurObj;
    }
    else if (imgSrc === mewObj.front) {
        userPokeObj = mewObj;
    }
    else if (imgSrc === blastoiseObj.front) {
        userPokeObj = blastoiseObj;
    }
    else if (imgSrc === dragoniteObj.front) {
        userPokeObj = dragoniteObj;
    }
    else if (imgSrc === gyaradosObj.front) {
        userPokeObj = gyaradosObj;
    }

    $("#show-poke").on("click", selectEnemy);
    
    var newImg = $("<img/>");
    newImg.attr("src", userPokeObj.back);
    newImg.attr("id", "user-back");
    $(".images").append(newImg);
}

var selectEnemy = function(event) {

    var target = event.target;
    var parent = target.parentElement;

    $(target).remove();
    $(parent).remove();
    $("#show-poke").off("click");
    $("#show-poke").empty();

    var imgSrc = $(target).attr("src");
    if (imgSrc === charizardObj.front) {
        enemyPokeObj = charizardObj;
    }
    else if (imgSrc === venusaurObj.front) {
        enemyPokeObj = venusaurObj;
    }
    else if (imgSrc === mewObj.front) {
        enemyPokeObj = mewObj;
    }
    else if (imgSrc === blastoiseObj.front) {
        enemyPokeObj = blastoiseObj;
    }
    else if (imgSrc === dragoniteObj.front) {
        enemyPokeObj = dragoniteObj;
    }
    else if (imgSrc === gyaradosObj.front) {
        enemyPokeObj = gyaradosObj;
    }

    var newImg = $("<img/>");
    newImg.attr("src", enemyPokeObj.front);
    newImg.attr("id", "enemy-front");
    $(".images").append(newImg);

    var newBtn = $("<button></button>");
    newBtn.attr("id", "attack-btn");
    newBtn.attr("class", "column is-12");
    newBtn.html("Attack!");
    $(".images").append(newBtn);
}

var fightSequence = function() {

    if (userPokeObj.health > 0 && enemyPokeObj.health > 0) {
        for (var i = 0; i < 20; i++) {
            userAttack("d4");
            enemyAttack("d4");
        }
    }
    
    
}

var addBattle = function() {
    var input = $("#name-input").val().trim();

    if (input === "") {
        // tell user it cannot be left blank!
        return;
    }
    else {
        battleRecords = JSON.parse(localStorage.getItem("Battle Records")) || [];
    }

    battleRecords.push({
        name: input,
        wins: wins,
        losses: losses
    })

    saveBattle();
    viewBattles();
}

var saveBattle = function() {
    localStorage.setItem("Battle Records", JSON.stringify(battleRecords));
}

var viewBattles = function() {
    $("#game-over").empty();

    var newList = $("<ol></ol>");
    $("#game-over").append(newList);

    for (i = 0; i < battleRecords.length; i++) {
        var newLi = $("<li></li>");
        newLi.html(battleRecords[i].name + "</br> Wins: " + battleRecords[i].wins + " Losses: " + battleRecords[i].losses);
        $(newList).append(newLi);
    }

}



fetchAll();
$("#to-battle").on("click", fetchAll);

$("#show-poke").on("click", selectPokemon);

$("#game-over-form").on("submit", addBattle);