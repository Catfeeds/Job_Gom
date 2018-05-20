require('./ueditor/ueditor.config');
require('./ueditor/ueditor.all');
require('./ueditor/lang/zh-cn/zh-cn.js');

require('./plugin');
require('./rewrite');

require('utils/indexOf');

var faceModule = require('module/popup/face/index');
var opts = require('./config');

//商品选中增加遮罩
var goodsMask = require("./plugin/goodsMask");
//新增的文本过滤规则
var filterTxtRules = require("./rewrite/filterTxtRules");

var init = function(id) {
    id = id || 'editor';
    var editor = UE.getEditor(id, opts);

    // 实例化表情，传入插入表情的回调方法。
    var face = faceModule.init({
        onSelected: function(data) {
            editor.execCommand('inserthtml', data.reg);
        }
    });
    editor.face = face;

    // 移除了baseStyle模块,所以,不存在 ctrl+b,ctrl+i,ctrl+u这几个快捷键了
    // 在mac下,ctrl+b(光标左移),ctrl+f(光标前移)
    editor.addListener('ready', function() {
        var defaultContent = editor.getContent();
        var $editorBody = $(editor.body);
        var placeholderCls = 'placeholder';
        var $container = $(editor.container);
        $editorBody.addClass(placeholderCls);
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

        filterTxtRules(editor);
        //点击商品显示遮罩
        goodsMask(editor);

        var $emojiBtn = $(editor.container.firstChild).find('.edui-for-insertemoji');

        // 让表情包随着editorBar的fixed一起fixed
        $(window).on('scroll', function() {
            var flagY = $emojiBtn.offset().top;
            var scrollTop = $(window).scrollTop();
            var top;
            if (!face.isShow) {
                return;
            }
            if (scrollTop > flagY) {
                top = 0;
            } else {
                top = flagY;
            }
            top = top / 1 + 30;

            face.$dom.css({
                top: top + 'px'
            });
        });

        // 阻止表情按钮事件冒泡
        $emojiBtn.on('click', function(e) {
            e.stopPropagation();
        });
        $(editor.body).on('click', function() {
            face.hide();
        });
    });

    return editor;
};

module.exports = init;