// server.js
var rls = require('rls-api');
var express = require('express');
app = express();

var client = new rls.Client({
    token: "SGJMF30MF53IWGDXV7NGJI5LUVN3JA7N"
});
var ilikestreet = "76561198157475412";
app.locals.title = 'My App';
app.use(express.static(__dirname + '/public'));

app.get('/index1.html', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	client.getPlayer(ilikestreet, rls.platforms.STEAM, function(status, data) {
		if (status == 200) {
			// console.log(data.displayName);
			var jsonString = JSON.stringify(data);
			// var newData = JSON.parse(jsonString);
			res.write(jsonString + "\n");
			res.write("<strong>" + data.displayName+ "</strong><br>");
			res.write("Wins: " + data.stats.wins+ "\n");
			res.end();
		}
	});
});
app.listen(8080, function() {
	console.log('Server running at http://127.0.0.1:8080/');
});