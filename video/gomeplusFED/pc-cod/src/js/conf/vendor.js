/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		44:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".chunk.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://js.dev.meixincdn.com/src/js/conf";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(282);
	__webpack_require__(1);
	__webpack_require__(22);
	__webpack_require__(28);
	__webpack_require__(283);
	__webpack_require__(2);
	__webpack_require__(41);
	__webpack_require__(284);
	module.exports = __webpack_require__(54);


/***/ },

/***/ 1:
/***/ function(module, exports) {

	/*! jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license */
	!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="1.12.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(!l.ownFirst)for(b in a)return k.call(a,b);for(b in a);return void 0===b||k.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(h)return h.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=e.call(arguments,2),d=function(){return a.apply(b||this,c.concat(e.call(arguments)))},d.guid=a.guid=a.guid||n.guid++,d):void 0},now:function(){return+new Date},support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}if(f=d.getElementById(e[2]),f&&f.parentNode){if(f.id!==e[2])return A.find(a);this.length=1,this[0]=f}return this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||(e=n.uniqueSort(e)),D.test(a)&&(e=e.reverse())),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=!0,c||j.disable(),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.addEventListener?(d.removeEventListener("DOMContentLoaded",K),a.removeEventListener("load",K)):(d.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(d.addEventListener||"load"===a.event.type||"complete"===d.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll)a.setTimeout(n.ready);else if(d.addEventListener)d.addEventListener("DOMContentLoaded",K),a.addEventListener("load",K);else{d.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&d.documentElement}catch(e){}c&&c.doScroll&&!function f(){if(!n.isReady){try{c.doScroll("left")}catch(b){return a.setTimeout(f,50)}J(),n.ready()}}()}return I.promise(b)},n.ready.promise();var L;for(L in n(l))break;l.ownFirst="0"===L,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c,e;c=d.getElementsByTagName("body")[0],c&&c.style&&(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",l.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(e))}),function(){var a=d.createElement("div");l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}a=null}();var M=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b},N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0;
	}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(M(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),"object"!=typeof b&&"function"!=typeof b||(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f}}function S(a,b,c){if(M(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=void 0)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}}),function(){var a;l.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,e;return c=d.getElementsByTagName("body")[0],c&&c.style?(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(d.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(e),a):void 0}}();var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),V=["Top","Right","Bottom","Left"],W=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function X(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&U.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var Y=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)Y(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},Z=/^(?:checkbox|radio)$/i,$=/<([\w:-]+)/,_=/^$|\/(?:java|ecma)script/i,aa=/^\s+/,ba="abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";function ca(a){var b=ba.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}!function(){var a=d.createElement("div"),b=d.createDocumentFragment(),c=d.createElement("input");a.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",l.leadingWhitespace=3===a.firstChild.nodeType,l.tbody=!a.getElementsByTagName("tbody").length,l.htmlSerialize=!!a.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==d.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,b.appendChild(c),l.appendChecked=c.checked,a.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!a.cloneNode(!0).lastChild.defaultValue,b.appendChild(a),c=d.createElement("input"),c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),a.appendChild(c),l.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!!a.addEventListener,a[n.expando]=1,l.attributes=!a.getAttribute(n.expando)}();var da={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]};da.optgroup=da.option,da.tbody=da.tfoot=da.colgroup=da.caption=da.thead,da.th=da.td;function ea(a,b){var c,d,e=0,f="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,ea(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function fa(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}var ga=/<|&#?\w+;/,ha=/<tbody/i;function ia(a){Z.test(a.type)&&(a.defaultChecked=a.checked)}function ja(a,b,c,d,e){for(var f,g,h,i,j,k,m,o=a.length,p=ca(b),q=[],r=0;o>r;r++)if(g=a[r],g||0===g)if("object"===n.type(g))n.merge(q,g.nodeType?[g]:g);else if(ga.test(g)){i=i||p.appendChild(b.createElement("div")),j=($.exec(g)||["",""])[1].toLowerCase(),m=da[j]||da._default,i.innerHTML=m[1]+n.htmlPrefilter(g)+m[2],f=m[0];while(f--)i=i.lastChild;if(!l.leadingWhitespace&&aa.test(g)&&q.push(b.createTextNode(aa.exec(g)[0])),!l.tbody){g="table"!==j||ha.test(g)?"<table>"!==m[1]||ha.test(g)?0:i:i.firstChild,f=g&&g.childNodes.length;while(f--)n.nodeName(k=g.childNodes[f],"tbody")&&!k.childNodes.length&&g.removeChild(k)}n.merge(q,i.childNodes),i.textContent="";while(i.firstChild)i.removeChild(i.firstChild);i=p.lastChild}else q.push(b.createTextNode(g));i&&p.removeChild(i),l.appendChecked||n.grep(ea(q,"input"),ia),r=0;while(g=q[r++])if(d&&n.inArray(g,d)>-1)e&&e.push(g);else if(h=n.contains(g.ownerDocument,g),i=ea(p.appendChild(g),"script"),h&&fa(i),c){f=0;while(g=i[f++])_.test(g.type||"")&&c.push(g)}return i=null,p}!function(){var b,c,e=d.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b]=c in a)||(e.setAttribute(c,"t"),l[b]=e.attributes[c].expando===!1);e=null}();var ka=/^(?:input|select|textarea)$/i,la=/^key/,ma=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,na=/^(?:focusinfocus|focusoutblur)$/,oa=/^([^.]*)(?:\.(.+)|)/;function pa(){return!0}function qa(){return!1}function ra(){try{return d.activeElement}catch(a){}}function sa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)sa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=qa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return"undefined"==typeof n||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(G)||[""],h=b.length;while(h--)f=oa.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=oa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(i=m=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!na.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),h=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),l=n.event.special[q]||{},f||!l.trigger||l.trigger.apply(e,c)!==!1)){if(!f&&!l.noBubble&&!n.isWindow(e)){for(j=l.delegateType||q,na.test(j+q)||(i=i.parentNode);i;i=i.parentNode)p.push(i),m=i;m===(e.ownerDocument||d)&&p.push(m.defaultView||m.parentWindow||a)}o=0;while((i=p[o++])&&!b.isPropagationStopped())b.type=o>1?j:l.bindType||q,g=(n._data(i,"events")||{})[b.type]&&n._data(i,"handle"),g&&g.apply(i,c),g=h&&i[h],g&&g.apply&&M(i)&&(b.result=g.apply(i,c),b.result===!1&&b.preventDefault());if(b.type=q,!f&&!b.isDefaultPrevented()&&(!l._default||l._default.apply(p.pop(),c)===!1)&&M(e)&&h&&e[q]&&!n.isWindow(e)){m=e[h],m&&(e[h]=null),n.event.triggered=q;try{e[q]()}catch(s){}n.event.triggered=void 0,m&&(e[h]=m)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ma.test(f)?this.mouseHooks:la.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=g.srcElement||d),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,h.filter?h.filter(a,g):a},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button,h=b.fromElement;return null==a.pageX&&null!=b.clientX&&(e=a.target.ownerDocument||d,f=e.documentElement,c=e.body,a.pageX=b.clientX+(f&&f.scrollLeft||c&&c.scrollLeft||0)-(f&&f.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(f&&f.scrollTop||c&&c.scrollTop||0)-(f&&f.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&h&&(a.relatedTarget=h===a.target?b.toElement:h),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ra()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ra()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=d.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)}:function(a,b,c){var d="on"+b;a.detachEvent&&("undefined"==typeof a[d]&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?pa:qa):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:qa,isPropagationStopped:qa,isImmediatePropagationStopped:qa,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=pa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=pa,a&&!this.isSimulated&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=pa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submit||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?n.prop(b,"form"):void 0;c&&!n._data(c,"submit")&&(n.event.add(c,"submit._submit",function(a){a._submitBubble=!0}),n._data(c,"submit",!0))})},postDispatch:function(a){a._submitBubble&&(delete a._submitBubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.change||(n.event.special.change={setup:function(){return ka.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._justChanged=!0)}),n.event.add(this,"click._change",function(a){this._justChanged&&!a.isTrigger&&(this._justChanged=!1),n.event.simulate("change",this,a)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;ka.test(b.nodeName)&&!n._data(b,"change")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a)}),n._data(b,"change",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!ka.test(this.nodeName)}}),l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d){return sa(this,a,b,c,d)},one:function(a,b,c,d){return sa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=qa),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ta=/ jQuery\d+="(?:null|\d+)"/g,ua=new RegExp("<(?:"+ba+")[\\s/>]","i"),va=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,wa=/<script|<style|<link/i,xa=/checked\s*(?:[^=]|=\s*.checked.)/i,ya=/^true\/(.*)/,za=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Aa=ca(d),Ba=Aa.appendChild(d.createElement("div"));function Ca(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function Da(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function Ea(a){var b=ya.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Ga(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(Da(b).text=a.text,Ea(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Z.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}}function Ha(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&xa.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d)});if(o&&(k=ja(b,a[0].ownerDocument,!1,a,d),e=k.firstChild,1===k.childNodes.length&&(k=e),e||d)){for(i=n.map(ea(k,"script"),Da),h=i.length;o>m;m++)g=k,m!==p&&(g=n.clone(g,!0,!0),h&&n.merge(i,ea(g,"script"))),c.call(a[m],g,m);if(h)for(j=i[i.length-1].ownerDocument,n.map(i,Ea),m=0;h>m;m++)g=i[m],_.test(g.type||"")&&!n._data(g,"globalEval")&&n.contains(j,g)&&(g.src?n._evalUrl&&n._evalUrl(g.src):n.globalEval((g.text||g.textContent||g.innerHTML||"").replace(za,"")));k=e=null}return a}function Ia(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(ea(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&fa(ea(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(va,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!ua.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(Ba.innerHTML=a.outerHTML,Ba.removeChild(f=Ba.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=ea(f),h=ea(a),g=0;null!=(e=h[g]);++g)d[g]&&Ga(e,d[g]);if(b)if(c)for(h=h||ea(a),d=d||ea(f),g=0;null!=(e=h[g]);g++)Fa(e,d[g]);else Fa(a,f);return d=ea(f,"script"),d.length>0&&fa(d,!i&&ea(a,"script")),d=h=e=null,f},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.attributes,m=n.event.special;null!=(d=a[h]);h++)if((b||M(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k||"undefined"==typeof d.removeAttribute?d[i]=void 0:d.removeAttribute(i),c.push(f))}}}),n.fn.extend({domManip:Ha,detach:function(a){return Ia(this,a,!0)},remove:function(a){return Ia(this,a)},text:function(a){return Y(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||d).createTextNode(a))},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a)}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(ea(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return Y(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(ta,""):void 0;if("string"==typeof a&&!wa.test(a)&&(l.htmlSerialize||!ua.test(a))&&(l.leadingWhitespace||!aa.test(a))&&!da[($.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ea(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(ea(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],f=n(a),h=f.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(f[d])[b](c),g.apply(e,c.get());return this.pushStack(e)}});var Ja,Ka={HTML:"block",BODY:"block"};function La(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function Ma(a){var b=d,c=Ka[a];return c||(c=La(a,b),"none"!==c&&c||(Ja=(Ja||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ja[0].contentWindow||Ja[0].contentDocument).document,b.write(),b.close(),c=La(a,b),Ja.detach()),Ka[a]=c),c}var Na=/^margin/,Oa=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Pa=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Qa=d.documentElement;!function(){var b,c,e,f,g,h,i=d.createElement("div"),j=d.createElement("div");if(j.style){j.style.cssText="float:left;opacity:.5",l.opacity="0.5"===j.style.opacity,l.cssFloat=!!j.style.cssFloat,j.style.backgroundClip="content-box",j.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===j.style.backgroundClip,i=d.createElement("div"),i.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",j.innerHTML="",i.appendChild(j),l.boxSizing=""===j.style.boxSizing||""===j.style.MozBoxSizing||""===j.style.WebkitBoxSizing,n.extend(l,{reliableHiddenOffsets:function(){return null==b&&k(),f},boxSizingReliable:function(){return null==b&&k(),e},pixelMarginRight:function(){return null==b&&k(),c},pixelPosition:function(){return null==b&&k(),b},reliableMarginRight:function(){return null==b&&k(),g},reliableMarginLeft:function(){return null==b&&k(),h}});function k(){var k,l,m=d.documentElement;m.appendChild(i),j.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",b=e=h=!1,c=g=!0,a.getComputedStyle&&(l=a.getComputedStyle(j),b="1%"!==(l||{}).top,h="2px"===(l||{}).marginLeft,e="4px"===(l||{width:"4px"}).width,j.style.marginRight="50%",c="4px"===(l||{marginRight:"4px"}).marginRight,k=j.appendChild(d.createElement("div")),k.style.cssText=j.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",k.style.marginRight=k.style.width="0",j.style.width="1px",g=!parseFloat((a.getComputedStyle(k)||{}).marginRight),j.removeChild(k)),j.style.display="none",f=0===j.getClientRects().length,f&&(j.style.display="",j.innerHTML="<table><tr><td></td><td>t</td></tr></table>",j.childNodes[0].style.borderCollapse="separate",k=j.getElementsByTagName("td"),k[0].style.cssText="margin:0;border:0;padding:0;display:none",f=0===k[0].offsetHeight,f&&(k[0].style.display="",k[1].style.display="none",f=0===k[0].offsetHeight)),m.removeChild(i)}}}();var Ra,Sa,Ta=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ra=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Oa.test(g)&&Na.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0===g?g:g+""}):Qa.currentStyle&&(Ra=function(a){return a.currentStyle},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Oa.test(g)&&!Ta.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Ua(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Va=/alpha\([^)]*\)/i,Wa=/opacity\s*=\s*([^)]*)/i,Xa=/^(none|table(?!-c[ea]).+)/,Ya=new RegExp("^("+T+")(.*)$","i"),Za={position:"absolute",visibility:"hidden",display:"block"},$a={letterSpacing:"0",fontWeight:"400"},_a=["Webkit","O","Moz","ms"],ab=d.createElement("div").style;function bb(a){if(a in ab)return a;var b=a.charAt(0).toUpperCase()+a.slice(1),c=_a.length;while(c--)if(a=_a[c]+b,a in ab)return a}function cb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&W(d)&&(f[g]=n._data(d,"olddisplay",Ma(d.nodeName)))):(e=W(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function db(a,b,c){var d=Ya.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function eb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+V[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+V[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+V[f]+"Width",!0,e))):(g+=n.css(a,"padding"+V[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+V[f]+"Width",!0,e)));return g}function fb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ra(a),g=l.boxSizing&&"border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Sa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Oa.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+eb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Sa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=U.exec(c))&&e[1]&&(c=X(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Sa(a,b,d)),"normal"===f&&b in $a&&(f=$a[b]),""===c||c?(e=parseFloat(f),c===!0||isFinite(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Xa.test(n.css(a,"display"))&&0===a.offsetWidth?Pa(a,Za,function(){return fb(a,b,d)}):fb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ra(a);return db(a,c,d?eb(a,b,d,l.boxSizing&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Wa.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Va,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Va.test(f)?f.replace(Va,e):f+" "+e)}}),n.cssHooks.marginRight=Ua(l.reliableMarginRight,function(a,b){return b?Pa(a,{display:"inline-block"},Sa,[a,"marginRight"]):void 0}),n.cssHooks.marginLeft=Ua(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Sa(a,"marginLeft"))||(n.contains(a.ownerDocument,a)?a.getBoundingClientRect().left-Pa(a,{
	marginLeft:0},function(){return a.getBoundingClientRect().left}):0))+"px":void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+V[d]+b]=f[d]||f[d-2]||f[0];return e}},Na.test(a)||(n.cssHooks[a+b].set=db)}),n.fn.extend({css:function(a,b){return Y(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ra(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return cb(this,!0)},hide:function(){return cb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){W(this)?n(this).show():n(this).hide()})}});function gb(a,b,c,d,e){return new gb.prototype.init(a,b,c,d,e)}n.Tween=gb,gb.prototype={constructor:gb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=gb.propHooks[this.prop];return a&&a.get?a.get(this):gb.propHooks._default.get(this)},run:function(a){var b,c=gb.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):gb.propHooks._default.set(this),this}},gb.prototype.init.prototype=gb.prototype,gb.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},gb.propHooks.scrollTop=gb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=gb.prototype.init,n.fx.step={};var hb,ib,jb=/^(?:toggle|show|hide)$/,kb=/queueHooks$/;function lb(){return a.setTimeout(function(){hb=void 0}),hb=n.now()}function mb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=V[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function nb(a,b,c){for(var d,e=(qb.tweeners[b]||[]).concat(qb.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ob(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&W(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k="none"===j?n._data(a,"olddisplay")||Ma(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==Ma(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],jb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(o))"inline"===("none"===j?Ma(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=nb(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function pb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function qb(a,b,c){var d,e,f=0,g=qb.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=hb||lb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:hb||lb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(pb(k,j.opts.specialEasing);g>f;f++)if(d=qb.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,nb,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(qb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return X(c.elem,a,U.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],qb.tweeners[c]=qb.tweeners[c]||[],qb.tweeners[c].unshift(b)},prefilters:[ob],prefilter:function(a,b){b?qb.prefilters.unshift(a):qb.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(W).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=qb(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&kb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(mb(b,!0),a,d,e)}}),n.each({slideDown:mb("show"),slideUp:mb("hide"),slideToggle:mb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(hb=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),hb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ib||(ib=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(ib),ib=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a,b=d.createElement("input"),c=d.createElement("div"),e=d.createElement("select"),f=e.appendChild(d.createElement("option"));c=d.createElement("div"),c.setAttribute("className","t"),c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],b.setAttribute("type","checkbox"),c.appendChild(b),a=c.getElementsByTagName("a")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==c.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=f.selected,l.enctype=!!d.createElement("form").enctype,e.disabled=!0,l.optDisabled=!f.disabled,b=d.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value}();var rb=/\r/g,sb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(sb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>-1)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var tb,ub,vb=n.expr.attrHandle,wb=/^(?:checked|selected)$/i,xb=l.getSetAttribute,yb=l.input;n.fn.extend({attr:function(a,b){return Y(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ub:tb)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?yb&&xb||!wb.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(xb?c:d)}}),ub={set:function(a,b,c){return b===!1?n.removeAttr(a,c):yb&&xb||!wb.test(c)?a.setAttribute(!xb&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=vb[b]||n.find.attr;yb&&xb||!wb.test(b)?vb[b]=function(a,b,d){var e,f;return d||(f=vb[b],vb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,vb[b]=f),e}:vb[b]=function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),yb&&xb||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):tb&&tb.set(a,b,c)}}),xb||(tb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},vb.id=vb.name=vb.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:tb.set},n.attrHooks.contenteditable={set:function(a,b,c){tb.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var zb=/^(?:input|select|textarea|button|object)$/i,Ab=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return Y(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):zb.test(a.nodeName)||Ab.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var Bb=/[\t\r\n\f]/g;function Cb(a){return n.attr(a,"class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,Cb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,Cb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,Cb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=Cb(this),b&&n._data(this,"__className__",b),n.attr(this,"class",b||a===!1?"":n._data(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+Cb(c)+" ").replace(Bb," ").indexOf(b)>-1)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Db=a.location,Eb=n.now(),Fb=/\?/,Gb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(Gb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new a.DOMParser,c=d.parseFromString(b,"text/xml")):(c=new a.ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var Hb=/#.*$/,Ib=/([?&])_=[^&]*/,Jb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Kb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Lb=/^(?:GET|HEAD)$/,Mb=/^\/\//,Nb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ob={},Pb={},Qb="*/".concat("*"),Rb=Db.href,Sb=Nb.exec(Rb.toLowerCase())||[];function Tb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Ub(a,b,c,d){var e={},f=a===Pb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Vb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Wb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Xb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Rb,type:"GET",isLocal:Kb.test(Sb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Qb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Vb(Vb(a,n.ajaxSettings),b):Vb(n.ajaxSettings,a)},ajaxPrefilter:Tb(Ob),ajaxTransport:Tb(Pb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var d,e,f,g,h,i,j,k,l=n.ajaxSetup({},c),m=l.context||l,o=l.context&&(m.nodeType||m.jquery)?n(m):n.event,p=n.Deferred(),q=n.Callbacks("once memory"),r=l.statusCode||{},s={},t={},u=0,v="canceled",w={readyState:0,getResponseHeader:function(a){var b;if(2===u){if(!k){k={};while(b=Jb.exec(g))k[b[1].toLowerCase()]=b[2]}b=k[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===u?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return u||(a=t[c]=t[c]||a,s[a]=b),this},overrideMimeType:function(a){return u||(l.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>u)for(b in a)r[b]=[r[b],a[b]];else w.always(a[w.status]);return this},abort:function(a){var b=a||v;return j&&j.abort(b),y(0,b),this}};if(p.promise(w).complete=q.add,w.success=w.done,w.error=w.fail,l.url=((b||l.url||Rb)+"").replace(Hb,"").replace(Mb,Sb[1]+"//"),l.type=c.method||c.type||l.method||l.type,l.dataTypes=n.trim(l.dataType||"*").toLowerCase().match(G)||[""],null==l.crossDomain&&(d=Nb.exec(l.url.toLowerCase()),l.crossDomain=!(!d||d[1]===Sb[1]&&d[2]===Sb[2]&&(d[3]||("http:"===d[1]?"80":"443"))===(Sb[3]||("http:"===Sb[1]?"80":"443")))),l.data&&l.processData&&"string"!=typeof l.data&&(l.data=n.param(l.data,l.traditional)),Ub(Ob,l,c,w),2===u)return w;i=n.event&&l.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),l.type=l.type.toUpperCase(),l.hasContent=!Lb.test(l.type),f=l.url,l.hasContent||(l.data&&(f=l.url+=(Fb.test(f)?"&":"?")+l.data,delete l.data),l.cache===!1&&(l.url=Ib.test(f)?f.replace(Ib,"$1_="+Eb++):f+(Fb.test(f)?"&":"?")+"_="+Eb++)),l.ifModified&&(n.lastModified[f]&&w.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&w.setRequestHeader("If-None-Match",n.etag[f])),(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&w.setRequestHeader("Content-Type",l.contentType),w.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+Qb+"; q=0.01":""):l.accepts["*"]);for(e in l.headers)w.setRequestHeader(e,l.headers[e]);if(l.beforeSend&&(l.beforeSend.call(m,w,l)===!1||2===u))return w.abort();v="abort";for(e in{success:1,error:1,complete:1})w[e](l[e]);if(j=Ub(Pb,l,c,w)){if(w.readyState=1,i&&o.trigger("ajaxSend",[w,l]),2===u)return w;l.async&&l.timeout>0&&(h=a.setTimeout(function(){w.abort("timeout")},l.timeout));try{u=1,j.send(s,y)}catch(x){if(!(2>u))throw x;y(-1,x)}}else y(-1,"No Transport");function y(b,c,d,e){var k,s,t,v,x,y=c;2!==u&&(u=2,h&&a.clearTimeout(h),j=void 0,g=e||"",w.readyState=b>0?4:0,k=b>=200&&300>b||304===b,d&&(v=Wb(l,w,d)),v=Xb(l,v,w,k),k?(l.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(n.lastModified[f]=x),x=w.getResponseHeader("etag"),x&&(n.etag[f]=x)),204===b||"HEAD"===l.type?y="nocontent":304===b?y="notmodified":(y=v.state,s=v.data,t=v.error,k=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),w.status=b,w.statusText=(c||y)+"",k?p.resolveWith(m,[s,y,w]):p.rejectWith(m,[w,y,t]),w.statusCode(r),r=void 0,i&&o.trigger(k?"ajaxSuccess":"ajaxError",[w,l,k?s:t]),q.fireWith(m,[w,y]),i&&(o.trigger("ajaxComplete",[w,l]),--n.active||n.event.trigger("ajaxStop")))}return w},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}});function Yb(a){return a.style&&a.style.display||n.css(a,"display")}function Zb(a){if(!n.contains(a.ownerDocument||d,a))return!0;while(a&&1===a.nodeType){if("none"===Yb(a)||"hidden"===a.type)return!0;a=a.parentNode}return!1}n.expr.filters.hidden=function(a){return l.reliableHiddenOffsets()?a.offsetWidth<=0&&a.offsetHeight<=0&&!a.getClientRects().length:Zb(a)},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var $b=/%20/g,_b=/\[\]$/,ac=/\r?\n/g,bc=/^(?:submit|button|image|reset|file)$/i,cc=/^(?:input|select|textarea|keygen)/i;function dc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||_b.test(a)?d(a,e):dc(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)dc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)dc(c,a[c],b,e);return d.join("&").replace($b,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&cc.test(this.nodeName)&&!bc.test(a)&&(this.checked||!Z.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(ac,"\r\n")}}):{name:b.name,value:c.replace(ac,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return this.isLocal?ic():d.documentMode>8?hc():/^(get|post|head|put|delete|options)$/i.test(this.type)&&hc()||ic()}:hc;var ec=0,fc={},gc=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in fc)fc[a](void 0,!0)}),l.cors=!!gc&&"withCredentials"in gc,gc=l.ajax=!!gc,gc&&n.ajaxTransport(function(b){if(!b.crossDomain||l.cors){var c;return{send:function(d,e){var f,g=b.xhr(),h=++ec;if(g.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(f in b.xhrFields)g[f]=b.xhrFields[f];b.mimeType&&g.overrideMimeType&&g.overrideMimeType(b.mimeType),b.crossDomain||d["X-Requested-With"]||(d["X-Requested-With"]="XMLHttpRequest");for(f in d)void 0!==d[f]&&g.setRequestHeader(f,d[f]+"");g.send(b.hasContent&&b.data||null),c=function(a,d){var f,i,j;if(c&&(d||4===g.readyState))if(delete fc[h],c=void 0,g.onreadystatechange=n.noop,d)4!==g.readyState&&g.abort();else{j={},f=g.status,"string"==typeof g.responseText&&(j.text=g.responseText);try{i=g.statusText}catch(k){i=""}f||!b.isLocal||b.crossDomain?1223===f&&(f=204):f=j.text?200:404}j&&e(f,i,j,g.getAllResponseHeaders())},b.async?4===g.readyState?a.setTimeout(c):g.onreadystatechange=fc[h]=c:c()},abort:function(){c&&c(void 0,!0)}}}});function hc(){try{return new a.XMLHttpRequest}catch(b){}}function ic(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=d.head||n("head")[0]||d.documentElement;return{send:function(e,f){b=d.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||f(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var jc=[],kc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=jc.pop()||n.expando+"_"+Eb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(kc.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&kc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(kc,"$1"+e):b.jsonp!==!1&&(b.url+=(Fb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,jc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ja([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var lc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&lc)return lc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h,a.length)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function mc(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?("undefined"!=typeof e.getBoundingClientRect&&(d=e.getBoundingClientRect()),c=mc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Qa})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return Y(this,function(a,d,e){var f=mc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ua(l.pixelPosition,function(a,c){return c?(c=Sa(a,b),Oa.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({
	padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return Y(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var nc=a.jQuery,oc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=oc),b&&a.jQuery===n&&(a.jQuery=nc),n},b||(a.jQuery=a.$=n),n});


/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 使用方法: 
	 * http://api.jquery.com/jQuery.ajax/
	 */
	var _Promise_ = function() {
	    this.then = function() {
	        return this;
	    };
	    this.done = function() {
	        return this;
	    };
	    this.fail = function() {
	        return this;
	    };
	    this.always = function(fn) {
	        if (fn && $.isFunction(fn)) {
	            fn();
	        }
	        return this;
	    };
	};

	var fetch = function(url, options) {
	    var defaults = {
	        url: url,
	        method: options.method,
	        dataType: 'json',
	        timeout: 30000,
	        validate: false, // 发送请求前是否验证登录
	        refresh: false    // 登陆后刷新当前页面 默认否
	    };
	    $.extend(true, defaults, options);

	    if (defaults.validate) {
	        var loginPop = __webpack_require__(3);
	        var isLogin = __webpack_require__(42);
	        if (!isLogin()) {
	            loginPop(defaults);
	            return new _Promise_();
	        }
	    }
	    return $.ajax(defaults);
	};

	var exp = {};
	var methods = ['get', 'post'];

	var forEach = function(array, fn) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        fn.call(array, array[i], i, array);
	    }
	};

	forEach(methods, function(method) {
	    exp[method] = function(url, options) {
	        options = options || {};
	        options.method = method;
	        return fetch(url, options);
	    }
	});

	module.exports = exp;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {var Dialog = __webpack_require__(22);
	var tpl = __webpack_require__(25);
	var login = __webpack_require__(27);

	var passDomain = $_CONFIG.passport_domain;
	var currentUrl = $_CONFIG.current_url;

	function pop(opts) {
	    var tplContent = {
	        forget: passDomain,
	        regist: passDomain,
	        qq: passDomain + 'login/connect_qq?redirect=' + currentUrl,
	        wx: passDomain + 'login/connect_wechat?redirect=' + currentUrl,
	        wb: passDomain + 'login/connect_wb?redirect=' + currentUrl
	    };
	    var d = Dialog({
	        fixed: true,
	        title: '',
	        modal: true,
	        autofocus: false,
	        content: tpl(tplContent),
	        className: 'pop-box',
	        onshow: function() {
	            //var o = $(this._$('content'));
	            login.init(this, opts);
	        },
	        onclose: function() {
	            //var o = $(this._$('content'));
	            login.destroy(this);
	        }
	    })
	    d.show();
	}

	module.exports = pop;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * $GLOBAL_CONFIG
	 * @author Zhengchun Fu
	 */
	var indexOf = __webpack_require__(5);
	var c = window.$GLOBAL_CONFIG || {};

	var defaults = {
		main_domain: c.main_domain,
		passport_domain: c.passport_domain,
		order_domain: c.order_domain,
		group_domain: c.group_domain,
		i_domain: c.i_domain,
		mall_domain: c.mall_domain,
		js_domain: c.js_domain,
		jspath: c.pcjspath,
		csspath: c.pccsspath,
		imgpath: c.pcimgpath,
		wap_url: c.wap_url
	};

	var exclude = ['pcjspath', 'pccsspath', 'pcimgpath'];

	for(var key in c){
		if(!defaults.hasOwnProperty[key] && indexOf(exclude, key) === -1){
			defaults[key] = c[key];
		}
	}

	module.exports = defaults;


/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(6),
	    toInteger = __webpack_require__(10);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Gets the index at which the first occurrence of `value` is found in `array`
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. If `fromIndex` is negative, it's used as the
	 * offset from the end of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 * @example
	 *
	 * _.indexOf([1, 2, 1, 2], 2);
	 * // => 1
	 *
	 * // Search from the `fromIndex`.
	 * _.indexOf([1, 2, 1, 2], 2, 2);
	 * // => 3
	 */
	function indexOf(array, value, fromIndex) {
	  var length = array == null ? 0 : array.length;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseIndexOf(array, value, index);
	}

	module.exports = indexOf;


/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(7),
	    baseIsNaN = __webpack_require__(8),
	    strictIndexOf = __webpack_require__(9);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}

	module.exports = baseIndexOf;


/***/ },

/***/ 7:
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },

/***/ 8:
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ },

/***/ 9:
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(11);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	module.exports = toInteger;


/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(12);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13),
	    isSymbol = __webpack_require__(14);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },

/***/ 13:
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(15),
	    isObjectLike = __webpack_require__(21);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(16),
	    getRawTag = __webpack_require__(19),
	    objectToString = __webpack_require__(20);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  value = Object(value);
	  return (symToStringTag && symToStringTag in value)
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(17);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(18);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },

/***/ 18:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(16);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },

