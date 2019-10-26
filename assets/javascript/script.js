var id = "2c4dbd7e"
var key = "307500e630ab60f1ee06b7febaaada1a"
var inputVal = []
console.log(inputVal)






function getRecipe() {

    var foodSelection = $("input[name=selector]:checked").val();
    var queryURLrec = "https://api.edamam.com/search?q=" + foodSelection + "&app_id=$" + id + "&app_key=$" + key + "&from=0&to=3";

    $.ajax({
        type: "GET",
        url: queryURLrec,
    }).then(function(response) {
        console.log(queryURLrec);
        console.log(response);
        $(".card").attr("class", "card");
        $(".card-title").html(response.hits[0].recipe.label);
        $(".card-text").html(response.hits[0].recipe.ingredientLines);
        $(".card-img-top").attr("src", response.hits[0].recipe.image);
        $("#recipieLink").attr("href", response.hits[0].recipe.url);
    });
}


$(function(){
    $('#save_value').click(function(){
        getRecipe();
    });
  });

  