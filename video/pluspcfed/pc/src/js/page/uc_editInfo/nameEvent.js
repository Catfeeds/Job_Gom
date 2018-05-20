var verifyName = require('./verifyName');
var limitLen = require('utils/limitLen');
var editCls = require('./editCls');
var remCls = editCls.remCls;
var addCls = editCls.addCls;

var editBox = $('[data-node=editBox]').eq(0);
var nickname = editBox.find('[data-node=nickname]');
var nameErr = editBox.find('[data-node=nameErr]');
var errBorder = editBox.find('[data-node=nameBorErr]');
var comErr = editBox.find('[data-node=comErrTip]');

var hideCls = 'hide';
var borErrCls = 'nicknerror';
var nameFoc = function() {
	remCls(errBorder, borErrCls);
	addCls(nameErr, hideCls);
	addCls(comErr, hideCls);
};
var nameKeyup = function() {
	var nameVal = nickname.val();
	var len = nameVal.length;
	if (len > 20) {
		nickname.val(limitLen(nameVal, 20));
	}
};
var initObj = {
	init: function() {
		nickname.on({
			blur: verifyName.checkNameRule,
			focus: nameFoc,
			keyup: nameKeyup
		});
	}
};
module.exports = initObj;