/***/ 20:
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },

/***/ 21:
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*!
	 * artDialog
	 * Date: 2014-11-09
	 * https://github.com/aui/artDialog
	 * (c) 2009-2014 TangBin, http://www.planeArt.cn
	 *
	 * This is licensed under the GNU LGPL, version 2.1 or later.
	 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
	 */
	var Popup = __webpack_require__(23);
	var defaults = __webpack_require__(24);
	var css = defaults.cssUri;

	/*
	// css loader: RequireJS & SeaJS
	if (css) {
	    var fn = require[require.toUrl ? 'toUrl' : 'resolve'];
	    if (fn) {
	        css = fn(css);
	        css = '<link rel="stylesheet" href="' + css + '" />';
	        if ($('base')[0]) {
	            $('base').before(css);
	        } else {
	            $('head').append(css);
	        } 
	    }
	}*/


	var _count = 0;
	var _expando = new Date() - 0; // Date.now()
	var _isIE6 = !('minWidth' in $('html')[0].style);
	var _isMobile = 'createTouch' in document && !('onmousemove' in document)
	    || /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
	var _isFixed = !_isIE6 && !_isMobile;


	var artDialog = function (options, ok, cancel) {

	    var originalOptions = options = options || {};
	    

	    if (typeof options === 'string' || options.nodeType === 1) {
	    
	        options = {content: options, fixed: !_isMobile};
	    }
	    

	    options = $.extend(true, {}, artDialog.defaults, options);
	    options.original = originalOptions;

	    var id = options.id = options.id || _expando + _count;
	    var api = artDialog.get(id);
	    
	    
	    // 如果存在同名的对话框对象，则直接返回
	    if (api) {
	        return api.focus();
	    }
	    
	    
	    // 目前主流移动设备对fixed支持不好，禁用此特性
	    if (!_isFixed) {
	        options.fixed = false;
	    }


	    // 快捷关闭支持：点击对话框外快速关闭对话框
	    if (options.quickClose) {
	        options.modal = true;
	        options.backdropOpacity = 0;
	    }
	    

	    // 按钮组
	    if (!$.isArray(options.button)) {
	        options.button = [];
	    }
	    
	    // 确定按钮
	    if (ok !== undefined) {
	        options.ok = ok;
	    }
	    
	    if (options.ok) {
	        options.button.push({
	            id: 'ok',
	            value: options.okValue,
	            callback: options.ok,
	            cls: options.okCls,
	            autofocus: true
	        });
	    }

	    // 取消按钮
	    if (cancel !== undefined) {
	        options.cancel = cancel;
	    }
	    
	    if (options.cancel) {
	        options.button.push({
	            id: 'cancel',
	            value: options.cancelValue,
	            callback: options.cancel,
	            cls: options.cancelCls,
	            display: options.cancelDisplay
	        });
	    }

	    return artDialog.list[id] = new artDialog.create(options);
	};

	var popup = function () {};
	popup.prototype = Popup.prototype;
	var prototype = artDialog.prototype = new popup();

	artDialog.create = function (options) {
	    var that = this;

	    $.extend(this, new Popup());

	    var originalOptions = options.original;
	    var $popup = $(this.node).html(options.innerHTML);
	    var $backdrop = $(this.backdrop);

	    this.options = options;
	    this._popup = $popup;

	    
	    $.each(options, function (name, value) {
	        if (typeof that[name] === 'function') {
	            that[name](value);
	        } else {
	            that[name] = value;
	        }
	    });


	    // 更新 zIndex 全局配置
	    if (options.zIndex) {
	        Popup.zIndex = options.zIndex;
	    }


	    // 设置 ARIA 信息
	    $popup.attr({
	        'aria-labelledby': this._$('title')
	            .attr('id', 'title:' + this.id).attr('id'),
	        'aria-describedby': this._$('content')
	            .attr('id', 'content:' + this.id).attr('id')
	    });


	    // 关闭按钮
	    this._$('close')
	    .css('display', this.cancel === false ? 'none' : '')
	    .attr('title', this.cancelValue)
	    .on('click', function (event) {
	        that._trigger('cancel');
	        event.preventDefault();
	    });
	    

	    // 添加视觉参数
	    this._$('dialog').addClass(this.skin);
	    this._$('body').css('padding', this.padding);


	    // 点击任意空白处关闭对话框
	    if (options.quickClose) {
	        $backdrop
	        .on(
	            'onmousedown' in document ? 'mousedown' : 'click',
	            function () {
	            that._trigger('cancel');
	            return false;// 阻止抢夺焦点
	        });
	    }


	    // 遮罩设置
	    this.addEventListener('show', function () {
	        $backdrop.css({
	            opacity: 0,
	            background: options.backdropBackground
	        }).animate(
	            {opacity: options.backdropOpacity}
	        , 150);
	    });


	    // ESC 快捷键关闭对话框
	    this._esc = function (event) {
	        var target = event.target;
	        var nodeName = target.nodeName;
	        var rinput = /^input|textarea$/i;
	        var isTop = Popup.current === that;
	        var keyCode = event.keyCode;

	        // 避免输入状态中 ESC 误操作关闭
	        if (!isTop || rinput.test(nodeName) && target.type !== 'button') {
	            return;
	        }
	        
	        if (keyCode === 27) {
	            that._trigger('cancel');
	        }
	    };

	    $(document).on('keydown', this._esc);
	    this.addEventListener('remove', function () {
	        $(document).off('keydown', this._esc);
	        delete artDialog.list[this.id];
	    });


	    _count ++;
	    
	    artDialog.oncreate(this);

	    return this;
	};

	artDialog.create.prototype = prototype;

	$.extend(prototype, {

	    /**
	     * 显示对话框
	     * @name artDialog.prototype.show
	     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
	     */
	    
	    /**
	     * 显示对话框（模态）
	     * @name artDialog.prototype.showModal
	     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
	     */

	    /**
	     * 关闭对话框
	     * @name artDialog.prototype.close
	     * @param   {String, Number}    返回值，可被 onclose 事件收取（可选）
	     */

	    /**
	     * 销毁对话框
	     * @name artDialog.prototype.remove
	     */

	    /**
	     * 重置对话框位置
	     * @name artDialog.prototype.reset
	     */

	    /**
	     * 让对话框聚焦（同时置顶）
	     * @name artDialog.prototype.focus
	     */

	    /**
	     * 让对话框失焦（同时置顶）
	     * @name artDialog.prototype.blur
	     */

	    /**
	     * 添加事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     * @name artDialog.prototype.addEventListener
	     */

	    /**
	     * 删除事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     * @name artDialog.prototype.removeEventListener
	     */

	    /**
	     * 对话框显示事件，在 show()、showModal() 执行
	     * @name artDialog.prototype.onshow
	     * @event
	     */

	    /**
	     * 关闭事件，在 close() 执行
	     * @name artDialog.prototype.onclose
	     * @event
	     */

	    /**
	     * 销毁前事件，在 remove() 前执行
	     * @name artDialog.prototype.onbeforeremove
	     * @event
	     */

	    /**
	     * 销毁事件，在 remove() 执行
	     * @name artDialog.prototype.onremove
	     * @event
	     */

	    /**
	     * 重置事件，在 reset() 执行
	     * @name artDialog.prototype.onreset
	     * @event
	     */

	    /**
	     * 焦点事件，在 foucs() 执行
	     * @name artDialog.prototype.onfocus
	     * @event
	     */

	    /**
	     * 失焦事件，在 blur() 执行
	     * @name artDialog.prototype.onblur
	     * @event
	     */

	    
	    /**
	     * 设置内容
	     * @param    {String, HTMLElement}   内容
	     */
	    content: function (html) {
	    
	        var $content = this._$('content');

	        // HTMLElement
	        if (typeof html === 'object') {
	            html = $(html);
	            $content.empty('').append(html.show());
	            this.addEventListener('beforeremove', function () {
	                $('body').append(html.hide());
	            });
	        // String
	        } else {
	            $content.html(html);
	        }
	                
	        return this.reset();
	    },
	    
	    
	    /**
	     * 设置标题
	     * @param    {String}   标题内容
	     */
	    title: function (text) {
	        this._$('title').text(text);
	        this._$('header')[text ? 'show' : 'hide']();
	        return this;
	    },


	    /** 设置宽度 */
	    width: function (value) {
	        this._$('content').css('width', value);
	        return this.reset();
	    },


	    /** 设置高度 */
	    height: function (value) {
	        this._$('content').css('height', value);
	        return this.reset();
	    },


	    /**
	     * 设置按钮组
	     * @param   {Array, String}
	     * Options: value, callback, autofocus, disabled 
	     */
	    button: function (args) {
	        args = args || [];
	        var that = this;
	        var html = '';
	        var number = 0;
	        this.callbacks = {};
	        
	           
	        if (typeof args === 'string') {
	            html = args;
	            number ++;
	        } else {
	            $.each(args, function (i, val) {

	                var id = val.id = val.id || val.value;
	                var style = '';
	                var btnCls = val.cls || '';
	                that.callbacks[id] = val.callback;


	                if (val.display === false) {
	                    style = ' style="display:none"';
	                } else {
	                    number ++;
	                }

	                html +=
	                  '<a'
	                + ' href="javascript:;"'
	                + ' i-id="' + id + '"'
	                + style
	                + (val.disabled ? ' disabled' : '')
	                // + (val.autofocus ? ' autofocus class="ui-dialog-autofocus"' : '')
	                + ' class="' + btnCls + '"' 
	                + '>'
	                +   val.value
	                + '</a>';

	                that._$('button').addClass(that.options.btnWrapCls)
	                .on('click', '[i-id=' + id +']', function (event) {                
	                    var $this = $(this);
	                    if (!$this.attr('disabled')) {// IE BUG
	                        that._trigger(id);
	                    }
	                
	                    event.preventDefault();
	                });

	            });
	        }

	        this._$('button').html(html);
	        this._$('footer')[number ? 'show' : 'hide']();

	        return this;
	    },


	    statusbar: function (html) {
	        this._$('statusbar')
	        .html(html)[html ? 'show' : 'hide']();

	        return this;
	    },


	    _$: function (i) {
	        return this._popup.find('[i=' + i + ']');
	    },
	    
	    
	    // 触发按钮回调函数
	    _trigger: function (id) {
	        var fn = this.callbacks[id];
	            
	        return typeof fn !== 'function' || fn.call(this) !== false ?
	            this.close().remove() : this;
	    }
	    
	});

	artDialog.oncreate = $.noop;

	/** 获取最顶层的对话框API */
	artDialog.getCurrent = function () {
	    return Popup.current;
	};



	/**
	 * 根据 ID 获取某对话框 API
	 * @param    {String}    对话框 ID
	 * @return   {Object}    对话框 API (实例)
	 */
	artDialog.get = function (id) {
	    return id === undefined
	    ? artDialog.list
	    : artDialog.list[id];
	};

	artDialog.list = {};



	/**
	 * 默认配置
	 */
	artDialog.defaults = defaults;

	module.exports = artDialog;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*!
	 * PopupJS
	 * Date: 2014-11-09
	 * https://github.com/aui/popupjs
	 * (c) 2009-2014 TangBin, http://www.planeArt.cn
	 *
	 * This is licensed under the GNU LGPL, version 2.1 or later.
	 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
	 */
	var _count = 0;
	var _isIE6 = !('minWidth' in $('html')[0].style);
	var _isFixed = !_isIE6;


	function Popup () {

	    this.destroyed = false;


	    this.__popup = $('<div />')
	    /*使用 <dialog /> 元素可能导致 z-index 永远置顶的问题(chrome)*/
	    .css({
	        display: 'none',
	        position: 'absolute',
	        /*
	        left: 0,
	        top: 0,
	        bottom: 'auto',
	        right: 'auto',
	        margin: 0,
	        padding: 0,
	        border: '0 none',
	        background: 'transparent'
	        */
	        outline: 0
	    })
	    .attr('tabindex', '-1')
	    .html(this.innerHTML)
	    .appendTo('body');


	    this.__backdrop = this.__mask = $('<div />')
	    .css({
	        opacity: .7,
	        background: '#000'
	    });


	    // 使用 HTMLElement 作为外部接口使用，而不是 jquery 对象
	    // 统一的接口利于未来 Popup 移植到其他 DOM 库中
	    this.node = this.__popup[0];
	    this.backdrop = this.__backdrop[0];

	    _count ++;
	}


	$.extend(Popup.prototype, {
	    
	    /**
	     * 初始化完毕事件，在 show()、showModal() 执行
	     * @name Popup.prototype.onshow
	     * @event
	     */

	    /**
	     * 关闭事件，在 close() 执行
	     * @name Popup.prototype.onclose
	     * @event
	     */

	    /**
	     * 销毁前事件，在 remove() 前执行
	     * @name Popup.prototype.onbeforeremove
	     * @event
	     */

	    /**
	     * 销毁事件，在 remove() 执行
	     * @name Popup.prototype.onremove
	     * @event
	     */

	    /**
	     * 重置事件，在 reset() 执行
	     * @name Popup.prototype.onreset
	     * @event
	     */

	    /**
	     * 焦点事件，在 foucs() 执行
	     * @name Popup.prototype.onfocus
	     * @event
	     */

	    /**
	     * 失焦事件，在 blur() 执行
	     * @name Popup.prototype.onblur
	     * @event
	     */

	    /** 浮层 DOM 素节点[*] */
	    node: null,

	    /** 遮罩 DOM 节点[*] */
	    backdrop: null,

	    /** 是否开启固定定位[*] */
	    fixed: false,

	    /** 判断对话框是否删除[*] */
	    destroyed: true,

	    /** 判断对话框是否显示 */
	    open: false,

	    /** close 返回值 */
	    returnValue: '',

	    /** 是否自动聚焦 */
	    autofocus: true,

	    /** 对齐方式[*] */
	    align: 'bottom left',

	    /** 内部的 HTML 字符串 */
	    innerHTML: '',

	    /** CSS 类名 */
	    className: 'ui-popup',

	    /**
	     * 显示浮层
	     * @param   {HTMLElement, Event}  指定位置（可选）
	     */
	    show: function (anchor) {

	        if (this.destroyed) {
	            return this;
	        }

	        var that = this;
	        var popup = this.__popup;
	        var backdrop = this.__backdrop;

	        this.__activeElement = this.__getActive();

	        this.open = true;
	        this.follow = anchor || this.follow;


	        // 初始化 show 方法
	        if (!this.__ready) {

	            popup
	            .addClass(this.className)
	            .attr('role', this.modal ? 'alertdialog' : 'dialog')
	            .css('position', this.fixed ? 'fixed' : 'absolute');

	            if (!_isIE6) {
	                $(window).on('resize', $.proxy(this.reset, this));
	            }

	            // 模态浮层的遮罩
	            if (this.modal) {
	                var backdropCss = {
	                    position: 'fixed',
	                    left: 0,
	                    top: 0,
	                    width: '100%',
	                    height: '100%',
	                    overflow: 'hidden',
	                    userSelect: 'none',
	                    zIndex: this.zIndex || Popup.zIndex
	                };


	                popup.addClass(this.className + '-modal');


	                if (!_isFixed) {
	                    $.extend(backdropCss, {
	                        position: 'absolute',
	                        width: $(window).width() + 'px',
	                        height: $(document).height() + 'px'
	                    });
	                }


	                backdrop
	                .css(backdropCss)
	                .attr({tabindex: '0'})
	                .on('focus', $.proxy(this.focus, this));

	                // 锁定 tab 的焦点操作
	                this.__mask = backdrop
	                .clone(true)
	                .attr('style', '')
	                .insertAfter(popup);

	                backdrop
	                .addClass(this.className + '-backdrop')
	                .insertBefore(popup);

	                this.__ready = true;
	            }


	            if (!popup.html()) {
	                popup.html(this.innerHTML);
	            }
	        }


	        popup
	        .addClass(this.className + '-show')
	        .show();

	        backdrop.show();


	        this.reset().focus();
	        this.__dispatchEvent('show');

	        return this;
	    },


	    /** 显示模态浮层。参数参见 show() */
	    showModal: function () {
	        this.modal = true;
	        return this.show.apply(this, arguments);
	    },
	    
	    
	    /** 关闭浮层 */
	    close: function (result) {
	        
	        if (!this.destroyed && this.open) {
	            
	            if (result !== undefined) {
	                this.returnValue = result;
	            }
	            
	            this.__popup.hide().removeClass(this.className + '-show');
	            this.__backdrop.hide();
	            this.open = false;
	            this.blur();// 恢复焦点，照顾键盘操作的用户
	            this.__dispatchEvent('close');
	        }
	    
	        return this;
	    },


	    /** 销毁浮层 */
	    remove: function () {

	        if (this.destroyed) {
	            return this;
	        }

	        this.__dispatchEvent('beforeremove');
	        
	        if (Popup.current === this) {
	            Popup.current = null;
	        }


	        // 从 DOM 中移除节点
	        this.__popup.remove();
	        this.__backdrop.remove();
	        this.__mask.remove();


	        if (!_isIE6) {
	            $(window).off('resize', this.reset);
	        }


	        this.__dispatchEvent('remove');

	        for (var i in this) {
	            delete this[i];
	        }

	        return this;
	    },


	    /** 重置位置 */
	    reset: function () {

	        var elem = this.follow;

	        if (elem) {
	            this.__follow(elem);
	        } else {
	            this.__center();
	        }

	        this.__dispatchEvent('reset');

	        return this;
	    },


	    /** 让浮层获取焦点 */
	    focus: function () {

	        var node = this.node;
	        var popup = this.__popup;
	        var current = Popup.current;
	        var index = this.zIndex = Popup.zIndex ++;

	        if (current && current !== this) {
	            current.blur(false);
	        }

	        // 检查焦点是否在浮层里面
	        if (!$.contains(node, this.__getActive())) {
	            var autofocus = popup.find('[autofocus]')[0];

	            if (!this._autofocus && autofocus) {
	                this._autofocus = true;
	            } else {
	                autofocus = node;
	            }

	            this.__focus(autofocus);
	        }

	        // 设置叠加高度
	        popup.css('zIndex', index);
	        //this.__backdrop.css('zIndex', index);

	        Popup.current = this;
	        popup.addClass(this.className + '-focus');

	        this.__dispatchEvent('focus');

	        return this;
	    },


	    /** 让浮层失去焦点。将焦点退还给之前的元素，照顾视力障碍用户 */
	    blur: function () {

	        var activeElement = this.__activeElement;
	        var isBlur = arguments[0];


	        if (isBlur !== false) {
	            this.__focus(activeElement);
	        }

	        this._autofocus = false;
	        this.__popup.removeClass(this.className + '-focus');
	        this.__dispatchEvent('blur');

	        return this;
	    },


	    /**
	     * 添加事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     */
	    addEventListener: function (type, callback) {
	        this.__getEventListener(type).push(callback);
	        return this;
	    },


	    /**
	     * 删除事件
	     * @param   {String}    事件类型
	     * @param   {Function}  监听函数
	     */
	    removeEventListener: function (type, callback) {
	        var listeners = this.__getEventListener(type);
	        for (var i = 0; i < listeners.length; i ++) {
	            if (callback === listeners[i]) {
	                listeners.splice(i--, 1);
	            }
	        }
	        return this;
	    },


	    // 获取事件缓存
	    __getEventListener: function (type) {
	        var listener = this.__listener;
	        if (!listener) {
	            listener = this.__listener = {};
	        }
	        if (!listener[type]) {
	            listener[type] = [];
	        }
	        return listener[type];
	    },


	    // 派发事件
	    __dispatchEvent: function (type) {
	        var listeners = this.__getEventListener(type);

	        if (this['on' + type]) {
	            this['on' + type]();
	        }

	        for (var i = 0; i < listeners.length; i ++) {
	            listeners[i].call(this);
	        }
	    },


	    // 对元素安全聚焦
	    __focus: function (elem) {
	        // 防止 iframe 跨域无权限报错
	        // 防止 IE 不可见元素报错
	        try {
	            // ie11 bug: iframe 页面点击会跳到顶部
	            if (this.autofocus && !/^iframe$/i.test(elem.nodeName)) {
	                elem.focus();
	            }
	        } catch (e) {}
	    },


	    // 获取当前焦点的元素
	    __getActive: function () {
	        try {// try: ie8~9, iframe #26
	            var activeElement = document.activeElement;
	            var contentDocument = activeElement.contentDocument;
	            var elem = contentDocument && contentDocument.activeElement || activeElement;
	            return elem;
	        } catch (e) {}
	    },


	    // 居中浮层
	    __center: function () {
	    
	        var popup = this.__popup;
	        var $window = $(window);
	        var $document = $(document);
	        var fixed = this.fixed;
	        var dl = fixed ? 0 : $document.scrollLeft();
	        var dt = fixed ? 0 : $document.scrollTop();
	        var ww = $window.width();
	        var wh = $window.height();
	        var ow = popup.width();
	        var oh = popup.height();
	        var left = (ww - ow) / 2 + dl;
	        var top = (wh - oh) * 382 / 1000 + dt;// 黄金比例
	        var style = popup[0].style;

	        
	        style.left = Math.max(parseInt(left), dl) + 'px';
	        style.top = Math.max(parseInt(top), dt) + 'px';
	    },
	    
	    
	    // 指定位置 @param    {HTMLElement, Event}  anchor
	    __follow: function (anchor) {
	        
	        var $elem = anchor.parentNode && $(anchor);
	        var popup = this.__popup;
	        

	        if (this.__followSkin) {
	            popup.removeClass(this.__followSkin);
	        }


	        // 隐藏元素不可用
	        if ($elem) {
	            var o = $elem.offset();
	            if (o.left * o.top < 0) {
	                return this.__center();
	            }
	        }
	        
	        var that = this;
	        var fixed = this.fixed;

	        var $window = $(window);
	        var $document = $(document);
	        var winWidth = $window.width();
	        var winHeight = $window.height();
	        var docLeft =  $document.scrollLeft();
	        var docTop = $document.scrollTop();


	        var popupWidth = popup.width();
	        var popupHeight = popup.height();
	        var width = $elem ? $elem.outerWidth() : 0;
	        var height = $elem ? $elem.outerHeight() : 0;
	        var offset = this.__offset(anchor);
	        var x = offset.left;
	        var y = offset.top;
	        var left =  fixed ? x - docLeft : x;
	        var top = fixed ? y - docTop : y;


	        var minLeft = fixed ? 0 : docLeft;
	        var minTop = fixed ? 0 : docTop;
	        var maxLeft = minLeft + winWidth - popupWidth;
	        var maxTop = minTop + winHeight - popupHeight;


	        var css = {};
	        var align = this.align.split(' ');
	        var className = this.className + '-';
	        var reverse = {top: 'bottom', bottom: 'top', left: 'right', right: 'left'};
	        var name = {top: 'top', bottom: 'top', left: 'left', right: 'left'};


	        var temp = [{
	            top: top - popupHeight,
	            bottom: top + height,
	            left: left - popupWidth,
	            right: left + width
	        }, {
	            top: top,
	            bottom: top - popupHeight + height,
	            left: left,
	            right: left - popupWidth + width
	        }];


	        var center = {
	            left: left + width / 2 - popupWidth / 2,
	            top: top + height / 2 - popupHeight / 2
	        };

	        
	        var range = {
	            left: [minLeft, maxLeft],
	            top: [minTop, maxTop]
	        };


	        // 超出可视区域重新适应位置
	        $.each(align, function (i, val) {

	            // 超出右或下边界：使用左或者上边对齐
	            if (temp[i][val] > range[name[val]][1]) {
	                val = align[i] = reverse[val];
	            }

	            // 超出左或右边界：使用右或者下边对齐
	            if (temp[i][val] < range[name[val]][0]) {
	                align[i] = reverse[val];
	            }

	        });


	        // 一个参数的情况
	        if (!align[1]) {
	            name[align[1]] = name[align[0]] === 'left' ? 'top' : 'left';
	            temp[1][align[1]] = center[name[align[1]]];
	        }


	        //添加follow的css, 为了给css使用
	        className += align.join('-') + ' '+ this.className+ '-follow';
	        
	        that.__followSkin = className;


	        if ($elem) {
	            popup.addClass(className);
	        }

	        
	        css[name[align[0]]] = parseInt(temp[0][align[0]]);
	        css[name[align[1]]] = parseInt(temp[1][align[1]]);
	        popup.css(css);

	    },


	    // 获取元素相对于页面的位置（包括iframe内的元素）
	    // 暂时不支持两层以上的 iframe 套嵌
	    __offset: function (anchor) {

	        var isNode = anchor.parentNode;
	        var offset = isNode ? $(anchor).offset() : {
	            left: anchor.pageX,
	            top: anchor.pageY
	        };


	        anchor = isNode ? anchor : anchor.target;
	        var ownerDocument = anchor.ownerDocument;
	        var defaultView = ownerDocument.defaultView || ownerDocument.parentWindow;
	        
	        if (defaultView == window) {// IE <= 8 只能使用两个等于号
	            return offset;
	        }

	        // {Element: Ifarme}
	        var frameElement = defaultView.frameElement;
	        var $ownerDocument = $(ownerDocument);
	        var docLeft =  $ownerDocument.scrollLeft();
	        var docTop = $ownerDocument.scrollTop();
	        var frameOffset = $(frameElement).offset();
	        var frameLeft = frameOffset.left;
	        var frameTop = frameOffset.top;
	        
	        return {
	            left: offset.left + frameLeft - docLeft,
	            top: offset.top + frameTop - docTop
	        };
	    }
	    
	});


	/** 当前叠加高度 */
	Popup.zIndex = 1024;


	/** 顶层浮层的实例 */
	Popup.current = null;


	module.exports = Popup;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 24:
