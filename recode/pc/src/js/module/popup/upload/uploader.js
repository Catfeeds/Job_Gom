var uploadPop = require('module/popup/upload/dialog'),
    Pubsub = require('io/pubsub'),
    pubName = require('io/channel');
var upload = require('module/upload');
var alert = require('module/popup/alert');
var imgReplace = require('utils/imgReplace');

var init = function(maxLen, total) {
    var dialogUploader,
        $webUpLoader,
        maxlength = maxLen;
    if (maxlength > 0) {

        dialogUploader = uploadPop.create({
            maxlength: maxlength,
            total: total
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
                $('[data-node=picPopBox]').hide();
            },
            cancel: function() {
                $('[data-node="uploadList"]').off();
                $webUpLoader.destroy();
                $('[data-node=picPopBox]').hide();
            }
        });

        $webUpLoader = upload.init({
            maxlength: maxlength,
            callbacks: {
                onFileQueued: function(file, numList, number) {
                    var $uploadBox = $('[data-node="uploadBox"]');
                    var picker = '[data-defaultaddfile="picker"]';
                    $('[data-node=picPopBox]').addClass('webuploader-element-invisible');
                    dialogUploader.show();
                    $uploadBox.find(picker).children().eq(0).html('<em class="icon-add"></em>');
                    var html = '<li id="' + file.id + '">' + '<div class="bar-upload-pic"><span data-node="progress"></span></div>' + '</li>';
                    $uploadBox.find(picker).before(html);
                    $uploadBox.find('[data-node="addNum"]').text(number - numList[file.source.ruid]);
                    if (numList[file.source.ruid] === ~~number) {
                        $uploadBox.find(picker).hide();
                    }
                    $uploadBox.find(picker).children().eq(1).css({
                        'width': '78px',
                        'height': '78px'
                    })
                },

                onUploadSuccess: function(file, response) {
                    if (response.code === 200 && response.success) {
                        $('#' + file.id).html('<img src="' + imgReplace.imgReplace(response.data[0]) + '" alt=""><a href="javascript:;"><em class="icon-del-pic" data-action="delImage"></em></a>');
                        // 激活提交按钮
                        $('[i-id=ok]').removeClass('btn-default');
                    } else {
                        $('#' + file.id).html('<a href="javascript:;" class="re-upload" data-action="retry">重新上传</a><a href="javascript:;"><em class="icon-del-pic" data-action="delImage"></em></a>');
                    }
                }
            }
        });
    } else {
        alert('您最多能添加' + maxLen + '张图片哦！');
    }
    return $webUpLoader;
};

module.exports = init;
