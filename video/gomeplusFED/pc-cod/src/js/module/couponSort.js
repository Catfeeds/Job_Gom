var outArr=[];

var couponSort = {
	//money 升序couponSort
	upMoney: function( x, y ){

		return (~~x.money < ~~y.money) ? -1 : 1 ;
	},
	//失效期
	upDate : function( x, y ){
    	return ( x.effectiveEndTime < y.effectiveEndTime) ? -1 : 1
	},
	//获取重复的=>money
	getRepeatAttr : function( arr ){
		var obj = {},key=false,innerArr=[];
		for( var i = 0, len = arr.length; i <= len; i++ ){
			var item = i === arr.length ? '' : arr[i].effectiveEndTime;
			if(obj[item]==null){
				obj[item] = 1;
				outArr.push(innerArr);
				innerArr = [];
				innerArr.push(arr[i]);
			}else{
				innerArr.push(arr[i])
			}
		}
	},
	init : function( data ){
		outArr=[];
		var self = couponSort;
		self.getRepeatAttr(data.sort(self.upDate));
		var firstStep=outArr,result=[];
		for(var i=1;i<firstStep.length;i++){
			firstStep[i].sort(self.upMoney);
			for( var j=0;j<firstStep[i].length;j++ ){
				result.push(firstStep[i][j]);
			}
			
		}
		return result;
	}
}

module.exports = couponSort.init;