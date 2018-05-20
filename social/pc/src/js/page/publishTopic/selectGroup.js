/**
 * 选择圈子
 * @author Zhengchun Fu
 */
var showSelectGroup = require('module/popup/circle/dialog');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');

var selectGroup = function() {
	Pubsub(channel.postTopic.selectCircle).sub(function(group) {
		var $group = $('[data-action=selectGroup]');
		$group.attr('data-groupid', group.id);
		$group.html(group.name);
	});

	$('[data-action=selectGroup]').on('click', function() {
		showSelectGroup();
	});
};

module.exports = {
	init: selectGroup
};