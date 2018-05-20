var fetch = require('io/fetch');
var url = require('io/url');

var tpl = require('./topics.tpl');
var Tiles = require('tiles');
var alert = require('module/popup/alert');
require('module/tmodHelper/showPic')();
require('module/tmodHelper/truncateByteLen')();
require('module/tmodHelper/othersLink')();

// 发送统计数据用
// var buriedPoint = require('utils/buriedPoint');
// buriedPoint.setPageData('searchTopic');

var tiles = new Tiles({
    columnWidth: 242
}, '[data-node=tiles]');
var getQueryString = function(name) {
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
var r = window.location.search.substr(1).match(reg);
if (r != null) return unescape(r[2]); return null;
}
var keyword = getQueryString('tagId');
var $loadMore = $('[data-action=loadMore]');
var $loading = $('[data-node=loading]');
// 加载更多
var firing = false; // 是否正在加载
var page = 1;
var finished = false; // 数据是否全部加载完毕

var beforeLoad = function() {
    $loadMore.hide();
    $loading.show();
};

var noMoreData = function(str) {
    var msg = str || '没有更多数据';
    $loadMore.find('span').html(msg);
    $loadMore.off().show();
    $loading.hide();
};

var load = function() {
    if (firing) {
        return;
    }
    if (finished) {
        noMoreData();
        return;
    }
    firing = true;
    beforeLoad();
    fetch.get(url.get('searchLabel'), {
        data: {
            tagId: keyword,
            pageNum: page,
            pageSize: 20
        }
    }).done(function(json /*, textStatus, jqXHR*/ ) {
        if (json.code === 200) {
            var modelidPage = (page-1)*20;//埋点用的modelid增加基点
            page++;
            var topics = json.data.topics || [];
            if (topics.length == 0) {
                finished = true;
                noMoreData('无相关话题');
            } else {
                $loading.hide();
                // 增加modelid埋点
                var modelid;
                for( var i=0;i<topics.length;i++ ){
                	modelid = i+modelidPage+1+'';
                    switch (modelid.length){
                        case 1:
                            modelid = '000'+modelid;
                            break;
                        case 2:
                            modelid = '00'+modelid;
                            break;
                        case 3:
                            modelid = '0'+modelid;
                            break;
                        default:
                            modelid = modelid;
                    }
                    topics[i].modelid = $_CONFIG['sshtjg'] + modelid;
                }
                topics.group_domain = $_CONFIG.group_domain;
                tiles.appended($(tpl({
                    topics: topics
                })));
                if (topics.length < 20) {
                    $loadMore.off().hide();
                    $loading.hide();
                } else {
                    $loadMore.show();
                }
            }
        } else {
            finished = true;
            noMoreData();
        }
    }).fail(function() {
        alert("数据请求失败 请稍后尝试");
    }).always(function() {
        firing = false;
    });
    return false;
};

var init = function() {
    load();
    $loadMore.on('click', load); // 加载更多

    /*
    share.shareItem($('[data-node=groupWrap]'), '[data-node=share]', function(conf){
    	conf.url = $_CONFIG.group_domain + conf.url;
    	conf.title = conf.title + '这儿有我们志趣相投的小伙伴，快加入我们吧！';
    });
    */
};
init();
