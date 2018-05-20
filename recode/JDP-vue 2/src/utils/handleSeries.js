/*
@des:处理每条折线数据
*/
function handleSeries(lists, vertical = 'vertical') {
  var seriesDa = [];
  for (var i = 0, len = lists.length; i < len; i++) {
   	var seriesItem = {name:'',type:'line',data:[]};
   	seriesItem.name = lists[i].name;
   	seriesItem.data = lists[i][vertical];
   	seriesDa.push(seriesItem);
  }
  return seriesDa;
}

export default handleSeries;
