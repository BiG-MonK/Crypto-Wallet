$.getJSON("https://api.coinmarketcap.com/v1/ticker/?limit=10", function(json) {
	//var myStr = JSON.stringify(json);
  //myStr = JSON.parse(myStr);
  var html = "";
  //$("#test").html(JSON.stringify(json));
  console.log(json[1].price_usd);
  json.forEach(function(val) {             //перебор каждого элемента в json
    var keys = Object.keys(val);
    html += "<div class = 'cat'>";
    keys.forEach(function(key) {
      if (key == 'id'){
      html += "<strong>" + key + "</strong>: " + val[key] + "<br>";}
    });
    html += "</div><br>";
  });
 // alert(myStr[1]);
 $(".message").html(html);
 $(".ETH").html(json[1].price_usd);
 //$("#test").html(Object.keys[1]);
}); 


//	var html = "<strong>" + "key" + "</strong>: " + "val" + "<br>";
	//$("#test").html(html);