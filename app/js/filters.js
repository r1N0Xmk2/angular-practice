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
	    return function (oldArr) {
	    	var arr = oldArr.map(function(e){return e})
	    	for(;arr[arr.length-1] === 0;){
	    		arr.pop()
	    	}
	    	var total = 0;
	    	if(arr.length!==0) {
	    		total = arr.reduce(function(a,b){return a+b});
	    	}
	    	
	    	return (total===0?0:total +'('+ arr.join(',')+')')
	      // return arr==undefined?0:arr;
	      // return arr
	    }
	})
	.filter('soku', function () {
	    return function (n) {
	    	if(n==5) return '低';
	    	else if (n==10) return '高';
	    	else return '无'
	    }
	})
	.filter('afterlv', function () {
	    return function (n) {
	    	return (n===0?'-':n)
	    }
	})
	.filter('leng', function () {
	    var arr = ['超短', '短', '中', '長', '超長'];
	    return function(n) {
	    	return arr[n];
	    }
	})
	.filter('afterlv0', function () {
		return function (items, flag) {
			if(!flag) return items;
		  var filtered = [];
		  items = items ||[]
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
    	var filtered = [];
    	items.forEach(function(e) {
    		if(arr.indexOf(e.api_stype)!==-1) {
    			filtered.push(e)
    		}
    	})
    	return filtered;	
	        
	  };
	})
	.filter('filterSuffix', function () {
	  return function (items, arr) {
    	var filtered = [];
    	items = items || []
    	shipSuffix = ['', 'elite', 'flagship', 'brsflagship'];
    	arr_=arr.map(function(e){
    		return shipSuffix[e-1];
    	})
    	items.forEach(function(e) {
    		if(arr_.indexOf(e.api_yomi)!==-1) {
    			filtered.push(e)
    		}
    	})
    	return filtered;	
	        
	  };
	})
	.filter('nodash', function () {
	  return function (str) {
    	return str.replace(/\-/,'')
	  };
	})
	.filter('delbrs', function () {
	  return function (str) {
    	return str.replace(/brs/,'')
	  };
	});
