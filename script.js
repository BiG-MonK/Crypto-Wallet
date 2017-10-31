//-----------------  Функция отображения времени на стрнице с тикающими сек
window.onload = function(){
  (function(){
    var dt = new Date();                               // Переменная обьект, необходим для работы со временем
    var time = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
    var time_update = "";
    var secReal = Math.floor(dt.getTime() / 1000);     // Приведение настоящего времени в число с сокращением до секунд
    var secLast = secReal - secUpdateGL;               // Разница в секундах после обновления данных по катировкам монет
    if (secLast == secReal){ 
      secLast = 0;                                     // Пока нет ответа по JSON отображается огромное число - это исправление на нули
    }
    var minLast = Math.floor(secLast / 60);            // Разница в минутах после обновления данных по катировкам монет
    secLast = secLast - (minLast * 60);                // Остатки секунд после вычета минут
    time_update = "<strong>Данные устарели на: " + minLast + ":" + secLast + "</strong> ";
    $(".time").html(time);
    $(".time_update").html(time_update);
    window.setTimeout(arguments.callee, 1000);
  })();
};

// ------------ Курс Фиата RUR/USD RUR/EUR --------------------
$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=", function(json) {
  var html = "";
  rur_usd = json.query.results.rate[0].Rate;
  rur_eur = json.query.results.rate[1].Rate;
  html = "<strong> Курс RUR/USD: " + rur_usd + "</strong><br>";
  html += "<strong> Курс RUR/EUR: " + rur_eur + "</strong><br>";
  $(".USD-EUR").html(html);
}); 
//-----------------  Функция нажатия на кнопку Получить данные майнинга
/*function getdata(){
  $(".xmr-total-mining").html(xmrTotal + "<br>" + (xmrTotal * xmrUsd).toFixed(2) + " $<br>" + (xmrTotal * xmrUsd * rur_usd).toFixed(2) + " руб.<br>");
  $(".zec-total-mining").html(zecTotal + "<br>" + (zecTotal * zecUsd).toFixed(2) + " $<br>" + (zecTotal * zecUsd * rur_usd).toFixed(2) + " руб.<br>");
  $(".dgb-total-mining").html(dgbTotal + "<br>" + (dgbTotal * dgbUsd).toFixed(2) + " $<br>" + (dgbTotal * dgbUsd * rur_usd).toFixed(2) + " руб.<br>");
  $(".lbc-total-mining").html(lbcTotal + "<br>" + (lbcTotal * lbcUsd).toFixed(2) + " $<br>" + (lbcTotal * lbcUsd * rur_usd).toFixed(2) + " руб.<br>");
  $(".zcl-total-mining").html(zclTotal + "<br>" + (zclTotal * zclUsd).toFixed(2) + " $<br>" + (zclTotal * zclUsd * rur_usd).toFixed(2) + " руб.<br>");
  $(".total-mining").html((xmrTotal * xmrUsd + zecTotal * zecUsd + dgbTotal * dgbUsd + lbcTotal * lbcUsd + zclTotal * zclUsd).toFixed(2) + " $<br>" 
    + ((xmrTotal * xmrUsd + zecTotal * zecUsd + dgbTotal * dgbUsd + lbcTotal * lbcUsd + zclTotal * zclUsd) * rur_usd).toFixed(2) + " руб.<br>"); 
  bittrexMiningUSD = (coinMining.bittrex.xmr * xmrUsd + coinMining.bittrex.zec * zecUsd + coinMining.bittrex.dgb * dgbUsd + coinMining.bittrex.lbc * lbcUsd + coinMining.bittrex.zcl * zclUsd).toFixed(2);
  poloniexMiningUSD = (coinMining.poloniex.xmr * xmrUsd + coinMining.poloniex.zec * zecUsd + coinMining.poloniex.dgb * dgbUsd + coinMining.poloniex.lbc * lbcUsd + coinMining.poloniex.zcl * zclUsd).toFixed(2);
  mpoolhubMiningUSD = (coinMining.mpoolhub.xmr * xmrUsd + coinMining.mpoolhub.zec * zecUsd + coinMining.mpoolhub.dgb * dgbUsd + coinMining.mpoolhub.lbc * lbcUsd + coinMining.mpoolhub.zcl * zclUsd).toFixed(2);
  suprnovaMiningUSD = (coinMining.suprnova.xmr * xmrUsd + coinMining.suprnova.zec * zecUsd + coinMining.suprnova.dgb * dgbUsd + coinMining.suprnova.lbc * lbcUsd + coinMining.suprnova.zcl * zclUsd).toFixed(2);
  $(".bittrex-mining").html(($(".bittrex-mining").html()) + bittrexMiningUSD + " $<br>" + "(" + (bittrexMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");
  $(".poloniex-mining").html(($(".poloniex-mining").html()) + poloniexMiningUSD + " $<br>" + "("  + (poloniexMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");
  $(".mpoolhub-mining").html(($(".mpoolhub-mining").html()) + mpoolhubMiningUSD + " $<br>" + "("  + (mpoolhubMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");
  $(".suprnova-mining").html(($(".suprnova-mining").html()) + suprnovaMiningUSD + " $<br>" + "("  + (suprnovaMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");
}*/
//-----------------  Объявление переменных
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
var bittrexMiningUSD;             // Глобальная переменная хранящая сумму наймайненных денег в USD на бирже Bittrex
var poloniexMiningUSD;
var mpoolhubMiningUSD;
var suprnovaMiningUSD;
//-----------------  Объект хранящий все имеющиеся криптовалюты от майнинга на сейчас
var coinMining = { 
  bittrex: {
    xmr: 0,
    zec: 2.83596232,
    dgb: 0,
    lbc: 0,
    zcl: 27.84086542
  },
  poloniex: {
    xmr: 0, 
    zec: 0,  
    dgb: 417.44101617,
    lbc: 527.5267266,
    zcl: 0
  },
  mpoolhub: {
    xmr: 0.47487294, 
    zec: 0,  
    dgb: 0,
    lbc: 0,
    zcl: 0
  },
  suprnova: {
    xmr: 0.0337, 
    zec: 0,  
    dgb: 0,
    lbc: 296.7296,
    zcl: 1.6631
  },
  fiat: 6652.93,
  dateIns: "27.10.2017 11:15"
};
// ------------ Объект хранящий данные по сделкам на трейде
var coinTrade = { 
  deal_1: {exchange: "Poloniex", time: "28.09.2017", type: "SELL", target: "ZEC", sum: 3.43136168,    rurUsd: 58.3, priceUsd: 358.21,     fee: 3.08, profit: 29685.45 },
  deal_2: {exchange: "Poloniex", time: "01.10.2017", type: "BUY",  target: "ZEC", sum: 4.52419224,    rurUsd: 58.3, priceUsd: 271.00,     fee: 1.84, profit: 0},
  deal_3: {exchange: "Poloniex", time: "05.10.2017", type: "SELL", target: "XRP", sum: 967.25936446,  rurUsd: 58.3, priceUsd: 0.2224003,  fee: 0.54, profit: 1450.06 },
  deal_4: {exchange: "Poloniex", time: "07.10.2017", type: "BUY",  target: "LBC", sum: 1080.27155361, rurUsd: 58.3, priceUsd: 0.1986359,  fee: 0.32, profit: 0},
  deal_5: {exchange: "Poloniex", time: "18.10.2017", type: "BUY",  target: "XRP", sum: 763.03461542,  rurUsd: 57.4, priceUsd: 0.23062598, fee: 0.37, profit: 0},
  deal_6: {exchange: "Poloniex", time: "24.10.2017", type: "BUY",  target: "LBC", sum: 748.32188244,  rurUsd: 57.5, priceUsd: 0.14573286, fee: 0.10, profit: 0},
  deal_7: {exchange: "Poloniex", time: "24.10.2017", type: "BUY",  target: "LBC", sum: 1637.585271,   rurUsd: 57.5, priceUsd: 0.14791140, fee: 0.60, profit: 0}
  //5: {exchange: "Poloniex",  time: "28.09.2017",  type: "SELL",  target: "ZEC",  sum: 3.43136168,  rurUsd: 58.3,  price-usd: 358.21,  fee: 3.08,  state: "CLOSE",  profit: },
  //6: {exchange: "Poloniex",  time: "28.09.2017",  type: "SELL",  target: "ZEC",  sum: 3.43136168,  rurUsd: 58.3,  price-usd: 358.21,  fee: 3.08,  state: "CLOSE",  profit: }
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
                if (json[i].symbol == "BTC") { btcUsd = json[i].price_usd;                // Присвоение значений переменным хранящих цену в USD у каждой крипты
                } else if (json[i].symbol == "ETH") { ethUsd = json[i].price_usd;
                } else if (json[i].symbol == "XRP") { xrpUsd = json[i].price_usd;
                } else if (json[i].symbol == "XMR") { xmrUsd = json[i].price_usd;
                } else if (json[i].symbol == "ZEC") { zecUsd = json[i].price_usd;
                } else if (json[i].symbol == "DGB") { dgbUsd = json[i].price_usd;
                } else if (json[i].symbol == "LBC") { lbcUsd = json[i].price_usd;
                } else if (json[i].symbol == "ZCL") { zclUsd = json[i].price_usd;};
                marketCap = json[i].market_cap_usd.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                html = $("." + json[i].id).html();
                html += "<strong class='name'> " + json[i].name + " ("+ json[i].symbol + ")" + "</strong>: <br>";
                html += "<strong class='rank'> Rank: " + json[i].rank + " </strong><br>";
                html += "<strong class='USD'>" + json[i].price_usd + " USD</strong><br>";
                html += "<strong class='rur_usd'>(" + (json[i].price_usd * rur_usd).toFixed(2) + " RUR)</strong><br>";
                html += "<strong class='price_btc'>" + json[i].price_btc + " BTC</strong><br>";
                $(".left." + json[i].id).html(html);
                html = "";
                html += "Market Cap: <br><strong class='market_cap'>" + marketCap + " USD</strong><br><br>";
                html += "1h: <strong class='change_coin'> " + json[i].percent_change_1h + "%</strong><br>";
                html += "24h: <strong class='change_coin'> " + json[i].percent_change_24h + "%</strong><br>";
                html += "Week: <strong class='change_coin'> " + json[i].percent_change_7d + "%</strong><br>";
                $(".right." + json[i].id).html(html);
              }
            }
