/*
 * uba-sdk v1.3.5, bundle: 2017-06-06 13:55
 * (c) 2017 gomeBigData
 */
(function () {
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var win = typeof window !== 'undefined' ? window : self;
var PAGE_ID = 'page_id';
var dataUrl = {
    pre: '//point-pre.gomeplus.com/bomber-api/sdk/point',
    pro: '//point.gomeplus.com/bomber-api/sdk/point'
};
var doc = document;
var scr = win.screen;
var nav = navigator;
var ua = nav.userAgent;
var prtl = 'https:' === win.location.protocol ? 'https://' : 'http://';
var host = 'beacon.gomeplus.com/';
var gifurl = prtl + host + 'log?';


// 防止BPConfig不存在的情况
window['BPConfig'] = window['BPConfig'] || {};
var pageHost = window.location.host;

var PLUS_REGEX = /\.?(.+)\.gomeplus\.com/;
var GOME_REGEX = /^(.+\.)*gome\.com\.cn/;
var hostList = [
    { key: 'dc-7', rule: /pre|dev|test|atg|uat/ },
    { key: 'dc-14', rule: /^(.+\.)*wap\.gomegj\.com/ },
    { key: 'dc-10', rule: /^(.+\.)*diy\.gome\.com\.cn/ },
    { key: 'dc-12', rule: /^(.+\.)*m\.gomehigo\.hk/ },
    { key: 'dc-2', rule: /^(.+\.)*(m\.gome\.com\.cn|m\.gomeplus\.com)/ },
    { key: 'dc-6', rule: /^(.+\.)*gomehigo\.hk/ },
    { key: 'dc-1', rule: GOME_REGEX },
    { key: 'dc-13', rule: /^(.+\.)*gomegj\.com/ },
    { key: 'dc-16', rule: PLUS_REGEX } // 国美Plus PC端 pri: 3
];
// export let env = 'pre';
var tid = window['BPConfig'].tid;
var isGomePlus = PLUS_REGEX.test(pageHost);
if (tid == null) {
    for (var _i = 0, hostList_1 = hostList; _i < hostList_1.length; _i++) {
        var data = hostList_1[_i];
        if (data.rule.exec(pageHost)) {
            tid = data.key;
            break;
        }
    }
    window['BPConfig'].tid = tid;
}

var domainList = [
    'gomegj.com',
    'gome.com.cn',
    'gomehigo.hk',
    'gomeplus.com',
    'atguat.com.cn'
];
var mainhost;
for (var i = 0, len = domainList.length; i < len; i++) {
    var dm = domainList[i];
    if (pageHost.indexOf(dm) > -1) {
        mainhost = dm;
        break;
    }
}

var isGomeWebView = (/gomeplus/i).test(ua);
var isPhantomJSUser = (/PhantomJSUser/i).test(ua);
var allowBindClick = !isGomeWebView;
// export const allowPlusHack = allowBindClick && isGomePlus;
// export const allowBindClick = !isGomeWebView && isGomePlus;
var allowInitLog = allowBindClick || !!tid;
var allowSendLog = !isPhantomJSUser && allowInitLog;

function permit(isOK) {
    return function (constructor) {
        constructor.enable = isOK;
    };
}
function before(loadFunc) {
    return function (constructor) {
        constructor.load = loadFunc;
    };
}

// 从字符串 src 中查找 k+sp 和  e 之间的字符串，如果 k==e 且 k 只有一个，或者 e 不存在，从 k+sp 截取到字符串结束
// abcd=1&b=1&c=3;
// abdc=1;b=1;a=3;
var stringSplice = function (src, k, e, sp) {
    if (src === "") {
        return "";
    }
    sp = (sp === "") ? "=" : sp;
    k += sp;
    var ps = src.indexOf(k);
    if (ps < 0) {
        return "";
    }
    ps += k.length;
    var pe = src.indexOf(e, ps);
    if (pe < ps) {
        pe = src.length;
    }
    return src.substring(ps, pe);
};
// 惰性函数trim

var jsonToQuery = function (json) {
    var query = '';
    for (var i in json) {
        if (json.hasOwnProperty(i)) {
            query += i + '=' + json[i] + '&';
        }
    }
    return query.substr(0, query.length - 1);
};
// 惰性函数addEvent
var JSONParse = function () {
    if (win['JSON']) {
        return JSON.parse;
    }
    else {
        return function (jsonstr) {
            return (new Function("return" + jsonstr))();
        };
    }
}();
var insertQuery = function (href, json) {
    var query = jsonToQuery(json);
    if (!query) {
        return false;
    }
    // 提取可能的锚点
    var hash = href.match(/(.+?)(#.*)$/);
    var _href;
    if (hash) {
        _href = hash[1];
        hash = hash[2];
    }
    else {
        _href = href;
    }
    return (_href.indexOf('?') > -1 ? _href + "&" + query : _href + "?" + query) + (hash || '');
};

var getCookie = function (ckName) {
    if (undefined === ckName || "" === ckName) {
        return "";
    }
    return stringSplice(doc.cookie, ckName, ";", "");
};
// 写Cookie
var setCookie = function (ckName, ckValue, ckDays, ckDomain, times) {
    if (times === void 0) { times = 86400000; }
    if (ckValue != null) {
        var cookie = ckName + "=" + ckValue + ";path=/";
        if (ckDays) {
            var now = new Date();
            var time = now.getTime();
            time = time + times * ckDays;
            now.setTime(time);
            // time = now.getTime();
            cookie += ";expires=" + now.toUTCString();
        }
        ckDomain && (cookie += ";domain=" + ckDomain);
        doc.cookie = cookie;
    }
};
// 删cookie

var isMobile = function () {
    try {
        doc.createEvent("TouchEvent");
        return true;
    }
    catch (e) {
        return false;
    }
}();
// 闭包封闭img，防止低版本浏览器请求丢失
var sendRequest = function () {
    var imgs = [];
    return function (url) {
        if (allowSendLog) {
            var img = new Image();
            imgs.push(img);
            img.src = url;
        }
    };
}();
var collects = function (Type, pre) {
    var data = [];
    for (var i in Type) {
        if (Type.hasOwnProperty(i)) {
            data.push(i + ':' + Type[i]());
        }
    }
    return pre + data.join('|');
};
var getSource = function () {
    return 'source=' + encodeURIComponent(stringSplice(win.location.href, "source", "&", ""));
};
var getWm = function () {
    return 'wm=' + (isMobile ? 'm' : 'www');
};
var getRandom = function () {
    var now = new Date();
    return Math.ceil(Math.random() * 1000000000000) + "." + now.getTime();
};
function getSubDomain(str, pattern) {
    if (pattern === void 0) { pattern = PLUS_REGEX; }
    var matched = str.match(pattern);
    return (matched && matched[1]);
}
var querySelector = function (_selector) {
    if (!document.querySelector) {
        querySelector = function (selector) {
            var head = document.documentElement.firstChild;
            var styleTag = document.createElement("STYLE");
            if (head) {
                head.appendChild(styleTag);
                document['__qsResult'] = [];
                styleTag['styleSheet'].cssText = selector + "{x:expression(document.__qsResult.push(this))}";
                window.scrollBy(0, 0);
                head.removeChild(styleTag);
                return document['__qsResult'][0] || null;
            }
        };
    }
    else {
        querySelector = function (selector) { return document.querySelector(selector); };
    }
    return querySelector(_selector);
};

var isReady = false;
var domReadyCbs = [];
var ready = function () {
    if (isReady) {
        return;
    }
    else {
        isReady = true;
        // dom ready
        for (var i = 0; i < domReadyCbs.length; i++) {
            domReadyCbs[i]();
        }
    }
};
var domReady = function (cb) {
    domReadyCbs.push(cb);
    if (doc.readyState === "complete") {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        setTimeout(ready, 1);
    }
    else if (doc.addEventListener) {
        doc.addEventListener("DOMContentLoaded", ready, false);
        // A fallback to window.onload, that will always work
        win.addEventListener("load", ready, false);
        // If IE event model is used
    }
    else {
        doc['attachEvent']("onreadystatechange", ready);
        // A fallback to window.onload, that will always work
        win['attachEvent']("onload", ready);
        // If IE and not a frame
        // continually check to see if the document is ready
        var top = false;
        try {
            top = window.frameElement === null && document.documentElement;
        }
        catch (e) { }
        // 如果是非iframe的情况，并且支持doScroll方法
        if (top && top['doScroll']) {
            (function doScrollCheck() {
                if (!isReady) {
                    try {
                        top['doScroll']("left");
                    }
                    catch (e) {
                        return setTimeout(doScrollCheck, 50);
                    }
                    // and execute any waiting functions
                    ready();
                }
            })();
        }
    }
};
var addEvent = function () {
    if (doc['attachEvent']) {
        return function (ele, type, func) {
            ele.attachEvent('on' + type, func);
        };
    }
    else if (doc.addEventListener) {
        return function (ele, type, func) {
            ele.addEventListener(type, func, false);
        };
    }
    else {
        return function (ele, type, func) {
            console.log('Unknown browser support neither attachEvent nor attachEvent!');
        };
    }
}();

var mixin = function (source, target) {
    for (var i in target) {
        if (target.hasOwnProperty(i)) {
            source[i] = target[i];
        }
    }
    return source;
};

/**
 * bp.js 代码目标要求：
 * 1，无依赖。
 * 2，不影响页面其他性能，有对外事件广播
 * 3，收集包括，客户端信息，用户信息，前端性能信息，行为统计信息
 *  版本控制使用php静态方法,模板页面也是[初订]
 *  4,active_no
 */
var ref = doc.referrer.toLowerCase();
var COOKIE_PHPSID = 'mx_wap_gomeplusid';
var COOKIE_PHPPCID = 'mx_pc_gomeplusid';
var COOKIE_NEW = 'isnew';
var COOKIE_SSID = 'ssid';
var COOKIE_LASTTIME = 'plasttime';
// 客户端信息
var CI = {
    // 取得屏幕尺寸
    screen_size: function () {
        return scr.width + "x" + scr.height;
    },
    // 取得屏幕色深
    color_depth: function () {
        return scr.colorDepth || '';
    },
    // 取得 appCode
    app_code: function () {
        return nav.appCodeName || '';
    },
    // 取得 appName
    app_name: function () {
        return (nav.appName.indexOf('Microsoft Internet Explorer') > -1) ? 'MSIE' : nav.appName;
    },
    // 取得 cpu
    cpu: function () {
        return nav['cpuClass'] || nav['oscpu'] || "";
    },
    // 取得 platform
    platform: function () {
        return nav.platform || '';
    },
    // 取得网络连接类型
    network: function () {
        var ct = "";
        // android 2.2 webkit 新 API
        ct = (nav['connection'] && nav['connection'].type) ? nav['connection'].type : ct;
        if (ct) {
            return ct;
        }
        try {
            doc.body['addBehavior']("#default#clientCaps");
            ct = doc.body['connectionType'];
        }
        catch (e) {
            ct = "-";
        }
        return ct;
    },
    // 取得系统语言
    language: function () {
        return nav['systemLanguage'] || nav.language || '';
    },
    // 取得时区
    timezone: function () {
        return new Date().getTimezoneOffset() / 60 || "";
    },
    // 取得 Flash 版本
    flash_ver: function () {
        var f = "-", n = navigator, ii;
        if (n.plugins && n.plugins.length) {
            for (ii = 0; ii < n.plugins.length; ii++) {
                if (n.plugins[ii].name.indexOf('Shockwave Flash') !== -1) {
                    f = n.plugins[ii].description.split('Shockwave Flash ')[1];
                    break;
                }
            }
        }
        else if (win['ActiveXObject']) {
            for (ii = 10; ii >= 2; ii--) {
                try {
                    var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
                    if (fl) {
                        f = ii + '.0';
                        break;
                    }
                }
                catch (e) {
                    // console.log(e);
                }
            }
        }
        return f;
    },
    ua: function () {
        return encodeURIComponent(ua);
    }
};
// 页面信息
var PI = {
    pagename: function () {
        return encodeURIComponent(document.title || '-');
    },
    // 获取页面 document.referer
    referrer: function () {
        var re = /^[^?&#]*.swf([?#])?/;
        // 如果页面 Referer 为空，从 URL 中获取
        if ((ref === "") || (ref.match(re))) {
            ref = stringSplice(win.location.href, "ref", "&", "");
            if (ref !== "") {
                return encodeURIComponent(ref);
            }
        }
        return encodeURIComponent(ref);
    },
    // 获取当前页是否为浏览器默认首页
    is_homepage: function () {
        var isHome = "";
        try {
            doc.body['addBehavior']("#default#homePage");
            isHome = doc.body['isHomePage'](win.location.href) ? "Y" : "N";
        }
        catch (e) {
            isHome = "unkown";
        }
        return isHome;
    },
    // 获取页面 DOM 数
    dom_count: function () {
        return doc.getElementsByTagName("*").length || "";
    },
    // 获取页面 iframe 数
    iframe_count: function () {
        return doc.getElementsByTagName("iframe").length;
    },
    url: function () {
        return encodeURIComponent(win.location.href.replace(/(intcmp|cmpid)=[^&]+&?/g, '').replace(/[?&]*(#.*)?$/, ''));
    },
    tid: function () {
        return tid || '';
    }
};
// 用户信息
var UI = {
    phpsid: function () {
        var phpsid = getCookie(COOKIE_PHPSID) || getCookie(COOKIE_PHPPCID);
        return phpsid;
    },
    ssid: function () {
        // // 清除上个版本保存一年的ssid cookie
        // // 注意delCookie仅删除domain为location.host的ssid，若后续该方法修改，务必核查此处
        // utils.delCookie(COOKIE_SSID);
        var sid = getCookie(COOKIE_SSID);
        if (sid === "") {
            // 长期保存，默认为1年（365天）
            sid = getRandom();
            setCookie(COOKIE_SSID, sid, 365 * 5, mainhost);
        }
        return sid;
    },
    is_new: function () {
        // 7天是否访问过此页面
        var nid = getCookie(COOKIE_NEW);
        if (nid === "") {
            nid = getRandom();
            setCookie(COOKIE_NEW, nid, 7);
            return 1;
        }
        else {
            return 0;
        }
    },
    // 用户信息
    uid: function () {
        return window['userId'] || '';
    },
    shop_id: function () {
        var shopid = win.BPConfig.shop_id;
        return shopid || '';
    },
    produce_id: function () {
        var produceid = win.BPConfig.produce_id;
        return produceid || '';
    },
    group_id: function () {
        return win.groupId ? win.groupId : '';
    },
    topic_id: function () {
        return win.topicId ? win.topicId : '';
    },
    channel: function () {
        var channel = win.BPConfig.channel;
        return channel || '';
    }
};
// 特别信息
var SI = {
    last_time: function () {
        var ret = getCookie(COOKIE_LASTTIME);
        if (win.BPConfig.serverTime) {
            if (!ret) {
                ret = win.BPConfig.serverTime;
            }
            setCookie(COOKIE_LASTTIME, win.BPConfig.serverTime, 365);
        }
        else {
            var time = Math.round(new Date().getTime() / 1000);
            if (!ret) {
                ret = time;
            }
            setCookie(COOKIE_LASTTIME, time, 365);
        }
        return ret;
    },
    active_no: function () {
        return win.active_no ? win.active_no : '-';
    },
    page_id: function () {
        return win[PAGE_ID] ? win[PAGE_ID] : '-';
    },
    page_name: function () {
        return win._page_name_ ? win._page_name_ : '-';
    }
};
// 性能信息 -> 需要页面header部署startTime,headEndTime
// 如果没有则不统计
var startTime = win.BPConfig.startTime;
var headEndTime = win.BPConfig.headEndTime;
var loadTime;
var readyTime;
var P = {
    sdate: function () {
        if (win.BPConfig.serverTime) {
            return win.BPConfig.serverTime;
        }
        return '-';
    },
    load_time: function () {
        if (startTime && loadTime) {
            return loadTime - startTime;
        }
        return '-';
    },
    ready_time: function () {
        if (startTime && readyTime) {
            return readyTime - startTime;
        }
        return '-';
    },
    first_screen_time: function () {
        if (headEndTime && startTime) {
            return headEndTime - startTime;
        }
        return '-';
    },
    dict_v: function () {
        return '2017030301';
    }
};
var BP = {
    getPvData: function () {
        // 页面进入的全局统计->算一次pv
        var CIDATA = collects(CI, 'CI=');
        var PIDATA = collects(PI, 'PI=');
        var UIDATA = collects(UI, 'UI=');
        var PDATA = collects(P, 'P=');
        var SDATA = collects(SI, 'SI=');
        var urlDATA = [CIDATA, PIDATA, UIDATA, PDATA, SDATA].join('&') + '&' + getSource();
        return urlDATA;
    },
    pvLog: function () {
        var url = gifurl + getWm() + '&' + this.getPvData();
        sendRequest(url);
    },
    getExt: function () {
        var ext = [collects(PI, 'PI='), collects(P, 'P='), getWm(), collects(UI, 'UI=')].join('&');
        return ext;
    },
    send: function (data) {
        var urlDATA = jsonToQuery(data);
        if (urlDATA) {
            var url = gifurl + this.getExt() + '&' + urlDATA;
            
            sendRequest(url);
        }
    }
};
// 处理超时和ios9下href改变不触发window.load的问题
var bpOnce = false;
function init() {
    function setPV() {
        if (!bpOnce && allowInitLog) {
            BP.pvLog();
            bpOnce = true;
            
        }
    }
    domReady(function () {
        readyTime = new Date().valueOf();
        // 3秒不触发onload，主动触发onload
        setTimeout(function () {
            setPV();
        }, 3000);
    });
    addEvent(window, 'load', function () {
        loadTime = new Date().valueOf();
        if (!readyTime) {
            readyTime = loadTime;
        }
        setPV();
    });
}

var PROP_SUDA = 'sudaData';
var PROP_HREF = 'href';
var PROP_HREF_ADDIN = 'insertJson';
var PROP_CURRENT_NODE = 'target';
var PROP_A_NODE = 'atarget';
var SUDA_META = 'bp-data';
var MOD_META = 'modelid';
var BP_BLOCK = 'block';
var BP_POINT = 'point';

var Suda = (function () {
    function Suda() {
        this.done = false;
    }
    Suda.prototype.process = function (store, _a, _b) {
        var assignSuda = _a.assignSuda;
        var getCurrentTarget = _b.getCurrentTarget;
        var target = getCurrentTarget(store);
        if (target.hasAttribute(SUDA_META)) {
            var metaData = target.getAttribute(SUDA_META); // json格式
            var data = {};
            try {
                data = JSONParse(metaData);
            }
            catch (err) {
                data.error = "JSON parse error, please check " + SUDA_META;
            }
            if (!data.name) {
                data.name = '-';
            }
            assignSuda(store, data);
            this.done = true;
        }
    };
    return Suda;
}());
Suda = __decorate([
    permit(allowBindClick && isGomePlus)
], Suda);
var Suda$1 = Suda;

// Get XMLHttpRequest object
var xdr;
var getXHR = win.XMLHttpRequest ? function () {
    return new win.XMLHttpRequest();
} : function () {
    return new win.ActiveXObject('Microsoft.XMLHTTP');
};
var xhr2 = (getXHR().responseType === '');
function Xget(url, data, options) {
    this.headers = {
        Accept: '*/*',
        'Cache-Control': ''
    };
    this.callback = options.callback;
    this.errHandler = options.errHandler || function (msg) {
        
    };
    // Prepare URL
    // 注意在此之前手动encodeURIComponent
    this.url = url + '?' + jsonToQuery(data);
    this.options = {
        _async: true,
        timeout: 30000,
        attempts: 2
    };
    this.attempts = 0;
    this.aborted = false;
    // timeout id
    this.timeoutid = null;
}
Xget.prototype.abort = function () {
    if (!this.aborted) {
        if (this.xhr && this.xhr.readyState != 4) {
            // https://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
            this.xhr.abort();
        }
        this.aborted = true;
    }
};
Xget.prototype.handleResponse = function (xhr) {
    if (xhr === void 0) { xhr = this.xhr; }
    clearTimeout(this.timeoutid);
    // Verify if the request has not been previously aborted
    if (this.aborted) {
        return;
    }
    // Handle response
    try {
        // Process response
        if (xhr.responseType == 'json') {
            if ('response' in xhr && xhr.response === null) {
                throw 'The request response is empty';
            }
            this.response = xhr.response;
        }
        else {
            this.response = JSONParse(xhr.responseText);
        }
        // Late status code verification to allow passing data when, per example, a 409 is returned
        // --- https://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
        if ('status' in xhr && !/^2|1223/.test(xhr.status)) {
            throw xhr.status + ' (' + xhr.statusText + ')';
        }
        // Fulfilled
        this.callback(this.response);
    }
    catch (e) {
        // Rejected
        this.handleError(e.message);
    }
};
Xget.prototype.handleTimeout = function () {
    if (!this.aborted) {
        if (!this.options.attempts || ++this.attempts != this.options.attempts) {
            this.xhr.abort();
            this.send();
        }
        else {
            this.handleError('Timeout (' + this.url + ')');
        }
    }
};
Xget.prototype.handleError = function (message) {
    if (!this.aborted) {
        message = typeof message === 'string' ? message : 'Connection aborted';
        this.abort();
        this.errHandler(message);
    }
};
Xget.prototype.send = function (_a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, _c = _b.method, method = _c === void 0 ? 'get' : _c, _d = _b.url, url = _d === void 0 ? this.url : _d, _e = _b.options, options = _e === void 0 ? this.options : _e, _f = _b.headers, headers = _f === void 0 ? this.headers : _f;
    // Get XHR object
    var xhr = getXHR();
    if (win.XDomainRequest) {
        xhr = new win.XDomainRequest(); // CORS with IE8/9
        xdr = true;
    }
    // Open connection
    if (xdr) {
        xhr.open(method, url);
    }
    else {
        xhr.open(method, url, options._async);
    }
    this.xhr = xhr;
    // Set headers
    if (!xdr) {
        for (var i in headers) {
            if (headers[i]) {
                xhr.setRequestHeader(i, headers[i]);
            }
        }
    }
    // Plug response handler
    if (xhr2 || xdr) {
        xhr.onload = function () {
            _this.handleResponse.apply(_this);
        };
        xhr.onerror = function () {
            _this.handleError.apply(_this);
        };
        // http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
        if (xdr) {
            xhr.onprogress = function () { };
        }
    }
    else {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                _this.handleResponse.apply(_this);
            }
        };
    }
    // Plug timeout
    if (options._async) {
        if ('timeout' in xhr) {
            xhr.timeout = options.timeout;
            xhr.ontimeout = function () {
                _this.handleTimeout.apply(_this);
            };
        }
        else {
            this.timeoutid = setTimeout(function () {
                _this.handleTimeout.apply(_this);
            }, options.timeout);
        }
        // http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
    }
    else if (xdr) {
        xhr.ontimeout = function () { };
    }
    // Send request
    if (xdr) {
        // https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
        setTimeout(function () {
            xhr.send(null);
        }, 0);
    }
    else {
        xhr.send(null);
    }
};

var bps;
var bplength = 0;
// getSelector
function setData(dataArray) {
    bps = dataArray;
    bplength = dataArray.length;
}
function fetchData() {
    var pageUrl = PI.url();
    var fetchurl = dataUrl[tid === 'dc-7' ? 'pre' : 'pro'];
    var params = {
        pageUrl: pageUrl,
        platform: isMobile ? 'H5' : 'PC'
    };
    
    if (fetchurl) {
        var getAjax = new Xget(fetchurl, params, {
            callback: function (res) {
                if (res.code === '200' && res.iserror === '0') {
                    var data = void 0;
                    if ((data = res.data) && (data = data.result)) {
                        setData(data);
                    }
                    else {
                        
                    }
                }
                else {
                    
                }
            }
        });
        getAjax.send();
    }
    else {
        
    }
}

var UBA = (function () {
    function UBA(store, actions, _a) {
        var getCurrentTarget = _a.getCurrentTarget;
        var target = getCurrentTarget(store);
        this.done = false;
        // 拷贝筛选bps
        this._filterd = [];
        this._blocks = [];
        this._points = [];
        // 找到了精确埋点
        this.ptfound = false;
        // 当前埋点是精确埋点
        // let ptfoundCurr = false;
        // 找到了区块埋点
        this.blockfound = false;
        this.ubaparam = [];
        var haserr = false;
        for (var i = 0; i < bplength; i++) {
            var t = bps[i];
            var s = t.selector;
            var node = void 0;
            try {
                node = querySelector(s);
                this._filterd.push(t);
            }
            catch (e) {
                // 选择器获取失败
                
                haserr = true;
            }
            if (node) {
                // block
                if (t.type === BP_BLOCK) {
                    this._blocks.push({
                        node: node,
                        data: t
                    });
                }
                else if (!this.ptfound && (t.type === BP_POINT)) {
                    // 很大概率 直接找到
                    if (target === node) {
                        this.ptfound = true;
                        this.ubaparam.push(t);
                    }
                    else {
                        this._points.push({
                            node: node,
                            data: t
                        });
                    }
                }
            }
        }
        // 去除非法的选择器
        if (haserr) {
            setData(bps);
        }
    }
    UBA.prototype.process = function (store, actions, _a) {
        var getCurrentTarget = _a.getCurrentTarget;
        var target = getCurrentTarget(store);
        // 查找精确埋点
        // 标识当前target是否为精确埋点
        var ptfoundCurr = false;
        if (!this.ptfound && !this.blockfound) {
            var _points = this._points;
            for (var i = 0, l = _points.length; i < l; i++) {
                if (_points[i].node === target) {
                    // 找到了精确埋点
                    this.ubaparam.push(_points[i].data);
                    this.ptfound = true;
                    ptfoundCurr = true;
                    break;
                }
            }
        }
        // 向上查找区块
        if (!ptfoundCurr) {
            var blockfoundIndex = void 0;
            var _blocks = this._blocks;
            for (var i = 0, l = _blocks.length; i < l; i++) {
                if (_blocks[i].node === target) {
                    // 找到了区块埋点
                    this.ubaparam.push(_blocks[i].data);
                    this.blockfound = true;
                    blockfoundIndex = i;
                    break;
                }
            }
            // 去除已找到的区块
            if (blockfoundIndex != null) {
                _blocks.splice(blockfoundIndex, 1);
            }
        }
    };
    UBA.prototype.post = function (store, _a) {
        var updateSuda = _a.updateSuda;
        var bpdata = this.ubaparam;
        if (bpdata.length) {
            var UBAid = bpdata[0]._point_id;
            var UBA_1 = '';
            for (var i = 0, l = bpdata.length; i < l; i++) {
                UBA_1 += bpdata[i].pointParam + '|';
            }
            UBA_1 = UBA_1.slice(0, -1).replace(/=/g, ':').replace(/&/g, '|');
            updateSuda(store, 'UBA', UBA_1);
            updateSuda(store, 'UBAid', UBAid);
        }
    };
    return UBA;
}());
UBA = __decorate([
    before(fetchData),
    permit(allowBindClick && !GOME_REGEX.test(pageHost))
], UBA);
var UBA$1 = UBA;

var INTCMP_REGEX = /([?&])intcmp=(.+?)(&(.+))?(#.*)?$/;
var rcb = function (s, g1, g2, g3, g4, g5) {
    if (g4) {
        return g1 + g4 + (g5 || '');
    }
    else {
        return (g5 || '');
    }
};
function cleanIntcmp(str) {
    return str.replace(INTCMP_REGEX, rcb);
}
function getIntcmp(href) {
    var matched = href.match(INTCMP_REGEX);
    return (matched && matched[2]);
}
// 计算元素下, target是第几个a标签
function calcTagNum(node, target) {
    var count = 0;
    var found = false;
    var list = node.children;
    for (var i = 0, l = list.length; i < l; i++) {
        var child = list[i];
        if (child.tagName.toLowerCase() === 'a') {
            if (child === target) {
                found = true;
                break;
            }
            count++;
            // 跳过有modelid的属性
        }
        else if (!child.hasAttribute(MOD_META)) {
            var res = calcTagNum(child, target);
            count += res.count;
            if (res.found) {
                return { count: count, found: true };
            }
        }
    }
    return { count: count, found: found };
}

var Intcmp = (function () {
    function Intcmp() {
        this.done = false;
    }
    Intcmp.prototype.process = function (store, actions, _a) {
        var getCurrentTarget = _a.getCurrentTarget;
        var target = getCurrentTarget(store);
        if (target.hasAttribute(MOD_META)) {
            this.modelid = target.getAttribute(MOD_META);
            this.modeltarget = target;
            this.done = true;
        }
        else {
            if (!this.atarget && (target.tagName.toLowerCase() === 'a') && (target.href.indexOf('javascript') === -1)) {
                this.atarget = target;
            }
        }
    };
    Intcmp.prototype.post = function (store, _a) {
        var setATag = _a.setATag, updateSuda = _a.updateSuda, setHref = _a.setHref, updateHrefJson = _a.updateHrefJson;
        var atarget = this.atarget;
        if (atarget) {
            var href = atarget.href;
            var intcmp = void 0;
            // pageid在其他js中赋值， 所以不能提前取得
            var pageid = win[PAGE_ID] || getSubDomain(pageHost) || 'null';
            // updateHref(store, )
            if (this.modelid) {
                var count = calcTagNum(this.modeltarget, atarget).count;
                intcmp = pageid + "-" + this.modelid + "-" + count;
                updateSuda(store, 'intcmp', intcmp);
            }
            else {
                intcmp = getIntcmp(href);
                if (intcmp) {
                    updateSuda(store, 'intcmp', intcmp);
                }
            }
            href = cleanIntcmp(href);
            intcmp && updateHrefJson(store, 'intcmp', intcmp);
            setHref(store, href);
            setATag(store, atarget);
        }
    };
    return Intcmp;
}());
Intcmp = __decorate([
    permit(allowBindClick && isGomePlus)
], Intcmp);
var Intcmp$1 = Intcmp;

var CMPID_REGEX = /([?&])cmpid=(.+?)(&(.+))?(#.*)?$/;
var CMPID_FLAG = 'plus_';
var cmpid;
function storeCmpid(href, host, time) {
    
    var matched = href.match(CMPID_REGEX);
    cmpid = (matched && matched[2]);
    if (cmpid) {
        if (cmpid.indexOf(CMPID_FLAG) !== 0) {
            cmpid = CMPID_FLAG + cmpid;
        }
        // store it to cookie
        setCookie('cmpid', cmpid, time, host, 60000);
    }
    return cmpid;
}
function getCmpid() {
    return cmpid || (cmpid = getCookie('cmpid'));
}

var DOMAIN_REGEX = /^(https?:)?\/\//;
var Cmpid = (function () {
    function Cmpid() {
    }
    Cmpid.prototype.post = function (store, _a, _b) {
        var updateHrefJson = _a.updateHrefJson;
        var getHref = _b.getHref;
        var href = getHref(store);
        if (href && DOMAIN_REGEX.test(href) && !PLUS_REGEX.test(href)) {
            var cmpid = getCmpid();
            cmpid && updateHrefJson(store, 'cmpid', cmpid);
        }
    };
    return Cmpid;
}());
Cmpid = __decorate([
    before(function () { return storeCmpid(win.location.href, mainhost, 30); }),
    permit(allowBindClick && isGomePlus)
], Cmpid);
var Cmpid$1 = Cmpid;

// 不单独导出， 防止使用 export * as , 将产生Object.freeze代码
// 由于暂时不涉及监听， 性能考虑，暂时make it dirty
var actions = {
    updateSuda: function (store, key, value) {
        var data = store.getState(PROP_SUDA) || {};
        data[key] = value;
        return store.commit({
            key: PROP_SUDA,
            data: data
        });
    },
    assignSuda: function (store, data) {
        var olddata = store.getState(PROP_SUDA) || {};
        return store.commit({
            key: PROP_SUDA,
            data: mixin(olddata, data)
        });
    },
    setCurrentTarget: function (store, data) {
        return store.commit({
            key: PROP_CURRENT_NODE,
            data: data
        });
    },
    setATag: function (store, data) {
        return store.commit({
            key: PROP_A_NODE,
            data: data
        });
    },
    updateATagHref: function (store) {
        var addin = store.getState(PROP_HREF_ADDIN);
        var href = store.getState(PROP_HREF);
        if (href && addin) {
            var data = insertQuery(href, addin);
            var atag = store.getState(PROP_A_NODE);
            atag && data && (atag.href = data);
        }
    },
    updateHrefJson: function (store, key, value) {
        var data = store.getState(PROP_HREF_ADDIN) || {};
        data[key] = value;
        return store.commit({
            key: PROP_HREF_ADDIN,
            data: data
        });
    },
    setHref: function (store, data) {
        return store.commit({
            key: PROP_HREF,
            data: data
        });
    }
};

var getters = {
    getSudaDate: function (store) {
        return store.getState(PROP_SUDA);
    },
    getCurrentTarget: function (store) {
        return store.getState(PROP_CURRENT_NODE);
    },
    getATag: function (store) {
        return store.getState(PROP_A_NODE);
    },
    getHref: function (store) {
        return store.getState(PROP_HREF);
    }
};

var Processor = (function () {
    function Processor(Controllers, store) {
        this.store = store;
        
        var length = this.length = Controllers.length;
        var process = [];
        var post = [];
        for (var i = 0; i < length; i++) {
            var ctrl = new (Controllers[i])(store, actions, getters);
            ctrl.process && process.push(ctrl);
            ctrl.post && post.push(ctrl);
        }
        this.controllers = {
            process: process,
            post: post
        };
    }
    Processor.prototype.exec = function (op) {
        var controllers = this.controllers[op];
        if (controllers) {
            var controller = void 0;
            var i = 0;
            while (controller = controllers[i]) {
                controller[op](this.store, actions, getters);
                if (controller.done) {
                    controllers.splice(i, 1);
                }
                else {
                    i++;
                }
            }
        }
    };
    Processor.prototype.update = function (target) {
        actions.setCurrentTarget(this.store, target);
    };
    Processor.prototype.post = function () {
        var _this = this;
        var data = getters.getSudaDate(this.store);
        // suda不存在时 无需设置href属性
        if (data) {
            var href = getters.getHref(this.store);
            if (href) {
                // dirty in final step
                data = actions.updateSuda(this.store, 'href', encodeURIComponent(href));
                // 设置 a标签href
                actions.updateATagHref(this.store);
            }
            BP.send(data);
        }
        
    };
    return Processor;
}());

var Store = (function () {
    function Store(data) {
        this._state = data;
    }
    Store.prototype.getState = function (key) {
        return this._state[key];
    };
    Store.prototype.commit = function (action) {
        this._state[action.key] = action.data;
        return action.data;
    };
    return Store;
}());

// export { findTagByIntcmp } from './intcmp/helpers';
function load() {
    var Controllers = [];
    for (var _i = 0, _a = [Suda$1, UBA$1, Intcmp$1, Cmpid$1]; _i < _a.length; _i++) {
        var cc = _a[_i];
        if (cc.enable) {
            cc.load && cc.load();
            Controllers.push(cc);
        }
    }
    bindClickEvent(Controllers);
}
function bindClickEvent(Controllers) {
    if (Controllers.length === 0) {
        return;
    }
    var eventType = isMobile ? 'touchstart' : 'click';
    addEvent(doc, eventType, function (e) {
        var target = e.srcElement || e.target;
        var processor = new Processor(Controllers, new Store({ target: target }));
        while (target && target.parentNode) {
            processor.update(target);
            processor.exec('process');
            target = target.parentNode;
        }
        // 应该已循环到最顶层
        processor.exec('post');
        processor.post();
    });
}

// mount global object
// BP.findTagByIntcmp = findTagByIntcmp;
win['BP'] = BP;
// init log
init();
// bind event
load();

}());
