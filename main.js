$(document).ready(function() {
	var converter = new pubDB.json(function() {
		var json = converter.getJSON();

		$('body').html(JSON.stringify(json));
	});
});
	