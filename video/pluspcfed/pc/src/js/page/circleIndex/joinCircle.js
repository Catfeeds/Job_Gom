/*
 *@author:dongyukuan
 *@desc:加入圈子
 *@date:2017/5/4
 */

var toast = require('module/hint').init;
var fetch = require('io/fetch');
var url = require("io/url");
var loginPop = require('module/popup/login');
var checkLoginStatus = require('module/checkLoginStatus');
var getCircleStatus = require('./getData').initCircle;

var $sucPop = $('[data-node=sucPop]');
var $sucCha = $('[data-action=sucCha]');
var $failPop = $('[data-node=failPop]');
var $failCha = $('[data-action=failCha]');

var $failText = $failPop.find('[data-node=failText]');
var $sucText = $sucPop.find('[data-node=sucText]');

var sucTimer = null;
var failTimer = null;

//加入圈子pop提示
var initCha = function() {
    $sucCha.on('click', function() {
        $sucPop.hide();
        window.clearTimeout(sucTimer);
    });
    $failCha.on('click', function() {
        $failPop.hide();
        window.clearTimeout(failTimer);
    })
};

var handlePop = function(status, msg) {
    //初始化点击×号
    initCha();
    if (status == 'suc') {
        msg ? $sucText.text(msg) : void 0;
        $sucPop.show();
        sucTimer = setTimeout(function() {
            $sucPop.hide();
        }, 2000)
    } else if (status == 'fail') {
        msg ? $failText.text(msg) : void 0;
        $failPop.show();
        failTimer = setTimeout(function() {
            $failPop.hide();
        }, 2000);
    }
};

var joinFlag = 1; //点击加入圈子按钮的开关，避免重复点击
var joinCircle = function($this, fromLogin) {
    var groupId = $this.data('groupid');

    function join() {
        var groupDomain = $_CONFIG['group_domain'];
        var api = groupDomain + url.get('joinCircle2');
        fetch.post(api, {
            "data": {
                groupid: groupId
            }
        }).done(function(result) {
            if (result.code == 200) {
                var status = result.data.status;
                if (status == 0) {
                    var $joinCircleSuc = $this.siblings('[data-node = joinCircleSuc]');
                    $this.addClass('none');
                    $joinCircleSuc.removeClass('none');
                    handlePop('suc', result.message);
                } else if (status == 1) {
                    var $joinCircleChk = $this.siblings('[data-node = joinCircleChk]');
                    $this.addClass('none');
                    $joinCircleChk.removeClass('none');
                    handlePop('suc', result.message);
                }
            } else if (result.code == 409) {
                switch (result.error.code) {
                    case "1": //已加入状态
                        var $joinCircleSuc = $this.siblings('[data-node = joinCircleSuc]').eq(0);
                        $this.addClass('none');
                        $joinCircleSuc.removeClass('none');
                        handlePop('suc', result.message);
                        break;
                    case "2": //圈子人数达到上限
                        var $joinCircleRef = $this.siblings('[data-node = joinCircleRef]').eq(0);
                        $this.addClass('none');
                        $joinCircleRef.removeClass('none');
                        handlePop('fail', result.message);
                        break;
                    case "3": //待审核
                        var $joinCircleChk = $this.siblings('[data-node = joinCircleChk]');
                        $this.addClass('none');
                        $joinCircleChk.removeClass('none');
                        handlePop('suc', result.message);
                        break;
                }
            } else {
                var $joinCircleRef = $this.siblings('[data-node = joinCircleRef]');
                $this.addClass('none');
                $joinCircleRef.removeClass('none');
                handlePop('fail', result.message);
            }
        }).fail(function() {
            handlePop('fail');
            joinFlag = 1;
        }).always(function() {
            joinFlag = 1;
        });
    }
    if (fromLogin) {
        getCircleStatus(join);
    } else {
        join();
    }
}

var initJoin = function(e) {
    if (!joinFlag) return;
    joinFlag = 0;
    var $this = $(this);
    var isLogin = checkLoginStatus();
    if (isLogin) {
        joinCircle($this);
    } else {
        joinFlag = 1;
        loginPop(function() {
            joinCircle($this, true);
        })
    }
    return false;
}
var initEvent = function() {
    $('body').on('click', '[data-action = joinCircle]', initJoin);
}
module.exports.init = initEvent;
