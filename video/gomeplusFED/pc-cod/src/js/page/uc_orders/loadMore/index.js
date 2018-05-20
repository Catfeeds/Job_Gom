/**
 * 加载更多
 * @author Zhengchun Fu
 */
var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var orderListTpl = require('./orderList.tpl');

var loadMoreUrl = 'loadMoreOrder';
var tipsMsg = {
	loadFail: '加载失败'
};
var curPage = 1;
var curStatus = parseInt($('[data-node=orderStateNav]').data('status'));
var pageSize = 15;

var $orderList = $('[data-node=orderList]');
var $pageMore = $('[data-node=pageMore]');
var $pageLoading = $('[data-node=pageLoading]');
var $pageNothing = $('[data-node=pageNothing]');
var $conf = $_CONFIG;

var loadMore = function() {
	$pageMore.on('click', function() {
		var page = curPage + 1;

		function loadMoreStyle(flag) {
			if (flag) {
				$pageMore.hide();
				$pageLoading.show();
			} else {
				$pageLoading.hide();
				$pageMore.show();
			}
		}

		// 改变加载按钮样式
		loadMoreStyle(true);

		// 请求
		fetch.get(url.get(loadMoreUrl), {
			data: {
				page: page,
				status: curStatus,
				pageSize: pageSize
			}
		}).done(function(data) {
			var orders = {};

			function noMore() {
				$pageMore.hide();
				$pageLoading.hide();
				$pageNothing.show();
			}

			if (data.success === true) {
				orders.list = data.data.orders;
				orders.domain = $conf;

				// 加载按钮样式显示控制
				// 没有更多内容了
				if (!orders.list.length) {
					noMore();
					return false;
				}

				// TODO:加载更多
				var orderHTML = orderListTpl(orders);
				$orderList.append(orderHTML);
				curPage = page;

				// 如果加载的数据少于分页条数，则表示没有更多内容可加载了。
				if (orders.list.length < pageSize) {
					noMore();
				} else {
					loadMoreStyle(false);
				}
			} else {
				alert(tipsMsg.loadFail);
				loadMoreStyle(false);
			}
		}).fail(function(data) {
			alert(tipsMsg.loadFail);
			loadMoreStyle(false);
		});
	});
};

module.exports = loadMore;