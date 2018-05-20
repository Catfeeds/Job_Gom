webpackJsonp([32],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var batchManage = __webpack_require__(231);
	var select = __webpack_require__(232);
	var delCollect = __webpack_require__(233);
	var loadMore = __webpack_require__(234);

	//批量管理
	batchManage.init();
	//单选/全选
	select.init();
	//单删/全删
	delCollect.init();
	//加载更多
	loadMore.init();


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

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var Dialog = __webpack_require__(22);
	var noop = function() {};

	var create = function(content, options) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

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

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 批量管理
	 * @author QiaoLi
	 */

	var $showBatch = $('[data-node=showBatch]');
	var $hideBatch = $('[data-node=hideBatch]');
	var $batch = $('[data-action=batch]');
	var $cancelBatch = $('[data-action=cancelBatch]');
	var $selectAll = $('[data-action=selectAll]');
	var selectOne = '[data-action=selectOne]';
	var selectLayer = '[data-node=selectLayer]';
	var dataListBox = '[data-node=dataListBox]';
	var delPopUp = '[data-node=delPopUp]';

	var hide = 'hide';
	var active = 'active';
	var removeDel = 'remove-del';

	//批量管理
	var batchManage = function() {
	    $hideBatch.removeClass(hide);
	    $showBatch.addClass(hide);
	    $(selectLayer).removeClass(hide);
	    $(dataListBox).addClass(removeDel);
	    $(delPopUp).addClass(hide);
	    $(selectOne).removeClass(active);
	    $selectAll.prop("checked", false);
	};

	//取消批量管理
	var cancelBatch = function() {
	    $hideBatch.addClass(hide);
	    $showBatch.removeClass(hide);
	    $(selectLayer).addClass(hide);
	    $(dataListBox).removeClass(removeDel);
	};

	var init = function() {
	    $batch.on('click', batchManage);
	    $cancelBatch.on('click', cancelBatch);
	};

	module.exports = {
	    init: init
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 单选/全选商品、店铺、话题
	 * @author QiaoLi
	 */

	var $collectList = $('[data-node=collectList]');
	var $selectAll = $('[data-action=selectAll]');
	var selectOne = '[data-action=selectOne]';

	var active = 'active';

	//单选
	var selectSingle = function() {
	    var $this = $(this);
	    if ($this.hasClass(active)) {
	        $this.removeClass(active);
	        $selectAll.prop("checked", false);
	    } else {
	        $this.addClass(active);
	        if (!$('[data-action=selectOne]:not(.active)').length) {
	            $selectAll.prop("checked", true);
	        }
	    }
	};

	//全选
	var selectAll = function() {
	    if ($selectAll.prop("checked")) {
	        $(selectOne).addClass(active);
	    } else {
	        $(selectOne).removeClass(active);
	    }
	};

	var init = function() {
	    $selectAll.on('click', selectAll);
	    $collectList.on('click', selectOne, selectSingle);
	};

	module.exports = {
	    init: init
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 删除收藏的商品、店铺、话题
	 * @author QiaoLi
	 */

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(36);
	var confirm = __webpack_require__(53);
	var checkLoginStatus = __webpack_require__(42);

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

	var param = {
	    url: {
	        goods: url.get('delCollectGoods'),
	        shop: url.get('delCollectShop'),
	        topic: url.get('delCollectTopic')
	    },
	    tipsMsg: {
	        goods: '您确定要删除收藏商品吗',
	        shop: '您确定要删除收藏店铺吗',
	        topic: '您确定要删除收藏话题吗'
	    },
	    notChoose: {
	        goods: '请选择要删除的商品',
	        shop: '请选择要删除的店铺',
	        topic: '请选择要删除的话题'
	    }
	};

	//显示/隐藏删除层
	var delLayer = function() {
	    var $this = $(this);
	    var $item = $this.parents(dataListBox);
	    $collectList.find(delPopUp).addClass(hide);
	    if (!$item.hasClass(removeDel)) {
	        $collectList.find(dataListBox).removeClass(removeDel);
	        $item.addClass(removeDel);
	        $item.find(delPopUp).removeClass(hide);
	    } else {
	        $item.removeClass(removeDel);
	        $item.find(delPopUp).addClass(hide);
	    }
	};

	//单个商品删除
	var delSingle = function() {
	    var $this = $(this);
	    var $item = $this.parents(dataListBox);
	    var delId = $item.attr('id');
	    fetch.post(param.url[type], {
	        validate: true,
	        data: {
	            ids: delId
	        }
	    }).done(function(data) {
	        if (data.success === true) {
	            $item.remove();
	            window.location.reload();
	        } else {
	            alert(data.message);
	        }
	    }).fail(function(xhr, error) {
	        if (checkLoginStatus()) alert(data.message);
	    });
	    return false;
	};

	//全选商品删除
	var getIds = function() {
	    var del = [];
	    var selectList = $('[data-action=selectOne].active').parents(dataListBox);
	    $.each(selectList, function() {
	        del.push($(this).attr('id'));
	    });
	    var delIDs = del.join(',');
	    return delIDs;
	};

	var confirmDel = function(options) {
	    confirm('', {
	        content: '<p class="pay-pop-p del-pop-p"><em class="icon icon-warn"></em>' + options.content + '</p>',
	        title: '删除',
	        okCls: '',
	        ok: function() {
	            fetch.post(param.url[type], {
	                validate: true,
	                data: {
	                    ids: options.ids
	                }
	            }).done(function(data) {
	                if (data.success === true) {
	                    $('[data-action=selectOne].active').parents(dataListBox).remove();
	                    window.location.reload();
	                } else {
	                    alert(data.message);
	                }
	            }).fail(function(xhr, error) {
	                if (checkLoginStatus()) alert(data.message);
	            });
	        }
	    });
	};

	var delMultiple = function() {
	    var ids = getIds();
	    var options = {
	        content: param.tipsMsg[type],
	        notChoose: param.notChoose[type],
	        ids: ids
	    };
	    if (!$(selectOne).hasClass(active)) {
	        alert(options.notChoose);
	        return;
	    }
	    confirmDel(options);
	    return false;
	};

	var init = function() {
	    $collectList.on('click', showDelLayer, delLayer);
	    $collectList.on('click', hideDelLayer, delLayer);
	    $collectList.on('click', delOne, delSingle);
	    $delAll.on('click', delMultiple);
	};

	module.exports = {
	    init: init
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/**
	 * 加载更多收藏的商品、店铺、话题
	 * @author QiaoLi
	 */

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var Tiles = __webpack_require__(206);
	var goodsTpl = __webpack_require__(235);
	var shopTpl = __webpack_require__(236);
	var topicTpl = __webpack_require__(237);
	var noCollect = __webpack_require__(238);

	__webpack_require__(228)();

	var $collectList = $('[data-node=collectList]');
	var $dataList = $('[data-node=dataList]');
	var $showBatch = $('[data-node=showBatch]');
	var $hideBatch = $('[data-node=hideBatch]');
	var $tabListA = $('[data-node=tabList] a.active');
	var $loadMore = $('[data-action=loadMore]');
	var $loadedMore = $('[data-node=loadedMore]');
	var $loading = $('[data-node=loading]');
	var $loaded = $('[data-node=loaded]');
	var $noData = $('[data-action=noData]');
	var $noContent = $('[data-node=noContent]');
	var $empty = $('[data-node=empty]');
	var $dataFail = $('[data-node=dataFail]');
	var $dataFailed = $('[data-node=dataFailed]');
	var dataListBox = '[data-node=dataListBox]';
	var selectLayer = '[data-node=selectLayer]';
	var delPopUp = '[data-node=delPopUp]';

	var hide = 'hide';
	var removeDel = 'remove-del';

	var tiles = new Tiles({
	    columnWidth: 242
	}, '[data-node=tiles]');
	var type = $tabListA.data('type');

	var firing = false;
	var page = 1;
	var finished = false;

	var beforeLoad = function() {
	    $loadedMore.addClass(hide);
	    $loaded.removeClass(hide);
	    $dataFail.addClass(hide);
	    $dataFailed.addClass(hide);
	    $(dataListBox).removeClass(removeDel);
	    $(selectLayer).addClass(hide);
	    $(delPopUp).addClass(hide);
	    $hideBatch.addClass(hide);
	};

	var loadMore = function() {
	    $loadedMore.removeClass(hide);
	    $loaded.addClass(hide);
	};

	var noMoreData = function() {
	    $noContent.removeClass(hide);
	    $loadedMore.addClass(hide);
	    $loaded.addClass(hide);
	};

	var dataFail = function() {
	    if (!$(dataListBox).length) {
	        $loaded.addClass(hide);
	        $dataFail.removeClass(hide);
	        $showBatch.addClass(hide);
	    } else {
	        $loaded.addClass(hide);
	        $dataFailed.removeClass(hide);
	    }
	};

	var param = {
	    url: {
	        goods: url.get('getCollectGoods'),
	        shop: url.get('getCollectShop'),
	        topic: url.get('getCollectTopic')
	    },
	    tpl: {
	        goods: goodsTpl,
	        shop: shopTpl,
	        topic: topicTpl
	    }
	};

	//加载中
	var load = function() {
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
	    }).done(function(data) {
	        if (data.success === true) {
	            page++;
	            var loadData = data.data || {};
	            var collect = loadData.collections || [];
	            collect.mallDomain = $_CONFIG.mall_domain;
	            collect.groupDomain = $_CONFIG.group_domain;
	            collect.type = type;
	            if (collect.length == 0) {
	                finished = true;
	                if (!$(dataListBox).length) {
	                    $loaded.addClass(hide);
	                    $dataList.addClass(hide);
	                    $collectList.append($(noCollect({
	                        type: type,
	                        mainDomain: $_CONFIG.main_domain
	                    })));
	                    $showBatch.addClass(hide);
	                } else {
	                    noMoreData();
	                }
	            } else {
	                $showBatch.removeClass(hide);
	                if (type == 'topic') {
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
	        } else {
	            dataFail();
	        }
	    }).fail(function() {
	        dataFail();
	    }).always(function() {
	        firing = false;
	    });
	    return false;
	};
	var init = function() {

	    load();
	    $loadMore.on('click', load);
	};
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_collect/loadMore/collectGoods',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(list,function(value,$index){
	$out+=' <li id="';
	$out+=$escape(value.id);
	$out+='" data-node="dataListBox"> <div class="mg-negative"> <em class="icon icon-del" data-action="showDelLayer">&#xea05;</em> <a href="';
	$out+=$escape(list.mallDomain);
	$out+='product/';
	$out+=$escape(value.shopId);
	$out+='-';
	$out+=$escape(value.itemId);
	$out+='.html" target="_blank"><img src="';
	$out+=$escape(value.item.mainImage);
	$out+='" onerror="imgError(this)"></a> <div class="btn-box"> <a href="';
	$out+=$escape(list.mallDomain);
	$out+='product/';
	$out+=$escape(value.shopId);
	$out+='-';
	$out+=$escape(value.itemId);
	$out+='.html" target="_blank" class="pc-btn pc-btnh40">立即购买</a> <a href="';
	$out+=$escape(list.mallDomain);
	$out+='product/';
	$out+=$escape(value.shopId);
	$out+='-';
	$out+=$escape(value.itemId);
	$out+='.html" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a> </div> <div class="text"> <a href="';
	$out+=$escape(list.mallDomain);
	$out+='product/';
	$out+=$escape(value.shopId);
	$out+='-';
	$out+=$escape(value.itemId);
	$out+='.html" target="_blank"> ￥<span>';
	$out+=$escape(value.item.salePrice);
	$out+='</span> <p>';
	$out+=$escape(value.item.name);
	$out+='</p> </a> </div> </div> <div class="del-btn hide" data-node="delPopUp"> <div class="del-text"> <p>确定要删除？</p> <div class="text-center"><a href="javascript:;" class="pc-btn pc-bj-fff" data-action="cancelDel">取消</a><a href="javascript:;" class="pc-btn" data-action="delOne">确定</a> </div> </div> </div> <div class="del-all hide" data-node="selectLayer"> <em class="icon-check" data-action="selectOne"></em> </div> </li> ';
	});
	return new String($out);
	});

