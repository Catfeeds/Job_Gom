webpackJsonp([2],{"2roW":function(t,e,i){!function(e,i){t.exports=i()}(0,function(){return function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(t,e){!function(){var e=function(t){var e,i;(t=t||document.querySelector(t))&&t.addEventListener("touchstart",function(n){e=n.touches[0].pageY,i=t.scrollTop,i<=0&&(t.scrollTop=1),i+t.offsetHeight>=t.scrollHeight&&(t.scrollTop=t.scrollHeight-t.offsetHeight-1)},!1)};"undefined"!=typeof window&&void 0===t?window.ScrollFix=e:t.exports=e}()},function(t,e,i){!function(e,i){t.exports=i()}(0,function(){return function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),s=function(){function t(e){if(n(this,t),!e||e===window)return null;if(!(e instanceof HTMLElement))throw new Error("parameter 1 must be a HTMLElement instance!");this.win=e;var i=e.querySelector(".localScrollFix-fixDom");i?this.fixDom=i:this.createFixDom(),this.isArrived=!1,this.update()}return a(t,[{key:"createFixDom",value:function(){this.win.insertAdjacentHTML("beforeend",'<div class="localScrollFix-fixDom" style="margin: 0; padding: 0"></div>'),this.fixDom=this.win.querySelector(".localScrollFix-fixDom")}},{key:"removeFixDom",value:function(){this.win.removeChild(this.fixDom),this.fixDom=null}},{key:"arrived",value:function(){this.isArrived=!0,this.removeFixDom()}},{key:"update",value:function(){if(!this.isArrived){var t=this.computerFixDomPaddingTop();t>=0?this.fixDom.style.paddingTop=t+3+"px":this.arrived()}}},{key:"computerFixDomPaddingTop",value:function(){var t=this.fixDom,e=this.win,i=t.getBoundingClientRect().top,n=e.getBoundingClientRect().bottom,a=window.getComputedStyle(e,null),s=a.paddingBottom,o=a.borderBottomWidth;return n-parseFloat(s)-parseFloat(o)-i}}]),t}();e.default=s,window.LocalScrollFix=s}])})},function(t,e,i){"use strict";var n=function(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var i=Object(t),n=1;n<arguments.length;n++){var a=arguments[n];if(null!=a)for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(i[s]=a[s])}return i};e.a=n},function(t,e,i){"use strict";e.a=function(t,e,i){var n,a,s,o,r=0;i||(i={});var l=function(){r=!1===i.leading?0:Date.now(),n=null,o=t.apply(a,s),n||(a=s=null)},u=function(){var u=Date.now();r||!1!==i.leading||(r=u);var c=e-(u-r);return a=this,s=arguments,c<=0||c>e?(n&&(clearTimeout(n),n=null),r=u,o=t.apply(a,s),n||(a=s=null)):n||!1===i.trailing||(n=setTimeout(l,c)),o};return u.cancel=function(){clearTimeout(n),r=0,n=a=s=null},u}},function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t){throw new Error("2 arguments required, but only "+t+" present.")}function s(){return/iphone/i.test(window.navigator.userAgent)}function o(t){return'<div style="text-align: center;font-size: 14px;line-height: 50px;">'+t+"</div>"}Object.defineProperty(e,"__esModule",{value:!0});var r=i(3),l=i(2),u=i(1),c=i.n(u),d=i(0),f=i.n(d),h=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),v=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a(0),s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a(1),o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(n(this,t),!(e instanceof HTMLElement))throw new Error("parameter 1 must be a HTMLElement instance!");if("function"!=typeof s)throw new Error("parameter 2 must be a function!");this.container=e,this.loadMoreFn=s,this._options=i.i(l.a)({},t.defaults,o),this.isLock=this._options.isInitLock,this.hasMore=!0,this.win=this._options.window,this.windowHeight=window.innerHeight,this.createBottomDom(),this.fixLocalScroll(),this.scrollListener=this.scrollListener.bind(this),this.resizeListener=this.resizeListener.bind(this),this.scrollListenerWrapThrottle=i.i(r.a)(this.scrollListener,50),this.resizeListenerWrapThrottle=i.i(r.a)(this.resizeListener,50),this.attachScrollListener()}return h(t,[{key:"fixLocalScroll",value:function(){this.win!==window&&s()?(this._options.useLocalScrollFix&&(this.localScrollFix=new c.a(this.win)),this._options.useScrollFix&&new f.a(this.win)):(this._options.useLocalScrollFix=!1,this._options.useScrollFix=!1)}},{key:"createBottomDom",value:function(){this.container.insertAdjacentHTML("beforeend",'<div class="scrollload-bottom">'+this._options.loadingHtml+"</div>"),this.bottomDom=this.container.querySelector(".scrollload-bottom")}},{key:"showNoDataDom",value:function(){this.bottomDom.innerHTML=this._options.noDataHtml}},{key:"showLoadingDom",value:function(){this.bottomDom.innerHTML=this._options.loadingHtml}},{key:"showExceptionDom",value:function(){this.bottomDom.innerHTML=this._options.exceptionHtml}},{key:"scrollListener",value:function(){this.isLock||this.isBottom()&&(this.isLock=!0,this.loadMoreFn.call(this,this))}},{key:"isBottom",value:function(){var t=this.win,e=this.bottomDom,i=this.windowHeight,n=e.getBoundingClientRect().top,a=void 0;if(t===window)a=i;else{var s=t.getBoundingClientRect(),o=s.height,r=s.top;a=o,n-=r}return n-a<=this._options.threshold}},{key:"resizeListener",value:function(){this.win===window&&(this.windowHeight=window.innerHeight),this.scrollListener()}},{key:"attachScrollListener",value:function(){this.win.addEventListener("scroll",this.scrollListenerWrapThrottle),this.win.addEventListener("resize",this.resizeListenerWrapThrottle),this.scrollListener()}},{key:"detachScrollListener",value:function(){this.win.removeEventListener("scroll",this.scrollListenerWrapThrottle),this.win.removeEventListener("resize",this.resizeListenerWrapThrottle)}},{key:"lock",value:function(){this.isLock=!0}},{key:"unLock",value:function(){this.isLock=!1,this.hasMore&&this.scrollListener(),this._options.useLocalScrollFix&&this.localScrollFix.update()}},{key:"noData",value:function(){this.lock(),this.hasMore=!1,this.showNoDataDom(),this._options.useLocalScrollFix&&!this.localScrollFix.isArrived&&this.localScrollFix.arrived(),this.detachScrollListener()}},{key:"refreshData",value:function(){this.container.querySelector(".scrollload-bottom")?this.showLoadingDom():this.createBottomDom(),this.isLock=!1,this.hasMore=!0,this._options.useLocalScrollFix&&(this.localScrollFix=new c.a(this.win)),this.attachScrollListener()}},{key:"throwException",value:function(){this.showExceptionDom()}},{key:"solveException",value:function(){this.hasMore?(this.showLoadingDom(),this.unLock()):this.showNoDataDom()}},{key:"setOptions",value:function(t){i.i(l.a)(this._options,t)}},{key:"getOptions",value:function(){return this._options}}],[{key:"setGlobalOptions",value:function(e){i.i(l.a)(t.defaults,e)}}]),t}();v.defaults={isInitLock:!1,threshold:10,window:window,useLocalScrollFix:!1,useScrollFix:!1,loadingHtml:o("加载中..."),noDataHtml:o("没有更多数据了"),exceptionHtml:o("出现异常")},e.default=v,window.Scrollload=v}])})},"9Y5R":function(t,e,i){"use strict";(function(t){function n(e,i,n){var o=function(){},r=!0,l={msg:"",x:null,y:null,delay:2e3,cb:o};if("string"==typeof e?(l.msg=e,l.delay="number"==typeof i?i||2e3:2e3,l.cb="function"==typeof n?n:o):t.extend(l,e),null!==l.x&&null!==l.y&&(r=!1),""===l.msg.trim())return!1;a?(s&&(clearTimeout(s),s=null,a.hide()),a.html(l.msg).show()):(a=t("<div/>").html(l.msg).addClass("pub-toast"),t("body").append(a));var u=a.outerWidth(),c=a.outerHeight(),d={position:"absolute",left:l.x,top:l.y},f={position:"fixed",left:"50%",top:"50%",marginLeft:-u/2,marginTop:-c/2},h=r?f:d;a.css(h),clearTimeout(s),s=setTimeout(function(){a.hide().html(""),l.cb(),s=null},l.delay)}Object.defineProperty(e,"__esModule",{value:!0}),i("G3eO");var a=null,s=null;e.default=n}).call(e,i("7t+N"))},Eif7:function(t,e,i){i("JyN8"),t.exports=i("iANj").Object.assign},FJ4y:function(t,e,i){"use strict";function n(t,e){return"string"!=typeof t&&(t=(0,s.default)(t)),e.substring(0,e.length-t.length)+t}Object.defineProperty(e,"__esModule",{value:!0});var a=i("mvHQ"),s=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default=n},G3eO:function(t,e){},HY96:function(t,e,i){"use strict";i("QtMn")},JyN8:function(t,e,i){var n=i("Wdy1");n(n.S+n.F,"Object",{assign:i("xVc6")})},MJvr:function(t,e,i){"use strict";(function(t){function n(t){return t&&t.__esModule?t:{default:t}}function a(t,e){var i=e>0?"hide":"",n='<ul class="clearfix list '+i+'">',a={};return t.forEach(function(t,e){var i="sv".charAt(t.video_type);1==t.video_type&&(a[t.video_id]=t.video_id),0===e?(n+='\n\t\t\t\t<li class="big">\n\t\t\t\t    <div class="img">\n\t\t\t\t        <a href="/'+i+"/"+t.id+'.html" target="_blank" style="background: url(\''+t.image+'\') no-repeat center;background-size:cover;" title="'+t.title+'">',n+=s(t),n+='    </a>\n\t\t\t\t    </div>\n\t\t\t\t    <a href="/'+i+"/"+t.id+'.html" target="_blank" class="list-title" title="'+t.title+'">'+t.title+"</a>\n\t\t\t\t    <p>"+t.subtitle+"</p>\n\t\t\t\t</li>\n\t\t\t"):(n+='\n\t\t\t\t<li>\n\t\t\t\t    <div class="img">\n\t\t\t\t        <a href="/'+i+"/"+t.id+'.html" target="_blank">\n\t\t\t\t            <img src="'+t.image+'" alt="'+t.title+'">',n+=s(t),n+='</a>\n\t\t\t\t    </div>\n\t\t\t\t    <a href="/'+i+"/"+t.id+'.html" target="_blank" class="list-title" title="'+t.title+'">'+t.title+"</a>\n\t\t\t\t</li>\n\t\t\t")}),n+="</ul>",{html:n,ids:a}}function s(t){var e=(0,h.default)(t.length);if(0==t.video_type){var i="",n=(0,y.default)(1e3*t.start_time,"yyyy-MM-dd hh:mm");switch(~~t.live_status){case 1:i+='<span class="live">正在直播</span>';break;case 2:i+='<span class="live">即将直播</span>';break;default:i+='<span class="vod">直播回看</span>'}return"\n\t\t\t"+i+'\n\t\t\t<div class="img-text">\n\t\t\t    <span class="count">'+n+"</span>\n\t\t\t</div>\n\t\t"}return'\n\t\t\t<div class="img-text">\n\t\t\t    <span class="count hide" data-node="views" data-vid="'+t.video_id+'"><em class="icon-47"></em>0次</span>\n\t\t\t    <span class="time">'+e+"</span>\n\t\t\t</div>\n\t\t"}function o(e){if(0!=e.code)return!1;var i=e.data.slot.name,n=e.data.list,s="",o="",l={};if(!n.length)return!1;n.forEach(function(t,e){s+='<a href="javascript:;" '+(0===e?'class="active"':"")+">"+t.name+"</a>";var i=a(t.videos,e);o+=i.html,l=(0,d.default)(l,i.ids)});var c='\n\t\t<div class="block-title">\n\t\t    <h2>'+i+'</h2>\n\t\t    <div class="index-tab" data-node="wonderfulVideoTab">\n\t\t\t\t'+s+"\n\t\t    </div>\n\t\t</div>\n\t",f='<div class="video-list" data-node="wonderfulVideoContent">\n\t\t'+o+"\n\t</div>",h=c+f;w.append(h),r();var v=(0,u.default)(l).join(",");(0,p.default)(v,function(e){var i=e.data,n=t("[data-node=wonderfulVideoContent]");t.each(i,function(t,e){var i=(0,g.default)(e),a='<em class="icon-47"></em>'+i+"次";n.find("[data-vid="+t+"]").html(a).removeClass("hide")})})}function r(){var e=t("[data-node=wonderfulVideoTab]"),i=t("[data-node=wonderfulVideoContent]");e.on("mouseenter","a",function(){var n=t(this),a=n.index();e.children("a").eq(a).addClass("active").siblings("a").removeClass("active"),i.children("ul").eq(a).removeClass("hide").siblings("ul").addClass("hide")})}Object.defineProperty(e,"__esModule",{value:!0});var l=i("fZjL"),u=n(l),c=i("woOf"),d=n(c),f=i("ZOV9"),h=n(f),v=i("s4/o"),p=n(v),m=i("W3xz"),g=n(m),b=i("h/5q"),y=n(b),w=t("[data-node=recommendSite2]");e.default=o}).call(e,i("7t+N"))},O7yE:function(t,e,i){"use strict";(function(t){function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=i("Zrlr"),s=n(a),o=i("wxAW"),r=n(o),l=i("ioS7"),u=function(){function e(i){var n=this;(0,s.default)(this,e),this.options=i||{},this.minHeight=this.options.minHeight||window.screen.height/2;t("body").append('<div class="back-top" title="返回顶部" style="display: block;opacity: 0;" id="back-top"><em class="icon-19"></em></div>'),t("#back-top").on("click",function(){n.scrollToTop(500)}),setTimeout(function(){t("#back-top").css({opacity:1})},0);var a=(0,l.throttle)(this.controlButton.bind(this),100);t(window).on("scroll",a),t(window).on("load",a)}return(0,r.default)(e,[{key:"controlButton",value:function(){t(window).scrollTop()>this.minHeight?t("#back-top").show():t("#back-top").hide()}},{key:"scrollToTop",value:function(t){var e=window.pageYOffset,i=Math.PI/Math.floor(t/15),n=e/2,a=0,s=void 0,o=setInterval(function(){0!=window.pageYOffset?(a+=1,s=n-n*Math.cos(a*i),window.scrollTo(0,e-s)):clearInterval(o)},15)}}]),e}();e.default=u}).call(e,i("7t+N"))},QLuy:function(t,e,i){"use strict";(function(t){function i(){var e=t("[data-node=header]");t(window).on("scroll",function(){t(window).scrollTop()>t("[data-node=indexBanner]").height()-100?e.addClass("head-fixed"):e.removeClass("head-fixed")})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=i}).call(e,i("7t+N"))},QtMn:function(t,e){},R8Gs:function(t,e,i){"use strict";(function(t){function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=i("woOf"),s=n(a),o=i("Zrlr"),r=n(o),l=i("wxAW"),u=n(l),c=function(){function e(i){(0,r.default)(this,e);var n={selector:"",speed:5e3};if((0,s.default)(n,i),"string"!=typeof n.selector)return console.error("bannerSlider缺少selector参数"),!1;this.$slider=t(n.selector),this.$banner=t("[data-node=bannerImg]"),this.$nav=t("[data-node=bannerNav]"),this.$imgs=this.$banner.children("a"),this.$titles=this.$nav.children("a"),this.speed=n.speed,this.index=0,this.timer=0,this.goLoop=this.goLoop.bind(this),this.bindEvent(),this.play()}return(0,u.default)(e,[{key:"bindEvent",value:function(){var e=this;this.$nav.on("mouseenter","a",function(){var i=t(this);e.index=i.index(),i.addClass("active").siblings("a").removeClass("active"),e.$imgs.eq(e.index).addClass("active").siblings("a").removeClass("active")}),this.$slider.on({mouseenter:function(){clearTimeout(e.timer)},mouseleave:function(){e.play()}})}},{key:"goLoop",value:function(){var t=this.index;t++,t>=this.$imgs.length&&(t=0),this.index=t,this.$imgs.eq(t).addClass("active").siblings("a").removeClass("active"),this.$titles.eq(t).addClass("active").siblings("a").removeClass("active"),this.play()}},{key:"play",value:function(){clearTimeout(this.timer),this.timer=setTimeout(this.goLoop,this.speed)}}]),e}();e.default=c}).call(e,i("7t+N"))},RMz0:function(t,e){},RUbq:function(t,e,i){"use strict";(function(t){function n(t){return t&&t.__esModule?t:{default:t}}function a(e){if(200!==e.code)return!1;if(void 0===e.data.publisher)return!1;var i=e.data.publisher;if(!i.length)return!1;var n=s(i);t("[data-node=recommendSite3]").append(n),new r.default({selector:"[data-node=hotSubscribe]",prev:'<a class="prevBtn icon-16"></a>',next:'<a class="nextBtn icon-17"></a>'}),new u.default({delegate:"[data-node=hotSubscribe]",afterDoSuccess:function(t){var e=t.res,i=t.$el,n=null;i.length&&(n=i.siblings(".text").find("[data-node=fans] span"),i.addClass("active"),i.data("status",1),n.text((0,d.default)(e.data.total/1)))},afterUndoSuccess:function(t){var e=t.res,i=t.$el,n=null;i.length&&(n=i.siblings(".text").find("[data-node=fans] span"),i.removeClass("active"),i.data("status",0),n.text((0,d.default)(e.data.total/1)))}})}function s(t){var e='\n\t\t<div class="block-title">\n\t\t    <h2>热门订阅号</h2>\n\t\t    <a href="/sub/hot.html" target="_blank" class="more">查看更多 ></a>\n\t\t</div>\n\t\t<div class="sub-list" data-node="hotSubscribe">\n\t\t    <ul class="hot-sub clearfix">\n\t';return t.forEach(function(t){e+='\n\t    \t<li>\n\t\t    \t<div class="img">\n\t\t    \t    <a target="_blank" href="/sub/'+t.id+'.html">\n\t\t    \t        <img src="'+t.icon+'">\n\t\t    \t    </a>\n\t\t    \t</div>\n\t\t    \t<div class="text">\n\t\t    \t\t<a target="_blank" href="/sub/'+t.id+'.html">'+t.name+"</a>\n\t\t    \t\t<p>"+t.summary+'</p>\n\t\t    \t\t<p class="gray" data-node="fans">粉丝：<span>'+t.subscribe_num+'</span></p>\n\t\t    \t</div>\n\t\t    \t<div class="sub-btn '+(1==t.is_subscribe?"active":"")+'" data-action="subscribe" data-subscribeid="'+t.id+'" data-status="'+t.is_subscribe+'">\n\t\t    \t\t<span class="on">+ 订阅</span>\n\t                <span class="off">已订阅</span>\n\t\t    \t</div>\n\t    \t</li>\n\t\t'}),e+="</ul></div>"}Object.defineProperty(e,"__esModule",{value:!0});var o=i("sjs2"),r=n(o),l=i("gbOH"),u=n(l),c=i("W3xz"),d=n(c);e.default=a}).call(e,i("7t+N"))},W3xz:function(t,e,i){"use strict";function n(t){var e=parseInt(t);return e<1e4?e:e>=1e4&&e<1e8?parseFloat((e/1e4).toFixed(1))+"万":e>=1e8&&e<Number.MAX_VALUE?parseFloat((e/1e8).toFixed(1))+"亿":"无限"}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},ZOV9:function(t,e,i){"use strict";function n(t){var e=(0,s.default)(t),i=parseInt(e.day),n=parseInt(e.hour);return i>0?e.day+":"+e.hour+":"+e.min+":"+e.sec:n>0?e.hour+":"+e.min+":"+e.sec:e.min+":"+e.sec}Object.defineProperty(e,"__esModule",{value:!0});var a=i("iadN"),s=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default=n},ZhOs:function(t,e,i){i("rZAI"),t.exports=i("iANj").Object.keys},fZjL:function(t,e,i){t.exports={default:i("ZhOs"),__esModule:!0}},gbOH:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=i("woOf"),s=n(a),o=i("Zx67"),r=n(o),l=i("Zrlr"),u=n(l),c=i("wxAW"),d=n(c),f=i("zwoO"),h=n(f),v=i("Pf15"),p=n(v),m=i("9Y5R"),g=(n(m),i("sit2")),b=n(g),y=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,u.default)(this,e);var i={api:"/v1/subscribe/set",selector:"[data-action=subscribe]",action:"subscribe"};return(0,h.default)(this,(e.__proto__||(0,r.default)(e)).call(this,(0,s.default)(i,t)))}return(0,p.default)(e,t),(0,d.default)(e,[{key:"getReqData",value:function(t){var e=1^t.status;return{id:t.id,actionType:e,formData:{publish_id:t.id,type:e}}}},{key:"_defaultDoSuccess",value:function(t){var e=t.res,i=t.$el,n=null;i.length&&(n=i.find('[data-node="count"]'),i.addClass("active"),i.data("status",1),n.text(this.formatNumber(e.data.total/1)))}},{key:"_defaultUndoSuccess",value:function(t){var e=t.res,i=t.$el,n=null;i.length&&(n=i.find('[data-node="count"]'),i.removeClass("active"),i.data("status",0),n.text(this.formatNumber(e.data.total/1)))}}]),e}(b.default);e.default=y},"h/5q":function(t,e,i){"use strict";function n(t,e){var i=new Date(t),n={"M+":i.getMonth()+1,"d+":i.getDate(),"h+":i.getHours(),"m+":i.getMinutes(),"s+":i.getSeconds(),"q+":Math.floor((i.getMonth()+3)/3),S:i.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(i.getFullYear()+"").substr(4-RegExp.$1.length)));for(var a in n)new RegExp("("+a+")").test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?n[a]:("00"+n[a]).substr((""+n[a]).length)));return e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},iadN:function(t,e,i){"use strict";function n(t){var e=0,i=0,n=0,a=0,o={},r=Math.floor;return t>0&&(e=r(t/1e3),e>=60&&(i=r(e/60),e%=60),i>=60&&(n=r(i/60),i%=60),n>=24&&(a=r(n/24),n%=24)),o.day=(0,s.default)(a,"00"),o.hour=(0,s.default)(n,"00"),o.min=(0,s.default)(i,"00"),o.sec=(0,s.default)(e,"00"),o}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n;var a=i("FJ4y"),s=function(t){return t&&t.__esModule?t:{default:t}}(a)},ioS7:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.debounce=function(t,e,i){var n=void 0;return function(){function a(){n=null,i||t.apply(s,o)}var s=this,o=arguments,r=i&&!n;clearTimeout(n),n=setTimeout(a,e),r&&t.apply(s,o)}},e.throttle=function(t,e){var i=void 0,n=void 0,a=0;return function(){function s(){a=Date.now(),i=null,t.apply(o,r)}n=Date.now()-a,i&&clearTimeout(i);var o=this,r=arguments;n>e?s():i=setTimeout(s,e-n)}}},njmC:function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=i("Zrlr"),s=n(a),o=i("wxAW"),r=n(o),l=function(){function t(){(0,s.default)(this,t),this.cache={}}return(0,r.default)(t,[{key:"on",value:function(t,e){(this.cache[t]||(this.cache[t]=[])).push(e)}},{key:"once",value:function(t,e){function i(){this.off(t,i),e.apply(this,arguments)}this.on(t,i)}},{key:"off",value:function(t){this.cache[t]=null}},{key:"emit",value:function(t){var e=this,i=[].concat(Array.prototype.slice.call(arguments));i.shift();var n=this.cache[t];n&&n.length>0&&n.forEach(function(t){t.apply(e,i)})}}]),t}();e.default=l},rZAI:function(t,e,i){var n=i("wXdB"),a=i("pEGt");i("30vf")("keys",function(){return function(t){return a(n(t))}})},"s4/o":function(t,e,i){"use strict";function n(t,e){s.default.get("v1/video/countGet",{domain:"domain-sault",data:{system:"video",id:t},success:function(t){e&&e(t)},error:function(t){}})}Object.defineProperty(e,"__esModule",{value:!0});var a=i("3o3C"),s=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default=n},sit2:function(t,e,i){"use strict";(function(t){function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=i("mvHQ"),s=n(a),o=i("Zx67"),r=n(o),l=i("Zrlr"),u=n(l),c=i("wxAW"),d=n(c),f=i("zwoO"),h=n(f),v=i("Pf15"),p=n(v),m=i("9Y5R"),g=n(m),b=i("3o3C"),y=n(b),w=i("njmC"),_=n(w),x=i("W3xz"),k=n(x),L=i("pH+Z"),M=i("w87c"),S="?"+M.apiParams.inParams,D=function(){},H=function(t){(0,g.default)(t.res.message)},O={},T=function(e){function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,u.default)(this,i);var e=(0,h.default)(this,(i.__proto__||(0,r.default)(i)).call(this));return e.api=t.api+S,e.selector=t.selector,e.action=t.action,e.delegate=t.delegate||"body",e.beforeRequest=t.beforeRequest||D,e.afterRequest=t.afterRequest||D,e.afterDoSuccess=t.afterDoSuccess||null,e.afterUndoSuccess=t.afterUndoSuccess||null,e.afterDoFail=t.afterDoFail||H,e.afterUndoFail=t.afterUndoFail||H,e.formatNumber=k.default,e.localStorageKey="gmv_pc_action",e._bindEvent(),e._init(),e._checkBeforeLogin(),e}return(0,p.default)(i,e),(0,d.default)(i,[{key:"_defaultDoSuccess",value:function(){}},{key:"_defaultUndoSuccess",value:function(){}},{key:"_bindEvent",value:function(){var t=this;this.on("doSuccess",function(e){"function"==typeof t.afterDoSuccess?t.afterDoSuccess(e):t._defaultDoSuccess(e)}),this.on("doFail",function(e){t.afterDoFail(e)}),this.on("undoSuccess",function(e){"function"==typeof t.afterUndoSuccess?t.afterUndoSuccess(e):t._defaultUndoSuccess(e)}),this.on("undoFail",function(e){t.afterUndoFail(e)})}},{key:"_init",value:function(){function e(e){var a=t(this),o=a.data(n+"id"),r=a.data("status");switch(r){case"true":r=1;break;case"false":r=0;break;default:r^=0}var l=n+o;return 1!=O[l]&&(M.loginFlag?(O[l]=1,i.request(i.getReqData({id:o,status:r})),!1):(localStorage.setItem(i.localStorageKey,(0,s.default)({action:n,id:o,status:r})),(0,L.login)(),!1))}var i=this,n=this.action;t(this.delegate).on("click",this.selector,e)}},{key:"_checkBeforeLogin",value:function(){var t=this,e=localStorage.getItem(this.localStorageKey),i=null,n=null;M.loginFlag&&e&&(n=JSON.parse(e),n.action==this.action&&(i={id:n.id,status:n.status},t.request(t.getReqData(i)))),localStorage.removeItem(this.localStorageKey)}},{key:"getReqData",value:function(t){var e=1^t.status;return{id:t.id,actionType:e,formData:{id:t.id,type:e}}}},{key:"request",value:function(e){var i=this,n=i.action,a=e.id,o=e.actionType;if(!1===i.beforeRequest(e))return!1;y.default.post(this.api,{domain:"domain-user",data:e.formData,success:function(e){var r="[data-"+i.action+'id="'+a+'"]',l=t(r),u=e.code,c={id:a,res:e,$el:l,$delegate:t(i.delegate)},d=["undoSuccess","doSuccess"],f=["undoFail","doFail"],h=[200,400008];if(200001==u)return localStorage.setItem(i.localStorageKey,(0,s.default)({action:n,id:a,status:1^o})),location.href=M.page.loginUrl,!1;-1!=h.indexOf(u)?i.emit(d[o],c):i.emit(f[o],c)},error:function(){(0,g.default)("网络请求失败，请稍后重试")},complete:function(){delete O[n+a],i.afterRequest(e)}})}}]),i}(_.default);e.default=T}).call(e,i("7t+N"))},sjs2:function(t,e,i){"use strict";(function(t){function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=i("woOf"),s=n(a),o=i("Zrlr"),r=n(o),l=i("wxAW"),u=n(l),c=function(){function e(i){(0,r.default)(this,e);var n={selector:"",prev:"",next:""};(0,s.default)(n,i),this.$slider=t(n.selector),this.$prev=t(n.prev),this.$next=t(n.next),this.$wrap=this.$slider.find("ul"),this.$item=this.$wrap.find("li"),this.itemLen=this.$item.length,this.sliderWidth=0,this.wrapWidth=0,this.itemWidth=0,this.itemGap=0,this.size=0,this.leftHide=0,this.isMoving=!1,this.timer=null,this._init()}return(0,u.default)(e,[{key:"_init",value:function(){this.setData(),this.initDom(),this.bindEvent()}},{key:"setData",value:function(){var t=this.$slider.width(),e=this.$item.width(),i=parseInt(this.$item.eq(1).css("marginLeft")),n=parseInt(this.$item.eq(1).css("marginRight")),a=i+n,s=(e+a)*this.itemLen-a;this.sliderWidth=t,this.wrapWidth=s,this.itemWidth=e,this.itemGap=a,this.size=Math.floor((t+a)/(e+a))}},{key:"initDom",value:function(){this.$wrap.css("width",this.wrapWidth),this.itemLen>this.size&&this.$prev.addClass("disabled"),this.$slider.append(this.$prev,this.$next)}},{key:"bindEvent",value:function(){var t=this;this.$prev.on("click",function(){t.transition(t.calcTranslatePrev())}),this.$next.on("click",function(){t.transition(t.calcTranslateNext())}),window.onresize=this.winResize.bind(this)}},{key:"calcTranslatePrev",value:function(){var t=void 0;return this.leftHide>this.size?(t=(this.itemWidth+this.itemGap)*(this.leftHide-this.size),this.leftHide=this.leftHide-this.size,this.$next.removeClass("disabled")):(t=0,this.leftHide=0,this.$prev.addClass("disabled"),this.$next.removeClass("disabled")),-t}},{key:"calcTranslateNext",value:function(){var t=void 0,e=void 0;return t=this.itemLen-this.leftHide-this.size,t>this.size?(e=(this.itemWidth+this.itemGap)*(this.size+this.leftHide),this.leftHide=this.size+this.leftHide,this.$prev.removeClass("disabled")):(e=(this.itemWidth+this.itemGap)*(t+this.leftHide),this.leftHide=t+this.leftHide,this.$next.addClass("disabled"),this.$prev.removeClass("disabled")),-e}},{key:"transition",value:function(t){var e=this;if(this.isMoving)return!1;this.isMoving=!0,this.$wrap.animate({left:t},0,function(){e.isMoving=!1})}},{key:"winResize",value:function(){var t=this;clearTimeout(this.timer),this.timer=setTimeout(function(){t.setData(),t.diffItem(),t.$wrap.css("width",t.wrapWidth)},200)}},{key:"diffItem",value:function(){var t=this.leftHide+this.size,e=void 0,i=void 0;t>=this.itemLen?(e=t-this.itemLen,i=(this.itemWidth+this.itemGap)*(this.leftHide-e),this.leftHide<e?(i=0,this.leftHide=0,this.$prev.addClass("disabled")):this.leftHide-=e,this.transition(-i),this.$next.addClass("disabled")):(i=(this.itemWidth+this.itemGap)*this.leftHide,this.transition(-i))}}]),e}();e.default=c}).call(e,i("7t+N"))},tgC9:function(t,e,i){"use strict";(function(t){function n(t){return t&&t.__esModule?t:{default:t}}function a(t,e){if(!t.videos.length)return{html:""};var i={},n='\n\t\t<div class="block-title">\n\t\t    <h2>'+t.name+'</h2>\n\t\t</div>\n\t\t<div class="hot-list" data-node="recommendSite4">\n\t\t    <ul class="clearfix list">\n\t';return t.videos.forEach(function(t,e){var a="sv".charAt(t.video_type);1==t.video_type&&(i[t.video_id]=t.video_id),n+='\n\t\t\t<li>\n\t\t\t    <div class="img">\n\t\t\t        <a href="/'+a+"/"+t.id+'.html" target="_blank">\n\t\t\t            <img src="'+t.image+'" alt="'+t.title+'">',n+=s(t),n+='</a>\n\t\t\t    </div>\n\t\t\t    <a href="/'+a+"/"+t.id+'.html" target="_blank" class="list-title" title="'+t.title+'">'+t.title+'</a>\n\t\t\t    <div class="num">\n\t\t\t        <a target="_blank" href="/sub/'+t.publisher.id+'.html" class="list-name">\n\t\t\t            <img src="'+t.publisher.icon+'">\n\t\t\t            <span>'+t.publisher.name+"</span>\n\t\t\t        </a>\n\t\t\t    </div>\n\t\t\t</li>\n\t\t"}),n+="\n\t\t    </ul>\n\t\t</div>\n\t",{html:n,ids:i}}function s(t){var e=(0,f.default)(t.length);if(0==t.video_type){var i="",n=(0,b.default)(1e3*t.start_time,"yyyy-MM-dd hh:mm");switch(~~t.live_status){case 1:i+='<span class="live">正在直播</span>';break;case 2:i+='<span class="live">即将直播</span>';break;default:i+='<span class="vod">直播回看</span>'}return"\n\t\t\t"+i+'\n\t\t\t<div class="img-text">\n\t\t\t    <span class="count">'+n+"</span>\n\t\t\t</div>\n\t\t"}return'\n\t\t\t<div class="img-text">\n\t\t\t    <span class="count hide" data-node="views" data-vid="'+t.video_id+'"><em class="icon-47"></em>0次</span>\n\t\t\t    <span class="time">'+e+"</span>\n\t\t\t</div>\n\t\t"}function o(e){if(0!=e.code)return!1;var i=e.data.list,n="",s={};if(!i.length)return!1;i.forEach(function(t,e){var i=a(t,e);n+=i.html,s=(0,c.default)(s,i.ids)}),y.append(n);var o=(0,l.default)(s).join(",");(0,v.default)(o,function(e){var i=e.data,n=t("[data-node=recommendSite4]");t.each(i,function(t,e){var i=(0,m.default)(e),a='<em class="icon-47"></em>'+i+"次";n.find("[data-vid="+t+"]").html(a).removeClass("hide")})})}Object.defineProperty(e,"__esModule",{value:!0});var r=i("fZjL"),l=n(r),u=i("woOf"),c=n(u),d=i("ZOV9"),f=n(d),h=i("s4/o"),v=n(h),p=i("W3xz"),m=n(p),g=i("h/5q"),b=n(g),y=t("[data-node=recommendSite4]");e.default=o}).call(e,i("7t+N"))},umEn:function(t,e,i){"use strict";(function(t){function e(t){return t&&t.__esModule?t:{default:t}}function n(t){if(!D)return!1;s.default.get(O[H].api,{domain:"domain-sault",success:function(e){O[H].renderHTML(e),H++,H>3&&(D=!1,t.noData()),t.unLock()},error:function(e){t.throwException(),(0,r.default)("网络请求异常")}})}i("RMz0"),i("bXnB"),i("HY96");var a=i("3o3C"),s=e(a),o=i("9Y5R"),r=e(o),l=i("2roW"),u=e(l),c=i("QLuy"),d=e(c),f=i("R8Gs"),h=e(f),v=i("O7yE"),p=e(v),m=i("MJvr"),g=e(m),b=i("RUbq"),y=e(b),w=i("tgC9"),_=e(w),x=i("s4/o"),k=e(x),L=i("W3xz"),M=e(L);(0,d.default)(),new h.default({selector:"[data-node=indexBanner]",speed:5e3}),new p.default,function(){var e=t("[data-node=recommendSite1]"),i=[];t.each(e,function(e,n){var a=t(n).find("[data-node=views]");t.each(a,function(e,n){var a=t(n).data("vid");i.push(a)})});var n=i.join(",");if(""===n)return!1;(0,k.default)(n,function(e){var i=e.data,n=t("[data-node=recommendSite1]");t.each(i,function(t,e){var i=(0,M.default)(e),a='<em class="icon-47"></em>'+i+"次";n.find("[data-vid="+t+"]").html(a).removeClass("hide")})})}();var S=t("[data-node=scrollLoadBar]"),D=!0,H=1,O={1:{api:"v1/cms/slot/videoRecommend?unique_key=middlerecommend",renderHTML:g.default},2:{api:"v1/video/hotPublish",renderHTML:y.default},3:{api:"v1/cms/slot/videoRecommend?unique_key=bottomrecommend",renderHTML:_.default}},T=new u.default(S[0],function(t){n(t)},{isInitLock:!1,loadingHtml:'<div class="infinite-scroll"><em class="icon-49"></em><span>加载中...</span></div>',noDataHtml:'<div class="infinite-scroll"><span>没有更多了</span></div>',exceptionHtml:'<div class="infinite-scroll error" data-node="errorNode"><span>出错啦~请重试</span></div>'});S.on("click","[data-node=errorNode]",function(){T.solveException()})}).call(e,i("7t+N"))},woOf:function(t,e,i){t.exports={default:i("Eif7"),__esModule:!0}},xVc6:function(t,e,i){"use strict";var n=i("pEGt"),a=i("THEY"),s=i("bSeU"),o=i("wXdB"),r=i("wiaE"),l=Object.assign;t.exports=!l||i("zyKz")(function(){var t={},e={},i=Symbol(),n="abcdefghijklmnopqrst";return t[i]=7,n.split("").forEach(function(t){e[t]=t}),7!=l({},t)[i]||Object.keys(l({},e)).join("")!=n})?function(t,e){for(var i=o(t),l=arguments.length,u=1,c=a.f,d=s.f;l>u;)for(var f,h=r(arguments[u++]),v=c?n(h).concat(c(h)):n(h),p=v.length,m=0;p>m;)d.call(h,f=v[m++])&&(i[f]=h[f]);return i}:l}},["umEn"]);