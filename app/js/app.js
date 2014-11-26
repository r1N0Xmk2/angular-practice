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
		getJson.fetch('ensei.json').then(function(data) {
			console.log(data);
			$scope.esh = 1
			$scope.ensei = data;
			enseiOp = [];
			$scope.ensei.forEach(function(item,i) {
				enseiOp.push(item.id);
				var times = item.time.split(':');
				var min = (Number(times[0]) * 60 + Number(times[1]))/60;
				item.regardph = JSON.parse(JSON.stringify(item.regard));
				item.regardph[1] -= item.cost[2]; 
				item.regardph[2] -= item.cost[3];
				item.regardph=item.regardph.map(function(ele) {
					return ele / min;
				}) 
			})
			$scope.predicate = '-id'
			$scope.ensei1 = enseiOp.map(function(e) {return e})
			$scope.ensei2 = enseiOp.map(function(e) {return e})
			$scope.ensei3 = enseiOp.map(function(e) {return e})
			// $scope.totalF = $scope.totalA = $scope.totalS = $scope.totalB = 0;
			console.log('es1',$scope.es1)
			$scope.total = [0,0,0,0,0]
			$scope.calget = function() {
				x = enseiOp.indexOf($scope.es1);
				y = enseiOp.indexOf($scope.es2);
				z = enseiOp.indexOf($scope.es3);
				$scope.total = $scope.total.map(function(e,i) {
					return ($scope.esh)*((x == -1 ?0:$scope.ensei[x].regardph[i]) + (y == -1 ?0:$scope.ensei[y].regardph[i]) + (z == -1 ?0:$scope.ensei[z].regardph[i]))
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