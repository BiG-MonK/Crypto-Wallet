$.getJSON("https://api.coinmarketcap.com/v1/ticker/?limit=10", function(json) {
	console.log(json);
	$("#test").html(JSON.stringify(json));
//	var html = "<strong>" + "key" + "</strong>: " + "val" + "<br>";
	//$("#test").html(html);
}); 
/*
      var xhr = new XMLHttpRequest();

      xhr.open('GET', 'https://api.coinmarketcap.com/v1/ticker/?limit=10', false);
      xhr.send();

      if (xhr.status != 200) {
        // обработать ошибку
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
      } else {
        // вывести результат
        alert(xhr.responseText);
      };
*/