// Venusaur, Charizard, Blastoise, Mew, Dragonite, Gyarados
// Setting empty objects to fill with the sprites from Poke Fetch
var venusaurObj = {}
var charizardObj = {}
var blastoiseObj = {}
var mewObj = {}
var dragoniteObj = {}
var gyaradosObj = {}
var userPokeObj = {};
var enemyPokeObj = {};
// Setting objects for fight functions
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
// Setting empty array for local storage
var battleRecords = [];
// Setting variables to check if the user won or lost for local storage purposes
var userWon;
var userLost;

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
        .catch(function(error) {
            // insert modal for bad fetch
            $("#bad-fetch").addClass("is-active");

            $("#close-fetch").on("click", function() {
                $("#bad-fetch").removeClass("is-active");
            })
        })
}
// function that fetches all 6 pokemon at once
var fetchAll = function() {
    fetchPokemon("charizard");
    fetchPokemon("venusaur");
    fetchPokemon("blastoise");
    fetchPokemon("mew");
    fetchPokemon("dragonite");
    fetchPokemon("gyarados");
}
// function that displays the pokemon to the page from the fetch
var displayPokemon = function(data) {

    var pokeName = firstLetterUpper(data.name);
    var front = data.sprites.front_shiny;
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
// function that fills the empty arrays with the necessary sprite info
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
// function that allows for the user to select the pokemon they want and remove it from the set of choices
var selectPokemon = function(event) {
    var target = event.target;
    var parent = target.parentElement;
    var imgSrc = $(target).attr("src");
    var pokeHeader = $(parent).text();

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

    var spriteArray = [
        {sprite: charizardObj.front,
        name: "char"},
        {sprite: venusaurObj.front,
        name: "ven"},
        {sprite: mewObj.front,
        name: "mew"},
        {sprite: blastoiseObj.front,
        name: "blas"},
        {sprite: dragoniteObj.front,
        name: "drag"},
        {sprite: gyaradosObj.front,
        name: "gyar"}
    ]

    for (i = 0; i < spriteArray.length; i++) {
        if (imgSrc === spriteArray[i].sprite) {
            var newSrc = "./assets/images/poke-permutations/" + spriteArray[i].name + ".png";
            $("#battlefield").attr("src", newSrc);
            break;
        }
    }

    $("#user-poke-header").text(pokeHeader);
    $("#show-poke").on("click", selectEnemy);
    $("#battle-header").text("Choose Your Opponent!");
}
// function that allows the user to select the pokemon they want to battle and display it to the image
var selectEnemy = function(event) {
    var target = event.target;
    var parent = target.parentElement;
    var imgSrc = $(target).attr("src");
    var pokeHeader = $(parent).text();

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

    var spriteArray = [
        {sprite: charizardObj.front,
        name: "char"},
        {sprite: venusaurObj.front,
        name: "ven"},
        {sprite: mewObj.front,
        name: "mew"},
        {sprite: blastoiseObj.front,
        name: "blas"},
        {sprite: dragoniteObj.front,
        name: "drag"},
        {sprite: gyaradosObj.front,
        name: "gyar"}
    ]

    for (i = 0; i < spriteArray.length; i++) {
        if (imgSrc === spriteArray[i].sprite) {
            var findSource = $("#battlefield").attr("src");
            stringCheck(findSource, spriteArray[i].name);
            break;
        }
    }
    $("#enemy-poke-header").text(pokeHeader);
    $("#battle-header").text("Click the Attack Button to Begin!");
    $("#attack-btn").css("display", "inline-block");

    $("#user-health").css("display", "block");
    $("#enemy-health").css("display", "block");
}
// function that checks which pokemon the user selected as their opponent in order to update the image accordingly
var stringCheck = function(substring, pokename) {
    stringArray = ["char", "mew", "ven", "blas", "gyar", "drag"];

    for (i = 0; i < stringArray.length; i++) {
        if (substring.includes(stringArray[i])) {
            var imageSource = "./assets/images/poke-permutations/" + stringArray[i] + "_vs_" + pokename + ".png";
            $("#battlefield").attr("src", imageSource);
            break;
        }
    }
}
// function for the user to attack with a fetch request of a random number from a dice roll
var userAttack = function(sides) {
    
    var apiUrl = "https://rolz.org/api/?d" + sides + ".json";
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var dice = data.result;
                    if (dice === 1) {
                        // miss attack
                        $("#battle-header").text("You missed your attack!");
                        return;
                    }
                    else if (dice > 1 && dice < 6) {
                        // regular attack
                        enemyStats.health -= userStats.attack;
                        $("#battle-header").text("You hit a normal attack for 20 HP!");
                        $("#enemy-health").css("width", enemyStats.health + "%");
                        healthColor(enemyStats.health, "#enemy-health");
                        checkHealth();
                    }
                    else if (dice > 5 && dice < 8) {
                        // super effective attack
                        enemyStats.health -= userStats.effective;
                        $("#battle-header").text("You hit a super effective attack for 40 HP!");
                        $("#enemy-health").css("width", enemyStats.health + "%");
                        healthColor(enemyStats.health, "#enemy-health");
                        checkHealth();
                    }
                    else if (dice > 7 && dice < 10) {
                        // not very effective attack
                        enemyStats.health -= userStats.noteffective;
                        $("#battle-header").text("You hit a not very effective attack for 5 HP!");
                        $("#enemy-health").css("width", enemyStats.health + "%");
                        healthColor(enemyStats.health, "#enemy-health");
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
        .catch(function(error) {
            // insert modal for bad fetch
            $("#bad-fetch").addClass("is-active");

            $("#close-fetch").on("click", function() {
                $("#bad-fetch").removeClass("is-active");
            })
        })

}
// function for the opponent to attack in return after the user attacks
var enemyAttack = function(sides) {
    var apiUrl = "https://rolz.org/api/?d" + sides + ".json";
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var dice = data.result;
                    if (dice === 1) {
                        // miss attack
                        setTimeout (function() {
                            $("#battle-header").text("Your opponent missed their attack!");
                        }, 1000*2);
                        return;
                    }
                    else if (dice > 1 && dice < 6) {
                        // regular attack
                        userStats.health -= enemyStats.attack;
                        setTimeout (function() {
                            $("#battle-header").text("Your opponent hit a normal attack for 20 HP!");
                            $("#user-health").css("width", userStats.health + "%");
                            healthColor(userStats.health, "#user-health");
                        }, 1000*2);
                        checkHealth();
                    }
                    else if (dice > 5 && dice < 8) {
                        // super effective attack
                        userStats.health -= enemyStats.effective;
                        setTimeout (function() {
                            $("#battle-header").text("Your opponent hit a super effective attack for 40 HP!");
                            $("#user-health").css("width", userStats.health + "%");
                            healthColor(userStats.health, "#user-health");
                        }, 1000*2);
                        checkHealth();
                    }
                    else if (dice > 7 && dice < 10) {
                        // not very effective attack
                        userStats.health -= enemyStats.noteffective;
                        setTimeout (function() {
                            $("#battle-header").text("Your opponent hit a not very effective attack for 5 HP!");
                            $("#user-health").css("width", userStats.health + "%");
                            healthColor(userStats.health, "#user-health");
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
        .catch(function(error) {
            // insert modal for bad fetch
            $("#bad-fetch").addClass("is-active");

            $("#close-fetch").on("click", function() {
                $("#bad-fetch").removeClass("is-active");
            })
        })
}
// check the health and see if either pokemon has reached 0 or below
var checkHealth = function() {
    if (userStats.health <= 0) {
        //game over you lose
        userWon = false;
        userLost = true;
        $(".main-section").hide();
        $("#win-lose").text("You Lose!");
        $(".game-over").css("display", "flex")
        $(".game-over").show();
    }
    else if (enemyStats.health <= 0) {
        // game over you win!
        userWon = true;
        userLost = false;
        $(".main-section").hide();
        $("#win-lose").text("You Win!");
        $(".game-over").css("display", "flex")
        $(".game-over").show();
    }
}
// function that checks the health bars and changes colors accordingly
var healthColor = function(health, query) {
    if (health < 51 && health > 20) {
        $(query).css("background-color", "#fae335");
    }
    else if (health <= 20) {
        $(query).css("background-color", "#fb5636");
    }
}
// combines the user and enemy attacks and adds a delay
var fightSequence = function() {

    userAttack("9");
    enemyAttack("9");

    $("#attack-btn").off("click");
    setTimeout(function() {
        $("#attack-btn").on("click", fightSequence);
    }, 1000*2.5);
}
// function that will take the user's name and save it to local storage along with their wins and losses
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
    }

    var boolean = battleRecords.some(obj => obj.name.includes(input));

    if (boolean) {
        for (i = 0; i < battleRecords.length; i++) {
            if (battleRecords[i].name === input) {
                if (userWon) {
                    battleRecords[i].wins++;
                }
                else if (userLost) {
                    battleRecords[i].losses++;
                }
            }
        }
    }
    else {
        if (userWon) {
            battleRecords.push({
                name: input,
                wins: 1,
                losses: 0
            })
        }
        else if (userLost) {
            battleRecords.push({
                name: input,
                wins: 0,
                losses: 1
            })
        }
    }

    $("#name-input").val("");
    saveBattle();
    window.location.href = "./battle_records.html";
}
// function to save the battle to local storage
var saveBattle = function() {
    localStorage.setItem("Battle Records", JSON.stringify(battleRecords));
}

// function to make the first letter of a string uppercase
var firstLetterUpper = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// fetch all the pokemon to begin the page
fetchAll();
// add click listeners to everything
$("#show-poke").on("click", selectPokemon);

$("#attack-btn").on("click", fightSequence);

$("#name-click").on("click", addBattle);


