/**
 * 使用方法:
 * http://api.jquery.com/jQuery.ajax/
 */

/*pc平台使用 别的平台可能也会用到  先屏蔽
var prefix = ( $GLOBAL_CONFIG && $GLOBAL_CONFIG['prefix'] ) || '';
var pcHeader = {};
if(prefix){
    pcHeader = {
        'Source-Mark-Type':$.cookie(prefix +'content_ctag_type') || ''
    }
}*/

var browser =  navigator.userAgent.toLowerCase(); 

if(browser.indexOf('msie') != -1){
    var reIE = new RegExp("msie (\\d+\\.\\d+);");
    reIE.test(browser);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if(fIEVersion == '8.0' || fIEVersion == '9.0'){
        require('../plugin/jquery.xdomainrequest.js');
    }
}


var header = $EDITOR.GlobalVal.headerSet;

var fetch = function(url, options) {

    var defaults = {
        url: url,
        method: options.method,
        dataType: 'json',
        timeout: 30000
    };

    /*pc端使用 别的平台可能也会用到，暂时屏蔽
    if(prefix){
        defaults.headers = pcHeader;
    }
    */

    if(header){
        defaults.headers = header;
    }
    

    $.extend(true, defaults, options);

    return $.ajax(defaults);
};

var exp = {};
var methods = ['get', 'post'];

var forEach = function(array, fn) {
    for (var i = 0, len = array.length; i < len; i++) {
        fn.call(array, array[i], i, array);
    }
};

forEach(methods, function(method) {
    exp[method] = function(url, options) {
        options = options || {};
        options.method = method;
        return fetch(url, options);
    }
});

module.exports = exp;
