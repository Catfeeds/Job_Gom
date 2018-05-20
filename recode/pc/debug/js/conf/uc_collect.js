webpackJsonp([32],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var batchManage = __webpack_require__(269);
	var select = __webpack_require__(270);
	var delCollect = __webpack_require__(271);
	var loadMore = __webpack_require__(272);
	var hotTopic = __webpack_require__(275);
	
	//批量管理
	batchManage.init();
	//单选/全选
	select.init();
	//单删/全删
	delCollect.init();
	//加载更多
	loadMore.init();
	//热门话题
	hotTopic.init();

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

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var resize = function resize() {
	    var status = '';
	    var $document = $(document.body);
	    var wrapBoxS = 'w1000';
	    if (window.screen.width <= 1024) {
	        $document.addClass(wrapBoxS);
	        status = 'small';
	    } else {
	        $document.removeClass(wrapBoxS);
	        status = 'big';
	    }
	    return status;
	};
	module.exports = resize;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
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
		_getTiles: function _getTiles() {
			return this.element.children();
		},
	
		_create: function _create(options) {
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
	
		_getColumns: function _getColumns() {
			//calculates number of columns
			var containerWidth = this.element.width();
			var colNum = Math.floor(containerWidth / this.columnWidth);
			colNum = Math.max(colNum, 1);
			return this.colNum = colNum;
		},
	
		_init: function _init() {
			this.layout(this.$tiles);
		},
	
		_getColumnWidth: function _getColumnWidth() {
			//指定的列宽或第一个砖块的宽或者是容器的宽
			return this.options.columnWidth || this.$tiles.outerWidth(true) || this.element.width();
		},
	
		appended: function appended($tiles, callback) {
			this.$tiles = this.$tiles.add($tiles);
			this.layout($tiles, callback);
		},
	
		destroy: function destroy() {
			// this.element.removeData(prefix);
		},
	
		layout: function layout($tiles) {
			for (var i = 0, len = $tiles.length; i < len; i++) {
				this._placeTile($tiles[i]);
			}
		},
	
		_placeTile: function _placeTile(tile) {
			this.cols.eq(this.getShortestColumn()).append(tile);
		},
	
		getShortestColumn: function getShortestColumn() {
			var result = 0,
			    cols = this.cols,
			    len = cols.length,
			    shortest,
			    h;
			for (var i = 0; i < len; i++) {
				h = cols[i].offsetHeight || cols[i].scrollHeight;
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

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	 * 批量管理
	 * @author QiaoLi
	 */
	
	var $showBatch = $('[data-node=showBatch]');
	var $hideBatch = $('[data-node=hideBatch]');
	var $batch = $('[data-action=batch]');
	var $cancelBatch = $('[data-action=cancelBatch]');
	var $selectAll = $('[data-action=selectAll]');
	var $selectSpan = $('[data-action=selectAll] span');
	var selectOne = '[data-action=selectOne]';
	var selectLayer = '[data-node=selectLayer]';
	var dataListBox = '[data-node=dataListBox]';
	var delPopUp = '[data-node=delPopUp]';
	
	var hide = 'hide';
	var active = 'active';
	var removeDel = 'remove-del';
	
	//批量管理
	var batchManage = function batchManage() {
	    $hideBatch.removeClass(hide);
	    $showBatch.addClass(hide);
	    $(selectLayer).removeClass(hide);
	    $(dataListBox).addClass(removeDel);
	    $(delPopUp).addClass(hide);
	    $(selectOne).removeClass(active);
	    $selectSpan.removeClass(active);
	};
	
	//取消批量管理
	var cancelBatch = function cancelBatch() {
	    $hideBatch.addClass(hide);
	    $showBatch.removeClass(hide);
	    $(selectLayer).addClass(hide);
	    $(dataListBox).removeClass(removeDel);
	};
	
	var init = function init() {
	    $batch.on('click', batchManage);
	    $cancelBatch.on('click', cancelBatch);
	};
	
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	 * 单选/全选商品、店铺、话题
	 * @author QiaoLi
	 */
	
	var $collectList = $('[data-node=collectList]');
	var $selectAll = $('[data-action=selectAll]');
	var selectOne = '[data-action=selectOne]';
	var $selectSpan = $('[data-action=selectAll] span');
	
	var active = 'active';
	
	//单选
	var selectSingle = function selectSingle() {
	    var $this = $(this);
	    if ($this.hasClass(active)) {
	        $this.removeClass(active);
	        $selectSpan.removeClass(active);
	    } else {
	        $this.addClass(active);
	        if (!$('[data-action=selectOne]:not(.active)').length) {
	            $selectSpan.addClass(active);
	        }
	    }
	};
	
	//全选
	var selectAll = function selectAll() {
	    if (!$selectSpan.hasClass(active)) {
	        $(selectOne).addClass(active);
	        $selectSpan.addClass(active);
	    } else {
	        $(selectOne).removeClass(active);
	        $selectSpan.removeClass(active);
	    }
	};
	
	var init = function init() {
	    $selectAll.on('click', selectAll);
	    $collectList.on('click', selectOne, selectSingle);
	};
	
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/**
	 * 删除收藏的商品、店铺、话题
	 * @author QiaoLi
	 */
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var alert = __webpack_require__(36);
	var confirm = __webpack_require__(64);
	var checkLoginStatus = __webpack_require__(23);
	
	var $collectList = $('[data-node=collectList]');
	var dataListBox = '[data-node=dataListBox]';
	var $tabListA = $('[data-node=tabList] a.active');
	var $delAll = $('[data-action=delAll]');
	var delPopUp = '[data-node=delPopUp]';
	var showDelLayer = '[data-action=showDelLayer]';
	var hideDelLayer = '[data-action=cancelDel]';
	var delOne = '[data-action=delOne]';
	var selectOne = '[data-action=selectOne]';
	
	var type = $tabListA.data('type');
	var active = 'active';
	var hide = 'hide';
	var removeDel = 'remove-del';
	if (type == undefined) {
	    type = 'collect';
	}
	
	var param = {
	    url: {
	        goods: url.get('delCollectGoods'),
	        published: url.get('delPublishedTopic'),
	        collect: url.get('delCollectTopic')
	    },
	    tipsMsg: {
	        goods: '您确定要删除收藏商品吗',
	        shop: '您确定要删除收藏店铺吗',
	        collect: '确定要删除选中的话题吗'
	    },
	    notChoose: {
	        goods: '请选择要删除的商品',
	        shop: '请选择要删除的店铺',
	        collect: '请选择要删除的话题'
	    }
	};
	
	//显示/隐藏删除层
	var delLayer = function delLayer() {
	    var $this = $(this);
	    var $item = $this.parents(dataListBox);
	    $collectList.find($(delPopUp)).addClass(hide);
	    if (!$item.hasClass(removeDel)) {
	        $collectList.find(dataListBox).removeClass(removeDel);
	        $item.addClass(removeDel);
	        $item.find($(delPopUp)).removeClass(hide);
	    } else {
	        $item.removeClass(removeDel);
	        $item.find($(delPopUp)).addClass(hide);
	    }
	};
	
	//单个删除
	var delSingle = function delSingle() {
	    var $this = $(this);
	    var $item = $this.parents(dataListBox);
	    var delId = $item.attr('delId');
	    var id = $item.attr('id');
	    var groupId = $item.attr('groupId');
	    fetch.post(param.url[type], {
	        validate: true,
	        data: {
	            ids: delId,
	            tid: id,
	            gid: groupId
	        }
	    }).done(function (data) {
	        if (data.success === true) {
	            $item.remove();
	            window.location.reload();
	        } else {
	            alert(data.message);
	        }
	    }).fail(function (data) {
	        if (checkLoginStatus()) alert(data.message);
	    });
	    return false;
	};
	
	//批量删除
	var getIds = function getIds() {
	    var delId = [];
	    var id = [];
	    var groupId = [];
	    var selectList = $('[data-action=selectOne].active').parents(dataListBox);
	    $.each(selectList, function (i, v) {
	        delId.push($(this).attr('delId'));
	        id.push($(this).attr('id'));
	        groupId.push($(this).attr('groupId'));
	    });
	    var delIDs = delId.join(',');
	    var ids = id.join(',');
	    var groupIds = groupId.join(',');
	    return {
	        delIDs: delIDs,
	        ids: ids,
	        groupIds: groupIds
	    };
	};
	
	var confirmDel = function confirmDel(options) {
	    confirm('', {
	        content: '<p class="del-pop-p">' + options.content + '</p>',
	        okCls: 'two-button two-button-red',
	        cancelCls: 'two-button',
	        btnWrapCls: 'text-center',
	        ok: function ok() {
	            fetch.post(param.url[type], {
	                validate: true,
	                data: {
	                    ids: options.ids,
	                    tid: options.tid,
	                    gid: options.gid
	                }
	            }).done(function (data) {
	                if (data.success === true) {
	                    $('[data-action=selectOne].active').parents(dataListBox).remove();
	                    window.location.reload();
	                } else {
	                    alert(data.message);
	                }
	            }).fail(function (data) {
	                if (checkLoginStatus()) alert(data.message);
	            });
	        }
	    });
	};
	
	var delMultiple = function delMultiple() {
	    var idAll = getIds();
	    var options = {
	        content: param.tipsMsg[type],
	        notChoose: param.notChoose[type],
	        ids: idAll.delIDs,
	        tid: idAll.ids,
	        gid: idAll.groupIds
	    };
	    if (!$(selectOne).hasClass(active)) {
	        alert(options.notChoose);
	        return;
	    }
	    confirmDel(options);
	    return false;
	};
	
	var init = function init() {
	    $collectList.on('click', showDelLayer, delLayer); //显示/隐藏删除层
	    $collectList.on('click', hideDelLayer, delLayer); //取消删除
	    $collectList.on('click', delOne, delSingle); //单个删除
	    $delAll.on('click', delMultiple); //批量删除
	};
	
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	/**
	 * 加载更多收藏的商品、店铺、话题
	 * @author QiaoLi
	 */
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var resize = __webpack_require__(66);
	var Tiles = __webpack_require__(67);
	var topicTpl = __webpack_require__(273);
	var noCollect = __webpack_require__(274);
	
	__webpack_require__(70)();
	__webpack_require__(77)();
	
	var $collectList = $('[data-node=collectList]');
	var $dataList = $('[data-node=dataList]');
	var $batchDel = $('[data-node=batch-del]');
	var $showBatch = $('[data-node=showBatch]');
	var $hideBatch = $('[data-node=hideBatch]');
	var $total = $('[data-node=total]');
	var $tabList = $('[data-node=tabList]');
	var $tabListA = $('[data-node=tabList] a.active');
	var $loadMore = $('[data-action=loadMore]');
	var $loadSpan = $('[data-action=loadMore] span');
	var $loadImg = $('[data-action=loadMore] img');
	var $noContent = $('[data-node=noContent]');
	var userName = '[data-node=userName]';
	var $dataFail = $('[data-node=dataFail]');
	var $dataFailed = $('[data-node=dataFailed]');
	var dataListBox = '[data-node=dataListBox]';
	var selectLayer = '[data-node=selectLayer]';
	var showDelLayer = '[data-action=showDelLayer]';
	var delPopUp = '[data-node=delPopUp]';
	
	var hide = 'hide';
	var disabled = 'disabled';
	var removeDel = 'remove-del';
	var loadingGif = $_CONFIG['imgpath'] + '/images/public/loading.gif';
	var loadingPng = $_CONFIG['imgpath'] + '/images/circle/small-logo.png';
	var type = $tabListA.data('type');
	var typeTopic = $tabList.data('type');
	
	var tiles;
	var firing = false;
	var page = 1;
	var finished = false;
	
	if (type == undefined) {
	    type = 'collect';
	}
	
	if (typeTopic == undefined) {
	    typeTopic = 'collectTopic';
	}
	
	var collect = '';
	var dataAll = [];
	
	var beforeLoad = function beforeLoad() {
	    $loadMore.removeClass(hide);
	    $loadImg.attr('src', loadingGif);
	    $loadSpan.html('正在加载更多话题…');
	    $(dataListBox).removeClass(removeDel);
	    $(selectLayer).addClass(hide);
	    $(delPopUp).addClass(hide);
	    $hideBatch.addClass(hide);
	};
	
	var loadMore = function loadMore() {
	    $loadImg.attr('src', loadingPng);
	    $loadSpan.html('下拉加载更多话题');
	};
	
	var noMoreData = function noMoreData() {
	    $loadMore.off('click');
	    $loadImg.attr('src', loadingPng);
	    $loadSpan.html('无更多加载项');
	};
	
	var dataFail = function dataFail() {
	    $loadImg.attr('src', loadingPng);
	    $loadSpan.html('加载失败，请重新尝试');
	};
	
	var param = {
	    url: {
	        published: url.get('publishedTopic'), //发布话题
	        collect: url.get('getCollectTopic') //收藏话题
	    },
	    tpl: {
	        published: topicTpl,
	        collect: topicTpl
	    }
	};
	
	//加载
	var load = function load() {
	    if (firing) {
	        return;
	    }
	    if (finished) {
	        noMoreData();
	        return;
	    }
	    firing = true;
	    beforeLoad();
	    fetch.post(param.url[type], {
	        data: {
	            pageNum: page
	        }
	    }).done(function (data) {
	        if (data.success === true) {
	            page++;
	            var loadData = data.data || {};
	            collect = loadData.topics || [];
	            collect.mallDomain = $_CONFIG.mall_domain;
	            collect.groupDomain = $_CONFIG.group_domain;
	            collect.type = type;
	            if (collect.length == 0) {
	                finished = true;
	                if (!$(dataListBox).length) {
	                    $loadMore.addClass(hide);
	                    $dataList.addClass(hide);
	                    $collectList.append($(noCollect({
	                        type: type,
	                        groupDomain: $_CONFIG.group_domain
	                    })));
	                    $showBatch.addClass(hide);
	                } else {
	                    noMoreData();
	                }
	            } else {
	                $batchDel.removeClass(hide);
	                $showBatch.removeClass(hide);
	                $total.html('共' + loadData.ownedTopicQuantity + '条');
	                if (type == 'collect' || type == 'published') {
	                    tiles.appended($(param.tpl[type]({
	                        list: collect
	                    })));
	                } else {
	                    $dataList.append($(param.tpl[type]({
	                        list: collect
	                    })));
	                }
	                if (collect.length < loadData.pageSize) {
	                    noMoreData();
	                } else {
	                    loadMore();
	                }
	            }
	            //解决IE7加载更多显示位置问题
	            $loadMore.addClass('a');
	        } else {
	            dataFail();
	        }
	    }).fail(function () {
	        dataFail();
	    }).always(function () {
	        firing = false;
	    });
	    return false;
	};
	
	//宽窄屏
	var columnWidth = function columnWidth() {
	    var ss = resize();
	    if (ss == 'small') {
	        param.columnWidth = {
	            myTopic: 290,
	            collectTopic: 275
	        };
	    } else {
	        param.columnWidth = {
	            myTopic: 243,
	            collectTopic: 250
	        };
	    }
	};
	
	//加载数据
	var resizeLoad = function resizeLoad() {
	    columnWidth();
	    tiles = new Tiles({
	        columnWidth: param.columnWidth[typeTopic]
	    }, '[data-node=tiles]');
	    load();
	};
	
	//显示删除按钮
	var showDelBtn = function showDelBtn() {
	    var $this = $(this);
	    $this.find($(showDelLayer)).show();
	    $this.find($(userName)).css({
	        'width': 'auto',
	        'white-space': 'nowrap'
	    });
	};
	
	//隐藏删除按钮
	var hideDelBtn = function hideDelBtn() {
	    var $this = $(this);
	    $this.find($(showDelLayer)).hide();
	    $this.find($(userName)).css({
	        'width': '11px'
	    });
	};
	
	var init = function init() {
	    resizeLoad();
	    $collectList.on('mouseover', dataListBox, showDelBtn); //显示删除按钮
	    $collectList.on('mouseout', dataListBox, hideDelBtn); //隐藏删除按钮
	    $loadMore.on('click', 'a', load); //加载下一页
	};
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uc_collect/loadMore/collectTopic',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$string=$utils.$string,str=$data.str,isEssence=$data.isEssence,isUpper=$data.isUpper,$out='';$out+=' ';
	$each(list,function(value,$index){
	$out+=' ';
	if(!value.newComponents.item && !value.newComponents.image && !value.newComponents.video){
	$out+=' <div class="circle-box no-pic" data-node="dataListBox" id="';
	$out+=$escape(value.id);
	$out+='" groupId="';
	$out+=$escape(value.groupId);
	$out+='" delId="';
	$out+=$escape(value.delId);
	$out+='"> ';
	}else{
	$out+=' <div class="circle-box" data-node="dataListBox" id="';
	$out+=$escape(value.id);
	$out+='" groupId="';
	$out+=$escape(value.groupId);
	$out+='" delId="';
	$out+=$escape(value.delId);
	$out+='"> ';
	}
	$out+=' <div class="mg-negative"> <em class="icon-del" data-action="showDelLayer"></em> ';
	if(list.type == 'collect'){
	$out+=' ';
	if(value.newComponents.item || value.newComponents.image || value.newComponents.video){
	$out+=' <span class="topic-tag" data-node="userName"> <em class="icon-lysy"><img src="';
	$out+=$escape(value.user.facePicUrl);
	$out+='" alt=""></em>';
	$out+=$escape(value.user.nickname);
	$out+=' </span> ';
	}
	$out+=' ';
	}
	$out+='  ';
	if(value.newComponents.item){
	$out+=' <div class="list-img"> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.id);
	$out+='.html" target="_blank">  <img src="';
	$out+=$escape(value.imageShow);
	$out+='" onerror="imgError(this)" title=""> </a> </div> ';
	}else if(value.newComponents.image){
	$out+=' <div class="list-img"> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.id);
	$out+='.html" target="_blank"><img src="';
	$out+=$escape(value.imageShow);
	$out+='" title=""></a> </div> ';
	}else if(value.newComponents.video){
	$out+=' <div class="list-img"> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.id);
	$out+='.html" target="_blank"> <img src="';
	$out+=$escape(value.imageShow);
	$out+='" onerror="imgError(this)" title=""> <em class="icon-play"></em> </a> </div> ';
	}
	$out+=' <div class="list-box"> ';
	if(list.type == 'collect'){
	$out+=' ';
	if(!value.newComponents.item && !value.newComponents.image && !value.newComponents.video){
	$out+=' <span class="topic-tag topic-tag-static" data-node="userName"> <em class="icon-lysy"><img src="';
	$out+=$escape(value.user.facePicUrl);
	$out+='" alt=""></em>';
	$out+=$escape(value.user.nickname);
	$out+=' </span> ';
	}
	$out+=' ';
	}
	$out+=' <p class="list-title"> ';
	if(value.isUpper){
	$out+=' <em class="set-top">置顶</em> ';
	}
	$out+=' ';
	if(value.isEssence){
	$out+=' <em class="set-spark">精品</em> ';
	}
	$out+=' ';
	if(value.style === 1){
	$out+=' <em class="set-access">专访</em> ';
	}
	$out+=' <a data-node="list_title" href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.id);
	$out+='.html" target="_blank">';
	$out+=$string($helpers. truncateLenByJson({str:value.nameShow,isEssence:value.isEssence,isUpper:value.isUpper} , '52'));
	$out+='</a> </p> <p class="text-icon clearfix"> <span><em class="icon-like"></em>';
	$out+=$escape(value.like.userQuantity);
	$out+='</span> <span><em class="icon-discuss"></em>';
	$out+=$escape(value.replyShow);
	$out+='</span> </p> ';
	if(value.textShow !== ""){
	$out+=' <p class="list-description"><a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.id);
	$out+='.html" target="_blank">';
	$out+=$string($helpers. truncateByteLen(value.textShow , '52'));
	$out+='</a></p> ';
	}
	$out+=' <p class="list-time">';
	$out+=$escape(value.createTimeStr);
	$out+='</p> <p class="list-tag">来自圈子 ：<a href="';
	$out+=$escape(list.groupDomain);
	$out+='circle/';
	$out+=$escape(value.groupId);
	$out+='.html" target="_blank">';
	$out+=$escape(value.group.name);
	$out+='</a></p> </div> </div> <div class="del-btn hide" data-node="delPopUp"> <div class="del-text"> <a class="btn-close" href="javascript:;" data-action="cancelDel"></a> <p>确定要删除？</p> <div class="text-center"> <a href="javascript:;" class="pc-btn" data-action="delOne">确定</a> <a href="javascript:;" class="pc-btn pc-bj-fff" data-action="cancelDel">取消</a> </div> </div> </div> <div class="del-all hide" data-node="selectLayer"> <em class="icon-check" data-action="selectOne"></em> </div> </div> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uc_collect/loadMore/no_collect',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,type=$data.type,$escape=$utils.$escape,groupDomain=$data.groupDomain,$out='';$out+='<div class="no-topic" data-node="empty"> <div class="txt clearfix"> ';
	if(type == 'published'){
	$out+=' <p><span>这里空空的~快去<a href="';
	$out+=$escape(groupDomain);
	$out+='topic/publiser">发布话题</a>吧</span></p> ';
	}else{
	$out+=' <p><span>快去发现更多<a href="';
	$out+=$escape(groupDomain);
	$out+='channel/index.html" target="_blank">精彩话题</a>吧</span></p> ';
	}
	$out+=' </div> </div> ';
	return new String($out);
	});

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	/**
	 * 加载热门话题
	 * @author QiaoLi
	 */
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var hotTpl = __webpack_require__(276);
	
	var $hotTopic = $('[data-node=hotTopic]');
	var $beforeLoad = $('[data-action=beforeLoad]');
	var $topicList = $('[data-node=hotTopic] ul');
	
	var hide = 'hide';
	var firing = false;
	var page = 1;
	var finished = false;
	
	var beforeLoad = function beforeLoad() {
	    $beforeLoad.removeClass(hide);
	};
	
	var dataFail = function dataFail() {
	    $beforeLoad.removeClass(hide).html('<p>一大波热门话题马上呈现～</p>');
	};
	
	//加载中
	var load = function load() {
	    if (firing) {
	        return;
	    }
	    if (finished) {
	        return;
	    }
	    firing = true;
	    beforeLoad();
	    fetch.post(url.get('hotTopic'), {
	        data: {
	            pageNum: page
	        }
	    }).done(function (data) {
	        if (data.success === true) {
	            page++;
	            var loadData = data.data || {};
	            var hotTopic = loadData.peas || [];
	            hotTopic.groupDomain = $_CONFIG.group_domain;
	            if (hotTopic.length == 0) {
	                finished = true;
	            } else {
	                $beforeLoad.addClass(hide);
	                $topicList.append($(hotTpl({
	                    list: hotTopic
	                })));
	            }
	        } else {
	            dataFail();
	        }
	    }).fail(function () {
	        dataFail();
	    }).always(function () {
	        firing = false;
	    });
	    return false;
	};
	var init = function init() {
	    load();
	};
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uc_collect/hotTopic/hotTopic',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(list,function(value,$index){
	$out+=' <li id="';
	$out+=$escape(value.id);
	$out+='"> <div class="img"> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.id);
	$out+='.html" target="_blank" title="';
	$out+=$escape(value.name);
	$out+='"> <img src="';
	$out+=$escape(value.imageShow);
	$out+='" alt="" onerror="imgError(this)"> </a> </div> <div class="text"> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.id);
	$out+='.html" target="_blank" title="';
	$out+=$escape(value.name);
	$out+='">';
	$out+=$escape(value.name);
	$out+='</a> <span><em class="icon-like"></em>';
	$out+=$escape(value.like.userQuantity);
	$out+='</span> <span><em class="icon-discuss"></em>';
	$out+=$escape(value.replyShow);
	$out+='</span> </div> </li> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ })

});
//# sourceMappingURL=uc_collect.js.map