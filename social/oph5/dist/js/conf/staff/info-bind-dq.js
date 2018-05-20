define("vendors/zepto.js",function(t,e,n){var i=function(){function t(t){return null==t?String(t):V[X.call(t)]||"object"}function e(e){return"function"==t(e)}function n(t){return null!=t&&t==t.window}function i(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function r(e){return"object"==t(e)}function o(t){return r(t)&&!n(t)&&Object.getPrototypeOf(t)==Object.prototype}function a(t){return"number"==typeof t.length}function c(t){return A.call(t,function(t){return null!=t})}function s(t){return t.length>0?E.fn.concat.apply([],t):t}function u(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function l(t){return t in O?O[t]:O[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function f(t,e){return"number"!=typeof e||L[u(t)]?e:e+"px"}function d(t){var e,n;return N[t]||(e=_.createElement(t),_.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),N[t]=n),N[t]}function h(t){return"children"in t?P.call(t.children):E.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function p(t,e,n){for(T in e)n&&(o(e[T])||W(e[T]))?(o(e[T])&&!o(t[T])&&(t[T]={}),W(e[T])&&!W(t[T])&&(t[T]=[]),p(t[T],e[T],n)):e[T]!==w&&(t[T]=e[T])}function m(t,e){return null==e?E(t):E(t).filter(e)}function v(t,n,i,r){return e(n)?n.call(t,i,r):n}function g(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function y(t,e){var n=t.className||"",i=n&&n.baseVal!==w;return e===w?i?n.baseVal:n:void(i?n.baseVal=e:t.className=e)}function b(t){try{return t?"true"==t||"false"!=t&&("null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?E.parseJSON(t):t):t}catch(e){return t}}function x(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)x(t.childNodes[n],e)}var w,T,E,C,S,j,k=[],P=k.slice,A=k.filter,_=window.document,N={},O={},L={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},M=/^\s*<(\w+|!)[^>]*>/,B=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,D=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,$=/^(?:body|html)$/i,R=/([A-Z])/g,q=["val","css","html","text","data","width","height","offset"],z=["after","prepend","before","append"],U=_.createElement("table"),F=_.createElement("tr"),H={tr:_.createElement("tbody"),tbody:U,thead:U,tfoot:U,td:F,th:F,"*":_.createElement("div")},Z=/complete|loaded|interactive/,I=/^[\w-]*$/,V={},X=V.toString,Y={},J=_.createElement("div"),G={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},W=Array.isArray||function(t){return t instanceof Array};return Y.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=J).appendChild(t),i=~Y.qsa(r,e).indexOf(t),o&&J.removeChild(t),i},S=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},j=function(t){return A.call(t,function(e,n){return t.indexOf(e)==n})},Y.fragment=function(t,e,n){var i,r,a;return B.test(t)&&(i=E(_.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(D,"<$1></$2>")),e===w&&(e=M.test(t)&&RegExp.$1),e in H||(e="*"),a=H[e],a.innerHTML=""+t,i=E.each(P.call(a.childNodes),function(){a.removeChild(this)})),o(n)&&(r=E(i),E.each(n,function(t,e){q.indexOf(t)>-1?r[t](e):r.attr(t,e)})),i},Y.Z=function(t,e){return t=t||[],t.__proto__=E.fn,t.selector=e||"",t},Y.isZ=function(t){return t instanceof Y.Z},Y.init=function(t,n){var i;if(!t)return Y.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&M.test(t))i=Y.fragment(t,RegExp.$1,n),t=null;else{if(n!==w)return E(n).find(t);i=Y.qsa(_,t)}else{if(e(t))return E(_).ready(t);if(Y.isZ(t))return t;if(W(t))i=c(t);else if(r(t))i=[t],t=null;else if(M.test(t))i=Y.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==w)return E(n).find(t);i=Y.qsa(_,t)}}return Y.Z(i,t)},E=function(t,e){return Y.init(t,e)},E.extend=function(t){var e,n=P.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){p(t,n,e)}),t},Y.qsa=function(t,e){var n,r="#"==e[0],o=!r&&"."==e[0],a=r||o?e.slice(1):e,c=I.test(a);return i(t)&&c&&r?(n=t.getElementById(a))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:P.call(c&&!r?o?t.getElementsByClassName(a):t.getElementsByTagName(e):t.querySelectorAll(e))},E.contains=_.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},E.type=t,E.isFunction=e,E.isWindow=n,E.isArray=W,E.isPlainObject=o,E.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},E.inArray=function(t,e,n){return k.indexOf.call(e,t,n)},E.camelCase=S,E.trim=function(t){return null==t?"":String.prototype.trim.call(t)},E.uuid=0,E.support={},E.expr={},E.map=function(t,e){var n,i,r,o=[];if(a(t))for(i=0;i<t.length;i++)n=e(t[i],i),null!=n&&o.push(n);else for(r in t)n=e(t[r],r),null!=n&&o.push(n);return s(o)},E.each=function(t,e){var n,i;if(a(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},E.grep=function(t,e){return A.call(t,e)},window.JSON&&(E.parseJSON=JSON.parse),E.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){V["[object "+e+"]"]=e.toLowerCase()}),E.fn={forEach:k.forEach,reduce:k.reduce,push:k.push,sort:k.sort,indexOf:k.indexOf,concat:k.concat,map:function(t){return E(E.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return E(P.apply(this,arguments))},ready:function(t){return Z.test(_.readyState)&&_.body?t(E):_.addEventListener("DOMContentLoaded",function(){t(E)},!1),this},get:function(t){return t===w?P.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return k.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return e(t)?this.not(this.not(t)):E(A.call(this,function(e){return Y.matches(e,t)}))},add:function(t,e){return E(j(this.concat(E(t,e))))},is:function(t){return this.length>0&&Y.matches(this[0],t)},not:function(t){var n=[];if(e(t)&&t.call!==w)this.each(function(e){t.call(this,e)||n.push(this)});else{var i="string"==typeof t?this.filter(t):a(t)&&e(t.item)?P.call(t):E(t);this.forEach(function(t){i.indexOf(t)<0&&n.push(t)})}return E(n)},has:function(t){return this.filter(function(){return r(t)?E.contains(this,t):E(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!r(t)?t:E(t)},last:function(){var t=this[this.length-1];return t&&!r(t)?t:E(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?E(t).filter(function(){var t=this;return k.some.call(n,function(e){return E.contains(e,t)})}):1==this.length?E(Y.qsa(this[0],t)):this.map(function(){return Y.qsa(this,t)}):E()},closest:function(t,e){var n=this[0],r=!1;for("object"==typeof t&&(r=E(t));n&&!(r?r.indexOf(n)>=0:Y.matches(n,t));)n=n!==e&&!i(n)&&n.parentNode;return E(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=E.map(n,function(t){return(t=t.parentNode)&&!i(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return m(e,t)},parent:function(t){return m(j(this.pluck("parentNode")),t)},children:function(t){return m(this.map(function(){return h(this)}),t)},contents:function(){return this.map(function(){return P.call(this.childNodes)})},siblings:function(t){return m(this.map(function(t,e){return A.call(h(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return E.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=d(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var n=e(t);if(this[0]&&!n)var i=E(t).get(0),r=i.parentNode||this.length>1;return this.each(function(e){E(this).wrapAll(n?t.call(this,e):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){E(this[0]).before(t=E(t));for(var e;(e=t.children()).length;)t=e.first();E(t).append(this)}return this},wrapInner:function(t){var n=e(t);return this.each(function(e){var i=E(this),r=i.contents(),o=n?t.call(this,e):t;r.length?r.wrapAll(o):i.append(o)})},unwrap:function(){return this.parent().each(function(){E(this).replaceWith(E(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var e=E(this);(t===w?"none"==e.css("display"):t)?e.show():e.hide()})},prev:function(t){return E(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return E(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;E(this).empty().append(v(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=v(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(t,e){var n;return"string"!=typeof t||1 in arguments?this.each(function(n){if(1===this.nodeType)if(r(t))for(T in t)g(this,T,t[T]);else g(this,t,v(this,e,n,this.getAttribute(t)))}):this.length&&1===this[0].nodeType?!(n=this[0].getAttribute(t))&&t in this[0]?this[0][t]:n:w},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){g(this,t)},this)})},prop:function(t,e){return t=G[t]||t,1 in arguments?this.each(function(n){this[t]=v(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(t,e){var n="data-"+t.replace(R,"-$1").toLowerCase(),i=1 in arguments?this.attr(n,e):this.attr(n);return null!==i?b(i):w},val:function(t){return 0 in arguments?this.each(function(e){this.value=v(this,t,e,this.value)}):this[0]&&(this[0].multiple?E(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var n=E(this),i=v(this,t,e,n.offset()),r=n.offsetParent().offset(),o={top:i.top-r.top,left:i.left-r.left};"static"==n.css("position")&&(o.position="relative"),n.css(o)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(e,n){if(arguments.length<2){var i,r=this[0];if(!r)return;if(i=getComputedStyle(r,""),"string"==typeof e)return r.style[S(e)]||i.getPropertyValue(e);if(W(e)){var o={};return E.each(e,function(t,e){o[e]=r.style[S(e)]||i.getPropertyValue(e)}),o}}var a="";if("string"==t(e))n||0===n?a=u(e)+":"+f(e,n):this.each(function(){this.style.removeProperty(u(e))});else for(T in e)e[T]||0===e[T]?a+=u(T)+":"+f(T,e[T])+";":this.each(function(){this.style.removeProperty(u(T))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(E(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return!!t&&k.some.call(this,function(t){return this.test(y(t))},l(t))},addClass:function(t){return t?this.each(function(e){if("className"in this){C=[];var n=y(this),i=v(this,t,e,n);i.split(/\s+/g).forEach(function(t){E(this).hasClass(t)||C.push(t)},this),C.length&&y(this,n+(n?" ":"")+C.join(" "))}}):this},removeClass:function(t){return this.each(function(e){if("className"in this){if(t===w)return y(this,"");C=y(this),v(this,t,e,C).split(/\s+/g).forEach(function(t){C=C.replace(l(t)," ")}),y(this,C.trim())}})},toggleClass:function(t,e){return t?this.each(function(n){var i=E(this),r=v(this,t,n,y(this));r.split(/\s+/g).forEach(function(t){(e===w?!i.hasClass(t):e)?i.addClass(t):i.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var e="scrollTop"in this[0];return t===w?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft"in this[0];return t===w?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),i=$.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(E(t).css("margin-top"))||0,n.left-=parseFloat(E(t).css("margin-left"))||0,i.top+=parseFloat(E(e[0]).css("border-top-width"))||0,i.left+=parseFloat(E(e[0]).css("border-left-width"))||0,{top:n.top-i.top,left:n.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||_.body;t&&!$.test(t.nodeName)&&"static"==E(t).css("position");)t=t.offsetParent;return t})}},E.fn.detach=E.fn.remove,["width","height"].forEach(function(t){var e=t.replace(/./,function(t){return t[0].toUpperCase()});E.fn[t]=function(r){var o,a=this[0];return r===w?n(a)?a["inner"+e]:i(a)?a.documentElement["scroll"+e]:(o=this.offset())&&o[t]:this.each(function(e){a=E(this),a.css(t,v(this,r,e,a[t]()))})}}),z.forEach(function(e,n){var i=n%2;E.fn[e]=function(){var e,r,o=E.map(arguments,function(n){return e=t(n),"object"==e||"array"==e||null==n?n:Y.fragment(n)}),a=this.length>1;return o.length<1?this:this.each(function(t,e){r=i?e:e.parentNode,e=0==n?e.nextSibling:1==n?e.firstChild:2==n?e:null;var c=E.contains(_.documentElement,r);o.forEach(function(t){if(a)t=t.cloneNode(!0);else if(!r)return E(t).remove();r.insertBefore(t,e),c&&x(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},E.fn[i?e+"To":"insert"+(n?"Before":"After")]=function(t){return E(t)[e](this),this}}),Y.Z.prototype=E.fn,Y.uniq=j,Y.deserializeValue=b,E.zepto=Y,E}();window.Zepto=i,void 0===window.$&&(window.$=i),function(t){function e(t){return t._zid||(t._zid=d++)}function n(t,n,o,a){if(n=i(n),n.ns)var c=r(n.ns);return(v[e(t)]||[]).filter(function(t){return!(!t||n.e&&t.e!=n.e||n.ns&&!c.test(t.ns)||o&&e(t.fn)!==e(o)||a&&t.sel!=a)})}function i(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function r(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function o(t,e){return t.del&&!y&&t.e in b||!!e}function a(t){return x[t]||y&&b[t]||t}function c(n,r,c,s,l,d,h){var p=e(n),m=v[p]||(v[p]=[]);r.split(/\s/).forEach(function(e){if("ready"==e)return t(document).ready(c);var r=i(e);r.fn=c,r.sel=l,r.e in x&&(c=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?r.fn.apply(this,arguments):void 0}),r.del=d;var p=d||c;r.proxy=function(t){if(t=u(t),!t.isImmediatePropagationStopped()){t.data=s;var e=p.apply(n,t._args==f?[t]:[t].concat(t._args));return e===!1&&(t.preventDefault(),t.stopPropagation()),e}},r.i=m.length,m.push(r),"addEventListener"in n&&n.addEventListener(a(r.e),r.proxy,o(r,h))})}function s(t,i,r,c,s){var u=e(t);(i||"").split(/\s/).forEach(function(e){n(t,e,r,c).forEach(function(e){delete v[u][e.i],"removeEventListener"in t&&t.removeEventListener(a(e.e),e.proxy,o(e,s))})})}function u(e,n){return(n||!e.isDefaultPrevented)&&(n||(n=e),t.each(C,function(t,i){var r=n[t];e[t]=function(){return this[i]=w,r&&r.apply(n,arguments)},e[i]=T}),(n.defaultPrevented!==f?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(e.isDefaultPrevented=w)),e}function l(t){var e,n={originalEvent:t};for(e in t)E.test(e)||t[e]===f||(n[e]=t[e]);return u(n,t)}var f,d=1,h=Array.prototype.slice,p=t.isFunction,m=function(t){return"string"==typeof t},v={},g={},y="onfocusin"in window,b={focus:"focusin",blur:"focusout"},x={mouseenter:"mouseover",mouseleave:"mouseout"};g.click=g.mousedown=g.mouseup=g.mousemove="MouseEvents",t.event={add:c,remove:s},t.proxy=function(n,i){var r=2 in arguments&&h.call(arguments,2);if(p(n)){var o=function(){return n.apply(i,r?r.concat(h.call(arguments)):arguments)};return o._zid=e(n),o}if(m(i))return r?(r.unshift(n[i],n),t.proxy.apply(null,r)):t.proxy(n[i],n);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var w=function(){return!0},T=function(){return!1},E=/^([A-Z]|returnValue$|layer[XY]$)/,C={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,n,i,r,o){var a,u,d=this;return e&&!m(e)?(t.each(e,function(t,e){d.on(t,n,i,e,o)}),d):(m(n)||p(r)||r===!1||(r=i,i=n,n=f),(p(i)||i===!1)&&(r=i,i=f),r===!1&&(r=T),d.each(function(f,d){o&&(a=function(t){return s(d,t.type,r),r.apply(this,arguments)}),n&&(u=function(e){var i,o=t(e.target).closest(n,d).get(0);return o&&o!==d?(i=t.extend(l(e),{currentTarget:o,liveFired:d}),(a||r).apply(o,[i].concat(h.call(arguments,1)))):void 0}),c(d,e,r,i,n,u||a)}))},t.fn.off=function(e,n,i){var r=this;return e&&!m(e)?(t.each(e,function(t,e){r.off(t,n,e)}),r):(m(n)||p(i)||i===!1||(i=n,n=f),i===!1&&(i=T),r.each(function(){s(this,e,i,n)}))},t.fn.trigger=function(e,n){return e=m(e)||t.isPlainObject(e)?t.Event(e):u(e),e._args=n,this.each(function(){e.type in b&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,i){var r,o;return this.each(function(a,c){r=l(m(e)?t.Event(e):e),r._args=i,r.target=c,t.each(n(c,e.type||e),function(t,e){return o=e.proxy(r),!r.isImmediatePropagationStopped()&&void 0})}),o},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){m(t)||(e=t,t=e.type);var n=document.createEvent(g[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),u(n)}}(i),function(t){function e(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function n(t,n,i,r){return t.global?e(n||y,i,r):void 0}function i(e){e.global&&0===t.active++&&n(e,null,"ajaxStart")}function r(e){e.global&&!--t.active&&n(e,null,"ajaxStop")}function o(t,e){var i=e.context;return e.beforeSend.call(i,t,e)!==!1&&n(e,i,"ajaxBeforeSend",[t,e])!==!1&&void n(e,i,"ajaxSend",[t,e])}function a(t,e,i,r){var o=i.context,a="success";i.success.call(o,t,a,e),r&&r.resolveWith(o,[t,a,e]),n(i,o,"ajaxSuccess",[e,i,t]),s(a,e,i)}function c(t,e,i,r,o){var a=r.context;r.error.call(a,i,e,t),o&&o.rejectWith(a,[i,e,t]),n(r,a,"ajaxError",[i,r,t||e]),s(e,i,r)}function s(t,e,i){var o=i.context;i.complete.call(o,e,t),n(i,o,"ajaxComplete",[e,i]),r(i)}function u(){}function l(t){return t&&(t=t.split(";",2)[0]),t&&(t==E?"html":t==T?"json":x.test(t)?"script":w.test(t)&&"xml")||"text"}function f(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function d(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=f(e.url,e.data),e.data=void 0)}function h(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function p(e,n,i,r){var o,a=t.isArray(n),c=t.isPlainObject(n);t.each(n,function(n,s){o=t.type(s),r&&(n=i?r:r+"["+(c||"object"==o||"array"==o?n:"")+"]"),!r&&a?e.add(s.name,s.value):"array"==o||!i&&"object"==o?p(e,s,i,n):e.add(n,s)})}var m,v,g=0,y=window.document,b=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,x=/^(?:text|application)\/javascript/i,w=/^(?:text|application)\/xml/i,T="application/json",E="text/html",C=/^\s*$/,S=y.createElement("a");S.href=window.location.href,t.active=0,t.ajaxJSONP=function(e,n){if(!("type"in e))return t.ajax(e);var i,r,s=e.jsonpCallback,u=(t.isFunction(s)?s():s)||"jsonp"+ ++g,l=y.createElement("script"),f=window[u],d=function(e){t(l).triggerHandler("error",e||"abort")},h={abort:d};return n&&n.promise(h),t(l).on("load error",function(o,s){clearTimeout(r),t(l).off().remove(),"error"!=o.type&&i?a(i[0],h,e,n):c(null,s||"error",h,e,n),window[u]=f,i&&t.isFunction(f)&&f(i[0]),f=i=void 0}),o(h,e)===!1?(d("abort"),h):(window[u]=function(){i=arguments},l.src=e.url.replace(/\?(.+)=\?/,"?$1="+u),y.head.appendChild(l),e.timeout>0&&(r=setTimeout(function(){d("timeout")},e.timeout)),h)},t.ajaxSettings={type:"GET",beforeSend:u,success:u,error:u,complete:u,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:T,xml:"application/xml, text/xml",html:E,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n,r=t.extend({},e||{}),s=t.Deferred&&t.Deferred();for(m in t.ajaxSettings)void 0===r[m]&&(r[m]=t.ajaxSettings[m]);i(r),r.crossDomain||(n=y.createElement("a"),n.href=r.url,n.href=n.href,r.crossDomain=S.protocol+"//"+S.host!=n.protocol+"//"+n.host),r.url||(r.url=window.location.toString()),d(r);var h=r.dataType,p=/\?.+=\?/.test(r.url);if(p&&(h="jsonp"),r.cache!==!1&&(e&&e.cache===!0||"script"!=h&&"jsonp"!=h)||(r.url=f(r.url,"_="+Date.now())),"jsonp"==h)return p||(r.url=f(r.url,r.jsonp?r.jsonp+"=?":r.jsonp===!1?"":"callback=?")),t.ajaxJSONP(r,s);var g,b=r.accepts[h],x={},w=function(t,e){x[t.toLowerCase()]=[t,e]},T=/^([\w-]+:)\/\//.test(r.url)?RegExp.$1:window.location.protocol,E=r.xhr(),j=E.setRequestHeader;if(s&&s.promise(E),r.crossDomain||w("X-Requested-With","XMLHttpRequest"),w("Accept",b||"*/*"),(b=r.mimeType||b)&&(b.indexOf(",")>-1&&(b=b.split(",",2)[0]),E.overrideMimeType&&E.overrideMimeType(b)),(r.contentType||r.contentType!==!1&&r.data&&"GET"!=r.type.toUpperCase())&&w("Content-Type",r.contentType||"application/x-www-form-urlencoded"),r.headers)for(v in r.headers)w(v,r.headers[v]);if(E.setRequestHeader=w,E.onreadystatechange=function(){if(4==E.readyState){E.onreadystatechange=u,clearTimeout(g);var e,n=!1;if(E.status>=200&&E.status<300||304==E.status||0==E.status&&"file:"==T){h=h||l(r.mimeType||E.getResponseHeader("content-type")),e=E.responseText;try{"script"==h?(0,eval)(e):"xml"==h?e=E.responseXML:"json"==h&&(e=C.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?c(n,"parsererror",E,r,s):a(e,E,r,s)}else c(E.statusText||null,E.status?"error":"abort",E,r,s)}},o(E,r)===!1)return E.abort(),c(null,"abort",E,r,s),E;if(r.xhrFields)for(v in r.xhrFields)E[v]=r.xhrFields[v];var k=!("async"in r)||r.async;E.open(r.type,r.url,k,r.username,r.password);for(v in x)j.apply(E,x[v]);return r.timeout>0&&(g=setTimeout(function(){E.onreadystatechange=u,E.abort(),c(null,"timeout",E,r,s)},r.timeout)),E.send(r.data?r.data:null),E},t.get=function(){return t.ajax(h.apply(null,arguments))},t.post=function(){var e=h.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=h.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var r,o=this,a=e.split(/\s/),c=h(e,n,i),s=c.success;return a.length>1&&(c.url=a[0],r=a[1]),c.success=function(e){o.html(r?t("<div>").html(e.replace(b,"")).find(r):e),s&&s.apply(o,arguments)},t.ajax(c),this};var j=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(j(e)+"="+j(n))},p(i,e,n),i.join("&").replace(/%20/g,"+")}}(i),function(t){t.fn.serializeArray=function(){var e,n,i=[],r=function(t){return t.forEach?t.forEach(r):void i.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(i,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&r(t(o).val())}),i},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(i),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(i),function(t){function e(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function n(){l=null,d.last&&(d.el.trigger("longTap"),d={})}function i(){l&&clearTimeout(l),l=null}function r(){c&&clearTimeout(c),s&&clearTimeout(s),u&&clearTimeout(u),l&&clearTimeout(l),c=s=u=l=null,d={}}function o(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function a(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var c,s,u,l,f,d={},h=750;t(document).ready(function(){var p,m,v,g,y=0,b=0;"MSGesture"in window&&(f=new MSGesture,f.target=document.body),t(document).bind("MSGestureEnd",function(t){var e=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;e&&(d.el.trigger("swipe"),d.el.trigger("swipe"+e))}).on("touchstart MSPointerDown pointerdown",function(e){(!(g=a(e,"down"))||o(e))&&(v=g?e:e.touches[0],e.touches&&1===e.touches.length&&d.x2&&(d.x2=void 0,d.y2=void 0),p=Date.now(),m=p-(d.last||p),d.el=t("tagName"in v.target?v.target:v.target.parentNode),c&&clearTimeout(c),d.x1=v.pageX,d.y1=v.pageY,m>0&&250>=m&&(d.isDoubleTap=!0),d.last=p,l=setTimeout(n,h),f&&g&&f.addPointer(e.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(g=a(t,"move"))||o(t))&&(v=g?t:t.touches[0],i(),d.x2=v.pageX,d.y2=v.pageY,y+=Math.abs(d.x1-d.x2),b+=Math.abs(d.y1-d.y2))}).on("touchend MSPointerUp pointerup",function(n){(!(g=a(n,"up"))||o(n))&&(i(),d.x2&&Math.abs(d.x1-d.x2)>30||d.y2&&Math.abs(d.y1-d.y2)>30?u=setTimeout(function(){d.el.trigger("swipe"),d.el.trigger("swipe"+e(d.x1,d.x2,d.y1,d.y2)),d={}},0):"last"in d&&(30>y&&30>b?s=setTimeout(function(){var e=t.Event("tap");e.cancelTouch=r,d.el.trigger(e),d.isDoubleTap?(d.el&&d.el.trigger("doubleTap"),d={}):c=setTimeout(function(){c=null,d.el&&d.el.trigger("singleTap"),d={}},250)},0):d={}),y=b=0)}).on("touchcancel MSPointerCancel pointercancel",r),t(window).on("scroll",r)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return"tap"!==e||navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)?this.on(e,t):this.on("click",t)}})}(i),n.exports=i}),define("utils/base64.js",function(t,e,n){var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=new Array((-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),62,(-1),(-1),(-1),63,52,53,54,55,56,57,58,59,60,61,(-1),(-1),(-1),(-1),(-1),(-1),(-1),0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,(-1),(-1),(-1),(-1),(-1),(-1),26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,(-1),(-1),(-1),(-1),(-1)),o=function(t){var e,n,r,o,a,c;for(r=t.length,n=0,e="";n<r;){if(o=255&t.charCodeAt(n++),n==r){e+=i.charAt(o>>2),e+=i.charAt((3&o)<<4),e+="==";break}if(a=t.charCodeAt(n++),n==r){e+=i.charAt(o>>2),e+=i.charAt((3&o)<<4|(240&a)>>4),e+=i.charAt((15&a)<<2),e+="=";break}c=t.charCodeAt(n++),e+=i.charAt(o>>2),e+=i.charAt((3&o)<<4|(240&a)>>4),e+=i.charAt((15&a)<<2|(192&c)>>6),e+=i.charAt(63&c)}return e},a=function(t){var e,n,i,o,a,c,s;for(c=t.length,a=0,s="";a<c;){do e=r[255&t.charCodeAt(a++)];while(a<c&&e==-1);if(e==-1)break;do n=r[255&t.charCodeAt(a++)];while(a<c&&n==-1);if(n==-1)break;s+=String.fromCharCode(e<<2|(48&n)>>4);do{if(i=255&t.charCodeAt(a++),61==i)return s;i=r[i]}while(a<c&&i==-1);if(i==-1)break;s+=String.fromCharCode((15&n)<<4|(60&i)>>2);do{if(o=255&t.charCodeAt(a++),61==o)return s;o=r[o]}while(a<c&&o==-1);if(o==-1)break;s+=String.fromCharCode((3&i)<<6|o)}return s};e.encode=o,e.decode=a}),define("UI/alert",function(t,e,n){var i=t("vendors/zepto"),r=t("utils/base64");n.exports={self:this,alerter:function(t,e,n){if("用户未登录"==t)return this.alertBox("账号已在其他设备登录","提示",function(){var t=r.encode(location.href);location.assign("/login/index?redirect="+t)},"去登录","知道了",!0,function(){location.reload()}),!1;var o=document.querySelector(".xin-mask");if(e=e?e:"确定",o)return!1;var a=document.createElement("div");a.innerHTML='<div class="xin-dialog xin-dialog-tip"><h3 class="xin-dialog-title">'+t+'</h3><div class="xin-dialog-btns"><a class="xin-btn-strech" id="remove_bg" href="javascript:void(0);">确定</a></div></div>',a.className="xin-mask cover_bg",0==i(".xin-mask").length&&document.body.appendChild(a),i("#remove_bg").on("click",function(){document.body.removeChild(a),n&&n()})},alertBox:function(t,e,n,o,a,c,s){if("用户未登录"==t)return this.alertBox("账号已在其他设备登录","提示",function(){var t=r.encode(location.href);location.assign("/login/index?redirect="+t)},"去登录","知道了",!0,function(){location.reload()}),!1;var u="";e=e?e:"提示",t=t?t:"确定下架吗？",o=o?o:"确定",a=a?a:"取消",u=c?"<div class='deleteBox' id='deleteBox'><h2>"+e+"</h2><div><p>"+t+"</p><button  class='cancel' id='confirm'>"+o+"</button><button  class='confirm' id='cancel'>"+a+"</button></div></div>":"<div class='deleteBox' id='deleteBox'><h2>"+e+"</h2><div><p>"+t+"</p><button class='cancel' id='cancel'>"+a+"</button><button class='confirm' id='confirm'>"+o+"</button></div></div>",0===i("#deleteBox").length&&(i(u).appendTo(i("body")),i('<div class="mark" id="mark"></div>').appendTo(i("body")));var l=i("#deleteBox").height();i("#deleteBox").css("margin-top",-l/2),i("#cancel").on("click",function(t){t.stopPropagation(),i("#mark").remove(),i("#deleteBox").remove(),s&&s()}),i("#confirm").on("click",function(t){t.stopPropagation(),i("#mark").remove(),i("#deleteBox").remove(),n()})},carAlertBox:function(t,e){var n="您确定要删除这"+t+"个宝贝?";this.alertBox(n,"提示",e)},OrderAlertBox:function(t,e,n,r){var o="",n=n?n:"提示",t=t?t:"确定下架吗？";o="<div class='deleteBox' id='deleteBox'><h2>"+n+"</h2><div><div class='t_wrap'><p>"+t+"</p></div><button class='cancel' id='cancel'>取消</button><button class='confirm' id='confirm'>确定</button></div></div>",0===i("#deleteBox").length&&(i(o).appendTo(i("body")),i('<div class="mark" id="mark"></div>').appendTo(i("body")));var a=i("#deleteBox").height();i("#deleteBox").css("margin-top",-a/2),i("#cancel").bind("click",function(t){t.stopPropagation(),i("#mark").remove(),i("#deleteBox").remove()}),i("#confirm").bind("click",function(t){t.stopPropagation(),i("#mark").remove(),i("#deleteBox").remove(),r&&r()})},alertr1:function(t,e,n){var r=this,o=document.querySelector(".mark_content");if(o)return!1;var a=document.createElement("div");a.innerHTML="<p><span>"+t+'</span></p><div class="g_adput clearfix"><div class="g_adput1 clearfix"><div></div><div></div><div></div><div></div><div></div><div></div></div><input type="tel" id="password2" maxlength="6" autocomplete="off"  pattern="d*" /><input type="hidden" id="j_hidden"></div><p class="mark_content_btn clearfix"><button id="btnCel">取消</button><button id="btnSub">'+e+"</button></p>",a.className="mark_content",0==i(".xin-mask").length&&(document.body.appendChild(a),
i("#cover_bj").show(),i("#password2").focus());var c="oninput"in document,s=c?"input":"keyup",u=i("#password2"),l=i("#j_hidden"),f=!1;u.on("paste",function(t){f=!0});var d=function(){u.val(""),l.val(""),i(".g_adput1").find("div").html("")};l.val("");var c="oninput"in document,s=c?"input":"keyup";u.on(s,function(t){var e=t.target;f&&d(),f=!1;var n=e.value.split("*").slice(-1).toString();l[0].value;if(i(".g_adput1 div").eq(i(e).val().length).html(""),0===n.length)l[0].value=l[0].value.split(",").slice(0,e.value.length).toString();else{for(var r=0;r<n.length;r++){var o=n[r];""===l.val()?l.val(o):l[0].value+=o}e.value=e.value.replace(/\S/g,"*"),i(".g_adput1 div").eq(i(e).val().length-1).html("*")}}),i("#btnCel").on("click",function(){document.body.removeChild(a),i("#cover_bj").hide(),i(".submitOrder").removeAttr("disabled")}),i("#btnSub").on("click",function(){6==i("#password2").val().length?(n(),document.body.removeChild(a),i("#cover_bj").hide()):r.alerter("请输入密码！")})},alertSecond:function(t,e){this.remliste();var n=document.createElement("div");n.innerHTML=t,e=e?e:1500,n.id="alertSecond",0==i("#alertSecond").length&&document.body.appendChild(n),setTimeout(function(){if(n)try{document.body.removeChild(n)}catch(t){}},e)},alertSecond2:function(t,e,n){var r=document.createElement("div");r.innerHTML=t,r.id="alertSecond2",this.remliste(),0==i("#alertSecond2").length&&document.body.appendChild(r),setTimeout(function(){r&&(document.body.removeChild(r),e&&"true"!=n&&e.hide())},1e3)},remliste:function(){window.removeEventListener("touchmove",this.move),window.onmousewheel=function(){return!0}},addliste:function(){window.addEventListener("touchmove",this.move),window.onmousewheel=function(){return!1}},move:function(t){return t.preventDefault&&t.preventDefault(),t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),!1}}}),define("conf/staff/info-bind-dq.js",function(t){function e(t,e){var n;return n=t.replace(/(^\s+)|(\s+$)/g,""),"g"==e.toLowerCase()&&(n=n.replace(/\s/g,"")),n}function n(t){var e,n,i;if(null==t||""==t)return 0;for(n=t.length,e=0;e<t.length;e++)i=t.charCodeAt(e),i>255&&n++;return n}function i(t){return!/^[a-zA-Z\u4E00-\u9FA5]*$/.test(t)}function r(){history.state||history.pushState({id:123},"","")}function o(){history.state&&history.back()}function a(){o(),c("#choose_cover").removeClass("xin-mask-all")}var c=t("$"),s=(t("utils/base64.js"),t("UI/alert")),u=c("#name").val(),l=c("#staff-num").val();c("#choose_cover").on("click",function(){o()}),c("#confirm").click(function(){var t=e(c("#name").val(),"g");if(!t.length)return s.alerter("姓名不能为空！"),!1;if(i(t))return s.alerter("姓名中不能包含特殊字符或数字！"),!1;if(n(t)>20)return s.alerter("请检查姓名，姓名不可超过10个汉字！"),!1;var o=e(c("#staff-num").val(),"g");if(!o.length)return s.alerter("请填写员工编号！"),!1;var a={true_name:t,job_number:o};c.ajax({type:"get",url:"/op/shopbind/getdqgangwei",data:a,dataType:"json",success:function(e){console.log(e,1),200==e.code?t==u&&o==l?window.location.href=window.LoginSendUrl:(c("#confirm-name").text(t),c("#confirm-no").text(o),c("#confirm-zb").text(e.data.depts.group),c("#confirm-dep").text(e.data.depts.area),c("#confirm-fir").text(e.data.depts.first),c("#confirm-sec").text(e.data.depts.second),c("#confirm-com").text(e.data.depts.shop),c("#confirm-posi").text(e.data.depts.station),c("#choose_cover").addClass("xin-mask-all"),c("#confirm-info").show(),r()):e.code==-1?s.alerter(e.msg,"#confirm",function(){window.location.href=window.LoginSendUrl}):s.alerter(e.msg)},error:function(t,e,n){}})}),c("#submit").click(function(){var t=c("#confirm-name").text(),e=c("#confirm-no").text(),n={true_name:t,job_number:e};c.ajax({type:"get",url:"/op/shopbind/binddqstaff",data:n,dataType:"json",success:function(t){200==t.code?s.alerter(t.msg,"#confirm",function(){window.location.href=window.LoginSendUrl}):t.code==-1?s.alerter(t.msg,"#confirm",function(){window.location.href=window.LoginSendUrl}):s.alerter(t.msg)},error:function(t,e,n){}})}),c("#go-back").click(function(){a(),c("#confirm-info").hide()}),c("#close").click(function(){a(),c("#confirm-info").hide()}),window.onpopstate=function(){c("#confirm-info").hide()}});