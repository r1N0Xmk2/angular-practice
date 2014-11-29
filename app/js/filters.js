angular.module('myApp.filters', [])
	.filter('stype', function () {
	    return function (n) {
	    	var stype = [
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
	      return stype[n-1];
	    }
	})
	.filter('maxeq', function () {
	    return function (arr) {
	    	var i = arr.indexOf(0);
	    	var arr_=arr.map(function(e){return e})
	    	i = i === 0 ? 1 : i;
	    	arr_.splice(i, arr.length-i)
	    	total = arr_.reduce(function(a,b){return a+b});
	    	return (total===0?0:total +'('+ arr_.join(',')+')')
	      // return arr==undefined?0:arr;
	    }
	})
	.filter('soku', function () {
	    return function (n) {
	    	if(n==5) return '低';
	    	else if (n==10) return '高';
	    }
	})
	.filter('afterlv', function () {
	    return function (n) {
	    	return (n===0?'-':n)
	    }
	})
	.filter('leng', function () {
	    var arr = ['短', '中', '長', '超長'];
	    return function(n) {
	    	return arr[n-1];
	    }
	})
	.filter('afterlv0', function () {
		return function (items, flag) {
			if(!flag) return items
		  var filtered = [];
		  items.forEach(function(e) {
		  	if(e.api_afterlv===0) {
		  		filtered.push(e)
		  	}
		  })
		  return filtered;
		};
	})
	.filter('filterType', function () {
	  return function (items, arr) {
	    if(arr === 0) return items;
    	var filtered = [];
    	items.forEach(function(e) {
    		if(arr.indexOf(e.api_stype)==-1) {
    			filtered.push(e)
    		}
    	})
    	return filtered;	
	        
	  };
	});
