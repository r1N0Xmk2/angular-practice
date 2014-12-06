angular.module('KCW.filters', [])
	.filter('etype', function (eqType) {
	    return function (n) {
	    	if(!isNaN(Number(n))) {
	    		return eqType[n-1];
	    	} else if(n == 'team') {
	    		return '√(全裸舰娘索敌)'
	    	} else if(n == 'admiral') {
	    		return '司令部进位至5的倍数'
	    	}
	    }
	})
	.filter('stype', function (shipType) {
	    return function (n) {
	      return shipType[n-1];
	    }
	})
	.filter('maxeq', function () {
	    return function (oldArr) {
	    	var arr = oldArr.map(function(e){return e})
	    	for(;arr[arr.length-1] === 0;){
	    		arr.pop();
	    	}
	    	var total = 0;
	    	if(arr.length!==0) {
	    		total = arr.reduce(function(a,b){return a+b});
	    	}
	    	return (total===0?0:total +'('+ arr.join(',')+')')
	    }
	})
	.filter('rare', function () {
	  return function (n) {
    	var rare = ['コモン','レア','ホロ','Sホロ','SSホロ','SSSホロ']
    	return rare[n];		        
	  };
	})
	.filter('soku', function () {
	    return function (n) {
	    	if(n==5) return '低速';
	    	else if (n==10) return '高速';
	    	else return '陆上'
	    }
	})
	.filter('afterlv', function () {
	    return function (n) {
	    	return (n===0?'-':n)
	    }
	})
	.filter('leng', function () {
	    var arr = ['無', '短', '中', '長', '超長'];
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
	  	if(items) {
	  		var filtered = [];
	  		items.forEach(function(e) {
	  			if(arr.indexOf(e.api_stype)!==-1) {
	  				filtered.push(e);
	  			}
	  		})
	  		return filtered;	
	  	}
	  };
	})
	.filter('filterEqType', function () {
	  return function (items, arr) {
	  	if(items) {
	  		var filtered = [];
	  		items.forEach(function(e) {
	  			if(arr.indexOf(e.api_type[2])!==-1) {
	  				filtered.push(e);
	  			}
	  		})
	  		return filtered;	
	  	}
	  };
	})
	.filter('filterSuffix', function () {
	  return function (items, arr) {
    	var filtered = [];
    	items = items || [];
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
	})
	.filter('nobr', function () {
	  return function (str) {
    	return str.replace(/\<br\>/,'')
	  };
	})
	.filter('todayImprove', function () {
		return function (items, day) {
			var selected = {};
			items = items || [];
			Object.keys(items).forEach(function(e) {
				if(items[e].week[day]!=="不可") {
					selected[e] = items[e];
				}
			})
			return selected;
		}
	})
