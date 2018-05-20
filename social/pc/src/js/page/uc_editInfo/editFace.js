var cropper = require('module/cropper');
var fetch = require('io/fetch');
var url = require('io/url');
var hint = require('module/hint');

var $tabs = $('[data-node="editTab"] a');
var $tabBoxs = $('[data-node="editBox"]');
var $faceBox = $('[data-action="editFaceImg"]');

var firstTab = true;


var cropperInit = function() {

	cropper.init(function(src) {
		fetch.post(url.get('subName'), {
			data: {
				facePicUrl: src
			}
		}).done(function(result) {

			if (result && result.success && result.code === 200) {
				$faceBox.find('img').attr("src", src);
				$('[data-node="headImg"]').attr("src", src);
				hint.init('保存成功');
			} else {
				hint.init('保存失败');
			}

		}).fail(function() {
			hint.init('保存失败');
		});

	});
}

var Tab = function() {
	$(document).on('click', '[data-node="editTab"] a', function() {
		if (!$(this).hasClass('active')) {
			$('[data-node=comErrTip]').addClass('hide');
			var index = $tabs.index($(this));
			$tabs.removeClass('active').eq(index).addClass('active');
			$tabBoxs.hide().eq(index).show();
			if (index === 1 && firstTab) {
				firstTab = false;
				cropperInit();
			}
		}
	});
	$faceBox.on('click', function() {
		$('[data-node=comErrTip]').addClass('hide');
		$tabs.eq(1).click();
	});
};



var init = function() {
	Tab();
	if (window.location.href.indexOf('type=2') !== -1) {
		cropperInit();
	}

};



module.exports = {
	init: init
}