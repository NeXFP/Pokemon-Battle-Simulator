// Venusaur, Charizard, Blastoise, Mew, Dragonite, Gyarados 
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

var userStats = {
    health: 100,
    attack: 20,
    effective: 40,
    noteffective: 5
}

var enemyStats = {
    health: 100,
    attack: 20,
    effective: 40,
    noteffective: 5
}

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
                $("#bad-fetch").addClass("is-active");

                $("#close-fetch").on("click", function() {
                    $("#bad-fetch").removeClass("is-active");
                })
            }
        })
}

var displayPokemon = function(data) {

    var pokeName = data.name;
    var front = data.sprites.front_shiny;
    var back = data.sprites.back_shiny;
    updateObjects(data);

    var newDiv = $("<div></div>");
    newDiv.attr("class", "column is-2");
    $("#show-poke").append(newDiv);

    var pokeHeader = $("<h2></h2>");
    pokeHeader.text(pokeName);
    $(newDiv).append(pokeHeader);

    var pokeImg = $("<img/>");
    pokeImg.attr("src", front);
    pokeImg.attr("id", "pokeId");
    $(newDiv).append(pokeImg);

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

var selectPokemon = function(event) {

    var target = event.target;
    var parent = target.parentElement;
    var imgSrc = $(target).attr("src");

    if (imgSrc === charizardObj.front ||
        imgSrc === venusaurObj.front ||
        imgSrc === mewObj.front ||
        imgSrc === blastoiseObj.front ||
        imgSrc === dragoniteObj.front ||
        imgSrc === gyaradosObj.front) {
            $(target).remove();
            $(parent).remove();

            $("#show-poke").off("click");
        }
    else {
        return;
    }
    
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
    $("#place-poke").prepend(newImg);
    $("#battle-header").text("Choose Your Opponent!");
}

var selectEnemy = function(event) {

    var target = event.target;
    var parent = target.parentElement;
    var imgSrc = $(target).attr("src");

    if (imgSrc === charizardObj.front ||
        imgSrc === venusaurObj.front ||
        imgSrc === mewObj.front ||
        imgSrc === blastoiseObj.front ||
        imgSrc === dragoniteObj.front ||
        imgSrc === gyaradosObj.front) {
            $(target).remove();
            $(parent).remove();
            $("#show-poke").off("click");
            $("#show-poke").empty();
        }
    else {
        return;
    }
    
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
    $("#place-poke").append(newImg);
    $("#battle-header").text("Click the Attack Button to Begin!");

    var newBtn = $("<button></button>");
    newBtn.attr("id", "attack-btn");
    newBtn.html("Attack!");
    $("#fight-btn").append(newBtn);
}

var userAttack = function(sides) {
    
    var apiUrl = "http://roll.diceapi.com/json/" + sides;
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var dice = data.dice[0].value;
                    if (dice === 1) {
                        // miss attack
                        $("#battle-header").text("You missed your attack!");
                        return;
                    }
                    else if (dice === 2) {
                        // regular attack
                        enemyStats.health -= userStats.attack;
                        $("#battle-header").text("You attacked for 20 HP!");
                        $("#enemy-health").css("width", enemyStats.health + "%");
                        checkHealth();
                    }
                    else if (dice === 3) {
                        // super effective attack
                        enemyStats.health -= userStats.effective;
                        $("#battle-header").text("You attacked for 40 HP!");
                        $("#enemy-health").css("width", enemyStats.health + "%");
                        checkHealth();
                    }
                    else if (dice === 4) {
                        // not very effective attack
                        enemyStats.health -= userStats.noteffective;
                        $("#battle-header").text("You attacked for 5 HP!");
                        $("#enemy-health").css("width", enemyStats.health + "%");
                        checkHealth();
                    }
                })
            }
            else {
                // insert modal for bad fetch
                $("#bad-fetch").addClass("is-active");

                $("#close-fetch").on("click", function() {
                    $("#bad-fetch").removeClass("is-active");
                })
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
                        setTimeout (function() {
                            $("#battle-header").text("Your opponent missed!");
                        }, 1000*2);
                        return;
                    }
                    else if (dice === 2) {
                        // regular attack
                        userStats.health -= enemyStats.attack;
                        setTimeout (function() {
                            $("#battle-header").text("You were attacked for 20 HP!");
                            $("#user-health").css("width", userStats.health + "%");
                        }, 1000*2);
                        checkHealth();
                    }
                    else if (dice === 3) {
                        // super effective attack
                        userStats.health -= enemyStats.effective;
                        setTimeout (function() {
                            $("#battle-header").text("You were attacked for 40 HP!");
                            $("#user-health").css("width", userStats.health + "%");
                        }, 1000*2);
                        checkHealth();
                    }
                    else if (dice === 4) {
                        // not very effective attack
                        userStats.health -= enemyStats.noteffective;
                        setTimeout (function() {
                            $("#battle-header").text("You were attacked for 5 HP!");
                            $("#user-health").css("width", userStats.health + "%");
                        }, 1000*2);
                        checkHealth();
                    }
                })
            }
            else {
                // insert modal for bad fetch
                $("#bad-fetch").addClass("is-active");

                $("#close-fetch").on("click", function() {
                    $("#bad-fetch").removeClass("is-active");
                })
            }
        })
}

