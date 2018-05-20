// var fetch = require('io/fetch');
// var url = require('io/url');
var check = require('utils/check');
var nickTips = require('module/i18n').nickName;


var editCls = require('./editCls');
var remCls = editCls.remCls;
var addCls = editCls.addCls;

var editBox = $('[data-node=editBox]').eq(0);
var nickname = editBox.find('[data-node=nickname]');
var nameErr = editBox.find('[data-node=nameErr]');
var errBorder = editBox.find('[data-node=nameBorErr]');

var hideCls = 'hide';
var borErrCls = 'nicknerror';

var checkRule = function() {
    var ret = true;
    var nameVal = nickname.val();
    var len = nameVal.length;
    var lenFlag = !!(len >= 2 && len <= 20);
    if (!nameVal) {
        ret = false;
        addCls(errBorder, borErrCls);
        remCls(nameErr, hideCls).text(nickTips.eptName);
    } else if (!check.checkNickName(nameVal) || !lenFlag) {
        ret = false;
        addCls(errBorder, borErrCls);
        remCls(nameErr, hideCls).text(nickTips.commonTip);
    } else {
        ret = true;
    }
    return ret;
};
/*var nameExist = function() {
    var nameVal = nickname.val();
    var nameData = {
        "nickname": nameVal
    };
    return fetch.get(url.get('checkName'), {
        "data": nameData
    }).done(function(data) {
        if (data.success) {
            remCls(errBorder, borErrCls);
            addCls(nameErr, hideCls);
        } else {
            addCls(errBorder, borErrCls);
            remCls(nameErr, hideCls).text(data.message);
        }
    }).fail(function() {
        addCls(errBorder, borErrCls);
        remCls(nameErr, hideCls).text(nickTips.errLine);
    });
};*/
/*var checkName = function() {
    var nameFlag = checkRule();
    if (nameFlag) {
        nameExist();
    }
};*/
module.exports = {
    /*"checkName": checkName,*/
    "checkNameRule": checkRule
   /* "checkExist": nameExist*/
};