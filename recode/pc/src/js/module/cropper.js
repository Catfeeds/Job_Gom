var WebUploader = require('../plugin/webuploader/webuploader');
require('../plugin/jquery.cropper');

var $webUpLoader;
var $noticeBox = $('[data-node="noticeBox"]');
// var $noticeInfo = $noticeBox.find('[data-node="noticeInfo"]');
var $wrap = $('[data-node="cropWrap"]');
var $cropImg = $wrap.find('img');
var $preview = $('[data-node="avatrSelector"]');
var $avatarSave = $('[data-action="avatarSave"]')
var $progress = $noticeBox.find('[data-node="uploadProgress"]');
var $error = $('[data-node="error"]');
var $loadNotice = $noticeBox.find('[data-node="loadNotice"]');
var $retry = $noticeBox.find('[data-action="retry"]');

var avatarData = {};
var files;
var defaultImage = $cropImg.attr('data-default');
var isUpload = false;
var link = '';
var isIE8 = !window.FormData;
var key = false;

var startCrop = function() {
    isUpload = true;
    $cropImg.cropper({
        aspectRatio: 1,
        preview: $preview.selector,
        background: false,
        guides: false
    });
};

var preview = function(upload, cropper, callback) {
    $webUpLoader = WebUploader.create(upload);
    $webUpLoader.on('beforeFileQueued', function() {
        isUpload = false;
        $cropImg.cropper('destroy');
        $error.hide();
        files !== undefined && $webUpLoader.removeFile(files.id);
    });

    $webUpLoader.on('fileQueued', function(file) {
            files = file;
            if (isIE8 && !key) {
                $webUpLoader.upload(files);
                key = true;
            } else {
                $webUpLoader.makeThumb(file, function(error, ret) {
                    if (error) {
                        $webUpLoader.removeFile(files.id);
                        $noticeBox.removeClass('load-ing').show();
                    } else {
                        $cropImg.attr('src', ret);
                        startCrop(cropper);
                        $avatarSave.addClass('active');
                        if( $cropImg.attr('data-edit') ){
                            $('[data-defaultAddFile=picker]').hide();
                            $webUpLoader.addButton({
                                id: '[data-action="upload-edit"]',
                                innerHTML: '修改'
                            });
                        }

                    }
                });
            }
            $webUpLoader.md5File(file)
                // 及时显示进度
                .progress(function(percentage) {
                    $loadNotice.text('图片加载中');
                    $noticeBox.addClass('load-ing').show();
                    $progress.css('width', percentage * 100 + '%');
                })
                // 完成
                .then(function( /*val*/ ) {
                    $noticeBox.hide();
                    $progress.css('width', 0);
                });
        })
        //报错
    $webUpLoader.on('error', function( /*type*/ ) {
        /*var errNotice = {
            Q_EXCEED_NUM_LIMIT: '文件个数超出限制',
            Q_EXCEED_SIZE_LIMIT: '总文件大小超出限制',
            Q_TYPE_DENIED: '文件类型错误',
            F_EXCEED_SIZE: '请上传jpg、png格式且小于4M的图片！'
        }*/
        $cropImg.attr('src', defaultImage);
        $preview.find('img').attr('src', defaultImage);
        $error.show().find('span').text('请上传小于4M的图片，支持格式jpg、jpeg、png、gif！');
        $avatarSave.removeClass('active');
    });

    //上传成功
    $webUpLoader.on('uploadSuccess', function(file, response) {

        if (response.success && response.code === 200) {
            if (key) {
                $cropImg.attr('src', response.data[0]);
                startCrop();
                $noticeBox.hide();
                key = false;
                $avatarSave.addClass('active');
            } else {
                $cropImg.attr('src', response.data[0]);
                $noticeBox.hide();
                $cropImg.cropper('destroy');
                $preview.find('img').attr('src', response.data[0]);
                $webUpLoader.removeFile(files);
                link = response.data[0];
                callback.call(null, response.data[0]);
                $avatarSave.removeClass('active');
                files = undefined;
            }
        } else {
            $('.cropper-crop-box').hide();
            $noticeBox.removeClass('load-ing').show();
            isUpload = true;
        }
    });
    //上传失败
    $webUpLoader.on('uploadError', function( /*file, reason*/ ) {
        $('.cropper-crop-box').hide();
        $noticeBox.removeClass('load-ing').show();
        isUpload = true;
    });

    //上传时
    $webUpLoader.on('uploadProgress', function(file, percentage) {
        $('.cropper-crop-box').hide();
        $loadNotice.text('图片上传中');
        $noticeBox.addClass('load-ing').show();
        $progress.css('width', percentage * 100 + '%');
        isUpload = false;
    });

}

