
var fetch = require('io/fetch');
var url = require('io/url');
var tableOrderList= require('./tableOrderList.tpl');
var dialog = require('./oneKeyDeliver');
var getDateList = require('./getDateList');
var confirm = require('module/popup/confirm');

var init = function(){
	//初始化
	var $table = $("[data-node=afterServiceList]");
	var $loadList = $("[data-node=loadList]");
	var $loading = $("[data-node=loading]");
	var $noList = $("[data-node=noList]");
	var $deliverGoodsDiv = $(".pop-box-wrap");

	//加载更多初始化设置
	$loading.css("display","none");
	$noList.css("display","none");
	$loadList.css("display","none");
	
	//页面加载展示列表
	getDateList.getDateList(1,15);


	//加载更多－－添加事件
	//$loadList.data("page",2);
	$loadList.on("click",function(){
		var page = $(this).attr("data-page");
		var currentPage = parseInt(page)+1;
		$loading.css("display","block");
		getDateList.getDateList(currentPage,15);
		$(this).attr("data-page",currentPage);
	});


	//一键发货 或者查看物流－－添加事件
	$table.on("click","[data-node=typedesc]",function(){
		var id = $(this).attr("data-id");
		var idOrder = $(this).attr("data-orderid");
		if($(this).hasClass("deliverGoods")){
			dialog(id);

		//调用接口，获取物流信息
		}else if($(this).hasClass("checkLogistics")){
			$(this).attr("target","_black");
			$(this).attr("href","/CustomerInfo/getOrderLogistics?orderId="+idOrder+"&id="+id);

		}else if($(this).hasClass("shureGoods")){
			// 确认收货 shureGoods
			console.log(id);
			getConfirmMsg(id);
		}else if($(this).hasClass("checkLogisticsTwo")){
			$(this).attr("target","_black");
			$(this).attr("href","/CustomerInfo/getOrderLogistics?orderId="+idOrder+"&id="+id);
		}
	});


}
var getConfirmMsg = function (id){
	var pid = id;
	confirm('确认收货', {
		width: 600,
		height:90,
        fixed: true,
        modal: true,
        title: '确认收货',
        content:"<div class='del-pop-p' data-idShure="+pid+" data-node='shureP'><div data-node='span_Msg'>确认收货？</div><div data-node='togoleDiv' class='hide' style='text-align:center;font-size:12px;color:red;'></div></div>",
        className: 'pop-box pop-pad-btm65',
        okCls: 'pc-btn pc-btnh40 pc-btnw120',
        cancelCls: 'queren-btn pc-btnh40 pc-btnw120',
       	ok: function(pid){
       		var $table = $("[data-node=afterServiceList]");
       		$("[data-node=togoleDiv]").html("");
       		$("[data-node=togoleDiv]").removeClass("show").addClass("hide");
       		var id = $("[data-node=shureP]").attr("data-idShure");
			fetch.get(url.get('buyCheckGoods')+"?id="+id).then(function(data){
				if(data.success){
					$table.children("tbody").empty();
		    		getDateList.getDateList(1,15);
		    		$("[data-node=loadList]").attr("data-page",1);
		    		$("button[i=close]").click();
				}else{
					$("[data-node=togoleDiv]").html("* 请求失败，请重新点击");
					$("[data-node=togoleDiv]").removeClass("hide").addClass("show");
					
				}
		    });
		    return false;
		},
        btnWrapCls: 'two-buttons'
    });
}
		
//确认收货－－点击确定
var shureGoodsMsg= function(id){
	fetch.post(url.get('buyCheckGoods')+"?id="+id).then(function(data){
		if(data.success){
			console.log(data);
			
		}
    	
    });
}


module.exports = {
    init: init
};