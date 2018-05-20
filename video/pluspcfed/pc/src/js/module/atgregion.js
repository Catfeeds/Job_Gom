var fetch = require('io/fetch');
var Pubsub = require('io/pubsub');

var url = location.hostname.split('.');
var len = url.length;
var domain = url[len - 2] + '.' + url[len - 1];
var getCookieArea = function() {
    fetch.get($_CONFIG.ss_service_gome + 'item/v1/cookie/getregion/flag/public/ip', {
        dataType: 'jsonp',
        jsonpCallback: "ip"
    }).done(function(data) {
        var value = data.atgregion;
        if (data.success === true) {
            $.cookie('atgregion', value, {
                expires: 1,
                path: '/',
                domain: domain
            });
            Pubsub('getAreaId').pub();
        }
    })
};
module.exports = getCookieArea;
