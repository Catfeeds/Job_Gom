var byteLen = require('utils/byteLen');
var fetch = require("io/fetch");
var url = require('io/url');
var truncate = require('utils/truncate');
var errorMsg = require("module/i18n").masterApply;

var isIdCard = require('./checkIdCard');
var vilidate = require('./validate');
var chooseCategory = require('./chooseCategory');
var upload = require('./photoUpload');
var dataBackfill = require('./dataBackfill');

var $form = $('[data-node=form]');
var $tipError = $form.find('[data-node=tipError]');

var $liName = $form.find('[data-node=liName]');
var $tipName = $liName.find('[data-node=tipTxt]');
var $inputName = $liName.find('[data-node=inputName]');
var $markerName = $liName.find('[data-node=markerName]');

var $liId = $form.find('[data-node=liId]');
var $inputId = $liId.find('[data-node=inputId]');
var $markerId = $liId.find('[data-node=markerId]');
var $tipId = $liId.find('[data-node=tipId]');

var $liCategory = $form.find('[data-node=categoryLi]');
var $tipCategory = $form.find('[data-node=categoryTip]');
var $textCategory = $form.find('[data-node=categoryTxt]');

var $liSummary = $form.find('[data-node=liSummary]');
var $inputSummary = $liSummary.find('[data-node=inputSummary]');
var $numSummary = $liSummary.find('[data-node=numSummary]');
var $tipSummary = $liSummary.find('[data-node=tipSummary]');
var inputInterval;

var $btnSubmit = $('[data-node=btnSubmit]');
var validSuccess = function($li, $marker) {
	if ($li) $li.removeClass('dr-form-error');
	if ($marker) $marker.removeClass('hide');
};

var validFail = function($li, $marker, $tip, msg) {
	if ($li) $li.addClass('dr-form-error');
	if ($marker) $marker.addClass('hide');
	if ($tip) $tip.html(msg);
};

var publicTips = function(state, msg) {
	var msg = msg || '网络异常，请检查网络';
	var state = state || 'show';
	if (state === 'show') {
		$tipError.html(msg).removeClass('hide');
	} else if (state === 'hide') {
		$tipError.html(msg).addClass('hide');
	}

};

var blurTemplete = function(params) {
	var defaultOptions = {
		type: null,
		$target: {},
		$li: false,
		$marker: false,
		$tip: false,
		msg: false
	};
	var options = $.extend({}, true, defaultOptions, params);
	var result;
	if (options.type === null) return alert(new Error('未设置验证类型'));
	switch (options.type) {
		case 'name':
			result = vilidate.checkName(options.$target);
			break;
		case 'id':
			result = vilidate.checkIdCard(options.$target);
			break;
		case 'summary':
			result = vilidate.checkSummary(options.$target);
			break;
	}
	if (result.success) {
		validSuccess(options.$li, options.$marker);
	} else {
		if (options.msg) {
			validFail(options.$li, options.$marker, options.$tip, options.msg);
		} else {
			validFail(options.$li, options.$marker, options.$tip, result.msg);
		}

	}
};

var lengthLimit = function(node, maxLength) {
	if (byteLen(node.val()) >= maxLength) {
		node.val(truncate(node.val(), maxLength));
	}
};
//姓名输入框事件
var inputNameEvent = {
	oninput: function() {
		lengthLimit($inputName, 20);
	},
	onblur: function() {
		var $this = this;
		blurTemplete({
			type: 'name',
			$target: $this,
			$li: $liName,
			$marker: $markerName,
			$tip: $tipName
		});
	}
};
// 身份证号输入框事件
var inputIdEvent = {
	oninput: function() {
		lengthLimit($inputId, 18);
	},
	onblur: function() {
		var $this = this;
		blurTemplete({
			type: 'id',
			$target: $this,
			$li: $liId,
			$marker: $markerId,
			$tip: $tipId,
			msg: errorMsg.isIdCard
		});
	}
};

//个人简介输入事件
var inputSummaryEvent = {
	onfocus: function() {
		inputInterval = setInterval(function() {
			if ($inputSummary.val().length >= 100) {
				$inputSummary.val($inputSummary.val().substring(0, 100));
			}
			$numSummary.html($inputSummary.val().length);
		}, 100);
	},
	oninput: function() {
		$numSummary.html($inputSummary.val().length);
		if ($inputSummary.val().length >= 100) {
			$inputSummary.val($inputSummary.val().substring(0, 100));
		}
	},
	onblur: function() {
		clearInterval(inputInterval);
		var $this = this;
		blurTemplete({
			type: 'summary',
			$target: $this,
			$li: $liSummary,
			$tip: $tipSummary
		});
	}
};
var submitEvent = function() {
	publicTips('hide');
	if (!vilidate.checkName($inputName).success) {
		return validFail($liName, $markerName, $tipName, vilidate.checkName($inputName).msg);
	}
	if (!vilidate.checkIdCard($inputId).success) {
		return validFail($liId, $markerId, $tipId, errorMsg.isIdCard);
	}
	if (!upload.check()) {
		return false;
	}
	if (!vilidate.checkupload()) {
		return false;
	}
	if ($textCategory.attr('data-id') == 'false') {
		$liCategory.addClass('dr-form-error');
		$tipCategory.html(errorMsg.type);
		return;
	} else {
		$liCategory.removeClass('dr-form-error');
	}
	if (!vilidate.checkSummary($inputSummary).success) {
		return validFail($liSummary, false, $tipSummary, vilidate.checkSummary($inputSummary).msg);
	}
	//sendAjax
	function sendAjax(url) {
		var imgs = $form.find('[data-node=uploaderImg]');
		var option = {
			realName: $inputName.val(),
			idCardNo: $inputId.val(),
			idcardFrontImageUrl: $(imgs[0]).attr('src'),
			idcardBackImageUrl: $(imgs[1]).attr('src'),
			idcardPersonImageUrl: $(imgs[2]).attr('src'),
			categoryId: $form.find('[data-node=categoryTxt]').attr('data-id'),
			introduction: $form.find('[data-node=inputSummary]').val()
		};
		fetch.post(url, {
			data: option
		}).done(function(data) {
			if (data.success) {
				if (data.code === 200) {
					location.href = $_CONFIG.i_domain + 'expert';
				} else {

				}
			} else {
				publicTips('show', data.message);
			}
		}).fail(function() {
			publicTips();
		});
	}
	if ($GLOBAL_CONFIG['applyFlag'] === 0) {
		sendAjax(url.get('subMaster'));
	} else {
		sendAjax(url.get('subMasterAgain'));
	}
};

var bindEvent = function() {
	$inputName.on({
		input: inputNameEvent.oninput,
		blur: inputNameEvent.onblur
	});
	$inputId.on({
		input: inputIdEvent.oninput,
		blur: inputIdEvent.onblur
	});
	$inputSummary.on({
		focus: inputSummaryEvent.onfocus,
		input: inputSummaryEvent.oninput,
		blur: inputSummaryEvent.onblur
	});
	$btnSubmit.on('click', submitEvent);
};

bindEvent();

//达人类型选择
chooseCategory.init();

//图片上传
upload.init();