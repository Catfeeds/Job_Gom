var fetch = require('io/fetch');
var url = require('io/url');
var qrTips = require('module/i18n');
var alert = require('module/popup/alert');
var loginForm = $('[data-node=userForm]');
//登录方式切换按钮
var qrCodeBtn = loginForm.find('[data-action=qrCodeBtn]');
var accLoginBtn = loginForm.find('[data-action=accLoginBtn]');
//扫码页面
var qrCodeBox = loginForm.find('[data-node=qrCodeBox]');
var qrCodeImg = qrCodeBox.find('[data-node=qrCodeImg]');

var qrCodeFailBox = qrCodeBox.find('[data-node=qrCodeFailBox]');
var qrCodeTip = qrCodeBox.find('[data-node=qrCodeTip]');
var refQrCode = qrCodeBox.find('[data-action=refQrCode]');
//扫码待手机确认登录页面
var qrCodeSucBox = loginForm.find('[data-node=qrCodeSucBox]');
var backToQrCode = qrCodeSucBox.find('[data-action=backToQrCode]');

var tips = qrTips.qrCodeTip;
var checkTime = 3000;
var ssid = '';
var ssidStatus;
var checkTimer;

var handleState = function(status) { //自定义显示方法(与接口无关，只控制显示状态)
    if (status === 0) { //扫码登录框全部隐藏
        qrCodeBox.hide();
        qrCodeFailBox.hide();
        qrCodeSucBox.hide();
    } else if (status === 1) { //显示扫码
        qrCodeBox.show();
        qrCodeFailBox.hide();
        qrCodeSucBox.hide();
    } else if (status === 2) { //显示扫码和刷新按钮
        qrCodeBox.show();
        qrCodeFailBox.show();
        qrCodeSucBox.hide();
    } else if (status === 3) { //显示已扫码未登录
        qrCodeBox.hide();
        qrCodeFailBox.hide();
        qrCodeSucBox.show();
    }
};
//设置文案
var setMsg = function(textTip, btnTip) {
    qrCodeTip.text(textTip);
    refQrCode.text(btnTip);
};
//获取二维码
var getQrCode = function() {
    handleState(1);
    qrCodeImg.attr('src', '');
    return fetch.get(url.get('getQrCode')).done(function(data) {
        if (data.success) {
            ssid = data.data.ssid;
            qrCodeImg.attr("src", data.data.genQrcode);
        } else {
            handleState(2);
            setMsg(tips.failGetTip, tips.failGetBtn);
        }
    }).fail(function() {
        handleState(2);
        setMsg(tips.failGetTip, tips.failGetBtn);
    });
};
//让二维码失效
var abolishQrCode = function() {
    fetch.post(url.get('abolishQrCode'), {
        data: {
            "ssid": ssid
        }
    });
};
//监测扫描结果
var monitorScan = function() {
    fetch.get(url.get('getSsidStatus'), {
        data: {
            "ssid": ssid
        },
        timeout: checkTime
    }).done(function(data) {
        var status = data.data.ssidStatus;
        ssidStatus = status;
        if (status === 0) {
            return;
        } else if (status === 1 || status === 3) {
            handleState(2);
            setMsg(tips.loseEffTip, tips.loseEffBtn);
            cancelTimer();
        } else if (status === 2) {
            handleState(3);
        } else if (status === 4) {
            cancelTimer();
            location.href = data.data.headerUrl;
        } else {
            alert('port change!');
        }
    }).fail(function() {
        cancelTimer();
    });
};
var initAccLogin = function() { //初始化账号登录
    qrCodeImg.attr("src", '');
    cancelTimer();
    handleState(0);
    if (ssidStatus !== 1 & ssidStatus !== 3) {
        abolishQrCode();
    }
};
var initQrCode = function() { //初始化扫码登录
    getQrCode().then(function() {
        startTimer(checkTime);
    });
};
var startTimer = function(delay) { //启动定时器
    cancelTimer();
    checkTimer = setInterval(monitorScan, delay);
};
var cancelTimer = function() {
    if (checkTimer) {
        clearInterval(checkTimer);
    }
};
var initQrCodeEvent = function() {
    qrCodeBtn.on("click", initQrCode);
    refQrCode.on('click', initQrCode);
    backToQrCode.on('click', initQrCode);
    accLoginBtn.on("click", initAccLogin);
};

module.exports = {
    init: initQrCodeEvent
};