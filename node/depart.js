var fs = require('fs');
var fileName = process.argv[2]===undefined?'../data/kc-2014-12-1.json':'./'+process.argv[2];
console.log(fileName)
var kc = require(fileName)
fs.writeFileSync('test.json',kc)
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
Ships[part['Ships']] = []
Enemy[part['Enemy']] = []
Equipment[part['Equipment']] = []
EnemyEquipment[part['EnemyEquipment']] = []
Type[part['Type'][0]] = []
Type[part['Type'][1]] = []

kc[part['Ships']].forEach(function(e){
	if(e.api_id < 501) {
		Ships[part['Ships']].push(e)
	}
});

kc[part['Enemy']].forEach(function(e){
	if(e.api_id >= 501) {
		if(e.api_name.indexOf('改')!==-1) e.api_yomi='brsflagship'
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

Object.keys(part).forEach(function(e) {
	fs.writeFile('data/'+e+'.json',JSON.stringify(eval(e)))
})