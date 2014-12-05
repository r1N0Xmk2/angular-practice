var fs = require('fs');
var data=fs.readFile('./data/Equipment.json', function(err,data){
	if(!err) {
		var json = JSON.parse(data.toString());
		var eq = json.api_mst_slotitem;
		var newEq = {}
		var newJson = {}
		fs.readFile('./data/Type.min.json', function(err, data){
			if(err) throw err;
			else {
				var type = JSON.parse(data);
				eq.map(function(e) {
					if(e.api_saku > 0 && e.api_type!==34) {
						newEq[e.api_id] = {
							api_name: e.api_name,
							api_saku: e.api_saku,
							api_type: e.api_type[2]
						}
					}
				})
				newJson.api_mst_slotitem = newEq;
				function getEqTypeName(id) {
					return type.api_mst_slotitem_equiptype[id].api_name;
				}
				// console.log(JSON.stringify(newJson))	
				fs.writeFile('./data/ViewRange.min.json',JSON.stringify(newJson),function(err) {
					if(err) throw err;
					else {
						console.log('complete')
					}
				})
			}
		})
		
		
	} else {
		throw err;
	}
})