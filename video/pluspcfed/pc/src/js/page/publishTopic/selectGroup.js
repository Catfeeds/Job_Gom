/**
 * 选择圈子
 * @author Zhengchun Fu
 */
var showSelectGroup = require('module/popup/circle/dialog');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var toast = require('module/hint').init;
var from = $GLOBAL_CONFIG['from'];
var canSelect = $GLOBAL_CONFIG['channel'] || '';

function selectGroup() {
    Pubsub(channel.postTopic.selectCircle).sub(function(group) {
        var $group = $('[data-action=selectGroup]');
        $group.attr('data-groupid', group.id);
        $group.attr('data-grouptype', group.type);
        $group.html(group.name);
    });

    $('[data-action=selectGroup]').on('click', function() {
        if(canSelect == 'meihao'){
        } else if (from != 1  ) {
            showSelectGroup();
        } else {
            toast('已发布的话题不能修改圈子', {
                duration: 2000
            });
        }
    });
};

module.exports = {
    init: selectGroup
};
