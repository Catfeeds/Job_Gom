var Pubsub = require('io/pubsub');
var alert = require('module/popup/alert');
var webUploader = require('plugin/webuploader/webuploader');

var $tipsPic = $('[data-node=tipsPic]');
var $upload = $('[data-node=upload]');
var $picker = $('[data-defaultaddfile=picker]');

var active = 'active';
var isUpload = $upload.find('img').attr('type');
var failInfo = function(){
	$upload.html('<img src="' + $_CONFIG.imgpath+ '/images/meihao/uploadError.png" alt="">');
	$tipsPic.addClass(active);
	$upload.css('border','0');
	Pubsub('upload').pub(0);
	isUpload = 1;
}

var init = function() {
    var uploader = webUploader.create({
        pick: {
            id: '[data-defaultaddfile=picker]',
            innerHTML: ''
        },
        accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
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
        fileSizeLimit: 2 * 1024 * 1024,
        fileSingleSizeLimit: 2 * 1024 * 1024
    });
    uploader.on('beforeFileQueued', function(file) {
    	$tipsPic.removeClass(active);
    	$upload.css('border','1px solid #dedede');
        if(!isUpload){
        	var html = '<div class="img-again"><a href="javascript:;" type="1">重新上传</a></div>';
    		$("div[id^='rt']").prev().html(html);
    		$upload.show();
        	$picker.css({
	        	'width': '110px',
	            'height': '30px',
	            'margin': '24px 0 0 20px'
	        })
	        $("div[id^='rt']").css({
	        	'width': '108px',
	            'height': '28px'
	        })
        }
    });
    uploader.on('fileQueued', function(file) {
    	if(!isUpload){
        	$("div[id^='rt']").prev().hide();
        }
        var html = '<div class="bar-upload-pic"><span data-node="progress"></span></div>';
        $upload.html(html);
    });
    uploader.on('uploadProgress', function(file, percentage) {
        $upload.find('[data-node="progress"]').css('width', percentage * 100 + '%');
    });
    uploader.on('uploadSuccess', function(file, response) {
        if (response.code === 200 && response.success) {
            $upload.html('<img src="' + response.data[0] + '" alt="" type="1">');
            if(!isUpload){
            	$("div[id^='rt']").prev().show();
            }
            Pubsub('upload').pub(1);
            isUpload = 1;
        } else {
            failInfo();
        }
    });
    uploader.on('uploadError', function(file, reason) {
    	failInfo();
    });
    uploader.on('error', function(type) {
        failInfo();
    });
    if(isUpload){
    	$upload.show();
    	$picker.css({
        	'width': '110px',
            'height': '30px',
            'margin': '24px 0 0 20px'
        })

    }
}
module.exports = {
    init: init
}
