var changeLink = require('./changeLink');

var getUrl = function(options) {
    var search = $_CONFIG.query_string;
    var url = $_CONFIG.mall_domain + 'search/index?';
    var link = changeLink(search);
    var urlStr = '';
    $.each(options, function(i, v) {
        link[i] = v;
    });
    for (var k in link) {
        urlStr += '&' + k + '=' + link[k];
    }
    urlStr = urlStr.substr(1);
    location.href = url + urlStr;
};

module.exports = getUrl;