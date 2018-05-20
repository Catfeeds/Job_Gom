webpackJsonp([46],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	$(function () {
		//上下架
		__webpack_require__(335).init();
		//加载更多
		__webpack_require__(336).init();
		//图片加载
		__webpack_require__(337).init();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/*
	 * 弹层提示弹窗
	 * zhaodonghong
	 */
	
	var $publicMask;
	var $publicTips;
	var timer;
	
	var events = function events() {
	
	    $publicMask.off().on('click', function () {
	        $publicMask.hide();
	        $publicTips.hide();
	    });
	
	    $publicTips.off().on('click', function () {
	        $publicMask.hide();
	        $publicTips.hide();
	    });
	};
	
	/**
	 * msg string 提示信息
	 * options object 
	 * options.duration settimout消失时间
	 * options.callback 提示消失的回调
	*/
	var init = function init(msg, options) {
	    var defaults = {
	        duration: 2000,
	        callback: function callback() {}
	    };
	
	    $.extend(defaults, options || {});
	
	    clearTimeout(timer);
	    $publicMask = $('[data-action="publicMask"]');
	    $publicTips = $('[data-action="publicTips"]');
	
	    if ($publicMask.length > 0) {
	
	        $publicMask.show();
	        $publicTips.show().text(msg);
	    } else {
	
	        $('body').append('<div data-action="publicMask" class="ordi-toast"></div><div class="ordi-toast-txt" data-action="publicTips">' + msg + '</div>');
	        $publicMask = $('[data-action="publicMask"]');
	        $publicTips = $('[data-action="publicTips"]');
	        events();
	    }
	
	    $publicTips.css('margin', -$publicTips[0].offsetHeight / 2 + 'px 0 0 ' + -$publicTips.width() / 2 + 'px');
	
	    timer = setTimeout(function () {
	
	        $publicMask.hide();
	        $publicTips.hide();
	
	        defaults.callback();
	    }, defaults.duration);
	};
	
	module.exports = {
	    init: init,
	    events: events
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var fetch = __webpack_require__(21);
	var hint = __webpack_require__(43);
	var url = __webpack_require__(24);
	module.exports = {
		init: function init() {
			$('.J-goods-list').on('click', '.J-good-sold', function () {
				var _this = $(this);
				if (!_this.hasClass('solding')) {
					_this.addClass('solding');
					var status = _this.attr('data-status');
					status === '0' ? _this.text('上架中...') : _this.text('下架中...');
					fetch.get(url.get('soldInOut'), {
						data: {
							shopId: $_CONFIG.shopId,
							itemId: _this.attr('data-itemId'),
							skuId: _this.attr('data-skuId'),
							identification: _this.attr('data-identification'),
							status: status
						}
					}).then(function (result) {
						if (result && result.code === 200) {
							var notcie = status === '0' ? '已上架' : '上架';
							var className = status === '0' ? 'user-goods-down J-good-sold' : 'user-goods-up J-good-sold';
							var _status = status === '0' ? '1' : '0';
							$('[data-itemId="' + _this.attr('data-itemId') + '"]').text(notcie).attr('class', className).attr('data-status', _status);
						} else {
							hint.init('抱歉，操作失败，请重试');
							status === '0' ? _this.text('上架') : _this.text('已上架');
						}
						_this.removeClass('solding');
					}, function () {
						hint.init('抱歉，操作失败，请重试');
						_this.removeClass('solding');
					});
				}
			});
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var hint = __webpack_require__(43);
	var pageNum = 2;
	var featuredList = null;
	//添加html
	function appendHtml(data, type, callback) {
	    var html = '';
	    for (var i = 0, len = data.length; i < len; i++) {
	
	        var url = 'https://item.gome.com.cn/' + data[i].id + '-' + data[i].skuID + '.html?' + (data[i].trId ? 'stid=' + data[i].trId : '') + '&mid=' + $_CONFIG.shopId;
	        html += '<li>\n                  \t<div class="clearfix user-goods-good">\n                  \t\t<a href="' + url + '" target="_blank">\n                  \t\t\t<img src="' + data[i].imageUrl + '">\n                  \t\t</a>\n                  \t</div>\n                  \t<div class="clearfix user-goods-goods">';
	        if (data[i].flag === 1) {
	            html += '<span class="user-goods-main">自营</span>';
	        } else if (data[i].flag === 2) {
	            html += '<span class="user-goods-rival">海外购</span>';
	        } else if (data[i].flag === 3) {
	            html += '<span class="user-goods-shop">门店</span>';
	        }
	        html += '<a href="' + url + '" target="_blank" title="' + data[i].name + '">' + data[i].name + '</a>\n                  \t</div>\n                  \t<div class="user-goods-priceBox clearfix">\n                  \t\t<span class="user-goods-price">\uFFE5' + /*(type === '0' ? Number(data[i].price, 10).toFixed(2) : data[i].price)*/data[i].price + ' </span>\n                  \t</div>\n                  \t<div class="user-goods-info clearfix">\n                      \t<span class="user-goods-ret">\n                      \t\t<span>\u4F63\u91D1</span>\n                      \t\t<span class="user-goods-rnum">\u6700\u9AD8\uFFE5' + (parseInt(data[i].commission) / 100).toFixed(2) + '</span>\n                      \t</span>\n                    </div>\n                    <div class="up-btn">\n                      <a class="user-goods-' + (data[i].onShelf ? 'down' : 'up') + ' J-good-sold" href="javascript:;" data-itemid="' + data[i].id + '" data-skuid="' + data[i].skuID + '" data-identification="' + data[i].identification + '" data-status="' + Number(data[i].onShelf) + '"> ' + (data[i].onShelf ? "已" : "") + '\u4E0A\u67B6</a>\n                    </div>\n                </li>';
	    }
	    $('.J-goods-list').append(html);
	    //图片加载
	    __webpack_require__(337).init();
	    callback.call();
	}
	
	module.exports = {
	    init: function init() {
	        $('.J-goods-getMore').on('click', function () {
	            var _this = $(this);
	            if (!_this.find('.user-goods-moreLoding').length && !_this.hasClass('user-goods-normal')) {
	                _this.addClass('more-loading');
	                _this.html('<span class="user-goods-moreLoding">加载中...</span>');
	                if (!featuredList && $_CONFIG.type !== 0) {
	                    fetch.get(url.get('hotGoods') + $_CONFIG.type + '&pageNum=' + pageNum, {}).then(function (result) {
	                        if (result) {
	                            if ($_CONFIG.type !== '0') {
	                                appendHtml(result.items, $_CONFIG.type, function () {
	                                    var loadHtml = result.items.length == 0 ? '没有更多商品了' : '<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>';
	                                    var normal = result.items.length == 0 ? 'user-goods-normal' : '';
	                                    _this.html(loadHtml).addClass(normal);
	                                    pageNum++;
	                                });
	                            } else {
	
	                                featuredList = result;
	                                featuredList.items.splice(0, 18);
	                                appendHtml(featuredList.items.splice(0, 18), $_CONFIG.type, function () {
	                                    var loadHtml = '<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>';
	                                    _this.html(loadHtml);
	                                });
	                            }
	                        }
	                    }, function (result) {
	                        hint.init('数据获取失败，请重试');
	                        _this.html('<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>');
	                    });
	                } else {
	                    console.log("2");
	                    appendHtml(featuredList.items.splice(0, 18), $_CONFIG.type, function () {
	                        var loadHtml = featuredList.items.length == 0 ? '没有更多商品了' : '<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>';
	                        var normal = featuredList.items.length == 0 ? 'user-goods-normal' : '';
	                        _this.html(loadHtml).addClass(normal);
	                    });
	                }
	            }
	        });
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2)))

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	//图片预加载
	module.exports = {
		init: function init() {
			$('.J-goods-list img').on('load', function () {
				$(this).attr('src').indexOf('opacity4') === -1 && $(this).css('background', 'none');
			}).on('error', function () {
				$(this).attr('src', $_CONFIG.imgpath + '/images/public/opacity4.png');
			});
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ })

});
//# sourceMappingURL=userGoods.js.map