// ------------ Вывод расчетных данных по таблице майнинга
$(".xmr-total-mining").html(xmrTotal + "<br>" + (xmrTotal * xmrUsd).toFixed(2) + " $<br>" + (xmrTotal * xmrUsd * rur_usd).toFixed(2) + " руб.<br>");
$(".zec-total-mining").html(zecTotal + "<br>" + (zecTotal * zecUsd).toFixed(2) + " $<br>" + (zecTotal * zecUsd * rur_usd).toFixed(2) + " руб.<br>");
$(".dgb-total-mining").html(dgbTotal + "<br>" + (dgbTotal * dgbUsd).toFixed(2) + " $<br>" + (dgbTotal * dgbUsd * rur_usd).toFixed(2) + " руб.<br>");
$(".lbc-total-mining").html(lbcTotal + "<br>" + (lbcTotal * lbcUsd).toFixed(2) + " $<br>" + (lbcTotal * lbcUsd * rur_usd).toFixed(2) + " руб.<br>");
$(".zcl-total-mining").html(zclTotal + "<br>" + (zclTotal * zclUsd).toFixed(2) + " $<br>" + (zclTotal * zclUsd * rur_usd).toFixed(2) + " руб.<br>");
$(".total-mining").html("Данные от:<br>" + coinMining.dateIns + "<br><br>" + (xmrTotal * xmrUsd + zecTotal * zecUsd + dgbTotal * dgbUsd + lbcTotal * lbcUsd + zclTotal * zclUsd).toFixed(2) + " $<br>" 
  + ((xmrTotal * xmrUsd + zecTotal * zecUsd + dgbTotal * dgbUsd + lbcTotal * lbcUsd + zclTotal * zclUsd) * rur_usd).toFixed(2) + " руб.<br>"); 
