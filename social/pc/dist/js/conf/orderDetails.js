webpackJsonp([19],{0:function(a,n,t){(function($,a){"use strict";function n(){$("[data-node=paySubmit]").on("click","label",function(){var a=$(this),n="menu-radio-checked",t="[data-action=payRadio]",o=a.find(t),e=a.find("input").val(),i="active";switch(o.addClass(n),a.siblings().find(t).removeClass(n),a.addClass(i).siblings("label").removeClass(i),e){case"110004":u="wx";break;case"210004":u="zfb"}})}function o(){r("请您到新打开的网银页面上进行支付，支付完成前请不要关闭窗口。",{content:'<p class="pay-pop-p"><em class="iconn-12"></em>请您到新打开的网银页面上进行支付，支付完成前请不要关闭窗口。</p>',title:"温馨提示",okCls:"pay-finished-btn",okValue:"已完成支付",ok:function(){window.location.href=a.i_domain+"order/"},cancelCls:"pay-failed-btn",cancelValue:"支付遇到问题",btnWrapCls:"pay-prompt-buttons"})}function e(){c.post(d.get("checkOrderPay"),{async:!1,data:{orderid:p.mergerId}}).done(function(n){var t=navigator.userAgent.toLowerCase(),e=t.indexOf("windowswechat")>0;n.success===!0?($("[data-node=paySubmit]").submit(),e||o()):location.href=a.order_domain+"order/show?orderid="+p.mergerId}).fail(function(a){s("提交失败，网络似乎有问题~")})}function i(){n(),$("[data-action=paySubmit]").on("click",e)}var c=t(2),d=t(28),s=t(37),r=t(55),l=$("[data-node=orderState]"),p=(l.find("[data-action=subOrder]"),l.find("[data-action=payRadio]"),$GLOBAL_CONFIG.orderDetail),u=($GLOBAL_CONFIG.fid,"wx");i()}).call(n,t(1),t(4))},55:function(a,n,t){(function($){"use strict";var n=t(22),o=function(){},e=function(a,t){var e={fixed:!0,modal:!0,content:'<p class="del-pop-p">'+a+"</p>",className:"pop-box",okCls:"pc-btn pc-btnh35 circle-pop-btn",ok:o,cancel:o,btnWrapCls:"two-buttons"};$.extend(!0,e,t);var i=n(e);return i.show(),i};a.exports=e}).call(n,t(1))}});