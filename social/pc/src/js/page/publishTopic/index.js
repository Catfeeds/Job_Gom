require('./topicTitle');
var editor = require('editor/index');
editor('editor');

var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var confirm = require('module/popup/confirm');
// var Dialog = require('module/popup/circle/dialog');
var unsuccessful = require('./unsuccessful');
var showItem = require('./showItem');

// 选择圈子
require('./selectGroup').init();

// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('publishTopic');

var ue = UE.getEditor("editor");

var regs = {
    img: /(<img.*?>)/gi, //图片
    src: / src=["'](https?\:\/\/.*?meixincdn\.com\/)(.*?)["']/, //图片地址
    br: /(<br>)/gi, //去掉回车符
    cursor: /[\u200b]/gi //光标
};

/**
 * 组装数据
 */
var fillComponents = function(arr) {
    var nodes = ue.document.body.children;
    //push数据到 components

    var pushDiv = function(tagNode) {
        var _childNodes = tagNode.childNodes;
        var data = "";
        for (var i = 0; i < _childNodes.length; i++) {
            var _self = _childNodes[i].attributes;
            if (_self) {
                data = _self['data-info'].nodeValue;
                break;
            }

        }
        // var data = _childNodes[i].attributes['data-info'].nodeValue;
        data = JSON.parse(data);
        arr.push({
            "type": data.type,
            "text": "",
            "id": data.id,
            "shopId": data.shopId,
            "kid": data.kid
        });
    };

    var pushImg = function(node) {
        var src = "",
            srcExec = regs.src,
            domain = srcExec.exec(node)[1];

        if (domain) {
            src = domain + srcExec.exec(node)[2];
            arr.push({
                "type": "image",
                "text": "",
                "url": src
            });
        }
    };

    var pushText = function(text) {
        var _text = $.trim(text).replace(/&nbsp;/gi, ' ');
        if (_text != "") {
            arr.push({
                "type": "text",
                "text": _text
            });
        }
    };
    //主体标签事件

    var wrapP = function(tagNode) {
        // var childNodes = tagNode.childNodes;
        var tagHtml = tagNode.innerHTML;

        var arrs = tagHtml.split(regs.img);

        for (var i = 0; i < arrs.length; i++) {
            var _arr = arrs[i].replace(regs.cursor, '');
            //图片
            if (_arr.indexOf('<img') !== -1) {

                pushImg(_arr);

                //文本                   
            } else if (_arr.indexOf('<br') !== -1) { //带有br
                var _arrs = _arr.split(regs.br);
                for (var j = 0; j < _arrs.length; j++) {
                    var _text = _arrs[j];
                    if (_text.indexOf('<br') == -1) {
                        pushText(_text);
                    }
                }
            } else {
                pushText(_arr);
            }
        }
    };

    //遍历body下的节点 目前只有P 和DIV,img,text(text的为火狐标签溢出bug)
    for (var i = 0; i < nodes.length; i++) {
        var tagNode = nodes[i];

        var tagName = tagNode.tagName;

        switch (tagName) {
            case "P":
                wrapP(tagNode);
                break;
            case "DIV":
                pushDiv(tagNode);
                break;
            case "IMG":
                pushImg(tagNode.outerHTML);
                break;
            case "#TEXT":
                pushText(tagNode.nodeValue);
                break;
        }

    }
};

var makeFormData = function() {
    var name = $('[data-node=topicTitle]').val();
    // var content = $('[data-node=editor]').val();
    var groupId = $('[data-action=selectGroup]').attr('data-groupid');
    var components = [];

    // 转换内容数据 使用ue里面的数据，注释 之前textarea使用的数据
    fillComponents(components);
    /*
    var inputList = $('[data-node=picAndShop]').find('textarea[data-action=textBox]');
    $.each(inputList, function(i, n) {
        components.push($(n).data('info'));
    });
    */
    return {
        "name": name,
        "groupId": groupId,
        "components": components,
        "richText": ue.getContent()
    };
};

/**
 * 表单检测
 */
var formCheck = function() {
    var title = $('[data-node=topicTitle]').val();
    //var content = $('[data-node=editor]').val();
    var content = ue.getContent();
    var groupId = $('[data-action=selectGroup]').attr('data-groupid');

    var checkContent = function(str) {
        var regtxt = /(<img|<div)/;
        var reg = /(<p>|<\/p>|<br>|<br\/>|&nbsp;| )/gi;

        if (regtxt.test(str) == true) {
            return false;
        }

        if (str.replace(reg, "") == "") {
            return true;
        }
    }

    if ($.trim(title) === '') {
        alert('请输入话题标题');
        return false;
    }
    if (checkContent(content)) {
        alert('话题内容不能为空');
        return false;
    }
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
            window.location.href = $_CONFIG.group_domain + "topic/detail?tid=" + data.data.id + '&no_next=1';
        } else {
            unsuccessful.init(data);
            btnActivate(btnPublishTopic);
        }
    }).fail(function() {
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
var showData = $_CONFIG.itemJson;
if (showData !== '') {
    showItem.init(showData);
}