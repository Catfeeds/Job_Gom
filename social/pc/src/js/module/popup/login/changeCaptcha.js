var url = require('io/url');
var CaptchaUrl = url.get('ajaxCaptcha') + '?setid=';
var cookieVal = $_CONFIG.prefix + "userId";
var passDomain = $_CONFIG.passport_domain;
CaptchaUrl = passDomain + CaptchaUrl + 'login&t=';

//更新验证码
function changeCaptcha(identifyPlace, valCode, changeCode) {

    identifyPlace.removeClass("none")
        .find('.code-img')
        .attr('src', CaptchaUrl + new Date().getTime());

    valCode.val('');
    changeCode.blur();
}

//事件绑定

module.exports = changeCaptcha