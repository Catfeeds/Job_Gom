webpackJsonp([47],{0:function(t,n,e){(function($,t){"use strict";var n=e(2),s=e(28),o=e(36),a=e(65),i=e(64),r=e(66);e(46);var d=o.msgCode,c=$("[data-node=formBox]"),u=c.find("[data-node=publicErr]"),f=c.find("[data-node=errText]"),l=c.find("[data-node=codeLi]"),C=c.find("[data-action=sendMsg]"),v=c.find("[data-node=msgCode]"),h=c.find("[data-node=codeTip]"),g=c.find("[data-node=codeIcon]"),m=c.find("[data-node=codeText]"),p=c.find("[data-action=nextStep]"),x=1,A="hide",k="lg-form-error",w="code-tip",b="code-disabled",y="active",N=function(){u.addClass(A)},z=function(t){u.removeClass(A),f.text(t)},Z=function(){return!!x&&(x=0,n.get(s.get("sendOldCode")).done(function(t){t.success?(h.removeClass(A),g.removeClass(A),m.text(d.send),l.removeClass(k).addClass(w),N(),new a(60,{onChange:function(t){C.text(t+o.msgCode.btnAfterSend).addClass(b)},onFinish:function(){x=1,C.text(o.msgCode.btnDefault).removeClass(b)}})):(z(t.message),x=1)}).fail(function(){x=1,z(o.errLine.tip)}),!1)},E=function(){l.hasClass(k)&&(h.addClass(A),l.removeClass(k).addClass(w)),N()},F=function(){var t=v.val(),n=t.length;n>6&&v.val(r(t,6)),t?p.addClass(y):p.removeClass(y)},M=function(){var t=!0,n=v.val(),e=n.length;return i.isMsgCode(n)?t=!0:(t=!1,l.removeClass(w).addClass(k),h.removeClass(A),g.addClass(A),e?m.text(d.tipErr):m.text(d.tipEpt)),t},S=function(){var e=v.val(),a=M();if(a){var i={verifyCode:e};n.post(s.get("checkOldCode"),{data:i}).done(function(n){n.success?location.href=t.i_domain+"bind/secondStep":z(n.message)}).fail(function(){z(o.errLine.tip)})}},T=function(){v.placeholder(),C.on("click",Z),v.on({focus:E,keyup:F,blur:M}),p.on("click",S)};T()}).call(n,e(1),e(4))},64:function(t,n){"use strict";var e={checkVal:function(t,n){return n.test(t)},isMobileNum:function(t){return/^1[34578][0-9]{9}$/.test(t)},isEmail:function(t){return/w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(t)},isCertificate:function(t){return/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(t)},isCID:function(t){return/^(\d{16}|\d{19})$/.test(t)},isCWord:function(t,n,e){n=!isNaN(n)&&n>0?n:1,e=!isNaN(e)&&e>0?e:"";var s=new RegExp("^[\\u4e00-\\u9fa5]{"+n+","+e+"}$");return s.test(t)},isArray:function(t){return Array.isArray(t)||t instanceof Array},passwordReg:function(t){var n=/^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，\"\,\:\;；,\.‘’“”：'"\·`【】])|(?=.*?[A-Za-z])(?=.*?[<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，；‘’“”：'"\·`,\.【】]))[\dA-Za-z<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，；‘’“”：'"\·`,\.【】]{6,21}$/;return n.test(t)},checkSpace:function(t){var n=/\s+/;return n.test(t)},checkRefCode:function(t){var n=/^[0-9a-zA-Z]{8}$/;return n.test(t)},checkNickName:function(t){var n=/^([\u4e00-\u9fa5]|[0-9a-zA-Z_-])+$/;return n.test(t)},isMsgCode:function(t){var n=/^\d{6}$/;return n.test(t)},isImgCode:function(t){var n=/^[0-9a-zA-Z]{4}$/;return n.test(t)}};t.exports=e},65:function(t,n){"use strict";var e=function(){},s=function(t,n){this.onChange=n.onChange||e,this.onFinish=n.onFinish||e,this.count=t||60,this.start()};s.prototype.start=function(){var t=this;setTimeout(function(){t.onChange(t.count),t.count--,t.count<=0?t.onFinish():t.start()},1e3)},t.exports=s},66:function(t,n){"use strict";function e(t,n){return t.length>n?t.substr(0,n):t}t.exports=e}});