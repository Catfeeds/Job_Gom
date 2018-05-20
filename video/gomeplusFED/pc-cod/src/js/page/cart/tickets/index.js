/**
 * 领券部分
 * @return null
 */

var alert = require('module/popup/alert');
var fetch = require('io/fetch');
var url = require('io/url');
var redPackListTpl = require('./tickets.tpl');
var dateFormat = require('module/dateFormat');

var tipsMsg = {
	success: '领取成功',
	loadFail: '加载失败。。。'
};

// 节点变量
var ticketsNode = '[data-node=tickets]';
var showTicketsNode = '[data-action=showTickets]';
var redPackListNode = '[data-node=redPackList]';

// load tickets list
function loadTicketsList() {
	$(showTicketsNode).on('click', function(e) {
		e.stopPropagation();
		var $position = $(this).position();
		var left = $position.left - 80;
		var $thisTicketsBox = $(this).parents('td').find(ticketsNode);
		$thisTicketsBox.css({
			left: left
		}).show();

		$(this).parents('table').siblings('table').find(ticketsNode).hide();

		var shopId = $(this).data('shopid');
		var failTipsHtml = '<li>' + tipsMsg.loadFail + '</li>';
		var $thisTicketsList = $thisTicketsBox.find(redPackListNode);

		// 渲染店铺券列表
		fetch.get(url.get('cartGetRedPacketList'), {
			data: {
				shopId: shopId
			}
		}).done(function(data, textStatus, jqXHR) {
			if (data.success === true) {
				var redPackList = data.data.coupons;
				var list = [];
				$.each(redPackList, function(k, v) {
					var rpList = {};
					rpList.id = v.batchSn;
					rpList.money = Math.floor(v.money / 100);
					rpList.baseMoney = v.usageRule.minAmount / 100;
					rpList.bTime = dateFormat(v.effectiveStartTime, 'Y.M.D');
					rpList.eTime = dateFormat(v.effectiveEndTime, 'Y.M.D');
					list.push(rpList);
				});
				var html = redPackListTpl({
					redPackList: list
				});
				$thisTicketsList.html(html);
			} else {
				$thisTicketsList.html(failTipsHtml);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			$thisTicketsBox.find(redPackListNode).html(failTipsHtml);
		});
	});
}

// getTickets
function getTickets() {
	var gotTicket = true;
	$(ticketsNode).on('click', '[data-action=getTicket]', function(e) {
		e.preventDefault();
		var ticketSn = $(this).data('ticketid');
		var shopID = $(this).data('shopId');
		var $this = $(this);

		if (gotTicket) {
			gotTicket = false;
			fetch.post(url.get('cartGetRedPacket'), {
				data: {
					batchSn: ticketSn
				}
			}).done(function(data, textStatus, jqXHR) {
				var options = {
					cancelCls: 'hide',
					ok: function() {
						gotTicket = true;
					},
					cancel: function() {
						gotTicket = true;
					}
				};

				if (data.success === true) {
					alert(tipsMsg.success, options);
				} else {
					alert(data.message, options);
				}
			}).fail(function(data) {
				alert('领取失败，可能网络出现了问题~');
			});
		}

	});
}

function init() {

	// 显示领券
	$(ticketsNode).on('click', function(e) {
		e.stopPropagation();
	});

	loadTicketsList();

	// 隐藏领券
	$('[data-action=close]').on('click', function() {
		$(this).parents(ticketsNode).hide();
	});

	// 点击领券
	getTickets();
}

module.exports = {
	init: init
};