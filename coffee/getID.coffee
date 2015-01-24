ship = require '../data/Ships.min.json'
eq = require '../data/Equipment.min.json'
type = process.argv[2]
id = process.argv[3]
switch type
	when 's' then console.log id, ship.api_mst_ship[id]
	when 'e' then console.log id, eq.api_mst_slotitem[id]