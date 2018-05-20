var fetch = require('io/fetch'),
    url = require('io/url'),
    dateFormat = require('utils/fecha');
var discussPage = require('./discussPage.tpl');
var discussList = require('./discussList.tpl');
var discussPageHtml = '';

var $discussBox = $('[data-node="discussBox"]');
var $discussTitle = $('[data-node="discussTitle"]');
var $discussPage = $('[data-node="discussPage"]');
var $discussList = $('[data-node="discussList"]');
var pageNum = 1;

var getDiscuss = function() {
    var proId = $GLOBAL_CONFIG.productId;
    fetch.get(url.get('getMoreDiscuss'), {
        data: {
            itemId: proId, //$GLOBAL_CONFIG.productId,
            page: pageNum
        }
    }).done(function(result) {
        if (result.code === 200) {
            var listData = result.data.itemComments;
            //列表
            if (listData.length > 0) {
                //分页数据
                discussPageHtml = discussPage({
                    data: result.data.linkUrl
                });
                $discussPage.html($(discussPageHtml).val());
                for (var i = 0, len = listData.length; i < len; i++) {
                    listData[i].solid = [];
                    listData[i].hollow = [];
                    listData[i].solid.length = listData[i].score;
                    listData[i].hollow.length = 5 - listData[i].score;
                }
            } else {
                pageNum === 1 && $discussPage.remove();
            }

            $discussList.html(
                discussList({
                    data: listData
                })
            );
        }
    });
};
var init = function() {

    getDiscuss();
    $discussPage.on('click', 'a', function() {
        var currentPage = $(this).attr('data-current');
        if (currentPage !== undefined) {
            currentPage = parseInt(currentPage, 10);
            pageNum = currentPage;
            getDiscuss();
        }
    });

};
module.exports = init;