/*
@des:处理折线图x轴数据
	以时间为x轴的情况
*/

//处理时间
function handleDate(date, format = ['.', '\n']) {
	date = date.replace(/-/g, format[0]);
    return date.replace(/\./, format[1]);
}

function getXscale(scale, format){
	var xData = [];
	for (var i = 0, len = scale.length; i < len; i++) {
		//如果是月的话由前端配置x轴，不再需要后端返回的x轴
		if(scale[i].length <= 7){
			var year = new Date().getFullYear();
			var mon = new Date().getMonth()+1;
			if(mon<7){
				xData = [year+'\n01',year+'\n02',year+'\n03',year+'\n04',year+'\n05',year+'\n06'];
			}else{
				xData = [year+'\n07',year+'\n08',year+'\n09',year+'\n10',year+'\n11',year+'\n12'];
			}
			break;
		}
	    xData.push(handleDate(scale[i]), format);
	}
	return xData;
}
export default getXscale;
