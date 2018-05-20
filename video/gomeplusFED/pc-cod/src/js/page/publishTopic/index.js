require('./topicTitle');
require('./editorBarFixed');
var editor = require('./editor');
var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var confirm = require('module/popup/confirm');
// var Dialog = require('module/popup/circle/dialog');
var unsuccessful = require('./unsuccessful');
var showItem = require('./showItem');
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('publishTopic');


/**
 * 组装数据
 */
var makeFormData = function() {
    var name = $('[data-node=topicTitle]').val();
    var content = $('[data-node=editor]').val();
    var groupId = $('[data-action=selectGroup]').attr('data-groupid');
    var components = [];
    // 转换内容数据
    components.push({
        type: 'text',
        text: content
    });

    var inputList = $('[data-node=picAndShop]').find('textarea[data-action=textBox]');
    $.each(inputList, function(i, n) {
        components.push($(n).data('info'));
    });

    return {
        "name": name,
        "groupId": groupId,
        "components": components
    };
};

/**
 * 表单检测
 */
var formCheck = function() {
    var title = $('[data-node=topicTitle]').val();
    var content = $('[data-node=editor]').val();
    var groupId = $('[data-action=selectGroup]').attr('data-groupid');
    if ($.trim(title) === '') {
        alert('请输入话题标题');
        return false;
    }
    // if ($.trim(content) === '') {
    //     alert('话题内容不能为空');
    //     return false;
    // }
    if ($.trim(groupId) === '') {
        alert('圈子不能为空');
        return false;
    }
    return true;
};

/**
 * 提交发布话题
 */
var btnPublishTopic = $('[data-action=publishTopic]');
var finished = true;
var publishTopic = function(option) {
    var _data = option;
    btnDisabled(btnPublishTopic);
    fetch.post(url.get('groupPublishTopic'), {
        data: _data
    }).done(function(data) {
        if (data.success === true) {
            window.location.href = $_CONFIG.group_domain + "topic/detail?tid=" + data.data.id;
        } else {
            unsuccessful.init(data);
            btnActivate(btnPublishTopic);
        }
    }).fail(function(data) {
        btnActivate(btnPublishTopic);
        alert('发送失败，点击确定重新发布', {
            ok: function() {
                publishTopic(_data);
            }
        });
    });
};
var btnDisabled = function(node) {
    finished = false;
    node.html('发布中').css('background-color', '#d0d0d0');
};
var btnActivate = function(node) {
    finished = true;
    node.html('发布').css('background-color', '#f95353');
};
btnPublishTopic.on('click', function(e) {
    e.preventDefault();
    if (formCheck()) {
        var data = makeFormData();
        confirm('是否确认发布？', {
            okCls: '',
            ok: function() {
                if (finished) {
                    publishTopic(data);
                } else {
                    // LEEROY JEEEEEEENKIIIIIIIIIIIIIIINS！
                }
            }
        });
    }

});
var showData = $GLOBAL_CONFIG['itemJson'];
if (showData != '') {
    showItem.init(showData);
}