webpackJsonp([29],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/**
	 * Created by dongyukuan on 2016/5/24.
	 */
	var CountDown = __webpack_require__(65);
	var $node = $('[data-node=countdown]');
	new CountDown(5, {
	    onChange: function onChange(num) {
	        $node.text(num + ' ');
	    },
	    onFinish: function onFinish() {
	        location.href = $_CONFIG['redirect'];
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 65:
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by dongyukuan on 2016/5/20.
	 * 参数：
	 *      num:从num开始倒计时
	 *      options:{onChange:倒计时过程中执行，onFinish:倒计时结束执行}
	 * 调用方式：new CountDown(num,{function onChange(num){},function onFinish(){}})
	 */
	var noop = function noop() {};
	var CountDown = function CountDown(count, options) {
	    this.onChange = options.onChange || noop;
	    this.onFinish = options.onFinish || noop;
	    this.count = count || 60;
	    this.start();
	};
	CountDown.prototype.start = function () {
	    var self = this;
	    setTimeout(function () {
	        self.onChange(self.count);
	        self.count--;
	        if (self.count <= 0) {
	            self.onFinish();
	        } else {
	            self.start();
	        }
	    }, 1000);
	};
	module.exports = CountDown;

/***/ }

});