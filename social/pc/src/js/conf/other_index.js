webpackJsonp([22],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var circleList = __webpack_require__(226);
	var moreTopic = __webpack_require__(229);

	//他的圈子列表
	circleList.init();
	//他的话题列表，加载更多
	moreTopic.init();

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * substrLen  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var substrLen = function substrLen(str, len) {
		if (typeof len !== 'number') {
			len = 24;
		}
		if (str.length > len) {
			return str.substr(0, len) + '...';
		}
		return str;
	};

	module.exports = function () {
		tmod.helper('substrLen', substrLen);
	};

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

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	/**
	 * showPic  - tmod helpers
	 * 社交部分显示默认图片
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/**
	 * 他人主页圈子列表
	 * @author QiaoLi
	 */

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(37);
	var circle = __webpack_require__(227);
	var noCircle = __webpack_require__(228);

	__webpack_require__(210)();

	var $circleList = $('[data-node=circleList]');
	var $page = $('[data-node=page]');
	var $pre = $('[data-action=pre]');
	var $next = $('[data-action=next]');

	var hide = 'hide';
	var disabled = 'disabled';

	var index = 0;
	var circleData = "";

	var getIndex = function getIndex(index, maxLength) {
	    if (index === 0) {
	        if (maxLength > 1) {
	            $pre.addClass(disabled);
	            $next.removeClass(disabled);
	        } else {
	            $page.addClass(hide);
	        }
	    } else if (index > 0 && index < maxLength - 1) {
	        $pre.removeClass(disabled);
	        $next.removeClass(disabled);
	    } else {
	        $next.addClass(disabled);
	        $pre.removeClass(disabled);
	    }
	};

	var getCircleList = function getCircleList() {
	    fetch.get(url.get('othersCircle'), {
	        data: {
	            ownerUserId: $_CONFIG.ownerUserId,
	            pageNum: 1
	        }
	    }).done(function (data) {
	        if (data.success === true) {
	            circleData = data.data;
	            var groups = circleData.groups;
	            if (groups.length === 0) {
	                $circleList.html(noCircle());
	                $page.addClass(hide);
	            } else {
	                var list = [];
	                for (var i = 0; i < groups.length; i += 9) {
	                    list.push(groups.slice(i, i + 9));
	                }
	                circleData.list = list;
	                fillContent(index);
	                getIndex(index, circleData.list.length);
	            }
	        } else {
	            alert(data.message);
	        }
	    }).fail(function (data) {
	        alert(data.message);
	    });
	};

	var fillContent = function fillContent(index) {
	    circleData.list[index].groupDomain = $_CONFIG.group_domain;
	    var html = circle({
	        list: circleData.list[index]
	    });
	    $circleList.append(html);
	};

	var changeContent = function changeContent(t, num) {
	    var $this = $(t);
	    if ($this.hasClass(disabled)) {
	        return false;
	    } else {
	        index = index + num;
	        $('[data-node=circleList] li').remove();
	        fillContent(index);
	        getIndex(index, circleData.list.length);
	    }
	    return false;
	};

	var init = function init() {
	    getCircleList();
	    $pre.on('click', function () {
	        changeContent(this, -1);
	    });
	    $next.on('click', function () {
	        changeContent(this, 1);
	    });
	};
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/other_index/circleList/circleList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(list,function(value,$index){
	$out+=' <li class="circle-list"> <div class="img"><a href="';
	$out+=$escape(list.groupDomain);
	$out+='circle/';
	$out+=$escape(value.id);
	$out+='.html" target="_blank"><img src="';
	$out+=$escape($helpers. showPic(value.icon , 'circle-default2.png'));
	$out+='" onerror="imgError(this,\'g\')"></a></div> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='circle/';
	$out+=$escape(value.id);
	$out+='.html" class="text-hide" target="_blank">';
	$out+=$escape($helpers. substrLen(value.name , 5));
	$out+='</a> <div class="side-circle-pop clearfix"> <div class="popbg"><img src="';
	$out+=$escape($helpers. showPic(value.icon , 'circle-default2.png'));
	$out+='" onerror="imgError(this,\'g\')"><div class="bg"></div></div> <div class="triangle"></div> <div class="userhead"><a href="';
	$out+=$escape(list.groupDomain);
	$out+='circle/';
	$out+=$escape(value.id);
	$out+='.html" target="_blank"><img src="';
	$out+=$escape($helpers. showPic(value.icon , 'circle-default2.png'));
	$out+='" onerror="imgError(this,\'g\')"></a></div> <div class="userinfo"> <h3 class="username"><a href="';
	$out+=$escape(list.groupDomain);
	$out+='circle/';
	$out+=$escape(value.id);
	$out+='.html" target="_blank">';
	$out+=$escape($helpers. substrLen(value.name , 5));
	$out+='</a></h3> <div class="tagbox"><span class="tag">';
	$out+=$escape(value.cat);
	$out+='</span></div> <p class="usernums"><span>成员：</span><span class="num">';
	$out+=$escape(value.memberQuantity);
	$out+='</span><span>话题：</span><span class="num">';
	$out+=$escape(value.topicQuantity);
	$out+='</span></p> </div> </div> </li> ';
	});
	return new String($out);
	});

/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/other_index/circleList/no_circle','<div class="no-topic"> <div class="txt clearfix"><em class="iconn-55"></em> <p> <span>Ta还没有圈子哦～</span></p> </div> </div>');

