function setWarnStyle(obj) {
    obj.parent().addClass('land-error-it');
}

//表单验证
function checkForm(obj) {

    var ret = true;
    var userNum = obj.find('[data-node=userNum]');
    var userPwd = obj.find('[data-node=userPwd]');
    var valCode = obj.find('[data-node=code]');
    var errorLi = obj.find('[data-node=error]');
    var errMes = obj.find('[data-node=error-message]');

    //错误提示
    function showError(msg) {
        errorLi.removeClass('none');
        errMes.text(msg);
    }

    if (userNum.val() === "") { //账号为空
        showError('请输入账号');
        setWarnStyle(userNum);
        ret = false;
    } else if (userPwd.val() === "") { //密码为空
        showError('请输入密码');
        setWarnStyle(userPwd);
        ret = false;
    } else if (valCode.is(":visible") && valCode.val() == "") {
        showError('请输入验证码');
        valCode.css('border', '1px solid #f95353');
        ret = false;
    }
    return ret;
}

module.exports = checkForm;