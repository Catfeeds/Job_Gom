webpackJsonp([27],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var praise = __webpack_require__(210),
	    getRedTicket = __webpack_require__(211),
	    shareto = __webpack_require__(121).shareto,
	    shopCollect = __webpack_require__(137),
	    fetch = __webpack_require__(2),
	    url = __webpack_require__(28),
	    moreList = __webpack_require__(212);
	var shopSelect = __webpack_require__(214);
	var shortcutBanner = __webpack_require__(154);
	// 发送统计数据用
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('shopDetail');


	var $shopTop = $('[data-node="shopTop"]'),
	    $love = $shopTop.find('[data-action="love"]'), //点赞
	    $loveNum = $love.find('[data-node="loveNum"]'), //点赞数量
	    $collect = $shopTop.find('[data-action="collect"]'), //收藏
	    $collectNum = $collect.find('[data-node="collectNum"]'),
	    $redTicketBox = $('[data-node="couponBox"]'),
	    // $share = $shopTop.find('[data-action="shareto"]'),
	    $shareBox = $('[data-node="shareBtnBox"]'),
	    $goodBox = $('[data-node="goodsBox"]'),
	    $goodList = $goodBox.find('ul'),
	    $moreBtn = $goodBox.find('[data-action="moreGoods"]');

	var loveNum = ~~$loveNum.text();


	//
	shopSelect.init();
	//点赞
	praise('[data-node="shopTop"]', '[data-action="love"]', {
	    onPraise: function(result) {
	        loveNum++;        
	        $loveNum.text(loveNum);
	    },
	    onUnPraise: function(result) {
	        loveNum--;
	        $loveNum.text(loveNum);
	    },
	    onPraised: function(result) {
	        $love.find('em').addClass('active');
	        $loveNum.text(loveNum);
	    }
	});

	//收藏
	//收藏 店铺
	shopCollect({
	    selector: '[data-action="collect"]',
	    parent: '[data-node="shopTop"]'
	}, function(isAdd) {
	    isAdd ? $collectNum.text(~~$collectNum.text() + 1).prev().addClass('active') : $collectNum.text(~~$collectNum.text() - 1).prev().removeClass('active');
	});

	//领取优惠券
	getRedTicket.init();


	//快捷导航
	shortcutBanner.init();

	//分享
	var shareTimer = null,
	    $shareBtnBox = $('[data-node="shareBtnBox"]'),
	    shareInfo = {},
	    pcUrl = '';
	var shareTitle = '';
	$('[data-node="shopTop"]').on('mouseenter', '[data-action="shareto"]', function() {
	        pcUrl = $(this).data('surl');
	        if ($.isEmptyObject(shareInfo)) {
	            shareInfo = {
	                url: $(this).data('surl'),
	                title: $(this).data('stitle'),
	                pic: $(this).data('spic') === '' ? $_CONFIG.imgpath + '/images/public/logo.png' : $(this).data('spic')
	            };
	            shareTitle = $(this).data('stitle');
	        }
	        $shareBtnBox.css({
	            top: $(this).offset().top + 30,
	            left: $(this).offset().left - ~~$('[data-node="shareBtnBox"]').width() / 2 + ~~$(this).width() / 2
	        }).show();
	        // 发送统计数据
	        BP.send({
	            event_id: 'B000P019',
	            shop_id: $GLOBAL_CONFIG['shopId']
	        })
	    })
	    .on('mouseleave', '[data-action="shareto"]', function() {
	        shareTimer = setTimeout(function() {
	            $shareBtnBox.hide();
	        }, 100)
	    });
	$shareBtnBox.on('mouseenter', function() {
	        clearTimeout(shareTimer);
	    })
	    .on('mouseleave', function() {
	        $(this).hide();
	    });
	// 发送统计数据
	var analytic = function(channel) {
	    BP.send({
	        event_id: 'B000P016',
	        shop_id: $GLOBAL_CONFIG['shopId'],
	        channel_id: channel || ''
	    });
	};
	//验证图片是否为图片类型以及是否为默认图片
	var headPic = $shopTop.find('img').attr('src');
	var isDefault = function(src) {
	    if (src == 'https://i-pre.meixincdn.com/v1/img/T1gyVTBmLT1R4cSCrK.png' || src == 'https://i6.meixincdn.com/v1/img/T1YFxTByJT1R4cSCrK.png' || src == 'https://i-pre.meixincdn.com/v1/img/T1TaVTB7LT1R4cSCrK.png') {
	        return false;
	    }
	    return true;
	};
	var isPic = function(src) {
	    var reg = /\w+\.(jpg|gif|bmp|png)$/;
	    if (isDefault(src)) {
	        return reg.test(src);
	    } else {
	        return false;
	    }
	};
	// shop_id，channel_id（out-weixin,out-QQ,out-xlwb，out-Qqzone）
	$shareBtnBox.on('click', '[data-shareto="weixin"]', function() {
	    shareInfo.url = $GLOBAL_CONFIG.weixin_share;
	    shareInfo.title = shareTitle;
	    shareto.weixin(shareInfo);
	    analytic('out-weixin');
	}).on('click', '[data-shareto="qq"]', function() {
	    shareInfo.url = pcUrl;
	    shareInfo.title = shareTitle;
	    shareInfo.summary = '我发现了前所未有的好店，不如，你也来逛逛？';
	    shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
	    shareto.qq(shareInfo);
	    analytic('out-QQ');
	}).on('click', '[data-shareto="sina"]', function() {
	    shareInfo.url = pcUrl;
	    shareInfo.title = shareTitle + ',这是我费尽千辛万苦找到的超级好店。';
	    shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
	    shareto.sina(shareInfo);
	    analytic('out-xlwb');
	}).on('click', '[data-shareto="qzone"]', function() {
	    shareInfo.url = pcUrl;
	    shareInfo.title = shareTitle;
	    shareInfo.summary = '这是我费尽千辛万苦找到的超级好店。';
	    shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
	    shareto.qzone(shareInfo);
	    analytic('out-Qqzone');
	});
	//加载更多
	var morePage = 2,
	    shopId = $GLOBAL_CONFIG.shopId;

	$moreBtn.on('click', function() {
	    var text = $(this).html(),
	        _this = this;
	    if (!$(_this).hasClass('disabled')) {
	        $(_this).addClass('disabled').html('<span><img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...</span>');
	        fetch.get(url.get('moreGoods'), {
	            data: {
	                shop_id: ~~$GLOBAL_CONFIG.shopId,
	                type: ~~$GLOBAL_CONFIG.type,
	                pageNum: morePage,
	                numPerPage: 15
	            }
	        }).done(function(result) {
	            var data = result.data.itemList;
	            if (data.length < 15) {
	                $(_this).html('<span>没有可加载内容</span>');
	            } else if (data.length == 0) {
	                $(_this).html('<span>没有可加载内容</span>');
	            } else {
	                $(_this).removeClass('disabled').html(text);
	            }
	            moreList(data, shopId);
	            morePage++;
	        });
	    }

	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*
	 * 弹层提示弹窗
	 * zhaodonghong
	 */



	var $publicMask;
	var $publicTips;
	var timer;


	var events = function() {

	    $publicMask.off().on('click', function() {
	        $publicMask.hide();
	        $publicTips.hide();
	    });

	    $publicTips.off().on('click', function() {
	        $publicMask.hide();
	        $publicTips.hide();
	    });
	}


	/**
	 * msg string 提示信息
	 * options object 
	 * options.duration settimout消失时间
	 * options.callback 提示消失的回调
	*/
	var init = function(msg, options) {
	    var defaults = {
	        duration: 2000,
	        callback: function() {}
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

	    timer = setTimeout(function() {

	        $publicMask.hide();
	        $publicTips.hide();

	        defaults.callback();

	    }, defaults.duration);
	};



	module.exports = {
	    init: init,
	    events: events
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 分享到 微信，QQ，微博，空间
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var getQRCode = __webpack_require__(122);
	var checkLoginStatus = __webpack_require__(42);


	var APIS = {
	    qq: "http://connect.qq.com/widget/shareqq/index.html",
	    sina: "http://v.t.sina.com.cn/share/share.php",
	    qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"
	};

	var defaultInfo = {
	    url: 'http://www.gomeplus.com',
	    title: '国美+APP边玩边分享，购物不孤单',
	    pic: 'http://www.gomeplus.com/images/logo.png', // logo图片地址
	    summary: '国美+APP边玩边分享，购物不孤单'
	};

	var open = function(url) {
	    window.open(url);
	};

	// 分享按钮渲染
	var hasShareBtnsHTML = false;
	var initShareBtns = function() {
	    var shareBtns = '<p data-node="shareBtnBox" class="share-down" style="z-index:21;"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" class="icon icon-weixin">&#xe937;</em><em data-shareto="qq" class="icon icon-qq">&#xe900;</em><em data-shareto="sina" class="icon icon-sina">&#xe935;</em><em data-shareto="qzone" class="icon icon-kongjian">&#xe902;</em></span></span></p>';
	    $('body').append(shareBtns);
	    hasShareBtnsHTML = true;
	};
	var showShareToBtns = function(style) {
	    !hasShareBtnsHTML && initShareBtns();
	    $('[data-node=shareBtnBox]').css({
	        left: style.x,
	        top: style.y
	    }).show();
	};

	// 微信弹层渲染
	var hasWeixinHTML = false;
	var initWeixinHTML = function() {

	    var weixinBox = '<div class="share-weixin"><div class="wx-mask"></div><div class="wx-main"><div class="wx-code"><span></span><img data-node="shareWeixinCode" alt="分享到微信" /></div><p>打开微信扫一扫，即可分享</p><a href="javascript:;" title="点击关闭" class="wx-close">×</a></div></div>';
	    $('body').append(weixinBox);
	    hasWeixinHTML = true;
	};

	// pics: 图片参数是否为pics，默认是pic。
	var formatParams = function(p, pics) {
	    var s = [];
	    var data = {
	        title: p.title,
	        url: p.url,
	        summary: p.summary,
	        desc: p.desc,
	        site: p.site
	    };
	    if (pics) {
	        data.pics = p.pic;
	    } else {
	        data.pic = p.pic;
	    }
	    for (var i in data) {
	        s.push(i + '=' + encodeURIComponent(data[i] || ''));
	    }
	    return s.join('&');
	};

	// 单个调用方法
	// 分享的图片多个用||隔开。
	var shareTo = {
	    weixin: function(options) {
	        var link = getQRCode(options.url)
	        !hasWeixinHTML && initWeixinHTML();

	        $('[data-node=shareWeixinCode]')[0].src = link;
	        $('.share-weixin').show();
	        $('.wx-close').on('click', function() {
	            $('.share-weixin').hide();
	        });
	    },
	    qq: function(options) {
	        var link = APIS.qq + '?' + formatParams(options, true);
	        open(link);
	    },
	    sina: function(options) {
	        var link = APIS.sina + '?' + formatParams(options);
	        open(link);
	    },
	    qzone: function(options) {
	        var link = APIS.qzone + '?' + formatParams(options, true);
	        open(link);
	    }
	};

	// share with kid
	var shareWithKid = function(args) {
	    var isRebate = args.isRebate === '0' ? false : true;
	    fetch.get(url.get('shareGetGoodsKid'), {
	        validate: isRebate,
	        data: {
	            skuId: args.skuId,
	            itemId: args.itemId,
	            parentKid: args.parentKid,
	        },
	        async: false // 防止新窗口被拦截
	    }).done(function(data) {
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
	    }).fail(function(data) {
	        if(isRebate){
	             if(checkLoginStatus ()){
	                shareTo[args.shareto](args.shareInfo);
	            }
	        }else{
	           shareTo[args.shareto](args.shareInfo); 
	        }
	    });
	};

	// 统一方法
	var go = function(obj) {
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
	var shareItem = function(parent, selector, beforeShare) {
	    var shareInfo = null;
	    $item = typeof parent === 'string' ? $(parent) : parent;
	    selector = selector || '[data-action=shareto]';
	    // 显示分享按钮
	    $item.on('mouseenter', selector, function(e) {
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
	        var px = ($(this).offset().left / 1 + pw / 2 - 80) + 'px';
	        var py = ($(this).offset().top / 1 + (ph - 1)) + 'px';

	        showShareToBtns({
	            x: px,
	            y: py
	        });
	        return false;
	    });
	    // 隐藏分享按钮
	    $item.on('mouseleave', selector, function(e) {
	        $('[data-node=shareBtnBox]').hide();
	        return false;
	    });

	    $('body').on('click', '[data-shareto]', function(e) {
	        e.preventDefault();
	        shareType = $(this).data('shareto');
	        shareInfo.type = shareType;
	        beforeShare = beforeShare || function() {};
	        beforeShare.call(null, shareInfo);
	        // console.log(shareInfo);
	        go(shareInfo);
	    });

	    $('body').on('mouseenter', '[data-node=shareBtnBox]', function() {
	        $(this).show();
	    });
	    $('body').on('mouseleave', '[data-node=shareBtnBox]', function() {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {// 根据字符串生成二维码
	var getQRCode = function(url) {
		return $_CONFIG.wap_url + 'q.php?t=' + encodeURIComponent(url);
	};

	module.exports = getQRCode;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var hint = __webpack_require__(84);
	var checkLoginStatus = __webpack_require__(42);

	var isCollect = false;

	var init = function(elementSelector, onChanged) {
	    var $select = elementSelector.parent ? $(elementSelector.parent) : $(elementSelector.selector),
	        $selector = elementSelector.parent ? elementSelector.selector : undefined;
	    
	    $select.on('click', $selector, function() {
	        var _this = this,
	            isAdd = true,
	            changed = onChanged || function() {};

	        var objs = {
	                    validate: true,
	                    data: {
	                        shopId: $GLOBAL_CONFIG.shopId
	                    }
	                }

	        //无刷新登录
	        function noRefreshFetch  (o){        
	            fetch.post(collectUrl, o).done(function(result) {     
	                if (result.code === 200) {
	                    if (isAdd) {
	                        $(_this).addClass('active').attr('data-collect', 'collect');
	                    } else {
	                        $(_this).removeClass('active').attr('data-collect', '');
	                    }
	                    changed.call(_this, isAdd);
	                } else {
	                    hint.init(result.message)
	                }
	            }).fail(function(xhr, error) {
	                if (checkLoginStatus()) {
	                    hint.init('店铺收藏失败');
	                }
	            }).always(function() {
	                isCollect = false;
	            });
	        }

	        if (!isCollect) {
	            isCollect = true;
	            if ($(_this).attr('data-collect') === '') {
	                collectUrl = url.get('shopCollect');
	                isAdd = true;
	            } else {
	                collectUrl = url.get('unShopCollect');
	                isAdd = false;
	            }
	        }    

	        
	        noRefreshFetch(objs);
	        return false;
	    });

	}
	module.exports = init;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 154:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var isLogin = __webpack_require__(42);
	var loginPop = __webpack_require__(3);

	var init = function(){
		$('[data-action="shortcutBanner"]').on('click', 'a', function(e){
			var _self = $(this);
			if (!isLogin()) {
				e.preventDefault();
	            loginPop({
	            	onLogin:function(){
	            		window.location.href= _self.attr('href');
	            	}
	            });
	        }
		});
	}

	module.exports = {
		init : init
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/**
	 *
	 * 赞/取消赞
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(36);
	var Pubsub = __webpack_require__(43);
	var channel = __webpack_require__(68);
	var checkLoginStatus = __webpack_require__(42);

	var isLogin = checkLoginStatus();   //页面初始化是否登录判断   

	var noop = function() {};
	var setData = function($node, praise, count) {
	    $node.data('praise', praise);
	    $node.data('count', count);
	};

	var helper = {
	    normal: {
	        add: function($node, data, count) {
	            $node.find('em').addClass('active');
	            if (!count) {
	                count = "取消点赞";
	            }
	            $node.find('span').text(count);

	        },
	        reduce: function($node, data, count) {
	            $node.find('em').removeClass('active');
	            if (!count) {
	                count = "点赞";
	            }
	            $node.find('span').text(count);
	        }
	    }
	};

	var getCallback = function(mode) {
	    return helper[mode];
	}

	var praise = function(container, selector, options) {
	    var $container = $(container);
	    var onPraise = options.onPraise || noop;
	    var onUnPraise = options.onUnPraise || noop;
	    var onPraised = options.onPraised || noop;
	    var mode = options.mode || 'normal';

	    $container.on('click', selector, function() {
	        var $this = $(this);
	        var firing = $this.data('firing');
	        if (firing === 1) {
	            return;
	        }

	        $this.data('firing', 1);
	        var t = $this.data('type');
	        var isPraise = $this.data('praise');
	        var id = $this.data('id');
	        var count = $this.data('count');

	        var objs = {
	                validate: true,
	                data: {
	                    id: id,
	                    type: t, // 0 店铺,  1 话题
	                    isPraise: isPraise // 0 取消点赞, 1 点赞
	                },
	                onLogin: noRefreshFetch,
	                refresh:true
	            }

	        //无刷新登录
	        function noRefreshFetch (o) { 
	            fetch.post(url.get('praise'), o)
	            .done(function(data, textStatus, jqXHR) {
	                var callbacks = getCallback(mode);
	                //推送 评论区状态
	                Pubsub(channel.comment.enableEditor).pub({
	                    pid: "enable"
	                });

	                if (data && data.code === 200 && data.success) {
	                    if (isPraise === 1) {
	                        setData($this, 0, ++count);
	                        callbacks.add($this, data, count);
	                        onPraise.call($this, data, count);
	                    } else if (isPraise === 0) {
	                        setData($this, 1, --count);
	                        callbacks.reduce($this, data, count);
	                        onUnPraise.call($this, data, count);
	                    }
	                } else if (data && data.code === 422) {
	                    // window.location.href = $_CONFIG.passport_domain + 'login/index';
	                } else if (data && data.code === 403) {
	                    alert('抱歉！该话题审核未通过', {
	                        ok: function() {
	                            window.location.href = $_CONFIG.group_domain + 'index/error?code=topic';
	                        }
	                    });
	                } else {
	                    var message = data.message;
	                    //409点过赞  已经登录 把点赞状态回带，不刷新
	                    if (data.code === 409) {

	                        onPraised.call($this, data, count);

	                        if(isLogin) {
	                            alert(message);
	                        }
	                        
	                        return false;
	                    }
	                    if (t === 0) {
	                        if (data.code === 404) {
	                            alert(message, {
	                                ok: function() {
	                                    window.location.reload();
	                                }
	                            });
	                        } else {
	                            alert(message);
	                        }
	                    } else {
	                        alert(message);
	                    }
	                }
	                
	            }).fail(function(jqXHR, textStatus, errorThrown) {
	                // 点赞失败时,如何处理
	            }).always(function() {
	                $this.data('firing', 0);
	            });
	        }

	        noRefreshFetch(objs);
	        return false;
	    });
	};

	module.exports = praise;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var hint = __webpack_require__(84);
	var url = __webpack_require__(28);
	var fetch = __webpack_require__(2);
	var init = function(){
	    var ticketId;
	    $(document).on('click', '[data-action="getRed"]', function(){
	        ticketId = $(this).attr('data-redid');

	        var noRefreshFetch = function(){
	            fetch.post( url.get( 'getTicket' ), {
	                validate:true,
	                data : {
	                    batchSn: ticketId,
	                    userId: $GLOBAL_CONFIG.userId
	                },
	                onLogin: noRefreshFetch
	            }).done(function( data ){
	                
	                if( data&&data.success&&data.code === 200 ){

	                    hint.init('领取成功');

	                }else{

	                    hint.init(data.message);

	                }
	                
	                
	                
	            }).fail(function(){

	                

	            });
	        }
	        noRefreshFetch();
	            
	        return false;

	    });
	}

	module.exports = {
	    init : init
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var tpl = __webpack_require__(213);
	var init = function(data, shopId) {
	    var $goodBox = $('[data-node="goodsBox"]'),
	        $goodList = $goodBox.find('ul'),
	        html = '',
	        hostName = $_CONFIG.mall_domain;
	    html = tpl({
	        data: data,
	        shopId: shopId,
	        hostName: hostName
	    });
	    $goodList.append(html);
	};

	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/widget/shopInfo/shopInfo',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,hostName=$data.hostName,shopId=$data.shopId,$out='';$out+=' ';
	$each(data,function($value,$index){
	$out+=' <li> ';
	if(data[$index].isRebate && data[$index].isDiscount ){
	$out+=' <em class="icon-fan">返</em> ';
	}else{
	$out+=' ';
	if(data[$index].isRebate  ){
	$out+=' <em class="icon-fan">返</em> ';
	}
	$out+=' ';
	if(data[$index].isDiscount  ){
	$out+=' <em class="icon-fan icon-jiang">降</em> ';
	}
	$out+=' ';
	}
	$out+=' <div class="mg-negative"> <a href="';
	$out+=$escape(hostName);
	$out+='product/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(data[$index].id);
	$out+='.html" target="_blank"> <img src=';
	$out+=$escape(data[$index].img);
	$out+=' alt="';
	$out+=$escape(data[$index].title);
	$out+='"> </a> <div class="btn-box"> <a href="';
	$out+=$escape(hostName);
	$out+='product/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(data[$index].id);
	$out+='.html" target="_blank" class="pc-btn pc-btnh40">立即购买</a> <a href="';
	$out+=$escape(hostName);
	$out+='product/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(data[$index].id);
	$out+='.html" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a> </div> <div class="text">￥<span>';
	$out+=$escape(data[$index].price);
	$out+='</span> <p title="';
	$out+=$escape(data[$index].title);
	$out+='">';
	$out+=$escape(data[$index].title);
	$out+='</p> </div> </div> </li> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var $selector = $('[data-action="shopSelector"]');
	var $selectList = $('[data-node="shopSelectList"]');
	var timer;

	var init = function(){

	    $selector.on('mouseenter',function(){
	        $selector.addClass('hover');
	            $selectList.show();
	    });

	    $selector.on('mouseleave',function(){
	        timer = setTimeout(function(){

	            $selector.removeClass('hover');
	            $selectList.hide();

	        },200);
	    });

	    $selectList.on('mouseenter',function(){
	        clearTimeout( timer );
	    });

	    $selectList.on('mouseleave',function(){
	        $selector.removeClass('hover');
	        $selectList.hide();
	    });
	}



	module.exports = {
	    init : init
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});