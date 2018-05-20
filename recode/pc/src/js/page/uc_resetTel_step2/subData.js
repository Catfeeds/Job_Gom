var fetch = require('io/fetch');
var url = require("io/url");
var errLineTip = require('module/i18n').errLine.tip;

var checkTel = require('./telEvent').checkTel;
var checkCode = require('./msgCode').checkCode;

var formBox = $('[data-node=formBox]');
var telInput = formBox.find('[data-node=telInput]');
var codeInput = formBox.find('[data-node=msgCode]');
var nextStep = formBox.find('[data-action=nextStep]');

var publicErr = formBox.find('[data-node=publicErr]');
var errText = formBox.find('[data-node=errText]');

var inputs = $('input');
var activeCls = 'active';
var hideCls = 'hide';

//显示公共错误提示
var showErrBox = function(str) {
	publicErr.removeClass(hideCls);
	errText.text(str);
};

var btnActive = function() {
	var telVal = telInput.val();
	var codeVal = codeInput.val();
	if (telVal.length && codeVal.length) {
		nextStep.addClass(activeCls);
	} else {
		nextStep.removeClass(activeCls);
	}
};
var submit = function() {
	var telFlag = checkTel();
	var codeFlag = checkCode();
	if (telFlag && codeFlag) {
		var telVal = telInput.val();
		var codeVal = codeInput.val();
		var subData = {
			"verifyCode": codeVal,
			"mobile": telVal
		};
		fetch.post(url.get('checkNewCode'), {
			data: subData
		}).done(function(data) {
			if (data.success) {
				location.href = $_CONFIG['i_domain'] + 'bind/thirdStep';
			} else {
				showErrBox(data.message);
			}
		}).fail(function() {
			showErrBox(errLineTip);
		});
	}
};

var initSub = function() {
	inputs.on('keyup', btnActive);
	nextStep.on('click', submit);
};
module.exports = {
	initSub: initSub
};