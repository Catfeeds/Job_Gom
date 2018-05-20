webpackJsonp([25],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * 抢红包活动
	 * @author QiaoLi
	 */

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var prizesList = __webpack_require__(241);

	var $total = $('[data-node=total]');
	var $prizesList = $('[data-node=prizesList]');
	var timerForStatus = null;

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
	        (function () {
	            var scroll = function scroll() {
	                top = top - offset;
	                if (top <= -listHeight) {
	                    top = 0;
	                }
	                $prizesList.css('top', top);
	                clearTimeout(listTimer);
	                listTimer = setTimeout(scroll, speed);
	            };

	            listHTML += listHTML;
	            $prizesList.html(listHTML);

	            scroll();
	        })();
	    }
	};

	var init = function init() {
	    timer(getTotal);
	    timer(getPrizesList);
	    listScroll();
	};
	init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/redpacket/prizesList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,prizes=$data.prizes,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(prizes,function(value,$index){
	$out+=' <li>';
	$out+=$escape(value.message);
	$out+='</li> ';
	});
	return new String($out);
	});

/***/ }

});