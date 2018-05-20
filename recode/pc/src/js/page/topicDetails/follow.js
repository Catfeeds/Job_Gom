//加关注
var dialogAlert = require('module/popup/alert');
var fetch = require("io/fetch");
var url = require('io/url');
var popTpl = require('./follow.tpl');
var alert = require('module/popup/alert');

var init = function(node, isfollowed) {
	if ($_CONFIG.islogin === 0) {
		alert('您还未登录,请登录后重试');
		return false;
	}
	var _node = node;
	var Request = function(option, node) {
		var _Rnode = node || false;
		fetch.get(option.url, {
			data: {
				userid: option.userid
			}
		}).done(function(data) {
			if (data.code == '200') {
				if (option.isAlert) {
					var Dialog = dialogAlert('', {
						width: '600',
						content: popTpl(),
						ok: false,
						close: function() {
							Dialog.remove();
						}
					});
					$('[data-node="QRcode"]').attr('src', $_CONFIG.imgpath + '/images/public/down-ma.png');
					$('[data-node="dialog_close"]').on('click', function() {
						$(this).off();
						Dialog.remove();
					})
					$(_node).css('opacity', '0.7');
				} else {
					$(_node).css('opacity', '1');
				}
				if (_Rnode) {
					init(_Rnode)
				}
			} else {
				alert(data.message);
				if (_Rnode) {
					init(_Rnode)
				}
			}
		})
		_node.html(option.val);
	}
	if (isfollowed || isfollowed == '1' || !isfollowed == undefined) {
		_node.html('已关注').css('opacity', '0.7');
	}
	_node.on('click', function() {
		if ($_CONFIG.islogin == 0) {
			alert('您还未登录,请登录后重试');
			return false;
		}
		var option = {};
		option.userid = $(this).data('userid');
		if ($(this).html() == '已关注') {
			option.isAlert = false;
			option.url = url.get('unfollow');
			option.val = '加关注';
			$(this).off();
			Request(option, _node);
		} else {
			option.isAlert = true;
			option.url = url.get('follow');
			option.val = '已关注';
			$(this).off();
			Request(option, _node);
		}
	})
}

module.exports = {
	init: init
};
