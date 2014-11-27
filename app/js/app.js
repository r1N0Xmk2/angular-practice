var myApp = angular.module('myApp', [
	'ngRoute'
])
myApp
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'view/ensei.html',
				controller: 'enseiCtrl'
			}).
			otherwise({
				redirectTo: '/'
			})
	}])
	.controller('enseiCtrl', ['$scope', 'getJson', function($scope, getJson) {
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
				console.log('calph',$scope.dskt)
				item.regardph=item.regardph.map(function(e, i) {
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