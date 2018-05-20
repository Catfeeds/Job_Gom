webpackJsonp([12],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var tpl = __webpack_require__(155);
	var art = __webpack_require__(26);
	var alert = __webpack_require__(36);

	__webpack_require__(156)();

	var $container = $('[data-node=groupWrap]'); // 圈子容器
	var keyword = $container.data('keyword'); // 关键字
	var $loadMore = $('[data-action=loadMore]');
	var $loading = $('[data-node=loading]');
	// var $noload = $('[data-node=noload]');
	// 发送统计数据用
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('searchGroup');

	// 加载更多
	var firing = false; // 是否正在加载
	var page = 2;
	var finished = false; // 数据是否全部加载完毕

	var beforeLoad = function() {
	    $loadMore.hide();
	    $loading.show();
	};

	var noMoreData = function() {
	    $loadMore.find('span').html('没有更多数据');
	    $loadMore.off().show();
	    $loading.hide();
	};

	var groupEvent = function() {
	    $('[data-node=groupWrap]').on('click', '[data-node=groupList]', function(e) {
	        if (!$(e.target).closest('a', this).length) {
	            window.open($_CONFIG['group_domain'] + 'circle/' + $(this).attr('data-id') + '.html');
	        }
	    });
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

	    fetch.get(url.get('searchGroup'), {
	        data: {
	            keyword: keyword,
	            page: page,
	            pagesize: 20
	        }
	    }).done(function(json, textStatus, jqXHR) {
	        if (json.code === 200) {
	            page++;
	            var groups = json.data.groups || [];
	            if (groups.length == 0) {
	                finished = true;
	                noMoreData();
	            } else {
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
	        } else {

	        }
	    }).fail(function(jqXHR, textStatus, errorThrown) {
	        alert("数据请求失败 请稍后尝试");
	    }).always(function() {
	        firing = false;
	    });
	    return false;
	};

	var init = function() {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 155:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/groupSearch/group',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,groups=$data.groups,group=$data.group,index=$data.index,$escape=$utils.$escape,$out='';$each(groups,function(group,index){
	$out+=' <div class="shop-list" data-node=\'groupList\' data-id=\'';
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

/***/ },

/***/ 156:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {/**
	 * showPic  - tmod helpers
	 * 社交部分显示默认图片
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var showPic = function(pic, defaultpic) {
		if (pic === '') {
			return $_CONFIG.imgpath + '/images/public/' + defaultpic;
		} else {
			return pic;
		}
	};

	module.exports = function() {
		tmod.helper('showPic', showPic);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }

});