webpackJsonp([5],{"0":function(n,exports,t){(function(n,$){"use strict";var e=(t(21),t(45)),a=(t(24),t(72)),i="喜欢你，abc受身蹲伏";console.log(a(i,10));var r=(t(90),t(91),t(97),t(99),t(36),t(65),t(103));r.shareItem("[data-action=shareList]");var o=t(105);console.log(o.format(Date.now(),"YYYY-MM-DD"));var s=function(n){console.log(n.title)};e("mailArrived").sub(s),e("mailArrived").pub({"title":"value from publish uu "}),console.log(n),$("[data-trigger=spinner]").spinner({"delay":200,"min":1,"max":3,"beforeChange":function(){return console.log(this),!1},"rangemin":function(){console.log("range min")},"rangemax":function(){console.log("range max")},"changed":function(n,t,e){console.log(arguments)}})}).call(exports,t(2),t(2))},"34":function(n,exports){!function(){function t(n,t){return(/string|function/.test(typeof t)?d:s)(n,t)}function e(n,t){return"string"!=typeof n&&(t=typeof n,"number"===t?n+="":n="function"===t?e(n.call(n)):""),n}function a(n){return p[n]}function i(n){return e(n).replace(/&(?![\w#]+;)|[<>"']/g,a)}function r(n,t){if(h(n))for(var e=0,a=n.length;a>e;e++)t.call(n,n[e],e,n);else for(e in n)t.call(n,n[e],e)}function o(n,t){var e=/(\/)[^\/]+\1\.\.\1/,a=("./"+n).replace(/[^\/]+$/,""),i=a+t;for(i=i.replace(/\/\.\//g,"/");i.match(e);)i=i.replace(e,"/");return i}function s(n,e){var a=t.get(n)||c({"filename":n,"name":"Render Error","message":"Template not found"});return e?a(e):a}function d(n,t){if("string"==typeof t){var e=t;t=function(){return new u(e)}}var a=l[n]=function(e){try{return new t(e,n)+""}catch(n){return c(n)()}};return a.prototype=t.prototype=f,a.toString=function(){return t+""},a}function c(n){var t="{Template Error}",e=n.stack||"";if(e)e=e.split("\n").slice(0,2).join("\n");else for(var a in n)e+="<"+a+">\n"+n[a]+"\n\n";return function(){return"object"==typeof console&&console.error(t+"\n\n"+e),t}}var l=t.cache={},u=this.String,p={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},h=Array.isArray||function(n){return"[object Array]"==={}.toString.call(n)},f=t.utils={"$helpers":{},"$include":function(n,t,e){return n=o(e,n),s(n,t)},"$string":e,"$escape":i,"$each":r},m=t.helpers=f.$helpers;t.get=function(n){return l[n.replace(/^\.\//,"")]},t.helper=function(n,t){m[n]=t},n.exports=t}()},"36":function(n,exports,t){(function($){"use strict";var e=t(37),a=function(){},i=function(n,t){n=n||"",t=t||{};var i={"fixed":!0,"modal":!0,"autofocus":!1,"content":'<p class="del-pop-p">'+n+"</p>","className":"pop-box","okCls":"pc-btn pc-btnh35 circle-pop-btn","ok":a};$.extend(!0,i,t);var r=e(i),o=r._$("header"),s=r._$("title");return t.title||s.css("borderBottom","none"),o.show(),r.show(),r};n.exports=i}).call(exports,t(2))},"65":function(n,exports,t){(function($){"use strict";var e=t(37),a=function(){},i=function(n,t){var i={"fixed":!0,"modal":!0,"content":'<p class="del-pop-p">'+n+"</p>","className":"pop-box","okCls":"pc-btn pc-btnh35 circle-pop-btn","ok":a,"cancel":a,"btnWrapCls":"two-buttons"};$.extend(!0,i,t);var r=e(i);return r.show(),r};n.exports=i}).call(exports,t(2))},"72":function(n,exports,t){"use strict";function e(n){return n>=55296&&n<=56319}function a(n){return n>=56320&&n<=57343}function i(n,t){if("string"!=typeof n)throw new Error("Input must be string");for(var i,o,s=n.length,d=0,c=0;c<s;c+=1){if(i=n.charCodeAt(c),o=n[c],e(i)&&a(n.charCodeAt(c+1))&&(c+=1,o+=n[c]),d+=r(o),d===t)return n.slice(0,c+1);if(d>t)return n.slice(0,c-o.length+1)}return n}var r=t(73);n.exports=i},"73":function(n,exports){"use strict";var t=function(n){return null==n?0:("string"!=typeof n&&(n+=""),n.replace(/[^\x00-\xff]/g,"01").length)};n.exports=t},"89":function(n,exports){"use strict";var t=function(n){return n.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g,"")};n.exports=t},"90":function(n,exports,t){(function($){"use strict";var t,e,a=function n(t,e){return this.$el=t,this.options=$.extend({},n.rules.defaults,n.rules[e.rule]||{},e),this.min=Number(this.options.min)||0,this.max=Number(this.options.max)||0,this.$el.on({"focus.spinner":$.proxy(function(n){n.preventDefault(),this.oldValue=this.value()},this),"change.spinner":$.proxy(function(n){n.preventDefault(),this.value(this.$el.val())},this),"keydown.spinner":$.proxy(function(n){var t={"38":"up","40":"down"}[n.which];t&&(n.preventDefault(),this.spin(t))},this)}),this.oldValue=this.value(),this.value(this.$el.val()),this};a.rules={"defaults":{"min":null,"max":null,"step":1,"precision":0},"currency":{"min":0,"max":null,"step":.01,"precision":2},"quantity":{"min":1,"max":999,"step":1,"precision":0},"percent":{"min":1,"max":100,"step":1,"precision":0},"month":{"min":1,"max":12,"step":1,"precision":0},"day":{"min":1,"max":31,"step":1,"precision":0},"hour":{"min":0,"max":23,"step":1,"precision":0},"minute":{"min":1,"max":59,"step":1,"precision":0},"second":{"min":1,"max":59,"step":1,"precision":0}},a.prototype={"spin":function(n){if(!this.$el.prop("disabled")&&!this.$el.siblings("[data-spin="+n+"]").hasClass("disabled")){this.oldValue=this.value();var t=$.isFunction(this.options.step)?this.options.step.call(this,n):this.options.step,e="up"===n?1:-1,a=this.options.beforeChange||function(){};a.call(this,this.oldValue,n)!==!1&&this.value(this.oldValue+Number(t)*e)}},"value":function(n){if(null===n||void 0===n)return this.numeric(this.$el.val());n=this.numeric(n);var a=this.validate(n);0!==a&&(a===-1?(n=this.min,this.$el.trigger("rangemin.spinner")):(n=this.max,this.$el.trigger("rangemax.spinner"))),this.$el.val(n.toFixed(this.options.precision)),this.oldValue!==this.value()&&(this.$el.trigger("changing.spinner",[this.value(),this.oldValue]),clearTimeout(t),t=setTimeout($.proxy(function(){this.$el.trigger("changed.spinner",[this.value(),this.oldValue])},this),e.delay))},"numeric":function(n){return n=this.options.precision>0?parseFloat(n,10):parseInt(n,10),isFinite(n)?n:n||this.options.min||0},"validate":function(n){return null!==this.options.min&&n<this.min?-1:null!==this.options.max&&n>this.max?1:0},"setMin":function(n){var t=this.min=this.numeric(n);this.options.min=t},"setMax":function(n){var t=this.max=this.numeric(n);this.options.max=t}},e=function(n,t){this.$el=$(n),this.$spinning=this.$el.find('[data-spin="spinner"]'),0===this.$spinning.length&&(this.$spinning=this.$el.find(':input[type="text"]')),t=$.extend({},t,this.$spinning.data()),this.spinning=new a(this.$spinning,t),this.$el.on("click.spinner",'[data-spin="up"], [data-spin="down"]',$.proxy(this,"spin")),t.delay&&this.delay(t.delay),t.changed&&this.changed(t.changed),t.changing&&this.changing(t.changing),t.rangemin&&this.rangemin(t.rangemin),t.rangemax&&this.rangemax(t.rangemax)},e.delay=500,e.prototype={"constructor":e,"spin":function(n){var t=$(n.currentTarget).data("spin");switch(n.type){case"click":n.preventDefault(),this.spinning.spin(t)}},"delay":function n(t){var n=Number(t);n>=0&&(this.constructor.delay=n+100)},"value":function(){return this.spinning.value()},"changed":function(n){this.bindHandler("changed.spinner",n)},"changing":function(n){this.bindHandler("changing.spinner",n)},"rangemax":function(n){this.bindHandler("rangemax.spinner",n)},"rangemin":function(n){this.bindHandler("rangemin.spinner",n)},"bindHandler":function(n,t){$.isFunction(t)?this.$spinning.on(n,t):this.$spinning.off(n)},"beginSpin":function(n){this.spinInterval=setInterval($.proxy(this.spinning,"spin",n),100)}};var i=$.fn.spinner;$.fn.spinner=function(n,t){return this.each(function(){var a=$.data(this,"spinner");a||(a=new e(this,n),$.data(this,"spinner",a)),"delay"===n||"changed"===n||"changing"===n?a[n](t):"step"===n&&t?a.spinning.step=t:"spin"===n&&t&&a.spinning.spin(t)})},$.fn.spinner.Constructor=e,$.fn.spinner.noConflict=function(){return $.fn.spinner=i,this},n.exports=$.fn.spinner}).call(exports,t(2))},"91":function(n,exports,t){(function(e,$){"use strict";var a=t(92),i=t(37),r=t(45),o=t(21),s=t(24),d=t(73),c=t(89),l=t(72),u=t(93),p=t(36);t(95),t(96);var h,f,m,v,g,x,y,b,w,k,C,I,M,D,N=function(){h=this._$("content"),f=h.find("[data-node=name]"),m=h.find("[data-node=nameTip]"),v=h.find("[data-node=idCard]"),g=h.find("[data-node=idCardTip]"),x=h.find("[data-node=addr]"),y=h.find("[data-node=addrTip]"),b=h.find("[data-node=phone]"),b.attr("maxlength",12),w=h.find("[data-node=phoneTip]"),C=h.find("[data-node=setDefault]"),I=h.find("[data-node=province]"),M=h.find("[data-node=city]"),D=h.find("[data-node=borough]"),k=h.find("[data-node=areaTip]")},S=function(){f.placeholder(),x.placeholder(),b.placeholder()},Y=function(n,t,e){var a=d(n),i=!0;return(a>t||a<e)&&(i=!1),i},T=function(){var n=c(f.val());f.val(n);var t=!0;return Y(n,20,2)?m.hide():(t=!1,m.show()),t},F=function(){if("1"!=e.isCross)return!0;var n=c(v.val());v.val(n);var t=!0;return/^\d{17}[\dxX]$/.test(n)?g.hide():(t=!1,g.show()),t},A=function(){var n=c(x.val());x.val(n);var t=!0;return Y(n,60,5)?y.hide():(t=!1,y.show()),t},q=function(){var n=c(b.val()),t=/^0([0-9]{3,4}-)?[0-9]{10,12}$/,e=/^1[34578][0-9]{9}$/,a=t.test(n)||e.test(n);return a?w.hide():w.show(),a},H=function(){var n=u.getData(),t=!0;return n.provinceId&&n.boroughId&&n.cityId?k.hide():(t=!1,k.show()),t},P=function(){var n=!0;return T()||(n=!1),F()||(n=!1),A()||(n=!1),q()||(n=!1),H()||(n=!1),n},j=function(n,t){var e=c(n.val()),a=d(e);a>t&&n.val(l(e,t))},V=function(){var n=C.data("checked"),t=v.val()||"",a=18===t.length,i={"userName":f.val(),"idCard":t.toUpperCase(),"address":x.val(),"mobile":b.val(),"isDefault":n?1:0,"isCross":!!parseInt(e.isCross),"hasIdCardVal":a},r=u.getData();return r.areaId&&(i.areaId=r.areaId,i.areaName=r.areaName),r.provinceId&&(i.provinceId=r.provinceId,i.provinceName=r.provinceName),r.cityId&&(i.cityId=r.cityId,i.cityName=r.cityName),r.boroughId&&(i.boroughId=r.boroughId,i.boroughName=r.boroughName),i},z=function(){var n=h.find("[data-node=province]"),t=h.find("[data-node=city]"),e=h.find("[data-node=borough]"),a=h.find("[data-node=area]");u.init([n,t,e,a],["选择省","选择市","选择区县","选择街道"],{},[{"content":'<span class="menu-add" data-node="checked">选择省</span>',"btn":'<span class="down-arrow"><em class="iconn-2"></em></span>'},{"content":'<span class="menu-add" data-node="checked">选择市</span>',"btn":'<span class="down-arrow"><em class="iconn-2"></em></span>'},{"content":'<span class="menu-add" data-node="checked">选择区县</span>',"btn":'<span class="down-arrow"><em class="iconn-2"></em></span>'},{"content":'<span class="menu-add" data-node="checked">选择街道</span>',"btn":'<span class="down-arrow"><em class="iconn-2"></em></span>'}])},B=function(){f.on("blur",function(){T()}),f.on("textchange",function(){var n=$(this),t=n.data("name");n.val()!=t&&""!==t&&v.val("").prop("readonly",!1),j(f,20)}),v.on("blur",function(){F()}),v.on("contextmenu",function(){return!1}),v.on("keydown",function(n){var t=n.keyCode;return t>=48&&t<=57||t>=96&&t<=105||88==t||8==t||46==t||t>=37&&t<=40}),v.on("textchange",function(){var n=$(this).val(),t="";/^\d{1,18}$|^\d{17}[xX]$/.test(n)||(t=$.trim(n.substr(0,n.length-1)),$(this).val(t))}),x.on("blur",function(){A()}),x.on("textchange",function(){j(x,60)}),b.on("blur",function(){q()}),C.on("click",function(){var n=$(this),t=n.find("span"),e="menu-radio-checked";return t.hasClass(e)?(n.data("checked",0),t.removeClass(e)):(n.data("checked",1),t.addClass(e)),!1}),I.on("click","a",function(){H()}),M.on("click","a",function(){H()}),D.on("click","a",function(){H()})},E=function(){f.off(),v.off(),x.off(),b.off(),C.off(),u.destroy()},L={"name":"","phone":"","addr":"","province":"","city":"","borough":"","area":"","setDefault":!0,"isCross":!1},O=function(n,t){var d=n.name,c=s.get("addAddress"),l="addr.add",u=n.addressId;u&&(c=s.get("editAddress"),l="addr.edit");var h=a(n||L);t=t||{};var f=!1,m={"title":"编辑收货地址","modal":!0,"fixed":!0,"content":h,"className":"pop-box","okValue":"确定","okCls":"pc-btn pc-btnh35 circle-pop-btn","ok":function(){var n=this;if(P()){if(f)return!1;f=!0;var t=V();"0"===e.isCross&&d!=t.userName&&t.idCard&&(t.idCard=""),u&&(t.addressId=u),void 0===t.areaId&&(t.areaId="110114001",t.areaName="全部区域"),o.post(c,{"data":t}).done(function(e){var a=$("[data-node=userCardTips]"),i=e.code,o=e.data||{};if(200===i){o.addressId&&(t.addressId=o.addressId),r(l).pub(t);var s=$("[data-node=curAddr]"),d=s.closest("tr");if(s.length){var c=d.find("[data-node=addrInfos]").data("addr").idCard,u=!!$.trim(c);a.length&&u&&(a.remove(),d.find("[data-action=editAddr]").closest("td").removeClass("hide-text"))}n.close(),n.remove()}else p(e.message)}).fail(function(){}).always(function(){f=!1})}return!1},"onshow":function(){N.call(this),z.call(this),S(),B()},"onclose":function(){E(),f=!1}};$.extend(!0,m,t);var v=i(m);return v.show(),v};n.exports=O}).call(exports,t(3),t(2))},"92":function(n,exports,t){var e=t(34);n.exports=e("src/js/module/popup/deliveryAddr/content",function(n,t){"use strict";var e=this,a=(e.$helpers,e.$escape),i=n.name,r=n.isCross,o=n.idCard,s=n.hasIdCardVal,d=n.provinceId,c=n.province,l=n.cityId,u=n.city,p=n.boroughId,h=n.borough,f=n.areaId,m=n.area,v=n.addr,g=n.phone,x=n.isDefault,y="";return y+='<div class="edit-add-box"> <dl class="receiver clearfix"> <dt>收货人:</dt> <dd> <input type="text" data-node="name" data-name="',y+=a(i),y+='" placeholder="请输入姓名" value="',y+=a(i),y+='"> </dd> </dl> <p class="warn-txt" data-node="nameTip">收货人姓名为2-20个字符</p> ',r&&(y+=' <dl class="receiver clearfix"> <dt>身份证号:</dt> <dd> <input type="text" data-node="idCard" data-idcard="',y+=a(o),y+='" ',s&&(y+='readonly="true"'),y+=' placeholder="请输入身份证号" value="',y+=a(o),y+='"> </dd> </dl> <p class="warn-txt" data-node="idCardTip">请填写与收货人姓名对应的身份证号码</p> '),y+=' <dl class="area clearfix"> <dt>所在地区:</dt> <dd data-node="areaList"> <div data-node="province" data-provinceId=',y+=a(d),y+=">",y+=a(c),y+='</div> <div data-node="city" data-cityId=',y+=a(l),y+=">",y+=a(u),y+='</div> <div data-node="borough" data-boroughId=',y+=a(p),y+=">",y+=a(h),y+='</div> <div data-node="area" data-areaId=',y+=a(f),y+=">",y+=a(m),y+='</div> </dd> </dl> <p class="warn-txt" data-node="areaTip">请补充地址</p> <dl class="detail-add clearfix"> <dt>详细地址:</dt> <dd> <input type="text" data-node="addr" placeholder="请如实填写详细地址" value="',y+=a(v),y+='"> </dd> </dl> <p class="warn-txt" data-node="addrTip">限制为5-60个字符</p> <dl class="phone clearfix"> <dt>电话/手机:</dt> <dd> <input type="text" data-node="phone" placeholder="请输入电话/手机号" value="',y+=a(g),y+='"> </dd> </dl> <p class="warn-txt" data-node="phoneTip">请输入手机号/电话号码</p> <div class="set-default-add"> <label data-node="setDefault" data-checked="',y+=x===!0?"true":"false",y+='"> <span class="menu-radio ',y+=x===!0?"menu-radio-checked":"''",y+='"></span>设置为默认地址 </label> </div> </div> ',new String(y)})},"93":function(n,exports,t){(function($){"use strict";t(94);var e,a=t(21),i=t(24),r={},o=function(n,t,o,s){function d(n,t){if(window.localStorage){var e=JSON.parse(localStorage.getItem("address"+n)),r=null===e||!e.hasOwnProperty("time")||e.time<+new Date;r?a.get(i.get("getAddress")+n,{}).done(function(e){if(200===e.code){t.call(null,e.data);var a={"data":e.data,"time":+new Date+6048e5};localStorage.removeItem("address"+n),localStorage.setItem("address"+n,JSON.stringify(a))}}).fail(function(n,t){console.log(n,t)}):t.call(null,e.data)}else a.get(i.get("getAddress")+n,{}).done(function(n){200===n.code&&t.call(null,n.data)}).fail(function(n,t){console.log(n,t)})}function c(e,a){var i=e;a||(i++,n[e].find("div").children().eq(0).text(r[u[e][1]]));for(var o=i,s=n.length;o<s;o++)void 0!==r[u[o][0]]&&(delete r[u[o][0]],delete r[u[o][1]]),n[o].find("div").children().eq(0).text(l?t:t[o]),o!=i&&n[o].find("ul").html("")}var l=!1,u=[["provinceId","provinceName"],["cityId","cityName"],["boroughId","boroughName"],["areaId","areaName"]],p={},h=!(s instanceof Array);o=$.extend({},p,o),e=n,"string"==typeof t&&(l=!0);for(var f=0;f<e.length;f++){var m=l?t:t[f];m!==e[f].text()&&(r[u[f][0]]=e[f].attr("data-"+[u[f][0]]),r[u[f][1]]=e[f].text());var v=f-1>=0?e[f-1].attr("data-"+[u[f-1][0]]):0;!function(a){var i=o;i.please=l?t:t[a],i.onChanged=function(i){var o=i.value,s=!1;void 0===o?s=!0:(r[u[a][0]]=i.value,r[u[a][1]]=i.text,a+1<=e.length-1&&d(~~o,function(e){n[a+1].setList({"data":e.nodes,"please":l?t:t[a+1],"textName":"name","valueName":"id"})})),c(a,s)},n[a].selects(h?s:s[a],i),""!==v&&d(v,function(n){e[a].setList({"data":n.nodes,"please":l?t:t[a],"textName":"name","valueName":"id","checked":e[0].find("div").children().eq(0).text()})})}(f)}},s=function(){for(var n=0,t=e.length;n<t;n++)e[n].off()},d=function(){return r};n.exports={"init":o,"destroy":s,"getData":d}}).call(exports,t(2))},"94":function(n,exports,t){(function($){"use strict";$.fn.extend({"selects":function(n,t){var e=this,a={"content":'<span class="span1">'+$(e).text()+"</span>","btn":'<span class="span2"></span>'},i=$.trim($(e).text()),r={"data":[],"checked":i,"please":"请选择","textName":"text","valueName":"value","selectdCls":"active","checkText":!0,"checkedCls":"active","disable":"disable","onChanged":function(){}};n=$.extend({},a,n),t=$.extend({},r,t);var o=$("<div></div>").appendTo($(e).empty()).height($(e).height());$(n.content).text(""===i?t.please:i).appendTo(o).attr("data-node","checked"),$(n.btn).appendTo(o);for(var s,d,c=null,l='<ul data-node="selectList"><li><a href="javascript:;">'+t.please+"</a></li>",u=t.parent?$(t.parent):this,p=t.parent?this.selector:void 0,h=0,f=t.data.length;h<f;h++)c=void 0!==t.data[h][t.valueName]?t.data[h][t.valueName]:h,l+='<li class="'+(t.data[h].checked===c?t.checkedCls:"")+'"><a href="javascript:;" data-value="'+c+'" data-index="'+h+'">'+t.data[h][t.textName]+"</a></li>";return l+="</ul>",$(l).appendTo($(e)),u.on("click",p,function(n){n.stopPropagation(),$('ul[data-node="selectList"]').hide(),0===t.data.length&&"running"!==$(this).attr("data-refresh")||$(this).hasClass(t.disable)||($(this).addClass(t.selectdCls),0!==$(this).find("ul li").length&&$(this).find("ul").show())}),u.on("click",'ul[data-node="selectList"] a',function(n){return n.stopPropagation(),s=$(this).parents("ul").parent().find('[data-node="checked"]'),s.text()!==$(this).text()&&(d={"text":$(this).text()!==t.please?$(this).text():"","value":$(this).attr("data-value"),"index":$(this).attr("data-index")},t.checkText&&s.text($(this).text()),void 0!==t.checkedCls&&$(this).parent().addClass(t.checkedCls).siblings().removeClass(t.checkedCls),t.onChanged.call(this,d)),$(this).parents("ul").hide(),!1}),$(document).on("click",function(){e.find("ul").hide()}),this},"setList":function(n){$(this).attr("data-refresh","running");var t,e=this,a={"data":[],"textName":"text","checked":"","valueName":"value","please":"请选择","checkedCls":"active"};n=$.extend({},a,n);var i='<li><a href="javascript:;">'+n.please+"</a></li>";if(0!==n.data.length)for(var r=0,o=n.data.length;r<o;r++)t=void 0!==n.data[r][n.valueName]?n.data[r][n.valueName]:r,i+='<li class="'+(n.checked===n.data[r][n.textName]?n.checkedCls:"")+'"><a href="javascript:;" data-value="'+t+'">'+n.data[r][n.textName]+"</a></li>";return $(e).find('[data-node="selectList"]').html(i),this}})}).call(exports,t(2))},"96":function(n,exports,t){(function($){"use strict";var n=document.createElement("input"),t="oninput"in n&&(!("documentMode"in document)||document.documentMode>9),e=function(n){return"INPUT"===n.nodeName&&("text"===n.type||"password"===n.type)},a=null,i=null,r=function(n){a=n,i=n.value,a.attachEvent("onpropertychange",s)},o=function(){a&&(a.detachEvent("onpropertychange",s),a=null,i=null)},s=function(n){if("value"===n.propertyName){var t=n.srcElement.value;t!==i&&(i=t,$(a).trigger("textchange"))}};t?$(document).on("input",function(n){"TEXTAREA"!==n.target.nodeName&&$(n.target).trigger("textchange")}):$(document).on("focusin",function(n){e(n.target)&&(o(),r(n.target))}).on("focusout",function(){o()}).on("selectionchange keyup keydown",function(){a&&a.value!==i&&(i=a.value,$(a).trigger("textchange"))})}).call(exports,t(2))},"97":function(n,exports,t){(function($){"use strict";var e=t(98),a=t(37),i=function(n,t){var i=e(n||{});t=t||{};var r={"title":"选择图片","modal":!0,"fixed":!0,"content":i,"className":"pop-box","okValue":"插入图片","okCls":"pc-btn pc-btnh35 circle-pop-btn","cancalValue":"取消","btnWrapCls":"insert-cancel"};return $.extend(!0,r,t),a(r)};n.exports={"create":i}}).call(exports,t(2))},"98":function(n,exports,t){var e=t(34);n.exports=e("src/js/module/popup/upload/content",function(n,t){"use strict";var e=this,a=(e.$helpers,e.$escape),i=n.maxlength,r=n.total,o="";return o+='<div data-node="uploadBox"> <div class="pics-list-wrap clearfix"> <ul class="pics-list clearfix" data-node="uploadList"> <li data-defaultAddFile=\'picker\'></li> </ul> </div> <div class="num-pics">您可以添加 <span class="link-hover-red" data-node="addNum">',o+=a(i),o+='</span><span class="deep-gray">/',o+=a(r),o+="</span>张图片</div> </div> ",new String(o)})},"99":function(n,exports,t){(function(e,$){"use strict";function a(){return d.get(c.get("selectGroup"))}function i(){var n=$(this),t=n.data("id"),e=$("[i-id=ok]"),a="btn-default";return f&&(f.removeClass(m),e.addClass(a)),n.addClass(m),e.removeClass(a),f=n,v={"id":t,"type":f.parent("li").attr("data-type"),"name":f.data("name")},!1}function r(n){var t=this._$("content");t[n?"off":"on"]("click","dl",i)}function o(n){n=n||{};var t={"title":"选择圈子","modal":!0,"fixed":!0,"content":g,"className":"pop-box","okValue":"确定","okCls":"pc-btn pc-btnh35 circle-pop-btn btn-default","btnWrapCls":"insert-cancel","ok":function(){return v.id?void l(u.postTopic.selectCircle).pub(v):(h("请选择一个圈子"),!1)},"cancel":function(){r.call(this,!0)},"onshow":function(){var n,t=this;$("[data-action=selectGroup]").attr("data-groupid")&&(n=$("[data-action=selectGroup]").attr("data-groupid")),a().done(function(e){if(e&&200===e.code){var a=e.data||{},i=a.myRelatedGroups||{},s=i.imaster||[],d=i.imember||[],c=a.recommendGroups||{},l=c.peas||[],u=s.concat(d),h=function(n,t){for(var e=[],a=0,i=0;i<n.length;i++){for(var r=0;r<t.length;r++){if(t[r].id==n[i].id){a=1;break}a=0}if(!(e.length<12))return e;0==a&&e.push(n[i])}return e},m=h(l,u);a={"created":s,"joined":d,"recommend":m};var v=p(a);t.content(v),n&&$("[data-id="+n+"]")&&($("[data-id="+n+"]").addClass("active"),f=$("[data-id="+n+"]")),r.call(t)}else t.content(x),$("[data-node=btn_reload]").on("click",function(){o()})}).fail(function(){t.content(x)}).always(function(){})},"onclose":function(){r.call(this,!0)}};$.extend(!0,t,n);var e=s(t);return e.show(),e}var s=t(37),d=t(21),c=t(24),l=t(45),u=t(100),p=t(101),h=t(36);t(102)();var f,m="active",v={},g='<div data-node="loading" class="loading"><img src="'+e.imgpath+'/images/public/loading.gif"></div>',x='<p data-node="reload" class="failed-txt">数据获取失败，点击<a data-node="btn_reload" href="javascript:;" style="color:#f95353">重新加载</a>！</p>';n.exports=o}).call(exports,t(3),t(2))},"101":function(n,exports,t){var e=t(34);n.exports=e("src/js/module/popup/circle/content",function(n,t){"use strict";var e=this,a=e.$helpers,i=e.$escape,r=n.created,o=e.$each,s=(n.group,n.$index,n.joined),d=n.recommend,c="";return c+='<div data-node="loading" style="display:none" class="loading"><img src="',c+=i(a.randomShowPic("loading")),c+='" alt=""></div> <p data-node="reload" style="display:none" class="failed-txt">数据获取失败，点击重新加载！</p> <ul class="chosed-circle-box"> ',r.length>0&&(c+=' <li class="clearfix" data-type="0"> <h4>我创建的圈子</h4> ',o(r,function(n,t){c+=' <dl data-id="',c+=i(n.id),c+='" data-name="',c+=i(n.name),c+='"> <dt> ',n.icon&&n.icon.length>0?(c+=' <img src="',c+=i(n.icon),c+='" title="',c+=i(n.name),c+='"> '):(c+=' <img src="',c+=i(a.randomShowPic("face")),c+='" title="',c+=i(n.name),c+='"> '),c+=' </dt> <dd><a href="javascript:;" title="',c+=i(n.name),c+='">',c+=i(n.name),c+="</a></dd> </dl> "}),c+=" </li> "),c+=" ",s.length>0&&(c+=' <li class="clearfix" data-type="1"> <h4>我加入的圈子</h4> ',o(s,function(n,t){c+=' <dl data-id="',c+=i(n.id),c+='" data-name="',c+=i(n.name),c+='"> <dt> ',n.icon&&n.icon.length>0?(c+=' <img src="',c+=i(n.icon),c+='" title="',c+=i(n.name),c+='"> '):(c+=' <img src="',c+=i(a.randomShowPic("face")),c+='" title="',c+=i(n.name),c+='"> '),c+=' </dt> <dd><a href="javascript:;" title="',c+=i(n.name),c+='">',c+=i(n.name),c+="</a></dd> </dl> "}),c+=" </li> "),c+=" ",d.length>0&&(c+=' <li class="clearfix" data-type="2"> <h4>推荐圈子</h4> ',o(d,function(n,t){c+=' <dl data-id="',c+=i(n.id),c+='" data-name="',c+=i(n.name),c+='"> <dt> ',n.icon&&n.icon.length>0?(c+=' <img src="',c+=i(n.icon),c+='" title="',c+=i(n.name),c+='"> '):(c+=' <img src="',c+=i(a.randomShowPic("face")),c+='" title="',c+=i(n.name),c+='"> '),c+=' </dt> <dd><a href="javascript:;" title="',c+=i(n.name),c+='">',c+=i(n.name),c+="</a></dd> </dl> "}),c+=" </li> "),c+=" </ul> ",new String(c)})},"102":function(n,exports,t){(function(e){"use strict";var a=t(34),i=function(n){return"face"==n?e.imgpath+"/images/public/circle-default.png":"loading"==n?e.imgpath+"/images/public/loading.gif":void 0};n.exports=function(){a.helper("randomShowPic",i)}}).call(exports,t(3))},"103":function(n,exports,t){(function($){"use strict";var e=t(21),a=t(24),i=t(104),r=t(23),o={"qq":"http://connect.qq.com/widget/shareqq/index.html","wb":"http://v.t.sina.com.cn/share/share.php","qz":"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"},s={"url":"https://group.gomeplus.com/","title":"国美APP边玩边分享，购物不孤单","pic":"../../images/public/logo.png","summary":"国美APP边玩边分享，购物不孤单"},d=function(n){window.open(n)},c=!1,l=function(){var n='<p data-node="shareBtnBox" class="share-down" style="z-index:21;"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" class="iconn-30"></em><em data-shareto="qq" class="iconn-32"></em><em data-shareto="sina" class="iconn-31"></em><em data-shareto="qzone" class="iconn-33"></em></span></span></p>';$("body").append(n),c=!0},u=function(n){!c&&l(),$("[data-node=shareBtnBox]").css({"left":n.x,"top":n.y}).show()},p=!1,h=function(){var n='<div class="share-weixin"><div class="wx-mask"></div><div class="wx-main"><div class="wx-code"><span></span><img data-node="shareWeixinCode" alt="分享到微信" /></div><p>打开微信扫一扫，即可分享</p><a href="javascript:;" title="点击关闭" class="wx-close">×</a></div></div>';$("body").append(n),p=!0},f=function(n,t){var e=[],a={"title":n.title,"url":n.url,"summary":n.summary,"site":n.site};for(var i in a)e.push(i+"="+encodeURIComponent(a[i]||""));return t?e.push("pics="+n.pic):e.push("pic="+n.pic),e.join("&")},m={"weixin":function(n){var t=i(n.url);!p&&h(),$("[data-node=shareWeixinCode]")[0].src=t,$(".share-weixin").show(),$(".wx-close").on("click",function(){$(".share-weixin").hide()})},"qq":function(n){var t=o.qq+"?"+f(n,!0);d(t)},"wb":function(n){var t=o.wb+"?"+f(n);d(t)},"qz":function(n){var t=o.qz+"?"+f(n,!0);d(t)}},v=function(n){var t="0"!==n.isRebate;e.get(a.get("shareGetGoodsKid"),{"validate":t,"data":{"skuId":n.skuId,"itemId":n.itemId,"parentKid":n.parentKid},"async":!1}).done(function(t){if(t.success===!0){var e=t.data.kid,a=n.shareInfo,i=a.url,r=i.indexOf("?");r>0&&(i=i.substring(0,r)),a.url=i+"?onlineUserId="+a.onlineUserId+"&kId="+e,m[n.shareto](a)}else m[n.shareto](n.shareInfo)}).fail(function(){t?r()&&m[n.shareto](n.shareInfo):m[n.shareto](n.shareInfo)})},g=function(n){var t={"title":n.title||s.title,"url":n.url||s.url,"pic":n.pic||s.pic,"summary":n.summary||"","desc":n.desc||""};!!m[n.type]&&m[n.type](t)},x=function(n,t,e){var a=null,i=null;i="string"==typeof n?$(n):n,t=t||"[data-action=shareto]",i.on("mouseenter",t,function(){var n=$(this).data("surl"),t=$(this).data("stitle"),e=$(this).data("spic");a={"url":n,"title":t,"pic":e};var i=$(this).width(),r=$(this).height(),o=$(this).offset().left/1+i/2-80+"px",s=$(this).offset().top/1+(r-1)+"px";return u({"x":o,"y":s}),!1}),i.on("mouseleave",t,function(){return $("[data-node=shareBtnBox]").hide(),!1}),$("body").on("click","[data-shareto]",function(n){n.preventDefault();var t=$(this).data("shareto");a.type=t,e=e||function(){},e.call(null,a),g(a)}),$("body").on("mouseenter","[data-node=shareBtnBox]",function(){$(this).show()}),$("body").on("mouseleave","[data-node=shareBtnBox]",function(){$(this).hide()})};n.exports={"share":g,"shareto":m,"shareItem":x,"shareWithKid":v}}).call(exports,t(2))},"104":function(n,exports,t){(function(t){"use strict";var e=function(n){return t.group_domain+"ajax/qrcode/urlcode?url="+encodeURIComponent(n)};n.exports=e}).call(exports,t(3))},"105":function(n,exports){"use strict";function t(n,t){for(var e=[],a=0,i=n.length;a<i;a++)e.push(n[a].substr(0,t));return e}function e(n){return function(t,e,a){var i=a[n].indexOf(e.charAt(0).toUpperCase()+e.substr(1).toLowerCase());~i&&(t.month=i)}}function a(n,t){for(n=String(n),t=t||2;n.length<t;)n="0"+n;return n}var i={},r=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,o=/\d\d?/,s=/\d{3}/,d=/\d{4}/,c=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,l=function(){},u=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],p=["January","February","March","April","May","June","July","August","September","October","November","December"],h=t(p,3),f=t(u,3);i.i18n={"dayNamesShort":f,"dayNames":u,"monthNamesShort":h,"monthNames":p,"amPm":["am","pm"],"DoFn":function(n){return n+["th","st","nd","rd"][n%10>3?0:(n-n%10!==10)*n%10]}};var m={"D":function(n){return n.getDate()},"DD":function(n){return a(n.getDate())},"Do":function(n,t){return t.DoFn(n.getDate())},"d":function(n){return n.getDay()},"dd":function(n){return a(n.getDay())},"ddd":function(n,t){return t.dayNamesShort[n.getDay()]},"dddd":function(n,t){return t.dayNames[n.getDay()]},"M":function(n){return n.getMonth()+1},"MM":function(n){return a(n.getMonth()+1)},"MMM":function(n,t){return t.monthNamesShort[n.getMonth()]},"MMMM":function(n,t){return t.monthNames[n.getMonth()]},"YY":function(n){return String(n.getFullYear()).substr(2)},"YYYY":function(n){return n.getFullYear()},"h":function(n){return n.getHours()%12||12},"hh":function(n){return a(n.getHours()%12||12)},"H":function(n){return n.getHours()},"HH":function(n){return a(n.getHours())},"m":function(n){return n.getMinutes()},"mm":function(n){return a(n.getMinutes())},"s":function(n){return n.getSeconds()},"ss":function(n){return a(n.getSeconds())},"S":function(n){return Math.round(n.getMilliseconds()/100)},"SS":function(n){return a(Math.round(n.getMilliseconds()/10),2)},"SSS":function(n){return a(n.getMilliseconds(),3)},"a":function(n,t){return n.getHours()<12?t.amPm[0]:t.amPm[1]},"A":function(n,t){return n.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},"ZZ":function(n){var t=n.getTimezoneOffset();return(t>0?"-":"+")+a(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)}},v={"D":[o,function(n,t){n.day=t}],"M":[o,function(n,t){n.month=t-1}],"YY":[o,function(n,t){var e=new Date,a=+(""+e.getFullYear()).substr(0,2);n.year=""+(t>68?a-1:a)+t}],"h":[o,function(n,t){n.hour=t}],"m":[o,function(n,t){n.minute=t}],"s":[o,function(n,t){n.second=t}],"YYYY":[d,function(n,t){n.year=t}],"S":[/\d/,function(n,t){n.millisecond=100*t}],"SS":[/\d{2}/,function(n,t){n.millisecond=10*t}],"SSS":[s,function(n,t){n.millisecond=t}],"d":[o,l],"ddd":[c,l],"MMM":[c,e("monthNamesShort")],"MMMM":[c,e("monthNames")],"a":[c,function(n,t,e){var a=t.toLowerCase();a===e.amPm[0]?n.isPm=!1:a===e.amPm[1]&&(n.isPm=!0)}],"ZZ":[/[\+\-]\d\d:?\d\d/,function(n,t){var e,a=(t+"").match(/([\+\-]|\d\d)/gi);a&&(e=+(60*a[1])+parseInt(a[2],10),n.timezoneOffset="+"===a[0]?e:-e)}]};v.dd=v.d,v.dddd=v.ddd,v.Do=v.DD=v.D,v.mm=v.m,v.hh=v.H=v.HH=v.h,v.MM=v.M,v.ss=v.s,v.A=v.a,i.masks={"default":"ddd MMM DD YYYY HH:mm:ss","shortDate":"M/D/YY","mediumDate":"MMM D, YYYY","longDate":"MMMM D, YYYY","fullDate":"dddd, MMMM D, YYYY","shortTime":"HH:mm","mediumTime":"HH:mm:ss","longTime":"HH:mm:ss.SSS"},i.format=function(n,t,e){var a=e||i.i18n;if("number"==typeof n&&(n=new Date(n)),"[object Date]"!==Object.prototype.toString.call(n)||isNaN(n.getTime()))throw new Error("Invalid Date in fecha.format");return t=i.masks[t]||t||i.masks.default,t.replace(r,function(t){return t in m?m[t](n,a):t.slice(1,t.length-1)})},i.parse=function(n,t,e){
var a=e||i.i18n;if("string"!=typeof t)throw new Error("Invalid format in fecha.parse");if(t=i.masks[t]||t,n.length>1e3)return!1;var o=!0,s={};if(t.replace(r,function(t){if(v[t]){var e=v[t],i=n.search(e[0]);~i?n.replace(e[0],function(t){return e[1](s,t,a),n=n.substr(i+t.length),t}):o=!1}return v[t]?"":t.slice(1,t.length-1)}),!o)return!1;var d=new Date;s.isPm===!0&&null!=s.hour&&12!==+s.hour?s.hour=+s.hour+12:s.isPm===!1&&12===+s.hour&&(s.hour=0);var c;return null!=s.timezoneOffset?(s.minute=+(s.minute||0)-+s.timezoneOffset,c=new Date(Date.UTC(s.year||d.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0))):c=new Date(s.year||d.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0),c},n.exports=i}});
//# sourceMappingURL=demo.js.map