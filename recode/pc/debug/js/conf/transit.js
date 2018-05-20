webpackJsonp([31],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	
	function init() {
	    var $num = $("[data-node=timer]");
	    var $transitBtn = $("[data-node=transit-btn]");
	    var href = $GLOBAL_CONFIG['protocol'] + ':' + $GLOBAL_CONFIG['staSite'];
	    $transitBtn.attr("href", href);
	    var i = $num.html();
	    var timer = setInterval(function () {
	        i--;
	        if (i == 0) {
	            location.href = href;
	            clearInterval(timer);
	        }
	        $num.html(i);
	    }, 1000);
	}
	init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })
]);
//# sourceMappingURL=transit.js.map