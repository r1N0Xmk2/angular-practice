angular.module('KCW.expeditionCtrl', [])
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
	}]);