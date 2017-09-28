$.getJSON("https://api.coinmarketcap.com/v1/ticker/?limit=10", function(json) {
	console.log(json);
	$("#test").html(JSON.stringify(json));
}); 

//	var html = "<strong>" + "key" + "</strong>: " + "val" + "<br>";
	//$("#test").html(html);