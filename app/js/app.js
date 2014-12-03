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
			})
			.when('/equipment', {
				templateUrl: 'view/equipment.html',
				controller: 'eqCtrl'
			})
			.when('/enemy-equipment', {
				templateUrl: 'view/equipment.html',
				controller: 'eeqCtrl'
			})
			.when('/view-range', {
				templateUrl: 'view/view-range.html',
				controller: 'vrCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
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
	}])
	.controller('eqCtrl', ['$scope', '$filter', 'getJson', 'eqType', 'toSelectors', function($scope, $filter, getJson, eqType, toSelectors) {
		$scope.predicate = 'api_type';
		$scope.reverse = false;
		$scope.typesel = eqType.map(function(e,i){return i+1;});
		$scope.allType = true;
		getJson.fetch('Equipment.json').then(function(data) {
			$scope.eqs = data.api_mst_slotitem;
		})
		$scope.eqType = toSelectors(eqType);
		$scope.filterType = function() {
			var selects = [];
			$scope.eqType.forEach(function(e) {
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
			$scope.eqType.forEach(function(e) {
				e.selected = $scope.allType;
			})
			$scope.filterType();
		}
	}])
	.controller('eeqCtrl', ['$scope', '$filter', 'getJson', 'eqType', 'toSelectors', function($scope, $filter, getJson, eqType, toSelectors) {
		$scope.predicate = 'api_type';
		$scope.reverse = false;
		$scope.typesel = eqType.map(function(e,i){return i+1;});
		$scope.allType = true;
		getJson.fetch('EnemyEquipment.json').then(function(data) {
			$scope.eqs = data.api_mst_slotitem;
		})
		$scope.eqType = toSelectors(eqType);
		$scope.filterType = function() {
			var selects = [];
			$scope.eqType.forEach(function(e) {
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
			$scope.eqType.forEach(function(e) {
				e.selected = $scope.allType;
			})
			$scope.filterType();
		}
	}])
	.controller('vrCtrl', ['$scope', 'getJson', 'eqType', 'toSelectors', function($scope, getJson, eqType, toSelectors) {
		getJson.fetch('Equipment.json').then(function(data) {
			$scope.equipments = data.api_mst_slotitem;
			console.log($scope.equipments)
			$scope.team = [0,0,0,0,0,0];
			$scope.admiral = 1;
			var eqArray = [7,8,9,10,11,12,13,29];
			$scope.eqs = {}
			eqArray.forEach(function(e) {
				$scope.eqs[e] = [
						{
							"eqid": -1,
							"num": 1
						}
					]
			})
			$scope.options = {};
			console.log($scope.eqArray)
			eqArray.forEach(function(e) {
				$scope.options[e] = filterEq(e)
			})
			console.log($scope.options)
			$scope.addItem = function(n) {
				console.log(n)
				$scope.eqs[n].push({
					"eqid": -1,
					"num": 1
				})
				console.log($scope.eqs)
			}
			var filterEq = function(n) {
				var selects = ['選擇裝備'];
				$scope.equipments.forEach(function(e) {
					if(e.api_type === n) {
						selects.push(e);
					}
				})
				return selects;
			}
			$scope.calvr = function() {
			console.log($scope.team)
			var time = 
			vrmin = $scope.admiral / 5.0;
			times = {
				"7" : [1.0376255,0.09650285],
				"8" : [1.3677954,0.10863618],
				"9" : [1.6592780,0.09760553],
				"10" : [2.0000000,0.08662294],
				"11" : [1.7787282,0.09177225],
				"12" : [1.0045358,0.04927736],
				"13" : [0.9906638,0.04912215],
				"29" : [0.9067950,0.06582838],
				"team" : [1.6841056,0.07815942],
				"admiral" : [-0.6142467,0.03692224],
			}
			// 索敵スコア[小数点第2位を四捨五入]
			// 	= 7艦上爆撃機 × (1.0376255 ± 0.09650285)
			// 	+ 8艦上攻撃機 × (1.3677954 ± 0.10863618)
			// 	+ 9艦上偵察機 × (1.6592780 ± 0.09760553)
			// 	+ 10水上偵察機 × (2.0000000 ± 0.08662294)
			// 	+ 11水上爆撃機 × (1.7787282 ± 0.09177225)
			// 	+ 12小型電探 × (1.0045358 ± 0.04927736)
			// 	+ 13大型電探 × (0.9906638 ± 0.04912215)
			// 	+ 29探照灯 × (0.9067950 ± 0.06582838)
			// 	+ √(各艦毎の素索敵) × (1.6841056 ± 0.07815942)
			// 	+ (司令部レベルを5の倍数に切り上げ) × (-0.6142467 ± 0.03692224)
		}
		})
		
	}]);
