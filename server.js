// server.js
var rls = require('rls-api');
// var express = require('express');
var wilddog = require('wilddog');
var firebase = require("firebase");

// app = express();

var client = new rls.Client({
    token: "F5STHE0JQL5BSTU5WMP241ZXTUG45OXG"
});
var ilikestreet = "76561198157475412";



var configWD = {
	authDomain: "wd9411380948rejqhg.wilddog.com",
	syncURL: "https://wd9411380948rejqhg.wilddogio.com"
}
wilddog.initializeApp(configWD);
var databaseWD = wilddog.sync();


var configFB = {
	apiKey: "AIzaSyDgyVcYPOfql4afZzdj4luohnhT5icvfLE",
    authDomain: "rocket-tracker-431fb.firebaseapp.com",
    databaseURL: "https://rocket-tracker-431fb.firebaseio.com",
}

firebase.initializeApp(configFB);
var databaseFB = firebase.database();


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
        databaseWD.ref("/seasonsData").set(data);
        databaseFB.ref("/seasonsData").set(data);

    }
});

client.getTiersData(function(status, data){
    if(status === 200){
        databaseWD.ref("/tiersData").set(data);
        databaseFB.ref("/tiersData").set(data);
    }
});
console.log('Updated Seasons Data & Tires Data');

setInterval(function(){ 
	try {
		client.getPlayer(ilikestreet, rls.platforms.STEAM, function(status, data) {
			if (status == 200) {
				databaseWD.ref("/Users/" + data.displayName).set(data);
				databaseFB.ref("/Users/" + data.displayName).set(data);
				var date = Date(data.lastRequested);
				console.log("Updated ilikestreet's profile @ " + date.toString());
			}
			else {
				console.log('Status code: ' + status + ' @ ' + new Date().toString());
			}
		});	
	}
	catch (err) {
		setTimeout(function(){}, 1000);
	}
	
}, 2000);

// app.listen(8080, function() {
// 	console.log('Server running at http://127.0.0.1:8080/');
// });
console.log('Server is running');