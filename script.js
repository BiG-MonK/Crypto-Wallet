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
    zec: 3.20414772,
    dgb: 417.44101617,
    lbc: 2336.60447063,
    zcl: 0
  },
  poloniex: {
    xmr: 0,
    zec: 0,  
    dgb: 0,
    lbc: 0,
    zcl: 0
  },
  mpoolhub: {
    xmr: 0.80092579, 
    zec: 0,  
    dgb: 0,
    lbc: 0,
    zcl: 0
  },
  suprnova: {
    xmr: 0.03370000, 
    zec: 0,  
    dgb: 0,
    lbc: 233.1334,
    zcl: 1.6631
  },
  fiat: 6652.93,
  dateIns: "05.12.2017 15:45"
};

// ------------ Объект хранящий данные по сделкам на трейде
var coinTrade = { 
  deal_1: {exchange: "Poloniex", time: "30.11.2017", type: "BUY",  target: "ETH", sum: 2,              rurUsd: 58.4,  priceUsd: 445.58},
  deal_2: {exchange: "Poloniex", time: "30.11.2017", type: "BUY",  target: "ZEC", sum: 3,              rurUsd: 58.4,  priceUsd: 319.66},
  deal_3: {exchange: "Poloniex", time: "30.11.2017", type: "BUY",  target: "XRP", sum: 4338.84447816,  rurUsd: 58.4,  priceUsd: 0.24455311}
};
// ------------ Переменные для сокращения записи в выводе расчетных данных таблицы майнинга
var xmrTotal = (coinMining.bittrex.xmr + coinMining.poloniex.xmr + coinMining.mpoolhub.xmr + coinMining.suprnova.xmr).toFixed(8);
var zecTotal = (coinMining.bittrex.zec + coinMining.poloniex.zec + coinMining.mpoolhub.zec + coinMining.suprnova.zec).toFixed(8);
var dgbTotal = (coinMining.bittrex.dgb + coinMining.poloniex.dgb + coinMining.mpoolhub.dgb + coinMining.suprnova.dgb).toFixed(8);
var lbcTotal = (coinMining.bittrex.lbc + coinMining.poloniex.lbc + coinMining.mpoolhub.lbc + coinMining.suprnova.lbc).toFixed(8);
var zclTotal = (coinMining.bittrex.zcl + coinMining.poloniex.zcl + coinMining.mpoolhub.zcl + coinMining.suprnova.zcl).toFixed(8);

//_______________________________________________________________________________ Функция вывода в ячейки таблицы трейдинга
function coinTradeOutput (col){
  var html = '';
  for (var i = 0; i < Object.keys(coinTrade).length; i++ ){
    html += "<p class='deal_" + (i+1) + "'>" + coinTrade[Object.keys(coinTrade)[i]][col] + "</p><br>"; 
  }
  return html;
}

//_______________________________________________________________________________ Функция отображения времени на стрнице с тикающими сек
window.onload = function(){
  (function(){
    var dt = new Date();                               // Переменная обьект, необходим для работы со временем
    var time = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
    $(".time").html(time);
    window.setTimeout(arguments.callee, 1000);
  })();  
  //тут можно писать другой код JS
  window.setTimeout(Polo,3000);
  window.setInterval(Polo,10000);
}; //конец функции onload

//_______________________________________________________________________________ Курс Фиата RUR/USD RUR/EUR
$.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(json) {
  var html = "";
  var UsdValue = json.Valute.USD.Value;
  var UsdPrevious = json.Valute.USD.Previous;
  var EurValue = json.Valute.EUR.Value;
  var EurPrevious = json.Valute.EUR.Previous;
  rur_usd = json.Valute.USD.Value;
  rur_eur = json.Valute.EUR.Value;
  function trend(current, previous) {
    if (current > previous) return ' ▲';
    if (current < previous) return ' ▼';
    return '';
  }
  html = $("#USD").html();
  $("#USD").html(html.replace('00,0000', UsdValue.toFixed(4).replace('.', ',')) + trend(UsdValue, UsdPrevious) + " " + (UsdPrevious - UsdValue).toFixed(4).replace('.', ','));
  $("#EUR").html(html.replace('00,0000', EurValue.toFixed(4).replace('.', ',')) + trend(EurValue, EurPrevious) + " " + (EurPrevious - EurValue).toFixed(4).replace('.', ','));
}); // Конец JSON запроса на курс фиата

