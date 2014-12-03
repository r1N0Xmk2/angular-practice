var myApp = angular.module('myApp', [
	'ngRoute',
	'myApp.services',
	'myApp.filters'
])
myApp
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'view/main.html',
				controller: 'mainCtrl'
			}).
			when('/expedition', {
				templateUrl: 'view/expedition.html',
				controller: 'expeditionCtrl'
			})
			.when('/ships', {
				templateUrl: 'view/ships.html',
				controller: 'shipsCtrl'
			})
			.when('/enemy', {
				templateUrl: 'view/enemy.html',
				controller: 'enemyCtrl'
			}).
			otherwise({
				redirectTo: '/'
			})
	}])
	.controller('mainCtrl', ['$scope', function($scope) {

	}])
	.controller('expeditionCtrl', ['$scope', 'getJson', function($scope, getJson) {
		$scope.perHour = false;
		$scope.greatSuccessTime = $scope.greatSuccess==true?1.5:1;
		function expeditionCalculate(object, type, time) {
				var get = object.regard[type] * time;
				var cost = type == 1 || type == 2?object.cost[type+1]:0
				var times = object.time.split(':');
				var min = (Number(times[0]) * 60 + Number(times[1]))/60;
				return (get-cost)/min
			};
		function calph() {
			expeditionOp = [];
			$scope.expedition.forEach(function(item,index) {
				item.regardph = JSON.parse(JSON.stringify(item.regard));
				item.regardph = item.regardph.map(function(e, i) {
					return expeditionCalculate(item, i, $scope.greatSuccessTime)
				})
			})
		};
		$scope.applys = function() {
			$scope.greatSuccessTime = $scope.greatSuccess==true?1.5:1;
			calph();
		}
		getJson.fetch('Expedition.json').then(function(data) {
			$scope.esh = 1
			$scope.expedition = data;
			var expeditionOp = [];
			$scope.expedition.forEach(function(item,index) {
					expeditionOp.push(item.id);
			})
			calph();
			$scope.predicate = 'id';
			$scope.expedition1 = expeditionOp.map(function(e) {return e});
			$scope.expedition2 = expeditionOp.map(function(e) {return e});
			$scope.expedition3 = expeditionOp.map(function(e) {return e});
			// $scope.totalF = $scope.totalA = $scope.totalS = $scope.totalB = 0;
			$scope.total = [0,0,0,0,0];
			$scope.calget = function() {
				x = expeditionOp.indexOf($scope.es1);
				y = expeditionOp.indexOf($scope.es2);
				z = expeditionOp.indexOf($scope.es3);
				$scope.total = $scope.total.map(function(e,i) {
					return ($scope.esh)*((x == -1 ?0:expeditionCalculate($scope.expedition[x], i, $scope.esd1?1.5:1))
															+(y == -1 ?0:expeditionCalculate($scope.expedition[y], i, $scope.esd2?1.5:1))
															+(z == -1 ?0:expeditionCalculate($scope.expedition[z], i, $scope.esd3?1.5:1)))
				})
			}
		})
	}])
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
			console.log($scope.ships)
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
	}])
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
			// console.log(data);
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
			console.log($scope.suffixsel)
		}
	}]);
