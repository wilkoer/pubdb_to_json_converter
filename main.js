$(document).ready(function() {
	var converter = new pubDB.getJson(function(data) {
		$('body').html(JSON.stringify(data));
	});
});
	