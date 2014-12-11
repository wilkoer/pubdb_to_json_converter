$(document).ready(function() {

	// create a new pubDB json object
	var converter = new pubDB.json();

	// initialize -> get a jQuery object of html contents in callback function
	var dbObject = converter.init(function(dbObject) {

		// pass dbObject to buildJSON method -> get a json object back (<- created on client side)
		converter.buildPublicationJSON(dbObject, function(data) {
			$('body').html(JSON.stringify(data));
		});

	});
});
	