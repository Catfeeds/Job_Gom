/**
 * 他人主页加载更多话题
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
var topic = require('./topicList.tpl');
var noTopic = require('./no_topic.tpl');

require('module/tmodHelper/truncateByteLen')();
require('module/tmodHelper/substrLen')();

var $topicContent = $('[data-node=topicContent]');
var $topicList = $('[data-node=topicList]');
var $loadMore = $('[data-action=loadMore]');
var $loading = $('[data-node=loading]');
var $noData = $('[data-node=noData]');
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
    $loading.removeClass(hide);
    $dataFail.addClass(hide);
};

//加载无数据
var noData = function() {
    $loading.addClass(hide);
    $noData.removeClass(hide);
    $dataFail.addClass(hide);
};

//加载失败
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
    fetch.get(url.get('othersTopic'), {
        data: {
            ownerUserId: $_CONFIG.ownerUserId,
            pageNum: page,
            pageSize: 10
        }
    }).done(function(data) {
        if (data.success === true) {
            page++;
            var list = data.data.topics;
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
            if (list.length === 0) {
                finished = true;
                if (!$('[data-node=topicList] li').length) {
                    $topicContent.append(noTopic());
                    $loading.addClass(hide);
                } else {
                    noData();
                }
            } else {
                var html = topic({
                    list: list
                });
                $topicList.append(html);
                if (list.length < 10) {
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
    getTopicList();
    $loadMore.on('click', getTopicList);
    $dataFail.on('click', getTopicList);
};
module.exports = {
    init: init
};