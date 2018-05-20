/**
 * 取消订单方法
 * @author Zhengchun Fu
 */
var fetch = require('io/fetch');
var url = require('io/url');
var confirm = require('module/popup/confirm');
var alert = require('module/popup/alert');
var toast = require('module/hint').init;
var tipsMsg = {
	cancelOrder: '确认要取消订单吗？',
	cancelFail: '订单取消失败!网络可能出问题了~',
	canceled: '系统已取消订单'
};

// 取消订单方法
var cancelOrder = function(options) {
	var cancelUrl = options.isPayed ? 'payedCancelOrder' : 'unPayCancelOrder';
	confirm(tipsMsg.cancelOrder, {
		title: '操作',
		width: 500,
		className: 'pop-box',
		btnWrapCls: 'text-center',
		okCls: 'two-button two-button-red',
		cancelCls: 'two-button',
		ok: function() {
			fetch.get(url.get(cancelUrl), {
				data: {
					id: options.id
				}
			}).done(function(data) {
				var info = data.data;
				var status = info.status;
				var statusDesc = info.statusDesc;

				if (data.success === true) {
					options.okFn(statusDesc);
					return;
				}

				// 如果订单已经是取消状态，执行取消的成功操作
				// 否则弹出失败信息
				if (status == -1 || status == -6) {
					options.okFn(statusDesc);
				} else if (status != 1 || status != 0) {
					toast(tipsMsg.canceled);
					setTimeout(function() {
						location.reload();
					}, 2000);
				} else {
					toast(data.message);
				}

			}).fail(function(data) {
				alert(tipsMsg.cancelFail);
			});
		}
	});
};

module.exports = cancelOrder;