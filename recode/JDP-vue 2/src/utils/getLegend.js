/*
@desc:获取echarts图的图例legend文字
*/
function getLegend(lists){
	var legendData = [];
	for(var i = 0,len = lists.length; i < len;i++){
		legendData.push(lists[i].name)
	}
	return legendData;
}
export default getLegend;