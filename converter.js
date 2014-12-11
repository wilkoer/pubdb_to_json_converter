var request = require('request');
var express = require('express');
var iconv   = require('iconv-lite');
var cors 	= require('cors');
var fs 		= require('fs');

// jquery needed for easy DOM-manipulation..
var jsdom = require("jsdom-nogyp"); 
var window = jsdom.jsdom().createWindow();
jQuery = require("jquery")(window); 

// custom module for converting pubDB html to json
var pubdb 	= require('./lib/pubdb_module.js');
var converter = new pubdb();



var app = express();
app.use(cors()); // allow cross-origin resource-sharing
var router = express.Router();

// pubDB URL
var basePath = "http://www.medien.ifi.lmu.de"
	, dbPath = "/cgi-bin/search.pl?all:all:all:all:all"
	, pubHtml = "";


// send pubHtml on request
router.get('/',function(req,res){
	// get html and save in pubHtml
	request({"uri": basePath+dbPath, "content-type": "text/html;", "encoding": null}, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			pubHtml = iconv.decode(new Buffer(body), "latin1");
			console.log("publications requested");
			res.send(pubHtml);
		}
	});
});

// return base path
router.get('/base', function(req, res) {
	res.send(basePath);
});

// return publications
router.get('/publications', function(req, res) {
	request({"uri": basePath+dbPath, "content-type": "text/html;", "encoding": null}, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			pubHtml = iconv.decode(new Buffer(body), "latin1");
			
			// convert html to json and return json to client
			converter.buildPublicationJSON(jQuery(pubHtml), function(data) {
				res.json(data);
			});

		}
	});
});

// return authors
router.get('/authors', function(req, res) {
	res.send("todo");
});


app.use(router);

var server = app.listen(3000, function () {
 	var host = server.address().address;
 	var port = server.address().port;
 	console.log("Server running on port 3000");
});