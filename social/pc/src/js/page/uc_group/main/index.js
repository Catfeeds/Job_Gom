var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var tip = require("module/i18n");

require('module/tmodHelper/showPic')();

var tplContent = require('./content.tpl');
var no_created = require('./no_created.tpl');
var no_joined = require('./no_joined.tpl');


var init = function() {
	var $content = $('[data-node=content]'),
	$createdCircle = $content.find('[data-node=createdCircle]'),
	$joinedCircle = $content.find('[data-node=joinedCircle]'),
	// $createdTitle = $content.find('[data-node=createdTitle]'),
	$loading = $content.find('[data-node=loading]'),
	// $loadMore = $content.find('[data-node=loadMore]'),
	$noMore = $content.find('[data-node=noMore]');

	var showNoData = function(type) {
		if (type === "joined") {
			$content.append(no_joined({
				url_domain: $_CONFIG.group_domain
			}));
		} else if (type === "created") {
			$content.prepend(no_created({
				url_domain: $_CONFIG.group_domain
			}));
		}
	};

	var contentInit = function(obj, type) {
		if (obj.length === 0) {
			$loading.hide();
			showNoData(type);
		} else {
			$loading.hide();
			obj.group_domain = $_CONFIG.group_domain;
			if (type === "created") {
				$createdCircle.append(tplContent({
					contents: obj
				})).show();
			} else if (type === "joined") {
				$joinedCircle.append(tplContent({
					contents: obj
				})).show();
			}

		}
	};

	var createActive = function(data) {
		if (data.length >= 10) {
			alert(tip.createCircle.upperLimit);
		} else {
			fetch.get(url.get('canCreate'), {
				async: false
			}).done(function(json/*, textStatus, jqXHR*/) {
				if (json.success) {
					if (json.check == 1) {
						window.open($_CONFIG.group_domain + '/index/create');
					} else {
						alert(tip.createCircle.upperLimit);
					}
				} else {
					alert("数据请求失败 请稍后尝试");
				}
			}).fail(function(/*jqXHR, textStatus, errorThrown*/) {
				alert("数据请求失败 请稍后尝试");
			});
		}
	};

	fetch.get(url.get('getJoinedCircle')).done(function(json/*, textStatus, jqXHR*/) {
		if (json.success) {
			var created = json.imaster;
			var joined = json.imember;
			contentInit(created, 'created');
			contentInit(joined, 'joined');
			$('[data-node=btnCreate]').on('click', function() {
				createActive(created);
			});
			$('[data-node=user-name]').on('click', function(event) {
				window.open($_CONFIG.group_domain + 'circle/' + $(event.target).data('id') + '.html');
			})
		} else {
			alert("数据请求失败 请稍后尝试");
			$loading.hide();
			$noMore.show();
		}
	}).fail(function(/*jqXHR, textStatus, errorThrown*/) {
		alert("数据请求失败 请稍后尝试");
	});
};

module.exports = {
	init: init
};