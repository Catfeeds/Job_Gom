webpackJsonp([16],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	 * 抢红包活动
	 * @author QiaoLi
	 */
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var prizesList = __webpack_require__(198);
	
	var $total = $('[data-node=total]');
	var $prizesList = $('[data-node=prizesList]');
	
	//获取中奖总金额
	var getTotal = function getTotal() {
	    fetch.get(url.get('getTotalAmount')).done(function (data) {
	        if (data.success === true) {
	            $total.text(data.data.total_amount);
	            timer(getTotal);
	        } else {
	            timer(getTotal);
	        }
	    }).fail(function () {
	        timer(getTotal);
	    });
	};
	
	//获取单次中奖金额大于20元的记录
	var getPrizesList = function getPrizesList() {
	    fetch.get(url.get('getPrizesList')).done(function (data) {
	        if (data.success === true) {
	            $prizesList.html(prizesList({
	                prizes: data.data
	            }));
	            listScroll();
	            timer(getPrizesList);
	        } else {
	            timer(getPrizesList);
	        }
	    }).fail(function () {
	        timer(getPrizesList);
	    });
	};
	
	var timer = function timer(fn) {
	    fn.timer = null;
	    clearTimeout(fn.timer);
	    fn.timer = setTimeout(fn, 180000);
	};
	
	var listTimer = null;
	var listScroll = function listScroll() {
	    var listHTML = $prizesList.html();
	    var listHeight = $prizesList.height();
	    var listWrapHeight = 141;
	    var offset = 1;
	    var top = 0;
	    var speed = 30;
	
	    if (listHeight > listWrapHeight) {
	        listHTML += listHTML;
	        $prizesList.html(listHTML);
	
	        var scroll = function scroll() {
	            top = top - offset;
	            if (top <= -listHeight) {
	                top = 0;
	            }
	            $prizesList.css('top', top);
	            clearTimeout(listTimer);
	            listTimer = setTimeout(scroll, speed);
	        };
	        scroll();
	    }
	};
	
	var init = function init() {
	    timer(getTotal);
	    timer(getPrizesList);
	    listScroll();
	};
	init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 34:
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

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/redpacket/prizesList',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,prizes=$data.prizes,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(prizes,function(value,$index){
	$out+=' <li>';
	$out+=$escape(value.message);
	$out+='</li> ';
	});
	return new String($out);
	});

/***/ })

});
//# sourceMappingURL=redpacket.js.map