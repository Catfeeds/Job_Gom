/*
@desc:处理完成情况折叠图数据
*/

function getMax(maxNum) { //以50为节点，向上取50整倍数
  var max = 50;
  for (var i = 1; i < 100; i++) {
    if (maxNum <= i * 50) {
      max = i * 50;
      break;
    }
  }
  return max;
}

function foldChart(ary) {
  var arrY = []; //y轴
  var arrDone = []; //已完成
  var arrUndone = []; //未完成
  var maxX = 0; //最大总数
  for (var i = 0, len = ary.length; i < len; i++) {
    if (ary[i].username && ary[i].username != "total") {
      arrY.push(ary[i].username_chn);
  	  arrDone.push(ary[i].proStatus[0])
      arrUndone.push(ary[i].proStatus[1])
      if (ary[i].proStatus[2] > maxX) {
        maxX = ary[i].proStatus[2];
      }
    }
  };
  return {
    maxX: getMax(maxX),
    arrY: arrY,
    arrDone: arrDone,
    arrUndone: arrUndone
  }
}


export default foldChart;
