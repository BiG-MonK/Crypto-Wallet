//-----------------  Функция отображения времени на стрнице с тикающими сек
window.onload = function(){
  (function(){
    var dt = new Date();                               // Переменная обьект, необходим для работы со временем
    var time = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() + "<br>";
    var secReal = Math.floor(dt.getTime() / 1000);     // Приведение настоящего времени в число с сокращением до секунд
    var secLast = secReal - secUpdateGL;               // Разница в секундах после обновления данных по катировкам монет
    if (secLast == secReal){ 
      secLast = 0;                                     // Пока нет ответа по JSON отображается огромное число - это исправление на нули
    }
    var minLast = Math.floor(secLast / 60);            // Разница в минутах после обновления данных по катировкам монет
    secLast = secLast - (minLast * 60);                // Остатки секунд после вычета минут
    time += "<strong>Данные устарели на: " + minLast + ":" + secLast + "</strong> " + "<br>";
    $(".time").html(time);
    $(".trade.bittrex").html("zec: " + (zecUsd * coinMining.bittrex.zec).toFixed(2) + "<br>" + "zcl: " + (zecUsd * coinMining.bittrex.zec).toFixed(2) + "<br>");
    $(".trade.poloniex").html("dgb: " + (zecUsd * coinMining.bittrex.zec).toFixed(2) + "<br>" + "lbc: " + (zecUsd * coinMining.bittrex.zec).toFixed(2) + "<br>");
    $(".pool.mpoolhub").html("dgb: " + 0 + "<br>" + "xmr: " + (zecUsd * coinMining.bittrex.zec).toFixed(2) + "<br>");
    $(".pool.suprnova").html("lbc: " + (zecUsd * coinMining.bittrex.zec).toFixed(2) + "<br>"
     + "zcl: " + (zecUsd * coinMining.bittrex.zec).toFixed(2) + "<br>"
     + "zec: " + (zecUsd * coinMining.bittrex.zec).toFixed(2) + "<br>"
     + "xmr: " + (zecUsd * coinMining.bittrex.zec).toFixed(2) + "<br>");
    window.setTimeout(arguments.callee, 1000);
  })();
};

//-----------------  Объект хранящий все имеющиеся криптовалюты от майнинга на сейчас
var secUpdateGL = 0;              // Глобальная переменная хранящая в дальнейшем разницу в сек после обновления данных по монетам
var zecUsd = 0;                   // Глобальная переменная хранящая цену ZEC в USD
var rur_usd = 0;                  // Глобальная переменная хранящая курс RUR/USD
var rur_eur = 0;                  // Глобальная переменная хранящая курс RUR/EUR
var btcUsd = 0;                  
var rurUsd = 0;                   
var coinMining = {
  bittrex : {
    zcl : 27.84086542,
    zec : 2.83596232
  },
  poloniex : {
    dgb : 417.44101617,
    lbc : 527.5267266
  },
  mpoolhub : {
    dgb : 0,
    xmr : 0.43234758
  },
  suprnova : {
    lbc : 0,
    zcl : 1.6631,
    zec : 0,
    xmr : 0.0337
  },
  fiat : 6652.93,
  dateIns : "18.10.2017 11:00"
};

// ------------ Bitcoin BTC --------------------
$.getJSON("https://api.coinmarketcap.com/v1/ticker/?limit=400", function(json) { // ------------ Bitcoin BTC -------------------
  var html = "";
  var marketCap = "";                               // Переменная для разбиения на разряды большого числа
  secUpdateGL = json[0].last_updated;
  btcUsd = json[0].price_usd;
  for (var i = 0; i < 400; i++) {
    switch (json[i].symbol) {
      case "BTC":
      case "XMR":
      case "ZCL":
      case "LBC":
      case "ZEC":
      case "DGB":
      case "XRP":
      marketCap = json[i].market_cap_usd.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      html = $("." + json[i].id).html();
      html += "<strong class='name'> " + json[i].name + " ("+ json[i].symbol + ")" + "</strong>: <br>";
      html += "<strong class='rank'> Rank: " + json[i].rank + " </strong><br>";
      html += "<strong class='USD'>" + json[i].price_usd + " USD</strong> " + "<br>";
      html += "<strong class='rur_usd'>(" + (json[i].price_usd * rur_usd).toFixed(2) + " RUR)</strong> " + "<br>";
      html += "<strong class='price_btc'>" + json[i].price_btc + " BTC</strong> " + "<br>";
      $("." + json[i].id).html(html);

      html = "";
      html += "<strong class='market_cap'>Market Cap: <br>" + marketCap + " USD</strong> <br>";
      html += "1h: <strong class='change_coin'> " + json[i].percent_change_1h + "%</strong> " + "<br>";
      html += "24h: <strong class='change_coin'> " + json[i].percent_change_24h + "%</strong> " + "<br>";
      html += "Week: <strong class='change_coin'> " + json[i].percent_change_7d + "%</strong> " + "<br>";
      $("." + json[i].id + "_rest").html(html);
    }
  }
}); 

// ------------ Курс Фиата RUR/USD RUR/EUR --------------------
$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=", function(json) {
  var html = "";
  rur_usd = json.query.results.rate[0].Rate;
  rur_eur = json.query.results.rate[1].Rate;
  html = "<strong> Курс RUR/USD: " + rur_usd + "</strong>" + "<br>";
  $(".USD").html(rur_usd);
  html = "<strong> Курс RUR/EUR: " + rur_eur + "</strong>" + "<br>";
  $(".EUR").html(rur_eur);
}); 

