webpackJsonp([38],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var joinCircle = __webpack_require__(301);
	var share = __webpack_require__(302);
	// tmod helpers
	__webpack_require__(303)();
	__webpack_require__(255)();
	// 发送统计
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('group');

	//加入圈子
	joinCircle.init();
	//分享
	share.init();

/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * 分享到 微信，QQ，微博，空间
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var getQRCode = __webpack_require__(124);
	var checkLoginStatus = __webpack_require__(47);

	var APIS = {
	    qq: "http://connect.qq.com/widget/shareqq/index.html",
	    sina: "http://v.t.sina.com.cn/share/share.php",
	    qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"
	};

	var defaultInfo = {
	    url: 'http://www.gomeplus.com',
	    title: '国美PlusAPP边玩边分享，购物不孤单',
	    pic: 'http://www.gomeplus.com/images/logo.png', // logo图片地址
	    summary: '国美PlusAPP边玩边分享，购物不孤单'
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
	    sina: function sina(options) {
	        var link = APIS.sina + '?' + formatParams(options);
	        open(link);
	    },
	    qzone: function qzone(options) {
	        var link = APIS.qzone + '?' + formatParams(options, true);
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
	    }).fail(function (data) {
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
	    $item = typeof parent === 'string' ? $(parent) : parent;
	    selector = selector || '[data-action=shareto]';
	    // 显示分享按钮
	    $item.on('mouseenter', selector, function (e) {
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
	    $item.on('mouseleave', selector, function (e) {
	        $('[data-node=shareBtnBox]').hide();
	        return false;
	    });

	    $('body').on('click', '[data-shareto]', function (e) {
	        e.preventDefault();
	        shareType = $(this).data('shareto');
	        shareInfo.type = shareType;
	        beforeShare = beforeShare || function () {};
	        beforeShare.call(null, shareInfo);
	        // console.log(shareInfo);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	// 根据字符串生成二维码
	var getQRCode = function getQRCode(url) {
		return $_CONFIG.wap_url + 'q.php?t=' + encodeURIComponent(url);
	};

	module.exports = getQRCode;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	var imgPath = $_CONFIG.imgpath + '/images/emoji/';

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
	/*
	var groupThree = [{
	    name: '嘘',
	    url: 'xu'
	}, {
	    name: '哼哼',
	    url: 'hengheng'
	}, {
	    name: '爱慕',
	    url: 'aimu'
	}, {
	    name: '财迷',
	    url: 'caimi'
	}, {
	    name: '耶',
	    url: 'ye'
	}, {
	    name: '思考',
	    url: 'sikao'
	}, {
	    name: '骷髅',
	    url: 'kulou'
	}, {
	    name: '痛哭',
	    url: 'tongku'
	}, {
	    name: '恭喜',
	    url: 'gongxi'
	}, {
	    name: '捂脸',
	    url: 'wulian'
	}, {
	    name: '嘿哈',
	    url: 'heiha'
	}, {
	    name: '机智',
	    url: 'jizhi'
	}, {
	    name: '皱眉',
	    url: 'zhoumei'
	}, {
	    name: '安慰',
	    url: 'anwei'
	}, {
	    name: '飞吻',
	    url: 'feiwen'
	}, {
	    name: '奸笑',
	    url: 'jianxiao'
	}, {
	    name: '猪头',
	    url: 'zhutou'
	}, {
	    name: '玫瑰',
	    url: 'meigui'
	}, {
	    name: '凋谢',
	    url: 'diaoxie'
	}, {
	    name: '爱心',
	    url: 'aixin'
	}, {
	    name: '心碎',
	    url: 'xinsui'
	}, {
	    name: '蛋糕',
	    url: 'dangao'
	}, {
	    name: '喝水',
	    url: 'heshui'
	}];

	var groupFour = [{
	    name: '西瓜',
	    url: 'xigua'
	}, {
	    name: '咖啡',
	    url: 'kafei'
	}, {
	    name: '啤酒',
	    url: 'pijiu'
	}, {
	    name: '包包',
	    url: 'baobao'
	}, {
	    name: '高跟鞋',
	    url: 'gaogenxie'
	}, {
	    name: '帽子',
	    url: 'maozi'
	}, {
	    name: '口红',
	    url: 'kouhong'
	}, {
	    name: '裙子',
	    url: 'qunzi'
	}, {
	    name: 'T恤',
	    url: 'txu'
	}, {
	    name: '裤子',
	    url: 'kuzi'
	}, {
	    name: '眼镜',
	    url: 'yanjing'
	}, {
	    name: '太阳镜',
	    url: 'taiyangjing'
	}, {
	    name: '蜡烛',
	    url: 'lazhu'
	}, {
	    name: '礼物',
	    url: 'liwu'
	}, {
	    name: '红包',
	    url: 'hongbao'
	}, {
	    name: '拥抱',
	    url: 'yongbao'
	}, {
	    name: '太阳',
	    url: 'taiyang'
	}, {
	    name: '月亮',
	    url: 'yueliang'
	}, {
	    name: '便便',
	    url: 'bianbian'
	}, {
	    name: '炸弹',
	    url: 'zhadan'
	}, {
	    name: '菜刀',
	    url: 'caidao'
	}, {
	    name: '握手',
	    url: 'woshou'
	}, {
	    name: '胜利',
	    url: 'shengli'
	}];

	var groupFive = [{
	    name: '赞',
	    url: 'zan'
	}, {
	    name: 'OK',
	    url: 'ok'
	}, {
	    name: '勾引',
	    url: 'gouyin'
	}, {
	    name: 'NO',
	    url: 'no'
	}, {
	    name: '打脸',
	    url: 'dalian'
	}, {
	    name: '抱拳',
	    url: 'baoquan'
	}, {
	    name: '乒乓球',
	    url: 'pingpangqiu'
	}, {
	    name: '足球',
	    url: 'zuqiu'
	}, {
	    name: '篮球',
	    url: 'lanqiu'
	}];
	*/
	var format = function format(arr) {
	    for (var i = 0, len = arr.length; i < len; i++) {
	        var emoji = arr[i];
	        emoji.url = imgPath + emoji.url + ext;
	    }
	    return arr;
	};

	module.exports = format(groupOne.concat(groupTwo /*, groupThree, groupFour, groupFive*/));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	var path = $_CONFIG.imgpath + '/images/emoji/';
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

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/face/face',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,v=$data.v,i=$data.i,face=$data.face,$index=$data.$index,$escape=$utils.$escape,page=$data.page,$out='';$out+='<div data-node="faceBox" class="imoj-box" style="position: absolute;z-index: 9999;display:none"> <em class="sanjiao"></em> <div data-node="faceList" class="imoj-list"> ';
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
	$out+='>';
	$out+=$escape(i+1);
	$out+='</li> ';
	});
	$out+=' </ul> </div>';
	return new String($out);
	});

/***/ },

/***/ 233:
/***/ function(module, exports) {

	'use strict';

	var html = function html(str, reg) {
	    return str ? str.replace(reg || /[&<">'](?:(amp|lt|ldquo|rdquo|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
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
	            }[a];
	        }
	    }) : '';
	};

	module.exports = html;

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var emojis = __webpack_require__(157);
	var backward = __webpack_require__(158);
	var faceTpl = __webpack_require__(159);

	var faceReg,
	    faceUrl,
	    defaultIndex = 0;

	// 将表情转换成map
	var emojiMap = {};

	// 数据适配转换
	var makeData = function makeData(data) {
	    var total = data.length;
	    var offset = 24;
	    var page = Math.ceil(total / offset);
	    var list = [];

	    for (var i = 0; i < page; i++) {
	        list[i] = [];
	        var end = offset * (i + 1);
	        end = end > total ? total : end;
	        for (var j = i * offset; j < end; j++) {
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
	var show = function show(x, y) {
	    setShowIndex(0);
	    $('[data-node=faceBox]').css({
	        left: x + 'px',
	        top: y + 'px'
	    }).show();
	};
	// 表情层隐藏
	var hide = function hide() {
	    $('[data-node=faceBox]').hide();
	};
	// tab方式显示所选页
	var setShowIndex = function setShowIndex(index) {
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
	var insertFace = function insertFace(fn, isHide) {
	    $('body').on('click', '[data-face]', function (e) {
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
	var initHTML = function initHTML(fn) {
	    var data = makeData(emojis);
	    var faceHTML = faceTpl(data);
	    $('body').append(faceHTML);
	    fn();
	};
	// 初始化事件
	var initEvent = function initEvent() {
	    $('body').on('click', '[data-node=faceBox]', function (e) {
	        e.stopPropagation();
	    });
	    $(document).on('click', function () {
	        $('[data-node=faceBox]').hide();
	    });
	    // 分页切换显示
	    $('[data-node=faceBox]').on('mouseenter', '[data-action=facePage] > li', function () {
	        var index = $(this).index();
	        setShowIndex(index);
	    });
	};

	var isEmpty = function isEmpty(obj) {
	    var ret = true;
	    for (var key in obj) {
	        ret = false;
	        break;
	    }
	    return ret;
	};

	// 把表情占位符替换成img
	var parseEmoji = function parseEmoji(str) {
	    var r = /(\[([\s\S]+?)\])/g;
	    if (isEmpty(emojiMap)) {
	        makeData(emojis);
	    }

	    return str.replace(r, function (s, $1, name) {
	        var img = emojiMap[name];
	        if (img) {
	            return '<img width="22" height="22" src="' + img + '" />';
	        } else {
	            // 兼容旧版表情
	            var old = backward[name];
	            if (old) {
	                return '<img width="22" height="22" src="' + old.url + '" />';
	            }
	            return s;
	        }
	    });
	};

	var init = function init() {
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

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	/**
	 * othersLink  - tmod helpers
	 * 他人主页链接跳转
	 * @author Qiaoli
	 */

	var tmod = __webpack_require__(26);
	var othersLink = function othersLink(id) {
	    if ($_CONFIG.islogin !== '0' && $_CONFIG.userId == id) {
	        return $_CONFIG.i_domain + 'index';
	    } else {
	        return $_CONFIG.group_domain + 'ta/' + id + '.html';
	    }
	};

	module.exports = function () {
	    tmod.helper('othersLink', othersLink);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(37);
	var tips = __webpack_require__(36).circle;

	// var popTpl = "<p data-node='alertTitle' class='dialog_p'>申请已发送，请耐心等待</p><img data-node='QRcode' src=''><p class='dialog_p'>下载国美PlusAPP随时关注</p>";

	var join = function join(event) {
	    var $els = event.data ? event.data.selector || $(this) : $(this);
	    var done = event.data ? event.data.done || function () {} : function () {};
	    var groupId = $els.attr('data-groupid'),
	        bpData = {
	        event_id: $els.attr('event-id'), // 埋点数据
	        group_id: groupId,
	        circle_type: $_CONFIG['s_c'] // 2级分类
	    };
	    if ($_CONFIG['topicid']) {
	        bpData.topic_id = $_CONFIG['topicid'];
	    }
	    // 发送统计数据
	    if (window.BP !== undefined) {
	        BP.send(bpData);
	    }

	    if ($els.attr('data-verif') == 1) {
	        alert('您已提交申请，请等待审核');
	        return;
	    }
	    var firing = $els.attr('data-firing');
	    if (firing == 1) {
	        return false;
	    }
	    $els.attr('data-firing', 1);
	    var userid = $els.attr('data-userid');
	    // var approvaltype = $els.attr('data-approvaltype');
	    var noRefreshFetch = function noRefreshFetch() {
	        fetch.post(url.get('joinCircle'), {
	            validate: true,
	            data: {
	                groupid: groupId,
	                imid: 'b_' + userid
	            },
	            onLogin: function onLogin() {
	                $_CONFIG['islogin'] = '1';
	                noRefreshFetch();
	            }
	        }).done(function (data /*, textStatus, jqXHR*/) {
	            if (data && data.code === 200 && data.success) {
	                if (data.data.status === 0) {
	                    alert(tips.joinSuccess);
	                    $els.html('退出圈子');
	                } else if (data.data.status === 1) {
	                    // alert('申请已发送，请耐心等待');
	                    // var Dialog = alert('', {
	                    //     width: "500px",
	                    //     content: popTpl,
	                    //     cancel: false
	                    // });
	                    $('[data-node=QRcode]').attr('src', $_CONFIG.imgpath + '/images/public/down-ma.png');
	                    $('.dialog_p').css({
	                        'text-align': 'center',
	                        'margin': '10px 0px',
	                        'font-size': '1.5em'
	                    });
	                    $('[data-node=QRcode]').css({
	                        'margin-left': '173px'
	                    });
	                    $els.css('background', '#CCC').html('审核中').off();
	                }
	                done('join');
	            } else {
	                if (data.message == '圈子拒绝加入' || data.code === 403) {
	                    alert(tips.cannotJoinCircle);
	                } else if (data.code === 409) {
	                    alert(data.message);
	                    done('join');
	                } else {
	                    alert(data.message);
	                }
	            }
	        }).fail(function () /*jqXHR, textStatus, errorThrown*/{
	            // console.log(arguments);
	        }).always(function () {
	            $els.attr('data-firing', 0);
	        });
	    };
	    var exitCircle = function exitCircle() {
	        fetch.post(url.get('exitCircle'), {
	            data: {
	                groupid: groupId
	            }
	        }).done(function (data /*, textStatus, jqXHR*/) {
	            if (data && data.code == 200 && data.success) {
	                alert(tips.exit);
	                $_CONFIG['member_type'] = 1;
	                $els.html('加入圈子');
	            } else {
	                if (data.code == 410) {
	                    alert(tips.dissolved, {
	                        ok: function ok() {
	                            location.reload();
	                        },
	                        onclose: function onclose() {
	                            location.reload();
	                        }
	                    });
	                } else if (data.code == 404) {
	                    location.reload();
	                }
	            }
	        }).fail(function () /*jqXHR, textStatus, errorThrown*/{
	            // console.log(arguments);
	        }).always(function () {
	            $els.attr('data-firing', 0);
	        });
	    };
	    if ($_CONFIG['member_type'] == 0) {
	        exitCircle();
	    } else {
	        noRefreshFetch();
	    }
	    return false;
	};
	module.exports = join;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	// var praise = require('module/praise');
	var circle = __webpack_require__(284);
	var loginPop = __webpack_require__(3);
	var alert = __webpack_require__(37);
	var tips = __webpack_require__(36).circle;

	var init = function init() {
	    // 加入圈子
	    var $postTopic = $('[data-node=postTopic]');
	    $('[data-action=joinGroup]').on('click', { done: function done(str) {
	            if (str == 'join') {
	                $_CONFIG['member_type'] = 0;
	            } else if (str == 'exit') {
	                $_CONFIG['member_type'] = 1;
	            }
	        } }, circle);
	    $postTopic.on('click', function () {
	        var _this = this;
	        var memberType = $_CONFIG['member_type'];
	        if ($_CONFIG['islogin'] == '0') {
	            loginPop();
	            return false;
	        } else {
	            if (memberType == '1') {
	                //未加入圈子
	                if ($_CONFIG['approval_type'] == '2') {
	                    alert(tips.cannotJoin);
	                } else {
	                    alert(tips.unJoin, {
	                        okValue: '加入圈子',
	                        ok: function ok() {
	                            $('[data-action=joinGroup]').click();
	                        }
	                    });
	                }
	            } else if (memberType == '2') {
	                //加入圈子审核中
	                alert(tips.review);
	            } else {
	                //跳转到发话题页面
	                window.open($_CONFIG['group_domain'] + JSON.parse($(_this).attr('bp-data'))['publish_url']);
	            }
	        }
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var share = __webpack_require__(123).shareto;

	var init = function init() {
	    var $body = $("body"),
	        groupPicSrc = $('[data-node=groupPic]').attr('src');

	    function isPic(groupPicSrc) {
	        var reg = /\w+\.(jpg|gif|bmp|png)$/;
	        if (groupPicSrc == $_CONFIG.imgpath + '/images/public/circle-default.png') {
	            groupPicSrc = false;
	        }
	        return reg.test(groupPicSrc);
	    }

	    var getShareInfo = function getShareInfo() {
	        var shareInfo = {
	            url: location.href,
	            title: $('[data-node=groupName]').html(),
	            pic: isPic(groupPicSrc) ? groupPicSrc : $_CONFIG.imgpath + '/images/public/logo.jpg',
	            summary: '这儿有我们志趣相投的小伙伴，快加入我们吧！',
	            site: '国美Plus'
	        };
	        return shareInfo;
	    };

	    var shareTo = function shareTo(type) {
	        return function () {
	            var info = getShareInfo();
	            share[type](info);
	            // analytic(type); // 发送统计数据
	            return false;
	        };
	    };

	    // var channels = {
	    //     'wx': 'out-weixin',
	    //     'sina': 'out-xlwb',
	    //     'qq': 'out-QQ',
	    //     'qzone': 'out-Qqzone'
	    // };
	    // var analytic = function(channel) {
	    //     BP.send({
	    //         event_id: 'G000P007',
	    //         group_id: $GLOBAL_CONFIG['group_id'],
	    //         channel_id: channels[channel] || '',
	    //         circle_type: $GLOBAL_CONFIG['s_c']
	    //     });
	    // };
	    $body.on('click', "[data-node=wx]", function () {
	        var groupId = $_CONFIG['group_id'];
	        // https://m.gomeplus.com/group/topic?topicId=575f7ed91940eb5c2587f56a
	        share.weixin({
	            url: $_CONFIG.wap_url + 'group/index?groupId=' + groupId
	        });
	        // analytic('wx'); // 发送统计数据
	    });
	    $body.on('click', "[data-node=wb]", shareTo('sina'));
	    $body.on('click', "[data-node=qq]", shareTo('qq'));
	    $body.on('click', "[data-node=qzone]", shareTo('qzone'));
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * truncateLenByJson  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var truncate = __webpack_require__(42);
	var byteLen = __webpack_require__(43);
	var encodeHTML = __webpack_require__(233);
	var face = __webpack_require__(234);

	var truncateLenByJson = function truncateLenByJson(str, len) {
		var strLength = 0;
		var Len;
		for (var i in str) {
			if (str[i] === true) {
				strLength++;
			}
		}
		if (strLength !== 0) {
			var num = strLength;
			Len = len - num * 8;
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

	module.exports = function () {
		tmod.helper('truncateLenByJson', truncateLenByJson);
	};

/***/ }

});