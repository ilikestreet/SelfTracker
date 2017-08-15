// server.js
var rls = require('rls-api');
// var express = require('express');
var wilddog = require('wilddog');
// app = express();

var client = new rls.Client({
    token: "7J0BQJC1LXA0AZZ5Z3HL7LJMS01G7GX8"
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
	});
}, 2000);

// app.listen(8080, function() {
// 	console.log('Server running at http://127.0.0.1:8080/');
// });
console.log('Server is running');