var submit = function() {
    $avatarSave.on('click', function() {
        if (isUpload && $(this).hasClass('active')) {
            isUpload = false;
            avatarData = $cropImg.cropper('getData');
            avatarData.type = 'crop';
            $webUpLoader.on('uploadBeforeSend', function(object, data) {
                $.extend(data, avatarData);
            });
            $webUpLoader.upload(files);
        }
        $retry.addClass('active');
    });
    $retry.on('click', function() {
        if (isUpload && $(this).hasClass('active')) {
            isUpload = false;
            avatarData = $cropImg.cropper('getData');
            avatarData.type = 'crop';
            $webUpLoader.on('uploadBeforeSend', function(object, data) {
                $.extend(data, avatarData);
            });
            $webUpLoader.retry(files);
        }
    });
}

var init = function(callback, uploadOptions, cropperOptions) {
    $noticeBox = $('[data-node="noticeBox"]');
    // $noticeInfo = $noticeBox.find('[data-node="noticeInfo"]');
    $wrap = $('[data-node="cropWrap"]');
    $cropImg = $wrap.find('img');
    $preview = $('[data-node="avatrSelector"]');
    $avatarSave = $('[data-action="avatarSave"]')
    $progress = $noticeBox.find('[data-node="uploadProgress"]');
    $error = $('[data-node="error"]');
    $loadNotice = $noticeBox.find('[data-node="loadNotice"]');
    $retry = $noticeBox.find('[data-action="retry"]');
    defaultImage = $cropImg.attr('data-default');
    var fn = callback || function() {};
    var defaultUpload = {
        pick: {
            id: '[data-defaultAddFile=picker]',
            innerHTML: '<span>+</span>上传头像',
            multiple: false
        },
        thumb: false,
        compress: false,
        accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
        },
        method: 'post',
        // swf文件路径
        swf: $_CONFIG.imgpath + '/images/swf/Uploader.swf',
        disableGlobalDnd: true,
        duplicate: true,
        prepareNextFile: true,
        chunked: true,
        fileVal: 'avatar_file',
        server: '/ajax/crop/crop_img',
        fileNumLimit: 1,
        fileSizeLimit: 4 * 1024 * 1024,
        fileSingleSizeLimit: 4 * 1024 * 1024
    };
    var defaultCropper = {
        aspectRatio: 1,
        preview: $preview.selector,
        background: false,
        guides: false
    };
    var upload = $.extend(true, defaultUpload, uploadOptions);
    var copper = $.extend(true, defaultCropper, cropperOptions);
    preview(upload, copper, fn);

    submit();

    return {
        webUpLoader: $webUpLoader, //webuploader实例对象

        cropper: $cropImg //cropper实例对象
    }
}

var destroy = function(callback) {
    callback = callback || function() {};
    callback.call(null, {
        webUpLoader: $webUpLoader, //webuploader实例对象
        cropper: $cropImg //cropper实例对象
    });
    files = undefined;
    $webUpLoader.destroy();
    $cropImg.cropper('destroy');
}

var getData = function() {
    return link;
}

module.exports = {
    init: init,
    getData: getData,
    destroy: destroy
}
