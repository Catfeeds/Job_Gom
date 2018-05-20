/*   主要用户联合登录的后续操作 第三方和扫码通用 坑爹 >_< !!  */

var fetch = require('io/fetch');
var url = require('io/url');
var onLoginContent = require('./onLogin.tpl');

var iDomain = $_CONFIG.i_domain;
var passDomain = $_CONFIG.passport_domain;
var popLayer = '',
    opts = {};

function loginCallback() {
    $_CONFIG.islogin = "1";
    removePop(popLayer);
    var onLogin = opts.onLogin;
    if (onLogin) {
        if (opts.refresh === true) {
            opts.async = false;
            onLogin(opts);
            setTimeout(function() {
                window.location.href = window.location;
            }, 10)

        } else {
            onLogin(opts.data);
        }
    } else {
        window.location.href = window.location;
    }
}

function init(pa, options) {
    $_CONFIG.islogin = "1";
    popLayer = pa;
    opts = options;
    getUnioInfo();
}

//信息复合接口
function getUnioInfo() {
    fetch.post(url.get('ajaxGetCurrInfo'))
        .done(function(data) {
            onLoginInfo(data);
        })
        .fail(function() {
            setTimeout(function() {
                window.location.href = window.location;
            }, 1000)
            return false;
        });
}

//登录成功修改信息
function onLoginInfo(json) {

    if (json.success !== true) { //这个时候已经成功登陆，防止页面停滞
        setTimeout(function() {
            window.location.href = window.location;
        }, 1000)
        return false;
    }
    renderHeaderDom(json);
    renderFixTools(json);
    loginCallback();
}

//头部信息  18701593012
function renderHeaderDom(json) {
    var isExpert = json.data.isExpert,
        str = {
            iDomain: iDomain,
            passDomain: passDomain,
            isExpert: isExpert,
            daren: isExpert ? '达人特权' : '达人申请'
        }
    $('[data-node=indexRegist]').remove();
    if (!$('.index-login').length) { //同步两个窗口头部数据,防止重叠
        $('.menu .nav').after(onLoginContent(str)); //写入模板 准备填充数据
    }
    var $message = $('[data-action=codeDialog]').find('span'),
        $buycar = $('[data-node=buycar]'),
        $headName = $('[data-node=headName]'),
        $headImg = $('[data-node=headImg]');

    var userData = json.data,
        carNum = userData.carProdNum;

    carNum = carNum > 99 ? '99+' : carNum;
    $message.text(userData.messCount); //短消息
    $buycar.text(carNum); //购物车数量
    $_CONFIG.cartProdNumReal = userData.carProdNum;
    $headName.text(userData.nickName) //昵称
    $headImg.attr('src', userData.imagePath); //头像
}

//侧边栏
function renderFixTools(json) {
    var $addCarElement = $('[data-node="bannerShopCar"]').find('span'),
        userData = json.data,
        carNum = userData.carProdNum;

    carNum = carNum > 99 ? '99+' : carNum;
    $addCarElement.text(carNum); //侧边栏购物车
}

//登录完成 移除弹窗
function removePop(obj) {
    obj.__popup.remove();
    obj.__backdrop.remove();
    obj.__mask.remove();
}

module.exports = {
    init: init
};