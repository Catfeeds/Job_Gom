var webUploader = require('plugin/webuploader/webuploader');
var errorMsg = require("module/i18n").upload;
var $rt;
var init = function() {
	var uploaderNodeAttr = $('[data-node=uploader]');
	var uploader = webUploader.create({
		auto: true,
		swf: $_CONFIG.imgpath + '/images/swf/Uploader.swf',
		server: '/ajax/crop/crop_img',
		fileVal: 'avatar_file',
		threads: 1,
		duplicate: true,
		fileSingleSizeLimit: 4 * 1024 * 1024,
		fileSizeLimit: 50 * 1024 * 1024,
		pick: {
			id: '[data-node=uploader]',
			innerHTML: '<em data-node="icon" class="icon">&#xe955</em>'
		},
		accept: {
			title: 'Images',
			extensions: 'jpg,jpeg,png',
			mimeTypes: 'image/*'
		},
		thumb: {
			width: '100%',
			height: '100%',
			// 图片质量，只有type为`image/jpeg`的时候才有效。
			quality: 70,
			// 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
			allowMagnify: false,
			// 是否允许裁剪。
			crop: false,
			// 为空的话则保留原有图片格式。
			// 否则强制转换成指定的类型。
			type: 'image/jpeg'
		},
		compress: {
			// 图片质量，只有type为`image/jpeg`的时候才有效。
			quality: 90,
			// 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
			allowMagnify: false,
			// 是否允许裁剪。
			crop: false,
			// 是否保留头部meta信息。
			preserveHeaders: true,
			// 如果发现压缩后文件大小比原来还大，则使用原来图片
			// 此属性可能会影响图片自动纠正功能
			noCompressIfLarger: false,
			// 单位字节，如果图片大小小于此值，不会采用压缩。
			compressSize: 0
		}
	});
	uploader.onFileQueued = function(file) {
		var html = '<li id="' + file.id + '">' + '<div class="bar-upload-pic"><span data-node="progress"></span></div>' + '</li>';
		$rt.prev().html(html);
	};

	var uploadError = function(msg) {
		$rt.parents('[data-node=uli]').addClass('dr-form-error');
		$rt.parent().eq(0).nextAll('[class=error-txt]').html(msg);
	}

	uploader.on('uploadSuccess', function(file, response) {
		if (response.code === 200 && response.success) {
			$rt.parents('[data-node=uli]').removeClass('dr-form-error');
			$rt.prev().html('<img data-node="uploaderImg" src="' + response.data[0] + '" alt=""><a href="javascript:;" class="modify-mask"><span class="mask-txt" data-node="change" data-ruid="' + file.source.ruid + '">更换照片 </span></a>');
			$rt.css({
				'height': '20px',
				'top': '60px'
			});
		} else {
			$rt.prev().html('<em data-node="icon" class="icon">&#xe955</em>');
			uploadError(errorMsg.uploadFaild);
		}
	});

	uploader.on('beforeFileQueued', function(file) {
		$rt = $('#rt_' + file.source.ruid);
	});

	uploader.on('error', function(type) {
		uploadError(errorMsg.uploadError);
	});

	uploader.on('uploadProgress', function(file, percentage) {
		$('#' + file.id).find('[data-node="progress"]').css('width', percentage * 100 + '%');
	});
	uploader.on('uploadError', function(file, reason) {
		$rt.prev().html('<em data-node="icon" class="icon">&#xe955</em>');
		uploadError(errorMsg.uploadFaild);
	});
	callback();
};

var check = function() {
	var uli = $('[data-node=uli]');
	return uli.hasClass('dr-form-error') ? false : true;
};

var callback = function(fn) {
	var fn = fn || function() {};
	fn();
};

module.exports = {
	init: init,
	check: check,
	callback: callback
}