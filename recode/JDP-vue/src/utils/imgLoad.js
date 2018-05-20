/*
*@desc:js预加载图片
*/

var imgArr = [{
	url:'/static/img/error.png',
	alt:'加载错误图片'
},{
	url:'/static/img/loading.gif',
	alt:'loading...'
}];
function imgLoad(){
	for(var i = 0,len = imgArr.length; i < len;i++){
		var img = document.createElement('img');
		img.src = imgArr[i].url;
		if(imgArr[i].isImg){
			img.alt = imgArr[i].text;
		}
		img.onload=function(){
			console.log(this.src)
		}
	}
}
export default imgLoad;