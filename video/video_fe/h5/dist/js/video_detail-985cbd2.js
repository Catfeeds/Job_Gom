webpackJsonp([0],{"/vCC":function(t,e,n){"use strict";(function(t){function i(t){return t&&t.__esModule?t:{default:t}}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={"click .okBtn":"ok","click [data-id=talksome]":"clickEvent","click .cancelBtn":"cancel","focus [data-id=txtComment]":"onFocus","blur [data-id=txtComment]":"onBlur"};t.events?m.default.Util.defaults(t.events,n):t.events=n,t.data?m.default.Util.defaults(t.data,e):t.data=e}Object.defineProperty(e,"__esModule",{value:!0});var r=n("Zx67"),a=i(r),s=n("Zrlr"),u=i(s),l=n("wxAW"),c=i(l),d=n("zwoO"),f=i(d),h=n("Pf15"),p=i(h),v=n("2gm4"),m=i(v),y=n("h2tb"),g=n("2N2P"),b=n("miAk"),_=n("xJAT"),w=n("3o3C"),k=i(w),x=n("9Y5R"),M=i(x);n("EWT+");var j=n("i2M5"),L=i(j),C=n("w87c"),T=function(e){function n(t){(0,u.default)(this,n),o(t,{limitNum:300,wordsNum:0,inputCommentClass:"inactive",btnActiveClass:"cmt-black disabled",limitNumClass:"",talkSomeClass:"active",noMore:!0,content:"",cursor:"",pageSize:5,fetchUrl:"/comment/list",sendUrl:"/comment/post",listData:{},sended:!1,error:!1,clickPlaceholder:"立即登录，发表评论吧",user:{avatar:""}});var e=(0,f.default)(this,(n.__proto__||(0,a.default)(n)).call(this,t));return e.trigger("_on_after",t),e.els={textareaEle:e.$el.find("[data-id=txtComment]"),commentsListArea:e.$el.find("[data-id=comments]")},document.querySelector("[data-id=inputArea]").addEventListener("input",e.limitNumber.bind(e)),e}return(0,p.default)(n,e),(0,c.default)(n,[{key:"_create",value:function(){this._createWrapper(),this.uiComment.append(y.tpl),this.renderInputArea(),this.on("change:wordsNum",this.renderWordNumber),this.on("change:limitNumClass",this.renderWordNumber),this.on("change:btnActiveClass",this.renderWordNumber),this.on("change:inputCommentClass",this.renderInputArea),this.on("change:talkSomeClass",this.renderInputArea),this.on("sendedEvent",this.renderCommentList)}},{key:"_createWrapper",value:function(){this.uiComment=t("<div>").appendTo(this._appendTo(this.el))}},{key:"renderInputArea",value:function(){C.loginFlag&&(this.data.user.avatar=C.page.avatar,this.data.clickPlaceholder="我来说两句"),this.$el.find("[data-id=inputArea]").html(m.default.template(g.textarea)(this.data)),this.renderWordNumber()}},{key:"renderWordNumber",value:function(){this.$el.find("[data-id=wordNumberArea]").html(m.default.template(_.wordNumber)(this.data))}},{key:"renderCommentList",value:function(){this.$el.find("[data-id=comments]").html(m.default.template(b.items)(this.data)),this.data.sended=!1}},{key:"onFocus",value:function(){}},{key:"onBlur",value:function(){}},{key:"clickEvent",value:function(){C.loginFlag?(this.els.textareaEle.val(""),this.data.inputCommentClass="active",this.data.wordsNum=0,this.data.btnActiveClass="disabled",this.data.talkSomeClass="inactive",this.data.limitNumClass="cmt-black"):(0,L.default)()}},{key:"openTextarea",value:function(){this.data.inputCommentClass="active",this.data.talkSomeClass="inactive",this.$el.find("[data-id=txtComment]").val(this.data.content)}},{key:"cancel",value:function(){this.data.inputCommentClass="inactive",this.data.talkSomeClass="active"}},{key:"ok",value:function(){var e=this;e.offLine()||"active btn-primary"===this.data.btnActiveClass&&(this.data.cursor="",this.fetchComments(this.data.topic_id).done(function(){k.default.post(e.data.sendUrl,{data:{topic_id:e.data.topic_id,content:e.data.content},success:function(t){if(200001===t.code)return void(0,L.default)();200===t.code?(e.msg("评论发送成功"),e.cancel(),e.data.content="",e.data.listData.list.unshift(t.data),e.data.sended=!0,e.trigger("sendedEvent")):(e.openTextarea(),e.msg("评论发送失败"))},error:function(t,n){"timeout"===n?e.requestTimeout(n):(e.openTextarea(),e.msg("评论发送失败"))}})}),e.cancel(),t("html").scrollTop(this.els.commentsListArea.offset().top),this.sendCallback&&this.sendCallBack())}},{key:"limitNumber",value:function(e){var n=t(e.target),i=n.val().trim().length;return this.data.wordsNum=i,this.data.content=n.val().trim(),0===i?(this.data.btnActiveClass="disabled",void(this.data.limitNumClass="cmt-black")):i>this.data.limitNum?(this.data.limitNumClass="cmt-red",this.data.btnActiveClass="disabled",this.msg("评论字数超出限制"),!1):(this.data.btnActiveClass="active btn-primary",void(this.data.limitNumClass="cmt-black"))}},{key:"msg",value:function(t){(0,M.default)(t,500)}},{key:"requestTimeout",value:function(t){"timeout"===t&&this.msg("网络异常，请稍后重试")}},{key:"offLine",value:function(){return!navigator.onLine&&(this.msg("连接已断开，请检查网络设置"),!0)}},{key:"fetchComments",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=this;if(n.offLine()){return t.Deferred().resolve(!1)}return k.default.get(this.data.fetchUrl,{data:{topic_id:e,size:this.data.pageSize,cursor:this.data.cursor},success:function(t){if(200===t.code){if(n.data.error=!1,n.data.listData=t.data,0===n.data.listData.current_num)return void(n.data.noMore=!0);if(n.data.noMore=!1,n.data.cursor=n.data.listData.cursor,!n.data.sended){var e=m.default.template(b.items)(n.data);n.els.commentsListArea.append(e)}}else n.data.error=!0,n.msg("获取评论失败")},error:function(t,e){n.data.error=!0,n.requestTimeout(e)}})}}]),n}(m.default.BaseClass);e.default=T}).call(e,n("Dg8Y"))},"2N2P":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.textarea='\n            <div class="cmt-user-icon">\n              <a href="javascript: void 0;">\n                <%if (user.avatar !== \'\'){ %>\n                    <img src="<%=user.avatar%>">\n                <%}%>\n              </a>\n\t\t\t</div>\n\t\t\t<form class="cmt-user-form">\n\t\t\t\t<div class="cmt-form">\n\t\t\t\t\t<div data-id="talksome" class="cmt-input talksome <%=talkSomeClass%>" role="textbox" aria-controls="input">\n\t\t\t\t\t<%=clickPlaceholder%>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="cmt-textarea inputComment <%=inputCommentClass%>" data-id="inputComment">\n\t\t\t\t\t\t<textarea data-id="txtComment" class="cmt-textarea"></textarea>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div data-id="wordNumberArea" class="cmt-form-action inputComment <%=inputCommentClass%>"></div> \n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n'},"2TA9":function(t,e,n){"use strict";var i=n("h/5q"),o=function(t){return t&&t.__esModule?t:{default:t}}(i),r=function(t,e){var n="";t=1e3*("string"==typeof t?parseInt(t):t);var i,r=new Date(t).getTime(),a=(new Date).getTime(),s=a-r,u=e||30;return s<6e4?n="刚刚发布":s>=6e4&s<36e5?(i=Math.floor(s/6e4),n=i+"分钟前"):s>=36e5&s<864e5?(i=Math.floor(s/36e5),n=i+"小时前"):s>=864e5&s<864e5*u?(i=Math.floor(s/864e5),n=i+"天前"):n=(0,o.default)(t,"yyyy-MM-dd hh:mm:ss"),n};t.exports=r},"2gm4":function(t,e,n){(function(i){var o,r;!function(i,a){t.exports=a(),o=a,void 0!==(r="function"==typeof o?o.call(e,n,e,t):o)&&(t.exports=r)}(0,function(){"use strict";function t(t){return function(e){return d.toString.call(e)==="[object "+t+"]"}}function e(t,e){return t.undelegateEvents(),t._setElement(t.el),t.delegateEvents(e),t}function n(t){x=/<[^>]+>/g.test(t)?t:document.getElementById(t).innerHTML||"";var e=RegExp([(g.escape||b).source,(g.interpolate||b).source,(g.evaluate||b).source].join("|")+"|$","g"),n=0,i="__p+='";x.replace(e,function(t,e,o,r,a){return i+=x.slice(n,a).replace(w,k),n=a+t.length,e?i+="'+\n((__t=("+e+"))==null?'':_t.escape(__t))+\n'":o?i+="'+\n((__t=("+o+"))==null?'':__t)+\n'":r&&(i+="';\n"+r+"\n__p+='"),t}),i+="';\n",i="with(obj||{}){\n"+i+"}\n",i="var __t,__p='',__j=Array.prototype.join,$utils=this,$helpers=$utils.$helpers,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return [__p];\n";try{var o=new Function("obj",i);o.prototype=M}catch(t){throw t.source=i,t}var r=function(t){try{var e=new o(t);if(e.length>0)return e[0]+""}catch(t){console.log("内部出错：",t)}};return r.source="function(obj){\n"+i+"}",r}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,o){var s={key:t,arg:e,resolve:n,reject:o,next:null};a?a=a.next=s:(r=a=s,i(t,e))})}function i(n,r){try{var a=e[n](r),s=a.value;s instanceof t?Promise.resolve(s.value).then(function(t){i("next",t)},function(t){i("throw",t)}):o(a.done?"return":"normal",a.value)}catch(t){o("throw",t)}}function o(t,e){switch(t){case"return":r.resolve({value:e,done:!0});break;case"throw":r.reject(e);break;default:r.resolve({value:e,done:!1})}r=r.next,r?i(r.key,r.arg):a=null}var r,a;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},u=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},l=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},c=0,d=Object.prototype,f={isFunction:function(e){return t("Function")(e)},isObject:function(e){return t("Object")(e)},has:function(t,e){return null!=t&&d.hasOwnProperty.call(t,e)},create:function(t,e){return this.isObject(e)&&Object.keys(e).forEach(function(n){t[n]=e[n]}),t},defaults:function(t,e){return Object.keys(e).forEach(function(n){t[n]&&void 0!==t[n]||(t[n]=e[n])}),t},mergeData:function(t,e){var n=void 0,i=void 0,o=void 0;for(n in e)i=t[n],o=e[n],Object.hasOwnProperty(t,n)?this.isObject(i)&&this.isObject(o)&&this.mergeData(i,o):Object.defineProperty(t,n,{enumerable:!0,configurable:!0,writable:!0,value:o})},equal:function(t,e,n,i){if(t===e)return 0!==t||1/t==1/e;if(null==t||null==e)return t===e;var r=d.toString,a=r.call(t);if(a!==r.call(e))return!1;switch(a){case"[object RegExp]":case"[object String]":return""+t==""+e;case"[object Number]":return+t!=+t?+e!=+e:0==+t?1/+t==1/e:+t==+e;case"[object Date]":case"[object Boolean]":return+t==+e}var s="[object Array]"===a;if(!s){if("object"!=(void 0===t?"undefined":o(t))||"object"!=(void 0===e?"undefined":o(e)))return!1;var u=t.constructor,l=e.constructor;if(u!==l&&!(this.isFunction(u)&&u instanceof u&&this.isFunction(l)&&l instanceof l)&&"constructor"in t&&"constructor"in e)return!1}n=n||[],i=i||[];for(var c=n.length;c--;)if(n[c]===t)return i[c]===e;if(n.push(t),i.push(e),s){if((c=t.length)!==e.length)return!1;for(;c--;)if(!this.equal(t[c],e[c],n,i))return!1}else{var f,h=Object.keys(t);if(c=h.length,Object.keys(e).length!==c)return!1;for(;c--;)if(f=h[c],!this.has(e,f)||!this.equal(t[f],e[f],n,i))return!1}return n.pop(),i.pop(),!0}},h=/^(\S+)\s*(.*)$/,p=function(){function t(e){r(this,t),this._init(e)}return a(t,[{key:"_init",value:function(t){var e=this;if(!t)return Object.create(null);var n=Object.keys(t);this.state=t;for(var i=this,o=0,r=n.length;o<r;o++){var a;(function(){var t=n[o],r=e.state[n[o]];if((a=Object.getOwnPropertyDescriptor(e.state,t))&&!1===a.configurable)return"continue";Object.defineProperty(i.state,t,{enumerable:!0,configurable:!0,get:function(){return r},set:function(t){t!==r&&(r=t)}})})()}}}]),t}(),v=function(t,e){var n,i=this;return n=t&&f.has(t,"constructor")?t.constructor:function(){return i.apply(this,arguments)},s(n,i,e),n.prototype=f.create(i.prototype,t),n.prototype.constructor=n,n.__super__=i.prototype,n},m={},y={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};m.escape=function(t){var e=function(e){return t[e]},n="(?:"+Object.keys(t).join("|")+")",i=RegExp(n),o=RegExp(n,"g");return function(t){return t=null==t?"":""+t,i.test(t)?t.replace(o,e):t}}(y);var g={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g},b=/(.)^/,_={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},w=/\\|'|\r|\n|\u2028|\u2029/g,k=function(t){return"\\"+_[t]},x="",M={$helpers:{}},j=M.$helpers;n.helper=function(t,e){j[t]=e};var L=function(){function t(e){r(this,t),this._init(e)}return a(t,null,[{key:"$",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){if(window.jQuery||window.$||i)return window.jQuery||window.$||i;throw new Error("GMP need jQuery or Zepto in window scope named $")})},{key:"_assignPros",value:function(e){s(t.prototype,e)}}]),t}();!function(t){t._assignPros({_init:function(t){t=t||{},this._uid="g"+c++,s(this,t),this.el=this.el||"body",this._eventsMapList={},this._initState(),this._initEvents(),this._initEls(),this._callHook("init")}})}(L),function(t){t._assignPros({_initEvents:function(){e(this,this.events)},undelegateEvents:function(){return this.$el&&this.$el.off(".delegateEvents"+this._uid),this},delegateEvents:function(t){if(t||(t=this.events),!t)return this;this.undelegateEvents();for(var e in t)if(t.hasOwnProperty(e)){var n=t[e];if(f.isFunction(n)||(n=this[n]),!n)continue;var i=e.match(h);this.delegate(i[1],i[2],n.bind(this))}return this},undelegate:function(t,e,n){return this.$el.off(t+".delegateEvents"+this._uid,e,n),this},delegate:function(t,e,n){return this.$el.on(t+".delegateEvents"+this._uid,e,n),this},_setElement:function(e){this.$el=e instanceof t.$()?e:t.$()(e),this.el=this.$el[0]},_callHook:function(t){var e=this[t];t&&e&&e.call(this)},on:function(t,e){var n=this._uid+t;this._eventsMapList[n]?this._eventsMapList[n].push(e):this._eventsMapList[n]=[e]},off:function(t){var e=this._uid+t;this._eventsMapList[e]&&(this._eventsMapList[e]=[])},trigger:function(t,e){var n=this,i=this._uid+t,o=this._eventsMapList[i];o&&o.forEach(function(t){t.apply(n,[e])})},destroy:function(){this.undelegateEvents(),this.$el.empty()}})}(L),function(t){t._assignPros({_initState:function(){this._initData()},_initData:function(){var t=this;this._data=this.data||{};for(var e=Object.keys(this._data),n=this,i=0,o=e.length;i<o;i++){var r;!function(){var o=e[i],a=t._data[e[i]];if((r=Object.getOwnPropertyDescriptor(t._data,o))&&!1===r.configurable)return"continue";Object.defineProperty(n._data,o,{enumerable:!0,configurable:!0,get:function(){return a},set:function(t){var e=a;f.equal(t,e)||(a=t,n.trigger("change:"+o))}})}()}},_initEls:function(){var e=this;this.els&&Object.keys(this.els).forEach(function(n){e.els[n]=e.els[n]instanceof t.$()?e.els[n]:t.$()(e.els[n])})}})}(L),function(t){var e={},n=function(t,n,i){e[t]=e[t]||[],e[t].push({scope:i||this,handler:n})},i=function(t,n,i){var o=e[t];i=i||this,o&&(e[t]=e[t].filter(function(t){return!!(n&&n!==t.callback||i&&i!==t.scope)}))},o=function(t){var n,i,o,r=e[t];if(r){for(var a=arguments.length,s=Array(a>1?a-1:0),u=1;u<a;u++)s[u-1]=arguments[u];for(n=0,o=r.length;n<o;n++)i=r[n],i.handler.apply(i.scope,s||[])}};t.GMPEvents={on:n,off:i,trigger:o,_events:e}}(L),L.GMPX=p,L.extend=v,L.template=n,L.Util=f;var C=function(t){function e(t){r(this,e);var n=!0==!!t.init?t.init:null;t.init&&delete t.init;var i=l(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return null!=n&&i.on("_on_init",n),i.on("_on_after",i._after),i}return u(e,t),a(e,[{key:"_after",value:function(t){if(!t)throw new Error("请正确填写属性!");this._create(),this.trigger("_on_init")}},{key:"_create",value:function(t){this.data?this.$el.html(L.template(t)(this.data)):this.$el.html(L.template(t)())}},{key:"_appendTo",value:function(t){var e=t;return e&&(e.jquery||e.nodeType)?i(e)[0]:document.querySelector(e||"body")}},{key:"set",value:function(t,e){var n=this.data[t];this.data[t]=e;var i=this["_on_"+t+"Update"];f.isFunction(i)&&i.call(this,e,n)}},{key:"get",value:function(t){return this.data[t]}}],[{key:"inherits",value:function(t,e){var n=this,i=void 0;return i=t&&f.has(t,"constructor")?t.constructor:function(){return n.apply(this,arguments)},s(i,n,e),i.prototype=f.create(n.prototype,t),i.prototype.constructor=i,i.__super__=n.prototype,i}}]),e}(L);return L.Widgets=function(){},L.Widgets.register=function(t,e){if(null!=this[t])throw new Error("已存在该名称的Widgets,请改名!");this[t]=C.inherits(e)},L.BaseClass=C,L})}).call(e,n("Dg8Y"))},"2roW":function(t,e,n){!function(e,n){t.exports=n()}(0,function(){return function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(t,e){!function(){var e=function(t){var e,n;(t=t||document.querySelector(t))&&t.addEventListener("touchstart",function(i){e=i.touches[0].pageY,n=t.scrollTop,n<=0&&(t.scrollTop=1),n+t.offsetHeight>=t.scrollHeight&&(t.scrollTop=t.scrollHeight-t.offsetHeight-1)},!1)};"undefined"!=typeof window&&void 0===t?window.ScrollFix=e:t.exports=e}()},function(t,e,n){!function(e,n){t.exports=n()}(0,function(){return function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function(){function t(e){if(i(this,t),!e||e===window)return null;if(!(e instanceof HTMLElement))throw new Error("parameter 1 must be a HTMLElement instance!");this.win=e;var n=e.querySelector(".localScrollFix-fixDom");n?this.fixDom=n:this.createFixDom(),this.isArrived=!1,this.update()}return o(t,[{key:"createFixDom",value:function(){this.win.insertAdjacentHTML("beforeend",'<div class="localScrollFix-fixDom" style="margin: 0; padding: 0"></div>'),this.fixDom=this.win.querySelector(".localScrollFix-fixDom")}},{key:"removeFixDom",value:function(){this.win.removeChild(this.fixDom),this.fixDom=null}},{key:"arrived",value:function(){this.isArrived=!0,this.removeFixDom()}},{key:"update",value:function(){if(!this.isArrived){var t=this.computerFixDomPaddingTop();t>=0?this.fixDom.style.paddingTop=t+3+"px":this.arrived()}}},{key:"computerFixDomPaddingTop",value:function(){var t=this.fixDom,e=this.win,n=t.getBoundingClientRect().top,i=e.getBoundingClientRect().bottom,o=window.getComputedStyle(e,null),r=o.paddingBottom,a=o.borderBottomWidth;return i-parseFloat(r)-parseFloat(a)-n}}]),t}();e.default=r,window.LocalScrollFix=r}])})},function(t,e,n){"use strict";var i=function(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(t),i=1;i<arguments.length;i++){var o=arguments[i];if(null!=o)for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n[r]=o[r])}return n};e.a=i},function(t,e,n){"use strict";e.a=function(t,e,n){var i,o,r,a,s=0;n||(n={});var u=function(){s=!1===n.leading?0:Date.now(),i=null,a=t.apply(o,r),i||(o=r=null)},l=function(){var l=Date.now();s||!1!==n.leading||(s=l);var c=e-(l-s);return o=this,r=arguments,c<=0||c>e?(i&&(clearTimeout(i),i=null),s=l,a=t.apply(o,r),i||(o=r=null)):i||!1===n.trailing||(i=setTimeout(u,c)),a};return l.cancel=function(){clearTimeout(i),s=0,i=o=r=null},l}},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t){throw new Error("2 arguments required, but only "+t+" present.")}function r(){return/iphone/i.test(window.navigator.userAgent)}function a(t){return'<div style="text-align: center;font-size: 14px;line-height: 50px;">'+t+"</div>"}Object.defineProperty(e,"__esModule",{value:!0});var s=n(3),u=n(2),l=n(1),c=n.n(l),d=n(0),f=n.n(d),h=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),p=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o(0),r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o(1),a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(i(this,t),!(e instanceof HTMLElement))throw new Error("parameter 1 must be a HTMLElement instance!");if("function"!=typeof r)throw new Error("parameter 2 must be a function!");this.container=e,this.loadMoreFn=r,this._options=n.i(u.a)({},t.defaults,a),this.isLock=this._options.isInitLock,this.hasMore=!0,this.win=this._options.window,this.windowHeight=window.innerHeight,this.createBottomDom(),this.fixLocalScroll(),this.scrollListener=this.scrollListener.bind(this),this.resizeListener=this.resizeListener.bind(this),this.scrollListenerWrapThrottle=n.i(s.a)(this.scrollListener,50),this.resizeListenerWrapThrottle=n.i(s.a)(this.resizeListener,50),this.attachScrollListener()}return h(t,[{key:"fixLocalScroll",value:function(){this.win!==window&&r()?(this._options.useLocalScrollFix&&(this.localScrollFix=new c.a(this.win)),this._options.useScrollFix&&new f.a(this.win)):(this._options.useLocalScrollFix=!1,this._options.useScrollFix=!1)}},{key:"createBottomDom",value:function(){this.container.insertAdjacentHTML("beforeend",'<div class="scrollload-bottom">'+this._options.loadingHtml+"</div>"),this.bottomDom=this.container.querySelector(".scrollload-bottom")}},{key:"showNoDataDom",value:function(){this.bottomDom.innerHTML=this._options.noDataHtml}},{key:"showLoadingDom",value:function(){this.bottomDom.innerHTML=this._options.loadingHtml}},{key:"showExceptionDom",value:function(){this.bottomDom.innerHTML=this._options.exceptionHtml}},{key:"scrollListener",value:function(){this.isLock||this.isBottom()&&(this.isLock=!0,this.loadMoreFn.call(this,this))}},{key:"isBottom",value:function(){var t=this.win,e=this.bottomDom,n=this.windowHeight,i=e.getBoundingClientRect().top,o=void 0;if(t===window)o=n;else{var r=t.getBoundingClientRect(),a=r.height,s=r.top;o=a,i-=s}return i-o<=this._options.threshold}},{key:"resizeListener",value:function(){this.win===window&&(this.windowHeight=window.innerHeight),this.scrollListener()}},{key:"attachScrollListener",value:function(){this.win.addEventListener("scroll",this.scrollListenerWrapThrottle),this.win.addEventListener("resize",this.resizeListenerWrapThrottle),this.scrollListener()}},{key:"detachScrollListener",value:function(){this.win.removeEventListener("scroll",this.scrollListenerWrapThrottle),this.win.removeEventListener("resize",this.resizeListenerWrapThrottle)}},{key:"lock",value:function(){this.isLock=!0}},{key:"unLock",value:function(){this.isLock=!1,this.hasMore&&this.scrollListener(),this._options.useLocalScrollFix&&this.localScrollFix.update()}},{key:"noData",value:function(){this.lock(),this.hasMore=!1,this.showNoDataDom(),this._options.useLocalScrollFix&&!this.localScrollFix.isArrived&&this.localScrollFix.arrived(),this.detachScrollListener()}},{key:"refreshData",value:function(){this.container.querySelector(".scrollload-bottom")?this.showLoadingDom():this.createBottomDom(),this.isLock=!1,this.hasMore=!0,this._options.useLocalScrollFix&&(this.localScrollFix=new c.a(this.win)),this.attachScrollListener()}},{key:"throwException",value:function(){this.showExceptionDom()}},{key:"solveException",value:function(){this.hasMore?(this.showLoadingDom(),this.unLock()):this.showNoDataDom()}},{key:"setOptions",value:function(t){n.i(u.a)(this._options,t)}},{key:"getOptions",value:function(){return this._options}}],[{key:"setGlobalOptions",value:function(e){n.i(u.a)(t.defaults,e)}}]),t}();p.defaults={isInitLock:!1,threshold:10,window:window,useLocalScrollFix:!1,useScrollFix:!1,loadingHtml:a("加载中..."),noDataHtml:a("没有更多数据了"),exceptionHtml:a("出现异常")},e.default=p,window.Scrollload=p}])})},"3o3C":function(t,e,n){"use strict";(function(e){var i=n("w87c"),o=function(t,n){var o={url:i.page.domain+"api"+t,type:n.type,dataType:"json",timeout:3e4};return e.extend(!0,o,n),e.ajax(o)},r={};["get","post"].forEach(function(t){r[t]=function(e,n){return n=n||{},n.type=t.toUpperCase(),o(e,n)}}),t.exports=r}).call(e,n("Dg8Y"))},"9Y5R":function(t,e,n){"use strict";(function(e){function i(t,n,i){var r=null,a=function(){},s={msg:"",delay:2e3,cb:a};if("string"==typeof t?(s.msg=t,s.delay="number"==typeof n?n||2e3:2e3,s.cb="function"==typeof i?i:a):e.extend(s,t),""===s.msg.trim())return!1;o?(r&&(clearTimeout(r),r=null,o.hide()),o.html(s.msg).show()):(o=e("<div/>").html(s.msg).addClass("pub-toast"),e("body").append(o));var u=o.width(),l=o.height();o.css({left:"50%",top:"50%",marginLeft:-u/2,marginTop:-l/2}),clearTimeout(r),r=setTimeout(function(){o.hide().html(""),s.cb(),r=null},s.delay)}n("G3eO");var o=null;t.exports=i}).call(e,n("Dg8Y"))},"EWT+":function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var o=n("2gm4"),r=i(o),a=n("2TA9"),s=i(a);r.default.template.helper("dateFormat",function(t){return(0,s.default)(t)})},G3eO:function(t,e){},KQmx:function(t,e){},O7yE:function(t,e,n){"use strict";(function(t){function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n("Zrlr"),r=i(o),a=n("wxAW"),s=i(a),u=function(){function e(n){var i=this;(0,r.default)(this,e),this.options=n||{},this.minHeight=this.options.minHeight||window.screen.height/2;t("body").append('<div class="back-top" style="display: none;opacity: 0;" id="back-top"><em class="icon-2"></em></div>'),this.ele=t("#back-top"),this.ele.on("click",function(){i._scrollToTop(500)}),setTimeout(function(){i.ele.css({opacity:1})},0),this.debounceFunc=this._debounce(this._controlButton.bind(this)),t(window).on("scroll",this.debounceFunc),t(window).on("load",this.debounceFunc)}return(0,s.default)(e,[{key:"_controlButton",value:function(){t(window).scrollTop()>this.minHeight?this.ele.show():this.ele.hide()}},{key:"hide",value:function(){this.ele.hide()}},{key:"show",value:function(){this._controlButton()}},{key:"_scrollToTop",value:function(t){var e=window.scrollY,n=Math.PI/Math.floor(t/15),i=e/2,o=0,r=void 0,a=setInterval(function(){0!=window.scrollY?(o+=1,r=i-Math.floor(i*Math.cos(o*n)),window.scrollTo(0,e-r)):clearInterval(a)},15)}},{key:"_debounce",value:function(t,e,n){var i=void 0;return function(){function o(){i=null,n||t.apply(r,a)}var r=this,a=arguments,s=n&&!i;clearTimeout(i),i=setTimeout(o,e),s&&t.apply(r,a)}}}]),e}();e.default=u}).call(e,n("Dg8Y"))},Pf15:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=n("kiBT"),r=i(o),a=n("OvRC"),s=i(a),u=n("pFYg"),l=i(u);e.default=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(void 0===e?"undefined":(0,l.default)(e)));t.prototype=(0,s.default)(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(r.default?(0,r.default)(t,e):t.__proto__=e)}},TRXd:function(t,e,n){"use strict";(function(t){function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n("Zrlr"),r=i(o),a=n("wxAW"),s=i(a),u=n("rv55"),l=(i(u),n("9Y5R")),c=i(l),d=function(){function e(t){(0,r.default)(this,e),this.parameter=t,this._init(t)}return(0,s.default)(e,[{key:"shareSetTime",value:function(){}},{key:"_init",value:function(e){var n=this;t(e.selector+"").on("click",function(){n.shareSetTime&&clearTimeout(n.shareSetTime),n.shareMask(n.parameter)})}},{key:"shareMask",value:function(e){var n=e.config.appType;"gomeplus"==n?this.showMask("gomeplus"):"gome"==n?this.showMask("gome"):(0,c.default)("请使用浏览器自带分享功能",2500),t(".shareMask .share-x").on("click",function(){t(".shareMask").hide()})}},{key:"showMask",value:function(e){t(".shareMask").show(0),"gome"==e?t(".share-h-gome").show(0):"gomeplus"==e?t(".share-h-app").show(0):t(".share-h").show(0),this.shareSetTime=setTimeout(function(){t(".shareMask").hide(200),t(".share-h").hide(200),t(".share-h-app").hide(200),t(".share-h-gome").hide(200)},5e3)}}]),e}();e.default=d}).call(e,n("Dg8Y"))},XLKn:function(t,e){},Zrlr:function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},bMM1:function(t,e){},ee6c:function(t,e,n){"use strict";(function(t){function e(t){return t&&t.__esModule?t:{default:t}}n("XLKn"),n("bMM1"),n("KQmx"),n("1+C1");var i=n("O7yE"),o=e(i),r=n("2roW"),a=e(r),s=n("/vCC"),u=e(s),l=n("TRXd"),c=e(l),d=n("w87c"),f=n("UEW+"),h=e(f),p=d.page.topicId,v=new o.default;(new MeixinPlayer).init(d.page.videoId||428,"videoContainer",{type:d.page.type||"vod",poster:"",env:d.page.env||"pre"});var m=new u.default({data:{topic_id:p},el:"[data-id=commentComponent]",onFocus:function(){setTimeout(function(){v.hide()},200)},onBlur:function(){setTimeout(function(){v.show()},200)}}),y=new a.default(t("[data-id=wrap]")[0],function(t){m.fetchComments(p).done(function(e){if(!e)return void t.throwException();if(m.data.noMore)t.noData();else{if(m.data.error)return void t.throwException();t.unLock()}})},{loadingHtml:'<div class="infinite-scroll"><span>加载中...</span></div>',noDataHtml:'<div class="infinite-scroll"><span>没有更多评论了</span></div>',exceptionHtml:'<div class="infinite-scroll clickHandler"><span class="clickHandler">评论加载异常，点击重试</span></a></div>'});y.container.addEventListener("click",function(e){t(e.target).hasClass("clickHandler")&&y.solveException()}),new c.default({selector:".iconbox em",config:d.page}),(0,h.default)()}).call(e,n("Dg8Y"))},"h/5q":function(t,e,n){"use strict";function i(t,e){var n=new Date(t),i={"M+":n.getMonth()+1,"d+":n.getDate(),"h+":n.getHours(),"m+":n.getMinutes(),"s+":n.getSeconds(),"q+":Math.floor((n.getMonth()+3)/3),S:n.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(n.getFullYear()+"").substr(4-RegExp.$1.length)));for(var o in i)new RegExp("("+o+")").test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?i[o]:("00"+i[o]).substr((""+i[o]).length)));return e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},h2tb:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.tpl='<div class="cmt-module">\n        <div class="cmt-head"><div class="cmt-title">评论</div></div>\n        <div data-id="inputArea" class="cmt-user-action">\n        </div>\n        <div>\n            <div class="comments" data-id="comments" id="commentsList">\n            </div>\n        </div>\n     </div>\n    '},i2M5:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("rv55"),o=function(t){return t&&t.__esModule?t:{default:t}}(i),r=function(){o.default.ready(function(){o.default.login()})};e.default=r},miAk:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.items='\n  <% for(var i = 0, list = listData.list, len = list.length; i < len; i++) {%>\n      <div class="cmt-item">\n        <div class="cmt-user-icon">\n          <a href="javascript: void 0;">\n            <%if (list[i].user.avatar !== \'\') {%>\n                <img src="<%=list[i].user.avatar%>" onerror="javascript:this.style.display=\'none\';">\n            <%}%>\n          </a>\n        </div>\n        <div class="cmt-body">\n          <div class="cmt-action">\n            <span class="cmt-username"><%=list[i].user.nickname || list[i].user.nickName%></span>\n            <div class="cmt-action-btn">\n              <div class="cmt-time" data-count="<%=$helpers.dateFormat(list[i].create_time)%>"></div>\n            </div>\n          </div>\n          <div class="cmt-content"><%=list[i].content%>\n          </div>\n        </div>\n      </div>\n  <%}%>\n'},wxAW:function(t,e,n){"use strict";e.__esModule=!0;var i=n("C4MV"),o=function(t){return t&&t.__esModule?t:{default:t}}(i);e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,o.default)(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}()},xJAT:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.wordNumber='\n    <a href="javascript:void 0" class="btn okBtn <%=btnActiveClass%>">发送</a>\n    <a href="javascript:void 0" class="btn cancelBtn">取消</a>\n    <div class="cmt-word-count">\n        <span data-id="limitNum" class="<%=limitNumClass%>"><%=wordsNum%></span><span class="cmt-gray"> / 300</span>\n    </div>    \n'},zwoO:function(t,e,n){"use strict";e.__esModule=!0;var i=n("pFYg"),o=function(t){return t&&t.__esModule?t:{default:t}}(i);e.default=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==(void 0===e?"undefined":(0,o.default)(e))&&"function"!=typeof e?t:e}}},["ee6c"]);