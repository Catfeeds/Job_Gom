require('../../plugin/jquery.bxslider');
require('lazyload');
var url = require('io/url');
var fetch = require('io/fetch');
var goOnTpl = require('./goOn.tpl');
// var joinCircle = require('../topics/joinCircle');
var loginPop = require('module/popup/login');
var toast = require('module/hint').init;
var checkLoginStatus = require('module/checkLoginStatus');

// var moduleLoading = require('./moduleLoading');
var recommendTpl = require('./recommend.tpl');
var topicTpl = require('./topic.tpl');
var productGroupTpl = require('./productGroup.tpl');

// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('home');

var advArr = $_CONFIG['advert'] || [],
    topArr = $_CONFIG['topAd'],
    ggArr = $_CONFIG['ggAd'];
var $topBanner = $("[data-node='banner']"); //头部广告
var $ggBanner = $("[data-node='indexSmall']"); //逛逛广告

var $warpBox = $('[data-node=Wrap-Box]');
var $recommendBox = $('[data-node=recommendBox]');

function insertAd($parent, num, fn, arg) { //插入单帧广告
    $parent.find("li").eq(num).after(fn(arg));
    var $li = $parent.find("li"); //dom节点已发生变化 需重新获取
    var k = Array.prototype.slice.call($li, 6);
    $(k[0]).remove();
    checkImpressionUrl(arg);
}

//418活动
var activity = require('module/activity');

function activityData() {
    fetch.get(url.get('activity')).done(function(data) {
        if (data && data.code === 200 && data.success) {
            activity.init(data.data.buttom);
        }
    });
};
activityData();

//插入全部轮播广告
function insertAll(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var alias = arr[i],
            slotId = alias.slotId;
        var arg = alias.adContents[0];
        switch (slotId) {
            case topArr.first:
                insertAd($topBanner, 0, renderTopli, arg);
                break;
            case topArr.second:
                insertAd($topBanner, 1, renderTopli, arg);
                break;
            case ggArr.first:
                insertAd($ggBanner, 0, renderGgli, arg);
                break;
            case ggArr.second:
                insertAd($ggBanner, 1, renderGgli, arg);
                break;
        }
    }
}

//插入顶部轮播广告
function insertTop(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var alias = arr[i],
            slotId = alias.slotId;
        var arg = alias.adContents[0];
        switch (slotId) {
            case topArr.first:
                insertAd($topBanner, 0, renderTopli, arg);
                break;
            case topArr.second:
                insertAd($topBanner, 1, renderTopli, arg);
                break;
        }
    }
}
//插入逛逛轮播广告
function insertGg(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var alias = arr[i],
            slotId = alias.slotId;
        var arg = alias.adContents[0];
        switch (slotId) {
            case ggArr.first:
                insertAd($ggBanner, 0, renderGgli, arg);
                break;
            case ggArr.second:
                insertAd($ggBanner, 1, renderGgli, arg);
                break;
        }
    }
}

function checkImpressionUrl(arg) { //检测URL,延迟执行
    setTimeout(function() {
        var con = typeof arg.content == "object" ? arg.content : $.parseJSON(arg.content),
            src = con.impressionUrl,
            img = new Image();

        img.onload = function() {
            if (src) {
                var impressImg = new Image();
                impressImg.src = src;
            }
        }

        img.src = con.resourceUrl;
    }, 1000)
}

function renderTopli(arg) { //渲染 大焦点图轮播节点
    var con = typeof arg.content == "object" ? arg.content : $.parseJSON(arg.content),
        str = '<li>' + '<a target="_blank" href="' + con.clickUrl +
        '" style="background:url(' + con.resourceUrl + ') 50% 0 no-repeat;">' +
        '</a>' + '</li>';
    return $(str);
}

function renderGgli(arg) { //渲染 逛逛轮播节点
    var con = $.parseJSON(arg.content),
        str = '<li>' + '<a target="_blank" href="' + con.clickUrl + '">' +
        '<img src="' + con.resourceUrl + '" width="' + arg.width + '" height="' +
        arg.height + '"/>' + '</a>' + '</li>';
    return $(str);
}

function renderBanner($obj) { //渲染轮播图
    var len = arguments.length;
    for (var i = 0; i < len; i++) {
        $obj = arguments[i];
        if ($obj.find('li').length > 1) {
            $obj.bxSlider({
                adaptiveHeight: true,
                startSlide: 0,
                prev: '<em class="icon iconn-8"></em>',
                next: '<em class="icon iconn-9"></em>',
                infiniteLoop: true,
                auto: true,
                autoHover: true,
                useCSS: false,
                pagerTriggerEvent: 'mouseenter'
            });
        } else {
            $obj.find('li').css('float', 'none');
        }
    }
}

var $btn;
var loginPopFlag = 0;

