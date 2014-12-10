var request = require('request');
var express = require('express');
var iconv   = require('iconv-lite');
var cors 	= require('cors');

var app = express();
app.use(cors()); // allow cross-origin resource-sharing
var router = express.Router();

// pubDB URL
var dbPath = "http://www.medien.ifi.lmu.de/cgi-bin/search.pl?all:all:all:all:all";
var pubHtml = "";



// send pubHtml on request
router.get('/',function(req,res){
	// get html and save in pubHtml
	request({"uri": dbPath, "content-type": "text/html;", "encoding": null}, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			pubHtml = iconv.decode(new Buffer(body), "latin1");
			console.log("publications requested");
			res.send(pubHtml)
		}
	});
});

router.get('/base', function(req, res) {
	res.send(dbPath);
});

app.use(router);

var server = app.listen(3000, function () {
 	var host = server.address().address;
 	var port = server.address().port;
 	console.log("Server running on port 3000");
});