(function($, global) {
	var PubDBtoJSONConverter = function(callback) {
			this.pubDBpath = "http://localhost:3000/"; // <-- node server url here(conversion.js)  
			this.$pubDB = null;
			this.callback = callback;
			this.json = [];
			this.init();
	};

	PubDBtoJSONConverter.prototype.init = function() {
		var _this = this;
		$.get(this.pubDBpath, function(data) {
			// get html data from node server and create json
			_this.$pubDB = $(data);
			_this.buildJSON(_this.$pubDB, _this.callback);
		})
	};

	PubDBtoJSONConverter.prototype.buildJSON = function($pubObject, callback) {
		var $tableRow = $pubObject.find('tbody > tr'),
			_this = this;

		$.each($tableRow, function() {
			if (!$(this).find('td').eq(0).hasClass('year_separator')) { // ignore year separators
				var object = {}; // single entry object
				object.authors = [];
				object.award = false;

				$downloads = $(this).find('td:nth-child(1)'); // download links in first td
				$contents = $(this).find('td:nth-child(2)'); // other contents in second


				/*
					CONTENT START
				*/

				if ($contents.find('img').length) {
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
					person.name = authorsArray[i].replace(/(<([^>]+)>)/ig, "");
					person.name = person.name.replace('\n\t\t', '');
					try {
						person.url = $(authorsArray[i]).attr('href');
					} catch(e) {
						//console.log("err", e);
						person.url = null;
					}

					object.authors.push(person);
				}

				// title: 
				
				object.title = {};

				try {
					titleUrl = $(_title).find('a').attr('href');
					titleName = $(_title).find('a').text();
					object.title.url = titleUrl;
					object.title.name = titleName;
				} catch(e) {
					console.log("err", e);
				}


				// description:
				object.description = {};

				try {
					descriptionText = $(_description).text();
					object.description.text = descriptionText;

				} catch(e){
					
				}

				/*
					CONTENT END
					###############
					DOWNLOADS START
				*/
				object.downloads = [];

				var $linkCollection = $downloads.find('a');

				$.each($linkCollection, function() {
					object.downloads.push($(this).attr('href'));
				});

				/*
					DOWNLOADS END
				*/



				_this.json.push(object);
			}
		});

		callback();
	};

	PubDBtoJSONConverter.prototype.getJSON = function() {
		return this.json;
	};

	global.pubDB = global.pubDB || {};
	global.pubDB.json = PubDBtoJSONConverter;
})(jQuery, window);