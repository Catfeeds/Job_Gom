/**
 * 用户注册登录接口
 */
module.exports = {

    //注册页面接口
    getVerificationCode: '/regist/firststep', //发送验证码
    registSubmit: '/regist/secondstep', //校验+提交
    checkNickname: '/regist/identifynickname', //校验昵称
    checkRecommendationCode: '/regist/identifyreferralcode', //校验推荐码
    thirdstep: '/regist/thirdstep', //完善信息

    // 找回密码接口
    postPhoneAndCode: '/forgetpwd/firstStep', // 第一步
    sendMsgCode: "/forgetpwd/sceondStep", //发送手机验证码
    postMsgCode: "/forgetpwd/thirdStep", //第二步
    postNewPwd: "/forgetpwd/fourthStep", //第三步

    //v2接口
    sendMsgCodeV2: '/forgetpwd/sendVerifitionCode',
    checkCode: '/forgetpwd/checkVerifycode',
    passwordReset: '/forgetpwd/passwordReset',

    //找回门店密码
    storePwd: '/shop/check',

    /*第三方登录-关联手机号*/
    snsSendCode: '/login/snsbindphonefirst',
    snsSubmitPhone: "/login/snsbindphonesecond",

    /*绑定手机号*/
    loginData: '/ajax/login/login',
    sendCode: 'bindphonefirst',
    loginErrorNum: '/login/errornum',
    bindPhone: '/login/bindphone',

    /*扫码登录*/
    getQrCode: '/ajax/login/getQrcodeInfo', //获取二维码
    abolishQrCode: '/ajax/login/delSsidInfo', //让二维码失效
    getSsidStatus: '/ajax/login/getSsidStatus', //检测扫码状态

    /*扫码登录*/
    ajaxGetQrCode: '/ajax/login/getQrcodeInfo', //获取二维码
    ajaxAbolishQrCode: '/ajax/login/delSsidInfo', //让二维码失效
    ajaxGetSsidStatus: '/ajax/login/getSsidStatus', //检测扫码状态

    /*绑定手机号*/
    ajaxLoginData: '/ajax/login/login',
    //ajaxCaptcha: '/ajax/login/captcha',
    ajaxCaptcha: 'index/code',

    /*记录第三方页面重定向session*/
    ajaxThirdRedirect: '/ajax/login/redirect_state',
    /*登录完成获取其他用户信息*/
    ajaxGetCurrInfo: '/ajax/login/getCurrInfo',
    // 请求验证码
    getCheckCode: 'index/code',
    // 升级到一账通
    accountUpgrade: '/ajax/user/accountUpgrade',
    /* 手机文件上传二维码*/
    // getUploadQrCode: '/topic/topicQrcode'
    getUploadQrCode: '/ajax/topic/topicQrcode'

};
