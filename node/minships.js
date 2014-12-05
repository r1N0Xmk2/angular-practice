var fs = require('fs');
var data=fs.readFile('./data/Ships.json', function(err,data){
	if(!err) {
		var json = JSON.parse(data.toString());
		var ships = json.api_mst_ship;
		var newShips = {}
		var newJson = {}
		fs.readFile('./data/Type.min.json', function(err, data){
			if(err) throw err;
			else {
				var type = JSON.parse(data);
				ships.map(function(e) {
					if(e.api_name!=='なし') {
						newShips[e.api_id] = {
							api_name: e.api_name,
							api_type: getShipsTypeName(e.api_stype)
						}
					}
				})
				newJson.api_mst_ship = newShips;
				function getShipsTypeName(id) {
					return type.api_mst_stype[id].api_name;
				}

				// console.log(JSON.stringify(newJson))	
				fs.writeFile('./data/Ships.min.json',JSON.stringify(newJson),function(err) {
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


