/**
 *  商品搜索页面--选择地区
 * @author Qiaoli
 */

var goodAddress = require('./goodAddress.js');
var fetch = require('io/fetch');
var url = require('io/url');
var newUrl = require('./url');
var loading = require('./loading');

var init = function() {
    goodAddress(function(data) {
        var postData = {
            provName: data[0].levelName,
            provId: parseInt(data[0].levelId, 10),
            cityName: data[1].levelName,
            cityId: parseInt(data[1].levelId, 10),
            borName: data[2].levelName,
            borId: parseInt(data[2].levelId, 10)
        };
        fetch.get(url.get('getCurrItemInfo'), {
            data: postData
        }).done(function(data) {
            if (data.success === true) {
                loading();
                newUrl({
                    'addressNodeId': postData.borId
                });
            } else {
                alert(data.message);
            }
        }).fail(function() {
            alert(data.message);
        })
    });
};
module.exports = {
    init: init
};