/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/**
	 * 他人主页加载更多话题
	 * @author QiaoLi
	 */

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var topic = __webpack_require__(230);
	var noTopic = __webpack_require__(231);

	__webpack_require__(232)();
	__webpack_require__(88)();

	var $topicContent = $('[data-node=topicContent]');
	var $topicList = $('[data-node=topicList]');
	var $loadMore = $('[data-action=loadMore]');
	var $loading = $('[data-node=loading]');
	var $noData = $('[data-node=noData]');
	var $dataFail = $('[data-action=dataFail]');

	var firing = false; //是否正在加载
	var page = 1;
	var finished = false; //数据是否全部加载完毕

	var hide = 'hide';

	//默认显示加载更多
	var showMoreLoad = function showMoreLoad() {
	    $loadMore.removeClass(hide);
	    $loading.addClass(hide);
	};

	//加载中
	var beforeLoad = function beforeLoad() {
	    $loadMore.addClass(hide);
	    $loading.removeClass(hide);
	    $dataFail.addClass(hide);
	};

	//加载无数据
	var noData = function noData() {
	    $loading.addClass(hide);
	    $noData.removeClass(hide);
	    $dataFail.addClass(hide);
	};

	//加载失败
	var dataFail = function dataFail() {
	    $loading.addClass(hide);
	    $dataFail.removeClass(hide);
	};

	//获取话题列表
	var getTopicList = function getTopicList() {
	    if (firing) {
	        return;
	    }
	    if (finished) {
	        noData();
	        return;
	    }
	    firing = true;
	    beforeLoad();
	    fetch.get(url.get('othersTopic'), {
	        data: {
	            ownerUserId: $_CONFIG.ownerUserId,
	            pageNum: page,
	            pageSize: 10
	        }
	    }).done(function (data) {
	        if (data.success === true) {
	            page++;
	            var list = data.data.topics;
	            $.each(list, function (i, v) {
	                if (v.text !== "" && v.text.length > 98) {
	                    var value = v.text;
	                    var newVal = "";
	                    var str = value.substr(0, 98);
	                    var valueLeft = str.slice(0, -6);
	                    var valueRight = str.slice(-6);
	                    var rIndex = valueRight.indexOf('[');
	                    if (rIndex > -1) {
	                        newVal = valueRight.substr(0, rIndex) + '...';
	                    } else {
	                        newVal = valueRight + '...';
	                    }
	                    v.text = valueLeft + newVal;
	                } else {
	                    v.text = v.text;
	                }
	            });
	            list.groupDomain = $_CONFIG.group_domain;
	            if (list.length === 0) {
	                finished = true;
	                if (!$('[data-node=topicList] li').length) {
	                    $topicContent.append(noTopic());
	                    $loading.addClass(hide);
	                } else {
	                    noData();
	                }
	            } else {
	                var html = topic({
	                    list: list
	                });
	                $topicList.append(html);
	                if (list.length < 10) {
	                    $loading.addClass(hide);
	                } else {
	                    showMoreLoad();
	                }
	            }
	        } else {
	            finished = true;
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
	    getTopicList();
	    $loadMore.on('click', getTopicList);
	    $dataFail.on('click', getTopicList);
	};
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/other_index/moreTopic/topicList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,$index=$data.$index,$escape=$utils.$escape,$string=$utils.$string,imgs=$data.imgs,$out='';$each(list,function(value,$index){
	$out+=' <li> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.topid);
	$out+='.html" target="_blank">';
	$out+=$escape(value.title);
	$out+='</a> ';
	if(value.text !== ""){
	$out+=' <p><a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.topid);
	$out+='.html" target="_blank">';
	$out+=$string($helpers. truncateByteLen(value.text , '238'));
	$out+='</a></p> ';
	}
	$out+=' ';
	if(value.images.length !== 0){
	$out+=' <dl class="clearfix"> ';
	$each(value.images,function(imgs,$index){
	$out+=' <dd> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='topic/';
	$out+=$escape(value.topid);
	$out+='.html" target="_blank"> <img src="';
	$out+=$escape(imgs.url);
	$out+='" alt="" onerror="imgError(this,\'l\')"> ';
	if(imgs.type !== "image"){
	$out+=' ';
	if(imgs.type == "item"){
	$out+=' <em class="iconn-8"></em> ';
	}else{
	$out+=' <em class="icon-9"></em> ';
	}
	$out+=' ';
	}
	$out+=' </a> </dd> ';
	});
	$out+=' </dl> ';
	}
	$out+=' <div class="clearfix"> <div class="fl"> <span class="m0">';
	$out+=$escape(value.time);
	$out+='</span> <span>来自圈子：</span> <a href="';
	$out+=$escape(list.groupDomain);
	$out+='circle/';
	$out+=$escape(value.groupid);
	$out+='.html" target="_blank">';
	$out+=$escape(value.groupName);
	$out+='</a> </div> <div class="fr"> <span><em class="iconn-56"></em>';
	$out+=$escape(value.likeQuantity);
	$out+='</span> <span><em class="iconn-11"></em>';
	$out+=$escape(value.replyQuantity);
	$out+='</span> <span><em class="iconn-57"></em>';
	$out+=$escape(value.topicCollectionQuantity);
	$out+='</span> </div> </div> </li> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/other_index/moreTopic/no_topic','<div class="no-topic"> <div class="txt clearfix"><em class="iconn-55"></em> <p> <span>Ta还没有话题哦～</span></p> </div> </div>');

/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * truncateByteLen  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var truncate = __webpack_require__(42);
	var byteLen = __webpack_require__(43);
	var encodeHTML = __webpack_require__(233);
	var face = __webpack_require__(234);

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

/***/ }

});