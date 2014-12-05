angular.module('KCW.enemyCtrl', [])
	.controller('enemyCtrl', ['$scope', '$filter', 'getJson', 'shipType', 'toSelectors', function($scope, $filter, getJson, shipType, toSelectors) {
		$scope.predicate = 'api_stype';
		$scope.reverse = false;
		$scope.typesel = shipType.map(function(e,i) {
			return i+1;
		});
		$scope.shipFinal = true;
		$scope.allType = true;
		var shipSuffix = ['normal', 'elite', 'flagship', '改flagship'];
		$scope.shipSuffix = toSelectors(shipSuffix);
		$scope.suffixsel = shipSuffix.map(function(e, i) {
			return i+1;
		})
		getJson.fetch('Enemy.json').then(function(data) {
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
		$scope.filterSuffix = function() {
			var selects = [];
			$scope.shipSuffix.forEach(function(e) {
				if(e.selected == true) {
					selects.push(e.val)
				}
			})
			$scope.suffixsel = selects;
		}
	}]);