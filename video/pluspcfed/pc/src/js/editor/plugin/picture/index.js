/**
 * 插入图片
 * @author Fu Xiaochun
 */
var alert = require('module/popup/alert');
var upload = require('module/popup/upload/uploader');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var pictureTpl = require('./pictures.tpl');
var detectQr = require('module/popup/uploadfileQR');
var config = require('editor/config');
var imgReplace = require('utils/imgReplace');
require('../transformImg');

var imgMaxLen = config.imgLimitNUm;
var maxLen = imgMaxLen;
var imgTimes = 0;
var $content = null;

var $picPopBox = $('[data-node=picPopBox]');
var $upLocal = $('[data-node=upLocal]');
var $cover = $('[data-node=cover]');
UE.registerUI('insertpicture', function(editor, uiName) {
    editor.newPop = "";
    var obj = {
            time: 2000,
            $showBox: $('[data-node=picPopBox]'),
            customCb: "",
            $insertDom: "",
            type:$GLOBAL_CONFIG['channel'] || '',
            maxLen:maxLen,
            editor: editor
        }
        //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {

            $content = $(editor.getContent());

            var insertedImgLen = $content.find('img').not('[data-node="goodsPic"],[data-node="emoji"],[data-node="video"]').length;
            maxLen = imgMaxLen - insertedImgLen;
            if (maxLen <= 0) {
                alert('您最多能添加' + imgMaxLen + '张图片哦！');
                return;
            }

            if (!window.topicQrId) {

                window.topicQrId = [];
            }

            if (!window.topicQrId['single']) {

                editor.focus();

                window.topicQrId['single'] = {};
                $.extend(obj, {
                    $parent: editor,
                    $target: $(btn.target)
                })
                editor.newPop = new detectQr(obj)

                editor.newPop.init();

            } else {
                var newPop = editor.newPop;
                if (!newPop.useNewCode) {
                    newPop.getCode();
                } else {
                    if (!newPop.checkShow()) {

                        newPop.show();
                        newPop.sendNum();
                    } else {
                        newPop.hide();
                    }
                }
            }

            $('div[tabindex]').remove();
            if ($picPopBox.css('display') == 'block') {
                setTimeout(function() {
                    upload(maxLen, imgMaxLen);
                }, 200)

            } else {}

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
        var images = data.images;
        var len = images.length;
        for (var i = 0; i < len; i++) {
            var temp = imgReplace.imgReplace(images[i]);
            var proto = imgReplace.imgProto(images[i]);
            pictureHTML += pictureTpl({
                times: data.times,
                src: temp,
                _src: temp,
                imgProto: proto
            })
        }
        //pictureHTML = pictureTpl(data)

        /*.replace(/p> <img/gi,'p><img')
        .replace(/(<img .*?)(> <)(\/p>)/,function(i,j,k,l){
        	return j + "><" + l;
        });*/
        editor.focus();

        editor.execCommand('inserthtml', pictureHTML);

        setTimeout(function() {
            var $editor = $(editor.body);

            $lastNode = $editor.find('[data-t=t-' + imgTimes + ']').last();
            var lastOffsetTop = $lastNode.offset().top;
            var lastPosition = lastOffsetTop + $lastNode.height();
            if (lastPosition > $(window).height()) {
                $('html,body').scrollTop(lastPosition);
            }

            imgReplace.changeSrc($editor);
        }, 300);

    });

    //创建一个button
    var btn = new UE.ui.Button({
        name: 'insertpicture',
        title: '插入图片',
        label: '',
        iconEle: '<em class="insert-pic icon">&#xe931;</em>',
        cssRules: '',
        onclick: function(e) {
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
}, 0);
