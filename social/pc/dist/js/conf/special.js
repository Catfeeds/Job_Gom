webpackJsonp([35],[function(a,t,n){(function($){"use strict";var a=n(2),t=n(28),i=n(37),d=$("[data-node=nav]"),o=$("[data-node=sideNav]"),e=$("[data-action=ticket]"),c=$("[data-action=top]"),s=$(document),l="active";$("div[data-sort]").eq(0).css({padding:"10px 0 0 0"}),o.css({"margin-bottom":-(o.height()/2)});var r=function(){var a=$(this),t=a.parent(),n=[],i=a.data("name"),d=a.data("rand");return!a.hasClass(l+d)&&($.each(t.find("a"),function(a,i){n.push($(i).data("rand")),t.find("a").removeClass(l+n[a])}),a.addClass(l+d),t.nextAll().hide(),t.nextAll("div[data-name="+i+"]").show(),void 0)},u=function(){var a=$(this).data("modelindex"),t=s.find("div[data-sort="+a+"]"),n=t.offset().top;s.scrollTop(n)},f=function n(d){a.post(t.get("cartGetRedPacket"),{validate:!0,data:{batchSn:d},onLogin:function(){n(d)}}).done(function(a){var t=a.data.userRemainingAvailableQuantity,n="您还可以领取"+t+"次";t<1&&(n="领取次数已达上限"),i(a&&a.success&&200===a.code?"领取成功！优惠券已放入您的个人账户！<br>"+n:a.message)}).fail(function(a){i(a.message)})},v=function(){var a=$(this),t=a.data("id");f(t)},h=function(){s.scrollTop(0)};d.on("click","a",r),o.on("click","a[data-modelindex]",u),e.on("click",v),c.on("click",h)}).call(t,n(1))}]);