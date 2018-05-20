webpackJsonp([54],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/**
	 * 微信支付扫码页面
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(37);

	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('paycode');

	// 每5秒监听一下支付状态
	// 每50秒重新请求支付二维码(刷新页面)

	var $tips = $('[data-node=tips]');

	var timerForStatus = null;
	var timerForReload = null;
	var statusTime = 5000;
	var expireTime = 50000;

	function checkStatus() {
	    fetch.post(url.get('weixinPayStatus'), {
	        data: {
	            tradeNo: $_CONFIG.tradeNo,
	            mergerId: $_CONFIG.mergerId
	        }
	    }).done(function (data) {
	        if (data.success === true) {
	            if (data.data.payState == 1) {

	                // 支付成功
	                $tips.html('支付成功<br/>二维码已完成支付');
	                clearTimeout(timerForStatus);
	                clearTimeout(timerForReload);
	                return;
	            } else {
	                clearTimeout(timerForStatus);
	                timerForStatus = setTimeout(checkStatus, statusTime);
	            }
	        } else {
	            clearTimeout(timerForStatus);
	            timerForStatus = setTimeout(checkStatus, statusTime);
	        }
	    }).fail(function () {
	        timerForStatus = setTimeout(checkStatus, statusTime);
	    });
	}

	function expire() {
	    alert('二维码已过期，请刷新页面重新获取二维码。', {
	        okValue: '刷新',
	        ok: function ok() {
	            // window.location.href = window.location.href;
	            location.reload();
	        }
	    });
	    clearTimeout(timerForStatus);
	}

	timerForStatus = setTimeout(checkStatus, statusTime);
	timerForReload = setTimeout(expire, expireTime);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }
]);