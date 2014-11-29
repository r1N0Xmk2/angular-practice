var myApp = angular.module('myApp', [
	'ngRoute',
	'myApp.filters'
	// 'angular.filter'
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
	.controller('kmCtrl', ['$scope', '$filter', 'getJson', function($scope, $filter, getJson) {
		var kanType = [
			'海防艦', 
			'駆逐艦', 
			'軽巡洋艦', 
			'重雷装巡洋艦', 
			'重巡洋艦', 
			'航空巡洋艦', 
			'軽空母', 
			'巡洋戦艦', 
			'戦艦', 
			'航空戦艦', 
			'正規空母', 
			'超弩級戦艦', 
			'潜水艦', 
			'潜水空母', 
			'補給艦', 
			'水上機母艦', 
			'揚陸艦', 
			'装甲空母', 
			'工作艦', 
			'潜水母艦'];
		$scope.predicate = 'api_stype';
		$scope.reverse = false;
		$scope.typesel = kanType.map(function(e,i) {
			return i+1;
		});
		$scope.kanFinal = true;
		$scope.allType = true;
		getJson.fetch('kansen.json').then(function(data) {
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
		
		$scope.kanType = kanType.map(function(e,i) {
			return {
				name : e,
				val : i+1,
				selected : true
			}
		})
		$scope.filterType = function() {
			var selects = [];
			$scope.kanType.forEach(function(e) {
				if(e.selected == true) {
					selects.push(e.val)
				}
			})
			console.log($scope.allType)
			$scope.typesel = selects
			console.log($scope.typesel)
			if($scope.typesel.length == 0) {
				$scope.allType = false;
			} else if($scope.typesel.length > 0) {
				$scope.allType = true;
			}
		}
		$scope.toggleType = function () {
			console.log($scope.kanType)
			$scope.typesel = [];
			$scope.kanType.forEach(function(e) {
				e.selected = $scope.allType;
			})
			$scope.filterType();
		}
	}])
	.factory('getJson', function($q, $timeout, $http) {
		var getJson = {
			fetch: function(what) {
				var deferred = $q.defer();
				$timeout(function() {
					$http.get('data/' + what).success(function(data) {
						deferred.resolve(data);
					});
				}, 30);
				return deferred.promise;
			}
		}
		return getJson;
	});
