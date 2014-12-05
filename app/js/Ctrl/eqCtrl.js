angular.module('KCW.eqCtrl', [])
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
	}]);
	