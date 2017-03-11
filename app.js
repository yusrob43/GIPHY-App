var buttons = ["Legend of Zelda", "Final Fantasy", "Pokemon", "Fire Emblem"];
var stillImages = [];
var addButtons = function() {
	
	buttons.map(function(e){
		
		var button = $("<button>");
			button.html(e);
	
	$(".buttonDiv").append(button);
	button.attr("data-name", e);
	button.addClass("btn btn-default")
	console.log(button);
	});
	
}
	addButtons();

 var runAjax = function(link){
 	$(".gifs").empty();
		$.ajax({
          url: link,
          method: "GET"
        })
        .done(function(response){
		console.log(response.data[0].images.fixed_height.url);
		console.log(response.data[0].images.fixed_height_still.url);
		
		for (var i = 0; i < response.data.length; i++){
		var image = $("<img>");
		image.attr({
			src: response.data[i].images.fixed_height.url,
			"data-animate": response.data[i].images.fixed_height.url,
			"data-still": response.data[i].images.fixed_height_still.url,
			"data-name": "still"
		});

	$(".gifs").append(image);
}

  });
};	


$("#search").on("click", function(){
	var userValue = $("#vg-value").val().replace(" ", "+");
	console.log(userValue);
	var link = "http://api.giphy.com/v1/gifs/search?q=" + userValue + "&api_key=dc6zaTOxFJmzC";
		if (userValue != ""){
			buttons.push(userValue);
//			runAjax(link);
		}

	
	$(".buttonDiv").empty();
	console.log(link);
	
	$("#vg-value").val(" ");
	addButtons();
});

$(".buttonDiv").on("click", "button", function(){
	var buttonValue = $(this).attr("data-name");
	var link = "http://api.giphy.com/v1/gifs/search?q=" + buttonValue + "&api_key=dc6zaTOxFJmzC";
	runAjax(link);
});

$(document).on("click", "img", function(){
	console.log($(this).attr("data-animate"));

	if ($(this).attr("data-name") === "still"){
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-name", "animate");
	}

	else{
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-name", "still");
	}
});	

