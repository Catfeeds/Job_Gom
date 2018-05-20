(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.GMP = factory();
    if (typeof define === 'function') {
        define('vendors/gmp.js', factory);
    }
}(this, function () {
    'use strict';
    var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
    var asyncGenerator = function () {
        function AwaitValue(value) {
            this.value = value;
        }
        function AsyncGenerator(gen) {
            var front, back;
            function send(key, arg) {
                return new Promise(function (resolve, reject) {
                    var request = {
                        key: key,
                        arg: arg,
                        resolve: resolve,
                        reject: reject,
                        next: null
                    };
                    if (back) {
                        back = back.next = request;
                    } else {
                        front = back = request;
                        resume(key, arg);
                    }
                });
            }
            function resume(key, arg) {
                try {
                    var result = gen[key](arg);
                    var value = result.value;
                    if (value instanceof AwaitValue) {
                        Promise.resolve(value.value).then(function (arg) {
                            resume('next', arg);
                        }, function (arg) {
                            resume('throw', arg);
                        });
                    } else {
                        settle(result.done ? 'return' : 'normal', result.value);
                    }
                } catch (err) {
                    settle('throw', err);
                }
            }
            function settle(type, value) {
                switch (type) {
                case 'return':
                    front.resolve({
                        value: value,
                        done: true
                    });
                    break;
                case 'throw':
                    front.reject(value);
                    break;
                default:
                    front.resolve({
                        value: value,
                        done: false
                    });
                    break;
                }
                front = front.next;
                if (front) {
                    resume(front.key, front.arg);
                } else {
                    back = null;
                }
            }
            this._invoke = send;
            if (typeof gen.return !== 'function') {
                this.return = undefined;
            }
        }
        if (typeof Symbol === 'function' && Symbol.asyncIterator) {
            AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
                return this;
            };
        }
        AsyncGenerator.prototype.next = function (arg) {
            return this._invoke('next', arg);
        };
        AsyncGenerator.prototype.throw = function (arg) {
            return this._invoke('throw', arg);
        };
        AsyncGenerator.prototype.return = function (arg) {
            return this._invoke('return', arg);
        };
        return {
            wrap: function (fn) {
                return function () {
                    return new AsyncGenerator(fn.apply(this, arguments));
                };
            },
            await: function (value) {
                return new AwaitValue(value);
            }
        };
    }();
    var classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    };
    var createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    var get = function get(object, property, receiver) {
        if (object === null)
            object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);
            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;
            if (getter === undefined) {
                return undefined;
            }
            return getter.call(receiver);
        }
    };
    var set = function set(object, property, value, receiver) {
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);
            if (parent !== null) {
                set(parent, property, value, receiver);
            }
        } else if ('value' in desc && desc.writable) {
            desc.value = value;
        } else {
            var setter = desc.set;
            if (setter !== undefined) {
                setter.call(receiver, value);
            }
        }
        return value;
    };
    var uid = 0;
    function initMixin(GMP) {
        GMP._assignPros({
            _init: function _init(options) {
                options = options || {};
                this._uid = 'g' + uid++;
                _extends(this, options);
                this.el = this.el || 'body';
                this._eventsMapList = {};
                this._initState();
                this._initEvents();
                this._initEls();
                this._callHook('init');
            }
        });
    }
    var ObjProto = Object.prototype;
    function isType(type) {
        return function (obj) {
            return ObjProto.toString.call(obj) === '[object ' + type + ']';
        };
    }
    var utils = {
        isFunction: function isFunction(name) {
            return isType('Function')(name);
        },
        isObject: function isObject(name) {
            return isType('Object')(name);
        },
        has: function has(obj, key) {
            return obj != null && ObjProto.hasOwnProperty.call(obj, key);
        },
        create: function create(proto, props) {
            if (this.isObject(props)) {
                Object.keys(props).forEach(function (key) {
                    proto[key] = props[key];
                });
            }
            return proto;
        },
        defaults: function defaults(to, from) {
            var fromAttrs = Object.keys(from);
            fromAttrs.forEach(function (current) {
                if (!to[current] || to[current] === void 0) {
                    to[current] = from[current];
                }
            });
            return to;
        },
        mergeData: function mergeData(to, from) {
            var key = void 0, toVal = void 0, fromVal = void 0;
            for (key in from) {
                toVal = to[key];
                fromVal = from[key];
                if (!Object.hasOwnProperty(to, key)) {
                    Object.defineProperty(to, key, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: fromVal
                    });
                } else if (this.isObject(toVal) && this.isObject(fromVal)) {
                    this.mergeData(toVal, fromVal);
                }
            }
        },
        equal: function equal(a, b, aStack, bStack) {
            if (a === b) {
                return a !== 0 || 1 / a === 1 / b;
            }
            if (a == null || b == null) {
                return a === b;
            }
            var toString = ObjProto.toString;
            var className = toString.call(a);
            if (className !== toString.call(b)) {
                return false;
            }
            switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a)
                    return +b !== +b;
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
            }
            var areArrays = className === '[object Array]';
            if (!areArrays) {
                if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') {
                    return false;
                }
                var aCtor = a.constructor;
                var bCtor = b.constructor;
                if (aCtor !== bCtor && !(this.isFunction(aCtor) && aCtor instanceof aCtor && this.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
                    return false;
                }
            }
            aStack = aStack || [];
            bStack = bStack || [];
            var length = aStack.length;
            while (length--) {
                if (aStack[length] === a) {
                    return bStack[length] === b;
                }
            }
            aStack.push(a);
            bStack.push(b);
            if (areArrays) {
                length = a.length;
                if (length !== b.length) {
                    return false;
                }
                while (length--) {
                    if (!this.equal(a[length], b[length], aStack, bStack)) {
                        return false;
                    }
                }
            } else {
                var key;
                var keys = Object.keys(a);
                length = keys.length;
                if (Object.keys(b).length !== length) {
                    return false;
                }
                while (length--) {
                    key = keys[length];
                    if (!(this.has(b, key) && this.equal(a[key], b[key], aStack, bStack))) {
                        return false;
                    }
                }
            }
            aStack.pop();
            bStack.pop();
            return true;
        }
    };
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;
    function eventsMixin(GMP) {
        GMP._assignPros({
            _initEvents: function _initEvents() {
                registerCallbacks(this, this.events);
            },
            undelegateEvents: function undelegateEvents() {
                if (this.$el) {
                    this.$el.off('.delegateEvents' + this._uid);
                }
                return this;
            },
            delegateEvents: function delegateEvents(events) {
                events || (events = this.events);
                if (!events) {
                    return this;
                }
                this.undelegateEvents();
                for (var key in events) {
                    if (events.hasOwnProperty(key)) {
                        var method = events[key];
                        if (!utils.isFunction(method)) {
                            method = this[method];
                        }
                        if (!method) {
                            continue;
                        }
                        var match = key.match(delegateEventSplitter);
                        this.delegate(match[1], match[2], method.bind(this));
                    }
                }
                return this;
            },
            undelegate: function undelegate(eventName, selector, listener) {
                this.$el.off(eventName + '.delegateEvents' + this._uid, selector, listener);
                return this;
            },
            delegate: function delegate(eventName, selector, listener) {
                this.$el.on(eventName + '.delegateEvents' + this._uid, selector, listener);
                return this;
            },
            _setElement: function _setElement(el) {
                this.$el = el instanceof GMP.$() ? el : GMP.$()(el);
                this.el = this.$el[0];
            },
            _callHook: function _callHook(hook) {
                var handlers = this[hook];
                if (hook && handlers) {
                    handlers.call(this);
                }
            },
            on: function on(name, cb) {
                var evn = this._uid + name;
                if (this._eventsMapList[evn]) {
                    this._eventsMapList[evn].push(cb);
                } else {
                    this._eventsMapList[evn] = [cb];
                }
            },
            off: function off(name) {
                var evn = this._uid + name;
                if (this._eventsMapList[evn]) {
                    this._eventsMapList[evn] = [];
                }
            },
            trigger: function trigger(name, args) {
                var _this = this;
                var evn = this._uid + name;
                var cbs = this._eventsMapList[evn];
                if (cbs) {
                    cbs.forEach(function (fn) {
                        fn.apply(_this, [args]);
                    });
                }
            },
            destroy: function destroy() {
                this.undelegateEvents();
                this.$el.empty();
            }
        });
    }
    function registerCallbacks(vm, events) {
        vm.undelegateEvents();
        vm._setElement(vm.el);
        vm.delegateEvents(events);
        return vm;
    }
    function initState(GMP) {
        GMP._assignPros({
            _initState: function _initState() {
                this._initData();
            },
            _initData: function _initData() {
                var _this = this;
                this._data = this.data || {};
                var keys = Object.keys(this._data);
                var that = this;
                var _loop = function _loop() {
                    var key = keys[i];
                    var val = _this._data[keys[i]];
                    property = Object.getOwnPropertyDescriptor(_this._data, key);
                    if (property && property.configurable === false) {
                        return 'continue';
                    }
                    Object.defineProperty(that._data, key, {
                        enumerable: true,
                        configurable: true,
                        get: function reactiveGetter() {
                            return val;
                        },
                        set: function reactiveSetter(newVal) {
                            var value = val;
                            if (utils.equal(newVal, value)) {
                                return;
                            } else {
                                val = newVal;
                                that.trigger('change:' + key);
                            }
                        }
                    });
                };
                for (var i = 0, l = keys.length; i < l; i++) {
                    var property;
                    var _ret = _loop();
                    if (_ret === 'continue')
                        continue;
                }
            },
            _initEls: function _initEls() {
                var _this2 = this;
                if (this.els) {
                    Object.keys(this.els).forEach(function (current) {
                        _this2.els[current] = _this2.els[current] instanceof GMP.$() ? _this2.els[current] : GMP.$()(_this2.els[current]);
                    });
                }
            }
        });
    }
    function initEventBus(GMP) {
        var events = {};
        var registerEvent = function registerEvent(eName, handler, scope) {
            events[eName] = events[eName] || [];
            events[eName].push({
                scope: scope || this,
                handler: handler
            });
        };
        var removeEvent = function removeEvent(eName, callback, scope) {
            var fns = events[eName];
            scope = scope || this;
            if (!fns) {
                return;
            }
            events[eName] = events[eName].filter(function (fn) {
                if (callback && callback !== fn.callback || scope && scope !== fn.scope) {
                    return true;
                } else {
                    return false;
                }
            });
        };
        var triggerEvent = function triggerEvent(eventName) {
            var fns = events[eventName];
            var i, fn, len;
            if (!fns) {
                return;
            }
            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }
            for (i = 0, len = fns.length; i < len; i++) {
                fn = fns[i];
                fn.handler.apply(fn.scope, params || []);
            }
        };
        GMP.GMPEvents = {
            on: registerEvent,
            off: removeEvent,
            trigger: triggerEvent,
            _events: events
        };
    }
    var GMPX = function () {
        function GMPX(state) {
            classCallCheck(this, GMPX);
            this._init(state);
        }
        createClass(GMPX, [{
                key: '_init',
                value: function _init(state) {
                    var _this = this;
                    if (!state) {
                        return Object.create(null);
                    }
                    var keys = Object.keys(state);
                    this.state = state;
                    var that = this;
                    var _loop = function _loop() {
                        var key = keys[i];
                        var val = _this.state[keys[i]];
                        property = Object.getOwnPropertyDescriptor(_this.state, key);
                        if (property && property.configurable === false) {
                            return 'continue';
                        }
                        Object.defineProperty(that.state, key, {
                            enumerable: true,
                            configurable: true,
                            get: function reactiveGetter() {
                                return val;
                            },
                            set: function reactiveSetter(newVal) {
                                var value = val;
                                if (newVal === value) {
                                    return;
                                }
                                val = newVal;
                            }
                        });
                    };
                    for (var i = 0, l = keys.length; i < l; i++) {
                        var property;
                        var _ret = _loop();
                        if (_ret === 'continue')
                            continue;
                    }
                }
            }]);
        return GMPX;
    }();
    var extend = function (protoProps, staticProps) {
        var parent = this;
        var child;
        if (protoProps && utils.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function child() {
                return parent.apply(this, arguments);
            };
        }
        _extends(child, parent, staticProps);
        child.prototype = utils.create(parent.prototype, protoProps);
        child.prototype.constructor = child;
        child.__super__ = parent.prototype;
        return child;
    };
    var _t = {};
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#x27;',
        '`': '&#x60;'
    };
    var createEscaper = function createEscaper(map) {
        var escaper = function escaper(match) {
            return map[match];
        };
        var source = '(?:' + Object.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function (string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    _t.escape = createEscaper(escapeMap);
    var templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
        '\'': '\'',
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
    var escapeChar = function escapeChar(match) {
        return '\\' + escapes[match];
    };
    var htmlTag = /<[^>]+>/g;
    var text = '';
    function template(str) {
        if (htmlTag.test(str)) {
            text = str;
        } else {
            text = document.getElementById(str).innerHTML || '';
        }
        var matcher = RegExp([
            (templateSettings.escape || noMatch).source,
            (templateSettings.interpolate || noMatch).source,
            (templateSettings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');
        var index = 0;
        var source = '__p+=\'';
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, escapeChar);
            index = offset + match.length;
            if (escape) {
                source += '\'+\n((__t=(' + escape + '))==null?\'\':_t.escape(__t))+\n\'';
            } else if (interpolate) {
                source += '\'+\n((__t=(' + interpolate + '))==null?\'\':__t)+\n\'';
            } else if (evaluate) {
                source += '\';\n' + evaluate + '\n__p+=\'';
            }
            return match;
        });
        source += '\';\n';
        source = 'with(obj||{}){\n' + source + '}\n';
        source = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + source + 'return __p;\n';
        try {
            var render = new Function('obj', source);
        } catch (e) {
            e.source = source;
            throw e;
        }
        var template = function template(data) {
            return render.call(this, data);
        };
        var argument = 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';
        return template;
    }
    var GMP$1 = function () {
        function GMP(options) {
            classCallCheck(this, GMP);
            this._init(options);
        }
        createClass(GMP, null, [
            {
                key: '$',
                value: function (_$) {
                    function $() {
                        return _$.apply(this, arguments);
                    }
                    $.toString = function () {
                        return _$.toString();
                    };
                    return $;
                }(function () {
                    if (window.jQuery || window.$ || $) {
                        return window.jQuery || window.$ || $;
                    }
                    throw new Error('GMP need jQuery or Zepto in window scope named $');
                })
            },
            {
                key: '_assignPros',
                value: function _assignPros(pros) {
                    _extends(GMP.prototype, pros);
                }
            }
        ]);
        return GMP;
    }();
    initMixin(GMP$1);
    eventsMixin(GMP$1);
    initState(GMP$1);
    initEventBus(GMP$1);
    GMP$1.GMPX = GMPX;
    GMP$1.extend = extend;
    GMP$1.template = template;
    return GMP$1;
}));