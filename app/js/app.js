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
			when('/ensei', {
				templateUrl: 'view/ensei.html',
				controller: 'esCtrl'
			})
			.when('/kanmusu', {
				templateUrl: 'view/kanmusu.html',
				controller: 'kmCtrl'
			})
			.when('/shinkai', {
				templateUrl: 'view/shinkai.html',
				controller: 'dkmCtrl'
			}).
			otherwise({
				redirectTo: '/'
			})
	}])
	.controller('mainCtrl', ['$scope', function($scope) {
		
	}])
	.controller('esCtrl', ['$scope', 'getJson', function($scope, getJson) {
		$scope.perHour = false;
		$scope.dskt = $scope.dsk==true?1.5:1;
		function esph(object, type, time) {
				var get = object.regard[type] * time;
				var cost = type == 1 || type == 2?object.cost[type+1]:0
				var times = object.time.split(':');
				var min = (Number(times[0]) * 60 + Number(times[1]))/60;
				return (get-cost)/min
			};
		function calph() {
			enseiOp = [];
			$scope.ensei.forEach(function(item,index) {
				item.regardph = JSON.parse(JSON.stringify(item.regard));
				item.regardph = item.regardph.map(function(e, i) {
					return esph(item, i, $scope.dskt)
				})
			})
		};
		$scope.applys = function() {
			$scope.dskt = $scope.dsk==true?1.5:1;
			calph();
		}
		getJson.fetch('ensei.json').then(function(data) {
			$scope.esh = 1
			$scope.ensei = data;
			var enseiOp = [];
			$scope.ensei.forEach(function(item,index) {
					enseiOp.push(item.id);
			})
			calph();
			$scope.predicate = 'id';
			$scope.ensei1 = enseiOp.map(function(e) {return e});
			$scope.ensei2 = enseiOp.map(function(e) {return e});
			$scope.ensei3 = enseiOp.map(function(e) {return e});
			// $scope.totalF = $scope.totalA = $scope.totalS = $scope.totalB = 0;
			$scope.total = [0,0,0,0,0];
			$scope.calget = function() {
				x = enseiOp.indexOf($scope.es1);
				y = enseiOp.indexOf($scope.es2);
				z = enseiOp.indexOf($scope.es3);
				$scope.total = $scope.total.map(function(e,i) {
					return ($scope.esh)*((x == -1 ?0:esph($scope.ensei[x], i, $scope.esd1?1.5:1))
															+(y == -1 ?0:esph($scope.ensei[y], i, $scope.esd2?1.5:1))
															+(z == -1 ?0:esph($scope.ensei[z], i, $scope.esd3?1.5:1)))
				})
			}
		})
	}])
	.controller('kmCtrl', ['$scope', '$filter', 'getJson', 'kanType', 'toSelectors', function($scope, $filter, getJson, kanType, toSelectors) {
		$scope.predicate = 'api_stype';
		$scope.reverse = false;
		$scope.typesel = kanType.map(function(e,i) {
			return i+1;
		});
		$scope.kanFinal = true;
		$scope.allType = true;
		getJson.fetch('kansen.json').then(function(data) {
			$scope.kans = data.api_mst_ship;
			console.log($scope.kans)
		})
		$scope.summaxeq = function(kan) {
			return kan.api_maxeq.reduce(function(a, b) {
				return a + b;
			})
		}
		$scope.fuelBull = function(kan) {
			return kan.api_bull_max + kan.api_fuel_max;
		}
		
		$scope.kanType = toSelectors(kanType);
		$scope.filterType = function() {
			var selects = [];
			$scope.kanType.forEach(function(e) {
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
			$scope.kanType.forEach(function(e) {
				e.selected = $scope.allType;
			})
			$scope.filterType();
		}
	}])
	.controller('dkmCtrl', ['$scope', '$filter', 'getJson', 'kanType', 'toSelectors', function($scope, $filter, getJson, kanType, toSelectors) {
		$scope.predicate = 'api_stype';
		$scope.reverse = false;
		$scope.typesel = kanType.map(function(e,i) {
			return i+1;
		});
		$scope.kanFinal = true;
		$scope.allType = true;
		var kanSuffix = ['normal', 'elite', 'flagship', '改flagship'];
		$scope.kanSuffix = toSelectors(kanSuffix);
		$scope.suffixsel = kanSuffix.map(function(e, i) {
			return i+1;
		})
		getJson.fetch('dekikan.json').then(function(data) {
			// console.log(data);
			$scope.kans = data.api_mst_ship;

		})
		$scope.summaxeq = function(kan) {
			return kan.api_maxeq.reduce(function(a, b) {
				return a + b;
			})
		}
		$scope.fuelBull = function(kan) {
			return kan.api_bull_max + kan.api_fuel_max;
		}
		$scope.kanType = toSelectors(kanType);
		$scope.filterType = function() {
			var selects = [];
			$scope.kanType.forEach(function(e) {
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
			$scope.kanType.forEach(function(e) {
				e.selected = $scope.allType;
			})
			$scope.filterType();
		}
		$scope.filterSuffix = function() {
			var selects = [];
			$scope.kanSuffix.forEach(function(e) {
				if(e.selected == true) {
					selects.push(e.val)
				}
			})
			$scope.suffixsel = selects;
			console.log($scope.suffixsel)
		}
	}]);

