var uploadPop = require('module/popup/upload/dialog'),
    Pubsub = require('io/pubsub'),
    pubName = require('io/channel');
var upload = require('module/upload');

var init = function(maxLen) {
    var $webUpLoader,
        maxlength = maxLen,
        dialogUploader;
    if (maxlength > 0) {

        dialogUploader = uploadPop.create({
            maxlength: maxlength
        }, {
            ok: function() {
                $('[data-node="uploadList"]').off();
                $webUpLoader.destroy();
                var $imgList = $('[data-node="uploadList"] img'),
                    images = [];
                for (var i = 0, len = $imgList.length; i < len; i++) {
                    images.push($imgList.eq(i).attr('src'));
                }
                //maxLen -= images.length;
                Pubsub(pubName.setPubliser.changeImage).pub({
                    images: images
                });
            },
            cancel: function() {
                $('[data-node="uploadList"]').off();
                $webUpLoader.destroy();
            }
        });
        dialogUploader.onshow = function() {

            $webUpLoader = upload.init({
                maxlength: maxlength
            });
        };
    } else {
        dialogUploader = uploadPop.create({}, {
            title: '选择图片',
            modal: true,
            fixed: true,
            content: '<p class="circle-pop-p">您最多能添加9张图片哦！</p>',
            className: 'pop-box',
            okValue: '确定',
            okCls: 'pc-btn pc-btnh35 circle-pop-btn',
            btnWrapCls: '',
            ok: function() {}
        })
    }
    dialogUploader.show();
};

module.exports = init;