//加入圈子
function joinCircle() {
    var groupId = $btn.data('groupid');
    fetch.post(url.get('joinCircle2'), {
        "data": {
            groupid: groupId
        }
    }).done(function(result) {
        if (result.code === 200) {
            $btn.addClass('join-suc').find('span').text('已加入');
            // $btn.addClass('join-suc').find('em').eq(0).removeClass('hide');
            $btn.addClass('join-suc').find('em').eq(1).removeClass('iconn-41-2').addClass('iconn-62');
            $btn.parent().data('node', 'gotoGroup');
        } else {
            toast(result.message);
        }
        if (loginPopFlag) {
            loginPopFlag = 0;
            window.location.href = window.location.href;
        }
    }).fail(function() {
        toast('加入圈子失败！');
        throw new Error('join circle err!');
    });
}
//初始化加入圈子！！！
var initJoinUs = function() {
    $('.circle-list')
        .on('click', '.join-btn', function(e) {
            $btn = $(e.target).closest('.join-btn');
            switch ($btn.parent().data('node')) {
                // 未加入的
                case 'joinGroup':
                    if (!checkLoginStatus()) {
                        loginPopFlag = 1;
                        loginPop(joinCircle);
                    } else {
                        joinCircle();
                    }
                    break;
                    // 已加入的
                case 'gotoGroup':
                    window.open($btn.data('url'));
                    break;
                default:
                    throw new Error('Data-node error.');
            }
        });
};

// 不断寻觅！！！
var initGoOn = function() {
    // var defaultImagePath = $GLOBAL_CONFIG.pcimgpath + '/images/public/img-error.png';
    var topicDomain = $_CONFIG.group_domain + 'topic/';
    fetch.get(url.get('getGoOn')).done(function(data) {
        if (!data.success || !data.data.length) return;
        for (var i = 0; i < data.data.length; i++) {
            var modNum = i + 1;
            data.data[i].modelid = $_CONFIG.hbdxm + '000' + modNum;
        }
        var html = goOnTpl({
            goOnData: data.data,
            // defaultImagePath: defaultImagePath,
            topicDomain: topicDomain,
            imgpath: $GLOBAL_CONFIG.pcimgpath
        });
        $warpBox.append($(html));
        $warpBox.find('img').lazyload({
            effect: 'fadeIn',
            failure_limit: 10
        });
        // moduleFlag = 0;
    });
}

/*模块滚动加载
    var moduleFlag = 1; //接口模块加载标识
    var goOnRendered = 1; //不断寻觅加载标识
    var opts1 = {
        api: $_CONFIG['group_domain'] + 'index/recommendlist',
        container: $recommendBox,
        tpl:recommendTpl,
        callback: delArr
    }
    var opts2 = {
        api: $_CONFIG['group_domain'] + 'index/topiclist',
        container: $warpBox,
        tpl:topicTpl,
        callback: topicCb
    }
    var opts3 = {
        api: $_CONFIG['group_domain'] + 'index/productGrouplist',
        container: $warpBox,
        tpl:productGroupTpl,
        callback: prdCb
    }

    var optsArr = [opts1, opts2, opts3];

    function delArr() {
        moduleFlag = 1;
        optsArr.length ? optsArr.splice(0, 1) : void 0;
    };

    function topicCb() {
        require('../topics/checkPubStatus').init(); //发布话题
        delArr();
    };

    function prdCb() {
        delArr();
        $ggBanner = $("[data-node='indexSmall']");
        // 广告
        if (advArr.length) {
            insertGg(advArr);
        }
        // 逛逛轮播
        setTimeout(function() {
            renderBanner($ggBanner);
        }, 0);
    };
    //滚动加载模块
    function scrollLoading() {
        if ($(document).scrollTop() + $(window).height() + 400 >= $warpBox.offset().top + $warpBox.height() && moduleFlag) {
            if (optsArr.length) {
                moduleLoading(optsArr[0]);
                moduleFlag = 0;
            } else if (!optsArr.length && goOnRendered) {
                //加载不断寻觅
                initGoOn();
                goOnRendered = 0;
            }
        }
    };`
*/
var goOnFlag = 1;

function scrollLoading() {
    if (!goOnFlag) return;
    if ($(document).scrollTop() + $(window).height() + 400 >= $warpBox.offset().top + $warpBox.height()) {
        //加载不断寻觅
        initGoOn();
        goOnFlag = 0;
    }
}

function init() {
    require('../topics/checkPubStatus').init(); //发布话题

    // 广告
    if (advArr.length) {
        insertAll(advArr);
    }
    // 头部滚动   逛逛轮播
    setTimeout(function() {
        renderBanner($topBanner);
        renderBanner($ggBanner);
    }, 0);

    // 加入圈子
    initJoinUs();
    // 懒加载
    $('.opg img').lazyload({
        effect: 'fadeIn',
        failure_limit: 10
    });

    $(window).on('scroll', scrollLoading);
}

init();

/* 后台不能提供标识区分顺序和区域暂时屏蔽区分，保留备用
    function insertIndex (arr){                 //插入全部大焦点图广告
        var len = arr.length;
        for(var i = 0; i <len; i++){
            var arg = arr[i].adContents[0];
            switch(arg.position){
                case 1:
                    insertAd($banner,0,renderTopli,arg)
                    break;
                case 2:
                    insertAd($banner,1,renderTopli,arg)
                    break;
            }
        }
    }

    function insertGg (arr){                        //插入全部逛逛图广告
        var len = arr.length;
        for(var i = 0; i <len; i++){
            var arg = arr[i].adContents[0];
            switch(arg.position){
                case 1:
                    insertAd($ggBanner,0,renderGgli,arg)
                    break;
                case 2:
                    insertAd($ggBanner,1,renderGgli,arg)
                    break;
            }
        }
    }*/
