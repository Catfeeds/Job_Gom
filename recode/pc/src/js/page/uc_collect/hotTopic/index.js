/**
 * 加载热门话题
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
var hotTpl = require('./hotTopic.tpl');

var $hotTopic = $('[data-node=hotTopic]');
var $beforeLoad = $('[data-action=beforeLoad]');
var $topicList = $('[data-node=hotTopic] ul');

var hide = 'hide';
var firing = false;
var page = 1;
var finished = false;

var beforeLoad = function() {
    $beforeLoad.removeClass(hide);
};

var dataFail = function() {
    $beforeLoad.removeClass(hide).html('<p>一大波热门话题马上呈现～</p>')
};

//加载中
var load = function() {
    if (firing) {
        return;
    }
    if (finished) {
        return;
    }
    firing = true;
    beforeLoad();
    fetch.post(url.get('hotTopic'), {
        data: {
            pageNum: page
        }
    }).done(function(data) {
        if (data.success === true) {
            page++;
            var loadData = data.data || {};
            var hotTopic = loadData.peas || [];
            hotTopic.groupDomain = $_CONFIG.group_domain;
            if (hotTopic.length == 0) {
                finished = true;
            } else {
                $beforeLoad.addClass(hide);
                $topicList.append($(hotTpl({
                    list: hotTopic
                })));
            }
        } else {
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
    load();
};
module.exports = {
    init: init
};
