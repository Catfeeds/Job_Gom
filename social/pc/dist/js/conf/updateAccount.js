webpackJsonp([52],{0:function(n,e,o){(function($,n){"use strict";function e(n){n.val().length>4&&n.val(f(n.val(),4))}function a(){return d.valid()?!!r(g)&&(i()?u(g):l(g),!1):(c("你没有通过协议,请刷新页面重试"),!1)}function t(){i()?d.init(n.main_domain):d.init(),v.on("click",a),p.on("textchange",function(){e($(this))}),h.on("click",function(){s(m,p,h)}),p.on("keydown",function(){k.addClass("none")})}var i=o(47),d=o(244),c=(o(2),o(28),o(37)),r=o(44),s=o(45),f=(o(40),o(42)),u=o(354),l=o(356),g=$("[data-node=userForm]"),v=g.find("[data-node=userLogin]"),m=g.find("[data-node=identifyplace]"),p=g.find("[data-node=code]"),h=g.find("[data-node=change-code]"),k=g.find("[data-node=error]");g.find("[data-node=userLogin]"),$("[data-node=remainTime]");t()}).call(e,o(1),o(4))},244:function(n,e,o){(function($,e){"use strict";var o=$("[data-node=ssoMask]"),a=$("[data-node=ssoMain]"),t=a.find("em.icon-btn"),i=a.find("a.pc-btnw300.pc-btn.pc-btnh45"),d=!1,c=function(n){var c=n||!1,r=function(){o.addClass("hide"),a.addClass("hide"),d=!0},s=function(){return c?(location.href=c,!1):void(""==document.referrer?location.href=e.main_domain:location.href=document.referrer)};i.on("click",r),t.on("click",s)},r=function(){return d};n.exports={init:c,valid:r}}).call(e,o(1),o(4))},354:function(n,e,o){"use strict";function a(n){var e=n.find("[data-node=userLogin]");r||(r=!0,e.text("升级中..."),t.get(i.get("accountUpgrade")).done(function(n){n&&n.success&&200==n.code?c("升级成功"):d(n.message)}).fail(function(n){d(n.message)}).always(function(){e.text("升级一账通账户"),r=!1}))}var t=o(2),i=o(28),d=o(37),c=o(355),r=!1;n.exports=a},355:function(n,e,o){(function(e){"use strict";function a(n){t(n,{okValue:"回到首页",cancel:!1,ok:function(){window.location.href=e.main_domain}})}var t=o(37);n.exports=a}).call(e,o(4))},356:function(n,e,o){(function(e,$){"use strict";function a(n){function e(n){m.removeClass("none"),p.text(n)}if(!f){f=!0;var o=(n.find("[data-node=userLogin]"),n.find("[data-node=identifyplace]")),a=n.find("[data-node=code]"),u=n.find("[data-node=change-code]"),l=n.find($("[data-node=userNum]")),g=n.find($("[data-node=userPwd]")),v=n.find("[data-node=userLogin]"),m=n.find("[data-node=error]"),p=n.find("[data-node=error-message]"),h={login_name:l.val(),password:c(g.val()),setid:"login",verifyCode:a.val(),csrf_token:$GLOBAL_CONFIG.csrf_token,isAuthorized:!0};return v.text("升级中..."),t.post(i.get("ajaxLoginData"),{async:!1,data:h,headers:{"Content-Type-Ctag":$.cookie("content_ctag")||""}}).done(function(n){if(n&&n.success){var t=n.data;if(0==t.user.isMobileActivated)return void(window.location.href=s+"login/bindphonepage");if(t.isNeedReset)return void(window.location.href=s+"regist/indexnickname");r(n.data.authorizedMessage)}else 1==n.data.is_code&&d(o,a,u),e(n.message)}).always(function(){f=!1,v.text("升级一账通账户")}),!1}}var t=o(2),i=o(28),d=o(45),c=o(40),r=o(355),s=e.passport_domain,f=!1;n.exports=a}).call(e,o(4),o(1))}});