function Polo(){
//_______________________________________________________________________________ JSON запрос данных по крипте на биржу Poloniex
$.getJSON("https://poloniex.com/public?command=returnTicker", function(json) {
  btcUsd = json.USDT_BTC.last;
  $('.left.bitcoin strong.USD').text((+btcUsd).toFixed(2) + " USD");
  $('.left.bitcoin strong.rur_usd').text("(" + (btcUsd * rur_usd).toFixed(2) + " RUR)");
  ethUsd = json.USDT_ETH.last;
  $('.left.ethereum strong.USD').text((+ethUsd).toFixed(2) + " USD");
  $('.left.ethereum strong.rur_usd').text("(" + (ethUsd * rur_usd).toFixed(2) + " RUR)");
  $('.left.ethereum strong.price_btc').text((ethUsd / btcUsd).toFixed(8) + " BTC");
  zecUsd = json.USDT_ZEC.last;  
  $('.left.zcash strong.USD').text((+zecUsd).toFixed(2) + " USD");
  $('.left.zcash strong.rur_usd').text("(" + (zecUsd * rur_usd).toFixed(2) + " RUR)");
  $('.left.zcash strong.price_btc').text((zecUsd / btcUsd).toFixed(8) + " BTC");  
  xmrUsd = json.USDT_XMR.last;
  $('.left.monero strong.USD').text((+xmrUsd).toFixed(2) + " USD");
  $('.left.monero strong.rur_usd').text("(" + (xmrUsd * rur_usd).toFixed(2) + " RUR)");
  $('.left.monero strong.price_btc').text((xmrUsd / btcUsd).toFixed(8) + " BTC");  
  xrpUsd = json.USDT_XRP.last;
  $('.left.ripple strong.USD').text((+xrpUsd).toFixed(4) + " USD");
  $('.left.ripple strong.rur_usd').text("(" + (xrpUsd * rur_usd).toFixed(2) + " RUR)");
  $('.left.ripple strong.price_btc').text((xrpUsd / btcUsd).toFixed(8) + " BTC"); 
  dgbUsd = json.BTC_DGB.last * btcUsd;
  $('.left.digibyte strong.USD').text((+dgbUsd).toFixed(4) + " USD");
  $('.left.digibyte strong.rur_usd').text("(" + (dgbUsd * rur_usd).toFixed(2) + " RUR)");
  $('.left.digibyte strong.price_btc').text((dgbUsd / btcUsd).toFixed(8) + " BTC"); 
  lbcUsd = json.BTC_LBC.last * btcUsd;
  $('.left.library-credit strong.USD').text((+lbcUsd).toFixed(4) + " USD");
  $('.left.library-credit strong.rur_usd').text("(" + (lbcUsd * rur_usd).toFixed(2) + " RUR)");
  $('.left.library-credit strong.price_btc').text((lbcUsd / btcUsd).toFixed(8) + " BTC"); 

  $('.left.zclassic strong.USD').text((+zclUsd).toFixed(4) + " USD");
  $('.left.zclassic strong.rur_usd').text("(" + (zclUsd * rur_usd).toFixed(2) + " RUR)");
  $('.left.zclassic strong.price_btc').text((zclUsd / btcUsd).toFixed(8) + " BTC");

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
$(".bittrex-mining").html("<p><img src='img/bittrex_small.jpg'> bittrex:</p>" + bittrexMiningUSD + " $<br>" + "(" + (bittrexMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");
$(".poloniex-mining").html("<p><img src='img/poloniex_small.jpg'> poloniex:</p>" + poloniexMiningUSD + " $<br>" + "("  + (poloniexMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");
$(".mpoolhub-mining").html("<p><img src='img/miningpoolhub.png'> mpoolhub:</p>" + mpoolhubMiningUSD + " $<br>" + "("  + (mpoolhubMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");
$(".suprnova-mining").html("<p><img src='img/suprnova.png'> suprnova:</p>" + suprnovaMiningUSD + " $<br>" + "("  + (suprnovaMiningUSD * rur_usd).toFixed(2) + " руб.)<br><br>");

// ------------ Вывод расчетных данных по таблице трейдинга
html = '';
for (var i = 0; i < Object.keys(coinTrade).length; i++) {
  html += "<p class='deal_" + (i+1) + "'>" + (coinTrade[Object.keys(coinTrade)[i]]['priceUsd'] * coinTrade[Object.keys(coinTrade)[i]]['sum']).toFixed(2) + " $<br>(" + 
  (coinTrade[Object.keys(coinTrade)[i]]['priceUsd'] * coinTrade[Object.keys(coinTrade)[i]]['sum'] * coinTrade[Object.keys(coinTrade)[i]]['rurUsd']).toFixed(2) + " руб.)</p>";  
}
$(".invest-trade").html(html);                              // Вывод столбца Вложил
$(".time-trade").html(coinTradeOutput("time"));             // Вывод столбца даты
$(".type-trade").html(coinTradeOutput("type"));             // Вывод столбца даты
$(".target-trade").html(coinTradeOutput("target"));         // Вывод какую монету купил\продал
$(".sum-trade").html(coinTradeOutput("sum"));               // Вывод кол-ва этой монеты
$(".priceUsd-trade").html(coinTradeOutput("priceUsd"));     // Вывод цены этой монеты на момент покупки в $
html = '';
html += "<p class='deal_1'>" + (((ethUsd * coinTrade.deal_1.sum) - (coinTrade.deal_1.priceUsd * coinTrade.deal_1.sum)) * rur_usd).toFixed(2) + " руб.</p><br>";
html += "<p class='deal_2'>" + (((zecUsd * coinTrade.deal_2.sum) - (coinTrade.deal_2.priceUsd * coinTrade.deal_2.sum)) * rur_usd).toFixed(2) + " руб.</p><br>";
html += "<p class='deal_3'>" + (((xrpUsd * coinTrade.deal_3.sum) - (coinTrade.deal_3.priceUsd * coinTrade.deal_3.sum)) * rur_usd).toFixed(2) + " руб.</p><br>";
$(".profit-trade").html(html);

// ------------ Вывод расчетных данных по итогам  трейдинга
var resultTrade = ((((ethUsd * coinTrade.deal_1.sum) - (coinTrade.deal_1.priceUsd * coinTrade.deal_1.sum)) + 
 ((zecUsd * coinTrade.deal_2.sum) - (coinTrade.deal_2.priceUsd * coinTrade.deal_2.sum)) +
 ((xrpUsd * coinTrade.deal_3.sum) - (coinTrade.deal_3.priceUsd * coinTrade.deal_3.sum))) * rur_usd).toFixed(2);
var resultTradeFiat = ((ethUsd * coinTrade.deal_1.sum + zecUsd * coinTrade.deal_2.sum + xrpUsd * coinTrade.deal_3.sum) * rur_usd).toFixed(2);
if (resultTrade > 0) {
  $(".profit-result").html(resultTrade.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + " руб.<br>");
  $(".fail-result").html("ВСЕ ЗАЕБЦА!! <br>");  
} else { 
  $(".fail-result").html(resultTrade.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + " руб.<br>");
  $(".profit-result").html("ТУТ ПРОЕБ !! <br>");
};
$(".result-trade-fiat").html("Если все продать сейчас: " + resultTradeFiat.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + " руб.<br>");
}); // конец функции AJAX
}; // конец функции Polo
//_______________________________________________________________________________ JSON запрос данных по крипте c coinmarketcap
$.getJSON("https://api.coinmarketcap.com/v1/ticker/?limit=450", function(json) {
  var html = "";
  var marketCap = "";                               // Переменная для разбиения на разряды большого числа
  secUpdateGL = json[0].last_updated;
  for (var i = 0; i < 450; i++) {                   // 400 первых самых инвестированных криптовалют мира
    switch (json[i].symbol) {
      case "BTC":
      case "ETH":
      case "XMR":
      case "ZCL": zclUsd = json[i].price_usd;
      case "LBC":
      case "ZEC":
      case "DGB":
      case "XRP":
/*                if (json[i].symbol == "BTC") { btcUsd = json[i].price_usd;                // Присвоение значений переменным хранящих цену в USD у каждой крипты
                } else if (json[i].symbol == "ETH") { ethUsd = json[i].price_usd;
                } else if (json[i].symbol == "XRP") { xrpUsd = json[i].price_usd;
                } else if (json[i].symbol == "XMR") { xmrUsd = json[i].price_usd;
                } else if (json[i].symbol == "ZEC") { zecUsd = json[i].price_usd;
                } else if (json[i].symbol == "DGB") { dgbUsd = json[i].price_usd;
                } else if (json[i].symbol == "LBC") { lbcUsd = json[i].price_usd;
                } else if (json[i].symbol == "ZCL") { zclUsd = json[i].price_usd;};*/
                marketCap = json[i].market_cap_usd.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                html = $("." + json[i].id).html();
                html += "<strong class='name'> " + json[i].name + " ("+ json[i].symbol + ")" + "</strong>: <br>";
                html += "<strong class='rank'> Rank: " + json[i].rank + " </strong><br>";
                html += "<strong class='USD'> </strong><br>";
                html += "<strong class='rur_usd'> </strong><br>";
                html += "<strong class='price_btc'> </strong><br>";
                $(".left." + json[i].id).html(html);
                html = "";
                html += "Market Cap: <br><strong class='market_cap'>" + marketCap + " USD</strong><br><br>";
                html += "1h: <strong class='change_coin'> " + json[i].percent_change_1h + "%</strong><br>";
                html += "24h: <strong class='change_coin'> " + json[i].percent_change_24h + "%</strong><br>";
                html += "Week: <strong class='change_coin'> " + json[i].percent_change_7d + "%</strong><br>";
                $(".right." + json[i].id).html(html);
              } // конец цикл switch
            } // конец цикла for
}); // конец функции AJAX

// ------------ Вывод статичных данных майнинга с объекта coinMining
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