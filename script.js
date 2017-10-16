var myCoin {
  
}
// ------------ Bitcoin BTC --------------------
$.getJSON("https://api.coinmarketcap.com/v1/ticker/bitcoin/", function(json) { // ------------ Bitcoin BTC -------------------
  var html = "";
  var html = ""; 
  console.log(json);
  html = "<strong> Rank: " + json[0].rank + "</strong>: " + "<br>";
  html += "<strong>" + json[0].name + " ("+ json[0].symbol + ")" + "</strong>: " + "<br>";
  html += "<strong>" + json[0].price_usd + " USD</strong> " + "<br>";
 $(".bitcoin").html(html);
}); 

// ------------ Курс Фиата RUR/USD RUR/EUR --------------------
$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=", function(json) {  // ------------ Monero XMR --------------------
  var USD = "";
  var EUR = "";
  USD = "<strong> Курс RUR/USD: " + json.query.results.rate[0].Rate + "</strong>: " + "<br>";
  $(".USD").html(USD);
  EUR = "<strong> Курс RUR/EUR: " + json.query.results.rate[1].Rate + "</strong>: " + "<br>";
  $(".EUR").html(EUR);
}); 
