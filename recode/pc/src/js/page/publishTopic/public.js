var editor = require('editor/index');
editor('editor');
var fillComponents = require('./fillComponents');
var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var toast = require('module/hint').init;
var confirm = require('module/popup/confirm');
var unsuccessful = require('./unsuccessful');
var showItem = require('./showItem');
var unhtml = require('utils/unHtml').unhtml;
// 敏感词过滤
var sensitiveWord = require('./sensitiveWord');
var sensitiveContent = require('module/sensitiveContent');
var ue = UE.getEditor("editor");

var config = require('editor/config');
var imgReplace = require('utils/imgReplace');
var imgLimitNUm = config.imgLimitNUm;

    /**
     * 组装数据
     */
var finished = true;
var findSrc = / src=["'](.*?)["']/gi;
var errSrcPath = "editor/spacer.jpg";
var domianGrep = /img\d{0,2}\.((atguat)|(gomein))\.net\.cn/i;

var $imgNode = $('[data-node="upload-success-img"]');



function getLabels() {
    var $labelBox = $('[data-node=crt-lists]');
    var $labels = $labelBox.find('li');
    var labelAry = [];

    if (!$labels) return null;
    $labels.each(function(index, item) {
        var labelId = $(item).attr('data-id');
        var labelName = unhtml($(item).find('span').text());
        if (labelId) {
            labelAry.push({
                "id": labelId,
                "name": labelName
            });
        }
    })
    return labelAry.length ? labelAry : null;
}
/*
*isPreview:是否在type=item情况下插入richText字段
          预览需要，往后台传数据不加
*/
function makeFormData(isPreview) {
    var content = ue.getContent();
    var $links = $(content).find("a");
    var linksLength = $links.length;
    var linksArr = [];

    var name = $('[data-node=topicTitle]').val();
    name = unhtml(name);
    var groupId = $('[data-action=selectGroup]').attr('data-groupid');
    var labels = getLabels();
    var components = [];
    fillComponents(components, isPreview);
    var dataObj = {
        "name": name,
        "components": components,
        "from": $GLOBAL_CONFIG['from'],
        "tid": $GLOBAL_CONFIG['tid'],
    };
    //是否带有链接
    if(linksLength){

        for(var i=0;i<linksLength;i++){
            linksArr.push($links[i].getAttribute('href'));
        }

         $.extend(dataObj, {
            "links": linksArr
        })
    }

    if (groupId) {
        $.extend(dataObj, {
            "groupId": groupId
        })
    }

    //是否带有封面图
    if($imgNode.attr('src')){ 
        $.extend(dataObj,{
            //"coverPic":'//www.atguat.com.cn/?intcmp=group-public03001'
            'coverPic':$imgNode.attr('proto') + $imgNode.attr('src')
        })
    }
    labels ? (dataObj.labels = labels) : void 0;
    return dataObj;
};

/**
 * 表单检测
 */
function formCheck(option) {
    var title = $('[data-node=topicTitle]').val();
    var content = ue.getContent();
    var labelWrap = $('[data-node=crt-lists]');
    var groupId = $('[data-action=selectGroup]').attr('data-groupid');
    var options = option || {};
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
    var imgLenCheck = function(editor) {

        var imgLen = $(editor.getContent()).find("img").not('[data-node="goodsPic"],[data-node="emoji"]').length;
        if (imgLen > imgLimitNUm) {
            return true;
        }
    }

    var imgUploadCheck = function(editor) {

        var arr = [];
        var content = editor.getContent();
        content.replace(findSrc,function(all,$1){
            if($1.indexOf(errSrcPath)!= -1){
                arr.push($1);
            }
        })

        if (arr.length) {
            return true;
        }else{
            return false;
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
    if ($(labelWrap).children().length === 0) {
        alert('请输入话题标签');
        return false;
    }
    if ($.trim(groupId) === '') {
        if (!options.noCheckGroupId) { //不做圈子校验
            alert('圈子不能为空');
            return false;
        }
    }

    if (sensitiveContent(title)) {
        return false;

    }
    if (sensitiveWord(ue, content)) {
        alert('您编辑的内容中含有敏感词');
        return false;
    }
    if (imgLenCheck(ue)) {
        alert('图片数量超过' + imgLimitNUm + '张');
        return false;
    }

    if (imgUploadCheck(ue)) {
        var str = "";
        if(options.saveDraft){
            str = "保存草稿";
        }else{
            str = "发布话题";
        }
        alert('有图片上传失败，请检查并重新上传后才可' + str);
        return false;
    }
    return true;
};

/**
 * 提交发布话题
 */
var btnPublishTopic = $('[data-action=publishTopic]');
var btnSaveTopic = $('[data-action=save]');

function publishTopic(option, extendData) {
    var _data = option;
    var _extendData = extendData || {};
    var _url = _extendData.url || url.get('groupPublishTopic');
    var _errMessage = _extendData.errMessage || '发送失败，点击确定重新发布';
    var _okMessage = _extendData.okMessage;

    if (extendData) {
        btnDisabled(btnSaveTopic, '保存中');
    } else {
        btnDisabled(btnPublishTopic);
    }

    /*btnActivate(btnPublishTopic);
    return false;*/


    fetch.post(_url, {
        data: _data
    }).done(function(data) {

        if (data.success === true) {
            setTimeout(function() {
                if (!extendData) {
                    window.noAlertMessage = 1;
                    window.location.href = $_CONFIG.group_domain + "topic/detail?tid=" + data.data.id + '&no_next=1';
                } else {
                    /*if (_draftsId) {
                        $GLOBAL_CONFIG['draftsId'] = data.draftsId;
                    }*/
                    var insertedId = data.data.insertedId
                    if (insertedId) {
                        $GLOBAL_CONFIG['tid'] = insertedId;
                    }
                    btnActivate(btnSaveTopic, '保存');
                    toast(_okMessage, {
                        duration: 3000
                    });
                }
            }, 100)
        } else {
            unsuccessful.init(data);
            btnActivate(btnPublishTopic);
        }
    }).fail(function() {
        if (!extendData) {
            btnActivate(btnPublishTopic);
        } else {
            btnActivate(btnSaveTopic, '保存');
        }

        alert(_errMessage, {
            ok: function() {
                publishTopic(_data, extendData);
            }
        });
    });
};

function btnDisabled(node, msg) {
    var _msg = msg || '发布中';
    finished = false;
    if (node.attr('data-action') != 'save') {
        node.html(_msg).css('background-color', '#d0d0d0');
    }

};

function btnActivate(node, msg) {
    var _msg = msg || '发布';
    finished = true;
    if (node.attr('data-action') != 'save') {
        node.html(_msg).css('background-color', '#f95353');
    }

};

function publicEvent(e) {
    e.preventDefault();
    if (!finished) {
        return false;
    }
    if (formCheck()) {
        var formData = makeFormData();
        var type = $('[data-action=selectGroup]').attr('data-grouptype');
        if (type == 2) {
            confirm('加入圈子后才能发布话题，确定要加入吗？', {
                okCls: 'pc-btn',
                ok: function() {
                    fetch.post(url.get('joinCircle1'), {
                        // validate: true,
                        data: {
                            groupid: $('[data-action=selectGroup]').attr('data-groupid'),
                            imid: 'b_' + $_CONFIG['userId']
                        }
                    }).done(function(data /*, textStatus, jqXHR*/ ) {
                        if (data && data.code === 200 && data.success) {
                            if (data.data.status === 0) {
                                confirm('是否确认发布？', {
                                    okCls: '',
                                    ok: function() {
                                        if (finished) {
                                            publishTopic(formData);
                                        } else {
                                            // LEEROY JEEEEEEENKIIIIIIIIIIIIIIINS！
                                        }
                                    }
                                });
                            }
                        } else {
                            alert(data.message)
                        }
                    })
                }
            });
        } else {
            confirm('是否确认发布？', {
                okCls: '',
                ok: function() {
                    if (finished) {
                        publishTopic(formData);
                    } else {
                        // LEEROY JEEEEEEENKIIIIIIIIIIIIIIINS！
                    }
                }
            });
        }
    }
}

//保存到草稿
function saveEvent(e) {
    e.preventDefault();
    if (!finished) {
        return false;
    }
    var option = {
        noCheckGroupId: true,
        saveDraft:true
    }
    if (formCheck(option)) {
        var formData = makeFormData();
        var groupId = $('[data-action=selectGroup]').attr('data-groupid');
        if (groupId) {

            $.extend(formData, {
                "group": {
                    id: groupId,
                    name: $('[data-action=selectGroup]').text()
                }
            })
        }

        var extendData = {
            url: url.get('groupSaveTopic'),
            errMessage: '保存失败，点击确定重新保存',
            okMessage: '保存草稿成功',
            draftsId: $GLOBAL_CONFIG['draftsId']
        }

        publishTopic(formData, extendData);

    }
}

function bindEvent() {
    btnPublishTopic.on('click', publicEvent);
    btnSaveTopic.on('click', saveEvent);
}

module.exports = {
    init: bindEvent,
    formCheck: formCheck,
    makeFormData: makeFormData
}
