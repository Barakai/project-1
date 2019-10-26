var id = "2c4dbd7e"
var key = "307500e630ab60f1ee06b7febaaada1a"
var inputVal = []
console.log(inputVal)



var queryURLrec = "https://api.edamam.com/search?q=" + inputVal[0] + "&app_id=$" + id + "&app_key=$" + key + "&from=0&to=3";


function getRecipe() {
    $.ajax({
        type: "GET",
        url: queryURLrec,
    }).then(function(response) {
        console.log(queryURLrec);
        console.log(response);
    });
}


$(function(){
    $('#save_value').click(function(){
      var val = [];
      //console.log(val);
      inputVal.push(val);
      $(':checkbox:checked').each(function(i){
        val[i] = $(this).val();
      });
        queryURLrec = "https://api.edamam.com/search?q=" + inputVal[0] + "&app_id=$" + id + "&app_key=$" + key + "&from=0&to=3";
        getRecipe();
    });
  });

  