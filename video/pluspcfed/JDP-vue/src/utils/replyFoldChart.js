/*
@desc:处理回复状态折叠图数据
*/

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
function replyFoldChart(ary){
	var arrY = [];//y轴
	var arrReplied = [];//已回复
	var arrNoreply = [];//未回复
	var arrNoneed = [];//无需回复
	var maxX = 0;//最大总数
	for(var i = 0,len = ary.length;i<len;i++){
		if(ary[i].username && ary[i].username!="total"){
			arrY.push(ary[i].username_chn);
			arrReplied.push(ary[i].dataDetail[0]);
			arrNoreply.push(ary[i].dataDetail[1]);
			arrNoneed.push(ary[i].dataDetail[2]);
			if(ary[i].dataDetail[3]>maxX){
				maxX = ary[i].dataDetail[3];
			}
		}
	};
	return {
		maxX:getMax(maxX),
		arrY:arrY,
		arrReplied:arrReplied,
		arrNoreply:arrNoreply,
		arrNoneed:arrNoneed
	}
}


export default replyFoldChart;