var checkHealth = function() {

    if (userStats.health <= 0) {
        //game over you lose
        losses++;
        $(".main-section").hide();
        $("#win-lose").text("You Lose!");
        $(".game-over").css("display", "flex")
        $(".game-over").show();
    }
    else if (enemyStats.health <= 0) {
        // game over you win!
        wins++;
        $(".main-section").hide();
        $("#win-lose").text("You Win!");
        $(".game-over").css("display", "flex")
        $(".game-over").show();
    }
}

var fightSequence = function() {

    userAttack("d4");
    enemyAttack("d4");

    $("#fight-btn").off("click");
    $("#fight-btn button").addClass("yellow-bg");

    setTimeout(function() {
        $("#fight-btn").on("click", fightSequence);
        $("#fight-btn button").removeClass("yellow-bg");
    }, 1000*2.5);
}

var addBattle = function(event) {

    event.preventDefault();
    var input = $("#name-input").val().trim();

    if (input === "") {
        // tell user it cannot be left blank!
        $("#bad-input").addClass("is-active");
        $("#close-input").on("click", function() {
            $("#bad-input").removeClass("is-active");
        })
        return;
    }
    else {
        battleRecords = JSON.parse(localStorage.getItem("Battle Records")) || [];

        battleRecords.push({
            name: input,
            wins: wins,
            losses: losses
        })
    
        saveBattle();
        viewBattles();
    }
}

var saveBattle = function() {
    localStorage.setItem("Battle Records", JSON.stringify(battleRecords));
}

var viewBattles = function() {

    $(".main-section").hide();
    $(".game-over").hide();
    $(".battle-records").show();

    var newList = $("#record-ol");

    for (i = 0; i < battleRecords.length; i++) {
        var newLi = $("<li></li>");
        newLi.html(battleRecords[i].name + "</br> Wins: " + battleRecords[i].wins + " Losses: " + battleRecords[i].losses);
        newLi.addClass("column is-12");
        $(newList).append(newLi);
    }

}

var clearStorage = function() {
    localStorage.clear();
    $("#record-ol").empty();
}

var generateList = function() {
    battleRecords = JSON.parse(localStorage.getItem("Battle Records")) || [];
    saveBattle();
    $("#record-ol").empty();
    viewBattles();
}

var playAgain = function() {
    $("#show-poke").empty();
    fetchAll();
    userStats.health = 100;
    enemyStats.health = 100;
    $("#user-health").css("width", "100%");
    $("#enemy-health").css("width", "100%");
    $("#place-poke").html("<img src='./assets/images/battlescreen.png' id='battlefield'/>")
    var buttonOff = $("#show-poke").off("click");
    if (buttonOff) {
        $("#show-poke").on("click", selectPokemon);
    }
    $("#attack-btn").remove();
    $("#battle-header").text("Choose Your Pokémon!");
    $(".main-section").show();
    $(".battle-records").hide();
}

var deleteWelcome = function() {
    $(".message").remove();
    $(".hero-background").css("height", "90vh");
}

fetchAll();

$("#show-poke").on("click", selectPokemon);

$("#fight-btn").on("click", fightSequence);

$("#name-click").on("click", addBattle);

$("#clear-battles").on("click", clearStorage);

$("#view-battles").on("click", generateList);

$("#play-again").on("click", playAgain);

$("#welcome-button").on("click", deleteWelcome);