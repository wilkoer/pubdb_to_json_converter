(function($, global) {
	var PubDBtoJSONConverter = function() {
		this.pubDBpath = "http://localhost:3000/"; // <-- node server url here(conversion.js)  
		this.$pubDB = null;
		// this.callback = callback;
		this.pubJson = [];
		this.authorJson = [];
		// this.init();
	};

	PubDBtoJSONConverter.prototype.init = function(callback) {
		var _this = this;

		// get html data from node server and create json
		$.get(this.pubDBpath, function(data) {
			_this.$pubDB = $(data); // create jquery object from html code
			console.log(_this.$pubDB);
			callback(_this.$pubDB);
			// _this.buildJSON(_this.$pubDB, _this.callback);
		})
	};

	// extracts data from html and builds json
	PubDBtoJSONConverter.prototype.buildPublicationJSON = function($pubObject, callback) {
		var $tableRow = $pubObject.find('tr'),
			_this = this;

		/*	<tr></tr> == publication object
		*	traverse all table rows and extract data 		
		*/
		$.each($tableRow, function(index) {
			if (!$(this).find('td').eq(0).hasClass('year_separator')) { // ignore year separators
				var object = {}; // single entry object

				object.id = 'pub_' + index;	// unique id
				object.authors = []; 		// array of authors (name, url)
				object.title = {};			// publication title		
				object.description = {};	// publication description
				object.downloads = [];		// array of download-links (pdf etc.)
				object.award = false;		// best-paper award?


				$downloads = $(this).find('td:nth-child(1)'); // download links in first td
				$contents = $(this).find('td:nth-child(2)'); // other contents in second


				/*
					CONTENT START
				*/

				if ($contents.find('img').length) {  // only entries with award-picture have won an award..
					object.award = true;			
				}

				var contentsString = $contents.html(); 

				/*  split contents by breaks. 
				*	first block = authors	
				*	second block = title	
				*	third block = description	*/
				var contentsArray = contentsString.split('<br>'); 

				var _authors = contentsArray[0]
					, _title = contentsArray[1]
					, _description = contentsArray[2];


				// authors:
				var authorsArray = _authors.split(',');

				for (var i = 0; i < authorsArray.length; i++) {
					var person = {};
					person.name = authorsArray[i].replace(/(<([^>]+)>)/ig, ""); // remove html tags from name 
					person.name = person.name.replace('\n\t\t', '');		// remove tabs etc.
					person.name.trim();

					try {
						person.url = $(authorsArray[i]).attr('href');			// if surrounded by <a>-tag, keep href
					} catch(e) {
						//console.log("err", e);
						person.url = null;
					}

					object.authors.push(person); 
				}

				// title: 
				try {
					titleUrl = $(_title).find('a').attr('href');	
					titleName = $(_title).find('a').text();		
					object.title.url = titleUrl;
					object.title.name = titleName;
				} catch(e) {
					//console.log("err", e);
				}


				// description:
				try {
					descriptionText = $(_description).text(); 
					object.description.text = descriptionText;

				} catch(e){
					//console.log("err", e);
				}

				/*
					CONTENT END
					###############
					DOWNLOADS START
				*/
				var $linkCollection = $downloads.find('a');

				$.each($linkCollection, function() {
					object.downloads.push($(this).attr('href')); // add download links
				});

				/*
					DOWNLOADS END
				*/

				// add current object to json-array
				_this.pubJson.push(object);
			}
		});
		
		// callback, when finished
		callback(_this.pubJson);
	};

	// extracts authors from json and creates new, author-centered json
	PubDBtoJSONConverter.prototype.buildAuthorJSON = function(json, callback) {
		var authorNamesArray = [];

		var hash = function(obj){
		  return obj.name;
		};

		// author hashmap
		var authorDictionary = {};

		// go through all publications
		for (var i = 0; i < json.length; i++) {
			// go through all authors of current publication
			for (var j = 0; j < json[i].authors.length; j++) {

				// if name is not part of authorNamesArray yet, add it and create author object
				if (authorNamesArray.indexOf(json[i].authors[j].name) < 0) {
					authorNamesArray.push(json[i].authors[j].name);
					var authorObject = {};

					// add this author name to object
					authorObject.name = json[i].authors[j].name.trim();

					// create new publications array and add current publication
					authorObject.publications = [];
					authorObject.publications.push(json[i].id);

					// unique id
					authorObject.id = i+''+j;

					// author url
					if (typeof(json[i].authors[j].url) !== 'undefined') {
						authorObject.url = json[i].authors[j].url;
					}

					// put author into "dictionary"
					authorDictionary[hash(authorObject)] = authorObject;
				} else {
					// get author from hashmap and add publication
					authorDictionary[json[i].authors[j].name.trim()].publications.push(json[i].id);
				}

			};
		};

		// convert to json-array 
		var keys = [];

		for (var key in authorDictionary) {
			keys.push(key)
		}

		for (var i = 0; i < keys.length; i++) {
			this.authorJson.push(authorDictionary[keys[i]]);
		};

		// callback, when finished
		callback(this.authorJson);
	};

	global.pubDB = global.pubDB || {};
	global.pubDB.json = PubDBtoJSONConverter;
})(jQuery, window);