bittrexMiningUSD = (coinMining.bittrex.xmr * xmrUsd + coinMining.bittrex.zec * zecUsd + coinMining.bittrex.dgb * dgbUsd + coinMining.bittrex.lbc * lbcUsd + coinMining.bittrex.zcl * zclUsd).toFixed(2);
poloniexMiningUSD = (coinMining.poloniex.xmr * xmrUsd + coinMining.poloniex.zec * zecUsd + coinMining.poloniex.dgb * dgbUsd + coinMining.poloniex.lbc * lbcUsd + coinMining.poloniex.zcl * zclUsd).toFixed(2);
mpoolhubMiningUSD = (coinMining.mpoolhub.xmr * xmrUsd + coinMining.mpoolhub.zec * zecUsd + coinMining.mpoolhub.dgb * dgbUsd + coinMining.mpoolhub.lbc * lbcUsd + coinMining.mpoolhub.zcl * zclUsd).toFixed(2);
suprnovaMiningUSD = (coinMining.suprnova.xmr * xmrUsd + coinMining.suprnova.zec * zecUsd + coinMining.suprnova.dgb * dgbUsd + coinMining.suprnova.lbc * lbcUsd + coinMining.suprnova.zcl * zclUsd).toFixed(2);
$(".bittrex-mining").html(($(".bittrex-mining").html()) + bittrexMiningUSD + " $<br>" + "(" + (bittrexMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");
$(".poloniex-mining").html(($(".poloniex-mining").html()) + poloniexMiningUSD + " $<br>" + "("  + (poloniexMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");
$(".mpoolhub-mining").html(($(".mpoolhub-mining").html()) + mpoolhubMiningUSD + " $<br>" + "("  + (mpoolhubMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");
$(".suprnova-mining").html(($(".suprnova-mining").html()) + suprnovaMiningUSD + " $<br>" + "("  + (suprnovaMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");

// ------------ Вывод расчетных данных по таблице трейдинга
html = $(".time-trade").html()+"<hr>";
html += "<p class='deal_1'>" + coinTrade.deal_1.time + "</p><br>";
html += "<p class='deal_2'>" + coinTrade.deal_2.time + "</p><br>";
html += "<p class='deal_3'>" + coinTrade.deal_3.time + "</p><br>";
html += "<p class='deal_4'>" + coinTrade.deal_4.time + "</p><br>";
html += "<p class='deal_5'>" + coinTrade.deal_5.time + "</p><br>";
html += "<p class='deal_6'>" + coinTrade.deal_6.time + "</p><br>";
html += "<p class='deal_7'>" + coinTrade.deal_7.time + "</p><br>";
$(".time-trade").html(html);                                            // Вывод столбца даты
html = $(".type-trade").html()+"<hr>";
html += "<p class='deal_1'>" + coinTrade.deal_1.type + "</p><br>";
html += "<p class='deal_2'>" + coinTrade.deal_2.type + "</p><br>";
html += "<p class='deal_3'>" + coinTrade.deal_3.type + "</p><br>";
html += "<p class='deal_4'>" + coinTrade.deal_4.type + "</p><br>";
html += "<p class='deal_5'>" + coinTrade.deal_5.type + "</p><br>";
html += "<p class='deal_6'>" + coinTrade.deal_6.type + "</p><br>";
html += "<p class='deal_7'>" + coinTrade.deal_7.type + "</p><br>";
$(".type-trade").html(html);                                            // Вывод столбца сделки
html = $(".target-trade").html()+"<hr>";
html += "<p class='deal_1'>" + coinTrade.deal_1.target + "</p><br>";
html += "<p class='deal_2'>" + coinTrade.deal_2.target + "</p><br>";
html += "<p class='deal_3'>" + coinTrade.deal_3.target + "</p><br>";
html += "<p class='deal_4'>" + coinTrade.deal_4.target + "</p><br>";
html += "<p class='deal_5'>" + coinTrade.deal_5.target + "</p><br>";
html += "<p class='deal_6'>" + coinTrade.deal_6.target + "</p><br>";
html += "<p class='deal_7'>" + coinTrade.deal_7.target + "</p><br>";
$(".target-trade").html(html);
html = $(".sum-trade").html()+"<hr>";
html += "<p class='deal_1'>" + coinTrade.deal_1.sum + "</p><br>";
html += "<p class='deal_2'>" + coinTrade.deal_2.sum + "</p><br>";
html += "<p class='deal_3'>" + coinTrade.deal_3.sum + "</p><br>";
html += "<p class='deal_4'>" + coinTrade.deal_4.sum + "</p><br>";
html += "<p class='deal_5'>" + coinTrade.deal_5.sum + "</p><br>";
html += "<p class='deal_6'>" + coinTrade.deal_6.sum + "</p><br>";
html += "<p class='deal_7'>" + coinTrade.deal_7.sum + "</p><br>";
$(".sum-trade").html(html);
html = $(".priceUsd-trade").html()+"<hr>";
html += "<p class='deal_1'>" + coinTrade.deal_1.priceUsd + "</p><br>";
html += "<p class='deal_2'>" + coinTrade.deal_2.priceUsd + "</p><br>";
html += "<p class='deal_3'>" + coinTrade.deal_3.priceUsd + "</p><br>";
html += "<p class='deal_4'>" + coinTrade.deal_4.priceUsd + "</p><br>";
html += "<p class='deal_5'>" + coinTrade.deal_5.priceUsd + "</p><br>";
html += "<p class='deal_6'>" + coinTrade.deal_6.priceUsd + "</p><br>";
html += "<p class='deal_7'>" + coinTrade.deal_7.priceUsd + "</p><br>";
$(".priceUsd-trade").html(html);
html = $(".state-trade").html()+"<hr>";
html += "<p class='deal_1'>" + coinTrade.deal_1.state + "</p><br>";
html += "<p class='deal_2'>" + coinTrade.deal_2.state + "</p><br>";
html += "<p class='deal_3'>" + coinTrade.deal_3.state + "</p><br>";
html += "<p class='deal_4'>" + coinTrade.deal_4.state + "</p><br>";
html += "<p class='deal_5'>" + coinTrade.deal_5.state + "</p><br>";
html += "<p class='deal_6'>" + coinTrade.deal_6.state + "</p><br>";
html += "<p class='deal_7'>" + coinTrade.deal_7.state + "</p><br>";
$(".state-trade").html(html);
html = $(".profit-trade").html()+"<hr>";
html += "<p class='deal_1'>" + coinTrade.deal_1.profit + "</p><br>";
html += "<p class='deal_2'>" + (((zecUsd * coinTrade.deal_2.sum) - (coinTrade.deal_2.priceUsd * coinTrade.deal_2.sum)) * rur_usd).toFixed(2) + "</p><br>";
html += "<p class='deal_3'>" + coinTrade.deal_3.profit + "</p><br>";
html += "<p class='deal_4'>" + (((lbcUsd * coinTrade.deal_4.sum) - (coinTrade.deal_4.priceUsd * coinTrade.deal_4.sum)) * rur_usd).toFixed(2) + "</p><br>";
html += "<p class='deal_5'>" + (((xrpUsd * coinTrade.deal_5.sum) - (coinTrade.deal_5.priceUsd * coinTrade.deal_5.sum)) * rur_usd).toFixed(2) + "</p><br>";
html += "<p class='deal_6'>" + (((lbcUsd * coinTrade.deal_6.sum) - (coinTrade.deal_6.priceUsd * coinTrade.deal_6.sum)) * rur_usd).toFixed(2) + "</p><br>";
html += "<p class='deal_7'>" + (((lbcUsd * coinTrade.deal_7.sum) - (coinTrade.deal_7.priceUsd * coinTrade.deal_7.sum)) * rur_usd).toFixed(2) + "</p><br>";
$(".profit-trade").html(html);

html = "По Сделке №2 на ZEC -----> Вложил: " + ((coinTrade.deal_2.priceUsd * coinTrade.deal_2.sum) * rur_usd).toFixed(2) + " руб.  ......  если продать сейчас: " + ((zecUsd * coinTrade.deal_2.sum) * rur_usd).toFixed(2) + " руб.  ......  Потеря: " + ((coinTrade.deal_2.priceUsd * coinTrade.deal_2.sum * rur_usd) - (zecUsd * coinTrade.deal_2.sum * rur_usd)).toFixed(2) + " руб.<br>";
html += "По Сделке №4 на LBC -----> Вложил: " + ((coinTrade.deal_4.priceUsd * coinTrade.deal_4.sum) * rur_usd).toFixed(2) + " руб.  ......  если продать сейчас: " + ((lbcUsd * coinTrade.deal_4.sum) * rur_usd).toFixed(2) + " руб.  ......  Потеря: " + ((coinTrade.deal_4.priceUsd * coinTrade.deal_4.sum * rur_usd) - (lbcUsd * coinTrade.deal_4.sum * rur_usd)).toFixed(2) + " руб.<br>";
html += "По Сделке №5 на XRP -----> Вложил: " + ((coinTrade.deal_5.priceUsd * coinTrade.deal_5.sum) * rur_usd).toFixed(2) + " руб.  ......  если продать сейчас: " + ((xrpUsd * coinTrade.deal_5.sum) * rur_usd).toFixed(2) + " руб.  ......  Потеря: " + ((coinTrade.deal_5.priceUsd * coinTrade.deal_5.sum * rur_usd) - (xrpUsd * coinTrade.deal_5.sum * rur_usd)).toFixed(2) + " руб.<br>";
html += "По Сделке №6 на LBC -----> Вложил: " + ((coinTrade.deal_6.priceUsd * coinTrade.deal_6.sum) * rur_usd).toFixed(2) + " руб.  ......  если продать сейчас: " + ((lbcUsd * coinTrade.deal_6.sum) * rur_usd).toFixed(2) + " руб.  ......  Потеря: " + ((coinTrade.deal_6.priceUsd * coinTrade.deal_6.sum * rur_usd) - (lbcUsd * coinTrade.deal_6.sum * rur_usd)).toFixed(2) + " руб.<br>";
html += "По Сделке №7 на LBC -----> Вложил: " + ((coinTrade.deal_7.priceUsd * coinTrade.deal_7.sum) * rur_usd).toFixed(2) + " руб.  ......  если продать сейчас: " + ((lbcUsd * coinTrade.deal_7.sum) * rur_usd).toFixed(2) + " руб.  ......  Потеря: " + ((coinTrade.deal_7.priceUsd * coinTrade.deal_7.sum * rur_usd) - (lbcUsd * coinTrade.deal_7.sum * rur_usd)).toFixed(2) + " руб.<br>";
$("p.results").html(html);
});

// ------------ Вывод статичных данных майнинга с объекта coinMining
var xmrTotal = coinMining.bittrex.xmr + coinMining.poloniex.xmr + coinMining.mpoolhub.xmr + coinMining.suprnova.xmr;
var zecTotal = coinMining.bittrex.zec + coinMining.poloniex.zec + coinMining.mpoolhub.zec + coinMining.suprnova.zec;
var dgbTotal = coinMining.bittrex.dgb + coinMining.poloniex.dgb + coinMining.mpoolhub.dgb + coinMining.suprnova.dgb;
var lbcTotal = coinMining.bittrex.lbc + coinMining.poloniex.lbc + coinMining.mpoolhub.lbc + coinMining.suprnova.lbc;
var zclTotal = coinMining.bittrex.zcl + coinMining.poloniex.zcl + coinMining.mpoolhub.zcl + coinMining.suprnova.zcl;
$(".xmr-bittrex-mining").html(coinMining.bittrex.xmr);  
$(".xmr-poloniex-mining").html(coinMining.poloniex.xmr);
$(".xmr-mpoolhub-mining").html(coinMining.mpoolhub.xmr);
$(".xmr-suprnova-mining").html(coinMining.suprnova.xmr);
$(".zec-bittrex-mining").html(coinMining.bittrex.zec);  
$(".zec-poloniex-mining").html(coinMining.poloniex.zec);
$(".zec-mpoolhub-mining").html(coinMining.mpoolhub.zec);
$(".zec-suprnova-mining").html(coinMining.suprnova.zec);
$(".dgb-bittrex-mining").html(coinMining.bittrex.dgb);  
$(".dgb-poloniex-mining").html(coinMining.poloniex.dgb);
$(".dgb-mpoolhub-mining").html(coinMining.mpoolhub.dgb);
$(".dgb-suprnova-mining").html(coinMining.suprnova.dgb);
$(".lbc-bittrex-mining").html(coinMining.bittrex.lbc);  
$(".lbc-poloniex-mining").html(coinMining.poloniex.lbc);
$(".lbc-mpoolhub-mining").html(coinMining.mpoolhub.lbc);
$(".lbc-suprnova-mining").html(coinMining.suprnova.lbc);
$(".zcl-bittrex-mining").html(coinMining.bittrex.zcl);  
$(".zcl-poloniex-mining").html(coinMining.poloniex.zcl);
$(".zcl-mpoolhub-mining").html(coinMining.mpoolhub.zcl);
$(".zcl-suprnova-mining").html(coinMining.suprnova.zcl);


