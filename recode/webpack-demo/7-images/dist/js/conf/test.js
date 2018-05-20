/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
console.log('src/js/page/test/index.js!!');
var tpl = __webpack_require__(2);

var dom = tpl({
	num:2
})

console.log(dom)

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var template=__webpack_require__(3);
module.exports=template('src/js/page/test/1',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,num=$data.num,$out='';$out+='<div>';
$out+=$escape(num);
$out+='</div>';
return new String($out);
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);