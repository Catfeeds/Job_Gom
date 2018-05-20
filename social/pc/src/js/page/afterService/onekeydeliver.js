var deliverGoods= require('./deliverGoods.tpl');
//var dialog = require('dialog');
var confirm = require('module/popup/confirm');
var url = require('io/url');
var fetch = require('io/fetch');

//var tableOrderList= require('./tableOrderList.tpl');
var getDateList = require('./getDateList');
//var addNullMsg = $("[data-node=addMsgNull]");  // 快递公司 为空提示

var initDialog = function(idOrder){
	
	//显示弹出框
	getConfirm();
	var orderId = idOrder;
	
	//输入订单号，事件绑定，判断输入的内容长度
	$("[data-node=logisticNo]").on("keyup",function(){
		//console.log($(this).val().length);

		var NullMsg = $("[data-node=orderNumNull]");
		
		var html = $(this).val();
		var valLength= $(this).val().length;

		var reg=new RegExp("^[A-Za-z0-9]+$");
		if(!reg.test(html)){
			NullMsg.css("display","block");
			NullMsg.html("运单号只能是数字或英文");
			return false;
		}
		if(valLength <1){
			//$(this).attr("autocomplete","off");
			NullMsg.css("display","none");
			//NullMsg.html("运单号不能超过20个字符");
		}
		if(valLength >20){
			$(this).attr("autocomplete","off");
			NullMsg.css("display","block");
			NullMsg.html("运单号不能超过20个字符");
		}else{
			NullMsg.css("display","none");
		}
		if(/\s/.test(html)){
		NullMsg.css("display","block");
		NullMsg.html("请输入正确的订单号");
		return false;
	}
	});

	//选择物流事件
	var addEvent = {
		$showLogistics : $("[data-node=showLogistics]"),
		$ul : $("[data-node=addMsgUL]"),
		$input : $("[data-node=insertBox]")
	}

	//物流 显示隐藏事件
	addEvent.$showLogistics .on("click",function(event){
		event.stopPropagation();
		$("[data-node=addMsgNull]").css("display","none");
		$("[data-node=addMsgNull]").html("");
		if(!addEvent.$ul.hasClass("hasList")){
			addMessage(addEvent.$ul);
		}
		if(addEvent.$ul.hasClass("show")){
			addEvent.$ul.addClass("hide").removeClass("show");
		}else{
			addEvent.$ul.addClass("show").removeClass("hide");
		}	
	});

	//物流选择－－－ 事件
	addEvent.$ul.on("click","li",function(){
		var id = $(this).children("a").attr("id");
		var name = $(this).children("a").html();
		
		addEvent.$input.html(name);
		addEvent.$input.attr("id",id);
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
			//console.log("没获取到信息");
		}	
    });
	
}

// 发送 
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
		NullMsg.html("运单号不能为空，请填写");
		return false;
	}
	var reg=new RegExp("^[A-Za-z0-9]+$");
	if(!reg.test(logisticNo)){
		NullMsg.css("display","block");
		NullMsg.html("运单号只能是数字或英文");
		return false;
	}

	if(/\s/.test(logisticNo)){
		NullMsg.css("display","block");
		NullMsg.html("请输入正确的订单号");
		return false;
	}
	if(logisticNo.length>20){ //快递单号为空	
		NullMsg.css("display","block");
		NullMsg.html("运单号不能超过20个字符");
		return false;
	}

	var sendData = {
		logisticVenderId :parseInt(logisticVenderId),
		orderid : parseInt(orderid),
		logisticNo :logisticNo
	}


	
	var $table = $("[data-node=afterServiceList]");

	fetch.post(url.get('sendGoods'),{data: sendData}).then(function(data){
		
		if( data.success ){	
		NullMsg.css("display","none").html("");
		//如何刷新页面？
		$table.children("tbody").empty();
		getDateList.getDateList(1,15);
		$("[data-node=loadList]").attr("data-page",1);
		$("[i=close]").click();
    }else{
		NullMsg.css("display","block");
		NullMsg.html(data.message);
    }
    });  
	return false;
   
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


module.exports = initDialog;
