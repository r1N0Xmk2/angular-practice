var fs = require('fs');
var data=fs.readFile('../data/Ships.json', function(err,data){
	if(!err) {
		var json = JSON.parse(data.toString());
		var eq = json.api_mst_ship;
		var newJson = {}
		eq.map(function(e) {
			if(e.api_name!=)
			newJson[e.api_id] = {
				api_type: e.api_stype,
				api_name: e.api_name
			}
		})
		console.log(newJson)	
		fs.writeFile('../data/Ships.min.json',JSON.stringify(newJson),function(err) {
			if(err) throw err;
			else {
				console.log('complete')
			}
		})
	} else {
		throw err;
	}
})


