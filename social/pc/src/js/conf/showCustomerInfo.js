webpackJsonp([34],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	var alert = __webpack_require__(37);
	var initDialog = __webpack_require__(268);
	var confirm = __webpack_require__(55);
	var url = __webpack_require__(28);
	var fetch = __webpack_require__(2);

	//判断是否屏蔽联系商家
	if ($_CONFIG['type'] == 6 || $_CONFIG['type'] == 7) {
	    $("[data-node=tell_buger]").addClass("disabled");
	} else {
	    $("[data-node=tell_buger]").on("click", function () {
	        var imgPath = $_CONFIG['imgpath'];
	        alert('<div class="sm-download"><img src="' + imgPath + '/images/public/ma1.jpg"><p>描二维码，下载国美PlusAPP查看消息</p></div>');
	    });
	}

	$("[data-node=clickBtn]").on("click", function () {
	    var id = $("[data-node=goods_id]").html();
	    if ($(this).hasClass("sendgoods")) {
	        initDialog(id, callBackFn);
	    } else if ($(this).hasClass("getgoods")) {
	        homeService(id);
	    }
	});

	function callBackFn() {
	    window.location.reload();
	    return false;
	}
	// 上门取件弹出框
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
	        content: '<h3 class="two-title" data-idShure=' + pid + ' data-node="shureP" >' + pSpan + '</h3><p class="pay-pop-p   pay-pop-text">' + titSpan + '</p><div data-node="togoleDiv"  style="text-align:center;font-size:12px;color:red;padding-bottom:10px;" ></div>',
	        className: 'pop-box pop-pad-btm65',
	        okCls: 'pc-btn pc-btnh40 pc-btnw120',
	        cancelCls: 'queren-btn pc-btnh40 pc-btnw120',
	        ok: function ok() {
	            $("[data-node=togoleDiv]").html("");
	            fetch.get(url.get('orderSendGood') + "?orderid=" + id).then(function (data) {
	                if (data.success) {
	                    //刷新页面
	                    $("button[i=close]").click();
	                    window.location.reload();
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

	// function addFn(){
	// 	window.location.reload();
	// }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

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

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var deliverGoods = __webpack_require__(269);
	var dialog = __webpack_require__(22);
	var confirm = __webpack_require__(55);
	var url = __webpack_require__(28);
	var fetch = __webpack_require__(2);

	var initDialog = function initDialog(idOrder, callback) {

	    //显示弹出框
	    getConfirm(callback);
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
	            console.log("没获取到信息");
	        }
	    });
	};

	// 发送 
	var sendMsg = function sendMsg(callback) {
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

	    fetch.post(url.get('sendGoods'), {
	        data: sendData
	    }).then(function (data) {
	        if (data.success) {
	            NullMsg.css("display", "none");
	            NullMsg.html("");
	            callback();
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
	var getConfirm = function getConfirm(callback) {
	    confirm('', {
	        width: 600,
	        fixed: true,
	        modal: true,
	        title: '一键发货',
	        content: deliverGoods,
	        className: 'pop-box pop-pad-btm65',
	        okCls: 'pc-btn pc-btnh40 pc-btnw120',
	        cancelCls: 'queren-btn pc-btnh40 pc-btnw120',
	        ok: function ok() {
	            return sendMsg(callback);
	        },
	        btnWrapCls: 'two-buttons'
	    });
	};

	module.exports = initDialog;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/onekeydeliver/deliverGoods','<ul class="shipping-input"> <li> <label>选择快递公司：</label> <div class="express-select-box"> <div class="express-select active" data-node="showLogistics" > <div class="selected" data-node="insertBox">请选择</div><em class="icon icon-down icon-up"></em> </div> <ul class="select-list" data-node="addMsgUL" style="max-height:140px;overflow-y:scroll"> </ul> <p class="error-txt" data-node="addMsgNull"></p> </div> </li> <li> <label>选择快递单号：</label> <input type="text" placeholder="请输入20字以内的快递单号" class="express-number" data-node="logisticNo"> <p class="error-txt" data-node="orderNumNull"></p> </li> </ul>');

/***/ }

});