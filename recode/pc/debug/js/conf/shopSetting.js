webpackJsonp([24],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(213).init();
	
	//分享
	__webpack_require__(214).init();
	//翻页
	__webpack_require__(216).init();
	//下架
	__webpack_require__(218).init();
	//图片加载

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

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	 * 分享到 微信，QQ，微博，空间
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var getQRCode = __webpack_require__(103);
	var checkLoginStatus = __webpack_require__(23);
	
	var APIS = {
	    qq: "http://connect.qq.com/widget/shareqq/index.html",
	    wb: "http://v.t.sina.com.cn/share/share.php",
	    qz: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"
	};
	
	var defaultInfo = {
	    url: 'https://group.gomeplus.com/',
	    title: '国美APP边玩边分享，购物不孤单',
	    pic: '../../images/public/logo.png', // logo图片地址
	    summary: '国美APP边玩边分享，购物不孤单'
	};
	
	var open = function open(url) {
	    window.open(url);
	};
	
	// 分享按钮渲染
	var hasShareBtnsHTML = false;
	var initShareBtns = function initShareBtns() {
	    var shareBtns = '<p data-node="shareBtnBox" class="share-down" style="z-index:21;"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" class="iconn-30"></em><em data-shareto="qq" class="iconn-32"></em><em data-shareto="sina" class="iconn-31"></em><em data-shareto="qzone" class="iconn-33"></em></span></span></p>';
	    $('body').append(shareBtns);
	    hasShareBtnsHTML = true;
	};
	var showShareToBtns = function showShareToBtns(style) {
	    !hasShareBtnsHTML && initShareBtns();
	    $('[data-node=shareBtnBox]').css({
	        left: style.x,
	        top: style.y
	    }).show();
	};
	
	// 微信弹层渲染
	var hasWeixinHTML = false;
	var initWeixinHTML = function initWeixinHTML() {
	
	    var weixinBox = '<div class="share-weixin"><div class="wx-mask"></div><div class="wx-main"><div class="wx-code"><span></span><img data-node="shareWeixinCode" alt="分享到微信" /></div><p>打开微信扫一扫，即可分享</p><a href="javascript:;" title="点击关闭" class="wx-close">×</a></div></div>';
	    $('body').append(weixinBox);
	    hasWeixinHTML = true;
	};
	
	// pics: 图片参数是否为pics，默认是pic。
	var formatParams = function formatParams(p, pics) {
	    var s = [];
	    var data = {
	        title: p.title,
	        url: p.url,
	        summary: p.summary,
	        //desc: p.desc,
	        site: p.site
	    };
	
	    for (var i in data) {
	        s.push(i + '=' + encodeURIComponent(data[i] || ''));
	    }
	    if (pics) {
	        s.push('pics=' + p.pic);
	    } else {
	        s.push('pic=' + p.pic);
	    }
	    return s.join('&');
	};
	
	// 单个调用方法
	// 分享的图片多个用||隔开。
	var shareTo = {
	    weixin: function weixin(options) {
	        var link = getQRCode(options.url);
	        !hasWeixinHTML && initWeixinHTML();
	
	        $('[data-node=shareWeixinCode]')[0].src = link;
	        $('.share-weixin').show();
	        $('.wx-close').on('click', function () {
	            $('.share-weixin').hide();
	        });
	    },
	    qq: function qq(options) {
	        var link = APIS.qq + '?' + formatParams(options, true);
	        open(link);
	    },
	    wb: function wb(options) {
	        var link = APIS.wb + '?' + formatParams(options);
	        open(link);
	    },
	    qz: function qz(options) {
	        var link = APIS.qz + '?' + formatParams(options, true);
	        open(link);
	    }
	};
	
	// share with kid
	var shareWithKid = function shareWithKid(args) {
	    var isRebate = args.isRebate === '0' ? false : true;
	    fetch.get(url.get('shareGetGoodsKid'), {
	        validate: isRebate,
	        data: {
	            skuId: args.skuId,
	            itemId: args.itemId,
	            parentKid: args.parentKid
	        },
	        async: false // 防止新窗口被拦截
	    }).done(function (data) {
	        if (data.success === true) {
	            var kid = data.data.kid;
	            var shareInfo = args.shareInfo;
	            // 替换分享链接
	            // 规则：mall_domain+product/shopid-productId.html?onlineUserId=xxxx&kid=xxxx
	            var url = shareInfo.url;
	            var index = url.indexOf('?');
	            if (index > 0) {
	                url = url.substring(0, index);
	            }
	            shareInfo.url = url + '?onlineUserId=' + shareInfo.onlineUserId + '&kId=' + kid;
	            shareTo[args.shareto](shareInfo);
	        } else {
	            shareTo[args.shareto](args.shareInfo);
	        }
	    }).fail(function () {
	        if (isRebate) {
	            if (checkLoginStatus()) {
	                shareTo[args.shareto](args.shareInfo);
	            }
	        } else {
	            shareTo[args.shareto](args.shareInfo);
	        }
	    });
	};
	
	// 统一方法
	var go = function go(obj) {
	    // {type:x,title:x,url:x,pic:x}
	    var info = {
	        title: obj.title || defaultInfo.title,
	        url: obj.url || defaultInfo.url,
	        pic: obj.pic || defaultInfo.pic,
	        summary: obj.summary || '',
	        desc: obj.desc || ''
	    };
	
	    !!shareTo[obj.type] && shareTo[obj.type](info);
	};
	
	/**
	 * 简化分享
	 * @param  {str} [parent] [容器节点]
	 * @param {str} [selector] [子节点选择器]
	 */
	var shareItem = function shareItem(parent, selector, beforeShare) {
	    var shareInfo = null;
	    var $item = null;
	    $item = typeof parent === 'string' ? $(parent) : parent;
	    selector = selector || '[data-action=shareto]';
	    // 显示分享按钮
	    $item.on('mouseenter', selector, function () {
	        var shareUrl = $(this).data('surl');
	        var shareTitle = $(this).data('stitle');
	        var sharePic = $(this).data('spic');
	
	        shareInfo = {
	            url: shareUrl,
	            title: shareTitle,
	            pic: sharePic
	        };
	
	        var pw = $(this).width();
	        var ph = $(this).height();
	        var px = $(this).offset().left / 1 + pw / 2 - 80 + 'px';
	        var py = $(this).offset().top / 1 + (ph - 1) + 'px';
	
	        showShareToBtns({
	            x: px,
	            y: py
	        });
	        return false;
	    });
	    // 隐藏分享按钮
	    $item.on('mouseleave', selector, function () {
	        $('[data-node=shareBtnBox]').hide();
	        return false;
	    });
	
	    $('body').on('click', '[data-shareto]', function (e) {
	        e.preventDefault();
	        var shareType = $(this).data('shareto');
	        shareInfo.type = shareType;
	        beforeShare = beforeShare || function () {};
	        beforeShare.call(null, shareInfo);
	        go(shareInfo);
	    });
	
	    $('body').on('mouseenter', '[data-node=shareBtnBox]', function () {
	        $(this).show();
	    });
	    $('body').on('mouseleave', '[data-node=shareBtnBox]', function () {
	        $(this).hide();
	    });
	};
	
	module.exports = {
	    share: go,
	    shareto: shareTo,
	    shareItem: shareItem,
	    shareWithKid: shareWithKid
	};
	
	/**
	 * 分享到 使用说明
	 * 在[data-action=shareto]节点上输出要获取的数据
	 * data-surl,data-stitle,data-spic
	 * url要是绝对地址，带https?://的
	 * pic是要分享的图片绝对地址，多张图片用||隔开。
	 *
	 * 页面中在分享按钮加 [data-action=shareto] 自定义属性；
	 * 如果是分享当前页面的也要加shareInfo,值为当前页面对应的信息。格式都一样。
	 *
	 * 调用方法:
	 * var share = require(..);
	 * share.shareItem(要分享的区域父节点字符串e.g. 'data-node=shareList');
	 *
	 * shareto.weixin({shareInfo})
	 * shareto.qq({shareInfo})
	 * shareto.sina({shareInfo})
	 * shareto.qzone({shareInfo})
	 *
	 *
	 * share.share({shareInfo});这个shareInfo里要有type：[weixin,qq,sina,qzone]
	 */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';
	
	// 根据字符串生成二维码
	var getQRCode = function getQRCode(url) {
	    return $_CONFIG.group_domain + 'ajax/qrcode/urlcode?url=' + encodeURIComponent(url);
	};
	
	module.exports = getQRCode;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	//图片预加载
	module.exports = {
		init: function init() {
			$('.J-shopSetting-list img').on('load', function () {
				$(this).attr('src').indexOf('opacity4') === -1 && $(this).css('background', 'none');
			}).on('error', function () {
				$(this).attr('src', $_CONFIG.imgpath + '/images/public/opacity4.png');
			});
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var showShare = __webpack_require__(215);
	//分享组件
	var shareto = __webpack_require__(102).shareto;
	
	module.exports = {
		init: function init() {
			var shareContent;
			showShare.init(function (data) {
				shareContent = data;
			});
			$('.J-share-sWrap').on('click', '.J-share-weixin', function () {
				shareto.weixin({
					url: shareContent.wurl,
					title: shareContent.title
				});
			}).on('click', '.J-share-qq', function () {
				shareto.qq({
					url: shareContent.url,
					title: shareContent.title,
					summary: shareContent.info,
					pic: shareContent.pic[0]
				});
			}).on('click', '.J-share-qzone', function () {
				shareto.qz({
					url: shareContent.url,
					title: shareContent.info ? '#' + shareContent.title + '#' + shareContent.info : '我心意的这款商品，到底还是在国美找到了。#' + shareContent.title + '# ' + shareContent.url,
					pic: shareContent.info ? shareContent.pic.join('|') : shareContent.pic[0]
				});
			}).on('click', '.J-share-sina', function () {
				shareto.wb({
					url: shareContent.url,
					title: shareContent.info ? '#' + shareContent.title + '#' + shareContent.info : '我心意的这款商品，到底还是在国美找到了。#' + shareContent.title + '# ' + shareContent.url,
					pic: shareContent.info ? shareContent.pic.join('||') : shareContent.pic[0]
				});
			});
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var shareTimer = null;
	var $shareBox = $('.J-share-sWrap');
	var $rightContent = $('.J-right-content');
	var shopName = $('.J-shopSetting-shopName').text();
	var shopInfo = $_CONFIG.shopDescription || '我发现了前所未有的好店，不如，你也来逛逛？';
	var $shopList = $('.J-shopSetting-list');
	var sharePic = [$('.J-shopSetting-shopLogo').attr('src')];
	var kid = '';
	//分享弹层显示
	function showShare(obj, callback) {
		//显示分享弹窗
		shareTimer && clearTimeout(shareTimer);
		var _this = $(obj);
		var boxLeft = $rightContent.offset().left;
		var boxTop = $rightContent.offset().top;
		var iconLeft = _this.offset().left;
		var iconTop = _this.offset().top;
		var iconWidth = _this.width();
		var iconHeight = _this.height();
		$shareBox.css({
			top: iconTop - boxTop + iconHeight + 10,
			left: iconLeft - boxLeft + iconWidth / 2 - 118
		});
		if (_this.hasClass('J-shopSetting-share')) {
			$shareBox.css('display') === 'none' && $shareBox.show();
			callback.call(obj, getShareContent($(obj)));
		} else {
			if (!_this.attr('data-kid')) {
				fetch.get(url.get('getKid'), {
					itemId: _this.attr('data-itemId'),
					skuId: _this.attr('data-skuId'),
					shopId: $_CONFIG.shopId
				}).then(function (result) {
					if (result) {
						_this.attr('data-kid', result.kid);
					}
	
					$shareBox.css('display') === 'none' && $shareBox.show();
					callback.call(obj, getShareContent($(obj)));
				}, function () {
	
					$shareBox.css('display') === 'none' && $shareBox.show();
				});
			} else {
	
				$shareBox.css('display') === 'none' && $shareBox.show();
				callback.call(obj, getShareContent($(obj)));
			}
		}
	}
	//获取分享数据
	function getShareContent(obj) {
		var shareContent = {};
		if (obj.hasClass('J-shopSetting-share')) {
			var $shopItems = $shopList.children();
			if ($shopItems.length > 0) {
				var len = $shopItems.length > 3 ? 3 : $shopItems.length;
				for (var i = 0; i < len; i++) {
					sharePic.push((/^http/.test($shopItems.eq(i).find('.J-shopSetting-goodsImg').attr('src')) ? "" : "http:") + $shopItems.eq(i).find('.J-shopSetting-goodsImg').attr('src'));
				}
			}
			shareContent = {
				title: shopName,
				info: shopInfo,
				wurl: obj.attr('share-url'),
				url: obj.attr('data-url'),
				pic: sharePic
			};
		} else {
			var $list = obj.parents('li').eq(0);
			shareContent = {
				title: $list.find('.J-shopSetting-goodName').text(),
				wurl: obj.attr('share-url') + '&kid=' + obj.attr('data-kid'),
				pic: [$list.find('.J-shopSetting-goodsImg').attr('src')],
				url: $list.find('.J-shopSetting-goodName').attr('href') + '&kid=' + obj.attr('data-kid')
			};
		}
		return shareContent;
	}
	module.exports = {
		init: function init(callback) {
			$rightContent.on('mouseenter', '.J-shopSetting-share,.J-shopSetting-shareBtn', function () {
				showShare(this, callback);
				// callback.call(this, getShareContent($(this)));
			}).on('mouseleave', '.J-shopSetting-share,.J-shopSetting-shareBtn', function () {
				shareTimer = setTimeout(function () {
					$shareBox.hide();
				}, 200);
			});
			$shareBox.hover(function () {
				clearTimeout(shareTimer);
			}, function () {
				$shareBox.hide();
			});
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';
	
	__webpack_require__(217);
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var pager = __webpack_require__(216);
	var hint = __webpack_require__(43);
	window.currentPage = 1;
	
	//日期格式化
	function dataFormat(data, space) {
		var date = new Date(data);
		var str = space || '-';
		return date.getFullYear() + str + (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + str + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
	}
	//获取字符长度（字节）
	function getStrLength(str) {
		return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
	}
	
	function getHtml(data) {
		var html = '';
		for (var i = 0, len = data.length; i < len; i++) {
			var url = 'https://item.gome.com.cn/' + data[i].item.id + '-' + data[i].skuId + '.html?' + (data[i].trId ? 'stid=' + data[i].trId : '') + '&mid=' + $_CONFIG.shopId;
			html += '<li>\n\t\t\t\t    <div class="clearfix user-shopSetting-good">\n\t\t\t\t        <a href="' + url + '" target="_blank">\n\t\t\t\t            <img src="' + data[i].item.mainImage + '" class="J-shopSetting-goodsImg">\n\t\t\t\t        </a>\n\t\t\t\t    </div>\n\t\t\t\t    <div class="clearfix user-shopSetting-goods">';
	
			if (data[i].item.flag === 1) {
				html += '<span class="user-shopSetting-main">自营</span>';
			} else if (data[i].item.flag === 2) {
				html += '<span class="user-shopSetting-rival">海外购</span>';
			} else if (data[i].item.flag === 3) {
				html += '<span class="user-shopSetting-shop">门店</span>';
			}
			html += '<a href="' + url + '" class="J-shopSetting-goodName" target="_blank" title="' + data[i].item.name + '">' + data[i].item.name + '</a>\n\t\t\t\t    </div>\n\t\t\t\t    <div class="user-shopSetting-priceBox clearfix">\n\t\t\t\t        <span class="user-shopSetting-price">\uFFE5' + (data[i].item.salePrice >= 1000000 ? ((data[i].item.salePrice / 1000000).toFixed(2) == parseInt(data[i].item.salePrice / 1000000) ? parseInt(data[i].item.salePrice / 1000000) : (data[i].item.salePrice / 1000000).toFixed(2)) + '万' : (data[i].item.salePrice / 100).toFixed(2)) + '</span>\n\t\t\t\t        <span class="user-shopSetting-ret"><span>\u4F63\u91D1</span><span class="user-shopSetting-rnum">\u6700\u9AD8\uFFE5' + (data[i].item.mostCommission / 100).toFixed(2) + '</span></span>\n\t\t\t\t    </div>\n\t\t\t\t    <div class="user-shopSetting-gnotice"><span>30\u65E5\u9500\u91CF:' + data[i].item.sales + '</span><span class="user-shopSetting-date">\u4E0A\u67B6\u65F6\u95F4:' + dataFormat(data[i].onShelfAt, '.') + '</span>\n\t\t\t\t    </div>\n\t\t\t\t    <div class="clearfix">\n\t\t\t\t        <a class="user-shopSetting-delBtn J-shopSetting-delBtn" href="javascript:;" data-itemid="' + data[i].itemId + '" data-skuid="' + data[i].skuId + '" data-identification="' + data[i].identification + '" data-status="' + data[i].item.status + '">\u4E0B\u67B6</a>\n\t\t\t\t        <a class="user-shopSetting-grayBtn" href="javascript:;"> \n\t\t\t\t            <span ' + (getStrLength(data[i].category.name) > 8 ? 'class="user-shopSetting-maxSize"' : '') + '>' + data[i].category.name + '</span>\n\t\t\t\t        </a>\n\t\t\t\t        <a class="user-shopSetting-shareBtn J-shopSetting-shareBtn" href="javascript:;"> \u5206\u4EAB</a>\n\t\t\t\t    </div>\n\t\t\t\t</li>';
		}
		$('.J-shopSetting-list').html(html);
		$(window).scrollTop(0);
		//图片加载
		__webpack_require__(213).init();
	}
	//获取目标页码数据
	function getItems(currentPage) {
		fetch.get(url.get('shopMange') + currentPage, {}).then(function (result) {
			if (result) {
				window.currentPage = currentPage;
				getHtml(result.items);
				pagination(currentPage, $_CONFIG.totalPageQuantity);
			} else {
				hint.init('数据获取失败，请重试！');
			}
		}, function () {
			hint.init('数据获取失败，请重试！');
		});
	}
	
	//初始化分页并设置点击页码回调
	function pagination(currentPage, totalPage) {
		$(".J-shopSetting-page").gPager({
			currentPage: currentPage,
			totalPage: totalPage,
			clickCallback: function clickCallback(n) {
				getItems(parseInt(n));
			}
		});
	}
	
	module.exports = {
		getItems: getItems,
		init: function init() {
			pagination(currentPage, $_CONFIG.totalPageQuantity);
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2)))

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
	
	(function (t) {
	  var a = { pre: "上一页", next: "下一页", nav: function nav(t, a) {
	      var s = "";if (a <= 1 || t > a) {
	        s = this.pager(1, 1);
	      } else {
	        s += t == 1 ? this.showPre(0) : this.showPre(1, t);if (a > 6) {
	          var e = 1;if (t >= 5 && t <= a) {
	            s += t == 1 ? this.numStatusHTML(0, 1) : this.numStatusHTML(1, 1);
	          } else {
	            for (var n = 1; n < 4; n++) {
	              s += t == n ? this.numStatusHTML(0, n) : this.numStatusHTML(1, n);
	            }
	          }s += t >= 5 ? "<span class='placeholder'></span>" : "";e = t - 2;if (e >= 3 && e < a - 2) s += t == e ? this.numStatusHTML(0, e) : this.numStatusHTML(1, e);e = t - 1;if (e > 3 && e < a - 2) s += t == e ? this.numStatusHTML(0, e) : this.numStatusHTML(1, e);e = t;if (e > 3 && e < a - 2) s += t == e ? this.numStatusHTML(0, e) : this.numStatusHTML(1, e);e = t + 1;if (e > 3 && e < a - 2) s += t == e ? this.numStatusHTML(0, e) : this.numStatusHTML(1, e);e = t + 2;if (e > 3 && e < a - 2) s += t == e ? this.numStatusHTML(0, e) : this.numStatusHTML(1, e);s += t <= a - 4 ? "<span class='placeholder'></span>" : "";if (t <= a - 4) {
	            s += t == a ? this.numStatusHTML(0, a) : this.numStatusHTML(1, a);
	          } else {
	            for (var n = a - 2; n <= a; n++) {
	              s += t == n ? this.numStatusHTML(0, n) : this.numStatusHTML(1, n);
	            }
	          }
	        } else {
	          for (var n = 1; n <= a; n++) {
	            s += t == n ? this.numStatusHTML(0, n) : this.numStatusHTML(1, n);
	          }
	        }s += t == a ? this.showNext(0) : this.showNext(1, t);
	      }return s;
	    }, pager: function pager(t, a) {
	      var s = "";if (a <= 1) {
	        this.p = t;this.pn = a;s = this.showPre(0) + this.numStatusHTML(0, t) + this.showNext(0);
	      }return s;
	    }, go: function go(t, a) {
	      var s = this.nav(t, a) + this.btnHTML(t, a);return s;
	    }, numStatusHTML: function numStatusHTML(t, a) {
	      return t == 0 ? "<span class='cur'>" + a + "</span>" : "<a href='javascript:void(0);' onclick='javascript:doPageNumSearch(" + a + ");return false;'>" + a + "</a>";
	    }, showPre: function showPre(t, a) {
	      var s = "<a class='prev disable' href='javascript:void(0);'>&nbsp;" + this.pre + "<s class='icon-prev'></s><i></i></a>";var e = "<a class='prev' href='javascript:void(0);' onclick='javascript:doPageNumSearch(" + (a - 1) + ");return false;'>&nbsp;" + this.pre + "<s class='icon-prev'></s><i></i></a>";return t == 0 ? s : e;
	    }, showNext: function showNext(t, a) {
	      var s = "<a class='next disable' href='javascript:void(0);'>" + this.next + "<s class='icon-next'></s><i></i></a>";var e = "<a class='next' href='javascript:void(0);' onclick='javascript:doPageNumSearch(" + (a + 1) + ");return false;'>" + this.next + "<s class='icon-next'></s><i></i></a>";return t == 0 ? s : e;
	    }, btnHTML: function btnHTML(t, a) {
	      var s = "<label for='pagenum' class='txt-wrap'>到<input type='text' id='pNum' class='txt' bNum='" + a + "' value='" + t + "'>页</label>" + "<a href='javascript:void(0)' zdx='nBtn' class='btn'>确定</a>";return s;
	    } };t.fn.extend({ gPager: function gPager(t) {
	      this.ucPager(t);
	    }, ucPager: function ucPager(s) {
	      var e = t.extend({ pageClass: "pager", currentPage: 1, totalPage: 0, pageSize: 15, clickCallback: function clickCallback() {} }, s);return this.each(function () {
	        var s = t(this);if (!s.hasClass(e.pageClass)) {
	          s.addClass(e.pageClass);
	        }var n = function n() {
	          e.clickCallback(e.currentPage);
	        };s.html(a.go(e.currentPage, e.totalPage));window.doPageNumSearch = function (t) {
	          e.currentPage = t.toString();n();
	        };window.doNextPageNum = function (t) {
	          if (e.currentPage == e.totalPage) {
	            e.currentPage--;
	          } else {
	            e.currentPage++;
	          }doPageNumSearch(e.currentPage);
	        };var i = t("#pNum", s);i.on("keyup", function () {
	          var a = t(this).val(),
	              s = /^\d+$/gi,
	              e = /\d+/gi;if (!s.test(a)) {
	            t(this).val(a.match(e) ? a.match(e)[0] : "");
	          }
	        });t(".btn", s).bind("click", function () {
	          var a = t.trim(i.val());if (a < 1) {
	            i.val(1);e.currentPage = 1 + "";
	          } else if (a > e.totalPage) {
	            i.val(e.totalPage);e.currentPage = e.totalPage.toString();
	          } else {
	            i.val(a);e.currentPage = a;
	          }n();
	        });
	      });
	    } });
	})(jQuery);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	//删除确认弹窗
	var Dialog = __webpack_require__(37);
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var pager = __webpack_require__(216);
	var hint = __webpack_require__(43);
	
	module.exports = {
		init: function init() {
			$('body').on('click', '.J-shopSetting-delBtn', function () {
				var _this = $(this);
				var delDialog = Dialog({
					title: '删除商品？',
					modal: true,
					fixed: true,
					content: '<div class="del-pop-p">下架商品后，可进入添加商品中重新上架</div>',
					className: 'pop-box',
					okValue: '确认',
					okCls: 'pc-btn pc-btnh35 circle-pop-btn',
					cancalValue: '取消',
					btnWrapCls: 'insert-cancel',
					cancel: function cancel() {},
					ok: function ok() {
						fetch.get(url.get('soldInOut'), {
							data: {
								shopId: $_CONFIG.shopId,
								itemId: _this.attr('data-itemId'),
								skuId: _this.attr('data-skuId'),
								identification: _this.attr('data-identification'),
								status: _this.attr('data-status')
							}
						}).then(function (result) {
							if (result && result.code === 200) {
								var num = parseInt($('.J-shopSetting-number').text(), 10);
								_this.parents('li').eq(0).remove();
								$('.J-shopSetting-number').text(num - 1);
								pager.getItems(window.currentPage);
							} else {
	
								hint.init('抱歉，操作失败，请重试');
							}
						}, function () {
							hint.init('抱歉，操作失败，请重试');
						});
					}
				});
				delDialog.show();
			});
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ })

});
//# sourceMappingURL=shopSetting.js.map