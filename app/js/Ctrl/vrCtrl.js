angular.module('KCW.vrCtrl', [])
	.controller('vrCtrl', ['$scope', 'getJson', 'eqType', 'toSelectors', function($scope, getJson, eqType, toSelectors) {
		getJson.fetch('ViewRange.min.json').then(function(data) {
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
			var shortTimes = {
				"7" : [1.04,0],
				"8" : [1.37,0],
				"9" : [1.66,0],
				"10" : [2.00,0],
				"11" : [1.78,0],
				"12" : [1.00,0],
				"13" : [0.99,0],
				"29" : [0.91,0],
				"team" : [1.69,0],
				"admiral" : [-0.61,0],
			};
			var longTimes = {
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
			};
			$scope.editCal = false;
			$scope.equipments = data.api_mst_slotitem;
			$scope.team = [0,0,0,0,0,0];
			$scope.admiral = 0;
			$scope.eqs = {};
			var eqArray = [7,8,9,10,11,12,13,29];
			$scope.times = shortTimes;
			eqArray.forEach(function(e) {
				$scope.eqs[e] = [
					{
						"eqid": -1,
						"saku": 0,
						"num": 1
					}
				];
			})
			$scope.options = {};
			eqArray.forEach(function(e) {
				$scope.options[e] = filterEq(e)
			})
			$scope.addItem = function(n) {
				$scope.eqs[n].push({
					"eqid": -1,
					"num": 1
				})
			};
			function filterEq (n) {
				var selects = {};
				Object.keys($scope.equipments).forEach(function(e) {
					if($scope.equipments[e].api_type === n) {
						selects[e] = $scope.equipments[e];
					}
				})
				return selects;
			};
			$scope.calvr = function() {
			var teams = $scope.team.reduce(function(pre, next) {
				return pre + Math.sqrt(next)
			},0);
			var admiral = $scope.admiral + ($scope.admiral % 5===0?0:(5- $scope.admiral % 5));
			// console.log($scope.times)
			
			$scope.vrmin = Object.keys($scope.eqs).reduce(function(total, e) {
				return total + $scope.eqs[e].reduce(function(sum, ele) {
					return sum + ele.saku * ele.num * ($scope.times[e][0] - $scope.times[e][1]);
				},0);
			},0)
			+ admiral * ($scope.times['admiral'][0] - $scope.times['admiral'][1])
			+ teams * ($scope.times['team'][0] - $scope.times['team'][1]);

			$scope.vrmax = Object.keys($scope.eqs).reduce(function(total, e) {
				return total + $scope.eqs[e].reduce(function(sum, ele) {
					return sum + ele.saku * ele.num * ($scope.times[e][0] + $scope.times[e][1]);
				},0);
			},0)
			+ admiral * ($scope.times['admiral'][0] + $scope.times['admiral'][1])
			+ teams * ($scope.times['team'][0] + $scope.times['team'][1]);
		}
		})
	}]);