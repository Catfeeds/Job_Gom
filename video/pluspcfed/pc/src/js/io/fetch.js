/**
 * 使用方法:
 * http://api.jquery.com/jQuery.ajax/
 */

var prefix = $GLOBAL_CONFIG['prefix'] || 'mx_pc_';

var _Promise_ = function() {
    this.then = function() {
        return this;
    };
    this.done = function() {
        return this;
    };
    this.fail = function() {
        return this;
    };
    this.always = function(fn) {
        if (fn && $.isFunction(fn)) {
            fn();
        }
        return this;
    };
};

var fetch = function(url, options) {
    var defaults = {
        headers:{
            'Source-Mark-Type':$.cookie(prefix +'content_ctag_type') || ''
        },
        url: url,
        method: options.method,
        dataType: 'json',
        timeout: 30000,
        validate: false, // 发送请求前是否验证登录
        refresh: false    // 登陆后刷新当前页面 默认否
    };
    $.extend(true, defaults, options);

    if (defaults.validate) {
        var loginPop = require('module/popup/login');
        var isLogin = require('module/checkLoginStatus');
        if (!isLogin()) {
            loginPop(defaults);
            return new _Promise_();
        }
    }

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
