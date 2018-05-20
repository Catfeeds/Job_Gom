var previewTitle = require('./previewTitle.tpl');
var previewCont = require('./previewCont.tpl');
var previewLabel = require('./previewLabel.tpl');
var formCheck = require('../public').formCheck;
var makeFormData = require('../public').makeFormData;
var emoji = require('module/popup/face/emoji');
var imgReplace = require('utils/imgReplace');
var html = require('utils/unHtml').html;

var $previewCoverImgContainer = $('[data-node="preview-img-cover"]');
var $coverImg = $('[data-node="upload-success-img"]');
var publishPreview = function(data) {
    var _data = data;
    if (typeof _data === 'string') {
        return false;
    }
    //组装赋值参数
    var userUrl = $_CONFIG.group_domain + 'ta/' + $_CONFIG.userId + '.html';
    //当前时间
    var time = new Date();
    var nowMonth = (time.getMonth() + 1) > 9 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1);
    var nowDate = (time.getDate()) > 9 ? (time.getDate()) : '0' + (time.getDate());
    var nowTime = new Date().getFullYear() + "." + nowMonth + "." + nowDate;
    //来自圈子
    var groupName = $('[data-action=selectGroup]').html();
    //预览标题等
    var titleMsg = {
            nickName: $_CONFIG.nickName,
            facePicUrl: $_CONFIG.headface, //头像
            UserUrl: userUrl, //链接
            topicName: _data.name, //标题
            groupUrl: $_CONFIG.group_domain + 'circle/' + (_data.groupId) + '.html',
            groupName: groupName,
            richText: _data.richText,
            nowTime: nowTime
        }
        //符文的带标签的内容
    var contMsg = {
        richText: _data.components
    }
    var str = '';
    var reg = /(\[([\s\S]+?)\])/g;
    contMsg.richText.forEach(function(item, index) {
        var richText = item.richText;

        if (richText) {
            if (richText == '<p></p>') {
                richText = '<p><br></p>';
            }
            if (reg.test(richText)) {
                richText = richText.replace(reg, function() {
                    var imgStr;
                    var originText = arguments[0];
                    var text = arguments[2];
                    emoji.forEach(function(item, index) {
                        if (item.name == text) {
                            imgStr = '<img class="imoji" width="32px" height="32px" src=' + imgReplace.imgReplace(item.url) + '>';
                        }
                    })
                    return imgStr ? imgStr : originText;
                })
            }
            str += richText;
        }
    });

    var richObj = {
        richText: str
    }
    if (_data.labels && _data.labels.length) {
        _data.labels.forEach(function(item, index) {
            if (!item) return;
            _data.labels[index].name = html(item.name);
        })
    }
    var labelMsg = {
        labels: (_data.labels), //标签
    }


    if( $coverImg.attr('src') ) {
        $previewCoverImgContainer.find("img").attr('src',$coverImg.attr('src'));
        $previewCoverImgContainer.show();
    }else{
        $previewCoverImgContainer.hide();
    }


    $(".preview-title0").html(previewTitle(titleMsg));

    $(".preview-content").html(previewCont(richObj));

    $(".preview-label").html(previewLabel(labelMsg));

};

function preview() {
    if (!formCheck()) {
        return;
    }

    var _preview = $('.more-preview')
    $(window).scrollTop(0);
    $('.edit-wrap,.whtie-bg').hide();
    publishPreview(makeFormData(true));
    location.hash = "#publishPreview";
    _preview.show();
}
//发布预览
var $publishPreview = $('[data-action = publishPreview]');
var $publishEdit = $('.preview-publish .btn-edit');
var upClick = true;

function bindEvent() {
    if (location.hash) {
        location.hash = "";
    }
    $publishPreview.on('click', function() {
        upClick = false;
        preview();
    });
    $publishEdit.on('click', function() {
        upClick = false;
        history.back();
        $('.more-preview').hide();
        $('.edit-wrap,.whtie-bg').show();
    });
    //浏览器自带前进、后退按钮
    window.onhashchange = function() {
        var hash = window.location.hash;
        if (hash === '' && upClick) {
            $('.more-preview').hide();
            $('.edit-wrap,.whtie-bg').show();
        } else if (hash == "#publishPreview" && upClick) {
            preview();
        }
        upClick = true;
    };
}

module.exports = {
    init: bindEvent
};
