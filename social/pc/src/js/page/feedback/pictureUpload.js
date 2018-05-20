/**
 * 选择图片上传
 * @author QiaoLi
 */
var WebUploader = require('../../plugin/webuploader/webuploader');
var hint = require('module/hint');
var errorTip = require('module/i18n').upload;
//选择类型
var init = function(maxlength) {
    var files = {};
    var $uploadList = $('[data-node=uploadList]');
    var ing = 'ing';
    var fail = 'fail';
    var len = $('[data-add=picker]').length;
    var picUpload = WebUploader.create({
        pick: {
            id: '[data-add=picker]',
            multiple: false,
            innerHTML: '<a href="javascript:;" class="btn"><em class="icon iconn-41"></em></a>'
        },
        accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,png',
            mimeTypes: 'image/*'
        },
        method: 'post',
        swf: $_CONFIG.imgpath + '/images/swf/Uploader.swf',
        auto: true,
        disableGlobalDnd: true,
        duplicate: true,
        prepareNextFile: true,
        chunked: true,
        fileVal: 'avatar_file',
        server: '/ajax/crop/crop_img',
        fileNumLimit: maxlength * len,
        fileSizeLimit: maxlength * len * 4 * 1024 * 1024, // 50 M
        fileSingleSizeLimit: 4 * 1024 * 1024
    });
    //上传中
    picUpload.onFileQueued = function(file) {
        var html = '<div data-node="loadedImg" id="' + file.id + '" class="upload ing"><div class="mask"></div><div class="mask-text"><div class="progress"><div class="val" data-node="progress"></div></div><p>图片上传中</p></div></div>';
        $('[data-add="picker"]').before(html);
        var imgLen = $uploadList.find('[data-node=loadedImg]').length;
        if (imgLen >= maxlength) {
            $('[data-add=picker]').css({
                width: 0,
                height: 0,
                overflow: 'hidden',
                border: 0
            });
        }
    };
    picUpload.on('uploadProgress', function(file, percentage) {
        $('#' + file.id).find('[data-node=progress]').css('width', percentage * 100 + '%');
    });
    //上传成功  
    picUpload.on('uploadSuccess', function(file, response) {
        if (response.code === 200 && response.success) {
            $('#' + file.id).removeClass(ing).html('<img src="' + response.data[0] + '" alt=""><a href="javascript:;" data-action="delImage"><em class="iconn-40"></em></a>');
        } else {
            $('#' + file.id).removeClass(ing).addClass(fail).html('<div class="mask-text"><p>图片上传失败</p><a href="javascript:;" data-action="retry"><em class="iconn-24"></em><span>重新上传</span></a></div>');
        }
    });
    //上传失败  
    picUpload.on('uploadError', function(file) {
        $('#' + file.id).removeClass(ing).addClass(fail).html('<div class="mask-text"><p>图片上传失败</p><a href="javascript:;" data-action="retry"><em class="iconn-24"></em><span>重新上传</span></a></div>');
    });
    //重新上传
    $uploadList.on('click', '[data-action=retry]', function() {
        picUpload.retry(files[$(this).parent().attr('id')]);
    });
    //删除图片
    $uploadList.on('click', '[data-action=delImage]', function() {
        picUpload.removeFile($(this).parent().attr('id'));
        var imgLen = $uploadList.find('[data-node=loadedImg]').length;
        imgLen--;
        if (imgLen < maxlength) {
            $('[data-add=picker]').css({
                width: 150,
                height: 150,
                overflow: 'hidden',
                border: '1px solid #f5f4f3'
            });
        }
        $(this).parents('.upload').eq(0).remove();
    });
    //报错
    picUpload.on('error', function(type) {
        hint.init(errorTip[type]);
    });
    return picUpload;
};

module.exports = {
    init: function() {
        init(3);
    }
};