$(document).ready(function() {
	var start = new Date();

	var publicationsJSON = []
		authorsJSON = [];
	
	// create a new pubDB json object
	var converter = new pubDB.json();

	// initialize -> get a jQuery object of html contents in callback function
	var dbObject = converter.init(function(dbObject) {
		// pass dbObject to buildJSON method -> get a json object back (<- created on client side)
		converter.buildPublicationJSON(dbObject, function(pubData) {
			publicationsJSON = pubData;
			//console.log(JSON.stringify(publicationsJSON));

			converter.buildAuthorJSON(pubData, function(authorData) {
				authorsJSON = authorData;
				//console.log(JSON.stringify(authorsJSON));

				$('#publications').val(JSON.stringify(publicationsJSON)).show();
				$('#authors').val(JSON.stringify(authorsJSON)).show();
				$('h2').show();

				$('img').hide();
			});
		});
	});

	// $.get("http://localhost:3000/publications", function(data) {
	// 		console.log("server", new Date() - start);
	// })
});
	