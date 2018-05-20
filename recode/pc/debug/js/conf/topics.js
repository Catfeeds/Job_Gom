webpackJsonp([30],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var joinCircle = __webpack_require__(264);
	var checkCreateStatus = __webpack_require__(35);
	var share = __webpack_require__(265);
	var change = __webpack_require__(266);
	// var ratio = require('./changeRatio');
	var tabbar = __webpack_require__(267);
	// tmod helpers
	__webpack_require__(70)();
	__webpack_require__(201)();
	// 发送统计
	var buriedPoint = __webpack_require__(40);
	buriedPoint.setPageData('group');
	//加入圈子
	joinCircle.init();
	//创建圈子
	checkCreateStatus.init();
	//分享
	share.init();
	//换一换功能
	change.init();
	//宽窄屏转换
	//ratio.init();
	//内容选项卡切换
	tabbar.init();

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

	/*TMODJS:{}*/
	!function () {
		function a(a, b) {
			return (/string|function/.test(typeof b) ? h : g)(a, b)
		}
	
		function b(a, c) {
			return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
		}
	
		function c(a) {
			return l[a]
		}
	
		function d(a) {
			return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
		}
	
		function e(a, b) {
			if (m(a))for (var c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
		}
	
		function f(a, b) {
			var c = /(\/)[^\/]+\1\.\.\1/, d = ("./" + a).replace(/[^\/]+$/, ""), e = d + b;
			for (e = e.replace(/\/\.\//g, "/"); e.match(c);)e = e.replace(c, "/");
			return e
		}
	
		function g(b, c) {
			var d = a.get(b) || i({filename: b, name: "Render Error", message: "Template not found"});
			return c ? d(c) : d
		}
	
		function h(a, b) {
			if ("string" == typeof b) {
				var c = b;
				b = function () {
					return new k(c)
				}
			}
			var d = j[a] = function (c) {
				try {
					return new b(c, a) + ""
				} catch (d) {
					return i(d)()
				}
			};
			return d.prototype = b.prototype = n, d.toString = function () {
				return b + ""
			}, d
		}
	
		function i(a) {
			var b = "{Template Error}", c = a.stack || "";
			if (c)c = c.split("\n").slice(0, 2).join("\n"); else for (var d in a)c += "<" + d + ">\n" + a[d] + "\n\n";
			return function () {
				return "object" == typeof console && console.error(b + "\n\n" + c), b
			}
		}
	
		var j = a.cache = {}, k = this.String, l = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		}, m = Array.isArray || function (a) {
				return "[object Array]" === {}.toString.call(a)
			}, n = a.utils = {
			$helpers: {}, $include: function (a, b, c) {
				return a = f(c, a), g(a, b)
			}, $string: b, $escape: d, $each: e
		}, o = a.helpers = n.$helpers;
		a.get = function (a) {
			return j[a.replace(/^\.\//, "")]
		}, a.helper = function (a, b) {
			o[a] = b
		}, module.exports = a
	}();

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var loginPop = __webpack_require__(22); //登录弹窗
	var checkLoginStatus = __webpack_require__(23);
	var alert = __webpack_require__(36);
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	
	var $node = $("[data-node=createCircle]");
	var LoginStatus = 0;
	var gotoPage = function gotoPage() {
	    // var href = $node.attr("href");
	    // location.href = href;
	    var href = $node.attr("href").slice(1);
	    fetch.post(url.get('createCircle1'), {
	        // validate: true,
	        // data: {
	        //     groupid: groupId,
	        //     imid: 'b_' + userid
	        // }
	        /*,
	        onLogin: function (){
	            $_CONFIG['islogin'] = '1';
	            noRefreshFetch();
	        }*/
	        async: false
	    }).done(function (data /*, textStatus, jqXHR*/) {
	        if (data && data.success) {
	            if (data.check === 0) {
	                if (LoginStatus == 1) {
	                    alert("用户创建的圈子已达到上限");
	                } else if (LoginStatus == 2) {
	                    alert("用户创建的圈子已达到上限", {
	                        ok: function ok() {
	                            window.location.reload();
	                        }
	                    });
	                }
	            } else if (data.check === 1) {
	                if (LoginStatus == 1) {
	                    window.open($_CONFIG['group_domain'] + href);
	                    window.location.reload();
	                } else if (LoginStatus == 2) {
	                    window.open($_CONFIG['group_domain'] + href);
	                }
	            }
	        }
	    }).fail(function () /*jqXHR, textStatus, errorThrown*/{
	        // console.log(arguments);
	    }).always(function () {
	        // $els.attr('data-firing', 0);
	    });
	};
	
	function init() {
	    $node.on("click", function (event) {
	        event.preventDefault();
	        if (!checkLoginStatus()) {
	            LoginStatus = 1;
	            loginPop(gotoPage);
	        } else {
	            LoginStatus = 2;
	            gotoPage();
	        }
	        return false;
	    });
	};
	
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

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

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

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
	
	var format = function format(arr) {
	    for (var i = 0, len = arr.length; i < len; i++) {
	        var emoji = arr[i];
	        emoji.url = imgPath + emoji.url + ext;
	    }
	    return arr;
	};
	
	module.exports = format(groupOne.concat(groupTwo, groupThree, groupFour, groupFive));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var Dialog = __webpack_require__(37);
	var noop = function noop() {};
	
	var create = function create(content, options) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * truncateLenByJson  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(34);
	var truncate = __webpack_require__(71);
	var byteLen = __webpack_require__(72);
	var encodeHTML = __webpack_require__(73);
	var face = __webpack_require__(74);
	
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

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * [truncate 按字节截取字符串]
	 * @param  {[function]}  getLength [获取长度的方法]
	 * @param  {[string]}  string [截取的字符串]
	 * @param  {[number]}  byteLength [截取的长度]
	 * @return {string}           [返回截取后的字符串]
	 */
	var byteLen = __webpack_require__(72);
	
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

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

	"use strict";
	
	var byteLen = function byteLen(str) {
	    if (str == null) return 0;
	    if (typeof str != "string") {
	        str += "";
	    }
	    return str.replace(/[^\x00-\xff]/g, "01").length;
	};
	
	module.exports = byteLen;

/***/ }),

/***/ 73:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var emojis = __webpack_require__(54);
	var backward = __webpack_require__(75);
	var faceTpl = __webpack_require__(76);
	
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
	
	// 把表情占位符替换成img
	var parseEmoji = function parseEmoji(str) {
	    var r = /(\[([\s\S]+?)\])/g;
	    if ($.isEmptyObject(emojiMap)) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/module/popup/face/face',function($data,$filename
	/*``*/) {
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

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * truncateByteLen  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(34);
	var truncate = __webpack_require__(71);
	var byteLen = __webpack_require__(72);
	var encodeHTML = __webpack_require__(73);
	var face = __webpack_require__(74);
	
	var truncateByteLen = function truncateByteLen(str, len) {
		var l = byteLen(str);
		var s;
		if (l > len) {
			s = truncate(str, len) + '...';
		} else {
			s = str;
		}
		return face.parseEmoji(encodeHTML(s));
	};
	
	module.exports = function () {
		tmod.helper('truncateByteLen', truncateByteLen);
	};

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Created by dongyukuan on 2016/7/4.
	 */
	var inputTip = {
	    tel: {
	        ept: '请填写11位手机号',
	        err: '手机号格式错误',
	        errBack: '该手机号已被注册'
	    },
	    msgCode: {
	        tipGet: '请获取短信验证码',
	        tipEpt: '请输入短信验证码',
	        tipErr: '验证码是6位数字,请重新输入',
	        tipErrEdit: '验证码错误',
	        tipWrong: '验证码有误,请重新输入',
	        checkCodeWrong: '验证码输入错误,请重新输入',
	        send: '验证码已发送，请注意查收',
	        tipSend: '验证码已发送您的手机，10分钟内输入有效',
	        tipDisabled: "验证码再次获取需间隔60s",
	        tipLimitEdit: '获取验证码超限，请稍后再试',
	        btnAfterSend: "秒后重新获取",
	        btnDefault: "获取验证码"
	    },
	    pwd: {
	        commonTip: '请输入6-20位英文字母,数字或符号'
	    },
	    pwdV: {
	        ept: '请再次输入密码',
	        err: '两次输入的密码不一致'
	    },
	    nickName: {
	        eptName: '请输入昵称！',
	        commonTip: '昵称只能输入2-20位字符、字母、数字、-、_',
	        existName: '此昵称太受欢迎了，已经有人抢了~',
	        sucSub: '资料修改成功！',
	        errLine: "网络超时!",
	        wrongName: '此昵称含有敏感词,请重新输入'
	    },
	    birthTip: {
	        tip: '生日不能重复设置'
	    },
	    refCode: {
	        err: '推荐码错误'
	    },
	    imgCode: {
	        ept: '请输入验证码',
	        err: '验证码输入错误，请重新输入'
	    },
	    login: {
	        errCode: '请输入验证码',
	        errNum: '请输入账号',
	        errPwd: '请输入密码',
	        agreement: '请同意协议并勾选'
	    },
	    createCircle: {
	        typeEmpty: '请选择圈子分类',
	        nameEmpty: '圈子名称不能为空',
	        upperLimit: '抱歉，您创建的圈子已经达到上限，暂不能创建！'
	    },
	    circle: {
	        login: '登录成功！',
	        unJoin: '需要先加入该圈子才能发布话题',
	        cannotJoin: '抱歉！该圈子不允许发布话题!',
	        review: '加入圈子审核中，请耐心等待!',
	        joinSuccess: '恭喜您已经加入圈子！',
	        joinSuccessPublic: '恭喜您已经加入圈子，快来发布话题吧！',
	        cannotJoinCircle: '抱歉！该圈子不允许任何人加入！',
	        exit: '您已经退出该圈子！',
	        dissolved: '抱歉！该圈子已被解散'
	    },
	    qrCodeTip: {
	        loseEffTip: '二维码已失效',
	        loseEffBtn: '点击刷新',
	        failGetTip: '二维码生成失败',
	        failGetBtn: '重新生成'
	    },
	    masterApply: {
	        nameLength: '姓名要2-20个字符',
	        nameType: '姓名仅限汉字和字母',
	        isIdCard: '请填写18位有效身份证号',
	        type: '请选择达人类别',
	        summary: '请输入自我介绍，2-100个字符'
	    },
	    upload: {
	        noUpload: '请上传图片',
	        uploadError: '请上传小于4M的图片，支持格式jpg、jpeg、png、gif！',
	        uploadFaild: '上传失败,请重新上传',
	        uploadError_Master: '请上传小于4M的图片，支持格式jpg、jpeg、png、gif!',
	        Q_EXCEED_NUM_LIMIT: '请上传小于4M的图片，支持格式jpg、jpeg、png、gif！',
	        Q_EXCEED_SIZE_LIMIT: '总文件大小超出限制',
	        Q_TYPE_DENIED: '文件类型错误',
	        F_EXCEED_SIZE: '请上传jpg、png格式且小于4M的图片！',
	        excess: '文件个数超出限制'
	    },
	    errLine: {
	        tip: '网络错误,请稍后再试！'
	    }
	};
	module.exports = inputTip;

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

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var alert = __webpack_require__(36);
	var confirm = __webpack_require__(64);
	var tips = __webpack_require__(83).circle;
	var checkLoginStatus = __webpack_require__(23);
	var loginPop = __webpack_require__(22);
	
	// var popTpl = "<p data-node='alertTitle' class='dialog_p'>申请已发送，请耐心等待</p><img data-node='QRcode' src=''><p class='dialog_p'>下载国美APP随时关注</p>";
	
	var join = function join(event) {
		var $els = event.data ? event.data.selector || $(this) : $(this);
		var $action = $els.attr('data-action');
		var done = event.data ? event.data.done || function () {} : function () {};
		var word = event.data ? event.data.word || { join: '加入圈子', focus: '退出圈子' } : { join: '加入圈子', focus: '退出圈子' };
		var groupId = $els.attr('data-groupid'),
		    memberType = $els.attr('data-membertype'),
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
		/*var firing = $els.attr('data-firing');
	 if (firing == 1) {
	 	return false;
	 }
	 $els.attr('data-firing', 1);*/
		var userid = $els.attr('data-userid');
		// var approvaltype = $els.attr('data-approvaltype');
	
	
		var newWeb = '';
		var noRefreshFetch = function noRefreshFetch(flag) {
			fetch.post(url.get('joinCircle'), {
				// validate: true,
				data: {
					groupid: groupId,
					imid: 'b_' + userid /*,
	                        onLogin: function (){
	                        $_CONFIG['islogin'] = '1';
	                        noRefreshFetch();
	                        }*/
				} }).done(function (data /*, textStatus, jqXHR*/) {
				if (data && data.code === 200 && data.success) {
					if (data.data.status === 0) {
						if ($action && $action == 'joinGroup' && !flag) {
							confirm(tips.joinSuccessPublic, {
								className: 'pop-box',
								okValue: '暂不发布',
								cancelValue: '立即发布话题',
								okCls: 'pc-btn pc-btnh35 circle-pop-btn circle-cancel-btn',
								cancelCls: 'pc-btn pc-btnh35 circle-pop-btn',
								content: '<button data-active="close-join" class="ui-dialog-close icon icon-close" title="取消">×</button><div i="title" class="ui-dialog-title" style="border-bottom: none;"></div><p class="del-pop-p">' + tips.joinSuccessPublic + '</p>',
								ok: function ok() {},
								cancel: function cancel() {
									// var $postTopic = $('[data-node=postTopic]');
									var url = 'topic/publiser?gid=' + $els.attr('data-groupid');
									window.open($_CONFIG['group_domain'] + url);
								}
							});
						} else if ($action && $action == 'joinCircle') {
							alert(tips.joinSuccess);
						} else {
							alert(tips.joinSuccess);
						}
						$('[data-active=close-join]').on('click', function () {
							$('.pop-box-backdrop').hide();
							$('[role=alertdialog]').hide();
						});
						$els.html(word.focus);
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
						// $els.css('background', '#CCC').html('审核中').off();
						// $els.html(word.join);
						alert('您已申请加入圈子，请等待圈主审核');
						done("joining", $els);
						setTimeout(function () {
							flag && location.reload();
						}, 1500);
					}
					done("join", $els);
				} else {
					if (data.code === 403 || data.message == '圈子拒绝加入') {
						alert(tips.cannotJoinCircle);
					} else if (data.code === 409) {
						$els.html(word.join);
						if (data.error) {
							if (data.error.code === '2' || data.message === '该圈子人数已达上限') {
								alert(data.message);
								done("limit", $els);
							} else if (data.error.code === '3' || data.message === '您已申请加入圈子，请等待圈主审核') {
								alert(data.message);
								done("joining", $els);
							} else if (data.error.code === '1' || data.message === '您已加入该圈子！') {
								alert(data.message);
								done("joined", $els);
								$els.html(word.focus);
								// location.reload();
							}
						}
					} else {
						alert(data.message);
					}
				}
			}).fail(function () /*jqXHR, textStatus, errorThrown*/{
				// console.log(arguments);
			}).always(function () {
				// $els.attr('data-firing', 0);
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
					$els.attr('data-membertype', 1);
					$els.html(word.join);
					done("exit", $els);
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
		if (!checkLoginStatus()) {
			loginPop(function () {
				$_CONFIG['islogin'] = '1';
				noRefreshFetch(1);
				setTimeout(function () {
					window.location.href = window.location;
				}, 1500);
			});
			return;
		}
		if (memberType == 0) {
			exitCircle();
		} else {
			noRefreshFetch();
		}
		return false;
	};
	module.exports = join;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';
	
	/**
	 * othersLink  - tmod helpers
	 * 他人主页链接跳转
	 * @author Qiaoli
	 */
	
	var tmod = __webpack_require__(34);
	var othersLink = function othersLink(id) {
	    if ($_CONFIG.islogin !== '0' && $_CONFIG.userId == id) {
	        return $_CONFIG.i_domain + 'member/profileHome';
	    } else {
	        return $_CONFIG.group_domain + 'ta/' + id + '.html';
	    }
	};
	
	module.exports = function () {
	    tmod.helper('othersLink', othersLink);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';
	
	/*
	@Author:dongyukuan
	@data:2017/3/2
	话题详情页和圈子主页的分享埋点
	使用方法：
	    1、var shareBP = require('module/shareBP');
	    2、shareBP(opts);
	       注：opts={
	            page:是圈子主页还是话题详情页
	            shareTo:分享到微信、微博等
	            share_id:topic_id或group_id
	       }
	*/
	
	var fetch = __webpack_require__(21);
	var api = 'https://beacon.gomeplus.com/log_share';
	var shareObj = {
	    ht: {
	        share: {
	            qq: '2010506904',
	            qz: '2020506904',
	            wx: '2030506904',
	            wb: '2050506904'
	        },
	        url: {
	            qq: location.href + '&cmpid=fx_pc_qq' + $_CONFIG.share_time,
	            qz: location.href + '&cmpid=fx_pc_qz' + $_CONFIG.share_time,
	            wx: location.href + '&cmpid=fx_pc_wx' + $_CONFIG.share_time,
	            wb: location.href + '&cmpid=fx_pc_wb' + $_CONFIG.share_time
	        }
	    },
	    qz: {
	        share: {
	            qq: '2010507903',
	            qz: '2020507903',
	            wx: '2030507903',
	            wb: '2050507903'
	        },
	        url: {
	            qq: location.href + '&cmpid=fx_pc_qq' + $_CONFIG.share_time,
	            qz: location.href + '&cmpid=fx_pc_qz' + $_CONFIG.share_time,
	            wx: location.href + '&cmpid=fx_pc_wx' + $_CONFIG.share_time,
	            wb: location.href + '&cmpid=fx_pc_wb' + $_CONFIG.share_time
	        }
	    },
	    user_id: $_CONFIG.userId,
	    cookie_id: $_CONFIG.share_ssid,
	    env: $_CONFIG.share_env
	};
	
	function jianjie(data) {
	    console.log(data);
	};
	
	function shareBP(opts) {
	    var page = opts.page; //需传入'topic'(话题详情页)；'circle'(圈子主页);
	    var shareTo = opts.shareTo; //分享到哪(qq,qzone,wx,sina);
	    var share_id = opts.shareId; //topic_id或group_id;
	    function getcookie(objname) {
	        //获取指定名称的cookie的值
	        var cookieArr = document.cookie.split("; ");
	        for (var i = 0; i < cookieArr.length; i++) {
	            var temp = cookieArr[i].split("=");
	            if (temp[0] == objname) return unescape(temp[1]);
	        }
	    }
	    var shareData = {
	        'sp': 'plus',
	        'pf': 'pc',
	        'sc': shareTo,
	        'st': page,
	        'ss': 0,
	        'pid': window.page_id,
	        'sid': share_id,
	        'uid': shareObj.user_id,
	        'cid': getcookie('__gmz'),
	        'url': shareObj[page].url[shareTo],
	        'env': shareObj.env,
	        'di': ''
	    };
	    shareData = JSON.stringify(shareData);
	    fetch.post(api, {
	        data: shareData
	    }).done(function (data) {});
	};
	module.exports = shareBP;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	// var praise = require('module/praise');
	var circle = __webpack_require__(180);
	var loginPop = __webpack_require__(22);
	var alert = __webpack_require__(36);
	var confirm = __webpack_require__(64);
	var tips = __webpack_require__(83).circle;
	
	// 请见 module/joinCircle.js
	var init = function init() {
	    // 加入圈子
	    var $postTopic = $('[data-node=postTopic]'),
	        memberType = $GLOBAL_CONFIG['member_type'];
	
	    $('[data-action=joinCircle]').each(function () {
	        $(this).attr('data-membertype') == 0 && $(this).removeAttr('data-action');
	    });
	    $('[data-action=joinGroup]').on('click', {
	        done: function done(str, $els) {
	            if (str == 'join') {
	                $els.attr('data-membertype', 0);
	            } else if (str == 'exit') {
	                $els.attr('data-membertype', 1);
	            } else if (str == 'limit') {
	                $els.removeClass('c-t-l-join').addClass('c-t-l-limit');
	            }
	        },
	        word: { join: '加入圈子', focus: '退出圈子' }
	    }, circle);
	    $('[data-action=joinCircle]').on('click', {
	        done: function done(str, $els) {
	            if (str == 'join') {
	                $els.attr('data-membertype', 0);
	                $els.removeAttr('data-action');
	                $els.off('click');
	                $els.addClass('circle-s-l-c-button-joined');
	                $els.attr('href', $els.attr('data-href'));
	            } else if (str == 'joined') {
	                $els.addClass('circle-s-l-c-button-joined');
	            } else if (str == 'joining') {
	                $els.removeClass('circle-s-l-c-button-joined');
	                $els.html('审核中');
	            } else if (str == 'exit') {
	                $els.attr('data-membertype', 1);
	                $els.removeClass('circle-s-l-c-button-joined');
	            }
	        },
	        word: { join: '+ 加入圈子', focus: '&radic; 已加入' }
	    }, circle);
	
	    function reload() {
	        $_CONFIG['islogin'] = '1';
	        window.location.href = window.location.href;
	    }
	
	    function checkMember(_this) {
	        memberType = $('[data-action=joinGroup]').attr('data-membertype');
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
	            if ($GLOBAL_CONFIG['member_type'] == '1000') {
	                alert('该圈子人数已达上限，稍后再尝试');
	            } else if ($GLOBAL_CONFIG['member_type'] == '2') {
	                alert('抱歉，该圈子在审核中');
	            } else {
	                window.open($_CONFIG['group_domain'] + JSON.parse($(_this).attr('bp-data'))['publish_url']);
	            }
	        }
	    }
	
	    $postTopic.on('click', function () {
	        var _this = this;
	        if ($_CONFIG['islogin'] == '0') {
	            loginPop(reload);
	            return false;
	        } else {
	            checkMember(_this);
	        }
	    });
	};
	
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';
	
	var share = __webpack_require__(102).shareto;
	var shareBP = __webpack_require__(250);
	var groupId = $_CONFIG['group_id'];
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
	            site: '国美'
	        };
	        return shareInfo;
	    };
	
	    var shareTo = function shareTo(type) {
	        return function () {
	            var info = getShareInfo();
	            share[type](info);
	            var opts = {
	                page: 'qz',
	                shareTo: type,
	                shareId: groupId
	            };
	            shareBP(opts);
	            // analytic(type); // 发送统计数据
	            return false;
	        };
	    };
	
	    /*var channels = {
	        'wx': 'out-weixin',
	        'sina': 'out-xlwb',
	        'qq': 'out-QQ',
	        'qzone': 'out-Qqzone'
	    };
	    var analytic = function(channel) {
	        BP.send({
	            event_id: 'G000P007',
	            group_id: $GLOBAL_CONFIG['group_id'],
	            channel_id: channels[channel] || '',
	            circle_type: $GLOBAL_CONFIG['s_c']
	        });
	    };*/
	    $body.on('click', "[data-node=wx]", function () {
	        // https://m.gomeplus.com/group/topic?topicId=575f7ed91940eb5c2587f56a
	        share.weixin({
	            url: "https://circle.m.gomeplus.com/circle-" + groupId + ".html"
	        });
	        var opts = {
	            page: 'qz',
	            shareTo: 'wx',
	            shareId: groupId
	        };
	        shareBP(opts); //发送统计数据
	        // analytic('wx'); // 发送统计数据        
	    });
	    $body.on('click', "[data-node=wb]", shareTo('wb'));
	    $body.on('click', "[data-node=qq]", shareTo('qq'));
	    $body.on('click', "[data-node=qzone]", shareTo('qz'));
	};
	
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(2)))

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var init = function init() {
		var elementNode = {
			sameClassChange: {
				ele: '.circle-s-t-change',
				num: 0
			},
			groupList: '[data-node=groupList]',
			hotTopicChange: {
				ele: '.circle-t-t-change',
				num: 0
			},
			topicsList: '[data-node=topicsList]'
		};
		var changeLogic = function changeLogic(clickEle) {
			return function (changeEle) {
				$(clickEle.ele).on("click", function () {
					if (clickEle.num < $(changeEle).length - 1) {
						clickEle.num++;
					} else {
						clickEle.num = 0;
					}
					$(changeEle).each(function (index, ele) {
						if (clickEle.num == index) {
							$(ele).show().siblings(changeEle).hide();
						}
					});
				});
			};
		};
		changeLogic(elementNode.sameClassChange)(elementNode.groupList);
		changeLogic(elementNode.hotTopicChange)(elementNode.topicsList);
	};
	
	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	__webpack_require__(77)();
	__webpack_require__(70)();
	var tplList = __webpack_require__(268);
	
	var init = {
		tabData: {},
		data: {
			gid: $('.circle-l-l-tab').attr('data-gid')
		},
		requestType: function requestType() {
			$('.circle-l-l-t-topic').find('a').on('click', function (event) {
				event.preventDefault();
				$(this).parent().addClass('tabtopic-active').siblings().removeClass('tabtopic-active');
				if (init.tabData[$(this).attr('data-type')]) {
					init.changeTab($(this).attr('data-type'), init.tabData);
				} else {
					init.changeTab($(this).attr('data-type'));
				}
			});
		},
		changeTab: function changeTab(index, tabData) {
			if (tabData) {
				$('[data-node=content]').html(tplList({
					data: tabData[index],
					type: index,
					domain: $GLOBAL_CONFIG['group_domain']
				}));
				$('.page').html('');
				if (tabData[index].data.link_url) $('.page').html(tabData[index].data.link_url);
			} else {
				fetch.get(url.get('moreTopics'), {
					// validate: true,
					data: {
						gid: init.data.gid,
						type: index
						/*,
	     onLogin: function (){
	         $_CONFIG['islogin'] = '1';
	         noRefreshFetch();
	     }*/
					} }).done(function (data /*, textStatus, jqXHR*/) {
					if (data && data.success) {
						// console.log(data)
						init.tabData[index] = data;
						$('[data-node=content]').html(tplList({
							data: data,
							type: index,
							domain: $GLOBAL_CONFIG['group_domain']
						}));
						$('.page').html('');
						if (data.data.link_url) $('.page').html(data.data.link_url);
					}
				}).fail(function () /*jqXHR, textStatus, errorThrown*/{
					// console.log(arguments);
				}).always(function () {
					// $els.attr('data-firing', 0);
				});
			}
		}
	};
	
	module.exports = {
		init: init.requestType
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/topics/topicList',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,data=$data.data,$each=$utils.$each,key=$data.key,$index=$data.$index,$escape=$utils.$escape,domain=$data.domain,$string=$utils.$string,val=$data.val,type=$data.type,$out='';if(data.data.topTopics.length != 0 || data.data.topics.length != 0){
	$out+=' <div class="circle-lists-cell"> <ul class="circle-l-c-wrap clearfix"> ';
	if(data.data.topTopics.length != 0){
	$out+=' ';
	$each(data.data.topTopics,function(key,$index){
	$out+=' <li class="circle-l-c-w-minute " modelid="PQZQBHTlt0002"> <div class="circle-l-c-w-m-wrap clearfix"> <div class="circle-l-c-w-m-user clearfix"> <a target="_blank" href="';
	$out+=$escape(domain);
	$out+='ta/';
	$out+=$escape(key.user.id);
	$out+='.html"><img class="circle-l-c-w-m-u-icon" onerror="imgError(this, \'h\')" src="';
	$out+=$escape(key.user.facePicUrl);
	$out+='"></a> <a target="_blank" href="';
	$out+=$escape(domain);
	$out+='ta/';
	$out+=$escape(key.user.id);
	$out+='.html"><span class="circle-l-c-w-m-u-name">';
	$out+=$escape(key.user.nickname);
	$out+='</span></a> </div> <div class="circle-l-c-w-m-title clearfix"> <span class="circle-l-c-w-m-titlewrap"> ';
	if(key.isUpper){
	$out+=' <i class="circle-l-c-w-m-titletop">置顶</i> ';
	}
	$out+=' ';
	if(key.isEssence){
	$out+=' <i class="circle-l-c-w-m-titlequality">精品</i> ';
	}
	$out+=' ';
	if(key.style == "1"){
	$out+=' <i class="circle-l-c-w-m-titleinterview">专访</i> ';
	}
	$out+=' </span> <a target="_blank" title="';
	$out+=$escape(key.name);
	$out+='" href="';
	$out+=$escape(domain);
	$out+='topic/';
	$out+=$escape(key.id);
	$out+='.html"><h3>';
	$out+=$string($helpers. truncateByteLen(key.name , '78'));
	$out+='</h3></a> </div> <div class="circle-l-c-w-m-paper"><p><a target="_blank" title="';
	$out+=$escape(key.name);
	$out+='" href="';
	$out+=$escape(domain);
	$out+='topic/';
	$out+=$escape(key.id);
	$out+='.html">';
	$out+=$string($helpers. truncateByteLen(key.text , '150'));
	$out+='</a></p></div> ';
	if(key.images_lst.length != 0){
	$out+=' <div class="circle-l-c-w-m-imagepreview clearfix"> ';
	$each(key.images_lst,function(val,$index){
	$out+=' ';
	if(val.type == "image"){
	$out+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="';
	$out+=$escape(val.name);
	$out+='" href="';
	$out+=$escape(domain);
	$out+='topic/';
	$out+=$escape(key.id);
	$out+='.html"> <div class="circle-imagepreview-img"><img onerror="imgError(this, \'m\')" alt="';
	$out+=$escape(val.name);
	$out+='" src="';
	$out+=$escape(val.mainImage);
	$out+='"></div> </a> ';
	}
	$out+=' ';
	if(val.type == "video"){
	$out+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="';
	$out+=$escape(val.name);
	$out+='" href="';
	$out+=$escape(domain);
	$out+='topic/';
	$out+=$escape(key.id);
	$out+='.html"> <div class="circle-imagepreview-img circle-imagepreview-play"><img src="';
	$out+=$escape(val.mainImage);
	$out+='" alt="';
	$out+=$escape(val.name);
	$out+='"> <div class="circle-i-p-icon"></div> </div></a> ';
	}
	$out+=' ';
	if(val.type == "item"){
	$out+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" href="';
	$out+=$escape(domain);
	$out+='topic/';
	$out+=$escape(key.id);
	$out+='.html"> <div class="circle-imagepreview-goods"> <img onerror="imgError(this, \'m\')" alt="';
	$out+=$escape(val.name);
	$out+='" src="';
	$out+=$escape(val.mainImage);
	$out+='"> <div class="circle-i-goodsmask clearfix"> <div class="circle-i-g-price"><span class="circle-i-g-p-currency">￥</span><span class="circle-i-g-p-pricecount">';
	$out+=$escape(val.salePrice !== null?val.salePrice:'暂无售价');
	$out+='</span></div> <div class="circle-i-g-icon"> <i class="circle-i-g-i-icon"></i> </div></div> <div class="circle-i-goodstitle"><span>';
	$out+=$escape(val.name);
	$out+='</span></div> </div> </a> ';
	}
	$out+=' ';
	});
	$out+=' </div> ';
	}
	$out+=' <div class="circle-l-c-w-m-state clearfix"> <div class="circle-l-c-w-m-s-left"><em class="iconn-75"></em><span class="circle-l-c-w-m-s-l-timedate">';
	$out+=$escape(key.time_str);
	$out+='</span></div> <div class="circle-l-c-w-m-s-right"> <ul class="circle-l-c-w-m-s-r-tool"> <li><em class="icon iconn-10"></em><span class="circle-l-c-w-m-s-r-islikecount">';
	$out+=$escape(key.like.userQuantity);
	$out+='</span></li> <li><em class="icon iconn-11"></em><span class="circle-l-c-w-m-s-r-iscommetcount">';
	$out+=$escape(key.replyQuantity);
	$out+='</span></li> <li><em class="icon iconn-57"></em><span class="circle-l-c-w-m-s-r-isstarcount">';
	$out+=$escape(key.topicCollectionQuantity);
	$out+='</span></li> </ul> </div> </div> </div> </li> ';
	});
	$out+=' ';
	}
	$out+=' ';
	if(data.data.topics.length != 0){
	$out+=' ';
	$each(data.data.topics,function(key,$index){
	$out+=' <li class="circle-l-c-w-minute " modelid="PQZQBHTlt0002"> <div class="circle-l-c-w-m-wrap clearfix"> <div class="circle-l-c-w-m-user clearfix"> <a target="_blank" href="';
	$out+=$escape(domain);
	$out+='ta/';
	$out+=$escape(key.user.id);
	$out+='.html"><img class="circle-l-c-w-m-u-icon" onerror="imgError(this, \'h\')" src="';
	$out+=$escape(key.user.facePicUrl);
	$out+='"></a> <a target="_blank" href="';
	$out+=$escape(domain);
	$out+='ta/';
	$out+=$escape(key.user.id);
	$out+='.html"><span class="circle-l-c-w-m-u-name">';
	$out+=$escape(key.user.nickname);
	$out+='</span></a> </div> <div class="circle-l-c-w-m-title clearfix"> <span class="circle-l-c-w-m-titlewrap"> ';
	if(key.isUpper){
	$out+=' <i class="circle-l-c-w-m-titletop">置顶</i> ';
	}
	$out+=' ';
	if(key.isEssence){
	$out+=' <i class="circle-l-c-w-m-titlequality">精品</i> ';
	}
	$out+=' ';
	if(key.style == "1"){
	$out+=' <i class="circle-l-c-w-m-titleinterview">专访</i> ';
	}
	$out+=' </span> <a target="_blank" title="';
	$out+=$escape(key.name);
	$out+='" href="';
	$out+=$escape(domain);
	$out+='topic/';
	$out+=$escape(key.id);
	$out+='.html"><h3>';
	$out+=$string($helpers. truncateByteLen(key.name , '78'));
	$out+='</h3></a> </div> <div class="circle-l-c-w-m-paper"><p><a target="_blank" title="';
	$out+=$escape(key.name);
	$out+='" href="';
	$out+=$escape(domain);
	$out+='topic/';
	$out+=$escape(key.id);
	$out+='.html">';
	$out+=$string($helpers. truncateByteLen(key.text , '150'));
	$out+='</a></p></div> ';
	if(key.images_lst.length != 0){
	$out+=' <div class="circle-l-c-w-m-imagepreview clearfix"> ';
	$each(key.images_lst,function(val,$index){
	$out+=' ';
	if(val.type == "image"){
	$out+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="';
	$out+=$escape(val.name);
	$out+='" href="';
	$out+=$escape(domain);
	$out+='topic/';
	$out+=$escape(key.id);
	$out+='.html"> <div class="circle-imagepreview-img"><img onerror="imgError(this, \'m\')" alt="';
	$out+=$escape(val.name);
	$out+='" src="';
	$out+=$escape(val.mainImage);
	$out+='"></div> </a> ';
	}
	$out+=' ';
	if(val.type == "video"){
	$out+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="';
	$out+=$escape(val.name);
	$out+='" href="';
	$out+=$escape(domain);
	$out+='topic/';
	$out+=$escape(key.id);
	$out+='.html"> <div class="circle-imagepreview-img circle-imagepreview-play"><img src="';
	$out+=$escape(val.mainImage);
	$out+='" alt="';
	$out+=$escape(val.name);
	$out+='"> <div class="circle-i-p-icon"></div> </div></a> ';
	}
	$out+=' ';
	if(val.type == "item"){
	$out+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" href="';
	$out+=$escape(domain);
	$out+='topic/';
	$out+=$escape(key.id);
	$out+='.html"> <div class="circle-imagepreview-goods"> <img onerror="imgError(this, \'m\')" alt="';
	$out+=$escape(val.name);
	$out+='" src="';
	$out+=$escape(val.mainImage);
	$out+='"> <div class="circle-i-goodsmask clearfix"> <div class="circle-i-g-price"><span class="circle-i-g-p-currency">￥</span><span class="circle-i-g-p-pricecount">';
	$out+=$escape(val.salePrice !== null?val.salePrice:'暂无售价');
	$out+='</span></div> <div class="circle-i-g-icon"> <i class="circle-i-g-i-icon"></i> </div></div> <div class="circle-i-goodstitle"><span>';
	$out+=$escape(val.name);
	$out+='</span></div> </div> </a> ';
	}
	$out+=' ';
	});
	$out+=' </div> ';
	}
	$out+=' <div class="circle-l-c-w-m-state clearfix"> <div class="circle-l-c-w-m-s-left"><em class="iconn-75"></em><span class="circle-l-c-w-m-s-l-timedate">';
	$out+=$escape(key.time_str);
	$out+='</span></div> <div class="circle-l-c-w-m-s-right"> <ul class="circle-l-c-w-m-s-r-tool"> <li><em class="icon iconn-10"></em><span class="circle-l-c-w-m-s-r-islikecount">';
	$out+=$escape(key.like.userQuantity);
	$out+='</span></li> <li><em class="icon iconn-11"></em><span class="circle-l-c-w-m-s-r-iscommetcount">';
	$out+=$escape(key.replyQuantity);
	$out+='</span></li> <li><em class="icon iconn-57"></em><span class="circle-l-c-w-m-s-r-isstarcount">';
	$out+=$escape(key.topicCollectionQuantity);
	$out+='</span></li> </ul> </div> </div> </div> </li> ';
	});
	$out+=' ';
	}
	$out+=' </ul> </div> ';
	}
	$out+=' ';
	if(data.data.topTopics.length == 0 && data.data.topics.length == 0 && data.data.totalTopicQuantity == 0){
	$out+=' ';
	if(type == 0){
	$out+=' <div class="circle-nonetopic"> <div class="circle-nt-center"> <div class="circle-nt-c-left"></div> <div class="circle-nt-c-right"><span>暂无话题，快来抢占沙发，</span>发布话题<span>&nbsp;吧！</span></div> </div> </div> ';
	}
	$out+=' ';
	if(type == 1){
	$out+=' <div class="circle-nonequality"> <div class="circle-nq-center"> <div class="circle-nq-c-left"></div> <div class="circle-nq-c-right"><span>还没有精选话题</span></div> </div> </div> ';
	}
	$out+=' ';
	}
	$out+=' ';
	if(!data.data.topTopics && !data.data.topics){
	$out+=' <div class="circle-nonetopic"> <div class="circle-nt-center"> <div class="circle-nt-c-left"></div> <div class="circle-nt-c-right"><span>暂无话题，快来抢占沙发，</span>发布话题<span>&nbsp;吧！</span></div> </div> </div> ';
	}
	$out+=' ';
	return new String($out);
	});

/***/ })

});
//# sourceMappingURL=topics.js.map