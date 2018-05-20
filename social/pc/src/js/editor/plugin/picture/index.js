/**
 * 插入图片
 * @author Fu Xiaochun
 */

var upload = require('./uploader');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var pictureTpl = require('./pictures.tpl');
var imgMaxLen = 9;
var maxLen = imgMaxLen;
var imgTimes = 0;
var $content = null;

UE.registerUI('insertpicture', function(editor, uiName) {

    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {

            // 获取当前已插入的图片个数
            $content = $(editor.getContent());

            var insertedImgLen = $content.find('[data-type=insertImg]').length;
            maxLen = imgMaxLen - insertedImgLen;
            upload(maxLen);
        }
    });

    // 激活光标
    editor.addListener('afterinserthtml', function() {
        editor.focus();
    });

    // 接收图片
    Pubsub(channel.setPubliser.changeImage).sub(function(data) {
        var $lastNode = null;
        var pictureHTML = '';

        data.times = ++imgTimes;
        pictureHTML = pictureTpl(data);
        editor.focus();
        editor.execCommand('inserthtml', pictureHTML);

        setTimeout(function() {
            $lastNode = $(editor.body).find('[data-t=t-' + imgTimes + ']').last();
            var lastOffsetTop = $lastNode.offset().top;
            var lastPosition = lastOffsetTop + $lastNode.height();
            if (lastPosition > $(window).height()) {
                $('html,body').scrollTop(lastPosition);
            }
        }, 300);

    });

    //创建一个button
    var btn = new UE.ui.Button({
        name: 'insertpicture',
        title: '插入图片',
        label: '图片',
        iconEle: '<em class="insert-pic iconn-28"></em>',
        cssRules: '',
        onclick: function() {
            editor.execCommand(uiName);
        }
    });

    //当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
}, 1);