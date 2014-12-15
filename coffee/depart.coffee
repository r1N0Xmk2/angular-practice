fs = require 'fs'
fileName = if process.argv[2] is undefined then '../data/kc-2014-12-1.json' else './' + process.argv[2]
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

kc[part['Ships']].forEach (e) ->
	if e.api_id < 501 
		newKc['Ships'][part['Ships']].push e

kc[part['Enemy']].forEach (e) ->
	if e.api_id >= 501
		if '改' in e.api_name then e.api_yomi = 'brsflagship'
		newKc['Enemy'][part['Enemy']].push e

kc[part['Equipment']].forEach (e) ->
	if e.api_id < 501
		newKc['Equipment'][part['Equipment']].push e

kc[part['EnemyEquipment']].forEach (e) ->
	if e.api_id >= 501
		newKc['EnemyEquipment'][part['EnemyEquipment']].push e

kc[part['Type'][0]].forEach (e) ->
	newKc['Type'][part['Type'][0]].push e

kc[part['Type'][1]].forEach (e) ->
	newKc['Type'][part['Type'][1]].push e

Object.keys(part).forEach (e) ->
	fs.writeFile 'data/' + e + '.json', JSON.stringify newKc[e] 
