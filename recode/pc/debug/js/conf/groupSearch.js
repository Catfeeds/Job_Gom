webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var tpl = __webpack_require__(165);
	var alert = __webpack_require__(36);
	
	__webpack_require__(166)();
	
	var $container = $('[data-node=groupWrap]'); // 圈子容器
	var keyword = $container.data('keyword'); // 关键字
	var $loadMore = $('[data-action=loadMore]');
	var $loading = $('[data-node=loading]');
	// var $noload = $('[data-node=noload]');
	// 发送统计数据用
	var buriedPoint = __webpack_require__(40);
	buriedPoint.setPageData('searchGroup');
	
	// 加载更多
	var firing = false; // 是否正在加载
	var page = 2;
	var finished = false; // 数据是否全部加载完毕
	
	var beforeLoad = function beforeLoad() {
	    $loadMore.hide();
	    $loading.show();
	};
	
	var noMoreData = function noMoreData() {
	    $loadMore.find('span').html('没有更多数据');
	    $loadMore.off().show();
	    $loading.hide();
	};
	
	var groupEvent = function groupEvent() {
	    $('[data-node=groupWrap]').on('click', '[data-node=groupList]', function (e) {
	        if (!$(e.target).closest('a', this).length) {
	            window.open($_CONFIG['group_domain'] + 'circle/' + $(this).attr('data-id') + '.html');
	        }
	    });
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
	
	    fetch.get(url.get('searchGroup'), {
	        data: {
	            keyword: keyword,
	            page: page,
	            pagesize: 20
	        }
	    }).done(function (json) {
	        if (json.code === 200) {
	            var modelidPage = (page - 1) * 20; //埋点用的modelid增加基点
	            page++;
	            var groups = json.data.groups || [];
	            if (groups.length == 0) {
	                finished = true;
	                noMoreData();
	            } else {
	                var modelid;
	                for (var i = 0; i < groups.length; i++) {
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
	                    groups[i].modelid = $_CONFIG['ssqzjg'] + modelid;
	                }
	                groups.keyword = keyword; // 关键词
	                var html = tpl({
	                    groups: groups
	                });
	                $loading.hide();
	                $container.append(html);
	                if (groups.length < 20) {
	                    noMoreData();
	                } else {
	                    $loadMore.show();
	                }
	            }
	        }
	    }).fail(function () {
	        alert("数据请求失败 请稍后尝试");
	    }).always(function () {
	        firing = false;
	    });
	    return false;
	};
	
	var init = function init() {
	    $loadMore.on('click', load); // 加载更多
	    // 暂时使用js添加链接跳转
	    // TODO:
	    // 可能存在的坑：如果节点结构发生变化,判断逻辑可能失效
	    // 如果需求希望整个card都可以跳转,在外层添加a标签是更好的做法
	    groupEvent();
	
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

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/groupSearch/group',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,groups=$data.groups,group=$data.group,index=$data.index,$escape=$utils.$escape,$out='';$each(groups,function(group,index){
	$out+=' <div modelid="';
	$out+=$escape(group.modelid);
	$out+='" class="shop-list" data-node=\'groupList\' data-id=\'';
	$out+=$escape(group.id);
	$out+='\'> <div class="mg-negative"> <!--<a data-node="share" href="javascript:;" class="a-share search-circle-share" data-surl="topic/index?gid=';
	$out+=$escape(group.groupId);
	$out+='" data-stitle="';
	$out+=$escape(group.name);
	$out+='" data-spic="';
	$out+=$escape($helpers. showPic(group.groupIcon ));
	$out+='"> <em class="icon icon-share"></em>分享到</a> --> <div class="user-head"> <a target="_blank" href="/circle/';
	$out+=$escape(group.id);
	$out+='.html" bp-data=\'{"event_id": "G000P006", "s_word": "';
	$out+=$escape(groups.keyword);
	$out+='", "group_id": "';
	$out+=$escape(group.id);
	$out+='", "s_type": "group"}\'><img src="';
	$out+=$escape($helpers. showPic(group.icon , 'circle-default.png'));
	$out+='" title="';
	$out+=$escape(group.category.name);
	$out+='"></a> </div> <h3 class="user-name">';
	$out+=$escape(group.name);
	$out+='</h3> <div><span class="pc-btn pc-bj-fc8753 circle-type">';
	$out+=$escape(group.category.name);
	$out+='</span></div> <div class="user-top-info"> <ul class="clearfix"> <li>成员：<span>';
	$out+=$escape(group.memberQuantity);
	$out+='</span></li> <li>话题：<span>';
	$out+=$escape(group.topicQuantity);
	$out+='</span></li> </ul> </div> </div> </div> ';
	});
	return new String($out);
	});

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

/***/ })

});
//# sourceMappingURL=groupSearch.js.map