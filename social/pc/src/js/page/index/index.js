require('../../plugin/jquery.bxslider');
var checkPub = require('../topics/checkPubStatus');

// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('home');

var advArr = $_CONFIG['advert'] || [],
    topArr = $_CONFIG['topAd'],
    ggArr = $_CONFIG['ggAd'];
var $topBanner = $("[data-node='banner']"), //头部广告
    $ggBanner = $("[data-node='indexSmall']"); //逛逛广告

function insertAd($parent, num, fn, arg) { //插入单帧广告
    $parent.find("li").eq(num).after(fn(arg));
    var $li = $parent.find("li"); //dom节点已发生变化 需重新获取
    var k = Array.prototype.slice.call($li, 6);
    $(k[0]).remove();
    checkImpressionUrl(arg);
}

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

function checkImpressionUrl(arg) { //检测URL,延迟执行
    setTimeout(function() {
        var con = $.parseJSON(arg.content),
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
    var con = $.parseJSON(arg.content),
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
                pagerTriggerEvent: 'mouseover',
            });
        } else {
            $obj.find('li').css('float', 'none');
        }
    }
}

function init() {
    if (advArr.length) {
        insertAll(advArr);
    }
    setTimeout(function() {
        renderBanner($topBanner, $ggBanner);
    }, 0)
    checkPub.init();
}
init()

/* 后台不能提供标识区分顺序和区域暂时屏蔽区分，保留备用
function insertIndex (arr){					//插入全部大焦点图广告
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

function insertGg (arr){						//插入全部逛逛图广告
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
}
*/