/***/ function(module, exports) {

	// artDialog - 默认配置

	module.exports = {

	    /* -----已注释的配置继承自 popup.js，仍可以再这里重新定义它----- */

	    // 对齐方式
	    //align: 'bottom left',
	    
	    // 是否固定定位
	    //fixed: false,
	    
	    // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
	    //zIndex: 1024,

	    // 设置遮罩背景颜色
	    backdropBackground: '#000',

	    // 设置遮罩透明度
	    backdropOpacity: 0.7,

	    // 消息内容
	    content: '<span class="ui-dialog-loading">Loading..</span>',
	    
	    // 标题
	    title: '',

	    // 对话框状态栏区域 HTML 代码
	    statusbar: '',
	    
	    // 自定义按钮
	    button: null,
	    
	    // 确定按钮回调函数
	    ok: null,
	    
	    // 取消按钮回调函数
	    cancel: null,

	    // 确定按钮文本
	    okValue: '确定',
	    
	    // 取消按钮文本
	    cancelValue: '取消',

	    cancelDisplay: true,
	    
	    // 内容宽度
	    width: '',
	    
	    // 内容高度
	    height: '',
	    
	    // 内容与边界填充距离
	    padding: '',
	    
	    // 对话框自定义 className
	    skin: '',

	    // 是否支持快捷关闭（点击遮罩层自动关闭）
	    quickClose: false,

	    // css 文件路径，留空则不会使用 js 自动加载样式
	    // 注意：css 只允许加载一个
	    cssUri: '../css/ui-dialog.css',

	    // 模板（使用 table 解决 IE7 宽度自适应的 BUG）
	    // js 使用 i="***" 属性识别结构，其余的均可自定义
	    innerHTML:
	        '<div i="dialog" class="ui-dialog">'
	        +       '<div class="ui-dialog-arrow-a"></div>'
	        +       '<div class="ui-dialog-arrow-b"></div>'
	        +       '<table class="ui-dialog-grid">'
	        +           '<tr>'
	        +               '<td i="header" class="ui-dialog-header">'
	        +                   '<button i="close" class="ui-dialog-close icon icon-close" title="关闭">&#215;</button>'
	        +                   '<div i="title" class="ui-dialog-title"></div>'
	        +               '</td>'
	        +           '</tr>'
	        +           '<tr>'
	        +               '<td i="body" class="ui-dialog-body">'
	        +                   '<div i="content" class="ui-dialog-content"></div>'
	        +               '</td>'
	        +           '</tr>'
	        +           '<tr>'
	        +               '<td i="footer" class="ui-dialog-footer">'
	        +                   '<div i="statusbar" class="ui-dialog-statusbar"></div>'
	        +                   '<div i="button" class="ui-dialog-button"></div>'
	        +               '</td>'
	        +           '</tr>'
	        +       '</table>'
	        +'</div>'
	    
	};

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/login/content',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,forget=$data.forget,regist=$data.regist,qq=$data.qq,wx=$data.wx,wb=$data.wb,$out='';$out+='<div class="lg-land-main" data-node="userForm"> <button i="close" title="取消" href="javascript:;" class="icon icon-close">&times;</button> <a href="javascript:;" class="lg-saoma-pop" data-action="qrCodeBtn"></a> <h4 class="lg-land-tl-pop">欢迎登录</h4> <div class="lg-error-tip none clearfix" data-node="error"> <em class="icon">&#xe983;</em> <span data-node=\'error-message\'>您已三次输入错误，请输入验证码</span> </div> <div class="land-form"> <div class="land-form-it"> <em class="icon icon-close none" data-node="emptyUser"></em> <label class="icon icon-label"></label> <input type="text" placeholder="手机号 / 国美在线账号" class="land-input-md" data-node="userNum"> </div> <div class="land-form-it"> <em class="icon icon-close none" data-node="emptyPwd"></em> <label class="icon icon-label"></label> <input type="password" placeholder="密码" class="land-input-md" data-node="userPwd"> </div> <div class="land-form-cell none" data-node="identifyplace"> <input type="text" placeholder="请输入验证码" data-node="code" class="land-input-short"><img src="" class="code-img"><a href="javascript:;" class="chage-code" data-node="change-code">换一张</a> </div> </div> <div class="land-forget-txt"> <a href=';
	$out+=$escape(forget);
	$out+='forgetpwd class="forget-ps-word">忘记密码</a><a href=';
	$out+=$escape(regist);
	$out+='regist class="rapid-log">立即注册</a> </div> <a href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45" data-node="userLogin">登 录</a> <p class="land-types" data-node="oauth"> <span>第三方账号登录：</span> <a href="';
	$out+=$escape(qq);
	$out+='" class="icon icon-qq" data-node=\'openid\'>&#xe901;</a> <a href="';
	$out+=$escape(wx);
	$out+='" class="icon icon-wx" data-node=\'openid\'>&#xe938;</a> <a href="';
	$out+=$escape(wb);
	$out+='" class="icon icon-wb" data-node=\'openid\'>&#xe936;</a> </p> <div style="display:none" class="lg-code-main" data-node="qrCodeBox"> <button i="close" title="取消" href="javascript:;" class="icon icon-close">&times;</button> <a href="javascript:;" class="lg-saoma-pop" data-action="accLoginBtn"></a> <h5 class="land-title-pop">手机扫码，安全登录</h5> <div class="land-code-img"> <img src="" data-node="qrCodeImg"> <div style="display:none" class="sm-failed" data-node="qrCodeFailBox"> <span data-node="qrCodeTip">二维码已失效</span> <a href="javascript:;" data-action="refQrCode">点击刷新</a> </div> </div> <div class="land-bottom clearfix"><em class="icon"></em> <p>打开 <span>国美+app<br></span>扫一扫登录</p> </div> </div>  <div style="display:none" class="lg-code-main" data-node="qrCodeSucBox"> <button i="close" title="取消" href="javascript:;" class="icon icon-close">&times;</button> <a href="javascript:;" class="lg-saoma-pop" data-action="accLoginBtn"></a> <h5 class="land-title-pop">手机扫码，安全登录</h5> <div class="sm-success"> <img src="https://js.meixincdn.com/m/pc/dist/images/login/sm-success.jpg" class="sm-succes-img"> <span>扫描成功</span> <p>请在手机上确认登录</p>  </div> </div>  </div>';
	return new String($out);
	});

/***/ },

