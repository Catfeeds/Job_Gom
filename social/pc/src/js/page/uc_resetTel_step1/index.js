var fetch = require('io/fetch');
var url = require("io/url");
var inputTip = require("module/i18n");
var CountDown = require("utils/countdown");
var check = require('utils/check');
var limitLen = require('utils/limitLen');
require('placeholder');

var msgTip = inputTip.msgCode;

var formBox = $('[data-node=formBox]');
var publicErr = formBox.find('[data-node=publicErr]');
var errText = formBox.find('[data-node=errText]');

var codeLi = formBox.find('[data-node=codeLi]');
var sendMsgBtn = formBox.find('[data-action=sendMsg]');
var msgCode = formBox.find('[data-node=msgCode]');
var codeTip = formBox.find('[data-node=codeTip]');
var codeIcon = formBox.find('[data-node=codeIcon]');
var codeText = formBox.find('[data-node=codeText]');

var nextStep = formBox.find('[data-action=nextStep]');

var sendFlag = 1;

var hideCls = 'hide';
var lgFormError = 'lg-form-error';
var codeTipCls = 'code-tip';
var codeDisabled = 'code-disabled';
var activeCls = 'active';

//公共提示隐藏显示
var hideErrBox = function() {
	publicErr.addClass(hideCls);
};
var showErrBox = function(str) {
	publicErr.removeClass(hideCls);
	errText.text(str);
};

var sendMsg = function() {
	if (!sendFlag) {
		return false;
	}
	sendFlag = 0;
	fetch.get(url.get('sendOldCode')).done(function(data) {
		if (data.success) {
			//input框下方提示
			codeTip.removeClass(hideCls);
			codeIcon.removeClass(hideCls);
			codeText.text(msgTip.send);
			//去掉li边框红色
			codeLi.removeClass(lgFormError).addClass(codeTipCls);
			//隐藏公共错误提示
			hideErrBox();

			new CountDown(60, {
				onChange: function(num) {
					sendMsgBtn.text(num + inputTip.msgCode.btnAfterSend).addClass(codeDisabled);
				},
				onFinish: function() {
					sendFlag = 1;
					sendMsgBtn.text(inputTip.msgCode.btnDefault).removeClass(codeDisabled);
				}
			});
		} else {
			showErrBox(data.message);
			sendFlag = 1;
		}
	}).fail(function() {
		sendFlag = 1;
		showErrBox(inputTip.errLine.tip);
	});
	return false;
};
var inputFoc = function() {
	if (codeLi.hasClass(lgFormError)) {
		codeTip.addClass(hideCls);
		//去掉li边框红色
		codeLi.removeClass(lgFormError).addClass(codeTipCls);
	}
	//隐藏公共错误提示
	hideErrBox();
};
var inputKeyup = function() {
	var codeVal = msgCode.val();
	var len = codeVal.length;
	if (len > 6) {
		msgCode.val(limitLen(codeVal, 6));
	}
	if (codeVal) {
		nextStep.addClass(activeCls);
	} else {
		nextStep.removeClass(activeCls);
	}
};

var inputBlur = function() {
	var flag = true;
	var codeVal = msgCode.val();
	var len = codeVal.length;
	if (!check.isMsgCode(codeVal)) {
		flag = false;
		codeLi.removeClass(codeTipCls).addClass(lgFormError);
		codeTip.removeClass(hideCls);
		codeIcon.addClass(hideCls);
		if (!len) {
			codeText.text(msgTip.tipEpt);
		} else {
			codeText.text(msgTip.tipErr);
		}
	} else {
		flag = true;
	}
	return flag;
};

var subFn = function() {
	var codeVal = msgCode.val();
	var flag = inputBlur();
	if (flag) {
		var subData = {
			verifyCode: codeVal
		};
		fetch.post(url.get('checkOldCode'), {
			data: subData
		}).done(function(data) {
			if (data.success) {
				location.href = $_CONFIG['i_domain'] + 'bind/secondStep';
			} else {
				showErrBox(data.message);
			}
		}).fail(function() {
			showErrBox(inputTip.errLine.tip);
		});
	}
};

var initEvent = function() {
	msgCode.placeholder();
	sendMsgBtn.on('click', sendMsg);
	msgCode.on({
		"focus": inputFoc,
		"keyup": inputKeyup,
		"blur": inputBlur
	});
	nextStep.on('click', subFn);
};

initEvent();