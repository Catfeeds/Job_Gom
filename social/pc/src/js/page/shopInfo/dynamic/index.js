//店铺动态

var fetch = require('io/fetch');
var url = require('io/url');
var topic = require('./topicList.tpl');
var noTopic = require('./no_topic.tpl');

require('module/tmodHelper/truncateByteLen')();
require('module/tmodHelper/substrLen')();
// require('module/tmodHelper/fromNow')();

// var $topicContent = $('[data-node=topicContent]');
var $topicList = $('[data-node=shopTopic]');
var $topicLi = $('[data-node=topicList] li');
var $loadMore = $('[data-node=loadMore]');
var $loading = $('[data-node=loading]');
var $noData = $('[data-node=noMore]');
var $dataFail = $('[data-action=dataFail]');

var firing = false; //是否正在加载
var page = 1;
var finished = false; //数据是否全部加载完毕

var hide = 'hide';

//默认显示加载更多
var showMoreLoad = function() {
    $loadMore.removeClass(hide);
    $loading.addClass(hide);
};

//加载中
var beforeLoad = function() {
    $loadMore.addClass(hide);
    $noData.addClass(hide);
    $loading.removeClass(hide);
};

//加载无数据
var noData = function() {
    $loading.addClass(hide);
    $noData.removeClass(hide);
};

// 加载失败
var dataFail = function() {
    $loading.addClass(hide);
    $dataFail.removeClass(hide);
};

//获取话题列表
var getTopicList = function() {
    if (firing) {
        return;
    }
    if (finished) {
        noData();
        return;
    }
    firing = true;
    beforeLoad();
    fetch.get(url.get('dynamicGetData'), {
        data: {
            ownerUserId:$_CONFIG['ownerUserId'],//24229,//
            pageNum: page,
            pageSize: 20
        }
    }).done(function(data) {
        if (data.success === true) {
            page++;
            var list = data.data.topics;
            //表情截取
            $.each(list, function(i, v) {
                if (v.text !== "" && v.text.length > 98) {
                    var value = v.text;
                    var newVal = "";
                    var str = value.substr(0, 98);
                    var valueLeft = str.slice(0, -6);
                    var valueRight = str.slice(-6);
                    var rIndex = valueRight.indexOf('[');
                    if (rIndex > -1) {
                        newVal = valueRight.substr(0, rIndex) + '...';
                    } else {
                        newVal = valueRight + '...';
                    }
                    v.text = valueLeft + newVal;
                } else {
                    v.text = v.text;
                }
            });
            list.groupDomain = $_CONFIG.group_domain;
            list.shopname = $_CONFIG.shop_name;
            list.shopicon = $_CONFIG.shop_icon;
            if (list.length === 0) {
                finished = true;
                if (!$topicLi.length) {
                    $topicList.append(noTopic({
                        url:$_CONFIG.mall_domain,
                        shopId:$_CONFIG.shopId
                    }));
                    $loading.addClass(hide);
                } else {
                    noData();
                }
            } else {
                var html = topic({
                    list: list
                });
                if( $('[data-node=shopTopicList]').length === 0 ){
                    $topicList.append('<ul class="topic-list" data-node="shopTopicList"></ul>');
                }
                $('[data-node=shopTopicList]').append(html);
                if (list.length < 20 ) {
                    $loading.addClass(hide);
                } else {
                    showMoreLoad();
                }
            }
        } else {
            finished = true;
            dataFail();
        }
    }).fail(function() {
        dataFail();
    }).always(function() {
        firing = false;
    });
    return false;
};

var init = function() {
    $('[data-node=shopTopic]').children().remove();
    getTopicList();
    $loadMore.on('click', getTopicList);
    $dataFail.on('click', getTopicList);
};
module.exports = {
    init: init
};
