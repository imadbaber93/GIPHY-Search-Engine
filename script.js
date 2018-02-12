var athletes = ["Kobe Bryant", "Matt Ryan", "Muhammad Ali", "Lebron James", "Floyd Mayweather"];

$(document).ready(function() {

function displayGifButtons(){
    $("#gifButtonsView").empty(); 
    for (var i = 0; i < athletes.length; i++){
        var gifButton = $("<button>");
        //gifButton.addClass("action");
        gifButton.addClass("btn btn-primary playerButton")
        gifButton.attr("data-name", athletes[i]);
        gifButton.text(athletes[i]);
        $("#gifButtonsView").append(gifButton);
    }
}

$("#addGif").on("click", function(event) {

    event.preventDefault();
    
    var input = $("#user-input").val().trim();

    athletes.push(input);

    $("#user-input").val("");

    displayGifButtons();

    });
     
$("#removeGif").on("click", function(){
    athletes.pop(athletes);
   displayGifButtons();
 });

function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=2lvaJAZLEZiCKnZHXhDmJCij9D1B2j33&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {

        $("#gifsView").empty();
        console.log(response);
        var results = response.data; 

        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("athDiv");
            var gifRating = $("<p class ='rating'>").text("Rating: " + results[i].rating);            
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.downsized_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            //gifImage.addClass("image");
            gifDiv.append(gifImage);
            gifDiv.append(gifRating);
            $("#gifsView").append(gifDiv);
        }
    });
}

function animateGif(){
    var state = $(this).find("img").attr("data-state");
    
    var image = $(this).find("img");

    if (state === "still") {
                 
         image.attr("src", $(this).find("img").attr("data-animate"));
 
        image.attr("data-state", "animate");
             
    } else {
        
        image.attr("src", $(this).find("img").attr("data-still"));

        image.attr("data-state", "still");
            
    }

}   

displayGifButtons(); 

// Document Event Listeners
$(document).on("click", ".athDiv", animateGif);
$(document).on("click", ".playerButton", displayGifs);
    
});
