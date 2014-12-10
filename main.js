$(document).ready(function() {
	var converter = new pubDB.json(function(data) {
		$('body').html(JSON.stringify(data));
	});
});
	