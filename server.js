// server.js
var rls = require('rls-api');
var express = require('express');
var wilddog = require('wilddog');
app = express();

var client = new rls.Client({
    token: "D5IOSEQLJ0U2DB3HF3ABDXPYRX0HYE6P"
});
var ilikestreet = "76561198157475412";

var config = {
	authDomain: "wd9411380948rejqhg.wilddog.com",
	syncURL: "https://wd9411380948rejqhg.wilddogio.com"
}
wilddog.initializeApp(config);
var database = wilddog.sync();

client.getSeasonsData(function(status, data){
    if(status === 200){
        console.log("-- Seasons data:");
        console.log(data);
    }
});

client.getPlaylistsData(function(status, data){
    if(status === 200){
        console.log("-- Playlists data:");
        console.log(data);
    }
});

client.getTiersData(function(status, data){
    if(status === 200){
        console.log("-- Tiers data:");
        console.log(data);
    }
});

app.use(express.static(__dirname + '/public'));
app.get('/index.html', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	client.getPlayer(ilikestreet, rls.platforms.STEAM, function(status, data) {
		if (status == 200) {
			var jsonString = JSON.stringify(data);
			// res.write(jsonString + "\n");			
			// res.write("<strong>" + data.displayName+ "</strong><br>");
			// res.write("Wins: " + data.stats.wins+ "\n");
			database.ref(data.displayName).set(data);
		}
	});
	res.end();
});

setInterval(function(){ 
	client.getPlayer(ilikestreet, rls.platforms.STEAM, function(status, data) {
		if (status == 200) {
			database.ref(data.displayName).set(data);
		}
	});
}, 10000);

app.listen(8080, function() {
	console.log('Server running at http://127.0.0.1:8080/');
});