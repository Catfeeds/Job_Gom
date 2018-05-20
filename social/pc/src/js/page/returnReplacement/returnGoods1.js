var url = require('io/url');
var fetch = require('io/fetch');
//var dialog = require('dialog');
//var confirm = require('module/popup/confirm');
var alert = require('module/popup/alert');


var $serviceType = $("[data-node=serviceType]"); //申请服务的类型
var $reasionLabel = $("[data-node=reasionLabel]"); //原因
var $returnReason = $("[data-none=returnReason]"); // 列表
var $reasonList = $("[data-node=reasonList]");
var $descLabel = $("[data-node=descLabel]"); //lable
var $reasonDescribe = $("[data-node=reasonDescribe]"); //退货原因描述 
var $sendMsg = $("[data-node=sendMsg]"); //发送
var $cancelMsg = $("[data-node=cancelMsg]"); //取消

//var reduceMaxNum = $("[data-node=inputChooseNum]").attr("data-goodsmaxnum");

var orderTypeEM = $_CONFIG['orderType']; //订单类型
var showPrivEM = $_CONFIG['showPriv']; //退换货状态
//var $extGoBtn = $("[data-node=extGoBtn]");
//var $returnGoBtn = $("[data-node=returnGoBtn]");

var  extGoMsg = [
               "无理由退换货",
               "质量问题",
               "发错商品",
               "工艺做工瑕疵",
               "商品开箱残",
               "商品与描述不符",
               "商品配件少件/破损/污渍等",
               "安装环境受限",
               "安装不及时/安装态度差等",
               "物流服务态度差/配送不及时等",
               "拒收问题",
               "二次销售",
               "特殊退换货",
               "其他原因"
            ];
// 缺少退换货文案

function changeReasion(strArr, type) {
   var str = strArr;
   var typeName = type == 1 ? "退货" : "换货";
   //$serviceType.html("退货");
   $serviceType.attr("data-serviceId", type);
   $reasionLabel.children("span").html(typeName + "原因:");
   $descLabel.children("span").html(typeName + "描述:");
   $reasonList.empty();
   var html = "";
   for (var i = 0; i < str.length; i++) {
      html += '<a href="javascript:;">' + str[i] + '</a>'
   }
   $reasonList.append(html);
}

function getReasonList() {
   //如果有换货
   var returnGoBtnObj = $("[data-btn='goodOption']").children("[data-node=returnGoBtn]");
   var extGoBtnObj = $("[data-btn='goodOption']").children("[data-node=extGoBtn]");
   
   if(orderTypeEM == 6 || orderTypeEM == 7){
         //屏蔽联系商家
         $("[data-node=contactVendor]").addClass("disabled");

         if ( showPrivEM.hasExchangeType) { // 是否有换货
            changeReasion(extGoMsg, 2);
            $('[data-btn="goodOption"]').attr("data-type",2);
         } else {
            // 显示退货
            extGoBtnObj.addClass("disabled").children("em").removeClass("menu-radio-checked"); //换货按钮灰色
            returnGoBtnObj.children("em").addClass("menu-radio-checked");
            changeReasion(extGoMsg, 1);
            $('[data-btn="goodOption"]').attr("data-type",1);
         }
   }else{
         changeReasion(extGoMsg, 2);
         $('[data-btn="goodOption"]').attr("data-type",2);
   }
}

function FnReduceMaxMun() {
   var reduceMaxNum = $("[data-node=inputChooseNum]").attr("data-goodsmaxnum");
   //退换货数量初始化设置 

   // if (reduceMaxNum == 1) {
   //    $("[data-node=inputChooseNum]").attr("readonly", "true");
   //    $("[data-node=reduceNum]").addClass("disabled");
   //    $("[data-node=addNum]").addClass("disabled");
   //    $("[data-node=markedWordNum]").addClass("hide");

   // }
   $("[data-node=reduceNum]").addClass("disabled");
   $("[data-node=addNum]").addClass("disabled");
   $("[data-node=markedWordNum]").addClass("hide");
   $("[data-node=inputChooseNum]").attr("readonly","true");
   $("[data-node=inputChooseNum]").val(reduceMaxNum);

}

// 原因列表
function OnReturnReason(event) {
   event.stopPropagation();
   if ($reasonList.hasClass("hide")) {
      $reasonList.removeClass("hide").addClass("show");
      $returnReason.children("em").removeClass("icon-down").addClass("icon-up");
   } else {
      $reasonList.removeClass("show").addClass("hide");
      $returnReason.children("em").removeClass("icon-up").addClass("icon-down");
   }

}

