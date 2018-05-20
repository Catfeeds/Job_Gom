webpackJsonp([31],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var Tiles = __webpack_require__(206);
	// var praise = require('module/praise');
	var share = __webpack_require__(121);
	var circle = __webpack_require__(216);

	// tmod helpers
	__webpack_require__(228)();

	var tpl = __webpack_require__(229);
	var noTopics = __webpack_require__(230);
	var encodeHTML = __webpack_require__(209);
	// 发送统计
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('group');

	var tiles = new Tiles({
	    columnWidth: 242
	}, '[data-node=tiles]');
	var gid = tiles.element.attr('data-gid'); // 瀑布流容器
	var t = tiles.element.attr('data-type');
	var $loadMore = $('[data-action=loadMore]');
	var $loading = $('[data-node=loading]');

	// 加载更多
	var firing = false; // 是否正在加载
	var page = 1;
	var finished = false; // 数据是否全部加载完毕

	var beforeLoad = function() {
	    $loadMore.hide();
	    $loading.show();
	};

	var noMoreData = function() {
	    if (page == 2) {
	        $('[data-node=tiles]').append(noTopics());
	        $loadMore.off();
	        $loadMore.hide();
	    } else {
	        $($loadMore.find('a').text('没有更多数据了')).css('text-align', 'center');
	        $loadMore.off();
	    }
	};
	var loadFail = function() {
	    $('[data-node=loading]').find('a').html('数据获取失败').css('text-align', 'center');
	};
	var load = function(e) {
	    if (firing) {
	        return;
	    }
	    if (finished) {
	        noMoreData();
	        return;
	    }
	    firing = true;
	    beforeLoad();

	    fetch.get(url.get('topics'), {
	        data: {
	            gid: gid,
	            page: page,
	            type: t, // 1 精品 0 全部
	            pagesize: 20
	        }
	    }).done(function(json, textStatus, jqXHR) {
	        if (json.code === 200) {
	            page++;
	            var data = json.data || {};
	            var topics = data.topTopics || [];
	            if (data.topics) {
	                topics = topics.concat(data.topics);
	            }
	            // artTemplate不支持调用非当前作用域中的变量
	            // 所以把变量绑定到传入的数据上
	            topics.groupDomain = $_CONFIG.group_domain;
	            topics.mallDomain = $_CONFIG.mall_domain;
	            topics.group_id = $GLOBAL_CONFIG['group_id']; // 统计数据
	            topics.event_id = $GLOBAL_CONFIG['event_id']; // 统计数据
	            if ($.isEmptyObject(json.data)) {
	                finished = true;
	                $loading.hide();
	                $loadMore.show();
	                noMoreData();
	            } else {
	                tiles.appended($(tpl({
	                    topics: topics
	                })));
	                $loading.hide();
	                if (json.data.topics.length < 20) {
	                    $loadMore.hide();
	                } else {
	                    $loadMore.show();
	                }
	            }
	        } else {
	            loadFail();
	        }
	    }).fail(function(jqXHR, textStatus, errorThrown) {
	        loadFail();
	    }).always(function() {
	        firing = false;
	    });
	    return false;
	};

	var init = function() {

	    load(); // 加载首屏数据
	    // 点赞
	    // praise('[data-node=tiles]', '[data-action=like]', {
	    //     mode: 'normal'
	    // });
	    // 加入圈子
	    var $els = $('[data-action=joinGroup]');
	    var approvaltype;
	    if ($els) {
	        approvaltype = $els.data('approvaltype');
	    }
	    circle('[data-action=joinGroup]', function() {
	        if (approvaltype === 0) {
	            $('[data-node=postTopic]').show(); // 显示发布话题按钮
	        }
	    });
	    // 分享
	    // share.shareItem('[data-node="tiles"]'); //列表部分分享
	    //首页分享当前圈子（单独创建分享按钮）
	    var hasShareBtnsHTML;
	    var groupPicSrc = $('[data-node=groupPic]').attr('src');

	    function isPic(src) {
	        var reg = /\w+\.(jpg|gif|bmp|png)$/;
	        var src = groupPicSrc;
	        if (src == $_CONFIG.imgpath + '/images/public/circle-default.png') {
	            src = false;
	        }
	        return reg.test(src);
	    }
	    var topShareOption = {
	        'url': location.href,
	        'title': $('[data-node=groupName]').html(),
	        'pic': isPic(groupPicSrc) ? groupPicSrc : $_CONFIG.imgpath + '/images/public/logo.jpg',
	        'site': '国美+'
	    };
	    var initShareBtns = function() {
	        var shareBtns = '<p data-node="shareBtnBoxTop" class="share-down" style="z-index:21;"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-sharetop="topWeixin" class="icon icon-weixin">&#xe937;</em><em data-sharetop="topQQ" class="icon icon-qq">&#xe900;</em><em data-sharetop="topSina" class="icon icon-sina">&#xe935;</em><em data-sharetop="topQzone" class="icon icon-kongjian">&#xe902;</em></span></span></p>';
	        $('[data-node=circle-top]').append(shareBtns);

	        var analytic = function(channel) {
	            BP.send({
	                event_id: 'G000P007',
	                group_id: $GLOBAL_CONFIG['group_id'],
	                channel_id: channel || '',
	                circle_type: $GLOBAL_CONFIG['s_c']
	            });
	        };

	        $('[data-sharetop=topWeixin]').on('click', function() {
	            var topicid = $('[data-node=tiles]').attr('data-gid');
	            // https://m.gomeplus.com/group/topic?topicId=575f7ed91940eb5c2587f56a
	            share.shareto.weixin({
	                url: $_CONFIG.wap_url + 'group/index?groupId=' + topicid
	            });
	            analytic('out-weixin');
	        });
	        $('[data-sharetop=topQQ]').on('click', function() {
	            share.shareto.qq({
	                'url': location.href,
	                'title': $('[data-node=groupName]').html(),
	                'pic': topShareOption.pic,
	                'summary': '这儿有我们志趣相投的小伙伴，快加入我们吧!',
	                'site': '国美+'
	            });
	            analytic('out-QQ');
	        });
	        $('[data-sharetop=topSina]').on('click', function() {
	            share.shareto.sina({
	                'url': location.href,
	                'title': $('[data-node=groupName]').html() + ' 这儿有我们志趣相投的小伙伴，快加入我们吧！',
	                'pic': topShareOption.pic,
	                'site': '国美+'
	            });
	            analytic('out-xlwb');
	        });
	        $('[data-sharetop=topQzone]').on('click', function() {
	            // console.log(topShareOption.pic);
	            share.shareto.qzone({
	                'url': location.href,
	                'title': $('[data-node=groupName]').html(),
	                'pic': topShareOption.pic,
	                'site': '国美+',
	                'summary': '这儿有我们志趣相投的小伙伴，快加入我们吧！'
	            });
	            analytic('out-Qqzone');
	        });
	        hasShareBtnsHTML = true;
	    };
	    var showShareToBtns = function() {
	        !hasShareBtnsHTML && initShareBtns();
	        var $els = $('[data-node=bannerShare]');
	        $('[data-node=shareBtnBoxTop]').css({
	            left: ($els.offset().left / 1 + $els.width() / 2 - 80) + 'px',
	            top: ($els.offset().top / 1 + ($els.height() - 1)) + 'px'
	        }).on({
	            mouseenter: function() {
	                $(this).show();
	            },
	            mouseleave: function() {
	                $(this).hide();
	            }
	        }).show();
	    };
	    $('[data-node=bannerShare]').on({
	        mouseenter: function() {
	            showShareToBtns();
	        },
	        mouseleave: function() {
	            $('[data-node=shareBtnBoxTop]').hide();
	            return false;
	        }
	    });
	    $loadMore.on('click', load); // 加载更多
	};

	init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 46:
/***/ function(module, exports) {

	var byteLen = function (str) {
	    if (str == null) return 0;
	    if (typeof str != "string") {
	        str += "";
	    }
	    return str.replace(/[^\x00-\xff]/g, "01").length;
	}

	module.exports = byteLen;


/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * [truncate 按字节截取字符串]
	 * @param  {[function]}  getLength [获取长度的方法]
	 * @param  {[string]}  string [截取的字符串]
	 * @param  {[number]}  byteLength [截取的长度]
	 * @return {string}           [返回截取后的字符串]
	 */
	var byteLen = __webpack_require__(46);

	function isHighSurrogate(codePoint) {
	    return codePoint >= 0xd800 && codePoint <= 0xdbff;
	}

	function isLowSurrogate(codePoint) {
	    return codePoint >= 0xdc00 && codePoint <= 0xdfff;
	}

	// Truncate string by size in bytes
	function truncate(string, byteLength) {
	    if (typeof string !== "string") {
	        throw new Error("Input must be string");
	    }

	    var charLength = string.length;
	    var curByteLength = 0;
	    var codePoint;
	    var segment;

	    for (var i = 0; i < charLength; i += 1) {
	        codePoint = string.charCodeAt(i);
	        segment = string[i];

	        if (isHighSurrogate(codePoint) && isLowSurrogate(string.charCodeAt(i + 1))) {
	            i += 1;
	            segment += string[i];
	        }

	        curByteLength += byteLen(segment);

	        if (curByteLength === byteLength) {
	            return string.slice(0, i + 1);
	        } else if (curByteLength > byteLength) {
	            return string.slice(0, i - segment.length + 1);
	        }
	    }

	    return string;
	}

	module.exports = truncate;


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

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var emojis = __webpack_require__(179);
	var backward = __webpack_require__(180);
	var faceTpl = __webpack_require__(181);

	var faceReg,
	    faceUrl,
	    defaultIndex = 0;

	// 将表情转换成map
	var emojiMap = {};

	// 数据适配转换
	var makeData = function(data) {
	    var total = data.length;
	    var offset = 24;
	    var page = Math.ceil(total / offset);
	    var list = [];
	    
	    for (var i = 0; i < page; i++) {
	        list[i] = [];
	        var end = offset * (i + 1);
	        end = end > total ? total : end;
	        for(var j = i * offset; j < end; j++){
	            var emoji = data[j];
	            list[i].push(emoji);
	            emojiMap[emoji.name] = emoji.url;
	        }
	    }
	    return {
	        page: new Array(page),
	        list: list
	    };
	};
	// 表情层显示
	var show = function(x, y) {
	    setShowIndex(0);
	    $('[data-node=faceBox]').css({
	        left: x + 'px',
	        top: y + 'px'
	    }).show();
	};
	// 表情层隐藏
	var hide = function() {
	    $('[data-node=faceBox]').hide();
	};
	// tab方式显示所选页
	var setShowIndex = function(index) {
	    index = index || defaultIndex;

	    $('[data-action=facePage] > li').eq(index).addClass('active').siblings('li').removeClass('active');
	    $('[data-node=faceList] > div').eq(index).removeClass('hide').siblings('div').addClass('hide');
	};

	/**
	 * 插入表情，回调数据
	 * @param  {Function} fn     回调函数
	 * @param  {Boolean}  isHide 点击表情后是否隐藏表情浮层，默认隐藏
	 * @return {[type]}          null
	 */
	var insertFace = function(fn, isHide) {
	    $('body').on('click', '[data-face]', function(e) {
	        e.preventDefault();
	        e.stopPropagation();
	        faceReg = $(this).data('face');
	        faceUrl = $(this).attr('src');
	        fn({
	            reg: faceReg,
	            url: faceUrl
	        });
	        isHide !== false && $('[data-node=faceBox]').hide();
	    });
	};
	// 初始化表情弹层
	var initHTML = function(fn) {
	    var data = makeData(emojis);
	    var faceHTML = faceTpl(data);
	    $('body').append(faceHTML);
	    fn();
	};
	// 初始化事件
	var initEvent = function() {
	    $('body').on('click', '[data-node=faceBox]', function(e) {
	        e.stopPropagation();
	    });
	    $(document).on('click', function() {
	        $('[data-node=faceBox]').hide();
	    });
	    // 分页切换显示
	    $('[data-node=faceBox]').on('mouseenter', '[data-action=facePage] > li', function() {
	        var index = $(this).index();
	        setShowIndex(index);
	    });
	};

	var isEmpty = function(obj){
	    var ret = true;
	    for(var key in obj){
	        ret = false;
	        break;
	    }
	    return ret;
	};

	// 把表情占位符替换成img
	var parseEmoji = function(str) {
	    var r = /(\[([\s\S]+?)\])/g;
	    if(isEmpty(emojiMap)){
	        makeData(emojis);
	    }
	    
	    return str.replace(r, function(s, $1, name) {
	        var img = emojiMap[name];
	        if (img) {
	            return '<img width="22" height="22" src="' + img + '" />';
	        } else {
	            // 兼容旧版表情
	            var old = backward[name];
	            if(old){
	                return '<img width="22" height="22" src="' + old.url + '" />';
	            }
	            return s;
	        }
	    });
	};

	var init = function() {
	    initHTML(initEvent);
	};

	module.exports = {
	    init: init,
	    insert: insertFace,
	    show: show,
	    hide: hide,
	    parseEmoji: parseEmoji
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {var imgPath = $_CONFIG.imgpath + '/images/emoji/';

	var ext = '.png';

	var groupOne = [{
	    name: '微笑',
	    url: 'weixiao'
	}, {
	    name: '色',
	    url: 'se'
	}, {
	    name: '亲亲',
	    url: 'qinqin'
	}, {
	    name: '得意',
	    url: 'deyi'
	}, {
	    name: '流泪',
	    url: 'liulei'
	}, {
	    name: '害羞',
	    url: 'haixiu'
	}, {
	    name: '闭嘴',
	    url: 'bizui'
	}, {
	    name: '鼓掌',
	    url: 'guzhang'
	}, {
	    name: '大哭',
	    url: 'daku'
	}, {
	    name: '尴尬',
	    url: 'ganga'
	}, {
	    name: '生气',
	    url: 'shengqi'
	}, {
	    name: '调皮',
	    url: 'tiaopi'
	}, {
	    name: '呲牙',
	    url: 'ciya'
	}, {
	    name: '惊讶',
	    url: 'jingya'
	}, {
	    name: '委屈',
	    url: 'weiqu'
	}, {
	    name: '吐血',
	    url: 'tuxue'
	}, {
	    name: '冷汗',
	    url: 'lenghan'
	}, {
	    name: '抓狂',
	    url: 'zhuakuang'
	}, {
	    name: '难过',
	    url: 'nanguo'
	}, {
	    name: '偷笑',
	    url: 'touxiao'
	}, {
	    name: '白眼',
	    url: 'baiyan'
	}, {
	    name: '不屑',
	    url: 'buxie'
	}, {
	    name: '快哭了',
	    url: 'kuaikule'
	}];

	var groupTwo = [{
	    name: '困',
	    url: 'kun'
	}, {
	    name: '装酷',
	    url: 'zhuangku'
	}, {
	    name: '大笑',
	    url: 'daxiao'
	}, {
	    name: '偷瞄',
	    url: 'toumiao'
	}, {
	    name: '奋斗',
	    url: 'fendou'
	}, {
	    name: '咒骂',
	    url: 'zhouma'
	}, {
	    name: '疑问',
	    url: 'yiwen'
	}, {
	    name: '晕',
	    url: 'yun'
	}, {
	    name: '捶打',
	    url: 'chuida'
	}, {
	    name: '再见',
	    url: 'zaijian'
	}, {
	    name: '抠鼻',
	    url: 'koubi'
	}, {
	    name: '发呆',
	    url: 'fadai'
	}, {
	    name: '坏笑',
	    url: 'huaixiao'
	}, {
	    name: '哈欠',
	    url: 'haqian'
	}, {
	    name: '鄙视',
	    url: 'bishi'
	}, {
	    name: '睡觉',
	    url: 'shuijiao'
	}, {
	    name: '饿',
	    url: 'e'
	}, {
	    name: '阴险',
	    url: 'yinxian'
	}, {
	    name: '难受',
	    url: 'nanshou'
	}, {
	    name: '可怜',
	    url: 'kelian'
	}, {
	    name: '撇嘴',
	    url: 'piezui'
	}, {
	    name: '石化',
	    url: 'shihua'
	}, {
	    name: '泪眼',
	    url: 'leiyan'
	}];

	var format = function(arr) {
	    for (var i = 0, len = arr.length; i < len; i++) {
	        var emoji = arr[i];
	        emoji.url = imgPath + emoji.url + ext;
	    }
	    return arr;
	};

	module.exports = format(groupOne.concat(groupTwo));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 180:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {var path = $_CONFIG.imgpath + '/images/emoji/';
	var ext = '.png';

	var backward = {
	    '亲': {
	        name: '亲亲',
	        url: path + 'qinqin' + ext
	    },
	    '愤怒': {
	        name: '生气',
	        url: path + 'shengqi' + ext
	    },
	    '惊恐': {
	        name: '惊讶',
	        url: path + 'jingya' + ext
	    },
	    '迷茫': {
	        name: '委屈',
	        url: path + 'weiqu' + ext
	    },
	    '伤心': {
	        name: '难过',
	        url: path + 'nanguo' + ext
	    },
	    '努力': {
	        name: '奋斗',
	        url: path + 'fendou' + ext
	    },
	    'YY': {
	        name: ' 坏笑',
	        url: path + 'huaixiao' + ext
	    },
	    '恶心': {
	        name: '难受',
	        url: path + 'nanshou' + ext
	    }
	};

	module.exports = backward;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/face/face',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,v=$data.v,i=$data.i,face=$data.face,$index=$data.$index,$escape=$utils.$escape,page=$data.page,$out='';$out+='<div data-node="faceBox" class="imoj-box" style="position: absolute;z-index: 111;display:none"> <em class="sanjiao"></em> <div data-node="faceList" class="imoj-list"> ';
	$each(list,function(v,i){
	$out+=' <div class="imoj-content clearfix ';
	if(i){
	$out+='hide';
	}
	$out+='"> ';
	$each(v,function(face,$index){
	$out+=' <a href="javascript:;"> <img width="22" height="22" data-face="[';
	$out+=$escape(face.name);
	$out+=']" src="';
	$out+=$escape(face.url);
	$out+='" alt="';
	$out+=$escape(face.name);
	$out+='" title="';
	$out+=$escape(face.name);
	$out+='"> </a> ';
	});
	$out+=' </div> ';
	});
	$out+=' </div> <ul data-action="facePage" class="pagination"> ';
	$each(page,function(v,i){
	$out+=' <li ';
	if(i==0){
	$out+='class="active"';
	}
	$out+='></li> ';
	});
	$out+=' </ul> </div>';
	return new String($out);
	});

/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 浮动式瀑布流,不再对每一个 tile进行绝对定位，而是根据容器宽度和tile的宽度，
	 *	将容器分为若干列，将砖块放入到最短的列中即可。
	 *
	 * var tiles = new Tiles({}, '[data-node=tiles]');
	 */
		
	var settings = {};

	function Tiles(options, element) {
	    this.element = $(element);
	    this.$tiles = this.element.children();

	    this._create(options);
	    this._init();
	}

	Tiles.prototype = {
	    constructor: Tiles,
	    _getTiles: function() {
	        return this.element.children();
	    },

	    _create: function(options) {
	        this.options = $.extend(true, {}, settings, options || {});
	        
	        var container = this.element;
	        var width = this.columnWidth = this._getColumnWidth();
	        var colNums = this._getColumns();

	        for (var i = 0; i < colNums; i = i + 1) {
	        	$('<div style="float:left;width:' + width + 'px;" data-node="tiles-col"></div>').appendTo(container);
	        }
	        this.cols = container.find('> [data-node=tiles-col]');

	    },
	    
	    /*getInstance: function() {
	        return $.data(this.element[0], prefix);
	    },*/
	    
	    _getColumns: function() { //calculates number of columns
	        var containerWidth = this.element.width();
	        var colNum = Math.floor(containerWidth / this.columnWidth);
	        colNum = Math.max(colNum, 1);
	        return (this.colNum = colNum);
	    },

	    _init: function() {
	        this.layout(this.$tiles);
	    },

	    _getColumnWidth: function() { //指定的列宽或第一个砖块的宽或者是容器的宽
	        return this.options.columnWidth || this.$tiles.outerWidth(true) || this.element.width();
	    },

	    appended: function($tiles, callback) {
	        this.$tiles = this.$tiles.add($tiles);
	        this.layout($tiles, callback);
	    },

	    destroy: function() {
	        // this.element.removeData(prefix);
	    },

	    layout: function($tiles, callback) {
	        for (var i = 0, len = $tiles.length; i < len; i++) {
	            this._placeTile($tiles[i]);
	        }
	    },

	    _placeTile: function(tile) {
	        this.cols.eq(this.getShortestColumn()).append(tile);
	    },

	    getShortestColumn: function() {
	        var result = 0,
	            cols = this.cols,
	            len = cols.length,
	            shortest, h;
	        for (var i = 0; i < len; i++) {
	            h = cols[i].offsetHeight;
	            if (i == 0) {
	                shortest = h;
	            }
	            if (h < shortest) {
	                shortest = h;
	                result = i;
	            }
	        }
	        return result;
	    }
	};

	module.exports = Tiles;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 209:
/***/ function(module, exports) {

	var html = function(str, reg) {
	    return str ? str.replace(reg || /[&<">'](?:(amp|lt|ldquo|rdquo|quot|gt|#39|nbsp|#\d+);)?/g, function(a, b) {
	        if (b) {
	            return a;
	        } else {
	            return {
	                '<': '&lt;',
	                '&': '&amp;',
	                '"': '&quot;',
	                '“': '&ldquo;',
	                '”': '&rdquo;',
	                '>': '&gt;',
	                "'": '&#39;'
	            }[a]
	        }

	    }) : '';
	};

	module.exports = html;


/***/ },

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(36);

	var popTpl = "<p data-node='alertTitle' class='dialog_p'>申请已发送，请耐心等待</p><img data-node='QRcode' src=''><p class='dialog_p'>下载国美+APP随时关注</p>";
	var noop = function() {};

	var join = function(selector, done) {
	    var $ele = $(selector);
	    $ele.on('click', function() {
	        var groupId = $ele.data('groupid');
	        var bpData = {
	            event_id: $ele.attr('event-id'), // 埋点数据
	            group_id: groupId,
	            circle_type: $GLOBAL_CONFIG['s_c'] // 2级分类
	        };
	        if ($GLOBAL_CONFIG['topicid']) {
	            bpData.topic_id = $GLOBAL_CONFIG['topicid'];
	        }
	        // 发送统计数据
	        if (window.BP !== undefined) {
	            BP.send(bpData);
	        }

	        if ($ele.data('verif') == 1) {
	            alert('您已提交申请，请等待审核');
	            return;
	        }
	        var firing = $ele.data('firing');
	        if (firing === 1) {
	            return false;
	        }
	        $ele.data('firing', 1);
	        var userid = $ele.data('userid');
	        var approvaltype = $ele.data('approvaltype');

	        var noRefreshFetch = function(){
	             fetch.post(url.get('joinCircle'), {
	                validate: true,
	                data: {
	                    groupid: groupId,
	                    imid: 'b_' + userid
	                },
	                onLogin:noRefreshFetch
	            }).done(function(data, textStatus, jqXHR) {
	                if (data && data.code === 200 && data.success) {
	                    if (data.data.status === 0) {
	                        alert('恭喜您已经加入圈子！');
	                        $ele.hide();
	                    } else if (data.data.status === 1) {
	                        // alert('申请已发送，请耐心等待');
	                        var Dialog = alert('', {
	                            width: "500px",
	                            content: popTpl,
	                            cancel: false
	                        });
	                        $('[data-node=QRcode]').attr('src', $_CONFIG.imgpath + '/images/public/down-ma.png');
	                        $('.dialog_p').css({
	                            'text-align': 'center',
	                            'margin': '10px 0px',
	                            'font-size': '1.5em'
	                        });
	                        $('[data-node=QRcode]').css({
	                            'margin-left': '173px'
	                        });
	                        $ele.css('background', '#CCC').html('审核中').off();
	                    }
	                    done();
	                } else {
	                    if (data.message == '圈子拒绝加入' || data.code === 403) {
	                        alert('抱歉！该圈子不允许任何人加入！');
	                    } else if ( data.code === 409 ){
	                        alert(data.message);
							$ele.hide();		
	                        done();
	                    } else {
	                        alert(data.message);
	                    }
	                }
	            }).fail(function(jqXHR, textStatus, errorThrown) {
	                // console.log(arguments);
	            }).always(function() {
	                $ele.data('firing', 0);
	            });

	        }
	       noRefreshFetch();

	        return false;
	    });
	};
	module.exports = join;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * truncateLenByJson  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var truncate = __webpack_require__(49);
	var byteLen = __webpack_require__(46);
	var encodeHTML = __webpack_require__(209);
	var face = __webpack_require__(178);

	var truncateLenByJson = function(str, len) {
		var strLength = 0;
		var Len;
		for (var i in str) {
			if (str[i] === true) {
				strLength++;
			}
		}
		if (strLength !== 0) {
			var num = strLength;
			Len = len - (num * 8);
		} else {
			Len = len;
		}
		var l = byteLen(str.str);
		var s;
		if (l > Len) {
			s = truncate(str.str, Len) + '...';
		} else {
			s = str.str;
		}
		return face.parseEmoji(encodeHTML(s));
	};

	module.exports = function() {
		tmod.helper('truncateLenByJson', truncateLenByJson);
	};

/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topics/topic',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,topics=$data.topics,topic=$data.topic,index=$data.index,$escape=$utils.$escape,$string=$utils.$string,str=$data.str,isEssence=$data.isEssence,isUpper=$data.isUpper,$out='';$each(topics,function(topic,index){
	$out+=' ';
	if(topic.new_components && topic.user){
	$out+=' ';
	if(topic.new_components.shop){
	$out+=' <div class="circle-box shop2"> ';
	}else if(!topic.new_components.item && !topic.new_components.image && !topic.new_components.video){
	$out+=' <div class="circle-box no-pic"> ';
	}else{
	$out+=' <div class="circle-box"> ';
	}
	$out+=' <div class="mg-negative"> ';
	if(topic.new_components.shop || (!topic.new_components.item && !topic.new_components.image && !topic.new_components.video)){
	$out+=' <span class="topic-tag topic-tag-static"> ';
	}else{
	$out+=' <span class="topic-tag"> ';
	}
	$out+=' <em class="icon-lysy"> <img src="';
	$out+=$escape(topic.user.facePicUrl);
	$out+='" title="';
	$out+=$escape(topic.user.nickname);
	$out+='"> </em> ';
	$out+=$escape(topic.user.nickname);
	$out+=' </span>  ';
	if(topic.new_components.item){
	$out+=' <div class="list-img"> <a href="';
	$out+=$escape(topics.groupDomain);
	$out+='topic/';
	$out+=$escape(topic.id);
	$out+='.html" target="_blank" bp-data=\'{"event_id": "';
	$out+=$escape(topics.event_id);
	$out+='", "group_id": "';
	$out+=$escape(topics.group_id);
	$out+='", "topic_id": "';
	$out+=$escape(topic.id);
	$out+='"}\'>  <img src="';
	$out+=$escape(topic.new_components.item.item.mainImage);
	$out+='" title=""> </a> </div> <p class="list-price"> ¥ <span>';
	$out+=$escape(topic.new_components.item.item.salePrice);
	$out+='</span> ';
	if(topic.new_components.item.item.rebateSummary && topic.new_components.item.item.rebateSummary.refRebateMoney > 0){
	$out+=' <em class="fan-tag">返</em> ';
	}
	$out+=' </p> ';
	}else if(topic.new_components.image){
	$out+=' <div class="list-img"> <a href="';
	$out+=$escape(topics.groupDomain);
	$out+='topic/';
	$out+=$escape(topic.id);
	$out+='.html" target="_blank" bp-data=\'{"event_id": "';
	$out+=$escape(topics.event_id);
	$out+='", "group_id": "';
	$out+=$escape(topics.group_id);
	$out+='", "topic_id": "';
	$out+=$escape(topic.id);
	$out+='"}\'><img src="';
	$out+=$escape(topic.new_components.image.url);
	$out+='" title=""></a> </div> ';
	}else if(topic.new_components.video){
	$out+=' <div class="list-img"> <a href="';
	$out+=$escape(topics.groupDomain);
	$out+='topic/';
	$out+=$escape(topic.id);
	$out+='.html" target="_blank" bp-data=\'{"event_id": "';
	$out+=$escape(topics.event_id);
	$out+='", "group_id": "';
	$out+=$escape(topics.group_id);
	$out+='", "topic_id": "';
	$out+=$escape(topic.id);
	$out+='"}\'> <img src="';
	$out+=$escape(topic.new_components.video.coverImage);
	$out+='" title=""> <em class="icon-play"></em> </a> </div> ';
	}else if(topic.new_components.shop && topic.new_components.shop.shop){
	$out+=' <dl class="list-shop"> <dt> <a href="';
	$out+=$escape(topics.groupDomain);
	$out+='topic/';
	$out+=$escape(topic.id);
	$out+='.html" target="_blank" bp-data=\'{"event_id": "';
	$out+=$escape(topics.event_id);
	$out+='", "group_id": "';
	$out+=$escape(topics.group_id);
	$out+='", "topic_id": "';
	$out+=$escape(topic.id);
	$out+='"}\'> <img src="';
	$out+=$escape(topic.new_components.shop.shop.icon);
	$out+='" alt=""> </a> </dt> <dd> <a href="';
	$out+=$escape(topics.mallDomain);
	$out+='shop-';
	$out+=$escape(topic.new_components.shop.id);
	$out+='.html">';
	$out+=$escape(topic.new_components.shop.shop.name);
	$out+='</a> ';
	if(topic.new_components.shop.shop.promotionMark && topic.new_components.shop.shop.promotionMark.hasCouponPlan){
	$out+=' <em class="coupon-tag">优惠券</em> ';
	}
	$out+=' </dd> </dl> ';
	}
	$out+=' <div class="list-title"> <p class="list-title-content" data-node="list_nav"> ';
	if(topic.isUpper){
	$out+=' <em class="set-top">置顶</em> ';
	}
	$out+=' ';
	if(topic.isEssence){
	$out+=' <em class="set-spark">精品</em> ';
	}
	$out+=' ';
	if(topic.style === 1){
	$out+=' <em class="set-access">专访</em> ';
	}
	$out+=' <a data-node="list_title" href="';
	$out+=$escape(topics.groupDomain);
	$out+='topic/';
	$out+=$escape(topic.id);
	$out+='.html" target="_blank" bp-data=\'{"event_id": "';
	$out+=$escape(topics.event_id);
	$out+='", "group_id": "';
	$out+=$escape(topics.group_id);
	$out+='", "topic_id": "';
	$out+=$escape(topic.id);
	$out+='"}\'>';
	$out+=$string($helpers. truncateLenByJson({str:topic.name,isEssence:topic.isEssence,isUpper:topic.isUpper} , '52'));
	$out+='</a> <span class="list-title-time">';
	$out+=$escape(topic.time_str);
	$out+='</span> </p> </div> ';
	if(topic.new_components.text){
	$out+='  <p data-node="list_description" class="list-description" >';
	$out+=$string($helpers. truncateLenByJson({str:topic.new_components.text.text} , '74'));
	$out+='</p> ';
	}else if(topic.new_components.item){
	$out+='  <p data-node="list_description" class="list-description" >';
	$out+=$string($helpers. truncateLenByJson({str:topic.new_components.item.text} , '74'));
	$out+='</p> ';
	}else if(topic.new_components.image){
	$out+='  <p data-node="list_description" class="list-description" >';
	$out+=$string($helpers. truncateLenByJson({str:topic.new_components.image.text} , '74'));
	$out+='</p> ';
	}else if(topic.new_components.shop){
	$out+='  <p data-node="list_description" class="list-description" >';
	$out+=$string($helpers. truncateLenByJson({str:topic.new_components.shop.text} , '74'));
	$out+='</p> ';
	}
	$out+=' <div class="text-icon"> <a href="javascript:;" data-action="like" data-id="';
	$out+=$escape(topic.id);
	$out+='" data-type="1" data-praise="';
	$out+=$escape(topic.like.isLike === false ? 1 : 0);
	$out+='" data-count=';
	$out+=$escape(topic.like.userQuantity);
	$out+='> <em class="icon icon-collection">&#xeac9;</em> ';
	$out+=$escape(topic.like.userQuantity);
	$out+=' </a> <a href="javascript:;" class="a-share"> <em class="icon icon-share">&#xe9ed;</em> ';
	if(topic.replyQuantity === 0){
	$out+=' <span>0</span> ';
	}else{
	$out+=' <span>';
	$out+=$escape(topic.replyQuantity+topic.subReplyQuantity);
	$out+='</span> ';
	}
	$out+=' </a> <!-- <a data-action="shareto" data-surl="';
	$out+=$escape(topics.groupDomain);
	$out+='topic/detail?tid=';
	$out+=$escape(topic.id);
	$out+='" data-stitle="这儿有我们志趣相投的小伙伴，快加入我们吧" data-spic="" href="javascript:;" class="a-share"> <em class="icon icon-share"></em>分享到 </a> --> </div> </div> </div> ';
	}
	$out+=' ';
	});
	return new String($out);
	});

/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topics/no_topics','<div class="no-topic"> <div class="txt clearfix"><em class="icon">&#xe960;</em> <p> <span>抱歉，该圈子还没有话题！</span> <span>快去发布本圈子的<span class="red">第一个话题</span>吧！</span> </p> </div> </div>');

/***/ }

});