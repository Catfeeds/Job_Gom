//var login = require('./login');

// 写入 $GLOBAL_CONFIG 中的部分变量到 window 供 g.js 使用
(function(w, g) {
    w.dynSite = g.dynSite;
    w.staSite = g.staSite;
    w.contextPath = g.contextPath;
    w.secureURL = g.secureURL;
    w.cookieDomain = g.cookieDomain;
    w.stageImageServer = g.stageImageServer;
    w.imgServer = g.imgServer;
    w.pictureserver = g.pictureserver;
    w.stageCssServer = g.stageCssServer;
    w.cssserver = g.cssserver;
    w.stageJsServer = g.stageJsServer;
    w.jsserver = g.jsserver;
    w.versionData = g.versionData;
    // 使 ＄ 在 window 下可见
    w['jQuery'] = $;
    w.$ = $;
})(window, window.$GLOBAL_CONFIG);


// var loginJsUrl = 'https://js.atguat.net.cn/gmlib/unit/g/1.0.0/g.js';
var loginJsUrl = $_CONFIG.js_net_server + 'gmlib/unit/g/1.0.0/g.js';
var logined = function(fn) {
    window.g.login(function() {
        if (fn) {
        	$_CONFIG['islogin'] = 1;
            fn();
        } else {
            window.location.href = window.location;
        }
    })
}

// 国美的浮层登录
var popGomeOnlineLogin = function(loginCb) {
    if (!window.g) {
        $.getScript(loginJsUrl, function() {
            logined(loginCb);
        });
    } else {
        logined(loginCb);
    }
};

module.exports = popGomeOnlineLogin;
