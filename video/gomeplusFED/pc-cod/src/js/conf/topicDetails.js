webpackJsonp([30],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var circle = __webpack_require__(216);
	var follow = __webpack_require__(217);
	var praise = __webpack_require__(219);
	var commentv2 = __webpack_require__(220);
	var share = __webpack_require__(225);
	var collect = __webpack_require__(226);
	var ulFixed = __webpack_require__(227);
	// 发送统计数据用
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('topicDetail');

	var fixedTopic = __webpack_require__(221);
	fixedTopic.init();
	ulFixed.init();
	// 分享
	share.init();
	// 收藏
	collect.init();
	// 赞
	praise.init();
	// 加关注
	follow.init($('[data-node=follow]'));
	// 评论
	//comment.init();
	commentv2.init();
	// 加入圈子
	circle('[data-node=circle]', function() {
	    var $els = $('[data-node=circle]');
	    var approvaltype = $els.data('approvaltype');
	    if (approvaltype == 0) {
	        $els.css('backgroundColor', '#fc8753').html('发布话题');
	        $els.attr('href', '/topic/publiser?gid=' + $els.data('groupid'));
	        $els.attr('event-id', 'G000P010'); // 切换为发布话题的event_id
	    } else if (approvaltype == 1) {
	        $els.css('backgroundColor', '#ccc');
	    }
	    $els.off().show();

	    commentv2.getLoginState();
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

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

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {//加关注
	var dialogAlert = __webpack_require__(36);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var popTpl = __webpack_require__(218);
	var alert = __webpack_require__(36);

	var init = function(node, isfollowed) {
		if ($_CONFIG.islogin === 0) {
			alert('您还未登录,请登录后重试');
			return false;
		}
		var _node = node;
		var Request = function(option, node) {
			var _Rnode = node || false;
			fetch.get(option.url, {
				data: {
					userid: option.userid
				}
			}).done(function(data, textStatus, XHR) {
				if (data.code == '200') {
					if (option.isAlert) {
						var Dialog = dialogAlert('', {
							width: '600',
							content: popTpl(),
							ok: false,
							close: function() {
								Dialog.remove();
							}
						});
						$('[data-node=QRcode]').attr('src', $_CONFIG.imgpath + '/images/public/down-ma.png');
						$('[data-node=dialog_close]').on('click', function() {
							$(this).off();
							Dialog.remove();
						})
						$(_node).css('opacity', '0.7');
					} else {
						$(_node).css('opacity', '1');
					}
					if (_Rnode) {
						init(_Rnode)
					}
				} else {
					alert(data.message);
					if (_Rnode) {
						init(_Rnode)
					}
				}
			})
			_node.html(option.val);
		}
		if (isfollowed || isfollowed == '1' || !isfollowed == undefined) {
			_node.html('已关注').css('opacity', '0.7');
		}
		_node.on('click', function() {
			if ($_CONFIG.islogin == 0) {
				alert('您还未登录,请登录后重试');
				return false;
			}
			var option = {};
			option.userid = $(this).data('userid');
			if ($(this).html() == '已关注') {
				option.isAlert = false;
				option.url = url.get('unfollow');
				option.val = '加关注';
				$(this).off();
				Request(option, _node);
			} else {
				option.isAlert = true;
				option.url = url.get('follow');
				option.val = '已关注';
				$(this).off();
				Request(option, _node);
			}
		})
	}

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/follow','<div class="windows-bg" style="display:block"> <div class="windows-ma"><a data-node=\'dialog_close\' href="javascript:;" class="icon icon-close">&times;</a><img data-node=\'QRcode\' src=""> <p>扫描二维码，下载国美+APP查看消息</p> </div> </div>');

/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var praise = __webpack_require__(210);

	var $praiseClick = $("[data-node=praiseClick]");

	 if($praiseClick.children("em").hasClass("active")){
	    	$praiseClick.children("span").html("取消点赞");
	    }

	var init = function(){
	    praise('[data-node=ulFloat]', '[data-node=praiseClick]', {
	        mode: 'normal'
	    });
	   /* praise('[data-node=hot_topics]', '[data-action=like]', {
	        mode: 'normal'
	    });
	    */
	   
	    return false;
	};

	module.exports = {
	    init: init
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/*话题详情页 v2版本改造*/
	var hint = __webpack_require__(84);
	var fixedTopic = __webpack_require__(221);
	var alert = __webpack_require__(36);
	var fromNow = __webpack_require__(222);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var face = __webpack_require__(178);
	var encodeHtml = __webpack_require__(209);
	var commentList = __webpack_require__(223);
	var secondComList = __webpack_require__(224);

	var loginPop = __webpack_require__(3); //登录弹窗
	var checkLoginStatus = __webpack_require__(42);

	var Pubsub = __webpack_require__(43);
	var channel = __webpack_require__(68);

	var OBJELEM = {
	    userIsExpert: $GLOBAL_CONFIG['isExpert'], // 当前用户是否为达人
	    $comment_Msg: $("[data-node=comment_Msg]"),
	    $secondCom_Key: $("[data-node=secondCom_Key]"),
	    $loadlist: $("[data-node=loadlist]"),
	    a_Submit: $("[data-node=a_Submit]"), // 发布按钮
	    circleCom: $("[data-node=circleCom]"),
	    is_Login: checkLoginStatus() == true ? 1 : 0, // 判断登陆状态
	    LoginSrc: $_CONFIG.passport_domain, //登录注册域名
	    mall_domain: $_CONFIG.mall_domain //商城
	}


	OBJELEM.$loadlist.css("display", "none");
	$("[data-node=loading]").css("display", "none");
	$("[data-node=noload]").css("display", "none");

	var commentDomInit = function() {
	    OBJELEM.$comment_Msg.on('click', commentCheck)
	        //一级话题回复 绑定事件
	    OBJELEM.a_Submit.on("click", a_Submit);

	    //显示二级回复框
	    OBJELEM.circleCom.on("click", "[data-node=secondCom_Key]", secondCom_Key);

	    //点击收起 按钮，隐藏二级输入框
	    OBJELEM.circleCom.on("click", "[data-node=hideComBox]", hideComBox);

	    //二级话题回复
	    OBJELEM.circleCom.on("click", "[data-node=a_secondComBtn]", a_secondComBtn);

	    //表情添加
	    OBJELEM.$comment_Msg.on('click', '[data-node=smilies_Face]', showEmoji); //表情
	    //OBJELEM.$emoji.on("click", showEmoji);
	    OBJELEM.circleCom.on('click', '[data-node=smilies_Face]', showEmoji);

	    // 二级列表
	    OBJELEM.circleCom.on("click", "[data-node=showMoreList]", showMoreList);
	}

	var init = function() {
	    getCommentList(1, 10, 2);
	    // 初始化表情
	    face.init();

	    // 点击评论图标页面滚动到评论区域
	    goComment();
	    //登陆状态以及事件绑定
	    if (getLoginState()) {
	        face.insert(function(data) {
	            insertAtCursor(curretTextArea[0], data.reg);
	        });
	    }

	    commentDomInit();

	    //加载更多
	    $("[data-node=loading]").css("display", "none");
	    $("[data-node=noload]").css("display", "none");
	    $("[data-node=loadlist]").on("click", function() {
	        var addmorepages = $(this).attr("data-addmorepages"); //当前页
	        var listsize = $(this).attr("data-listsize"); //
	        var tootalPa = $(this).attr("data-tootlepa"); //总页数
	        var toPage = parseInt(addmorepages) + 1;
	        var nodelist = "nodelist";
	        getCommentList(toPage, listsize, 5, nodelist);
	        return false;
	    });
	}

	// 点击评论图标页面滚动到评论区域
	var goComment = function() {
	    var $go_comment = $('[data-action=goComment]');
	    $go_comment.on('click', function(e) {
	        if (window.BP) {
	            BP.send({
	                event_id: 'G000P008',
	                group_id: $GLOBAL_CONFIG.groupid,
	                topic_id: $GLOBAL_CONFIG.topicid,
	                circle_type: $GLOBAL_CONFIG.s_c,
	                channel_id: 'in-pinglun'
	            });
	        }

	        var offsetTop = $('[data-node=commentBox]').offset().top;
	        $('html,body').animate({
	            'scrollTop': offsetTop
	        }, 200);

	    });
	}

	var popUnion = function() {

	    var loginCallback = function() {
	        OBJELEM.is_Login = 1;
	        getLoginState();
	        $("[data-node=circleCom]").empty();
	        getCommentList(1, 10, 2);
	    }

	    loginPop({
	        onLogin: loginCallback
	    });
	}

	//判断是否登录
	var commentCheck = function() {
	    if (!checkLoginStatus()) {
	        popUnion();
	        return false;
	    }
	}

	// 判断登陆状态
	var getLoginState = function() {
	    var ISLOGIN = null;
	    if (!checkLoginStatus()) { //必须重新判断 别的无刷新事件修改了登录状态
	        //没有登录
	        ISLOGIN = "0";
	        OBJELEM.$comment_Msg.children("textarea").attr("readonly", "readonly").css("background", "#fff");
	        $("[data-node=secondCom_Key]").css("display", "none");
	    } else {
	        OBJELEM.$comment_Msg.children("textarea")
	            .removeAttr("readonly").css("background", "transparent");

	        OBJELEM.a_Submit.removeClass("pc-bj-fc8753").html("发布");

	        $("[data-node=secondCom_Key]").css("display", "block");
	        //添加事件
	        ISLOGIN = "1";
	    }
	    return ISLOGIN;
	}

	//一级话题回复
	var a_Submit = function() {
	    if (!checkLoginStatus()) {
	        popUnion();
	        return false;
	    }
	    var currUserImg = OBJELEM.$comment_Msg.attr("data-headface"); //头像
	    var parentDiv = $(this).parents().eq(1);
	    var comment_Msg = parentDiv.children("textarea").val();
	    comment_Msg = comment_Msg.trim(); //对输入空格进行过滤
	    //var groupId = parentDiv.attr("data-gid");
	    var data_userid = parentDiv.attr("data-userid");
	    var topicid = parentDiv.attr("data-tid");

	    if (comment_Msg) {
	        var imId = "b_" + data_userid;
	        var businessid = 0;
	        var topicType = 0;

	        var params = {
	            "reply_type": 0, //回复的类型
	            "topicid": topicid, //话题id
	            "content": comment_Msg //话题回复内容
	                // "pics"    : "",//话题回复图片
	                // "shopid"  : //如果topicType = 1 或者 =2 那么这个字段必填
	                //"itemid"  : //如果topicType = 1 那么这个字段必填 
	        }

	        //提交请求
	        fetch.post(url.get('commentFirstV2'), {
	            data: params
	        }).then(function(data) {

	            if (data.success) {
	                //console.log(data.data);
	                var Msg = data.data;
	                var contentMsg = Msg.content;
	                contentMsg = encodeHtml(contentMsg);
	                contentMsg = delHtmlTag(contentMsg);
	                contentMsg = htmlNull(contentMsg);
	                parentDiv.children("textarea").val("");
	                //time = timeString(Msg.createTime);
	                var basics = {
	                        "dlShowBorder": "clearfix bd-bottom",
	                        "userIsExpert": OBJELEM.userIsExpert, //当前用户是否是达人
	                        "isExpert": Msg.expertInfo.isExpert, //是否是达人
	                        "userPic": Msg.user.facePicUrl, //用户头像
	                        "username": Msg.user.nickname, //用户昵称
	                        "backTopicId": Msg.id, //本条评论id
	                        "content": face.parseEmoji(contentMsg), //过滤之后的内容 
	                        "topicType": topicType, // 评论类型
	                        "topicId": Msg.topicId, // 话题id
	                        "currUserImg": currUserImg, // 当前用户的头像，在二级评论框中显示
	                        "times": fromNow(timeString(Msg.createTime)), //评论时间
	                        "isFirstCom": true // 是否是一级评论  --  判断是否显示二级评论
	                    }
	                    //$("[data-node=noload]").css("display", "none");
	                $("[data-node=hidDiv]").css("display", "block");

	                var item = commentList(basics);
	                OBJELEM.circleCom.append($(item));
	                var newDL = $("[data-ddlist=" + basics.backTopicId + "]");
	                $("body").scroll(parseInt(newDL.offset().top));
	                fixedTopic.init();

	                // 评论成功后弹出对话框，并且页面跳转到最末尾
	                $("body,html").animate({
	                    scrollTop: parseInt($(".topic-lfet", ".wrap-box.wrap-reletive ").height())
	                });
	                hint.init("评论成功");
	                /*
	                alert("评论成功",{
	                    ok:function(){
	                        
	                        $("body,html").animate({ scrollTop: parseInt($(".topic-lfet",".wrap-box.wrap-reletive ").height()) });
	                    }
	                }); 
	                */
	            } else {

	                if (data.code === 881001) {
	                    alert("评论内容不能超过200个汉字");
	                } else if (data.code === 404 || data.code === 410) {
	                    alert("抱歉，该话题已被删除", {
	                        ok: function() {
	                            window.location.href = "/index/get_error?code=topic_404";
	                        }
	                    });
	                } else if (data.code === 422) {
	                    alert("抱歉，服务器君正在打盹", {
	                        ok: function() {
	                            window.location.href = "/index/get_error?code=500";
	                        }
	                    });
	                } else if (data.code === 403) {
	                    alert("抱歉，该话题审核不通过！", {
	                        ok: function() {
	                            window.location.href = "/index/get_error?code=topic";
	                        }
	                    });
	                } else {
	                    alert(data.message);
	                }

	            }
	        });
	    } else {
	        alert("输入有错，重新输入");
	    }

	}

	//点击回复按钮，显示二级输入框
	var secondCom_Key = function() {
	    if (!checkLoginStatus()) {
	        popUnion();
	        return false;
	    }

	    var replyuserid = $(this).attr("data-replyuserid");
	    //var replyimId = $(this).attr("data-imId");

	    var replycommentid = $(this).attr("data-replycommentid");
	    var topicid = $(this).attr("data-comid");
	    var username = $(this).attr("data-replayUser");
	    var dataPublis = $(this).attr("data-publish");
	    var isHide = $("[data-parenttopicid=" + topicid + "]").css("display");
	    var dataObj = $("[data-parentTopicId=" + topicid + "]");


	    dataObj.removeAttr("data-replyuserid");
	    //dataObj.removeAttr("data-imId");
	    dataObj.removeAttr("data-replayTo");
	    dataObj.removeAttr("data-replycommentid");
	    dataObj.removeAttr("data-isPublish");
	    //dataObj.attr("data-imId",replyimId);
	    dataObj.attr("data-replyuserid", replyuserid);
	    dataObj.attr("data-replayTo", username);
	    dataObj.attr("data-isPublish", dataPublis);
	    dataObj.attr("data-replycommentid", replycommentid);
	    dataObj.children(".topic-publish-content").children("textarea").attr("placeholder", username);
	    if (isHide == "none") {
	        dataObj.css("display", "block");
	        $("[data-parentTopicIdBtn=" + topicid + "]").css("display", "block");

	    }
	}

	//隐藏二级输入框
	var hideComBox = function() {
	    if (!checkLoginStatus()) {
	        popUnion();
	        return false;
	    }

	    var hideId = $(this).attr("data-parentTopicIdBtn");
	    $("[data-parentTopicId=" + hideId + "]").css("display", "none");
	    $("[data-parentTopicId=" + hideId + "]").children("textarea").attr("placeholder", "说点什么吧");
	    $("[data-parentTopicIdBtn=" + hideId + "]").css("display", "none");
	    $("[data-parentTopicId=" + hideId + "]").removeAttr("data-isPublish").removeAttr("data-replayTo");
	    $(".textarea-bx", "[data-parentTopicId=" + hideId + "]").val("");
	}

	//二级话题回复
	var a_secondComBtn = function() {
	    if (!checkLoginStatus()) {
	        popUnion();
	        return false;
	    }

	    var replayToPub = $(this).parents().eq(2).attr("data-ispublish"); //
	    var beReplyId = "";
	    var replayImid = "";

	    if (replayToPub == "1") {
	        replayToPub = false;
	    } else {
	        replayToPub = true;
	        beReplyId = $(this).parents().eq(2).attr("data-replycommentid");
	        replayImid = "b_" + $(this).parents().eq(2).attr("data-replyuserid");
	    }
	    var replyUserName = $("[data-node=comment_Msg]").attr("data-nickname");
	    var beReplyUserName = $(this).parents().eq(2).attr("data-replayto");
	    var tId = $(this).attr("data-gettopicid");
	    var groupId = $("[data-htid=" + tId + "]").attr("data-groupid");

	    var topicType = $("[data-htid=" + tId + "]").attr("data-topictype");;
	    var topicId = $("[data-htid=" + tId + "]").attr("data-tid");;
	    var content = $(this).parents().eq(1).children("textarea").val();
	    var contentLong = null;
	    if (content.length > 200) {
	        contentLong = true;
	    } else {
	        contentLong = false;
	    }
	    var imId = "b_" + $("[data-node=comment_Msg]").attr("data-userid");
	    var id = $(this).parents().eq(2).attr("data-replycommentid");
	    var replyId = tId;

	    var params = {
	        "topic_reply_id": replyId,
	        "topicid": topicId,
	        "content": content,
	        "topic_subreply_id": beReplyId
	    }

	    /*
	         topicid    是   String  回复的话题id
	        content 否   String  回复内容字数在200字内含200字
	        topic_reply_id  是   String  一级话题回复id
	        topic_subreply_id   否   String  被回复的二级回复ID
	        */

	    if (content && !contentLong) {

	        fetch.post(url.get('secondtopicV2'), {
	            data: params
	        }).then(function(data) {
	            if (data.success) {
	                //console.log(data);

	                var contentT = data.data.content;
	                contentT = encodeHtml(contentT);
	                contentT = face.parseEmoji(contentT);
	                contentT = delHtmlTag(contentT);
	                contentT = htmlNull(contentT);
	                //判断是二级回复还是三级回复


	                var beReplyUserName = "";
	                var beReplyUserId = "";


	                if (replayToPub) {

	                    beReplyUserName = data.data.topicSubReplyUser.nickname;
	                    beReplyUserId = data.data.topicSubReplyUser.id;
	                    // console.log("姓名" + beReplyUserName);
	                }

	                var showCom = {

	                    "topicType": 0,
	                    "backTopicId": tId,
	                    "parentCommentId": tId, //话题id
	                    "topicId": data.data.topicId,
	                    "replayToPub": replayToPub, //判断是二级回复还是三级回复
	                    "content": contentT, //回复内容
	                    "replyUserName": data.data.user.nickname, //回复人昵称                  
	                    "replyUserId": data.data.user.id, //回复人id
	                    "beReplyUserName": beReplyUserName, //被回复人的昵称
	                    "beReplyUserId": beReplyUserId, //被回复人的id
	                    "replyCommentId": data.data.id // 二级回复内容id 
	                }

	                var item = secondComList(showCom);
	                $("[data-ddlist=" + tId + "]").append(item);
	                $("[data-parentTopicIdBtn=" + tId + "]").css("display", "none");
	                $("[data-parentTopicId=" + tId + "]").css("display", "none");
	                $("[data-parentTopicId=" + tId + "]").removeAttr("data-replayto");
	                $(".textarea-bx", "[data-parentTopicId=" + tId + "]").val("");

	            } else {
	                if (data.code === 500 || data.message === "请求参数为空") {
	                    alert(data.message);
	                } else {
	                    // console.log(data.code);
	                    if (data.code === 403) {
	                        data.message = "抱歉，该回复审核不通过！";
	                    }
	                    alert(data.message, {
	                        ok: function() {
	                            $("[data-node=circleCom]").empty();
	                            getCommentList(1, 10, 2);
	                        }
	                    });
	                }

	            }
	        });
	    } else {
	        alert("评论内容不能超过200个汉字");
	    }


	};
	//一级列表
	var getCommentList = function(currPage, pageSize, listSize, nodelist) {
	        var topicNameId = $("[data-node=comment_Msg]").attr("data-tid"); //获取话题的ID
	        var currUserImg = $("[data-node=comment_Msg]").attr("data-headface");
	        var paramList = '?page=' + currPage + '&pagesize=' + pageSize + '&topicid=' + topicNameId;

	        $("[data-node=loadlist]").css("display", "none");
	        $("[data-node=loading]").css("display", "block");

	        fetch.get(url.get('commentListUrlV2') + paramList).then(function(data) {

	            if (data.success) {
	                //console.log(data);

	                //获取所有的一级评论
	                var topicReplys = data.data.topicReplys;

	                if (topicReplys.length > 0) {

	                    //显示 正在加载中
	                    $("[data-node=loading]").css("display", "block");
	                    $("[data-node=loadlist]").css("display", "block").attr("data-addMorePages", currPage).attr("data-ListSize", pageSize);

	                    for (var i = 0; i < topicReplys.length; i++) {

	                        //获取每个评论下的二级评论
	                        var topicMsg = topicReplys[i];
	                        var subReplyQuantity = topicMsg.subReplyQuantity; //二级回复的总数
	                        var subTop = topicMsg.topicSubReplys; //二级回复

	                        var replySecArr = []; //二级评论数组

	                        //判断是否显示  查看更多按钮 
	                        var showNum = null;
	                        var dlShowBorder = null;
	                        if (subReplyQuantity > listSize) {
	                            showMall = true;
	                            //删除一个class
	                            dlShowBorder = "clearfix";
	                            showNum = listSize;
	                        } else {
	                            showMall = false;
	                            showNum = parseInt(subTop.length);
	                            dlShowBorder = "clearfix bd-bottom";
	                        }

	                        for (var j = 0; j < showNum; j++) {
	                            var subTopMsg = subTop[j];
	                            if (subTopMsg) {
	                                // console.log(subTopMsg.creatorId +" " +subTopMsg.user.id);
	                                //判断是二级评论还是三级评论
	                                var replayToPub = null;
	                                var beReplyUserName = "";
	                                var beReplyUserId = "";
	                                if (subTopMsg.topicSubReplyUser) {

	                                    // 三级回复 
	                                    replayToPub = true;
	                                    beReplyUserName = subTopMsg.topicSubReplyUser.nickname;
	                                    beReplyUserId = subTopMsg.topicSubReplyUser.id;
	                                } else {

	                                    //二级回复
	                                    replayToPub = false;
	                                }

	                                //console.log(replayToPub);

	                                var contentSed = subTopMsg.content;
	                                contentSed = encodeHtml(contentSed);
	                                contentSed = face.parseEmoji(contentSed);
	                                contentSed = htmlNull(contentSed);

	                                //二级回复中参数
	                                var replySecMsg = {
	                                    "parentCommentId": topicMsg.id, //话题id
	                                    // "topicId": topicId, //
	                                    "replayToPub": replayToPub, //判断是二级回复还是三级回复
	                                    "content": contentSed, //回复内容
	                                    "replyUserName": subTopMsg.user.nickname, //回复人昵称                  
	                                    "replyUserId": subTopMsg.user.id, //回复人id
	                                    "beReplyUserName": beReplyUserName, //被回复人的昵称
	                                    "beReplyUserId": beReplyUserId, //被回复人的id
	                                    "replyCommentId": subTopMsg.id // 二级回复内容id 
	                                }

	                                replySecArr.push(replySecMsg);


	                            }

	                        }

	                        var content = topicMsg.content; //获取一级评论内容
	                        content = encodeHtml(content);
	                        content = face.parseEmoji(content);
	                        content = htmlNull(content);
	                        //console.log(topicPic);
	                        var topicPic = topicMsg.pics; //一级评论的图片
	                        var str = "";
	                        if (topicPic.length > 0) {
	                            var imgArr = topicPic;
	                            var imgArrLen = imgArr.length;

	                            $.each(imgArr, function(index, img) {
	                                str += "</br><img  style='max-height:500px;max-width:750px' src=" + img + " onerror='imgError(this)' >";
	                            })
	                        }
	                        content = content + str;

	                        //商品参数添加
	                        var itemsPic = ""; //商品图标
	                        var itemShopName = ""; //
	                        var itemPrice = "";
	                        var shopId = "";
	                        var itemShopId = "";
	                        if (topicMsg.item) {
	                            itemsPic = topicMsg.item.mainImage;
	                            itemShopName = topicMsg.item.name;
	                            itemPrice = topicMsg.item.price;
	                            shopId = topicMsg.item.id;
	                            itemShopId = topicMsg.item.shopId;
	                            rebateSummary = topicMsg.item.rebateSummary; //返利金额
	                            /*
	                            "discount": 0, // 直降金额
	                            "id": 1179,  //商品id
	                            "mainImage": "http://img.gomein.net.cn/image/prodimg/production_image/img/1000083845/1000027654",
	                            "name": "尤尼克斯（YONEX）SHB-60C羽毛球鞋",
	                            "originalPrice": 18400, //市场价格
	                            "price": 18400,
	                            "salePrice": 18400, 售价
	                            "saleQuantity": 16, 销量
	                            "shopId": 3,
	                            "skuHighestPrice": 45900,
	                            "status": -1,
	                            "stock": 50000
	                            */
	                        }

	                        //店铺参数
	                        var shopPic = "";
	                        var redPackage = "";

	                        if (topicMsg.shop) {
	                            shopPic = topicMsg.shop.icon;
	                            itemShopName = topicMsg.shop.name;
	                            if (topicMsg.shop.promotionMark) {
	                                redPackage = topicMsg.shop.promotionMark.hasCouponPlan; //是否有优惠券
	                            }
	                            //redPackage = topicMsg.shop.promotionMark.hasCouponPlan; //是否有优惠券
	                            itemShopId = topicMsg.shop.id;

	                        }
	                        //所有参数集合
	                        var showDateList = {
	                            "dlShowBorder": dlShowBorder,
	                            "showMall": showMall,
	                            "userIsExpert": OBJELEM.userIsExpert, //当前用户是否是达人
	                            "isExpert": topicMsg.expertInfo.isExpert, //是否是达人
	                            "userPic": topicMsg.user.facePicUrl, //用户头像
	                            "username": topicMsg.user.nickname, //用户昵称
	                            "backTopicId": topicMsg.id, //本条评论id
	                            "content": face.parseEmoji(content), //过滤之后的内容 
	                            "topicType": topicMsg.replyType, // 评论类型
	                            "topicId": topicMsg.topicId, // 话题id
	                            "currUserImg": currUserImg, // 当前用户的头像，在二级评论框中显示
	                            "times": fromNow(timeString(topicMsg.createTime)), //评论时间
	                            "isFirstCom": false, // 是否是一级评论  --  判断是否显示二级评论
	                            "secondReply": replySecArr, // 二级评论数组
	                            //商品参数
	                            "mall_domain": OBJELEM.mall_domain,
	                            "itemsPic": itemsPic,
	                            "itemShopName": itemShopName,
	                            "itemPrice": itemPrice,
	                            "shopId": shopId,
	                            "itemShopId": itemShopId,
	                            // 店铺参数
	                            "redPackage": redPackage,
	                            "shopPic": shopPic


	                        }

	                        var item = commentList(showDateList);
	                        OBJELEM.circleCom.append($(item));

	                        $("[data-node=loading]").css("display", "none");
	                        $("[data-node=loadlist]").css("display", "block");

	                        //没有登录时不显示 “回复”
	                        if (OBJELEM.is_Login == "0") {
	                            $("[data-node=secondCom_Key]").css("display", "none");
	                        }

	                        //
	                        if (topicReplys.length < pageSize) {
	                            $("[data-node=loadlist]").css("display", "none");
	                        }

	                        fixedTopic.init();
	                        if (nodelist) {
	                            var windowHeight = parseInt($(window).height());
	                            var height = $(".topic-lfet").height() - windowHeight;

	                            $(window).scrollTop(height);
	                        }

	                    }

	                } else {
	                    //$("[data-node=noload]").css("display", "block");
	                    $("[data-node=loading]").css("display", "none");
	                    if (pageSize == 1) {
	                        $("[data-node=hidDiv]").css("display", "none");
	                    }
	                }

	            } else {
	                $("[data-node=loadlist]").css("display", "none");
	                $("[data-node=noload]").css("display", "block");
	                $("[data-node=loading]").css("display", "none");
	            }

	        });

	    }
	    //二级列表
	var showMoreList = function() {


	    var groupId = $(this).attr("data-groupId");
	    var imId = $(this).attr("data-imId");
	    var topicType = $(this).attr("data-topicType");
	    var commentid = $(this).attr("data-htid");
	    var tid = $(this).attr("data-tid");
	    var tootalPages = $(this).attr("data-tootlePages"); //
	    var currentPage = $(this).attr("data-currentPage"); //当前页数
	    var pageSize = $(this).attr("data-pageSize"); //当前展示列表数
	    var a = Math.ceil(parseInt(tootalPages) / parseInt(pageSize)); //获取总页数
	    var b = parseInt(tootalPages) % parseInt(pageSize); //获取最后一页的列表数目
	    var toPage = parseInt(currentPage) + 1;
	    var obj = $(this);
	    var paramList = '?page=1&pagesize=70&topic_replyid=' + commentid;
	    var objHtml = obj.html();
	    console.log(11)
	    if (objHtml === "查看回复...") {
	        getRelyList(paramList, obj);
	    } else {
	        //
	        var childrens = $("[data-ddlist=" + commentid + "]").children(".comments-s");
	        //console.log(childrens);
	        for (var k = 2; k < childrens.length; k++) {
	            childrens.eq(k).remove();
	        }
	        obj.html("查看回复...");
	    }


	    function getRelyList(paramList, obj) {
	        fetch.get(url.get('getRelyListV2') + paramList).then(function(data) {
	            //console.log(data);

	            var replyCommentList = data.data.topicSubReplys;
	            if (replyCommentList.length > 2) {

	                $("[data-ddlist=" + commentid + "]").children(".comments-s").remove();
	                for (var i = 0; i < replyCommentList.length; i++) {

	                    var replyaList = replyCommentList[i];
	                    var content = replyaList.content;
	                    content = encodeHtml(content);
	                    content = face.parseEmoji(content);
	                    content = htmlNull(content);
	                    var beReplyUserName = "";
	                    var beReplyUserId = "";
	                    var replayToPub = false;

	                    if (replyaList.topicSubReplyUser) {
	                        beReplyUserName = replyaList.topicSubReplyUser.nickname;
	                        beReplyUserId = replyaList.topicSubReplyUser.id;
	                        replayToPub = true;
	                    }
	                    var showCom = {

	                        "topicType": 0,
	                        "backTopicId": commentid,
	                        "parentCommentId": commentid, //话题id
	                        "topicId": replyaList.topicId,
	                        "replayToPub": replayToPub, //判断是二级回复还是三级回复
	                        "content": content, //回复内容
	                        "replyUserName": replyaList.user.nickname, //回复人昵称                  
	                        "replyUserId": replyaList.user.id, //回复人id
	                        "beReplyUserName": beReplyUserName, //被回复人的昵称
	                        "beReplyUserId": beReplyUserId, //被回复人的id
	                        "replyCommentId": replyaList.id // 二级回复内容id 
	                    }
	                    var item = secondComList(showCom);
	                    //console.log(showCom);
	                    $("[data-ddlist=" + commentid + "]").append(item);
	                    if (OBJELEM.is_Login == "0") {
	                        $("[data-node=secondCom_Key]").css("display", "none");
	                    }
	                    obj.html("收起");
	                    //obj.css("display", "none");

	                }
	            } else {
	                obj.addClass("hide");
	                $("[data-ddlist=" + commentid + "]").parent().addClass("bd-bottom");
	            }
	        });
	    }
	}


	//表情添加
	var curretTextArea;
	var selectText = function(textbox, startIndex, stopIndex) {
	    if (textbox.setSelectionRange) {
	        textbox.setSelectionRange(startIndex, stopIndex);
	    } else if (textbox.createTextRagen) {
	        var range = textbox.createTextRange();
	        range.collapse(true);
	        range.moveStart('character', startIndex);
	        range.moveEnd('character', stopIndex - startIndex);
	        range.select();
	    }
	    textbox.focus();
	};

	var insertAtCursor = function(textbox, text) {
	    if (textbox.selectionStart >= 0) {
	        var val = textbox.value;
	        var startIndex = textbox.selectionStart;
	        var endIndex = textbox.selectionEnd;
	        textbox.value = val.substring(0, startIndex) + text + val.substring(textbox.selectionEnd);
	        textbox.selectionStart = textbox.selectionEnd = startIndex + text.length;
	        textbox.focus();
	    } else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
	        textbox.focus();
	        var range = document.selection.createRange();
	        range.text = text;
	        range.select();
	    }
	};
	var showEmoji = function() {
	    if (!checkLoginStatus()) {
	        popUnion();
	        return false;
	    }

	    var $this = $(this);
	    var offset = $this.offset();
	    var x = offset.left - 2;
	    var y = offset.top + 38;

	    curretTextArea = $this.closest('div').prev();
	    if ($('[data-node=faceBox]').is(':hidden')) {
	        face.show(x, y);
	    } else {
	        face.hide();
	    }
	    return false;
	};



	function timeString(str) {
	    var date = new Date(str);
	    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

	}

	function delHtmlTag(str) {
	    return str.replace(/&lt(.*?)&gt;/g, ""); //去掉所有的html标记
	}



	function htmlNull(str) {
	    var re = str.replace(/\n|\r\n/g, "</br>");
	    return re; //去掉所有的html标记
	}


	 // 订阅
	    Pubsub(channel.comment.enableEditor).sub(function(data) {
	       if(data.pid == "enable"){
	             getLoginState();
	       }  
	    });


	module.exports = {
	    init: init,
	    getLoginState: getLoginState
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {//固定话题详情页右侧 热门话题

	var init = function(){

	var lastScroll = 0;
			$(window).scroll(function(){	
				var $topic_lfet = $(".topic-lfet");
				var $topic_right = $(".topic-right");
				
				var leftHeight = parseInt($topic_lfet.height()); //左侧高度
				var rightHeight = parseInt($topic_right.height());//右侧高度
				var windowHeight =parseInt($(window).height()); //窗口的高度
				var size = rightHeight - windowHeight; //右侧和窗口高度差
				var floatRight = $("body").width() - $(".wrap-box").width();
					floatRight = parseInt(floatRight) /2;
				var bodyHeight = parseInt($("body").height()); 
				var top =  parseInt($(this).scrollTop()); 
				var headerH = parseInt($("[data-node=header]").height()) + parseInt($(".wrap-box").height());
				var footerH = parseInt($(".footer").height());


				var topFixedBoolean= fixedToTopB(windowHeight , rightHeight);  

			    if(topFixedBoolean){ 
			    	//吸顶

			    	if(top -headerH > 0 &&  top < bodyHeight-footerH-310){

			    		$topic_right.css({
								"position" : "fixed",
								"right" : floatRight +"px"
							}).addClass("top_ly").removeClass("bottom_ly");
			    	}else if(top > bodyHeight-footerH-310){
			    		console.log(12);
			    		$topic_right.css({
								"position" : "absolute",
								"right" : 0 +"px"
							}).addClass("bottom_ly").removeClass("top_ly");
			    	}else{
			    		console.log(34);
			    		$topic_right.css({
								"position" : "absolute",
								"right" : 0 +"px"
							}).addClass("top_ly").removeClass("bottom_ly");
			    	}

			 		
				}else{ 
			 	  //吸底

			 	if(leftHeight +100 > rightHeight){   //初始化判断
						if(lastScroll - top <0){ 
							//下滑
							if(top - headerH >= size ){ //判断滚轮滑动的距离 比右侧栏高度高
								if(top < bodyHeight - footerH - windowHeight){
									$topic_right.css({
										"position" : "fixed",
										"right" : floatRight +"px"
									}).addClass("bottom_ly").removeClass("top_ly");
								}else{
									$topic_right.css({
										"position" : "absolute",
										"right" : "0px"
									}).addClass("bottom_ly").removeClass("top_ly");
								}
							}
						}else{
							//上滑
								if(top + windowHeight - headerH > rightHeight & top + 50< bodyHeight - footerH - windowHeight){
									//console.log(21);
									$topic_right.css({
										"position" : "fixed",
										"right" : floatRight +"px"
									}).addClass("bottom_ly").removeClass("top_ly");
								}else if(top+ windowHeight - headerH <= rightHeight ){
									$topic_right.css({
										"position" : "absolute",
										"right" : "0px",
									}).removeClass("bottom_ly").addClass("top_ly");	
								}
								
						}
						lastScroll = top;
					}
			   }
			
	});
		

	}

	//判断吸顶还是吸底
	function  fixedToTopB(winHeight, $objHeight){
		if($objHeight > winHeight){
			return false;
		}else{
			return true;
		}
	}


	function  topFixed(){

	}

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 222:
/***/ function(module, exports) {

	// 传入的时间格式  2016-04-27 15:12:58
	var fromNow = function(timeStr) {
	    /**
	      1）1个小时以内发表的消息，显示发表的分钟数，如“20分钟前”；
	      2）在24小时以内，发表的信息，显示具体小时数，如“15小时前”；
	      3）大于24小时小于48小时，发表的消息，显示昨天；
	      4）大于48小时小于72小时，发表的消息，显示2天前；大于72小时小于96小时，发表的消息，显示3天前；依此类推，最多到7天前
	      5）超过7天前，显示具体年/月/日
	    **/

	    var showTime = "";
	    var time = new Date(timeStr).getTime();
	    var date = new Date().getTime();
	    var num = date - time;
	    var oneMin = 60000,
	        oneHour = 3600000;
	    oneDay = 24 * 3600000;
	    if (num < oneMin) {
	        showTime = '1分钟前';
	        //console.log(showTime);
	    } else if (num >= oneMin & num < oneHour) {
	        var s = Math.floor(num / oneMin);
	        showTime = s + "分钟前";
	        //console.log(showTime);
	    } else if (num >= oneHour & num < oneDay) {
	        var s = Math.floor(num / oneHour);
	        showTime = s + "小时前";
	        //console.log(showTime);
	    } else if (num >= oneDay & num < 2 * oneDay) {
	        var s = Math.floor(num / oneDay);
	        showTime = "昨天";
	        //console.log(showTime);
	    } else if (num >= 2 * oneDay & num < 7 * oneDay) {
	        var s = Math.floor(num / oneDay);
	        showTime = s + "天前";
	        //console.log(showTime);
	    } else {
	        showTime = timeStr;
	        //console.log(showTime);
	    }

	    return showTime;
	}
	module.exports = fromNow;


/***/ },

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/comment/commentList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,topicType=$data.topicType,$escape=$utils.$escape,dlShowBorder=$data.dlShowBorder,isExpert=$data.isExpert,userPic=$data.userPic,backTopicId=$data.backTopicId,topicId=$data.topicId,username=$data.username,times=$data.times,$string=$utils.$string,content=$data.content,isFirstCom=$data.isFirstCom,$each=$utils.$each,secondReply=$data.secondReply,value=$data.value,i=$data.i,imId=$data.imId,itemsPic=$data.itemsPic,itemShopName=$data.itemShopName,itemPrice=$data.itemPrice,mall_domain=$data.mall_domain,shopId=$data.shopId,itemShopId=$data.itemShopId,shopPic=$data.shopPic,redPackage=$data.redPackage,showMall=$data.showMall,groupId=$data.groupId,replyCommentNum=$data.replyCommentNum,currentPage=$data.currentPage,pageSize=$data.pageSize,userIsExpert=$data.userIsExpert,currUserImg=$data.currUserImg,$out='';$out+=' ';
	if(topicType =="0"){
	$out+=' <dl class="';
	$out+=$escape(dlShowBorder);
	$out+=' "> <dt> ';
	if(isExpert){
	$out+=' <em class="icon-daren"></em>';
	}
	$out+=' <img src="';
	$out+=$escape(userPic);
	$out+='" onerror="imgError(this, \'g\')"> </dt> <dd data-ddList="';
	$out+=$escape(backTopicId);
	$out+='"> <div class="circle-comments-title" data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+='> <a href="javascript:void(0)" >';
	$out+=$escape(username);
	$out+='</a> <span>';
	$out+=$escape(times);
	$out+='</span> <a href="javascript:;" class="fr" data-node="secondCom_Key" data-comId="';
	$out+=$escape(backTopicId);
	$out+='" data-replayUser=';
	$out+=$escape(username);
	$out+=' data-publish="1">回复</a> <p class="clearfix">';
	$out+=$string(content);
	$out+='</p> </div> ';
	if(!isFirstCom){
	$out+=' ';
	$each(secondReply,function(value,i){
	$out+=' <div class="comments-s" data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+='> <a href="javascript:void(0)" data-replyUserId=';
	$out+=$escape(value.replyUserId);
	$out+='>';
	$out+=$escape(value.replyUserName);
	$out+='</a> ';
	if(value.replayToPub){
	$out+=' ：<span> 回复</span> ';
	}
	$out+=' <a href="javascript:void(0)" data-replyCommentId =';
	$out+=$escape(value.replyCommentId);
	$out+='>';
	$out+=$escape(value.beReplyUserName);
	$out+=':</a> <span data-replyCommentId=';
	$out+=$escape(value.replyCommentId);
	$out+='>';
	$out+=$string(value.content);
	$out+='</span> <a href="javascript:;" class="fr" data-getTopicId=';
	$out+=$escape(backTopicId);
	$out+=' data-node="secondCom_Key" data-replayUser=';
	$out+=$escape(value.replyUserName);
	$out+=' data-publish="0" data-comId="';
	$out+=$escape(value.parentCommentId);
	$out+='" data-replyCommentId =';
	$out+=$escape(value.replyCommentId);
	$out+=' data-replyUserId=';
	$out+=$escape(value.replyUserId);
	$out+=' data-imId=';
	$out+=$escape(imId);
	$out+='>回复</a> </div> ';
	});
	$out+=' ';
	}
	$out+=' </dd> </dl> ';
	}
	$out+='  ';
	if(topicType=="1"){
	$out+=' <dl class="li-bor-top bd-bottom"> <dt class="small-user-head"><img src="';
	$out+=$escape(userPic);
	$out+='" onerror="imgError(this, \'g\')"></dt> <dd class="reply-content" data-ddList="';
	$out+=$escape(backTopicId);
	$out+='"> <div class="reply-bx" data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+='> <div class="head-tex-bx"> <a href="javascript:;" class="head-small">';
	$out+=$escape(username);
	$out+='</a> <span>';
	$out+=$escape(times);
	$out+='</span> <a href="javascript:;" class="reply-btn" data-node="secondCom_Key" data-comId="';
	$out+=$escape(backTopicId);
	$out+='" data-replayUser=';
	$out+=$escape(username);
	$out+=' data-publish="1">回复</a> </div> <p class="p-content">';
	$out+=$string(content);
	$out+='</p> </div> <div class="reply-details"> <div class="reply-picture"> <img src="';
	$out+=$escape(itemsPic);
	$out+='" onerror="imgError(this, \'g\')"> </div> <div class="reply-contxt"> <p> ';
	$out+=$escape(itemShopName);
	$out+='</p> <p class="price-numb">￥<span>';
	$out+=$escape(itemPrice);
	$out+='</span></p> </div> <a href="';
	$out+=$escape(mall_domain);
	$out+='product/';
	$out+=$escape(shopId);
	$out+='-';
	$out+=$escape(itemShopId);
	$out+='.html" target="_blank" class="see-details pc-btn pc-btnw105 pc-btnh40" data-shopId=';
	$out+=$escape(shopId);
	$out+=' data-itemShopId=';
	$out+=$escape(itemShopId);
	$out+=' data-node="checkDetailMsg">查看详情</a> </div> ';
	if(!isFirstCom){
	$out+=' ';
	$each(secondReply,function(value,i){
	$out+=' <div class="comments-s" data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+='> <a href="javascript:void(0)" data-replyUserId=';
	$out+=$escape(value.replyUserId);
	$out+='>';
	$out+=$escape(value.replyUserName);
	$out+='</a> ';
	if(value.replayToPub){
	$out+=' <span>：回复</span> ';
	}
	$out+=' <a href="javascript:void(0)" data-replyCommentId =';
	$out+=$escape(value.replyCommentId);
	$out+='>';
	$out+=$escape(value.beReplyUserName);
	$out+='</a> <span data-replyCommentId=';
	$out+=$escape(value.replyCommentId);
	$out+='>：';
	$out+=$string(value.content);
	$out+='</span> <a href="javascript:;" class="fr" data-getTopicId=';
	$out+=$escape(backTopicId);
	$out+=' data-node="secondCom_Key" data-replayUser=';
	$out+=$escape(value.replyUserName);
	$out+=' data-publish="0" data-comId="';
	$out+=$escape(value.parentCommentId);
	$out+='" data-replyCommentId =';
	$out+=$escape(value.replyCommentId);
	$out+=' data-replyUserId=';
	$out+=$escape(value.replyUserId);
	$out+=' data-imId=';
	$out+=$escape(imId);
	$out+='>回复</a> </div> ';
	});
	$out+=' ';
	}
	$out+=' </dd> </dl> ';
	}
	$out+='  ';
	if(topicType=="2"){
	$out+=' <dl class="li-bor-top bd-bottom"> <dt class="small-user-head"><img src="';
	$out+=$escape(userPic);
	$out+=' " onerror="imgError(this, \'g\')"></dt> <dd class="reply-content" data-ddList="';
	$out+=$escape(backTopicId);
	$out+='"> <div class="reply-bx" data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+='> <div class="head-tex-bx"> <a href="javascript:;" class="head-small">';
	$out+=$escape(username);
	$out+='</a> <span>';
	$out+=$escape(times);
	$out+='</span> <a href="javascript:;" class="reply-btn" data-node="secondCom_Key" data-comId="';
	$out+=$escape(backTopicId);
	$out+='" data-replayUser=';
	$out+=$escape(username);
	$out+=' data-publish="1">回复</a> </div> <p class="p-content">';
	$out+=$string(content);
	$out+='</p> </div> <div class="reply-details"> <div class="reply-picture"><img src="';
	$out+=$escape(shopPic);
	$out+='" onerror="imgError(this, \'g\')"></div> <div class="reply-contxt"> <p> ';
	$out+=$escape(itemShopName);
	$out+=' ';
	if(redPackage){
	$out+=' <span class="topic-label">优惠券</span> ';
	}
	$out+=' </p> </div> <a href="';
	$out+=$escape(mall_domain);
	$out+='shop-';
	$out+=$escape(itemShopId);
	$out+='.html" class="see-details pc-btn pc-btnw105 pc-btnh40" data-shopId=';
	$out+=$escape(shopId);
	$out+=' data-itemShopId=';
	$out+=$escape(itemShopId);
	$out+=' data-node="checkDetailMsg">进入店铺</a> </div> ';
	if(!isFirstCom){
	$out+=' ';
	$each(secondReply,function(value,i){
	$out+=' <div class="comments-s" data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+='> <a href="javascript:void(0)" data-replyUserId=';
	$out+=$escape(value.replyUserId);
	$out+='>';
	$out+=$escape(value.replyUserName);
	$out+='</a> ';
	if(value.replayToPub){
	$out+=' <span>：回复</span> ';
	}
	$out+=' <a href="javascript:void(0)" data-replyCommentId =';
	$out+=$escape(value.replyCommentId);
	$out+='>';
	$out+=$escape(value.beReplyUserName);
	$out+='</a> <span data-replyCommentId=';
	$out+=$escape(value.replyCommentId);
	$out+='>：';
	$out+=$string(value.content);
	$out+='</span> <a href="javascript:;" class="fr" data-getTopicId=';
	$out+=$escape(backTopicId);
	$out+=' data-node="secondCom_Key" data-replayUser=';
	$out+=$escape(value.replyUserName);
	$out+=' data-publish="0" data-comId="';
	$out+=$escape(value.parentCommentId);
	$out+='" data-replyCommentId =';
	$out+=$escape(value.replyCommentId);
	$out+=' data-replyUserId=';
	$out+=$escape(value.replyUserId);
	$out+=' data-imId=';
	$out+=$escape(imId);
	$out+='>回复</a> </div> ';
	});
	$out+=' ';
	}
	$out+=' </dd> </dl> ';
	}
	$out+=' ';
	if(!isFirstCom){
	$out+=' ';
	if(showMall){
	$out+=' <a href="javascript:;" class="comments-more" data-node="showMoreList" data-groupId=';
	$out+=$escape(groupId);
	$out+=' data-imId=';
	$out+=$escape(imId);
	$out+=' data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+=' data-tootlePages=';
	$out+=$escape(replyCommentNum);
	$out+=' data-currentPage= ';
	$out+=$escape(currentPage);
	$out+=' data-pageSize=';
	$out+=$escape(pageSize);
	$out+='>查看回复...</a> ';
	}
	$out+=' ';
	}
	$out+=' <a class="pack-up" style="display: none" data-node="hideComBox" data-parentTopicIdBtn=';
	$out+=$escape(backTopicId);
	$out+='>收起</a> <div class="text-field-box margin-width" style="display: none" data-parentTopicId=';
	$out+=$escape(backTopicId);
	$out+='> <div class="topic-user-head"> ';
	if(userIsExpert){
	$out+=' <em class="icon-daren"></em>';
	}
	$out+=' <img src="';
	$out+=$escape(currUserImg);
	$out+='" onerror="imgError(this, \'g\')"> </div> <div class="topic-publish-content"> <textarea placeholder="说点什么吧…" class="textarea-bx" data-node="textarea-bx"></textarea> <div class="publish-face-bx"> <p class="icon-face" data-node="smilies_Face"><em class="icon">&#Xe95c;</em> 表情</p> <a href="javascript:;" class="pc-btn pc-btnh30 pc-btnw105" data-node="a_secondComBtn" data-getTopicId=';
	$out+=$escape(backTopicId);
	$out+='>发布</a> </div> </div> </div> ';
	return new String($out);
	});

/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/comment/secondComList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,topicType=$data.topicType,backTopicId=$data.backTopicId,topicId=$data.topicId,replyUserId=$data.replyUserId,replyUserName=$data.replyUserName,replayToPub=$data.replayToPub,replyCommentId=$data.replyCommentId,beReplyUserName=$data.beReplyUserName,$string=$utils.$string,content=$data.content,parentCommentId=$data.parentCommentId,imId=$data.imId,$out='';$out+='<div class="comments-s" data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+='> <a href="javascript:void(0)" data-replyUserId="';
	$out+=$escape(replyUserId);
	$out+='">';
	$out+=$escape(replyUserName);
	$out+='</a> ';
	if(replayToPub){
	$out+=' ：<span>回复</span> <a href="javascript:void(0)" data-replyCommentId ="';
	$out+=$escape(replyCommentId);
	$out+='">';
	$out+=$escape(beReplyUserName);
	$out+='</a> ';
	}
	$out+=' <span data-replyCommentId=';
	$out+=$escape(replyCommentId);
	$out+='>：';
	$out+=$string(content);
	$out+='</span> <a href="javascript:;" class="fr" data-node="secondCom_Key" data-getTopicId=';
	$out+=$escape(backTopicId);
	$out+=' data-replayUser=';
	$out+=$escape(replyUserName);
	$out+=' data-publish="0" data-comId="';
	$out+=$escape(parentCommentId);
	$out+='" data-replyCommentId="';
	$out+=$escape(replyCommentId);
	$out+='" data-imId="';
	$out+=$escape(imId);
	$out+='" data-replyUserId=';
	$out+=$escape(replyUserId);
	$out+=' >回复</a> </div> ';
	return new String($out);
	});

/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var share = __webpack_require__(121).shareto;

	var init = function() {
	    var $wx = $('[data-node=wx]');
	    var $wb = $('[data-node=wb]');
	    var $qq = $('[data-node=qq]');
	    var $qzone = $('[data-node=qzone]');

	    var gomeplusLogo = $_CONFIG.imgpath + '/images/public/down-logo.png';

	    var getShareInfo = function($node) {
	        var $ul = $node.closest('ul');
	        var shareInfo = {
	            url: $ul.data('surl'),
	            title: $ul.data('stitle'),
	            pic: $ul.data('spic') || gomeplusLogo,
	            desc: $ul.data('content')
	        };
	        return shareInfo;
	    };

	    var shareTo = function(type) {
	        return function() {
	            var info = getShareInfo($(this));
	            share[type](info);
	            analytic(type); // 发送统计数据
	            return false;
	        };
	    };

	    var evtType = 'click';
	    var $conf = $GLOBAL_CONFIG;

	    var channels = {
	        'wx': 'out-weixin',
	        'sina': 'out-xlwb',
	        'qq': 'out-QQ',
	        'qzone': 'out-Qqzone'
	    };
	    var analytic = function(channel) {
	        BP.send({
	            event_id: 'G000P008',
	            group_id: $conf.groupid,
	            topic_id: $conf.topicid,
	            circle_type: $conf.s_c,
	            channel_id: channels[channel] || ''
	        });
	    };
	    $wx.on(evtType, function() {
	        // 当前话题页所对应的wap页的地址
	        // https://m-pre.gomeplus.com/group/topic?topicId=56dfeac86af14853711f4668
	        share.weixin({
	            url: $_CONFIG.wap_url + 'group/topic?topicId=' + $conf.topicid
	        });
	        analytic('wx'); // 发送统计数据
	        return false;
	    });
	    $wb.on(evtType, shareTo('sina'));
	    $qq.on(evtType, shareTo('qq'));
	    $qzone.on(evtType, shareTo('qzone'));
	};

	module.exports = {
	    init: init
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {/**
	 * 话题收藏/取消收藏
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(36);
	var Pubsub = __webpack_require__(43);
	var channel = __webpack_require__(68);

	var login = function() {
	    window.location.href = $_CONFIG.passport_domain + 'login/index';
	};
	var $collect = $("[data-node=collect]");
	if ($collect.children("em").hasClass("active")) {
	    $collect.children("span").html("取消收藏");
	}


	var init = function() {
	    var $ele = $('[data-node=collect]');
	    $ele.on('click', function() {
	        var $CONF = $_CONFIG;
	        if (window.BP) {
	            BP.send({
	                event_id: 'G000P008',
	                group_id: $CONF.groupid,
	                topic_id: $CONF.topicid,
	                circle_type: $CONF.s_c,
	                channel_id: 'in-shoucang'
	            });
	        }

	        var $this = $(this);
	        var firing = $this.data('firing');
	        if (firing) {
	            return false;
	        }
	        $this.data('firing', 1);
	        var iscollect = $this.data('status');
	        // 1 收藏, 2 取消收藏
	        var t = iscollect === 0 ? 1 : 2;

	        var objs = {
	                    validate: true,
	                    data: {
	                        groupId: $GLOBAL_CONFIG['groupid'],
	                        topicId: $GLOBAL_CONFIG['topicid'],
	                        type: t
	                    },
	                    onLogin: noRefreshFetch,
	                    refresh:true    // 目前登录和收藏需要刷新页面
	                }

	        //无刷新登录
	        function noRefreshFetch (o) { 
	            fetch.post(url.get('collectTopic'), o).done(function(data) {
	                //订阅评论区编辑状态
	                Pubsub(channel.comment.enableEditor).pub({
	                    pid: "enable"
	                });
	                if (data && data.code === 200 && data.success) {

	                    if (t === 1) {
	                        $this.data('status', 1);
	                        $this.find('em').addClass('active');
	                        $this.find('span').text('取消收藏');
	                    } else if (t === 2) {
	                        $this.data('status', 0);
	                        $this.find('em').removeClass('active');
	                        $this.find('span').text('收藏');
	                    }
	                } else if (data && data.code === 422) {
	                    login();
	                } else {
	                    alert(data.message);
	                }
	            }).fail(function() {

	            }).always(function() {
	                $this.data('firing', 0);
	            });
	        }

	        noRefreshFetch(objs);
	        return false;
	    });
	};

	module.exports = {
	    init: init
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {
	var ulFixed ={
		init:
		function() {
	       /*
	        var $ulObj = $("ul.source-lef-list");
	        var $ulParent = $ulObj.parent();
	        var ulOffsetTop = $ulObj.offset().top;
	        var ulHeight = $ulObj.height();
	        
	        var windowH = $(window).height();

	        $(window).scroll(function(){
	           var parentHeight = $(".topic-conter").height();

	            if(parentHeight > windowH){
	              //console.log(parentHeight);
	           
	            var leftS =parseInt($(".wrap-box.ovflow-hid").css("margin-left"));
	           
	            var scrollTop = $("body").scrollTop();
	             console.log(scrollTop);
	             //console.log(ulOffsetTop);
	            if(scrollTop >= ulOffsetTop & scrollTop < parentHeight-60){
	                 console.log(leftS);
	                $ulObj.css({
	                    "position": "fixed",
	                    "left": leftS + 20+"px"
	                }).addClass("top_ly").removeClass("bottom_ly");
	            }else if(scrollTop >= parentHeight-60){
	                $ulObj.css({
	                    "position":"absolute",
	                    "left":"0px"
	                }).addClass("bottom_ly").removeClass("top_ly");
	            }else {
	                $ulObj.css({
	                    "position":"absolute",
	                    "left":"0px"
	                }).addClass("top_ly").removeClass("bottom_ly");
	            }
	                }
	        });
	*/
	     
	    var $ulObj = $("ul.source-lef-list");
	    var $ulParent = $ulObj.parent();
	    var ulHeight = $ulObj.height();
	    	//$ulParent.css("height","1800px");

	    var doup = 0;
	    $(window).scroll(function(){
	    	var parentHeight = $ulParent.height()+100;
	    
	        var parentTop = $ulParent.position().top +220;
	        var scrollHeight = $(this).scrollTop();
	        if(ulHeight < parentHeight & scrollHeight > parentTop){
	            
	            var leftS = $(".wrap-box.ovflow-hid").css("margin-left");
	            leftS = parseInt(leftS.substring(0,leftS.length-2)) +20;
	            var s = scrollHeight -parentTop; //父级div距离页面顶部隐藏的距离
	            var a = parentHeight - ulHeight-100; //ul 和父级div之间的高度差
	            var o = scrollHeight > parentTop + a ? false : true;  
	            if(o){
	                $ulObj.css({
	                    "position": "fixed",
	                    "top" : "6px",
	                    "left": leftS+"px"
	                });
	            }
	            var scrollSize = scrollHeight-doup;
	            doup = scrollHeight;
	            if(scrollSize > 0 & scrollHeight > parentTop + a){
	                //console.log(45);
	                $ulObj.css({
	                    "position":"absolute",
	                     "top" : a+"px",
	                     "left":"0px"
	                });
	            }
	            if(scrollSize < 0 & scrollHeight < parentTop ){
	                $ulObj.css({
	                    "position":"absolute",
	                    "top" : "6px",
	                    "left":"0px"
	                });
	            }
	            
	        }else{
	            $ulObj.css({
	                    "position":"absolute",
	                    "top" : "6px",
	                    "left":"0px"
	                });
	        }
	       
	        doup = scrollHeight;
	    });

	    }
	}
	module.exports = ulFixed;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});