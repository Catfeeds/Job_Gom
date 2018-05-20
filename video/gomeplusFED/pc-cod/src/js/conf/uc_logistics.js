webpackJsonp([36],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 查看物流
	 * @author Zhengchun Fu
	 */
	var contactMerchant = __webpack_require__(251);
	var $contactMerchantNode = $('[data-action=ContactMerchant]');

	$contactMerchantNode.on('click', function() {
		contactMerchant();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var Dialog = __webpack_require__(22);
	var noop = function() {};

	var create = function(content, options) {
	    var defaults = {
	        fixed: true,
	        modal: true,
	        content: '<p class="del-pop-p">' + content + '</p>',
	        className: 'pop-box',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        ok: noop,
	        cancel: noop,
	        btnWrapCls: 'two-buttons'
	    };
	    $.extend(true, defaults, options);

	    var d = Dialog(defaults);

	    // var header = d._$('header');
	    // var title = d._$('title');
	    // title.css('borderBottom', 'none');
	    // header.show();

	    d.show();
	    return d;
	};

	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 251:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {/**
	 * 联系商家
	 * @author Zhengchun Fu
	 */
	var confirm = __webpack_require__(53);
	var alert = __webpack_require__(36);
	var contactMerchant = function() {
		var $imgPath = $_CONFIG.imgpath;
		alert('', {
			okCls: 'hide',
			content: '<div class="sm-download"><img src="' + $imgPath + '/images/public/ma1.jpg"><p>描二维码，下载国美+APP联系商家</p></div>'
		});
	};

	module.exports = contactMerchant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }

});