function OnReasonList(event) {
   event.stopPropagation();
   var resaon = $(this).html();
   $returnReason.children("span").html(resaon);
   $reasonList.removeClass("show").addClass("hide");
   $returnReason.children("em").removeClass("icon-up").addClass("icon-down");
}

function OnBody(event) {
   event.stopPropagation();
   $reasonList.removeClass("show").addClass("hide");
   $("[data-bigToast=toast]").addClass("hide").removeClass("show");
   $returnReason.children("em").removeClass("icon-up").addClass("icon-down");
}

function OnContactVendor(e) {
   if(orderTypeEM == 6 || orderTypeEM == 7){
      return false;
   }else{
       e.stopPropagation();
      var imgPath = $_CONFIG['pcimgpath'];
      alert('<div class="sm-download"><img src="' + imgPath + '/images/public/ma1.jpg"><p>描二维码，下载国美PlusAPP查看消息</p></div>');

   }
  
}

// function OnreduceNum() {

//    if ($(this).hasClass("disabled")) {
//       return false;
//    } else {
//       var num = $("[data-node=inputChooseNum]").val();
//       num--;
//       $("[data-node=markedWordNum]").html("您可提交的数量最多为" + reduceMaxNum + "个，该功能只能操作一次，数量请您斟酌");
//       if (num < 1) {
//          $(this).addClass("disabled");

//          return false;
//       } else if (num == 1) {
//          $(this).addClass("disabled");
//          $("[data-node=inputChooseNum]").val(num);
//          $("[data-node=addNum]").removeClass("disabled");
//       } else {
//          $(this).removeClass("disabled");

//          $("[data-node=addNum]").removeClass("disabled");

//          $("[data-node=inputChooseNum]").val(num);
//       }

//    }

// }

// function OnAddNum() {
//    if ($(this).hasClass("disabled")) {

//       return false;
//    } else {
//       var num = $("[data-node=inputChooseNum]").val();
//       $("[data-node=markedWordNum]").html("您可提交的数量最多为" + reduceMaxNum + "个，该功能只能操作一次，数量请您斟酌");
//       num++;
//       if (num > reduceMaxNum) {
//          $(this).addClass("disabled");
//          return false;
//       } else if (num == reduceMaxNum) {
//          $(this).addClass("disabled");
//          $("[data-node=inputChooseNum]").val(num);
//          $("[data-node=reduceNum]").removeClass("disabled");
//          return false;
//       } else {
//          $(this).removeClass("disabled");
//          $("[data-node=reduceNum]").removeClass("disabled");
//          $("[data-node=inputChooseNum]").val(num);
//       }

//    }
// }

// function OnInputFocus() {

//    var num = $(this).val();
//    var reg = new RegExp("^[0-9]*$");

//    if (reg.test(num) && num < parseInt(reduceMaxNum) && num > 1 && parseInt(num) == num && !$(this).attr("readonly")) {
//       $("[data-node=addNum]").removeClass("disabled");
//       $("[data-node=reduceNum]").removeClass("disabled");
//       return false;
//    } else if (num == parseInt(reduceMaxNum)) {
//       $("[data-node=addNum]").addClass("disabled");
//       $("[data-node=reduceNum]").removeClass("disabled");
//    } else if (num == 1) {
//       $("[data-node=addNum]").removeClass("disabled");
//       $("[data-node=reduceNum]").addClass("disabled");
//    } else {
//       $(this).val(1);
//       $("[data-node=addNum]").removeClass("disabled");
//       $("[data-node=reduceNum]").addClass("disabled");
//       $("[data-node=markedWordNum]").html("您可提交的数量最多为" + reduceMaxNum + "个，该功能只能操作一次，数量请您斟酌");
//    }
// }

function orderCheck(e) {
   e.stopPropagation();
   //var orderid = $_CONFIG['order_id'];
   //判断是不是国美在线的
   $("[data-bigToast=toast]").addClass("hide").removeClass("show");
   var resaonStr = $reasonDescribe.val();

   if (resaonStr.length > 200) {
      $("[data-bigToast=toast]").addClass("show").removeClass("hide").html("最多输入200字");
      setTimeout(function() {
         $("[data-bigToast=toast]").removeClass("show").addClass("hide")
      }, 2000);
      return;
   } else {

      if (orderTypeEM == 6 || orderTypeEM == 7) {
         var checkData = {
            optype: 1,
            itemid: showPrivEM.childId
         }

         fetch.post(url.get('orderCheck'), {
            data: checkData
         }).then(function(data) {

            if (data.success) {
               OnSendMsg();
            } else {
               $("[data-bigToast=toast]").addClass("show").removeClass("hide").html(data.msg);
               setTimeout(function() {
                  $("[data-bigToast=toast]").removeClass("show").addClass("hide");
               }, 2000);
            }

         });

      } else {
         OnSendMsg();
      }
   }

}

