angular.module('myApp.services',[])
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
	})
	.factory('toSelectors', function() {
		return function(arr) {
			return arr.map(function(e,i) {
				return {
					name : e,
					val : i+1,
					selected : true
				}
		})
		}
	})
	.factory('shipType',function() {
		return [
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
	});