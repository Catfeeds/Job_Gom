/*
 * sitemoniter-gomecom-pc-v2 v1.0.5, bundle: 2017-06-06 17:39
 * (c) 2017 gomeBigData
 */
!function(){function e(e){var t=new Date,n=arguments;if(n.length>1){var i=n[2]||0,o=n[3]||"/",r=n[4]||0,a=n[5]||0;return i&&t.setTime(t.getTime()+1e3*i),document.cookie=e+"="+escape(n[1])+(i?"; expires="+t.toGMTString():"")+"; path="+o+(r?"; domain="+r:"")+(a?"; secure":""),n[1]}var c=document.cookie.match("(?:^|;)\\s*"+e+"=([^;]*)");return c?unescape(c[1]):0}!function(e,t,n){if(!e.BP){var i=t.getElementsByTagName(n)[0],o=t.createElement(n);o.async=!0,/pre|dev|test|atg|uat/.test(e.location.host)?o.src="//js.uatplus.com/sitemonitor/uba-sdk.min.js?v=9442895533":o.src="//js.gomein.net.cn/sitemonitor/uba-sdk.min.js?v=9442895533",i.parentNode.insertBefore(o,i)}}(window,document,"script"),window.BPConfig=window.BPConfig||{};var t=window.location.host,n=/\.?(.+)\.gomeplus\.com/,i=/^(.+\.)*gome\.com\.cn/,o=[{key:"dc-7",rule:/pre|dev|test|atg|uat/},{key:"dc-14",rule:/^(.+\.)*wap\.gomegj\.com/},{key:"dc-10",rule:/^(.+\.)*diy\.gome\.com\.cn/},{key:"dc-12",rule:/^(.+\.)*m\.gomehigo\.hk/},{key:"dc-2",rule:/^(.+\.)*(m\.gome\.com\.cn|m\.gomeplus\.com)/},{key:"dc-6",rule:/^(.+\.)*gomehigo\.hk/},{key:"dc-1",rule:i},{key:"dc-13",rule:/^(.+\.)*gomegj\.com/},{key:"dc-16",rule:n}],r=window.BPConfig.tid;if(n.test(t),null==r){for(var a=0,c=o;a<c.length;a++){var s=c[a];if(s.rule.exec(t)){r=s.key;break}}window.BPConfig.tid=r}window.ClickiTrackerName="gomeClicki",window.gomeClicki=window.gomeClicki||function(){(window.gomeClicki.queue=window.gomeClicki.queue||[]).push(arguments)},window.gomeClicki.start=+new Date,gomeClicki("create",r,"auto",{clientId:function(e){for(var t;e.length;)if(t=function(e){var t=document.cookie.match("(?:^|;)\\s*"+e+"=([^;]*)");return t?unescape(t[1]):void 0}(e.shift()))return t}(["__clickidc","__c_visitor"])}),gomeClicki("set",function(){var e={};""!=document.referrer&&(e.dimension3=document.referrer),"undefined"!=typeof dsp_gome_c1name&&(e.dimension4=dsp_gome_c1name,e.dimension5=dsp_gome_c2name,e.dimension6=dsp_gome_c3name,e.dimension7=dsp_gome_c1id,e.dimension8=dsp_gome_c3id),"undefined"!=typeof prdInfo&&(e.dimension4=prdInfo.firstCategoryName,e.dimension5=prdInfo.secondCategoryName,e.dimension6=prdInfo.thirdCategoryName,e.dimension7=prdInfo.firstCategoryId,e.dimension8=prdInfo.thirdCategoryId,e.dimension9=prdInfo.prdId,e.dimension10=prdInfo.prdName,e.dimension13=prdInfo.sku,""!==prdInfo.shopNo&&(e.dimension14=prdInfo.shopNo),""!==prdInfo.itemId&&(e.dimension15=prdInfo.itemId),e.metric1=1),"undefined"!=typeof itemId&&(e.dimension15=itemId,"undefined"!=typeof prodid)&&(e.dimension9=prodid);var t=document.getElementById("c8_shop_mId"),n=t&&t.value;return n&&(e.dimension14=n),e.dimension20="20170607",e}()),gomeClicki("send","pageview"),function(e,t,n){function i(){}function o(e){return"function"==typeof e}function r(e){return"[object Array]"==pe.call(Object(e))}function a(e){return void 0!=e&&-1<(e.constructor+"").indexOf("String")}function c(e,t){if(a(e)&&(e=t[e]),!o(e))return i;var n=he.call(arguments,2);return function(){return e.apply(t,n.concat(he.call(arguments)))}}function s(t){var n=e.console,r=ve,c=e[r]=e[r]||[];we&&(we&&a(ge)&&(ge+=ge.indexOf("?")>-1?"&":"?",ge+="f="+encodeURIComponent(t)+"&m="+encodeURIComponent(he.call(arguments,1).join(""))+"&hash="+u(),f(ge,i,!0)),c.push(he.call(arguments)),c.length>ye&&c.splice(0,ye-c.length),n&&n.log&&o(n.log)&&(o(n.log.apply)?n.log.apply(n,arguments):n.log(arguments[0])))}function u(){return Math.round(2147483647*Math.random())}function d(e){var t,n=1,i=0;if(e)for(n=0,t=e.length-1;0<=t;t--)i=e.charCodeAt(t),n=(n<<6&268435455)+i+(i<<14),i=266338304&n,n=0!==i?n^i>>21:n;return n}function l(){for(var e,t=[],n=arguments.length,i=0;i<n;i++)e=arguments[i],i>0&&(e=0===e.indexOf("/")?e.slice(1):e),i<n-1&&(e="/"===e.slice(-1)?e.slice(0,e.length-1):e),t.push(e);return t.join("/")}function f(i,o,r){var a,c;try{a="_clickiv4_"+ +new Date+u(),c=e[a]=new Image,c.onload=c.onerror=function(){try{o(),c.onload=c.onerror=e[a]=n}catch(t){}},c.src=i}catch(d){try{c=t.createElement("img"),c.onload=c.onerror=function(){try{o(),c.onload=c.onerror=e[a]=n}catch(t){}},c.src=i}catch(l){r||s("createImage","error message is: ",d.message)}}}function h(e,n,i,o){if(e){var r=t.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.id=n,i&&(r.addEventListener?r.onload=i:r.onreadystatechange=function(){r.readyState in{loaded:1,complete:1}&&(r.onreadystatechange=null)}),o&&(r.onerror=o);var a=t.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a)}}function p(e,t,n,i){e.addEventListener?e.addEventListener(t,n,!!i):e.attachEvent&&e.attachEvent("on"+t,n)}function g(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n)}function m(e){var n=new Date,i=arguments;if(i.length>1){var o=i[2]||0,r=i[3]||"/",a=i[4]||0,c=i[5]||0;return o&&n.setTime(n.getTime()+1e3*o),t.cookie=e+"="+escape(i[1])+(o?"; expires="+n.toGMTString():"")+"; path="+r+(a&&"none"!=a?"; domain="+a:"")+(c?"; secure":""),i[1]}var s=t.cookie.match("(?:^|;)\\s*"+e+"=([^;]*)");return s?unescape(s[1]):0}function v(){var e=""+t.location.hostname;return 0===e.indexOf("www.")?e.substring(4):e}function y(e){var n=t.referrer;if(/^https?:\/\//i.test(n)){if(e)return n;var i="//"+t.location.hostname,o=n.indexOf(i);if(5===o||6===o){var r=n.charAt(o+i.length);if("/"===r||"?"===r||""===r||":"===r)return}return n}}function w(){var t,n,i;if((i=(i=e.navigator)?i.plugins:null)&&i.length)for(var o=0;o<i.length&&!n;o++){var r=i[o];-1<r.name.indexOf("Shockwave Flash")&&(n=r.description)}if(!n)try{t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),n=t.GetVariable("$version")}catch(a){}if(!n)try{t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),n="WIN 6,0,21,0",t.AllowScriptAccess="always",n=t.GetVariable("$version")}catch(c){}if(!n)try{t=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),n=t.GetVariable("$version")}catch(s){}return n&&(t=n.match(/[\d]+/g))&&3<=t.length&&(n=t[0]+"."+t[1]+" r"+t[2]),n||void 0}function k(e,t){return e.name=t}function b(e,t){var n,i,o=0,r={};for(i=Math.min(e.length+1,t.length);o<i;o++)if("object"==typeof t[o])for(n in t[o])t[o].hasOwnProperty(n)&&(r[n]=t[o][n]);else e.length>o&&(r[e[o]]=t[o]);return r}function E(e,t){return 1==t.length&&null!=t[0]&&"object"==typeof t[0]?t[0]:b(e,t)}function I(){return le.userAgent.indexOf("Firefox")>=0&&![].reduce}function C(e,t){return t=t||i,e.length<=2036?T(e,t):e.length<=8192&&!I()?S(e,t)||_(e,t)||j(e,t):(s("send","request param is to long ",e.length),!1)}function T(e,t){t=t||i,f(l(be,Ee)+"?"+e,t)}function _(t,n){if(n=n||i,!e.XDomainRequest)return!1;var o=new e.XDomainRequest;return o.open("POST",l(be,Ie)),o.onerror=function(){n()},o.onload=n,o.send(t),!0}function S(t,n){if(n=n||i,!e.XMLHttpRequest)return!1;var o=new e.XMLHttpRequest;return"withCredentials"in o&&(o.open("POST",l(be,Ie),!0),o.setRequestHeader("Content-Type","text/plain"),o.onreadystatechange=function(){4==o.readyState&&(n(),n=null)},o.send(t),!0)}function j(n,o){var r,a,c,s,u=0,d=!1;if(o=o||i,c=function(){a.src="",a.parentNode&&a.parentNode.removeChild(a)},s=function(){if(!d)try{if(u>9||a.contentWindow.location.host==t.location.host)return d=!0,c(),g(e,"beforeunload",c),void o()}catch(n){u++,setTimeout(s,200)}},t.body){n+="####==collect_path="+l(be,Ce)+"==####",n=encodeURIComponent(n);try{a=t.createElement('<iframe name="'+n+'"></iframe>')}catch(m){a=t.createElement("iframe"),k(a,n)}a.height="0",a.width="0",a.style.display="none",a.style.visibility="hidden",r=l(be,Te)+"#",r+=encodeURIComponent(t.location.protocol+"//"+t.location.host+"/favicon.ico"),p(e,"beforeunload",c),p(a,"load",s),t.body.appendChild(a),a.src=r}else{var f=arguments,h=arguments.callee;setTimeout(function(){h.apply(e,f)},100)}}function N(){this.keys=[],this.t1={},this.t2={}}function x(e,t,n,i,o){var r=this;k(r,e),r.protocolParameter=t,r.defaultValue=n,r.getter=i,r.setter=o}function L(e,t,n,i,o){var r=new x(e,t,n,i,o);return Se.set(r.name,r),r.name}function O(e,t){_e.push([new RegExp("^"+e+"$"),t])}function P(e,t,n){return L(e,t,n,void 0,i)}function A(e){var t=Se.get(e);if(!t)for(var n=0;n<_e.length;n++){var i=_e[n],o=i[0].exec(e);o&&(t=i[1](o),Se.set(t.name,t))}return t}function M(e){var t;return Se.map(function(n,i){i.protocolParameter==e&&(t=n)}),t}function q(e,t){var n=e.get(t);return void 0==n?"":""+n}function B(e,t){var n=e.get(t);return void 0==n?0:1*n}function R(){var e=this;return function(e,t){return e&&e.hasOwnProperty&&e instanceof t}(e,R)||(e=new R,e.init()),e}function V(){this.data=new N}function F(){this.stack=[]}function z(){var e=t.location.protocol;if("http:"!=e&&"https:"!=e)throw s("checkProtocolTask","current protocol is:",e),"abort"}function G(e){return e.length>1&&e.lastIndexOf("/")==e.length-1&&(e=e.substr(0,e.length-1)),0!==e.indexOf("/")&&(e="/"+e),e}function D(e){return 0===e.indexOf(".")?e.substr(1):e}function X(e){if("cookie"===q(e,mt)){var t=[],n=e.get(ft),i=G(e.get(pt)),o=D(e.get(ht)),r=e.get(gt),a=q(e,Le),c=v().split(".");if("auto"!=o&&(m(n,a,r,i,o),m(n)==a))return void(St=!0);if(4==c.length&&c[c.length-1]>0)t=["none"];else{for(var s=c.length-2;s>=0;s--)t.push(c.slice(s).join("."));t.push("none")}for(var u=0;u<t.length;u++)if(o=t[u],m(n,a,r,i,o),m(n)==a)return e.set(ht,o),void(St=!0);e.set(ht,"auto")}}function H(e){"cookie"!==q(e,mt)||St||(X(e),St)||e.data.set(Le,0)}function U(e){if(100!==e.get(yt)&&d(q(e,Le))%1e4>=100*B(e,yt))throw s("samplerTask","current sampleRate is: ",e.get(yt)),"abort"}function $(e){var t=[];Se.map(function(n,i){if(i.protocolParameter){var o=e.get(n);0!==o&&o!=i.defaultValue&&("boolean"==typeof o&&(o*=1),t.push(i.protocolParameter+"="+encodeURIComponent(""+o)))}}),t.push("z="+u()),e.set(We,t.join("&"),!0)}function K(e){var t=q(e,We),n=e.get(Ke);switch(e.get(xe)){case"image":T(t,n);break;case"cors":S(t,n)||_(t,n);break;case"iframe":j(t,n);break;default:C(t,n)}e.set(Ke,i,!0)}function W(){for(var n=le.appName+le.version+le.platform+le.userAgent+(t.cookie||"")+(t.referrer||""),i=n.length,o=e.history.length;o>0;)n+=o--^i++;return[u()^2147483647&d(n),String((new Date).getTime()).substr(2,8)].join("").substr(0,18)}function J(e,t){var n=e.get(ft),i=m(n);t||(t=i||W()),e.data.set(Le,t),X(e)}function Q(e){var n="CSS1Compat"===t.compatMode?"documentElement":"body";if(e.set("referrer",y(e.get(kt))),fe){var i=fe.pathname||"";"/"!=i.charAt(0)&&(i="/"+i),e.set(Ge,fe.protocol+"//"+fe.hostname+i+fe.search),de&&(e.set(Pe,de.width+"*"+de.height),e.set(qe,de.colorDepth+"-bit")),e.set(Ae,t[n].clientWidth+"*"+t[n].clientHeight),e.set(Ve,w()),e.set(Me,t.characterSet||t.charset);var r="",a=!1;try{a=le&&o(le.javaEnabled)&&le.javaEnabled()||!1}catch(c){s("collectClientInfo","javaEnabled error",c.message)}try{r=(le&&(le.language||le.browserLanguage)||"").toLowerCase()}catch(u){s("collectClientInfo","language error",u.message)}e.set(Re,a),e.set(Be,r)}}function Y(t){var n=e.performance||e.webkitPerformance,i=n&&n.timing;if(!i)return!1;var o=i.navigationStart;return 0!==o&&(t[Ze]=i.loadEventStart-o,t[tt]=i.domainLookupEnd-i.domainLookupStart,t[ot]=i.connectEnd-i.connectStart,t[it]=i.responseStart-i.requestStart,t[et]=i.responseEnd-i.responseStart,t[nt]=i.fetchStart-o,t[rt]=i.domInteractive-o,t[at]=i.domContentLoadedEventStart-o,!0)}function Z(t){if(e.top!=e)return!1;var n=e.external,i=n&&n.onloadT;return n&&!n.isValidLoadTime&&(i=void 0),i>2147483648&&(i=void 0),i>0&&n.setPageReadyTime(),void 0!=i&&(t[Ze]=i,!0)}function ee(e,t){var n=e[t];(isNaN(n)||Infinity==n||0>n)&&(e[t]=void 0)}function te(t,n){var i=Math.min(B(t,wt),100);if(d(q(t,Le))%100<i){var o=[];if(Y(o)||Z(o)){var r=o[Ze];void 0!=r&&isFinite(r)&&!isNaN(r)&&(r>0?(ee(o,tt),ee(o,ot),ee(o,it),ee(o,et),ee(o,nt),ee(o,rt),ee(o,at),n(o)):p(e,"load",function(){te(t,n)},!1))}}}function ne(e){e.timingIsSended||(e.timingIsSended=!0,te(e.storage,function(t){e.storage.set(ze,!0,!0),e.send("timing",t)}))}function ie(e){if(e.storage.get(vt))for(var t=0;t<ke.length;t++)!function(e,t){setTimeout(function(){e.storage.set(ze,!0,!0),e.send("pulse")},1e3*t)}(e,ke[t])}function oe(e){function t(e,t){i.storage.data.set(e,t)}function n(e,n){t(e,n),i.filters.add(e)}var i=this;i.storage=new V,i.filters=new F,t(lt,e[lt]),t(Ne,e[Ne]),t(ft,e[ft]),t(ht,e[ht]||v()),t(pt,e[pt]),t(gt,e[gt]),t(yt,e[yt]),t(xe,e[xe]),t(wt,e[wt]),t(vt,e[vt]),t(kt,e[kt]),t(Oe,e[Oe]),n(bt,z),n(Et,H),n(It,U),n(Ct,$),n(Tt,K),J(i.storage,e[Le]),Q(i.storage),ie(i)}function re(e,t){var n=this;n.id=e,n.url=t,n.factory=null,n.instance=null,n.loading=!1,n.ready=!1,n.queue=[],n.prefix="plugin_2015_",n.load()}function ae(){this.plugins={}}function ce(e){return e.indexOf(".")+e.indexOf(":")>-2}function se(e){var t=this;if(o(e[0]))t.ready=e[0];else{var n=Nt.exec(e[0]);if(null!=n&&4==n.length&&(t.name=n[1]||me,t.pluginId=n[2]||"",t.action=n[3],t.opts=he.call(e,1)),!t.action)throw s("Env","no action"),"abort";if("require"===t.action&&(!a(e[1])||""===e[1]))throw s("Env","unexpected require arg: ",e[1]),"abort";if("provide"===t.action&&(!a(e[1])||""===e[1]))throw s("Env","unexpected provide arg: ",e[1]),"abort";if(ce(t.pluginId)||ce(t.action))throw s("Env","pluginId or action has  keyword ."),"abort";if("provide"===t.action&&t.name!=me)throw s("Env","provide not need trackerName"),"abort"}}function ue(){xt.append.apply(xt,[arguments])}var de=e.screen,le=e.navigator,fe=e.location,he=Array.prototype.slice,pe=Object.prototype.toString,ge="",me="t0",ve="clickiLogStack2015",ye=3e3,we=fe.hash.indexOf("clicki/debug/")>-1||!1,ke=[],be=("https:"==fe.protocol?"https:":"http:")+"//sm.gome.com.cn/",Ee="collect/track_proxy",Ie="collect/track_ajax",Ce="collect/track_ajax",Te="collect_iframe.html";N.prototype.set=function(e,t,n){this.keys.push(e),n?this.t2[":"+e]=t:this.t1[":"+e]=t},N.prototype.get=function(e){return this.t2.hasOwnProperty(":"+e)?this.t2[":"+e]:this.t1[":"+e]},N.prototype.map=function(e){for(var t=0;t<this.keys.length;t++){var n=this.keys[t],i=this.get(n);i&&e(n,i)}};var _e=[],Se=new N,je=R.prototype;je.init=function(){return this.data=[],this.dataLock=[],this.gestureCache=[],this.gestureBindLock=!1,this.binder=["binderScroll","binderKeydown","binderResize","binderMousedown","binderMousemove","binderSwipe","binderTurn","binderPinch"],this.bindEvents(),this.reset(),this},je.bindEvents=function(){for(var e=0;e<this.binder.length;e++)this.dataLock[e]=!1,this[this.binder[e]](e)},je.onGesturesEventTrigger=function(e){for(var t=this.gestureCache,n=e.touches?e.touches.length:1,i=n>=2?"pinch":"swipe",o=0;o<t.length;o++)t[o]&&t[o][0]===i&&this.onEventTrigger(t[o][1])},je.bindGesturesEvent=function(n,i){this.gestureCache.push([n,i]);var o="ontouchstart"in e;!this.gestureBindLock&&o&&t.addEventListener("touchmove",c(this.onGesturesEventTrigger,this),!1)},je.onEventTrigger=function(e){this.dataLock[e]||(this.dataLock[e]=!0,this.data[e]=1)},je.binderScroll=function(t){p(e,"scroll",c(this.onEventTrigger,this,t))},je.binderKeydown=function(e){p(t,"keydown",c(this.onEventTrigger,this,e))},je.binderResize=function(t){p(e,"resize",c(this.onEventTrigger,this,t))},je.binderMousedown=function(e){p(t,"mousedown",c(this.onEventTrigger,this,e))},je.binderMousemove=function(e){p(t,"mousemove",c(this.onEventTrigger,this,e))},je.binderSwipe=function(e){this.bindGesturesEvent("swipe",e)},je.binderTurn=function(t){e.orientation&&e.addEventListener("orientationchange",c(this.onEventTrigger,this,t),!1)},je.binderPinch=function(e){this.bindGesturesEvent("pinch",e)},je.reset=function(){for(var e=0;e<this.binder.length;e++)this.data[e]=0},je.get=function(){var e=this.data.join("-");return this.reset(),e},L("protocolVersion","v");var Ne=P("trackingId","tid");L("anonymizeIp","aip"),L("queueTime","qt");var xe=L("forceSendMethod"),Le=P("clientId","cid"),Oe=L("userId","uid");L("miaozhenId","mzid"),L("sessionControl","sc",""),L("referrer","dr"),L("googleCampaignName","cn"),L("googleCampaignSource","cs"),L("googleCampaignMedium","cm"),L("googleCampaignKeyword","ck"),L("googleCampaignContent","cc"),L("miaozhenCampaignId","mzc"),L("miaozhenCampaignId","mzs"),L("miaozhenCampaignId","mzk"),O("customAds([0-9]+)",function(e){return new x(e[0],"ca"+e[1])});var Pe=L("screenResolution","sr"),Ae=L("viewportSize","vp"),Me=L("encoding","de"),qe=L("screenColors","sd"),Be=L("language","ul"),Re=L("javaEnabled","je"),Ve=L("flashVersion","fl"),Fe=L("hitType","t"),ze=L("nonInteraction","ni",void 0,function(e,t,n){return void 0!=n&&n}),Ge=L("location","dl","");L("hostname","dh");var De=L("page","dp","");L("title","dt",function(){return t.title||void 0}),L("appName","an"),L("appId","aid",""),L("appVersion","av",""),L("appInstallerId","aiid","");var Xe=L("eventCategory","ec"),He=L("eventAction","ea"),Ue=L("eventLabel","el"),$e=L("eventValue","ev");L("customActionId","caid"),O("customActionLabel([0-9]+)",function(e){return new x(e[0],"cal"+e[1])}),O("customActionValue([0-9]+)",function(e){return new x(e[0],"cav"+e[1])}),O("dimension([0-9]+)",function(e){return new x(e[0],"cd"+e[1])}),O("metric([0-9]+)",function(e){return new x(e[0],"cm"+e[1])}),function(e,t,n,o){L("userBehavior","ub",void 0,o,i)}(0,0,0,c("get",R()));var Ke=L("hitCallback"),We=L("hitPayload"),Je=L("socialNetwork","sn"),Qe=L("socialAction","sa"),Ye=L("socialTarget","st"),Ze=L("l1","plt"),et=L("l2","pdt"),tt=L("l3","dns"),nt=L("l4","rrt"),it=L("l5","srt"),ot=L("l6","tcp"),rt=L("l7","dit"),at=L("l8","clt"),ct=L("timingCategory","utc"),st=L("timingVar","utv"),ut=L("timingLabel","utl"),dt=L("timingValue","utt"),lt=P("name"),ft=P("cookieName",void 0,"__clickidc"),ht=P("cookieDomain"),pt=P("cookiePath",void 0,"/"),gt=P("cookieExpires",void 0,31536e4),mt=P("storage",void 0,"cookie"),vt=P("sendPulse",void 0,!0),yt=P("sampleRate","sf",100),wt=P("siteSpeedSampleRate",void 0,10),kt=P("alwaysSendReferrer",void 0,!1),bt=L("checkProtocolTask"),Et=L("checkStorageTask"),It=L("samplerTask"),Ct=L("buildHitTask"),Tt=L("sendHitTask"),_t=!1;L("forceSSL",void 0,void 0,function(){return _t},function(e,t,n){_t=!!n}),O("\\&(.*)",function(e){var t=new x(e[0],e[1]),n=M(e[0].substring(1));return n&&(t.getter=function(e){return e.get(n)},t.setter=function(e,t,n,i){e.set(t,n,i)},t.protocolParameter=void 0),t}),V.prototype.clearTemp=function(){this.data.t2={}},V.prototype.get=function(e){var t=A(e),n=this.data.get(e);return t&&void 0==n&&(n=o(t.defaultValue)?t.defaultValue():t.defaultValue),t&&o(t.getter)?t.getter(this,e,n):n},V.prototype.set=function(e,t,n){if(e)if("object"==typeof e)for(var i in e)e.hasOwnProperty(i)&&arguments.callee.call(this,i,e[i],n);else{var r=A(e);r&&o(r.setter)?r.setter(this,e,t,n):this.data.set(e,t,n)}},F.prototype.add=function(e){this.stack.push(e)},F.prototype.run=function(t){try{for(var n=0;n<this.stack.length;n++){var r=t.get(this.stack[n]);o(r)&&r.call(e,t)}}catch(c){}var a=t.get(Ke);a!=i&&(t.set(Ke,i,!0),setTimeout(a,10))};var St=!1;oe.prototype.get=function(e){return this.storage.get(e)},oe.prototype.set=function(e,t){return this.storage.set(e,t),this};var jt={pageview:[De],event:[Xe,He,Ue,$e],social:[Je,Qe,Ye],timing:[ct,st,ut,dt]};oe.prototype.send=function(){var e,t;arguments.length>0&&(a(arguments[0])?(e=arguments[0],t=he.call(arguments,1)):(e=arguments[0]&&arguments[0][Fe],t=he.call(arguments))),e&&(t=E(jt[e]||[],t),t[Fe]=e,this.storage.set(t,void 0,!0),this.filters.run(this.storage),"pageview"===e&&ne(this),this.storage.clearTemp())},re.prototype.load=function(){var e=this;e.loading=!0,h(e.url,e.prefix+e.id)},re.prototype.provide=function(e,t){var n;this.factory=e,this.ready=!0,this.loading=!1;try{this.instance=new e(t)}catch(i){this.instance={},s("plugin provide","factory init error; plugin id is:",this.id,";error message is:",i.message)}for(;n=this.queue.shift();)this.use.apply(this,n)},re.prototype.use=function(e,t){var n=this.instance;if(this.ready)try{n[e].apply(n,t)}catch(i){s("plugin use","action is: ",e,"; plugin id is:",this.id,";error message is:",i.message)}else this.queue.push(he.call(arguments))},ae.prototype.getAll=function(){return this.plugins},ae.prototype.get=function(e){return this.plugins[e]},ae.prototype.set=function(e,t){this.plugins[e]=t},ae.prototype.use=function(e,t,n){var i=this.get(e);i&&i.use&&i.use(t,n)},ae.prototype.require=function(e,t){this.get(e)||this.set(e,new re(e,t))},ae.prototype.provide=function(e,t,n){var i=this.get(e);i&&i.provide&&i.provide.apply(i,he.call(arguments,1))};var Nt=/^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,xt={};xt.envs=[],xt.pluginM=new ae,xt.process=function(){for(var e=[],t=0;t<arguments.length;t++)try{e.push(new se(arguments[t]))}catch(n){}return e},xt.run=function(t){try{if(t.ready)t.ready.call(e,ue.getByName(me));else{var n=ue.getByName(t.name);if(t.pluginId)return this.pluginM.use(t.pluginId,t.action,t.opts);switch(t.action){case"create":ue.create.apply(ue,t.opts);break;case"remove":ue.remove.call(ue,t.name);break;case"require":this.pluginM.require.apply(this.pluginM,t.opts);break;case"provide":this.pluginM.provide.apply(this.pluginM,t.opts.concat([n]));break;default:n[t.action].apply(n,t.opts)}}}catch(i){s("controller.run",i.message)}},xt.append=function(){var e=this,t=e.process.apply(e,arguments);for(t=e.envs.concat(t),e.envs=[];t.length&&(e.run(t.shift()),!(e.envs.length>0)););e.envs=e.envs.concat(t)};var Lt=[],Ot=function(e,t,n){var i,o;return a(e.ClickiTrackerName)&&(o=e.ClickiTrackerName,i=o?o.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""):""),i||"dc"}(e);ue.lock=Lt,ue.cache={},ue.start=0,ue.stack=[];var Pt=[Ne,ht,lt];ue.create=function(){var e=E(Pt,he.call(arguments));e[lt]||(e[lt]=me);var t=""+e[lt];if(ue.cache[t])return ue.cache[t];var n=new oe(e);return ue.cache[t]=n,ue.stack.push(n),n},ue.remove=function(e){for(var t=0;t<ue.stack.length;t++)if(ue.stack[t].get(lt)==e){ue.stack.splice(t,1),ue.cache[e]=null;break}},ue.getAll=function(){return ue.stack.slice(0)},ue.getByName=function(e){return ue.cache[e]},ue.init=function(){var t=e[Ot];if(!t||t.lock!=Lt){we=!!t.debug,ge=t.debugSendUrl,ue.loaded=!0,ue.start=t&&t.start,e[Ot]=ue;var n=t&&t.queue;r(n)&&xt.append.apply(xt,n)}},ue.init()}(window,document);for(var u=e("__clickidc"),d=e("__c_visitor"),l=document.domain.split("."),f=[],h=l.length-2;h>=0;h--)f.push(l.slice(h).join("."));for(var h=0;h<f.length&&(d?e("__c_visitor",d,31536e4,"/",f[h]):e("__c_visitor",u,31536e4,"/",f[h]),e("__clickidc")!=e("__c_visitor"));h++);window._wall_switch===undefined&&window.setTimeout(function(){!function(e,t,n,i,o,r){e[i]=e[i]||[];var a=e[o]=e[o]||{};e.tagmangerGlobalObject=o,a[10402]={dlName:i};var c=t.getElementsByTagName(n)[0],s=t.createElement(n);s.async=!0,s.src="//js.gomein.net.cn/sitemonitor/10402.js",c.parentNode.insertBefore(s,c)}(window,document,"script","dataLayer","tagmanager")},4e3),function(e,t,n,i,o,r){e[i]=e[i]||[];var a=e[o]=e[o]||{};e.tagmangerGlobalObject=o,a[10119]={dlName:i};var c=t.getElementsByTagName(n)[0],s=t.createElement(n);s.async=!0,s.src="//js.gomein.net.cn/sitemonitor/10119.js",c.parentNode.insertBefore(s,c)}(window,document,"script","dataLayer","tagmanager")}();