var fetch = require('io/fetch');
var url = require('io/url');

// tmod helpers
require('module/tmodHelper/truncateLen')();

var alert = require('module/popup/alert');

var tplContent = require('./content.tpl');
var noData = require('./noData.tpl');

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