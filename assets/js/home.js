// function to delete welcome message at homepage
var deleteWelcome = function() {
    $(".message").remove();
    $(".hero-background").css("height", "90vh");
};

$("#welcome-button").on("click", deleteWelcome);

