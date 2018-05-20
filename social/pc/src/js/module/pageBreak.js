/*
 	单击某个按钮时，触发该事件
*/

var pageBreak = function (option){
	var pageHtml = "";
	var defauls = {
		"elmSize" : 9 //大于9页显示。。。
	}

	var options = $.extend({},defauls,option);
	var elmSize = parseInt(options.elmSize);
	var tootlePage = parseInt(options.tootlePage);
	var toPage = parseInt(options.toPage);
	var arrPage=[];
	var dataStr={};
	if(tootlePage <= elmSize){

		
		for(var i = 0 ; i < tootlePage; i++){
			arrPage.push(i+1);
		}
		dataStr = {
			"arrPage" : arrPage,
			"dshow" : "no"
		}
		
		pageHtml = joinHtml(toPage,tootlePage,dataStr);

	}else{  
		// 计算当前页和总数的关系
		if(toPage + 4 >= tootlePage){
			// 前面有点，后面没点
			//var arrPage=[];
			for(var j = 0 ; j < elmSize-2 ; j++){
				var num = tootlePage - (elmSize-2) + (j+1);
				arrPage.push(num);
			}
			//调方法，前点
			dataStr = {
				"arrPage" : arrPage,
				"dshow" : "before"
			};
			pageHtml = joinHtml(toPage,tootlePage,dataStr);
		}else if(toPage - 4 <= 1){
			// 前面没点，后面有
			//var arrPage=[];
			for(var k = 0 ; k < elmSize-2; k++){
				var num1 = k+1;
				arrPage.push(num1);
			}
			dataStr = {
				"arrPage" : arrPage,
				"dshow" : "last"
			};
			pageHtml = joinHtml(toPage,tootlePage,dataStr);
		}else{
			//前后都有点
			//var arrPage=[];
			for( i = 0 ; i < elmSize-4; i++){
				var num2 = parseInt(toPage - 2 + i);
				arrPage.push(num2);
			}
			dataStr = {
				"arrPage" : arrPage,
				"dshow" : "all"
			};
			pageHtml = joinHtml(toPage,tootlePage,dataStr);
		}
	}

	return pageHtml;
}

function joinHtml(currentPage,lastPage1,dataStr){
	var arrPage = dataStr.arrPage; 
	var aList = "";
	for(var j = 0 ; j < arrPage.length; j ++){
		var className = "" ;
		if(currentPage == arrPage[j]){
			className = "active";
		}
		var num = arrPage[j];
			aList += '<a href="javascript:;" class = '+className+'>'+num+'</a>';
			
	}
	
	var preDissable = currentPage == 1 ? "disabled" : "";
	var nextDissable = currentPage == lastPage1 ? "disabled" : "";
	var prePage = '<a href="javascript:;" class="'+preDissable+' " data-node="prePage">上一页</a>'; 
	var firstPage = '<a href="javascript:;" >1</a>';
	var spot = '<a href="javascript:;" class="noClick">...</a>'
	var lastPage  = '<a href="javascript:;" >'+lastPage1+'</a>';
	var nextPage = '<a href="javascript:;" class="'+nextDissable+'" data-node="nextPage">下一页</a>';

	var _html = "";
	
	if(dataStr.dshow == "no"){
		_html = prePage + aList + nextPage;
	}else if(dataStr.dshow == "before"){
		_html = prePage + firstPage + spot+ aList + nextPage;
	}else if(dataStr.dshow == "last"){
		_html = prePage  + aList + spot + lastPage + nextPage;
	}else if(dataStr.dshow == "all"){
		_html = prePage + firstPage + spot+ aList + spot + lastPage+nextPage;
	}

	return _html;
}

module.exports = pageBreak;
