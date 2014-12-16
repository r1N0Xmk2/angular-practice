KCW
	.controller('shipsCtrl', ['$scope', '$filter', 'getJson', 'shipType', 'toSelectors', function($scope, $filter, getJson, shipType, toSelectors) {
		$scope.predicate = 'api_stype';
		$scope.reverse = false;
		$scope.typesel = shipType.map(function(e,i) {
			return i+1;
		});
		$scope.shipFinal = true;
		$scope.allType = true;
		getJson.fetch('Ships.json').then(function(data) {
			$scope.ships = data.api_mst_ship;
		})
		$scope.summaxeq = function(ship) {
			return ship.api_maxeq.reduce(function(a, b) {
				return a + b;
			})
		}
		$scope.fuelBull = function(ship) {
			return ship.api_bull_max + ship.api_fuel_max;
		}
		$scope.air = function(ship) {
			if(ship.api_stype!==11&&ship.api_stype!==18&&ship.api_stype!==17&&ship.api_stype!==7) {
				return 0
			} else {
				return ship.api_maxeq.reduce(function(sum, e) {
					return sum + Math.floor(Math.sqrt(e)*10)
				},0)
			}
		}
		$scope.shipType = toSelectors(shipType);
		$scope.filterType = function() {
			var selects = [];
			$scope.shipType.forEach(function(e) {
				if(e.selected == true) {
					selects.push(e.val)
				}
			})
			$scope.typesel = selects
			if($scope.typesel.length == 0) {
				$scope.allType = false;
			} else if($scope.typesel.length > 0) {
				$scope.allType = true;
			}
		}
		$scope.toggleType = function () {
			$scope.typesel = [];
			$scope.shipType.forEach(function(e) {
				e.selected = $scope.allType;
			})
			$scope.filterType();
		}
	}]);