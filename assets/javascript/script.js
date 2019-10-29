var id = "2c4dbd7e"
var key = "307500e630ab60f1ee06b7febaaada1a"
var inputVal = []
console.log(inputVal)

//var keyDrink = "2a691620d5msh4e8a5c039b25ddbp18b31cjsnee98b7bab1cf"


function getDrink() {
    var drinkSelection = $("input[name=selector]:checked").val();
    console.log(drinkSelection);
    var queryURLdrink = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkSelection;

    $.ajax({
        type: "GET",
        url: queryURLdrink,
    }).then(function(response) {
        console.log(queryURLdrink);
        console.log(response);
        $(".drinkCard").attr("class", "drinkCard");
        $(".drinkCard-title").html(response.drinks[0].strDrink);
        $(".drinkCard-img-top").attr("src", response.drinks[0].strDrinkThumb);
        // $("#recipieLink").attr("href", response.hits[0].recipe.url);
    });

}


function getRecipe() {

    var foodSelection = $("input[name=selector]:checked").val();
    var queryURLrec = "https://api.edamam.com/search?q=" + foodSelection + "&app_id=$" + id + "&app_key=$" + key + "&from=0&to=30";

    $.ajax({
        type: "GET",
        url: queryURLrec,
    }).then(function(response) {
        console.log("animate");
        $("html, body").animate({ scrollTop: "1800px" }, 5000);
        console.log(queryURLrec);
        console.log(response);
        $(".card").attr("class", "card");
        $(".card-title").html(response.hits[0].recipe.label);
        $(".card-text").empty();
        var list = $("<ul>")
        $(".card-text").append(list)

        for (var i=0; i< response.hits[0].recipe.ingredientLines.length; i++) {
            var item = $("<li>")
            item.html(response.hits[0].recipe.ingredientLines[i]);
            list.append(item)
        }

        $(".card-img-top").attr("src", response.hits[0].recipe.image);
        $("#recipieLink").attr("href", response.hits[0].recipe.url);
        $(".card").css("border", "1px solid black");
      
    });
}


$(function(){
    $('#save_value').click(function(){
        getRecipe();
    });
  });

  $(function(){
    $('#save_drink').click(function(){
        getDrink();
    });
  });

  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "assets/audio/munch.mp3");

  $("#save_value").on("click", function () {
    audioElement.play();
  });
  
  var audioElement2 = document.createElement("audio");
  audioElement2.setAttribute("src", "assets/audio/gulp.mp3");

  $("#save_drink").on("click", function () {
    audioElement2.play();
  });

//   $(function() {
//     $("#save_value").on("click", function() {
//         $("body").animate({"scrollTop": window.scrollY+300}, 1000);
//         return false;
//     });
// }); 