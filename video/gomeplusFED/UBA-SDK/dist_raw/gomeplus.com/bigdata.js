/*
 * sitemoniter-gomeplus v1.0.3, bundle: 2017-05-27 13:53
 * (c) 2017 gomeBigData
 */
(function () {
/* create by quanyingying 2017-01-16 17:44 */
/* revised by lizhonging 2017-02-17 17:44 */
window["ClickiTrackerName"] = 'gomeClicki';
window.gomeClicki = window.gomeClicki || function () {
    (window.gomeClicki.queue = window.gomeClicki.queue || []).push(arguments);
};
window.gomeClicki.start = +new Date();
var url = document.location.href;
window.gomeClicki('create', url.search(/\.gomeplus\.com/) < 0 ? "dc-6" : (/dev|test|pre/.test(url) ? "dc-17" : "dc-16"), "auto");
var setinfo = {
    'dimension3': document.referrer
};
window.userId && (setinfo.dimension15 = window.userId);
window.gomeClicki('set', setinfo);
window.gomeClicki('send', 'pageview');

(function (window, document, undefined) {
    var screen = window.screen;
    var navigator = window.navigator;
    var location = window.location;
    var core_slice = Array.prototype.slice;
    var core_toString = Object.prototype.toString;
    var debugSendUrl = '';
    // 默认跟踪器名称
    var defaultTrackerName = "t0";
    // 默认cookie名称
    var defaultCookieName = "__clickidc";
    // 默认cookie过期时间：10年
    var defaultCookieExpires = 3600 * 24 * 365 * 10;
    // 全局方法默认名称
    var gbNameDefault = "dc";
    // 全局方法缓存队列属性名
    var gbQueue = "queue";
    // 存储全局方法名的变量名
    var gbNameVar = "ClickiTrackerName";
    // 全局日志记录变量名
    var logStackGlobalName = "clickiLogStack2015";
    // 日志记录数组最大长度（超出长度后会删除旧的记录）
    var logMaximumLength = 3000;
    // 是否为调试模式，可强制打开
    var isDebug = location.hash.indexOf('clicki/debug/') > -1 || false;
    // 网站测速抽样率
    var speedSampleRate = 10;
    // 心跳发送时间， 在跟踪器创建后对应时间内发送(单位： 秒)
    // var pulseTimeDefine      = [5, 15, 30];
    var pulseTimeDefine = [];
    // 数据收集服务器
    var collectDomain = (location.protocol == "https:" ? "https:" : "http:") + "//sm.gome.com.cn/";
    // 图片收数请求路径 (基于collectDomain)
    var imageRequestPath = 'collect/track_proxy';
    // ajax收数请求路径 (基于collectDomain)
    var ajaxRequestPath = 'collect/track_ajax';
    // iframe收数请求路径 (基于collectDomain)
    var iframeRequestPath = 'collect/track_ajax';
    // 跨域所用iframe路径 (基于collectDomain)
    var corsIframePath = 'collect_iframe.html';
    function noop() { }
    function isFunction(a) {
        return "function" == typeof a;
    }
    function isArray(a) {
        return "[object Array]" == core_toString.call(Object(a));
    }
    function isString(a) {
        return void 0 != a && -1 < (a.constructor + "").indexOf("String");
    }
    /**
     * 修改函数运行域
     * @param  {Function|String} func    为字符串时取运行域的对应属性
     * @param  {Object}          context 运行域
     * @return {Function}                返回修改运行域后的函数
     */
    function proxy(func, context) {
        if (isString(func)) {
            func = context[func];
        }
        if (!isFunction(func)) {
            return noop;
        }
        var args = core_slice.call(arguments, 2);
        return function () {
            return func.apply(context, args.concat(core_slice.call(arguments)));
        };
    }
    /**
     * 日志记录函数, 当打开调试模式时，可通过全局日志记录变量获取
     */
    function log(funcName) {
        var console = window["console"];
        var eg = logStackGlobalName;
        var stack = window[eg] = window[eg] || [];
        if (!isDebug) {
            return;
        }
        if (isDebug && isString(debugSendUrl)) {
            debugSendUrl += (debugSendUrl.indexOf('?') > -1 ? '&' : '?');
            debugSendUrl += 'f=' + encodeURIComponent(funcName) + '&m=' + encodeURIComponent(core_slice.call(arguments, 1).join('')) + '&hash=' + random();
            createImage(debugSendUrl, noop, true);
        }
        stack.push(core_slice.call(arguments));
        if (stack.length > logMaximumLength) {
            stack.splice(0, logMaximumLength - stack.length);
        }
        if (console && console["log"] && isFunction(console["log"])) {
            if (isFunction(console["log"].apply)) {
                console["log"].apply(console, arguments);
            }
            else {
                console["log"](arguments[0]);
            }
        }
    }
    /**
     * 获取随机整数
     * @return {Int}
     */
    function random() {
        return Math.round(Math.random() * 2147483647);
    }
    function hash(str) {
        var b = 1, c = 0, d;
        if (str) {
            for (b = 0, d = str.length - 1; 0 <= d; d--) {
                c = str.charCodeAt(d),
                    b = (b << 6 & 268435455) + c + (c << 14),
                    c = b & 266338304,
                    b = 0 !== c ? b ^ c >> 21 : b;
            }
        }
        return b;
    }
    /**
     * 路径拼接
     * @return {String} 拼接后的路径
     */
    function combinePath() {
        var item;
        var path = [];
        var len = arguments.length;
        for (var i = 0; i < len; i++) {
            item = arguments[i];
            if (i > 0) {
                item = item.indexOf('/') === 0 ? item.slice(1) : item;
            }
            if (i < len - 1) {
                item = item.slice(-1) === '/' ? item.slice(0, item.length - 1) : item;
            }
            path.push(item);
        }
        return path.join('/');
    }
    /**
     * 创意一个1X1的图片节点，用于发送数据
     * @param  {String}   src      图片请求地址
     * @param  {Function} callback 回调函数
     * @param  {Boolean}  noLog    是否关闭log, log调用此方法，避免死循环
     * @return {Undefined}
     */
    function createImage(src, callback, noLog) {
        var key, img;
        try {
            key = "_clickiv4_" + (+(new Date())) + random();
            img = window[key] = new Image();
            img.onload = img.onerror = function () {
                try {
                    callback();
                    img.onload = img.onerror = window[key] = undefined;
                }
                catch (e) { }
            };
            img.src = src;
        }
        catch (ee) {
            try {
                img = document.createElement('img');
                img.onload = img.onerror = function () {
                    try {
                        callback();
                        img.onload = img.onerror = window[key] = undefined;
                    }
                    catch (eee) { }
                };
                img.src = src;
            }
            catch (eeee) {
                if (!noLog) {
                    log('createImage', 'error message is: ', ee.message);
                }
            }
        }
    }
    /**
     * 动态加载远程js
     * @param  {String}   src     js文件路径
     * @param  {String}   id      节点id
     * @param  {Function} success 成功回调
     * @param  {Function} error   失败回调
     */
    function loadScript(src, id, success, error) {
        if (src) {
            var c = document.createElement("script");
            c.type = "text/javascript";
            c.async = !0;
            c.src = src;
            c.id = id;
            if (success) {
                if (c.addEventListener) {
                    c.onload = success;
                }
                else {
                    c.onreadystatechange = function () {
                        if (c.readyState in {
                            loaded: 1,
                            complete: 1
                        }) {
                            c.onreadystatechange = null;
                            success;
                        }
                    };
                }
            }
            if (error) {
                c.onerror = error;
            }
            var d = document.getElementsByTagName("script")[0];
            d.parentNode.insertBefore(c, d);
        }
    }
    /**
     * DOM事件绑定
     */
    function addEvent(elm, type, handle, capture) {
        elm.addEventListener ? elm.addEventListener(type, handle, !!capture) : elm.attachEvent && elm.attachEvent("on" + type, handle);
    }
    /**
     * 解除DOM事件绑定
     */
    function removeEvent(elm, type, handle) {
        elm.removeEventListener ? elm.removeEventListener(type, handle, !1) : elm.detachEvent && elm.detachEvent("on" + type, handle);
    }
    /**
     * cookie操作函数
     * 只传入名称时为获取
     * 存储时参数书写：cookie( name, value, expires, path, domain, secure );
     */
    function cookie(n) {
        var d = new Date(), a = arguments, l = a.length;
        if (l > 1) {
            var e = a[2] || 0, p = a[3] || "/", dm = a[4] || 0, se = a[5] || 0;
            if (e) {
                d.setTime(d.getTime() + (e * 1E3));
            }
            document.cookie = n + "=" + escape(a[1]) + (e ? ("; expires=" + d.toGMTString()) : "") + ("; path=" + p) + (dm && dm != "none" ? ("; domain=" + dm) : "") + (se ? "; secure" : "");
            return a[1];
        }
        else {
            var v = document.cookie.match("(?:^|;)\\s*" + n + "=([^;]*)");
            return v ? unescape(v[1]) : 0;
        }
    }
    /**
     * 获取当前域名，用于cookie存储
     * @return {String} 当前域名，www时会进行截取
     */
    function getDomain() {
        var hostname = "" + document.location.hostname;
        return 0 === hostname.indexOf("www.") ? hostname.substring(4) : hostname;
    }
    /**
     * 获取处理后的referrer地址，同域名不返回
     * @param  {Boolean} always  不管是否同域都强制返回
     * @return {String|Undefined}
     */
    function getReferrer(always) {
        var referrer = document.referrer;
        if (/^https?:\/\//i.test(referrer)) {
            if (always) {
                return referrer;
            }
            var hostname = "//" + document.location.hostname;
            var index = referrer.indexOf(hostname);
            if (5 === index || 6 === index) {
                var t = referrer.charAt(index + hostname.length);
                if (t === "/" || t === "?" || t === "" || t === ":") {
                    return;
                }
            }
            return referrer;
        }
    }
    /**
     * 获取客户端flash版本号
     * @return {String|Undefined}
     */
    function getFlashVersion() {
        var a, b, c;
        if ((c = (c = window.navigator) ? c.plugins : null) && c.length) {
            for (var d = 0; d < c.length && !b; d++) {
                var e = c[d];
                -1 < e.name.indexOf("Shockwave Flash") && (b = e.description);
            }
        }
        if (!b) {
            try {
                a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), b = a.GetVariable("$version");
            }
            catch (g) { }
        }
        if (!b) {
            try {
                a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), b = "WIN 6,0,21,0", a.AllowScriptAccess = "always", b = a.GetVariable("$version");
            }
            catch (ca) { }
        }
        if (!b) {
            try {
                a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), b = a.GetVariable("$version");
            }
            catch (l) { }
        }
        b && (a = b.match(/[\d]+/g)) && 3 <= a.length && (b = a[0] + "." + a[1] + " r" + a[2]);
        return b || void 0;
    }
    /**
     * 设置对象的name属性
     * @param  {Object} obj  要设置的对象
     * @param  {String} name name属性值
     * @return {String}      返回name属性值
     */
    function setName(obj, name) {
        return obj.name = name;
    }
    /**
     * 合并两个数组为一个新的键值对象，其中的一个数组是键名，另一个数组的值为键值。
     * 和php的array_combine的用法基本相同
     * 当两个数组个数不同时，以较少个数为准，剩余部分舍弃
     * @return {Object} 键值对象
     */
    function arrayCombine(keys, values) {
        var prop, length, i = 0, map = {};
        for (length = Math.min(keys.length + 1, values.length); i < length; i++) {
            if (typeof values[i] === "object") {
                for (prop in values[i]) {
                    if (values[i].hasOwnProperty(prop)) {
                        map[prop] = values[i][prop];
                    }
                }
            }
            else if (keys.length > i) {
                map[keys[i]] = values[i];
            }
        }
        return map;
    }
    /**
     * 参数解构为键值对象
     * @param  {Array} fields  字段定义数组
     * @param  {Array} args    当数组第一个值为对象时，直接返回该对象，否则用arrayCombine方法映射两个数组
     * @return {Object}        返回键值对象
     * @demo:  preParameters( ["trackingId", "name"], ["1246564", "t1"] );
     */
    function preParameters(fields, args) {
        if (args.length == 1 && args[0] != null && typeof args[0] === "object") {
            return args[0];
        }
        else {
            return arrayCombine(fields, args);
        }
    }
    function isFirefox() {
        return navigator.userAgent.indexOf("Firefox") >= 0 && ![].reduce;
    }
    function send(param, callback) {
        callback = callback || noop;
        if (param.length <= 2036) {
            return sendByImage(param, callback);
        }
        else if (param.length <= 8192 && !isFirefox()) {
            return sendByXMLHttpRequest(param, callback) || sendByXDomainRequest(param, callback) || sendByIframe(param, callback);
        }
        else {
            log("send", "request param is to long ", param.length);
            return false;
        }
    }
    function sendByImage(param, callback) {
        callback = callback || noop;
        createImage(combinePath(collectDomain, imageRequestPath) + "?" + param, callback);
    }
    function sendByXDomainRequest(param, callback) {
        callback = callback || noop;
        if (!window.XDomainRequest) {
            return false;
        }
        var xdr = new window.XDomainRequest();
        xdr.open("POST", combinePath(collectDomain, ajaxRequestPath));
        xdr.onerror = function () {
            callback();
        };
        xdr.onload = callback;
        xdr.send(param);
        return true;
    }
    function sendByXMLHttpRequest(param, callback) {
        callback = callback || noop;
        if (!window.XMLHttpRequest) {
            return false;
        }
        var xhr = new window.XMLHttpRequest();
        if (!("withCredentials" in xhr)) {
            return false;
        }
        xhr.open("POST", combinePath(collectDomain, ajaxRequestPath), true);
        // xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback();
                callback = null;
            }
        };
        xhr.send(param);
        return true;
    }
    function sendByIframe(param, callback) {
        var src, ifra, complete, ifraLoad, i = 0, success = false;
        callback = callback || noop;
        complete = function () {
            ifra.src = "";
            ifra.parentNode && ifra.parentNode.removeChild(ifra);
        };
        ifraLoad = function () {
            if (!success) {
                try {
                    if (i > 9 || ifra.contentWindow.location.host == document.location.host) {
                        success = true;
                        complete();
                        removeEvent(window, "beforeunload", complete);
                        callback();
                        return;
                    }
                }
                catch (e) {
                    i++;
                    setTimeout(ifraLoad, 200);
                }
            }
        };
        if (document.body) {
            param += '####==collect_path=' + combinePath(collectDomain, iframeRequestPath) + '==####';
            param = encodeURIComponent(param);
            try {
                ifra = document.createElement('<iframe name="' + param + '"></iframe>');
            }
            catch (e) {
                ifra = document.createElement("iframe");
                setName(ifra, param);
            }
            ifra.height = "0";
            ifra.width = "0";
            ifra.style.display = "none";
            ifra.style.visibility = "hidden";
            src = combinePath(collectDomain, corsIframePath) + "#";
            src += encodeURIComponent(document.location.protocol + "//" + document.location.host + "/favicon.ico");
            addEvent(window, "beforeunload", complete);
            addEvent(ifra, "load", ifraLoad);
            document.body.appendChild(ifra);
            ifra.src = src;
        }
        else {
            var args = arguments, self = arguments.callee;
            setTimeout(function () {
                self.apply(window, args);
            }, 100);
        }
    }
    /**
     * 键值对缓存类
     */
    function KVCache() {
        this.keys = [];
        this.t1 = {};
        this.t2 = {};
    }
    /**
     * 存入值
     * @param {String}  key    存入键
     * @param {*}       value  存入值
     * @param {Boolean} isTemp 临时数据，获取时优先获取该值，且不覆盖同名旧值
     */
    KVCache.prototype.set = function (key, value, isTemp) {
        this.keys.push(key);
        if (isTemp) {
            this.t2[":" + key] = value;
        }
        else {
            this.t1[":" + key] = value;
        }
    };
    /**
     * 取值
     */
    KVCache.prototype.get = function (key) {
        return this.t2.hasOwnProperty(":" + key) ? this.t2[":" + key] : this.t1[":" + key];
    };
    /**
     * 迭代方法
     * @param  {Function} cb 迭代回调
     */
    KVCache.prototype.map = function (cb) {
        for (var i = 0; i < this.keys.length; i++) {
            var key = this.keys[i], value = this.get(key);
            if (value) {
                cb(key, value);
            }
        }
    };
    /**
     * 自定义字段缓存
     * @type {Array}
     */
    var customFieldCache = [];
    /**
     * 字段名 ——> 字段实例的键值对缓存
     * @type {KVCache}
     */
    var fieldCache = new KVCache();
    /**
     * 字段类
     * @param  {String}   fieldName     字段名
     * @param  {String}   protocolParam 发送协议名
     * @param  {*}        defaultValue  默认值，为Function时默认值为函数执行返回值
     * @param  {Function} getter        设置字段值时执行
     * @param  {Function} setter        获取字段值时执行
     * @return {Field}                  Filed实例
     */
    function Field(fieldName, protocolParam, defaultValue, getter, setter) {
        var that = this;
        setName(that, fieldName);
        that.protocolParameter = protocolParam;
        that.defaultValue = defaultValue;
        that.getter = getter;
        that.setter = setter;
    }
    /**
     * 定义一个字段
     * @param  {String}   fieldName     字段名
     * @param  {String}   protocolParam 发送协议名
     * @param  {*}        defaultValue  默认值，为Function时默认值为函数执行返回值
     * @param  {Function} getter        设置字段值时执行
     * @param  {Function} setter        获取字段值时执行
     * @return {String}                 返回字段名
     */
    function defineField(fieldName, protocolParam, defaultValue, getter, setter) {
        var field = new Field(fieldName, protocolParam, defaultValue, getter, setter);
        fieldCache.set(field.name, field);
        return field.name;
    }
    /**
     * 定义一个自定义字段
     * 用于维度和指标的某一类字段定义
     * 在获取时会通过生成的正则去匹配字段名，如果匹配上则会通过build方法生成一个Filed实例缓存入fieldCache中
     * @param  {String}   fieldNamePattern 匹配字段名的正则字符串，会通过RegExp去转换为正则
     * @param  {Function} build            Filed生成函数
     */
    function defineCustomField(fieldNamePattern, build) {
        customFieldCache.push([new RegExp("^" + fieldNamePattern + "$"), build]);
    }
    /**
     * 定义一个常量字段
     * @param  {String} fieldName     字段名
     * @param  {String} protocolParam 发送协议名
     * @param  {*}      fieldValue    字段值
     * @return {String}               返回字段名
     */
    function defineConstField(fieldName, protocolParam, fieldValue) {
        return defineField(fieldName, protocolParam, fieldValue, void 0, noop);
    }
    /**
     * 定义一个系统字段（用户不可更改）
     * @param  {String}   fieldName     字段名
     * @param  {String}   protocolParam 发送协议名
     * @param  {*}        defaultValue  默认值，为Function时默认值为函数执行返回值
     * @param  {Function} getter        设置字段值时执行
     * @return {String}                 返回字段名
     */
    function defineSystemField(fieldName, protocolParam, defaultValue, getter) {
        return defineField(fieldName, protocolParam, defaultValue, getter, noop);
    }
    /**
     * 获取一个字段实例
     * @param  {String} fieldName 字段名
     * @return {Field}            字段实例
     */
    function getField(fieldName) {
        var field = fieldCache.get(fieldName);
        if (!field) {
            for (var i = 0; i < customFieldCache.length; i++) {
                var fieldSet = customFieldCache[i], matches = fieldSet[0].exec(fieldName);
                if (matches) {
                    field = fieldSet[1](matches);
                    fieldCache.set(field.name, field);
                }
            }
        }
        return field;
    }
    /**
     * 通过字段发送协议名获取字段名
     * @param  {String} protocolParameter 字段发送协议名
     * @return {String}                   字段名
     */
    function getFieldNameByProtocolParam(protocolParameter) {
        var result;
        fieldCache.map(function (fieldName, field) {
            if (field.protocolParameter == protocolParameter) {
                result = fieldName;
            }
        });
        return result;
    }
    /**
     * 获取storage中string类型数据
     * @param  {Storage} storage   字段缓存对象
     * @param  {String}  fieldName 字段名称
     * @return {*}                 字段值
     */
    function getStringField(storage, fieldName) {
        var fieldValue = storage.get(fieldName);
        return fieldValue == void 0 ? "" : "" + fieldValue;
    }
    /**
     * 获取
     * @param  {Storage} storage   字段缓存对象
     * @param  {String}  fieldName 字段名称
     * @return {*}                 字段值
     */
    function getIntField(storage, fieldName) {
        var fieldValue = storage.get(fieldName);
        return fieldValue == void 0 || "" ? 0 : 1 * fieldValue;
    }
    /**
     * 跟踪用户行为数据类
     */
    function UserBehavior() {
        var instance = this;
        function instancOf(instance, factory) {
            return instance && instance.hasOwnProperty && (instance instanceof factory);
        }
        if (!instancOf(instance, UserBehavior)) {
            instance = new UserBehavior();
            instance.init();
        }
        return instance;
    }
    var fn = UserBehavior.prototype;
    /**
     * 初始化
     */
    fn.init = function () {
        // var scroll,keydown,resize,mousedown,mousemove,swipe,turn,pinch
        // 数据栈，用户触发对应行为则记为1，获取后该行为清空
        this.data = [];
        // 数据锁，和data对应，为true时表示对应行为已获取
        this.dataLock = [];
        // 手势事件绑定缓存
        this.gestureCache = [];
        // 手势事件绑定锁
        this.gestureBindLock = false;
        // 需要监听的事件绑定方法
        this.binder = [
            'binderScroll',
            'binderKeydown',
            'binderResize',
            'binderMousedown',
            'binderMousemove',
            'binderSwipe',
            'binderTurn',
            'binderPinch'
        ];
        this.bindEvents();
        this.reset();
        return this;
    };
    /**
     * 循环绑定监听事件
     */
    fn.bindEvents = function () {
        for (var i = 0; i < this.binder.length; i++) {
            this.dataLock[i] = false;
            this[this.binder[i]](i);
        }
    };
    /**
     * 手势事件触发回调
     * @param  {Event} ev 事件对象
     */
    fn.onGesturesEventTrigger = function (ev) {
        var cache = this.gestureCache;
        var fingers = ev.touches ? ev.touches.length : 1;
        var evType = fingers >= 2 ? 'pinch' : 'swipe';
        for (var i = 0; i < cache.length; i++) {
            if (cache[i] && cache[i][0] === evType) {
                this.onEventTrigger(cache[i][1]);
            }
        }
    };
    /**
     * 绑定手势事件
     * @param  {String} type  手势事件类型
     * @param  {Number} index 事件对应索引
     */
    fn.bindGesturesEvent = function (type, index) {
        this.gestureCache.push([type, index]);
        var hasTouch = 'ontouchstart' in window;
        if (!this.gestureBindLock && hasTouch) {
            document.addEventListener('touchmove', proxy(this.onGesturesEventTrigger, this), false);
        }
    };
    /**
     * 普通事件触发回调
     * @param  {Number} index 事件对应索引
     */
    fn.onEventTrigger = function (index) {
        if (!this.dataLock[index]) {
            this.dataLock[index] = true;
            this.data[index] = 1;
        }
    };
    /**
     * 绑定滚动事件
     * @param  {Number} index 事件对应索引
     */
    fn.binderScroll = function (index) {
        addEvent(window, 'scroll', proxy(this.onEventTrigger, this, index));
    };
    /**
     * 绑定keydown事件
     * @param  {Number} index 事件对应索引
     */
    fn.binderKeydown = function (index) {
        addEvent(document, 'keydown', proxy(this.onEventTrigger, this, index));
    };
    /**
     * 绑定resize事件
     * @param  {Number} index 事件对应索引
     */
    fn.binderResize = function (index) {
        addEvent(window, 'resize', proxy(this.onEventTrigger, this, index));
    };
    /**
     * 绑定mousedown事件
     * @param  {Number} index 事件对应索引
     */
    fn.binderMousedown = function (index) {
        addEvent(document, 'mousedown', proxy(this.onEventTrigger, this, index));
    };
    /**
     * 绑定mousemove事件
     * @param  {Number} index 事件对应索引
     */
    fn.binderMousemove = function (index) {
        addEvent(document, 'mousemove', proxy(this.onEventTrigger, this, index));
    };
    /**
     * 绑定swipe事件
     * @param  {Number} index 事件对应索引
     */
    fn.binderSwipe = function (index) {
        this.bindGesturesEvent('swipe', index);
    };
    /**
     * 绑定屏幕旋转事件
     * @param  {Number} index 事件对应索引
     */
    fn.binderTurn = function (index) {
        window.orientation && window.addEventListener('orientationchange', proxy(this.onEventTrigger, this, index), false);
    };
    /**
     * 绑定pinch事件
     * @param  {Number} index 事件对应索引
     */
    fn.binderPinch = function (index) {
        this.bindGesturesEvent('pinch', index);
    };
    /**
     * 清空数据
     */
    fn.reset = function () {
        for (var i = 0; i < this.binder.length; i++) {
            this.data[i] = 0;
        }
    };
    /**
     * 获取数据
     * 每次调用该方法后数据都会清空
     * WARN: 如果不是在数据发送之前获取数据会导致数据因为重置而丢失，可改到在tacker中手动存入storage，而非getter自动获取
     * @return {String}
     */
    fn.get = function () {
        var result = this.data.join('-');
        this.reset();
        return result;
    };
    /**
     * @fileOverview 字段值定义
     */
    // TODO: 协议版本
    defineField("protocolVersion", "v");
    // 跟踪ID，站点id
    var F_trackingId = defineConstField("trackingId", "tid");
    // TODO: 是否启用IP匿名统计
    defineField("anonymizeIp", "aip");
    // TODO: 队列时长，发出时间-产生时间，秒
    defineField("queueTime", "qt");
    // 优先使用数据发送方式
    var F_forceSendMethod = defineField("forceSendMethod");
    // 用户唯一ID，Cookie ID
    var F_clientId = defineConstField("clientId", "cid");
    // 客户设定的用户ID，如email等
    var F_userId = defineField("userId", "uid");
    // TODO: 秒针唯一ID
    defineField("miaozhenId", "mzid");
    // 是否为一个新的session
    defineField("sessionControl", "sc", "");
    // TODO: IP覆盖功能  --- uip
    // TODO: IP覆盖功能  --- ua
    // 来源网页
    defineField("referrer", "dr");
    // 谷歌广告
    defineField("googleCampaignName", "cn");
    defineField("googleCampaignSource", "cs");
    defineField("googleCampaignMedium", "cm");
    defineField("googleCampaignKeyword", "ck");
    defineField("googleCampaignContent", "cc");
    // 秒针广告
    defineField("miaozhenCampaignId", "mzc");
    defineField("miaozhenCampaignId", "mzs");
    defineField("miaozhenCampaignId", "mzk");
    // TODO: BiddingX 广告id --- bdx
    // 自定义广告
    defineCustomField("customAds([0-9]+)", function (matches) {
        return new Field(matches[0], "ca" + matches[1]);
    });
    // 屏幕分辨率
    var F_screenResolution = defineField("screenResolution", "sr");
    // 可视窗口大小
    var F_viewportSize = defineField("viewportSize", "vp");
    // 文档编码
    var F_encoding = defineField("encoding", "de");
    // 屏幕颜色
    var F_screenColors = defineField("screenColors", "sd");
    // 用户语言
    var F_language = defineField("language", "ul");
    // 是否支持Java
    var F_javaEnabled = defineField("javaEnabled", "je");
    // Flash版本
    var F_flashVersion = defineField("flashVersion", "fl");
    // 请求的业务类型
    var F_hitType = defineField("hitType", "t");
    // 是否参与跳出计算 0/1，1不参与计算
    var F_nonInteraction = defineField("nonInteraction", 'ni', void 0, function (storage, fieldName, fieldValue) {
        return fieldValue == void 0 ? false : fieldValue;
    });
    // 文档位置
    var F_location = defineField("location", "dl", "");
    // 文档主机名
    defineField("hostname", "dh");
    // 文档路径
    var F_page = defineField("page", "dp", "");
    // 文档名称
    defineField("title", "dt", function () {
        return document.title || void 0;
    });
    // TODO: NOT_FOUND  屏幕名称
    // defineField("screenName", "cd");
    // App名称
    defineField("appName", "an");
    // AppID
    defineField("appId", "aid", "");
    // App版本
    defineField("appVersion", "av", "");
    // App安装ID
    defineField("appInstallerId", "aiid", "");
    // 事件统计分类
    var F_eventCategory = defineField("eventCategory", "ec");
    var F_eventAction = defineField("eventAction", "ea");
    var F_eventLabel = defineField("eventLabel", "el");
    var F_eventValue = defineField("eventValue", "ev");
    // 自定义行为统计
    defineField("customActionId", "caid");
    defineCustomField("customActionLabel([0-9]+)", function (matches) {
        return new Field(matches[0], "cal" + matches[1]);
    });
    defineCustomField("customActionValue([0-9]+)", function (matches) {
        return new Field(matches[0], "cav" + matches[1]);
    });
    // 自定义维度
    defineCustomField("dimension([0-9]+)", function (matches) {
        return new Field(matches[0], "cd" + matches[1]);
    });
    // 自定义指标
    defineCustomField("metric([0-9]+)", function (matches) {
        return new Field(matches[0], "cm" + matches[1]);
    });
    // 用户行为，分别在pv,心跳,事件中体现
    defineSystemField("userBehavior", "ub", void 0, proxy('get', UserBehavior()));
    var F_hitCallback = defineField("hitCallback");
    var F_hitPayload = defineField("hitPayload");
    var F_socialNetwork = defineField("socialNetwork", "sn");
    var F_socialAction = defineField("socialAction", "sa");
    var F_socialTarget = defineField("socialTarget", "st");
    var F_l1 = defineField("l1", "plt");
    var F_l2 = defineField("l2", "pdt");
    var F_l3 = defineField("l3", "dns");
    var F_l4 = defineField("l4", "rrt");
    var F_l5 = defineField("l5", "srt");
    var F_l6 = defineField("l6", "tcp");
    var F_l7 = defineField("l7", "dit");
    var F_l8 = defineField("l8", "clt");
    var F_timingCategory = defineField("timingCategory", "utc");
    var F_timingVar = defineField("timingVar", "utv");
    var F_timingLabel = defineField("timingLabel", "utl");
    var F_timingValue = defineField("timingValue", "utt");
    var F_name = defineConstField("name");
    var F_cookieName = defineConstField("cookieName", void 0, defaultCookieName);
    var F_cookieDomain = defineConstField("cookieDomain");
    var F_cookiePath = defineConstField("cookiePath", void 0, "/");
    var F_cookieExpires = defineConstField("cookieExpires", void 0, defaultCookieExpires);
    var F_storage = defineConstField("storage", void 0, "cookie");
    // 是否发送心跳数据
    var F_sendPulse = defineConstField("sendPulse", void 0, true);
    var F_sampleRate = defineConstField("sampleRate", "sf", 100);
    var F_siteSpeedSampleRate = defineConstField("siteSpeedSampleRate", void 0, speedSampleRate);
    var F_alwaysSendReferrer = defineConstField("alwaysSendReferrer", void 0, false);
    var F_checkProtocolTask = defineField("checkProtocolTask");
    var F_checkStorageTask = defineField("checkStorageTask");
    var F_samplerTask = defineField("samplerTask");
    var F_buildHitTask = defineField("buildHitTask");
    var F_sendHitTask = defineField("sendHitTask");
    // 强制使用ssl协议
    var forceSSLSwitch = false;
    defineField("forceSSL", void 0, void 0, function () {
        return forceSSLSwitch;
    }, function (storage, fieldName, fieldValue) {
        forceSSLSwitch = !!fieldValue;
    });
    // 插件
    defineCustomField("\\&(.*)", function (matches) {
        var field = new Field(matches[0], matches[1]), fieldName = getFieldNameByProtocolParam(matches[0].substring(1));
        if (fieldName) {
            field.getter = function (data) {
                return data.get(fieldName);
            };
            field.setter = function (data, fieldName, fieldValue, isTemp) {
                data.set(fieldName, fieldValue, isTemp);
            };
            field.protocolParameter = void 0;
        }
        return field;
    });
    /**
     *  数据缓存类，实际是继承自KVCache
     */
    function Storage() {
        this.data = new KVCache();
    }
    /**
     * 清空临时存入数据
     */
    Storage.prototype.clearTemp = function () {
        this.data.t2 = {};
    };
    /**
     * 获取字段值，字段如果为Field实例，则会进行默认值和getter处理
     * @param  {String} fieldName 字段名
     * @return {*}                字段值
     */
    Storage.prototype.get = function (fieldName) {
        var field = getField(fieldName), fieldValue = this.data.get(fieldName);
        if (field && fieldValue == void 0) {
            fieldValue = isFunction(field.defaultValue) ? field.defaultValue() : field.defaultValue;
        }
        return field && isFunction(field.getter) ? field.getter(this, fieldName, fieldValue) : fieldValue;
    };
    /**
     * 设置字段
     * @param {String|Object} fieldName   为String时为字段名，为对象时循环该对象所有属性调用本方法
     * @param {*}             fieldValue  存入值，如果该字段为field实例，则会调用setter处理
     * @param {Boolean}       isTemp      临时数据，获取时优先获取该值，且不覆盖同名旧值
     */
    Storage.prototype.set = function (fieldName, fieldValue, isTemp) {
        if (fieldName) {
            if (typeof fieldName == "object") {
                for (var f in fieldName) {
                    if (fieldName.hasOwnProperty(f)) {
                        arguments.callee.call(this, f, fieldName[f], isTemp);
                    }
                }
            }
            else {
                var field = getField(fieldName);
                if (field && isFunction(field.setter)) {
                    field.setter(this, fieldName, fieldValue, isTemp);
                }
                else {
                    this.data.set(fieldName, fieldValue, isTemp);
                }
            }
        }
    };
    /**
     * 过滤器类
     */
    function Filters() {
        this.stack = [];
    }
    /**
     * 添加一个过滤任务
     * @param {String} a  任务字段名
     */
    Filters.prototype.add = function (a) {
        this.stack.push(a);
    };
    /**
     * 循环执行所有过滤任务，如果全部通过，则执行hitCallback回调
     * @param  {Storage} storage
     */
    Filters.prototype.run = function (storage) {
        try {
            for (var i = 0; i < this.stack.length; i++) {
                var task = storage.get(this.stack[i]);
                if (isFunction(task)) {
                    task.call(window, storage);
                }
            }
        }
        catch (e) {
            // log("filter.run", this.stack[i], ';message: ', e.message);
        }
        var hitCallback = storage.get(F_hitCallback);
        if (hitCallback != noop) {
            storage.set(F_hitCallback, noop, true);
            setTimeout(hitCallback, 10);
        }
    };
    /**
     * @fileOverview 过滤器任务定义
     */
    /**
     * 协议过滤任务
     */
    function checkProtocolTask() {
        var protocol = document.location.protocol;
        if (protocol != "http:" && protocol != 'https:') {
            log('checkProtocolTask', 'current protocol is:', protocol);
            throw "abort";
        }
    }
    /**
     * 处理cookiepath
     */
    function processCookiePath(path) {
        if (path.length > 1 && path.lastIndexOf("/") == path.length - 1) {
            path = path.substr(0, path.length - 1);
        }
        if (path.indexOf("/") !== 0) {
            path = "/" + path;
        }
        return path;
    }
    /**
     * 处理cookieDomain
     */
    function processCookieDomain(a) {
        return 0 === a.indexOf(".") ? a.substr(1) : a;
    }
    // 存储是否可用
    var storageUsable = false;
    /**
    * 更新cookie
    * @param  {Storage} storage  字段缓存对象
    */
    function updateCookie(storage) {
        if ("cookie" === getStringField(storage, F_storage)) {
            var res = [], cookieName = storage.get(F_cookieName), cookiePath = processCookiePath(storage.get(F_cookiePath)), cookieDomain = processCookieDomain(storage.get(F_cookieDomain)), cookieExpires = storage.get(F_cookieExpires), clientId = getStringField(storage, F_clientId), subs = getDomain().split(".");
            // 指定域名时直接存入对应域名，成功则返回
            if (cookieDomain != "auto") {
                cookie(cookieName, clientId, cookieExpires, cookiePath, cookieDomain);
                if (cookie(cookieName) == clientId) {
                    storageUsable = true;
                    return;
                }
            }
            label: {
                // IP地址
                if (subs.length == 4) {
                    if (subs[subs.length - 1] > 0) {
                        res = ["none"];
                        break label;
                    }
                }
                // 通过hostname截取出所有子域名
                for (var i = subs.length - 2; i >= 0; i--) {
                    res.push(subs.slice(i).join("."));
                }
                res.push("none");
            }
            // 尝试向截取的子域名内存入，成功则返回
            for (var k = 0; k < res.length; k++) {
                cookieDomain = res[k];
                cookie(cookieName, clientId, cookieExpires, cookiePath, cookieDomain);
                if (cookie(cookieName) == clientId) {
                    storage.set(F_cookieDomain, cookieDomain);
                    storageUsable = true;
                    return;
                }
            }
            storage.set(F_cookieDomain, "auto");
        }
    }
    /**
     * 检查存储是否可用任务
     * @param  {Storage} storage 字段缓存对象
     */
    function checkStorageTask(storage) {
        if ("cookie" === getStringField(storage, F_storage) && !storageUsable && (updateCookie(storage), !storageUsable)) {
            // cookie不可用时将用户ID设置为0
            storage.data.set(F_clientId, 0);
            // log('checkStorageTask', 'current storage is:', getStringField(storage, F_storage), '; storageUsable is', +storageUsable);
            // throw "abort";
        }
    }
    /**
     * 抽样率过滤任务
     * @param  {Storage} storage 字段缓存对象
     */
    function samplerTask(storage) {
        if (storage.get(F_sampleRate) !== 100 && hash(getStringField(storage, F_clientId)) % 10000 >= 100 * getIntField(storage, F_sampleRate)) {
            log('samplerTask', 'current sampleRate is: ', storage.get(F_sampleRate));
            throw "abort";
        }
    }
    /**
     * 构建发送数据任务
     * @param  {Storage} storage
     */
    function buildHitTask(storage) {
        var params = [];
        fieldCache.map(function (fieldName, field) {
            if (field.protocolParameter) {
                var fieldValue = storage.get(fieldName);
                if (fieldValue !== 0 && fieldValue != field.defaultValue) {
                    if (typeof fieldValue == "boolean") {
                        fieldValue *= 1;
                    }
                    params.push(field.protocolParameter + "=" + encodeURIComponent("" + fieldValue));
                }
            }
        });
        params.push("z=" + random());
        storage.set(F_hitPayload, params.join("&"), true);
    }
    /**
     * 数据发送任务
     * @param  {Storage} storage 字段缓存对象
     */
    function sendHitTask(storage) {
        var param = getStringField(storage, F_hitPayload);
        var callback = storage.get(F_hitCallback);
        // 是否强制使用某种方式发送
        switch (storage.get(F_forceSendMethod)) {
            case 'image':
                sendByImage(param, callback);
                break;
            case 'cors':
                sendByXMLHttpRequest(param, callback) || sendByXDomainRequest(param, callback);
                break;
            case 'iframe':
                sendByIframe(param, callback);
                break;
            default:
                send(param, callback);
        }
        storage.set(F_hitCallback, noop, !0);
    }
    /**
     * @fileOverview 定义跟踪器类
     */
    /**
    * 通过客户端信息生成客户端id
    * @return {Number} 客户端id
    */
    function buildClientId() {
        var navStr = navigator.appName + navigator.version + navigator.platform + navigator.userAgent + (document.cookie || "") + (document.referrer || ""), len = navStr.length;
        for (var i = window.history.length; i > 0;) {
            navStr += i-- ^ len++;
        }
        return [random() ^ hash(navStr) & 2147483647, String(new Date().getTime()).substr(2, 8)].join('').substr(0, 18);
    }
    /**
    * 设置客户端id
    * @param {Storage} storage  字段缓存对象
    * @param {Number} clientId  客户端id
    */
    function setClientId(storage, clientId) {
        var cookieName = storage.get(F_cookieName), cookieValue = cookie(cookieName);
        if (!clientId) {
            clientId = cookieValue || buildClientId();
        }
        storage.data.set(F_clientId, clientId);
        updateCookie(storage);
    }
    /**
    * 收集客户端信息字符串
    * @param  {Storage} storage  字段缓存对象
    */
    function collectClientInfo(storage) {
        var viewportEle = "CSS1Compat" === document.compatMode ? "documentElement" : "body";
        storage.set("referrer", getReferrer(storage.get(F_alwaysSendReferrer)));
        if (location) {
            var pathname = location.pathname || "";
            if (pathname.charAt(0) != "/") {
                pathname = "/" + pathname;
            }
            storage.set(F_location, location.protocol + "//" + location.hostname + pathname + location.search);
            if (screen) {
                storage.set(F_screenResolution, screen.width + "*" + screen.height);
                storage.set(F_screenColors, screen.colorDepth + "-bit");
            }
            storage.set(F_viewportSize, document[viewportEle].clientWidth + "*" + document[viewportEle].clientHeight);
            storage.set(F_flashVersion, getFlashVersion());
            storage.set(F_encoding, document.characterSet || document.charset);
            var language = "";
            var javaEnabled = false;
            try {
                javaEnabled = navigator && isFunction(navigator.javaEnabled) && navigator.javaEnabled() || false;
            }
            catch (e) {
                log("collectClientInfo", "javaEnabled error", e.message);
            }
            try {
                language = (navigator && (navigator.language || navigator.browserLanguage) || "").toLowerCase();
            }
            catch (ee) {
                log("collectClientInfo", "language error", ee.message);
            }
            storage.set(F_javaEnabled, javaEnabled);
            storage.set(F_language, language);
        }
    }
    /**
     * 获取performance数据
     * @param  {Object} result performance缓存对象
     * @return {Boolean}       是否成功获取
     */
    function getPerformance(result) {
        var performance = window.performance || window.webkitPerformance;
        var timing = performance && performance.timing;
        if (!timing) {
            return false;
        }
        var start = timing.navigationStart;
        if (start === 0) {
            return false;
        }
        result[F_l1] = timing.loadEventStart - start;
        result[F_l3] = timing.domainLookupEnd - timing.domainLookupStart;
        result[F_l6] = timing.connectEnd - timing.connectStart;
        result[F_l5] = timing.responseStart - timing.requestStart;
        result[F_l2] = timing.responseEnd - timing.responseStart;
        result[F_l4] = timing.fetchStart - start;
        result[F_l7] = timing.domInteractive - start;
        result[F_l8] = timing.domContentLoadedEventStart - start;
        return true;
    }
    /**
     * 获取performance数据
     * @param  {Object} result performance缓存对象
     * @return {Boolean}       是否成功获取
     */
    function getPerformanceExternal(result) {
        if (window.top != window) {
            return false;
        }
        var external = window.external;
        var ot = external && external.onloadT;
        if (external && !external.isValidLoadTime) {
            ot = void 0;
        }
        if (ot > 2147483648) {
            ot = void 0;
        }
        if (ot > 0) {
            external.setPageReadyTime();
        }
        if (ot == void 0) {
            return false;
        }
        result[F_l1] = ot;
        return true;
    }
    /**
     * 格式化时间字段
     * @param  {Object} a performance缓存对象
     * @param  {String} b 对应performance字段
     */
    function formatPerformanceVal(a, b) {
        var c = a[b];
        if (isNaN(c) || Infinity == c || 0 > c) {
            a[b] = void 0;
        }
    }
    function collectPerformance(storage, callback) {
        var rate = Math.min(getIntField(storage, F_siteSpeedSampleRate), 100);
        if (hash(getStringField(storage, F_clientId)) % 100 < rate) {
            var result = [];
            if (getPerformance(result) || getPerformanceExternal(result)) {
                var loadEventTime = result[F_l1];
                if (loadEventTime != void 0 && isFinite(loadEventTime) && !isNaN(loadEventTime)) {
                    if (loadEventTime > 0) {
                        formatPerformanceVal(result, F_l3);
                        formatPerformanceVal(result, F_l6);
                        formatPerformanceVal(result, F_l5);
                        formatPerformanceVal(result, F_l2);
                        formatPerformanceVal(result, F_l4);
                        formatPerformanceVal(result, F_l7);
                        formatPerformanceVal(result, F_l8);
                        callback(result);
                    }
                    else {
                        addEvent(window, "load", function () {
                            collectPerformance(storage, callback);
                        }, false);
                    }
                }
            }
        }
    }
    /**
     * 发送timing类型数据
     * @param  {Tracker} tracker 跟踪器
     */
    function sendTiming(tracker) {
        if (!tracker.timingIsSended) {
            tracker.timingIsSended = true;
            collectPerformance(tracker.storage, function (result) {
                // 不参与跳出计算
                tracker.storage.set(F_nonInteraction, true, true);
                tracker.send("timing", result);
            });
        }
    }
    /**
     * 发送心跳
     */
    function sendPulse(tracker) {
        function sendPulseOnce(tracker, delay) {
            setTimeout(function () {
                // 不参与跳出计算
                tracker.storage.set(F_nonInteraction, true, true);
                tracker.send("pulse");
            }, delay * 1000);
        }
        if (tracker.storage.get(F_sendPulse)) {
            for (var i = 0; i < pulseTimeDefine.length; i++) {
                sendPulseOnce(tracker, pulseTimeDefine[i]);
            }
        }
    }
    /**
     * 跟踪器类
     * @param {Object} opts 跟踪器配置
     */
    function Tracker(opts) {
        var that = this;
        that.storage = new Storage();
        that.filters = new Filters();
        function set(name, value) {
            that.storage.data.set(name, value);
        }
        function task(name, value) {
            set(name, value);
            that.filters.add(name);
        }
        set(F_name, opts[F_name]);
        set(F_trackingId, opts[F_trackingId]);
        set(F_cookieName, opts[F_cookieName]);
        set(F_cookieDomain, opts[F_cookieDomain] || getDomain());
        set(F_cookiePath, opts[F_cookiePath]);
        set(F_cookieExpires, opts[F_cookieExpires]);
        set(F_sampleRate, opts[F_sampleRate]);
        set(F_forceSendMethod, opts[F_forceSendMethod]);
        set(F_siteSpeedSampleRate, opts[F_siteSpeedSampleRate]);
        set(F_sendPulse, opts[F_sendPulse]);
        set(F_alwaysSendReferrer, opts[F_alwaysSendReferrer]);
        set(F_userId, opts[F_userId]);
        task(F_checkProtocolTask, checkProtocolTask);
        task(F_checkStorageTask, checkStorageTask);
        task(F_samplerTask, samplerTask);
        task(F_buildHitTask, buildHitTask);
        task(F_sendHitTask, sendHitTask);
        setClientId(that.storage, opts[F_clientId]);
        collectClientInfo(that.storage);
        sendPulse(that);
    }
    /**
     * 获取字段
     * @param  {String} name 字段名
     * @return {*}           字段值
     */
    Tracker.prototype.get = function (name) {
        return this.storage.get(name);
    };
    /**
     * 设置字段值
     * @param  {String} name 字段名
     * @param  {*} value     字段值
     */
    Tracker.prototype.set = function (name, value) {
        this.storage.set(name, value);
        return this;
    };
    /**
     * send方法不同类型参数解构定义
     * @type {Object}
     */
    var sendOptFields = {
        "pageview": [F_page],
        "event": [F_eventCategory, F_eventAction, F_eventLabel, F_eventValue],
        "social": [F_socialNetwork, F_socialAction, F_socialTarget],
        "timing": [F_timingCategory, F_timingVar, F_timingLabel, F_timingValue]
    };
    /**
     * 发送数据
     * @return {Tracker}
     */
    Tracker.prototype.send = function () {
        var hit_type, options;
        if (arguments.length > 0) {
            if (isString(arguments[0])) {
                hit_type = arguments[0];
                options = core_slice.call(arguments, 1);
            }
            else {
                hit_type = arguments[0] && arguments[0][F_hitType];
                options = core_slice.call(arguments);
            }
        }
        if (hit_type) {
            options = preParameters(sendOptFields[hit_type] || [], options);
            options[F_hitType] = hit_type;
            this.storage.set(options, void 0, true);
            this.filters.run(this.storage);
            if (hit_type === 'pageview') {
                sendTiming(this);
            }
            this.storage.clearTemp();
        }
    };
    /**
     * 插件类
     * @param {String} id  插件id
     * @param {String} url 插件请求url
     */
    function Plugin(id, url) {
        var that = this;
        that.id = id;
        that.url = url;
        that.factory = null;
        that.instance = null;
        that.loading = false;
        that.ready = false;
        that.queue = [];
        that.prefix = 'plugin_2015_';
        that.load();
    }
    /**
     * 加载插件文件
     * 插件自身装载完毕后会触发provide方法
     */
    Plugin.prototype.load = function () {
        var that = this;
        that.loading = true;
        loadScript(that.url, that.prefix + that.id);
    };
    /**
     * 插件装载完毕，插件自身加载完成后主动回调
     * @param  {Function} factory 插件构造函数
     * @param  {Tracker}  tracker 跟踪器对象
     */
    Plugin.prototype.provide = function (factory, tracker) {
        var args;
        this.factory = factory;
        this.ready = true;
        this.loading = false;
        try {
            this.instance = new factory(tracker);
        }
        catch (e) {
            this.instance = {};
            log('plugin provide', 'factory init error; plugin id is:', this.id, ';error message is:', e.message);
        }
        while (args = this.queue.shift()) {
            this.use.apply(this, args);
        }
    };
    /**
     * 调用插件对应方法
     * @param  {String} action 方法名
     * @param  {Array}  args   方法参数
     * @return {Undefined}     可能存在异步，所以无返回值
     */
    Plugin.prototype.use = function (action, args) {
        var instance = this.instance;
        if (this.ready) {
            try {
                instance[action].apply(instance, args);
            }
            catch (e) {
                log('plugin use', 'action is: ', action, '; plugin id is:', this.id, ';error message is:', e.message);
            }
        }
        else {
            this.queue.push(core_slice.call(arguments));
        }
    };
    /**
     * 插件管理器类
     */
    function PluginManage() {
        this.plugins = {};
    }
    /**
     * 获取所有插件
     * @return {Object}    插件id->插件实例的键值对象
     */
    PluginManage.prototype.getAll = function () {
        return this.plugins;
    };
    /**
     * 获取单个插件实例
     * @param  {String} id 插件id
     * @return {Plugin}    插件实例
     */
    PluginManage.prototype.get = function (id) {
        return this.plugins[id];
    };
    /**
     * 注册一个插件
     * @param {String} id 插件id
     * @param {Plugin}    插件实例
     */
    PluginManage.prototype.set = function (id, plugin) {
        this.plugins[id] = plugin;
    };
    /**
     * 调用对应插件的对应api
     * @param  {String} id     插件id
     * @param  {String} action 方法名
     * @param  {Array}  args   方法参数
     * @return {Undefined}     可能存在异步，所以无返回值
     */
    PluginManage.prototype.use = function (id, action, args) {
        var plugin = this.get(id);
        if (plugin && plugin.use) {
            plugin.use(action, args);
        }
    };
    /**
     * 引入一个插件
     * @param  {String} id  插件id
     * @param  {String} url 插件url
     */
    PluginManage.prototype.require = function (id, url) {
        if (!this.get(id)) {
            this.set(id, new Plugin(id, url));
        }
    };
    /**
     * 插件加载完成后通知调用
     * @param  {String}    id     插件id
     * @param  {Function} factory 插件构造函数
     * @param  {Tracker}  tracker 跟踪器对象
     */
    PluginManage.prototype.provide = function (id, factory, tracker) {
        var plugin = this.get(id);
        if (plugin && plugin.provide) {
            plugin.provide.apply(plugin, core_slice.call(arguments, 1));
        }
    };
    /**
     * @fileOverview 参数控制器
     */
    /**
     * action拆解
     * @type {RegExp}
     */
    var pattern = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/;
    /**
     * 判断字符串是否包【.:】关键字符
     * @param  {String} a 要判断的字符串
     * @return {Boolean}
     */
    function containKeyword(a) {
        return a.indexOf('.') + a.indexOf(':') > -2;
    }
    /**
     * @param {Array} args 单次操作传入的参数
     */
    function Env(args) {
        var that = this;
        if (isFunction(args[0])) {
            that.ready = args[0];
        }
        else {
            var matches = pattern.exec(args[0]);
            if (matches != null && matches.length == 4) {
                that.name = matches[1] || defaultTrackerName;
                that.pluginId = matches[2] || "";
                that.action = matches[3];
                that.opts = core_slice.call(args, 1);
            }
            if (!that.action) {
                log('Env', 'no action');
                throw "abort";
            }
            if (that.action === "require" && (!isString(args[1]) || args[1] === "")) {
                log('Env', 'unexpected require arg: ', args[1]);
                throw "abort";
            }
            if (that.action === "provide" && (!isString(args[1]) || args[1] === "")) {
                log('Env', 'unexpected provide arg: ', args[1]);
                throw "abort";
            }
            if (containKeyword(that.pluginId) || containKeyword(that.action)) {
                log('Env', 'pluginId or action has  keyword .');
                throw "abort";
            }
            if (that.action === "provide" && that.name != defaultTrackerName) {
                log('Env', 'provide not need trackerName');
                throw "abort";
            }
        }
    }
    var controller = {};
    controller.envs = [];
    controller.pluginM = new PluginManage();
    /**
     * 处理单次用户传入参数
     * @return {Array} 处理后的数组
     */
    controller.process = function () {
        for (var result = [], i = 0; i < arguments.length; i++) {
            try {
                result.push(new Env(arguments[i]));
            }
            catch (e) {
                // log("controller.process", "param abort", arguments[i]);
            }
        }
        return result;
    };
    /**
     * 操作分发
     */
    controller.run = function (env) {
        try {
            if (env.ready) {
                env.ready.call(window, $.getByName(defaultTrackerName));
            }
            else {
                var tracker = $.getByName(env.name);
                if (env.pluginId) {
                    return this.pluginM.use(env.pluginId, env.action, env.opts);
                }
                switch (env.action) {
                    case 'create':
                        $.create.apply($, env.opts);
                        break;
                    case 'remove':
                        $.remove.call($, env.name);
                        break;
                    case 'require':
                        this.pluginM.require.apply(this.pluginM, env.opts);
                        break;
                    case 'provide':
                        this.pluginM.provide.apply(this.pluginM, env.opts.concat([tracker]));
                        break;
                    default:
                        tracker[env.action].apply(tracker, env.opts);
                }
            }
        }
        catch (e) {
            /* dev-only start */
            throw e;
            /* dev-only end */
            log('controller.run', e.message);
        }
    };
    /**
     * 导入用户传入参数缓存
     */
    controller.append = function () {
        var that = this, envs = that.process.apply(that, arguments);
        envs = that.envs.concat(envs);
        that.envs = [];
        while (envs.length) {
            that.run(envs.shift());
            if (that.envs.length > 0) {
                break;
            }
        }
        that.envs = that.envs.concat(envs);
    };
    var lock = [];
    var global = (function (window, gbNameVar, gbNameDefault) {
        var gbName, gbNameOrigin;
        if (isString(window[gbNameVar])) {
            gbNameOrigin = window[gbNameVar];
            gbName = gbNameOrigin ? gbNameOrigin.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") : "";
        }
        return gbName || gbNameDefault;
    })(window, gbNameVar, gbNameDefault);
    function $() {
        controller.append.apply(controller, [arguments]);
    }
    /**
     * 标示文件加载完成，避免重复引入文件
     * @type {Array}
     */
    $.lock = lock;
    /**
     * 跟踪器键值对
     * @type {Object}
     */
    $.cache = {};
    /**
     * 开始加载时间
     * @type {Number}
     */
    $.start = 0;
    /**
     * 跟踪器栈
     * @type {Array}
     */
    $.stack = [];
    /**
     * create方法参数解构定义
     * @type {Array}
     */
    var createOptFields = [F_trackingId, F_cookieDomain, F_name];
    /**
     * 创建一个跟踪器
     * @return {Tracker} 返回创建的生成器
     */
    $.create = function () {
        var options = preParameters(createOptFields, core_slice.call(arguments));
        if (!options[F_name]) {
            options[F_name] = defaultTrackerName;
        }
        var newName = "" + options[F_name];
        if ($.cache[newName]) {
            return $.cache[newName];
        }
        var newTracker = new Tracker(options);
        $.cache[newName] = newTracker;
        $.stack.push(newTracker);
        return newTracker;
    };
    /**
     * 删除一个跟踪器
     * @param  {String} name 跟踪器名称
     */
    $.remove = function (name) {
        for (var i = 0; i < $.stack.length; i++) {
            if ($.stack[i].get(F_name) == name) {
                $.stack.splice(i, 1);
                $.cache[name] = null;
                break;
            }
        }
    };
    /**
     * 获取所有跟踪器
     * @return {Array}
     */
    $.getAll = function () {
        return $.stack.slice(0);
    };
    /**
     * 通过名称获取跟踪器
     * @param  {String}  name 跟踪器名称
     * @return {Tracker}      跟踪器实例
     */
    $.getByName = function (name) {
        return $.cache[name];
    };
    /**
     * 初始化
     */
    $.init = function () {
        var basic = window[global];
        if (!basic || basic.lock != lock) {
            isDebug = !!basic.debug;
            debugSendUrl = basic.debugSendUrl;
            $.loaded = true;
            $.start = basic && basic.start;
            window[global] = $;
            var queue = basic && basic[gbQueue];
            if (isArray(queue)) {
                controller.append.apply(controller, queue);
            }
        }
    };
    $.init();
})(window, document);

}());
