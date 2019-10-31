var id = "2c4dbd7e"
var key = "307500e630ab60f1ee06b7febaaada1a"
var inputVal = []
console.log(inputVal)



function getDrink() {
    var drinkSelection = $("input[name=selector]:checked").val();
    console.log(drinkSelection);
    var queryURLdrink = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkSelection;

    $.ajax({
        type: "GET",
        url: queryURLdrink,
    }).then(function(response) {
        $("html, body").animate({ scrollTop: "700px" }, 1000);
        console.log(queryURLdrink);
        console.log(response);
        $(".drinkCard").attr("class", "drinkCard");
        var rand = Math.floor((Math.random() * response.drinks.length));
        console.log(response.drinks.length);
        $(".drinkCard-title").html(response.drinks[rand].strDrink);
        $(".drinkCard-img-top").attr("src", response.drinks[rand].strDrinkThumb);
        $(".drinkCard").css("border", "1px solid black");
        $(".drinkCard").css("border-radius", ".25rem");
        $(".drinkCard").css("border", "1px solid rgba(0,0,0,.125)");
        $(".drinkCard").css("background-color", "#fff");
        $(".drinkCard").css("display", "flex");
        $(".drinkCard").css("background-clip", "border-box");
        $(".drinkCard").css("word-wrap", "break-word");
        $(".drinkCard").css("flex-direction", "column");
        $(".drinkCard").css("border", "1px solid black");
        $(".drinkCard").css("padding", "20px");
        var drinkId = (response.drinks[rand].idDrink);
        console.log(drinkId);

        var queryURLid = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;

        $.ajax({
            type: "GET",
            url: queryURLid,
        }).then(function(response) {
            console.log(queryURLid);
            console.log(response);
            $(".drinkCard-text").empty();
            var list = $("<ul>");
            $(".drinkCard-text").append(list);
            


            for (var i = 1; i < 16; i++) {
                var item = $("<li>")
                ingredient = response.drinks[0]["strIngredient" + i];
                unit = response.drinks[0]["strMeasure" + i];
                if (ingredient){
                    item.html(unit + " " + ingredient);
                    list.append(item)
                }
            }
            var p = $("<p>");
            p.html("<h5>Instructions:</h5> \n" + response.drinks[0].strInstructions);
            $(".drinkCard-text").append(p);
        });
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
        $("html, body").animate({ scrollTop: "700px" }, 1000);
        console.log(queryURLrec);
        console.log(response);
        $(".card").attr("class", "card");
        var randFood = Math.floor((Math.random() * response.hits.length));
        console.log(response.hits.length);
        $(".card-title").html(response.hits[randFood].recipe.label);
        $(".card-text").empty();
        var list = $("<ul>")
        $(".card-text").append(list)

        for (var i=0; i< response.hits[randFood].recipe.ingredientLines.length; i++) {
            var item = $("<li>")
            item.html(response.hits[randFood].recipe.ingredientLines[i]);
            list.append(item)
        }

        $(".card-img-top").attr("src", response.hits[randFood].recipe.image);
        $("#recipieLink").attr("href", response.hits[randFood].recipe.url);
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