/***/ 26:
/***/ function(module, exports) {

	/*TMODJS:{}*/
	!function () {
		function a(a, b) {
			return (/string|function/.test(typeof b) ? h : g)(a, b)
		}

		function b(a, c) {
			return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
		}

		function c(a) {
			return l[a]
		}

		function d(a) {
			return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
		}

		function e(a, b) {
			if (m(a))for (var c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
		}

		function f(a, b) {
			var c = /(\/)[^\/]+\1\.\.\1/, d = ("./" + a).replace(/[^\/]+$/, ""), e = d + b;
			for (e = e.replace(/\/\.\//g, "/"); e.match(c);)e = e.replace(c, "/");
			return e
		}

		function g(b, c) {
			var d = a.get(b) || i({filename: b, name: "Render Error", message: "Template not found"});
			return c ? d(c) : d
		}

		function h(a, b) {
			if ("string" == typeof b) {
				var c = b;
				b = function () {
					return new k(c)
				}
			}
			var d = j[a] = function (c) {
				try {
					return new b(c, a) + ""
				} catch (d) {
					return i(d)()
				}
			};
			return d.prototype = b.prototype = n, d.toString = function () {
				return b + ""
			}, d
		}

		function i(a) {
			var b = "{Template Error}", c = a.stack || "";
			if (c)c = c.split("\n").slice(0, 2).join("\n"); else for (var d in a)c += "<" + d + ">\n" + a[d] + "\n\n";
			return function () {
				return "object" == typeof console && console.error(b + "\n\n" + c), b
			}
		}

		var j = a.cache = {}, k = this.String, l = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		}, m = Array.isArray || function (a) {
				return "[object Array]" === {}.toString.call(a)
			}, n = a.utils = {
			$helpers: {}, $include: function (a, b, c) {
				return a = f(c, a), g(a, b)
			}, $string: b, $escape: d, $each: e
		}, o = a.helpers = n.$helpers;
		a.get = function (a) {
			return j[a.replace(/^\.\//, "")]
		}, a.helper = function (a, b) {
			o[a] = b
		}, module.exports = a
	}();

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var qrCodeLogin = __webpack_require__(34);
	var crypto = __webpack_require__(39);
	var loginCallback = __webpack_require__(37);
	__webpack_require__(41);

	var CaptchaUrl = url.get('ajaxCaptcha') + "?t=";
	var cookieVal = $_CONFIG.prefix + "userId";
	var passDomain = $_CONFIG.passport_domain;

	var opts, // 登录配置选项
	    popLayer; //父级节点

	var screenWidth = screen.width,
	    screenHeight = screen.height;

	var userForm = "",
	    userNum = "",
	    userPwd = "",
	    errorLi = "",
	    errMes = "",
	    userLogin = "",
	    loginDom = "",
	    identifyPlace = "",
	    changeCode = "",
	    valCode = "",
	    emptyUser = "",
	    emptyPwd = "",
	    $oauth, // 第三方登录区域的父节点
	    firing = false;

	$(document).keydown(function(e) { //键盘enter事件
	    if (e && e.keyCode == 13 && userForm.length) {
	        userLogin.trigger("click");
	        return false;
	    }
	});

	function initNodes(o) {
	    userForm = o.find('[data-node=userForm]');
	    userNum = userForm.find($('[data-node=userNum]'));
	    userPwd = userForm.find($('[data-node=userPwd]'));
	    errorLi = userForm.find($('[data-node=error]'));
	    errMes = errorLi.find($('[data-node=error-message]'));
	    userLogin = userForm.find($('[data-node=userLogin]'));
	    loginDom = userLogin.find('span');
	    identifyPlace = $('[data-node=identifyplace]');
	    changeCode = $('[data-node=change-code]');
	    valCode = $('[data-node=code]');
	    emptyUser = userForm.find('[data-node=emptyUser]');
	    emptyPwd = userForm.find('[data-node=emptyPwd]');
	    $oauth = userForm.find('[data-node=oauth]');
	    firing = false;
	    setTimeout(function() {
	        userNum.placeholder();
	        userPwd.placeholder();
	    }, 100)

	}

	function openWinArg(w, h) {
	    var left = (screenWidth - w) / 2,
	        top = (screenHeight - h) / 2;
	    return 'width=' + w +
	        ',height=' + h +
	        ',top=' + top +
	        ',left=' + left;

	}

	function selfOpenWindow(src, cookieName, exp) {
	    var arg = openWinArg(800, 500);
	    var openWin = window.open(src, "", arg, true);
	    var t = setInterval(function() {
	        if ($.cookie(cookieVal) && $.cookie(cookieName) == exp) {
	            clearInterval(t);
	            openWin.close();
	            loginCallback.init(popLayer, opts);
	        }
	    }, 200);
	    return false;
	}

	function thirdLogin() { //第三方 登录检测cookie
	    var src = this.getAttribute("href");
	    var arg = openWinArg(800, 500);
	    var openWin = window.open(src, "", arg, true);
	    var t = setInterval(function() {
	        if ($.cookie(cookieVal)) {
	            clearInterval(t);
	            openWin.close();
	            loginCallback.init(popLayer, opts);
	        }
	    }, 200);
	    return false;
	}
	//错误提示
	function showError(msg) {
	    errorLi.removeClass('none');
	    errMes.text(msg);
	}

	//后台交互  
	function login() {
	    if (!checkForm()) {
	        return;
	    }
	    if (firing) { // 提交中
	        return;
	    }
	    firing = true;
	    var verifyCode = valCode.val();
	    if (!identifyPlace.hasClass('none')) {
	        if (verifyCode == "") {
	            valCode.css('border', '1px solid #f95353');
	            return;
	        }
	    }
	    var loginData = {
	        login_name: userNum.val(),
	        password: crypto(userPwd.val()),
	        verifyCode: verifyCode,
	        csrf_token: $GLOBAL_CONFIG.csrf_token
	    };
	    loginDom.text("登录中...");
	    fetch.post(url.get('ajaxLoginData'), {
	        async: false,
	        data: loginData,
	        headers: {
	            'Content-Type-Ctag': $.cookie('content_ctag') || ''
	        }
	    }).done(function(json) {
	        loginDom.text('登录');
	        if (json && json.success) {
	            var aliasData = json.data;
	            if (aliasData.user.isMobileActivated == false) {
	                window.location.href = passDomain + "login/bindphonepage";
	                // window.location.href = "/login/bindphonepage";
	                return false;
	            }

	            if (aliasData.isNeedReset == true) { //修改重复昵称
	                var _url = passDomain + "regist/indexnickname";
	                selfOpenWindow(_url, 'temp_nick_name', 'true');
	                return false;
	            }

	            loginCallback.init(popLayer, opts);
	        } else {
	            showError(json.message);
	        }
	    }).always(function() {
	        firing = false;
	    });
	    return false;
	}

	//表单验证
	function checkForm() {
	    var ret = true;
	    if (userNum.val() === "") { //账号为空
	        showError('请输入账号');
	        setWarnStyle(userNum);
	        ret = false;
	    } else if (userPwd.val() === "") { //密码为空
	        showError('请输入密码');
	        setWarnStyle(userPwd);
	        ret = false;
	    } else if (valCode.is(":visible") && valCode.val() == "") {
	        showError('请输入验证码');
	        ret = false;
	    }
	    return ret;
	};
	//事件绑定
	function init(pa, opt) {
	    var o = $(pa._$('content'));
	    opts = opt || {};
	    initNodes(o); // 初始化节点
	    popLayer = pa;
	    userLogin.on("click", login);

	    userForm
	        .on('focusin', function(e) {
	            var Target = $(e.target).attr('data-node');
	            switch (Target) {
	                case 'userNum':
	                    setStyle(userNum);
	                    break;
	                case 'userPwd':
	                    setStyle(userPwd);
	                    break;
	                case 'code':
	                    valCode.addClass('land-focus');
	                    break;
	                case 'change-code':
	                    identifyPlace.find('.code-img').attr('src', CaptchaUrl + new Date().getTime());
	                    //identifyPlace.find('.code-img').attr('src', "/login/captcha?t=" + new Date().getTime());
	                    valCode.val('');
	                    changeCode.blur();
	                    break;
	            }
	            return false;
	        })
	        .on('focusout', function(e) {
	            var Target = $(e.target).attr('data-node');
	            switch (Target) {
	                case 'userNum':
	                    removeStyle(userNum);
	                    break;
	                case 'userPwd':
	                    removeStyle(userPwd);
	                    break;
	                case 'code':
	                    valCode.removeClass('land-focus');
	                    break;
	            }
	            return false;
	        })

	    userNum.on("keyup", function() { //账户keyup事件
	        isEmpty(userNum, emptyUser);
	    });

	    userPwd.on("keyup", function() { //账户keyup事件
	        isEmpty(userPwd, emptyPwd);
	    });

	    emptyUser.on("click", function() {
	        emptyInfo(userNum, emptyUser);
	    });
	    emptyPwd.on("click", function() {
	        emptyInfo(userPwd, emptyPwd);
	    });

	    $oauth.on('click', '[data-node=openid]', thirdLogin);

	    qrCodeLogin.init(userForm, opts, pa);
	};
	//事件解绑 destory 
	function destroy(o) {
	    // var o = $(pa._$('content')); //备用
	    userForm.off();
	    userNum.off();
	    userPwd.off();
	    errorLi.off();
	    errMes.off();
	    userLogin.off();
	    loginDom.off();
	    identifyPlace.off();
	    changeCode.off();
	    valCode.off();
	    emptyUser.off();
	    emptyPwd.off();
	    $oauth.off();
	}

	function emptyInfo(obj, $target) {
	    obj.val('');
	    $target.addClass('none');
	};

	function isEmpty(obj, $target) {
	    if (obj.val() !== "") {
	        $target.removeClass('none');
	    } else {
	        $target.addClass('none');
	    }
	};

	//设置样式
	function setStyle(obj) {
	    obj.parent().removeClass("land-error-it").addClass("land-focus");
	    errorLi.addClass('none');
	}

	//移除样式
	function removeStyle(obj) {
	    obj.parent().removeClass("land-focus");
	}

	function setWarnStyle(obj) {
	    obj.parent().addClass('land-error-it');
	}

	module.exports = {
	    init: init,
	    destroy: destroy
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	var passport = __webpack_require__(29);
	var mall = __webpack_require__(30);
	var group = __webpack_require__(31);
	var order = __webpack_require__(32);
	var ucenter = __webpack_require__(33);

	// 方便输出调试信息
	passport._name_ = 'passport';
	mall._name_ = 'mall';
	group._name_ = 'group';
	order._name_ = 'order';
	ucenter._name_ = 'ucenter';

	var urls = {};
	var repeat = []; // 记录重复的url

	var _extend = function(defaults) {
	    for (var i = 1, len = arguments.length; i < len; i++) {
	        var options = arguments[i];
	        var moduleName = options._name_;
	        delete options._name_;
	        // 因为是内部使用,没做有参数类型检测,请确保类型正确
	        for (var k in options) {
	            if (typeof defaults[k] === 'undefined') {
	                defaults[k] = options[k];
	            } else {
	                repeat.push({
	                	moduleName: 'src/js/io/url/' + moduleName + '.js',
	                    name: k,
	                    url: defaults[k]
	                });
	            }
	        }
	    }
	};

	_extend(urls, passport, mall, group, order, ucenter);

	if (repeat.length) {
	    console.table(repeat);
	    throw new Error('io/url模块中注册了重名的ajax请求地址,请根据错误提示信息修改');
	}

	var get = function(name) {
	    var url = urls[name];
	    if (url && url.length) {
	        return url;
	    }
	    throw new Error('请在js/io/url.js中注册请求地址-->' + name);
	};

	module.exports = {
	    get: get
	};


/***/ },

/***/ 29:
/***/ function(module, exports) {

	/**
	 * 用户注册登录接口
	 */
	module.exports = {

		//注册页面接口
		getVerificationCode: '/regist/firststep', //发送验证码
		registSubmit: '/regist/secondstep', //校验+提交
		checkNickname: '/regist/identifynickname', //校验昵称
		checkRecommendationCode: '/regist/identifyreferralcode', //校验推荐码
		thirdstep: '/regist/thirdstep', //完善信息

		// 找回密码接口 
		postPhoneAndCode: '/forgetpwd/firstStep', // 第一步
		sendMsgCode: "/forgetpwd/sceondStep", //发送手机验证码
		postMsgCode: "/forgetpwd/thirdStep", //第二步
		postNewPwd: "/forgetpwd/fourthStep", //第三步

		//v2接口
		sendMsgCodeV2: '/forgetpwd/sendVerifitionCode',
		checkCode: '/forgetpwd/checkVerifycode',
		passwordReset: '/forgetpwd/passwordReset',

		//找回门店密码
		storePwd: '/shop/check',

		/*第三方登录-关联手机号*/
		snsSendCode: '/login/snsbindphonefirst',
		snsSubmitPhone: "/login/snsbindphonesecond",

		/*绑定手机号*/
		loginData: '/ajax/login/login',
		sendCode: 'bindphonefirst',
		loginErrorNum: '/login/errornum',
		bindPhone: '/login/bindphone',

		/*扫码登录*/
		getQrCode: '/ajax/login/getQrcodeInfo', //获取二维码
		abolishQrCode: '/ajax/login/delSsidInfo', //让二维码失效
		getSsidStatus: '/ajax/login/getSsidStatus', //检测扫码状态

		/*扫码登录*/
		ajaxGetQrCode: '/ajax/login/getQrcodeInfo', //获取二维码
		ajaxAbolishQrCode: '/ajax/login/delSsidInfo', //让二维码失效
		ajaxGetSsidStatus: '/ajax/login/getSsidStatus', //检测扫码状态

		/*绑定手机号*/
		ajaxLoginData: '/ajax/login/login',
		ajaxCaptcha: '/ajax/login/captcha',

		/*记录第三方页面重定向session*/
		ajaxThirdRedirect: '/ajax/login/redirect_state',
		/*登录完成获取其他用户信息*/
		ajaxGetCurrInfo:'/ajax/login/getCurrInfo'
	};

/***/ },

/***/ 30:
/***/ function(module, exports) {

	/**
	 * 商城相关接口
	 */
	module.exports = {

		shareGetGoodsKid: '/product/shareRebateId', // 分享到获取商品的kid

		//获取优惠券列表
		ticketList: '/product/coupons',
		//领取优惠券
		getTicket: '/ajax/user/getRedPacketV2',
		//店铺领取优惠券
		getShopTicket: '/ajax/user/getRedPacket',
		//商品详情页店内推荐
		shopChoose: '/product/shopRecom',
		//商品详情页商品推荐
		productChoose: '/product/prodRecom',
	};

/***/ },

/***/ 31:
/***/ function(module, exports) {

	/**
	 * 圈子社交相关接口
	 */
	module.exports = {
	    praise: '/ajax/group/praised', // 赞/取消赞
	    searchGroup: '/api/search_more', // 圈子搜索

	    groupFace: '/publiser/faces', // 圈子表情接口
	    groupPublishTopic: '/publiser/create', // 圈子发布话题

	    // 话题接口
	    topics: '/api/topic_more',
	    joinCircle: '/api/circle', // 加入圈子
	    createCircle: '/publiser/circle', //创建圈子
	    follow: '/publiser/add_follow', //加关注
	    unfollow: '/publiser/delete_follow', //取消关注
	    commentFirst: '/ajax/topic/first', //一级回复  一级评论
	    commentListUrl: '/api/reply_list',
	    secondtopic: '/ajax/topic/second',
	    getRelyList: '/api/second_reply_list',
	    //commentFirstV2: '/ajax/topic/first_v2', //一级回复v2  一级评论
	    //secondtopicV2: '/ajax/topic/second_v2', //
	    //commentListUrlV2: '/api/reply_list_v2',
	    //getRelyListV2: '/api/second_reply_list_v2',
	    detail_infos: '/topic/detail_infos',
	    selectGroup: '/publiser/select_group', // 选择圈子

	    commentFirstV2: '/ajax/topic/first_v2', //一级回复v2  一级评论
	    secondtopicV2: '/ajax/topic/second_v2', //
	    commentListUrlV2: '/api/reply_list_v2',
	    getRelyListV2: '/api/second_reply_list_v2',

	    //圈子列表
	    categories: '/api/categories', //分类集合
	    groupLists: '/api/group_lists', //列表信息
	    recommendCircle: '/api/recommend'
	};


/***/ },

/***/ 32:
/***/ function(module, exports) {

	/**
	 * 购物流程，生成订单相关接口
	 */
	module.exports = {

		// cartGetRedPacketList: '/ajax/car/getRedPacketList', // 购物车优惠券红包列表
		cartGetRedPacketList: '/ajax/coupons/shopCoupons', // 购物车优惠券红包列表V2
		// cartGetRedPacket: '/ajax/user/getRedPacket', // 购物车优惠券红包领取
		cartGetRedPacket: '/ajax/user/getRedPacketV2', // 购物车优惠券红包领取V2
		// cartUpdateGoods: '/ajax/car/update', // 购物车商品数量修改
		cartUpdateGoods: '/ajax/car/put', // 购物车商品数量修改v2
		// cartDelGoods: '/ajax/car/del', // 购物车删除商品
		cartDelGoods: '/ajax/car/del_v2', // 购物车删除商品v2
		cartOrderCheck: '/cart/orderdeliver', // 购物车结算检测
		cartFormSubmit: '/cart/checkout', // 购物车去结算地址

		cartGoodsCollect: '/cart/goodsCollect', // 购物车收藏的商品
		cartGoodsRecommend: '/cart/goodsRecom', // 购物车推荐的商品
		cartGoodsDetail: '/cart/goodsDetail', // 购物车添加收藏或推荐的商品详情

		unPayCancelOrder: '/order/mergerOrderCancel', //未付款取消订单
		payedCancelOrder: '/order/orderCancel', //已付款取消订单,待发货
		loadMoreOrder: '/Order/orderlist', // 加载更多订单接口
		confirmReceipt: '/order/confirm', // 确认收货
		delayReceipt: '/order/delayConfirm', // 延迟收货
		checkOrderPay: '/order/payCheck', // 检测订单支付是否可行
		showMyOrders: '/order/shineOrders', // 订单列表晒单接口

		subOrder: '/order/pay', //订单详情支付
		weixinPayStatus: '/order/checkPaySuccess', // 微信支付状态

		// 订单确认页面接口
		isAddrOk: '/cart/orderdeliver', // 当前地址是否可送达
		submitOrder: '/order/confirm', // 确认订单

	};

/***/ },

/***/ 33:
/***/ function(module, exports) {

	/**
	 * 用户中心相关接口
	 */
	module.exports = {

		//个人中心
		getJoinedCircle: '/group/sendgroupData', //我的圈子
		getTopic: '/topic/getTopicByAjax', //我发布的话题
		canCreate: '/group/check', //检测是否能创建新的圈子
		getRecommendGoods: '/index/sendOtherGoods', //换一组商品

		//uc-重置密码
		ucSendMsgCode: '/modpwd/sendPsw', //发送手机验证码
		subNewPwd: '/modpwd/checkPsw', //提交新密码
		//uc-设置个人信息
		checkName: '/ajax/user/identifynickname', //校验昵称
		subName: '/personal/modPersonalInfo',

		//达人申请
		getMasterTypeList: '/expert/expertCtgy', //初始化达人类型列表
		subMaster: '/expert/postExpert', //首次发送达人请求
		subMasterAgain: '/expert/putExpert', //再次发送达人请求

		getAddress: '/ajax/address/regionDivisionV2?parentId=', // 收货地址四级联动
		getRedList: '/shop/getRedPacketList', //详情页优惠券列表
		shopCollect: '/ajax/shop/collectShopV2', //收藏店铺
		unShopCollect: '/ajax/shop/uncollectShopV2', //取消收藏店铺
		addShopCar: '/ajax/car/add', //添加购物车
		getMoreDiscuss: '/product/getEvaluate', //获取更多评论
		getProduct: '/product/candeliver', //是否有货
		moreGoods: '/shop/moreList', //商铺详情获取更多数据
		productUnCollect: '/ajax/shop/uncollectProductV2', //取消商品收藏
		productCollect: '/ajax/shop/collectProductV2', //商品收藏
		getCollectItem: '/publiser/my_item_collect', //我收藏的商品
		getMoreItem: '/publiser/search_item', //圈子-获取更多商品
		searchTopics: '/search/topics_more', //获取话题列表

		//commentFirstV2: '/ajax/topic/first_v2', //一级回复v2  一级评论
		//secondtopicV2: '/ajax/topic/second_v2', //
		//commentListUrlV2: '/api/reply_list_v2',
		//getRelyListV2: '/api/second_reply_list_v2',

		// 话题收藏/取消收藏
		collectTopic: '/ajax/group/topcollect',
		//删除收藏商品/店铺/话题
		delCollectGoods: '/collect/delGoods',
		delCollectShop: '/collect/delShop',
		delCollectTopic: '/collect/delTopic',
		//收藏-获取更多商品/店铺/话题
		getCollectGoods: '/collect/moreGoods',
		getCollectShop: '/collect/moreShop',
		getCollectTopic: '/collect/moreTopic',
		//订单评价
		discussOrder: '/order/getCommentInfo',

		//退货换货
		getRefundInfo: '/order/getRefundInfo',
		// 收货地址
		addAddress: '/ajax/address/add', // 新增收货地址
		setDefaultAddr: '/ajax/address/setDefault', // 设置为默认收货地址
		editAddress: '/ajax/address/edit', // 修改收货地址
		delAddress: '/ajax/address/del', // 删除收货地址

		//售后服务
		afterServiceList: '/customerInfo/getBackData',
		logisticsList: '/customerInfo/getGoodsStreamInfo',
		sendGoods: '/customerInfo/sendGoods',
		buyCheckGoods: '/customerInfo/buyCheckGoods',
		//修改绑定手机号
		sendOldCode: '/bind/postVerifyCodeOld',
		checkOldCode: '/bind/checkVerifyCodeOld',
		sendNewCode: '/bind/postVerifyCodeNew',
		checkNewCode: '/bind/checkVerifyCodeNew',
		//意见反馈
		feedback: '/feed/info',
	};

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var qrTips = __webpack_require__(35);
	var alert = __webpack_require__(36);
	var loginCallback = __webpack_require__(37);
	function initQrCodeEvent(dom,opts,pa){
		//var loginForm = $('[data-node=userForm]');
		var loginForm = dom || $('[data-node=userForm]');
		//登录方式切换按钮
		var qrCodeBtn = loginForm.find('[data-action=qrCodeBtn]');
		var accLoginBtn = loginForm.find('[data-action=accLoginBtn]');
		//扫码页面
		var qrCodeBox = loginForm.find('[data-node=qrCodeBox]');
		var qrCodeImg = qrCodeBox.find('[data-node=qrCodeImg]');

		var qrCodeFailBox = qrCodeBox.find('[data-node=qrCodeFailBox]');
		var qrCodeTip = qrCodeBox.find('[data-node=qrCodeTip]');
		var refQrCode = qrCodeBox.find('[data-action=refQrCode]');
		//扫码待手机确认登录页面
		var qrCodeSucBox = loginForm.find('[data-node=qrCodeSucBox]');
		var backToQrCode = qrCodeSucBox.find('[data-action=backToQrCode]');

		var tips = qrTips.qrCodeTip;
		var checkTime = 3000;
		var ssid = '';
		var ssidStatus;
		var checkTimer;

		var handleState = function(status) { //自定义显示方法(与接口无关，只控制显示状态)
			if (status === 0) { //扫码登录框全部隐藏
				qrCodeBox.hide();
				qrCodeFailBox.hide();
				qrCodeSucBox.hide();
			} else if (status === 1) { //显示扫码
				qrCodeBox.show();
				qrCodeFailBox.hide();
				qrCodeSucBox.hide();
			} else if (status === 2) { //显示扫码和刷新按钮
				qrCodeBox.show();
				qrCodeFailBox.show();
				qrCodeSucBox.hide();
			} else if (status === 3) { //显示已扫码未登录
				qrCodeBox.hide();
				qrCodeFailBox.hide();
				qrCodeSucBox.show();
			}
		};

		//设置文案
		var setMsg = function(textTip, btnTip) {
			qrCodeTip.text(textTip);
			refQrCode.text(btnTip);
		};
		//获取二维码
		var getQrCode = function() {
			handleState(1);
			qrCodeImg.attr('src', '');
			return fetch.get(url.get('ajaxGetQrCode')).done(function(data) {
				if (data.success) {
					ssid = data.data.ssid;
					qrCodeImg.attr("src", data.data.genQrcode);
				} else {
					handleState(2);
					setMsg(tips.failGetTip, tips.failGetBtn);
				}
			}).fail(function() {
				handleState(2);
				setMsg(tips.failGetTip, tips.failGetBtn);
			});
		};
		//让二维码失效
		var abolishQrCode = function() {
			fetch.post(url.get('ajaxAbolishQrCode'), {
				data: {
					"ssid": ssid
				}
			}).done(function(data) {

			});
		};
		//监测扫描结果
		var monitorScan = function() {
			fetch.get(url.get('ajaxGetSsidStatus'), {
				data: {
					"ssid": ssid,
				},
				timeout: checkTime
			}).done(function(data) {
				var status = data.data.ssidStatus;
				ssidStatus = status;
				if (status === 0) {

				} else if (status === 1 || status === 3) {
					handleState(2);
					setMsg(tips.loseEffTip, tips.loseEffBtn);
					cancelTimer();
					console.log(checkTimer);
				} else if (status === 2) {
					handleState(3);
				} else if (status === 4) {
					cancelTimer();
					loginCallback.init(pa,opts);
				} else {
					alert('port change!');
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				cancelTimer();
			});
		};
		var initAccLogin = function() { //初始化账号登录
			qrCodeImg.attr("src", '');
			cancelTimer();
			handleState(0);
			if (ssidStatus !== 1 & ssidStatus !== 3) {
				abolishQrCode();
			}
		};
		var initQrCode = function() { //初始化扫码登录
			getQrCode().then(function() {
				startTimer(checkTime);
			});
		};
		var startTimer = function(delay) { //启动定时器
			cancelTimer();
			checkTimer = setInterval(monitorScan, delay);
		};
		var cancelTimer = function() {
			if (checkTimer) {
				clearInterval(checkTimer);
			}
		};
		var qrInit = function() {
			qrCodeBtn.on("click", initQrCode);
			refQrCode.on('click', initQrCode);
			backToQrCode.on('click', initQrCode);
			accLoginBtn.on("click", initAccLogin);
		};
		qrInit();
		
	}


	module.exports = {
	    init:initQrCodeEvent
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 35:
/***/ function(module, exports) {

	/**
	 * Created by dongyukuan on 2016/7/4.
	 */
	var inputTip = {
	    tel: {
	        ept: '请填写11位手机号',
	        err: '手机号格式错误',
	        errBack: '该手机号已被注册'
	    },
	    msgCode: {
	        tipGet: '请获取短信验证码',
	        tipEpt: '请输入短信验证码',
	        tipErr: '验证码是6位数字,请重新输入',
	        tipErrEdit: '验证码错误',
	        tipWrong: '验证码有误,请重新输入',
	        send: '验证码已发送，请注意查收',
	        tipSend: '验证码已发送您的手机，10分钟内输入有效',
	        tipDisabled: "验证码再次获取需间隔60s",
	        tipLimitEdit: '获取验证码超限，请稍后再试',
	        btnAfterSend: "秒后重新获取",
	        btnDefault: "获取验证码"
	    },
	    pwd: {
	        commonTip: '请输入6-20位英文字母,数字或符号'
	    },
	    pwdV: {
	        ept: '请再次输入密码',
	        err: '两次输入的密码不一致'
	    },
	    nickName: {
	        eptName: '请输入昵称！',
	        commonTip: '昵称只能输入2-20位字符、字母、数字、-、_',
	        existName: '此昵称太受欢迎了，已经有人抢了~',
	        sucSub: '资料修改成功！',
	        errLine: "网络超时!",
	        wrongName: '此昵称含有敏感词,请重新输入'
	    },
	    birthTip: {
	        tip: '生日不能重复设置'
	    },
	    refCode: {
	        err: '推荐码错误'
	    },
	    imgCode: {
	        ept: '请输入验证码'
	    },
	    login: {
	        errCode: '请输入验证码',
	        errNum: '请输入账号',
	        errPwd: '请输入密码'
	    },
	    createCircle: {
	        typeEmpty: '请选择圈子分类',
	        nameEmpty: '圈子名称不能为空',
	        upperLimit: '抱歉，您创建的圈子已经达到上限，暂不能创建！'
	    },
	    qrCodeTip: {
	        loseEffTip: '二维码已失效',
	        loseEffBtn: '点击刷新',
	        failGetTip: '二维码生成失败',
	        failGetBtn: '重新生成'
	    },
	    masterApply: {
	        nameLength: '姓名要2-20个字符',
	        nameType: '姓名仅限汉字和字母',
	        isIdCard: '请填写18位有效身份证号',
	        type: '请选择达人类别',
	        summary: '请输入自我介绍，2-100个字符',
	    },
	    upload:{
	        noUpload: '请上传图片',
	        uploadError: '请上传小于4M的图片，支持格式jpg、jpeg、png！',
	        uploadFaild: '上传失败,请重新上传',
	        Q_EXCEED_NUM_LIMIT: '请上传小于4M的图片，支持格式jpg、jpeg、png！',
	        Q_EXCEED_SIZE_LIMIT: '总文件大小超出限制',
	        Q_TYPE_DENIED: '文件类型错误',
	        F_EXCEED_SIZE: '请上传jpg、png格式且小于4M的图片！',
	        excess: '文件个数超出限制'
	    },
	    errLine: {
	        tip: '网络错误,请稍后再试！'
	    }
	};
	module.exports = inputTip;

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var Dialog = __webpack_require__(22);
	var noop = function() {};

	var create = function(content, options) {
	    content = content || '';
	    options = options || {};
	    var defaults = {
	        fixed: true,
	        modal: true,
	        autofocus: false,
	        content: '<p class="del-pop-p">' + content + '</p>',
	        className: 'pop-box',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        ok: noop
	    };
	    $.extend(true, defaults, options);
	    var d = Dialog(defaults);

	    var header = d._$('header');
	    var title = d._$('title');
	    title.css('borderBottom', 'none');
	    header.show();

	    d.show();
	    return d;
	};

	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {/*   主要用户联合登录的后续操作 第三方和扫码通用 坑爹 >_< !!  */

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var onLoginContent = __webpack_require__(38);

	var iDomain = $_CONFIG.i_domain;
	var passDomain = $_CONFIG.passport_domain;
	var popLayer = '',
	    opts = {};


	function loginCallback() {
	    $_CONFIG.islogin = "1";    
	    removePop(popLayer);
	    var onLogin = opts.onLogin;
	    if (onLogin) { 
	        if(opts.refresh === true) {
	            opts.async = false;
	            onLogin(opts);
	            setTimeout(function(){
	                 window.location.href = window.location;
	            },10)
	           
	        }else{
	            onLogin(opts.data);
	        }
	    } else{
	         window.location.href = window.location;
	    }
	}

	function init(pa,options){
	   $_CONFIG.islogin = "1";
	   popLayer = pa;
	   opts = options;
	   getUnioInfo();
	}

	//信息复合接口
	function getUnioInfo() {
	    fetch.post(url.get('ajaxGetCurrInfo'))
	    .done(function(data) {
	        onLoginInfo(data);
	    }).always(function() {
	        firing = false;
	    }).fail(function(jqXHR, textStatus, errorThrown) {
	        setTimeout(function() {
	            window.location.href = window.location;
	        }, 1000)
	        return false;
	    });
	}

	//登录成功修改信息
	function onLoginInfo(json) {

	    if (json.success !== true) { //这个时候已经成功登陆，防止页面停滞
	        setTimeout(function() {
	            window.location.href = window.location;
	        }, 1000)
	        return false;
	    };
	    renderHeaderDom(json);
	    renderFixTools(json);
	    loginCallback();
	}

	//头部信息  18701593012
	function renderHeaderDom(json) {
	    var isExpert = json.data.isExpert,
	    str = {
	        iDomain: iDomain,
	        passDomain: passDomain,
	        isExpert: isExpert,
	        daren: isExpert ? '达人特权' : '达人申请'
	    }
	    $('[data-node=indexRegist]').remove();
		if(!$('.index-login').length){					//同步两个窗口头部数据,防止重叠
			 $('.menu .nav').after(onLoginContent(str)); //写入模板 准备填充数据
		}
	    var $message = $('[data-action=codeDialog]').find('span'),
	    $buycar = $('[data-node=buycar]'),
	    $headName = $('[data-node=headName]'),
	    $headImg = $('[data-node=headImg]');

	    var userData = json.data,
	    carNum = userData.carProdNum;

	    carNum = carNum > 99 ? '99+' : carNum;
	    $message.text(userData.messCount); //短消息
	    $buycar.text(carNum); //购物车数量
	    $_CONFIG.cartProdNumReal = userData.carProdNum;
	    $headName.text(userData.nickName) //昵称
	    $headImg.attr('src', userData.imagePath); //头像
	}

	//侧边栏
	function renderFixTools(json) {
	    var $addCarElement = $('[data-node="bannerShopCar"]').find('span'),
	    userData = json.data,
	    carNum = userData.carProdNum;

	    carNum = carNum > 99 ? '99+' : carNum;
	    $addCarElement.text(carNum); //侧边栏购物车
	}



	//登录完成 移除弹窗
	function removePop(obj) {
	    obj.__popup.remove();
	    obj.__backdrop.remove();
	    obj.__mask.remove();
	}

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/login/onLogin',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,iDomain=$data.iDomain,isExpert=$data.isExpert,daren=$data.daren,passDomain=$data.passDomain,$out='';$out+='<div class="index-login" data-node="index-login"> <a href=';
	$out+=$escape(iDomain);
	$out+='index class="name-color"> <div class="index-login-head"> ';
	if(isExpert === true ){
	$out+=' <em class="icon-daren"></em> ';
	}
	$out+=' <img src="" data-node="headImg"/> </div> <span data-node="headName"></span> </a> <div class="login-link"> <div class="sanjiao"></div> <a href=';
	$out+=$escape(iDomain);
	$out+='order target="_blank">我的订单</a> <a href=';
	$out+=$escape(iDomain);
	$out+='topic target="_blank">我的话题</a> <a href=';
	$out+=$escape(iDomain);
	$out+='expert target="_blank">';
	$out+=$escape(daren);
	$out+='</a> <a href=';
	$out+=$escape(iDomain);
	$out+='group target="_blank">我的圈子</a> <a href=';
	$out+=$escape(iDomain);
	$out+='collect target="_blank">我的收藏</a> <a href=';
	$out+=$escape(iDomain);
	$out+='address target="_blank">收货地址</a> <a href=';
	$out+=$escape(iDomain);
	$out+='customerInfo target="_blank">我的售后</a> <a href=';
	$out+=$escape(iDomain);
	$out+='coupon target="_blank">我的优惠券</a> <a href=';
	$out+=$escape(passDomain);
	$out+='login/logout data-node="">退出</a> </div> </div>';
	return new String($out);
	});

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	/*
		介绍：基于utils/jsencrypt.js的加密方法（rsa加密）
		用法：
			1、var encrypt = require('module/encrypt');
			2、var encryptStr = encrypt(str);
			注:encryptStr即为加密之后的str
	*/

	var JSEncrypt = __webpack_require__(40);
	var publicKey = '-----BEGIN PUBLIC KEY-----';
	publicKey += 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBrBCRrxZQruu7KWd21Qjova/J';
	publicKey += 'rBEfyLhjSmZeCBPn8GfT5sj5yFrJuHK/IIncRtiRN2mNZnhWMnEqjv3k93TmUcKy';
	publicKey += 'MMRp4COEzqgdSguVf+szQ9KbvCJwvoGhghaAPJjhmiAe8LrleH4p6aAal3bzEUna';
	publicKey += '2UvbhYzaqbpNLHMYowIDAQAB';
	publicKey += '-----END PUBLIC KEY-----';
	var encryptFn = function(str) {
		var encrypt = new JSEncrypt();
		encrypt.setPublicKey(publicKey);
		return str ? encrypt.encrypt(str) : '';
	};
	module.exports = encryptFn;

/***/ },

/***/ 40:
/***/ function(module, exports) {

	//加密组件

	var JSEncryptExports = {};
	(function(exports) {
		function BigInteger(a, b, c) {
			null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
		}

		function nbi() {
			return new BigInteger(null)
		}

		function am1(a, b, c, d, e, f) {
			for (; --f >= 0;) {
				var g = b * this[a++] + c[d] + e;
				e = Math.floor(g / 67108864), c[d++] = 67108863 & g
			}
			return e
		}

		function am2(a, b, c, d, e, f) {
			for (var g = 32767 & b, h = b >> 15; --f >= 0;) {
				var i = 32767 & this[a],
					j = this[a++] >> 15,
					k = h * i + j * g;
				i = g * i + ((32767 & k) << 15) + c[d] + (1073741823 & e), e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30), c[d++] = 1073741823 & i
			}
			return e
		}

		function am3(a, b, c, d, e, f) {
			for (var g = 16383 & b, h = b >> 14; --f >= 0;) {
				var i = 16383 & this[a],
					j = this[a++] >> 14,
					k = h * i + j * g;
				i = g * i + ((16383 & k) << 14) + c[d] + e, e = (i >> 28) + (k >> 14) + h * j, c[d++] = 268435455 & i
			}
			return e
		}

		function int2char(a) {
			return BI_RM.charAt(a)
		}

		function intAt(a, b) {
			var c = BI_RC[a.charCodeAt(b)];
			return null == c ? -1 : c
		}

		function bnpCopyTo(a) {
			for (var b = this.t - 1; b >= 0; --b) a[b] = this[b];
			a.t = this.t, a.s = this.s
		}

		function bnpFromInt(a) {
			this.t = 1, this.s = 0 > a ? -1 : 0, a > 0 ? this[0] = a : -1 > a ? this[0] = a + DV : this.t = 0
		}

		function nbv(a) {
			var b = nbi();
			return b.fromInt(a), b
		}

		function bnpFromString(a, b) {
			var c;
			if (16 == b) c = 4;
			else if (8 == b) c = 3;
			else if (256 == b) c = 8;
			else if (2 == b) c = 1;
			else if (32 == b) c = 5;
			else {
				if (4 != b) return void this.fromRadix(a, b);
				c = 2
			}
			this.t = 0, this.s = 0;
			for (var d = a.length, e = !1, f = 0; --d >= 0;) {
				var g = 8 == c ? 255 & a[d] : intAt(a, d);
				0 > g ? "-" == a.charAt(d) && (e = !0) : (e = !1, 0 == f ? this[this.t++] = g : f + c > this.DB ? (this[this.t - 1] |= (g & (1 << this.DB - f) - 1) << f, this[this.t++] = g >> this.DB - f) : this[this.t - 1] |= g << f, f += c, f >= this.DB && (f -= this.DB))
			}
			8 == c && 0 != (128 & a[0]) && (this.s = -1, f > 0 && (this[this.t - 1] |= (1 << this.DB - f) - 1 << f)), this.clamp(), e && BigInteger.ZERO.subTo(this, this)
		}

		function bnpClamp() {
			for (var a = this.s & this.DM; this.t > 0 && this[this.t - 1] == a;) --this.t
		}

		function bnToString(a) {
			if (this.s < 0) return "-" + this.negate().toString(a);
			var b;
			if (16 == a) b = 4;
			else if (8 == a) b = 3;
			else if (2 == a) b = 1;
			else if (32 == a) b = 5;
			else {
				if (4 != a) return this.toRadix(a);
				b = 2
			}
			var c, d = (1 << b) - 1,
				e = !1,
				f = "",
				g = this.t,
				h = this.DB - g * this.DB % b;
			if (g-- > 0)
				for (h < this.DB && (c = this[g] >> h) > 0 && (e = !0, f = int2char(c)); g >= 0;) b > h ? (c = (this[g] & (1 << h) - 1) << b - h, c |= this[--g] >> (h += this.DB - b)) : (c = this[g] >> (h -= b) & d, 0 >= h && (h += this.DB, --g)), c > 0 && (e = !0), e && (f += int2char(c));
			return e ? f : "0"
		}

		function bnNegate() {
			var a = nbi();
			return BigInteger.ZERO.subTo(this, a), a
		}

		function bnAbs() {
			return this.s < 0 ? this.negate() : this
		}

		function bnCompareTo(a) {
			var b = this.s - a.s;
			if (0 != b) return b;
			var c = this.t;
			if (b = c - a.t, 0 != b) return this.s < 0 ? -b : b;
			for (; --c >= 0;)
				if (0 != (b = this[c] - a[c])) return b;
			return 0
		}

		function nbits(a) {
			var b, c = 1;
			return 0 != (b = a >>> 16) && (a = b, c += 16), 0 != (b = a >> 8) && (a = b, c += 8), 0 != (b = a >> 4) && (a = b, c += 4), 0 != (b = a >> 2) && (a = b, c += 2), 0 != (b = a >> 1) && (a = b, c += 1), c
		}

		function bnBitLength() {
			return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
		}

		function bnpDLShiftTo(a, b) {
			var c;
			for (c = this.t - 1; c >= 0; --c) b[c + a] = this[c];
			for (c = a - 1; c >= 0; --c) b[c] = 0;
			b.t = this.t + a, b.s = this.s
		}

		function bnpDRShiftTo(a, b) {
			for (var c = a; c < this.t; ++c) b[c - a] = this[c];
			b.t = Math.max(this.t - a, 0), b.s = this.s
		}

		function bnpLShiftTo(a, b) {
			var c, d = a % this.DB,
				e = this.DB - d,
				f = (1 << e) - 1,
				g = Math.floor(a / this.DB),
				h = this.s << d & this.DM;
			for (c = this.t - 1; c >= 0; --c) b[c + g + 1] = this[c] >> e | h, h = (this[c] & f) << d;
			for (c = g - 1; c >= 0; --c) b[c] = 0;
			b[g] = h, b.t = this.t + g + 1, b.s = this.s, b.clamp()
		}

		function bnpRShiftTo(a, b) {
			b.s = this.s;
			var c = Math.floor(a / this.DB);
			if (c >= this.t) return void(b.t = 0);
			var d = a % this.DB,
				e = this.DB - d,
				f = (1 << d) - 1;
			b[0] = this[c] >> d;
			for (var g = c + 1; g < this.t; ++g) b[g - c - 1] |= (this[g] & f) << e, b[g - c] = this[g] >> d;
			d > 0 && (b[this.t - c - 1] |= (this.s & f) << e), b.t = this.t - c, b.clamp()
		}

		function bnpSubTo(a, b) {
			for (var c = 0, d = 0, e = Math.min(a.t, this.t); e > c;) d += this[c] - a[c], b[c++] = d & this.DM, d >>= this.DB;
			if (a.t < this.t) {
				for (d -= a.s; c < this.t;) d += this[c], b[c++] = d & this.DM, d >>= this.DB;
				d += this.s
			} else {
				for (d += this.s; c < a.t;) d -= a[c], b[c++] = d & this.DM, d >>= this.DB;
				d -= a.s
			}
			b.s = 0 > d ? -1 : 0, -1 > d ? b[c++] = this.DV + d : d > 0 && (b[c++] = d), b.t = c, b.clamp()
		}

		function bnpMultiplyTo(a, b) {
			var c = this.abs(),
				d = a.abs(),
				e = c.t;
			for (b.t = e + d.t; --e >= 0;) b[e] = 0;
			for (e = 0; e < d.t; ++e) b[e + c.t] = c.am(0, d[e], b, e, 0, c.t);
			b.s = 0, b.clamp(), this.s != a.s && BigInteger.ZERO.subTo(b, b)
		}

		function bnpSquareTo(a) {
			for (var b = this.abs(), c = a.t = 2 * b.t; --c >= 0;) a[c] = 0;
			for (c = 0; c < b.t - 1; ++c) {
				var d = b.am(c, b[c], a, 2 * c, 0, 1);
				(a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV, a[c + b.t + 1] = 1)
			}
			a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1)), a.s = 0, a.clamp()
		}

		function bnpDivRemTo(a, b, c) {
			var d = a.abs();
			if (!(d.t <= 0)) {
				var e = this.abs();
				if (e.t < d.t) return null != b && b.fromInt(0), void(null != c && this.copyTo(c));
				null == c && (c = nbi());
				var f = nbi(),
					g = this.s,
					h = a.s,
					i = this.DB - nbits(d[d.t - 1]);
				i > 0 ? (d.lShiftTo(i, f), e.lShiftTo(i, c)) : (d.copyTo(f), e.copyTo(c));
				var j = f.t,
					k = f[j - 1];
				if (0 != k) {
					var l = k * (1 << this.F1) + (j > 1 ? f[j - 2] >> this.F2 : 0),
						m = this.FV / l,
						n = (1 << this.F1) / l,
						o = 1 << this.F2,
						p = c.t,
						q = p - j,
						r = null == b ? nbi() : b;
					for (f.dlShiftTo(q, r), c.compareTo(r) >= 0 && (c[c.t++] = 1, c.subTo(r, c)), BigInteger.ONE.dlShiftTo(j, r), r.subTo(f, f); f.t < j;) f[f.t++] = 0;
					for (; --q >= 0;) {
						var s = c[--p] == k ? this.DM : Math.floor(c[p] * m + (c[p - 1] + o) * n);
						if ((c[p] += f.am(0, s, c, q, 0, j)) < s)
							for (f.dlShiftTo(q, r), c.subTo(r, c); c[p] < --s;) c.subTo(r, c)
					}
					null != b && (c.drShiftTo(j, b), g != h && BigInteger.ZERO.subTo(b, b)), c.t = j, c.clamp(), i > 0 && c.rShiftTo(i, c), 0 > g && BigInteger.ZERO.subTo(c, c)
				}
			}
		}

		function bnMod(a) {
			var b = nbi();
			return this.abs().divRemTo(a, null, b), this.s < 0 && b.compareTo(BigInteger.ZERO) > 0 && a.subTo(b, b), b
		}

		function Classic(a) {
			this.m = a
		}

		function cConvert(a) {
			return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
		}

		function cRevert(a) {
			return a
		}

		function cReduce(a) {
			a.divRemTo(this.m, null, a)
		}

		function cMulTo(a, b, c) {
			a.multiplyTo(b, c), this.reduce(c)
		}

		function cSqrTo(a, b) {
			a.squareTo(b), this.reduce(b)
		}

		function bnpInvDigit() {
			if (this.t < 1) return 0;
			var a = this[0];
			if (0 == (1 & a)) return 0;
			var b = 3 & a;
			return b = b * (2 - (15 & a) * b) & 15, b = b * (2 - (255 & a) * b) & 255, b = b * (2 - ((65535 & a) * b & 65535)) & 65535, b = b * (2 - a * b % this.DV) % this.DV, b > 0 ? this.DV - b : -b
		}

		function Montgomery(a) {
			this.m = a, this.mp = a.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << a.DB - 15) - 1, this.mt2 = 2 * a.t
		}

		function montConvert(a) {
			var b = nbi();
			return a.abs().dlShiftTo(this.m.t, b), b.divRemTo(this.m, null, b), a.s < 0 && b.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(b, b), b
		}

		function montRevert(a) {
			var b = nbi();
			return a.copyTo(b), this.reduce(b), b
		}

		function montReduce(a) {
			for (; a.t <= this.mt2;) a[a.t++] = 0;
			for (var b = 0; b < this.m.t; ++b) {
				var c = 32767 & a[b],
					d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
				for (c = b + this.m.t, a[c] += this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV;) a[c] -= a.DV, a[++c]++
			}
			a.clamp(), a.drShiftTo(this.m.t, a), a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
		}

		function montSqrTo(a, b) {
			a.squareTo(b), this.reduce(b)
		}

		function montMulTo(a, b, c) {
			a.multiplyTo(b, c), this.reduce(c)
		}

		function bnpIsEven() {
			return 0 == (this.t > 0 ? 1 & this[0] : this.s)
		}

		function bnpExp(a, b) {
			if (a > 4294967295 || 1 > a) return BigInteger.ONE;
			var c = nbi(),
				d = nbi(),
				e = b.convert(this),
				f = nbits(a) - 1;
			for (e.copyTo(c); --f >= 0;)
				if (b.sqrTo(c, d), (a & 1 << f) > 0) b.mulTo(d, e, c);
				else {
					var g = c;
					c = d, d = g
				}
			return b.revert(c)
		}

		function bnModPowInt(a, b) {
			var c;
			return c = 256 > a || b.isEven() ? new Classic(b) : new Montgomery(b), this.exp(a, c)
		}

		function bnClone() {
			var a = nbi();
			return this.copyTo(a), a
		}

		function bnIntValue() {
			if (this.s < 0) {
				if (1 == this.t) return this[0] - this.DV;
				if (0 == this.t) return -1
			} else {
				if (1 == this.t) return this[0];
				if (0 == this.t) return 0
			}
			return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
		}

		function bnByteValue() {
			return 0 == this.t ? this.s : this[0] << 24 >> 24
		}

		function bnShortValue() {
			return 0 == this.t ? this.s : this[0] << 16 >> 16
		}

		function bnpChunkSize(a) {
			return Math.floor(Math.LN2 * this.DB / Math.log(a))
		}

		function bnSigNum() {
			return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
		}

		function bnpToRadix(a) {
			if (null == a && (a = 10), 0 == this.signum() || 2 > a || a > 36) return "0";
			var b = this.chunkSize(a),
				c = Math.pow(a, b),
				d = nbv(c),
				e = nbi(),
				f = nbi(),
				g = "";
			for (this.divRemTo(d, e, f); e.signum() > 0;) g = (c + f.intValue()).toString(a).substr(1) + g, e.divRemTo(d, e, f);
			return f.intValue().toString(a) + g
		}

		function bnpFromRadix(a, b) {
			this.fromInt(0), null == b && (b = 10);
			for (var c = this.chunkSize(b), d = Math.pow(b, c), e = !1, f = 0, g = 0, h = 0; h < a.length; ++h) {
				var i = intAt(a, h);
				0 > i ? "-" == a.charAt(h) && 0 == this.signum() && (e = !0) : (g = b * g + i, ++f >= c && (this.dMultiply(d), this.dAddOffset(g, 0), f = 0, g = 0))
			}
			f > 0 && (this.dMultiply(Math.pow(b, f)), this.dAddOffset(g, 0)), e && BigInteger.ZERO.subTo(this, this)
		}

		function bnpFromNumber(a, b, c) {
			if ("number" == typeof b)
				if (2 > a) this.fromInt(1);
				else
					for (this.fromNumber(a, c), this.testBit(a - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(b);) this.dAddOffset(2, 0), this.bitLength() > a && this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
			else {
				var d = new Array,
					e = 7 & a;
				d.length = (a >> 3) + 1, b.nextBytes(d), e > 0 ? d[0] &= (1 << e) - 1 : d[0] = 0, this.fromString(d, 256)
			}
		}

		function bnToByteArray() {
			var a = this.t,
				b = new Array;
			b[0] = this.s;
			var c, d = this.DB - a * this.DB % 8,
				e = 0;
			if (a-- > 0)
				for (d < this.DB && (c = this[a] >> d) != (this.s & this.DM) >> d && (b[e++] = c | this.s << this.DB - d); a >= 0;) 8 > d ? (c = (this[a] & (1 << d) - 1) << 8 - d, c |= this[--a] >> (d += this.DB - 8)) : (c = this[a] >> (d -= 8) & 255, 0 >= d && (d += this.DB, --a)), 0 != (128 & c) && (c |= -256), 0 == e && (128 & this.s) != (128 & c) && ++e, (e > 0 || c != this.s) && (b[e++] = c);
			return b
		}

		function bnEquals(a) {
			return 0 == this.compareTo(a)
		}

		function bnMin(a) {
			return this.compareTo(a) < 0 ? this : a
		}

		function bnMax(a) {
			return this.compareTo(a) > 0 ? this : a
		}

		function bnpBitwiseTo(a, b, c) {
			var d, e, f = Math.min(a.t, this.t);
			for (d = 0; f > d; ++d) c[d] = b(this[d], a[d]);
			if (a.t < this.t) {
				for (e = a.s & this.DM, d = f; d < this.t; ++d) c[d] = b(this[d], e);
				c.t = this.t
			} else {
				for (e = this.s & this.DM, d = f; d < a.t; ++d) c[d] = b(e, a[d]);
				c.t = a.t
			}
			c.s = b(this.s, a.s), c.clamp()
		}

		function op_and(a, b) {
			return a & b
		}

		function bnAnd(a) {
			var b = nbi();
			return this.bitwiseTo(a, op_and, b), b
		}

		function op_or(a, b) {
			return a | b
		}

		function bnOr(a) {
			var b = nbi();
			return this.bitwiseTo(a, op_or, b), b
		}

		function op_xor(a, b) {
			return a ^ b
		}

		function bnXor(a) {
			var b = nbi();
			return this.bitwiseTo(a, op_xor, b), b
		}

		function op_andnot(a, b) {
			return a & ~b
		}

		function bnAndNot(a) {
			var b = nbi();
			return this.bitwiseTo(a, op_andnot, b), b
		}

		function bnNot() {
			for (var a = nbi(), b = 0; b < this.t; ++b) a[b] = this.DM & ~this[b];
			return a.t = this.t, a.s = ~this.s, a
		}

		function bnShiftLeft(a) {
			var b = nbi();
			return 0 > a ? this.rShiftTo(-a, b) : this.lShiftTo(a, b), b
		}

		function bnShiftRight(a) {
			var b = nbi();
			return 0 > a ? this.lShiftTo(-a, b) : this.rShiftTo(a, b), b
		}

		function lbit(a) {
			if (0 == a) return -1;
			var b = 0;
			return 0 == (65535 & a) && (a >>= 16, b += 16), 0 == (255 & a) && (a >>= 8, b += 8), 0 == (15 & a) && (a >>= 4, b += 4), 0 == (3 & a) && (a >>= 2, b += 2), 0 == (1 & a) && ++b, b
		}

		function bnGetLowestSetBit() {
			for (var a = 0; a < this.t; ++a)
				if (0 != this[a]) return a * this.DB + lbit(this[a]);
			return this.s < 0 ? this.t * this.DB : -1
		}

		function cbit(a) {
			for (var b = 0; 0 != a;) a &= a - 1, ++b;
			return b
		}

		function bnBitCount() {
			for (var a = 0, b = this.s & this.DM, c = 0; c < this.t; ++c) a += cbit(this[c] ^ b);
			return a
		}

		function bnTestBit(a) {
			var b = Math.floor(a / this.DB);
			return b >= this.t ? 0 != this.s : 0 != (this[b] & 1 << a % this.DB)
		}

		function bnpChangeBit(a, b) {
			var c = BigInteger.ONE.shiftLeft(a);
			return this.bitwiseTo(c, b, c), c
		}

		function bnSetBit(a) {
			return this.changeBit(a, op_or)
		}

		function bnClearBit(a) {
			return this.changeBit(a, op_andnot)
		}

		function bnFlipBit(a) {
			return this.changeBit(a, op_xor)
		}

		function bnpAddTo(a, b) {
			for (var c = 0, d = 0, e = Math.min(a.t, this.t); e > c;) d += this[c] + a[c], b[c++] = d & this.DM, d >>= this.DB;
			if (a.t < this.t) {
				for (d += a.s; c < this.t;) d += this[c], b[c++] = d & this.DM, d >>= this.DB;
				d += this.s
			} else {
				for (d += this.s; c < a.t;) d += a[c], b[c++] = d & this.DM, d >>= this.DB;
				d += a.s
			}
			b.s = 0 > d ? -1 : 0, d > 0 ? b[c++] = d : -1 > d && (b[c++] = this.DV + d), b.t = c, b.clamp()
		}

		function bnAdd(a) {
			var b = nbi();
			return this.addTo(a, b), b
		}

		function bnSubtract(a) {
			var b = nbi();
			return this.subTo(a, b), b
		}

		function bnMultiply(a) {
			var b = nbi();
			return this.multiplyTo(a, b), b
		}

		function bnSquare() {
			var a = nbi();
			return this.squareTo(a), a
		}

		function bnDivide(a) {
			var b = nbi();
			return this.divRemTo(a, b, null), b
		}

		function bnRemainder(a) {
			var b = nbi();
			return this.divRemTo(a, null, b), b
		}

		function bnDivideAndRemainder(a) {
			var b = nbi(),
				c = nbi();
			return this.divRemTo(a, b, c), new Array(b, c)
		}

		function bnpDMultiply(a) {
			this[this.t] = this.am(0, a - 1, this, 0, 0, this.t), ++this.t, this.clamp()
		}

		function bnpDAddOffset(a, b) {
			if (0 != a) {
				for (; this.t <= b;) this[this.t++] = 0;
				for (this[b] += a; this[b] >= this.DV;) this[b] -= this.DV, ++b >= this.t && (this[this.t++] = 0), ++this[b]
			}
		}

		function NullExp() {}

		function nNop(a) {
			return a
		}

		function nMulTo(a, b, c) {
			a.multiplyTo(b, c)
		}

		function nSqrTo(a, b) {
			a.squareTo(b)
		}

		function bnPow(a) {
			return this.exp(a, new NullExp)
		}

		function bnpMultiplyLowerTo(a, b, c) {
			var d = Math.min(this.t + a.t, b);
			for (c.s = 0, c.t = d; d > 0;) c[--d] = 0;
			var e;
			for (e = c.t - this.t; e > d; ++d) c[d + this.t] = this.am(0, a[d], c, d, 0, this.t);
			for (e = Math.min(a.t, b); e > d; ++d) this.am(0, a[d], c, d, 0, b - d);
			c.clamp()
		}

		function bnpMultiplyUpperTo(a, b, c) {
			--b;
			var d = c.t = this.t + a.t - b;
			for (c.s = 0; --d >= 0;) c[d] = 0;
			for (d = Math.max(b - this.t, 0); d < a.t; ++d) c[this.t + d - b] = this.am(b - d, a[d], c, 0, 0, this.t + d - b);
			c.clamp(), c.drShiftTo(1, c)
		}

		function Barrett(a) {
			this.r2 = nbi(), this.q3 = nbi(), BigInteger.ONE.dlShiftTo(2 * a.t, this.r2), this.mu = this.r2.divide(a), this.m = a
		}

		function barrettConvert(a) {
			if (a.s < 0 || a.t > 2 * this.m.t) return a.mod(this.m);
			if (a.compareTo(this.m) < 0) return a;
			var b = nbi();
			return a.copyTo(b), this.reduce(b), b
		}

		function barrettRevert(a) {
			return a
		}

		function barrettReduce(a) {
			for (a.drShiftTo(this.m.t - 1, this.r2), a.t > this.m.t + 1 && (a.t = this.m.t + 1, a.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); a.compareTo(this.r2) < 0;) a.dAddOffset(1, this.m.t + 1);
			for (a.subTo(this.r2, a); a.compareTo(this.m) >= 0;) a.subTo(this.m, a)
		}

		function barrettSqrTo(a, b) {
			a.squareTo(b), this.reduce(b)
		}

		function barrettMulTo(a, b, c) {
			a.multiplyTo(b, c), this.reduce(c)
		}

		function bnModPow(a, b) {
			var c, d, e = a.bitLength(),
				f = nbv(1);
			if (0 >= e) return f;
			c = 18 > e ? 1 : 48 > e ? 3 : 144 > e ? 4 : 768 > e ? 5 : 6, d = 8 > e ? new Classic(b) : b.isEven() ? new Barrett(b) : new Montgomery(b);
			var g = new Array,
				h = 3,
				i = c - 1,
				j = (1 << c) - 1;
			if (g[1] = d.convert(this), c > 1) {
				var k = nbi();
				for (d.sqrTo(g[1], k); j >= h;) g[h] = nbi(), d.mulTo(k, g[h - 2], g[h]), h += 2
			}
			var l, m, n = a.t - 1,
				o = !0,
				p = nbi();
			for (e = nbits(a[n]) - 1; n >= 0;) {
				for (e >= i ? l = a[n] >> e - i & j : (l = (a[n] & (1 << e + 1) - 1) << i - e, n > 0 && (l |= a[n - 1] >> this.DB + e - i)), h = c; 0 == (1 & l);) l >>= 1, --h;
				if ((e -= h) < 0 && (e += this.DB, --n), o) g[l].copyTo(f), o = !1;
				else {
					for (; h > 1;) d.sqrTo(f, p), d.sqrTo(p, f), h -= 2;
					h > 0 ? d.sqrTo(f, p) : (m = f, f = p, p = m), d.mulTo(p, g[l], f)
				}
				for (; n >= 0 && 0 == (a[n] & 1 << e);) d.sqrTo(f, p), m = f, f = p, p = m, --e < 0 && (e = this.DB - 1, --n)
			}
			return d.revert(f)
		}

		function bnGCD(a) {
			var b = this.s < 0 ? this.negate() : this.clone(),
				c = a.s < 0 ? a.negate() : a.clone();
			if (b.compareTo(c) < 0) {
				var d = b;
				b = c, c = d
			}
			var e = b.getLowestSetBit(),
				f = c.getLowestSetBit();
			if (0 > f) return b;
			for (f > e && (f = e), f > 0 && (b.rShiftTo(f, b), c.rShiftTo(f, c)); b.signum() > 0;)(e = b.getLowestSetBit()) > 0 && b.rShiftTo(e, b), (e = c.getLowestSetBit()) > 0 && c.rShiftTo(e, c), b.compareTo(c) >= 0 ? (b.subTo(c, b), b.rShiftTo(1, b)) : (c.subTo(b, c), c.rShiftTo(1, c));
			return f > 0 && c.lShiftTo(f, c), c
		}

		function bnpModInt(a) {
			if (0 >= a) return 0;
			var b = this.DV % a,
				c = this.s < 0 ? a - 1 : 0;
			if (this.t > 0)
				if (0 == b) c = this[0] % a;
				else
					for (var d = this.t - 1; d >= 0; --d) c = (b * c + this[d]) % a;
			return c
		}

		function bnModInverse(a) {
			var b = a.isEven();
			if (this.isEven() && b || 0 == a.signum()) return BigInteger.ZERO;
			for (var c = a.clone(), d = this.clone(), e = nbv(1), f = nbv(0), g = nbv(0), h = nbv(1); 0 != c.signum();) {
				for (; c.isEven();) c.rShiftTo(1, c), b ? (e.isEven() && f.isEven() || (e.addTo(this, e), f.subTo(a, f)), e.rShiftTo(1, e)) : f.isEven() || f.subTo(a, f), f.rShiftTo(1, f);
				for (; d.isEven();) d.rShiftTo(1, d), b ? (g.isEven() && h.isEven() || (g.addTo(this, g), h.subTo(a, h)), g.rShiftTo(1, g)) : h.isEven() || h.subTo(a, h), h.rShiftTo(1, h);
				c.compareTo(d) >= 0 ? (c.subTo(d, c), b && e.subTo(g, e), f.subTo(h, f)) : (d.subTo(c, d), b && g.subTo(e, g), h.subTo(f, h))
			}
			return 0 != d.compareTo(BigInteger.ONE) ? BigInteger.ZERO : h.compareTo(a) >= 0 ? h.subtract(a) : h.signum() < 0 ? (h.addTo(a, h), h.signum() < 0 ? h.add(a) : h) : h
		}

		function bnIsProbablePrime(a) {
			var b, c = this.abs();
			if (1 == c.t && c[0] <= lowprimes[lowprimes.length - 1]) {
				for (b = 0; b < lowprimes.length; ++b)
					if (c[0] == lowprimes[b]) return !0;
				return !1
			}
			if (c.isEven()) return !1;
			for (b = 1; b < lowprimes.length;) {
				for (var d = lowprimes[b], e = b + 1; e < lowprimes.length && lplim > d;) d *= lowprimes[e++];
				for (d = c.modInt(d); e > b;)
					if (d % lowprimes[b++] == 0) return !1
			}
			return c.millerRabin(a)
		}

		function bnpMillerRabin(a) {
			var b = this.subtract(BigInteger.ONE),
				c = b.getLowestSetBit();
			if (0 >= c) return !1;
			var d = b.shiftRight(c);
			a = a + 1 >> 1, a > lowprimes.length && (a = lowprimes.length);
			for (var e = nbi(), f = 0; a > f; ++f) {
				e.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
				var g = e.modPow(d, this);
				if (0 != g.compareTo(BigInteger.ONE) && 0 != g.compareTo(b)) {
					for (var h = 1; h++ < c && 0 != g.compareTo(b);)
						if (g = g.modPowInt(2, this), 0 == g.compareTo(BigInteger.ONE)) return !1;
					if (0 != g.compareTo(b)) return !1
				}
			}
			return !0
		}

		function Arcfour() {
			this.i = 0, this.j = 0, this.S = new Array
		}

		function ARC4init(a) {
			var b, c, d;
			for (b = 0; 256 > b; ++b) this.S[b] = b;
			for (c = 0, b = 0; 256 > b; ++b) c = c + this.S[b] + a[b % a.length] & 255, d = this.S[b], this.S[b] = this.S[c], this.S[c] = d;
			this.i = 0, this.j = 0
		}

		function ARC4next() {
			var a;
			return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, a = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = a, this.S[a + this.S[this.i] & 255]
		}

		function prng_newstate() {
			return new Arcfour
		}

		function rng_get_byte() {
			if (null == rng_state) {
				for (rng_state = prng_newstate(); rng_psize > rng_pptr;) {
					var a = Math.floor(65536 * Math.random());
					rng_pool[rng_pptr++] = 255 & a
				}
				for (rng_state.init(rng_pool), rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
				rng_pptr = 0
			}
			return rng_state.next()
		}

		function rng_get_bytes(a) {
			var b;
			for (b = 0; b < a.length; ++b) a[b] = rng_get_byte()
		}

		function SecureRandom() {}

		function parseBigInt(a, b) {
			return new BigInteger(a, b)
		}

		function linebrk(a, b) {
			for (var c = "", d = 0; d + b < a.length;) c += a.substring(d, d + b) + "\n", d += b;
			return c + a.substring(d, a.length)
		}

		function byte2Hex(a) {
			return 16 > a ? "0" + a.toString(16) : a.toString(16)
		}

		function pkcs1pad2(a, b) {
			if (b < a.length + 11) return console.error("Message too long for RSA"), null;
			for (var c = new Array, d = a.length - 1; d >= 0 && b > 0;) {
				var e = a.charCodeAt(d--);
				128 > e ? c[--b] = e : e > 127 && 2048 > e ? (c[--b] = 63 & e | 128, c[--b] = e >> 6 | 192) : (c[--b] = 63 & e | 128, c[--b] = e >> 6 & 63 | 128, c[--b] = e >> 12 | 224)
			}
			c[--b] = 0;
			for (var f = new SecureRandom, g = new Array; b > 2;) {
				for (g[0] = 0; 0 == g[0];) f.nextBytes(g);
				c[--b] = g[0]
			}
			return c[--b] = 2, c[--b] = 0, new BigInteger(c)
		}

		function RSAKey() {
			this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
		}

		function RSASetPublic(a, b) {
			null != a && null != b && a.length > 0 && b.length > 0 ? (this.n = parseBigInt(a, 16), this.e = parseInt(b, 16)) : console.error("Invalid RSA public key")
		}

		function RSADoPublic(a) {
			return a.modPowInt(this.e, this.n)
		}

		function RSAEncrypt(a) {
			var b = pkcs1pad2(a, this.n.bitLength() + 7 >> 3);
			if (null == b) return null;
			var c = this.doPublic(b);
			if (null == c) return null;
			var d = c.toString(16);
			return 0 == (1 & d.length) ? d : "0" + d
		}

		function pkcs1unpad2(a, b) {
			for (var c = a.toByteArray(), d = 0; d < c.length && 0 == c[d];) ++d;
			if (c.length - d != b - 1 || 2 != c[d]) return null;
			for (++d; 0 != c[d];)
				if (++d >= c.length) return null;
			for (var e = ""; ++d < c.length;) {
				var f = 255 & c[d];
				128 > f ? e += String.fromCharCode(f) : f > 191 && 224 > f ? (e += String.fromCharCode((31 & f) << 6 | 63 & c[d + 1]), ++d) : (e += String.fromCharCode((15 & f) << 12 | (63 & c[d + 1]) << 6 | 63 & c[d + 2]), d += 2)
			}
			return e
		}

		function RSASetPrivate(a, b, c) {
			null != a && null != b && a.length > 0 && b.length > 0 ? (this.n = parseBigInt(a, 16), this.e = parseInt(b, 16), this.d = parseBigInt(c, 16)) : console.error("Invalid RSA private key")
		}

		function RSASetPrivateEx(a, b, c, d, e, f, g, h) {
			null != a && null != b && a.length > 0 && b.length > 0 ? (this.n = parseBigInt(a, 16), this.e = parseInt(b, 16), this.d = parseBigInt(c, 16), this.p = parseBigInt(d, 16), this.q = parseBigInt(e, 16), this.dmp1 = parseBigInt(f, 16), this.dmq1 = parseBigInt(g, 16), this.coeff = parseBigInt(h, 16)) : console.error("Invalid RSA private key")
		}

		function RSAGenerate(a, b) {
			var c = new SecureRandom,
				d = a >> 1;
			this.e = parseInt(b, 16);
			for (var e = new BigInteger(b, 16);;) {
				for (; this.p = new BigInteger(a - d, 1, c), 0 != this.p.subtract(BigInteger.ONE).gcd(e).compareTo(BigInteger.ONE) || !this.p.isProbablePrime(10););
				for (; this.q = new BigInteger(d, 1, c), 0 != this.q.subtract(BigInteger.ONE).gcd(e).compareTo(BigInteger.ONE) || !this.q.isProbablePrime(10););
				if (this.p.compareTo(this.q) <= 0) {
					var f = this.p;
					this.p = this.q, this.q = f
				}
				var g = this.p.subtract(BigInteger.ONE),
					h = this.q.subtract(BigInteger.ONE),
					i = g.multiply(h);
				if (0 == i.gcd(e).compareTo(BigInteger.ONE)) {
					this.n = this.p.multiply(this.q), this.d = e.modInverse(i), this.dmp1 = this.d.mod(g), this.dmq1 = this.d.mod(h), this.coeff = this.q.modInverse(this.p);
					break
				}
			}
		}

		function RSADoPrivate(a) {
			if (null == this.p || null == this.q) return a.modPow(this.d, this.n);
			for (var b = a.mod(this.p).modPow(this.dmp1, this.p), c = a.mod(this.q).modPow(this.dmq1, this.q); b.compareTo(c) < 0;) b = b.add(this.p);
			return b.subtract(c).multiply(this.coeff).mod(this.p).multiply(this.q).add(c)
		}

		function RSADecrypt(a) {
			var b = parseBigInt(a, 16),
				c = this.doPrivate(b);
			return null == c ? null : pkcs1unpad2(c, this.n.bitLength() + 7 >> 3)
		}

		function hex2b64(a) {
			var b, c, d = "";
			for (b = 0; b + 3 <= a.length; b += 3) c = parseInt(a.substring(b, b + 3), 16), d += b64map.charAt(c >> 6) + b64map.charAt(63 & c);
			for (b + 1 == a.length ? (c = parseInt(a.substring(b, b + 1), 16), d += b64map.charAt(c << 2)) : b + 2 == a.length && (c = parseInt(a.substring(b, b + 2), 16), d += b64map.charAt(c >> 2) + b64map.charAt((3 & c) << 4));
				(3 & d.length) > 0;) d += b64pad;
			return d
		}

		function b64tohex(a) {
			var b, c, d = "",
				e = 0;
			for (b = 0; b < a.length && a.charAt(b) != b64pad; ++b) v = b64map.indexOf(a.charAt(b)), v < 0 || (0 == e ? (d += int2char(v >> 2), c = 3 & v, e = 1) : 1 == e ? (d += int2char(c << 2 | v >> 4), c = 15 & v, e = 2) : 2 == e ? (d += int2char(c), d += int2char(v >> 2), c = 3 & v, e = 3) : (d += int2char(c << 2 | v >> 4), d += int2char(15 & v), e = 0));
			return 1 == e && (d += int2char(c << 2)), d
		}

		function b64toBA(a) {
			var b, c = b64tohex(a),
				d = new Array;
			for (b = 0; 2 * b < c.length; ++b) d[b] = parseInt(c.substring(2 * b, 2 * b + 2), 16);
			return d
		}
		var dbits, canary = 0xdeadbeefcafe,
			j_lm = 15715070 == (16777215 & canary);
		j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2, dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1, dbits = 26) : (BigInteger.prototype.am = am3, dbits = 28), BigInteger.prototype.DB = dbits, BigInteger.prototype.DM = (1 << dbits) - 1, BigInteger.prototype.DV = 1 << dbits;
		var BI_FP = 52;
		BigInteger.prototype.FV = Math.pow(2, BI_FP), BigInteger.prototype.F1 = BI_FP - dbits, BigInteger.prototype.F2 = 2 * dbits - BI_FP;
		var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
			BI_RC = new Array,
			rr, vv;
		for (rr = "0".charCodeAt(0), vv = 0; 9 >= vv; ++vv) BI_RC[rr++] = vv;
		for (rr = "a".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
		for (rr = "A".charCodeAt(0), vv = 10; 36 > vv; ++vv) BI_RC[rr++] = vv;
		Classic.prototype.convert = cConvert, Classic.prototype.revert = cRevert, Classic.prototype.reduce = cReduce, Classic.prototype.mulTo = cMulTo, Classic.prototype.sqrTo = cSqrTo, Montgomery.prototype.convert = montConvert, Montgomery.prototype.revert = montRevert, Montgomery.prototype.reduce = montReduce, Montgomery.prototype.mulTo = montMulTo, Montgomery.prototype.sqrTo = montSqrTo, BigInteger.prototype.copyTo = bnpCopyTo, BigInteger.prototype.fromInt = bnpFromInt, BigInteger.prototype.fromString = bnpFromString, BigInteger.prototype.clamp = bnpClamp, BigInteger.prototype.dlShiftTo = bnpDLShiftTo, BigInteger.prototype.drShiftTo = bnpDRShiftTo, BigInteger.prototype.lShiftTo = bnpLShiftTo, BigInteger.prototype.rShiftTo = bnpRShiftTo, BigInteger.prototype.subTo = bnpSubTo, BigInteger.prototype.multiplyTo = bnpMultiplyTo, BigInteger.prototype.squareTo = bnpSquareTo, BigInteger.prototype.divRemTo = bnpDivRemTo, BigInteger.prototype.invDigit = bnpInvDigit, BigInteger.prototype.isEven = bnpIsEven, BigInteger.prototype.exp = bnpExp, BigInteger.prototype.toString = bnToString, BigInteger.prototype.negate = bnNegate, BigInteger.prototype.abs = bnAbs, BigInteger.prototype.compareTo = bnCompareTo, BigInteger.prototype.bitLength = bnBitLength, BigInteger.prototype.mod = bnMod, BigInteger.prototype.modPowInt = bnModPowInt, BigInteger.ZERO = nbv(0), BigInteger.ONE = nbv(1), NullExp.prototype.convert = nNop, NullExp.prototype.revert = nNop, NullExp.prototype.mulTo = nMulTo, NullExp.prototype.sqrTo = nSqrTo, Barrett.prototype.convert = barrettConvert, Barrett.prototype.revert = barrettRevert, Barrett.prototype.reduce = barrettReduce, Barrett.prototype.mulTo = barrettMulTo, Barrett.prototype.sqrTo = barrettSqrTo;
		var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
			lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
		BigInteger.prototype.chunkSize = bnpChunkSize, BigInteger.prototype.toRadix = bnpToRadix, BigInteger.prototype.fromRadix = bnpFromRadix, BigInteger.prototype.fromNumber = bnpFromNumber, BigInteger.prototype.bitwiseTo = bnpBitwiseTo, BigInteger.prototype.changeBit = bnpChangeBit, BigInteger.prototype.addTo = bnpAddTo, BigInteger.prototype.dMultiply = bnpDMultiply, BigInteger.prototype.dAddOffset = bnpDAddOffset, BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo, BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo, BigInteger.prototype.modInt = bnpModInt, BigInteger.prototype.millerRabin = bnpMillerRabin, BigInteger.prototype.clone = bnClone, BigInteger.prototype.intValue = bnIntValue, BigInteger.prototype.byteValue = bnByteValue, BigInteger.prototype.shortValue = bnShortValue, BigInteger.prototype.signum = bnSigNum, BigInteger.prototype.toByteArray = bnToByteArray, BigInteger.prototype.equals = bnEquals, BigInteger.prototype.min = bnMin, BigInteger.prototype.max = bnMax, BigInteger.prototype.and = bnAnd, BigInteger.prototype.or = bnOr, BigInteger.prototype.xor = bnXor, BigInteger.prototype.andNot = bnAndNot, BigInteger.prototype.not = bnNot, BigInteger.prototype.shiftLeft = bnShiftLeft, BigInteger.prototype.shiftRight = bnShiftRight, BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit, BigInteger.prototype.bitCount = bnBitCount, BigInteger.prototype.testBit = bnTestBit, BigInteger.prototype.setBit = bnSetBit, BigInteger.prototype.clearBit = bnClearBit, BigInteger.prototype.flipBit = bnFlipBit, BigInteger.prototype.add = bnAdd, BigInteger.prototype.subtract = bnSubtract, BigInteger.prototype.multiply = bnMultiply, BigInteger.prototype.divide = bnDivide, BigInteger.prototype.remainder = bnRemainder, BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder, BigInteger.prototype.modPow = bnModPow, BigInteger.prototype.modInverse = bnModInverse, BigInteger.prototype.pow = bnPow, BigInteger.prototype.gcd = bnGCD, BigInteger.prototype.isProbablePrime = bnIsProbablePrime, BigInteger.prototype.square = bnSquare, Arcfour.prototype.init = ARC4init, Arcfour.prototype.next = ARC4next;
		var rng_psize = 256,
			rng_state, rng_pool, rng_pptr;
		if (null == rng_pool) {
			rng_pool = new Array, rng_pptr = 0;
			var t;
			if (window.crypto && window.crypto.getRandomValues) {
				var z = new Uint32Array(256);
				for (window.crypto.getRandomValues(z), t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = 255 & z[t]
			}
			var onMouseMoveListener = function(a) {
				if (this.count = this.count || 0, this.count >= 256 || rng_pptr >= rng_psize) return void(window.removeEventListener ? window.removeEventListener("mousemove", onMouseMoveListener) : window.detachEvent && window.detachEvent("onmousemove", onMouseMoveListener));
				this.count += 1;
				var b = a.x + a.y;
				rng_pool[rng_pptr++] = 255 & b
			};
			window.addEventListener ? window.addEventListener("mousemove", onMouseMoveListener) : window.attachEvent && window.attachEvent("onmousemove", onMouseMoveListener)
		}
		SecureRandom.prototype.nextBytes = rng_get_bytes, RSAKey.prototype.doPublic = RSADoPublic, RSAKey.prototype.setPublic = RSASetPublic, RSAKey.prototype.encrypt = RSAEncrypt, RSAKey.prototype.doPrivate = RSADoPrivate, RSAKey.prototype.setPrivate = RSASetPrivate, RSAKey.prototype.setPrivateEx = RSASetPrivateEx, RSAKey.prototype.generate = RSAGenerate, RSAKey.prototype.decrypt = RSADecrypt,
			function() {
				var a = function(a, b, c) {
					var d = new SecureRandom,
						e = a >> 1;
					this.e = parseInt(b, 16);
					var f = new BigInteger(b, 16),
						g = this,
						h = function() {
							var b = function() {
									if (g.p.compareTo(g.q) <= 0) {
										var a = g.p;
										g.p = g.q, g.q = a
									}
									var b = g.p.subtract(BigInteger.ONE),
										d = g.q.subtract(BigInteger.ONE),
										e = b.multiply(d);
									0 == e.gcd(f).compareTo(BigInteger.ONE) ? (g.n = g.p.multiply(g.q), g.d = f.modInverse(e), g.dmp1 = g.d.mod(b), g.dmq1 = g.d.mod(d), g.coeff = g.q.modInverse(g.p), setTimeout(function() {
										c()
									}, 0)) : setTimeout(h, 0)
								},
								i = function() {
									g.q = nbi(), g.q.fromNumberAsync(e, 1, d, function() {
										g.q.subtract(BigInteger.ONE).gcda(f, function(a) {
											0 == a.compareTo(BigInteger.ONE) && g.q.isProbablePrime(10) ? setTimeout(b, 0) : setTimeout(i, 0)
										})
									})
								},
								j = function() {
									g.p = nbi(), g.p.fromNumberAsync(a - e, 1, d, function() {
										g.p.subtract(BigInteger.ONE).gcda(f, function(a) {
											0 == a.compareTo(BigInteger.ONE) && g.p.isProbablePrime(10) ? setTimeout(i, 0) : setTimeout(j, 0)
										})
									})
								};
							setTimeout(j, 0)
						};
					setTimeout(h, 0)
				};
				RSAKey.prototype.generateAsync = a;
				var b = function(a, b) {
					var c = this.s < 0 ? this.negate() : this.clone(),
						d = a.s < 0 ? a.negate() : a.clone();
					if (c.compareTo(d) < 0) {
						var e = c;
						c = d, d = e
					}
					var f = c.getLowestSetBit(),
						g = d.getLowestSetBit();
					if (0 > g) return void b(c);
					g > f && (g = f), g > 0 && (c.rShiftTo(g, c), d.rShiftTo(g, d));
					var h = function() {
						(f = c.getLowestSetBit()) > 0 && c.rShiftTo(f, c), (f = d.getLowestSetBit()) > 0 && d.rShiftTo(f, d), c.compareTo(d) >= 0 ? (c.subTo(d, c), c.rShiftTo(1, c)) : (d.subTo(c, d), d.rShiftTo(1, d)), c.signum() > 0 ? setTimeout(h, 0) : (g > 0 && d.lShiftTo(g, d), setTimeout(function() {
							b(d)
						}, 0))
					};
					setTimeout(h, 10)
				};
				BigInteger.prototype.gcda = b;
				var c = function(a, b, c, d) {
					if ("number" == typeof b)
						if (2 > a) this.fromInt(1);
						else {
							this.fromNumber(a, c), this.testBit(a - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this), this.isEven() && this.dAddOffset(1, 0);
							var e = this,
								f = function() {
									e.dAddOffset(2, 0), e.bitLength() > a && e.subTo(BigInteger.ONE.shiftLeft(a - 1), e), e.isProbablePrime(b) ? setTimeout(function() {
										d()
									}, 0) : setTimeout(f, 0)
								};
							setTimeout(f, 0)
						}
					else {
						var g = new Array,
							h = 7 & a;
						g.length = (a >> 3) + 1, b.nextBytes(g), h > 0 ? g[0] &= (1 << h) - 1 : g[0] = 0, this.fromString(g, 256)
					}
				};
				BigInteger.prototype.fromNumberAsync = c
			}();
		var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
			b64pad = "=",
			JSX = JSX || {};
		JSX.env = JSX.env || {};
		var L = JSX,
			OP = Object.prototype,
			FUNCTION_TOSTRING = "[object Function]",
			ADD = ["toString", "valueOf"];
		JSX.env.parseUA = function(a) {
				var b, c = function(a) {
						var b = 0;
						return parseFloat(a.replace(/\./g, function() {
							return 1 == b++ ? "" : "."
						}))
					},
					d = navigator,
					e = {
						ie: 0,
						opera: 0,
						gecko: 0,
						webkit: 0,
						chrome: 0,
						mobile: null,
						air: 0,
						ipad: 0,
						iphone: 0,
						ipod: 0,
						ios: null,
						android: 0,
						webos: 0,
						caja: d && d.cajaVersion,
						secure: !1,
						os: null
					},
					f = a || navigator && navigator.userAgent,
					g = window && window.location,
					h = g && g.href;
				return e.secure = h && 0 === h.toLowerCase().indexOf("https"), f && (/windows|win32/i.test(f) ? e.os = "windows" : /macintosh/i.test(f) ? e.os = "macintosh" : /rhino/i.test(f) && (e.os = "rhino"), /KHTML/.test(f) && (e.webkit = 1), b = f.match(/AppleWebKit\/([^\s]*)/), b && b[1] && (e.webkit = c(b[1]), / Mobile\//.test(f) ? (e.mobile = "Apple", b = f.match(/OS ([^\s]*)/), b && b[1] && (b = c(b[1].replace("_", "."))), e.ios = b, e.ipad = e.ipod = e.iphone = 0, b = f.match(/iPad|iPod|iPhone/), b && b[0] && (e[b[0].toLowerCase()] = e.ios)) : (b = f.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/), b && (e.mobile = b[0]), /webOS/.test(f) && (e.mobile = "WebOS", b = f.match(/webOS\/([^\s]*);/), b && b[1] && (e.webos = c(b[1]))), / Android/.test(f) && (e.mobile = "Android", b = f.match(/Android ([^\s]*);/), b && b[1] && (e.android = c(b[1])))), b = f.match(/Chrome\/([^\s]*)/), b && b[1] ? e.chrome = c(b[1]) : (b = f.match(/AdobeAIR\/([^\s]*)/), b && (e.air = b[0]))), e.webkit || (b = f.match(/Opera[\s\/]([^\s]*)/), b && b[1] ? (e.opera = c(b[1]), b = f.match(/Version\/([^\s]*)/), b && b[1] && (e.opera = c(b[1])), b = f.match(/Opera Mini[^;]*/), b && (e.mobile = b[0])) : (b = f.match(/MSIE\s([^;]*)/), b && b[1] ? e.ie = c(b[1]) : (b = f.match(/Gecko\/([^\s]*)/), b && (e.gecko = 1, b = f.match(/rv:([^\s\)]*)/), b && b[1] && (e.gecko = c(b[1]))))))), e
			}, JSX.env.ua = JSX.env.parseUA(), JSX.isFunction = function(a) {
				return "function" == typeof a || OP.toString.apply(a) === FUNCTION_TOSTRING
			}, JSX._IEEnumFix = JSX.env.ua.ie ? function(a, b) {
				var c, d, e;
				for (c = 0; c < ADD.length; c += 1) d = ADD[c], e = b[d], L.isFunction(e) && e != OP[d] && (a[d] = e)
			} : function() {}, JSX.extend = function(a, b, c) {
				if (!b || !a) throw new Error("extend failed, please check that all dependencies are included.");
				var d, e = function() {};
				if (e.prototype = b.prototype, a.prototype = new e, a.prototype.constructor = a, a.superclass = b.prototype, b.prototype.constructor == OP.constructor && (b.prototype.constructor = b), c) {
					for (d in c) L.hasOwnProperty(c, d) && (a.prototype[d] = c[d]);
					L._IEEnumFix(a.prototype, c)
				}
			}, "undefined" != typeof KJUR && KJUR || (KJUR = {}), "undefined" != typeof KJUR.asn1 && KJUR.asn1 || (KJUR.asn1 = {}), KJUR.asn1.ASN1Util = new function() {
				this.integerToByteHex = function(a) {
					var b = a.toString(16);
					return b.length % 2 == 1 && (b = "0" + b), b
				}, this.bigIntToMinTwosComplementsHex = function(a) {
					var b = a.toString(16);
					if ("-" != b.substr(0, 1)) b.length % 2 == 1 ? b = "0" + b : b.match(/^[0-7]/) || (b = "00" + b);
					else {
						var c = b.substr(1),
							d = c.length;
						d % 2 == 1 ? d += 1 : b.match(/^[0-7]/) || (d += 2);
						for (var e = "", f = 0; d > f; f++) e += "f";
						var g = new BigInteger(e, 16),
							h = g.xor(a).add(BigInteger.ONE);
						b = h.toString(16).replace(/^-/, "")
					}
					return b
				}, this.getPEMStringFromHex = function(a, b) {
					var c = CryptoJS.enc.Hex.parse(a),
						d = CryptoJS.enc.Base64.stringify(c),
						e = d.replace(/(.{64})/g, "$1\r\n");
					return e = e.replace(/\r\n$/, ""), "-----BEGIN " + b + "-----\r\n" + e + "\r\n-----END " + b + "-----\r\n"
				}
			}, KJUR.asn1.ASN1Object = function() {
				var a = "";
				this.getLengthHexFromValue = function() {
					if ("undefined" == typeof this.hV || null == this.hV) throw "this.hV is null or undefined.";
					if (this.hV.length % 2 == 1) throw "value hex must be even length: n=" + a.length + ",v=" + this.hV;
					var b = this.hV.length / 2,
						c = b.toString(16);
					if (c.length % 2 == 1 && (c = "0" + c), 128 > b) return c;
					var d = c.length / 2;
					if (d > 15) throw "ASN.1 length too long to represent by 8x: n = " + b.toString(16);
					var e = 128 + d;
					return e.toString(16) + c
				}, this.getEncodedHex = function() {
					return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV
				}, this.getValueHex = function() {
					return this.getEncodedHex(), this.hV
				}, this.getFreshValueHex = function() {
					return ""
				}
			}, KJUR.asn1.DERAbstractString = function(a) {
				KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
				this.getString = function() {
					return this.s
				}, this.setString = function(a) {
					this.hTLV = null, this.isModified = !0, this.s = a, this.hV = stohex(this.s)
				}, this.setStringHex = function(a) {
					this.hTLV = null, this.isModified = !0, this.s = null, this.hV = a
				}, this.getFreshValueHex = function() {
					return this.hV
				}, "undefined" != typeof a && ("undefined" != typeof a.str ? this.setString(a.str) : "undefined" != typeof a.hex && this.setStringHex(a.hex))
			}, JSX.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object), KJUR.asn1.DERAbstractTime = function() {
				KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
				this.localDateToUTC = function(a) {
					utc = a.getTime() + 6e4 * a.getTimezoneOffset();
					var b = new Date(utc);
					return b
				}, this.formatDate = function(a, b) {
					var c = this.zeroPadding,
						d = this.localDateToUTC(a),
						e = String(d.getFullYear());
					"utc" == b && (e = e.substr(2, 2));
					var f = c(String(d.getMonth() + 1), 2),
						g = c(String(d.getDate()), 2),
						h = c(String(d.getHours()), 2),
						i = c(String(d.getMinutes()), 2),
						j = c(String(d.getSeconds()), 2);
					return e + f + g + h + i + j + "Z"
				}, this.zeroPadding = function(a, b) {
					return a.length >= b ? a : new Array(b - a.length + 1).join("0") + a
				}, this.getString = function() {
					return this.s
				}, this.setString = function(a) {
					this.hTLV = null, this.isModified = !0, this.s = a, this.hV = stohex(this.s)
				}, this.setByDateValue = function(a, b, c, d, e, f) {
					var g = new Date(Date.UTC(a, b - 1, c, d, e, f, 0));
					this.setByDate(g)
				}, this.getFreshValueHex = function() {
					return this.hV
				}
			}, JSX.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object), KJUR.asn1.DERAbstractStructured = function(a) {
				KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
				this.setByASN1ObjectArray = function(a) {
					this.hTLV = null, this.isModified = !0, this.asn1Array = a
				}, this.appendASN1Object = function(a) {
					this.hTLV = null, this.isModified = !0, this.asn1Array.push(a)
				}, this.asn1Array = new Array, "undefined" != typeof a && "undefined" != typeof a.array && (this.asn1Array = a.array)
			}, JSX.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object), KJUR.asn1.DERBoolean = function() {
				KJUR.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff"
			}, JSX.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object), KJUR.asn1.DERInteger = function(a) {
				KJUR.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(a) {
					this.hTLV = null, this.isModified = !0, this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(a)
				}, this.setByInteger = function(a) {
					var b = new BigInteger(String(a), 10);
					this.setByBigInteger(b)
				}, this.setValueHex = function(a) {
					this.hV = a
				}, this.getFreshValueHex = function() {
					return this.hV
				}, "undefined" != typeof a && ("undefined" != typeof a.bigint ? this.setByBigInteger(a.bigint) : "undefined" != typeof a["int"] ? this.setByInteger(a["int"]) : "undefined" != typeof a.hex && this.setValueHex(a.hex))
			}, JSX.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object), KJUR.asn1.DERBitString = function(a) {
				KJUR.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(a) {
					this.hTLV = null, this.isModified = !0, this.hV = a
				}, this.setUnusedBitsAndHexValue = function(a, b) {
					if (0 > a || a > 7) throw "unused bits shall be from 0 to 7: u = " + a;
					var c = "0" + a;
					this.hTLV = null, this.isModified = !0, this.hV = c + b
				}, this.setByBinaryString = function(a) {
					a = a.replace(/0+$/, "");
					var b = 8 - a.length % 8;
					8 == b && (b = 0);
					for (var c = 0; b >= c; c++) a += "0";
					for (var d = "", c = 0; c < a.length - 1; c += 8) {
						var e = a.substr(c, 8),
							f = parseInt(e, 2).toString(16);
						1 == f.length && (f = "0" + f), d += f
					}
					this.hTLV = null, this.isModified = !0, this.hV = "0" + b + d
				}, this.setByBooleanArray = function(a) {
					for (var b = "", c = 0; c < a.length; c++) b += 1 == a[c] ? "1" : "0";
					this.setByBinaryString(b)
				}, this.newFalseArray = function(a) {
					for (var b = new Array(a), c = 0; a > c; c++) b[c] = !1;
					return b
				}, this.getFreshValueHex = function() {
					return this.hV
				}, "undefined" != typeof a && ("undefined" != typeof a.hex ? this.setHexValueIncludingUnusedBits(a.hex) : "undefined" != typeof a.bin ? this.setByBinaryString(a.bin) : "undefined" != typeof a.array && this.setByBooleanArray(a.array))
			}, JSX.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object), KJUR.asn1.DEROctetString = function(a) {
				KJUR.asn1.DEROctetString.superclass.constructor.call(this, a), this.hT = "04"
			}, JSX.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString), KJUR.asn1.DERNull = function() {
				KJUR.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500"
			}, JSX.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object), KJUR.asn1.DERObjectIdentifier = function(a) {
				var b = function(a) {
						var b = a.toString(16);
						return 1 == b.length && (b = "0" + b), b
					},
					c = function(a) {
						var c = "",
							d = new BigInteger(a, 10),
							e = d.toString(2),
							f = 7 - e.length % 7;
						7 == f && (f = 0);
						for (var g = "", h = 0; f > h; h++) g += "0";
						e = g + e;
						for (var h = 0; h < e.length - 1; h += 7) {
							var i = e.substr(h, 7);
							h != e.length - 7 && (i = "1" + i), c += b(parseInt(i, 2))
						}
						return c
					};
				KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(a) {
					this.hTLV = null, this.isModified = !0, this.s = null, this.hV = a
				}, this.setValueOidString = function(a) {
					if (!a.match(/^[0-9.]+$/)) throw "malformed oid string: " + a;
					var d = "",
						e = a.split("."),
						f = 40 * parseInt(e[0]) + parseInt(e[1]);
					d += b(f), e.splice(0, 2);
					for (var g = 0; g < e.length; g++) d += c(e[g]);
					this.hTLV = null, this.isModified = !0, this.s = null, this.hV = d
				}, this.setValueName = function(a) {
					if ("undefined" == typeof KJUR.asn1.x509.OID.name2oidList[a]) throw "DERObjectIdentifier oidName undefined: " + a;
					var b = KJUR.asn1.x509.OID.name2oidList[a];
					this.setValueOidString(b)
				}, this.getFreshValueHex = function() {
					return this.hV
				}, "undefined" != typeof a && ("undefined" != typeof a.oid ? this.setValueOidString(a.oid) : "undefined" != typeof a.hex ? this.setValueHex(a.hex) : "undefined" != typeof a.name && this.setValueName(a.name))
			}, JSX.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object), KJUR.asn1.DERUTF8String = function(a) {
				KJUR.asn1.DERUTF8String.superclass.constructor.call(this, a), this.hT = "0c"
			}, JSX.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString), KJUR.asn1.DERNumericString = function(a) {
				KJUR.asn1.DERNumericString.superclass.constructor.call(this, a), this.hT = "12"
			}, JSX.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString), KJUR.asn1.DERPrintableString = function(a) {
				KJUR.asn1.DERPrintableString.superclass.constructor.call(this, a), this.hT = "13"
			}, JSX.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString), KJUR.asn1.DERTeletexString = function(a) {
				KJUR.asn1.DERTeletexString.superclass.constructor.call(this, a), this.hT = "14"
			}, JSX.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString), KJUR.asn1.DERIA5String = function(a) {
				KJUR.asn1.DERIA5String.superclass.constructor.call(this, a), this.hT = "16"
			}, JSX.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString), KJUR.asn1.DERUTCTime = function(a) {
				KJUR.asn1.DERUTCTime.superclass.constructor.call(this, a), this.hT = "17", this.setByDate = function(a) {
					this.hTLV = null, this.isModified = !0, this.date = a, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)
				}, "undefined" != typeof a && ("undefined" != typeof a.str ? this.setString(a.str) : "undefined" != typeof a.hex ? this.setStringHex(a.hex) : "undefined" != typeof a.date && this.setByDate(a.date))
			}, JSX.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime), KJUR.asn1.DERGeneralizedTime = function(a) {
				KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, a), this.hT = "18", this.setByDate = function(a) {
					this.hTLV = null, this.isModified = !0, this.date = a, this.s = this.formatDate(this.date, "gen"), this.hV = stohex(this.s)
				}, "undefined" != typeof a && ("undefined" != typeof a.str ? this.setString(a.str) : "undefined" != typeof a.hex ? this.setStringHex(a.hex) : "undefined" != typeof a.date && this.setByDate(a.date))
			}, JSX.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime), KJUR.asn1.DERSequence = function(a) {
				KJUR.asn1.DERSequence.superclass.constructor.call(this, a), this.hT = "30", this.getFreshValueHex = function() {
					for (var a = "", b = 0; b < this.asn1Array.length; b++) {
						var c = this.asn1Array[b];
						a += c.getEncodedHex()
					}
					return this.hV = a, this.hV
				}
			}, JSX.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured), KJUR.asn1.DERSet = function(a) {
				KJUR.asn1.DERSet.superclass.constructor.call(this, a), this.hT = "31", this.getFreshValueHex = function() {
					for (var a = new Array, b = 0; b < this.asn1Array.length; b++) {
						var c = this.asn1Array[b];
						a.push(c.getEncodedHex())
					}
					return a.sort(), this.hV = a.join(""), this.hV
				}
			}, JSX.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured), KJUR.asn1.DERTaggedObject = function(a) {
				KJUR.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(a, b, c) {
					this.hT = b, this.isExplicit = a, this.asn1Object = c, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = c.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, b), this.isModified = !1)
				}, this.getFreshValueHex = function() {
					return this.hV
				}, "undefined" != typeof a && ("undefined" != typeof a.tag && (this.hT = a.tag), "undefined" != typeof a.explicit && (this.isExplicit = a.explicit), "undefined" != typeof a.obj && (this.asn1Object = a.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
			}, JSX.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object),
			function(a) {
				"use strict";
				var b, c = {};
				c.decode = function(c) {
					var d;
					if (b === a) {
						var e = "0123456789ABCDEF",
							f = " \f\n\r	聽\u2028\u2029";
						for (b = [], d = 0; 16 > d; ++d) b[e.charAt(d)] = d;
						for (e = e.toLowerCase(), d = 10; 16 > d; ++d) b[e.charAt(d)] = d;
						for (d = 0; d < f.length; ++d) b[f.charAt(d)] = -1
					}
					var g = [],
						h = 0,
						i = 0;
					for (d = 0; d < c.length; ++d) {
						var j = c.charAt(d);
						if ("=" == j) break;
						if (j = b[j], -1 != j) {
							if (j === a) throw "Illegal character at offset " + d;
							h |= j, ++i >= 2 ? (g[g.length] = h, h = 0, i = 0) : h <<= 4
						}
					}
					if (i) throw "Hex encoding incomplete: 4 bits missing";
					return g
				}, window.Hex = c
			}(),
			function(a) {
				"use strict";
				var b, c = {};
				c.decode = function(c) {
					var d;
					if (b === a) {
						var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
							f = "= \f\n\r	聽\u2028\u2029";
						for (b = [], d = 0; 64 > d; ++d) b[e.charAt(d)] = d;
						for (d = 0; d < f.length; ++d) b[f.charAt(d)] = -1
					}
					var g = [],
						h = 0,
						i = 0;
					for (d = 0; d < c.length; ++d) {
						var j = c.charAt(d);
						if ("=" == j) break;
						if (j = b[j], -1 != j) {
							if (j === a) throw "Illegal character at offset " + d;
							h |= j, ++i >= 4 ? (g[g.length] = h >> 16, g[g.length] = h >> 8 & 255, g[g.length] = 255 & h, h = 0, i = 0) : h <<= 6
						}
					}
					switch (i) {
						case 1:
							throw "Base64 encoding incomplete: at least 2 bits missing";
						case 2:
							g[g.length] = h >> 10;
							break;
						case 3:
							g[g.length] = h >> 16, g[g.length] = h >> 8 & 255
					}
					return g
				}, c.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, c.unarmor = function(a) {
					var b = c.re.exec(a);
					if (b)
						if (b[1]) a = b[1];
						else {
							if (!b[2]) throw "RegExp out of sync";
							a = b[2]
						}
					return c.decode(a)
				}, window.Base64 = c
			}(),
			function(a) {
				"use strict";

				function b(a, c) {
					a instanceof b ? (this.enc = a.enc, this.pos = a.pos) : (this.enc = a, this.pos = c)
				}

				function c(a, b, c, d, e) {
					this.stream = a, this.header = b, this.length = c, this.tag = d, this.sub = e
				}
				var d = 100,
					e = "鈥�",
					f = {
						tag: function(a, b) {
							var c = document.createElement(a);
							return c.className = b, c
						},
						text: function(a) {
							return document.createTextNode(a)
						}
					};
				b.prototype.get = function(b) {
					if (b === a && (b = this.pos++), b >= this.enc.length) throw "Requesting byte offset " + b + " on a stream of length " + this.enc.length;
					return this.enc[b]
				}, b.prototype.hexDigits = "0123456789ABCDEF", b.prototype.hexByte = function(a) {
					return this.hexDigits.charAt(a >> 4 & 15) + this.hexDigits.charAt(15 & a)
				}, b.prototype.hexDump = function(a, b, c) {
					for (var d = "", e = a; b > e; ++e)
						if (d += this.hexByte(this.get(e)), c !== !0) switch (15 & e) {
							case 7:
								d += "  ";
								break;
							case 15:
								d += "\n";
								break;
							default:
								d += " "
						}
					return d
				}, b.prototype.parseStringISO = function(a, b) {
					for (var c = "", d = a; b > d; ++d) c += String.fromCharCode(this.get(d));
					return c
				}, b.prototype.parseStringUTF = function(a, b) {
					for (var c = "", d = a; b > d;) {
						var e = this.get(d++);
						c += String.fromCharCode(128 > e ? e : e > 191 && 224 > e ? (31 & e) << 6 | 63 & this.get(d++) : (15 & e) << 12 | (63 & this.get(d++)) << 6 | 63 & this.get(d++))
					}
					return c
				}, b.prototype.parseStringBMP = function(a, b) {
					for (var c = "", d = a; b > d; d += 2) {
						var e = this.get(d),
							f = this.get(d + 1);
						c += String.fromCharCode((e << 8) + f)
					}
					return c
				}, b.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, b.prototype.parseTime = function(a, b) {
					var c = this.parseStringISO(a, b),
						d = this.reTime.exec(c);
					return d ? (c = d[1] + "-" + d[2] + "-" + d[3] + " " + d[4], d[5] && (c += ":" + d[5], d[6] && (c += ":" + d[6], d[7] && (c += "." + d[7]))), d[8] && (c += " UTC", "Z" != d[8] && (c += d[8], d[9] && (c += ":" + d[9]))), c) : "Unrecognized time: " + c
				}, b.prototype.parseInteger = function(a, b) {
					var c = b - a;
					if (c > 4) {
						c <<= 3;
						var d = this.get(a);
						if (0 === d) c -= 8;
						else
							for (; 128 > d;) d <<= 1, --c;
						return "(" + c + " bit)"
					}
					for (var e = 0, f = a; b > f; ++f) e = e << 8 | this.get(f);
					return e
				}, b.prototype.parseBitString = function(a, b) {
					var c = this.get(a),
						d = (b - a - 1 << 3) - c,
						e = "(" + d + " bit)";
					if (20 >= d) {
						var f = c;
						e += " ";
						for (var g = b - 1; g > a; --g) {
							for (var h = this.get(g), i = f; 8 > i; ++i) e += h >> i & 1 ? "1" : "0";
							f = 0
						}
					}
					return e
				}, b.prototype.parseOctetString = function(a, b) {
					var c = b - a,
						f = "(" + c + " byte) ";
					c > d && (b = a + d);
					for (var g = a; b > g; ++g) f += this.hexByte(this.get(g));
					return c > d && (f += e), f
				}, b.prototype.parseOID = function(a, b) {
					for (var c = "", d = 0, e = 0, f = a; b > f; ++f) {
						var g = this.get(f);
						if (d = d << 7 | 127 & g, e += 7, !(128 & g)) {
							if ("" === c) {
								var h = 80 > d ? 40 > d ? 0 : 1 : 2;
								c = h + "." + (d - 40 * h)
							} else c += "." + (e >= 31 ? "bigint" : d);
							d = e = 0
						}
					}
					return c
				}, c.prototype.typeName = function() {
					if (this.tag === a) return "unknown";
					var b = this.tag >> 6,
						c = (this.tag >> 5 & 1, 31 & this.tag);
					switch (b) {
						case 0:
							switch (c) {
								case 0:
									return "EOC";
								case 1:
									return "BOOLEAN";
								case 2:
									return "INTEGER";
								case 3:
									return "BIT_STRING";
								case 4:
									return "OCTET_STRING";
								case 5:
									return "NULL";
								case 6:
									return "OBJECT_IDENTIFIER";
								case 7:
									return "ObjectDescriptor";
								case 8:
									return "EXTERNAL";
								case 9:
									return "REAL";
								case 10:
									return "ENUMERATED";
								case 11:
									return "EMBEDDED_PDV";
								case 12:
									return "UTF8String";
								case 16:
									return "SEQUENCE";
								case 17:
									return "SET";
								case 18:
									return "NumericString";
								case 19:
									return "PrintableString";
								case 20:
									return "TeletexString";
								case 21:
									return "VideotexString";
								case 22:
									return "IA5String";
								case 23:
									return "UTCTime";
								case 24:
									return "GeneralizedTime";
								case 25:
									return "GraphicString";
								case 26:
									return "VisibleString";
								case 27:
									return "GeneralString";
								case 28:
									return "UniversalString";
								case 30:
									return "BMPString";
								default:
									return "Universal_" + c.toString(16)
							}
						case 1:
							return "Application_" + c.toString(16);
						case 2:
							return "[" + c + "]";
						case 3:
							return "Private_" + c.toString(16)
					}
				}, c.prototype.reSeemsASCII = /^[ -~]+$/, c.prototype.content = function() {
					if (this.tag === a) return null;
					var b = this.tag >> 6,
						c = 31 & this.tag,
						f = this.posContent(),
						g = Math.abs(this.length);
					if (0 !== b) {
						if (null !== this.sub) return "(" + this.sub.length + " elem)";
						var h = this.stream.parseStringISO(f, f + Math.min(g, d));
						return this.reSeemsASCII.test(h) ? h.substring(0, 2 * d) + (h.length > 2 * d ? e : "") : this.stream.parseOctetString(f, f + g)
					}
					switch (c) {
						case 1:
							return 0 === this.stream.get(f) ? "false" : "true";
						case 2:
							return this.stream.parseInteger(f, f + g);
						case 3:
							return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(f, f + g);
						case 4:
							return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(f, f + g);
						case 6:
							return this.stream.parseOID(f, f + g);
						case 16:
						case 17:
							return "(" + this.sub.length + " elem)";
						case 12:
							return this.stream.parseStringUTF(f, f + g);
						case 18:
						case 19:
						case 20:
						case 21:
						case 22:
						case 26:
							return this.stream.parseStringISO(f, f + g);
						case 30:
							return this.stream.parseStringBMP(f, f + g);
						case 23:
						case 24:
							return this.stream.parseTime(f, f + g)
					}
					return null
				}, c.prototype.toString = function() {
					return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
				}, c.prototype.print = function(b) {
					if (b === a && (b = ""), document.writeln(b + this), null !== this.sub) {
						b += "  ";
						for (var c = 0, d = this.sub.length; d > c; ++c) this.sub[c].print(b)
					}
				}, c.prototype.toPrettyString = function(b) {
					b === a && (b = "");
					var c = b + this.typeName() + " @" + this.stream.pos;
					if (this.length >= 0 && (c += "+"), c += this.length, 32 & this.tag ? c += " (constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (c += " (encapsulates)"), c += "\n", null !== this.sub) {
						b += "  ";
						for (var d = 0, e = this.sub.length; e > d; ++d) c += this.sub[d].toPrettyString(b)
					}
					return c
				}, c.prototype.toDOM = function() {
					var a = f.tag("div", "node");
					a.asn1 = this;
					var b = f.tag("div", "head"),
						c = this.typeName().replace(/_/g, " ");
					b.innerHTML = c;
					var d = this.content();
					if (null !== d) {
						d = String(d).replace(/</g, "&lt;");
						var e = f.tag("span", "preview");
						e.appendChild(f.text(d)), b.appendChild(e)
					}
					a.appendChild(b), this.node = a, this.head = b;
					var g = f.tag("div", "value");
					if (c = "Offset: " + this.stream.pos + "<br/>", c += "Length: " + this.header + "+", c += this.length >= 0 ? this.length : -this.length + " (undefined)", 32 & this.tag ? c += "<br/>(constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (c += "<br/>(encapsulates)"), null !== d && (c += "<br/>Value:<br/><b>" + d + "</b>", "object" == typeof oids && 6 == this.tag)) {
						var h = oids[d];
						h && (h.d && (c += "<br/>" + h.d), h.c && (c += "<br/>" + h.c), h.w && (c += "<br/>(warning!)"))
					}
					g.innerHTML = c, a.appendChild(g);
					var i = f.tag("div", "sub");
					if (null !== this.sub)
						for (var j = 0, k = this.sub.length; k > j; ++j) i.appendChild(this.sub[j].toDOM());
					return a.appendChild(i), b.onclick = function() {
						a.className = "node collapsed" == a.className ? "node" : "node collapsed"
					}, a
				}, c.prototype.posStart = function() {
					return this.stream.pos
				}, c.prototype.posContent = function() {
					return this.stream.pos + this.header
				}, c.prototype.posEnd = function() {
					return this.stream.pos + this.header + Math.abs(this.length)
				}, c.prototype.fakeHover = function(a) {
					this.node.className += " hover", a && (this.head.className += " hover")
				}, c.prototype.fakeOut = function(a) {
					var b = / ?hover/;
					this.node.className = this.node.className.replace(b, ""), a && (this.head.className = this.head.className.replace(b, ""))
				}, c.prototype.toHexDOM_sub = function(a, b, c, d, e) {
					if (!(d >= e)) {
						var g = f.tag("span", b);
						g.appendChild(f.text(c.hexDump(d, e))), a.appendChild(g)
					}
				}, c.prototype.toHexDOM = function(b) {
					var c = f.tag("span", "hex");
					if (b === a && (b = c), this.head.hexNode = c, this.head.onmouseover = function() {
							this.hexNode.className = "hexCurrent"
						}, this.head.onmouseout = function() {
							this.hexNode.className = "hex"
						}, c.asn1 = this, c.onmouseover = function() {
							var a = !b.selected;
							a && (b.selected = this.asn1, this.className = "hexCurrent"), this.asn1.fakeHover(a)
						}, c.onmouseout = function() {
							var a = b.selected == this.asn1;
							this.asn1.fakeOut(a), a && (b.selected = null, this.className = "hex")
						}, this.toHexDOM_sub(c, "tag", this.stream, this.posStart(), this.posStart() + 1), this.toHexDOM_sub(c, this.length >= 0 ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent()), null === this.sub) c.appendChild(f.text(this.stream.hexDump(this.posContent(), this.posEnd())));
					else if (this.sub.length > 0) {
						var d = this.sub[0],
							e = this.sub[this.sub.length - 1];
						this.toHexDOM_sub(c, "intro", this.stream, this.posContent(), d.posStart());
						for (var g = 0, h = this.sub.length; h > g; ++g) c.appendChild(this.sub[g].toHexDOM(b));
						this.toHexDOM_sub(c, "outro", this.stream, e.posEnd(), this.posEnd())
					}
					return c
				}, c.prototype.toHexString = function() {
					return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
				}, c.decodeLength = function(a) {
					var b = a.get(),
						c = 127 & b;
					if (c == b) return c;
					if (c > 3) throw "Length over 24 bits not supported at position " + (a.pos - 1);
					if (0 === c) return -1;
					b = 0;
					for (var d = 0; c > d; ++d) b = b << 8 | a.get();
					return b
				}, c.hasContent = function(a, d, e) {
					if (32 & a) return !0;
					if (3 > a || a > 4) return !1;
					var f = new b(e);
					3 == a && f.get();
					var g = f.get();
					if (g >> 6 & 1) return !1;
					try {
						var h = c.decodeLength(f);
						return f.pos - e.pos + h == d
					} catch (i) {
						return !1
					}
				}, c.decode = function(a) {
					a instanceof b || (a = new b(a, 0));
					var d = new b(a),
						e = a.get(),
						f = c.decodeLength(a),
						g = a.pos - d.pos,
						h = null;
					if (c.hasContent(e, f, a)) {
						var i = a.pos;
						if (3 == e && a.get(), h = [], f >= 0) {
							for (var j = i + f; a.pos < j;) h[h.length] = c.decode(a);
							if (a.pos != j) throw "Content size is not correct for container starting at offset " + i
						} else try {
							for (;;) {
								var k = c.decode(a);
								if (0 === k.tag) break;
								h[h.length] = k
							}
							f = i - a.pos
						} catch (l) {
							throw "Exception while decoding undefined length content: " + l
						}
					} else a.pos += f;
					return new c(d, g, f, e, h)
				}, c.test = function() {
					for (var a = [{
							value: [39],
							expected: 39
						}, {
							value: [129, 201],
							expected: 201
						}, {
							value: [131, 254, 220, 186],
							expected: 16702650
						}], d = 0, e = a.length; e > d; ++d) {
						var f = new b(a[d].value, 0),
							g = c.decodeLength(f);
						g != a[d].expected && document.write("In test[" + d + "] expected " + a[d].expected + " got " + g + "\n")
					}
				}, window.ASN1 = c
			}(), ASN1.prototype.getHexStringValue = function() {
				var a = this.toHexString(),
					b = 2 * this.header,
					c = 2 * this.length;
				return a.substr(b, c)
			}, RSAKey.prototype.parseKey = function(a) {
				try {
					var b = 0,
						c = 0,
						d = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
						e = d.test(a) ? Hex.decode(a) : Base64.unarmor(a),
						f = ASN1.decode(e);
					if (3 === f.sub.length && (f = f.sub[2].sub[0]), 9 === f.sub.length) {
						b = f.sub[1].getHexStringValue(), this.n = parseBigInt(b, 16), c = f.sub[2].getHexStringValue(), this.e = parseInt(c, 16);
						var g = f.sub[3].getHexStringValue();
						this.d = parseBigInt(g, 16);
						var h = f.sub[4].getHexStringValue();
						this.p = parseBigInt(h, 16);
						var i = f.sub[5].getHexStringValue();
						this.q = parseBigInt(i, 16);
						var j = f.sub[6].getHexStringValue();
						this.dmp1 = parseBigInt(j, 16);
						var k = f.sub[7].getHexStringValue();
						this.dmq1 = parseBigInt(k, 16);
						var l = f.sub[8].getHexStringValue();
						this.coeff = parseBigInt(l, 16)
					} else {
						if (2 !== f.sub.length) return !1;
						var m = f.sub[1],
							n = m.sub[0];
						b = n.sub[0].getHexStringValue(), this.n = parseBigInt(b, 16), c = n.sub[1].getHexStringValue(), this.e = parseInt(c, 16)
					}
					return !0
				} catch (o) {
					return !1
				}
			}, RSAKey.prototype.getPrivateBaseKey = function() {
				var a = {
						array: [new KJUR.asn1.DERInteger({
							"int": 0
						}), new KJUR.asn1.DERInteger({
							bigint: this.n
						}), new KJUR.asn1.DERInteger({
							"int": this.e
						}), new KJUR.asn1.DERInteger({
							bigint: this.d
						}), new KJUR.asn1.DERInteger({
							bigint: this.p
						}), new KJUR.asn1.DERInteger({
							bigint: this.q
						}), new KJUR.asn1.DERInteger({
							bigint: this.dmp1
						}), new KJUR.asn1.DERInteger({
							bigint: this.dmq1
						}), new KJUR.asn1.DERInteger({
							bigint: this.coeff
						})]
					},
					b = new KJUR.asn1.DERSequence(a);
				return b.getEncodedHex()
			}, RSAKey.prototype.getPrivateBaseKeyB64 = function() {
				return hex2b64(this.getPrivateBaseKey())
			}, RSAKey.prototype.getPublicBaseKey = function() {
				var a = {
						array: [new KJUR.asn1.DERObjectIdentifier({
							oid: "1.2.840.113549.1.1.1"
						}), new KJUR.asn1.DERNull]
					},
					b = new KJUR.asn1.DERSequence(a);
				a = {
					array: [new KJUR.asn1.DERInteger({
						bigint: this.n
					}), new KJUR.asn1.DERInteger({
						"int": this.e
					})]
				};
				var c = new KJUR.asn1.DERSequence(a);
				a = {
					hex: "00" + c.getEncodedHex()
				};
				var d = new KJUR.asn1.DERBitString(a);
				a = {
					array: [b, d]
				};
				var e = new KJUR.asn1.DERSequence(a);
				return e.getEncodedHex()
			}, RSAKey.prototype.getPublicBaseKeyB64 = function() {
				return hex2b64(this.getPublicBaseKey())
			}, RSAKey.prototype.wordwrap = function(a, b) {
				if (b = b || 64, !a) return a;
				var c = "(.{1," + b + "})( +|$\n?)|(.{1," + b + "})";
				return a.match(RegExp(c, "g")).join("\n")
			}, RSAKey.prototype.getPrivateKey = function() {
				var a = "-----BEGIN RSA PRIVATE KEY-----\n";
				return a += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n", a += "-----END RSA PRIVATE KEY-----"
			}, RSAKey.prototype.getPublicKey = function() {
				var a = "-----BEGIN PUBLIC KEY-----\n";
				return a += this.wordwrap(this.getPublicBaseKeyB64()) + "\n", a += "-----END PUBLIC KEY-----"
			}, RSAKey.prototype.hasPublicKeyProperty = function(a) {
				return a = a || {}, a.hasOwnProperty("n") && a.hasOwnProperty("e")
			}, RSAKey.prototype.hasPrivateKeyProperty = function(a) {
				return a = a || {}, a.hasOwnProperty("n") && a.hasOwnProperty("e") && a.hasOwnProperty("d") && a.hasOwnProperty("p") && a.hasOwnProperty("q") && a.hasOwnProperty("dmp1") && a.hasOwnProperty("dmq1") && a.hasOwnProperty("coeff")
			}, RSAKey.prototype.parsePropertiesFrom = function(a) {
				this.n = a.n, this.e = a.e, a.hasOwnProperty("d") && (this.d = a.d, this.p = a.p, this.q = a.q, this.dmp1 = a.dmp1, this.dmq1 = a.dmq1, this.coeff = a.coeff)
			};
		var JSEncryptRSAKey = function(a) {
			RSAKey.call(this), a && ("string" == typeof a ? this.parseKey(a) : (this.hasPrivateKeyProperty(a) || this.hasPublicKeyProperty(a)) && this.parsePropertiesFrom(a))
		};
		JSEncryptRSAKey.prototype = new RSAKey, JSEncryptRSAKey.prototype.constructor = JSEncryptRSAKey;
		var JSEncrypt = function(a) {
			a = a || {}, this.default_key_size = parseInt(a.default_key_size) || 1024, this.default_public_exponent = a.default_public_exponent || "010001", this.log = a.log || !1, this.key = null
		};
		JSEncrypt.prototype.setKey = function(a) {
			this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new JSEncryptRSAKey(a)
		}, JSEncrypt.prototype.setPrivateKey = function(a) {
			this.setKey(a)
		}, JSEncrypt.prototype.setPublicKey = function(a) {
			this.setKey(a)
		}, JSEncrypt.prototype.decrypt = function(a) {
			try {
				return this.getKey().decrypt(b64tohex(a))
			} catch (b) {
				return !1
			}
		}, JSEncrypt.prototype.encrypt = function(a) {
			try {
				return hex2b64(this.getKey().encrypt(a))
			} catch (b) {
				return !1
			}
		}, JSEncrypt.prototype.getKey = function(a) {
			if (!this.key) {
				if (this.key = new JSEncryptRSAKey, a && "[object Function]" === {}.toString.call(a)) return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, a);
				this.key.generate(this.default_key_size, this.default_public_exponent)
			}
			return this.key
		}, JSEncrypt.prototype.getPrivateKey = function() {
			return this.getKey().getPrivateKey()
		}, JSEncrypt.prototype.getPrivateKeyB64 = function() {
			return this.getKey().getPrivateBaseKeyB64()
		}, JSEncrypt.prototype.getPublicKey = function() {
			return this.getKey().getPublicKey()
		}, JSEncrypt.prototype.getPublicKeyB64 = function() {
			return this.getKey().getPublicBaseKeyB64()
		};
		exports.JSEncrypt = JSEncrypt;
	})(JSEncryptExports);
	// var JSEncrypt = JSEncryptExports.JSEncrypt;
	module.exports = JSEncryptExports.JSEncrypt;



	/*
		加密方法：
		1、	var JSEncrypt = require("utils/jsencrypt");加载这个加密组件

		2、	拿到后台给的公钥，即publicKey;(PHP已将其放到header中的$GLOBAL_CONFIG['pub_key'];)

			var publicKey = '-----BEGIN PUBLIC KEY-----';
			publicKey += 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBrBCRrxZQruu7KWd21Qjova/J';
			publicKey += 'rBEfyLhjSmZeCBPn8GfT5sj5yFrJuHK/IIncRtiRN2mNZnhWMnEqjv3k93TmUcKy';
			publicKey += 'MMRp4COEzqgdSguVf+szQ9KbvCJwvoGhghaAPJjhmiAe8LrleH4p6aAal3bzEUna';
			publicKey += '2UvbhYzaqbpNLHMYowIDAQAB';
			publicKey += '-----END PUBLIC KEY-----';

		3、	组件中塞入公钥
			var encrypt = new JSEncrypt();
			encrypt.setPublicKey(publicKey);

		4、生成加密后的字符串
			var p = encrypt.encrypt('dongyukuan123');

	*/

