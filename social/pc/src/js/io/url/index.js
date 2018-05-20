var passport = require('./passport');
var mall = require('./mall');
var group = require('./group');
var order = require('./order');
var ucenter = require('./ucenter');
var activity = require('./activity');

// 方便输出调试信息
passport._name_ = 'passport';
mall._name_ = 'mall';
group._name_ = 'group';
order._name_ = 'order';
ucenter._name_ = 'ucenter';
activity._name_ = 'activity';

var urls = {};
var repeat = []; // 记录重复的url

var _extend = function(defaults) {
    for (var i = 1, len = arguments.length; i < len; i++) {
        var options = arguments[i];
        var moduleName = options._name_;
        delete options._name_;
        // 因为是内部使用,没做有参数类型检测,请确保类型正确
        for (var k in options) {
            if (typeof defaults[k] === 'undefined') {
                defaults[k] = options[k];
            } else {
                repeat.push({
                    moduleName: 'src/js/io/url/' + moduleName + '.js',
                    name: k,
                    url: defaults[k]
                });
            }
        }
    }
};

_extend(urls, passport, mall, group, order, ucenter, activity);

if (repeat.length) {
    console.table(repeat);
    throw new Error('io/url模块中注册了重名的ajax请求地址,请根据错误提示信息修改');
}

var get = function(name) {
    var url = urls[name];
    if (url && url.length) {
        return url;
    }
    throw new Error('请在js/io/url.js中注册请求地址-->' + name);
};

module.exports = {
    get: get
};