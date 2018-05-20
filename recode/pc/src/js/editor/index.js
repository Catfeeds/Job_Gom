require('./ueditor/ueditor.config');
require('./ueditor/ueditor.all');
require('./ueditor/lang/zh-cn/zh-cn.js');

require('./plugin');
require('./rewrite');
require('./ban');
require('utils/indexOf');
var alert = require('module/popup/alert');
//var detectQr = require('./plugin/detectQr');

var faceModule = require('module/popup/face/index');
var opts = require('./config');

//商品选中增加遮罩
var goodsMask = require("./plugin/goodsMask");
//新增的文本过滤规则
var filterTxtRules = require("./rewrite/filterTxtRules");
//草稿箱
var restoreData = require('./plugin/restore');
var init = function(id) {
    id = id || 'editor';
    var editor = UE.getEditor(id, opts);

    // 实例化表情，传入插入表情的回调方法。
    var face = faceModule.init({
        onSelected: function(data) {
            var str = data.reg;
            //var str = '<img src= "' + data.url + '" data-node="emoji" width="22" height="22"/>'
            editor.execCommand('inserthtml', str);
        }
    });
    editor.face = face;

    editor.addListener('ready', function() {

        var defaultContent = editor.getContent();
        var $editorBody = $(editor.body);
        var placeholderCls = 'placeholder';
        var $container = $(editor.container);
        $editorBody.addClass(placeholderCls);
        $editorBody.delegate('.publish-item a', 'click', function(e) {
            e.stopPropagation();
            e.preventDefault();
        })
        editor.addListener('focus', function() {
            $editorBody.removeClass(placeholderCls);
            $container.addClass('edui-nobg');
        });
        editor.addListener('blur', function() {
            var hasDiv = !!$editorBody.find('div').length;
            var isEqDefault = editor.getContent() == defaultContent;
            var isContentEmpty = $.trim(editor.getContent()) == '';

            if ((isEqDefault && hasDiv) || isContentEmpty) {
                $editorBody.addClass(placeholderCls);
                $container.removeClass('edui-nobg');
            } else {
                $editorBody.removeClass(placeholderCls);
                $container.addClass('edui-nobg');
            }
        });
        //加载草稿箱
        restoreData(editor);
        //文字过滤规则
        filterTxtRules(editor);
        //点击商品显示遮罩
        goodsMask(editor);

        var $emojiBtn = $(editor.container.firstChild).find('.edui-for-insertemoji');
        var $pictorBtn = $(editor.container.firstChild).find('.edui-for-insertpicture');
        var $picPopBox = $('[data-node=picPopBox]');
        // 让表情包随着editorBar的fixed一起fixed
        $(window).on('scroll', function() {
            var flagY = $emojiBtn.offset().top;
            var scrollTop = $(window).scrollTop();
            var top;

            if (scrollTop > flagY) {
                top = 0;
            } else {
                top = flagY;
            }
            top = top / 1 + 30;

            $picPopBox.css({
                'top': top + 'px'
            });

            if (!face.isShow) {
                return;
            }
            face.$dom.css({
                top: top + 'px'
            });

        });

        // 阻止表情按钮事件冒泡
        $emojiBtn.on('click', function(e) {
            $picPopBox.hide();
            e.stopPropagation();            
            e.preventDefault();
        });

        $pictorBtn.on('click', function(e) {
            face.hide();
            e.stopPropagation();
            e.preventDefault();
        });

        $("body").on('click', function() {
            $picPopBox.hide();
            face.hide();
        })

        $(editor.body).on('focus', function() {
            if (editor.sensitiveWord) {
                $.each($(editor.body).find('span[class=bg-warning]'), function(i, v) {
                    $(v).on('mouseup', function() {
                        $(v).removeClass('bg-warning');
                    })
                })
                editor.sensitiveWord = false;
            }
            face.hide();
        });
        $(editor.body).on('click', function() {
            face.hide();
        });

    });

    return editor;
};

module.exports = init;
