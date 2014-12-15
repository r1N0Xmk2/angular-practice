fs = require 'fs'
#Type.min.json
typeData = require '../data/Type.json'
newType = 
	api_mst_slotitem_equiptype: {}
	api_mst_stype: {}
equipType2Array = (e) ->
	arr = []
	for k,v of e.api_equip_type
		if v is 1 then arr.push k
	arr
typeData.api_mst_slotitem_equiptype.forEach (e)->
	newType.api_mst_slotitem_equiptype[e.api_id] =
		api_name: e.api_name
typeData.api_mst_stype.forEach (e)->
	newType.api_mst_stype[e.api_id] =
		api_name: e.api_name
		api_equip_type: equipType2Array e
fs.writeFile './data/Type.min.json', JSON.stringify(newType), (err)->
	if err then throw err 
	else console.log 'type fin'


#Equipment.min.json
eq = require('../data/Equipment.json').api_mst_slotitem;
getEqTypeName = (id) ->
	newType.api_mst_slotitem_equiptype[id].api_name
newEq = 
	api_mst_slotitem : {}
for e in eq
	newEq.api_mst_slotitem[e.api_id] = 
		"api_name": e.api_name
		"api_type": getEqTypeName e.api_type[2]
fs.writeFile './data/Equipment.min.json', JSON.stringify(newEq), (err) ->
	if err then throw err 
	else console.log 'eq fin'


#Ships.min.json
ship = require('../data/Ships.json').api_mst_ship
getShipsTypeName = (id) ->
	newType.api_mst_stype[id].api_name
newship = 
	api_mst_ship: {}
for e in ship
	newship.api_mst_ship[e.api_id] =
		api_name: e.api_name
		api_type: getShipsTypeName(e.api_stype)
fs.writeFile './data/Ships.min.json', JSON.stringify(newship), (err) ->
	if err then throw err 
	else console.log 'ship fin'


#ViewRange.min.json
vr = 
	api_mst_slotitem: {}
for e in eq
	if e.api_saku > 0 and e.api_type!= 34
		vr.api_mst_slotitem[e.api_id] =
			api_name: e.api_name
			api_saku: e.api_saku
			api_type: e.api_type[2]
fs.writeFile './data/ViewRange.min.json', JSON.stringify(vr), (err) ->
	if err then throw err 
	else console.log 'vr fin'