/*
@des:获取折线图Y周刻度
*/

//合并数组，并取所有数组里面的最大值
function getMax(lists, vertical = 'vertical') {
  var ary = [];
  var maxNum = 0;

  for (var i = 0, len = lists.length; i < len; i++) {
    ary = ary.concat(lists[i][vertical])
  }
  for (var j = 0, jLen = ary.length; j < jLen; j++) {
    if (ary[j] > maxNum) {
      maxNum = ary[j];
    }
  }
  return maxNum;
}

//获取y轴的最大值及间隔
function getYscale(lists, vertical) {
  var num = getMax(lists, vertical);
  console.log(num)
  var yObj = {
    max: 50,
    interval: 10
  }
  for (var i = 1; i < 100; i++) {
    if (num <= i * 50) {
      yObj.max = i * 50;
      break;
    }
  }
  yObj.interval = yObj.max / 5;
  console.log(yObj)
  return yObj;
}
export default getYscale;
