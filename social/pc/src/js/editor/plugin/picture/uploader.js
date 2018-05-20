var uploadPop = require('module/popup/upload/dialog'),
    Pubsub = require('io/pubsub'),
    pubName = require('io/channel');
var upload = require('module/upload');
var alert = require('module/popup/alert');

var init = function(maxLen) {
    var dialogUploader,
        $webUpLoader,
        maxlength = maxLen;
    if (maxlength > 0) {

        dialogUploader = uploadPop.create({
            maxlength: maxlength
        }, {
            okCls: 'pc-btn pc-btnh35 circle-pop-btn btn-default',
            ok: function() {
                if ($(this.node).find('[i-id=ok]').hasClass('btn-default')) {
                    return false;
                }
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
                maxlength: maxlength,
                callbacks: {
                    onUploadSuccess: function(file, response) {
                        if (response.code === 200 && response.success) {
                            $('#' + file.id).html('<img src="' + response.data[0] + '" alt=""><a href="javascript:;"><em class="icon icon-dele-pic" data-action="delImage"></em></a>');
                            // 激活提交按钮
                            $('[i-id=ok]').removeClass('btn-default');
                        } else {
                            $('#' + file.id).html('<a href="javascript:;" class="re-upload" data-action="retry">重新上传</a><a href="javascript:;"><em class="icon icon-dele-pic" data-action="delImage"></em></a>');
                        }
                    }
                }
            });
        };
        dialogUploader.show();
    } else {
        alert('您最多能添加9张图片哦！');
    }
};

module.exports = init;