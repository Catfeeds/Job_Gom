var fetch = require('io/fetch');
var url = require('io/url');

var tpl = require('./topics.tpl');
var Tiles = require('tiles');
var keywordMark = require('./keywordMark');
var alert = require('module/popup/alert');
require('module/tmodHelper/showPic')();
require('module/tmodHelper/truncateByteLen')();
require('module/tmodHelper/othersLink')();

// 发送统计数据用
// var buriedPoint = require('utils/buriedPoint');
// buriedPoint.setPageData('searchTopic');

var tiles = new Tiles({
	columnWidth: 242
}, '[data-node=tiles]');
var _decodeURIComponent = function(uri){  
	if(!uri){  
		return uri;  
	}  
	var result;  
	try{  
		result = decodeURIComponent(uri);  
	}catch(ex){  
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

var beforeLoad = function() {
	$loadMore.hide();
	$loading.show();
};

var noMoreData = function(str) {
	var msg = str || '没有更多数据';
	$loadMore.find('span').html(msg);
	$loadMore.off().show();
	$loading.hide();
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
	fetch.get(url.get('searchTopics'), {
		data: {
			word: keyword,
			page_num: page,
			pagesize: 20
		}
	}).done(function(json/*, textStatus, jqXHR*/) {
		if (json.code === 200) {
			page++;
			var topics = json.data.topics || [];
			if (topics.length == 0) {
				finished = true;
				noMoreData('无相关话题');
			} else {
				$loading.hide();
				// var data = [];
				// for( var i=0;i<topics.length;i++ ){
				// 	if( topics[i].user.userName !== "" ){
				// 		data.push(topics[i]);
				// 	}
				// }
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
	}).fail(function(jqXHR/*, textStatus, errorThrown*/) {
		alert("数据请求失败 请稍后尝试");
	}).always(function() {
		firing = false;
	});
	return false;
};

var init = function() {
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