var deliverGoods= require('./deliverGoods.tpl');
var dialog = require('dialog');
var confirm = require('module/popup/confirm');
var url = require('io/url');
var fetch = require('io/fetch');

var initDialog = function(idOrder){
	//显示弹出框
	getConfirm();
	var orderId = idOrder;
	//选择物流事件
	var addEvent = {
		$showLogistics : $("[data-node=showLogistics]"),
		$ul : $("[data-node=addMsgUL]"),
		$input : $("[data-node=insertBox]")
	}

	addEvent.$showLogistics .on("click",function(event){
		event.stopPropagation();
		if(!addEvent.$ul.hasClass("hasList")){
			addMessage(addEvent.$ul);
		}
		if(addEvent.$ul.hasClass("show")){
			addEvent.$ul.addClass("hide").removeClass("show");
		}else{
			addEvent.$ul.addClass("show").removeClass("hide");
		}	
	});

	//物流选择 事件
	addEvent.$ul.on("click","li",function(){

		var id = $(this).children("a").attr("id");
		var name = $(this).children("a").html();
		
		addEvent.$input.html(name);
		addEvent.$input.attr("id",id);
		//console.log(orderId);
		addEvent.$input.attr("data-orderId",orderId);
		addEvent.$ul.addClass("hide").removeClass("show");	
		//隐藏提示语？？？？？？		
	});

	//输入的时候，提示隐藏？？？？
}


//将物流信息添加到弹出框
var addMessage = function($ul){
	$ul.empty();
	fetch.post(url.get('logisticsList')).then(function(data){
		if(data.success){
			var params = data.data;
			var str = "";
			for(var i = 0 ; i < params.length; i++){
				var $li = '<li><a href="javascript:;" id="'+params[i].id +'"">'+params[i].name+'</a></li>'
				str += $li;
			}
			$ul.append(str);
			$ul.addClass("hasList show");
		}else{

		}
    	
    });
	
}
var sendMsg = function(){
	var NullMsg = $("[data-node=orderNumNull]"); //物流单号为空是提示
	var addNullMsg = $("[data-node=addMsgNull]");  // 快递公司 为空提示
	var $inputVal = $("[data-node=insertBox]"); //物流信息
	var logisticVenderId = $inputVal.attr("id"); //物流订单id
	var orderid = $inputVal.attr("data-orderid"); //订单id
	var logisticNo =  $("[data-node=logisticNo]").val(); //物流单号

	NullMsg.css("display","none");
	addNullMsg.css("display","none");
	if(!orderid){  //快递公司为空
		addNullMsg.css("display","block");
		addNullMsg.html("快递公司为空，请填写");
		return false;
	}
	if(!logisticNo){ //快递单号为空	
		NullMsg.css("display","block");
		NullMsg.html("快递公司为空，请填写");
		return false;
	}
	
	var sendData = {
		logisticVenderId :parseInt(logisticVenderId),
		orderid : parseInt(orderid),
		logisticNo :parseInt(logisticNo)
	}
	//console.log(sendData);
	var isOk = "0";
	fetch.post(url.get('sendGoods'),{
		 data: sendData
	}).then(function(data){
    	console.log(data);
    	if(data.success){
    		isOk="1";
    		NullMsg.css("display","none");
    		NullMsg.html("");
    		
    	}else{
    		isOk ="0";
    		NullMsg.css("display","block");
			NullMsg.html(data.message);
			
    	}
    });
    if(isOk==="1"){
    	
    	return true;
    }else{
    	return false;
    }
    //return false;
}
// 显示弹出口
var getConfirm = function (){
	confirm('', {
		width: 600,
        fixed: true,
        modal: true,
        title: '一键发货',
        content: deliverGoods,
        className: 'pop-box pop-pad-btm65',
        okCls: 'pc-btn pc-btnh40 pc-btnw120',
        cancelCls: 'queren-btn pc-btnh40 pc-btnw120',
        ok: sendMsg,
        btnWrapCls: 'two-buttons'
    });
}
/*
function getDateList(pageNum,pageSize){
	$loadList.css("display","none");
	params = {
		"pageNum" : pageNum,
		"pageSize" : pageSize
		}

	fetch.post(url.get('afterServiceList'), {
        data: params
    }).then(function(data){
    	//console.log(data);
    	if(data.success){
    		var dataList = data.data;
    		if(dataList.length>0){

        		for(var i = 0 ; i < dataList.length; i ++){
					var type = dataList[i].type; //类型
					var status = dataList[i].status; //订单类型
					var showStatus = "";
					var cilckStyle = "";
					if (type == 4) {//退款
						showStatus = "";
					}else if(type == 2 || type == 5){//换货
						if(status ==-107){
							showStatus = "一键发货";
							cilckStyle = "deliverGoods";
						}else if(status == -103 || status == -115){
							showStatus = "查看物流";
						}
					}else if(type == 3){
						if(status == -103) {
							showStatus = "一键发货";
							cilckStyle = "deliverGoods"
						}else if(status == -107 || status == -123 || status == -124 || status == -127){
							showStatus = "查看物流";
						}
					}
					var appendTable = {
	        			id : dataList[i].id, //数据id
						orderid: dataList[i].orderid, //订单id
						paymentAmount :dataList[i].paymentAmount, //交易金额
						shop_name :dataList[i].shop_name, //商品名称
						status :dataList[i].status, //订单类型
						statusDesc :dataList[i].statusDesc, //订单类型描述
						totalPrice :dataList[i].totalPrice, //退款金额
						type :dataList[i].type, //类型
						typedesc :dataList[i].typedesc, //类型描述
						showStatus :showStatus,
						cilckStyle:cilckStyle
					}
					var item = tableOrderList(appendTable)
					$table.empty();
					$table .append(item);
					$loading.css("display","none");
					$loadList.css("display","block");
        		}
    		}else{
    			$loading.css("display","none");
    			$noList.css("display","block");
    		}

    	}else{
    		//没成功
    		console.log("noLisdt");
    	}
	});


}
*/

module.exports = initDialog;
