webpackJsonp([43],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * 查看物流
	 * @author Zhengchun Fu
	 */
	var contactMerchant = __webpack_require__(324);
	var $contactMerchantNode = $('[data-action=ContactMerchant]');

	$contactMerchantNode.on('click', function () {
	  contactMerchant();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	/**
	 * 联系商家
	 * @author Zhengchun Fu
	 */
	var alert = __webpack_require__(37);
	var contactMerchant = function contactMerchant() {
		var $imgPath = $_CONFIG.imgpath;
		alert('', {
			okCls: 'hide',
			content: '<div class="sm-download"><img src="' + $imgPath + '/images/public/ma1.jpg"><p>扫描二维码，下载国美PlusAPP联系商家</p></div>'
		});
	};

	module.exports = contactMerchant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }

});