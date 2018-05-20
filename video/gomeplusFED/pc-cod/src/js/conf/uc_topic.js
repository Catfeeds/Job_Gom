webpackJsonp([43],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var main = __webpack_require__(278);
	// 发送统计数据用
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('uc_topics');

	main.init();

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

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);

	// tmod helpers
	__webpack_require__(279)();

	var alert = __webpack_require__(36);

	var tplContent = __webpack_require__(280);
	var noData = __webpack_require__(281);

	var $content = $('[data-node=content]');
	var $loading = $('[data-node=loading]');
	var $loadMore = $('[data-node=loadMore]');
	var $noMore = $('[data-node=noMore]');

	var init = function() {
		var page = 1;
		var firing = false;
		var finished = false;

		var beforeLoad = function() {
			$loadMore.hide();
			$loading.show();
		};

		var noMoreData = function() {
			$loading.hide();
			$noMore.show();
			$loadMore.off();
		};



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

			fetch.get(url.get('getTopic'), {
				data: {
					pageNum: page,
					pageSize: 20
				}
			}).done(function(json, textStatus, jqXHR) {
				if (json.success) {
					page++;
					var data = {
						content: json.data
					};
					if ($.isEmptyObject(json.data)) {
						if (page === 2) {
							finished = true;
							$loading.hide();
							$loadMore.off();
							$content.append($(noData({
								groupDomain: $_CONFIG.group_domain
							})));
						} else {
							finished = true;
							noMoreData();
						}
					} else {
						data.groupDomain = $_CONFIG.group_domain;
						$content.append($(tplContent({
							contents: data
						})));
						$loading.hide();
						if (json.data.length < 20) {
							$loadMore.hide();
						} else {
							$loadMore.show();
						}
					}
				} else {

				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				alert("数据请求失败 请稍后尝试");
			}).always(function() {
				firing = false;
			});
		}
		load(); //加载首屏数据
		$loadMore.on('click', load);

	}
	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 279:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * truncateLen  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var truncate = __webpack_require__(49);
	var byteLen = __webpack_require__(46);
	var encodeHTML = __webpack_require__(209);
	var face = __webpack_require__(178);

	var truncateLen = function(str, len) {
		var s = str;
		if (str.length > len) {
			s = s.substring(0, len) + '...';
		}
		return face.parseEmoji(encodeHTML(s));
	};

	module.exports = function() {
		tmod.helper('truncateLen', truncateLen);
	};

/***/ },

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_topic/main/content',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,contents=$data.contents,content=$data.content,index=$data.index,$escape=$utils.$escape,$out='';$each(contents.content,function(content,index){
	$out+=' ';
	if(content.title && content.title.length){
	$out+=' <li><a href="';
	$out+=$escape(contents.groupDomain);
	$out+='topic/';
	$out+=$escape(content.topid);
	$out+='.html" class="title" target="_blank">';
	$out+=$escape($helpers. truncateLen(content.title , '40'));
	$out+='</a><span>';
	$out+=$escape(content.time);
	$out+='</span> <p>发表自圈子: <a href="';
	$out+=$escape(contents.groupDomain);
	$out+='circle/';
	$out+=$escape(content.groupid);
	$out+='.html" target="_blank">';
	$out+=$escape(content.groupName);
	$out+='</a></p> </li> ';
	}
	$out+=' ';
	});
	return new String($out);
	});

/***/ },

/***/ 281:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/uc_topic/main/noData',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,groupDomain=$data.groupDomain,$out='';$out+='<div data-node="noTopic" class="no-topic"> <div class="txt clearfix"><em class="icon">&#xe964;</em> <p><span>你还没相关话题哦,赶快去 <a href="';
	$out+=$escape(groupDomain);
	$out+='topic/publiser" target="_blank">发布话题 </a>吧</span></p> </div> </div>';
	return new String($out);
	});

/***/ }

});