/**
 * 插入图片
 * @author Fu Xiaochun
 */
 var alert = require('module/popup/alert');
 var upload = require('module/popup/upload/uploader');
//var upload = require('./uploads');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var pictureTpl = require('./pictures.tpl');
var detectQr = require('module/popup/uploadfileQR');
var config = require('editor/config');
var imgReplace = require('utils/imgReplace');
require('../transformImg');

var imgMaxLen = $EDITOR.GlobalVal.imgLimitNUm;
var maxLen = imgMaxLen;
var imgTimes = 0;
var $content = null;

//var $picPopBox = $('[data-node=picPopBox]');
var $upLocal = $('[data-node=upLocal]');
var $cover = $('[data-node=cover]');
var regist = require('./regist');

var getPicPopBox = function(){
    return $('[data-node=picPopBox]')
}

UE.registerUI('insertpicture', function(editor, uiName) {
    editor.newPop = "";
    




        //注册按钮执行时的command命令，使用命令默认就会带有回退操作
        editor.registerCommand(uiName, {
            execCommand: function() {

                var $picPopBox = getPicPopBox();
                var obj = {
                    time: 2000,
                    $showBox: $('[data-node=picPopBox]'),
                    customCb: "",
                    $insertDom: "",
                    type:$EDITOR.GlobalVal.channel || '',
                    maxLen:maxLen,
                    editor: editor
                }

                $content = $(editor.getContent());

                var insertedImgLen = $content.find('img').not('[data-node="goodsPic"],[data-node="emoji"],[data-node="video"]').length;
                maxLen = imgMaxLen - insertedImgLen;
                if (maxLen <= 0) {
                    alert('您最多能添加' + imgMaxLen + '张图片哦！');
                    return;
                }

                 if(!$EDITOR.GlobalVal.getUploadQrCode){
                    $.extend(obj, {
                        $parent: editor,
                        $target: $(btn.target)
                    })
                    editor.newPop = new detectQr(obj)
                    $picPopBox.addClass("noQr");
                    editor.newPop.show();
                    $('div[tabindex]').remove();
                    upload(maxLen, imgMaxLen);
                    return;

                    /*$('div[tabindex]').remove();
                    if ($picPopBox.css('display') == 'block') {
                        setTimeout(function() {
                            upload(maxLen, imgMaxLen);
                        }, 200)

                    } else {}*/
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
        editor.addListener('ready',function(){
        //if(!UE.registInsertPicture){
           regist(editor);
           
           //getPicPopBox().show();
        //     UE.registInsertPicture = 1;
        //}

    })
    //regist();
    // 激活光标
    editor.addListener('afterinserthtml', function() {
        editor.focus();
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


    //因为你是添加button,所以需要返回这个button
    return btn;
}, 0);
