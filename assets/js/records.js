// function to save the battle to local storage
var saveBattle = function() {
    localStorage.setItem("Battle Records", JSON.stringify(battleRecords));
}

// function to iterate through local storage to generate scores and list
var viewBattles = function() {
    var newList = $("#record-ol");
    newList.empty();

    for (i = 0; i < battleRecords.length; i++) {
        var newLi = $("<li></li>");
        newLi.html(battleRecords[i].name + "</br> Wins: " + battleRecords[i].wins + " Losses: " + battleRecords[i].losses);
        newLi.addClass("column is-12");
        $(newList).append(newLi);
    }
}

// function that combines all necessary functions to display the battle records
var generateList = function() {
    battleRecords = JSON.parse(localStorage.getItem("Battle Records")) || [];
    saveBattle();
    $("#record-ol").empty();
    viewBattles();
}

// function that will delete all of local storage and clear the list
var clearStorage = function() {
    localStorage.clear();
    $("#record-ol").empty();
}

// function to go back to the battle screen html to play again
var playAgain = function() {
    window.location.href = "./battle_screen.html";
}
// run on page load
generateList();
// adding click listeners to necessary buttons
$("#play-again").on("click", playAgain);

$("#clear-battles").on("click", clearStorage);
