webpackJsonp([36],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	 * 查看物流
	 * @author Zhengchun Fu
	 */
	var contactMerchant = __webpack_require__(294);
	var $contactMerchantNode = $('[data-action=ContactMerchant]');
	
	$contactMerchantNode.on('click', function () {
	  contactMerchant();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var Dialog = __webpack_require__(37);
	var noop = function noop() {};
	
	var create = function create(content, options) {
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
	    if (!options.title) {
	        title.css('borderBottom', 'none');
	    }
	    header.show();
	    d.show();
	    return d;
	};
	
	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';
	
	/**
	 * 联系商家
	 * @author Zhengchun Fu
	 */
	var alert = __webpack_require__(36);
	var contactMerchant = function contactMerchant() {
		var $imgPath = $_CONFIG.imgpath;
		alert('', {
			okCls: 'hide',
			content: '<div class="sm-download"><img src="' + $imgPath + '/images/public/ma1.jpg"><p>扫描二维码，下载国美APP联系商家</p></div>'
		});
	};
	
	module.exports = contactMerchant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ })

});
//# sourceMappingURL=uc_logistics.js.map