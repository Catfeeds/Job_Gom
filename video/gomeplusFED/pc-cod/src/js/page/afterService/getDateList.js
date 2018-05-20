
var fetch = require('io/fetch');
var url = require('io/url');
var tableOrderList= require('./tableOrderList.tpl');
var getDateList = function getDateList(pageNum,pageSize){
		var $table = $("[data-node=afterServiceList]");
		var $loadList = $("[data-node=loadList]");
		var $loading = $("[data-node=loading]");
		var $noList = $("[data-node=noList]");
		var $deliverGoodsDiv = $(".pop-box-wrap");
		$loadList.css("display","none");
		params = {
			"pageNum" : pageNum,
			"pageSize" : pageSize
			}
			$loading.css("display","block");
		fetch.post(url.get('afterServiceList'), {
            data: params
        }).then(function(data){
    	
        	if(data.success){
        		var dataList = data.data;
        		//console.log(dataList);
        		if(dataList.length>0){
	        		for(var i = 0 ; i < dataList.length; i ++){
						var type = dataList[i].type; //类型
						var status = dataList[i].status; //订单类型
						var showStatus = "";
						var cilckStyle = "";
						var showStatusTow = "";
						var cilckStyleTow = "";
						var isThree=false;
						if (type == 4) {//退款
							showStatus = "";
						}else if(type == 2 ){//退货
							if(status ==-103){
								showStatus = "一键发货";
								cilckStyle = "deliverGoods";
							}else if(status == -107 || status == -115 || status == -5 || status == -10){
								showStatus = "查看物流";
								cilckStyle = "checkLogistics";
							}else if(status == -123){
								//
								showStatus = "确认收货";
								cilckStyle = "shureGoods";
							}
						}else if(type == 3){
							if(status == -103) {
								showStatus = "一键发货";
								cilckStyle = "deliverGoods"
							}else if(status == -107  || status == -124 || status == -127|| status == -131){
								showStatus = "查看物流";
								cilckStyle = "checkLogistics";
							}else if(status == -123){
								isThree=true;
								showStatusTow = "查看物流";
								cilckStyleTow = "checkLogisticsTwo";

								showStatus = "确认收货";
								cilckStyle = "shureGoods";
							}
						}
						var appendTable = {
							isThree:isThree,
							showStatusTow:showStatusTow,
							cilckStyleTow:cilckStyleTow,
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
							cilckStyle:cilckStyle,
							shop_user:dataList[i].mail_name,
							createTime: dataList[i].time
						}
						//console.log(appendTable.shop_name);
						var nameStr = "";
						//console.log(appendTable.shop_name);
						for(var j = 0 ; j < appendTable.shop_name.length; j++){
							//console.log(appendTable.shop_name[j].name);
							nameStr +="<p class='product-name'>"+appendTable.shop_name[j].name+"</p>"
							
						}
						appendTable.shop_name = nameStr;
						var item = tableOrderList(appendTable)
						$table.children("tbody").append(item);
						$loading.css("display","none");
						if(dataList.length <15 && pageNum!=1){
        					//$noList.css("display","block");
        					$loadList.css("display","none");
        				}else{
        					$loadList.css("display","block");
        				}
        				
						if(pageNum===1 && dataList.length <1){
							$noList.css("display","block");
						}else if(pageNum===1 && dataList.length <15){
							$loadList.css("display","none");
						}
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

module.exports = {
	getDateList :getDateList
}	