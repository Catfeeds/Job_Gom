var WebUploader = require('../plugin/webuploader/webuploader');

var hint = require('module/hint');
var notice = require('module/i18n');

var init = function(maxlength,options) {

    var len = $('[data-defaultAddFile=picker]').length;
    var number = maxlength;
    var numList = {};
    var $webUpLoader;
    var files = {};
    var defaultOptions = {
        //选择器
        selector: {
            parents: '[data-node="uploadList"]', //每个图片上传外层jq选择器
            delSelector: '[data-action="delImage"]' //删除按钮jq选择器
        },
        //初始化参数
        defaultApi: {
            pick: {
                id: '[data-defaultAddFile=picker]',
                innerHTML: '<a href="javascript:;"><em class="icon icon-add"></em></a>'
            },
            accept: {
                title: 'Images',
                extensions: 'jpg,jpeg,png',
                mimeTypes: 'image/*'
            },
            method: 'post',
            // swf文件路径
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
        },
        callbacks: {
            /***
             * name: 图片加入队列之前
             * file: 图片信息对象
             * numList: 以 file.source.ruid 为key的计数json对象
             * number: 最多可上传数
            */
            onBeforeFileQueued: function( file, numList, number ){
                if (numList[file.source.ruid] >= number) {
                    hint.init( notice.upload.excess );
                    return false;
                }
            },

            /***
             * name: 图片添加入队列后
             * file: 图片信息对象
             * numList: 以 file.source.ruid 为key的计数json对象
             * maxlength: 最多可上传数
            */
            onFileQueued: function( file, numList, number ){

                var html = '<li id="' + file.id + '">' + '<div class="bar-upload-pic"><span data-node="progress"></span></div>' + '</li>';
                $('#rt_' + file.source.ruid).parents('[data-defaultaddfile="picker"]').before(html);
                
                $('#rt_' + file.source.ruid).parents('[data-node="uploadBox"]').find('[data-node="addNum"]').text(maxlength - numList[file.source.ruid]);
                if (numList[file.source.ruid] === maxlength) {
                    $('#rt_' + file.source.ruid).parents('[data-defaultAddFile="picker"]').hide();
                }

            },

            /***
             * name: 上传成功（此成功指ajax有返回结果，故需要判断返回的状态码）
             * file: 图片信息对象
             * response: 上传图片ajax返回数据
            */
            onUploadSuccess: function( file, response ){
                if (response.code === 200 && response.success) {
                    $('#' + file.id).html('<img src="' + response.data[0] + '" alt=""><a href="javascript:;"><em class="icon icon-dele-pic" data-action="delImage"></em></a>');
                } else {
                    $('#' + file.id).html('<a href="javascript:;" class="re-upload" data-action="retry">重新上传</a><a href="javascript:;"><em class="icon icon-dele-pic" data-action="delImage"></em></a>');
                }
            },

            /***
             * name: 上传失败
             * file: 图片信息对象
             * reason: 出错的code
            */
            onUploadError: function( file, reason ){
                $('#' + file.id).html('<a href="javascript:;" class="re-upload" data-action="retry">重新上传</a><a href="javascript:;"><em class="icon icon-dele-pic" data-action="delImage"></em></a>');
            },

            /***
             * name: 上传时，包含进度条
             * file: 图片信息对象
             * percentage: 上传进度
            */
            onUploadProgress:function( file, percentage ){
                $('#' + file.id).find('[data-node="progress"]').css('width', percentage * 100 + '%');
            },

            /***
             * name: 报错
             * type: 报错类型
            */
            onErrored:function( type ){
                hint.init( notice.upload.uploadError );
            },

            //重新上传 
            retry: function(){
                var _this = this;
                $('[data-node="uploadList"]').on('click', '[data-action="retry"]', function() {
                    _this.retry(files[$(this).parents('li').attr('id')]);
                });
            },

            /***
             * name: 删除图片
             * webuploader: webuploader实例化对象
             * numList: 自定义json对象，用来存储每个实例化对象已上传的图片个数
             * id: 每个webuploader实例化时，上传按钮所生成的唯一id
            */
            delImage: function( webuploader, numList, id ){
                $webUpLoader.removeFile(files[$(this).parents('li').attr('id')]);
                $(this).parents('[data-node="uploadBox"]').find('[data-node="addNum"]').text(maxlength - numList[id]);
                $(this).parents('ul').find('[data-defaultAddFile="picker"]').show();
                $(this).parents('li').eq(0).remove();
            }
        }
        
    };

    var options = $.extend({}, defaultOptions, options );

    $webUpLoader = WebUploader.create( options.defaultApi );

    $webUpLoader.onFileQueued = function(file) {

        numList[file.source.ruid] = numList[file.source.ruid] !== undefined ? numList[file.source.ruid] : 0;
        numList[file.source.ruid]++;
        files[file.id] = file;
        options.callbacks.onFileQueued.call( $webUpLoader, file, numList, maxlength );

    }

    //上传成功  
    $webUpLoader.on('uploadSuccess', function(file, response) {

        options.callbacks.onUploadSuccess.call( $webUpLoader, file, response );
        
    });

    //加入队列前
    $webUpLoader.on('beforeFileQueued', function(file) {
        options.callbacks.onBeforeFileQueued.call( $webUpLoader, file, numList, number );
    });
    //上传失败  
    $webUpLoader.on('uploadError', function(file, reason) {

        options.callbacks.onUploadError.call( $webUpLoader, file, reason);
        
    });

    //上传时
    $webUpLoader.on('uploadProgress', function(file, percentage) {

        options.callbacks.onUploadProgress.call( $webUpLoader, file, percentage);

    });

    //报错
    $webUpLoader.on('error', function(type) {
        options.callbacks.onErrored.call( $webUpLoader, type );
    });
    options.callbacks.retry.call( $webUpLoader );


    //删除图片
    $( options.selector.parents ).on('click', options.selector.delSelector, function() {

        var id = $(this).parents( options.selector.parents ).find( options.defaultApi.pick.id ).children().eq(1).attr('id').substr(3);
        numList[id]--;

        options.callbacks.delImage.call( this, $webUpLoader, numList, id );


    });

    return $webUpLoader;
}


module.exports = {
    init: init
}