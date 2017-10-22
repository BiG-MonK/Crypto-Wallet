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
    $(".mining.bittrex").html("zec: " + (zecUsd * coinMining.bittrex.zec).toFixed(2) + "<br>" + "zcl: " + (zclUsd * coinMining.bittrex.zcl).toFixed(2) + "<br>");
    $(".mining.poloniex").html("dgb: " + (dgbUsd * coinMining.poloniex.dgb).toFixed(2) + "<br>" + "lbc: " + (lbcUsd * coinMining.poloniex.lbc).toFixed(2) + "<br>");
    $(".mining.mpoolhub").html("dgb: " + 0 + "<br>" + "xmr: " + (dgbUsd * coinMining.mpoolhub.dgb).toFixed(2) + "<br>");
    $(".mining.suprnova").html("lbc: " + (lbcUsd * coinMining.suprnova.lbc).toFixed(2) + "<br>"
     + "zcl: " + (zclUsd * coinMining.suprnova.zcl).toFixed(2) + "<br>"
     + "zec: " + (zecUsd * coinMining.suprnova.zec).toFixed(2) + "<br>"
     + "xmr: " + (xmrUsd * coinMining.suprnova.xmr).toFixed(2) + "<br>");
    window.setTimeout(arguments.callee, 1000);
  })();
};

var secUpdateGL = 0;              // Глобальная переменная хранящая в дальнейшем разницу в сек после обновления данных по монетам
var btcUsd = 0;                   // Глобальная переменная хранящая цену BTC в USD
var xmrUsd = 0;
var dgbUsd = 0;
var zclUsd = 0;
var ethUsd = 0;
var xrpUsd = 0;
var zecUsd = 0;
var lbcUsd = 0;          
var rur_usd = 0;                  // Глобальная переменная хранящая курс RUR/USD
var rur_eur = 0;                  // Глобальная переменная хранящая курс RUR/EUR
//-----------------  Объект хранящий все имеющиеся криптовалюты от майнинга на сейчас
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

// ------------ JSON запрос данных по крипте --------------------
$.getJSON("https://api.coinmarketcap.com/v1/ticker/?limit=400", function(json) {
  var html = "";
  var marketCap = "";                               // Переменная для разбиения на разряды большого числа
  secUpdateGL = json[0].last_updated;
  for (var i = 0; i < 400; i++) {                   // 400 первых самых инвестированных криптовалют мира
    switch (json[i].symbol) {
      case "BTC":
      case "ETH":
      case "XMR":
      case "ZCL":
      case "LBC":
      case "ZEC":
      case "DGB":
      case "XRP":
      if (json[i].symbol == "BTC") { btcUsd = json[i].price_usd;
      } else if (json[i].symbol == "ETH") {ethUsd = json[i].price_usd;
      } else if (json[i].symbol == "XRP") {xrpUsd = json[i].price_usd;
      } else if (json[i].symbol == "XMR") {xmrUsd = json[i].price_usd;
      } else if (json[i].symbol == "ZEC") {zecUsd = json[i].price_usd;
      } else if (json[i].symbol == "DGB") {dgbUsd = json[i].price_usd;
      } else if (json[i].symbol == "LBC") {lbcUsd = json[i].price_usd;
      } else if (json[i].symbol == "ZCL") {zclUsd = json[i].price_usd;
      };
      marketCap = json[i].market_cap_usd.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      html = $("." + json[i].id).html();
      html += "<strong class='name'> " + json[i].name + " ("+ json[i].symbol + ")" + "</strong>: <br>";
      html += "<strong class='rank'> Rank: " + json[i].rank + " </strong><br>";
      html += "<strong class='USD'>" + json[i].price_usd + " USD</strong> " + "<br>";
      html += "<strong class='rur_usd'>(" + (json[i].price_usd * rur_usd).toFixed(2) + " RUR)</strong> " + "<br>";
      html += "<strong class='price_btc'>" + json[i].price_btc + " BTC</strong> " + "<br>";
      $(".left." + json[i].id).html(html);
      html = "";
      html += "Market Cap: <br><strong class='market_cap'>" + marketCap + " USD</strong> <br><br>";
      html += "1h: <strong class='change_coin'> " + json[i].percent_change_1h + "%</strong> " + "<br>";
      html += "24h: <strong class='change_coin'> " + json[i].percent_change_24h + "%</strong> " + "<br>";
      html += "Week: <strong class='change_coin'> " + json[i].percent_change_7d + "%</strong> " + "<br>";
      $(".right." + json[i].id).html(html);
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

