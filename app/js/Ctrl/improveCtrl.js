angular.module('KCW.improveCtrl', [])
	.controller('improveCtrl', ['$scope', 'getJson', 'toSelectors', function($scope, getJson, toSelectors) {
		var d = new Date();
		localTime = d.getTime(); 
		localOffset = d.getTimezoneOffset() * 60000; 
		utc = localTime + localOffset; 
		offset = 9; 
		tokyo = utc + (3600000 * offset); 
		$scope.day = new Date(tokyo).getDay();
		$scope.week = [];
		for(var i = 0; i < 7; i++) {
			if( i == $scope.day) $scope.week[i] = true;
			else $scope.week[i] = false;
		} 
		getJson.fetch('Improvement.json').then(function(data) {
			getJson.fetch('Ships.min.json').then(function(ships) {
				getJson.fetch('Equipment.min.json').then(function(equip) {
					$scope.improves = {}
					Object.keys(data.improvement).forEach(function(ele) {
						$scope.improves[equip.api_mst_slotitem[ele].api_name] = data.improvement[ele]
						$scope.improves[equip.api_mst_slotitem[ele].api_name].api_type = equip.api_mst_slotitem[ele].api_type
						Object.keys($scope.improves[equip.api_mst_slotitem[ele].api_name].materials).forEach(function(e) {
							if(typeof($scope.improves[equip.api_mst_slotitem[ele].api_name].materials[e])!=='number')
							$scope.improves[equip.api_mst_slotitem[ele].api_name].materials[e][2] = getItem($scope.improves[equip.api_mst_slotitem[ele].api_name].materials[e][2], equip.api_mst_slotitem)
						})
						$scope.improves[equip.api_mst_slotitem[ele].api_name].week.forEach(function(e,i,arr) {
							arr[i] = getShipName(e, ships.api_mst_ship);
						})
					})
				})
			})
		})
		function getShipName(obj,arr) {
			if(obj == -1) {
				return '不可'
			} else if (obj === 0){
				return '无需'
			} else if (obj === 999){
				return '???'
			} else if(typeof(obj) == 'number') {
				return arr[obj].api_name
			} else if(Array.isArray(obj)) {
				return obj.map(function(e) {
					return arr[e].api_name
				}).join(' 或 ')
			}
		}
		function getItem(obj,arr) {
			if(obj[1] == 0) {
				return '无';
			} else {
				return arr[obj[0]].api_name+'*'+obj[1]
			}
		}
	}]);
