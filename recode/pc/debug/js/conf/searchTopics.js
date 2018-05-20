webpackJsonp([21],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	
	var tpl = __webpack_require__(202);
	var Tiles = __webpack_require__(67);
	var keywordMark = __webpack_require__(203);
	var alert = __webpack_require__(36);
	__webpack_require__(166)();
	__webpack_require__(77)();
	__webpack_require__(201)();
	
	// 发送统计数据用
	// var buriedPoint = require('utils/buriedPoint');
	// buriedPoint.setPageData('searchTopic');
	
	var tiles = new Tiles({
	    columnWidth: 242
	}, '[data-node=tiles]');
	var _decodeURIComponent = function _decodeURIComponent(uri) {
	    if (!uri) {
	        return uri;
	    }
	    var result;
	    try {
	        result = decodeURIComponent(uri);
	    } catch (ex) {
	        result = unescape(uri);
	    }
	    return result;
	};
	var keyword = _decodeURIComponent($('[data-node=tiles]').data('keyword'));
	var $loadMore = $('[data-action=loadMore]');
	var $loading = $('[data-node=loading]');
	// 加载更多
	var firing = false; // 是否正在加载
	var page = 1;
	var finished = false; // 数据是否全部加载完毕
	
	var beforeLoad = function beforeLoad() {
	    $loadMore.hide();
	    $loading.show();
	};
	
	var noMoreData = function noMoreData(str) {
	    var msg = str || '没有更多数据';
	    $loadMore.find('span').html(msg);
	    $loadMore.off().show();
	    $loading.hide();
	};
	
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
	    fetch.get(url.get('searchTopics'), {
	        data: {
	            word: keyword,
	            page_num: page,
	            pagesize: 20
	        }
	    }).done(function (json /*, textStatus, jqXHR*/) {
	        if (json.code === 200) {
	            var modelidPage = (page - 1) * 20; //埋点用的modelid增加基点
	            page++;
	            var topics = json.data.topics || [];
	            if (topics.length == 0) {
	                finished = true;
	                noMoreData('无相关话题');
	            } else {
	                $loading.hide();
	                // 增加modelid埋点
	                var modelid;
	                for (var i = 0; i < topics.length; i++) {
	                    modelid = i + modelidPage + 1 + '';
	                    switch (modelid.length) {
	                        case 1:
	                            modelid = '000' + modelid;
	                            break;
	                        case 2:
	                            modelid = '00' + modelid;
	                            break;
	                        case 3:
	                            modelid = '0' + modelid;
	                            break;
	                        default:
	                            modelid = modelid;
	                    }
	                    topics[i].modelid = $_CONFIG['sshtjg'] + modelid;
	                }
	                topics.group_domain = $_CONFIG.group_domain;
	                tiles.appended($(tpl({
	                    topics: topics
	                })));
	                keywordMark.init({
	                    a: $('[data-node=list_title]'),
	                    b: $('[data-node=list_description]')
	                }, keyword);
	                if (topics.length < 20) {
	                    $loadMore.off().hide();
	                    $loading.hide();
	                } else {
	                    $loadMore.show();
	                }
	            }
	        } else {
	            finished = true;
	            noMoreData();
	        }
	    }).fail(function () {
	        alert("数据请求失败 请稍后尝试");
	    }).always(function () {
	        firing = false;
	    });
	    return false;
	};
	
	var init = function init() {
	    load();
	    $loadMore.on('click', load); // 加载更多
	
	    /*
	    share.shareItem($('[data-node=groupWrap]'), '[data-node=share]', function(conf){
	    	conf.url = $_CONFIG.group_domain + conf.url;
	    	conf.title = conf.title + '这儿有我们志趣相投的小伙伴，快加入我们吧！';
	    });
	    */
	};
	init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

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

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';
	
	/**
	 * showPic  - tmod helpers
	 * 社交部分显示默认图片
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(34);
	var showPic = function showPic(pic, defaultpic) {
		if (pic === '') {
			return $_CONFIG.imgpath + '/images/public/' + defaultpic;
		} else {
			return pic;
		}
	};
	
	module.exports = function () {
		tmod.helper('showPic', showPic);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

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

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/searchTopics/topics',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,topics=$data.topics,topic=$data.topic,index=$data.index,topicFirstPic=$data.topicFirstPic,$escape=$utils.$escape,$string=$utils.$string,$out='';$each(topics,function(topic,index){
	$out+=' ';
	if(topic.topic){
	$out+=' ';
	if(topicFirstPic === ""){
	$out+=' <div class="circle-box no-pic"> ';
	}else{
	$out+=' <div modelid="';
	$out+=$escape(topic.modelid);
	$out+='" class="circle-box"> ';
	}
	$out+=' <div class="mg-negative"> ';
	if(topic.topic.topicFirstPic === ""){
	$out+=' <span class="topic-tag topic-tag-static"> ';
	}else{
	$out+=' <span class="topic-tag"> ';
	}
	$out+=' ';
	if(topic.user){
	$out+=' <a href="';
	$out+=$escape($helpers. othersLink(topic.user.id ));
	$out+='" target="_blank"> <em class="icon-lysy"> <img src="';
	$out+=$escape($helpers. showPic(topic.user.facePicUrl , 'head-default.png'));
	$out+='" title="';
	$out+=$escape(topic.user.nickname);
	$out+='" onerror="imgError(this)"> </em> ';
	$out+=$escape(topic.user.nickname);
	$out+=' </a> ';
	}else{
	$out+=' <a href="javascript:;" style="cursor: default;"> <em class="icon-lysy"> <img src="" title="" onerror="imgError(this)"> </em> ';
	}
	$out+=' </span> ';
	if(topic.topic.topicFirstPic !== ""){
	$out+=' <div class="list-img"> <a href="';
	$out+=$escape(topics.group_domain);
	$out+='topic/';
	$out+=$escape(topic.topic.id);
	$out+='.html" target="_blank">  <img src="';
	$out+=$escape(topic.topic.topicFirstPic);
	$out+='" title="" onerror="imgError(this);"> ';
	if(topic.topic.picType == 'video'){
	$out+=' <em class="icon-play"></em> ';
	}
	$out+=' </a> </div> ';
	}
	$out+=' <div class="list-title"> <p class="list-title-content"> <a data-node="list_title" href="';
	$out+=$escape(topics.group_domain);
	$out+='topic/';
	$out+=$escape(topic.topic.id);
	$out+='.html" target="_blank">';
	$out+=$string($helpers. truncateByteLen(topic.topic.name , '52'));
	$out+='</a> <span class="list-title-time">';
	$out+=$escape(topic.topic.time_str);
	$out+='</span> </p> </div> <p data-node="list_description" class="list-description">';
	$out+=$string($helpers. truncateByteLen(topic.topic.topicContent , '74'));
	$out+='</p> <div class="text-icon"> ';
	if(topic.like){
	$out+=' <a href="javascript:;" data-action="like" data-id="';
	$out+=$escape(topic.id);
	$out+='" data-type="1" data-praise="';
	$out+=$escape(topic.like.isLike === false ? 1 : 0);
	$out+='" data-count=';
	$out+=$escape(topic.like.userQuantity);
	$out+='> <em class="icon-like"></em> ';
	$out+=$escape(topic.like.userQuantity);
	$out+=' </a> ';
	}
	$out+=' <a href="javascript:;" class="a-share"> <em class="icon-discuss"></em> <span>';
	$out+=$escape(topic.topic.topicReplyNum);
	$out+='</span> </a> <!-- <a data-action="shareto" data-surl="';
	$out+=$escape(topics.groupDomain);
	$out+='topic/detail?tid=';
	$out+=$escape(topic.id);
	$out+='" data-stitle="这儿有我们志趣相投的小伙伴，快加入我们吧" data-spic="" href="javascript:;" class="a-share"> <em class="icon icon-share"></em>分享到 </a> --> </div> </div> </div> ';
	}
	$out+=' ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	//参数：
	//nodeName:jquery选择器对象或对象集合,为直接包含所要过滤内容的节点
	//keywordMark.init({
	//	a:$('[data-node=list_title]'),
	//	b:$('[data-node=list_description]')
	//},keyword);
	//markText:需要替换成的文字
	var init = function init(nodeName, markText) {
	    var _nodeName = nodeName;
	    var textArr = markText.split('+');
	    var marker = function marker(nodeName, markText) {
	        var reg = new RegExp(markText, 'g');
	        for (var i in nodeName) {
	            $(nodeName[i]).each(function () {
	                var _this = $(this);
	                var text = _this.html();
	                if (text.indexOf(markText) > -1 && text.indexOf('img') == -1 && text.indexOf('src') == -1) {
	                    text = text.replace(reg, '<aside style="color:red;display:inline">' + markText + '</aside>');
	                    _this.html(text);
	                }
	            });
	        }
	    };
	    for (var i = 0; i < textArr.length; i++) {
	        if (textArr[i].length > 0) {
	            marker(_nodeName, textArr[i]);
	        }
	    }
	};
	
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })

});
//# sourceMappingURL=searchTopics.js.map