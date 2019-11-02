//Global variables//
var id = "2c4dbd7e"
var key = "307500e630ab60f1ee06b7febaaada1a"
var inputVal = []
console.log(inputVal)


//Drink function//
function getDrink() {
    //Getting the value of the user specified drink selection//
    var drinkSelection = $("input[name=selector]:checked").val();
    console.log(drinkSelection);

    //Cocktail db URL with user specified drink selection//
    var queryURLdrink = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkSelection;
    

    //AJAX call getting each drink name, image, and drink id//
    $.ajax({
        type: "GET",
        url: queryURLdrink,
    }).then(function(response) {
        console.log(queryURLdrink);
        console.log(response);

        //Page scroll animation//
        $("html, body").animate({ scrollTop: "700px" }, 1000);

        //Randomizing the drink selection//
        var rand = Math.floor((Math.random() * response.drinks.length));
        console.log(response.drinks.length);
        $(".drinkCard-title").html(response.drinks[rand].strDrink);
        $(".drinkCard-img-top").attr("src", response.drinks[rand].strDrinkThumb);
        var drinkId = (response.drinks[rand].idDrink);
        console.log(drinkId);

        //Styling the drink card//
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
        
        //Cocktail db URL referencing the drink id from the previous call//
        var queryURLid = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
        
        //AJAX call getting each drink ingredient, unit of measure, and recipe instructions//
        $.ajax({
            type: "GET",
            url: queryURLid,
        }).then(function(response) {
            console.log(queryURLid);
            console.log(response);
            $(".drinkCard-text").empty();
            var list = $("<ul>");
            $(".drinkCard-text").append(list);
            

            //For loop looping through and appending each drink unit of measure and ingredient//
            for (var i = 1; i < 16; i++) {
                var item = $("<li>")
                ingredient = response.drinks[0]["strIngredient" + i];
                unit = response.drinks[0]["strMeasure" + i];
                if (ingredient){
                    item.html(unit + " " + ingredient);
                    list.append(item)
                }
            }
            //Getting the drink instructions and appending them to the drink card//
            var p = $("<p>");
            p.html("<h5>Instructions:</h5> \n" + response.drinks[0].strInstructions);
            $(".drinkCard-text").append(p);
        });
    });
}

//Food recipe function//
function getRecipe() {
    //Getting the value of the user specified food selection//
    var foodSelection = $("input[name=selector]:checked").val();

    //Recipe URL with user specified cuisine selection//
    var queryURLrec = "https://api.edamam.com/search?q=" + foodSelection + "&app_id=$" + id + "&app_key=$" + key + "&from=0&to=50";

    //AJAX call getting each recipe ingredient list and link to the actual recipe//
    $.ajax({
        type: "GET",
        url: queryURLrec,
    }).then(function(response) {
        console.log(queryURLrec);
        console.log(response);
        
         //Page scroll animation//
        $("html, body").animate({ scrollTop: "700px" }, 1000);

        //Displaying the recipe card//
        $(".card").attr("class", "card");

        //Randomizing the food recipes to display a different recipe each time//
        var randFood = Math.floor((Math.random() * response.hits.length));
        console.log(response.hits.length);

        //Getting and appending the recipe title on the page//
        $(".card-title").html(response.hits[randFood].recipe.label);
        $(".card-text").empty();
        var list = $("<ul>")
        $(".card-text").append(list)

        //For loop to loop through the ingredient list and append them to the page//
        for (var i=0; i< response.hits[randFood].recipe.ingredientLines.length; i++) {
            var item = $("<li>")
            item.html(response.hits[randFood].recipe.ingredientLines[i]);
            list.append(item)
        }

        //Getting and appending the recipe image and link to the actual recipe//
        $(".card-img-top").attr("src", response.hits[randFood].recipe.image);
        $("#recipieLink").attr("href", response.hits[randFood].recipe.url);
        $(".card").css("border", "1px solid black");
    });
}

//Function that calls the food recipe function on click of the "Get Recipe" button//
$(function(){
    $('#save_value').click(function(){
        getRecipe();
    });
  });
//Function that calls the drink function on click of the "Get Cocktail" button//
  $(function(){
    $('#save_drink').click(function(){
        getDrink();
    });
  });

  //Setting the "munch" audio element//
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "assets/audio/munch.mp3");

  //Playing the "munch" audio elemnt on click of the "Get Recipe" button//
  $("#save_value").on("click", function () {
    audioElement.play();
  });
  
  //Setting the "gulp" audio element//
  var audioElement2 = document.createElement("audio");
  audioElement2.setAttribute("src", "assets/audio/gulp.mp3");

  //Playing the "gulp" audio element on click of the "Get Cocktail" button//
  $("#save_drink").on("click", function () {
    audioElement2.play();
  });
