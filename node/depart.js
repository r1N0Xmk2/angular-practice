var fs = require('fs');
var fileName = process.argv[2]===undefined?'./data/kc-2014-12-1.json':'./'+process.argv[2];
console.log(fileName)
fs.readFile(fileName, function(err, data) {
	if(err) throw err;
	else {
		// console.log(data.toString())
		var kc = JSON.parse(JSON.stringify(data.toString()));
		fs.writeFileSync('test.json',kc)
		console.log(kc['api_mst_stype'])
		var part = {
			"Ships":"api_mst_ship",
			"Enemy":"api_mst_ship",
			"Equipment":"api_mst_slotitem",
			"EnemyEquipment":"api_mst_slotitem",
			"Type":["api_mst_slotitem_equiptype","api_mst_stype"]
		}
		var Ships = {};
		var Enemy = {};
		var Equipment = {};
		var EnemyEquipment = {};
		var Type = {};
		kc[part['Ships']].forEach(function(e){
			if(e.api_id < 501) {
				Ships[part['Ships']].push(e)
			}
		});
		kc[part['Enemy']].forEach(function(e){
			if(e.api_id >= 501) {
				Enemy[part['Enemy']].push(e)
			}
		});
		kc[part['Equipment']].forEach(function(e){
			if(e.api_id < 501) {
				Equipment[part['Equipment']].push(e)
			}
		});
		kc[part['EnemyEquipment']].forEach(function(e){
			if(e.api_id >= 501) {
				EnemyEquipment[part['EnemyEquipment']].push(e)
			}
		});
		kc[part['Type'][0]].forEach(function(e){
			Type[part['Type'][0]].push(e)
		});
		kc[part['Type'][1]].forEach(function(e){
			Type[part['Type'][1]].push(e)
		});
	}
})
