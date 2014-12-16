fs = require 'fs'
fileName = if process.argv[2] is undefined then '../data/kc-2014-12-1.json' else '../' + process.argv[2]
console.log fileName
kc = require fileName
part = 
	"Ships":"api_mst_ship"
	"Enemy":"api_mst_ship"
	"Equipment":"api_mst_slotitem"
	"EnemyEquipment":"api_mst_slotitem"
	"Type":["api_mst_slotitem_equiptype","api_mst_stype"]
newKc = 
	"Ships": {}
	"Enemy": {}
	"Equipment": {}
	"EnemyEquipment": {}
	"Type": {}
newKc['Ships'][part['Ships']] = []
newKc['Enemy'][part['Enemy']] = []
newKc['Equipment'][part['Equipment']] = []
newKc['EnemyEquipment'][part['EnemyEquipment']] = []
newKc['Type'][part['Type'][0]] = []
newKc['Type'][part['Type'][1]] = []

for e in kc[part['Ships']]
	if e.api_id < 501 
		newKc['Ships'][part['Ships']].push e

for e in kc[part['Enemy']]
	if e.api_id >= 501
		if '改' in e.api_name then e.api_yomi = 'brsflagship'
		newKc['Enemy'][part['Enemy']].push e

for e in kc[part['Equipment']]
	if e.api_id < 501
		newKc['Equipment'][part['Equipment']].push e

for e in kc[part['EnemyEquipment']]
	if e.api_id >= 501
		newKc['EnemyEquipment'][part['EnemyEquipment']].push e

for e in kc[part['Type'][0]]
	newKc['Type'][part['Type'][0]].push e

for e in kc[part['Type'][1]]
	newKc['Type'][part['Type'][1]].push e

for k,v of part
	fs.writeFile 'data/' + k + '.json', JSON.stringify newKc[k] 
