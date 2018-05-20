/***
 * upload.js
 * @author zhaodonghong
 * @params                      object      上传图片参数
 *     maxlength               number      可上传图片最大张数
 *     selector                object      jq选择器
 *         parents             string      每个图片上传外层jq选择器
 *         delSelector         string      删除按钮jq选择器
 *         selector            string      实例化上传插件的pick.id的值
 *     defaultApi              object      实例化webuploader参数
 *     callbacks               object      实例化webuploader方法回调集合
 *         onBeforeFileQueued  function    上传图片添加到上传队列之前
 *         onFileQueued        function    上传图片添加到上传队列后
 *         onUploadSuccess     function    上传成功
 *         onUploadError       function    上传失败
 *         onUploadProgress    function    上传中
 *         onErrored           function    报错
 *         retry               function    重新上传
 *         delImage            function    删除上传图片
 */

var WebUploader = require('../plugin/webuploader/webuploader');
var hint = require('module/hint');
var notice = require('module/i18n');
var imgReplace = require('utils/imgReplace');

var url = require('io/url');




var init = function(options) {
    var uploadPath = $EDITOR.Urls.cropImg || url.get('cropImg');
    //var number = maxlength;
    var numList = {};
    var $webUpLoader;
    var files = {};
    var defaultOptions = {
        //最大上传张数
        maxlength: options.maxlength || 9,
        //选择器
        selector: {
            parents: '[data-node="uploadBox"]', //每个图片上传外层jq选择器
            delSelector: '[data-action="delImage"]', //删除按钮jq选择器
            selector: '[data-defaultAddFile=picker]' //初始化时options.defaultApi.pick 的值，也就是 选择器的值
        }
    };
    //初始化参数
    defaultOptions.defaultApi = {
        pick: {
            id: '[data-defaultAddFile=picker]',
            innerHTML: '本地上传图片'
        },
        accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,png,gif',
            mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
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
        server: uploadPath,
        fileNumLimit: defaultOptions.maxlength * $(defaultOptions.selector).length,
        fileSizeLimit: defaultOptions.maxlength * $(defaultOptions.selector).length * 4 * 1024 * 1024, // 50 M
        fileSingleSizeLimit: 4 * 1024 * 1024
    };
    defaultOptions.callbacks = {
        /***
         * name: 图片加入队列之前
         * file: 图片信息对象
         * numList: 以 file.source.ruid 为key的计数json对象
         * number: 最多可上传数
         */
        onBeforeFileQueued: function( /*file, numList, number*/ ) {
            hint.init(notice.upload.excess);
        },

        /***
         * name: 图片添加入队列后
         * file: 图片信息对象
         * numList: 以 file.source.ruid 为key的计数json对象
         * maxlength: 最多可上传数
         */
        onFileQueued: function(file, numList, number) {
            var html = '<li id="' + file.id + '">' + '<div class="bar-upload-pic"><span data-node="progress"></span></div>' + '</li>';
            $('#rt_' + file.source.ruid).parent('[data-defaultaddfile="picker"]').before(html);

            $('#rt_' + file.source.ruid).parents('[data-node="uploadBox"]').find('[data-node="addNum"]').text(number - numList[file.source.ruid]);

            if (numList[file.source.ruid] === ~~number) {
                $('#rt_' + file.source.ruid).parents('[data-defaultaddfile="picker"]').hide();
            }

        },

        /***
         * name: 上传成功（此成功指ajax有返回结果，故需要判断返回的状态码）
         * file: 图片信息对象
         * response: 上传图片ajax返回数据
         */
        onUploadSuccess: function(file, response) {
            if (response.code === 200 && response.success) {
                $('#' + file.id).html('<img src="' + imgReplace.imgReplace(response.data[0]) + '" alt=""><a href="javascript:;"><em class="icon-del-pic" data-action="delImage"></em></a>');
                //$('#' + file.id).html('<img src="' + imgReplace(response.data[0]) + '" _src = "' + response.data[0] + '" alt=""><a href="javascript:;"><em class="icon-del-pic" data-action="delImage"></em></a>');
            } else {
                $('#' + file.id).html('<a href="javascript:;" class="re-upload" data-action="retry">重新上传</a><a href="javascript:;"><em class="icon-del-pic" data-action="delImage"></em></a>');
            }
        },

        /***
         * name: 上传失败
         * file: 图片信息对象
         * reason: 出错的code
         */
        onUploadError: function(file /*, reason*/ ) {
            $('#' + file.id).html('<a href="javascript:;" class="re-upload" data-action="retry">重新上传</a><a href="javascript:;"><em class="icon-del-pic" data-action="delImage"></em></a>');
        },

        /***
         * name: 上传时，包含进度条
         * file: 图片信息对象
         * percentage: 上传进度
         */
        onUploadProgress: function(file, percentage) {
            $('#' + file.id).find('[data-node="progress"]').css('width', percentage * 100 + '%');
        },

        /***
         * name: 报错
         * type: 报错类型
         */
        onErrored: function( /*type*/ ) {
            hint.init(notice.upload.uploadError);
        },

        //重新上传
        retry: function() {
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
        delImage: function(webuploader, numList, id, number) {
            $webUpLoader.removeFile(files[$(this).parents('li').attr('id')]);
            $(this).parents('[data-node="uploadBox"]').find('[data-node="addNum"]').text(number - numList[id]);
            $(this).parents('ul').find('[data-defaultAddFile="picker"]').show();
            $(this).parents('li').eq(0).remove();
            if (numList[id] === 0) {
                $('[i-id=ok]').addClass('btn-default');
            };
        }
    };
    options.callbacks = $.extend({}, defaultOptions.callbacks, options.callbacks);
    /*var */
    options = $.extend({}, defaultOptions, options);
    $webUpLoader = WebUploader.create(options.defaultApi);

    $webUpLoader.onFileQueued = function(file) {
        var ruid = $('[data-node="uploadBox"]').find('[data-defaultaddfile="picker"]').children().eq(1).attr('id');
        file.source.ruid = ruid;
        numList[file.source.ruid] = numList[file.source.ruid] !== undefined ? numList[file.source.ruid] : 0;
        numList[file.source.ruid]++;
        files[file.id] = file;
        options.callbacks.onFileQueued.call($webUpLoader, file, numList, options.maxlength);

    };

    //上传前
    $webUpLoader.on('uploadBeforeSend', function(obj, data, headers) {
         //options.callbacks.onUploadSuccess.call($webUpLoader, obj, data,headers);
         $.extend(true,headers,$EDITOR.GlobalVal.headerSet);
    });

    //上传成功
    $webUpLoader.on('uploadSuccess', function(file, response) {
        options.callbacks.onUploadSuccess.call($webUpLoader, file, response);
    });

    //加入队列前
    $webUpLoader.on('beforeFileQueued', function(file) {
        if (numList[file.source.ruid] >= options.maxlength) {
            options.callbacks.onBeforeFileQueued.call($webUpLoader, file, numList, options.maxlength);
            return false;
        }

    });
    //上传失败
    $webUpLoader.on('uploadError', function(file, reason) {
        options.callbacks.onUploadError.call($webUpLoader, file, reason);
    });

    //上传时
    $webUpLoader.on('uploadProgress', function(file, percentage) {
        options.callbacks.onUploadProgress.call($webUpLoader, file, percentage);
    });

    //报错
    $webUpLoader.on('error', function(type) {
        options.callbacks.onErrored.call($webUpLoader, type);
    });
    options.callbacks.retry.call($webUpLoader);

    //删除图片
    $(options.selector.parents).on('click', options.selector.delSelector, function() {
        var id = $(this).parents(options.selector.parents).find(options.defaultApi.pick.id).children().eq(1).attr('id');
        numList[id]--;
        options.callbacks.delImage.call(this, $webUpLoader, numList, id, options.maxlength);
    });

    return $webUpLoader;
}

module.exports = {
    init: init
}