function OnSendMsg() {
   var orderid = $_CONFIG['order_id'];
   var resaonStr = $reasonDescribe.val();
   var reasion = $returnReason.children("span").html();
   var type = $('[data-btn="goodOption"]').attr("data-type");
   var sendData = {
      "quantity": $("[data-node=inputChooseNum]").val(),
      "orderid": orderid, //  订单id
      "type": type, //操作类型
      "reasion": reasion, //退换货原因
      "content": resaonStr //描述
   }
   fetch.post(url.get('getRefundInfo'), {
      data: sendData
   }).then(function(data) {
      if (data.success) {
         //页面跳转
         $("[data-bigToast=toast]").addClass("hide").removeClass("show");
         window.location.href = "/CustomerInfo/showCustomerInfo?id=" + data.data.afterSalesOrderId;
      } else {
         $("[data-bigToast=toast]").addClass("show").removeClass("hide").html("提交失败");
         setTimeout(function() {
            $("[data-bigToast=toast]").removeClass("show").addClass("hide")
         }, 2000);
      }
   });
}

function OnCancelMsg(e) {
   e.stopPropagation();
   $("[data-bigToast=toast]").addClass("hide").removeClass("show");
   window.history.go(-1);
}

function OnreasonDescribe() {
   //var spanEle = $(".txt-count").children("span").html();
   var lengthNum = $(this).val().length;
   if (lengthNum >= 201) {
      $(".txt-count").children("span").html("最多输入200字");
   } else {
      $(".txt-count").children("span").html(200 - lengthNum);
   }

}

//退换货事件切换

function OnGoodOption() {
   var $this = $(this);
   var parentObj = $("[data-btn=goodOption]");
   if ($this.hasClass("curBtn") || $this.hasClass("disabled")) { // 屏蔽当前的，或者不可点击的
      return false;
   } else {

      var $extGoBtn = $("[data-node=extGoBtn]");
      var $returnGoBtn = $("[data-node=returnGoBtn]");

      if ($this.attr("data-node") == "extGoBtn") {
         changeReasion(extGoMsg, 2);
         $this.addClass("curBtn");
         $this.children("em").addClass("menu-radio-checked");
         $returnGoBtn.removeClass("curBtn").children("em").removeClass("menu-radio-checked");
         parentObj.attr("data-type",2);
      } else if ($this.attr("data-node") == "returnGoBtn") {

         changeReasion(extGoMsg, 1);
         $this.addClass("curBtn");
         $this.children("em").addClass("menu-radio-checked");
         $extGoBtn.removeClass("curBtn").children("em").removeClass("menu-radio-checked");
         parentObj.attr("data-type",1);
      }
   }
}


//事件绑定
function eventBind() {
   $returnReason.on("click", OnReturnReason);
   $reasonList.on("click", "a", OnReasonList);
   $("body").on("click", OnBody);
   $("[data-btn='goodOption']").on("click", "span", OnGoodOption);
   //联系商家  点击
   $("[data-node='contactVendor']").on("click", OnContactVendor);
   //退换货选择数量  减少 
  // $("[data-node=reduceNum]").on("click", OnreduceNum);
   //退换货选择  增加
  // $("[data-node=addNum]").on("click", OnAddNum);
   //$("[data-node=inputChooseNum]").on("focusout", OnInputFocus);
   //发送请求
   $sendMsg.on("click", orderCheck);
   //取消
   $cancelMsg.on("click", OnCancelMsg);
   //输入框数字验证
   $reasonDescribe.on("keyup", OnreasonDescribe);
}



function init() {

   //$("ul.input-apllication").prepend("<li><span data-node='returnGoBtn' data-btn='goodOption'>退货</span>&nbsp;<span data-btn='goodOption' data-node='extGoBtn'>换货</span></li>");
   getReasonList();
   //$reasonList.addClass("hide");
   $returnReason.children("em").removeClass("icon-up")
   FnReduceMaxMun();
   eventBind();
}
module.exports = {
   init: init
}