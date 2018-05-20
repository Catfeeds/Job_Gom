/**
 * Created by dongyukuan on 2016/7/5.
 */
var fetch = require('io/fetch');
var url = require("io/url");
// var encrypt = require("module/encrypt");
var checkCode = require('./checkCode');
var checkPwd = require('./checkPwd');
var encrypt = require("utils/encrypt");

var resetPwdBox = $('[data-node=resetPwdBox]');
var changeBox = resetPwdBox.find('[data-node=changeBox]');
var sucBox = resetPwdBox.find('[data-node=suc]');

var subBtn = resetPwdBox.find('[data-action=subBtn]');
var msgCode = resetPwdBox.find('[data-node=msgCode]');
var pwd = resetPwdBox.find('[data-node=pwd]');
var pwdV = resetPwdBox.find('[data-node=surePwd]');
var publicErrBox = resetPwdBox.find('[data-node=publicErrBox]');
var inputs = resetPwdBox.find('input');

var hideCls = 'hide';

var submit = function() {
    var codeVal = msgCode.val();
    var pwdVal = pwd.val();
    var codeFlag = checkCode(codeVal);
    var pwdFlag = checkPwd.checkPwd();
    var pwdVFlag = checkPwd.checkPwdV();
    if (codeFlag && pwdFlag && pwdVFlag) {
        var subData = {
            "verifyCode": codeVal,
            // "newPwd": encrypt($.trim(pwd.val()))
            "newPwd": encodeURIComponent(encrypt.encrypt($.trim(pwdVal)).toString())
        };
        fetch.post(url.get('subNewPwd'), {
            data: subData
        }).done(function(data) {
            if (data.success) {
                changeBox.addClass(hideCls);
                sucBox.removeClass(hideCls);
            } else {
                publicErrBox.removeClass(hideCls).text(data.message);
            }
        });
    }
};
var subBtnClr = function() {
    var pwdVal = pwd.val();
    var codeVal = msgCode.val();
    var pwdVVal = pwdV.val();
    publicErrBox.addClass(hideCls);
    if (pwdVal && pwdVVal && codeVal) {
        subBtn.addClass('active');
    } else {
        subBtn.removeClass('active');
    }
};
var submitEvent = function() {
    inputs.on('keyup', subBtnClr);
    subBtn.on('click', submit);
};
module.exports = {
    init: submitEvent
};