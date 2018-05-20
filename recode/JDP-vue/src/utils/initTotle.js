/*
@des:初始化表格的合计数组
*/
function initTotle(da){
	var len = da[0].lists.length;
	var totleAry = [];
	for (var i = 0 ;i < len; i++ ){
		totleAry.push(0);
	}
	return totleAry;
}
export default initTotle;