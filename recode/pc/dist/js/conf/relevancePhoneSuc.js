webpackJsonp([20],{"0":function(n,exports,t){(function($,n){"use strict";var o=t(209),i=$("[data-node=countdown]");new o(5,{"onChange":function(n){i.text(n+" ")},"onFinish":function(){location.href=n.redirect}})}).call(exports,t(2),t(3))},"209":function(n,exports){"use strict";var t=function(){},o=function(n,o){this.onChange=o.onChange||t,this.onFinish=o.onFinish||t,this.count=n||60,this.start()};o.prototype.start=function(){var n=this;setTimeout(function(){n.onChange(n.count),n.count--,n.count<=0?n.onFinish():n.start()},1e3)},n.exports=o}});
//# sourceMappingURL=relevancePhoneSuc.js.map