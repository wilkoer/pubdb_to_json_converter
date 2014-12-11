
PubDBtoJSONConverter = function() {
	this.json = [];
};


PubDBtoJSONConverter.prototype.buildPublicationJSON = function($pubObject, callback) {
	var $tableRow = $pubObject.find('tr'),
		_this = this;

	/*	<tr></tr> == publication object
	*	traverse all table rows and extract data 		
	*/
	jQuery.each($tableRow, function() {
		if (!jQuery(this).find('td').eq(0).hasClass('year_separator')) { // ignore year separators
			var object = {}; // single entry object

			object.authors = []; 		// array of authors (name, url)
			object.title = {};			// publication title		
			object.description = {};	// publication description
			object.downloads = [];		// array of download-links (pdf etc.)
			object.award = false;		// best-paper award?


			$downloads = jQuery(this).find('td:nth-child(1)'); // download links in first td
			$contents = jQuery(this).find('td:nth-child(2)'); // other contents in second


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
				person.name = person.name.replace('\n\t\t', '');			// remove tabs etc.
				try {
					person.url = jQuery(authorsArray[i]).attr('href');			// if surrounded by <a>-tag, keep href
				} catch(e) {
					//console.log("err", e);
					person.url = null;
				}

				object.authors.push(person); 
			}

			// title: 
			try {
				titleUrl = jQuery(_title).find('a').attr('href');	
				titleName = jQuery(_title).find('a').text();		
				object.title.url = titleUrl;
				object.title.name = titleName;
			} catch(e) {
				//console.log("err", e);
			}


			// description:
			try {
				descriptionText = jQuery(_description).text(); 
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

			jQuery.each($linkCollection, function() {
				object.downloads.push(jQuery(this).attr('href')); // add download links
			});

			/*
				DOWNLOADS END
			*/

			// add current object to json-array
			_this.json.push(object);
		}
	});
	
	// callback, when finished
	callback(_this.json);
};

module.exports = PubDBtoJSONConverter;
	