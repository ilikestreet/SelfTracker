// server.js
var rls = require('rls-api');
// var express = require('express');
var wilddog = require('wilddog');
// app = express();

var client = new rls.Client({
    token: "F5STHE0JQL5BSTU5WMP241ZXTUG45OXG"
});
var ilikestreet = "76561198157475412";

var config = {
	authDomain: "wd9411380948rejqhg.wilddog.com",
	syncURL: "https://wd9411380948rejqhg.wilddogio.com"
}
wilddog.initializeApp(config);
var database = wilddog.sync();


// app.use(express.static(__dirname + '/public'));
// app.get('/index.html', function(req, res) {
// 	res.setHeader('Content-Type', 'text/html');
// 	client.getPlayer(ilikestreet, rls.platforms.STEAM, function(status, data) {
// 		if (status == 200) {
// 			var jsonString = JSON.stringify(data);
// 			// res.write(jsonString + "\n");			
// 			// res.write("<strong>" + data.displayName+ "</strong><br>");
// 			// res.write("Wins: " + data.stats.wins+ "\n");
// 			database.ref("/Users/" + data.displayName).set(data);
// 		}
// 	});

// 	res.end();
// });
client.getSeasonsData(function(status, data){
    if(status === 200){
        database.ref("/seasonsData").set(data);
    }
});

client.getTiersData(function(status, data){
    if(status === 200){
        database.ref("/tiersData").set(data);
    }
});
console.log('Updated Seasons Data & Tires Data');

setInterval(function(){ 
	client.getPlayer(ilikestreet, rls.platforms.STEAM, function(status, data) {
		if (status == 200) {
			database.ref("/Users/" + data.displayName).set(data);
			var date = Date(data.lastRequested);
			console.log("Updated ilikestreet's profile @ " + date.toString());
		}
		else {
			console.log('Status code: ' + status + '@ ' + date.toString());
		}
	});
}, 5000);

// app.listen(8080, function() {
// 	console.log('Server running at http://127.0.0.1:8080/');
// });
console.log('Server is running');