webpackJsonp([25],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var returnGoods = __webpack_require__(204);
	returnGoods.init();

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var Dialog = __webpack_require__(22);
	var noop = function() {};

	var create = function(content, options) {
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

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var url = __webpack_require__(28);
	var fetch = __webpack_require__(2);
	var dialog = __webpack_require__(22);
	var confirm = __webpack_require__(53);
	var alert = __webpack_require__(36);
	var init = function (){
	   var type = $GLOBAL_CONFIG['optype'];
	  // type = 2;
	   var $serviceType  = $("[data-node=serviceType]"); //申请服务的类型
	   var $reasionLabel = $("[data-node=reasionLabel]");//原因
	   var $returnReason = $("[data-none=returnReason]"); // 列表
	   var $reasonList = $("[data-node=reasonList]");
	   var $descLabel = $("[data-node=descLabel]"); //lable
	   var $reasonDescribe = $("[data-node=reasonDescribe]");//退货原因描述 
	   var $sendMsg = $("[data-node=sendMsg]"); //发送
	   var $cancelMsg = $("[data-node=cancelMsg]");  //取消

	   //初始化申请服务类型
	   $reasonList.addClass("hide");
	   if(type===1){
	   	var str = ["破损问题", "尺寸问题","认为是假货","其他"];
	   		$serviceType.html("退货");
	   		$serviceType.attr("data-serviceId","1");
	   		$reasionLabel.children("span").html("退货原因:");
	   		$descLabel.children("span").html("退货描述:");
	   		$reasonList.empty();
	   		var html="";
	   		for(var i = 0;i<str.length;i++){
	   			html += '<a href="javascript:;">'+str[i]+'</a>'
	   		}
	   		$reasonList.append(html);

	   }else{
	   	var str = ["尺寸问题", "发错货了","质量问题","其他"];
	   		$serviceType.html("换货");
	   		$serviceType.attr("data-serviceId","2");
	   		$reasionLabel.children("span").html("换货原因:");
	   		$descLabel.children("span").html("换货描述:");
	   		$reasonList.empty();
	   		var html="";
	   		for(var i = 0;i<str.length;i++){
	   			html += '<a href="javascript:;">'+str[i]+'</a>'
	   		}
	   		$reasonList.append(html);
	   }

	   $returnReason.children("em").removeClass("icon-up")

	   //
	   $returnReason.on("click",function(event){
	   		event.stopPropagation();
	   		if($reasonList.hasClass("hide")){
	   			$reasonList.removeClass("hide").addClass("show");
	            $returnReason.children("em").removeClass("icon-down").addClass("icon-up");
	   		}else{
	   			$reasonList.removeClass("show").addClass("hide");
	            $returnReason.children("em").removeClass("icon-up").addClass("icon-down");
	   		}
	   });
	   //
	   $reasonList.on("click","a",function(event){
	   		event.stopPropagation();
	   		var resaon = $(this).html();
	   		$returnReason.children("span").html(resaon);
	   		$reasonList.removeClass("show").addClass("hide");
	   		$returnReason.children("em").removeClass("icon-up").addClass("icon-down");
	   });
	   //
	   $("body").on("click",function(event){
	   		event.stopPropagation();
	   		$reasonList.removeClass("show").addClass("hide");
	         $("[data-bigToast=toast]").addClass("hide").removeClass("show");
	         $returnReason.children("em").removeClass("icon-up").addClass("icon-down");
	   });
	   //联系商家  点击
	   $("[data-node='contactVendor']").on("click",function(e){
	      e.stopPropagation();
	       var imgPath = $GLOBAL_CONFIG['pcimgpath'];
	         alert('<div class="sm-download"><img src="'+imgPath+'/images/public/ma1.jpg"><p>描二维码，下载国美+APP查看消息</p></div>');
	         
	   });


	   var reduceMaxNum  = $("[data-node=inputChooseNum]").attr("data-goodsmaxnum");

	   $("[data-node=reduceNum]").addClass("disabled");
	   $("[data-node=addNum]").addClass("disabled");
	   $("[data-node=markedWordNum]").addClass("hide");
	   $("[data-node=inputChooseNum]").attr("readonly","true");
	   $("[data-node=inputChooseNum]").val(reduceMaxNum);

	  /* 
	   //退换货数量初始化设置 
	   if(reduceMaxNum == 1){
	      $("[data-node=inputChooseNum]").attr("readonly","true");
	      $("[data-node=reduceNum]").addClass("disabled");
	      $("[data-node=addNum]").addClass("disabled");
	      $("[data-node=markedWordNum]").addClass("hide");

	   }

	   //退换货选择数量  减少 
	   $("[data-node=reduceNum]").on("click", function(){
	         
	         if($(this).hasClass("disabled")){
	            return false;
	         }else{
	            var num = $("[data-node=inputChooseNum]").val();
	            num--;
	            $("[data-node=markedWordNum]").html("您可提交的数量最多为"+reduceMaxNum+"个，该功能只能操作一次，数量请您斟酌");
	            if(num < 1){
	               $(this).addClass("disabled");
	               
	               return false;
	            }else if(num ==1 ){
	               $(this).addClass("disabled");
	               $("[data-node=inputChooseNum]").val(num);
	            }else{
	               $(this).removeClass("disabled");
	               
	               $("[data-node=addNum]").removeClass("disabled");
	               
	               $("[data-node=inputChooseNum]").val(num);
	            }
	            
	         }
	         
	   });


	   //退换货选择  增加
	   $("[data-node=addNum]").on("click", function(){

	      if($(this).hasClass("disabled")){

	            return false;
	         }else{
	            var num = $("[data-node=inputChooseNum]").val();
	             $("[data-node=markedWordNum]").html("您可提交的数量最多为"+reduceMaxNum+"个，该功能只能操作一次，数量请您斟酌");
	            num++;
	            if(num > reduceMaxNum){
	               $(this).addClass("disabled");
	               return false;
	            }else if(num == reduceMaxNum){
	               $(this).addClass("disabled");
	               $("[data-node=inputChooseNum]").val(num);
	               return false;
	            }else{
	               $(this).removeClass("disabled");
	               $("[data-node=reduceNum]").removeClass("disabled");
	               $("[data-node=inputChooseNum]").val(num);
	            }
	            
	         }
	   });
	   

	  $("[data-node=inputChooseNum]").on("focusout",function(){
	      var num = $(this).val();
	      var reg = new RegExp("^[0-9]*$");
	      if( reg.test(num) && num < parseInt(reduceMaxNum)  && num > 1 && parseInt(num)==num && !$(this).attr("readonly")){
	         $("[data-node=addNum]").removeClass("disabled");
	         $("[data-node=reduceNum]").removeClass("disabled");
	         return false;
	      }else if(num==parseInt(reduceMaxNum)){
	         $("[data-node=addNum]").addClass("disabled");
	         $("[data-node=reduceNum]").removeClass("disabled");
	      }else if(num==1){
	         $("[data-node=addNum]").removeClass("disabled");
	         $("[data-node=reduceNum]").addClass("disabled");
	      }else{
	         $(this).val(1);
	         $("[data-node=addNum]").removeClass("disabled");
	         $("[data-node=reduceNum]").addClass("disabled");
	         $("[data-node=markedWordNum]").html("您可提交的数量最多为"+reduceMaxNum+"个，该功能只能操作一次，数量请您斟酌");
	      }
	  });

	*/
	   //发送请求
	   $sendMsg.on("click",function(event){
	      event.stopPropagation();
	      $("[data-bigToast=toast]").addClass("hide").removeClass("show");
	   	var resaonStr = $reasonDescribe.val();
	   	var reasion = $returnReason.children("span").html();
	   	//var orderid = $("[data-node=orderNum]").html();
	   	var orderid = $GLOBAL_CONFIG['order_id'];
	      var sendData = {
	            "quantity" : $("[data-node=inputChooseNum]").val(),
		   		"orderid" : orderid ,//  订单id
				   "type" :  type,//操作类型
				   "reasion" :reasion, //退换货原因
				   "content" : resaonStr //描述
			}

	      if(resaonStr.length >200){
	         $("[data-bigToast=toast]").removeClass("show").removeClass("hide").html("最多输入200字");
	          setTimeout(function(){
	                  $("[data-bigToast=toast]").removeClass("show").addClass("hide")
	               },2000);
	         return ;
	      }else{

	         fetch.post(url.get('getRefundInfo'),{
	            data: sendData
	         }).then(function(data){
	            console.log(data.data)
	            if(data.success){
	               //页面跳转
	               $("[data-bigToast=toast]").addClass("hide").removeClass("show");
	               window.location.href="/CustomerInfo/showCustomerInfo?id="+data.data.afterSalesOrderId;
	            }else{
	               $("[data-bigToast=toast]").addClass("show").removeClass("hide").html("提交失败");
	              setTimeout(function(){
	                  $("[data-bigToast=toast]").removeClass("show").addClass("hide")
	               },2000);
	            }
	         });
	      }

	    

	   });

	   //取消
	   $cancelMsg.on("click",function(e){
	      e.stopPropagation();
	      $("[data-bigToast=toast]").addClass("hide").removeClass("show");
	      //var iddon = $("[data-node=orderNum]").html();
	      　//var str = "/order/detail?id="+ parseInt(iddon);
	      window.history.go(-1);
	     // $(this).attr("href",str);
	   });

	   //输入框数字验证
	   $reasonDescribe.on("keyup",function(){
	      
	      var spanEle = $(".txt-count").children("span").html();
	      var lengthNum = $(this).val().length;
	      if(lengthNum >=201){
	         $(".txt-count").children("span").html("最多输入200字");
	         //$(this).attr("readonly","readonly");
	      }else{
	         $(".txt-count").children("span").html(200-lengthNum);
	      }
	      
	   });
	}



	module.exports = {
		init :init
	}


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});