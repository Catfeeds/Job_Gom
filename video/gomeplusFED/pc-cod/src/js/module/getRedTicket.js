var fetch = require('io/fetch'),
	url = require('io/url'),
	Dialog = require('dialog');
var init = function(obj) {
	obj.on('click', '[data-action="getRed"]', function(e) {
		e.stopPropagation();
		if (~~$_CONFIG.islogin === 0) {
			window.location.href = $_CONFIG.passport_domain + 'login/index?redirect=' + $_CONFIG.current_url;
		} else {
			var redId = $(this).attr('data-redId');
			fetch.post(url.get('getShopTicket'), {
				data: {
					redPackId: redId
				}
			}).done(function(result) {
				if (result) {

					var getSuccess = Dialog({
						title: '',
						modal: true,
						fixed: true,
						content: '<p class="del-pop-p">' + ((result.code === 200 && result.message === '成功') ? '领取成功' : result.message) + '</p>',
						className: 'pop-box',
						onshow: function() {
							var timer = null;
							$(getSuccess.backdrop, getSuccess.node).on('click', function() {
								getSuccess.remove();
								clearTimeout(timer);
							})
							timer = setTimeout(function() {
								clearTimeout(timer);
								getSuccess.remove();
							}, 3000);
						}
					});
					getSuccess.show();
				}
			}).fail(function(xhr, error) {
				console.log(arguments);
				var getSuccess = Dialog({
					title: '',
					modal: true,
					fixed: true,
					content: '<p class="circle-pop-p">网络异常，领取失败</p>',
					className: 'pop-box',
					okValue: '确定',
					okCls: 'pc-btn pc-btnh35 circle-pop-btn',
					ok: function() {}
				});
				getSuccess.show();
			});
		}

	});
}
module.exports = init;