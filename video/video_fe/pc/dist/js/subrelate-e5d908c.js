webpackJsonp([4],{"9Y5R":function(t,e,a){"use strict";(function(t){function n(e,a,n){var u=function(){},s=!0,l={msg:"",x:null,y:null,delay:2e3,cb:u};if("string"==typeof e?(l.msg=e,l.delay="number"==typeof a?a||2e3:2e3,l.cb="function"==typeof n?n:u):t.extend(l,e),null!==l.x&&null!==l.y&&(s=!1),""===l.msg.trim())return!1;i?(o&&(clearTimeout(o),o=null,i.hide()),i.html(l.msg).show()):(i=t("<div/>").html(l.msg).addClass("pub-toast"),t("body").append(i));var c=i.outerWidth(),r=i.outerHeight(),d={position:"absolute",left:l.x,top:l.y},f={position:"fixed",left:"50%",top:"50%",marginLeft:-c/2,marginTop:-r/2},h=s?f:d;i.css(h),clearTimeout(o),o=setTimeout(function(){i.hide().html(""),l.cb(),o=null},l.delay)}Object.defineProperty(e,"__esModule",{value:!0}),a("G3eO");var i=null,o=null;e.default=n}).call(e,a("7t+N"))},Eif7:function(t,e,a){a("JyN8"),t.exports=a("iANj").Object.assign},G3eO:function(t,e){},HY96:function(t,e,a){"use strict";a("QtMn")},JyN8:function(t,e,a){var n=a("Wdy1");n(n.S+n.F,"Object",{assign:a("xVc6")})},Ln1i:function(t,e,a){"use strict";(function(t){function n(t){return t&&t.__esModule?t:{default:t}}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a={"click [data-id=loadMore]":"loadMore"};t.events?b.default.Util.defaults(t.events,a):t.events=a,t.data?b.default.Util.defaults(t.data,e):t.data=e}Object.defineProperty(e,"__esModule",{value:!0});var o=a("Zx67"),u=n(o),s=a("Zrlr"),l=n(s),c=a("wxAW"),r=n(c),d=a("zwoO"),f=n(d),h=a("Pf15"),p=n(h),v=a("2gm4"),b=n(v),m=a("3o3C"),g=n(m),y=(a("w87c"),a("hQgD")),_=a("9Y5R"),w=n(_),k=a("ewOM"),S=n(k),O=function(e){function a(t){(0,l.default)(this,a),i(t,{url:"",page:1,pageSize:12,nodata:!1});var e=(0,f.default)(this,(a.__proto__||(0,u.default)(a)).call(this,t));return e.trigger("_on_after",t),e}return(0,p.default)(a,e),(0,r.default)(a,[{key:"_create",value:function(){this.$loadMore=this.$el.find("[data-id=loadMore]")}},{key:"loadMore",value:function(e){if(!this.data.nodata){this.data.page=this.data.page+1;var a=this;g.default.get(this.data.url,{domain:"domain-data",data:{keyword:(0,S.default)("keyword"),page:this.data.page,num:this.data.pageSize},success:function(e){if(0!=e.code)return(0,w.default)(e.message),!1;var n=e.data;if(n.publisher.length>0){var i=b.default.template(y.items)(n);t("[data-id=loadmore-container]").append(i),a.data.nodata=!1}else a.data.nodata=!0,a.$loadMore.html("没有更多数据")},error:function(t){(0,w.default)("请求异常，请稍后再试")}})}}}]),a}(b.default.BaseClass);e.default=O}).call(e,a("7t+N"))},O7yE:function(t,e,a){"use strict";(function(t){function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=a("Zrlr"),o=n(i),u=a("wxAW"),s=n(u),l=a("ioS7"),c=function(){function e(a){var n=this;(0,o.default)(this,e),this.options=a||{},this.minHeight=this.options.minHeight||window.screen.height/2;t("body").append('<div class="back-top" title="返回顶部" style="display: block;opacity: 0;" id="back-top"><em class="icon-19"></em></div>'),t("#back-top").on("click",function(){n.scrollToTop(500)}),setTimeout(function(){t("#back-top").css({opacity:1})},0);var i=(0,l.throttle)(this.controlButton.bind(this),100);t(window).on("scroll",i),t(window).on("load",i)}return(0,s.default)(e,[{key:"controlButton",value:function(){t(window).scrollTop()>this.minHeight?t("#back-top").show():t("#back-top").hide()}},{key:"scrollToTop",value:function(t){var e=window.pageYOffset,a=Math.PI/Math.floor(t/15),n=e/2,i=0,o=void 0,u=setInterval(function(){0!=window.pageYOffset?(i+=1,o=n-n*Math.cos(i*a),window.scrollTo(0,e-o)):clearInterval(u)},15)}}]),e}();e.default=c}).call(e,a("7t+N"))},QtMn:function(t,e){},W3xz:function(t,e,a){"use strict";function n(t){var e=parseInt(t);return e<1e4?e:e>=1e4&&e<1e8?parseFloat((e/1e4).toFixed(1))+"万":e>=1e8&&e<Number.MAX_VALUE?parseFloat((e/1e8).toFixed(1))+"亿":"无限"}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},ewOM:function(t,e,a){"use strict";function n(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),a=window.location.search.substr(1).match(e);return null!=a?decodeURIComponent(a[2]):null}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},fUBg:function(t,e){},gbOH:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=a("woOf"),o=n(i),u=a("Zx67"),s=n(u),l=a("Zrlr"),c=n(l),r=a("wxAW"),d=n(r),f=a("zwoO"),h=n(f),p=a("Pf15"),v=n(p),b=a("9Y5R"),m=(n(b),a("sit2")),g=n(m),y=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,c.default)(this,e);var a={api:"/v1/subscribe/set",selector:"[data-action=subscribe]",action:"subscribe"};return(0,h.default)(this,(e.__proto__||(0,s.default)(e)).call(this,(0,o.default)(a,t)))}return(0,v.default)(e,t),(0,d.default)(e,[{key:"getReqData",value:function(t){var e=1^t.status;return{id:t.id,actionType:e,formData:{publish_id:t.id,type:e}}}},{key:"_defaultDoSuccess",value:function(t){var e=t.res,a=t.$el,n=null;a.length&&(n=a.find('[data-node="count"]'),a.addClass("active"),a.data("status",1),n.text(this.formatNumber(e.data.total/1)))}},{key:"_defaultUndoSuccess",value:function(t){var e=t.res,a=t.$el,n=null;a.length&&(n=a.find('[data-node="count"]'),a.removeClass("active"),a.data("status",0),n.text(this.formatNumber(e.data.total/1)))}}]),e}(g.default);e.default=y},hQgD:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.items='\n    <% for(var i = 0, len = publisher.length; i < len; i++) {%>\n        <li class="fl">\n            <div class=" unslider-item">\n                <a class="head" href="/sub/<%=publisher[i].id%>.html">\n                    <img src="<%=publisher[i].icon%>" onerror="javascript:this.style.display=\'none\';">\n                </a>\n                <h3 class="nickname">\n                    <a href="/sub/<%=publisher[i].id%>.html"><%=publisher[i].name%></a>\n                </h3>\n                <p class="desc"><%=publisher[i].summary%></p>\n                <div class="fans">粉丝：<span data-id="subnum"><%=publisher[i].subscribe_num%></span></div>\n                <div class="subscribe-btn <%=(publisher[i].is_subscribe ? \' active \' : \'\')%>" data-action="subscribe" data-subscribeid="<%=publisher[i].id%>" data-status="<%=publisher[i].is_subscribe%>">\n                    <span>＋订阅</span>\n                    <em>已订阅</em>\n                    <b>取消订阅</b>\n                </div>\n            </div>\n        </li>\n    <%}%>\n'},ioS7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.debounce=function(t,e,a){var n=void 0;return function(){function i(){n=null,a||t.apply(o,u)}var o=this,u=arguments,s=a&&!n;clearTimeout(n),n=setTimeout(i,e),s&&t.apply(o,u)}},e.throttle=function(t,e){var a=void 0,n=void 0,i=0;return function(){function o(){i=Date.now(),a=null,t.apply(u,s)}n=Date.now()-i,a&&clearTimeout(a);var u=this,s=arguments;n>e?o():a=setTimeout(o,e-n)}}},njmC:function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=a("Zrlr"),o=n(i),u=a("wxAW"),s=n(u),l=function(){function t(){(0,o.default)(this,t),this.cache={}}return(0,s.default)(t,[{key:"on",value:function(t,e){(this.cache[t]||(this.cache[t]=[])).push(e)}},{key:"once",value:function(t,e){function a(){this.off(t,a),e.apply(this,arguments)}this.on(t,a)}},{key:"off",value:function(t){this.cache[t]=null}},{key:"emit",value:function(t){var e=this,a=[].concat(Array.prototype.slice.call(arguments));a.shift();var n=this.cache[t];n&&n.length>0&&n.forEach(function(t){t.apply(e,a)})}}]),t}();e.default=l},ppuZ:function(t,e,a){"use strict";(function(t){function e(t){return t&&t.__esModule?t:{default:t}}a("fUBg"),a("bXnB"),a("HY96");var n=a("O7yE"),i=e(n),o=a("Ln1i"),u=e(o),s=a("gbOH"),l=e(s),c=a("W3xz"),r=e(c),d=a("9Y5R");e(d);new i.default,new u.default({el:"[data-id=loadmore-btn-container]",data:{url:"/json/searchPublisher.json"}}),new l.default({delegate:"[data-id=loadmore-container]",afterDoSuccess:function(t){var e=t.$el,a=(t.$delegate,t.res.data.total);e.addClass("active").data("status",1),e.siblings().find("[data-id=subnum]").text((0,r.default)(a))},afterUndoSuccess:function(t){var e=t.$el,a=(t.$delegate,t.res.data.total);e.removeClass("active").data("status",0),e.siblings().find("[data-id=subnum]").text((0,r.default)(a))}}),t("[data-id=loadmore-container]").on("mouseenter",'[data-action="subscribe"]',function(){var e=t(this);t(this).attr("class").indexOf("active")>0?e.addClass("acAdd").removeClass("c"):e.addClass("c").removeClass("acAdd")}).on("click",'[data-action="subscribe"]',function(){t(this).removeClass("c acAdd")})}).call(e,a("7t+N"))},sit2:function(t,e,a){"use strict";(function(t){function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=a("mvHQ"),o=n(i),u=a("Zx67"),s=n(u),l=a("Zrlr"),c=n(l),r=a("wxAW"),d=n(r),f=a("zwoO"),h=n(f),p=a("Pf15"),v=n(p),b=a("9Y5R"),m=n(b),g=a("3o3C"),y=n(g),_=a("njmC"),w=n(_),k=a("W3xz"),S=n(k),O=a("pH+Z"),M=a("w87c"),x="?"+M.apiParams.inParams,j=function(){},D=function(t){(0,m.default)(t.res.message)},T={},U=function(e){function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,c.default)(this,a);var e=(0,h.default)(this,(a.__proto__||(0,s.default)(a)).call(this));return e.api=t.api+x,e.selector=t.selector,e.action=t.action,e.delegate=t.delegate||"body",e.beforeRequest=t.beforeRequest||j,e.afterRequest=t.afterRequest||j,e.afterDoSuccess=t.afterDoSuccess||null,e.afterUndoSuccess=t.afterUndoSuccess||null,e.afterDoFail=t.afterDoFail||D,e.afterUndoFail=t.afterUndoFail||D,e.formatNumber=S.default,e.localStorageKey="gmv_pc_action",e._bindEvent(),e._init(),e._checkBeforeLogin(),e}return(0,v.default)(a,e),(0,d.default)(a,[{key:"_defaultDoSuccess",value:function(){}},{key:"_defaultUndoSuccess",value:function(){}},{key:"_bindEvent",value:function(){var t=this;this.on("doSuccess",function(e){"function"==typeof t.afterDoSuccess?t.afterDoSuccess(e):t._defaultDoSuccess(e)}),this.on("doFail",function(e){t.afterDoFail(e)}),this.on("undoSuccess",function(e){"function"==typeof t.afterUndoSuccess?t.afterUndoSuccess(e):t._defaultUndoSuccess(e)}),this.on("undoFail",function(e){t.afterUndoFail(e)})}},{key:"_init",value:function(){function e(e){var i=t(this),u=i.data(n+"id"),s=i.data("status");switch(s){case"true":s=1;break;case"false":s=0;break;default:s^=0}var l=n+u;return 1!=T[l]&&(M.loginFlag?(T[l]=1,a.request(a.getReqData({id:u,status:s})),!1):(localStorage.setItem(a.localStorageKey,(0,o.default)({action:n,id:u,status:s})),(0,O.login)(),!1))}var a=this,n=this.action;t(this.delegate).on("click",this.selector,e)}},{key:"_checkBeforeLogin",value:function(){var t=this,e=localStorage.getItem(this.localStorageKey),a=null,n=null;M.loginFlag&&e&&(n=JSON.parse(e),n.action==this.action&&(a={id:n.id,status:n.status},t.request(t.getReqData(a)))),localStorage.removeItem(this.localStorageKey)}},{key:"getReqData",value:function(t){var e=1^t.status;return{id:t.id,actionType:e,formData:{id:t.id,type:e}}}},{key:"request",value:function(e){var a=this,n=a.action,i=e.id,u=e.actionType;if(!1===a.beforeRequest(e))return!1;y.default.post(this.api,{domain:"domain-user",data:e.formData,success:function(e){var s="[data-"+a.action+'id="'+i+'"]',l=t(s),c=e.code,r={id:i,res:e,$el:l,$delegate:t(a.delegate)},d=["undoSuccess","doSuccess"],f=["undoFail","doFail"],h=[200,400008];if(200001==c)return localStorage.setItem(a.localStorageKey,(0,o.default)({action:n,id:i,status:1^u})),location.href=M.page.loginUrl,!1;-1!=h.indexOf(c)?a.emit(d[u],r):a.emit(f[u],r)},error:function(){(0,m.default)("网络请求失败，请稍后重试")},complete:function(){delete T[n+i],a.afterRequest(e)}})}}]),a}(w.default);e.default=U}).call(e,a("7t+N"))},woOf:function(t,e,a){t.exports={default:a("Eif7"),__esModule:!0}},xVc6:function(t,e,a){"use strict";var n=a("pEGt"),i=a("THEY"),o=a("bSeU"),u=a("wXdB"),s=a("wiaE"),l=Object.assign;t.exports=!l||a("zyKz")(function(){var t={},e={},a=Symbol(),n="abcdefghijklmnopqrst";return t[a]=7,n.split("").forEach(function(t){e[t]=t}),7!=l({},t)[a]||Object.keys(l({},e)).join("")!=n})?function(t,e){for(var a=u(t),l=arguments.length,c=1,r=i.f,d=o.f;l>c;)for(var f,h=s(arguments[c++]),p=r?n(h).concat(r(h)):n(h),v=p.length,b=0;v>b;)d.call(h,f=p[b++])&&(a[f]=h[f]);return a}:l}},["ppuZ"]);