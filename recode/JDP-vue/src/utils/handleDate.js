/*
@des:处理后台返回月的图形x轴数据
	后台返回数据为["2017-07-31", "2017-08-10"]
	处理后显示["2017-07", "2017-08"]
*/

function handleDate(original,way){
	var dateAry = [];
	for(var i = 0,len = original.length; i < len; i++){
		if(way == 'month'){
			var handleItem = original[i].substr(0,7);
			dateAry.push(handleItem)
		}
	}
	if(!dateAry.length){
		dateAry = original
	}
	return dateAry;
}
export default handleDate;
