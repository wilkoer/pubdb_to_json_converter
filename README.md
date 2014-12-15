pubdb_to_json_converter (pubdb.js)
=======================

pubdb.js allows you to convert HTML data from the LMU Computer Science publication database to JSON data.

You can find a live example implementation here: http://www.cip.ifi.lmu.de/~schenker/pubdb/
(node server hosted on https://openshift.redhat.com/)

#### pubdb.js 
Javascript library for generating json on client-side.

It offers different functions, i.e. for creating a JSON-Array containing all publications (buildPublicationJSON()) or for creating a JSON-Array containing all authors (buildAuthorJSON()).

##### How to use? 

You first have to specify the path to your pubDB proxy-server (converter.js) in line 3 of pubdb.js. 

Then, create a new pubDB converter.
```javascript
    // create a new pubDB json object
	var converter = new pubDB.json();
```

The init()-function establishes a connection with the proxy-server. The callback-functions' result is a jQuery-object of the pubDB HTML.
```javascript
    // initialize -> get a jQuery object of html contents in callback function
	converter.init(function(dbObject) {
	// ...
	});
```

##### Publications
Example publication object:

```json
{
    "id": "pub_101",
    "year": "2013",
    "authors": [{
        "name": "Sonja Rümelin",
        "url": "http://www.medien.ifi.lmu.de/team/sonja.ruemelin/"
    }, {
        "name": "Frederik Brudy"
    }, {
        "name": "Andreas Butz",
        "url": "http://www.medien.ifi.lmu.de/team/andreas.butz/"
    }],
    "title": {
        "url": "/forschung/publikationen/detail?pub=ruemelin2013chi",
        "name": "Up And Down And Along: How We Interact With Curvature"
    },
    "description": {
        "html": "Presented at the workshop <a href=\"http://displayworkshop.media.mit.edu/\" target=\"_blank\">'Displays Take New Shape: An Agenda for Interactive Surfaces'</a> in conjunction with the 31st ACM SIGCHI Conference on Human Factors in Computing Systems (CHI '13), Paris, France, April 27 - May 2, 2013."
    },
    "additionalLinks": ["http://displayworkshop.media.mit.edu/"],
    "bibfile": "/pubdb/publications/pub/ruemelin2013chi/ruemelin2013chi.bib",
    "downloads": ["/pubdb/publications/pub/ruemelin2013chi/ruemelin2013chi.pdf"],
    "award": false
}
```

##### Authors 

Example author object:
```json
{
    "name": "Alexander Wiethoff",
    "publications": ["pub_1", "pub_3", "pub_15", "pub_16", "pub_22", "pub_91", "pub_92", "pub_98", "pub_103", "pub_114", "pub_123", "pub_140", "pub_146", "pub_148", "pub_179", "pub_189", "pub_190", "pub_195", "pub_196", "pub_204", "pub_227", "pub_234", "pub_239", "pub_252", "pub_256", "pub_257", "pub_286", "pub_288", "pub_297", "pub_298", "pub_308", "pub_322", "pub_334", "pub_350", "pub_387"],
    "url": "http://www.medien.ifi.lmu.de/team/alexander.wiethoff/"
}
```

#### converter.js
Proxy server that grabs html from http://www.medien.ifi.lmu.de/cgi-bin/search.pl?all:all:all:all:all and passes it to client.

#### index.html and main.js 
Example implementation

#### lib/pubdb_module.js (deprecated)
node module for generating json on server-side.
not further developed due to performance issues.. feel free to play with it..!
