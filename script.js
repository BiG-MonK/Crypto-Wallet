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
    $(".trade.bittrex").html("zec: " + zecUsd * coinMining.bittrex.zec + "<br>" + "zec: " + zecUsd * coinMining.bittrex.zec + "<br>");
    $(".trade.poloniex").html("dgb: " + zecUsd * coinMining.poloniex.dgb + "<br>");
    window.setTimeout(arguments.callee, 1000);
})();
};

//-----------------  Объект хранящий все имеющиеся криптовалюты от майнинга на сейчас
var secUpdateGL = 0;              // Глобальная переменная хранящая в дальнейшем разницу в сек после обновления данных по монетам
var zecUsd = 0;                   // Глобальная переменная хранящая цену ZEC в USD
var btcUsd = 0;
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
$.getJSON("https://api.coinmarketcap.com/v1/ticker/bitcoin/", function(json) { // ------------ Bitcoin BTC -------------------
  var html = $(".coin.bitcoin").html();
  secUpdateGL = json[0].last_updated;
  btcUsd = json[0].price_usd;
  html += "<strong> Rank: " + json[0].rank + "</strong>: " + "<br>";
  html += "<strong>" + json[0].name + " ("+ json[0].symbol + ")" + "</strong>: " + "<br>";
  html += "<strong>" + json[0].price_usd + " USD</strong> " + "<br>";
  html += "<strong>" + json[0].price_btc + " BTC</strong> " + "<br>";
  html += "<strong>Валатильность монеты: </strong> " + "<br>";
  html += "<strong>За 1 час: " + json[0].percent_change_1h + "%</strong> " + "<br>";
  html += "<strong>За 24 часа: " + json[0].percent_change_24h + "%</strong> " + "<br>";
  html += "<strong>За неделю: " + json[0].percent_change_7d + "%</strong> " + "<br>";
  $(".coin.bitcoin").html(html);
}); 

$.getJSON("https://api.coinmarketcap.com/v1/ticker/zcash/", function(json) { // ------------ Zcash ZEC -------------------
  var html = $(".coin.zcash").html();
  zecUsd = json[0].price_usd;
  html += "<strong> Rank: " + json[0].rank + "</strong>: " + "<br>";
  html += "<strong>" + json[0].name + " ("+ json[0].symbol + ")" + "</strong>: " + "<br>";
  html += "<strong>" + json[0].price_usd + " USD</strong> " + "<br>";
  html += "<strong>" + json[0].price_btc + " BTC</strong> " + "<br>";
  html += "<strong>Валатильность монеты: </strong> " + "<br>";
  html += "<strong>За 1 час: " + json[0].percent_change_1h + "%</strong> " + "<br>";
  html += "<strong>За 24 часа: " + json[0].percent_change_24h + "%</strong> " + "<br>";
  html += "<strong>За неделю: " + json[0].percent_change_7d + "%</strong> " + "<br>";
  $(".coin.zcash").html(html);
}); 

// ------------ Курс Фиата RUR/USD RUR/EUR --------------------
$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=", function(json) {
  var USD = "";
  var EUR = "";
  USD = "<strong> Курс RUR/USD: " + json.query.results.rate[0].Rate + "</strong>" + "<br>";
  $(".USD").html(USD);
  EUR = "<strong> Курс RUR/EUR: " + json.query.results.rate[1].Rate + "</strong>" + "<br>";
  $(".EUR").html(EUR);
}); 

