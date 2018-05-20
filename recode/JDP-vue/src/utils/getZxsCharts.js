/*
@desc:处理专项任务数echarts数据
*/
var dataStyle = { 
    normal: {
        label: {show:false},
        labelLine: {show:false}
    }
};
var placeHolderStyle = {
    normal : {
        color: '#F7F7F7',
        label: {show:false},
        labelLine: {show:false}
    }
};

var radiusArr = [[115,125],[102, 112],[89, 99],[76, 86],[63, 73],[50,60],[37,47],[24,34]];
function getLegend(list){
	var arr = [];//echarts的option中legend数据
	for(var i = 0, len = list.length;i< len;i++){
		if(i<8){
			arr.push(list[i].username_chn);
		}
	}
	return arr;
}
function getMaxTotal(list){
	var maxTotal = 0;//最多的专项数
	for(var i = 0, len = list.length;i< len;i++){
		if(maxTotal<list[i].total){
			maxTotal = list[i].total;
		}
	}
	return maxTotal
}
function getMax(maxNum) {//以50为节点，向上取50整倍数
   var max = 50; 
  for (var i = 1; i < 100; i++) {
    if (maxNum <= i * 50) {
      max = i * 50;
      break;
    }
  }
  return max;
}
function getSeries(list){
	var seriesArr = [];
	var maxTotal = getMaxTotal(list);
	var max = getMax(maxTotal);
	for(var i = 0,len = list.length;i<len;i++){
		var seriesItem = {
	            name:'专项数',
	            type:'pie',
	            clockWise: false,
	            hoverAnimation: false,
	            radius : [70, 80],
	            center:['50%',170],
	            itemStyle : dataStyle,
	            data:[
	                {
	                    value:30, 
	                    name:'06'
	                },
	                {
	                    value:30,
	                    name:'invisible',
	                    itemStyle : placeHolderStyle
	                }
	            ]
		    }
		seriesItem.data[0].value = list[i].total;
		seriesItem.data[0].name = list[i].username_chn;
		seriesItem.data[1].value = max - list[i].total;
		seriesItem.radius = radiusArr[i]
		seriesArr.push(seriesItem);
	}
	return seriesArr;
}

export default {
	getLegend:getLegend,
	getSeries:getSeries
}
