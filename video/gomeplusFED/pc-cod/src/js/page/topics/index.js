var fetch = require('io/fetch');
var url = require('io/url');
var Tiles = require('tiles');
// var praise = require('module/praise');
var share = require('module/share');
var circle = require('module/joinCircle');

// tmod helpers
require('module/tmodHelper/truncateLenByJson')();

var tpl = require('./topic.tpl');
var noTopics = require('./no_topics.tpl');
var encodeHTML = require('utils/encodeHtml');
// 发送统计
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('group');

var tiles = new Tiles({
    columnWidth: 242
}, '[data-node=tiles]');
var gid = tiles.element.attr('data-gid'); // 瀑布流容器
var t = tiles.element.attr('data-type');
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

var noMoreData = function() {
    if (page == 2) {
        $('[data-node=tiles]').append(noTopics());
        $loadMore.off();
        $loadMore.hide();
    } else {
        $($loadMore.find('a').text('没有更多数据了')).css('text-align', 'center');
        $loadMore.off();
    }
};
var loadFail = function() {
    $('[data-node=loading]').find('a').html('数据获取失败').css('text-align', 'center');
};
var load = function(e) {
    if (firing) {
        return;
    }
    if (finished) {
        noMoreData();
        return;
    }
    firing = true;
    beforeLoad();

    fetch.get(url.get('topics'), {
        data: {
            gid: gid,
            page: page,
            type: t, // 1 精品 0 全部
            pagesize: 20
        }
    }).done(function(json, textStatus, jqXHR) {
        if (json.code === 200) {
            page++;
            var data = json.data || {};
            var topics = data.topTopics || [];
            if (data.topics) {
                topics = topics.concat(data.topics);
            }
            // artTemplate不支持调用非当前作用域中的变量
            // 所以把变量绑定到传入的数据上
            topics.groupDomain = $_CONFIG.group_domain;
            topics.mallDomain = $_CONFIG.mall_domain;
            topics.group_id = $GLOBAL_CONFIG['group_id']; // 统计数据
            topics.event_id = $GLOBAL_CONFIG['event_id']; // 统计数据
            if ($.isEmptyObject(json.data)) {
                finished = true;
                $loading.hide();
                $loadMore.show();
                noMoreData();
            } else {
                tiles.appended($(tpl({
                    topics: topics
                })));
                $loading.hide();
                if (json.data.topics.length < 20) {
                    $loadMore.hide();
                } else {
                    $loadMore.show();
                }
            }
        } else {
            loadFail();
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        loadFail();
    }).always(function() {
        firing = false;
    });
    return false;
};

var init = function() {

    load(); // 加载首屏数据
    // 点赞
    // praise('[data-node=tiles]', '[data-action=like]', {
    //     mode: 'normal'
    // });
    // 加入圈子
    var $els = $('[data-action=joinGroup]');
    var approvaltype;
    if ($els) {
        approvaltype = $els.data('approvaltype');
    }
    circle('[data-action=joinGroup]', function() {
        if (approvaltype === 0) {
            $('[data-node=postTopic]').show(); // 显示发布话题按钮
        }
    });
    // 分享
    // share.shareItem('[data-node="tiles"]'); //列表部分分享
    //首页分享当前圈子（单独创建分享按钮）
    var hasShareBtnsHTML;
    var groupPicSrc = $('[data-node=groupPic]').attr('src');

    function isPic(src) {
        var reg = /\w+\.(jpg|gif|bmp|png)$/;
        var src = groupPicSrc;
        if (src == $_CONFIG.imgpath + '/images/public/circle-default.png') {
            src = false;
        }
        return reg.test(src);
    }
    var topShareOption = {
        'url': location.href,
        'title': $('[data-node=groupName]').html(),
        'pic': isPic(groupPicSrc) ? groupPicSrc : $_CONFIG.imgpath + '/images/public/logo.jpg',
        'site': '国美+'
    };
    var initShareBtns = function() {
        var shareBtns = '<p data-node="shareBtnBoxTop" class="share-down" style="z-index:21;"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-sharetop="topWeixin" class="icon icon-weixin">&#xe937;</em><em data-sharetop="topQQ" class="icon icon-qq">&#xe900;</em><em data-sharetop="topSina" class="icon icon-sina">&#xe935;</em><em data-sharetop="topQzone" class="icon icon-kongjian">&#xe902;</em></span></span></p>';
        $('[data-node=circle-top]').append(shareBtns);

        var analytic = function(channel) {
            BP.send({
                event_id: 'G000P007',
                group_id: $GLOBAL_CONFIG['group_id'],
                channel_id: channel || '',
                circle_type: $GLOBAL_CONFIG['s_c']
            });
        };

        $('[data-sharetop=topWeixin]').on('click', function() {
            var topicid = $('[data-node=tiles]').attr('data-gid');
            // https://m.gomeplus.com/group/topic?topicId=575f7ed91940eb5c2587f56a
            share.shareto.weixin({
                url: $_CONFIG.wap_url + 'group/index?groupId=' + topicid
            });
            analytic('out-weixin');
        });
        $('[data-sharetop=topQQ]').on('click', function() {
            share.shareto.qq({
                'url': location.href,
                'title': $('[data-node=groupName]').html(),
                'pic': topShareOption.pic,
                'summary': '这儿有我们志趣相投的小伙伴，快加入我们吧!',
                'site': '国美+'
            });
            analytic('out-QQ');
        });
        $('[data-sharetop=topSina]').on('click', function() {
            share.shareto.sina({
                'url': location.href,
                'title': $('[data-node=groupName]').html() + ' 这儿有我们志趣相投的小伙伴，快加入我们吧！',
                'pic': topShareOption.pic,
                'site': '国美+'
            });
            analytic('out-xlwb');
        });
        $('[data-sharetop=topQzone]').on('click', function() {
            // console.log(topShareOption.pic);
            share.shareto.qzone({
                'url': location.href,
                'title': $('[data-node=groupName]').html(),
                'pic': topShareOption.pic,
                'site': '国美+',
                'summary': '这儿有我们志趣相投的小伙伴，快加入我们吧！'
            });
            analytic('out-Qqzone');
        });
        hasShareBtnsHTML = true;
    };
    var showShareToBtns = function() {
        !hasShareBtnsHTML && initShareBtns();
        var $els = $('[data-node=bannerShare]');
        $('[data-node=shareBtnBoxTop]').css({
            left: ($els.offset().left / 1 + $els.width() / 2 - 80) + 'px',
            top: ($els.offset().top / 1 + ($els.height() - 1)) + 'px'
        }).on({
            mouseenter: function() {
                $(this).show();
            },
            mouseleave: function() {
                $(this).hide();
            }
        }).show();
    };
    $('[data-node=bannerShare]').on({
        mouseenter: function() {
            showShareToBtns();
        },
        mouseleave: function() {
            $('[data-node=shareBtnBoxTop]').hide();
            return false;
        }
    });
    $loadMore.on('click', load); // 加载更多
};

init();