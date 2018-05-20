var fetch = require('io/fetch');
var url = require('io/url');
var tpl = require('./group.tpl');
var alert = require('module/popup/alert');

require('module/tmodHelper/showPic')();

var $container = $('[data-node=groupWrap]'); // 圈子容器
var keyword = $container.data('keyword'); // 关键字
var $loadMore = $('[data-action=loadMore]');
var $loading = $('[data-node=loading]');
// var $noload = $('[data-node=noload]');
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('searchGroup');

// 加载更多
var firing = false; // 是否正在加载
var page = 2;
var finished = false; // 数据是否全部加载完毕

var beforeLoad = function() {
    $loadMore.hide();
    $loading.show();
};

var noMoreData = function() {
    $loadMore.find('span').html('没有更多数据');
    $loadMore.off().show();
    $loading.hide();
};

var groupEvent = function() {
    $('[data-node=groupWrap]').on('click', '[data-node=groupList]', function(e) {
        if (!$(e.target).closest('a', this).length) {
            window.open($_CONFIG['group_domain'] + 'circle/' + $(this).attr('data-id') + '.html');
        }
    });
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

    fetch.get(url.get('searchGroup'), {
        data: {
            keyword: keyword,
            page: page,
            pagesize: 20
        }
    }).done(function(json) {
        if (json.code === 200) {
            var modelidPage = (page-1)*20;//埋点用的modelid增加基点
            page++;
            var groups = json.data.groups || [];
            if (groups.length == 0) {
                finished = true;
                noMoreData();
            } else {
                var modelid;
                for( var i=0;i<groups.length;i++ ){
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
                    groups[i].modelid = $_CONFIG['ssqzjg']+modelid
                }
                groups.keyword = keyword; // 关键词
                var html = tpl({
                    groups: groups
                });
                $loading.hide();
                $container.append(html);
                if (groups.length < 20) {
                    noMoreData();
                } else {
                    $loadMore.show();
                }
            }
        }
    }).fail(function() {
        alert("数据请求失败 请稍后尝试");
    }).always(function() {
        firing = false;
    });
    return false;
};

var init = function() {
    $loadMore.on('click', load); // 加载更多
    // 暂时使用js添加链接跳转
    // TODO:
    // 可能存在的坑：如果节点结构发生变化,判断逻辑可能失效
    // 如果需求希望整个card都可以跳转,在外层添加a标签是更好的做法
    groupEvent();

    /*
	
    share.shareItem($('[data-node=groupWrap]'), '[data-node=share]', function(conf){
    	conf.url = $_CONFIG.group_domain + conf.url;
    	conf.title = conf.title + '这儿有我们志趣相投的小伙伴，快加入我们吧！';
    });
    */
};

init();