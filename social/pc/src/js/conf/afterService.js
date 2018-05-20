webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var orderList = __webpack_require__(58);
	orderList.init();

	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('uc_afterService');

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Dialog = __webpack_require__(22);
	var noop = function noop() {};

	var create = function create(content, options) {
	    var defaults = {
	        fixed: true,
	        modal: true,
	        content: '<p class="del-pop-p">' + content + '</p>',
	        className: 'pop-box',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        ok: noop,
	        cancel: noop,
	        btnWrapCls: 'two-buttons'
	    };
	    $.extend(true, defaults, options);

	    var d = Dialog(defaults);

	    // var header = d._$('header');
	    // var title = d._$('title');
	    // title.css('borderBottom', 'none');
	    // header.show();

	    d.show();
	    return d;
	};

	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var tableOrderList = __webpack_require__(59);
	var dialog = __webpack_require__(60);
	var getDateList = __webpack_require__(62);
	var confirm = __webpack_require__(55);

	var init = function init() {
	    //初始化
	    var $table = $("[data-node=afterServiceList]");
	    var $loadList = $("[data-node=loadList]");
	    var $loading = $("[data-node=loading]");
	    var $noList = $("[data-node=noList]");
	    var $deliverGoodsDiv = $(".pop-box-wrap");

	    //加载更多初始化设置
	    $loading.css("display", "none");
	    $noList.css("display", "none");
	    $loadList.css("display", "none");

	    //页面加载展示列表
	    getDateList.getDateList(1, 15);

	    //加载更多－－添加事件
	    //$loadList.data("page",2);
	    $loadList.on("click", function () {
	        var page = $(this).attr("data-page");
	        var currentPage = parseInt(page) + 1;
	        $loading.css("display", "block");
	        getDateList.getDateList(currentPage, 15);
	        $(this).attr("data-page", currentPage);
	    });

	    //一键发货 或者查看物流－－添加事件
	    $table.on("click", "[data-node=typedesc]", function () {
	        var id = $(this).attr("data-id");
	        var idOrder = $(this).attr("data-orderid");

	        if ($(this).hasClass("deliverGoods")) {
	            //??????????????
	            dialog(id);

	            //调用接口，获取物流信息
	        } else if ($(this).hasClass("checkLogistics")) {
	            $(this).attr("target", "_black");
	            $(this).attr("href", "/CustomerInfo/getOrderLogistics?orderId=" + idOrder + "&id=" + id);
	        } else if ($(this).hasClass("shureGoods")) {
	            // 确认收货 shureGoods

	            getConfirmMsg(id);
	        } else if ($(this).hasClass("checkLogisticsTwo")) {

	            $(this).attr("target", "_black");
	            $(this).attr("href", "/CustomerInfo/getOrderLogistics?orderId=" + idOrder + "&id=" + id);
	        } else if ($(this).hasClass("homeServiceClass")) {
	            //???????? homeServiceClass
	            homeService(id);
	        }
	    });
	};
	var homeService = function homeService(id) {
	    var pid = id;
	    var pSpan = "确认商家已上门取货？";
	    var titSpan = "商家取货后请点击“确定”按钮确认，以免耽误您的退款。";
	    confirm('提示', {
	        width: 600,
	        //height:130,
	        fixed: true,
	        modal: true,
	        title: '提示',
	        //<h3 class="two-title">确认商家已上门取货？</h3>
	        //<p class="pay-pop-p">商家取货后请点击“确认”按钮确认，以免耽误您的退款。</p>
	        content: '<h3 class="two-title" data-idShure=' + pid + ' data-node="shureP" >' + pSpan + '</h3><p class="pay-pop-p   pay-pop-text">' + titSpan + '</p><div data-node="togoleDiv"  style="text-align:center;font-size:12px;color:red;padding-bottom:10px;" ></div>',
	        //content:"<div class='del-pop-p' data-idShure="+pid+" data-node='shureP'><div data-node='span_Msg'>确认收货？
	        //</div><div data-node='togoleDiv' class='hide' style='text-align:center;font-size:12px;color:red;'></div></div>",
	        className: 'pop-box pop-pad-btm65',
	        okCls: 'pc-btn pc-btnh40 pc-btnw120',
	        cancelCls: 'queren-btn pc-btnh40 pc-btnw120',
	        ok: function ok(pid) {
	            var $table = $("[data-node=afterServiceList]");
	            $("[data-node=togoleDiv]").html("");
	            //$("[data-node=togoleDiv]").removeClass("show").addClass("hide");

	            var id = $("[data-node=shureP]").attr("data-idShure");

	            fetch.get(url.get('orderSendGood') + "?orderid=" + id).then(function (data) {
	                console.log(data);
	                if (data.success) {
	                    $table.children("tbody").empty();
	                    getDateList.getDateList(1, 15);
	                    $("[data-node=loadList]").attr("data-page", 1);
	                    $("button[i=close]").click();
	                } else {
	                    console.log(4);
	                    $("[data-node=togoleDiv]").html("* 请求失败，请重新点击");
	                    $("[data-node=togoleDiv]").removeClass("hide").addClass("show");
	                }
	            });
	            return false;
	        },
	        btnWrapCls: 'two-buttons'
	    });
	};

	var getConfirmMsg = function getConfirmMsg(id) {
	    var pid = id;
	    confirm('确认收货', {
	        width: 600,
	        height: 90,
	        fixed: true,
	        modal: true,
	        title: '确认收货',
	        content: "<div class='del-pop-p' data-idShure=" + pid + " data-node='shureP'><div data-node='span_Msg'>确认收货？</div><div data-node='togoleDiv' class='hide' style='text-align:center;font-size:12px;color:red;'></div></div>",
	        className: 'pop-box pop-pad-btm65',
	        okCls: 'pc-btn pc-btnh40 pc-btnw120',
	        cancelCls: 'queren-btn pc-btnh40 pc-btnw120',
	        ok: function ok(pid) {
	            var $table = $("[data-node=afterServiceList]");
	            $("[data-node=togoleDiv]").html("");
	            $("[data-node=togoleDiv]").removeClass("show").addClass("hide");
	            var id = $("[data-node=shureP]").attr("data-idShure");
	            fetch.get(url.get('buyCheckGoods') + "?id=" + id).then(function (data) {
	                if (data.success) {
	                    $table.children("tbody").empty();
	                    getDateList.getDateList(1, 15);
	                    $("[data-node=loadList]").attr("data-page", 1);
	                    $("button[i=close]").click();
	                } else {
	                    $("[data-node=togoleDiv]").html("* 请求失败，请重新点击");
	                    $("[data-node=togoleDiv]").removeClass("hide").addClass("show");
	                }
	            });
	            return false;
	        },
	        btnWrapCls: 'two-buttons'
	    });
	};

	//确认收货－－点击确定
	var shureGoodsMsg = function shureGoodsMsg(id) {
	    fetch.post(url.get('buyCheckGoods') + "?id=" + id).then(function (data) {
	        if (data.success) {
	            console.log(data);
	        }
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/afterService/tableOrderList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,$string=$utils.$string,shop_name=$data.shop_name,shop_user=$data.shop_user,paymentAmount=$data.paymentAmount,totalPrice=$data.totalPrice,typedesc=$data.typedesc,createTime=$data.createTime,statusDesc=$data.statusDesc,cilckStyle=$data.cilckStyle,orderid=$data.orderid,showStatus=$data.showStatus,isThree=$data.isThree,cilckStyleTow=$data.cilckStyleTow,showStatusTow=$data.showStatusTow,$out='';$out+=' <tr> <td class="order-number" data-node="id">';
	$out+=$escape(id);
	$out+='</td> <td data-node="name">';
	$out+=$string(shop_name);
	$out+='</td> <td data-node="maijia"><p class="product-name">';
	$out+=$string(shop_user);
	$out+='</p></td> <td class="trade-money" data-node ="paymentAmount">￥';
	$out+=$escape(paymentAmount);
	$out+='</td> <td class="refund-money" data-node="totalPrice">';
	if(totalPrice){
	$out+='￥';
	}
	$out+=$escape(totalPrice);
	$out+='</td> <td class="type" data-node="type">';
	$out+=$escape(typedesc);
	$out+='</td> <td class="time"><span class="date">';
	$out+=$escape(createTime);
	$out+='</span></td> <td class="refund" data-node="statusDesc">';
	$out+=$escape(statusDesc);
	$out+='</td> <td><a href="/CustomerInfo/showCustomerInfo?id=';
	$out+=$escape(id);
	$out+='" class="check-detail" target="_blank" data-id="';
	$out+=$escape(id);
	$out+='">查看详情</a><a href="javascript:;" class="lh23 ';
	$out+=$escape(cilckStyle);
	$out+='" data-orderid=';
	$out+=$escape(orderid);
	$out+=' data-node="typedesc" data-id="';
	$out+=$escape(id);
	$out+='" >';
	$out+=$escape(showStatus);
	$out+='</a> ';
	if(isThree){
	$out+=' <a href="javascript:;" class="lh23 ';
	$out+=$escape(cilckStyleTow);
	$out+='" data-orderid=';
	$out+=$escape(orderid);
	$out+=' data-node="typedesc" data-id="';
	$out+=$escape(id);
	$out+='" >';
	$out+=$escape(showStatusTow);
	$out+=' ';
	}
	$out+='</td> </tr>';
	return new String($out);
	});

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var deliverGoods = __webpack_require__(61);
	//var dialog = require('dialog');
	var confirm = __webpack_require__(55);
	var url = __webpack_require__(28);
	var fetch = __webpack_require__(2);

	//var tableOrderList= require('./tableOrderList.tpl');
	var getDateList = __webpack_require__(62);
	//var addNullMsg = $("[data-node=addMsgNull]");  // 快递公司 为空提示

	var initDialog = function initDialog(idOrder) {

		//显示弹出框
		getConfirm();
		var orderId = idOrder;

		//输入订单号，事件绑定，判断输入的内容长度
		$("[data-node=logisticNo]").on("keyup", function () {
			//console.log($(this).val().length);

			var NullMsg = $("[data-node=orderNumNull]");

			var html = $(this).val();
			var valLength = $(this).val().length;

			var reg = new RegExp("^[A-Za-z0-9]+$");
			if (!reg.test(html)) {
				NullMsg.css("display", "block");
				NullMsg.html("运单号只能是数字或英文");
				return false;
			}
			if (valLength < 1) {
				//$(this).attr("autocomplete","off");
				NullMsg.css("display", "none");
				//NullMsg.html("运单号不能超过20个字符");
			}
			if (valLength > 20) {
				$(this).attr("autocomplete", "off");
				NullMsg.css("display", "block");
				NullMsg.html("运单号不能超过20个字符");
			} else {
				NullMsg.css("display", "none");
			}
			if (/\s/.test(html)) {
				NullMsg.css("display", "block");
				NullMsg.html("请输入正确的订单号");
				return false;
			}
		});

		//选择物流事件
		var addEvent = {
			$showLogistics: $("[data-node=showLogistics]"),
			$ul: $("[data-node=addMsgUL]"),
			$input: $("[data-node=insertBox]")
		};

		//物流 显示隐藏事件
		addEvent.$showLogistics.on("click", function (event) {
			event.stopPropagation();
			$("[data-node=addMsgNull]").css("display", "none");
			$("[data-node=addMsgNull]").html("");
			if (!addEvent.$ul.hasClass("hasList")) {
				addMessage(addEvent.$ul);
			}
			if (addEvent.$ul.hasClass("show")) {
				addEvent.$ul.addClass("hide").removeClass("show");
			} else {
				addEvent.$ul.addClass("show").removeClass("hide");
			}
		});

		//物流选择－－－ 事件
		addEvent.$ul.on("click", "li", function () {
			var id = $(this).children("a").attr("id");
			var name = $(this).children("a").html();

			addEvent.$input.html(name);
			addEvent.$input.attr("id", id);
			addEvent.$input.attr("data-orderId", orderId);
			addEvent.$ul.addClass("hide").removeClass("show");
			//隐藏提示语？？？？？？		
		});

		//输入的时候，提示隐藏？？？？
	};

	//将物流信息添加到弹出框
	var addMessage = function addMessage($ul) {
		$ul.empty();
		fetch.post(url.get('logisticsList')).then(function (data) {
			if (data.success) {
				var params = data.data;
				var str = "";
				for (var i = 0; i < params.length; i++) {
					var $li = '<li><a href="javascript:;" id="' + params[i].id + '"">' + params[i].name + '</a></li>';
					str += $li;
				}
				$ul.append(str);
				$ul.addClass("hasList show");
			} else {
				//console.log("没获取到信息");
			}
		});
	};

	// 发送 
	var sendMsg = function sendMsg() {
		var NullMsg = $("[data-node=orderNumNull]"); //物流单号为空是提示
		var addNullMsg = $("[data-node=addMsgNull]"); // 快递公司 为空提示
		var $inputVal = $("[data-node=insertBox]"); //物流信息
		var logisticVenderId = $inputVal.attr("id"); //物流订单id
		var orderid = $inputVal.attr("data-orderid"); //订单id
		var logisticNo = $("[data-node=logisticNo]").val(); //物流单号

		NullMsg.css("display", "none");
		addNullMsg.css("display", "none");
		if (!orderid) {
			//快递公司为空
			addNullMsg.css("display", "block");
			addNullMsg.html("快递公司为空，请填写");
			return false;
		}
		if (!logisticNo) {
			//快递单号为空	
			NullMsg.css("display", "block");
			NullMsg.html("运单号不能为空，请填写");
			return false;
		}
		var reg = new RegExp("^[A-Za-z0-9]+$");
		if (!reg.test(logisticNo)) {
			NullMsg.css("display", "block");
			NullMsg.html("运单号只能是数字或英文");
			return false;
		}

		if (/\s/.test(logisticNo)) {
			NullMsg.css("display", "block");
			NullMsg.html("请输入正确的订单号");
			return false;
		}
		if (logisticNo.length > 20) {
			//快递单号为空	
			NullMsg.css("display", "block");
			NullMsg.html("运单号不能超过20个字符");
			return false;
		}

		var sendData = {
			logisticVenderId: parseInt(logisticVenderId),
			orderid: parseInt(orderid),
			logisticNo: logisticNo
		};

		var $table = $("[data-node=afterServiceList]");

		fetch.post(url.get('sendGoods'), { data: sendData }).then(function (data) {

			if (data.success) {
				NullMsg.css("display", "none").html("");
				//如何刷新页面？
				$table.children("tbody").empty();
				getDateList.getDateList(1, 15);
				$("[data-node=loadList]").attr("data-page", 1);
				$("[i=close]").click();
			} else {
				NullMsg.css("display", "block");
				NullMsg.html(data.message);
			}
		});
		return false;
	};

	// 显示弹出口
	var getConfirm = function getConfirm() {
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
	};

	module.exports = initDialog;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/afterService/deliverGoods','<ul class="shipping-input"> <li> <label>选择快递公司：</label> <div class="express-select-box"> <div class="express-select active" data-node="showLogistics" > <div class="selected" data-node="insertBox">请选择</div><em class="icon icon-down icon-up"></em> </div> <ul class="select-list" data-node="addMsgUL" style="max-height:140px;overflow-y:scroll"> </ul> <p class="error-txt" data-node="addMsgNull"></p> </div> </li> <li> <label>选择快递单号：</label> <input type="text" placeholder="请输入20字以内的快递单号" class="express-number" data-node="logisticNo"> <p class="error-txt" data-node="orderNumNull"></p> </li> </ul>');

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var tableOrderList = __webpack_require__(59);

	function checkState(type, status) {
	    var showStatus = "";
	    var cilckStyle = "";
	    var isThree = false;
	    var showStatusTow = "";
	    var cilckStyleTow = "";
	    if (type == 4) {
	        //退款
	        showStatus = "";
	    } else if (type == 2) {
	        //退货
	        if (status == -103) {
	            showStatus = "一键发货";
	            cilckStyle = "deliverGoods";
	        } else if (status == -107 || status == -115 || status == -5 || status == -10) {
	            showStatus = "查看物流";
	            cilckStyle = "checkLogistics";
	        } else if (status == -123) {
	            //
	            showStatus = "确认收货";
	            cilckStyle = "shureGoods";
	        }
	    } else if (type == 3) {
	        if (status == -103) {
	            showStatus = "一键发货";
	            cilckStyle = "deliverGoods";
	        } else if (status == -107 || status == -124 || status == -127 || status == -131) {
	            showStatus = "查看物流";
	            cilckStyle = "checkLogistics";
	        } else if (status == -123) {
	            isThree = true;
	            showStatusTow = "查看物流";
	            cilckStyleTow = "checkLogisticsTwo";

	            showStatus = "确认收货";
	            cilckStyle = "shureGoods";
	        }
	    }

	    return {
	        "showStatus": showStatus,
	        "cilckStyle": cilckStyle,
	        "showStatusTow": showStatusTow,
	        "cilckStyleTow": cilckStyleTow,
	        "isThree": isThree
	    };
	}

	var getDateList = function getDateList(pageNum, pageSize) {
	    var $table = $("[data-node=afterServiceList]");
	    var $loadList = $("[data-node=loadList]");
	    var $loading = $("[data-node=loading]");
	    var $noList = $("[data-node=noList]");
	    //var $deliverGoodsDiv = $(".pop-box-wrap");
	    $loadList.css("display", "none");
	    var params = {
	        "pageNum": pageNum,
	        "pageSize": pageSize
	    };
	    $loading.css("display", "block");
	    fetch.post(url.get('afterServiceList'), {
	        data: params
	    }).then(function (data) {
	        if (data.success) {
	            var dataList = data.data;
	            if (dataList.length > 0) {
	                for (var i = 0; i < dataList.length; i++) {
	                    var type = dataList[i].type; //类型
	                    var status = dataList[i].status; //订单类型
	                    var showStatus = "";
	                    var cilckStyle = "";
	                    var showStatusTow = "";
	                    var cilckStyleTow = "";
	                    var isThree = false;

	                    if (dataList[i].orderType == 6 || dataList[i].orderType == 7) {
	                        var collectMet = dataList[i].collectingMethod;
	                        if (collectMet == "GOME_PICKUP" && status == -103) {
	                            //取货
	                            showStatus = "确认取货";
	                            cilckStyle = "homeServiceClass";
	                        } else if (collectMet == "CUSTOMER_SEND_BACK" && status == -103) {
	                            //买家邮寄
	                            showStatus = "一键发货";
	                            cilckStyle = "deliverGoods";
	                        } else if (collectMet == "CUSTOMER_SEND_BACK" && status == -123) {
	                            //买家邮寄
	                            showStatus = "确认收货";
	                            cilckStyle = "shureGoods";
	                        } else if (collectMet == "GOME_PICKUP" && status == -123) {
	                            //买家邮寄
	                            showStatus = "确认收货";
	                            cilckStyle = "shureGoods";
	                        }
	                    } else {
	                        showStatus = checkState(type, status).showStatus;
	                        cilckStyle = checkState(type, status).cilckStyle;
	                        if (type == 3 && status == -123) {
	                            isThree = checkState(type, status).isThree;
	                            showStatusTow = checkState(type, status).showStatusTow;
	                            cilckStyleTow = checkState(type, status).cilckStyleTow;
	                        }
	                    }

	                    var appendTable = {
	                        isThree: isThree,
	                        showStatusTow: showStatusTow,
	                        cilckStyleTow: cilckStyleTow,
	                        id: dataList[i].id, //数据id
	                        orderid: dataList[i].orderid, //订单id
	                        paymentAmount: dataList[i].paymentAmount, //交易金额
	                        shop_name: dataList[i].shop_name, //商品名称
	                        status: dataList[i].status, //订单类型
	                        statusDesc: dataList[i].statusDesc, //订单类型描述
	                        totalPrice: dataList[i].totalPrice, //退款金额
	                        type: dataList[i].type, //类型
	                        typedesc: dataList[i].typedesc, //类型描述
	                        showStatus: showStatus,
	                        cilckStyle: cilckStyle,
	                        shop_user: dataList[i].mail_name,
	                        createTime: dataList[i].time
	                    };

	                    //console.log(appendTable.shop_name);
	                    var nameStr = "";
	                    //console.log(appendTable.shop_name);
	                    for (var j = 0; j < appendTable.shop_name.length; j++) {
	                        //console.log(appendTable.shop_name[j].name);
	                        nameStr += "<p class='product-name'>" + appendTable.shop_name[j].name + "</p>";
	                    }
	                    appendTable.shop_name = nameStr;
	                    var item = tableOrderList(appendTable);
	                    $table.children("tbody").append(item);
	                    $loading.css("display", "none");
	                    if (dataList.length < 15 && pageNum != 1) {
	                        //$noList.css("display","block");
	                        $loadList.css("display", "none");
	                    } else {
	                        $loadList.css("display", "block");
	                    }

	                    if (pageNum === 1 && dataList.length < 1) {
	                        $noList.css("display", "block");
	                    } else if (pageNum === 1 && dataList.length < 15) {
	                        $loadList.css("display", "none");
	                    }
	                }
	            } else {
	                $loading.css("display", "none");
	                $noList.css("display", "block");
	            }
	        }
	    });
	};

	module.exports = {
	    getDateList: getDateList
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});