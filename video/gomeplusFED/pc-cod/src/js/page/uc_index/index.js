/**
 * 个人中心首页推荐商品
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
var goodListTpl = require('./goodList.tpl');
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('ucenter');

var $changeGoods = $('[data-action=changeGoods]');
var $goodList = $('[data-node=recommendGoodList]');
var $dataList = $('[data-node=dataList]');

var hide = 'hide';

var firing = false;
var page = 2;
var curIndex = 0;
var finished = false;

var url = url.get('getRecommendGoods');

//加载中
var load = function() {
    if (page == 6) {
        curIndex = ++curIndex > 4 ? 0 : curIndex;
        $goodList.children('ul:not(:eq(' + curIndex + '))').addClass('hide');
        $goodList.children('ul').eq(curIndex).removeClass('hide');
        return;
    } else {
        fetch.post(url, {
            data: {
                pageNum: page
            }
        }).done(function(data) {
            if (data.success === true) {
                page++;
                curIndex = ++curIndex > 4 ? 0 : curIndex;
                var loadData = data.data || [];
                loadData.mallDomain = $_CONFIG.mall_domain;
                loadData.page = data.page;
                if (loadData.length == 0) {
                    finished = true;
                } else {
                    var html = goodListTpl({
                        list: loadData
                    });
                    $goodList.append(html);
                    $goodList.children('ul:not(:eq(' + curIndex + '))').addClass('hide');
                }
            }

        }).fail(function() {
            alert('加载失败');
        });
    }
};
var init = function() {
    $changeGoods.on('click', load);
};
init();