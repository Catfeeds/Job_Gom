webpackJsonp([46],{0:function(t,i,n){"use strict";n(334).init(),n(335).init()},55:function(t,i,n){(function($){"use strict";var i=n(22),o=function(){},c=function(t,n){var c={fixed:!0,modal:!0,content:'<p class="del-pop-p">'+t+"</p>",className:"pop-box",okCls:"pc-btn pc-btnh35 circle-pop-btn",ok:o,cancel:o,btnWrapCls:"two-buttons"};$.extend(!0,c,n);var e=i(c);return e.show(),e};t.exports=c}).call(i,n(1))},87:function(t,i,n){(function($){"use strict";var i,n,o,c=function(){i.off().on("click",function(){i.hide(),n.hide()}),n.off().on("click",function(){i.hide(),n.hide()})},e=function(t,e){var a={duration:2e3,callback:function(){}};$.extend(a,e||{}),clearTimeout(o),i=$('[data-action="publicMask"]'),n=$('[data-action="publicTips"]'),i.length>0?(i.show(),n.show().text(t)):($("body").append('<div data-action="publicMask" class="ordi-toast"></div><div class="ordi-toast-txt" data-action="publicTips">'+t+"</div>"),i=$('[data-action="publicMask"]'),n=$('[data-action="publicTips"]'),c()),n.css("margin",-n[0].offsetHeight/2+"px 0 0 "+-n.width()/2+"px"),o=setTimeout(function(){i.hide(),n.hide(),a.callback()},a.duration)};t.exports={init:e,events:c}}).call(i,n(1))},324:function(t,i,n){(function(i){"use strict";var o=n(37),c=function(){var t=i.imgpath;o("",{okCls:"hide",content:'<div class="sm-download"><img src="'+t+'/images/public/ma1.jpg"><p>扫描二维码，下载国美PlusAPP联系商家</p></div>'})};t.exports=c}).call(i,n(4))},328:function(t,i,n){"use strict";var o=n(2),c=n(28),e=n(55),a=n(87).init,s={confirmReceipt:"确认已收到货了吗？",confirmFail:"确认收货失败!网络可能出问题了~",delayReceipt:"确认延长7天收货时间吗？",delayFail:"延迟收货失败！网络可能出问题了~",confirmed:"已经确认收货"},d=function(t){e(s.confirmReceipt,{title:"确认收货",width:500,className:"pop-box",btnWrapCls:"text-center",okCls:"two-button two-button-red",cancelCls:"two-button",ok:function(){o.post(c.get("confirmReceipt"),{data:{orderId:t.orderId,orderDeliveryId:t.postId}}).done(function(i){var n=i.data,o=n.status,c="交易成功";return i.success===!0?void t.okFn(c):void(3==o?(a(s.confirmed),t.okFn(c)):a(i.message))}).fail(function(){a(s.confirmFail)})}})},r=function(t){e(s.delayReceipt,{title:"延迟收货",width:500,className:"pop-box",btnWrapCls:"text-center",okCls:"two-button two-button-red",cancelCls:"two-button",ok:function(){o.post(c.get("delayReceipt"),{data:{orderId:t.id}}).done(function(i){i.success===!0?t.okFn():(a(i.message),setTimeout(function(){location.reload()},2e3))}).fail(function(){a(s.delayFail)})}})};t.exports={confirmReceipt:d,delayReceipt:r}},334:function(t,i,n){(function($){"use strict";var i=n(87).init,o=n(328),c="[data-action=confirmReceipt]",e="[data-action=delayReceipt]",a=$("[data-node=orderList]"),s=function(){a.on("click",c,function(){var t=$(this),i=t.data("orderid"),n=t.data("postid");o.confirmReceipt({orderId:i,postId:n,okFn:function(){location.reload()}})})},d=function(){a.on("click",e,function(){var t="order-blank-btn-disabled",n=$(this),c=n.data("id"),e=n.hasClass(t);return!e&&void o.delayReceipt({id:c,okFn:function(){i("操作成功"),n.remove()}})})},r=function(){s(),d()};t.exports={init:r}}).call(i,n(1))},335:function(t,i,n){(function($){"use strict";var i=n(324),o=function(){var t=$("[data-node=orderList]"),n="[data-action=ContactMerchant]";t.on("click",n,function(){i()})};t.exports={init:o}}).call(i,n(1))}});