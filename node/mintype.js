var fs = require('fs');
fs.readFile('../data/Type.json', function(err,data){
	if(!err) {
		var json = JSON.parse(data.toString());
		var eq = json.api_mst_slotitem;
		var newJson = {}
		eq.map(function(e) {
			newJson[e.api_id] = {
				api_type: e.api_type[2],
				api_name: e.api_name
			}
		})
		console.log(newJson)	
		fs.writeFile('../data/Equipment.min.json',JSON.stringify(newJson),function(err) {
			if(err) throw err;
			else {
				console.log('complete')
			}
		})
	} else {
		throw err;
	}
})