/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*!
	 * jQuery Placeholder Plugin v2.3.1
	 * https://github.com/mathiasbynens/jquery-placeholder
	 *
	 * Copyright 2011, 2015 Mathias Bynens
	 * Released under the MIT license
	 */


	    /****
	     * Allows plugin behavior simulation in modern browsers for easier debugging. 
	     * When setting to true, use attribute "placeholder-x" rather than the usual "placeholder" in your inputs/textareas 
	     * i.e. <input type="text" placeholder-x="my placeholder text" />
	     */
	    var debugMode = false; 

	    // Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
	    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
	    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini && !debugMode;
	    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini && !debugMode;
	    var valHooks = $.valHooks;
	    var propHooks = $.propHooks;
	    var hooks;
	    var placeholder;
	    var settings = {};

	    if (isInputSupported && isTextareaSupported) {

	        placeholder = $.fn.placeholder = function() {
	            return this;
	        };

	        placeholder.input = true;
	        placeholder.textarea = true;

	    } else {

	        placeholder = $.fn.placeholder = function(options) {

	            var defaults = {customClass: 'placeholder'};
	            settings = $.extend({}, defaults, options);

	            return this.filter((isInputSupported ? 'textarea' : ':input') + '[' + (debugMode ? 'placeholder-x' : 'placeholder') + ']')
	                .not('.'+settings.customClass)
	                .not(':radio, :checkbox, [type=hidden]')
	                .bind({
	                    'focus.placeholder': clearPlaceholder,
	                    'blur.placeholder': setPlaceholder
	                })
	                .data('placeholder-enabled', true)
	                .trigger('blur.placeholder');
	        };

	        placeholder.input = isInputSupported;
	        placeholder.textarea = isTextareaSupported;

	        hooks = {
	            'get': function(element) {

	                var $element = $(element);
	                var $passwordInput = $element.data('placeholder-password');

	                if ($passwordInput) {
	                    return $passwordInput[0].value;
	                }

	                return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
	            },
	            'set': function(element, value) {

	                var $element = $(element);
	                var $replacement;
	                var $passwordInput;

	                if (value !== '') {

	                    $replacement = $element.data('placeholder-textinput');
	                    $passwordInput = $element.data('placeholder-password');

	                    if ($replacement) {
	                        clearPlaceholder.call($replacement[0], true, value) || (element.value = value);
	                        $replacement[0].value = value;

	                    } else if ($passwordInput) {
	                        clearPlaceholder.call(element, true, value) || ($passwordInput[0].value = value);
	                        element.value = value;
	                    }
	                }

	                if (!$element.data('placeholder-enabled')) {
	                    element.value = value;
	                    return $element;
	                }

	                if (value === '') {
	                    
	                    element.value = value;
	                    
	                    // Setting the placeholder causes problems if the element continues to have focus.
	                    if (element != safeActiveElement()) {
	                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
	                        setPlaceholder.call(element);
	                    }

	                } else {
	                    
	                    if ($element.hasClass(settings.customClass)) {
	                        clearPlaceholder.call(element);
	                    }

	                    element.value = value;
	                }
	                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
	                return $element;
	            }
	        };

	        if (!isInputSupported) {
	            valHooks.input = hooks;
	            propHooks.value = hooks;
	        }

	        if (!isTextareaSupported) {
	            valHooks.textarea = hooks;
	            propHooks.value = hooks;
	        }

	        $(function() {
	            // Look for forms
	            $(document).delegate('form', 'submit.placeholder', function() {
	                
	                // Clear the placeholder values so they don't get submitted
	                var $inputs = $('.'+settings.customClass, this).each(function() {
	                    clearPlaceholder.call(this, true, '');
	                });

	                setTimeout(function() {
	                    $inputs.each(setPlaceholder);
	                }, 10);
	            });
	        });

	        // Clear placeholder values upon page reload
	        $(window).bind('beforeunload.placeholder', function() {

	            var clearPlaceholders = true;

	            try {
	                // Prevent IE javascript:void(0) anchors from causing cleared values
	                if (document.activeElement.toString() === 'javascript:void(0)') {
	                    clearPlaceholders = false;
	                }
	            } catch (exception) { }

	            if (clearPlaceholders) {
	                $('.'+settings.customClass).each(function() {
	                    this.value = '';
	                });
	            }
	        });
	    }

	    function args(elem) {
	        // Return an object of element attributes
	        var newAttrs = {};
	        var rinlinejQuery = /^jQuery\d+$/;

	        $.each(elem.attributes, function(i, attr) {
	            if (attr.specified && !rinlinejQuery.test(attr.name)) {
	                newAttrs[attr.name] = attr.value;
	            }
	        });

	        return newAttrs;
	    }

	    function clearPlaceholder(event, value) {
	        
	        var input = this;
	        var $input = $(this);
	        
	        if (input.value === $input.attr((debugMode ? 'placeholder-x' : 'placeholder')) && $input.hasClass(settings.customClass)) {
	            
	            input.value = '';
	            $input.removeClass(settings.customClass);

	            if ($input.data('placeholder-password')) {

	                $input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));
	                
	                // If `clearPlaceholder` was called from `$.valHooks.input.set`
	                if (event === true) {
	                    $input[0].value = value;

	                    return value;
	                }

	                $input.focus();

	            } else {
	                input == safeActiveElement() && input.select();
	            }
	        }
	    }

	    function setPlaceholder(event) {
	        var $replacement;
	        var input = this;
	        var $input = $(this);
	        var id = input.id;

	        // If the placeholder is activated, triggering blur event (`$input.trigger('blur')`) should do nothing.
	        if (event && event.type === 'blur' && $input.hasClass(settings.customClass)) {
	            return;
	        }

	        if (input.value === '') {
	            if (input.type === 'password') {
	                if (!$input.data('placeholder-textinput')) {
	                    
	                    try {
	                        $replacement = $input.clone().prop({ 'type': 'text' });
	                    } catch(e) {
	                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
	                    }

	                    $replacement
	                        .removeAttr('name')
	                        .data({
	                            'placeholder-enabled': true,
	                            'placeholder-password': $input,
	                            'placeholder-id': id
	                        })
	                        .bind('focus.placeholder', clearPlaceholder);

	                    $input
	                        .data({
	                            'placeholder-textinput': $replacement,
	                            'placeholder-id': id
	                        })
	                        .before($replacement);
	                }

	                input.value = '';
	                $input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', $input.data('placeholder-id')).show();

	            } else {
	                
	                var $passwordInput = $input.data('placeholder-password');

	                if ($passwordInput) {
	                    $passwordInput[0].value = '';
	                    $input.attr('id', $input.data('placeholder-id')).show().nextAll('input[type="password"]:last').hide().removeAttr('id');
	                }
	            }

	            $input.addClass(settings.customClass);
	            $input[0].value = $input.attr((debugMode ? 'placeholder-x' : 'placeholder'));

	        } else {
	            $input.removeClass(settings.customClass);
	        }
	    }

	    function safeActiveElement() {
	        // Avoid IE9 `document.activeElement` of death
	        try {
	            return document.activeElement;
	        } catch (exception) {}
	    }

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {function checkLoginStatus() {
		var cookieVal = $_CONFIG.prefix + "userId";
		if ($_CONFIG.islogin !== '0' && $.cookie(cookieVal)) { //登录
			return true;
		} else {
			return false;
		}
	}

	module.exports = checkLoginStatus;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {
	/**
	 * [使用方法]
	 * http://api.jquery.com/jQuery.Callbacks/
	 */
	var topics = {};

	var Pubsub = function(channel) {
	    var callbacks, 
	        method,
	        topic = channel && topics[channel];

	    if (!topic) {
	        callbacks = jQuery.Callbacks();
	        topic = {
	            pub: callbacks.fire,
	            sub: callbacks.add,
	            unsub: callbacks.remove
	        };
	        if (channel) {
	            topics[channel] = topic;
	        }
	    }
	    return topic;
	};

	module.exports = Pubsub;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 54:
/***/ function(module, exports) {

	// 发送统计数据,统一调用

	var setPageId = function(id){
		window._page_id_ = id;
	};

	var setPageName = function(name){
		window._page_name_ = name;
	};

	// 数据统计用
	var map = {
		home: {
			id: 'A001',
			name: '大首页'
		},
		groupList: {
			id: 'B001',
			name: '圈子列表页'
		},
		group: {
			id: 'B002',
			name: '圈子主页'
		},
		topicDetail: {
			id: 'B003',
			name: '话题详情页'
		},
		publishTopic: {
			id: 'B004',
			name: '发布话题'
		},
		createGroup: {
			id: 'B005',
			name: '创建圈子'
		},
		commodityDetail: {
			id: 'C001',
			name: '商品详情'
		},
		shopDetail: {
			id: 'C002',
			name: '店铺详情'
		},
		/* 搜索 */
		searchGroup: {
			id: 'D007',
			name: '圈子搜索'
		},
		searchTopic: {
			id: 'D008',
			name: '话题搜索'
		},
		searchShop: {
			id: 'D009',
			name: '店铺搜索'
		},
		/* 登录,注册,找回密码等 */
		login: {
			id: 'E001',
			name: '登录'
		},
		register: {
			id: 'E002',
			name: '注册'
		},
		nickname: {
			id: 'E003',
			name: '填写昵称、推荐码'
		},
		/*registerComplete: {
			id: 'E004',
			name: '注册完成'
		},*/
		relevancePhone: {
			id: 'E005',
			name: '关联手机号'
		},
		bindTelNum: {
			id: 'E006',
			name: '绑定手机号'
		},
		forgetPwd: {
			id: 'E007',
			name: '忘记密码'
		},
		newPwd: {
			id: 'E009',
			name: '设置新密码'
		},
		/*newPwd: {
			id: 'E010',
			name: '重置完成'
		}*/
		/* 个人中心 */
		ucenter: {
			id: 'F001',
			name: '个人中心首页'
		},
		uc_circle: {
			id: 'F002',
			name: '个人中心-我的圈子'
		},
		uc_topics: {
			id: 'F003',
			name: '个人中心-我的话题'
		},
		uc_orders: {
			id: 'F004',
			name: '个人中心-我的订单'
		},
		/*
		优惠券页面没有引用page级的脚本,所以埋在页面上
		因为收藏用的是一个模版,所以也埋在页面上
		uc_coupon: {
			id: 'F005',
			name: '个人中心-我的优惠券'
		},
		uc_: {
			id: 'F006',
			name: '个人中心-商品收藏'
		},
		newPwd: {
			id: 'F007',
			name: '个人中心-店铺收藏'
		},
		newPwd: {
			id: 'F008',
			name: '个人中心-话题收藏'
		},
		*/
		uc_setPwd: {
			id: 'F009',
			name: '个人中心-修改密码'
		},
		uc_address: {
			id: 'F010',
			name: '个人中心-收货地址'
		},
		uc_afterService: {
			id: 'F011',
			name: '个人中心-退款售后'
		},
		/* 购物车 */
		shoppingCart: {
			id: 'G001',
			name: '购物车'
		},
		/* 确认订单 */
		confirmOrder: {
			id: 'G002',
			name: '确认订单'
		},
		/* 收银台 */
		payDetail: {
			id: 'G003',
			name: '收银台'
		},
		paycode: {
			id: 'G004',
			name: '支付页面(微信)'
		}
	};

	var setPageData = function(name){
		var data = map[name];
		if(data){
			setPageId(data.id);
			setPageName(data.name);
		}
	};

	module.exports = {
		setPageData: setPageData
	};

/***/ },

/***/ 68:
/***/ function(module, exports) {

	/**
	 * 定义所有的页面的pub/sub通道
	 */

	var channels = {
		// 确认订单页
		confirmOrder: {
			invoice: 'change', // 发票信息发生变化时
			changeUseTickets: 'changeUseTickets', // 改变使用优惠券时
			setGomeCoin: 'setGomeCoin', // 改变国美币使用状态时
			setFinalPrice: 'setFinalPrice', // 设置最终价格信息
			couponsList: 'couponsList', // 优惠券列表
			gomeMoney: 'gomeMoney' // 使用的国美币金额
		},
		postTopic: {
			selectCircle: 'done' // 圈子选择完毕
		},
		//发话题
		setPubliser: {
			changedItem: 'changeItem', //选择商品弹窗
			changeImage: 'uploadImg', //图片上传弹窗
			delItem: 'delItem' // 删除已插入的商品
		},
		//购物车
		shopCar: {
			headerShopCar: 'addShopCar', // 更新商品数量
			cartListGoods: 'cartListGoods' // 购物车选择的商品列表信息改变时
		},
		comment:{
			enableEditor: 'enableEditor'
		}
	};

	module.exports = channels;

/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {//返回顶部
	var init = function(els, showHight) {
		var $els = els || $("[data-node=top]");
		var hight = showHight || 200;
		$els.hide();
		$els.click(function() {
			$('body,html').animate({
				scrollTop: 0
			}, 300);
			return false;
		});
		$(window).scroll(function() {
			if ($(this).scrollTop() > hight) {
				$els.show();
			} else if ($(this).scrollTop() < hight) {
				$els.hide();
			}
		});
	};
	init();	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*!
	 * jQuery Cookie Plugin v1.4.1
	 * https://github.com/carhartl/jquery-cookie
	 *
	 * Copyright 2013 Klaus Hartl
	 * Released under the MIT license
	 */

	var pluses = /\+/g;

	function encode(s) {
	    return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
	    return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
	    return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
	    if (s.indexOf('"') === 0) {
	        // This is a quoted cookie as according to RFC2068, unescape...
	        s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
	    }

	    try {
	        // Replace server-side written pluses with spaces.
	        // If we can't decode the cookie, ignore it, it's unusable.
	        // If we can't parse the cookie, ignore it, it's unusable.
	        s = decodeURIComponent(s.replace(pluses, ' '));
	        return config.json ? JSON.parse(s) : s;
	    } catch (e) {}
	}

	function read(s, converter) {
	    var value = config.raw ? s : parseCookieValue(s);
	    return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function(key, value, options) {

	    // Write

	    if (value !== undefined && !$.isFunction(value)) {
	        options = $.extend({}, config.defaults, options);

	        if (typeof options.expires === 'number') {
	            var days = options.expires,
	                t = options.expires = new Date();
	            t.setTime(+t + days * 864e+5);
	        }

	        return (document.cookie = [
	            encode(key), '=', stringifyCookieValue(value),
	            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
	            options.path ? '; path=' + options.path : '',
	            options.domain ? '; domain=' + options.domain : '',
	            options.secure ? '; secure' : ''
	        ].join(''));
	    }

	    // Read

	    var result = key ? undefined : {};

	    // To prevent the for loop in the first place assign an empty array
	    // in case there are no cookies at all. Also prevents odd result when
	    // calling $.cookie().
	    var cookies = document.cookie ? document.cookie.split('; ') : [];

	    for (var i = 0, l = cookies.length; i < l; i++) {
	        var parts = cookies[i].split('=');
	        var name = decode(parts.shift());
	        var cookie = parts.join('=');

	        if (key && key === name) {
	            // If second argument (value) is a function it's a converter...
	            result = read(cookie, value);
	            break;
	        }

	        // Prevent storing a cookie that we couldn't decode.
	        if (!key && (cookie = read(cookie)) !== undefined) {
	            result[name] = cookie;
	        }
	    }

	    return result;
	};

	config.defaults = {};

	$.removeCookie = function(key, options) {
	    if ($.cookie(key) === undefined) {
	        return false;
	    }

	    // Must not alter options, thus extending a fresh object...
	    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
	    return !$.cookie(key);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var searchInit = __webpack_require__(285);
	var Pubsub = __webpack_require__(43);
	var channel = __webpack_require__(68);
	var loginPop = __webpack_require__(3);
	var checkLoginStatus = __webpack_require__(42);

	var init = function() {
	    var $header = $('div[data-node="header"]');
	    var $messageBtn = $header.find('a[data-node="message"]');
	    var $buycar = $header.find('[data-node="buycar"]');
	    var $dialog = $('div[data-node="dialogcode"]');
	    var $dialogClose = $dialog.find('a[data-node="dialogCodeClose"]');
	    // APP下载二维码按钮,用于发送统计数据
	    var $dlQRCode = $header.find('[data-node="dlQRCode"]');

	    searchInit('input[data-node="selector"]');

	    //二维码弹窗
	    $(document).on('click', '[data-node="dialogCodeClose"]', function() {
	        $dialog.hide();
	    });

	    //二维码弹窗
	    $('[data-action="codeDialog"]').on('click', function() {
	        if ($dialog.length > 0) {
	            $dialog.show().find('p').html($(this).attr('data-value'));
	        } else {
	            var html = '<div class="windows-bg" data-node="dialogcode">' + '<div class="windows-ma">' + '<a href="javascript:;" data-node="dialogCodeClose" class="icon icon-close">&#xea5a;</a>' + '<img src="https://js.meixincdn.com/m/pc/dist/images/public/down-ma.png">' + '<p data-node="test" data-value="查看订单、物流信息、办理退换货请下载国美+APP<br/>客服电话：010-57098333">' + $(this).attr('data-value') + '</p>' + '</div>' + '</div>';
	            $('body').append(html);
	            $dialog = $('div[data-node="dialogcode"]');
	        }
	        return false;
	    });
	    //购物车
	    Pubsub(channel.shopCar.headerShopCar).sub(function(data) {

	        var itemNum = parseInt($_CONFIG.cartProdNumReal);
	        $_CONFIG.cartProdNumReal = itemNum + data.proNum;
	        if (itemNum + data.proNum <= 99) {
	            $buycar.text(itemNum + data.proNum);
	        } else if (itemNum + data.proNum > 99) {
	            $buycar.text('99+');
	        }
	    });

	    $('[data-node="_cart_"]').on("click", function() {
	        if (!checkLoginStatus()) {
	            var href = $(this).attr("href");
	            loginPop({
	                onLogin: function() {
	                    window.location.href = href;
	                }
	            })
	            return false;
	        }
	    })

	    $('[data-action="feedback"]').on("click", function() {
	        if (!checkLoginStatus()) {
	            var href = $(this).attr("href");
	            loginPop({
	                onLogin: function() {
	                    window.open(href);
	                }
	            })
	            return false;
	        }
	    })
	    // 统计数据
	    $dlQRCode.on('mouseenter', function() {
	        if (window.BP) {
	            BP.send({
	                event_id: 'B000P003'
	            });
	        }
	    });
	};

	init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var $header = $('div[data-node="header"]'),
	    $listBox = $header.find('div[data-node="selectList"]'),
	    $selectBox = $header.find('p[data-node="selectbtn"]'),
	    $selected = $selectBox.find('span[data-node="selected"]'),
	    $searchInput,
	    $searchBtn = $header.find('[data-node="searchbtn"]'),
	    timer = null;

	// var indexOf = require('lodash/indexOf');
	var selector = {
	    'index': ['goods', '商品'],
	    'topics': ['topic', '话题'],
	    'group': ['group', '圈子'],
	    'shop': ['shop', '店铺']
	};
	var searchUrl = {
	    'group': $_CONFIG.group_domain + 'search/group?word=',
	    'goods': $_CONFIG.mall_domain + 'search/index?word=',
	    'topic': $_CONFIG.group_domain + 'search/topics?word=',
	    'shop': $_CONFIG.mall_domain + 'search/shop?word='
	};
	var bp_types = {
	    'group': 'group',
	    'goods': 'product'
	};
	var analytic = function(keyWord, s_type) { // 发送埋点数据
	    BP.send({
	        event_id: 'B000P009',
	        s_word: keyWord,
	        s_type: s_type
	    });
	};

	var searchKeyword = function(obj) {
	    var location = window.location.href;
	    var keyWord = encodeURIComponent($.trim(obj.value)),
	        _type = $selected.attr('data-selected');
	    if (keyWord !== '') {

	        if (location.indexOf('/search/') !== -1 && location.indexOf('word=') !== -1) {
	            window.location.href = searchUrl[_type] + keyWord;
	        } else {
	            window.open(searchUrl[_type] + keyWord);
	        }
	        analytic(keyWord, bp_types[_type]);
	    }
	}


	var init = function(node) {


	    $searchInput = $header.find(node);
	    //搜索下拉框选择
	    $listBox.on('click', 'a', function() {
	        var _this = $(this);
	        $selected.text($(this).text()).attr('data-selected', _this.attr('data-selector'));
	        $listBox.hide();
	    });

	    //搜索悬停
	    $selectBox.hover(function() {
	        $listBox.show();
	    }, function() {
	        timer = setTimeout(function() {
	            $listBox.hide();
	        }, 50);
	    });

	    //下拉框悬停
	    $listBox.hover(function() {
	        clearTimeout(timer);
	    }, function() {
	        $listBox.hide();
	    });

	    //搜索框
	    $searchInput.placeholder();

	    //搜索框enter
	    $searchInput.on('keydown', function(e) {
	        var keycode = e.which;
	        //处理回车的情况 
	        if (keycode === 13) {
	            searchKeyword(this);
	        }
	    });

	    //搜索按钮
	    $searchBtn.on('click', function() {
	        searchKeyword($searchInput[0]);
	    });

	}
	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }

/******/ });