/***/ },

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_collect/loadMore/collectShop',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(list,function(value,$index){
	$out+=' <li id="';
	$out+=$escape(value.id);
	$out+='" data-node="dataListBox"> <div class="mg-negative"> <em class="icon icon-del" data-action="showDelLayer">&#xea05;</em> <a href="';
	$out+=$escape(list.mallDomain);
	$out+='shop/';
	$out+=$escape(value.shopId);
	$out+='.html" target="_blank"><img src="';
	$out+=$escape(value.shop.icon);
	$out+='" onerror="imgError(this)"></a> <div class="text-store"> <a href="';
	$out+=$escape(list.mallDomain);
	$out+='shop/';
	$out+=$escape(value.shopId);
	$out+='.html" target="_blank">';
	$out+=$escape(value.shop.name);
	$out+='</a> <p>收藏时间：';
	$out+=$escape(value.collectedTimeStr);
	$out+='</p> <p>收藏人数：';
	$out+=$escape(value.shopCollectionQuantity.quantity);
	$out+='</p> </div> </div> <div class="del-btn hide" data-node="delPopUp"> <div class="del-text"> <p>确定要删除？</p> <div class="text-center"><a href="javascript:;" class="pc-btn pc-bj-fff" data-action="cancelDel">取消</a><a href="javascript:;" class="pc-btn" data-action="delOne">确定</a> </div> </div> </div> <div class="del-all hide" data-node="selectLayer"> <em class="icon-check" data-action="selectOne"></em> </div> </li> ';
	});
	return new String($out);
	});

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_collect/loadMore/collectTopic',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$string=$utils.$string,str=$data.str,isEssence=$data.isEssence,isUpper=$data.isUpper,$out='';$each(list,function(value,$index){
	$out+=' ';
	if(!value.topic.new_components.item && !value.topic.new_components.image && !value.topic.new_components.video){
	$out+=' <div class="circle-box no-pic" data-node="dataListBox" id="';
	$out+=$escape(value.id);
	$out+='"> ';
	}else{
	$out+=' <div class="circle-box" data-node="dataListBox" id="';
	$out+=$escape(value.id);
	$out+='"> ';
	}
	$out+=' <div class="mg-negative"> <em class="icon icon-del" data-action="showDelLayer">&#xea05;</em> ';
	if(!value.topic.new_components.item && !value.topic.new_components.image && !value.topic.new_components.video){
	$out+=' <span class="topic-tag topic-tag-static"> ';
	}else{
	$out+=' <span class="topic-tag"> ';
	}
	$out+=' <em class="icon-lysy"> <img src="';
	$out+=$escape(value.topic.user.facePicUrl);
	$out+='" onerror="imgError(this)" title="';
	$out+=$escape(value.topic.user.nickname);
	$out+='"> </em> ';
	$out+=$escape(value.topic.user.nickname);
	$out+=' </span>  ';
	if(value.topic.new_components.item){
	$out+=' <div class="list-img"> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.topicId);
	$out+='.html" target="_blank">  <img src="';
	$out+=$escape(value.topic.new_components.item.item.mainImage);
	$out+='" onerror="imgError(this)" title=""> </a> </div> <p class="list-price"> ¥ <span>';
	$out+=$escape(value.topic.new_components.item.item.salePrice);
	$out+='</span> ';
	if(value.topic.new_components.item.item.rebateSummary && value.topic.new_components.item.item.rebateSummary.refRebateMoney > 0){
	$out+=' <em class="fan-tag">返</em> ';
	}
	$out+=' </p> ';
	}else if(value.topic.new_components.image){
	$out+=' <div class="list-img"> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.topicId);
	$out+='.html" target="_blank"><img src="';
	$out+=$escape(value.topic.new_components.image.url);
	$out+='" title=""></a> </div> ';
	}else if(value.topic.new_components.video){
	$out+=' <div class="list-img"> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.topicId);
	$out+='.html" target="_blank"> <img src="';
	$out+=$escape(value.topic.new_components.video.coverImage);
	$out+='" onerror="imgError(this)" title=""> <em class="icon-play"></em> </a> </div> ';
	}
	$out+=' <div class="list-title"> <p class="list-title-content" data-node="list_nav"> ';
	if(value.topic.isUpper){
	$out+=' <em class="set-top">置顶</em> ';
	}
	$out+=' ';
	if(value.topic.isEssence){
	$out+=' <em class="set-spark">精品</em> ';
	}
	$out+=' ';
	if(value.topic.style === 1){
	$out+=' <em class="set-access">专访</em> ';
	}
	$out+=' <a data-node="list_title" href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.topicId);
	$out+='.html" target="_blank">';
	$out+=$string($helpers. truncateLenByJson({str:value.topic.name,isEssence:value.topic.isEssence,isUpper:value.topic.isUpper} , '52'));
	$out+='</a> <span class="list-title-time">';
	$out+=$escape(value.collectedTimeStr);
	$out+='</span> </p> </div> </div> <div class="del-btn hide" data-node="delPopUp"> <div class="del-text"> <p>确定要删除？</p> <div class="text-center"><a href="javascript:;" class="pc-btn pc-bj-fff" data-action="cancelDel">取消</a><a href="javascript:;" class="pc-btn" data-action="delOne">确定</a> </div> </div> </div> <div class="del-all hide" data-node="selectLayer"> <em class="icon-check" data-action="selectOne"></em> </div> </div> ';
	});
	return new String($out);
	});

/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_collect/loadMore/no_collect',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,type=$data.type,$escape=$utils.$escape,mainDomain=$data.mainDomain,$out='';$out+='<div class="no-topic" data-node="empty"> <div class="txt clearfix"><em class="icon">&#xe92d;</em> <p> <span>您还没有收藏的';
	if(type == 'goods'){
	$out+='商品';
	}else if(type == 'shop'){
	$out+='店铺';
	}else{
	$out+='话题';
	}
	$out+='，快去 <a href="';
	$out+=$escape(mainDomain);
	$out+='">首页 </a>看看吧</span></p> </div> </div> ';
	return new String($out);
	});

/***/ }

});