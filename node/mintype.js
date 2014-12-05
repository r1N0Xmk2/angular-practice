var fs = require('fs');
fs.readFile('./data/Type.json', function(err,data){
	if(!err) {
		var json = JSON.parse(data.toString());
		var eqtype = json.api_mst_slotitem_equiptype;
		var shiptype = json.api_mst_stype;
		var newEqtype = {}
		var newShiptype = {}
		var newJson = {}
		eqtype.map(function(e) {
			newEqtype[e.api_id] = {
				api_name: e.api_name
			}
		})
		shiptype.map(function(e) {
			newShiptype[e.api_id] = {
				api_name: e.api_name,
				api_equip_type: equipType2Array(e)
			}
		})
		newJson.api_mst_slotitem_equiptype = newEqtype;
		newJson.api_mst_stype = newShiptype;
		function equipType2Array(e) {
			var arr = [];
			Object.keys(e.api_equip_type).forEach(function(ele) {
				if(e.api_equip_type[ele] === 1) {
					arr.push(ele)
				}
			})
			return arr;
		}
		// console.log(JSON.stringify(newJson))
		fs.writeFile('./data/Type.min.json',JSON.stringify(newJson),function(err) {
			if(err) throw err;
			else {
				console.log('complete')
			}
		})
	} else {
		throw err;
	}
})


