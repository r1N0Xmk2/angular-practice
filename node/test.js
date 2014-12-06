var fs = require('fs');
fs.readFile('./data/Improvement.json', function(err,data) {
	if(err) throw err;
	else {
		var json = JSON.parse(data.toString());
		console.log(json.improvement[40].week)
	}
})