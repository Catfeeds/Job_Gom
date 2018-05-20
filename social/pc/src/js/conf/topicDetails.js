webpackJsonp([37],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	__webpack_require__(197);
	$("img").lazyload({ effect: "fadeIn" });
	var commentv2 = __webpack_require__(271);
	var circle = __webpack_require__(284);
	var follow = __webpack_require__(285);
	var praise = __webpack_require__(287);

	var share = __webpack_require__(288);
	var collect = __webpack_require__(289);
	var topicAddMore = __webpack_require__(290);
	// 发送统计数据用

	var buriedPoint = __webpack_require__(56);
	var addImg = __webpack_require__(296);
	var addGoods = __webpack_require__(299);
	buriedPoint.setPageData('topicDetail');

	commentv2.init(); // 评论
	share.init(); // 分享
	collect.init(); // 收藏
	praise.init(); // 赞
	follow.init($('[data-node=follow]')); // 加关注
	topicAddMore.init(); //加载更多话题

	addGoods.init(); //商品选择
	addImg.init(); //添加图片事件

	// 加入圈子
	$('body').on('click', '[data-node=circle]', { done: function done() {
	        commentv2.getLoginState();
	        window.location.reload();
	    } }, circle);
	$("img").lazyload({ effect: "fadeIn" });
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Dialog = __webpack_require__(22);
	var noop = function noop() {};

	var create = function create(content, options) {
	    var defaults = {
	        fixed: true,
	        modal: true,
	        content: '<p class="del-pop-p">' + content + '</p>',
	        className: 'pop-box',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        ok: noop,
	        cancel: noop,
	        btnWrapCls: 'two-buttons'
	    };
	    $.extend(true, defaults, options);

	    var d = Dialog(defaults);

	    // var header = d._$('header');
	    // var title = d._$('title');
	    // title.css('borderBottom', 'none');
	    // header.show();

	    d.show();
	    return d;
	};

	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/*
	 * 弹层提示弹窗
	 * zhaodonghong
	 */

	var $publicMask;
	var $publicTips;
	var timer;

	var events = function events() {

	    $publicMask.off().on('click', function () {
	        $publicMask.hide();
	        $publicTips.hide();
	    });

	    $publicTips.off().on('click', function () {
	        $publicMask.hide();
	        $publicTips.hide();
	    });
	};

	/**
	 * msg string 提示信息
	 * options object 
	 * options.duration settimout消失时间
	 * options.callback 提示消失的回调
	*/
	var init = function init(msg, options) {
	    var defaults = {
	        duration: 2000,
	        callback: function callback() {}
	    };

	    $.extend(defaults, options || {});

	    clearTimeout(timer);
	    $publicMask = $('[data-action="publicMask"]');
	    $publicTips = $('[data-action="publicTips"]');

	    if ($publicMask.length > 0) {

	        $publicMask.show();
	        $publicTips.show().text(msg);
	    } else {

	        $('body').append('<div data-action="publicMask" class="ordi-toast"></div><div class="ordi-toast-txt" data-action="publicTips">' + msg + '</div>');
	        $publicMask = $('[data-action="publicMask"]');
	        $publicTips = $('[data-action="publicTips"]');
	        events();
	    }

	    $publicTips.css('margin', -$publicTips[0].offsetHeight / 2 + 'px 0 0 ' + -$publicTips.width() / 2 + 'px');

	    timer = setTimeout(function () {

	        $publicMask.hide();
	        $publicTips.hide();

	        defaults.callback();
	    }, defaults.duration);
	};

	module.exports = {
	    init: init,
	    events: events
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*! WebUploader 0.1.5 */


	/**
	 * @fileOverview 让内部各个部件的代码可以用[amd](https://github.com/amdjs/amdjs-api/wiki/AMD)模块定义方式组织起来。
	 *
	 * AMD API 内部的简单不完全实现，请忽略。只有当WebUploader被合并成一个文件的时候才会引入。
	 */
	(function( root, factory ) {
	    var modules = {},

	        // 内部require, 简单不完全实现。
	        // https://github.com/amdjs/amdjs-api/wiki/require
	        _require = function( deps, callback ) {
	            var args, len, i;

	            // 如果deps不是数组，则直接返回指定module
	            if ( typeof deps === 'string' ) {
	                return getModule( deps );
	            } else {
	                args = [];
	                for( len = deps.length, i = 0; i < len; i++ ) {
	                    args.push( getModule( deps[ i ] ) );
	                }

	                return callback.apply( null, args );
	            }
	        },

	        // 内部define，暂时不支持不指定id.
	        _define = function( id, deps, factory ) {
	            if ( arguments.length === 2 ) {
	                factory = deps;
	                deps = null;
	            }

	            _require( deps || [], function() {
	                setModule( id, factory, arguments );
	            });
	        },

	        // 设置module, 兼容CommonJs写法。
	        setModule = function( id, factory, args ) {
	            var module = {
	                    exports: factory
	                },
	                returned;

	            if ( typeof factory === 'function' ) {
	                args.length || (args = [ _require, module.exports, module ,__webpack_provided_window_dot_jQuery]);
	                returned = factory.apply( null, args );
	                returned !== undefined && (module.exports = returned);
	            }

	            modules[ id ] = module.exports;
	        },

	        // 根据id获取module
	        getModule = function( id ) {
	            var module = modules[ id ] || root[ id ];

	            if ( !module ) {
	                throw new Error( '`' + id + '` is undefined' );
	            }

	            return module;
	        },

	        // 将所有modules，将路径ids装换成对象。
	        exportsTo = function( obj ) {
	            var key, host, parts, part, last, ucFirst;

	            // make the first character upper case.
	            ucFirst = function( str ) {
	                return str && (str.charAt( 0 ).toUpperCase() + str.substr( 1 ));
	            };

	            for ( key in modules ) {
	                host = obj;

	                if ( !modules.hasOwnProperty( key ) ) {
	                    continue;
	                }

	                parts = key.split('/');
	                last = ucFirst( parts.pop() );

	                while( (part = ucFirst( parts.shift() )) ) {
	                    host[ part ] = host[ part ] || {};
	                    host = host[ part ];
	                }

	                host[ last ] = modules[ key ];
	            }

	            return obj;
	        },

	        makeExport = function( dollar ) {
	            root.__dollar = dollar;

	            // exports every module.
	            return exportsTo( factory( root, _define, _require,__webpack_provided_window_dot_jQuery ) );
	        },

	        origin;

	    if ( typeof module === 'object' && typeof module.exports === 'object' ) {

	        // For CommonJS and CommonJS-like environments where a proper window is present,
	        module.exports = makeExport();
	    } else if ( true ) {

	        // Allow using this built library as an AMD module
	        // in another project. That other project will only
	        // see this AMD call, not the internal modules in
	        // the closure below.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(1) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (makeExport), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {

	        // Browser globals case. Just assign the
	        // result to a property on the global.
	        origin = root.WebUploader;
	        root.WebUploader = makeExport();
	        root.WebUploader.noConflict = function() {
	            root.WebUploader = origin;
	        };
	    }
	})( window, function( window, define, require ,jQuery ) {


	    /**
	     * @fileOverview jQuery or Zepto
	     */
	    define('dollar-third',[],function() {
	        var $ = window.__dollar || window.jQuery || window.Zepto || jQuery;
	    
	        if ( !$ ) {
	            throw new Error('jQuery or Zepto not found!');
	        }
	    
	        return $;
	    });
	    /**
	     * @fileOverview Dom 操作相关
	     */
	    define('dollar',[
	        'dollar-third'
	    ], function( _ ) {
	        return _;
	    });
	    /**
	     * @fileOverview 使用jQuery的Promise
	     */
	    define('promise-third',[
	        'dollar'
	    ], function( $ ) {
	        return {
	            Deferred: $.Deferred,
	            when: $.when,
	    
	            isPromise: function( anything ) {
	                return anything && typeof anything.then === 'function';
	            }
	        };
	    });
	    /**
	     * @fileOverview Promise/A+
	     */
	    define('promise',[
	        'promise-third'
	    ], function( _ ) {
	        return _;
	    });
	    /**
	     * @fileOverview 基础类方法。
	     */
	    
	    /**
	     * Web Uploader内部类的详细说明，以下提及的功能类，都可以在`WebUploader`这个变量中访问到。
	     *
	     * As you know, Web Uploader的每个文件都是用过[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)规范中的`define`组织起来的, 每个Module都会有个module id.
	     * 默认module id为该文件的路径，而此路径将会转化成名字空间存放在WebUploader中。如：
	     *
	     * * module `base`：WebUploader.Base
	     * * module `file`: WebUploader.File
	     * * module `lib/dnd`: WebUploader.Lib.Dnd
	     * * module `runtime/html5/dnd`: WebUploader.Runtime.Html5.Dnd
	     *
	     *
	     * 以下文档中对类的使用可能省略掉了`WebUploader`前缀。
	     * @module WebUploader
	     * @title WebUploader API文档
	     */
	    define('base',[
	        'dollar',
	        'promise'
	    ], function( $, promise ) {
	    
	        var noop = function() {},
	            call = Function.call;
	    
	        // http://jsperf.com/uncurrythis
	        // 反科里化
	        function uncurryThis( fn ) {
	            return function() {
	                return call.apply( fn, arguments );
	            };
	        }
	    
	        function bindFn( fn, context ) {
	            return function() {
	                return fn.apply( context, arguments );
	            };
	        }
	    
	        function createObject( proto ) {
	            var f;
	    
	            if ( Object.create ) {
	                return Object.create( proto );
	            } else {
	                f = function() {};
	                f.prototype = proto;
	                return new f();
	            }
	        }
	    
	    
	        /**
	         * 基础类，提供一些简单常用的方法。
	         * @class Base
	         */
	        return {
	    
	            /**
	             * @property {String} version 当前版本号。
	             */
	            version: '0.1.5',
	    
	            /**
	             * @property {jQuery|Zepto} $ 引用依赖的jQuery或者Zepto对象。
	             */
	            $: $,
	    
	            Deferred: promise.Deferred,
	    
	            isPromise: promise.isPromise,
	    
	            when: promise.when,
	    
	            /**
	             * @description  简单的浏览器检查结果。
	             *
	             * * `webkit`  webkit版本号，如果浏览器为非webkit内核，此属性为`undefined`。
	             * * `chrome`  chrome浏览器版本号，如果浏览器为chrome，此属性为`undefined`。
	             * * `ie`  ie浏览器版本号，如果浏览器为非ie，此属性为`undefined`。**暂不支持ie10+**
	             * * `firefox`  firefox浏览器版本号，如果浏览器为非firefox，此属性为`undefined`。
	             * * `safari`  safari浏览器版本号，如果浏览器为非safari，此属性为`undefined`。
	             * * `opera`  opera浏览器版本号，如果浏览器为非opera，此属性为`undefined`。
	             *
	             * @property {Object} [browser]
	             */
	            browser: (function( ua ) {
	                var ret = {},
	                    webkit = ua.match( /WebKit\/([\d.]+)/ ),
	                    chrome = ua.match( /Chrome\/([\d.]+)/ ) ||
	                        ua.match( /CriOS\/([\d.]+)/ ),
	    
	                    ie = ua.match( /MSIE\s([\d\.]+)/ ) ||
	                        ua.match( /(?:trident)(?:.*rv:([\w.]+))?/i ),
	                    firefox = ua.match( /Firefox\/([\d.]+)/ ),
	                    safari = ua.match( /Safari\/([\d.]+)/ ),
	                    opera = ua.match( /OPR\/([\d.]+)/ );
	    
	                webkit && (ret.webkit = parseFloat( webkit[ 1 ] ));
	                chrome && (ret.chrome = parseFloat( chrome[ 1 ] ));
	                ie && (ret.ie = parseFloat( ie[ 1 ] ));
	                firefox && (ret.firefox = parseFloat( firefox[ 1 ] ));
	                safari && (ret.safari = parseFloat( safari[ 1 ] ));
	                opera && (ret.opera = parseFloat( opera[ 1 ] ));
	    
	                return ret;
	            })( navigator.userAgent ),
	    
	            /**
	             * @description  操作系统检查结果。
	             *
	             * * `android`  如果在android浏览器环境下，此值为对应的android版本号，否则为`undefined`。
	             * * `ios` 如果在ios浏览器环境下，此值为对应的ios版本号，否则为`undefined`。
	             * @property {Object} [os]
	             */
	            os: (function( ua ) {
	                var ret = {},
	    
	                    // osx = !!ua.match( /\(Macintosh\; Intel / ),
	                    android = ua.match( /(?:Android);?[\s\/]+([\d.]+)?/ ),
	                    ios = ua.match( /(?:iPad|iPod|iPhone).*OS\s([\d_]+)/ );
	    
	                // osx && (ret.osx = true);
	                android && (ret.android = parseFloat( android[ 1 ] ));
	                ios && (ret.ios = parseFloat( ios[ 1 ].replace( /_/g, '.' ) ));
	    
	                return ret;
	            })( navigator.userAgent ),
	    
	            /**
	             * 实现类与类之间的继承。
	             * @method inherits
	             * @grammar Base.inherits( super ) => child
	             * @grammar Base.inherits( super, protos ) => child
	             * @grammar Base.inherits( super, protos, statics ) => child
	             * @param  {Class} super 父类
	             * @param  {Object | Function} [protos] 子类或者对象。如果对象中包含constructor，子类将是用此属性值。
	             * @param  {Function} [protos.constructor] 子类构造器，不指定的话将创建个临时的直接执行父类构造器的方法。
	             * @param  {Object} [statics] 静态属性或方法。
	             * @return {Class} 返回子类。
	             * @example
	             * function Person() {
	             *     console.log( 'Super' );
	             * }
	             * Person.prototype.hello = function() {
	             *     console.log( 'hello' );
	             * };
	             *
	             * var Manager = Base.inherits( Person, {
	             *     world: function() {
	             *         console.log( 'World' );
	             *     }
	             * });
	             *
	             * // 因为没有指定构造器，父类的构造器将会执行。
	             * var instance = new Manager();    // => Super
	             *
	             * // 继承子父类的方法
	             * instance.hello();    // => hello
	             * instance.world();    // => World
	             *
	             * // 子类的__super__属性指向父类
	             * console.log( Manager.__super__ === Person );    // => true
	             */
	            inherits: function( Super, protos, staticProtos ) {
	                var child;
	    
	                if ( typeof protos === 'function' ) {
	                    child = protos;
	                    protos = null;
	                } else if ( protos && protos.hasOwnProperty('constructor') ) {
	                    child = protos.constructor;
	                } else {
	                    child = function() {
	                        return Super.apply( this, arguments );
	                    };
	                }
	    
	                // 复制静态方法
	                $.extend( true, child, Super, staticProtos || {} );
	    
	                /* jshint camelcase: false */
	    
	                // 让子类的__super__属性指向父类。
	                child.__super__ = Super.prototype;
	    
	                // 构建原型，添加原型方法或属性。
	                // 暂时用Object.create实现。
	                child.prototype = createObject( Super.prototype );
	                protos && $.extend( true, child.prototype, protos );
	    
	                return child;
	            },
	    
	            /**
	             * 一个不做任何事情的方法。可以用来赋值给默认的callback.
	             * @method noop
	             */
	            noop: noop,
	    
	            /**
	             * 返回一个新的方法，此方法将已指定的`context`来执行。
	             * @grammar Base.bindFn( fn, context ) => Function
	             * @method bindFn
	             * @example
	             * var doSomething = function() {
	             *         console.log( this.name );
	             *     },
	             *     obj = {
	             *         name: 'Object Name'
	             *     },
	             *     aliasFn = Base.bind( doSomething, obj );
	             *
	             *  aliasFn();    // => Object Name
	             *
	             */
	            bindFn: bindFn,
	    
	            /**
	             * 引用Console.log如果存在的话，否则引用一个[空函数noop](#WebUploader:Base.noop)。
	             * @grammar Base.log( args... ) => undefined
	             * @method log
	             */
	            log: (function() {
	                if ( window.console ) {
	                    return bindFn( console.log, console );
	                }
	                return noop;
	            })(),
	    
	            nextTick: (function() {
	    
	                return function( cb ) {
	                    setTimeout( cb, 1 );
	                };
	    
	                // @bug 当浏览器不在当前窗口时就停了。
	                // var next = window.requestAnimationFrame ||
	                //     window.webkitRequestAnimationFrame ||
	                //     window.mozRequestAnimationFrame ||
	                //     function( cb ) {
	                //         window.setTimeout( cb, 1000 / 60 );
	                //     };
	    
	                // // fix: Uncaught TypeError: Illegal invocation
	                // return bindFn( next, window );
	            })(),
	    
	            /**
	             * 被[uncurrythis](http://www.2ality.com/2011/11/uncurrying-this.html)的数组slice方法。
	             * 将用来将非数组对象转化成数组对象。
	             * @grammar Base.slice( target, start[, end] ) => Array
	             * @method slice
	             * @example
	             * function doSomthing() {
	             *     var args = Base.slice( arguments, 1 );
	             *     console.log( args );
	             * }
	             *
	             * doSomthing( 'ignored', 'arg2', 'arg3' );    // => Array ["arg2", "arg3"]
	             */
	            slice: uncurryThis( [].slice ),
	    
	            /**
	             * 生成唯一的ID
	             * @method guid
	             * @grammar Base.guid() => String
	             * @grammar Base.guid( prefx ) => String
	             */
	            guid: (function() {
	                var counter = 0;
	    
	                return function( prefix ) {
	                    var guid = (+new Date()).toString( 32 ),
	                        i = 0;
	    
	                    for ( ; i < 5; i++ ) {
	                        guid += Math.floor( Math.random() * 65535 ).toString( 32 );
	                    }
	    
	                    return (prefix || 'wu_') + guid + (counter++).toString( 32 );
	                };
	            })(),
	    
	            /**
	             * 格式化文件大小, 输出成带单位的字符串
	             * @method formatSize
	             * @grammar Base.formatSize( size ) => String
	             * @grammar Base.formatSize( size, pointLength ) => String
	             * @grammar Base.formatSize( size, pointLength, units ) => String
	             * @param {Number} size 文件大小
	             * @param {Number} [pointLength=2] 精确到的小数点数。
	             * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
	             * @example
	             * console.log( Base.formatSize( 100 ) );    // => 100B
	             * console.log( Base.formatSize( 1024 ) );    // => 1.00K
	             * console.log( Base.formatSize( 1024, 0 ) );    // => 1K
	             * console.log( Base.formatSize( 1024 * 1024 ) );    // => 1.00M
	             * console.log( Base.formatSize( 1024 * 1024 * 1024 ) );    // => 1.00G
	             * console.log( Base.formatSize( 1024 * 1024 * 1024, 0, ['B', 'KB', 'MB'] ) );    // => 1024MB
	             */
	            formatSize: function( size, pointLength, units ) {
	                var unit;
	    
	                units = units || [ 'B', 'K', 'M', 'G', 'TB' ];
	    
	                while ( (unit = units.shift()) && size > 1024 ) {
	                    size = size / 1024;
	                }
	    
	                return (unit === 'B' ? size : size.toFixed( pointLength || 2 )) +
	                        unit;
	            }
	        };
	    });
	    /**
	     * 事件处理类，可以独立使用，也可以扩展给对象使用。
	     * @fileOverview Mediator
	     */
	    define('mediator',[
	        'base'
	    ], function( Base ) {
	        var $ = Base.$,
	            slice = [].slice,
	            separator = /\s+/,
	            protos;
	    
	        // 根据条件过滤出事件handlers.
	        function findHandlers( arr, name, callback, context ) {
	            return $.grep( arr, function( handler ) {
	                return handler &&
	                        (!name || handler.e === name) &&
	                        (!callback || handler.cb === callback ||
	                        handler.cb._cb === callback) &&
	                        (!context || handler.ctx === context);
	            });
	        }
	    
	        function eachEvent( events, callback, iterator ) {
	            // 不支持对象，只支持多个event用空格隔开
	            $.each( (events || '').split( separator ), function( _, key ) {
	                iterator( key, callback );
	            });
	        }
	    
	        function triggerHanders( events, args ) {
	            var stoped = false,
	                i = -1,
	                len = events.length,
	                handler;
	    
	            while ( ++i < len ) {
	                handler = events[ i ];
	    
	                if ( handler.cb.apply( handler.ctx2, args ) === false ) {
	                    stoped = true;
	                    break;
	                }
	            }
	    
	            return !stoped;
	        }
	    
	        protos = {
	    
	            /**
	             * 绑定事件。
	             *
	             * `callback`方法在执行时，arguments将会来源于trigger的时候携带的参数。如
	             * ```javascript
	             * var obj = {};
	             *
	             * // 使得obj有事件行为
	             * Mediator.installTo( obj );
	             *
	             * obj.on( 'testa', function( arg1, arg2 ) {
	             *     console.log( arg1, arg2 ); // => 'arg1', 'arg2'
	             * });
	             *
	             * obj.trigger( 'testa', 'arg1', 'arg2' );
	             * ```
	             *
	             * 如果`callback`中，某一个方法`return false`了，则后续的其他`callback`都不会被执行到。
	             * 切会影响到`trigger`方法的返回值，为`false`。
	             *
	             * `on`还可以用来添加一个特殊事件`all`, 这样所有的事件触发都会响应到。同时此类`callback`中的arguments有一个不同处，
	             * 就是第一个参数为`type`，记录当前是什么事件在触发。此类`callback`的优先级比脚低，会再正常`callback`执行完后触发。
	             * ```javascript
	             * obj.on( 'all', function( type, arg1, arg2 ) {
	             *     console.log( type, arg1, arg2 ); // => 'testa', 'arg1', 'arg2'
	             * });
	             * ```
	             *
	             * @method on
	             * @grammar on( name, callback[, context] ) => self
	             * @param  {String}   name     事件名，支持多个事件用空格隔开
	             * @param  {Function} callback 事件处理器
	             * @param  {Object}   [context]  事件处理器的上下文。
	             * @return {self} 返回自身，方便链式
	             * @chainable
	             * @class Mediator
	             */
	            on: function( name, callback, context ) {
	                var me = this,
	                    set;
	    
	                if ( !callback ) {
	                    return this;
	                }
	    
	                set = this._events || (this._events = []);
	    
	                eachEvent( name, callback, function( name, callback ) {
	                    var handler = { e: name };
	    
	                    handler.cb = callback;
	                    handler.ctx = context;
	                    handler.ctx2 = context || me;
	                    handler.id = set.length;
	    
	                    set.push( handler );
	                });
	    
	                return this;
	            },
	    
	            /**
	             * 绑定事件，且当handler执行完后，自动解除绑定。
	             * @method once
	             * @grammar once( name, callback[, context] ) => self
	             * @param  {String}   name     事件名
	             * @param  {Function} callback 事件处理器
	             * @param  {Object}   [context]  事件处理器的上下文。
	             * @return {self} 返回自身，方便链式
	             * @chainable
	             */
	            once: function( name, callback, context ) {
	                var me = this;
	    
	                if ( !callback ) {
	                    return me;
	                }
	    
	                eachEvent( name, callback, function( name, callback ) {
	                    var once = function() {
	                            me.off( name, once );
	                            return callback.apply( context || me, arguments );
	                        };
	    
	                    once._cb = callback;
	                    me.on( name, once, context );
	                });
	    
	                return me;
	            },
	    
	            /**
	             * 解除事件绑定
	             * @method off
	             * @grammar off( [name[, callback[, context] ] ] ) => self
	             * @param  {String}   [name]     事件名
	             * @param  {Function} [callback] 事件处理器
	             * @param  {Object}   [context]  事件处理器的上下文。
	             * @return {self} 返回自身，方便链式
	             * @chainable
	             */
	            off: function( name, cb, ctx ) {
	                var events = this._events;
	    
	                if ( !events ) {
	                    return this;
	                }
	    
	                if ( !name && !cb && !ctx ) {
	                    this._events = [];
	                    return this;
	                }
	    
	                eachEvent( name, cb, function( name, cb ) {
	                    $.each( findHandlers( events, name, cb, ctx ), function() {
	                        delete events[ this.id ];
	                    });
	                });
	    
	                return this;
	            },
	    
	            /**
	             * 触发事件
	             * @method trigger
	             * @grammar trigger( name[, args...] ) => self
	             * @param  {String}   type     事件名
	             * @param  {*} [...] 任意参数
	             * @return {Boolean} 如果handler中return false了，则返回false, 否则返回true
	             */
	            trigger: function( type ) {
	                var args, events, allEvents;
	    
	                if ( !this._events || !type ) {
	                    return this;
	                }
	    
	                args = slice.call( arguments, 1 );
	                events = findHandlers( this._events, type );
	                allEvents = findHandlers( this._events, 'all' );
	    
	                return triggerHanders( events, args ) &&
	                        triggerHanders( allEvents, arguments );
	            }
	        };
	    
	        /**
	         * 中介者，它本身是个单例，但可以通过[installTo](#WebUploader:Mediator:installTo)方法，使任何对象具备事件行为。
	         * 主要目的是负责模块与模块之间的合作，降低耦合度。
	         *
	         * @class Mediator
	         */
	        return $.extend({
	    
	            /**
	             * 可以通过这个接口，使任何对象具备事件功能。
	             * @method installTo
	             * @param  {Object} obj 需要具备事件行为的对象。
	             * @return {Object} 返回obj.
	             */
	            installTo: function( obj ) {
	                return $.extend( obj, protos );
	            }
	    
	        }, protos );
	    });
	    /**
	     * @fileOverview Uploader上传类
	     */
	    define('uploader',[
	        'base',
	        'mediator'
	    ], function( Base, Mediator ) {
	    
	        var $ = Base.$;
	    
	        /**
	         * 上传入口类。
	         * @class Uploader
	         * @constructor
	         * @grammar new Uploader( opts ) => Uploader
	         * @example
	         * var uploader = WebUploader.Uploader({
	         *     swf: 'path_of_swf/Uploader.swf',
	         *
	         *     // 开起分片上传。
	         *     chunked: true
	         * });
	         */
	        function Uploader( opts ) {
	            this.options = $.extend( true, {}, Uploader.options, opts );
	            this._init( this.options );
	        }
	    
	        // default Options
	        // widgets中有相应扩展
	        Uploader.options = {};
	        Mediator.installTo( Uploader.prototype );
	    
	        // 批量添加纯命令式方法。
	        $.each({
	            upload: 'start-upload',
	            stop: 'stop-upload',
	            getFile: 'get-file',
	            getFiles: 'get-files',
	            addFile: 'add-file',
	            addFiles: 'add-file',
	            sort: 'sort-files',
	            removeFile: 'remove-file',
	            cancelFile: 'cancel-file',
	            skipFile: 'skip-file',
	            retry: 'retry',
	            isInProgress: 'is-in-progress',
	            makeThumb: 'make-thumb',
	            md5File: 'md5-file',
	            getDimension: 'get-dimension',
	            addButton: 'add-btn',
	            predictRuntimeType: 'predict-runtime-type',
	            refresh: 'refresh',
	            disable: 'disable',
	            enable: 'enable',
	            reset: 'reset'
	        }, function( fn, command ) {
	            Uploader.prototype[ fn ] = function() {
	                return this.request( command, arguments );
	            };
	        });
	    
	        $.extend( Uploader.prototype, {
	            state: 'pending',
	    
	            _init: function( opts ) {
	                var me = this;
	    
	                me.request( 'init', opts, function() {
	                    me.state = 'ready';
	                    me.trigger('ready');
	                });
	            },
	    
	            /**
	             * 获取或者设置Uploader配置项。
	             * @method option
	             * @grammar option( key ) => *
	             * @grammar option( key, val ) => self
	             * @example
	             *
	             * // 初始状态图片上传前不会压缩
	             * var uploader = new WebUploader.Uploader({
	             *     compress: null;
	             * });
	             *
	             * // 修改后图片上传前，尝试将图片压缩到1600 * 1600
	             * uploader.option( 'compress', {
	             *     width: 1600,
	             *     height: 1600
	             * });
	             */
	            option: function( key, val ) {
	                var opts = this.options;
	    
	                // setter
	                if ( arguments.length > 1 ) {
	    
	                    if ( $.isPlainObject( val ) &&
	                            $.isPlainObject( opts[ key ] ) ) {
	                        $.extend( opts[ key ], val );
	                    } else {
	                        opts[ key ] = val;
	                    }
	    
	                } else {    // getter
	                    return key ? opts[ key ] : opts;
	                }
	            },
	    
	            /**
	             * 获取文件统计信息。返回一个包含一下信息的对象。
	             * * `successNum` 上传成功的文件数
	             * * `progressNum` 上传中的文件数
	             * * `cancelNum` 被删除的文件数
	             * * `invalidNum` 无效的文件数
	             * * `uploadFailNum` 上传失败的文件数
	             * * `queueNum` 还在队列中的文件数
	             * * `interruptNum` 被暂停的文件数
	             * @method getStats
	             * @grammar getStats() => Object
	             */
	            getStats: function() {
	                // return this._mgr.getStats.apply( this._mgr, arguments );
	                var stats = this.request('get-stats');
	    
	                return stats ? {
	                    successNum: stats.numOfSuccess,
	                    progressNum: stats.numOfProgress,
	    
	                    // who care?
	                    // queueFailNum: 0,
	                    cancelNum: stats.numOfCancel,
	                    invalidNum: stats.numOfInvalid,
	                    uploadFailNum: stats.numOfUploadFailed,
	                    queueNum: stats.numOfQueue,
	                    interruptNum: stats.numofInterrupt
	                } : {};
	            },
	    
	            // 需要重写此方法来来支持opts.onEvent和instance.onEvent的处理器
	            trigger: function( type/*, args...*/ ) {
	                var args = [].slice.call( arguments, 1 ),
	                    opts = this.options,
	                    name = 'on' + type.substring( 0, 1 ).toUpperCase() +
	                        type.substring( 1 );
	    
	                if (
	                        // 调用通过on方法注册的handler.
	                        Mediator.trigger.apply( this, arguments ) === false ||
	    
	                        // 调用opts.onEvent
	                        $.isFunction( opts[ name ] ) &&
	                        opts[ name ].apply( this, args ) === false ||
	    
	                        // 调用this.onEvent
	                        $.isFunction( this[ name ] ) &&
	                        this[ name ].apply( this, args ) === false ||
	    
	                        // 广播所有uploader的事件。
	                        Mediator.trigger.apply( Mediator,
	                        [ this, type ].concat( args ) ) === false ) {
	    
	                    return false;
	                }
	    
	                return true;
	            },
	    
	            /**
	             * 销毁 webuploader 实例
	             * @method destroy
	             * @grammar destroy() => undefined
	             */
	            destroy: function() {
	                this.request( 'destroy', arguments );
	                this.off();
	            },
	    
	            // widgets/widget.js将补充此方法的详细文档。
	            request: Base.noop
	        });
	    
	        /**
	         * 创建Uploader实例，等同于new Uploader( opts );
	         * @method create
	         * @class Base
	         * @static
	         * @grammar Base.create( opts ) => Uploader
	         */
	        Base.create = Uploader.create = function( opts ) {
	            return new Uploader( opts );
	        };
	    
	        // 暴露Uploader，可以通过它来扩展业务逻辑。
	        Base.Uploader = Uploader;
	    
	        return Uploader;
	    });
	    /**
	     * @fileOverview Runtime管理器，负责Runtime的选择, 连接
	     */
	    define('runtime/runtime',[
	        'base',
	        'mediator'
	    ], function( Base, Mediator ) {
	    
	        var $ = Base.$,
	            factories = {},
	    
	            // 获取对象的第一个key
	            getFirstKey = function( obj ) {
	                for ( var key in obj ) {
	                    if ( obj.hasOwnProperty( key ) ) {
	                        return key;
	                    }
	                }
	                return null;
	            };
	    
	        // 接口类。
	        function Runtime( options ) {
	            this.options = $.extend({
	                container: document.body
	            }, options );
	            this.uid = Base.guid('rt_');
	        }
	    
	        $.extend( Runtime.prototype, {
	    
	            getContainer: function() {
	                var opts = this.options,
	                    parent, container;
	    
	                if ( this._container ) {
	                    return this._container;
	                }
	    
	                parent = $( opts.container || document.body );
	                container = $( document.createElement('div') );
	    
	                container.attr( 'id', 'rt_' + this.uid );
	                container.css({
	                    position: 'absolute',
	                    top: '0px',
	                    left: '0px',
	                    width: '1px',
	                    height: '1px',
	                    overflow: 'hidden'
	                });
	    
	                parent.append( container );
	                parent.addClass('webuploader-container');
	                this._container = container;
	                this._parent = parent;
	                return container;
	            },
	    
	            init: Base.noop,
	            exec: Base.noop,
	    
	            destroy: function() {
	                this._container && this._container.remove();
	                this._parent && this._parent.removeClass('webuploader-container');
	                this.off();
	            }
	        });
	    
	        Runtime.orders = 'html5,flash';
	    
	    
	        /**
	         * 添加Runtime实现。
	         * @param {String} type    类型
	         * @param {Runtime} factory 具体Runtime实现。
	         */
	        Runtime.addRuntime = function( type, factory ) {
	            factories[ type ] = factory;
	        };
	    
	        Runtime.hasRuntime = function( type ) {
	            return !!(type ? factories[ type ] : getFirstKey( factories ));
	        };
	    
	        Runtime.create = function( opts, orders ) {
	            var type, runtime;
	    
	            orders = orders || Runtime.orders;
	            $.each( orders.split( /\s*,\s*/g ), function() {
	                if ( factories[ this ] ) {
	                    type = this;
	                    return false;
	                }
	            });
	    
	            type = type || getFirstKey( factories );
	            if ( !type ) {
	                throw new Error('Runtime Error');
	            }
	    
	            runtime = new factories[ type ]( opts );
	            return runtime;
	        };
	    
	        Mediator.installTo( Runtime.prototype );
	        return Runtime;
	    });
	    
	    /**
	     * @fileOverview Runtime管理器，负责Runtime的选择, 连接
	     */
	    define('runtime/client',[
	        'base',
	        'mediator',
	        'runtime/runtime'
	    ], function( Base, Mediator, Runtime ) {
	    
	        var cache;
	    
	        cache = (function() {
	            var obj = {};
	    
	            return {
	                add: function( runtime ) {
	                    obj[ runtime.uid ] = runtime;
	                },
	    
	                get: function( ruid, standalone ) {
	                    var i;
	    
	                    if ( ruid ) {
	                        return obj[ ruid ];
	                    }
	    
	                    for ( i in obj ) {
	                        // 有些类型不能重用，比如filepicker.
	                        if ( standalone && obj[ i ].__standalone ) {
	                            continue;
	                        }
	    
	                        return obj[ i ];
	                    }
	    
	                    return null;
	                },
	    
	                remove: function( runtime ) {
	                    delete obj[ runtime.uid ];
	                }
	            };
	        })();
	    
	        function RuntimeClient( component, standalone ) {
	            var deferred = Base.Deferred(),
	                runtime;
	    
	            this.uid = Base.guid('client_');
	    
	            // 允许runtime没有初始化之前，注册一些方法在初始化后执行。
	            this.runtimeReady = function( cb ) {
	                return deferred.done( cb );
	            };
	    
	            this.connectRuntime = function( opts, cb ) {
	    
	                // already connected.
	                if ( runtime ) {
	                    throw new Error('already connected!');
	                }
	    
	                deferred.done( cb );
	    
	                if ( typeof opts === 'string' && cache.get( opts ) ) {
	                    runtime = cache.get( opts );
	                }
	    
	                // 像filePicker只能独立存在，不能公用。
	                runtime = runtime || cache.get( null, standalone );
	    
	                // 需要创建
	                if ( !runtime ) {
	                    runtime = Runtime.create( opts, opts.runtimeOrder );
	                    runtime.__promise = deferred.promise();
	                    runtime.once( 'ready', deferred.resolve );
	                    runtime.init();
	                    cache.add( runtime );
	                    runtime.__client = 1;
	                } else {
	                    // 来自cache
	                    Base.$.extend( runtime.options, opts );
	                    runtime.__promise.then( deferred.resolve );
	                    runtime.__client++;
	                }
	    
	                standalone && (runtime.__standalone = standalone);
	                return runtime;
	            };
	    
	            this.getRuntime = function() {
	                return runtime;
	            };
	    
	            this.disconnectRuntime = function() {
	                if ( !runtime ) {
	                    return;
	                }
	    
	                runtime.__client--;
	    
	                if ( runtime.__client <= 0 ) {
	                    cache.remove( runtime );
	                    delete runtime.__promise;
	                    runtime.destroy();
	                }
	    
	                runtime = null;
	            };
	    
	            this.exec = function() {
	                if ( !runtime ) {
	                    return;
	                }
	    
	                var args = Base.slice( arguments );
	                component && args.unshift( component );
	    
	                return runtime.exec.apply( this, args );
	            };
	    
	            this.getRuid = function() {
	                return runtime && runtime.uid;
	            };
	    
	            this.destroy = (function( destroy ) {
	                return function() {
	                    destroy && destroy.apply( this, arguments );
	                    this.trigger('destroy');
	                    this.off();
	                    this.exec('destroy');
	                    this.disconnectRuntime();
	                };
	            })( this.destroy );
	        }
	    
	        Mediator.installTo( RuntimeClient.prototype );
	        return RuntimeClient;
	    });
	    /**
	     * @fileOverview 错误信息
	     */
	    define('lib/dnd',[
	        'base',
	        'mediator',
	        'runtime/client'
	    ], function( Base, Mediator, RuntimeClent ) {
	    
	        var $ = Base.$;
	    
	        function DragAndDrop( opts ) {
	            opts = this.options = $.extend({}, DragAndDrop.options, opts );
	    
	            opts.container = $( opts.container );
	    
	            if ( !opts.container.length ) {
	                return;
	            }
	    
	            RuntimeClent.call( this, 'DragAndDrop' );
	        }
	    
	        DragAndDrop.options = {
	            accept: null,
	            disableGlobalDnd: false
	        };
	    
	        Base.inherits( RuntimeClent, {
	            constructor: DragAndDrop,
	    
	            init: function() {
	                var me = this;
	    
	                me.connectRuntime( me.options, function() {
	                    me.exec('init');
	                    me.trigger('ready');
	                });
	            }
	        });
	    
	        Mediator.installTo( DragAndDrop.prototype );
	    
	        return DragAndDrop;
	    });
	    /**
	     * @fileOverview 组件基类。
	     */
	    define('widgets/widget',[
	        'base',
	        'uploader'
	    ], function( Base, Uploader ) {
	    
	        var $ = Base.$,
	            _init = Uploader.prototype._init,
	            _destroy = Uploader.prototype.destroy,
	            IGNORE = {},
	            widgetClass = [];
	    
	        function isArrayLike( obj ) {
	            if ( !obj ) {
	                return false;
	            }
	    
	            var length = obj.length,
	                type = $.type( obj );
	    
	            if ( obj.nodeType === 1 && length ) {
	                return true;
	            }
	    
	            return type === 'array' || type !== 'function' && type !== 'string' &&
	                    (length === 0 || typeof length === 'number' && length > 0 &&
	                    (length - 1) in obj);
	        }
	    
	        function Widget( uploader ) {
	            this.owner = uploader;
	            this.options = uploader.options;
	        }
	    
	        $.extend( Widget.prototype, {
	    
	            init: Base.noop,
	    
	            // 类Backbone的事件监听声明，监听uploader实例上的事件
	            // widget直接无法监听事件，事件只能通过uploader来传递
	            invoke: function( apiName, args ) {
	    
	                /*
	                    {
	                        'make-thumb': 'makeThumb'
	                    }
	                 */
	                var map = this.responseMap;
	    
	                // 如果无API响应声明则忽略
	                if ( !map || !(apiName in map) || !(map[ apiName ] in this) ||
	                        !$.isFunction( this[ map[ apiName ] ] ) ) {
	    
	                    return IGNORE;
	                }
	    
	                return this[ map[ apiName ] ].apply( this, args );
	    
	            },
	    
	            /**
	             * 发送命令。当传入`callback`或者`handler`中返回`promise`时。返回一个当所有`handler`中的promise都完成后完成的新`promise`。
	             * @method request
	             * @grammar request( command, args ) => * | Promise
	             * @grammar request( command, args, callback ) => Promise
	             * @for  Uploader
	             */
	            request: function() {
	                return this.owner.request.apply( this.owner, arguments );
	            }
	        });
	    
	        // 扩展Uploader.
	        $.extend( Uploader.prototype, {
	    
	            /**
	             * @property {String | Array} [disableWidgets=undefined]
	             * @namespace options
	             * @for Uploader
	             * @description 默认所有 Uploader.register 了的 widget 都会被加载，如果禁用某一部分，请通过此 option 指定黑名单。
	             */
	    
	            // 覆写_init用来初始化widgets
	            _init: function() {
	                var me = this,
	                    widgets = me._widgets = [],
	                    deactives = me.options.disableWidgets || '';
	    
	                $.each( widgetClass, function( _, klass ) {
	                    (!deactives || !~deactives.indexOf( klass._name )) &&
	                        widgets.push( new klass( me ) );
	                });
	    
	                return _init.apply( me, arguments );
	            },
	    
	            request: function( apiName, args, callback ) {
	                var i = 0,
	                    widgets = this._widgets,
	                    len = widgets && widgets.length,
	                    rlts = [],
	                    dfds = [],
	                    widget, rlt, promise, key;
	    
	                args = isArrayLike( args ) ? args : [ args ];
	    
	                for ( ; i < len; i++ ) {
	                    widget = widgets[ i ];
	                    rlt = widget.invoke( apiName, args );
	    
	                    if ( rlt !== IGNORE ) {
	    
	                        // Deferred对象
	                        if ( Base.isPromise( rlt ) ) {
	                            dfds.push( rlt );
	                        } else {
	                            rlts.push( rlt );
	                        }
	                    }
	                }
	    
	                // 如果有callback，则用异步方式。
	                if ( callback || dfds.length ) {
	                    promise = Base.when.apply( Base, dfds );
	                    key = promise.pipe ? 'pipe' : 'then';
	    
	                    // 很重要不能删除。删除了会死循环。
	                    // 保证执行顺序。让callback总是在下一个 tick 中执行。
	                    return promise[ key ](function() {
	                                var deferred = Base.Deferred(),
	                                    args = arguments;
	    
	                                if ( args.length === 1 ) {
	                                    args = args[ 0 ];
	                                }
	    
	                                setTimeout(function() {
	                                    deferred.resolve( args );
	                                }, 1 );
	    
	                                return deferred.promise();
	                            })[ callback ? key : 'done' ]( callback || Base.noop );
	                } else {
	                    return rlts[ 0 ];
	                }
	            },
	    
	            destroy: function() {
	                _destroy.apply( this, arguments );
	                this._widgets = null;
	            }
	        });
	    
	        /**
	         * 添加组件
	         * @grammar Uploader.register(proto);
	         * @grammar Uploader.register(map, proto);
	         * @param  {object} responseMap API 名称与函数实现的映射
	         * @param  {object} proto 组件原型，构造函数通过 constructor 属性定义
	         * @method Uploader.register
	         * @for Uploader
	         * @example
	         * Uploader.register({
	         *     'make-thumb': 'makeThumb'
	         * }, {
	         *     init: function( options ) {},
	         *     makeThumb: function() {}
	         * });
	         *
	         * Uploader.register({
	         *     'make-thumb': function() {
	         *         
	         *     }
	         * });
	         */
	        Uploader.register = Widget.register = function( responseMap, widgetProto ) {
	            var map = { init: 'init', destroy: 'destroy', name: 'anonymous' },
	                klass;
	    
	            if ( arguments.length === 1 ) {
	                widgetProto = responseMap;
	    
	                // 自动生成 map 表。
	                $.each(widgetProto, function(key) {
	                    if ( key[0] === '_' || key === 'name' ) {
	                        key === 'name' && (map.name = widgetProto.name);
	                        return;
	                    }
	    
	                    map[key.replace(/[A-Z]/g, '-$&').toLowerCase()] = key;
	                });
	    
	            } else {
	                map = $.extend( map, responseMap );
	            }
	    
	            widgetProto.responseMap = map;
	            klass = Base.inherits( Widget, widgetProto );
	            klass._name = map.name;
	            widgetClass.push( klass );
	    
	            return klass;
	        };
	    
	        /**
	         * 删除插件，只有在注册时指定了名字的才能被删除。
	         * @grammar Uploader.unRegister(name);
	         * @param  {string} name 组件名字
	         * @method Uploader.unRegister
	         * @for Uploader
	         * @example
	         *
	         * Uploader.register({
	         *     name: 'custom',
	         *     
	         *     'make-thumb': function() {
	         *         
	         *     }
	         * });
	         *
	         * Uploader.unRegister('custom');
	         */
	        Uploader.unRegister = Widget.unRegister = function( name ) {
	            if ( !name || name === 'anonymous' ) {
	                return;
	            }
	            
	            // 删除指定的插件。
	            for ( var i = widgetClass.length; i--; ) {
	                if ( widgetClass[i]._name === name ) {
	                    widgetClass.splice(i, 1)
	                }
	            }
	        };
	    
	        return Widget;
	    });
	    /**
	     * @fileOverview DragAndDrop Widget。
	     */
	    define('widgets/filednd',[
	        'base',
	        'uploader',
	        'lib/dnd',
	        'widgets/widget'
	    ], function( Base, Uploader, Dnd ) {
	        var $ = Base.$;
	    
	        Uploader.options.dnd = '';
	    
	        /**
	         * @property {Selector} [dnd=undefined]  指定Drag And Drop拖拽的容器，如果不指定，则不启动。
	         * @namespace options
	         * @for Uploader
	         */
	        
	        /**
	         * @property {Selector} [disableGlobalDnd=false]  是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开。
	         * @namespace options
	         * @for Uploader
	         */
	    
	        /**
	         * @event dndAccept
	         * @param {DataTransferItemList} items DataTransferItem
	         * @description 阻止此事件可以拒绝某些类型的文件拖入进来。目前只有 chrome 提供这样的 API，且只能通过 mime-type 验证。
	         * @for  Uploader
	         */
	        return Uploader.register({
	            name: 'dnd',
	            
	            init: function( opts ) {
	    
	                if ( !opts.dnd ||
	                        this.request('predict-runtime-type') !== 'html5' ) {
	                    return;
	                }
	    
	                var me = this,
	                    deferred = Base.Deferred(),
	                    options = $.extend({}, {
	                        disableGlobalDnd: opts.disableGlobalDnd,
	                        container: opts.dnd,
	                        accept: opts.accept
	                    }),
	                    dnd;
	    
	                this.dnd = dnd = new Dnd( options );
	    
	                dnd.once( 'ready', deferred.resolve );
	                dnd.on( 'drop', function( files ) {
	                    me.request( 'add-file', [ files ]);
	                });
	    
	                // 检测文件是否全部允许添加。
	                dnd.on( 'accept', function( items ) {
	                    return me.owner.trigger( 'dndAccept', items );
	                });
	    
	                dnd.init();
	    
	                return deferred.promise();
	            },
	    
	            destroy: function() {
	                this.dnd && this.dnd.destroy();
	            }
	        });
	    });
	    
	    /**
	     * @fileOverview 错误信息
	     */
	    define('lib/filepaste',[
	        'base',
	        'mediator',
	        'runtime/client'
	    ], function( Base, Mediator, RuntimeClent ) {
	    
	        var $ = Base.$;
	    
	        function FilePaste( opts ) {
	            opts = this.options = $.extend({}, opts );
	            opts.container = $( opts.container || document.body );
	            RuntimeClent.call( this, 'FilePaste' );
	        }
	    
	        Base.inherits( RuntimeClent, {
	            constructor: FilePaste,
	    
	            init: function() {
	                var me = this;
	    
	                me.connectRuntime( me.options, function() {
	                    me.exec('init');
	                    me.trigger('ready');
	                });
	            }
	        });
	    
	        Mediator.installTo( FilePaste.prototype );
	    
	        return FilePaste;
	    });
	    /**
	     * @fileOverview 组件基类。
	     */
	    define('widgets/filepaste',[
	        'base',
	        'uploader',
	        'lib/filepaste',
	        'widgets/widget'
	    ], function( Base, Uploader, FilePaste ) {
	        var $ = Base.$;
	    
	        /**
	         * @property {Selector} [paste=undefined]  指定监听paste事件的容器，如果不指定，不启用此功能。此功能为通过粘贴来添加截屏的图片。建议设置为`document.body`.
	         * @namespace options
	         * @for Uploader
	         */
	        return Uploader.register({
	            name: 'paste',
	            
	            init: function( opts ) {
	    
	                if ( !opts.paste ||
	                        this.request('predict-runtime-type') !== 'html5' ) {
	                    return;
	                }
	    
	                var me = this,
	                    deferred = Base.Deferred(),
	                    options = $.extend({}, {
	                        container: opts.paste,
	                        accept: opts.accept
	                    }),
	                    paste;
	    
	                this.paste = paste = new FilePaste( options );
	    
	                paste.once( 'ready', deferred.resolve );
	                paste.on( 'paste', function( files ) {
	                    me.owner.request( 'add-file', [ files ]);
	                });
	                paste.init();
	    
	                return deferred.promise();
	            },
	    
	            destroy: function() {
	                this.paste && this.paste.destroy();
	            }
	        });
	    });
	    /**
	     * @fileOverview Blob
	     */
	    define('lib/blob',[
	        'base',
	        'runtime/client'
	    ], function( Base, RuntimeClient ) {
	    
	        function Blob( ruid, source ) {
	            var me = this;
	    
	            me.source = source;
	            me.ruid = ruid;
	            this.size = source.size || 0;
	    
	            // 如果没有指定 mimetype, 但是知道文件后缀。
	            if ( !source.type && this.ext &&
	                    ~'jpg,jpeg,png,gif,bmp'.indexOf( this.ext ) ) {
	                this.type = 'image/' + (this.ext === 'jpg' ? 'jpeg' : this.ext);
	            } else {
	                this.type = source.type || 'application/octet-stream';
	            }
	    
	            RuntimeClient.call( me, 'Blob' );
	            this.uid = source.uid || this.uid;
	    
	            if ( ruid ) {
	                me.connectRuntime( ruid );
	            }
	        }
	    
	        Base.inherits( RuntimeClient, {
	            constructor: Blob,
	    
	            slice: function( start, end ) {
	                return this.exec( 'slice', start, end );
	            },
	    
	            getSource: function() {
	                return this.source;
	            }
	        });
	    
	        return Blob;
	    });
	    /**
	     * 为了统一化Flash的File和HTML5的File而存在。
	     * 以至于要调用Flash里面的File，也可以像调用HTML5版本的File一下。
	     * @fileOverview File
	     */
	    define('lib/file',[
	        'base',
	        'lib/blob'
	    ], function( Base, Blob ) {
	    
	        var uid = 1,
	            rExt = /\.([^.]+)$/;
	    
	        function File( ruid, file ) {
	            var ext;
	    
	            this.name = file.name || ('untitled' + uid++);
	            ext = rExt.exec( file.name ) ? RegExp.$1.toLowerCase() : '';
	    
	            // todo 支持其他类型文件的转换。
	            // 如果有 mimetype, 但是文件名里面没有找出后缀规律
	            if ( !ext && file.type ) {
	                ext = /\/(jpg|jpeg|png|gif|bmp)$/i.exec( file.type ) ?
	                        RegExp.$1.toLowerCase() : '';
	                this.name += '.' + ext;
	            }
	    
	            this.ext = ext;
	            this.lastModifiedDate = file.lastModifiedDate ||
	                    (new Date()).toLocaleString();
	    
	            Blob.apply( this, arguments );
	        }
	    
	        return Base.inherits( Blob, File );
	    });
	    
	    /**
	     * @fileOverview 错误信息
	     */
	    define('lib/filepicker',[
	        'base',
	        'runtime/client',
	        'lib/file'
	    ], function( Base, RuntimeClent, File ) {
	    
	        var $ = Base.$;
	    
	        function FilePicker( opts ) {
	            opts = this.options = $.extend({}, FilePicker.options, opts );
	    
	            opts.container = $( opts.id );
	    
	            if ( !opts.container.length ) {
	                throw new Error('按钮指定错误');
	            }
	    
	            opts.innerHTML = opts.innerHTML || opts.label ||
	                    opts.container.html() || '';
	    
	            opts.button = $( opts.button || document.createElement('div') );
	            opts.button.html( opts.innerHTML );
	            opts.container.html( opts.button );
	    
	            RuntimeClent.call( this, 'FilePicker', true );
	        }
	    
	        FilePicker.options = {
	            button: null,
	            container: null,
	            label: null,
	            innerHTML: null,
	            multiple: true,
	            accept: null,
	            name: 'file'
	        };
	    
	        Base.inherits( RuntimeClent, {
	            constructor: FilePicker,
	    
	            init: function() {
	                var me = this,
	                    opts = me.options,
	                    button = opts.button;
	    
	                button.addClass('webuploader-pick');
	    
	                me.on( 'all', function( type ) {
	                    var files;
	    
	                    switch ( type ) {
	                        case 'mouseenter':
	                            button.addClass('webuploader-pick-hover');
	                            break;
	    
	                        case 'mouseleave':
	                            button.removeClass('webuploader-pick-hover');
	                            break;
	    
	                        case 'change':
	                            files = me.exec('getFiles');
	                            me.trigger( 'select', $.map( files, function( file ) {
	                                file = new File( me.getRuid(), file );
	    
	                                // 记录来源。
	                                file._refer = opts.container;
	                                return file;
	                            }), opts.container );
	                            break;
	                    }
	                });
	    
	                me.connectRuntime( opts, function() {
	                    me.refresh();
	                    me.exec( 'init', opts );
	                    me.trigger('ready');
	                });
	    
	                this._resizeHandler = Base.bindFn( this.refresh, this );
	                $( window ).on( 'resize', this._resizeHandler );
	            },
	    
	            refresh: function() {
	                var shimContainer = this.getRuntime().getContainer(),
	                    button = this.options.button,
	                    width = button.outerWidth ?
	                            button.outerWidth() : button.width(),
	    
	                    height = button.outerHeight ?
	                            button.outerHeight() : button.height(),
	    
	                    pos = button.offset();
	    
	                width && height && shimContainer.css({
	                    bottom: 'auto',
	                    right: 'auto',
	                    width: width + 'px',
	                    height: height + 'px'
	                }).offset( pos );
	            },
	    
	            enable: function() {
	                var btn = this.options.button;
	    
	                btn.removeClass('webuploader-pick-disable');
	                this.refresh();
	            },
	    
	            disable: function() {
	                var btn = this.options.button;
	    
	                this.getRuntime().getContainer().css({
	                    top: '-99999px'
	                });
	    
	                btn.addClass('webuploader-pick-disable');
	            },
	    
	            destroy: function() {
	                var btn = this.options.button;
	                $( window ).off( 'resize', this._resizeHandler );
	                btn.removeClass('webuploader-pick-disable webuploader-pick-hover ' +
	                    'webuploader-pick');
	            }
	        });
	    
	        return FilePicker;
	    });
	    
	    /**
	     * @fileOverview 文件选择相关
	     */
	    define('widgets/filepicker',[
	        'base',
	        'uploader',
	        'lib/filepicker',
	        'widgets/widget'
	    ], function( Base, Uploader, FilePicker ) {
	        var $ = Base.$;
	    
	        $.extend( Uploader.options, {
	    
	            /**
	             * @property {Selector | Object} [pick=undefined]
	             * @namespace options
	             * @for Uploader
	             * @description 指定选择文件的按钮容器，不指定则不创建按钮。
	             *
	             * * `id` {Seletor|dom} 指定选择文件的按钮容器，不指定则不创建按钮。**注意** 这里虽然写的是 id, 但是不是只支持 id, 还支持 class, 或者 dom 节点。
	             * * `label` {String} 请采用 `innerHTML` 代替
	             * * `innerHTML` {String} 指定按钮文字。不指定时优先从指定的容器中看是否自带文字。
	             * * `multiple` {Boolean} 是否开起同时选择多个文件能力。
	             */
	            pick: null,
	    
	            /**
	             * @property {Arroy} [accept=null]
	             * @namespace options
	             * @for Uploader
	             * @description 指定接受哪些类型的文件。 由于目前还有ext转mimeType表，所以这里需要分开指定。
	             *
	             * * `title` {String} 文字描述
	             * * `extensions` {String} 允许的文件后缀，不带点，多个用逗号分割。
	             * * `mimeTypes` {String} 多个用逗号分割。
	             *
	             * 如：
	             *
	             * ```
	             * {
	             *     title: 'Images',
	             *     extensions: 'gif,jpg,jpeg,bmp,png',
	             *     mimeTypes: 'image/*'
	             * }
	             * ```
	             */
	            accept: null/*{
	                title: 'Images',
	                extensions: 'gif,jpg,jpeg,bmp,png',
	                mimeTypes: 'image/*'
	            }*/
	        });
	    
	        return Uploader.register({
	            name: 'picker',
	    
	            init: function( opts ) {
	                this.pickers = [];
	                return opts.pick && this.addBtn( opts.pick );
	            },
	    
	            refresh: function() {
	                $.each( this.pickers, function() {
	                    this.refresh();
	                });
	            },
	    
	            /**
	             * @method addButton
	             * @for Uploader
	             * @grammar addButton( pick ) => Promise
	             * @description
	             * 添加文件选择按钮，如果一个按钮不够，需要调用此方法来添加。参数跟[options.pick](#WebUploader:Uploader:options)一致。
	             * @example
	             * uploader.addButton({
	             *     id: '#btnContainer',
	             *     innerHTML: '选择文件'
	             * });
	             */
	            addBtn: function( pick ) {
	                var me = this,
	                    opts = me.options,
	                    accept = opts.accept,
	                    promises = [];
	    
	                if ( !pick ) {
	                    return;
	                }
	    
	                $.isPlainObject( pick ) || (pick = {
	                    id: pick
	                });
	    
	                $( pick.id ).each(function() {
	                    var options, picker, deferred;
	    
	                    deferred = Base.Deferred();
	    
	                    options = $.extend({}, pick, {
	                        accept: $.isPlainObject( accept ) ? [ accept ] : accept,
	                        swf: opts.swf,
	                        runtimeOrder: opts.runtimeOrder,
	                        id: this
	                    });
	    
	                    picker = new FilePicker( options );
	    
	                    picker.once( 'ready', deferred.resolve );
	                    picker.on( 'select', function( files ) {
	                        me.owner.request( 'add-file', [ files ]);
	                    });
	                    picker.init();
	    
	                    me.pickers.push( picker );
	    
	                    promises.push( deferred.promise() );
	                });
	    
	                return Base.when.apply( Base, promises );
	            },
	    
	            disable: function() {
	                $.each( this.pickers, function() {
	                    this.disable();
	                });
	            },
	    
	            enable: function() {
	                $.each( this.pickers, function() {
	                    this.enable();
	                });
	            },
	    
	            destroy: function() {
	                $.each( this.pickers, function() {
	                    this.destroy();
	                });
	                this.pickers = null;
	            }
	        });
	    });
	    /**
	     * @fileOverview Image
	     */
	    define('lib/image',[
	        'base',
	        'runtime/client',
	        'lib/blob'
	    ], function( Base, RuntimeClient, Blob ) {
	        var $ = Base.$;
	    
	        // 构造器。
	        function Image( opts ) {
	            this.options = $.extend({}, Image.options, opts );
	            RuntimeClient.call( this, 'Image' );
	    
	            this.on( 'load', function() {
	                this._info = this.exec('info');
	                this._meta = this.exec('meta');
	            });
	        }
	    
	        // 默认选项。
	        Image.options = {
	    
	            // 默认的图片处理质量
	            quality: 90,
	    
	            // 是否裁剪
	            crop: false,
	    
	            // 是否保留头部信息
	            preserveHeaders: false,
	    
	            // 是否允许放大。
	            allowMagnify: false
	        };
	    
	        // 继承RuntimeClient.
	        Base.inherits( RuntimeClient, {
	            constructor: Image,
	    
	            info: function( val ) {
	    
	                // setter
	                if ( val ) {
	                    this._info = val;
	                    return this;
	                }
	    
	                // getter
	                return this._info;
	            },
	    
	            meta: function( val ) {
	    
	                // setter
	                if ( val ) {
	                    this._meta = val;
	                    return this;
	                }
	    
	                // getter
	                return this._meta;
	            },
	    
	            loadFromBlob: function( blob ) {
	                var me = this,
	                    ruid = blob.getRuid();
	    
	                this.connectRuntime( ruid, function() {
	                    me.exec( 'init', me.options );
	                    me.exec( 'loadFromBlob', blob );
	                });
	            },
	    
	            resize: function() {
	                var args = Base.slice( arguments );
	                return this.exec.apply( this, [ 'resize' ].concat( args ) );
	            },
	    
	            crop: function() {
	                var args = Base.slice( arguments );
	                return this.exec.apply( this, [ 'crop' ].concat( args ) );
	            },
	    
	            getAsDataUrl: function( type ) {
	                return this.exec( 'getAsDataUrl', type );
	            },
	    
	            getAsBlob: function( type ) {
	                var blob = this.exec( 'getAsBlob', type );
	    
	                return new Blob( this.getRuid(), blob );
	            }
	        });
	    
	        return Image;
	    });
	    /**
	     * @fileOverview 图片操作, 负责预览图片和上传前压缩图片
	     */
	    define('widgets/image',[
	        'base',
	        'uploader',
	        'lib/image',
	        'widgets/widget'
	    ], function( Base, Uploader, Image ) {
	    
	        var $ = Base.$,
	            throttle;
	    
	        // 根据要处理的文件大小来节流，一次不能处理太多，会卡。
	        throttle = (function( max ) {
	            var occupied = 0,
	                waiting = [],
	                tick = function() {
	                    var item;
	    
	                    while ( waiting.length && occupied < max ) {
	                        item = waiting.shift();
	                        occupied += item[ 0 ];
	                        item[ 1 ]();
	                    }
	                };
	    
	            return function( emiter, size, cb ) {
	                waiting.push([ size, cb ]);
	                emiter.once( 'destroy', function() {
	                    occupied -= size;
	                    setTimeout( tick, 1 );
	                });
	                setTimeout( tick, 1 );
	            };
	        })( 5 * 1024 * 1024 );
	    
	        $.extend( Uploader.options, {
	    
	            /**
	             * @property {Object} [thumb]
	             * @namespace options
	             * @for Uploader
	             * @description 配置生成缩略图的选项。
	             *
	             * 默认为：
	             *
	             * ```javascript
	             * {
	             *     width: 110,
	             *     height: 110,
	             *
	             *     // 图片质量，只有type为`image/jpeg`的时候才有效。
	             *     quality: 70,
	             *
	             *     // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
	             *     allowMagnify: true,
	             *
	             *     // 是否允许裁剪。
	             *     crop: true,
	             *
	             *     // 为空的话则保留原有图片格式。
	             *     // 否则强制转换成指定的类型。
	             *     type: 'image/jpeg'
	             * }
	             * ```
	             */
	            thumb: {
	                width: 110,
	                height: 110,
	                quality: 70,
	                allowMagnify: true,
	                crop: true,
	                preserveHeaders: false,
	    
	                // 为空的话则保留原有图片格式。
	                // 否则强制转换成指定的类型。
	                // IE 8下面 base64 大小不能超过 32K 否则预览失败，而非 jpeg 编码的图片很可
	                // 能会超过 32k, 所以这里设置成预览的时候都是 image/jpeg
	                type: 'image/jpeg'
	            },
	    
	            /**
	             * @property {Object} [compress]
	             * @namespace options
	             * @for Uploader
	             * @description 配置压缩的图片的选项。如果此选项为`false`, 则图片在上传前不进行压缩。
	             *
	             * 默认为：
	             *
	             * ```javascript
	             * {
	             *     width: 1600,
	             *     height: 1600,
	             *
	             *     // 图片质量，只有type为`image/jpeg`的时候才有效。
	             *     quality: 90,
	             *
	             *     // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
	             *     allowMagnify: false,
	             *
	             *     // 是否允许裁剪。
	             *     crop: false,
	             *
	             *     // 是否保留头部meta信息。
	             *     preserveHeaders: true,
	             *
	             *     // 如果发现压缩后文件大小比原来还大，则使用原来图片
	             *     // 此属性可能会影响图片自动纠正功能
	             *     noCompressIfLarger: false,
	             *
	             *     // 单位字节，如果图片大小小于此值，不会采用压缩。
	             *     compressSize: 0
	             * }
	             * ```
	             */
	            compress: {
	                width: 1600,
	                height: 1600,
	                quality: 90,
	                allowMagnify: false,
	                crop: false,
	                preserveHeaders: true
	            }
	        });
	    
	        return Uploader.register({
	    
	            name: 'image',
	    
	    
	            /**
	             * 生成缩略图，此过程为异步，所以需要传入`callback`。
	             * 通常情况在图片加入队里后调用此方法来生成预览图以增强交互效果。
	             *
	             * 当 width 或者 height 的值介于 0 - 1 时，被当成百分比使用。
	             *
	             * `callback`中可以接收到两个参数。
	             * * 第一个为error，如果生成缩略图有错误，此error将为真。
	             * * 第二个为ret, 缩略图的Data URL值。
	             *
	             * **注意**
	             * Date URL在IE6/7中不支持，所以不用调用此方法了，直接显示一张暂不支持预览图片好了。
	             * 也可以借助服务端，将 base64 数据传给服务端，生成一个临时文件供预览。
	             *
	             * @method makeThumb
	             * @grammar makeThumb( file, callback ) => undefined
	             * @grammar makeThumb( file, callback, width, height ) => undefined
	             * @for Uploader
	             * @example
	             *
	             * uploader.on( 'fileQueued', function( file ) {
	             *     var $li = ...;
	             *
	             *     uploader.makeThumb( file, function( error, ret ) {
	             *         if ( error ) {
	             *             $li.text('预览错误');
	             *         } else {
	             *             $li.append('<img alt="" src="' + ret + '" />');
	             *         }
	             *     });
	             *
	             * });
	             */
	            makeThumb: function( file, cb, width, height ) {
	                var opts, image;
	                var isArtwork = false;
	                file = this.request( 'get-file', file );
	    
	                // 只预览图片格式。
	                if ( !file.type.match( /^image/ ) ) {
	                    cb( true );
	                    return;
	                }
	    
	                opts = $.extend({}, this.options.thumb );
	                isArtwork = $.isPlainObject( this.options.thumb ) ? false : true;
	                // 如果传入的是object.
	                if ( $.isPlainObject( width ) ) {
	                    opts = $.extend( opts, width );
	                    width = null;
	                }
	    
	                width = width || opts.width;
	                height = height || opts.height;
	    
	                image = new Image( opts );
	    
	                image.once( 'load', function() {
	                    file._info = file._info || image.info();
	                    file._meta = file._meta || image.meta();
	    
	                    // 如果 width 的值介于 0 - 1
	                    // 说明设置的是百分比。
	                    if ( width <= 1 && width > 0 ) {
	                        width = file._info.width * width;
	                    }
	    
	                    // 同样的规则应用于 height
	                    if ( height <= 1 && height > 0 ) {
	                        height = file._info.height * height;
	                    }
	                    if( isArtwork ){
	                        image.resize( file._info.width, file._info.height );
	                        
	                    }else{
	                        image.resize( width, height );
	                        
	                       
	                    }

	                });
	    
	                // 当 resize 完后
	                image.once( 'complete', function() {
	                    cb( false, image.getAsDataUrl( opts.type ) );
	                    image.destroy();
	                });
	    
	                image.once( 'error', function( reason ) {
	                    cb( reason || true );
	                    image.destroy();
	                });
	    
	                throttle( image, file.source.size, function() {
	                    file._info && image.info( file._info );
	                    file._meta && image.meta( file._meta );
	                    image.loadFromBlob( file.source );
	                });
	            },
	    
	            beforeSendFile: function( file ) {
	                var opts = this.options.compress || this.options.resize,
	                    compressSize = opts && opts.compressSize || 0,
	                    noCompressIfLarger = opts && opts.noCompressIfLarger || false,
	                    image, deferred;
	    
	                file = this.request( 'get-file', file );
	    
	                // 只压缩 jpeg 图片格式。
	                // gif 可能会丢失针
	                // bmp png 基本上尺寸都不大，且压缩比比较小。
	                if ( !opts || !~'image/jpeg,image/jpg'.indexOf( file.type ) ||
	                        file.size < compressSize ||
	                        file._compressed ) {
	                    return;
	                }
	    
	                opts = $.extend({}, opts );
	                deferred = Base.Deferred();
	    
	                image = new Image( opts );
	    
	                deferred.always(function() {
	                    image.destroy();
	                    image = null;
	                });
	                image.once( 'error', deferred.reject );
	                image.once( 'load', function() {
	                    var width = opts.width,
	                        height = opts.height;
	    
	                    file._info = file._info || image.info();
	                    file._meta = file._meta || image.meta();
	    
	                    // 如果 width 的值介于 0 - 1
	                    // 说明设置的是百分比。
	                    if ( width <= 1 && width > 0 ) {
	                        width = file._info.width * width;
	                    }
	    
	                    // 同样的规则应用于 height
	                    if ( height <= 1 && height > 0 ) {
	                        height = file._info.height * height;
	                    }
	    
	                    image.resize( width, height );
	                });
	    
	                image.once( 'complete', function() {
	                    var blob, size;
	    
	                    // 移动端 UC / qq 浏览器的无图模式下
	                    // ctx.getImageData 处理大图的时候会报 Exception
	                    // INDEX_SIZE_ERR: DOM Exception 1
	                    try {
	                        blob = image.getAsBlob( opts.type );
	    
	                        size = file.size;
	    
	                        // 如果压缩后，比原来还大则不用压缩后的。
	                        if ( !noCompressIfLarger || blob.size < size ) {
	                            // file.source.destroy && file.source.destroy();
	                            file.source = blob;
	                            file.size = blob.size;
	    
	                            file.trigger( 'resize', blob.size, size );
	                        }
	    
	                        // 标记，避免重复压缩。
	                        file._compressed = true;
	                        deferred.resolve();
	                    } catch ( e ) {
	                        // 出错了直接继续，让其上传原始图片
	                        deferred.resolve();
	                    }
	                });
	    
	                file._info && image.info( file._info );
	                file._meta && image.meta( file._meta );
	    
	                image.loadFromBlob( file.source );
	                return deferred.promise();
	            }
	        });
	    });
	    /**
	     * @fileOverview 文件属性封装
	     */
	    define('file',[
	        'base',
	        'mediator'
	    ], function( Base, Mediator ) {
	    
	        var $ = Base.$,
	            idPrefix = 'WU_FILE_',
	            idSuffix = 0,
	            rExt = /\.([^.]+)$/,
	            statusMap = {};
	    
	        function gid() {
	            return idPrefix + idSuffix++;
	        }
	    
	        /**
	         * 文件类
	         * @class File
	         * @constructor 构造函数
	         * @grammar new File( source ) => File
	         * @param {Lib.File} source [lib.File](#Lib.File)实例, 此source对象是带有Runtime信息的。
	         */
	        function WUFile( source ) {
	    
	            /**
	             * 文件名，包括扩展名（后缀）
	             * @property name
	             * @type {string}
	             */
	            this.name = source.name || 'Untitled';
	    
	            /**
	             * 文件体积（字节）
	             * @property size
	             * @type {uint}
	             * @default 0
	             */
	            this.size = source.size || 0;
	    
	            /**
	             * 文件MIMETYPE类型，与文件类型的对应关系请参考[http://t.cn/z8ZnFny](http://t.cn/z8ZnFny)
	             * @property type
	             * @type {string}
	             * @default 'application/octet-stream'
	             */
	            this.type = source.type || 'application/octet-stream';
	    
	            /**
	             * 文件最后修改日期
	             * @property lastModifiedDate
	             * @type {int}
	             * @default 当前时间戳
	             */
	            this.lastModifiedDate = source.lastModifiedDate || (new Date() * 1);
	    
	            /**
	             * 文件ID，每个对象具有唯一ID，与文件名无关
	             * @property id
	             * @type {string}
	             */
	            this.id = gid();
	    
	            /**
	             * 文件扩展名，通过文件名获取，例如test.png的扩展名为png
	             * @property ext
	             * @type {string}
	             */
	            this.ext = rExt.exec( this.name ) ? RegExp.$1 : '';
	    
	    
	            /**
	             * 状态文字说明。在不同的status语境下有不同的用途。
	             * @property statusText
	             * @type {string}
	             */
	            this.statusText = '';
	    
	            // 存储文件状态，防止通过属性直接修改
	            statusMap[ this.id ] = WUFile.Status.INITED;
	    
	            this.source = source;
	            this.loaded = 0;
	    
	            this.on( 'error', function( msg ) {
	                this.setStatus( WUFile.Status.ERROR, msg );
	            });
	        }
	    
	        $.extend( WUFile.prototype, {
	    
	            /**
	             * 设置状态，状态变化时会触发`change`事件。
	             * @method setStatus
	             * @grammar setStatus( status[, statusText] );
	             * @param {File.Status|String} status [文件状态值](#WebUploader:File:File.Status)
	             * @param {String} [statusText=''] 状态说明，常在error时使用，用http, abort,server等来标记是由于什么原因导致文件错误。
	             */
	            setStatus: function( status, text ) {
	    
	                var prevStatus = statusMap[ this.id ];
	    
	                typeof text !== 'undefined' && (this.statusText = text);
	    
	                if ( status !== prevStatus ) {
	                    statusMap[ this.id ] = status;
	                    /**
	                     * 文件状态变化
	                     * @event statuschange
	                     */
	                    this.trigger( 'statuschange', status, prevStatus );
	                }
	    
	            },
	    
	            /**
	             * 获取文件状态
	             * @return {File.Status}
	             * @example
	                     文件状态具体包括以下几种类型：
	                     {
	                         // 初始化
	                        INITED:     0,
	                        // 已入队列
	                        QUEUED:     1,
	                        // 正在上传
	                        PROGRESS:     2,
	                        // 上传出错
	                        ERROR:         3,
	                        // 上传成功
	                        COMPLETE:     4,
	                        // 上传取消
	                        CANCELLED:     5
	                    }
	             */
	            getStatus: function() {
	                return statusMap[ this.id ];
	            },
	    
	            /**
	             * 获取文件原始信息。
	             * @return {*}
	             */
	            getSource: function() {
	                return this.source;
	            },
	    
	            destroy: function() {
	                this.off();
	                delete statusMap[ this.id ];
	            }
	        });
	    
	        Mediator.installTo( WUFile.prototype );
	    
	        /**
	         * 文件状态值，具体包括以下几种类型：
	         * * `inited` 初始状态
	         * * `queued` 已经进入队列, 等待上传
	         * * `progress` 上传中
	         * * `complete` 上传完成。
	         * * `error` 上传出错，可重试
	         * * `interrupt` 上传中断，可续传。
	         * * `invalid` 文件不合格，不能重试上传。会自动从队列中移除。
	         * * `cancelled` 文件被移除。
	         * @property {Object} Status
	         * @namespace File
	         * @class File
	         * @static
	         */
	        WUFile.Status = {
	            INITED:     'inited',    // 初始状态
	            QUEUED:     'queued',    // 已经进入队列, 等待上传
	            PROGRESS:   'progress',    // 上传中
	            ERROR:      'error',    // 上传出错，可重试
	            COMPLETE:   'complete',    // 上传完成。
	            CANCELLED:  'cancelled',    // 上传取消。
	            INTERRUPT:  'interrupt',    // 上传中断，可续传。
	            INVALID:    'invalid'    // 文件不合格，不能重试上传。
	        };
	    
	        return WUFile;
	    });
	    
	    /**
	     * @fileOverview 文件队列
	     */
	    define('queue',[
	        'base',
	        'mediator',
	        'file'
	    ], function( Base, Mediator, WUFile ) {
	    
	        var $ = Base.$,
	            STATUS = WUFile.Status;
	    
	        /**
	         * 文件队列, 用来存储各个状态中的文件。
	         * @class Queue
	         * @extends Mediator
	         */
	        function Queue() {
	    
	            /**
	             * 统计文件数。
	             * * `numOfQueue` 队列中的文件数。
	             * * `numOfSuccess` 上传成功的文件数
	             * * `numOfCancel` 被取消的文件数
	             * * `numOfProgress` 正在上传中的文件数
	             * * `numOfUploadFailed` 上传错误的文件数。
	             * * `numOfInvalid` 无效的文件数。
	             * * `numofDeleted` 被移除的文件数。
	             * @property {Object} stats
	             */
	            this.stats = {
	                numOfQueue: 0,
	                numOfSuccess: 0,
	                numOfCancel: 0,
	                numOfProgress: 0,
	                numOfUploadFailed: 0,
	                numOfInvalid: 0,
	                numofDeleted: 0,
	                numofInterrupt: 0
	            };
	    
	            // 上传队列，仅包括等待上传的文件
	            this._queue = [];
	    
	            // 存储所有文件
	            this._map = {};
	        }
	    
	        $.extend( Queue.prototype, {
	    
	            /**
	             * 将新文件加入对队列尾部
	             *
	             * @method append
	             * @param  {File} file   文件对象
	             */
	            append: function( file ) {
	                this._queue.push( file );
	                this._fileAdded( file );
	                return this;
	            },
	    
	            /**
	             * 将新文件加入对队列头部
	             *
	             * @method prepend
	             * @param  {File} file   文件对象
	             */
	            prepend: function( file ) {
	                this._queue.unshift( file );
	                this._fileAdded( file );
	                return this;
	            },
	    
	            /**
	             * 获取文件对象
	             *
	             * @method getFile
	             * @param  {String} fileId   文件ID
	             * @return {File}
	             */
	            getFile: function( fileId ) {
	                if ( typeof fileId !== 'string' ) {
	                    return fileId;
	                }
	                return this._map[ fileId ];
	            },
	    
	            /**
	             * 从队列中取出一个指定状态的文件。
	             * @grammar fetch( status ) => File
	             * @method fetch
	             * @param {String} status [文件状态值](#WebUploader:File:File.Status)
	             * @return {File} [File](#WebUploader:File)
	             */
	            fetch: function( status ) {
	                var len = this._queue.length,
	                    i, file;
	    
	                status = status || STATUS.QUEUED;
	    
	                for ( i = 0; i < len; i++ ) {
	                    file = this._queue[ i ];
	    
	                    if ( status === file.getStatus() ) {
	                        return file;
	                    }
	                }
	    
	                return null;
	            },
	    
	            /**
	             * 对队列进行排序，能够控制文件上传顺序。
	             * @grammar sort( fn ) => undefined
	             * @method sort
	             * @param {Function} fn 排序方法
	             */
	            sort: function( fn ) {
	                if ( typeof fn === 'function' ) {
	                    this._queue.sort( fn );
	                }
	            },
	    
	            /**
	             * 获取指定类型的文件列表, 列表中每一个成员为[File](#WebUploader:File)对象。
	             * @grammar getFiles( [status1[, status2 ...]] ) => Array
	             * @method getFiles
	             * @param {String} [status] [文件状态值](#WebUploader:File:File.Status)
	             */
	            getFiles: function() {
	                var sts = [].slice.call( arguments, 0 ),
	                    ret = [],
	                    i = 0,
	                    len = this._queue.length,
	                    file;
	    
	                for ( ; i < len; i++ ) {
	                    file = this._queue[ i ];
	    
	                    if ( sts.length && !~$.inArray( file.getStatus(), sts ) ) {
	                        continue;
	                    }
	    
	                    ret.push( file );
	                }
	    
	                return ret;
	            },
	    
	            /**
	             * 在队列中删除文件。
	             * @grammar removeFile( file ) => Array
	             * @method removeFile
	             * @param {File} 文件对象。
	             */
	            removeFile: function( file ) {
	                var me = this,
	                    existing = this._map[ file.id ];
	    
	                if ( existing ) {
	                    delete this._map[ file.id ];
	                    file.destroy();
	                    this.stats.numofDeleted++;
	                }
	            },
	    
	            _fileAdded: function( file ) {
	                var me = this,
	                    existing = this._map[ file.id ];
	    
	                if ( !existing ) {
	                    this._map[ file.id ] = file;
	    
	                    file.on( 'statuschange', function( cur, pre ) {
	                        me._onFileStatusChange( cur, pre );
	                    });
	                }
	            },
	    
	            _onFileStatusChange: function( curStatus, preStatus ) {
	                var stats = this.stats;
	    
	                switch ( preStatus ) {
	                    case STATUS.PROGRESS:
	                        stats.numOfProgress--;
	                        break;
	    
	                    case STATUS.QUEUED:
	                        stats.numOfQueue --;
	                        break;
	    
	                    case STATUS.ERROR:
	                        stats.numOfUploadFailed--;
	                        break;
	    
	                    case STATUS.INVALID:
	                        stats.numOfInvalid--;
	                        break;
	    
	                    case STATUS.INTERRUPT:
	                        stats.numofInterrupt--;
	                        break;
	                }
	    
	                switch ( curStatus ) {
	                    case STATUS.QUEUED:
	                        stats.numOfQueue++;
	                        break;
	    
	                    case STATUS.PROGRESS:
	                        stats.numOfProgress++;
	                        break;
	    
	                    case STATUS.ERROR:
	                        stats.numOfUploadFailed++;
	                        break;
	    
	                    case STATUS.COMPLETE:
	                        stats.numOfSuccess++;
	                        break;
	    
	                    case STATUS.CANCELLED:
	                        stats.numOfCancel++;
	                        break;
	    
	    
	                    case STATUS.INVALID:
	                        stats.numOfInvalid++;
	                        break;
	    
	                    case STATUS.INTERRUPT:
	                        stats.numofInterrupt++;
	                        break;
	                }
	            }
	    
	        });
	    
	        Mediator.installTo( Queue.prototype );
	    
	        return Queue;
	    });
	    /**
	     * @fileOverview 队列
	     */
	    define('widgets/queue',[
	        'base',
	        'uploader',
	        'queue',
	        'file',
	        'lib/file',
	        'runtime/client',
	        'widgets/widget'
	    ], function( Base, Uploader, Queue, WUFile, File, RuntimeClient ) {
	    
	        var $ = Base.$,
	            rExt = /\.\w+$/,
	            Status = WUFile.Status;
	    
	        return Uploader.register({
	            name: 'queue',
	    
	            init: function( opts ) {
	                var me = this,
	                    deferred, len, i, item, arr, accept, runtime;
	    
	                if ( $.isPlainObject( opts.accept ) ) {
	                    opts.accept = [ opts.accept ];
	                }
	    
	                // accept中的中生成匹配正则。
	                if ( opts.accept ) {
	                    arr = [];
	    
	                    for ( i = 0, len = opts.accept.length; i < len; i++ ) {
	                        item = opts.accept[ i ].extensions;
	                        item && arr.push( item );
	                    }
	    
	                    if ( arr.length ) {
	                        accept = '\\.' + arr.join(',')
	                                .replace( /,/g, '$|\\.' )
	                                .replace( /\*/g, '.*' ) + '$';
	                    }
	    
	                    me.accept = new RegExp( accept, 'i' );
	                }
	    
	                me.queue = new Queue();
	                me.stats = me.queue.stats;
	    
	                // 如果当前不是html5运行时，那就算了。
	                // 不执行后续操作
	                if ( this.request('predict-runtime-type') !== 'html5' ) {
	                    return;
	                }
	    
	                // 创建一个 html5 运行时的 placeholder
	                // 以至于外部添加原生 File 对象的时候能正确包裹一下供 webuploader 使用。
	                deferred = Base.Deferred();
	                this.placeholder = runtime = new RuntimeClient('Placeholder');
	                runtime.connectRuntime({
	                    runtimeOrder: 'html5'
	                }, function() {
	                    me._ruid = runtime.getRuid();
	                    deferred.resolve();
	                });
	                return deferred.promise();
	            },
	    
	    
	            // 为了支持外部直接添加一个原生File对象。
	            _wrapFile: function( file ) {
	                if ( !(file instanceof WUFile) ) {
	    
	                    if ( !(file instanceof File) ) {
	                        if ( !this._ruid ) {
	                            throw new Error('Can\'t add external files.');
	                        }
	                        file = new File( this._ruid, file );
	                    }
	    
	                    file = new WUFile( file );
	                }
	    
	                return file;
	            },
	    
	            // 判断文件是否可以被加入队列
	            acceptFile: function( file ) {
	                 var invalid = !file || !file.size || this.accept &&
	    
	                        // 如果名字中有后缀，才做后缀白名单处理。
	                        rExt.exec( file.name )!== null ? !this.accept.test( file.name ) : true;
	                return !invalid;
	            },
	    
	    
	            /**
	             * @event beforeFileQueued
	             * @param {File} file File对象
	             * @description 当文件被加入队列之前触发，此事件的handler返回值为`false`，则此文件不会被添加进入队列。
	             * @for  Uploader
	             */
	    
	            /**
	             * @event fileQueued
	             * @param {File} file File对象
	             * @description 当文件被加入队列以后触发。
	             * @for  Uploader
	             */
	    
	            _addFile: function( file ) {
	                var me = this;
	    
	                file = me._wrapFile( file );
	    
	                // 不过类型判断允许不允许，先派送 `beforeFileQueued`
	                if ( !me.owner.trigger( 'beforeFileQueued', file ) ) {
	                    return;
	                }
	    
	                // 类型不匹配，则派送错误事件，并返回。
	                if ( !me.acceptFile( file ) ) {
	                    me.owner.trigger( 'error', 'Q_TYPE_DENIED', file );
	                    return;
	                }
	    
	                me.queue.append( file );
	                me.owner.trigger( 'fileQueued', file );
	                return file;
	            },
	    
	            getFile: function( fileId ) {
	                return this.queue.getFile( fileId );
	            },
	    
	            /**
	             * @event filesQueued
	             * @param {File} files 数组，内容为原始File(lib/File）对象。
	             * @description 当一批文件添加进队列以后触发。
	             * @for  Uploader
	             */
	            
	            /**
	             * @property {Boolean} [auto=false]
	             * @namespace options
	             * @for Uploader
	             * @description 设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
	             * 
	             */
	    
	            /**
	             * @method addFiles
	             * @grammar addFiles( file ) => undefined
	             * @grammar addFiles( [file1, file2 ...] ) => undefined
	             * @param {Array of File or File} [files] Files 对象 数组
	             * @description 添加文件到队列
	             * @for  Uploader
	             */
	            addFile: function( files ) {
	                var me = this;
	    
	                if ( !files.length ) {
	                    files = [ files ];
	                }
	    
	                files = $.map( files, function( file ) {
	                    return me._addFile( file );
	                });
	    
	                me.owner.trigger( 'filesQueued', files );
	    
	                if ( me.options.auto ) {
	                    setTimeout(function() {
	                        me.request('start-upload');
	                    }, 20 );
	                }
	            },
	    
	            getStats: function() {
	                return this.stats;
	            },
	    
	            /**
	             * @event fileDequeued
	             * @param {File} file File对象
	             * @description 当文件被移除队列后触发。
	             * @for  Uploader
	             */
	    
	             /**
	             * @method removeFile
	             * @grammar removeFile( file ) => undefined
	             * @grammar removeFile( id ) => undefined
	             * @grammar removeFile( file, true ) => undefined
	             * @grammar removeFile( id, true ) => undefined
	             * @param {File|id} file File对象或这File对象的id
	             * @description 移除某一文件, 默认只会标记文件状态为已取消，如果第二个参数为 `true` 则会从 queue 中移除。
	             * @for  Uploader
	             * @example
	             *
	             * $li.on('click', '.remove-this', function() {
	             *     uploader.removeFile( file );
	             * })
	             */
	            removeFile: function( file, remove ) {
	                var me = this;
	    
	                file = file.id ? file : me.queue.getFile( file );
	    
	                this.request( 'cancel-file', file );
	    
	                if ( remove ) {
	                    this.queue.removeFile( file );
	                }
	            },
	    
	            /**
	             * @method getFiles
	             * @grammar getFiles() => Array
	             * @grammar getFiles( status1, status2, status... ) => Array
	             * @description 返回指定状态的文件集合，不传参数将返回所有状态的文件。
	             * @for  Uploader
	             * @example
	             * console.log( uploader.getFiles() );    // => all files
	             * console.log( uploader.getFiles('error') )    // => all error files.
	             */
	            getFiles: function() {
	                return this.queue.getFiles.apply( this.queue, arguments );
	            },
	    
	            fetchFile: function() {
	                return this.queue.fetch.apply( this.queue, arguments );
	            },
	    
	            /**
	             * @method retry
	             * @grammar retry() => undefined
	             * @grammar retry( file ) => undefined
	             * @description 重试上传，重试指定文件，或者从出错的文件开始重新上传。
	             * @for  Uploader
	             * @example
	             * function retry() {
	             *     uploader.retry();
	             * }
	             */
	            retry: function( file, noForceStart ) {
	                var me = this,
	                    files, i, len;
	    
	                if ( file ) {
	                    file = file.id ? file : me.queue.getFile( file );
	                    file.setStatus( Status.QUEUED );
	                    noForceStart || me.request('start-upload');
	                    return;
	                }
	    
	                files = me.queue.getFiles( Status.ERROR );
	                i = 0;
	                len = files.length;
	    
	                for ( ; i < len; i++ ) {
	                    file = files[ i ];
	                    file.setStatus( Status.QUEUED );
	                }
	    
	                me.request('start-upload');
	            },
	    
	            /**
	             * @method sort
	             * @grammar sort( fn ) => undefined
	             * @description 排序队列中的文件，在上传之前调整可以控制上传顺序。
	             * @for  Uploader
	             */
	            sortFiles: function() {
	                return this.queue.sort.apply( this.queue, arguments );
	            },
	    
	            /**
	             * @event reset
	             * @description 当 uploader 被重置的时候触发。
	             * @for  Uploader
	             */
	    
	            /**
	             * @method reset
	             * @grammar reset() => undefined
	             * @description 重置uploader。目前只重置了队列。
	             * @for  Uploader
	             * @example
	             * uploader.reset();
	             */
	            reset: function() {
	                this.owner.trigger('reset');
	                this.queue = new Queue();
	                this.stats = this.queue.stats;
	            },
	    
	            destroy: function() {
	                this.reset();
	                this.placeholder && this.placeholder.destroy();
	            }
	        });
	    
	    });
	    /**
	     * @fileOverview 添加获取Runtime相关信息的方法。
	     */
	    define('widgets/runtime',[
	        'uploader',
	        'runtime/runtime',
	        'widgets/widget'
	    ], function( Uploader, Runtime ) {
	    
	        Uploader.support = function() {
	            return Runtime.hasRuntime.apply( Runtime, arguments );
	        };
	    
	        /**
	         * @property {Object} [runtimeOrder=html5,flash]
	         * @namespace options
	         * @for Uploader
	         * @description 指定运行时启动顺序。默认会想尝试 html5 是否支持，如果支持则使用 html5, 否则则使用 flash.
	         *
	         * 可以将此值设置成 `flash`，来强制使用 flash 运行时。
	         */
	    
	        return Uploader.register({
	            name: 'runtime',
	    
	            init: function() {
	                if ( !this.predictRuntimeType() ) {
	                    throw Error('Runtime Error');
	                }
	            },
	    
	            /**
	             * 预测Uploader将采用哪个`Runtime`
	             * @grammar predictRuntimeType() => String
	             * @method predictRuntimeType
	             * @for  Uploader
	             */
	            predictRuntimeType: function() {
	                var orders = this.options.runtimeOrder || Runtime.orders,
	                    type = this.type,
	                    i, len;
	    
	                if ( !type ) {
	                    orders = orders.split( /\s*,\s*/g );
	    
	                    for ( i = 0, len = orders.length; i < len; i++ ) {
	                        if ( Runtime.hasRuntime( orders[ i ] ) ) {
	                            this.type = type = orders[ i ];
	                            break;
	                        }
	                    }
	                }
	    
	                return type;
	            }
	        });
	    });
	    /**
	     * @fileOverview Transport
	     */
	    define('lib/transport',[
	        'base',
	        'runtime/client',
	        'mediator'
	    ], function( Base, RuntimeClient, Mediator ) {
	    
	        var $ = Base.$;
	    
	        function Transport( opts ) {
	            var me = this;
	    
	            opts = me.options = $.extend( true, {}, Transport.options, opts || {} );
	            RuntimeClient.call( this, 'Transport' );
	    
	            this._blob = null;
	            this._formData = opts.formData || {};
	            this._headers = opts.headers || {};
	    
	            this.on( 'progress', this._timeout );
	            this.on( 'load error', function() {
	                me.trigger( 'progress', 1 );
	                clearTimeout( me._timer );
	            });
	        }
	    
	        Transport.options = {
	            server: '',
	            method: 'POST',
	    
	            // 跨域时，是否允许携带cookie, 只有html5 runtime才有效
	            withCredentials: false,
	            fileVal: 'file',
	            timeout: 2 * 60 * 1000,    // 2分钟
	            formData: {},
	            headers: {},
	            sendAsBinary: false
	        };
	    
	        $.extend( Transport.prototype, {
	    
	            // 添加Blob, 只能添加一次，最后一次有效。
	            appendBlob: function( key, blob, filename ) {
	                var me = this,
	                    opts = me.options;
	    
	                if ( me.getRuid() ) {
	                    me.disconnectRuntime();
	                }
	    
	                // 连接到blob归属的同一个runtime.
	                me.connectRuntime( blob.ruid, function() {
	                    me.exec('init');
	                });
	    
	                me._blob = blob;
	                opts.fileVal = key || opts.fileVal;
	                opts.filename = filename || opts.filename;

	            },
	    
	            // 添加其他字段
	            append: function( key, value ) {
	                if ( typeof key === 'object' ) {
	                    $.extend( this._formData, key );
	                } else {
	                    this._formData[ key ] = value;
	                }
	            },
	    
	            setRequestHeader: function( key, value ) {
	                if ( typeof key === 'object' ) {
	                    $.extend( this._headers, key );
	                } else {
	                    this._headers[ key ] = value;
	                }
	            },
	    
	            send: function( method ) {
	                this.exec( 'send', method );
	                this._timeout();
	            },
	    
	            abort: function() {
	                clearTimeout( this._timer );
	                return this.exec('abort');
	            },
	    
	            destroy: function() {
	                this.trigger('destroy');
	                this.off();
	                this.exec('destroy');
	                this.disconnectRuntime();
	            },
	    
	            getResponse: function() {
	                return this.exec('getResponse');
	            },
	    
	            getResponseAsJson: function() {
	                return this.exec('getResponseAsJson');
	            },
	    
	            getStatus: function() {
	                return this.exec('getStatus');
	            },
	    
	            _timeout: function() {
	                var me = this,
	                    duration = me.options.timeout;
	    
	                if ( !duration ) {
	                    return;
	                }
	    
	                clearTimeout( me._timer );
	                me._timer = setTimeout(function() {
	                    me.abort();
	                    me.trigger( 'error', 'timeout' );
	                }, duration );
	            }
	    
	        });
	    
	        // 让Transport具备事件功能。
	        Mediator.installTo( Transport.prototype );
	    
	        return Transport;
	    });
	    /**
	     * @fileOverview 负责文件上传相关。
	     */
	    define('widgets/upload',[
	        'base',
	        'uploader',
	        'file',
	        'lib/transport',
	        'widgets/widget'
	    ], function( Base, Uploader, WUFile, Transport ) {
	    
	        var $ = Base.$,
	            isPromise = Base.isPromise,
	            Status = WUFile.Status;
	    
	        // 添加默认配置项
	        $.extend( Uploader.options, {
	    
	    
	            /**
	             * @property {Boolean} [prepareNextFile=false]
	             * @namespace options
	             * @for Uploader
	             * @description 是否允许在文件传输时提前把下一个文件准备好。
	             * 对于一个文件的准备工作比较耗时，比如图片压缩，md5序列化。
	             * 如果能提前在当前文件传输期处理，可以节省总体耗时。
	             */
	            prepareNextFile: false,
	    
	            /**
	             * @property {Boolean} [chunked=false]
	             * @namespace options
	             * @for Uploader
	             * @description 是否要分片处理大文件上传。
	             */
	            chunked: false,
	    
	            /**
	             * @property {Boolean} [chunkSize=5242880]
	             * @namespace options
	             * @for Uploader
	             * @description 如果要分片，分多大一片？ 默认大小为5M.
	             */
	            chunkSize: 5 * 1024 * 1024,
	    
	            /**
	             * @property {Boolean} [chunkRetry=2]
	             * @namespace options
	             * @for Uploader
	             * @description 如果某个分片由于网络问题出错，允许自动重传多少次？
	             */
	            chunkRetry: 2,
	    
	            /**
	             * @property {Boolean} [threads=3]
	             * @namespace options
	             * @for Uploader
	             * @description 上传并发数。允许同时最大上传进程数。
	             */
	            threads: 3,
	    
	    
	            /**
	             * @property {Object} [formData={}]
	             * @namespace options
	             * @for Uploader
	             * @description 文件上传请求的参数表，每次发送都会发送此对象中的参数。
	             */
	            formData: {}
	    
	            /**
	             * @property {Object} [fileVal='file']
	             * @namespace options
	             * @for Uploader
	             * @description 设置文件上传域的name。
	             */
	    
	            /**
	             * @property {Object} [method='POST']
	             * @namespace options
	             * @for Uploader
	             * @description 文件上传方式，`POST`或者`GET`。
	             */
	    
	            /**
	             * @property {Object} [sendAsBinary=false]
	             * @namespace options
	             * @for Uploader
	             * @description 是否已二进制的流的方式发送文件，这样整个上传内容`php://input`都为文件内容，
	             * 其他参数在$_GET数组中。
	             */
	        });
	    
	        // 负责将文件切片。
	        function CuteFile( file, chunkSize ) {
	            var pending = [],
	                blob = file.source,
	                total = blob.size,
	                chunks = chunkSize ? Math.ceil( total / chunkSize ) : 1,
	                start = 0,
	                index = 0,
	                len, api;
	    
	            api = {
	                file: file,
	    
	                has: function() {
	                    return !!pending.length;
	                },
	    
	                shift: function() {
	                    return pending.shift();
	                },
	    
	                unshift: function( block ) {
	                    pending.unshift( block );
	                }
	            };
	    
	            while ( index < chunks ) {
	                len = Math.min( chunkSize, total - start );
	    
	                pending.push({
	                    file: file,
	                    start: start,
	                    end: chunkSize ? (start + len) : total,
	                    total: total,
	                    chunks: chunks,
	                    chunk: index++,
	                    cuted: api
	                });
	                start += len;
	            }
	    
	            file.blocks = pending.concat();
	            file.remaning = pending.length;
	    
	            return api;
	        }
	    
	        Uploader.register({
	            name: 'upload',
	    
	            init: function() {
	                var owner = this.owner,
	                    me = this;
	    
	                this.runing = false;
	                this.progress = false;
	    
	                owner
	                    .on( 'startUpload', function() {
	                        me.progress = true;
	                    })
	                    .on( 'uploadFinished', function() {
	                        me.progress = false;
	                    });
	    
	                // 记录当前正在传的数据，跟threads相关
	                this.pool = [];
	    
	                // 缓存分好片的文件。
	                this.stack = [];
	    
	                // 缓存即将上传的文件。
	                this.pending = [];
	    
	                // 跟踪还有多少分片在上传中但是没有完成上传。
	                this.remaning = 0;
	                this.__tick = Base.bindFn( this._tick, this );
	    
	                owner.on( 'uploadComplete', function( file ) {
	    
	                    // 把其他块取消了。
	                    file.blocks && $.each( file.blocks, function( _, v ) {
	                        v.transport && (v.transport.abort(), v.transport.destroy());
	                        delete v.transport;
	                    });
	    
	                    delete file.blocks;
	                    delete file.remaning;
	                });
	            },
	    
	            reset: function() {
	                this.request( 'stop-upload', true );
	                this.runing = false;
	                this.pool = [];
	                this.stack = [];
	                this.pending = [];
	                this.remaning = 0;
	                this._trigged = false;
	                this._promise = null;
	            },
	    
	            /**
	             * @event startUpload
	             * @description 当开始上传流程时触发。
	             * @for  Uploader
	             */
	    
	            /**
	             * 开始上传。此方法可以从初始状态调用开始上传流程，也可以从暂停状态调用，继续上传流程。
	             *
	             * 可以指定开始某一个文件。
	             * @grammar upload() => undefined
	             * @grammar upload( file | fileId) => undefined
	             * @method upload
	             * @for  Uploader
	             */
	            startUpload: function(file) {
	                var me = this;
	    
	                // 移出invalid的文件
	                $.each( me.request( 'get-files', Status.INVALID ), function() {
	                    me.request( 'remove-file', this );
	                });
	    
	                // 如果指定了开始某个文件，则只开始指定文件。
	                if ( file ) {
	                    file = file.id ? file : me.request( 'get-file', file );
	    
	                    if (file.getStatus() === Status.INTERRUPT) {
	                        $.each( me.pool, function( _, v ) {
	    
	                            // 之前暂停过。
	                            if (v.file !== file) {
	                                return;
	                            }
	    
	                            v.transport && v.transport.send();
	                        });
	    
	                        file.setStatus( Status.QUEUED );
	                    } else if (file.getStatus() === Status.PROGRESS) {
	                        return;
	                    } else {
	                        file.setStatus( Status.QUEUED );
	                    }
	                } else {
	                    $.each( me.request( 'get-files', [ Status.INITED ] ), function() {
	                        this.setStatus( Status.QUEUED );
	                    });
	                }
	    
	                if ( me.runing ) {
	                    return;
	                }
	    
	                me.runing = true;
	    
	                var files = [];
	    
	                // 如果有暂停的，则续传
	                $.each( me.pool, function( _, v ) {
	                    var file = v.file;
	    
	                    if ( file.getStatus() === Status.INTERRUPT ) {
	                        files.push(file);
	                        me._trigged = false;
	                        v.transport && v.transport.send();
	                    }
	                });
	    
	                var file;
	                while ( (file = files.shift()) ) {
	                    file.setStatus( Status.PROGRESS );
	                }
	    
	                file || $.each( me.request( 'get-files',
	                        Status.INTERRUPT ), function() {
	                    this.setStatus( Status.PROGRESS );
	                });
	    
	                me._trigged = false;
	                Base.nextTick( me.__tick );
	                me.owner.trigger('startUpload');
	            },
	    
	            /**
	             * @event stopUpload
	             * @description 当开始上传流程暂停时触发。
	             * @for  Uploader
	             */
	    
	            /**
	             * 暂停上传。第一个参数为是否中断上传当前正在上传的文件。
	             *
	             * 如果第一个参数是文件，则只暂停指定文件。
	             * @grammar stop() => undefined
	             * @grammar stop( true ) => undefined
	             * @grammar stop( file ) => undefined
	             * @method stop
	             * @for  Uploader
	             */
	            stopUpload: function( file, interrupt ) {
	                var me = this;
	    
	                if (file === true) {
	                    interrupt = file;
	                    file = null;
	                }
	    
	                if ( me.runing === false ) {
	                    return;
	                }
	    
	                // 如果只是暂停某个文件。
	                if ( file ) {
	                    file = file.id ? file : me.request( 'get-file', file );
	    
	                    if ( file.getStatus() !== Status.PROGRESS &&
	                            file.getStatus() !== Status.QUEUED ) {
	                        return;
	                    }
	    
	                    file.setStatus( Status.INTERRUPT );
	                    $.each( me.pool, function( _, v ) {
	    
	                        // 只 abort 指定的文件。
	                        if (v.file !== file) {
	                            return;
	                        }
	    
	                        v.transport && v.transport.abort();
	                        me._putback(v);
	                        me._popBlock(v);
	                    });
	    
	                    return Base.nextTick( me.__tick );
	                }
	    
	                me.runing = false;
	    
	                if (this._promise && this._promise.file) {
	                    this._promise.file.setStatus( Status.INTERRUPT );
	                }
	    
	                interrupt && $.each( me.pool, function( _, v ) {
	                    v.transport && v.transport.abort();
	                    v.file.setStatus( Status.INTERRUPT );
	                });
	    
	                me.owner.trigger('stopUpload');
	            },
	    
	            /**
	             * @method cancelFile
	             * @grammar cancelFile( file ) => undefined
	             * @grammar cancelFile( id ) => undefined
	             * @param {File|id} file File对象或这File对象的id
	             * @description 标记文件状态为已取消, 同时将中断文件传输。
	             * @for  Uploader
	             * @example
	             *
	             * $li.on('click', '.remove-this', function() {
	             *     uploader.cancelFile( file );
	             * })
	             */
	            cancelFile: function( file ) {
	                file = file.id ? file : this.request( 'get-file', file );
	    
	                // 如果正在上传。
	                file.blocks && $.each( file.blocks, function( _, v ) {
	                    var _tr = v.transport;
	    
	                    if ( _tr ) {
	                        _tr.abort();
	                        _tr.destroy();
	                        delete v.transport;
	                    }
	                });
	    
	                file.setStatus( Status.CANCELLED );
	                this.owner.trigger( 'fileDequeued', file );
	            },
	    
	            /**
	             * 判断`Uplaode`r是否正在上传中。
	             * @grammar isInProgress() => Boolean
	             * @method isInProgress
	             * @for  Uploader
	             */
	            isInProgress: function() {
	                return !!this.progress;
	            },
	    
	            _getStats: function() {
	                return this.request('get-stats');
	            },
	    
	            /**
	             * 掉过一个文件上传，直接标记指定文件为已上传状态。
	             * @grammar skipFile( file ) => undefined
	             * @method skipFile
	             * @for  Uploader
	             */
	            skipFile: function( file, status ) {
	                file = file.id ? file : this.request( 'get-file', file );
	    
	                file.setStatus( status || Status.COMPLETE );
	                file.skipped = true;
	    
	                // 如果正在上传。
	                file.blocks && $.each( file.blocks, function( _, v ) {
	                    var _tr = v.transport;
	    
	                    if ( _tr ) {
	                        _tr.abort();
	                        _tr.destroy();
	                        delete v.transport;
	                    }
	                });
	    
	                this.owner.trigger( 'uploadSkip', file );
	            },
	    
	            /**
	             * @event uploadFinished
	             * @description 当所有文件上传结束时触发。
	             * @for  Uploader
	             */
	            _tick: function() {
	                var me = this,
	                    opts = me.options,
	                    fn, val;
	    
	                // 上一个promise还没有结束，则等待完成后再执行。
	                if ( me._promise ) {
	                    return me._promise.always( me.__tick );
	                }
	    
	                // 还有位置，且还有文件要处理的话。
	                if ( me.pool.length < opts.threads && (val = me._nextBlock()) ) {
	                    me._trigged = false;
	    
	                    fn = function( val ) {
	                        me._promise = null;
	    
	                        // 有可能是reject过来的，所以要检测val的类型。
	                        val && val.file && me._startSend( val );
	                        Base.nextTick( me.__tick );
	                    };
	    
	                    me._promise = isPromise( val ) ? val.always( fn ) : fn( val );
	    
	                // 没有要上传的了，且没有正在传输的了。
	                } else if ( !me.remaning && !me._getStats().numOfQueue &&
	                    !me._getStats().numofInterrupt ) {
	                    me.runing = false;
	    
	                    me._trigged || Base.nextTick(function() {
	                        me.owner.trigger('uploadFinished');
	                    });
	                    me._trigged = true;
	                }
	            },
	    
	            _putback: function(block) {
	                var idx;
	    
	                block.cuted.unshift(block);
	                idx = this.stack.indexOf(block.cuted);
	    
	                if (!~idx) {
	                    this.stack.unshift(block.cuted);
	                }
	            },
	    
	            _getStack: function() {
	                var i = 0,
	                    act;
	    
	                while ( (act = this.stack[ i++ ]) ) {
	                    if ( act.has() && act.file.getStatus() === Status.PROGRESS ) {
	                        return act;
	                    } else if (!act.has() ||
	                            act.file.getStatus() !== Status.PROGRESS &&
	                            act.file.getStatus() !== Status.INTERRUPT ) {
	    
	                        // 把已经处理完了的，或者，状态为非 progress（上传中）、
	                        // interupt（暂停中） 的移除。
	                        this.stack.splice( --i, 1 );
	                    }
	                }
	    
	                return null;
	            },
	    
	            _nextBlock: function() {
	                var me = this,
	                    opts = me.options,
	                    act, next, done, preparing;
	    
	                // 如果当前文件还有没有需要传输的，则直接返回剩下的。
	                if ( (act = this._getStack()) ) {
	    
	                    // 是否提前准备下一个文件
	                    if ( opts.prepareNextFile && !me.pending.length ) {
	                        me._prepareNextFile();
	                    }
	    
	                    return act.shift();
	    
	                // 否则，如果正在运行，则准备下一个文件，并等待完成后返回下个分片。
	                } else if ( me.runing ) {
	    
	                    // 如果缓存中有，则直接在缓存中取，没有则去queue中取。
	                    if ( !me.pending.length && me._getStats().numOfQueue ) {
	                        me._prepareNextFile();
	                    }
	    
	                    next = me.pending.shift();
	                    done = function( file ) {
	                        if ( !file ) {
	                            return null;
	                        }
	    
	                        act = CuteFile( file, opts.chunked ? opts.chunkSize : 0 );
	                        me.stack.push(act);
	                        return act.shift();
	                    };
	    
	                    // 文件可能还在prepare中，也有可能已经完全准备好了。
	                    if ( isPromise( next) ) {
	                        preparing = next.file;
	                        next = next[ next.pipe ? 'pipe' : 'then' ]( done );
	                        next.file = preparing;
	                        return next;
	                    }
	    
	                    return done( next );
	                }
	            },
	    
	    
	            /**
	             * @event uploadStart
	             * @param {File} file File对象
	             * @description 某个文件开始上传前触发，一个文件只会触发一次。
	             * @for  Uploader
	             */
	            _prepareNextFile: function() {
	                var me = this,
	                    file = me.request('fetch-file'),
	                    pending = me.pending,
	                    promise;
	    
	                if ( file ) {
	                    promise = me.request( 'before-send-file', file, function() {
	    
	                        // 有可能文件被skip掉了。文件被skip掉后，状态坑定不是Queued.
	                        if ( file.getStatus() === Status.PROGRESS ||
	                            file.getStatus() === Status.INTERRUPT ) {
	                            return file;
	                        }
	    
	                        return me._finishFile( file );
	                    });
	    
	                    me.owner.trigger( 'uploadStart', file );
	                    file.setStatus( Status.PROGRESS );
	    
	                    promise.file = file;
	    
	                    // 如果还在pending中，则替换成文件本身。
	                    promise.done(function() {
	                        var idx = $.inArray( promise, pending );
	    
	                        ~idx && pending.splice( idx, 1, file );
	                    });
	    
	                    // befeore-send-file的钩子就有错误发生。
	                    promise.fail(function( reason ) {
	                        file.setStatus( Status.ERROR, reason );
	                        me.owner.trigger( 'uploadError', file, reason );
	                        me.owner.trigger( 'uploadComplete', file );
	                    });
	    
	                    pending.push( promise );
	                }
	            },
	    
	            // 让出位置了，可以让其他分片开始上传
	            _popBlock: function( block ) {
	                var idx = $.inArray( block, this.pool );
	    
	                this.pool.splice( idx, 1 );
	                block.file.remaning--;
	                this.remaning--;
	            },
	    
	            // 开始上传，可以被掉过。如果promise被reject了，则表示跳过此分片。
	            _startSend: function( block ) {
	                var me = this,
	                    file = block.file,
	                    promise;
	    
	                // 有可能在 before-send-file 的 promise 期间改变了文件状态。
	                // 如：暂停，取消
	                // 我们不能中断 promise, 但是可以在 promise 完后，不做上传操作。
	                if ( file.getStatus() !== Status.PROGRESS ) {
	    
	                    // 如果是中断，则还需要放回去。
	                    if (file.getStatus() === Status.INTERRUPT) {
	                        me._putback(block);
	                    }
	    
	                    return;
	                }
	    
	                me.pool.push( block );
	                me.remaning++;
	    
	                // 如果没有分片，则直接使用原始的。
	                // 不会丢失content-type信息。
	                block.blob = block.chunks === 1 ? file.source :
	                        file.source.slice( block.start, block.end );
	    
	                // hook, 每个分片发送之前可能要做些异步的事情。
	                promise = me.request( 'before-send', block, function() {
	    
	                    // 有可能文件已经上传出错了，所以不需要再传输了。
	                    if ( file.getStatus() === Status.PROGRESS ) {
	                        me._doSend( block );
	                    } else {
	                        me._popBlock( block );
	                        Base.nextTick( me.__tick );
	                    }
	                });
	    
	                // 如果为fail了，则跳过此分片。
	                promise.fail(function() {
	                    if ( file.remaning === 1 ) {
	                        me._finishFile( file ).always(function() {
	                            block.percentage = 1;
	                            me._popBlock( block );
	                            me.owner.trigger( 'uploadComplete', file );
	                            Base.nextTick( me.__tick );
	                        });
	                    } else {
	                        block.percentage = 1;
	                        me.updateFileProgress( file );
	                        me._popBlock( block );
	                        Base.nextTick( me.__tick );
	                    }
	                });
	            },
	    
	    
	            /**
	             * @event uploadBeforeSend
	             * @param {Object} object
	             * @param {Object} data 默认的上传参数，可以扩展此对象来控制上传参数。
	             * @param {Object} headers 可以扩展此对象来控制上传头部。
	             * @description 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
	             * @for  Uploader
	             */
	    
	            /**
	             * @event uploadAccept
	             * @param {Object} object
	             * @param {Object} ret 服务端的返回数据，json格式，如果服务端不是json格式，从ret._raw中取数据，自行解析。
	             * @description 当某个文件上传到服务端响应后，会派送此事件来询问服务端响应是否有效。如果此事件handler返回值为`false`, 则此文件将派送`server`类型的`uploadError`事件。
	             * @for  Uploader
	             */
	    
	            /**
	             * @event uploadProgress
	             * @param {File} file File对象
	             * @param {Number} percentage 上传进度
	             * @description 上传过程中触发，携带上传进度。
	             * @for  Uploader
	             */
	    
	    
	            /**
	             * @event uploadError
	             * @param {File} file File对象
	             * @param {String} reason 出错的code
	             * @description 当文件上传出错时触发。
	             * @for  Uploader
	             */
	    
	            /**
	             * @event uploadSuccess
	             * @param {File} file File对象
	             * @param {Object} response 服务端返回的数据
	             * @description 当文件上传成功时触发。
	             * @for  Uploader
	             */
	    
	            /**
	             * @event uploadComplete
	             * @param {File} [file] File对象
	             * @description 不管成功或者失败，文件上传完成时触发。
	             * @for  Uploader
	             */
	    
	            // 做上传操作。
	            _doSend: function( block ) {
	                var me = this,
	                    owner = me.owner,
	                    opts = me.options,
	                    file = block.file,
	                    tr = new Transport( opts ),
	                    data = $.extend({}, opts.formData ),
	                    headers = $.extend({}, opts.headers ),
	                    requestAccept, ret;
	    
	                block.transport = tr;
	    
	                tr.on( 'destroy', function() {
	                    delete block.transport;
	                    me._popBlock( block );
	                    Base.nextTick( me.__tick );
	                });
	    
	                // 广播上传进度。以文件为单位。
	                tr.on( 'progress', function( percentage ) {
	                    block.percentage = percentage;
	                    me.updateFileProgress( file );
	                });
	    
	                // 用来询问，是否返回的结果是有错误的。
	                requestAccept = function( reject ) {
	                    var fn;
	    
	                    ret = tr.getResponseAsJson() || {};
	                    ret._raw = tr.getResponse();
	                    fn = function( value ) {
	                        reject = value;
	                    };
	    
	                    // 服务端响应了，不代表成功了，询问是否响应正确。
	                    if ( !owner.trigger( 'uploadAccept', block, ret, fn ) ) {
	                        reject = reject || 'server';
	                    }
	    
	                    return reject;
	                };
	    
	                // 尝试重试，然后广播文件上传出错。
	                tr.on( 'error', function( type, flag ) {
	                    block.retried = block.retried || 0;
	    
	                    // 自动重试
	                    if ( block.chunks > 1 && ~'http,abort'.indexOf( type ) &&
	                            block.retried < opts.chunkRetry ) {
	    
	                        block.retried++;
	                        tr.send();
	    
	                    } else {
	    
	                        // http status 500 ~ 600
	                        if ( !flag && type === 'server' ) {
	                            type = requestAccept( type );
	                        }
	    
	                        file.setStatus( Status.ERROR, type );
	                        owner.trigger( 'uploadError', file, type );
	                        owner.trigger( 'uploadComplete', file );
	                    }
	                });
	    
	                // 上传成功
	                tr.on( 'load', function() {
	                    var reason;
	    
	                    // 如果非预期，转向上传出错。
	                    if ( (reason = requestAccept()) ) {
	                        tr.trigger( 'error', reason, true );
	                        return;
	                    }
	    
	                    // 全部上传完成。
	                    if ( file.remaning === 1 ) {
	                        me._finishFile( file, ret );
	                    } else {
	                        tr.destroy();
	                    }
	                });
	    
	                // 配置默认的上传字段。
	                data = $.extend( data, {
	                    id: file.id,
	                    name: file.name,
	                    type: file.type,
	                    lastModifiedDate: file.lastModifiedDate,
	                    size: file.size
	                });
	    
	                block.chunks > 1 && $.extend( data, {
	                    chunks: block.chunks,
	                    chunk: block.chunk
	                });
	    
	                // 在发送之间可以添加字段什么的。。。
	                // 如果默认的字段不够使用，可以通过监听此事件来扩展
	                owner.trigger( 'uploadBeforeSend', block, data, headers );
	    
	                // 开始发送。
	                tr.appendBlob( opts.fileVal, block.blob, file.name );
	                tr.append( data );
	                tr.setRequestHeader( headers );
	                tr.send();
	            },
	    
	            // 完成上传。
	            _finishFile: function( file, ret, hds ) {
	                var owner = this.owner;
	    
	                return owner
	                        .request( 'after-send-file', arguments, function() {
	                            file.setStatus( Status.COMPLETE );
	                            owner.trigger( 'uploadSuccess', file, ret, hds );
	                        })
	                        .fail(function( reason ) {
	    
	                            // 如果外部已经标记为invalid什么的，不再改状态。
	                            if ( file.getStatus() === Status.PROGRESS ) {
	                                file.setStatus( Status.ERROR, reason );
	                            }
	    
	                            owner.trigger( 'uploadError', file, reason );
	                        })
	                        .always(function() {
	                            owner.trigger( 'uploadComplete', file );
	                        });
	            },
	    
	            updateFileProgress: function(file) {
	                var totalPercent = 0,
	                    uploaded = 0;
	    
	                if (!file.blocks) {
	                    return;
	                }
	    
	                $.each( file.blocks, function( _, v ) {
	                    uploaded += (v.percentage || 0) * (v.end - v.start);
	                });
	    
	                totalPercent = uploaded / file.size;
	                this.owner.trigger( 'uploadProgress', file, totalPercent || 0 );
	            }
	    
	        });
	    });
	    /**
	     * @fileOverview 各种验证，包括文件总大小是否超出、单文件是否超出和文件是否重复。
	     */
	    
	    define('widgets/validator',[
	        'base',
	        'uploader',
	        'file',
	        'widgets/widget'
	    ], function( Base, Uploader, WUFile ) {
	    
	        var $ = Base.$,
	            validators = {},
	            api;
	    
	        /**
	         * @event error
	         * @param {String} type 错误类型。
	         * @description 当validate不通过时，会以派送错误事件的形式通知调用者。通过`upload.on('error', handler)`可以捕获到此类错误，目前有以下错误会在特定的情况下派送错来。
	         *
	         * * `Q_EXCEED_NUM_LIMIT` 在设置了`fileNumLimit`且尝试给`uploader`添加的文件数量超出这个值时派送。
	         * * `Q_EXCEED_SIZE_LIMIT` 在设置了`Q_EXCEED_SIZE_LIMIT`且尝试给`uploader`添加的文件总大小超出这个值时派送。
	         * * `Q_TYPE_DENIED` 当文件类型不满足时触发。。
	         * @for  Uploader
	         */
	    
	        // 暴露给外面的api
	        api = {
	    
	            // 添加验证器
	            addValidator: function( type, cb ) {
	                validators[ type ] = cb;
	            },
	    
	            // 移除验证器
	            removeValidator: function( type ) {
	                delete validators[ type ];
	            }
	        };
	    
	        // 在Uploader初始化的时候启动Validators的初始化
	        Uploader.register({
	            name: 'validator',
	    
	            init: function() {
	                var me = this;
	                Base.nextTick(function() {
	                    $.each( validators, function() {
	                        this.call( me.owner );
	                    });
	                });
	            }
	        });
	    
	        /**
	         * @property {int} [fileNumLimit=undefined]
	         * @namespace options
	         * @for Uploader
	         * @description 验证文件总数量, 超出则不允许加入队列。
	         */
	        api.addValidator( 'fileNumLimit', function() {
	            var uploader = this,
	                opts = uploader.options,
	                count = 0,
	                max = parseInt( opts.fileNumLimit, 10 ),
	                flag = true;
	    
	            if ( !max ) {
	                return;
	            }
	    
	            uploader.on( 'beforeFileQueued', function( file ) {
	    
	                if ( count >= max && flag ) {
	                    flag = false;
	                    this.trigger( 'error', 'Q_EXCEED_NUM_LIMIT', max, file );
	                    setTimeout(function() {
	                        flag = true;
	                    }, 1 );
	                }
	    
	                return count >= max ? false : true;
	            });
	    
	            uploader.on( 'fileQueued', function() {
	                count++;
	            });
	    
	            uploader.on( 'fileDequeued', function() {
	                count--;
	            });
	    
	            uploader.on( 'reset', function() {
	                count = 0;
	            });
	        });
	    
	    
	        /**
	         * @property {int} [fileSizeLimit=undefined]
	         * @namespace options
	         * @for Uploader
	         * @description 验证文件总大小是否超出限制, 超出则不允许加入队列。
	         */
	        api.addValidator( 'fileSizeLimit', function() {
	            var uploader = this,
	                opts = uploader.options,
	                count = 0,
	                max = parseInt( opts.fileSizeLimit, 10 ),
	                flag = true;
	    
	            if ( !max ) {
	                return;
	            }
	    
	            uploader.on( 'beforeFileQueued', function( file ) {
	                var invalid = count + file.size > max;
	    
	                if ( invalid && flag ) {
	                    flag = false;
	                    this.trigger( 'error', 'Q_EXCEED_SIZE_LIMIT', max, file );
	                    setTimeout(function() {
	                        flag = true;
	                    }, 1 );
	                }
	    
	                return invalid ? false : true;
	            });
	    
	            uploader.on( 'fileQueued', function( file ) {
	                count += file.size;
	            });
	    
	            uploader.on( 'fileDequeued', function( file ) {
	                count -= file.size;
	            });
	    
	            uploader.on( 'reset', function() {
	                count = 0;
	            });
	        });
	    
	        /**
	         * @property {int} [fileSingleSizeLimit=undefined]
	         * @namespace options
	         * @for Uploader
	         * @description 验证单个文件大小是否超出限制, 超出则不允许加入队列。
	         */
	        api.addValidator( 'fileSingleSizeLimit', function() {
	            var uploader = this,
	                opts = uploader.options,
	                max = opts.fileSingleSizeLimit;
	    
	            if ( !max ) {
	                return;
	            }
	    
	            uploader.on( 'beforeFileQueued', function( file ) {
	    
	                if ( file.size > max ) {
	                    file.setStatus( WUFile.Status.INVALID, 'exceed_size' );
	                    this.trigger( 'error', 'F_EXCEED_SIZE', max, file );
	                    return false;
	                }
	    
	            });
	    
	        });
	    
	        /**
	         * @property {Boolean} [duplicate=undefined]
	         * @namespace options
	         * @for Uploader
	         * @description 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
	         */
	        api.addValidator( 'duplicate', function() {
	            var uploader = this,
	                opts = uploader.options,
	                mapping = {};
	    
	            if ( opts.duplicate ) {
	                return;
	            }
	    
	            function hashString( str ) {
	                var hash = 0,
	                    i = 0,
	                    len = str.length,
	                    _char;
	    
	                for ( ; i < len; i++ ) {
	                    _char = str.charCodeAt( i );
	                    hash = _char + (hash << 6) + (hash << 16) - hash;
	                }
	    
	                return hash;
	            }
	    
	            uploader.on( 'beforeFileQueued', function( file ) {
	                var hash = file.__hash || (file.__hash = hashString( file.name +
	                        file.size + file.lastModifiedDate ));
	    
	                // 已经重复了
	                if ( mapping[ hash ] ) {
	                    this.trigger( 'error', 'F_DUPLICATE', file );
	                    return false;
	                }
	            });
	    
	            uploader.on( 'fileQueued', function( file ) {
	                var hash = file.__hash;
	    
	                hash && (mapping[ hash ] = true);
	            });
	    
	            uploader.on( 'fileDequeued', function( file ) {
	                var hash = file.__hash;
	    
	                hash && (delete mapping[ hash ]);
	            });
	    
	            uploader.on( 'reset', function() {
	                mapping = {};
	            });
	        });
	    
	        return api;
	    });
	    
	    /**
	     * @fileOverview Md5
	     */
	    define('lib/md5',[
	        'runtime/client',
	        'mediator'
	    ], function( RuntimeClient, Mediator ) {
	    
	        function Md5() {
	            RuntimeClient.call( this, 'Md5' );
	        }
	    
	        // 让 Md5 具备事件功能。
	        Mediator.installTo( Md5.prototype );
	    
	        Md5.prototype.loadFromBlob = function( blob ) {
	            var me = this;
	    
	            if ( me.getRuid() ) {
	                me.disconnectRuntime();
	            }
	    
	            // 连接到blob归属的同一个runtime.
	            me.connectRuntime( blob.ruid, function() {
	                me.exec('init');
	                me.exec( 'loadFromBlob', blob );
	            });
	        };
	    
	        Md5.prototype.getResult = function() {
	            return this.exec('getResult');
	        };
	    
	        return Md5;
	    });
	    /**
	     * @fileOverview 图片操作, 负责预览图片和上传前压缩图片
	     */
	    define('widgets/md5',[
	        'base',
	        'uploader',
	        'lib/md5',
	        'lib/blob',
	        'widgets/widget'
	    ], function( Base, Uploader, Md5, Blob ) {
	    
	        return Uploader.register({
	            name: 'md5',
	    
	    
	            /**
	             * 计算文件 md5 值，返回一个 promise 对象，可以监听 progress 进度。
	             *
	             *
	             * @method md5File
	             * @grammar md5File( file[, start[, end]] ) => promise
	             * @for Uploader
	             * @example
	             *
	             * uploader.on( 'fileQueued', function( file ) {
	             *     var $li = ...;
	             *
	             *     uploader.md5File( file )
	             *
	             *         // 及时显示进度
	             *         .progress(function(percentage) {
	             *             console.log('Percentage:', percentage);
	             *         })
	             *
	             *         // 完成
	             *         .then(function(val) {
	             *             console.log('md5 result:', val);
	             *         });
	             *
	             * });
	             */
	            md5File: function( file, start, end ) {
	                var md5 = new Md5(),
	                    deferred = Base.Deferred(),
	                    blob = (file instanceof Blob) ? file :
	                        this.request( 'get-file', file ).source;
	    
	                md5.on( 'progress load', function( e ) {
	                    e = e || {};
	                    deferred.notify( e.total ? e.loaded / e.total : 1 );
	                });
	    
	                md5.on( 'complete', function() {
	                    deferred.resolve( md5.getResult() );
	                });
	    
	                md5.on( 'error', function( reason ) {
	                    deferred.reject( reason );
	                });
	    
	                if ( arguments.length > 1 ) {
	                    start = start || 0;
	                    end = end || 0;
	                    start < 0 && (start = blob.size + start);
	                    end < 0 && (end = blob.size + end);
	                    end = Math.min( end, blob.size );
	                    blob = blob.slice( start, end );
	                }
	    
	                md5.loadFromBlob( blob );
	    
	                return deferred.promise();
	            }
	        });
	    });
	    /**
	     * @fileOverview Runtime管理器，负责Runtime的选择, 连接
	     */
	    define('runtime/compbase',[],function() {
	    
	        function CompBase( owner, runtime ) {
	    
	            this.owner = owner;
	            this.options = owner.options;
	    
	            this.getRuntime = function() {
	                return runtime;
	            };
	    
	            this.getRuid = function() {
	                return runtime.uid;
	            };
	    
	            this.trigger = function() {
	                return owner.trigger.apply( owner, arguments );
	            };
	        }
	    
	        return CompBase;
	    });
	    /**
	     * @fileOverview Html5Runtime
	     */
	    define('runtime/html5/runtime',[
	        'base',
	        'runtime/runtime',
	        'runtime/compbase'
	    ], function( Base, Runtime, CompBase ) {
	    
	        var type = 'html5',
	            components = {};
	    
	        function Html5Runtime() {
	            var pool = {},
	                me = this,
	                destroy = this.destroy;
	    
	            Runtime.apply( me, arguments );
	            me.type = type;
	    
	    
	            // 这个方法的调用者，实际上是RuntimeClient
	            me.exec = function( comp, fn/*, args...*/) {
	                var client = this,
	                    uid = client.uid,
	                    args = Base.slice( arguments, 2 ),
	                    instance;
	    
	                if ( components[ comp ] ) {
	                    instance = pool[ uid ] = pool[ uid ] ||
	                            new components[ comp ]( client, me );
	    
	                    if ( instance[ fn ] ) {
	                        return instance[ fn ].apply( instance, args );
	                    }
	                }
	            };
	    
	            me.destroy = function() {
	                // @todo 删除池子中的所有实例
	                return destroy && destroy.apply( this, arguments );
	            };
	        }
	    
	        Base.inherits( Runtime, {
	            constructor: Html5Runtime,
	    
	            // 不需要连接其他程序，直接执行callback
	            init: function() {
	                var me = this;
	                setTimeout(function() {
	                    me.trigger('ready');
	                }, 1 );
	            }
	    
	        });
	    
	        // 注册Components
	        Html5Runtime.register = function( name, component ) {
	            var klass = components[ name ] = Base.inherits( CompBase, component );
	            return klass;
	        };
	    
	        // 注册html5运行时。
	        // 只有在支持的前提下注册。
	        if ( window.Blob && window.FileReader && window.DataView ) {
	            Runtime.addRuntime( type, Html5Runtime );
	        }
	    
	        return Html5Runtime;
	    });
	    /**
	     * @fileOverview Blob Html实现
	     */
	    define('runtime/html5/blob',[
	        'runtime/html5/runtime',
	        'lib/blob'
	    ], function( Html5Runtime, Blob ) {
	    
	        return Html5Runtime.register( 'Blob', {
	            slice: function( start, end ) {
	                var blob = this.owner.source,
	                    slice = blob.slice || blob.webkitSlice || blob.mozSlice;
	    
	                blob = slice.call( blob, start, end );
	    
	                return new Blob( this.getRuid(), blob );
	            }
	        });
	    });
	    /**
	     * @fileOverview FilePaste
	     */
	    define('runtime/html5/dnd',[
	        'base',
	        'runtime/html5/runtime',
	        'lib/file'
	    ], function( Base, Html5Runtime, File ) {
	    
	        var $ = Base.$,
	            prefix = 'webuploader-dnd-';
	    
	        return Html5Runtime.register( 'DragAndDrop', {
	            init: function() {
	                var elem = this.elem = this.options.container;
	    
	                this.dragEnterHandler = Base.bindFn( this._dragEnterHandler, this );
	                this.dragOverHandler = Base.bindFn( this._dragOverHandler, this );
	                this.dragLeaveHandler = Base.bindFn( this._dragLeaveHandler, this );
	                this.dropHandler = Base.bindFn( this._dropHandler, this );
	                this.dndOver = false;
	    
	                elem.on( 'dragenter', this.dragEnterHandler );
	                elem.on( 'dragover', this.dragOverHandler );
	                elem.on( 'dragleave', this.dragLeaveHandler );
	                elem.on( 'drop', this.dropHandler );
	    
	                if ( this.options.disableGlobalDnd ) {
	                    $( document ).on( 'dragover', this.dragOverHandler );
	                    $( document ).on( 'drop', this.dropHandler );
	                }
	            },
	    
	            _dragEnterHandler: function( e ) {
	                var me = this,
	                    denied = me._denied || false,
	                    items;
	    
	                e = e.originalEvent || e;
	    
	                if ( !me.dndOver ) {
	                    me.dndOver = true;
	    
	                    // 注意只有 chrome 支持。
	                    items = e.dataTransfer.items;
	    
	                    if ( items && items.length ) {
	                        me._denied = denied = !me.trigger( 'accept', items );
	                    }
	    
	                    me.elem.addClass( prefix + 'over' );
	                    me.elem[ denied ? 'addClass' :
	                            'removeClass' ]( prefix + 'denied' );
	                }
	    
	                e.dataTransfer.dropEffect = denied ? 'none' : 'copy';
	    
	                return false;
	            },
	    
	            _dragOverHandler: function( e ) {
	                // 只处理框内的。
	                var parentElem = this.elem.parent().get( 0 );
	                if ( parentElem && !$.contains( parentElem, e.currentTarget ) ) {
	                    return false;
	                }
	    
	                clearTimeout( this._leaveTimer );
	                this._dragEnterHandler.call( this, e );
	    
	                return false;
	            },
	    
	            _dragLeaveHandler: function() {
	                var me = this,
	                    handler;
	    
	                handler = function() {
	                    me.dndOver = false;
	                    me.elem.removeClass( prefix + 'over ' + prefix + 'denied' );
	                };
	    
	                clearTimeout( me._leaveTimer );
	                me._leaveTimer = setTimeout( handler, 100 );
	                return false;
	            },
	    
	            _dropHandler: function( e ) {
	                var me = this,
	                    ruid = me.getRuid(),
	                    parentElem = me.elem.parent().get( 0 ),
	                    dataTransfer, data;
	    
	                // 只处理框内的。
	                if ( parentElem && !$.contains( parentElem, e.currentTarget ) ) {
	                    return false;
	                }
	    
	                e = e.originalEvent || e;
	                dataTransfer = e.dataTransfer;
	    
	                // 如果是页面内拖拽，还不能处理，不阻止事件。
	                // 此处 ie11 下会报参数错误，
	                try {
	                    data = dataTransfer.getData('text/html');
	                } catch( err ) {
	                }
	    
	                if ( data ) {
	                    return;
	                }
	    
	                me._getTansferFiles( dataTransfer, function( results ) {
	                    me.trigger( 'drop', $.map( results, function( file ) {
	                        return new File( ruid, file );
	                    }) );
	                });
	    
	                me.dndOver = false;
	                me.elem.removeClass( prefix + 'over' );
	                return false;
	            },
	    
	            // 如果传入 callback 则去查看文件夹，否则只管当前文件夹。
	            _getTansferFiles: function( dataTransfer, callback ) {
	                var results  = [],
	                    promises = [],
	                    items, files, file, item, i, len, canAccessFolder;
	    
	                items = dataTransfer.items;
	                files = dataTransfer.files;
	    
	                canAccessFolder = !!(items && items[ 0 ].webkitGetAsEntry);
	    
	                for ( i = 0, len = files.length; i < len; i++ ) {
	                    file = files[ i ];
	                    item = items && items[ i ];
	    
	                    if ( canAccessFolder && item.webkitGetAsEntry().isDirectory ) {
	    
	                        promises.push( this._traverseDirectoryTree(
	                                item.webkitGetAsEntry(), results ) );
	                    } else {
	                        results.push( file );
	                    }
	                }
	    
	                Base.when.apply( Base, promises ).done(function() {
	    
	                    if ( !results.length ) {
	                        return;
	                    }
	    
	                    callback( results );
	                });
	            },
	    
	            _traverseDirectoryTree: function( entry, results ) {
	                var deferred = Base.Deferred(),
	                    me = this;
	    
	                if ( entry.isFile ) {
	                    entry.file(function( file ) {
	                        results.push( file );
	                        deferred.resolve();
	                    });
	                } else if ( entry.isDirectory ) {
	                    entry.createReader().readEntries(function( entries ) {
	                        var len = entries.length,
	                            promises = [],
	                            arr = [],    // 为了保证顺序。
	                            i;
	    
	                        for ( i = 0; i < len; i++ ) {
	                            promises.push( me._traverseDirectoryTree(
	                                    entries[ i ], arr ) );
	                        }
	    
	                        Base.when.apply( Base, promises ).then(function() {
	                            results.push.apply( results, arr );
	                            deferred.resolve();
	                        }, deferred.reject );
	                    });
	                }
	    
	                return deferred.promise();
	            },
	    
	            destroy: function() {
	                var elem = this.elem;
	    
	                // 还没 init 就调用 destroy
	                if (!elem) {
	                    return;
	                }
	                
	                elem.off( 'dragenter', this.dragEnterHandler );
	                elem.off( 'dragover', this.dragOverHandler );
	                elem.off( 'dragleave', this.dragLeaveHandler );
	                elem.off( 'drop', this.dropHandler );
	    
	                if ( this.options.disableGlobalDnd ) {
	                    $( document ).off( 'dragover', this.dragOverHandler );
	                    $( document ).off( 'drop', this.dropHandler );
	                }
	            }
	        });
	    });
	    
	    /**
	     * @fileOverview FilePaste
	     */
	    define('runtime/html5/filepaste',[
	        'base',
	        'runtime/html5/runtime',
	        'lib/file'
	    ], function( Base, Html5Runtime, File ) {
	    
	        return Html5Runtime.register( 'FilePaste', {
	            init: function() {
	                var opts = this.options,
	                    elem = this.elem = opts.container,
	                    accept = '.*',
	                    arr, i, len, item;
	    
	                // accetp的mimeTypes中生成匹配正则。
	                if ( opts.accept ) {
	                    arr = [];
	    
	                    for ( i = 0, len = opts.accept.length; i < len; i++ ) {
	                        item = opts.accept[ i ].mimeTypes;
	                        item && arr.push( item );
	                    }
	    
	                    if ( arr.length ) {
	                        accept = arr.join(',');
	                        accept = accept.replace( /,/g, '|' ).replace( /\*/g, '.*' );
	                    }
	                }
	                this.accept = accept = new RegExp( accept, 'i' );
	                this.hander = Base.bindFn( this._pasteHander, this );
	                elem.on( 'paste', this.hander );
	            },
	    
	            _pasteHander: function( e ) {
	                var allowed = [],
	                    ruid = this.getRuid(),
	                    items, item, blob, i, len;
	    
	                e = e.originalEvent || e;
	                items = e.clipboardData.items;
	    
	                for ( i = 0, len = items.length; i < len; i++ ) {
	                    item = items[ i ];
	    
	                    if ( item.kind !== 'file' || !(blob = item.getAsFile()) ) {
	                        continue;
	                    }
	    
	                    allowed.push( new File( ruid, blob ) );
	                }
	    
	                if ( allowed.length ) {
	                    // 不阻止非文件粘贴（文字粘贴）的事件冒泡
	                    e.preventDefault();
	                    e.stopPropagation();
	                    this.trigger( 'paste', allowed );
	                }
	            },
	    
	            destroy: function() {
	                this.elem.off( 'paste', this.hander );
	            }
	        });
	    });
	    
	    /**
	     * @fileOverview FilePicker
	     */
	    define('runtime/html5/filepicker',[
	        'base',
	        'runtime/html5/runtime'
	    ], function( Base, Html5Runtime ) {
	    
	        var $ = Base.$;
	    
	        return Html5Runtime.register( 'FilePicker', {
	            init: function() {
	                var container = this.getRuntime().getContainer(),
	                    me = this,
	                    owner = me.owner,
	                    opts = me.options,
	                    label = this.label = $( document.createElement('label') ),
	                    input =  this.input = $( document.createElement('input') ),
	                    arr, i, len, mouseHandler;
	    
	                input.attr( 'type', 'file' );
	                //console.log(opts.name)
	                input.attr( 'name', 'file' );
	                input.addClass('webuploader-element-invisible');
	    
	                label.on( 'click', function() {
	                    input.trigger('click');
	                });
	    
	                label.css({
	                    opacity: 0,
	                    width: '100%',
	                    height: '100%',
	                    display: 'block',
	                    cursor: 'pointer',
	                    background: '#ffffff'
	                });
	    
	                if ( opts.multiple ) {
	                    input.attr( 'multiple', 'multiple' );
	                }
	    
	                // @todo Firefox不支持单独指定后缀
	                if ( opts.accept && opts.accept.length > 0 ) {
	                    arr = [];
	    
	                    for ( i = 0, len = opts.accept.length; i < len; i++ ) {
	                        arr.push( opts.accept[ i ].mimeTypes );
	                    }
	    
	                    input.attr( 'accept', arr.join(',') );
	                }
	    
	                container.append( input );
	                container.append( label );
	    
	                mouseHandler = function( e ) {
	                    owner.trigger( e.type );
	                };
	    
	                input.on( 'change', function( e ) {
	                    var fn = arguments.callee,
	                        clone;
	    
	                    me.files = e.target.files;
	    
	                    // reset input
	                    clone = this.cloneNode( true );
	                    clone.value = null;
	                    this.parentNode.replaceChild( clone, this );
	    
	                    input.off();
	                    input = $( clone ).on( 'change', fn )
	                            .on( 'mouseenter mouseleave', mouseHandler );
	    
	                    owner.trigger('change');
	                });
	    
	                label.on( 'mouseenter mouseleave', mouseHandler );
	    
	            },
	    
	    
	            getFiles: function() {
	                return this.files;
	            },
	    
	            destroy: function() {
	                this.input.off();
	                this.label.off();
	            }
	        });
	    });
	    /**
	     * Terms:
	     *
	     * Uint8Array, FileReader, BlobBuilder, atob, ArrayBuffer
	     * @fileOverview Image控件
	     */
	    define('runtime/html5/util',[
	        'base'
	    ], function( Base ) {
	    
	        var urlAPI = window.createObjectURL && window ||
	                window.URL && URL.revokeObjectURL && URL ||
	                window.webkitURL,
	            createObjectURL = Base.noop,
	            revokeObjectURL = createObjectURL;
	    
	        if ( urlAPI ) {
	    
	            // 更安全的方式调用，比如android里面就能把context改成其他的对象。
	            createObjectURL = function() {
	                return urlAPI.createObjectURL.apply( urlAPI, arguments );
	            };
	    
	            revokeObjectURL = function() {
	                return urlAPI.revokeObjectURL.apply( urlAPI, arguments );
	            };
	        }
	    
	        return {
	            createObjectURL: createObjectURL,
	            revokeObjectURL: revokeObjectURL,
	    
	            dataURL2Blob: function( dataURI ) {
	                var byteStr, intArray, ab, i, mimetype, parts;
	    
	                parts = dataURI.split(',');
	    
	                if ( ~parts[ 0 ].indexOf('base64') ) {
	                    byteStr = atob( parts[ 1 ] );
	                } else {
	                    byteStr = decodeURIComponent( parts[ 1 ] );
	                }
	    
	                ab = new ArrayBuffer( byteStr.length );
	                intArray = new Uint8Array( ab );
	    
	                for ( i = 0; i < byteStr.length; i++ ) {
	                    intArray[ i ] = byteStr.charCodeAt( i );
	                }
	    
	                mimetype = parts[ 0 ].split(':')[ 1 ].split(';')[ 0 ];
	    
	                return this.arrayBufferToBlob( ab, mimetype );
	            },
	    
	            dataURL2ArrayBuffer: function( dataURI ) {
	                var byteStr, intArray, i, parts;
	    
	                parts = dataURI.split(',');
	    
	                if ( ~parts[ 0 ].indexOf('base64') ) {
	                    byteStr = atob( parts[ 1 ] );
	                } else {
	                    byteStr = decodeURIComponent( parts[ 1 ] );
	                }
	    
	                intArray = new Uint8Array( byteStr.length );
	    
	                for ( i = 0; i < byteStr.length; i++ ) {
	                    intArray[ i ] = byteStr.charCodeAt( i );
	                }
	    
	                return intArray.buffer;
	            },
	    
	            arrayBufferToBlob: function( buffer, type ) {
	                var builder = window.BlobBuilder || window.WebKitBlobBuilder,
	                    bb;
	    
	                // android不支持直接new Blob, 只能借助blobbuilder.
	                if ( builder ) {
	                    bb = new builder();
	                    bb.append( buffer );
	                    return bb.getBlob( type );
	                }
	    
	                return new Blob([ buffer ], type ? { type: type } : {} );
	            },
	    
	            // 抽出来主要是为了解决android下面canvas.toDataUrl不支持jpeg.
	            // 你得到的结果是png.
	            canvasToDataUrl: function( canvas, type, quality ) {
	                return canvas.toDataURL( type, quality / 100 );
	            },
	    
	            // imagemeat会复写这个方法，如果用户选择加载那个文件了的话。
	            parseMeta: function( blob, callback ) {
	                callback( false, {});
	            },
	    
	            // imagemeat会复写这个方法，如果用户选择加载那个文件了的话。
	            updateImageHead: function( data ) {
	                return data;
	            }
	        };
	    });
	    /**
	     * Terms:
	     *
	     * Uint8Array, FileReader, BlobBuilder, atob, ArrayBuffer
	     * @fileOverview Image控件
	     */
	    define('runtime/html5/imagemeta',[
	        'runtime/html5/util'
	    ], function( Util ) {
	    
	        var api;
	    
	        api = {
	            parsers: {
	                0xffe1: []
	            },
	    
	            maxMetaDataSize: 262144,
	    
	            parse: function( blob, cb ) {
	                var me = this,
	                    fr = new FileReader();
	    
	                fr.onload = function() {
	                    cb( false, me._parse( this.result ) );
	                    fr = fr.onload = fr.onerror = null;
	                };
	    
	                fr.onerror = function( e ) {
	                    cb( e.message );
	                    fr = fr.onload = fr.onerror = null;
	                };
	    
	                blob = blob.slice( 0, me.maxMetaDataSize );
	                fr.readAsArrayBuffer( blob.getSource() );
	            },
	    
	            _parse: function( buffer, noParse ) {
	                if ( buffer.byteLength < 6 ) {
	                    return;
	                }
	    
	                var dataview = new DataView( buffer ),
	                    offset = 2,
	                    maxOffset = dataview.byteLength - 4,
	                    headLength = offset,
	                    ret = {},
	                    markerBytes, markerLength, parsers, i;
	    
	                if ( dataview.getUint16( 0 ) === 0xffd8 ) {
	    
	                    while ( offset < maxOffset ) {
	                        markerBytes = dataview.getUint16( offset );
	    
	                        if ( markerBytes >= 0xffe0 && markerBytes <= 0xffef ||
	                                markerBytes === 0xfffe ) {
	    
	                            markerLength = dataview.getUint16( offset + 2 ) + 2;
	    
	                            if ( offset + markerLength > dataview.byteLength ) {
	                                break;
	                            }
	    
	                            parsers = api.parsers[ markerBytes ];
	    
	                            if ( !noParse && parsers ) {
	                                for ( i = 0; i < parsers.length; i += 1 ) {
	                                    parsers[ i ].call( api, dataview, offset,
	                                            markerLength, ret );
	                                }
	                            }
	    
	                            offset += markerLength;
	                            headLength = offset;
	                        } else {
	                            break;
	                        }
	                    }
	    
	                    if ( headLength > 6 ) {
	                        if ( buffer.slice ) {
	                            ret.imageHead = buffer.slice( 2, headLength );
	                        } else {
	                            // Workaround for IE10, which does not yet
	                            // support ArrayBuffer.slice:
	                            ret.imageHead = new Uint8Array( buffer )
	                                    .subarray( 2, headLength );
	                        }
	                    }
	                }
	    
	                return ret;
	            },
	    
	            updateImageHead: function( buffer, head ) {
	                var data = this._parse( buffer, true ),
	                    buf1, buf2, bodyoffset;
	    
	    
	                bodyoffset = 2;
	                if ( data.imageHead ) {
	                    bodyoffset = 2 + data.imageHead.byteLength;
	                }
	    
	                if ( buffer.slice ) {
	                    buf2 = buffer.slice( bodyoffset );
	                } else {
	                    buf2 = new Uint8Array( buffer ).subarray( bodyoffset );
	                }
	    
	                buf1 = new Uint8Array( head.byteLength + 2 + buf2.byteLength );
	    
	                buf1[ 0 ] = 0xFF;
	                buf1[ 1 ] = 0xD8;
	                buf1.set( new Uint8Array( head ), 2 );
	                buf1.set( new Uint8Array( buf2 ), head.byteLength + 2 );
	    
	                return buf1.buffer;
	            }
	        };
	    
	        Util.parseMeta = function() {
	            return api.parse.apply( api, arguments );
	        };
	    
	        Util.updateImageHead = function() {
	            return api.updateImageHead.apply( api, arguments );
	        };
	    
	        return api;
	    });
	    /**
	     * 代码来自于：https://github.com/blueimp/JavaScript-Load-Image
	     * 暂时项目中只用了orientation.
	     *
	     * 去除了 Exif Sub IFD Pointer, GPS Info IFD Pointer, Exif Thumbnail.
	     * @fileOverview EXIF解析
	     */
	    
	    // Sample
	    // ====================================
	    // Make : Apple
	    // Model : iPhone 4S
	    // Orientation : 1
	    // XResolution : 72 [72/1]
	    // YResolution : 72 [72/1]
	    // ResolutionUnit : 2
	    // Software : QuickTime 7.7.1
	    // DateTime : 2013:09:01 22:53:55
	    // ExifIFDPointer : 190
	    // ExposureTime : 0.058823529411764705 [1/17]
	    // FNumber : 2.4 [12/5]
	    // ExposureProgram : Normal program
	    // ISOSpeedRatings : 800
	    // ExifVersion : 0220
	    // DateTimeOriginal : 2013:09:01 22:52:51
	    // DateTimeDigitized : 2013:09:01 22:52:51
	    // ComponentsConfiguration : YCbCr
	    // ShutterSpeedValue : 4.058893515764426
	    // ApertureValue : 2.5260688216892597 [4845/1918]
	    // BrightnessValue : -0.3126686601998395
	    // MeteringMode : Pattern
	    // Flash : Flash did not fire, compulsory flash mode
	    // FocalLength : 4.28 [107/25]
	    // SubjectArea : [4 values]
	    // FlashpixVersion : 0100
	    // ColorSpace : 1
	    // PixelXDimension : 2448
	    // PixelYDimension : 3264
	    // SensingMethod : One-chip color area sensor
	    // ExposureMode : 0
	    // WhiteBalance : Auto white balance
	    // FocalLengthIn35mmFilm : 35
	    // SceneCaptureType : Standard
	    define('runtime/html5/imagemeta/exif',[
	        'base',
	        'runtime/html5/imagemeta'
	    ], function( Base, ImageMeta ) {
	    
	        var EXIF = {};
	    
	        EXIF.ExifMap = function() {
	            return this;
	        };
	    
	        EXIF.ExifMap.prototype.map = {
	            'Orientation': 0x0112
	        };
	    
	        EXIF.ExifMap.prototype.get = function( id ) {
	            return this[ id ] || this[ this.map[ id ] ];
	        };
	    
	        EXIF.exifTagTypes = {
	            // byte, 8-bit unsigned int:
	            1: {
	                getValue: function( dataView, dataOffset ) {
	                    return dataView.getUint8( dataOffset );
	                },
	                size: 1
	            },
	    
	            // ascii, 8-bit byte:
	            2: {
	                getValue: function( dataView, dataOffset ) {
	                    return String.fromCharCode( dataView.getUint8( dataOffset ) );
	                },
	                size: 1,
	                ascii: true
	            },
	    
	            // short, 16 bit int:
	            3: {
	                getValue: function( dataView, dataOffset, littleEndian ) {
	                    return dataView.getUint16( dataOffset, littleEndian );
	                },
	                size: 2
	            },
	    
	            // long, 32 bit int:
	            4: {
	                getValue: function( dataView, dataOffset, littleEndian ) {
	                    return dataView.getUint32( dataOffset, littleEndian );
	                },
	                size: 4
	            },
	    
	            // rational = two long values,
	            // first is numerator, second is denominator:
	            5: {
	                getValue: function( dataView, dataOffset, littleEndian ) {
	                    return dataView.getUint32( dataOffset, littleEndian ) /
	                        dataView.getUint32( dataOffset + 4, littleEndian );
	                },
	                size: 8
	            },
	    
	            // slong, 32 bit signed int:
	            9: {
	                getValue: function( dataView, dataOffset, littleEndian ) {
	                    return dataView.getInt32( dataOffset, littleEndian );
	                },
	                size: 4
	            },
	    
	            // srational, two slongs, first is numerator, second is denominator:
	            10: {
	                getValue: function( dataView, dataOffset, littleEndian ) {
	                    return dataView.getInt32( dataOffset, littleEndian ) /
	                        dataView.getInt32( dataOffset + 4, littleEndian );
	                },
	                size: 8
	            }
	        };
	    
	        // undefined, 8-bit byte, value depending on field:
	        EXIF.exifTagTypes[ 7 ] = EXIF.exifTagTypes[ 1 ];
	    
	        EXIF.getExifValue = function( dataView, tiffOffset, offset, type, length,
	                littleEndian ) {
	    
	            var tagType = EXIF.exifTagTypes[ type ],
	                tagSize, dataOffset, values, i, str, c;
	    
	            if ( !tagType ) {
	                Base.log('Invalid Exif data: Invalid tag type.');
	                return;
	            }
	    
	            tagSize = tagType.size * length;
	    
	            // Determine if the value is contained in the dataOffset bytes,
	            // or if the value at the dataOffset is a pointer to the actual data:
	            dataOffset = tagSize > 4 ? tiffOffset + dataView.getUint32( offset + 8,
	                    littleEndian ) : (offset + 8);
	    
	            if ( dataOffset + tagSize > dataView.byteLength ) {
	                Base.log('Invalid Exif data: Invalid data offset.');
	                return;
	            }
	    
	            if ( length === 1 ) {
	                return tagType.getValue( dataView, dataOffset, littleEndian );
	            }
	    
	            values = [];
	    
	            for ( i = 0; i < length; i += 1 ) {
	                values[ i ] = tagType.getValue( dataView,
	                        dataOffset + i * tagType.size, littleEndian );
	            }
	    
	            if ( tagType.ascii ) {
	                str = '';
	    
	                // Concatenate the chars:
	                for ( i = 0; i < values.length; i += 1 ) {
	                    c = values[ i ];
	    
	                    // Ignore the terminating NULL byte(s):
	                    if ( c === '\u0000' ) {
	                        break;
	                    }
	                    str += c;
	                }
	    
	                return str;
	            }
	            return values;
	        };
	    
	        EXIF.parseExifTag = function( dataView, tiffOffset, offset, littleEndian,
	                data ) {
	    
	            var tag = dataView.getUint16( offset, littleEndian );
	            data.exif[ tag ] = EXIF.getExifValue( dataView, tiffOffset, offset,
	                    dataView.getUint16( offset + 2, littleEndian ),    // tag type
	                    dataView.getUint32( offset + 4, littleEndian ),    // tag length
	                    littleEndian );
	        };
	    
	        EXIF.parseExifTags = function( dataView, tiffOffset, dirOffset,
	                littleEndian, data ) {
	    
	            var tagsNumber, dirEndOffset, i;
	    
	            if ( dirOffset + 6 > dataView.byteLength ) {
	                Base.log('Invalid Exif data: Invalid directory offset.');
	                return;
	            }
	    
	            tagsNumber = dataView.getUint16( dirOffset, littleEndian );
	            dirEndOffset = dirOffset + 2 + 12 * tagsNumber;
	    
	            if ( dirEndOffset + 4 > dataView.byteLength ) {
	                Base.log('Invalid Exif data: Invalid directory size.');
	                return;
	            }
	    
	            for ( i = 0; i < tagsNumber; i += 1 ) {
	                this.parseExifTag( dataView, tiffOffset,
	                        dirOffset + 2 + 12 * i,    // tag offset
	                        littleEndian, data );
	            }
	    
	            // Return the offset to the next directory:
	            return dataView.getUint32( dirEndOffset, littleEndian );
	        };
	    
	        // EXIF.getExifThumbnail = function(dataView, offset, length) {
	        //     var hexData,
	        //         i,
	        //         b;
	        //     if (!length || offset + length > dataView.byteLength) {
	        //         Base.log('Invalid Exif data: Invalid thumbnail data.');
	        //         return;
	        //     }
	        //     hexData = [];
	        //     for (i = 0; i < length; i += 1) {
	        //         b = dataView.getUint8(offset + i);
	        //         hexData.push((b < 16 ? '0' : '') + b.toString(16));
	        //     }
	        //     return 'data:image/jpeg,%' + hexData.join('%');
	        // };
	    
	        EXIF.parseExifData = function( dataView, offset, length, data ) {
	    
	            var tiffOffset = offset + 10,
	                littleEndian, dirOffset;
	    
	            // Check for the ASCII code for "Exif" (0x45786966):
	            if ( dataView.getUint32( offset + 4 ) !== 0x45786966 ) {
	                // No Exif data, might be XMP data instead
	                return;
	            }
	            if ( tiffOffset + 8 > dataView.byteLength ) {
	                Base.log('Invalid Exif data: Invalid segment size.');
	                return;
	            }
	    
	            // Check for the two null bytes:
	            if ( dataView.getUint16( offset + 8 ) !== 0x0000 ) {
	                Base.log('Invalid Exif data: Missing byte alignment offset.');
	                return;
	            }
	    
	            // Check the byte alignment:
	            switch ( dataView.getUint16( tiffOffset ) ) {
	                case 0x4949:
	                    littleEndian = true;
	                    break;
	    
	                case 0x4D4D:
	                    littleEndian = false;
	                    break;
	    
	                default:
	                    Base.log('Invalid Exif data: Invalid byte alignment marker.');
	                    return;
	            }
	    
	            // Check for the TIFF tag marker (0x002A):
	            if ( dataView.getUint16( tiffOffset + 2, littleEndian ) !== 0x002A ) {
	                Base.log('Invalid Exif data: Missing TIFF marker.');
	                return;
	            }
	    
	            // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:
	            dirOffset = dataView.getUint32( tiffOffset + 4, littleEndian );
	            // Create the exif object to store the tags:
	            data.exif = new EXIF.ExifMap();
	            // Parse the tags of the main image directory and retrieve the
	            // offset to the next directory, usually the thumbnail directory:
	            dirOffset = EXIF.parseExifTags( dataView, tiffOffset,
	                    tiffOffset + dirOffset, littleEndian, data );
	    
	            // 尝试读取缩略图
	            // if ( dirOffset ) {
	            //     thumbnailData = {exif: {}};
	            //     dirOffset = EXIF.parseExifTags(
	            //         dataView,
	            //         tiffOffset,
	            //         tiffOffset + dirOffset,
	            //         littleEndian,
	            //         thumbnailData
	            //     );
	    
	            //     // Check for JPEG Thumbnail offset:
	            //     if (thumbnailData.exif[0x0201]) {
	            //         data.exif.Thumbnail = EXIF.getExifThumbnail(
	            //             dataView,
	            //             tiffOffset + thumbnailData.exif[0x0201],
	            //             thumbnailData.exif[0x0202] // Thumbnail data length
	            //         );
	            //     }
	            // }
	        };
	    
	        ImageMeta.parsers[ 0xffe1 ].push( EXIF.parseExifData );
	        return EXIF;
	    });
	    /**
	     * 这个方式性能不行，但是可以解决android里面的toDataUrl的bug
	     * android里面toDataUrl('image/jpege')得到的结果却是png.
	     *
	     * 所以这里没辙，只能借助这个工具
	     * @fileOverview jpeg encoder
	     */
	    define('runtime/html5/jpegencoder',[], function( require, exports, module ) {
	    
	        /*
	          Copyright (c) 2008, Adobe Systems Incorporated
	          All rights reserved.
	    
	          Redistribution and use in source and binary forms, with or without
	          modification, are permitted provided that the following conditions are
	          met:
	    
	          * Redistributions of source code must retain the above copyright notice,
	            this list of conditions and the following disclaimer.
	    
	          * Redistributions in binary form must reproduce the above copyright
	            notice, this list of conditions and the following disclaimer in the
	            documentation and/or other materials provided with the distribution.
	    
	          * Neither the name of Adobe Systems Incorporated nor the names of its
	            contributors may be used to endorse or promote products derived from
	            this software without specific prior written permission.
	    
	          THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
	          IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
	          THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
	          PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
	          CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	          EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
	          PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
	          PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	          LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	          NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	          SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	        */
	        /*
	        JPEG encoder ported to JavaScript and optimized by Andreas Ritter, www.bytestrom.eu, 11/2009
	    
	        Basic GUI blocking jpeg encoder
	        */
	    
	        function JPEGEncoder(quality) {
	          var self = this;
	            var fround = Math.round;
	            var ffloor = Math.floor;
	            var YTable = new Array(64);
	            var UVTable = new Array(64);
	            var fdtbl_Y = new Array(64);
	            var fdtbl_UV = new Array(64);
	            var YDC_HT;
	            var UVDC_HT;
	            var YAC_HT;
	            var UVAC_HT;
	    
	            var bitcode = new Array(65535);
	            var category = new Array(65535);
	            var outputfDCTQuant = new Array(64);
	            var DU = new Array(64);
	            var byteout = [];
	            var bytenew = 0;
	            var bytepos = 7;
	    
	            var YDU = new Array(64);
	            var UDU = new Array(64);
	            var VDU = new Array(64);
	            var clt = new Array(256);
	            var RGB_YUV_TABLE = new Array(2048);
	            var currentQuality;
	    
	            var ZigZag = [
	                     0, 1, 5, 6,14,15,27,28,
	                     2, 4, 7,13,16,26,29,42,
	                     3, 8,12,17,25,30,41,43,
	                     9,11,18,24,31,40,44,53,
	                    10,19,23,32,39,45,52,54,
	                    20,22,33,38,46,51,55,60,
	                    21,34,37,47,50,56,59,61,
	                    35,36,48,49,57,58,62,63
	                ];
	    
	            var std_dc_luminance_nrcodes = [0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0];
	            var std_dc_luminance_values = [0,1,2,3,4,5,6,7,8,9,10,11];
	            var std_ac_luminance_nrcodes = [0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,0x7d];
	            var std_ac_luminance_values = [
	                    0x01,0x02,0x03,0x00,0x04,0x11,0x05,0x12,
	                    0x21,0x31,0x41,0x06,0x13,0x51,0x61,0x07,
	                    0x22,0x71,0x14,0x32,0x81,0x91,0xa1,0x08,
	                    0x23,0x42,0xb1,0xc1,0x15,0x52,0xd1,0xf0,
	                    0x24,0x33,0x62,0x72,0x82,0x09,0x0a,0x16,
	                    0x17,0x18,0x19,0x1a,0x25,0x26,0x27,0x28,
	                    0x29,0x2a,0x34,0x35,0x36,0x37,0x38,0x39,
	                    0x3a,0x43,0x44,0x45,0x46,0x47,0x48,0x49,
	                    0x4a,0x53,0x54,0x55,0x56,0x57,0x58,0x59,
	                    0x5a,0x63,0x64,0x65,0x66,0x67,0x68,0x69,
	                    0x6a,0x73,0x74,0x75,0x76,0x77,0x78,0x79,
	                    0x7a,0x83,0x84,0x85,0x86,0x87,0x88,0x89,
	                    0x8a,0x92,0x93,0x94,0x95,0x96,0x97,0x98,
	                    0x99,0x9a,0xa2,0xa3,0xa4,0xa5,0xa6,0xa7,
	                    0xa8,0xa9,0xaa,0xb2,0xb3,0xb4,0xb5,0xb6,
	                    0xb7,0xb8,0xb9,0xba,0xc2,0xc3,0xc4,0xc5,
	                    0xc6,0xc7,0xc8,0xc9,0xca,0xd2,0xd3,0xd4,
	                    0xd5,0xd6,0xd7,0xd8,0xd9,0xda,0xe1,0xe2,
	                    0xe3,0xe4,0xe5,0xe6,0xe7,0xe8,0xe9,0xea,
	                    0xf1,0xf2,0xf3,0xf4,0xf5,0xf6,0xf7,0xf8,
	                    0xf9,0xfa
	                ];
	    
	            var std_dc_chrominance_nrcodes = [0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0];
	            var std_dc_chrominance_values = [0,1,2,3,4,5,6,7,8,9,10,11];
	            var std_ac_chrominance_nrcodes = [0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,0x77];
	            var std_ac_chrominance_values = [
	                    0x00,0x01,0x02,0x03,0x11,0x04,0x05,0x21,
	                    0x31,0x06,0x12,0x41,0x51,0x07,0x61,0x71,
	                    0x13,0x22,0x32,0x81,0x08,0x14,0x42,0x91,
	                    0xa1,0xb1,0xc1,0x09,0x23,0x33,0x52,0xf0,
	                    0x15,0x62,0x72,0xd1,0x0a,0x16,0x24,0x34,
	                    0xe1,0x25,0xf1,0x17,0x18,0x19,0x1a,0x26,
	                    0x27,0x28,0x29,0x2a,0x35,0x36,0x37,0x38,
	                    0x39,0x3a,0x43,0x44,0x45,0x46,0x47,0x48,
	                    0x49,0x4a,0x53,0x54,0x55,0x56,0x57,0x58,
	                    0x59,0x5a,0x63,0x64,0x65,0x66,0x67,0x68,
	                    0x69,0x6a,0x73,0x74,0x75,0x76,0x77,0x78,
	                    0x79,0x7a,0x82,0x83,0x84,0x85,0x86,0x87,
	                    0x88,0x89,0x8a,0x92,0x93,0x94,0x95,0x96,
	                    0x97,0x98,0x99,0x9a,0xa2,0xa3,0xa4,0xa5,
	                    0xa6,0xa7,0xa8,0xa9,0xaa,0xb2,0xb3,0xb4,
	                    0xb5,0xb6,0xb7,0xb8,0xb9,0xba,0xc2,0xc3,
	                    0xc4,0xc5,0xc6,0xc7,0xc8,0xc9,0xca,0xd2,
	                    0xd3,0xd4,0xd5,0xd6,0xd7,0xd8,0xd9,0xda,
	                    0xe2,0xe3,0xe4,0xe5,0xe6,0xe7,0xe8,0xe9,
	                    0xea,0xf2,0xf3,0xf4,0xf5,0xf6,0xf7,0xf8,
	                    0xf9,0xfa
	                ];
	    
	            function initQuantTables(sf){
	                    var YQT = [
	                        16, 11, 10, 16, 24, 40, 51, 61,
	                        12, 12, 14, 19, 26, 58, 60, 55,
	                        14, 13, 16, 24, 40, 57, 69, 56,
	                        14, 17, 22, 29, 51, 87, 80, 62,
	                        18, 22, 37, 56, 68,109,103, 77,
	                        24, 35, 55, 64, 81,104,113, 92,
	                        49, 64, 78, 87,103,121,120,101,
	                        72, 92, 95, 98,112,100,103, 99
	                    ];
	    
	                    for (var i = 0; i < 64; i++) {
	                        var t = ffloor((YQT[i]*sf+50)/100);
	                        if (t < 1) {
	                            t = 1;
	                        } else if (t > 255) {
	                            t = 255;
	                        }
	                        YTable[ZigZag[i]] = t;
	                    }
	                    var UVQT = [
	                        17, 18, 24, 47, 99, 99, 99, 99,
	                        18, 21, 26, 66, 99, 99, 99, 99,
	                        24, 26, 56, 99, 99, 99, 99, 99,
	                        47, 66, 99, 99, 99, 99, 99, 99,
	                        99, 99, 99, 99, 99, 99, 99, 99,
	                        99, 99, 99, 99, 99, 99, 99, 99,
	                        99, 99, 99, 99, 99, 99, 99, 99,
	                        99, 99, 99, 99, 99, 99, 99, 99
	                    ];
	                    for (var j = 0; j < 64; j++) {
	                        var u = ffloor((UVQT[j]*sf+50)/100);
	                        if (u < 1) {
	                            u = 1;
	                        } else if (u > 255) {
	                            u = 255;
	                        }
	                        UVTable[ZigZag[j]] = u;
	                    }
	                    var aasf = [
	                        1.0, 1.387039845, 1.306562965, 1.175875602,
	                        1.0, 0.785694958, 0.541196100, 0.275899379
	                    ];
	                    var k = 0;
	                    for (var row = 0; row < 8; row++)
	                    {
	                        for (var col = 0; col < 8; col++)
	                        {
	                            fdtbl_Y[k]  = (1.0 / (YTable [ZigZag[k]] * aasf[row] * aasf[col] * 8.0));
	                            fdtbl_UV[k] = (1.0 / (UVTable[ZigZag[k]] * aasf[row] * aasf[col] * 8.0));
	                            k++;
	                        }
	                    }
	                }
	    
	                function computeHuffmanTbl(nrcodes, std_table){
	                    var codevalue = 0;
	                    var pos_in_table = 0;
	                    var HT = new Array();
	                    for (var k = 1; k <= 16; k++) {
	                        for (var j = 1; j <= nrcodes[k]; j++) {
	                            HT[std_table[pos_in_table]] = [];
	                            HT[std_table[pos_in_table]][0] = codevalue;
	                            HT[std_table[pos_in_table]][1] = k;
	                            pos_in_table++;
	                            codevalue++;
	                        }
	                        codevalue*=2;
	                    }
	                    return HT;
	                }
	    
	                function initHuffmanTbl()
	                {
	                    YDC_HT = computeHuffmanTbl(std_dc_luminance_nrcodes,std_dc_luminance_values);
	                    UVDC_HT = computeHuffmanTbl(std_dc_chrominance_nrcodes,std_dc_chrominance_values);
	                    YAC_HT = computeHuffmanTbl(std_ac_luminance_nrcodes,std_ac_luminance_values);
	                    UVAC_HT = computeHuffmanTbl(std_ac_chrominance_nrcodes,std_ac_chrominance_values);
	                }
	    
	                function initCategoryNumber()
	                {
	                    var nrlower = 1;
	                    var nrupper = 2;
	                    for (var cat = 1; cat <= 15; cat++) {
	                        //Positive numbers
	                        for (var nr = nrlower; nr<nrupper; nr++) {
	                            category[32767+nr] = cat;
	                            bitcode[32767+nr] = [];
	                            bitcode[32767+nr][1] = cat;
	                            bitcode[32767+nr][0] = nr;
	                        }
	                        //Negative numbers
	                        for (var nrneg =-(nrupper-1); nrneg<=-nrlower; nrneg++) {
	                            category[32767+nrneg] = cat;
	                            bitcode[32767+nrneg] = [];
	                            bitcode[32767+nrneg][1] = cat;
	                            bitcode[32767+nrneg][0] = nrupper-1+nrneg;
	                        }
	                        nrlower <<= 1;
	                        nrupper <<= 1;
	                    }
	                }
	    
	                function initRGBYUVTable() {
	                    for(var i = 0; i < 256;i++) {
	                        RGB_YUV_TABLE[i]            =  19595 * i;
	                        RGB_YUV_TABLE[(i+ 256)>>0]  =  38470 * i;
	                        RGB_YUV_TABLE[(i+ 512)>>0]  =   7471 * i + 0x8000;
	                        RGB_YUV_TABLE[(i+ 768)>>0]  = -11059 * i;
	                        RGB_YUV_TABLE[(i+1024)>>0]  = -21709 * i;
	                        RGB_YUV_TABLE[(i+1280)>>0]  =  32768 * i + 0x807FFF;
	                        RGB_YUV_TABLE[(i+1536)>>0]  = -27439 * i;
	                        RGB_YUV_TABLE[(i+1792)>>0]  = - 5329 * i;
	                    }
	                }
	    
	                // IO functions
	                function writeBits(bs)
	                {
	                    var value = bs[0];
	                    var posval = bs[1]-1;
	                    while ( posval >= 0 ) {
	                        if (value & (1 << posval) ) {
	                            bytenew |= (1 << bytepos);
	                        }
	                        posval--;
	                        bytepos--;
	                        if (bytepos < 0) {
	                            if (bytenew == 0xFF) {
	                                writeByte(0xFF);
	                                writeByte(0);
	                            }
	                            else {
	                                writeByte(bytenew);
	                            }
	                            bytepos=7;
	                            bytenew=0;
	                        }
	                    }
	                }
	    
	                function writeByte(value)
	                {
	                    byteout.push(clt[value]); // write char directly instead of converting later
	                }
	    
	                function writeWord(value)
	                {
	                    writeByte((value>>8)&0xFF);
	                    writeByte((value   )&0xFF);
	                }
	    
	                // DCT & quantization core
	                function fDCTQuant(data, fdtbl)
	                {
	                    var d0, d1, d2, d3, d4, d5, d6, d7;
	                    /* Pass 1: process rows. */
	                    var dataOff=0;
	                    var i;
	                    var I8 = 8;
	                    var I64 = 64;
	                    for (i=0; i<I8; ++i)
	                    {
	                        d0 = data[dataOff];
	                        d1 = data[dataOff+1];
	                        d2 = data[dataOff+2];
	                        d3 = data[dataOff+3];
	                        d4 = data[dataOff+4];
	                        d5 = data[dataOff+5];
	                        d6 = data[dataOff+6];
	                        d7 = data[dataOff+7];
	    
	                        var tmp0 = d0 + d7;
	                        var tmp7 = d0 - d7;
	                        var tmp1 = d1 + d6;
	                        var tmp6 = d1 - d6;
	                        var tmp2 = d2 + d5;
	                        var tmp5 = d2 - d5;
	                        var tmp3 = d3 + d4;
	                        var tmp4 = d3 - d4;
	    
	                        /* Even part */
	                        var tmp10 = tmp0 + tmp3;    /* phase 2 */
	                        var tmp13 = tmp0 - tmp3;
	                        var tmp11 = tmp1 + tmp2;
	                        var tmp12 = tmp1 - tmp2;
	    
	                        data[dataOff] = tmp10 + tmp11; /* phase 3 */
	                        data[dataOff+4] = tmp10 - tmp11;
	    
	                        var z1 = (tmp12 + tmp13) * 0.707106781; /* c4 */
	                        data[dataOff+2] = tmp13 + z1; /* phase 5 */
	                        data[dataOff+6] = tmp13 - z1;
	    
	                        /* Odd part */
	                        tmp10 = tmp4 + tmp5; /* phase 2 */
	                        tmp11 = tmp5 + tmp6;
	                        tmp12 = tmp6 + tmp7;
	    
	                        /* The rotator is modified from fig 4-8 to avoid extra negations. */
	                        var z5 = (tmp10 - tmp12) * 0.382683433; /* c6 */
	                        var z2 = 0.541196100 * tmp10 + z5; /* c2-c6 */
	                        var z4 = 1.306562965 * tmp12 + z5; /* c2+c6 */
	                        var z3 = tmp11 * 0.707106781; /* c4 */
	    
	                        var z11 = tmp7 + z3;    /* phase 5 */
	                        var z13 = tmp7 - z3;
	    
	                        data[dataOff+5] = z13 + z2; /* phase 6 */
	                        data[dataOff+3] = z13 - z2;
	                        data[dataOff+1] = z11 + z4;
	                        data[dataOff+7] = z11 - z4;
	    
	                        dataOff += 8; /* advance pointer to next row */
	                    }
	    
	                    /* Pass 2: process columns. */
	                    dataOff = 0;
	                    for (i=0; i<I8; ++i)
	                    {
	                        d0 = data[dataOff];
	                        d1 = data[dataOff + 8];
	                        d2 = data[dataOff + 16];
	                        d3 = data[dataOff + 24];
	                        d4 = data[dataOff + 32];
	                        d5 = data[dataOff + 40];
	                        d6 = data[dataOff + 48];
	                        d7 = data[dataOff + 56];
	    
	                        var tmp0p2 = d0 + d7;
	                        var tmp7p2 = d0 - d7;
	                        var tmp1p2 = d1 + d6;
	                        var tmp6p2 = d1 - d6;
	                        var tmp2p2 = d2 + d5;
	                        var tmp5p2 = d2 - d5;
	                        var tmp3p2 = d3 + d4;
	                        var tmp4p2 = d3 - d4;
	    
	                        /* Even part */
	                        var tmp10p2 = tmp0p2 + tmp3p2;  /* phase 2 */
	                        var tmp13p2 = tmp0p2 - tmp3p2;
	                        var tmp11p2 = tmp1p2 + tmp2p2;
	                        var tmp12p2 = tmp1p2 - tmp2p2;
	    
	                        data[dataOff] = tmp10p2 + tmp11p2; /* phase 3 */
	                        data[dataOff+32] = tmp10p2 - tmp11p2;
	    
	                        var z1p2 = (tmp12p2 + tmp13p2) * 0.707106781; /* c4 */
	                        data[dataOff+16] = tmp13p2 + z1p2; /* phase 5 */
	                        data[dataOff+48] = tmp13p2 - z1p2;
	    
	                        /* Odd part */
	                        tmp10p2 = tmp4p2 + tmp5p2; /* phase 2 */
	                        tmp11p2 = tmp5p2 + tmp6p2;
	                        tmp12p2 = tmp6p2 + tmp7p2;
	    
	                        /* The rotator is modified from fig 4-8 to avoid extra negations. */
	                        var z5p2 = (tmp10p2 - tmp12p2) * 0.382683433; /* c6 */
	                        var z2p2 = 0.541196100 * tmp10p2 + z5p2; /* c2-c6 */
	                        var z4p2 = 1.306562965 * tmp12p2 + z5p2; /* c2+c6 */
	                        var z3p2 = tmp11p2 * 0.707106781; /* c4 */
	    
	                        var z11p2 = tmp7p2 + z3p2;  /* phase 5 */
	                        var z13p2 = tmp7p2 - z3p2;
	    
	                        data[dataOff+40] = z13p2 + z2p2; /* phase 6 */
	                        data[dataOff+24] = z13p2 - z2p2;
	                        data[dataOff+ 8] = z11p2 + z4p2;
	                        data[dataOff+56] = z11p2 - z4p2;
	    
	                        dataOff++; /* advance pointer to next column */
	                    }
	    
	                    // Quantize/descale the coefficients
	                    var fDCTQuant;
	                    for (i=0; i<I64; ++i)
	                    {
	                        // Apply the quantization and scaling factor & Round to nearest integer
	                        fDCTQuant = data[i]*fdtbl[i];
	                        outputfDCTQuant[i] = (fDCTQuant > 0.0) ? ((fDCTQuant + 0.5)|0) : ((fDCTQuant - 0.5)|0);
	                        //outputfDCTQuant[i] = fround(fDCTQuant);
	    
	                    }
	                    return outputfDCTQuant;
	                }
	    
	                function writeAPP0()
	                {
	                    writeWord(0xFFE0); // marker
	                    writeWord(16); // length
	                    writeByte(0x4A); // J
	                    writeByte(0x46); // F
	                    writeByte(0x49); // I
	                    writeByte(0x46); // F
	                    writeByte(0); // = "JFIF",'\0'
	                    writeByte(1); // versionhi
	                    writeByte(1); // versionlo
	                    writeByte(0); // xyunits
	                    writeWord(1); // xdensity
	                    writeWord(1); // ydensity
	                    writeByte(0); // thumbnwidth
	                    writeByte(0); // thumbnheight
	                }
	    
	                function writeSOF0(width, height)
	                {
	                    writeWord(0xFFC0); // marker
	                    writeWord(17);   // length, truecolor YUV JPG
	                    writeByte(8);    // precision
	                    writeWord(height);
	                    writeWord(width);
	                    writeByte(3);    // nrofcomponents
	                    writeByte(1);    // IdY
	                    writeByte(0x11); // HVY
	                    writeByte(0);    // QTY
	                    writeByte(2);    // IdU
	                    writeByte(0x11); // HVU
	                    writeByte(1);    // QTU
	                    writeByte(3);    // IdV
	                    writeByte(0x11); // HVV
	                    writeByte(1);    // QTV
	                }
	    
	                function writeDQT()
	                {
	                    writeWord(0xFFDB); // marker
	                    writeWord(132);    // length
	                    writeByte(0);
	                    for (var i=0; i<64; i++) {
	                        writeByte(YTable[i]);
	                    }
	                    writeByte(1);
	                    for (var j=0; j<64; j++) {
	                        writeByte(UVTable[j]);
	                    }
	                }
	    
	                function writeDHT()
	                {
	                    writeWord(0xFFC4); // marker
	                    writeWord(0x01A2); // length
	    
	                    writeByte(0); // HTYDCinfo
	                    for (var i=0; i<16; i++) {
	                        writeByte(std_dc_luminance_nrcodes[i+1]);
	                    }
	                    for (var j=0; j<=11; j++) {
	                        writeByte(std_dc_luminance_values[j]);
	                    }
	    
	                    writeByte(0x10); // HTYACinfo
	                    for (var k=0; k<16; k++) {
	                        writeByte(std_ac_luminance_nrcodes[k+1]);
	                    }
	                    for (var l=0; l<=161; l++) {
	                        writeByte(std_ac_luminance_values[l]);
	                    }
	    
	                    writeByte(1); // HTUDCinfo
	                    for (var m=0; m<16; m++) {
	                        writeByte(std_dc_chrominance_nrcodes[m+1]);
	                    }
	                    for (var n=0; n<=11; n++) {
	                        writeByte(std_dc_chrominance_values[n]);
	                    }
	    
	                    writeByte(0x11); // HTUACinfo
	                    for (var o=0; o<16; o++) {
	                        writeByte(std_ac_chrominance_nrcodes[o+1]);
	                    }
	                    for (var p=0; p<=161; p++) {
	                        writeByte(std_ac_chrominance_values[p]);
	                    }
	                }
	    
	                function writeSOS()
	                {
	                    writeWord(0xFFDA); // marker
	                    writeWord(12); // length
	                    writeByte(3); // nrofcomponents
	                    writeByte(1); // IdY
	                    writeByte(0); // HTY
	                    writeByte(2); // IdU
	                    writeByte(0x11); // HTU
	                    writeByte(3); // IdV
	                    writeByte(0x11); // HTV
	                    writeByte(0); // Ss
	                    writeByte(0x3f); // Se
	                    writeByte(0); // Bf
	                }
	    
	                function processDU(CDU, fdtbl, DC, HTDC, HTAC){
	                    var EOB = HTAC[0x00];
	                    var M16zeroes = HTAC[0xF0];
	                    var pos;
	                    var I16 = 16;
	                    var I63 = 63;
	                    var I64 = 64;
	                    var DU_DCT = fDCTQuant(CDU, fdtbl);
	                    //ZigZag reorder
	                    for (var j=0;j<I64;++j) {
	                        DU[ZigZag[j]]=DU_DCT[j];
	                    }
	                    var Diff = DU[0] - DC; DC = DU[0];
	                    //Encode DC
	                    if (Diff==0) {
	                        writeBits(HTDC[0]); // Diff might be 0
	                    } else {
	                        pos = 32767+Diff;
	                        writeBits(HTDC[category[pos]]);
	                        writeBits(bitcode[pos]);
	                    }
	                    //Encode ACs
	                    var end0pos = 63; // was const... which is crazy
	                    for (; (end0pos>0)&&(DU[end0pos]==0); end0pos--) {}
	                    //end0pos = first element in reverse order !=0
	                    if ( end0pos == 0) {
	                        writeBits(EOB);
	                        return DC;
	                    }
	                    var i = 1;
	                    var lng;
	                    while ( i <= end0pos ) {
	                        var startpos = i;
	                        for (; (DU[i]==0) && (i<=end0pos); ++i) {}
	                        var nrzeroes = i-startpos;
	                        if ( nrzeroes >= I16 ) {
	                            lng = nrzeroes>>4;
	                            for (var nrmarker=1; nrmarker <= lng; ++nrmarker)
	                                writeBits(M16zeroes);
	                            nrzeroes = nrzeroes&0xF;
	                        }
	                        pos = 32767+DU[i];
	                        writeBits(HTAC[(nrzeroes<<4)+category[pos]]);
	                        writeBits(bitcode[pos]);
	                        i++;
	                    }
	                    if ( end0pos != I63 ) {
	                        writeBits(EOB);
	                    }
	                    return DC;
	                }
	    
	                function initCharLookupTable(){
	                    var sfcc = String.fromCharCode;
	                    for(var i=0; i < 256; i++){ ///// ACHTUNG // 255
	                        clt[i] = sfcc(i);
	                    }
	                }
	    
	                this.encode = function(image,quality) // image data object
	                {
	                    // var time_start = new Date().getTime();
	    
	                    if(quality) setQuality(quality);
	    
	                    // Initialize bit writer
	                    byteout = new Array();
	                    bytenew=0;
	                    bytepos=7;
	    
	                    // Add JPEG headers
	                    writeWord(0xFFD8); // SOI
	                    writeAPP0();
	                    writeDQT();
	                    writeSOF0(image.width,image.height);
	                    writeDHT();
	                    writeSOS();
	    
	    
	                    // Encode 8x8 macroblocks
	                    var DCY=0;
	                    var DCU=0;
	                    var DCV=0;
	    
	                    bytenew=0;
	                    bytepos=7;
	    
	    
	                    this.encode.displayName = "_encode_";
	    
	                    var imageData = image.data;
	                    var width = image.width;
	                    var height = image.height;
	    
	                    var quadWidth = width*4;
	                    var tripleWidth = width*3;
	    
	                    var x, y = 0;
	                    var r, g, b;
	                    var start,p, col,row,pos;
	                    while(y < height){
	                        x = 0;
	                        while(x < quadWidth){
	                        start = quadWidth * y + x;
	                        p = start;
	                        col = -1;
	                        row = 0;
	    
	                        for(pos=0; pos < 64; pos++){
	                            row = pos >> 3;// /8
	                            col = ( pos & 7 ) * 4; // %8
	                            p = start + ( row * quadWidth ) + col;
	    
	                            if(y+row >= height){ // padding bottom
	                                p-= (quadWidth*(y+1+row-height));
	                            }
	    
	                            if(x+col >= quadWidth){ // padding right
	                                p-= ((x+col) - quadWidth +4)
	                            }
	    
	                            r = imageData[ p++ ];
	                            g = imageData[ p++ ];
	                            b = imageData[ p++ ];
	    
	    
	                            /* // calculate YUV values dynamically
	                            YDU[pos]=((( 0.29900)*r+( 0.58700)*g+( 0.11400)*b))-128; //-0x80
	                            UDU[pos]=(((-0.16874)*r+(-0.33126)*g+( 0.50000)*b));
	                            VDU[pos]=((( 0.50000)*r+(-0.41869)*g+(-0.08131)*b));
	                            */
	    
	                            // use lookup table (slightly faster)
	                            YDU[pos] = ((RGB_YUV_TABLE[r]             + RGB_YUV_TABLE[(g +  256)>>0] + RGB_YUV_TABLE[(b +  512)>>0]) >> 16)-128;
	                            UDU[pos] = ((RGB_YUV_TABLE[(r +  768)>>0] + RGB_YUV_TABLE[(g + 1024)>>0] + RGB_YUV_TABLE[(b + 1280)>>0]) >> 16)-128;
	                            VDU[pos] = ((RGB_YUV_TABLE[(r + 1280)>>0] + RGB_YUV_TABLE[(g + 1536)>>0] + RGB_YUV_TABLE[(b + 1792)>>0]) >> 16)-128;
	    
	                        }
	    
	                        DCY = processDU(YDU, fdtbl_Y, DCY, YDC_HT, YAC_HT);
	                        DCU = processDU(UDU, fdtbl_UV, DCU, UVDC_HT, UVAC_HT);
	                        DCV = processDU(VDU, fdtbl_UV, DCV, UVDC_HT, UVAC_HT);
	                        x+=32;
	                        }
	                        y+=8;
	                    }
	    
	    
	                    ////////////////////////////////////////////////////////////////
	    
	                    // Do the bit alignment of the EOI marker
	                    if ( bytepos >= 0 ) {
	                        var fillbits = [];
	                        fillbits[1] = bytepos+1;
	                        fillbits[0] = (1<<(bytepos+1))-1;
	                        writeBits(fillbits);
	                    }
	    
	                    writeWord(0xFFD9); //EOI
	    
	                    var jpegDataUri = 'data:image/jpeg;base64,' + btoa(byteout.join(''));
	    
	                    byteout = [];
	    
	                    // benchmarking
	                    // var duration = new Date().getTime() - time_start;
	                    // console.log('Encoding time: '+ currentQuality + 'ms');
	                    //
	    
	                    return jpegDataUri
	            }
	    
	            function setQuality(quality){
	                if (quality <= 0) {
	                    quality = 1;
	                }
	                if (quality > 100) {
	                    quality = 100;
	                }
	    
	                if(currentQuality == quality) return // don't recalc if unchanged
	    
	                var sf = 0;
	                if (quality < 50) {
	                    sf = Math.floor(5000 / quality);
	                } else {
	                    sf = Math.floor(200 - quality*2);
	                }
	    
	                initQuantTables(sf);
	                currentQuality = quality;
	                // console.log('Quality set to: '+quality +'%');
	            }
	    
	            function init(){
	                // var time_start = new Date().getTime();
	                if(!quality) quality = 50;
	                // Create tables
	                initCharLookupTable()
	                initHuffmanTbl();
	                initCategoryNumber();
	                initRGBYUVTable();
	    
	                setQuality(quality);
	                // var duration = new Date().getTime() - time_start;
	                // console.log('Initialization '+ duration + 'ms');
	            }
	    
	            init();
	    
	        }
	    
	        JPEGEncoder.encode = function( data, quality ) {
	            var encoder = new JPEGEncoder( quality );
	    
	            return encoder.encode( data );
	        }
	    
	        return JPEGEncoder;
	    });
	    /**
	     * @fileOverview Fix android canvas.toDataUrl bug.
	     */
	    define('runtime/html5/androidpatch',[
	        'runtime/html5/util',
	        'runtime/html5/jpegencoder',
	        'base'
	    ], function( Util, encoder, Base ) {
	        var origin = Util.canvasToDataUrl,
	            supportJpeg;
	    
	        Util.canvasToDataUrl = function( canvas, type, quality ) {
	            var ctx, w, h, fragement, parts;
	    
	            // 非android手机直接跳过。
	            if ( !Base.os.android ) {
	                return origin.apply( null, arguments );
	            }
	    
	            // 检测是否canvas支持jpeg导出，根据数据格式来判断。
	            // JPEG 前两位分别是：255, 216
	            if ( type === 'image/jpeg' && typeof supportJpeg === 'undefined' ) {
	                fragement = origin.apply( null, arguments );
	    
	                parts = fragement.split(',');
	    
	                if ( ~parts[ 0 ].indexOf('base64') ) {
	                    fragement = atob( parts[ 1 ] );
	                } else {
	                    fragement = decodeURIComponent( parts[ 1 ] );
	                }
	    
	                fragement = fragement.substring( 0, 2 );
	    
	                supportJpeg = fragement.charCodeAt( 0 ) === 255 &&
	                        fragement.charCodeAt( 1 ) === 216;
	            }
	    
	            // 只有在android环境下才修复
	            if ( type === 'image/jpeg' && !supportJpeg ) {
	                w = canvas.width;
	                h = canvas.height;
	                ctx = canvas.getContext('2d');
	    
	                return encoder.encode( ctx.getImageData( 0, 0, w, h ), quality );
	            }
	    
	            return origin.apply( null, arguments );
	        };
	    });
	    /**
	     * @fileOverview Image
	     */
	    define('runtime/html5/image',[
	        'base',
	        'runtime/html5/runtime',
	        'runtime/html5/util'
	    ], function( Base, Html5Runtime, Util ) {
	    
	        var BLANK = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
	    
	        return Html5Runtime.register( 'Image', {
	    
	            // flag: 标记是否被修改过。
	            modified: false,
	    
	            init: function() {
	                var me = this,
	                    img = new Image();
	    
	                img.onload = function() {
	    
	                    me._info = {
	                        type: me.type,
	                        width: this.width,
	                        height: this.height
	                    };
	    
	                    // 读取meta信息。
	                    if ( !me._metas && 'image/jpeg' === me.type ) {
	                        Util.parseMeta( me._blob, function( error, ret ) {
	                            me._metas = ret;
	                            me.owner.trigger('load');
	                        });
	                    } else {
	                        me.owner.trigger('load');
	                    }
	                };
	    
	                img.onerror = function() {
	                    me.owner.trigger('error');
	                };
	    
	                me._img = img;
	            },
	    
	            loadFromBlob: function( blob ) {
	                var me = this,
	                    img = me._img;
	    
	                me._blob = blob;
	                me.type = blob.type;
	                img.src = Util.createObjectURL( blob.getSource() );
	                me.owner.once( 'load', function() {
	                    Util.revokeObjectURL( img.src );
	                });
	            },
	    
	            resize: function( width, height ) {
	                var canvas = this._canvas ||
	                        (this._canvas = document.createElement('canvas'));
	    
	                this._resize( this._img, canvas, width, height );
	                this._blob = null;    // 没用了，可以删掉了。
	                this.modified = true;
	                this.owner.trigger( 'complete', 'resize' );
	            },
	    
	            crop: function( x, y, w, h, s ) {
	                var cvs = this._canvas ||
	                        (this._canvas = document.createElement('canvas')),
	                    opts = this.options,
	                    img = this._img,
	                    iw = img.naturalWidth,
	                    ih = img.naturalHeight,
	                    orientation = this.getOrientation();
	    
	                s = s || 1;
	    
	                // todo 解决 orientation 的问题。
	                // values that require 90 degree rotation
	                // if ( ~[ 5, 6, 7, 8 ].indexOf( orientation ) ) {
	    
	                //     switch ( orientation ) {
	                //         case 6:
	                //             tmp = x;
	                //             x = y;
	                //             y = iw * s - tmp - w;
	                //             console.log(ih * s, tmp, w)
	                //             break;
	                //     }
	    
	                //     (w ^= h, h ^= w, w ^= h);
	                // }
	    
	                cvs.width = w;
	                cvs.height = h;
	    
	                opts.preserveHeaders || this._rotate2Orientaion( cvs, orientation );
	                this._renderImageToCanvas( cvs, img, -x, -y, iw * s, ih * s );
	    
	                this._blob = null;    // 没用了，可以删掉了。
	                this.modified = true;
	                this.owner.trigger( 'complete', 'crop' );
	            },
	    
	            getAsBlob: function( type ) {
	                var blob = this._blob,
	                    opts = this.options,
	                    canvas;
	    
	                type = type || this.type;
	    
	                // blob需要重新生成。
	                if ( this.modified || this.type !== type ) {
	                    canvas = this._canvas;
	    
	                    if ( type === 'image/jpeg' ) {
	    
	                        blob = Util.canvasToDataUrl( canvas, type, opts.quality );
	    
	                        if ( opts.preserveHeaders && this._metas &&
	                                this._metas.imageHead ) {
	    
	                            blob = Util.dataURL2ArrayBuffer( blob );
	                            blob = Util.updateImageHead( blob,
	                                    this._metas.imageHead );
	                            blob = Util.arrayBufferToBlob( blob, type );
	                            return blob;
	                        }
	                    } else {
	                        blob = Util.canvasToDataUrl( canvas, type );
	                    }
	    
	                    blob = Util.dataURL2Blob( blob );
	                }
	    
	                return blob;
	            },
	    
	            getAsDataUrl: function( type ) {
	                var opts = this.options;
	    
	                type = type || this.type;
	    
	                if ( type === 'image/jpeg' ) {
	                    return Util.canvasToDataUrl( this._canvas, type, opts.quality );
	                } else {
	                    return this._canvas.toDataURL( type );
	                }
	            },
	    
	            getOrientation: function() {
	                return this._metas && this._metas.exif &&
	                        this._metas.exif.get('Orientation') || 1;
	            },
	    
	            info: function( val ) {
	    
	                // setter
	                if ( val ) {
	                    this._info = val;
	                    return this;
	                }
	    
	                // getter
	                return this._info;
	            },
	    
	            meta: function( val ) {
	    
	                // setter
	                if ( val ) {
	                    this._meta = val;
	                    return this;
	                }
	    
	                // getter
	                return this._meta;
	            },
	    
	            destroy: function() {
	                var canvas = this._canvas;
	                this._img.onload = null;
	    
	                if ( canvas ) {
	                    canvas.getContext('2d')
	                            .clearRect( 0, 0, canvas.width, canvas.height );
	                    canvas.width = canvas.height = 0;
	                    this._canvas = null;
	                }
	    
	                // 释放内存。非常重要，否则释放不了image的内存。
	                this._img.src = BLANK;
	                this._img = this._blob = null;
	            },
	    
	            _resize: function( img, cvs, width, height ) {
	                var opts = this.options,
	                    naturalWidth = img.width,
	                    naturalHeight = img.height,
	                    orientation = this.getOrientation(),
	                    scale, w, h, x, y;
	    
	                // values that require 90 degree rotation
	                if ( ~[ 5, 6, 7, 8 ].indexOf( orientation ) ) {
	    
	                    // 交换width, height的值。
	                    width ^= height;
	                    height ^= width;
	                    width ^= height;
	                }
	    
	                scale = Math[ opts.crop ? 'max' : 'min' ]( width / naturalWidth,
	                        height / naturalHeight );
	    
	                // 不允许放大。
	                opts.allowMagnify || (scale = Math.min( 1, scale ));
	    
	                w = naturalWidth * scale;
	                h = naturalHeight * scale;
	    
	                if ( opts.crop ) {
	                    cvs.width = width;
	                    cvs.height = height;
	                } else {
	                    cvs.width = w;
	                    cvs.height = h;
	                }
	    
	                x = (cvs.width - w) / 2;
	                y = (cvs.height - h) / 2;
	    
	                opts.preserveHeaders || this._rotate2Orientaion( cvs, orientation );
	    
	                this._renderImageToCanvas( cvs, img, x, y, w, h );
	            },
	    
	            _rotate2Orientaion: function( canvas, orientation ) {
	                var width = canvas.width,
	                    height = canvas.height,
	                    ctx = canvas.getContext('2d');
	    
	                switch ( orientation ) {
	                    case 5:
	                    case 6:
	                    case 7:
	                    case 8:
	                        canvas.width = height;
	                        canvas.height = width;
	                        break;
	                }
	    
	                switch ( orientation ) {
	                    case 2:    // horizontal flip
	                        ctx.translate( width, 0 );
	                        ctx.scale( -1, 1 );
	                        break;
	    
	                    case 3:    // 180 rotate left
	                        ctx.translate( width, height );
	                        ctx.rotate( Math.PI );
	                        break;
	    
	                    case 4:    // vertical flip
	                        ctx.translate( 0, height );
	                        ctx.scale( 1, -1 );
	                        break;
	    
	                    case 5:    // vertical flip + 90 rotate right
	                        ctx.rotate( 0.5 * Math.PI );
	                        ctx.scale( 1, -1 );
	                        break;
	    
	                    case 6:    // 90 rotate right
	                        ctx.rotate( 0.5 * Math.PI );
	                        ctx.translate( 0, -height );
	                        break;
	    
	                    case 7:    // horizontal flip + 90 rotate right
	                        ctx.rotate( 0.5 * Math.PI );
	                        ctx.translate( width, -height );
	                        ctx.scale( -1, 1 );
	                        break;
	    
	                    case 8:    // 90 rotate left
	                        ctx.rotate( -0.5 * Math.PI );
	                        ctx.translate( -width, 0 );
	                        break;
	                }
	            },
	    
	            // https://github.com/stomita/ios-imagefile-megapixel/
	            // blob/master/src/megapix-image.js
	            _renderImageToCanvas: (function() {
	    
	                // 如果不是ios, 不需要这么复杂！
	                if ( !Base.os.ios ) {
	                    return function( canvas ) {
	                        var args = Base.slice( arguments, 1 ),
	                            ctx = canvas.getContext('2d');
	    
	                        ctx.drawImage.apply( ctx, args );
	                    };
	                }
	    
	                /**
	                 * Detecting vertical squash in loaded image.
	                 * Fixes a bug which squash image vertically while drawing into
	                 * canvas for some images.
	                 */
	                function detectVerticalSquash( img, iw, ih ) {
	                    var canvas = document.createElement('canvas'),
	                        ctx = canvas.getContext('2d'),
	                        sy = 0,
	                        ey = ih,
	                        py = ih,
	                        data, alpha, ratio;
	    
	    
	                    canvas.width = 1;
	                    canvas.height = ih;
	                    ctx.drawImage( img, 0, 0 );
	                    data = ctx.getImageData( 0, 0, 1, ih ).data;
	    
	                    // search image edge pixel position in case
	                    // it is squashed vertically.
	                    while ( py > sy ) {
	                        alpha = data[ (py - 1) * 4 + 3 ];
	    
	                        if ( alpha === 0 ) {
	                            ey = py;
	                        } else {
	                            sy = py;
	                        }
	    
	                        py = (ey + sy) >> 1;
	                    }
	    
	                    ratio = (py / ih);
	                    return (ratio === 0) ? 1 : ratio;
	                }
	    
	                // fix ie7 bug
	                // http://stackoverflow.com/questions/11929099/
	                // html5-canvas-drawimage-ratio-bug-ios
	                if ( Base.os.ios >= 7 ) {
	                    return function( canvas, img, x, y, w, h ) {
	                        var iw = img.naturalWidth,
	                            ih = img.naturalHeight,
	                            vertSquashRatio = detectVerticalSquash( img, iw, ih );
	    
	                        return canvas.getContext('2d').drawImage( img, 0, 0,
	                                iw * vertSquashRatio, ih * vertSquashRatio,
	                                x, y, w, h );
	                    };
	                }
	    
	                /**
	                 * Detect subsampling in loaded image.
	                 * In iOS, larger images than 2M pixels may be
	                 * subsampled in rendering.
	                 */
	                function detectSubsampling( img ) {
	                    var iw = img.naturalWidth,
	                        ih = img.naturalHeight,
	                        canvas, ctx;
	    
	                    // subsampling may happen overmegapixel image
	                    if ( iw * ih > 1024 * 1024 ) {
	                        canvas = document.createElement('canvas');
	                        canvas.width = canvas.height = 1;
	                        ctx = canvas.getContext('2d');
	                        ctx.drawImage( img, -iw + 1, 0 );
	    
	                        // subsampled image becomes half smaller in rendering size.
	                        // check alpha channel value to confirm image is covering
	                        // edge pixel or not. if alpha value is 0
	                        // image is not covering, hence subsampled.
	                        return ctx.getImageData( 0, 0, 1, 1 ).data[ 3 ] === 0;
	                    } else {
	                        return false;
	                    }
	                }
	    
	    
	                return function( canvas, img, x, y, width, height ) {
	                    var iw = img.naturalWidth,
	                        ih = img.naturalHeight,
	                        ctx = canvas.getContext('2d'),
	                        subsampled = detectSubsampling( img ),
	                        doSquash = this.type === 'image/jpeg',
	                        d = 1024,
	                        sy = 0,
	                        dy = 0,
	                        tmpCanvas, tmpCtx, vertSquashRatio, dw, dh, sx, dx;
	    
	                    if ( subsampled ) {
	                        iw /= 2;
	                        ih /= 2;
	                    }
	    
	                    ctx.save();
	                    tmpCanvas = document.createElement('canvas');
	                    tmpCanvas.width = tmpCanvas.height = d;
	    
	                    tmpCtx = tmpCanvas.getContext('2d');
	                    vertSquashRatio = doSquash ?
	                            detectVerticalSquash( img, iw, ih ) : 1;
	    
	                    dw = Math.ceil( d * width / iw );
	                    dh = Math.ceil( d * height / ih / vertSquashRatio );
	    
	                    while ( sy < ih ) {
	                        sx = 0;
	                        dx = 0;
	                        while ( sx < iw ) {
	                            tmpCtx.clearRect( 0, 0, d, d );
	                            tmpCtx.drawImage( img, -sx, -sy );
	                            ctx.drawImage( tmpCanvas, 0, 0, d, d,
	                                    x + dx, y + dy, dw, dh );
	                            sx += d;
	                            dx += dw;
	                        }
	                        sy += d;
	                        dy += dh;
	                    }
	                    ctx.restore();
	                    tmpCanvas = tmpCtx = null;
	                };
	            })()
	        });
	    });
	    /**
	     * @fileOverview Transport
	     * @todo 支持chunked传输，优势：
	     * 可以将大文件分成小块，挨个传输，可以提高大文件成功率，当失败的时候，也只需要重传那小部分，
	     * 而不需要重头再传一次。另外断点续传也需要用chunked方式。
	     */
	    define('runtime/html5/transport',[
	        'base',
	        'runtime/html5/runtime'
	    ], function( Base, Html5Runtime ) {
	    
	        var noop = Base.noop,
	            $ = Base.$;
	    
	        return Html5Runtime.register( 'Transport', {
	            init: function() {
	                this._status = 0;
	                this._response = null;
	            },
	    
	            send: function() {
	                var owner = this.owner,
	                    opts = this.options,
	                    xhr = this._initAjax(),
	                    blob = owner._blob,
	                    server = opts.server,
	                    formData, binary, fr;
	    
	                if ( opts.sendAsBinary ) {
	                    server += (/\?/.test( server ) ? '&' : '?') +
	                            $.param( owner._formData );
	    
	                    binary = blob.getSource();
	                } else {
	                    formData = new FormData();
	                    $.each( owner._formData, function( k, v ) {
	                        formData.append( k, v );
	                    });
	    
	                    formData.append( opts.fileVal, blob.getSource(),
	                            opts.filename || owner._formData.name || '' );
	                }
	    
	                if ( opts.withCredentials && 'withCredentials' in xhr ) {
	                    xhr.open( opts.method, server, true );
	                    xhr.withCredentials = true;
	                } else {
	                    xhr.open( opts.method, server );
	                }
	    
	                this._setRequestHeader( xhr, opts.headers );
	    
	                if ( binary ) {
	                    // 强制设置成 content-type 为文件流。
	                    xhr.overrideMimeType &&
	                            xhr.overrideMimeType('application/octet-stream');
	    
	                    // android直接发送blob会导致服务端接收到的是空文件。
	                    // bug详情。
	                    // https://code.google.com/p/android/issues/detail?id=39882
	                    // 所以先用fileReader读取出来再通过arraybuffer的方式发送。
	                    if ( Base.os.android ) {
	                        fr = new FileReader();
	    
	                        fr.onload = function() {
	                            xhr.send( this.result );
	                            fr = fr.onload = null;
	                        };
	    
	                        fr.readAsArrayBuffer( binary );
	                    } else {
	                        xhr.send( binary );
	                    }
	                } else {
	                    xhr.send( formData );
	                }
	            },
	    
	            getResponse: function() {
	                return this._response;
	            },
	    
	            getResponseAsJson: function() {
	                return this._parseJson( this._response );
	            },
	    
	            getStatus: function() {
	                return this._status;
	            },
	    
	            abort: function() {
	                var xhr = this._xhr;
	    
	                if ( xhr ) {
	                    xhr.upload.onprogress = noop;
	                    xhr.onreadystatechange = noop;
	                    xhr.abort();
	    
	                    this._xhr = xhr = null;
	                }
	            },
	    
	            destroy: function() {
	                this.abort();
	            },
	    
	            _initAjax: function() {
	                var me = this,
	                    xhr = new XMLHttpRequest(),
	                    opts = this.options;
	    
	                if ( opts.withCredentials && !('withCredentials' in xhr) &&
	                        typeof XDomainRequest !== 'undefined' ) {
	                    xhr = new XDomainRequest();
	                }
	    
	                xhr.upload.onprogress = function( e ) {
	                    var percentage = 0;
	    
	                    if ( e.lengthComputable ) {
	                        percentage = e.loaded / e.total;
	                    }
	    
	                    return me.trigger( 'progress', percentage );
	                };
	    
	                xhr.onreadystatechange = function() {
	    
	                    if ( xhr.readyState !== 4 ) {
	                        return;
	                    }
	    
	                    xhr.upload.onprogress = noop;
	                    xhr.onreadystatechange = noop;
	                    me._xhr = null;
	                    me._status = xhr.status;
	    
	                    if ( xhr.status >= 200 && xhr.status < 300 ) {
	                        me._response = xhr.responseText;
	                        return me.trigger('load');
	                    } else if ( xhr.status >= 500 && xhr.status < 600 ) {
	                        me._response = xhr.responseText;
	                        return me.trigger( 'error', 'server' );
	                    }
	    
	    
	                    return me.trigger( 'error', me._status ? 'http' : 'abort' );
	                };
	    
	                me._xhr = xhr;
	                return xhr;
	            },
	    
	            _setRequestHeader: function( xhr, headers ) {
	                $.each( headers, function( key, val ) {
	                    xhr.setRequestHeader( key, val );
	                });
	            },
	    
	            _parseJson: function( str ) {
	                var json;
	    
	                try {
	                    json = JSON.parse( str );
	                } catch ( ex ) {
	                    json = {};
	                }
	    
	                return json;
	            }
	        });
	    });
	    /**
	     * @fileOverview  Transport flash实现
	     */
	    define('runtime/html5/md5',[
	        'runtime/html5/runtime'
	    ], function( FlashRuntime ) {
	    
	        /*
	         * Fastest md5 implementation around (JKM md5)
	         * Credits: Joseph Myers
	         *
	         * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
	         * @see http://jsperf.com/md5-shootout/7
	         */
	    
	        /* this function is much faster,
	          so if possible we use it. Some IEs
	          are the only ones I know of that
	          need the idiotic second function,
	          generated by an if clause.  */
	        var add32 = function (a, b) {
	            return (a + b) & 0xFFFFFFFF;
	        },
	    
	        cmn = function (q, a, b, x, s, t) {
	            a = add32(add32(a, q), add32(x, t));
	            return add32((a << s) | (a >>> (32 - s)), b);
	        },
	    
	        ff = function (a, b, c, d, x, s, t) {
	            return cmn((b & c) | ((~b) & d), a, b, x, s, t);
	        },
	    
	        gg = function (a, b, c, d, x, s, t) {
	            return cmn((b & d) | (c & (~d)), a, b, x, s, t);
	        },
	    
	        hh = function (a, b, c, d, x, s, t) {
	            return cmn(b ^ c ^ d, a, b, x, s, t);
	        },
	    
	        ii = function (a, b, c, d, x, s, t) {
	            return cmn(c ^ (b | (~d)), a, b, x, s, t);
	        },
	    
	        md5cycle = function (x, k) {
	            var a = x[0],
	                b = x[1],
	                c = x[2],
	                d = x[3];
	    
	            a = ff(a, b, c, d, k[0], 7, -680876936);
	            d = ff(d, a, b, c, k[1], 12, -389564586);
	            c = ff(c, d, a, b, k[2], 17, 606105819);
	            b = ff(b, c, d, a, k[3], 22, -1044525330);
	            a = ff(a, b, c, d, k[4], 7, -176418897);
	            d = ff(d, a, b, c, k[5], 12, 1200080426);
	            c = ff(c, d, a, b, k[6], 17, -1473231341);
	            b = ff(b, c, d, a, k[7], 22, -45705983);
	            a = ff(a, b, c, d, k[8], 7, 1770035416);
	            d = ff(d, a, b, c, k[9], 12, -1958414417);
	            c = ff(c, d, a, b, k[10], 17, -42063);
	            b = ff(b, c, d, a, k[11], 22, -1990404162);
	            a = ff(a, b, c, d, k[12], 7, 1804603682);
	            d = ff(d, a, b, c, k[13], 12, -40341101);
	            c = ff(c, d, a, b, k[14], 17, -1502002290);
	            b = ff(b, c, d, a, k[15], 22, 1236535329);
	    
	            a = gg(a, b, c, d, k[1], 5, -165796510);
	            d = gg(d, a, b, c, k[6], 9, -1069501632);
	            c = gg(c, d, a, b, k[11], 14, 643717713);
	            b = gg(b, c, d, a, k[0], 20, -373897302);
	            a = gg(a, b, c, d, k[5], 5, -701558691);
	            d = gg(d, a, b, c, k[10], 9, 38016083);
	            c = gg(c, d, a, b, k[15], 14, -660478335);
	            b = gg(b, c, d, a, k[4], 20, -405537848);
	            a = gg(a, b, c, d, k[9], 5, 568446438);
	            d = gg(d, a, b, c, k[14], 9, -1019803690);
	            c = gg(c, d, a, b, k[3], 14, -187363961);
	            b = gg(b, c, d, a, k[8], 20, 1163531501);
	            a = gg(a, b, c, d, k[13], 5, -1444681467);
	            d = gg(d, a, b, c, k[2], 9, -51403784);
	            c = gg(c, d, a, b, k[7], 14, 1735328473);
	            b = gg(b, c, d, a, k[12], 20, -1926607734);
	    
	            a = hh(a, b, c, d, k[5], 4, -378558);
	            d = hh(d, a, b, c, k[8], 11, -2022574463);
	            c = hh(c, d, a, b, k[11], 16, 1839030562);
	            b = hh(b, c, d, a, k[14], 23, -35309556);
	            a = hh(a, b, c, d, k[1], 4, -1530992060);
	            d = hh(d, a, b, c, k[4], 11, 1272893353);
	            c = hh(c, d, a, b, k[7], 16, -155497632);
	            b = hh(b, c, d, a, k[10], 23, -1094730640);
	            a = hh(a, b, c, d, k[13], 4, 681279174);
	            d = hh(d, a, b, c, k[0], 11, -358537222);
	            c = hh(c, d, a, b, k[3], 16, -722521979);
	            b = hh(b, c, d, a, k[6], 23, 76029189);
	            a = hh(a, b, c, d, k[9], 4, -640364487);
	            d = hh(d, a, b, c, k[12], 11, -421815835);
	            c = hh(c, d, a, b, k[15], 16, 530742520);
	            b = hh(b, c, d, a, k[2], 23, -995338651);
	    
	            a = ii(a, b, c, d, k[0], 6, -198630844);
	            d = ii(d, a, b, c, k[7], 10, 1126891415);
	            c = ii(c, d, a, b, k[14], 15, -1416354905);
	            b = ii(b, c, d, a, k[5], 21, -57434055);
	            a = ii(a, b, c, d, k[12], 6, 1700485571);
	            d = ii(d, a, b, c, k[3], 10, -1894986606);
	            c = ii(c, d, a, b, k[10], 15, -1051523);
	            b = ii(b, c, d, a, k[1], 21, -2054922799);
	            a = ii(a, b, c, d, k[8], 6, 1873313359);
	            d = ii(d, a, b, c, k[15], 10, -30611744);
	            c = ii(c, d, a, b, k[6], 15, -1560198380);
	            b = ii(b, c, d, a, k[13], 21, 1309151649);
	            a = ii(a, b, c, d, k[4], 6, -145523070);
	            d = ii(d, a, b, c, k[11], 10, -1120210379);
	            c = ii(c, d, a, b, k[2], 15, 718787259);
	            b = ii(b, c, d, a, k[9], 21, -343485551);
	    
	            x[0] = add32(a, x[0]);
	            x[1] = add32(b, x[1]);
	            x[2] = add32(c, x[2]);
	            x[3] = add32(d, x[3]);
	        },
	    
	        /* there needs to be support for Unicode here,
	           * unless we pretend that we can redefine the MD-5
	           * algorithm for multi-byte characters (perhaps
	           * by adding every four 16-bit characters and
	           * shortening the sum to 32 bits). Otherwise
	           * I suggest performing MD-5 as if every character
	           * was two bytes--e.g., 0040 0025 = @%--but then
	           * how will an ordinary MD-5 sum be matched?
	           * There is no way to standardize text to something
	           * like UTF-8 before transformation; speed cost is
	           * utterly prohibitive. The JavaScript standard
	           * itself needs to look at this: it should start
	           * providing access to strings as preformed UTF-8
	           * 8-bit unsigned value arrays.
	           */
	        md5blk = function (s) {
	            var md5blks = [],
	                i; /* Andy King said do it this way. */
	    
	            for (i = 0; i < 64; i += 4) {
	                md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
	            }
	            return md5blks;
	        },
	    
	        md5blk_array = function (a) {
	            var md5blks = [],
	                i; /* Andy King said do it this way. */
	    
	            for (i = 0; i < 64; i += 4) {
	                md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
	            }
	            return md5blks;
	        },
	    
	        md51 = function (s) {
	            var n = s.length,
	                state = [1732584193, -271733879, -1732584194, 271733878],
	                i,
	                length,
	                tail,
	                tmp,
	                lo,
	                hi;
	    
	            for (i = 64; i <= n; i += 64) {
	                md5cycle(state, md5blk(s.substring(i - 64, i)));
	            }
	            s = s.substring(i - 64);
	            length = s.length;
	            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	            for (i = 0; i < length; i += 1) {
	                tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
	            }
	            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
	            if (i > 55) {
	                md5cycle(state, tail);
	                for (i = 0; i < 16; i += 1) {
	                    tail[i] = 0;
	                }
	            }
	    
	            // Beware that the final length might not fit in 32 bits so we take care of that
	            tmp = n * 8;
	            tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
	            lo = parseInt(tmp[2], 16);
	            hi = parseInt(tmp[1], 16) || 0;
	    
	            tail[14] = lo;
	            tail[15] = hi;
	    
	            md5cycle(state, tail);
	            return state;
	        },
	    
	        md51_array = function (a) {
	            var n = a.length,
	                state = [1732584193, -271733879, -1732584194, 271733878],
	                i,
	                length,
	                tail,
	                tmp,
	                lo,
	                hi;
	    
	            for (i = 64; i <= n; i += 64) {
	                md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
	            }
	    
	            // Not sure if it is a bug, however IE10 will always produce a sub array of length 1
	            // containing the last element of the parent array if the sub array specified starts
	            // beyond the length of the parent array - weird.
	            // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
	            a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);
	    
	            length = a.length;
	            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	            for (i = 0; i < length; i += 1) {
	                tail[i >> 2] |= a[i] << ((i % 4) << 3);
	            }
	    
	            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
	            if (i > 55) {
	                md5cycle(state, tail);
	                for (i = 0; i < 16; i += 1) {
	                    tail[i] = 0;
	                }
	            }
	    
	            // Beware that the final length might not fit in 32 bits so we take care of that
	            tmp = n * 8;
	            tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
	            lo = parseInt(tmp[2], 16);
	            hi = parseInt(tmp[1], 16) || 0;
	    
	            tail[14] = lo;
	            tail[15] = hi;
	    
	            md5cycle(state, tail);
	    
	            return state;
	        },
	    
	        hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
	    
	        rhex = function (n) {
	            var s = '',
	                j;
	            for (j = 0; j < 4; j += 1) {
	                s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
	            }
	            return s;
	        },
	    
	        hex = function (x) {
	            var i;
	            for (i = 0; i < x.length; i += 1) {
	                x[i] = rhex(x[i]);
	            }
	            return x.join('');
	        },
	    
	        md5 = function (s) {
	            return hex(md51(s));
	        },
	    
	    
	    
	        ////////////////////////////////////////////////////////////////////////////
	    
	        /**
	         * SparkMD5 OOP implementation.
	         *
	         * Use this class to perform an incremental md5, otherwise use the
	         * static methods instead.
	         */
	        SparkMD5 = function () {
	            // call reset to init the instance
	            this.reset();
	        };
	    
	    
	        // In some cases the fast add32 function cannot be used..
	        if (md5('hello') !== '5d41402abc4b2a76b9719d911017c592') {
	            add32 = function (x, y) {
	                var lsw = (x & 0xFFFF) + (y & 0xFFFF),
	                    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	                return (msw << 16) | (lsw & 0xFFFF);
	            };
	        }
	    
	    
	        /**
	         * Appends a string.
	         * A conversion will be applied if an utf8 string is detected.
	         *
	         * @param {String} str The string to be appended
	         *
	         * @return {SparkMD5} The instance itself
	         */
	        SparkMD5.prototype.append = function (str) {
	            // converts the string to utf8 bytes if necessary
	            if (/[\u0080-\uFFFF]/.test(str)) {
	                str = unescape(encodeURIComponent(str));
	            }
	    
	            // then append as binary
	            this.appendBinary(str);
	    
	            return this;
	        };
	    
	        /**
	         * Appends a binary string.
	         *
	         * @param {String} contents The binary string to be appended
	         *
	         * @return {SparkMD5} The instance itself
	         */
	        SparkMD5.prototype.appendBinary = function (contents) {
	            this._buff += contents;
	            this._length += contents.length;
	    
	            var length = this._buff.length,
	                i;
	    
	            for (i = 64; i <= length; i += 64) {
	                md5cycle(this._state, md5blk(this._buff.substring(i - 64, i)));
	            }
	    
	            this._buff = this._buff.substr(i - 64);
	    
	            return this;
	        };
	    
	        /**
	         * Finishes the incremental computation, reseting the internal state and
	         * returning the result.
	         * Use the raw parameter to obtain the raw result instead of the hex one.
	         *
	         * @param {Boolean} raw True to get the raw result, false to get the hex result
	         *
	         * @return {String|Array} The result
	         */
	        SparkMD5.prototype.end = function (raw) {
	            var buff = this._buff,
	                length = buff.length,
	                i,
	                tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	                ret;
	    
	            for (i = 0; i < length; i += 1) {
	                tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
	            }
	    
	            this._finish(tail, length);
	            ret = raw ? this._state : hex(this._state);
	    
	            this.reset();
	    
	            return ret;
	        };
	    
	        /**
	         * Finish the final calculation based on the tail.
	         *
	         * @param {Array}  tail   The tail (will be modified)
	         * @param {Number} length The length of the remaining buffer
	         */
	        SparkMD5.prototype._finish = function (tail, length) {
	            var i = length,
	                tmp,
	                lo,
	                hi;
	    
	            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
	            if (i > 55) {
	                md5cycle(this._state, tail);
	                for (i = 0; i < 16; i += 1) {
	                    tail[i] = 0;
	                }
	            }
	    
	            // Do the final computation based on the tail and length
	            // Beware that the final length may not fit in 32 bits so we take care of that
	            tmp = this._length * 8;
	            tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
	            lo = parseInt(tmp[2], 16);
	            hi = parseInt(tmp[1], 16) || 0;
	    
	            tail[14] = lo;
	            tail[15] = hi;
	            md5cycle(this._state, tail);
	        };
	    
	        /**
	         * Resets the internal state of the computation.
	         *
	         * @return {SparkMD5} The instance itself
	         */
	        SparkMD5.prototype.reset = function () {
	            this._buff = "";
	            this._length = 0;
	            this._state = [1732584193, -271733879, -1732584194, 271733878];
	    
	            return this;
	        };
	    
	        /**
	         * Releases memory used by the incremental buffer and other aditional
	         * resources. If you plan to use the instance again, use reset instead.
	         */
	        SparkMD5.prototype.destroy = function () {
	            delete this._state;
	            delete this._buff;
	            delete this._length;
	        };
	    
	    
	        /**
	         * Performs the md5 hash on a string.
	         * A conversion will be applied if utf8 string is detected.
	         *
	         * @param {String}  str The string
	         * @param {Boolean} raw True to get the raw result, false to get the hex result
	         *
	         * @return {String|Array} The result
	         */
	        SparkMD5.hash = function (str, raw) {
	            // converts the string to utf8 bytes if necessary
	            if (/[\u0080-\uFFFF]/.test(str)) {
	                str = unescape(encodeURIComponent(str));
	            }
	    
	            var hash = md51(str);
	    
	            return raw ? hash : hex(hash);
	        };
	    
	        /**
	         * Performs the md5 hash on a binary string.
	         *
	         * @param {String}  content The binary string
	         * @param {Boolean} raw     True to get the raw result, false to get the hex result
	         *
	         * @return {String|Array} The result
	         */
	        SparkMD5.hashBinary = function (content, raw) {
	            var hash = md51(content);
	    
	            return raw ? hash : hex(hash);
	        };
	    
	        /**
	         * SparkMD5 OOP implementation for array buffers.
	         *
	         * Use this class to perform an incremental md5 ONLY for array buffers.
	         */
	        SparkMD5.ArrayBuffer = function () {
	            // call reset to init the instance
	            this.reset();
	        };
	    
	        ////////////////////////////////////////////////////////////////////////////
	    
	        /**
	         * Appends an array buffer.
	         *
	         * @param {ArrayBuffer} arr The array to be appended
	         *
	         * @return {SparkMD5.ArrayBuffer} The instance itself
	         */
	        SparkMD5.ArrayBuffer.prototype.append = function (arr) {
	            // TODO: we could avoid the concatenation here but the algorithm would be more complex
	            //       if you find yourself needing extra performance, please make a PR.
	            var buff = this._concatArrayBuffer(this._buff, arr),
	                length = buff.length,
	                i;
	    
	            this._length += arr.byteLength;
	    
	            for (i = 64; i <= length; i += 64) {
	                md5cycle(this._state, md5blk_array(buff.subarray(i - 64, i)));
	            }
	    
	            // Avoids IE10 weirdness (documented above)
	            this._buff = (i - 64) < length ? buff.subarray(i - 64) : new Uint8Array(0);
	    
	            return this;
	        };
	    
	        /**
	         * Finishes the incremental computation, reseting the internal state and
	         * returning the result.
	         * Use the raw parameter to obtain the raw result instead of the hex one.
	         *
	         * @param {Boolean} raw True to get the raw result, false to get the hex result
	         *
	         * @return {String|Array} The result
	         */
	        SparkMD5.ArrayBuffer.prototype.end = function (raw) {
	            var buff = this._buff,
	                length = buff.length,
	                tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	                i,
	                ret;
	    
	            for (i = 0; i < length; i += 1) {
	                tail[i >> 2] |= buff[i] << ((i % 4) << 3);
	            }
	    
	            this._finish(tail, length);
	            ret = raw ? this._state : hex(this._state);
	    
	            this.reset();
	    
	            return ret;
	        };
	    
	        SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
	    
	        /**
	         * Resets the internal state of the computation.
	         *
	         * @return {SparkMD5.ArrayBuffer} The instance itself
	         */
	        SparkMD5.ArrayBuffer.prototype.reset = function () {
	            this._buff = new Uint8Array(0);
	            this._length = 0;
	            this._state = [1732584193, -271733879, -1732584194, 271733878];
	    
	            return this;
	        };
	    
	        /**
	         * Releases memory used by the incremental buffer and other aditional
	         * resources. If you plan to use the instance again, use reset instead.
	         */
	        SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
	    
	        /**
	         * Concats two array buffers, returning a new one.
	         *
	         * @param  {ArrayBuffer} first  The first array buffer
	         * @param  {ArrayBuffer} second The second array buffer
	         *
	         * @return {ArrayBuffer} The new array buffer
	         */
	        SparkMD5.ArrayBuffer.prototype._concatArrayBuffer = function (first, second) {
	            var firstLength = first.length,
	                result = new Uint8Array(firstLength + second.byteLength);
	    
	            result.set(first);
	            result.set(new Uint8Array(second), firstLength);
	    
	            return result;
	        };
	    
	        /**
	         * Performs the md5 hash on an array buffer.
	         *
	         * @param {ArrayBuffer} arr The array buffer
	         * @param {Boolean}     raw True to get the raw result, false to get the hex result
	         *
	         * @return {String|Array} The result
	         */
	        SparkMD5.ArrayBuffer.hash = function (arr, raw) {
	            var hash = md51_array(new Uint8Array(arr));
	    
	            return raw ? hash : hex(hash);
	        };
	        
	        return FlashRuntime.register( 'Md5', {
	            init: function() {
	                // do nothing.
	            },
	    
	            loadFromBlob: function( file ) {
	                var blob = file.getSource(),
	                    chunkSize = 2 * 1024 * 1024,
	                    chunks = Math.ceil( blob.size / chunkSize ),
	                    chunk = 0,
	                    owner = this.owner,
	                    spark = new SparkMD5.ArrayBuffer(),
	                    me = this,
	                    blobSlice = blob.mozSlice || blob.webkitSlice || blob.slice,
	                    loadNext, fr;
	    
	                fr = new FileReader();
	    
	                loadNext = function() {
	                    var start, end;
	    
	                    start = chunk * chunkSize;
	                    end = Math.min( start + chunkSize, blob.size );
	    
	                    fr.onload = function( e ) {
	                        spark.append( e.target.result );
	                        owner.trigger( 'progress', {
	                            total: file.size,
	                            loaded: end
	                        });
	                    };
	    
	                    fr.onloadend = function() {
	                        fr.onloadend = fr.onload = null;
	    
	                        if ( ++chunk < chunks ) {
	                            setTimeout( loadNext, 1 );
	                        } else {
	                            setTimeout(function(){
	                                owner.trigger('load');
	                                me.result = spark.end();
	                                loadNext = file = blob = spark = null;
	                                owner.trigger('complete');
	                            }, 50 );
	                        }
	                    };
	    
	                    fr.readAsArrayBuffer( blobSlice.call( blob, start, end ) );
	                };
	    
	                loadNext();
	            },
	    
	            getResult: function() {
	                return this.result;
	            }
	        });
	    });
	    /**
	     * @fileOverview FlashRuntime
	     */
	    define('runtime/flash/runtime',[
	        'base',
	        'runtime/runtime',
	        'runtime/compbase'
	    ], function( Base, Runtime, CompBase ) {
	    
	        var $ = Base.$,
	            type = 'flash',
	            components = {};
	    
	    
	        function getFlashVersion() {
	            var version;
	    
	            try {
	                version = navigator.plugins[ 'Shockwave Flash' ];
	                version = version.description;
	            } catch ( ex ) {
	                try {
	                    version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
	                            .GetVariable('$version');
	                } catch ( ex2 ) {
	                    version = '0.0';
	                }
	            }
	            version = version.match( /\d+/g );
	            return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
	        }
	    
	        function FlashRuntime() {
	            var pool = {},
	                clients = {},
	                destroy = this.destroy,
	                me = this,
	                jsreciver = Base.guid('webuploader_');
	    
	            Runtime.apply( me, arguments );
	            me.type = type;
	    
	    
	            // 这个方法的调用者，实际上是RuntimeClient
	            me.exec = function( comp, fn/*, args...*/ ) {
	                var client = this,
	                    uid = client.uid,
	                    args = Base.slice( arguments, 2 ),
	                    instance;
	    
	                clients[ uid ] = client;
	    
	                if ( components[ comp ] ) {
	                    if ( !pool[ uid ] ) {
	                        pool[ uid ] = new components[ comp ]( client, me );
	                    }
	    
	                    instance = pool[ uid ];
	    
	                    if ( instance[ fn ] ) {
	                        return instance[ fn ].apply( instance, args );
	                    }
	                }
	    
	                return me.flashExec.apply( client, arguments );
	            };
	    
	            function handler( evt, obj ) {
	                var type = evt.type || evt,
	                    parts, uid;
	    
	                parts = type.split('::');
	                uid = parts[ 0 ];
	                type = parts[ 1 ];
	    
	                // console.log.apply( console, arguments );
	    
	                if ( type === 'Ready' && uid === me.uid ) {
	                    me.trigger('ready');
	                } else if ( clients[ uid ] ) {
	                    clients[ uid ].trigger( type.toLowerCase(), evt, obj );
	                }
	    
	                // Base.log( evt, obj );
	            }
	    
	            // flash的接受器。
	            window[ jsreciver ] = function() {
	                var args = arguments;
	    
	                // 为了能捕获得到。
	                setTimeout(function() {
	                    handler.apply( null, args );
	                }, 1 );
	            };
	    
	            this.jsreciver = jsreciver;
	    
	            this.destroy = function() {
	                // @todo 删除池子中的所有实例
	                return destroy && destroy.apply( this, arguments );
	            };
	    
	            this.flashExec = function( comp, fn ) {
	                var flash = me.getFlash(),
	                    args = Base.slice( arguments, 2 );
	    
	                return flash.exec( this.uid, comp, fn, args );
	            };
	    
	            // @todo
	        }
	    
	        Base.inherits( Runtime, {
	            constructor: FlashRuntime,
	    
	            init: function() {
	                var container = this.getContainer(),
	                    opts = this.options,
	                    html;
	    
	                // if not the minimal height, shims are not initialized
	                // in older browsers (e.g FF3.6, IE6,7,8, Safari 4.0,5.0, etc)
	                container.css({
	                    position: 'absolute',
	                    top: '-8px',
	                    left: '-8px',
	                    width: '9px',
	                    height: '9px',
	                    overflow: 'hidden'
	                });
	    
	                // insert flash object
	                html = '<object id="' + this.uid + '" type="application/' +
	                        'x-shockwave-flash" data="' +  opts.swf + '" ';
	    
	                if ( Base.browser.ie ) {
	                    html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
	                }
	    
	                html += 'width="100%" height="100%" style="outline:0">'  +
	                    '<param name="movie" value="' + opts.swf + '" />' +
	                    '<param name="flashvars" value="uid=' + this.uid +
	                    '&jsreciver=' + this.jsreciver + '" />' +
	                    '<param name="wmode" value="transparent" />' +
	                    '<param name="allowscriptaccess" value="always" />' +
	                '</object>';
	    
	                container.html( html );
	            },
	    
	            getFlash: function() {
	                if ( this._flash ) {
	                    return this._flash;
	                }
	    
	                this._flash = $( '#' + this.uid ).get( 0 );
	                return this._flash;
	            }
	    
	        });
	    
	        FlashRuntime.register = function( name, component ) {
	            component = components[ name ] = Base.inherits( CompBase, $.extend({
	    
	                // @todo fix this later
	                flashExec: function() {
	                    var owner = this.owner,
	                        runtime = this.getRuntime();
	    
	                    return runtime.flashExec.apply( owner, arguments );
	                }
	            }, component ) );
	    
	            return component;
	        };
	    
	        if ( getFlashVersion() >= 11.4 ) {
	            Runtime.addRuntime( type, FlashRuntime );
	        }
	    
	        return FlashRuntime;
	    });
	    /**
	     * @fileOverview FilePicker
	     */
	    define('runtime/flash/filepicker',[
	        'base',
	        'runtime/flash/runtime'
	    ], function( Base, FlashRuntime ) {
	        var $ = Base.$;
	    
	        return FlashRuntime.register( 'FilePicker', {
	            init: function( opts ) {
	                var copy = $.extend({}, opts ),
	                    len, i;
	    
	                // 修复Flash再没有设置title的情况下无法弹出flash文件选择框的bug.
	                len = copy.accept && copy.accept.length;
	                for (  i = 0; i < len; i++ ) {
	                    if ( !copy.accept[ i ].title ) {
	                        copy.accept[ i ].title = 'Files';
	                    }
	                }
	    
	                delete copy.button;
	                delete copy.id;
	                delete copy.container;
	    
	                this.flashExec( 'FilePicker', 'init', copy );
	            },
	    
	            destroy: function() {
	                this.flashExec( 'FilePicker', 'destroy' );
	            }
	        });
	    });
	    /**
	     * @fileOverview 图片压缩
	     */
	    define('runtime/flash/image',[
	        'runtime/flash/runtime'
	    ], function( FlashRuntime ) {
	    
	        return FlashRuntime.register( 'Image', {
	            // init: function( options ) {
	            //     var owner = this.owner;
	    
	            //     this.flashExec( 'Image', 'init', options );
	            //     owner.on( 'load', function() {
	            //         debugger;
	            //     });
	            // },
	    
	            loadFromBlob: function( blob ) {
	                var owner = this.owner;
	    
	                owner.info() && this.flashExec( 'Image', 'info', owner.info() );
	                owner.meta() && this.flashExec( 'Image', 'meta', owner.meta() );
	    
	                this.flashExec( 'Image', 'loadFromBlob', blob.uid );
	            }
	        });
	    });
	    /**
	     * @fileOverview  Transport flash实现
	     */
	    define('runtime/flash/transport',[
	        'base',
	        'runtime/flash/runtime',
	        'runtime/client'
	    ], function( Base, FlashRuntime, RuntimeClient ) {
	        var $ = Base.$;
	    
	        return FlashRuntime.register( 'Transport', {
	            init: function() {
	                this._status = 0;
	                this._response = null;
	                this._responseJson = null;
	            },
	    
	            send: function() {
	                var owner = this.owner,
	                    opts = this.options,
	                    xhr = this._initAjax(),
	                    blob = owner._blob,
	                    server = opts.server,
	                    binary;
	    
	                xhr.connectRuntime( blob.ruid );
	    
	                if ( opts.sendAsBinary ) {
	                    server += (/\?/.test( server ) ? '&' : '?') +
	                            $.param( owner._formData );
	    
	                    binary = blob.uid;
	                } else {
	                    $.each( owner._formData, function( k, v ) {
	                        xhr.exec( 'append', k, v );
	                    });
	    
	                    xhr.exec( 'appendBlob', opts.fileVal, blob.uid,
	                            opts.filename || owner._formData.name || '' );
	                }
	    
	                this._setRequestHeader( xhr, opts.headers );
	                xhr.exec( 'send', {
	                    method: opts.method,
	                    url: server,
	                    forceURLStream: opts.forceURLStream,
	                    mimeType: 'application/octet-stream'
	                }, binary );
	            },
	    
	            getStatus: function() {
	                return this._status;
	            },
	    
	            getResponse: function() {
	                return this._response || '';
	            },
	    
	            getResponseAsJson: function() {
	                return this._responseJson;
	            },
	    
	            abort: function() {
	                var xhr = this._xhr;
	    
	                if ( xhr ) {
	                    xhr.exec('abort');
	                    xhr.destroy();
	                    this._xhr = xhr = null;
	                }
	            },
	    
	            destroy: function() {
	                this.abort();
	            },
	    
	            _initAjax: function() {
	                var me = this,
	                    xhr = new RuntimeClient('XMLHttpRequest');
	    
	                xhr.on( 'uploadprogress progress', function( e ) {
	                    var percent = e.loaded / e.total;
	                    percent = Math.min( 1, Math.max( 0, percent ) );
	                    return me.trigger( 'progress', percent );
	                });
	    
	                xhr.on( 'load', function() {
	                    var status = xhr.exec('getStatus'),
	                        readBody = false,
	                        err = '',
	                        p;
	    
	                    xhr.off();
	                    me._xhr = null;
	    
	                    if ( status >= 200 && status < 300 ) {
	                        readBody = true;
	                    } else if ( status >= 500 && status < 600 ) {
	                        readBody = true;
	                        err = 'server';
	                    } else {
	                        err = 'http';
	                    }
	    
	                    if ( readBody ) {
	                        me._response = xhr.exec('getResponse');
	                        me._response = decodeURIComponent( me._response );
	    
	                        // flash 处理可能存在 bug, 没辙只能靠 js 了
	                        // try {
	                        //     me._responseJson = xhr.exec('getResponseAsJson');
	                        // } catch ( error ) {
	                            
	                        p = window.JSON && window.JSON.parse || function( s ) {
	                            try {
	                                return new Function('return ' + s).call();
	                            } catch ( err ) {
	                                return {};
	                            }
	                        };
	                        me._responseJson  = me._response ? p(me._response) : {};
	                            
	                        // }
	                    }
	                    
	                    xhr.destroy();
	                    xhr = null;
	    
	                    return err ? me.trigger( 'error', err ) : me.trigger('load');
	                });
	    
	                xhr.on( 'error', function() {
	                    xhr.off();
	                    me._xhr = null;
	                    me.trigger( 'error', 'http' );
	                });
	    
	                me._xhr = xhr;
	                return xhr;
	            },
	    
	            _setRequestHeader: function( xhr, headers ) {
	                $.each( headers, function( key, val ) {
	                    xhr.exec( 'setRequestHeader', key, val );
	                });
	            }
	        });
	    });
	    /**
	     * @fileOverview Blob Html实现
	     */
	    define('runtime/flash/blob',[
	        'runtime/flash/runtime',
	        'lib/blob'
	    ], function( FlashRuntime, Blob ) {
	    
	        return FlashRuntime.register( 'Blob', {
	            slice: function( start, end ) {
	                var blob = this.flashExec( 'Blob', 'slice', start, end );
	    
	                return new Blob( blob.uid, blob );
	            }
	        });
	    });
	    /**
	     * @fileOverview  Md5 flash实现
	     */
	    define('runtime/flash/md5',[
	        'runtime/flash/runtime'
	    ], function( FlashRuntime ) {
	        
	        return FlashRuntime.register( 'Md5', {
	            init: function() {
	                // do nothing.
	            },
	    
	            loadFromBlob: function( blob ) {
	                return this.flashExec( 'Md5', 'loadFromBlob', blob.uid );
	            }
	        });
	    });
	    /**
	     * @fileOverview 完全版本。
	     */
	    define('preset/all',[
	        'base',
	    
	        // widgets
	        'widgets/filednd',
	        'widgets/filepaste',
	        'widgets/filepicker',
	        'widgets/image',
	        'widgets/queue',
	        'widgets/runtime',
	        'widgets/upload',
	        'widgets/validator',
	        'widgets/md5',
	    
	        // runtimes
	        // html5
	        'runtime/html5/blob',
	        'runtime/html5/dnd',
	        'runtime/html5/filepaste',
	        'runtime/html5/filepicker',
	        'runtime/html5/imagemeta/exif',
	        'runtime/html5/androidpatch',
	        'runtime/html5/image',
	        'runtime/html5/transport',
	        'runtime/html5/md5',
	    
	        // flash
	        'runtime/flash/filepicker',
	        'runtime/flash/image',
	        'runtime/flash/transport',
	        'runtime/flash/blob',
	        'runtime/flash/md5'
	    ], function( Base ) {
	        return Base;
	    });
	    /**
	     * @fileOverview 日志组件，主要用来收集错误信息，可以帮助 webuploader 更好的定位问题和发展。
	     *
	     * 如果您不想要启用此功能，请在打包的时候去掉 log 模块。
	     *
	     * 或者可以在初始化的时候通过 options.disableWidgets 属性禁用。
	     *
	     * 如：
	     * WebUploader.create({
	     *     ...
	     *
	     *     disableWidgets: 'log',
	     *
	     *     ...
	     * })
	     */
	    define('widgets/log',[
	        'base',
	        'uploader',
	        'widgets/widget'
	    ], function( Base, Uploader ) {
	        var $ = Base.$,
	            logUrl = ' http://static.tieba.baidu.com/tb/pms/img/st.gif??',
	            product = (location.hostname || location.host || 'protected').toLowerCase(),
	    
	            // 只针对 baidu 内部产品用户做统计功能。
	            enable = product && /baidu/i.exec(product),
	            base;
	    
	        if (!enable) {
	            return;
	        }
	    
	        base = {
	            dv: 3,
	            master: 'webuploader',
	            online: /test/.exec(product) ? 0 : 1,
	            module: '',
	            product: product,
	            type: 0
	        };
	    
	        function send(data) {
	            var obj = $.extend({}, base, data),
	                url = logUrl.replace(/^(.*)\?/, '$1' + $.param( obj )),
	                image = new Image();
	    
	            image.src = url;
	        }
	    
	        return Uploader.register({
	            name: 'log',
	    
	            init: function() {
	                var owner = this.owner,
	                    count = 0,
	                    size = 0;
	    
	                owner
	                    .on('error', function(code) {
	                        send({
	                            type: 2,
	                            c_error_code: code
	                        });
	                    })
	                    .on('uploadError', function(file, reason) {
	                        send({
	                            type: 2,
	                            c_error_code: 'UPLOAD_ERROR',
	                            c_reason: '' + reason
	                        });
	                    })
	                    .on('uploadComplete', function(file) {
	                        count++;
	                        size += file.size;
	                    }).
	                    on('uploadFinished', function() {
	                        send({
	                            c_count: count,
	                            c_size: size
	                        });
	                        count = size = 0;
	                    });
	    
	                send({
	                    c_usage: 1
	                });
	            }
	        });
	    });
	    /**
	     * @fileOverview Uploader上传类
	     */
	    define('webuploader',[
	        'preset/all',
	        'widgets/log'
	    ], function( preset ) {
	        return preset;
	    });
	    return require('webuploader');
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var tpl = __webpack_require__(119);
	var Dialog = __webpack_require__(22);

	var create = function create(data, options) {
	    var content = tpl(data || {}); // 显示编辑弹窗之前,需要自己拼装数据
	    options = options || {};

	    var defaults = {
	        title: '选择图片',
	        modal: true,
	        fixed: true,
	        content: content,
	        className: 'pop-box',
	        okValue: '插入图片',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        cancalValue: '取消',
	        btnWrapCls: 'insert-cancel'
	        /*function () {
	            // var value = $('#property-returnValue-demo').val();
	            // this.close(value);
	            // this.remove();
	        }*/
	    };
	    $.extend(true, defaults, options);
	    return Dialog(defaults);
	};

	module.exports = {
	    create: create
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/upload/content',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,maxlength=$data.maxlength,$out='';$out+='<div data-node="uploadBox"> <div class="pics-list-wrap clearfix"> <ul class="pics-list clearfix" data-node="uploadList"> <li data-defaultAddFile=\'picker\'></li> </ul> </div> <div class="num-pics">您可以添加 <span class="link-hover-red" data-node="addNum">';
	$out+=$escape(maxlength);
	$out+='</span><span class="deep-gray">/';
	$out+=$escape(maxlength);
	$out+=' </span>张图片</div> </div>';
	return new String($out);
	});

/***/ },

/***/ 123:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * 分享到 微信，QQ，微博，空间
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var getQRCode = __webpack_require__(124);
	var checkLoginStatus = __webpack_require__(47);

	var APIS = {
	    qq: "http://connect.qq.com/widget/shareqq/index.html",
	    sina: "http://v.t.sina.com.cn/share/share.php",
	    qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"
	};

	var defaultInfo = {
	    url: 'http://www.gomeplus.com',
	    title: '国美PlusAPP边玩边分享，购物不孤单',
	    pic: 'http://www.gomeplus.com/images/logo.png', // logo图片地址
	    summary: '国美PlusAPP边玩边分享，购物不孤单'
	};

	var open = function open(url) {
	    window.open(url);
	};

	// 分享按钮渲染
	var hasShareBtnsHTML = false;
	var initShareBtns = function initShareBtns() {
	    var shareBtns = '<p data-node="shareBtnBox" class="share-down" style="z-index:21;"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" class="iconn-30"></em><em data-shareto="qq" class="iconn-32"></em><em data-shareto="sina" class="iconn-31"></em><em data-shareto="qzone" class="iconn-33"></em></span></span></p>';
	    $('body').append(shareBtns);
	    hasShareBtnsHTML = true;
	};
	var showShareToBtns = function showShareToBtns(style) {
	    !hasShareBtnsHTML && initShareBtns();
	    $('[data-node=shareBtnBox]').css({
	        left: style.x,
	        top: style.y
	    }).show();
	};

	// 微信弹层渲染
	var hasWeixinHTML = false;
	var initWeixinHTML = function initWeixinHTML() {

	    var weixinBox = '<div class="share-weixin"><div class="wx-mask"></div><div class="wx-main"><div class="wx-code"><span></span><img data-node="shareWeixinCode" alt="分享到微信" /></div><p>打开微信扫一扫，即可分享</p><a href="javascript:;" title="点击关闭" class="wx-close">×</a></div></div>';
	    $('body').append(weixinBox);
	    hasWeixinHTML = true;
	};

	// pics: 图片参数是否为pics，默认是pic。
	var formatParams = function formatParams(p, pics) {
	    var s = [];
	    var data = {
	        title: p.title,
	        url: p.url,
	        summary: p.summary,
	        desc: p.desc,
	        site: p.site
	    };
	    if (pics) {
	        data.pics = p.pic;
	    } else {
	        data.pic = p.pic;
	    }
	    for (var i in data) {
	        s.push(i + '=' + encodeURIComponent(data[i] || ''));
	    }
	    return s.join('&');
	};

	// 单个调用方法
	// 分享的图片多个用||隔开。
	var shareTo = {
	    weixin: function weixin(options) {
	        var link = getQRCode(options.url);
	        !hasWeixinHTML && initWeixinHTML();

	        $('[data-node=shareWeixinCode]')[0].src = link;
	        $('.share-weixin').show();
	        $('.wx-close').on('click', function () {
	            $('.share-weixin').hide();
	        });
	    },
	    qq: function qq(options) {
	        var link = APIS.qq + '?' + formatParams(options, true);
	        open(link);
	    },
	    sina: function sina(options) {
	        var link = APIS.sina + '?' + formatParams(options);
	        open(link);
	    },
	    qzone: function qzone(options) {
	        var link = APIS.qzone + '?' + formatParams(options, true);
	        open(link);
	    }
	};

	// share with kid
	var shareWithKid = function shareWithKid(args) {
	    var isRebate = args.isRebate === '0' ? false : true;
	    fetch.get(url.get('shareGetGoodsKid'), {
	        validate: isRebate,
	        data: {
	            skuId: args.skuId,
	            itemId: args.itemId,
	            parentKid: args.parentKid
	        },
	        async: false // 防止新窗口被拦截
	    }).done(function (data) {
	        if (data.success === true) {
	            var kid = data.data.kid;
	            var shareInfo = args.shareInfo;
	            // 替换分享链接
	            // 规则：mall_domain+product/shopid-productId.html?onlineUserId=xxxx&kid=xxxx
	            var url = shareInfo.url;
	            var index = url.indexOf('?');
	            if (index > 0) {
	                url = url.substring(0, index);
	            }
	            shareInfo.url = url + '?onlineUserId=' + shareInfo.onlineUserId + '&kId=' + kid;
	            shareTo[args.shareto](shareInfo);
	        } else {
	            shareTo[args.shareto](args.shareInfo);
	        }
	    }).fail(function (data) {
	        if (isRebate) {
	            if (checkLoginStatus()) {
	                shareTo[args.shareto](args.shareInfo);
	            }
	        } else {
	            shareTo[args.shareto](args.shareInfo);
	        }
	    });
	};

	// 统一方法
	var go = function go(obj) {
	    // {type:x,title:x,url:x,pic:x}
	    var info = {
	        title: obj.title || defaultInfo.title,
	        url: obj.url || defaultInfo.url,
	        pic: obj.pic || defaultInfo.pic,
	        summary: obj.summary || '',
	        desc: obj.desc || ''
	    };

	    !!shareTo[obj.type] && shareTo[obj.type](info);
	};

	/**
	 * 简化分享
	 * @param  {str} [parent] [容器节点]
	 * @param {str} [selector] [子节点选择器]
	 */
	var shareItem = function shareItem(parent, selector, beforeShare) {
	    var shareInfo = null;
	    $item = typeof parent === 'string' ? $(parent) : parent;
	    selector = selector || '[data-action=shareto]';
	    // 显示分享按钮
	    $item.on('mouseenter', selector, function (e) {
	        var shareUrl = $(this).data('surl');
	        var shareTitle = $(this).data('stitle');
	        var sharePic = $(this).data('spic');

	        shareInfo = {
	            url: shareUrl,
	            title: shareTitle,
	            pic: sharePic
	        };

	        var pw = $(this).width();
	        var ph = $(this).height();
	        var px = $(this).offset().left / 1 + pw / 2 - 80 + 'px';
	        var py = $(this).offset().top / 1 + (ph - 1) + 'px';

	        showShareToBtns({
	            x: px,
	            y: py
	        });
	        return false;
	    });
	    // 隐藏分享按钮
	    $item.on('mouseleave', selector, function (e) {
	        $('[data-node=shareBtnBox]').hide();
	        return false;
	    });

	    $('body').on('click', '[data-shareto]', function (e) {
	        e.preventDefault();
	        shareType = $(this).data('shareto');
	        shareInfo.type = shareType;
	        beforeShare = beforeShare || function () {};
	        beforeShare.call(null, shareInfo);
	        // console.log(shareInfo);
	        go(shareInfo);
	    });

	    $('body').on('mouseenter', '[data-node=shareBtnBox]', function () {
	        $(this).show();
	    });
	    $('body').on('mouseleave', '[data-node=shareBtnBox]', function () {
	        $(this).hide();
	    });
	};

	module.exports = {
	    share: go,
	    shareto: shareTo,
	    shareItem: shareItem,
	    shareWithKid: shareWithKid
	};

	/**
	 * 分享到 使用说明
	 * 在[data-action=shareto]节点上输出要获取的数据 
	 * data-surl,data-stitle,data-spic
	 * url要是绝对地址，带https?://的
	 * pic是要分享的图片绝对地址，多张图片用||隔开。
	 *
	 * 页面中在分享按钮加 [data-action=shareto] 自定义属性；
	 * 如果是分享当前页面的也要加shareInfo,值为当前页面对应的信息。格式都一样。
	 *
	 * 调用方法:
	 * var share = require(..);
	 * share.shareItem(要分享的区域父节点字符串e.g. 'data-node=shareList');
	 *
	 * shareto.weixin({shareInfo})
	 * shareto.qq({shareInfo})
	 * shareto.sina({shareInfo})
	 * shareto.qzone({shareInfo})
	 *
	 *
	 * share.share({shareInfo});这个shareInfo里要有type：[weixin,qq,sina,qzone]
	 */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	// 根据字符串生成二维码
	var getQRCode = function getQRCode(url) {
		return $_CONFIG.wap_url + 'q.php?t=' + encodeURIComponent(url);
	};

	module.exports = getQRCode;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	/***
	 * upload.js
	 * @author zhaodonghong
	 * @params                      object      上传图片参数
	 *     maxlength               number      可上传图片最大张数
	 *     selector                object      jq选择器
	 *         parents             string      每个图片上传外层jq选择器
	 *         delSelector         string      删除按钮jq选择器
	 *         selector            string      实例化上传插件的pick.id的值
	 *     defaultApi              object      实例化webuploader参数
	 *     callbacks               object      实例化webuploader方法回调集合
	 *         onBeforeFileQueued  function    上传图片添加到上传队列之前
	 *         onFileQueued        function    上传图片添加到上传队列后
	 *         onUploadSuccess     function    上传成功
	 *         onUploadError       function    上传失败
	 *         onUploadProgress    function    上传中
	 *         onErrored           function    报错
	 *         retry               function    重新上传 
	 *         delImage            function    删除上传图片
	 */

	var WebUploader = __webpack_require__(115);
	var hint = __webpack_require__(87);
	var notice = __webpack_require__(36);

	var init = function init(options) {

	    //var number = maxlength;
	    var numList = {};
	    var $webUpLoader;
	    var files = {};
	    var defaultOptions = {
	        //最大上传张数
	        maxlength: 9,
	        //选择器
	        selector: {
	            parents: '[data-node="uploadList"]', //每个图片上传外层jq选择器
	            delSelector: '[data-action="delImage"]', //删除按钮jq选择器
	            selector: '[data-defaultAddFile=picker]' //初始化时options.defaultApi.pick 的值，也就是 选择器的值
	        }
	    };
	    //初始化参数
	    defaultOptions.defaultApi = {
	        pick: {
	            id: '[data-defaultAddFile=picker]',
	            innerHTML: '<a href="javascript:;"><em class="iconn-50"></em></a>'
	        },
	        accept: {
	            title: 'Images',
	            extensions: 'jpg,jpeg,png',
	            mimeTypes: 'image/*'
	        },
	        method: 'post',
	        // swf文件路径
	        swf: $_CONFIG.imgpath + '/images/swf/Uploader.swf',
	        auto: true,
	        disableGlobalDnd: true,
	        duplicate: true,
	        prepareNextFile: true,
	        chunked: true,
	        fileVal: 'avatar_file',
	        server: '/ajax/crop/crop_img',
	        fileNumLimit: defaultOptions.maxlength * $(defaultOptions.selector).length,
	        fileSizeLimit: defaultOptions.maxlength * $(defaultOptions.selector).length * 4 * 1024 * 1024, // 50 M
	        fileSingleSizeLimit: 4 * 1024 * 1024
	    };
	    defaultOptions.callbacks = {
	        /***
	         * name: 图片加入队列之前
	         * file: 图片信息对象
	         * numList: 以 file.source.ruid 为key的计数json对象
	         * number: 最多可上传数
	         */
	        onBeforeFileQueued: function onBeforeFileQueued() /*file, numList, number*/{
	            hint.init(notice.upload.excess);
	        },

	        /***
	         * name: 图片添加入队列后
	         * file: 图片信息对象
	         * numList: 以 file.source.ruid 为key的计数json对象
	         * maxlength: 最多可上传数
	         */
	        onFileQueued: function onFileQueued(file, numList, number) {
	            var html = '<li id="' + file.id + '">' + '<div class="bar-upload-pic"><span data-node="progress"></span></div>' + '</li>';
	            $('#rt_' + file.source.ruid).parents('[data-defaultaddfile="picker"]').before(html);

	            $('#rt_' + file.source.ruid).parents('[data-node="uploadBox"]').find('[data-node="addNum"]').text(number - numList[file.source.ruid]);

	            if (numList[file.source.ruid] === ~~number) {
	                $('#rt_' + file.source.ruid).parents('[data-defaultaddfile="picker"]').hide();
	            }
	        },

	        /***
	         * name: 上传成功（此成功指ajax有返回结果，故需要判断返回的状态码）
	         * file: 图片信息对象
	         * response: 上传图片ajax返回数据
	         */
	        onUploadSuccess: function onUploadSuccess(file, response) {
	            if (response.code === 200 && response.success) {
	                $('#' + file.id).html('<img src="' + response.data[0] + '" alt=""><a href="javascript:;"><em class="iconn-66" data-action="delImage"></em></a>');
	            } else {
	                $('#' + file.id).html('<a href="javascript:;" class="re-upload" data-action="retry">重新上传</a><a href="javascript:;"><em class="iconn-66" data-action="delImage"></em></a>');
	            }
	        },

	        /***
	         * name: 上传失败
	         * file: 图片信息对象
	         * reason: 出错的code
	         */
	        onUploadError: function onUploadError(file /*, reason*/) {
	            $('#' + file.id).html('<a href="javascript:;" class="re-upload" data-action="retry">重新上传</a><a href="javascript:;"><em class="iconn-66" data-action="delImage"></em></a>');
	        },

	        /***
	         * name: 上传时，包含进度条
	         * file: 图片信息对象
	         * percentage: 上传进度
	         */
	        onUploadProgress: function onUploadProgress(file, percentage) {
	            $('#' + file.id).find('[data-node="progress"]').css('width', percentage * 100 + '%');
	        },

	        /***
	         * name: 报错
	         * type: 报错类型
	         */
	        onErrored: function onErrored() /*type*/{
	            hint.init(notice.upload.uploadError);
	        },

	        //重新上传 
	        retry: function retry() {
	            var _this = this;
	            $('[data-node="uploadList"]').on('click', '[data-action="retry"]', function () {
	                _this.retry(files[$(this).parents('li').attr('id')]);
	            });
	        },

	        /***
	         * name: 删除图片
	         * webuploader: webuploader实例化对象
	         * numList: 自定义json对象，用来存储每个实例化对象已上传的图片个数
	         * id: 每个webuploader实例化时，上传按钮所生成的唯一id
	         */
	        delImage: function delImage(webuploader, numList, id, number) {
	            $webUpLoader.removeFile(files[$(this).parents('li').attr('id')]);
	            $(this).parents('[data-node="uploadBox"]').find('[data-node="addNum"]').text(number - numList[id]);
	            $(this).parents('ul').find('[data-defaultAddFile="picker"]').show();
	            $(this).parents('li').eq(0).remove();
	        }
	    };
	    options.callbacks = $.extend({}, defaultOptions.callbacks, options.callbacks);
	    /*var */options = $.extend({}, defaultOptions, options);
	    $webUpLoader = WebUploader.create(options.defaultApi);

	    $webUpLoader.onFileQueued = function (file) {
	        numList[file.source.ruid] = numList[file.source.ruid] !== undefined ? numList[file.source.ruid] : 0;
	        numList[file.source.ruid]++;
	        files[file.id] = file;
	        options.callbacks.onFileQueued.call($webUpLoader, file, numList, options.maxlength);
	    };

	    //上传成功  
	    $webUpLoader.on('uploadSuccess', function (file, response) {
	        options.callbacks.onUploadSuccess.call($webUpLoader, file, response);
	    });

	    //加入队列前
	    $webUpLoader.on('beforeFileQueued', function (file) {
	        if (numList[file.source.ruid] >= options.maxlength) {
	            options.callbacks.onBeforeFileQueued.call($webUpLoader, file, numList, options.maxlength);
	            return false;
	        }
	    });
	    //上传失败  
	    $webUpLoader.on('uploadError', function (file, reason) {
	        options.callbacks.onUploadError.call($webUpLoader, file, reason);
	    });

	    //上传时
	    $webUpLoader.on('uploadProgress', function (file, percentage) {
	        options.callbacks.onUploadProgress.call($webUpLoader, file, percentage);
	    });

	    //报错
	    $webUpLoader.on('error', function (type) {
	        options.callbacks.onErrored.call($webUpLoader, type);
	    });
	    options.callbacks.retry.call($webUpLoader);

	    //删除图片
	    $(options.selector.parents).on('click', options.selector.delSelector, function () {
	        var id = $(this).parents(options.selector.parents).find(options.defaultApi.pick.id).children().eq(1).attr('id').substr(3);
	        numList[id]--;
	        options.callbacks.delImage.call(this, $webUpLoader, numList, id, options.maxlength);
	    });

	    return $webUpLoader;
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var dialog = __webpack_require__(138);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var Pubsub = __webpack_require__(48);
	var tpl = __webpack_require__(139);
	var itemlist = __webpack_require__(140);
	var defaultItemlist = __webpack_require__(141);
	var pubName = __webpack_require__(71);
	var indexof = __webpack_require__(5);
	var alert = __webpack_require__(37);

	var pageNum = 1;
	var maxlength = 9;
	var isDefault = true;
	var keyWord = '';
	var changedList = [];
	var isGetMore = false;
	var options = {};
	var degree = 1;
	// var delChanged = [];
	var addDialog;

	var $searchTop = null,
	    $searchInput = null,
	    $searchBtn = null,
	    $searchNormal = null,
	    $searchLoading = null,
	    $searchFail = null,
	    $searchResult = null,
	    $searchList = null,

	// $searchPage = null,
	$changeNum = null,
	    $listBox = null,
	    $changeList = null,
	    $title = null,
	    $getMore = null,
	    $searchListBox = null;

	var selectedGoods = {};

	var init = function init(changedGoods, max /* 最多可选 */) {
	    var returnList = [];
	    selectedGoods = {};
	    // var selectedGoodsBak = {};
	    for (var i in changedGoods) {
	        changedList.push(~~i);
	        returnList.push(changedGoods[i]);
	    }

	    maxlength = max || 9;
	    selectedGoods = $.extend(true, selectedGoods, changedGoods);
	    if (maxlength - returnList.length !== 0) {
	        options = {
	            title: ' ',
	            modal: true,
	            fixed: true,
	            width: 610,
	            content: tpl({
	                imgSrc: $_CONFIG.imgpath,
	                returnList: returnList,
	                maxlength: maxlength - returnList.length
	            }),
	            className: 'pop-box',
	            okValue: '插入商品',
	            okCls: 'pc-btn pc-btnh35 circle-pop-btn btn-default',
	            btnWrapCls: 'insert-cancel',
	            ok: function ok() {
	                if ($(this.node).find('[i-id=ok]').hasClass('btn-default')) {
	                    return false;
	                }
	                Pubsub(pubName.setPubliser.changedItem).pub(selectedGoods);
	                dialogClosed();
	            },
	            cancel: function cancel() {
	                dialogClosed();
	            },
	            onshow: function onshow() {

	                $('[i="title"]').hide();
	                getNode(); //获取节点
	                defaultItem(pageNum); //默认输出内容
	                searchItem(); //搜索商品
	                reGet(); //重新获取
	                changeItem(); //选择添加的商品
	                getMoreItem(); //加载 更多
	                $('body').css({
	                    height: '100%',
	                    overflowY: 'hidden'
	                });
	            }
	        };
	    } else {
	        options = {};
	    }

	    addDialog = dialog.create(options);
	    addDialog.show();
	};
	//获取节点
	var getNode = function getNode() {
	    $searchTop = $('[data-node="addTopBox"]');
	    $searchInput = $searchTop.find('[data-action="addSearchInput"]');
	    $searchBtn = $searchTop.find('[data-action="addSearchBtn"]');
	    $searchNormal = $('[data-node="searchNormal"]');
	    $searchLoading = $('[data-node="searchLoading"]');
	    $searchFail = $('[data-node="searchFail"]');
	    $searchResult = $('[data-node="searchResultBox"]');
	    $searchList = $searchResult.find('[data-node="searchResultList"]');
	    $listBox = $searchResult.find('[data-node="changedBox"]');
	    $changeList = $listBox.find('[data-node="searchChangeList"]');
	    $changeNum = $searchResult.find('[data-node="searchChangeNum"]');
	    $title = $('[data-node="title"]'), $getMore = $searchResult.find('[data-action="moreItem"]');
	    $searchListBox = $searchList.parent();
	};

	//初始化进弹窗获取数据
	var defaultItem = function defaultItem(pageNum) {
	    getItems(url.get('getCollectItem'), {
	        data: {
	            page: pageNum,
	            pagesize: 10
	        },
	        done: function done(result) {
	            var html = defaultItemlist({
	                itemlist: result.data.collections,
	                changedList: changedList,
	                indexof: indexof
	            });
	            if (pageNum === 1) {
	                $searchList.html(html);
	            } else {
	                $searchList.append(html);
	            }
	        }
	    });
	};

	//搜索 商品
	var searchItem = function searchItem() {
	    $searchInput.on('keyup', function (e) {
	        var keycode = e.which;
	        isDefault = false;
	        isGetMore = false;
	        keyWord = $.trim($(this).val());
	        //处理回车的情况 
	        if (keycode === 13) {
	            if (keyWord !== '') {
	                if (keyWord.length < 2) {
	                    alert('请输入两个字符以上关键词');
	                } else {
	                    pageNum = 1;
	                    $title.hide();
	                    $getMore.find('span').html('<img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...');
	                    moreItem(pageNum, keyWord);
	                }
	            } else {
	                alert('请输入关键词');
	            }
	        }
	        //返回我收藏的商品列表
	        if (keyWord === '') {
	            $searchResult.children().eq(0).hide();
	            isDefault = true;
	            pageNum = 1;
	            $title.show();
	            defaultItem(pageNum); //默认输出内容
	        }
	    });
	    $searchBtn.on('click', function () {
	        isDefault = false;
	        isGetMore = false;
	        keyWord = $.trim($(this).prev().val());

	        if (keyWord !== '') {
	            if (keyWord.length < 2) {
	                alert('请输入两个字符以上关键词');
	            } else {
	                $getMore.find('span').html('<img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...');
	                pageNum = 1;
	                $title.hide();
	                moreItem(pageNum, keyWord);
	            }
	        } else {
	            alert('请输入关键词');
	        }
	    });
	};

	//获取更多商品

	var moreItem = function moreItem(pageNum, txt) {
	    getItems(url.get('getMoreItem'), {
	        data: {
	            pagenum: pageNum,
	            pagesize: 10,
	            word: txt
	        },
	        done: function done(result) {
	            var html = itemlist({
	                itemlist: result.data.items,
	                changedList: changedList,
	                indexof: indexof
	            });
	            if (result.pageCount != "1") {
	                $getMore.addClass("hide");
	            }
	            if (pageNum === 1) {
	                $searchList.html(html);
	            } else {
	                $searchList.append(html);
	            }
	        }
	    });
	};

	//ajax
	var getItems = function getItems(link, options) {
	    if (pageNum === 1) {
	        $searchList.hide();
	        $searchFail.hide();
	        $searchLoading.show();
	        $searchNormal.hide();
	    } else {
	        $getMore.show();
	    }
	    fetch.get(link, {
	        data: options.data
	    }).done(function (result) {

	        if (result.code === 200) {
	            var resultItem = result.data.collections === undefined ? result.data.items : result.data.collections;
	            if (resultItem.length === 0 && isDefault) {
	                if (pageNum === 1) {
	                    $searchNormal.show().text('暂无收藏的商品，可以搜索查找！');
	                } else {
	                    $getMore.show().find('span').text('没有可加载内容');
	                }
	            } else if (resultItem.length === 0) {
	                if (pageNum === 1) {
	                    $searchNormal.show().text('没有找到相关产品');
	                    $searchResult.children().eq(0).hide();
	                } else {
	                    $getMore.show().find('span').text('没有可加载内容');
	                }
	            } else {
	                $searchResult.show().children().eq(0).show();
	                $searchList.show();
	                options.done.call(this, result);
	                $getMore.hide();
	                isGetMore = false;

	                if (resultItem.length < 10 && pageNum !== 1) {

	                    isGetMore = true;
	                    $getMore.show().find('span').text('没有可加载内容');
	                }
	            }

	            // 重新定位弹窗位置
	            addDialog.reset();
	        } else if (result.code === 881001) {
	            if (pageNum === 1) {
	                $searchNormal.show().text('没有找到相关产品');
	                $searchResult.children().eq(0).hide();
	            } else {
	                $getMore.show().find('span').text('没有可加载内容');
	            }
	        } else {
	            if (pageNum === 1) {
	                $searchFail.show();
	            } else {
	                $getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
	            }
	        }
	    }).fail(function () {
	        if (pageNum === 1) {
	            $searchFail.show();
	        } else {
	            $getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
	        }
	    }).always(function () {
	        $searchLoading.hide();
	    });
	};

	//重新获取
	var reGet = function reGet() {
	    $searchFail.on('click', function () {
	        if (pageNum === 1) {
	            $searchLoading.show();
	            $searchFail.hide();
	            if (isDefault) {
	                defaultItem(pageNum);
	            } else {
	                moreItem(pageNum, keyWord);
	            }
	        }
	    });
	    $getMore.on('click', '[node-action="reget"]', function () {
	        $(this).parent().html('<img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...');
	        if (isDefault) {
	            defaultItem(pageNum);
	        } else {
	            moreItem(pageNum, keyWord);
	        }
	    });
	};

	var changeItem = function changeItem() {
	    if ($changeList.children().length) {
	        $('[i-id=ok]').removeClass('btn-default');
	    }
	    $searchResult.on('click', '[data-action="item"]', function () {
	        var $this = $(this);
	        var imgSrc = $this.find('img').attr('src'),
	            pId = $this.attr('data-pId'),
	            shopId = $this.attr('data-shopid'),
	            html = '';
	        if (maxlength == 1) {
	            if ($changeList.children().length) {
	                $changeList.empty();
	                $searchList.children("dl").removeClass("chosed-mer-true");
	            }
	            $this.addClass("chosed-mer-true");

	            if ($changeList.children().length === 0) {
	                $listBox.show();
	            }
	            selectedGoods = {};
	            selectedGoods[pId] = {
	                shopId: shopId,
	                PId: pId,
	                title: $(this).find('[node-data="itemTitle"]').text(),
	                img: imgSrc,
	                price: $(this).find('[node-data="itemPrice"]').text(),
	                link: $_CONFIG.mall_domain + 'product/' + $(this).attr('data-shopId') + '-' + pId + '.html'
	            };
	            html = '<li data-pId="' + pId + '" data-degree="' + degree + '"><img src="' + imgSrc + '" alt=""><a href="javascript:;" data-action="delChanged"><em class="iconn-66"></em></a></li>';

	            $changeList.append(html);
	            $changeNum.text(maxlength - $changeList.children().length);
	        } else {

	            if (!$(this).hasClass('chosed-mer-true')) {
	                if ($changeList.children().length >= maxlength) {
	                    alert('最多可选取' + maxlength + '个商品');
	                    return false;
	                }

	                changedList.push(~~pId);
	                selectedGoods[pId] = {
	                    shopId: shopId,
	                    PId: pId,
	                    title: $(this).find('[node-data="itemTitle"]').text(),
	                    img: imgSrc,
	                    price: $(this).find('[node-data="itemPrice"]').text(),
	                    link: $_CONFIG.mall_domain + 'product/' + $(this).attr('data-shopId') + '-' + pId + '.html'
	                };
	                $(this).addClass('chosed-mer-true');
	                html = '<li data-pId="' + pId + '" data-degree="' + degree + '"><img src="' + imgSrc + '" alt=""><a href="javascript:;" data-action="delChanged"><em class="iconn-66"></em></a></li>';
	                if ($changeList.children().length === 0) {
	                    $listBox.show();
	                }
	                $changeList.append(html);
	                $changeNum.text(maxlength - $changeList.children().length);
	            } else {
	                var pId = $(this).attr('data-pId'),
	                    del = $changeList.find('[data-pid="' + pId + '"]') /*,
	                                                                       index = $changeList.children().index(del)*/;

	                $(this).removeClass('chosed-mer-true');
	                del.remove();
	                /*delChanged.push(returnList[index]);
	                changedList.splice(index, 1);
	                returnList.splice(index, 1);*/
	                delete selectedGoods[pId];
	                if ($changeList.children().length === 0) {
	                    $listBox.hide();
	                }
	                $changeNum.text(maxlength - $changeList.children().length);
	            }
	        }

	        if ($changeList.children().length) {
	            $('[i-id=ok]').removeClass('btn-default');
	        } else {
	            $('[i-id=ok]').addClass('btn-default');
	        }

	        addDialog.reset();
	    }).on('click', '[data-action="delChanged"]', function () {
	        var pId = $(this).closest('li').data('pid');
	        var /*index = $changeList.children().index($(this).parents('li')),*/
	        _this = this;
	        $searchList.find('[data-pId="' + $(_this).parent().attr('data-pId') + '"]').removeClass('chosed-mer-true');

	        $(_this).parents('li').remove();
	        /*delChanged.push(returnList[index]);
	        changedList.splice(index, 1);
	        returnList.splice(index, 1);*/
	        delete selectedGoods[pId];
	        if ($changeList.children().length === 0) {
	            $listBox.hide();
	        }
	        $changeNum.text(maxlength - $changeList.children().length);
	        if (!$changeList.children().length) {
	            $('[i-id=ok]').addClass('btn-default');
	        }
	    });
	};

	//加载更多
	var getMoreItem = function getMoreItem() {
	    $searchListBox.on('scroll', function () {
	        if (!isGetMore && $searchListBox.scrollTop() === $searchList.height() - $searchListBox.height()) {
	            isGetMore = true;
	            pageNum++;
	            if (isDefault) {
	                defaultItem(pageNum);
	            } else {
	                moreItem(pageNum, keyWord);
	            }
	        }
	    });
	};

	//弹窗关闭
	var dialogClosed = function dialogClosed() {
	    degree++;
	    $('body').css({
	        height: 'auto',
	        overflowY: 'auto'
	    });

	    $searchListBox.off('scroll');
	    $searchResult.off('click');
	    $searchFail.off('click');
	    $searchInput.off('keyup');
	    $searchBtn.off('click');
	    pageNum = 1;
	    // delChanged = [];
	    isDefault = true;
	    keyWord = '';
	    isGetMore = false;
	    changedList = [];
	};

	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Dialog = __webpack_require__(22);

	var create = function create(options) {
	    options = options || {};
	    var defaults = {
	        title: ' ',
	        modal: true,
	        fixed: true,
	        width: 350,
	        content: '<p class="del-pop-p">您最多能添加9个商品哦！</p>',
	        className: 'pop-box',
	        okValue: '确定',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        ok: function ok() {},
	        onshow: function onshow() {
	            $('[i="title"]').hide();
	        }
	    };
	    $.extend(true, defaults, options);
	    return Dialog(defaults);
	};

	module.exports = {
	    create: create
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 139:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/addGoods/content',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,imgSrc=$data.imgSrc,returnList=$data.returnList,$each=$utils.$each,$value=$data.$value,$index=$data.$index,maxlength=$data.maxlength,$out='';$out+=' <div class="search-box" data-node="addTopBox"> <input type="text" placeholder="搜索商品" data-action="addSearchInput"> <em class="iconn-3" data-action="addSearchBtn"></em> </div> <div class="ui-dialog-title" data-node="title">我收藏的商品</div> <p class="no-saving-txt" style="display:none;" data-node="searchNormal">暂无收藏的商品，可以搜索查找！</p> <div class="loading" data-node="searchLoading"><img src="';
	$out+=$escape(imgSrc);
	$out+='/images/public/loading.gif" alt=""></div> <p class="failed-txt" style="display:none;" data-node="searchFail">数据获取失败，点击重新加载！</p> <div style="display:';
	$out+=$escape((returnList.length === 0 ? 'none':''));
	$out+=';" data-node="searchResultBox"> <div class="merchant-list clearfix" > <div class="clearfix" data-node="searchResultList"></div> <div class="more-comments pop-more-com" data-action="moreItem" style="display:none;"> <span><img src="';
	$out+=$escape(imgSrc);
	$out+='/images/public/loading.gif">正在加载...</span> </div> </div> <div class="chosed-merchants" data-node="changedBox" style="display:';
	$out+=$escape((returnList.length>0?'':'none'));
	$out+='"> <ul class="merchants-list clearfix" data-node="searchChangeList"> ';
	$each(returnList,function($value,$index){
	$out+=' <li data-pid="';
	$out+=$escape($value.PId);
	$out+='"> <img src="';
	$out+=$escape($value.img);
	$out+='" alt=""> <a href="javascript:;" data-action="delChanged"> <em class="iconn-66"></em> </a> </li> ';
	});
	$out+=' </ul> </div> <div class="num-pics">您可以添加 <span class="link-hover-red" data-node="searchChangeNum">';
	$out+=$escape(maxlength);
	$out+='</span><span class="deep-gray">/';
	$out+=$escape(maxlength);
	$out+=' </span>个商品</div> </div>';
	return new String($out);
	});

/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/addGoods/itemContent',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,itemlist=$data.itemlist,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,indexof=$data.indexof,changedList=$data.changedList,$out='';$each(itemlist,function($value,$index){
	$out+=' <dl class="merchant-item clearfix ';
	$out+=$escape((indexof(changedList,$value.id) !== -1 ? 'chosed-mer-true':''));
	$out+='" data-action="item" data-pId="';
	$out+=$escape($value.id);
	$out+='" data-shopId="';
	$out+=$escape($value.shopId);
	$out+='"> <dt><img onerror="imgError(this, \'m\')" src=';
	$out+=$escape($value.mainImage);
	$out+=' alt=""></dt> <dd> <h4 node-data="itemTitle">';
	$out+=$escape($value.name);
	$out+='</h4><span><em>￥</em><span node-data="itemPrice">';
	$out+=$escape($value.salePrice);
	$out+='</span></span> </dd> </dl> ';
	});
	return new String($out);
	});

/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/addGoods/defaultItemContent',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,itemlist=$data.itemlist,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,indexof=$data.indexof,changedList=$data.changedList,$out='';$each(itemlist,function($value,$index){
	$out+=' <dl class="merchant-item clearfix ';
	$out+=$escape((indexof(changedList,$value.item.id) !== -1 ? 'chosed-mer-true':''));
	$out+='" data-action="item" data-pId="';
	$out+=$escape($value.item.id);
	$out+='" data-shopId="';
	$out+=$escape($value.shopId);
	$out+='" > <dt><img src=';
	$out+=$escape($value.item.mainImage);
	$out+=' alt=""></dt> <dd> <h4 node-data="itemTitle">';
	$out+=$escape($value.item.name);
	$out+='</h4><span><em>￥</em><span node-data="itemPrice">';
	$out+=$escape($value.item.price);
	$out+='</span></span> </dd> </dl> ';
	});
	return new String($out);
	});

/***/ },

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	var imgPath = $_CONFIG.imgpath + '/images/emoji/';

	var ext = '.png';

	var groupOne = [{
	    name: '微笑',
	    url: 'weixiao'
	}, {
	    name: '色',
	    url: 'se'
	}, {
	    name: '亲亲',
	    url: 'qinqin'
	}, {
	    name: '得意',
	    url: 'deyi'
	}, {
	    name: '流泪',
	    url: 'liulei'
	}, {
	    name: '害羞',
	    url: 'haixiu'
	}, {
	    name: '闭嘴',
	    url: 'bizui'
	}, {
	    name: '鼓掌',
	    url: 'guzhang'
	}, {
	    name: '大哭',
	    url: 'daku'
	}, {
	    name: '尴尬',
	    url: 'ganga'
	}, {
	    name: '生气',
	    url: 'shengqi'
	}, {
	    name: '调皮',
	    url: 'tiaopi'
	}, {
	    name: '呲牙',
	    url: 'ciya'
	}, {
	    name: '惊讶',
	    url: 'jingya'
	}, {
	    name: '委屈',
	    url: 'weiqu'
	}, {
	    name: '吐血',
	    url: 'tuxue'
	}, {
	    name: '冷汗',
	    url: 'lenghan'
	}, {
	    name: '抓狂',
	    url: 'zhuakuang'
	}, {
	    name: '难过',
	    url: 'nanguo'
	}, {
	    name: '偷笑',
	    url: 'touxiao'
	}, {
	    name: '白眼',
	    url: 'baiyan'
	}, {
	    name: '不屑',
	    url: 'buxie'
	}, {
	    name: '快哭了',
	    url: 'kuaikule'
	}];

	var groupTwo = [{
	    name: '困',
	    url: 'kun'
	}, {
	    name: '装酷',
	    url: 'zhuangku'
	}, {
	    name: '大笑',
	    url: 'daxiao'
	}, {
	    name: '偷瞄',
	    url: 'toumiao'
	}, {
	    name: '奋斗',
	    url: 'fendou'
	}, {
	    name: '咒骂',
	    url: 'zhouma'
	}, {
	    name: '疑问',
	    url: 'yiwen'
	}, {
	    name: '晕',
	    url: 'yun'
	}, {
	    name: '捶打',
	    url: 'chuida'
	}, {
	    name: '再见',
	    url: 'zaijian'
	}, {
	    name: '抠鼻',
	    url: 'koubi'
	}, {
	    name: '发呆',
	    url: 'fadai'
	}, {
	    name: '坏笑',
	    url: 'huaixiao'
	}, {
	    name: '哈欠',
	    url: 'haqian'
	}, {
	    name: '鄙视',
	    url: 'bishi'
	}, {
	    name: '睡觉',
	    url: 'shuijiao'
	}, {
	    name: '饿',
	    url: 'e'
	}, {
	    name: '阴险',
	    url: 'yinxian'
	}, {
	    name: '难受',
	    url: 'nanshou'
	}, {
	    name: '可怜',
	    url: 'kelian'
	}, {
	    name: '撇嘴',
	    url: 'piezui'
	}, {
	    name: '石化',
	    url: 'shihua'
	}, {
	    name: '泪眼',
	    url: 'leiyan'
	}];
	/*
	var groupThree = [{
	    name: '嘘',
	    url: 'xu'
	}, {
	    name: '哼哼',
	    url: 'hengheng'
	}, {
	    name: '爱慕',
	    url: 'aimu'
	}, {
	    name: '财迷',
	    url: 'caimi'
	}, {
	    name: '耶',
	    url: 'ye'
	}, {
	    name: '思考',
	    url: 'sikao'
	}, {
	    name: '骷髅',
	    url: 'kulou'
	}, {
	    name: '痛哭',
	    url: 'tongku'
	}, {
	    name: '恭喜',
	    url: 'gongxi'
	}, {
	    name: '捂脸',
	    url: 'wulian'
	}, {
	    name: '嘿哈',
	    url: 'heiha'
	}, {
	    name: '机智',
	    url: 'jizhi'
	}, {
	    name: '皱眉',
	    url: 'zhoumei'
	}, {
	    name: '安慰',
	    url: 'anwei'
	}, {
	    name: '飞吻',
	    url: 'feiwen'
	}, {
	    name: '奸笑',
	    url: 'jianxiao'
	}, {
	    name: '猪头',
	    url: 'zhutou'
	}, {
	    name: '玫瑰',
	    url: 'meigui'
	}, {
	    name: '凋谢',
	    url: 'diaoxie'
	}, {
	    name: '爱心',
	    url: 'aixin'
	}, {
	    name: '心碎',
	    url: 'xinsui'
	}, {
	    name: '蛋糕',
	    url: 'dangao'
	}, {
	    name: '喝水',
	    url: 'heshui'
	}];

	var groupFour = [{
	    name: '西瓜',
	    url: 'xigua'
	}, {
	    name: '咖啡',
	    url: 'kafei'
	}, {
	    name: '啤酒',
	    url: 'pijiu'
	}, {
	    name: '包包',
	    url: 'baobao'
	}, {
	    name: '高跟鞋',
	    url: 'gaogenxie'
	}, {
	    name: '帽子',
	    url: 'maozi'
	}, {
	    name: '口红',
	    url: 'kouhong'
	}, {
	    name: '裙子',
	    url: 'qunzi'
	}, {
	    name: 'T恤',
	    url: 'txu'
	}, {
	    name: '裤子',
	    url: 'kuzi'
	}, {
	    name: '眼镜',
	    url: 'yanjing'
	}, {
	    name: '太阳镜',
	    url: 'taiyangjing'
	}, {
	    name: '蜡烛',
	    url: 'lazhu'
	}, {
	    name: '礼物',
	    url: 'liwu'
	}, {
	    name: '红包',
	    url: 'hongbao'
	}, {
	    name: '拥抱',
	    url: 'yongbao'
	}, {
	    name: '太阳',
	    url: 'taiyang'
	}, {
	    name: '月亮',
	    url: 'yueliang'
	}, {
	    name: '便便',
	    url: 'bianbian'
	}, {
	    name: '炸弹',
	    url: 'zhadan'
	}, {
	    name: '菜刀',
	    url: 'caidao'
	}, {
	    name: '握手',
	    url: 'woshou'
	}, {
	    name: '胜利',
	    url: 'shengli'
	}];

	var groupFive = [{
	    name: '赞',
	    url: 'zan'
	}, {
	    name: 'OK',
	    url: 'ok'
	}, {
	    name: '勾引',
	    url: 'gouyin'
	}, {
	    name: 'NO',
	    url: 'no'
	}, {
	    name: '打脸',
	    url: 'dalian'
	}, {
	    name: '抱拳',
	    url: 'baoquan'
	}, {
	    name: '乒乓球',
	    url: 'pingpangqiu'
	}, {
	    name: '足球',
	    url: 'zuqiu'
	}, {
	    name: '篮球',
	    url: 'lanqiu'
	}];
	*/
	var format = function format(arr) {
	    for (var i = 0, len = arr.length; i < len; i++) {
	        var emoji = arr[i];
	        emoji.url = imgPath + emoji.url + ext;
	    }
	    return arr;
	};

	module.exports = format(groupOne.concat(groupTwo /*, groupThree, groupFour, groupFive*/));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	var path = $_CONFIG.imgpath + '/images/emoji/';
	var ext = '.png';

	var backward = {
	    '亲': {
	        name: '亲亲',
	        url: path + 'qinqin' + ext
	    },
	    '愤怒': {
	        name: '生气',
	        url: path + 'shengqi' + ext
	    },
	    '惊恐': {
	        name: '惊讶',
	        url: path + 'jingya' + ext
	    },
	    '迷茫': {
	        name: '委屈',
	        url: path + 'weiqu' + ext
	    },
	    '伤心': {
	        name: '难过',
	        url: path + 'nanguo' + ext
	    },
	    '努力': {
	        name: '奋斗',
	        url: path + 'fendou' + ext
	    },
	    'YY': {
	        name: ' 坏笑',
	        url: path + 'huaixiao' + ext
	    },
	    '恶心': {
	        name: '难受',
	        url: path + 'nanshou' + ext
	    }
	};

	module.exports = backward;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/face/face',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,v=$data.v,i=$data.i,face=$data.face,$index=$data.$index,$escape=$utils.$escape,page=$data.page,$out='';$out+='<div data-node="faceBox" class="imoj-box" style="position: absolute;z-index: 9999;display:none"> <em class="sanjiao"></em> <div data-node="faceList" class="imoj-list"> ';
	$each(list,function(v,i){
	$out+=' <div class="imoj-content clearfix ';
	if(i){
	$out+='hide';
	}
	$out+='"> ';
	$each(v,function(face,$index){
	$out+=' <a href="javascript:;"> <img width="22" height="22" data-face="[';
	$out+=$escape(face.name);
	$out+=']" src="';
	$out+=$escape(face.url);
	$out+='" alt="';
	$out+=$escape(face.name);
	$out+='" title="';
	$out+=$escape(face.name);
	$out+='"> </a> ';
	});
	$out+=' </div> ';
	});
	$out+=' </div> <ul data-action="facePage" class="pagination"> ';
	$each(page,function(v,i){
	$out+=' <li ';
	if(i==0){
	$out+='class="active"';
	}
	$out+='>';
	$out+=$escape(i+1);
	$out+='</li> ';
	});
	$out+=' </ul> </div>';
	return new String($out);
	});

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*
	 * Lazy Load - jQuery plugin for lazy loading images
	 *
	 * Copyright (c) 2007-2012 Mika Tuupola
	 *
	 * Licensed under the MIT license:
	 *   http://www.opensource.org/licenses/mit-license.php
	 *
	 * Project home:
	 *   http://www.appelsiini.net/projects/lazyload
	 *
	 * Version:  1.7.2
	 *
	 */
	(function($, window) {

	    var $window = $(window);
	    var $container;

	    $.fn.lazyload = function(options) {
	        var elements = this;
	        var settings = {
	            threshold: 0,
	            failure_limit: 0,
	            event: "scroll",
	            effect: "show",
	            container: window,
	            data_attribute: "original",
	            skip_invisible: true,
	            appear: null,
	            load: null
	        };

	        function update() {
	            var counter = 0;

	            elements.each(function() {
	                var $this = $(this);
	                if (settings.skip_invisible && !$this.is(":visible")) {
	                    return;
	                }
	                if ($.abovethetop(this, settings) ||
	                    $.leftofbegin(this, settings)) {
	                    /* Nothing. */
	                } else if (!$.belowthefold(this, settings) &&
	                    !$.rightoffold(this, settings)) {
	                    $this.trigger("appear");
	                } else {
	                    if (++counter > settings.failure_limit) {
	                        return false;
	                    }
	                }
	            });

	        }

	        if (options) {
	            /* Maintain BC for a couple of versions. */
	            if (undefined !== options.failurelimit) {
	                options.failure_limit = options.failurelimit;
	                delete options.failurelimit;
	            }
	            if (undefined !== options.effectspeed) {
	                options.effect_speed = options.effectspeed;
	                delete options.effectspeed;
	            }

	            $.extend(settings, options);
	        }

	        /* Cache container as jQuery as object. */
	        $container = (settings.container === undefined ||
	            settings.container === window) ? $window : $(settings.container);

	        /* Fire one scroll event per scroll. Not one scroll event per image. */
	        if (0 === settings.event.indexOf("scroll")) {
	            $container.bind(settings.event, function() {
	                return update();
	            });
	        }

	        this.each(function() {
	            var self = this;
	            var $self = $(self);

	            self.loaded = false;

	            /* When appear is triggered load original image. */
	            $self.one("appear", function() {
	                if (!this.loaded) {
	                    if (settings.appear) {
	                        var elements_left = elements.length;
	                        settings.appear.call(self, elements_left, settings);
	                    }
	                    $("<img />")
	                        .bind("load", function() {
	                            $self
	                            //.hide()
	                                .attr("src", $self.data(settings.data_attribute))[settings.effect](settings.effect_speed);
	                            self.loaded = true;

	                            /* Remove image from array so it is not looped next time. */
	                            var temp = $.grep(elements, function(element) {
	                                return !element.loaded;
	                            });
	                            elements = $(temp);

	                            if (settings.load) {
	                                var elements_left = elements.length;
	                                settings.load.call(self, elements_left, settings);
	                            }
	                        })
	                        .attr("src", $self.data(settings.data_attribute));
	                }
	            });

	            /* When wanted event is triggered load original image */
	            /* by triggering appear.                              */
	            if (0 !== settings.event.indexOf("scroll")) {
	                $self.bind(settings.event, function() {
	                    if (!self.loaded) {
	                        $self.trigger("appear");
	                    }
	                });
	            }
	        });

	        /* Check if something appears when window is resized. */
	        $window.bind("resize", function() {
	            update();
	        });

	        /* Force initial check if images should appear. */
	        update();

	        return this;
	    };

	    /* Convenience methods in jQuery namespace.           */
	    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

	    $.belowthefold = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.height() + $window.scrollTop();
	        } else {
	            fold = $container.offset().top + $container.height();
	        }

	        return fold <= $(element).offset().top - settings.threshold;
	    };

	    $.rightoffold = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.width() + $window.scrollLeft();
	        } else {
	            fold = $container.offset().left + $container.width();
	        }

	        return fold <= $(element).offset().left - settings.threshold;
	    };

	    $.abovethetop = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollTop();
	        } else {
	            fold = $container.offset().top;
	        }

	        return fold >= $(element).offset().top + settings.threshold + $(element).height();
	    };

	    $.leftofbegin = function(element, settings) {
	        var fold;

	        if (settings.container === undefined || settings.container === window) {
	            fold = $window.scrollLeft();
	        } else {
	            fold = $container.offset().left;
	        }

	        return fold >= $(element).offset().left + settings.threshold + $(element).width();
	    };

	    $.inviewport = function(element, settings) {
	        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) &&
	            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	    };

	    /* Custom selectors for your convenience.   */
	    /* Use as $("img:below-the-fold").something() */

	    $.extend($.expr[':'], {
	        "below-the-fold": function(a) {
	            return $.belowthefold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "above-the-top": function(a) {
	            return !$.belowthefold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "right-of-screen": function(a) {
	            return $.rightoffold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "left-of-screen": function(a) {
	            return !$.rightoffold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "in-viewport": function(a) {
	            return !$.inviewport(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        /* Maintain BC for couple of versions. */
	        "above-the-fold": function(a) {
	            return !$.belowthefold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "right-of-fold": function(a) {
	            return $.rightoffold(a, {
	                threshold: 0,
	                container: window
	            });
	        },
	        "left-of-fold": function(a) {
	            return !$.rightoffold(a, {
	                threshold: 0,
	                container: window
	            });
	        }
	    });

	})(jQuery, window);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 233:
/***/ function(module, exports) {

	'use strict';

	var html = function html(str, reg) {
	    return str ? str.replace(reg || /[&<">'](?:(amp|lt|ldquo|rdquo|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
	        if (b) {
	            return a;
	        } else {
	            return {
	                '<': '&lt;',
	                '&': '&amp;',
	                '"': '&quot;',
	                '“': '&ldquo;',
	                '”': '&rdquo;',
	                '>': '&gt;',
	                "'": '&#39;'
	            }[a];
	        }
	    }) : '';
	};

	module.exports = html;

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var emojis = __webpack_require__(157);
	var backward = __webpack_require__(158);
	var faceTpl = __webpack_require__(159);

	var faceReg,
	    faceUrl,
	    defaultIndex = 0;

	// 将表情转换成map
	var emojiMap = {};

	// 数据适配转换
	var makeData = function makeData(data) {
	    var total = data.length;
	    var offset = 24;
	    var page = Math.ceil(total / offset);
	    var list = [];

	    for (var i = 0; i < page; i++) {
	        list[i] = [];
	        var end = offset * (i + 1);
	        end = end > total ? total : end;
	        for (var j = i * offset; j < end; j++) {
	            var emoji = data[j];
	            list[i].push(emoji);
	            emojiMap[emoji.name] = emoji.url;
	        }
	    }
	    return {
	        page: new Array(page),
	        list: list
	    };
	};
	// 表情层显示
	var show = function show(x, y) {
	    setShowIndex(0);
	    $('[data-node=faceBox]').css({
	        left: x + 'px',
	        top: y + 'px'
	    }).show();
	};
	// 表情层隐藏
	var hide = function hide() {
	    $('[data-node=faceBox]').hide();
	};
	// tab方式显示所选页
	var setShowIndex = function setShowIndex(index) {
	    index = index || defaultIndex;

	    $('[data-action=facePage] > li').eq(index).addClass('active').siblings('li').removeClass('active');
	    $('[data-node=faceList] > div').eq(index).removeClass('hide').siblings('div').addClass('hide');
	};

	/**
	 * 插入表情，回调数据
	 * @param  {Function} fn     回调函数
	 * @param  {Boolean}  isHide 点击表情后是否隐藏表情浮层，默认隐藏
	 * @return {[type]}          null
	 */
	var insertFace = function insertFace(fn, isHide) {
	    $('body').on('click', '[data-face]', function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        faceReg = $(this).data('face');
	        faceUrl = $(this).attr('src');
	        fn({
	            reg: faceReg,
	            url: faceUrl
	        });
	        isHide !== false && $('[data-node=faceBox]').hide();
	    });
	};
	// 初始化表情弹层
	var initHTML = function initHTML(fn) {
	    var data = makeData(emojis);
	    var faceHTML = faceTpl(data);
	    $('body').append(faceHTML);
	    fn();
	};
	// 初始化事件
	var initEvent = function initEvent() {
	    $('body').on('click', '[data-node=faceBox]', function (e) {
	        e.stopPropagation();
	    });
	    $(document).on('click', function () {
	        $('[data-node=faceBox]').hide();
	    });
	    // 分页切换显示
	    $('[data-node=faceBox]').on('mouseenter', '[data-action=facePage] > li', function () {
	        var index = $(this).index();
	        setShowIndex(index);
	    });
	};

	var isEmpty = function isEmpty(obj) {
	    var ret = true;
	    for (var key in obj) {
	        ret = false;
	        break;
	    }
	    return ret;
	};

	// 把表情占位符替换成img
	var parseEmoji = function parseEmoji(str) {
	    var r = /(\[([\s\S]+?)\])/g;
	    if (isEmpty(emojiMap)) {
	        makeData(emojis);
	    }

	    return str.replace(r, function (s, $1, name) {
	        var img = emojiMap[name];
	        if (img) {
	            return '<img width="22" height="22" src="' + img + '" />';
	        } else {
	            // 兼容旧版表情
	            var old = backward[name];
	            if (old) {
	                return '<img width="22" height="22" src="' + old.url + '" />';
	            }
	            return s;
	        }
	    });
	};

	var init = function init() {
	    initHTML(initEvent);
	};

	module.exports = {
	    init: init,
	    insert: insertFace,
	    show: show,
	    hide: hide,
	    parseEmoji: parseEmoji
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/**
	 *
	 * 赞/取消赞
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(37);
	var Pubsub = __webpack_require__(48);
	var channel = __webpack_require__(71);
	var checkLoginStatus = __webpack_require__(47);

	var isLogin = checkLoginStatus(); //页面初始化是否登录判断

	var noop = function noop() {};
	var setData = function setData($node, praise, count) {
	    $node.data('praise', praise);
	    $node.data('count', count);
	};

	var helper = {
	    normal: {
	        add: function add($node, data, count) {
	            $node.addClass('active');
	            if (!count) {
	                count = "取消点赞";
	            }
	            $node.find('span').text(count);
	        },
	        reduce: function reduce($node, data, count) {
	            $node.removeClass('active');
	            if (!count) {
	                count = "点赞";
	            }
	            $node.find('span').text(count);
	        }
	    }
	};

	var getCallback = function getCallback(mode) {
	    return helper[mode];
	};

	var praise = function praise(container, selector, options) {
	    var $container = $(container);
	    var onPraise = options.onPraise || noop;
	    var onUnPraise = options.onUnPraise || noop;
	    var onPraised = options.onPraised || noop;
	    var mode = options.mode || 'normal';

	    $container.on('click', selector, function () {
	        var $this = $(this);
	        var firing = $this.data('firing');
	        if (firing === 1) {
	            return;
	        }

	        $this.data('firing', 1);
	        var t = $this.data('type');
	        var isPraise = $this.data('praise');
	        var id = $this.data('id');
	        var count = $this.data('count');

	        var objs = {
	            validate: true,
	            data: {
	                id: id,
	                type: t, // 0 店铺,  1 话题
	                isPraise: isPraise // 0 取消点赞, 1 点赞
	            },
	            onLogin: noRefreshFetch,
	            refresh: true
	        };

	        //无刷新登录
	        function noRefreshFetch(o) {
	            fetch.post(url.get('praise'), o).done(function (data /*, textStatus, jqXHR*/) {
	                var callbacks = getCallback(mode);
	                //推送 评论区状态
	                Pubsub(channel.comment.enableEditor).pub({
	                    pid: "enable"
	                });

	                if (data && data.code === 200 && data.success) {
	                    if (isPraise === 1) {
	                        setData($this, 0, ++count);
	                        callbacks.add($this, data, count);
	                        onPraise.call($this, data, count);
	                    } else if (isPraise === 0) {
	                        setData($this, 1, --count);
	                        callbacks.reduce($this, data, count);
	                        onUnPraise.call($this, data, count);
	                    }
	                } else if (data && data.code === 422) {
	                    // window.location.href = $_CONFIG.passport_domain + 'login/index';
	                } else if (data && data.code === 403) {
	                    alert('抱歉！该话题审核未通过', {
	                        ok: function ok() {
	                            window.location.href = $_CONFIG.group_domain + 'index/error?code=topic';
	                        }
	                    });
	                } else {
	                    var message = data.message;
	                    //409点过赞  已经登录 把点赞状态回带，不刷新
	                    if (data.code === 409) {

	                        onPraised.call($this, data, count);

	                        if (isLogin) {
	                            alert(message);
	                        }

	                        return false;
	                    }
	                    if (t === 0) {
	                        if (data.code === 404) {
	                            alert(message, {
	                                ok: function ok() {
	                                    window.location.reload();
	                                }
	                            });
	                        } else {
	                            alert(message);
	                        }
	                    } else {
	                        alert(message);
	                    }
	                }
	            }).fail(function () /*jqXHR, textStatus, errorThrown*/{
	                // 点赞失败时,如何处理
	            }).always(function () {
	                $this.data('firing', 0);
	            });
	        }

	        noRefreshFetch(objs);
	        return false;
	    });
	};

	module.exports = praise;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/*话题详情页 v2版本改造*/

	__webpack_require__(197);
	var face = __webpack_require__(234);
	//var loginPop = require('module/popup/login'); //登录弹窗
	//var checkLoginStatus = require('module/checkLoginStatus'); // 登陆判断

	var Pubsub = __webpack_require__(48);
	var channel = __webpack_require__(71);

	var getCommentList = __webpack_require__(272); //
	var a_Submit = __webpack_require__(277); //
	var secondComBtn = __webpack_require__(279); //
	var showMoreList = __webpack_require__(281); //
	var loginState = __webpack_require__(278);
	var Smiley = __webpack_require__(282);
	var otherFn = __webpack_require__(283);

	var $loadlist = $("[data-node=loadlist]");
	var $comment_Msg = $("[data-node=comment_Msg]");
	//var $a_Submit = $("[data-node=a_Submit]");
	//var $circleCom = $("[data-node=circleCom]");
	var clickTopicId = $_CONFIG['topicid'];

	var DIVOBJ = $("[data-node = more-topic]");

	$loadlist.css("display", "none");
	$("[data-node=loading]").css("display", "none");
	$("[data-node=noload]").css("display", "none");
	$("[data-node=imgUl]").addClass("hide");

	var commentDomInit = function commentDomInit() {
	    $comment_Msg.on('click', loginState.commentCheck);

	    DIVOBJ.on("click", "[data-node=a_Submit]", a_Submit);
	    //$a_Submit.on("click", $); //一级话题回复 绑定事件
	    DIVOBJ.on("click", "[data-node=secondCom_Key]", secondComBtn.secondCom_Key); //显示二级回复框
	    DIVOBJ.on("click", "[data-node=hideComBox]", secondComBtn.hideComBox); //点击收起 按钮，隐藏二级输入框
	    DIVOBJ.on("click", "[data-node=a_secondComBtn]", secondComBtn.a_secondComBtn); //二级话题回复
	    DIVOBJ.on('click', '[data-node=smilies_Face]', Smiley.showEmoji); //表情添加
	    DIVOBJ.on("click", "[data-node=showMoreList]", showMoreList); // 二级列表
	};

	var init = function init() {
	    //登陆状态以及事件绑定
	    if (loginState.getLoginState()) {
	        face.insert(function (data) {
	            Smiley.insertAtCursor(Smiley.curretTextAreaObj(), data.reg);
	        });
	    }
	    getCommentList(clickTopicId, 1, 10, 2); //评论列表
	    commentDomInit(); //事件绑定
	    otherFn.lodingMore(); //一级评论列表加载更多
	    otherFn.goComment(); // 点击评论图标页面滚动到评论区域
	    face.init(); // 初始化表情
	    $("img").lazyload({ effect: "fadeIn" });
	};

	// 订阅
	Pubsub(channel.comment.enableEditor).sub(function (data) {
	    if (data.pid == "enable") {
	        loginState.getLoginState();
	    }
	});

	module.exports = {
	    init: init,
	    getLoginState: loginState.getLoginState
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	/**评论一级列表**/
	var changeContent = __webpack_require__(273); //评论内容转换
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var checkLoginStatus = __webpack_require__(47); // 登陆判断
	var face = __webpack_require__(234);
	var fromNow = __webpack_require__(274);
	var commentList = __webpack_require__(275);
	var addImageTpl = __webpack_require__(276);
	//var fixedTopic = require('../fixedTopic');

	var $is_Login = checkLoginStatus() == true ? 1 : 0; // 判断登陆状态
	//var  $LoginSrc = $_CONFIG.passport_domain; //登录注册域名
	var $mall_domain = $_CONFIG.mall_domain; // 商城
	var $userIsExpert = $_CONFIG['isExpert']; // 当前用户是否为达人


	var $secondCom_Key = $("[data-node=secondCom_Key]");

	var LoadListStr = "[data-node=loadlist]";
	var LoadtingStr = "[data-node=loading]";
	//var NoLoadStr = "[data-node=noload]";


	var getCommentList = function getCommentList(id, currPage, pageSize, listSize, nodelist) {

	    var $hidDiv = $("[id-node=" + id + "]").children(".topic-lfet").children("[data-node=hidDiv]");

	    var $thisObjId = $("[data-circlecom=" + id + "]"); //每个话题的评论容器
	    var $ComTopicId = $thisObjId.parent(".bjfff");
	    //var $ComTopicId = $("[data-ComTopicId="+id+"]");
	    var $loadlist = $($ComTopicId.children(LoadListStr));
	    var $loading = $($ComTopicId.children(LoadtingStr));
	    //var $noload = $($ComTopicId.children(NoLoadStr));

	    $loadlist.css("display", "none");
	    $loading.css("display", "block");

	    var currUserImg = $("[data-tid=" + id + "]").attr("data-headface");
	    var paramList = '?page=' + currPage + '&pagesize=' + pageSize + '&topicid=' + id;

	    fetch.get(url.get('commentListUrlV2') + paramList).then(function (data) {
	        //console.log(data);
	        if (data.success) {
	            //获取所有的一级评论
	            //console.log(data);
	            var topicReplys = data.data.topicReplys;
	            // var windowHeight = parseInt($(window).height());
	            var height = $("[data-comtopicid=" + id + "]").offset().top;
	            if (topicReplys.length > 0) {

	                //显示 正在加载中
	                $loading.css("display", "block");
	                $loadlist.css("display", "block").attr("data-addMorePages", currPage).attr("data-ListSize", pageSize);

	                for (var i = 0; i < topicReplys.length; i++) {

	                    //获取每个评论下的二级评论
	                    var topicMsg = topicReplys[i];
	                    var subReplyQuantity = topicMsg.subReplyQuantity; //二级回复的总数
	                    var subTop = topicMsg.topicSubReplys; //二级回复
	                    var replySecArr = []; //二级评论数组

	                    //判断是否显示  查看更多按钮 
	                    var showNum = null;
	                    var dlShowBorder = null;
	                    var showMall = null;
	                    if (subReplyQuantity > listSize) {
	                        showMall = true;
	                        dlShowBorder = "clearfix";
	                        showNum = listSize;
	                    } else {
	                        showMall = false;
	                        showNum = parseInt(subTop.length);
	                        dlShowBorder = "clearfix bd-bottom";
	                    }
	                    var UserId = checkUserId(topicMsg.user.id);
	                    //console.log(UserId); 
	                    var showSecComm = showNum > 0 ? "" : "hide";
	                    for (var j = 0; j < showNum; j++) {
	                        var subTopMsg = subTop[j];
	                        if (subTopMsg) {
	                            // console.log(subTopMsg.creatorId +" " +subTopMsg.user.id);
	                            //判断是二级评论还是三级评论
	                            var replayToPub = null;
	                            var beReplyUserName = "";
	                            var beReplyUserId = "";
	                            var threeUserId = "javascript:;";
	                            if (subTopMsg.topicSubReplyUser) {
	                                // 三级回复 

	                                replayToPub = true;
	                                beReplyUserName = subTopMsg.topicSubReplyUser.nickname;
	                                beReplyUserId = subTopMsg.topicSubReplyUser.id;
	                                threeUserId = checkUserId(beReplyUserId);
	                            } else {
	                                //二级回复
	                                replayToPub = false;
	                            }

	                            var contentSed = subTopMsg.content;
	                            contentSed = changeContent(contentSed);
	                            var SenUserId = "";
	                            if (subTopMsg.user) {
	                                SenUserId = checkUserId(subTopMsg.user.id);
	                            }
	                            //var SenUserId =  checkUserId(subTopMsg.user.id);


	                            //二级回复中参数
	                            var replySecMsg = {
	                                "threeUserId": threeUserId,
	                                "SenUserId": SenUserId,
	                                "parentCommentId": topicMsg.id, //话题id
	                                // "topicId": topicId, //
	                                "replayToPub": replayToPub, //判断是二级回复还是三级回复
	                                "content": contentSed, //回复内容
	                                "replyUserName": subTopMsg.user.nickname, //回复人昵称                  
	                                "replyUserId": subTopMsg.user.id, //回复人id
	                                "beReplyUserName": beReplyUserName, //被回复人的昵称
	                                "beReplyUserId": beReplyUserId, //被回复人的id
	                                "replyCommentId": subTopMsg.id // 二级回复内容id 
	                            };

	                            replySecArr.push(replySecMsg);
	                        }
	                    }

	                    var content = topicMsg.content; //获取一级评论内容
	                    content = changeContent(content);
	                    var topicPic = topicMsg.pics; //一级评论的图片
	                    //var str = "";
	                    var imageStr = "";
	                    if (topicPic.length > 0) {
	                        var imgsrcPic = {
	                            picsSrc: topicPic,
	                            picture: topicMsg.pictures,
	                            length: topicPic.length
	                        };
	                        imageStr = addImageTpl(imgsrcPic);

	                        //addImageTpl
	                        // var imgArr = topicPic;
	                        // var imgArrLen = imgArr.length;

	                        // $.each(imgArr, function(index, img) {
	                        //     str += '<li><a href="javascript:;"><img src="'+img+'"></a></li>';
	                        //     //str += "</br><img     data-original=" + img + "  >";
	                        // })
	                        // imageStr =  '<ul class="clearfix comments-imglist">'+str+'</ul>';
	                    }
	                    //content = content + str;
	                    //商品参数添加

	                    var itemsPic = ""; //商品图标
	                    var itemShopName = ""; //
	                    var itemPrice = "";
	                    var shopId = "";
	                    var itemShopId = "";
	                    var itemShopNameItem = "";
	                    //var rebateSummary = "";
	                    if (topicMsg.item) {

	                        itemsPic = topicMsg.item.mainImage;
	                        itemShopNameItem = topicMsg.item.name;
	                        itemPrice = topicMsg.item.price;
	                        shopId = topicMsg.item.id;
	                        itemShopId = topicMsg.item.shopId;
	                        // rebateSummary = topicMsg.item.rebateSummary; //返利金额

	                        /*
	                        "discount": 0, // 直降金额
	                        "id": 1179,  //商品id
	                        "mainImage": "http://img.gomein.net.cn/image/prodimg/production_image/img/1000083845/1000027654",
	                        "name": "尤尼克斯（YONEX）SHB-60C羽毛球鞋",
	                        "originalPrice": 18400, //市场价格
	                        "price": 18400,
	                        "salePrice": 18400, 售价
	                        "saleQuantity": 16, 销量
	                        "shopId": 3,
	                        "skuHighestPrice": 45900,
	                        "status": -1,
	                        "stock": 50000
	                        */
	                    }

	                    //店铺参数
	                    var shopPic = "";
	                    var redPackage = "";
	                    if (topicMsg.shop) {
	                        shopPic = topicMsg.shop.icon;
	                        itemShopName = topicMsg.shop.name;
	                        if (topicMsg.shop.promotionMark) {
	                            redPackage = topicMsg.shop.promotionMark.hasCouponPlan; //是否有优惠券
	                        }
	                        //redPackage = topicMsg.shop.promotionMark.hasCouponPlan; //是否有优惠券
	                        itemShopId = topicMsg.shop.id;
	                    }
	                    //所有参数集合
	                    var showDateList = {
	                        "showSecComm": showSecComm,
	                        "imageStr": imageStr,
	                        "itemShopNameItem": itemShopNameItem,
	                        "UserId": UserId,
	                        "dlShowBorder": dlShowBorder,
	                        "showMall": showMall,
	                        "userIsExpert": $userIsExpert, //当前用户是否是达人
	                        "isExpert": topicMsg.expertInfo.isExpert, //是否是达人
	                        "userPic": topicMsg.user.facePicUrl, //用户头像
	                        "username": topicMsg.user.nickname, //用户昵称
	                        "backTopicId": topicMsg.id, //本条评论id
	                        "content": face.parseEmoji(content), //过滤之后的内容 
	                        "topicType": topicMsg.replyType, // 评论类型
	                        "topicId": topicMsg.topicId, // 话题id
	                        "currUserImg": currUserImg, // 当前用户的头像，在二级评论框中显示
	                        "times": fromNow(timeString(topicMsg.createTime)), //评论时间
	                        "isFirstCom": false, // 是否是一级评论  --  判断是否显示二级评论
	                        "secondReply": replySecArr, // 二级评论数组
	                        //商品参数
	                        "mall_domain": $mall_domain,
	                        "itemsPic": itemsPic,
	                        "itemShopName": itemShopName,
	                        "itemPrice": itemPrice,
	                        "shopId": shopId,
	                        "itemShopId": itemShopId,
	                        // 店铺参数
	                        "redPackage": redPackage,
	                        "shopPic": shopPic
	                    };

	                    var item = commentList(showDateList);
	                    //$circleCom.append($(item));
	                    $thisObjId.append($(item));
	                    $loading.css("display", "none");
	                    $loadlist.css("display", "block");

	                    $("img").lazyload({ effect: "fadeIn" });

	                    //没有登录时不显示 “回复”
	                    if ($is_Login == "0") {
	                        $secondCom_Key.css("display", "none");
	                    }
	                    if (topicReplys.length < pageSize) {
	                        $loadlist.css("display", "none");
	                    }
	                }
	                //fixedTopic.init();
	                if (nodelist) {

	                    //console.log(id);
	                    // var height = $("[data-comtopicid="+id+"]").height() - windowHeight;
	                    //console.log(height);
	                    $(window).scrollTop(height);
	                }
	            } else {
	                $loading.css("display", "none");
	                if (pageSize == 1) {
	                    $hidDiv.css("display", "none");
	                }
	            }
	        } else {
	            $loadlist.css("display", "none");
	            // $noload.css("display", "block");
	            $loading.css("display", "none");
	        }
	    });
	};

	function checkUserId(id) {

	    if ($is_Login == 1 && $_CONFIG['userId'] == id) {
	        return $_CONFIG.i_domain + 'index';
	    } else {
	        return $_CONFIG.group_domain + 'ta/' + id + '.html';
	    }
	}

	function timeString(str) {
	    var date = new Date(str);
	    var fullYear = date.getFullYear();
	    var month = date.getMonth() + 1;
	    var day = date.getDate();
	    var hh = date.getHours();
	    var mm = date.getMinutes();
	    var ss = date.getSeconds();

	    function addZero(num) {

	        var newNum = "";
	        if (parseInt(num) < 10) {
	            newNum = "0" + num;
	        } else {
	            newNum = num;
	        }
	        return newNum;
	    }

	    return fullYear + "-" + addZero(month) + "-" + addZero(day) + " " + addZero(hh) + ":" + addZero(mm) + ":" + addZero(ss);
	}

	module.exports = getCommentList;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//话题评论内容转换

	var encodeHtml = __webpack_require__(233);
	var face = __webpack_require__(234);

	function htmlNull(str) {
	    var re = str.replace(/\n|\r\n/g, "</br>");
	    return re; //去掉所有的html标记
	}

	var changeContent = function changeContent(content) {
	    content = encodeHtml(content);
	    content = face.parseEmoji(content);
	    content = htmlNull(content);
	    return content;
	};

	module.exports = changeContent;

/***/ },

/***/ 274:
/***/ function(module, exports) {

	"use strict";

	// 传入的时间格式  2016-04-27 15:12:58
	var fromNow = function fromNow(timeStr, max) {
	    /**
	      1）1个小时以内发表的消息，显示发表的分钟数，如“20分钟前”；
	      2）在24小时以内，发表的信息，显示具体小时数，如“15小时前”；
	      3）大于24小时小于48小时，发表的消息，显示昨天；
	      4）大于48小时小于72小时，发表的消息，显示2天前；大于72小时小于96小时，发表的消息，显示3天前；依此类推，最多到7天前
	      5）超过7天前，显示具体年/月/日
	    **/

	    var showTime = "";
	    var time = new Date(timeStr).getTime();
	    var date = new Date().getTime();
	    var num = date - time;
	    var maxDay = max || 7;
	    var oneMin = 60000,
	        oneHour = 3600000,
	        oneDay = 24 * 3600000;
	    var s;
	    if (num < oneMin) {
	        showTime = '1分钟前';
	        //console.log(showTime);
	    } else if (num >= oneMin & num < oneHour) {
	        s = Math.floor(num / oneMin);
	        showTime = s + "分钟前";
	        //console.log(showTime);
	    } else if (num >= oneHour & num < oneDay) {
	        s = Math.floor(num / oneHour);
	        showTime = s + "小时前";
	        //console.log(showTime);
	    } else if (num >= oneDay & num < 2 * oneDay) {
	        s = Math.floor(num / oneDay);
	        showTime = "昨天";
	        //console.log(showTime);
	    } else if (num >= 2 * oneDay & num < maxDay * oneDay) {
	        s = Math.floor(num / oneDay);
	        showTime = s + "天前";
	        //console.log(showTime);
	    } else {
	        showTime = timeStr;
	        //console.log(showTime);
	    }
	    return showTime;
	};
	module.exports = fromNow;

/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/comment/commentList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,dlShowBorder=$data.dlShowBorder,UserId=$data.UserId,isExpert=$data.isExpert,userPic=$data.userPic,backTopicId=$data.backTopicId,topicType=$data.topicType,topicId=$data.topicId,username=$data.username,times=$data.times,$string=$utils.$string,content=$data.content,itemsPic=$data.itemsPic,itemShopNameItem=$data.itemShopNameItem,itemPrice=$data.itemPrice,mall_domain=$data.mall_domain,itemShopId=$data.itemShopId,shopId=$data.shopId,shopPic=$data.shopPic,itemShopName=$data.itemShopName,redPackage=$data.redPackage,imageStr=$data.imageStr,showSecComm=$data.showSecComm,isFirstCom=$data.isFirstCom,$each=$utils.$each,secondReply=$data.secondReply,value=$data.value,i=$data.i,imId=$data.imId,showMall=$data.showMall,groupId=$data.groupId,replyCommentNum=$data.replyCommentNum,currentPage=$data.currentPage,pageSize=$data.pageSize,userIsExpert=$data.userIsExpert,currUserImg=$data.currUserImg,$out='';$out+=' <dl class="';
	$out+=$escape(dlShowBorder);
	$out+=' "> <dt> <a href="';
	$out+=$escape(UserId);
	$out+='" target="_blank"> ';
	if(isExpert){
	$out+=' <em class="icon-daren"></em>';
	}
	$out+=' <img src="';
	$out+=$escape(userPic);
	$out+='" onerror="imgError(this, \'g\')"> </a> </dt> <dd data-ddList="';
	$out+=$escape(backTopicId);
	$out+='"> <div class="circle-comments-title" data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+='> <a href="';
	$out+=$escape(UserId);
	$out+='" target="_blank">';
	$out+=$escape(username);
	$out+='</a> <span>';
	$out+=$escape(times);
	$out+='</span> <a href="javascript:;" class="fr" data-node="secondCom_Key" data-comId="';
	$out+=$escape(backTopicId);
	$out+='" data-replayUser=';
	$out+=$escape(username);
	$out+=' data-publish="1">回复</a> </div> <div class="first-comment"> <p class="clearfix">';
	$out+=$string(content);
	$out+='</p> ';
	if(topicType=="1"){
	$out+=' <div class="reply-details merchant"> <div class="reply-picture"> <img src="';
	$out+=$escape(itemsPic);
	$out+='" onerror="imgError(this, \'g\')"> </div> <div class="reply-contxt"> <p>';
	$out+=$escape(itemShopNameItem);
	$out+='</p> <p class="price-numb">￥<span>';
	$out+=$escape(itemPrice);
	$out+='</span></p> </div> <a href="';
	$out+=$escape(mall_domain);
	$out+='item/';
	$out+=$escape(itemShopId);
	$out+='-';
	$out+=$escape(shopId);
	$out+='.html" target="_blank" class="see-details pc-btn pc-btnw105 pc-btnh40" data-shopId=';
	$out+=$escape(shopId);
	$out+=' data-itemShopId=';
	$out+=$escape(itemShopId);
	$out+=' data-node="checkDetailMsg">查看详情</a> </div> ';
	}
	$out+=' ';
	if(topicType=="2"){
	$out+=' <div class="reply-details merchant"> <div class="reply-picture"><img src="';
	$out+=$escape(shopPic);
	$out+='" onerror="imgError(this, \'g\')"></div> <div class="reply-contxt"> <p> ';
	$out+=$escape(itemShopName);
	$out+=' ';
	if(redPackage){
	$out+=' <span class="topic-label">优惠券</span> ';
	}
	$out+=' </p> </div> <a href="';
	$out+=$escape(mall_domain);
	$out+='shop-';
	$out+=$escape(itemShopId);
	$out+='.html" class="see-details pc-btn pc-btnw105 pc-btnh40" data-shopId=';
	$out+=$escape(shopId);
	$out+=' data-itemShopId=';
	$out+=$escape(itemShopId);
	$out+=' data-node="checkDetailMsg">进入店铺</a> </div> ';
	}
	$out+=' ';
	$out+=$string(imageStr);
	$out+=' </div> <div class="comments-box ';
	$out+=$escape(showSecComm);
	$out+='"> ';
	if(!isFirstCom){
	$out+=' ';
	$each(secondReply,function(value,i){
	$out+=' <div class="comments-s" data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+='> <a href="';
	$out+=$escape(value.SenUserId);
	$out+='" target="_blank" data-replyUserId=';
	$out+=$escape(value.replyUserId);
	$out+='>';
	$out+=$escape(value.replyUserName);
	$out+='</a> ';
	if(value.replayToPub){
	$out+=' ：<span>回复</span> ';
	}
	$out+=' <a href="';
	$out+=$escape(value.threeUserId);
	$out+='" target="_blank" data-replyCommentId =';
	$out+=$escape(value.replyCommentId);
	$out+='>';
	$out+=$escape(value.beReplyUserName);
	$out+=':</a> <span data-replyCommentId=';
	$out+=$escape(value.replyCommentId);
	$out+='>';
	$out+=$string(value.content);
	$out+='</span> <a href="javascript:;" class="hf-btn fr" data-getTopicId=';
	$out+=$escape(backTopicId);
	$out+=' data-node="secondCom_Key" data-replayUser=';
	$out+=$escape(value.replyUserName);
	$out+=' data-publish="0" data-comId="';
	$out+=$escape(value.parentCommentId);
	$out+='" data-replyCommentId =';
	$out+=$escape(value.replyCommentId);
	$out+=' data-replyUserId=';
	$out+=$escape(value.replyUserId);
	$out+=' data-imId=';
	$out+=$escape(imId);
	$out+='>回复</a> </div> ';
	});
	$out+=' ';
	}
	$out+=' </div> </dd> </dl> ';
	if(!isFirstCom){
	$out+=' ';
	if(showMall){
	$out+=' <a href="javascript:;" class="comments-more" data-node="showMoreList" data-groupId=';
	$out+=$escape(groupId);
	$out+=' data-imId=';
	$out+=$escape(imId);
	$out+=' data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+=' data-tootlePages=';
	$out+=$escape(replyCommentNum);
	$out+=' data-currentPage= ';
	$out+=$escape(currentPage);
	$out+=' data-pageSize=';
	$out+=$escape(pageSize);
	$out+='>查看回复...</a> ';
	}
	$out+=' ';
	}
	$out+=' <a class="pack-up" style="display: none" data-node="hideComBox" data-parentTopicIdBtn=';
	$out+=$escape(backTopicId);
	$out+='>收起</a> <div class="text-field-box clearfix secondText margin-width" style="display: none" data-parentTopicId=';
	$out+=$escape(backTopicId);
	$out+='> <div class="topic-user-head"> ';
	if(userIsExpert){
	$out+=' <em class="icon-daren"></em>';
	}
	$out+=' <img src="';
	$out+=$escape(currUserImg);
	$out+='" onerror="imgError(this, \'g\')"> </div> <div class="topic-publish-content"> <textarea placeholder="说点什么吧…" class="textarea-bx secondT" data-node="textarea-bx"></textarea> <div class="publish-face-bx"> <p class="icon-face" data-node="smilies_Face"><em class="iconn-27"></em> 表情</p> <a href="javascript:;" class="pc-btn pc-btnh30 pc-btnw105" data-node="a_secondComBtn" data-getTopicId=';
	$out+=$escape(backTopicId);
	$out+='>发布</a> </div> </div> </div> ';
	return new String($out);
	});

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/comment/addImageTpl',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,picsSrc=$data.picsSrc,value=$data.value,i=$data.i,$escape=$utils.$escape,length=$data.length,picture=$data.picture,$out='';$out+=' <div class="comments-imglist" > <ul class="clearfix comments-imglist" > ';
	$each(picsSrc,function(value,i){
	$out+=' <li data-imgSort=';
	$out+=$escape(i);
	$out+=' data-node="imgPics"><a href="javascript:;"><img src="';
	$out+=$escape(value);
	$out+='"></a></li> ';
	});
	$out+=' </ul> <div class="imglist-big hide" data-node="imgBigPic"> <div class="big-title"> <a href="javascript:;" data-node="imgBigHind"><em class="icon-up"></em>收起</a> <a href="javascript:;" data-node="imgBigSrc" target="_black"><em class="iconn-3"></em>查看原图</a> </div> <div class="big-img" data-picLength="';
	$out+=$escape(length);
	$out+='"> <div class="img-hidden"> ';
	$each(picture,function(value,i){
	$out+=' <div class="img-box" data-bigImg=';
	$out+=$escape(i);
	$out+=' data-node="hideBigPic"><img class="srcError" data-imgsrc = "';
	$out+=$escape(value.url);
	$out+='"></div> ';
	});
	$out+=' </div> <em class="iconn-8" data-node="imgBigPN" data-page="pre"></em> <em class="iconn-9" data-node="imgBigPN" data-page="next"></em> </div> <div class="img-slide"> ';
	$each(picture,function(value,i){
	$out+=' <a href="javascript:;" data-node="showImg" data-active="';
	$out+=$escape(i);
	$out+='" ></a> ';
	});
	$out+=' </div> </div> </div>';
	return new String($out);
	});

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/*
		一级评论
	*/
	var $is_Login = 1;
	var alert = __webpack_require__(37);
	var hint = __webpack_require__(87);
	//var fixedTopic = require('../fixedTopic');
	var commentList = __webpack_require__(275);
	var changeContent = __webpack_require__(273); //评论内容转换
	var checkLoginStatus = __webpack_require__(47); //登陆判断
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var loginState = __webpack_require__(278);
	var face = __webpack_require__(234);
	var fromNow = __webpack_require__(274);
	//var addImg = require('./addImgGoods/addIMG');
	var addImageTpl = __webpack_require__(276);

	var $comment_Msg = $("[data-node=comment_Msg]");
	var $userIsExpert = $_CONFIG['isExpert'];
	//var $circleCom = $("[data-node=circleCom]");

	var $mall_domain = $_CONFIG.mall_domain; // 商城


	var a_Submit = function a_Submit() {

	    // 判断是否登陆，没登录，显示登录框
	    if (!checkLoginStatus()) {
	        loginState.popUnion();
	        return false;
	    }

	    var currUserImg = $comment_Msg.attr("data-headface"); //头像
	    var parentDiv = $(this).parents().eq(1);
	    var comment_Msg = parentDiv.children("textarea").val();
	    comment_Msg = comment_Msg.trim(); //对输入空格进行过滤

	    //var data_userid = parentDiv.attr("data-userid");
	    var topicid = parentDiv.attr("data-tid");

	    var imgPics = parentDiv.find("[data-node=imgUl]").attr("data-imgsrt");
	    var $addImgGoods = parentDiv.find("[data-node=addImgGoods]");
	    var imageArr = [];
	    if (imgPics) {
	        imageArr = imgPics.split(",");
	    }

	    //var shopid = $("[data-node=goodsDiv]").attr("data-shopId");

	    if (comment_Msg || imgPics || $addImgGoods.hasClass("hasGoods")) {
	        //var imId = "b_" + data_userid;
	        //var businessid = 0;
	        var topicType = null;
	        var shopId = "";
	        var itemid = "";
	        if ($addImgGoods.hasClass("hasGoods")) {
	            var $goodIn = $addImgGoods.find("[data-node=goodsIn]");
	            shopId = $goodIn.attr("data-shopId");
	            itemid = $goodIn.attr("data-itemId");
	            topicType = 1;
	        } else {
	            topicType = 0;
	        }
	        var params = {
	            "reply_type": topicType, //回复的类型
	            "topicid": topicid, //话题id
	            "content": comment_Msg, //话题回复内容
	            "pics": imageArr, //话题回复图片
	            "shopid": shopId, //如果topicType = 1 或者 =2 那么这个字段必填
	            "itemid": itemid //如果topicType = 1 那么这个字段必填 
	        };

	        //提交请求
	        fetch.post(url.get('commentFirstV2'), {
	            data: params
	        }).then(function (data) {

	            if (data.success) {

	                var Msg = data.data;
	                var contentMsg = Msg.content;
	                contentMsg = changeContent(contentMsg);
	                parentDiv.children("textarea").val("");

	                var imageStr = null;

	                if (Msg.pics.length > 0) {
	                    var imgsrcPic = {
	                        "picsSrc": Msg.pics,
	                        "picture": Msg.pictures,
	                        "length": Msg.pics.length
	                    };
	                    imageStr = addImageTpl(imgsrcPic);
	                    //console.log(Msg.pics);
	                }
	                var mall_domain = "",
	                    itemsPic = "",
	                    itemShopName = "",
	                    itemPrice = "",
	                    shopId = "",
	                    itemShopId = "";
	                if (Msg.item) {
	                    var goodStr = $("[data-node=addImgGoods]").attr("data-goodStr");
	                    var goodObj = JSON.parse(goodStr);
	                    mall_domain = $mall_domain;
	                    itemsPic = goodObj.img;
	                    itemShopName = Msg.item.name;
	                    itemPrice = goodObj.price;
	                    shopId = goodObj.pid;
	                    itemShopId = goodObj.shopId;
	                }

	                //time = timeString(Msg.createTime);
	                var UserId = checkUserId(data.data.user.id);

	                var basics = {
	                    "showSecComm": "hide",
	                    "mall_domain": mall_domain,
	                    "itemsPic": itemsPic,
	                    "itemShopNameItem": itemShopName,
	                    "itemPrice": itemPrice,
	                    "shopId": shopId,
	                    "itemShopId": itemShopId,

	                    "imageStr": imageStr,
	                    "UserId": UserId,
	                    "dlShowBorder": "clearfix bd-bottom",
	                    "userIsExpert": $userIsExpert, //当前用户是否是达人
	                    "isExpert": Msg.expertInfo.isExpert, //是否是达人
	                    "userPic": Msg.user.facePicUrl, //用户头像
	                    "username": Msg.user.nickname, //用户昵称
	                    "backTopicId": Msg.id, //本条评论id
	                    "content": face.parseEmoji(contentMsg), //过滤之后的内容 
	                    "topicType": topicType, // 评论类型
	                    "topicId": Msg.topicId, // 话题id
	                    "currUserImg": currUserImg, // 当前用户的头像，在二级评论框中显示
	                    "times": fromNow(timeString(Msg.createTime)), //评论时间
	                    "isFirstCom": true // 是否是一级评论  --  判断是否显示二级评论
	                };

	                //$("[data-node=noload]").css("display", "none");
	                $("[data-node=hidDiv]").css("display", "block");

	                var item = commentList(basics);
	                //$circleCom.append($(item));

	                $("[data-circlecom =" + topicid + "]").append($(item));
	                //console.log($("[data-circlecom="+topicid+"]").attr("class"));
	                //var newDL = $("[data-ddlist=" + basics.backTopicId + "]");

	                // 商品选择列表清空
	                // 图片列表清空
	                $("[data-tid=" + topicid + "]").children('[data-node="addImgGoods"]').attr("data-imgnum", 9).attr("data-goodstr", "").removeClass("hasGoods");
	                $("[data-tid=" + topicid + "]").find("[data-node=imgUl]").attr("data-imgsrt", "").addClass("hide").children(".imgClass").remove();
	                $("[data-tid=" + topicid + "]").find("[data-node=addGoods_btn]").removeClass("disabled");
	                $("[data-tid=" + topicid + "]").find("[data-node=addImg_btn]").removeClass("disabled");
	                $("[data-node=goodsIn]").remove();

	                var idNode = $("[id-node=" + topicid + "]");
	                $("body,html").animate({ //？？？？？有问题
	                    scrollTop: parseInt(idNode.height() + idNode.offset().top - $(window).height() / 2)

	                });
	                hint.init("评论成功");
	            } else {

	                if (data.code === 881001) {
	                    alert("评论内容不能超过200个汉字");
	                } else if (data.code === 404 || data.code === 410) {
	                    alert("抱歉，该话题已被删除", {
	                        ok: function ok() {
	                            window.location.href = "/index/get_error?code=topic_404";
	                        }
	                    });
	                } else if (data.code === 422) {
	                    alert("抱歉，服务器君正在打盹", {
	                        ok: function ok() {
	                            window.location.href = "/index/get_error?code=500";
	                        }
	                    });
	                } else if (data.code === 403) {
	                    alert("抱歉，该话题审核不通过！", {
	                        ok: function ok() {
	                            window.location.href = "/index/get_error?code=topic";
	                        }
	                    });
	                } else {
	                    alert(data.message);
	                }
	            }
	        });
	    } else {
	        alert("请输入评论内容！");
	    }
	};

	function checkUserId(id) {
	    if ($is_Login == 1 && $_CONFIG['userId'] == id) {
	        return $_CONFIG.i_domain + 'index';
	    } else {
	        return $_CONFIG.group_domain + 'ta/' + id + '.html';
	    }
	}

	function timeString(str) {
	    var date = new Date(str);
	    var fullYear = date.getFullYear();
	    var month = date.getMonth() + 1;
	    var day = date.getDate();
	    var hh = date.getHours();
	    var mm = date.getMinutes();
	    var ss = date.getSeconds();

	    function addZero(num) {

	        var newNum = "";
	        if (parseInt(num) < 10) {
	            newNum = "0" + num;
	        } else {
	            newNum = num;
	        }
	        return newNum;
	    }

	    return fullYear + "-" + addZero(month) + "-" + addZero(day) + " " + addZero(hh) + ":" + addZero(mm) + ":" + addZero(ss);
	}

	module.exports = a_Submit;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	// 判断登陆状态
	var checkLoginStatus = __webpack_require__(47); // 登陆判断
	var $comment_Msg = $("[data-node=comment_Msg]");
	var $a_Submit = $("[data-node=a_Submit]");

	//var getCommentList = require('./getCommentList'); //
	var loginPop = __webpack_require__(3); //登录弹窗
	//var checkLoginStatus = require('module/checkLoginStatus'); //登陆判断

	//var $is_Login = checkLoginStatus() == true ? 1 : 0;


	var getLoginState = function getLoginState() {
	    var ISLOGIN = null;
	    if (!checkLoginStatus()) {
	        //必须重新判断 别的无刷新事件修改了登录状态
	        //没有登录
	        ISLOGIN = "0";
	        $comment_Msg.children("textarea").attr("readonly", "readonly").css("background", "#fff");
	        $("[data-node=secondCom_Key]").css("display", "none");
	    } else {
	        $comment_Msg.children("textarea").removeAttr("readonly").css("background", "transparent");

	        $a_Submit.removeClass("pc-bj-fc8753").html("发布");

	        $("[data-node=secondCom_Key]").css("display", "block");
	        //添加事件
	        ISLOGIN = "1";
	    }
	    return ISLOGIN;
	};

	// var loginCallback = function() {
	//     $is_Login = 1;
	//     getLoginState();
	//     $(".topic-publish-content").children("textarea").removeAttr("readonly").css("background", "transparent");
	//     $(".publish-face-bx").children("a").removeClass("pc-bj-fc8753").html("发布");
	//     //$("[data-node=circleCom]").empty();
	//     //getCommentList(1, 10, 2);
	// }

	var popUnion = function popUnion() {
	    loginPop();
	};

	var commentCheck = function commentCheck() {
	    if (!checkLoginStatus()) {
	        popUnion();
	        return false;
	    }
	};

	module.exports = {
	    getLoginState: getLoginState,
	    popUnion: popUnion,
	    commentCheck: commentCheck
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 279:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	//二级话题回复
	var getCommentList = __webpack_require__(272);
	var $is_Login = 1;
	var alert = __webpack_require__(37);
	//var hint = require('module/hint.js');
	//var commentList = require('./commentList.tpl');
	var changeContent = __webpack_require__(273); //评论内容转换
	var checkLoginStatus = __webpack_require__(47); //登陆判断
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var loginState = __webpack_require__(278);
	//var face = require('module/popup/face/face');
	//var fromNow = require('utils/fromNow');
	var secondComList = __webpack_require__(280);

	//var $comment_Msg = $("[data-node=comment_Msg]");

	var a_secondComBtn = function a_secondComBtn() {

	    if (!checkLoginStatus()) {
	        loginState.popUnion();
	        return false;
	    }

	    var replayToPub = $(this).parents().eq(2).attr("data-ispublish"); //
	    var beReplyId = "";
	    //var replayImid = "";

	    if (replayToPub == "1") {
	        replayToPub = false;
	    } else {
	        replayToPub = true;
	        beReplyId = $(this).parents().eq(2).attr("data-replycommentid");
	        // var replayImid = "b_" + $(this).parents().eq(2).attr("data-replyuserid");
	    }
	    //var replyUserName = $comment_Msg.attr("data-nickname");
	    //var beReplyUserName = $(this).parents().eq(2).attr("data-replayto");
	    var tId = $(this).attr("data-gettopicid");
	    //var groupId = $("[data-htid=" + tId + "]").attr("data-groupid");

	    //var topicType = $("[data-htid=" + tId + "]").attr("data-topictype");;
	    var topicId = $("[data-htid=" + tId + "]").attr("data-tid");
	    var content = $(this).parents().eq(1).children("textarea").val();
	    // var contentLong = "";

	    // if (content.length > 200) {
	    //     contentLong = true;
	    // } else { 
	    //     contentLong = false;
	    // }
	    //var imId = "b_" + $comment_Msg.attr("data-userid");
	    // var id = $(this).parents().eq(2).attr("data-replycommentid");
	    var replyId = tId;

	    var params = {
	        "topic_reply_id": replyId,
	        "topicid": topicId,
	        "content": content,
	        "topic_subreply_id": beReplyId
	    };

	    if (content) {
	        fetch.post(url.get('secondtopicV2'), {
	            data: params
	        }).then(function (data) {
	            if (data.success) {

	                var contentT = data.data.content;contentT = changeContent(contentT);
	                //判断是二级回复还是三级回复
	                var beReplyUserName = "";
	                var beReplyUserId = "";

	                var SenUserId = checkUserId(data.data.user.id);
	                var threeUserId = "javascript:;";

	                if (replayToPub) {
	                    beReplyUserName = data.data.topicSubReplyUser.nickname;
	                    beReplyUserId = data.data.topicSubReplyUser.id;
	                    // console.log("姓名" + beReplyUserName);
	                    threeUserId = checkUserId(beReplyUserId);
	                }
	                var showCom = {
	                    "SenUserId": SenUserId,
	                    "threeUserId": threeUserId,
	                    "topicType": 0,
	                    "backTopicId": tId,
	                    "parentCommentId": tId, //话题id
	                    "topicId": data.data.topicId,
	                    "replayToPub": replayToPub, //判断是二级回复还是三级回复
	                    "content": contentT, //回复内容
	                    "replyUserName": data.data.user.nickname, //回复人昵称                  
	                    "replyUserId": data.data.user.id, //回复人id
	                    "beReplyUserName": beReplyUserName, //被回复人的昵称
	                    "beReplyUserId": beReplyUserId, //被回复人的id
	                    "replyCommentId": data.data.id // 二级回复内容id 
	                };

	                var item = secondComList(showCom);
	                $("[data-ddlist=" + tId + "]").find(".comments-box").removeClass("hide").append(item);
	                $("[data-parentTopicIdBtn=" + tId + "]").css("display", "none");
	                $("[data-parentTopicId=" + tId + "]").css("display", "none");
	                $("[data-parentTopicId=" + tId + "]").removeAttr("data-replayto");
	                $(".textarea-bx", "[data-parentTopicId=" + tId + "]").val("");
	            } else {
	                if (data.code === 500 || data.message === "请求参数为空") {
	                    alert(data.message);
	                } else {
	                    // console.log(data.code);
	                    if (data.code === 403) {
	                        data.message = "抱歉，该回复审核不通过！";
	                    }
	                    alert(data.message, {
	                        ok: function ok() {
	                            $("[data-node=circleCom]").empty();
	                            getCommentList(topicId, 1, 10, 2);
	                        }
	                    });
	                }
	            }
	        });
	    } else {
	        alert("请输入评论内容！");
	    }
	};

	//点击回复按钮，显示二级输入框
	var secondCom_Key = function secondCom_Key() {
	    if (!checkLoginStatus()) {
	        loginState.popUnion();
	        return false;
	    }

	    var replyuserid = $(this).attr("data-replyuserid");
	    //var replyimId = $(this).attr("data-imId");

	    var replycommentid = $(this).attr("data-replycommentid");
	    var topicid = $(this).attr("data-comid");
	    var username = $(this).attr("data-replayUser");
	    var dataPublis = $(this).attr("data-publish");
	    var isHide = $("[data-parenttopicid=" + topicid + "]").css("display");
	    var dataObj = $("[data-parentTopicId=" + topicid + "]");

	    dataObj.removeAttr("data-replyuserid");
	    //dataObj.removeAttr("data-imId");
	    dataObj.removeAttr("data-replayTo");
	    dataObj.removeAttr("data-replycommentid");
	    dataObj.removeAttr("data-isPublish");
	    //dataObj.attr("data-imId",replyimId);
	    dataObj.attr("data-replyuserid", replyuserid);
	    dataObj.attr("data-replayTo", username);
	    dataObj.attr("data-isPublish", dataPublis);
	    dataObj.attr("data-replycommentid", replycommentid);
	    dataObj.children(".topic-publish-content").children("textarea").attr("placeholder", "回复: " + username);

	    if (isHide == "none") {
	        $(".secondText").css("display", "none");
	        $(".pack-up").css("display", "none");
	        dataObj.css("display", "block");
	        $("[data-parentTopicIdBtn=" + topicid + "]").css("display", "block");

	        var a = $(window).scrollTop() + $(window).height();
	        var b = dataObj.offset().top;
	        if (a + 60 < b) {

	            $('html,body').animate({
	                'scrollTop': dataObj.offset().top - $(window).height() + 185
	            }, 200);
	        }

	        dataObj.children(".topic-publish-content").children("textarea").focus();
	    }
	};

	//隐藏二级输入框
	var hideComBox = function hideComBox() {
	    if (!checkLoginStatus()) {
	        loginState.popUnion();
	        return false;
	    }
	    var hideId = $(this).attr("data-parentTopicIdBtn");
	    $("[data-parentTopicId=" + hideId + "]").css("display", "none");
	    $("[data-parentTopicId=" + hideId + "]").children("textarea").attr("placeholder", "说点什么吧");
	    $("[data-parentTopicIdBtn=" + hideId + "]").css("display", "none");
	    $("[data-parentTopicId=" + hideId + "]").removeAttr("data-isPublish").removeAttr("data-replayTo");
	    $(".textarea-bx", "[data-parentTopicId=" + hideId + "]").val("");
	};

	function checkUserId(id) {
	    if ($is_Login == 1 && $_CONFIG['userId'] == id) {
	        return $_CONFIG.i_domain + 'index';
	    } else {
	        return $_CONFIG.group_domain + 'ta/' + id + '.html';
	    }
	}
	module.exports = {
	    a_secondComBtn: a_secondComBtn,
	    secondCom_Key: secondCom_Key,
	    hideComBox: hideComBox
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/comment/secondComList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,topicType=$data.topicType,backTopicId=$data.backTopicId,topicId=$data.topicId,SenUserId=$data.SenUserId,replyUserId=$data.replyUserId,replyUserName=$data.replyUserName,replayToPub=$data.replayToPub,threeUserId=$data.threeUserId,replyCommentId=$data.replyCommentId,beReplyUserName=$data.beReplyUserName,$string=$utils.$string,content=$data.content,parentCommentId=$data.parentCommentId,imId=$data.imId,$out='';$out+='<div class="comments-s" data-topicType=';
	$out+=$escape(topicType);
	$out+=' data-htId=';
	$out+=$escape(backTopicId);
	$out+=' data-tid=';
	$out+=$escape(topicId);
	$out+='> <a href="';
	$out+=$escape(SenUserId);
	$out+='" target="_blank" data-replyUserId="';
	$out+=$escape(replyUserId);
	$out+='">';
	$out+=$escape(replyUserName);
	$out+='</a> ';
	if(replayToPub){
	$out+=' ：<span>回复</span> <a href="';
	$out+=$escape(threeUserId);
	$out+='" target="_blank" data-replyCommentId ="';
	$out+=$escape(replyCommentId);
	$out+='">';
	$out+=$escape(beReplyUserName);
	$out+='</a> ';
	}
	$out+=' <span data-replyCommentId=';
	$out+=$escape(replyCommentId);
	$out+='>：';
	$out+=$string(content);
	$out+='</span> <a href="javascript:;" class="fr" data-node="secondCom_Key" data-getTopicId=';
	$out+=$escape(backTopicId);
	$out+=' data-replayUser=';
	$out+=$escape(replyUserName);
	$out+=' data-publish="0" data-comId="';
	$out+=$escape(parentCommentId);
	$out+='" data-replyCommentId="';
	$out+=$escape(replyCommentId);
	$out+='" data-imId="';
	$out+=$escape(imId);
	$out+='" data-replyUserId=';
	$out+=$escape(replyUserId);
	$out+=' >回复</a> </div> ';
	return new String($out);
	});

/***/ },

/***/ 281:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	//二级列表
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var changeContent = __webpack_require__(273); //评论内容转换
	var secondComList = __webpack_require__(280);
	var checkLoginStatus = __webpack_require__(47); //登陆判断

	var $is_Login = checkLoginStatus() == true ? 1 : 0; // 判断登陆状态


	var showMoreList = function showMoreList() {

	    //var groupId = $(this).attr("data-groupId");
	    //var imId = $(this).attr("data-imId");
	    //var topicType = $(this).attr("data-topicType");
	    var commentid = $(this).attr("data-htid");
	    //var tid = $(this).attr("data-tid");
	    //var tootalPages = $(this).attr("data-tootlePages"); //
	    //var currentPage = $(this).attr("data-currentPage"); //当前页数
	    //var pageSize = $(this).attr("data-pageSize"); //当前展示列表数
	    //var a = Math.ceil(parseInt(tootalPages) / parseInt(pageSize)); //获取总页数
	    // var b = parseInt(tootalPages) % parseInt(pageSize); //获取最后一页的列表数目
	    //var toPage = parseInt(currentPage) + 1;
	    var obj = $(this);
	    var paramList = '?page=1&pagesize=70&topic_replyid=' + commentid;
	    var objHtml = obj.html();

	    if (objHtml === "查看回复...") {
	        getRelyList(paramList, obj);
	    } else {
	        //
	        var childrens = $("[data-ddlist=" + commentid + "]").find(".comments-s");
	        //console.log(childrens);
	        for (var k = 2; k < childrens.length; k++) {
	            childrens.eq(k).remove();
	        }
	        obj.html("查看回复...");
	    }

	    function getRelyList(paramList, obj) {
	        fetch.get(url.get('getRelyListV2') + paramList).then(function (data) {
	            //console.log(data);

	            var replyCommentList = data.data.topicSubReplys;
	            if (replyCommentList.length > 2) {

	                $("[data-ddlist=" + commentid + "]").find(".comments-box").empty();
	                for (var i = 0; i < replyCommentList.length; i++) {

	                    var replyaList = replyCommentList[i];
	                    var content = replyaList.content;
	                    content = changeContent(content);
	                    var beReplyUserName = "";
	                    var beReplyUserId = "";
	                    var replayToPub = false;
	                    // console.log(replyaList);
	                    var SenUserId = checkUserId(replyaList.user.id);
	                    var threeUserId = "javascript:;";

	                    if (replyaList.topicSubReplyUser) {
	                        beReplyUserName = replyaList.topicSubReplyUser.nickname;
	                        beReplyUserId = replyaList.topicSubReplyUser.id;
	                        replayToPub = true;
	                        threeUserId = checkUserId(beReplyUserId);
	                    }
	                    var showCom = {
	                        "SenUserId": SenUserId,
	                        "threeUserId": threeUserId,
	                        "topicType": 0,
	                        "backTopicId": commentid,
	                        "parentCommentId": commentid, //话题id
	                        "topicId": replyaList.topicId,
	                        "replayToPub": replayToPub, //判断是二级回复还是三级回复
	                        "content": content, //回复内容
	                        "replyUserName": replyaList.user.nickname, //回复人昵称                  
	                        "replyUserId": replyaList.user.id, //回复人id
	                        "beReplyUserName": beReplyUserName, //被回复人的昵称
	                        "beReplyUserId": beReplyUserId, //被回复人的id
	                        "replyCommentId": replyaList.id // 二级回复内容id 
	                    };
	                    var item = secondComList(showCom);
	                    //console.log(showCom);
	                    $("[data-ddlist=" + commentid + "]").find(".comments-box").append(item);
	                    // if ($is_Login == "0") {
	                    //     $("[data-node=secondCom_Key]").css("display", "none");
	                    // }
	                    obj.html("收起");
	                    //obj.css("display", "none");
	                }
	            } else {
	                obj.addClass("hide");
	                $("[data-ddlist=" + commentid + "]").parent().addClass("bd-bottom");
	            }
	        });
	    }
	};

	function checkUserId(id) {
	    if ($is_Login == 1 && $_CONFIG['userId'] == id) {
	        return $_CONFIG.i_domain + 'index';
	    } else {
	        return $_CONFIG.group_domain + 'ta/' + id + '.html';
	    }
	}
	module.exports = showMoreList;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	//表情添加

	var checkLoginStatus = __webpack_require__(47); // 登陆判断
	var face = __webpack_require__(234);
	var loginState = __webpack_require__(278);

	var curretTextArea = [];
	var selectText = function selectText(textbox, startIndex, stopIndex) {
	    if (textbox.setSelectionRange) {
	        textbox.setSelectionRange(startIndex, stopIndex);
	    } else if (textbox.createTextRagen) {
	        var range = textbox.createTextRange();
	        range.collapse(true);
	        range.moveStart('character', startIndex);
	        range.moveEnd('character', stopIndex - startIndex);
	        range.select();
	    }
	    textbox.focus();
	};

	var insertAtCursor = function insertAtCursor(textbox, text) {
	    //console.log(textbox);
	    if (textbox.selectionStart >= 0) {
	        var val = textbox.value;
	        var startIndex = textbox.selectionStart;
	        //var endIndex = textbox.selectionEnd;
	        textbox.value = val.substring(0, startIndex) + text + val.substring(textbox.selectionEnd);
	        textbox.selectionStart = textbox.selectionEnd = startIndex + text.length;
	        textbox.focus();
	    } else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
	        textbox.focus();
	        var range = document.selection.createRange();
	        range.text = text;
	        range.select();
	    }
	};
	var showEmoji = function showEmoji() {
	    if (!checkLoginStatus()) {
	        loginState.popUnion();
	        return false;
	    }

	    var $this = $(this);
	    var offset = $this.offset();
	    var x = offset.left - 2;
	    var y = offset.top + 38;

	    curretTextArea = $this.closest('.topic-publish-content').children("textarea");
	    //console.log(curretTextArea.attr("class"));
	    if ($('[data-node=faceBox]').is(':hidden')) {
	        face.show(x, y);
	    } else {
	        face.hide();
	    }

	    return false;
	};

	module.exports = {
	    showEmoji: showEmoji,
	    insertAtCursor: insertAtCursor,
	    selectText: selectText,
	    curretTextAreaObj: function curretTextAreaObj() {

	        return curretTextArea.get(0);
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var getCommentList = __webpack_require__(272); //

	//var $loadlist = $("[data-node=loadlist]");
	//var $comment_Msg = $("[data-node=comment_Msg]");
	//var $a_Submit = $("[data-node=a_Submit]");
	//var $circleCom = $("[data-node=circleCom]");
	var checkLoginStatus = __webpack_require__(47); //登陆判断
	var DIVOBJ = $("[data-node = more-topic]");
	var loginPop = __webpack_require__(3);
	var lodingMore = function lodingMore() {

	    //加载更多

	    //$("[data-node=loading]").css("display", "none");
	    //$("[data-node=noload]").css("display", "none");

	    DIVOBJ.on("click", "[data-node=loadlist]", function () {
	        var topicId = $(this).parent("[data-node=hidDiv]").attr("data-comtopicid");
	        //console.log(topicId);
	        var addmorepages = $(this).attr("data-addmorepages"); //当前页
	        var listsize = $(this).attr("data-listsize"); //
	        //var tootalPa = $(this).attr("data-tootlepa"); //总页数
	        var toPage = parseInt(addmorepages) + 1;
	        var nodelist = "nodelist";
	        getCommentList(topicId, toPage, listsize, 5, nodelist);
	        return false;
	    });
	};

	// 点击评论图标页面滚动到评论区域
	var goComment = function goComment() {

	    var $body = $('body');
	    $body.on('click', "[data-action=goComment]", function () {
	        if (!checkLoginStatus()) {
	            loginPop();
	            return false;
	        }
	        var id = $($(this).parents()[2]).attr("data-conter-ul");
	        //console.log(id);
	        if (window.BP) {
	            BP.send({
	                event_id: 'G000P008',
	                group_id: $_CONFIG.groupid,
	                topic_id: $_CONFIG.topicid,
	                circle_type: $_CONFIG.s_c,
	                channel_id: 'in-pinglun'
	            });
	        }

	        var $topObj = $("[data-left=" + id + "]").children("[data-node=commentBox]");
	        var offsetTop = $topObj.offset().top;
	        $("[data-tid=" + id + "]").children("textarea").focus();
	        $('html,body').animate({
	            'scrollTop': offsetTop
	        }, 200);
	    });
	};

	module.exports = {
	    lodingMore: lodingMore,
	    goComment: goComment
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(37);
	var tips = __webpack_require__(36).circle;

	// var popTpl = "<p data-node='alertTitle' class='dialog_p'>申请已发送，请耐心等待</p><img data-node='QRcode' src=''><p class='dialog_p'>下载国美PlusAPP随时关注</p>";

	var join = function join(event) {
	    var $els = event.data ? event.data.selector || $(this) : $(this);
	    var done = event.data ? event.data.done || function () {} : function () {};
	    var groupId = $els.attr('data-groupid'),
	        bpData = {
	        event_id: $els.attr('event-id'), // 埋点数据
	        group_id: groupId,
	        circle_type: $_CONFIG['s_c'] // 2级分类
	    };
	    if ($_CONFIG['topicid']) {
	        bpData.topic_id = $_CONFIG['topicid'];
	    }
	    // 发送统计数据
	    if (window.BP !== undefined) {
	        BP.send(bpData);
	    }

	    if ($els.attr('data-verif') == 1) {
	        alert('您已提交申请，请等待审核');
	        return;
	    }
	    var firing = $els.attr('data-firing');
	    if (firing == 1) {
	        return false;
	    }
	    $els.attr('data-firing', 1);
	    var userid = $els.attr('data-userid');
	    // var approvaltype = $els.attr('data-approvaltype');
	    var noRefreshFetch = function noRefreshFetch() {
	        fetch.post(url.get('joinCircle'), {
	            validate: true,
	            data: {
	                groupid: groupId,
	                imid: 'b_' + userid
	            },
	            onLogin: function onLogin() {
	                $_CONFIG['islogin'] = '1';
	                noRefreshFetch();
	            }
	        }).done(function (data /*, textStatus, jqXHR*/) {
	            if (data && data.code === 200 && data.success) {
	                if (data.data.status === 0) {
	                    alert(tips.joinSuccess);
	                    $els.html('退出圈子');
	                } else if (data.data.status === 1) {
	                    // alert('申请已发送，请耐心等待');
	                    // var Dialog = alert('', {
	                    //     width: "500px",
	                    //     content: popTpl,
	                    //     cancel: false
	                    // });
	                    $('[data-node=QRcode]').attr('src', $_CONFIG.imgpath + '/images/public/down-ma.png');
	                    $('.dialog_p').css({
	                        'text-align': 'center',
	                        'margin': '10px 0px',
	                        'font-size': '1.5em'
	                    });
	                    $('[data-node=QRcode]').css({
	                        'margin-left': '173px'
	                    });
	                    $els.css('background', '#CCC').html('审核中').off();
	                }
	                done('join');
	            } else {
	                if (data.message == '圈子拒绝加入' || data.code === 403) {
	                    alert(tips.cannotJoinCircle);
	                } else if (data.code === 409) {
	                    alert(data.message);
	                    done('join');
	                } else {
	                    alert(data.message);
	                }
	            }
	        }).fail(function () /*jqXHR, textStatus, errorThrown*/{
	            // console.log(arguments);
	        }).always(function () {
	            $els.attr('data-firing', 0);
	        });
	    };
	    var exitCircle = function exitCircle() {
	        fetch.post(url.get('exitCircle'), {
	            data: {
	                groupid: groupId
	            }
	        }).done(function (data /*, textStatus, jqXHR*/) {
	            if (data && data.code == 200 && data.success) {
	                alert(tips.exit);
	                $_CONFIG['member_type'] = 1;
	                $els.html('加入圈子');
	            } else {
	                if (data.code == 410) {
	                    alert(tips.dissolved, {
	                        ok: function ok() {
	                            location.reload();
	                        },
	                        onclose: function onclose() {
	                            location.reload();
	                        }
	                    });
	                } else if (data.code == 404) {
	                    location.reload();
	                }
	            }
	        }).fail(function () /*jqXHR, textStatus, errorThrown*/{
	            // console.log(arguments);
	        }).always(function () {
	            $els.attr('data-firing', 0);
	        });
	    };
	    if ($_CONFIG['member_type'] == 0) {
	        exitCircle();
	    } else {
	        noRefreshFetch();
	    }
	    return false;
	};
	module.exports = join;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	//加关注
	var dialogAlert = __webpack_require__(37);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var popTpl = __webpack_require__(286);
	var alert = __webpack_require__(37);

	var init = function init(node, isfollowed) {
		if ($_CONFIG.islogin === 0) {
			alert('您还未登录,请登录后重试');
			return false;
		}
		var _node = node;
		var Request = function Request(option, node) {
			var _Rnode = node || false;
			fetch.get(option.url, {
				data: {
					userid: option.userid
				}
			}).done(function (data) {
				if (data.code == '200') {
					if (option.isAlert) {
						var Dialog = dialogAlert('', {
							width: '600',
							content: popTpl(),
							ok: false,
							close: function close() {
								Dialog.remove();
							}
						});
						$('[data-node=QRcode]').attr('src', $_CONFIG.imgpath + '/images/public/down-ma.png');
						$('[data-node=dialog_close]').on('click', function () {
							$(this).off();
							Dialog.remove();
						});
						$(_node).css('opacity', '0.7');
					} else {
						$(_node).css('opacity', '1');
					}
					if (_Rnode) {
						init(_Rnode);
					}
				} else {
					alert(data.message);
					if (_Rnode) {
						init(_Rnode);
					}
				}
			});
			_node.html(option.val);
		};
		if (isfollowed || isfollowed == '1' || !isfollowed == undefined) {
			_node.html('已关注').css('opacity', '0.7');
		}
		_node.on('click', function () {
			if ($_CONFIG.islogin == 0) {
				alert('您还未登录,请登录后重试');
				return false;
			}
			var option = {};
			option.userid = $(this).data('userid');
			if ($(this).html() == '已关注') {
				option.isAlert = false;
				option.url = url.get('unfollow');
				option.val = '加关注';
				$(this).off();
				Request(option, _node);
			} else {
				option.isAlert = true;
				option.url = url.get('follow');
				option.val = '已关注';
				$(this).off();
				Request(option, _node);
			}
		});
	};

	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 286:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/follow','<div class="windows-bg" style="display:block"> <div class="windows-ma"><a data-node=\'dialog_close\' href="javascript:;" class="icon icon-close">&times;</a><img data-node=\'QRcode\' src=""> <p>扫描二维码，下载国美PlusAPP查看消息</p> </div> </div>');

/***/ },

/***/ 287:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	var praise = __webpack_require__(256);

	var $praiseClick = $("[data-node=praiseClick]");

	if ($praiseClick.children("em").hasClass("active")) {
	    $praiseClick.children("span").html("取消点赞");
	}

	var init = function init() {
	    praise('body', '[data-node=praiseClick]', {
	        mode: 'normal'
	    });
	    /* praise('[data-node=hot_topics]', '[data-action=like]', {
	         mode: 'normal'
	     });
	     */

	    return false;
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 288:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var share = __webpack_require__(123).shareto;

	var init = function init() {
	    var $body = $("body");
	    //var $wx = $('[data-node=wx]');
	    // var $wb = $('[data-node=wb]');
	    //var $qq = $('[data-node=qq]');
	    //var $qzone = $('[data-node=qzone]');

	    var gomeplusLogo = $_CONFIG.imgpath + '/images/public/down-logo.png';

	    var getShareInfo = function getShareInfo($node) {
	        var $ul = $node.closest('ul');
	        var shareInfo = {
	            url: $ul.data('surl'),
	            title: $ul.data('stitle'),
	            pic: $ul.data('spic') || gomeplusLogo,
	            desc: $ul.data('content')
	        };
	        return shareInfo;
	    };

	    var shareTo = function shareTo(type) {
	        return function () {
	            var info = getShareInfo($(this));
	            //console.log(info);
	            var topicId = $(this).closest('.topic-conter').attr("data-conter-ul");
	            //console.log(topicId);
	            share[type](info);
	            analytic(type, topicId); // 发送统计数据
	            return false;
	        };
	    };

	    var evtType = 'click';
	    var $conf = $_CONFIG;

	    var channels = {
	        'wx': 'out-weixin',
	        'sina': 'out-xlwb',
	        'qq': 'out-QQ',
	        'qzone': 'out-Qqzone'
	    };
	    var analytic = function analytic(channel, topicId) {
	        BP.send({
	            event_id: 'G000P008',
	            group_id: $conf.groupid,
	            topic_id: topicId,
	            circle_type: $conf.s_c,
	            channel_id: channels[channel] || ''
	        });
	    };
	    $body.on(evtType, "[data-node=wx]", function () {
	        // 当前话题页所对应的wap页的地址
	        // https://m-pre.gomeplus.com/group/topic?topicId=56dfeac86af14853711f4668
	        var topicid = $(this).closest('.topic-conter').attr("data-conter-ul");
	        share.weixin({
	            url: $_CONFIG.wap_url + 'group/topic?topicId=' + topicid
	        });
	        analytic('wx'); // 发送统计数据
	        return false;
	    });
	    $body.on(evtType, "[data-node=wb]", shareTo('sina'));
	    $body.on(evtType, "[data-node=qq]", shareTo('qq'));
	    $body.on(evtType, "[data-node=qzone]", shareTo('qzone'));
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	/**
	 * 话题收藏/取消收藏
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(37);
	var Pubsub = __webpack_require__(48);
	var channel = __webpack_require__(71);

	var login = function login() {
	    window.location.href = $_CONFIG.passport_domain + 'login/index';
	};
	var $collect = $("[data-node=collect]");
	if ($collect.children("em").parent().hasClass("active")) {
	    $collect.children("span").html("取消收藏");
	    // $collect.attr("data-status","1");
	}

	var init = function init() {
	    var $body = $("body");
	    $body.on('click', "[data-node=collect]", function () {
	        var $CONF = $_CONFIG;
	        if (window.BP) {
	            BP.send({
	                event_id: 'G000P008',
	                group_id: $CONF.groupid,
	                topic_id: $($(this).parents()[2]).attr("data-conter-ul"),
	                circle_type: $CONF.s_c,
	                channel_id: 'in-shoucang'
	            });
	        }

	        var $this = $(this);
	        var firing = $this.data('firing');
	        if (firing) {
	            return false;
	        }
	        $this.data('firing', 1);
	        var iscollect = $this.data('status');
	        // 1 收藏, 2 取消收藏
	        var t = iscollect === 0 ? 1 : 2;

	        //console.log($($this.parents()[2]).attr("data-conter-ul"));
	        var objs = {
	            validate: true,
	            data: {
	                groupId: $_CONFIG['groupid'],
	                topicId: $($this.parents()[2]).attr("data-conter-ul"),
	                type: t
	            },
	            onLogin: noRefreshFetch,
	            refresh: true // 目前登录和收藏需要刷新页面
	        };

	        //无刷新登录
	        function noRefreshFetch(o) {
	            fetch.post(url.get('collectTopic'), o).done(function (data) {
	                //订阅评论区编辑状态
	                Pubsub(channel.comment.enableEditor).pub({
	                    pid: "enable"
	                });
	                if (data && data.code === 200 && data.success) {
	                    if (t === 1) {
	                        $this.data('status', 1);
	                        $this.find('em').parent().addClass('active');
	                        $this.find('span').text('取消收藏');
	                    } else if (t === 2) {
	                        $this.data('status', 0);
	                        $this.find('em').parent().removeClass('active');
	                        $this.find('span').text('收藏');
	                    }
	                } else if (data && data.code === 422) {
	                    login();
	                } else {
	                    alert(data.message);
	                }
	            }).fail(function () {}).always(function () {
	                $this.data('firing', 0);
	            });
	        }

	        noRefreshFetch(objs);
	        return false;
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 290:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	var titel = __webpack_require__(291);
	var comList = __webpack_require__(292);
	var commentBox = __webpack_require__(293);
	var topicRight = __webpack_require__(294);
	__webpack_require__(197);

	__webpack_require__(295);

	var getCommentList = __webpack_require__(272);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);

	var clickTopicId = $_CONFIG['topicid'];
	var clickTopicObj = { "name": $_CONFIG['topic_title'], "id": clickTopicId };
	//console.log(clickTopicObj);
	var len = 0;
	var lastScroll = 0;

	var downLoadTopic = [clickTopicObj]; //已加载的有效话题id  

	var OpenedTop = [clickTopicObj]; //记录页面已经滑过的话题id	 
	var ListTopsValid = [];

	var arrayIdBoolean = []; //改变ul地址的判断
	var idVideo = [];
	var videoObj = [];
	//var vid = null;

	var $no_next = $_CONFIG['no_next']; //1 false

	var imgPath = $_CONFIG['imgpath'];
	var isLogin = $_CONFIG['islogin'];

	function addDivHtml(newMsg1) {
	    var newMsg = newMsg1;
	    var id = newMsg.id;
	    var borderBox = $('<div class="more-topic"></div>');
	    var elemTopicBox = $('<div class="wrap-box ovflow-hid wrap-reletive " data-node="wrap-box" id-node=' + id + '></div>'),
	        //总第div
	    elemTopicLeft = $('<div class="topic-lfet" data-left=' + id + '></div>') /*, //左侧
	                                                                             elemTopicRight = $('<div class="topic-right topic-absolute"></div>')*/; //右侧
	    var topicRT = $(".topic-r-t").html();
	    var hotTopicUl = $("[data-node=hot_topics]").html();

	    //右侧的参数
	    var rightNextMsg = {
	        topicRT: topicRT,
	        hotTopicUl: hotTopicUl,
	        id: id,
	        nextTopName: newMsg.topicName,
	        nextTopTime: newMsg.lastReplyTime
	    };

	    var elemTitle = titel(newMsg); //头部
	    var elemCommentBox = commentBox(newMsg);
	    var elemComList = comList(newMsg); //评论
	    var elemRight = topicRight(rightNextMsg);

	    $(elemTopicLeft).append(elemTitle);
	    $(elemTopicLeft).append(elemCommentBox);
	    $(elemTopicLeft).append(elemComList);

	    $(elemTopicBox).append($(elemTopicLeft));
	    $(elemTopicBox).append($(elemRight));

	    $(borderBox).append(elemTopicBox);

	    $("[data-node=more-topic]").append($(borderBox));
	    $("img").lazyload({ effect: "fadeIn" });
	}

	function getVideo() {

	    var videoArr = $_CONFIG['video_arr'];
	    var newVideo = [];
	    if (videoArr.length > idVideo.length) {

	        newVideo = videoArr.slice(idVideo.length);
	        for (var i = 0; i < newVideo.length; i++) {

	            var _video = newVideo[i];
	            var video_id = _video.base.id;

	            var v = new MeixinPlayer();
	            v.init(video_id, 'videoContainer_' + video_id, _video.config);
	            idVideo.push(newVideo[i]);
	            videoObj.push(v);

	            v.on('playStart', function () {
	                for (var i = 0; i < videoObj.length; i++) {
	                    if (videoObj[i] === v) {
	                        return false;
	                    } else {
	                        videoObj[i].stopVideo();
	                    }
	                }
	            }, v);
	        }
	    } else {
	        return false;
	    }
	}

	function getNextTopicId(openTopicId) {
	    //console.log(openTopicId);
	    arrayIdBoolean.push(openTopicId);

	    fetch.get(url.get('getNextTopic') + "?topicid=" + openTopicId).then(function (data) {

	        if (data.success == true && data.code == 200) {
	            var $getNext = $("[data-get-next-topic = " + openTopicId + "]");
	            $getNext.children("a").html(data.data.name).attr("href", "/topic/" + data.data.id + ".html").attr("target", "_blank");
	            $getNext.children(".f12").html(data.data.lastReplyTime);
	            $getNext.slideDown("slow");
	            //获取下个话题的信息，id
	            var userImage = $_CONFIG['headface'];
	            var pathImg = $_CONFIG['pcimgpath'];
	            if (!userImage) {
	                userImage = pathImg + "/images/public/head-default.png";
	            }
	            var isExpert = $_CONFIG['isExpert'] ? true : false; //是否为达人

	            //console.log(isLogin);
	            var isLoginClass = "";
	            var isLoginStr = '';
	            var readyOnly = '';
	            if (isLogin == "0") {
	                isLoginStr = "登录";
	                isLoginClass = "pc-bj-fc8753";
	                readyOnly = "readonly";
	                //var headface
	            } else {
	                isLoginStr = "发布";
	                isLoginClass = "";
	                readyOnly = "";
	            }

	            var dataStr = data.data;
	            var id = dataStr.id;
	            var name = data.data.name;
	            $("body").attr("data-currentTopicId", openTopicId);
	            $("body").attr("data-nextTopicId", id);

	            downLoadTopic.push({
	                "name": name,
	                "id": id
	            });

	            // 点赞和收藏

	            //var likeIS = dataStr.ext.praise.isLike == false ? "" : "active";
	            var UserId = checkUserId(dataStr.user.id);
	            var allNum = parseInt(dataStr.replyQuantity + dataStr.subReplyQuantity);
	            var newMsg = {
	                UserId: UserId,
	                html: dataStr.html,
	                isEssence: dataStr.isEssence, //精品,
	                isUpper: dataStr.isUpper, //置顶,
	                style: dataStr.style == "0" ? false : true, //专访
	                topicName: dataStr.name, //话题名称
	                id: id, //话题ID
	                imgPath: imgPath,
	                facePicUrl: dataStr.user.facePicUrl, // 话题 用户头像
	                nickName: dataStr.user.nickname, //话题 用户名
	                groupCircleName: dataStr.group.name, //来自圈子
	                lastReplyTime: dataStr.lastReplyTime, //话题时间
	                allNum: allNum, //评论数
	                extGroupUrl: dataStr.ext.group_url, // 圈子路径

	                extImagesLst: dataStr.ext.surl, //左侧ul上添加的数据
	                share_text: dataStr.ext.share_text, // 左侧ul上的data-content 属性值
	                extSpic: dataStr.ext.images_lst,
	                extStitle: dataStr.name,

	                isLike: dataStr.ext.praise.isLike == false ? "" : "active", //点赞
	                isLikeName: dataStr.ext.praise.isLike == false ? "点赞" : "取消点赞", //点赞
	                userQuantity: dataStr.ext.praise.userQuantity, // 点赞数
	                userCollection: dataStr.userCollection.result == 0 ? "" : "active", //收藏
	                userCollectionName: dataStr.userCollection.result == 0 ? "收藏" : "取消收藏", //收藏
	                userCollectionStatu: dataStr.userCollection.result == 0 ? 0 : 1,
	                dataParise: dataStr.ext.praise.isLike == false ? "1" : "0", //点赞

	                isExpert: isExpert, //是否是达人
	                userImage: userImage, //用户头像
	                groupId: data.data.groupId, //groupid

	                isLoginStr: isLoginStr, //根据是否登陆判断显示 按钮内容
	                isLoginClass: isLoginClass, //根据是否登陆显示  样式
	                readyOnly: readyOnly //根据是否登陆判断是  只读还是可写

	            };
	            //填写数据
	            addDivHtml(newMsg); //添加数据到页面
	            if (allNum != 0) {
	                getCommentList(id, 1, 10, 2);
	            }
	            ListTopsValid.push({
	                "name": name,
	                "id": id
	            });

	            var topRightH = $("[data-topicrt=" + openTopicId + "]");
	            var h = topRightH.children(".topic-r-t").height() + topRightH.children(".topic-position").height();

	            $("[id-node=" + openTopicId + "]").css("min-height", h + "px");
	        } else if (data.success == false && data.code == 404) {
	            return false;
	        }
	    });
	}

	//鼠标下滑			
	function addMoreEvent(s) {
	    //var TopicIdNext = $("body").attr("data-nexttopicid"); //
	    if (len == -1) {
	        // 已经滑过的对象数字
	        OpenedTop.push(clickTopicObj); //clickTopic
	        len = 0;
	    }

	    if (ListTopsValid.length - 1 == len) {

	        var id = ListTopsValid[ListTopsValid.length - 1].id;
	        var name = ListTopsValid[ListTopsValid.length - 1].name;

	        if (s > $("[id-node=" + id + "]").offset().top) {

	            History.replaceState({}, name, id + ".html");
	            OpenedTop.push({
	                name: name,
	                id: id
	            });

	            if ($no_next == 0 && arrayIdBoolean[arrayIdBoolean.length - 1] != id) {
	                getNextTopicId(id);
	            }
	            getVideo();
	            len++;
	        }
	    }

	    if (ListTopsValid.length - 1 > len) {
	        var id1 = ListTopsValid[len].id;
	        var name1 = ListTopsValid[len].name;

	        if (s > $("[id-node=" + id1 + "]").offset().top) {
	            History.replaceState({}, name1, id1 + ".html");
	            OpenedTop.push({
	                name: name1,
	                id: id1
	            });
	            len++;
	        }
	    }
	}
	//鼠标上滑
	function scrollToTop(t) {

	    var id = "";
	    var nextiD = "";
	    var name = "";
	    if (len < 1) {
	        nextiD = clickTopicObj.id;
	        name = clickTopicObj.name;
	    } else {
	        id = OpenedTop[len].id;
	        nextiD = OpenedTop[len - 1].id;
	        name = OpenedTop[len - 1].name;
	    }
	    if (id) {
	        //var scrollTop = $(this).scrollTop();
	        if (t < $("[id-node=" + id + "]").offset().top) {
	            History.replaceState({}, name, nextiD + ".html");
	            OpenedTop.length = len;
	            len--;
	        }
	    }
	}

	//右侧 固定
	function topFixed(scrollTop) {

	    var showTopicID = OpenedTop[OpenedTop.length - 1].id; //当前话题id
	    var $showDiv = $("[id-node=" + showTopicID + "]"); //当前话题的div
	    var $showRight = $showDiv.children(".topic-right "); //右侧整体
	    var $thisScroll = $showRight.children("[data-node=topic_xi]"); // 滚动部分
	    var $showLeft = $showDiv.children(".topic-lfet"); //左侧

	    var showDivHeight = $showDiv.height(); // 话题整体高度
	    var showRightHeight = $showRight.height(); //右侧高度
	    var thisScrollHeight = $thisScroll.height(); //热门话题的高度
	    var windowHight = $(window).height(); //窗口高度
	    var showLeftHeight = $showLeft.height(); //左侧高度

	    var floatRight = $("body").width() - $(".wrap-box").width();
	    floatRight = parseInt(floatRight) / 2; //右边浮动的宽度

	    var s = scrollTop; //鼠标滚动的高度
	    var TopShow = parseInt($showDiv.offset().top); //整个话题div距离顶部的高度
	    var topicRT = TopShow + 320; //热门话题距离页面顶部的距离
	    var BottomShow = parseInt(TopShow) + showDivHeight; //热门话题距离页面底部的距离，应该减去热门话题的高度


	    // 左侧小于右侧，不操作
	    if (showLeftHeight <= showRightHeight) {
	        return false;
	    } else {
	        var pp = null;
	        var autoTop = null;
	        var opx = null;
	        //var toTopHeight = $(".topic-r-t").height();

	        var h = 0;
	        //var m = 0;
	        if (windowHight > thisScrollHeight) {
	            h = windowHight - thisScrollHeight;
	        } else {
	            //m = thisScrollHeight - windowHight;
	        }

	        if (thisScrollHeight <= windowHight) {
	            //吸顶
	            pp = topicRT;
	            autoTop = "0px";
	            opx = "auto";
	        } else {
	            //吸底
	            pp = topicRT - windowHight + thisScrollHeight;
	            autoTop = "auto";
	            opx = "0px";
	        }

	        //var h = windowHight - thisScrollHeight;
	        if (s > pp && s + windowHight <= BottomShow + h) {
	            $($thisScroll).css({
	                "position": "fixed",
	                "right": floatRight + "px",
	                "top": autoTop,
	                "bottom": opx
	            });
	        } else if (s + windowHight > BottomShow + h) {
	            $($thisScroll).css({
	                "position": "absolute",
	                "right": "0px",
	                "top": "auto",
	                "bottom": "0px"
	            });
	        } else if (s < pp) {
	            $($thisScroll).css({
	                "position": "absolute",
	                "right": "0px",
	                "top": "320px",
	                "bottom": "auto"
	            });
	        }
	    }
	}

	function ulFixt(scrollTop) {
	    var containerId = OpenedTop[OpenedTop.length - 1].id; //当前话题id
	    var $divConter = $("[data-conter-ul=" + containerId + "]");
	    var $ul = $($divConter).children("ul");
	    var divTop = $divConter.offset().top;
	    var divHeight = $divConter.height();
	    var ulHeight = $ul.height();
	    var s = divHeight + divTop - ulHeight;

	    var leftS = $(".wrap-box.ovflow-hid").css("margin-left");
	    leftS = parseInt(leftS.substring(0, leftS.length - 2)) + 20;

	    if (scrollTop > divTop && scrollTop < s) {
	        $ul.css({
	            "position": "fixed",
	            "top": "6px",
	            "left": leftS + "px",
	            "bottom": "auto"
	        });
	    } else if (scrollTop > s) {
	        $ul.css({
	            "position": "absolute",
	            "top": "auto",
	            "left": "0px",
	            "bottom": "0px"
	        });
	    } else if (scrollTop < divTop) {
	        $ul.css({
	            "position": "absolute",
	            "top": "0",
	            "bottom": "auto",
	            "left": "0px"
	        });
	    }
	}

	function checkUserId(id) {
	    if (isLogin == 1 && $_CONFIG['userId'] == id) {
	        return $_CONFIG.i_domain + 'index';
	    } else {
	        return $_CONFIG.group_domain + 'ta/' + id + '.html';
	    }
	}

	// 返回顶部a
	function toTopBtn() {
	    var $Btn = $("[data-node=top]");
	    $Btn.off();
	    var btnScroll = -1;

	    $Btn.on("click", function () {

	        var topicId = "";
	        var winScrollTop = parseInt($(window).scrollTop());
	        $(this).attr("data-winScrollTop", winScrollTop);
	        if (btnScroll == winScrollTop) {
	            OpenedTop = [clickTopicObj];
	            topicId = OpenedTop[OpenedTop.length - 1]; //当前话题id
	            len = 0;
	            $("html, body").scrollTop(10);
	            History.replaceState({}, topicId.name, topicId.id + ".html");
	        } else {
	            topicId = OpenedTop[OpenedTop.length - 1].id; //当前话题id
	            var dropTop = parseInt($("[id-node=" + topicId + "]").offset().top);
	            $(window).scrollTop(dropTop);
	            btnScroll = dropTop;
	        }
	        $(this).attr("data-btnScroll", btnScroll);
	        //console.log("winScrollTop: "+winScrollTop +" dropTop: "+dropTop);
	    });
	}

	var init = function init() {
	    getVideo();
	    toTopBtn();
	    History.Adapter.bind(window, 'statechange', function () {
	        //var State = History.getState(); 
	        //History.log('statechange:', State.data, State.title, State.hash);
	    });

	    //var topicRT = $(".topic-r-t").html(); // 右侧的html
	    //var hotTopicUl = $("[data-node=hot_topics]").html(); //热门话题的html

	    //获取下一个话题
	    if ($no_next == 0) {
	        getNextTopicId(clickTopicId);
	    }

	    //鼠标滚动事件
	    $(window).on("scroll", function () {

	        var scrollTop = $(this).scrollTop();
	        var windowHight = $(window).height();
	        var s = parseInt(scrollTop + windowHight / 3);
	        topFixed(scrollTop);
	        ulFixt(scrollTop);
	        // 视频暂停	
	        if (scrollTop - lastScroll > 0) {
	            //下滑
	            // 判断并加载话题		
	            //addMoreEvent(s,ListTopsSub);
	            addMoreEvent(s);
	        } else {
	            //上滑
	            //改变ulr地址
	            scrollToTop(s);
	        }
	        lastScroll = scrollTop;
	    });
	};
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 291:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/topicAddMore/title',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,isUpper=$data.isUpper,isEssence=$data.isEssence,style=$data.style,$string=$utils.$string,topicName=$data.topicName,UserId=$data.UserId,facePicUrl=$data.facePicUrl,nickName=$data.nickName,extGroupUrl=$data.extGroupUrl,groupCircleName=$data.groupCircleName,lastReplyTime=$data.lastReplyTime,allNum=$data.allNum,userQuantity=$data.userQuantity,extImagesLst=$data.extImagesLst,extSpic=$data.extSpic,extStitle=$data.extStitle,share_text=$data.share_text,dataParise=$data.dataParise,isLike=$data.isLike,isLikeName=$data.isLikeName,userCollectionStatu=$data.userCollectionStatu,userCollection=$data.userCollection,userCollectionName=$data.userCollectionName,html=$data.html,$out='';$out+='<div class="bjfff" data-node="tiles" data-title =';
	$out+=$escape(id);
	$out+=' > <div class="topic-title0"> <h1> ';
	if(isUpper){
	$out+='<em class="set-top">置顶</em> ';
	}
	$out+=' ';
	if(isEssence){
	$out+='<em class="set-spark">精品</em> ';
	}
	$out+=' ';
	if(style){
	$out+='<em class="set-access">专访</em> ';
	}
	$out+=' ';
	$out+=$string(topicName);
	$out+=' </h1> <p class="topic-source" data-node="likewrap"> <a href="';
	$out+=$escape(UserId);
	$out+='" target="_blank"> <img onerror="imgError(this, \'h\')" src=';
	$out+=$escape(facePicUrl);
	$out+=' alt="">';
	$out+=$escape(nickName);
	$out+=' </a> <span>来自圈子：</span> <a href=';
	$out+=$escape(extGroupUrl);
	$out+=' target="_blank">';
	$out+=$escape(groupCircleName);
	$out+='</a> <span>';
	$out+=$escape(lastReplyTime);
	$out+='</span> <span class="fr"> <em class="iconn-11"></em> <span class="topic-count">';
	$out+=$escape(allNum);
	$out+='</span> </span> <span class="fr"> <em class="iconn-10"></em> <span class="topic-count">';
	$out+=$escape(userQuantity);
	$out+='</span> </span>  </a> </p> </div> <div class="topic-conter" data-conter-ul =';
	$out+=$escape(id);
	$out+=' > <ul class="source-lef-list" data-node="ulFloat" data-surl="';
	$out+=$escape(extImagesLst);
	$out+='" data-spic="';
	$out+=$escape(extSpic);
	$out+='" data-stitle="';
	$out+=$escape(extStitle);
	$out+='" data-content="';
	$out+=$escape(share_text);
	$out+='"> <li><a href="javascript:void(0)" data-node="wx"><em class="iconn-30"></em><span>微信</span></a></li> <li><a href="javascript:void(0)" data-node="wb"><em class="iconn-31"></em><span>微博</span></a></li> <li><a href="javascript:void(0)" data-node="qq"><em class="iconn-32"></em><span>QQ</span></a></li> <li><a href="javascript:void(0)" data-node="qzone"><em class="iconn-33"></em><span>QQ空间</span></a></li> <li> <a href="javascript:void(0)" data-id="';
	$out+=$escape(id);
	$out+='" data-node="praiseClick" data-type="1" data-praise="';
	$out+=$escape(dataParise);
	$out+='" class="';
	$out+=$escape(isLike);
	$out+='"> <em class="iconn-34 ';
	$out+=$escape(isLike);
	$out+=' "></em><span>';
	$out+=$escape(isLikeName);
	$out+='</span></a></li> <li> <a href="javascript:void(0)" data-node="collect" data-status="';
	$out+=$escape(userCollectionStatu);
	$out+='" class="';
	$out+=$escape(userCollection);
	$out+='"> <em class="iconn-57 ';
	$out+=$escape(userCollection);
	$out+='" ></em><span>';
	$out+=$escape(userCollectionName);
	$out+='</span></a></li> <li><a data-action="goComment" href="javascript:;"><em class="iconn-36"></em><span>评论</span></a></li> </ul> <div class="source-rig-box"> ';
	$out+=$string(html);
	$out+=' </div> </div> </div> ';
	return new String($out);
	});

/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/topicAddMore/comList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,imgPath=$data.imgPath,$out='';$out+='<div class="bjfff" data-node ="hidDiv" data-ComTopicId=';
	$out+=$escape(id);
	$out+='> <div class="circle-comments" data-node="circleCom" data-circleCom = ';
	$out+=$escape(id);
	$out+='> </div> <div class="more-comments" data-node="loadlist" style="display: none;" > <a href="##" class="clearfix"> <span> <img src="';
	$out+=$escape(imgPath);
	$out+='/images/circle/small-logo.png">点击加载更多 <em class="icon icon-right"></em> </span> </a> </div> <div class="more-comments" data-node="loading" style="display: none;" > <a href="javascript:;" class="disabled clearfix"><span><img src="';
	$out+=$escape(imgPath);
	$out+='/images/public/loading.gif">正在加载...</span></a> </div> <div class="more-comments" data-node="noload" style="display: none;" > <a href="javascript:;" class="disabled clearfix"> <span>没有可加载内容</span> </a> </div> </div>';
	return new String($out);
	});

/***/ },

/***/ 293:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/topicAddMore/commentBox',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,isExpert=$data.isExpert,$escape=$utils.$escape,userImage=$data.userImage,id=$data.id,readyOnly=$data.readyOnly,isLoginClass=$data.isLoginClass,isLoginStr=$data.isLoginStr,allNum=$data.allNum,$out='';$out+='<div data-node="commentBox" class="topic-review-box"> <h2 class="review-title">参与评论</h2> <div class="bjfff margin-btom20" data-node="comment_FirDiv"> <div class="text-field-box clearfix"> <div class="topic-user-head"> ';
	if(isExpert){
	$out+=' <em class="icon-daren"></em> ';
	}
	$out+=' <img src="';
	$out+=$escape(userImage);
	$out+='" onerror="imgError(this, \'g\')"> </div> <div class="topic-publish-content" data-node="comment_Msg" data-nickname="" data-tid="';
	$out+=$escape(id);
	$out+='" data-userid="0" data-headface="';
	$out+=$escape(userImage);
	$out+='"> <textarea placeholder="说点什么吧…" class="textarea-bx" ';
	$out+=$escape(readyOnly);
	$out+=' style="background: rgb(255, 255, 255);"></textarea> <div data-node="addImgGoods" data-imgNum ="9"> <ul data-node="imgUl" class="clearfix hide"> <li data-node="addMoreImg"><a href="javascript:;"><em class="iconn-41"></em></a></li> </ul> </div> <div class="publish-face-bx" data-publish="';
	$out+=$escape(id);
	$out+='"> <p class="icon-face cursor-pointer" data-node="smilies_Face"><em class="iconn-27"></em>表情</p> <p class="icon-face cursor-pointer" data-node="addImg_btn"><em class="iconn-28"></em>图片</p> <p class="icon-face cursor-pointer" data-node="addGoods_btn"><em class="iconn-29"></em>商品</p> <a href="javascript:;" class="pc-btn pc-btnh30 pc-btnw105 ';
	$out+=$escape(isLoginClass);
	$out+='" data-node="a_Submit">';
	$out+=$escape(isLoginStr);
	$out+='</a> </div> </div> </div> </div> </div> <div class="comment-title" data-node="hidDiv"> <div class="bd-bottom"><span class="red">';
	$out+=$escape(allNum);
	$out+='</span><span>条评论</span></div> </div> ';
	return new String($out);
	});

/***/ },

/***/ 294:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/topicAddMore/topicRight',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,$string=$utils.$string,topicRT=$data.topicRT,hotTopicUl=$data.hotTopicUl,$out='';$out+='<div class="topic-right topic-absolute" data-topicRT= ';
	$out+=$escape(id);
	$out+='> <div class="topic-r-t"> ';
	$out+=$string(topicRT);
	$out+=' </div> <div class="topic-position" data-node="topic_xi"> <h2 class="topic-r-title">热门话题</h2> <div class="topic-r-b" data-node="hot_topics"> ';
	$out+=$string(hotTopicUl);
	$out+=' </div> <div class="next-page" data-node="next-page" data-get-next-topic =';
	$out+=$escape(id);
	$out+=' style="display: none"> <p>下一篇</p> <a ></a> <p class="f12" data-node="times"></p> </div> </div> </div>';
	return new String($out);
	});

/***/ },

/***/ 295:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) != "object" && (JSON = {}), function () {
	  "use strict";
	  function f(e) {
	    return e < 10 ? "0" + e : e;
	  }function quote(e) {
	    return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
	      var t = meta[e];return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
	    }) + '"' : '"' + e + '"';
	  }function str(e, t) {
	    var n,
	        r,
	        i,
	        s,
	        o = gap,
	        u,
	        a = t[e];a && (typeof a === "undefined" ? "undefined" : _typeof(a)) == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "string":
	        return quote(a);case "number":
	        return isFinite(a) ? String(a) : "null";case "boolean":case "null":
	        return String(a);case "object":
	        if (!a) return "null";gap += indent, u = [];if (Object.prototype.toString.apply(a) === "[object Array]") {
	          s = a.length;for (n = 0; n < s; n += 1) {
	            u[n] = str(n, a) || "null";
	          }return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i;
	        }if (rep && (typeof rep === "undefined" ? "undefined" : _typeof(rep)) == "object") {
	          s = rep.length;for (n = 0; n < s; n += 1) {
	            typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
	          }
	        } else for (r in a) {
	          Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
	        }return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i;}
	  }typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
	    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
	  }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
	    return this.valueOf();
	  });var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	      gap,
	      indent,
	      meta = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" },
	      rep;typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
	    var r;gap = "", indent = "";if (typeof n == "number") for (r = 0; r < n; r += 1) {
	      indent += " ";
	    } else typeof n == "string" && (indent = n);rep = t;if (!t || typeof t == "function" || (typeof t === "undefined" ? "undefined" : _typeof(t)) == "object" && typeof t.length == "number") return str("", { "": e });throw new Error("JSON.stringify");
	  }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
	    function walk(e, t) {
	      var n,
	          r,
	          i = e[t];if (i && (typeof i === "undefined" ? "undefined" : _typeof(i)) == "object") for (n in i) {
	        Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
	      }return reviver.call(e, t, i);
	    }var j;text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
	      return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
	    }));if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({ "": j }, "") : j;throw new SyntaxError("JSON.parse");
	  });
	}(), function (e, t) {
	  "use strict";
	  var n = e.History = e.History || {},
	      r = __webpack_provided_window_dot_jQuery;if (typeof n.Adapter != "undefined") throw new Error("History.js Adapter has already been loaded...");n.Adapter = { bind: function bind(e, t, n) {
	      r(e).bind(t, n);
	    }, trigger: function trigger(e, t, n) {
	      r(e).trigger(t, n);
	    }, extractEventData: function extractEventData(e, n, r) {
	      var i = n && n.originalEvent && n.originalEvent[e] || r && r[e] || t;return i;
	    }, onDomLoad: function onDomLoad(e) {
	      r(e);
	    } }, typeof n.init != "undefined" && n.init();
	}(window), function (e, t) {
	  "use strict";
	  var n = e.document,
	      r = e.setTimeout || r,
	      i = e.clearTimeout || i,
	      s = e.setInterval || s,
	      o = e.History = e.History || {};if (typeof o.initHtml4 != "undefined") throw new Error("History.js HTML4 Support has already been loaded...");o.initHtml4 = function () {
	    if (typeof o.initHtml4.initialized != "undefined") return !1;o.initHtml4.initialized = !0, o.enabled = !0, o.savedHashes = [], o.isLastHash = function (e) {
	      var t = o.getHashByIndex(),
	          n;return n = e === t, n;
	    }, o.isHashEqual = function (e, t) {
	      return e = encodeURIComponent(e).replace(/%25/g, "%"), t = encodeURIComponent(t).replace(/%25/g, "%"), e === t;
	    }, o.saveHash = function (e) {
	      return o.isLastHash(e) ? !1 : (o.savedHashes.push(e), !0);
	    }, o.getHashByIndex = function (e) {
	      var t = null;return typeof e == "undefined" ? t = o.savedHashes[o.savedHashes.length - 1] : e < 0 ? t = o.savedHashes[o.savedHashes.length + e] : t = o.savedHashes[e], t;
	    }, o.discardedHashes = {}, o.discardedStates = {}, o.discardState = function (e, t, n) {
	      var r = o.getHashByState(e),
	          i;return i = { discardedState: e, backState: n, forwardState: t }, o.discardedStates[r] = i, !0;
	    }, o.discardHash = function (e, t, n) {
	      var r = { discardedHash: e, backState: n, forwardState: t };return o.discardedHashes[e] = r, !0;
	    }, o.discardedState = function (e) {
	      var t = o.getHashByState(e),
	          n;return n = o.discardedStates[t] || !1, n;
	    }, o.discardedHash = function (e) {
	      var t = o.discardedHashes[e] || !1;return t;
	    }, o.recycleState = function (e) {
	      var t = o.getHashByState(e);return o.discardedState(e) && delete o.discardedStates[t], !0;
	    }, o.emulated.hashChange && (o.hashChangeInit = function () {
	      o.checkerFunction = null;var t = "",
	          r,
	          i,
	          u,
	          a,
	          f = Boolean(o.getHash());return o.isInternetExplorer() ? (r = "historyjs-iframe", i = n.createElement("iframe"), i.setAttribute("id", r), i.setAttribute("src", "#"), i.style.display = "none", n.body.appendChild(i), i.contentWindow.document.open(), i.contentWindow.document.close(), u = "", a = !1, o.checkerFunction = function () {
	        if (a) return !1;a = !0;var n = o.getHash(),
	            r = o.getHash(i.contentWindow.document);return n !== t ? (t = n, r !== n && (u = r = n, i.contentWindow.document.open(), i.contentWindow.document.close(), i.contentWindow.document.location.hash = o.escapeHash(n)), o.Adapter.trigger(e, "hashchange")) : r !== u && (u = r, f && r === "" ? o.back() : o.setHash(r, !1)), a = !1, !0;
	      }) : o.checkerFunction = function () {
	        var n = o.getHash() || "";return n !== t && (t = n, o.Adapter.trigger(e, "hashchange")), !0;
	      }, o.intervalList.push(s(o.checkerFunction, o.options.hashChangeInterval)), !0;
	    }, o.Adapter.onDomLoad(o.hashChangeInit)), o.emulated.pushState && (o.onHashChange = function (t) {
	      var n = t && t.newURL || o.getLocationHref(),
	          r = o.getHashByUrl(n),
	          i = null,
	          s = null,
	          u = null,
	          a;return o.isLastHash(r) ? (o.busy(!1), !1) : (o.doubleCheckComplete(), o.saveHash(r), r && o.isTraditionalAnchor(r) ? (o.Adapter.trigger(e, "anchorchange"), o.busy(!1), !1) : (i = o.extractState(o.getFullUrl(r || o.getLocationHref()), !0), o.isLastSavedState(i) ? (o.busy(!1), !1) : (s = o.getHashByState(i), a = o.discardedState(i), a ? (o.getHashByIndex(-2) === o.getHashByState(a.forwardState) ? o.back(!1) : o.forward(!1), !1) : (o.pushState(i.data, i.title, encodeURI(i.url), !1), !0))));
	    }, o.Adapter.bind(e, "hashchange", o.onHashChange), o.pushState = function (t, n, r, i) {
	      r = encodeURI(r).replace(/%25/g, "%");if (o.getHashByUrl(r)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if (i !== !1 && o.busy()) return o.pushQueue({ scope: o, callback: o.pushState, args: arguments, queue: i }), !1;o.busy(!0);var s = o.createStateObject(t, n, r),
	          u = o.getHashByState(s),
	          a = o.getState(!1),
	          f = o.getHashByState(a),
	          l = o.getHash(),
	          c = o.expectedStateId == s.id;return o.storeState(s), o.expectedStateId = s.id, o.recycleState(s), o.setTitle(s), u === f ? (o.busy(!1), !1) : (o.saveState(s), c || o.Adapter.trigger(e, "statechange"), !o.isHashEqual(u, l) && !o.isHashEqual(u, o.getShortUrl(o.getLocationHref())) && o.setHash(u, !1), o.busy(!1), !0);
	    }, o.replaceState = function (t, n, r, i) {
	      r = encodeURI(r).replace(/%25/g, "%");if (o.getHashByUrl(r)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if (i !== !1 && o.busy()) return o.pushQueue({ scope: o, callback: o.replaceState, args: arguments, queue: i }), !1;o.busy(!0);var s = o.createStateObject(t, n, r),
	          u = o.getHashByState(s),
	          a = o.getState(!1),
	          f = o.getHashByState(a),
	          l = o.getStateByIndex(-2);return o.discardState(a, s, l), u === f ? (o.storeState(s), o.expectedStateId = s.id, o.recycleState(s), o.setTitle(s), o.saveState(s), o.Adapter.trigger(e, "statechange"), o.busy(!1)) : o.pushState(s.data, s.title, s.url, !1), !0;
	    }), o.emulated.pushState && o.getHash() && !o.emulated.hashChange && o.Adapter.onDomLoad(function () {
	      o.Adapter.trigger(e, "hashchange");
	    });
	  }, typeof o.init != "undefined" && o.init();
	}(window), function (e, t) {
	  "use strict";
	  var n = e.console || t,
	      r = e.document,
	      i = e.navigator,
	      s = !1,
	      o = e.setTimeout,
	      u = e.clearTimeout,
	      a = e.setInterval,
	      f = e.clearInterval,
	      l = e.JSON,
	      c = e.alert,
	      h = e.History = e.History || {},
	      p = e.history;try {
	    s = e.sessionStorage, s.setItem("TEST", "1"), s.removeItem("TEST");
	  } catch (d) {
	    s = !1;
	  }l.stringify = l.stringify || l.encode, l.parse = l.parse || l.decode;if (typeof h.init != "undefined") throw new Error("History.js Core has already been loaded...");h.init = function (e) {
	    return typeof h.Adapter == "undefined" ? !1 : (typeof h.initCore != "undefined" && h.initCore(), typeof h.initHtml4 != "undefined" && h.initHtml4(), !0);
	  }, h.initCore = function (d) {
	    if (typeof h.initCore.initialized != "undefined") return !1;h.initCore.initialized = !0, h.options = h.options || {}, h.options.hashChangeInterval = h.options.hashChangeInterval || 100, h.options.safariPollInterval = h.options.safariPollInterval || 500, h.options.doubleCheckInterval = h.options.doubleCheckInterval || 500, h.options.disableSuid = h.options.disableSuid || !1, h.options.storeInterval = h.options.storeInterval || 1e3, h.options.busyDelay = h.options.busyDelay || 250, h.options.debug = h.options.debug || !1, h.options.initialTitle = h.options.initialTitle || r.title, h.options.html4Mode = h.options.html4Mode || !1, h.options.delayInit = h.options.delayInit || !1, h.intervalList = [], h.clearAllIntervals = function () {
	      var e,
	          t = h.intervalList;if (typeof t != "undefined" && t !== null) {
	        for (e = 0; e < t.length; e++) {
	          f(t[e]);
	        }h.intervalList = null;
	      }
	    }, h.debug = function () {
	      (h.options.debug || !1) && h.log.apply(h, arguments);
	    }, h.log = function () {
	      var e = typeof n != "undefined" && typeof n.log != "undefined" && typeof n.log.apply != "undefined",
	          t = r.getElementById("log"),
	          i,
	          s,
	          o,
	          u,
	          a;e ? (u = Array.prototype.slice.call(arguments), i = u.shift(), typeof n.debug != "undefined" ? n.debug.apply(n, [i, u]) : n.log.apply(n, [i, u])) : i = "\n" + arguments[0] + "\n";for (s = 1, o = arguments.length; s < o; ++s) {
	        a = arguments[s];if ((typeof a === "undefined" ? "undefined" : _typeof(a)) == "object" && typeof l != "undefined") try {
	          a = l.stringify(a);
	        } catch (f) {}i += "\n" + a + "\n";
	      }return t ? (t.value += i + "\n-----\n", t.scrollTop = t.scrollHeight - t.clientHeight) : e || c(i), !0;
	    }, h.getInternetExplorerMajorVersion = function () {
	      var e = h.getInternetExplorerMajorVersion.cached = typeof h.getInternetExplorerMajorVersion.cached != "undefined" ? h.getInternetExplorerMajorVersion.cached : function () {
	        var e = 3,
	            t = r.createElement("div"),
	            n = t.getElementsByTagName("i");while ((t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && n[0]) {}return e > 4 ? e : !1;
	      }();return e;
	    }, h.isInternetExplorer = function () {
	      var e = h.isInternetExplorer.cached = typeof h.isInternetExplorer.cached != "undefined" ? h.isInternetExplorer.cached : Boolean(h.getInternetExplorerMajorVersion());return e;
	    }, h.options.html4Mode ? h.emulated = { pushState: !0, hashChange: !0 } : h.emulated = { pushState: !e.history && e.history.pushState && e.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent), hashChange: Boolean(!("onhashchange" in e || "onhashchange" in r) || h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8) }, h.enabled = !h.emulated.pushState, h.bugs = { setHash: Boolean(!h.emulated.pushState && i.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)), safariPoll: Boolean(!h.emulated.pushState && i.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)), ieDoubleCheck: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8), hashEscape: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 7) }, h.isEmptyObject = function (e) {
	      for (var t in e) {
	        if (e.hasOwnProperty(t)) return !1;
	      }return !0;
	    }, h.cloneObject = function (e) {
	      var t, n;return e ? (t = l.stringify(e), n = l.parse(t)) : n = {}, n;
	    }, h.getRootUrl = function () {
	      var e = r.location.protocol + "//" + (r.location.hostname || r.location.host);if (r.location.port || !1) e += ":" + r.location.port;return e += "/", e;
	    }, h.getBaseHref = function () {
	      var e = r.getElementsByTagName("base"),
	          t = null,
	          n = "";return e.length === 1 && (t = e[0], n = t.href.replace(/[^\/]+$/, "")), n = n.replace(/\/+$/, ""), n && (n += "/"), n;
	    }, h.getBaseUrl = function () {
	      var e = h.getBaseHref() || h.getBasePageUrl() || h.getRootUrl();return e;
	    }, h.getPageUrl = function () {
	      var e = h.getState(!1, !1),
	          t = (e || {}).url || h.getLocationHref(),
	          n;return n = t.replace(/\/+$/, "").replace(/[^\/]+$/, function (e, t, n) {
	        return (/\./.test(e) ? e : e + "/"
	        );
	      }), n;
	    }, h.getBasePageUrl = function () {
	      var e = h.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function (e, t, n) {
	        return (/[^\/]$/.test(e) ? "" : e
	        );
	      }).replace(/\/+$/, "") + "/";return e;
	    }, h.getFullUrl = function (e, t) {
	      var n = e,
	          r = e.substring(0, 1);return t = typeof t == "undefined" ? !0 : t, /[a-z]+\:\/\//.test(e) || (r === "/" ? n = h.getRootUrl() + e.replace(/^\/+/, "") : r === "#" ? n = h.getPageUrl().replace(/#.*/, "") + e : r === "?" ? n = h.getPageUrl().replace(/[\?#].*/, "") + e : t ? n = h.getBaseUrl() + e.replace(/^(\.\/)+/, "") : n = h.getBasePageUrl() + e.replace(/^(\.\/)+/, "")), n.replace(/\#$/, "");
	    }, h.getShortUrl = function (e) {
	      var t = e,
	          n = h.getBaseUrl(),
	          r = h.getRootUrl();return h.emulated.pushState && (t = t.replace(n, "")), t = t.replace(r, "/"), h.isTraditionalAnchor(t) && (t = "./" + t), t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, ""), t;
	    }, h.getLocationHref = function (e) {
	      return e = e || r, e.URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : e.URL.indexOf("#") == -1 && e.location.href.indexOf("#") != -1 ? e.location.href : e.URL || e.location.href;
	    }, h.store = {}, h.idToState = h.idToState || {}, h.stateToId = h.stateToId || {}, h.urlToId = h.urlToId || {}, h.storedStates = h.storedStates || [], h.savedStates = h.savedStates || [], h.normalizeStore = function () {
	      h.store.idToState = h.store.idToState || {}, h.store.urlToId = h.store.urlToId || {}, h.store.stateToId = h.store.stateToId || {};
	    }, h.getState = function (e, t) {
	      typeof e == "undefined" && (e = !0), typeof t == "undefined" && (t = !0);var n = h.getLastSavedState();return !n && t && (n = h.createStateObject()), e && (n = h.cloneObject(n), n.url = n.cleanUrl || n.url), n;
	    }, h.getIdByState = function (e) {
	      var t = h.extractId(e.url),
	          n;if (!t) {
	        n = h.getStateString(e);if (typeof h.stateToId[n] != "undefined") t = h.stateToId[n];else if (typeof h.store.stateToId[n] != "undefined") t = h.store.stateToId[n];else {
	          for (;;) {
	            t = new Date().getTime() + String(Math.random()).replace(/\D/g, "");if (typeof h.idToState[t] == "undefined" && typeof h.store.idToState[t] == "undefined") break;
	          }h.stateToId[n] = t, h.idToState[t] = e;
	        }
	      }return t;
	    }, h.normalizeState = function (e) {
	      var t, n;if (!e || (typeof e === "undefined" ? "undefined" : _typeof(e)) != "object") e = {};if (typeof e.normalized != "undefined") return e;if (!e.data || _typeof(e.data) != "object") e.data = {};return t = {}, t.normalized = !0, t.title = e.title || "", t.url = h.getFullUrl(e.url ? e.url : h.getLocationHref()), t.hash = h.getShortUrl(t.url), t.data = h.cloneObject(e.data), t.id = h.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, n = !h.isEmptyObject(t.data), (t.title || n) && h.options.disableSuid !== !0 && (t.hash = h.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = h.getFullUrl(t.hash), (h.emulated.pushState || h.bugs.safariPoll) && h.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t;
	    }, h.createStateObject = function (e, t, n) {
	      var r = { data: e, title: t, url: n };return r = h.normalizeState(r), r;
	    }, h.getStateById = function (e) {
	      e = String(e);var n = h.idToState[e] || h.store.idToState[e] || t;return n;
	    }, h.getStateString = function (e) {
	      var t, n, r;return t = h.normalizeState(e), n = { data: t.data, title: e.title, url: e.url }, r = l.stringify(n), r;
	    }, h.getStateId = function (e) {
	      var t, n;return t = h.normalizeState(e), n = t.id, n;
	    }, h.getHashByState = function (e) {
	      var t, n;return t = h.normalizeState(e), n = t.hash, n;
	    }, h.extractId = function (e) {
	      var t, n, r, i;return e.indexOf("#") != -1 ? i = e.split("#")[0] : i = e, n = /(.*)\&_suid=([0-9]+)$/.exec(i), r = n ? n[1] || e : e, t = n ? String(n[2] || "") : "", t || !1;
	    }, h.isTraditionalAnchor = function (e) {
	      var t = !/[\/\?\.]/.test(e);return t;
	    }, h.extractState = function (e, t) {
	      var n = null,
	          r,
	          i;return t = t || !1, r = h.extractId(e), r && (n = h.getStateById(r)), n || (i = h.getFullUrl(e), r = h.getIdByUrl(i) || !1, r && (n = h.getStateById(r)), !n && t && !h.isTraditionalAnchor(e) && (n = h.createStateObject(null, null, i))), n;
	    }, h.getIdByUrl = function (e) {
	      var n = h.urlToId[e] || h.store.urlToId[e] || t;return n;
	    }, h.getLastSavedState = function () {
	      return h.savedStates[h.savedStates.length - 1] || t;
	    }, h.getLastStoredState = function () {
	      return h.storedStates[h.storedStates.length - 1] || t;
	    }, h.hasUrlDuplicate = function (e) {
	      var t = !1,
	          n;return n = h.extractState(e.url), t = n && n.id !== e.id, t;
	    }, h.storeState = function (e) {
	      return h.urlToId[e.url] = e.id, h.storedStates.push(h.cloneObject(e)), e;
	    }, h.isLastSavedState = function (e) {
	      var t = !1,
	          n,
	          r,
	          i;return h.savedStates.length && (n = e.id, r = h.getLastSavedState(), i = r.id, t = n === i), t;
	    }, h.saveState = function (e) {
	      return h.isLastSavedState(e) ? !1 : (h.savedStates.push(h.cloneObject(e)), !0);
	    }, h.getStateByIndex = function (e) {
	      var t = null;return typeof e == "undefined" ? t = h.savedStates[h.savedStates.length - 1] : e < 0 ? t = h.savedStates[h.savedStates.length + e] : t = h.savedStates[e], t;
	    }, h.getCurrentIndex = function () {
	      var e = null;return h.savedStates.length < 1 ? e = 0 : e = h.savedStates.length - 1, e;
	    }, h.getHash = function (e) {
	      var t = h.getLocationHref(e),
	          n;return n = h.getHashByUrl(t), n;
	    }, h.unescapeHash = function (e) {
	      var t = h.normalizeHash(e);return t = decodeURIComponent(t), t;
	    }, h.normalizeHash = function (e) {
	      var t = e.replace(/[^#]*#/, "").replace(/#.*/, "");return t;
	    }, h.setHash = function (e, t) {
	      var n, i;return t !== !1 && h.busy() ? (h.pushQueue({ scope: h, callback: h.setHash, args: arguments, queue: t }), !1) : (h.busy(!0), n = h.extractState(e, !0), n && !h.emulated.pushState ? h.pushState(n.data, n.title, n.url, !1) : h.getHash() !== e && (h.bugs.setHash ? (i = h.getPageUrl(), h.pushState(null, null, i + "#" + e, !1)) : r.location.hash = e), h);
	    }, h.escapeHash = function (t) {
	      var n = h.normalizeHash(t);return n = e.encodeURIComponent(n), h.bugs.hashEscape || (n = n.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), n;
	    }, h.getHashByUrl = function (e) {
	      var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");return t = h.unescapeHash(t), t;
	    }, h.setTitle = function (e) {
	      var t = e.title,
	          n;t || (n = h.getStateByIndex(0), n && n.url === e.url && (t = n.title || h.options.initialTitle));try {
	        r.getElementsByTagName("title")[0].innerHTML = t.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ");
	      } catch (i) {}return r.title = t, h;
	    }, h.queues = [], h.busy = function (e) {
	      typeof e != "undefined" ? h.busy.flag = e : typeof h.busy.flag == "undefined" && (h.busy.flag = !1);if (!h.busy.flag) {
	        u(h.busy.timeout);var t = function t() {
	          var e, n, r;if (h.busy.flag) return;for (e = h.queues.length - 1; e >= 0; --e) {
	            n = h.queues[e];if (n.length === 0) continue;r = n.shift(), h.fireQueueItem(r), h.busy.timeout = o(t, h.options.busyDelay);
	          }
	        };h.busy.timeout = o(t, h.options.busyDelay);
	      }return h.busy.flag;
	    }, h.busy.flag = !1, h.fireQueueItem = function (e) {
	      return e.callback.apply(e.scope || h, e.args || []);
	    }, h.pushQueue = function (e) {
	      return h.queues[e.queue || 0] = h.queues[e.queue || 0] || [], h.queues[e.queue || 0].push(e), h;
	    }, h.queue = function (e, t) {
	      return typeof e == "function" && (e = { callback: e }), typeof t != "undefined" && (e.queue = t), h.busy() ? h.pushQueue(e) : h.fireQueueItem(e), h;
	    }, h.clearQueue = function () {
	      return h.busy.flag = !1, h.queues = [], h;
	    }, h.stateChanged = !1, h.doubleChecker = !1, h.doubleCheckComplete = function () {
	      return h.stateChanged = !0, h.doubleCheckClear(), h;
	    }, h.doubleCheckClear = function () {
	      return h.doubleChecker && (u(h.doubleChecker), h.doubleChecker = !1), h;
	    }, h.doubleCheck = function (e) {
	      return h.stateChanged = !1, h.doubleCheckClear(), h.bugs.ieDoubleCheck && (h.doubleChecker = o(function () {
	        return h.doubleCheckClear(), h.stateChanged || e(), !0;
	      }, h.options.doubleCheckInterval)), h;
	    }, h.safariStatePoll = function () {
	      var t = h.extractState(h.getLocationHref()),
	          n;if (!h.isLastSavedState(t)) return n = t, n || (n = h.createStateObject()), h.Adapter.trigger(e, "popstate"), h;return;
	    }, h.back = function (e) {
	      return e !== !1 && h.busy() ? (h.pushQueue({ scope: h, callback: h.back, args: arguments, queue: e }), !1) : (h.busy(!0), h.doubleCheck(function () {
	        h.back(!1);
	      }), p.go(-1), !0);
	    }, h.forward = function (e) {
	      return e !== !1 && h.busy() ? (h.pushQueue({ scope: h, callback: h.forward, args: arguments, queue: e }), !1) : (h.busy(!0), h.doubleCheck(function () {
	        h.forward(!1);
	      }), p.go(1), !0);
	    }, h.go = function (e, t) {
	      var n;if (e > 0) for (n = 1; n <= e; ++n) {
	        h.forward(t);
	      } else {
	        if (!(e < 0)) throw new Error("History.go: History.go requires a positive or negative integer passed.");for (n = -1; n >= e; --n) {
	          h.back(t);
	        }
	      }return h;
	    };if (h.emulated.pushState) {
	      var v = function v() {};h.pushState = h.pushState || v, h.replaceState = h.replaceState || v;
	    } else h.onPopState = function (t, n) {
	      var r = !1,
	          i = !1,
	          s,
	          o;return h.doubleCheckComplete(), s = h.getHash(), s ? (o = h.extractState(s || h.getLocationHref(), !0), o ? h.replaceState(o.data, o.title, o.url, !1) : (h.Adapter.trigger(e, "anchorchange"), h.busy(!1)), h.expectedStateId = !1, !1) : (r = h.Adapter.extractEventData("state", t, n) || !1, r ? i = h.getStateById(r) : h.expectedStateId ? i = h.getStateById(h.expectedStateId) : i = h.extractState(h.getLocationHref()), i || (i = h.createStateObject(null, null, h.getLocationHref())), h.expectedStateId = !1, h.isLastSavedState(i) ? (h.busy(!1), !1) : (h.storeState(i), h.saveState(i), h.setTitle(i), h.Adapter.trigger(e, "statechange"), h.busy(!1), !0));
	    }, h.Adapter.bind(e, "popstate", h.onPopState), h.pushState = function (t, n, r, i) {
	      if (h.getHashByUrl(r) && h.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if (i !== !1 && h.busy()) return h.pushQueue({ scope: h, callback: h.pushState, args: arguments, queue: i }), !1;h.busy(!0);var s = h.createStateObject(t, n, r);return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.pushState(s.id, s.title, s.url), h.Adapter.trigger(e, "popstate")), !0;
	    }, h.replaceState = function (t, n, r, i) {
	      if (h.getHashByUrl(r) && h.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if (i !== !1 && h.busy()) return h.pushQueue({ scope: h, callback: h.replaceState, args: arguments, queue: i }), !1;h.busy(!0);var s = h.createStateObject(t, n, r);return h.isLastSavedState(s) ? h.busy(!1) : (h.storeState(s), h.expectedStateId = s.id, p.replaceState(s.id, s.title, s.url), h.Adapter.trigger(e, "popstate")), !0;
	    };if (s) {
	      try {
	        h.store = l.parse(s.getItem("History.store")) || {};
	      } catch (m) {
	        h.store = {};
	      }h.normalizeStore();
	    } else h.store = {}, h.normalizeStore();h.Adapter.bind(e, "unload", h.clearAllIntervals), h.saveState(h.storeState(h.extractState(h.getLocationHref(), !0))), s && (h.onUnload = function () {
	      var e, t, n;try {
	        e = l.parse(s.getItem("History.store")) || {};
	      } catch (r) {
	        e = {};
	      }e.idToState = e.idToState || {}, e.urlToId = e.urlToId || {}, e.stateToId = e.stateToId || {};for (t in h.idToState) {
	        if (!h.idToState.hasOwnProperty(t)) continue;e.idToState[t] = h.idToState[t];
	      }for (t in h.urlToId) {
	        if (!h.urlToId.hasOwnProperty(t)) continue;e.urlToId[t] = h.urlToId[t];
	      }for (t in h.stateToId) {
	        if (!h.stateToId.hasOwnProperty(t)) continue;e.stateToId[t] = h.stateToId[t];
	      }h.store = e, h.normalizeStore(), n = l.stringify(e);try {
	        s.setItem("History.store", n);
	      } catch (i) {
	        if (i.code !== DOMException.QUOTA_EXCEEDED_ERR) throw i;s.length && (s.removeItem("History.store"), s.setItem("History.store", n));
	      }
	    }, h.intervalList.push(a(h.onUnload, h.options.storeInterval)), h.Adapter.bind(e, "beforeunload", h.onUnload), h.Adapter.bind(e, "unload", h.onUnload));if (!h.emulated.pushState) {
	      h.bugs.safariPoll && h.intervalList.push(a(h.safariStatePoll, h.options.safariPollInterval));if (i.vendor === "Apple Computer, Inc." || (i.appCodeName || "") === "Mozilla") h.Adapter.bind(e, "hashchange", function () {
	        h.Adapter.trigger(e, "popstate");
	      }), h.getHash() && h.Adapter.onDomLoad(function () {
	        h.Adapter.trigger(e, "hashchange");
	      });
	    }
	  }, (!h.options || !h.options.delayInit) && h.init();
	}(window);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	//var alert = require('module/popup/alert');
	var upload = __webpack_require__(297);
	//var addBox = $('[data-node=addImgGoods]');
	var confirm = __webpack_require__(55);
	var loginState = __webpack_require__(278);
	var checkLoginStatus = __webpack_require__(47); //登陆判断
	var showImgBox = function showImgBox() {

	    $("body").on("click", '[data-node="addImg_btn"]', btnEvent).on("click", "[data-node=addMoreImg]", addMoreImgFn) //+ tu
	    .on("click", "[data-node=imgPics]", imgPicsBig).on("click", '[data-node=imgBigHind]', imgBigHindFn).on("click", '[data-node=hideBigPic]', hideBigPicFn).on("click", '[data-node=imgBigPN]', imgBigPNFn).on("click", '[data-node="deletImg"]', deletImgFn).on("click", '[data-node=showImg]', showImgFn);
	};
	var deletImgFn = function deletImgFn() {
	    var $this = $(this);
	    var imgSrc = $this.children("a").children("img").attr("src");
	    var ul = $this.parent();
	    var $div = ul.parent();
	    var imgLENG = parseInt($div.attr("data-imgnum"));
	    //var arrImg=[];
	    confirm('确认删除该图片？', {
	        width: 400,
	        fixed: true,
	        modal: true,
	        className: 'pop-box pop-pad-btm65',
	        okCls: 'pc-btn pc-btnh40 pc-btnw120',
	        cancelCls: 'queren-btn pc-btnh40 pc-btnw120',
	        ok: function ok() {
	            $this.remove();
	            var arriMG = ul.attr("data-imgsrt");
	            var a = arriMG.split(',');
	            var b = a;
	            b.splice(imgSrc, 1);
	            ul.attr("data-imgsrt", b);
	            $div.attr("data-imgnum", imgLENG + 1);
	            ul.children("[data-node=addMoreImg]").removeClass("hide");
	            $div.parent().find("[data-node=addImg_btn]").removeClass("disabled");
	            if (parseInt(imgLENG + 1) >= 9) {
	                ul.addClass("hide");
	            }
	        }
	    });
	};
	var addMoreImgFn = function addMoreImgFn() {
	    var imgNum = $($(this).parents().eq(1)).attr("data-imgNum");
	    var topicId = $($(this).parents().eq(2)).children(".publish-face-bx").attr("data-publish");
	    if (imgNum == 0) {
	        return false;
	    } else {
	        upload(imgNum, topicId); //
	    }
	};
	var showImgFn = function showImgFn() {
	    var $this = $(this);

	    if ($this.hasClass("active")) {
	        return false;
	    } else {
	        var toPage = $(this).attr("data-active");
	        var toImG = $($this.parents().eq(1)).children(".big-img").children(".img-hidden").children("[data-bigimg=" + toPage + "]");

	        $(toImG).removeClass("hide").siblings().addClass("hide");
	        var imgObj = $(toImG).children("img");
	        if ($(imgObj).hasClass("srcError")) {
	            $(imgObj).removeClass("srcError");
	            $(imgObj).attr("src", $(imgObj).attr("data-imgsrc"));
	        }
	        $this.addClass("active").siblings().removeClass("active");
	        var imgSrc = $($this.parents().eq(1)).children(".big-title").children("[data-node=imgBigSrc]");
	        $(imgSrc).attr("href", $(imgObj).attr("data-imgsrc"));
	    }
	};
	var imgBigPNFn = function imgBigPNFn() {
	    var $this = $(this);
	    var curPage = $($this.parents().eq(1)).children(".img-slide").children(".active").attr("data-active");
	    curPage = parseInt(curPage);

	    var toPage = null;
	    var tootalPage = parseInt($this.parent().attr("data-piclength")) - 1;

	    if ($this.attr("data-page") == "pre") {
	        if (curPage == 0) {
	            toPage = tootalPage;
	        } else {
	            toPage = curPage - 1;
	        }
	    } else {
	        if (curPage == tootalPage) {
	            toPage = 0;
	        } else {
	            toPage = curPage + 1;
	        }
	    }
	    // 图片更改
	    $($this.parents().eq(1)).children(".img-slide").children("[data-active=" + toPage + "]").click();
	};
	var hideBigPicFn = function hideBigPicFn() {
	    var divObj = $(this).parents().eq(2);
	    var parentObj = $(this).parents().eq(3);
	    $(divObj).addClass("hide");
	    $(parentObj).children("ul").removeClass("hide");
	};

	//大图隐藏
	var imgBigHindFn = function imgBigHindFn() {
	    var divObj = $(this).parents().eq(1);
	    var parentObj = $(this).parents().eq(2);
	    $(divObj).addClass("hide");
	    $(parentObj).children("ul").removeClass("hide");
	};
	// 评论列表中大图展示
	var imgPicsBig = function imgPicsBig() {
	    var parentObj = $(this).parents().eq(1);
	    var ulObj = $(this).parents().eq(0);
	    var divBig = $(parentObj).children("[data-node=imgBigPic]");
	    $(ulObj).addClass("hide");
	    divBig.removeClass("hide");

	    //大图定位显示
	    var pageId = $(this).attr("data-imgsort");
	    //获取当前大图节点
	    //div
	    var thisBigPic = divBig.children(".big-img").children(".img-hidden").children("[data-bigimg=" + pageId + "]");
	    var thisImage = $(thisBigPic).children("img"); //img

	    $(thisBigPic).removeClass("hide").siblings().addClass("hide");
	    if ($(thisImage).hasClass("srcError")) {
	        $(thisImage).removeClass("srcError");
	        $(thisImage).attr("src", $(thisImage).attr("data-imgsrc"));
	    }

	    var aBtn = divBig.children(".img-slide").children("[data-active=" + pageId + "]");
	    $(aBtn).addClass("active").siblings().removeClass("active");
	    //查看原图 添加链接
	    var $imgSrc = divBig.children(".big-title").children("[data-node=imgBigSrc]");
	    $($imgSrc).attr("href", $(thisImage).attr("data-imgsrc"));
	};

	//添加图片按钮事件
	var btnEvent = function btnEvent() {
	    if (!checkLoginStatus()) {
	        loginState.popUnion();
	        return false;
	    }

	    var imgNum = $(this).parents().eq(1).children("[data-node=addImgGoods]").attr("data-imgNum");

	    //$("[data-node=addImgGoods]").attr("data-imgNum");
	    var topicId = $(this).parent().attr("data-publish");

	    if (imgNum == 0) {
	        return false;
	    } else {
	        upload(imgNum, topicId); //
	    }
	};

	//添加事件
	var addEvent = function addEvent() {
	    showImgBox();
	};

	module.exports = {
	    init: addEvent
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var uploadPop = __webpack_require__(118),

	//Pubsub = require('io/pubsub'),
	//pubName = require('io/channel');
	upload = __webpack_require__(133);
	var addImgTpl = __webpack_require__(298);

	var init = function init(maxLen, topicId) {
	    var $webUpLoader,
	        maxlength = maxLen;
	    //files = {};
	    if (maxlength > 0) {

	        var dialogUploader = uploadPop.create({
	            maxlength: maxlength
	        }, {
	            ok: function ok() {
	                $('[data-node="uploadList"]').off();
	                $webUpLoader.destroy();
	                var $imgList = $('[data-node="uploadList"] img'),
	                    images = [];
	                for (var i = 0, len = $imgList.length; i < len; i++) {
	                    images.push($imgList.eq(i).attr('src'));
	                }
	                //var files = {};
	                setImage(images, topicId);
	            },
	            cancel: function cancel() {
	                $('[data-node="uploadList"]').off();
	                $webUpLoader.destroy();
	            }
	        });
	        dialogUploader.onshow = function () {
	            $webUpLoader = upload.init({
	                maxlength: maxlength
	            });
	        };
	    } else {
	        dialogUploader = uploadPop.create({}, {
	            title: '选择图片',
	            modal: true,
	            fixed: true,
	            content: '<p class="circle-pop-p">您最多能添加9张图片哦！</p>',
	            className: 'pop-box',
	            okValue: '确定',
	            okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	            btnWrapCls: '',
	            ok: function ok() {}
	        });
	    }
	    dialogUploader.show();
	};

	//将图片插入到div中
	var setImage = function setImage(images, topicId) {

	    if (images.length > 0) {
	        var arrImg = [];
	        //var isFull = null;
	        var $div = $("[data-tid=" + topicId + "]").children("[data-node=addImgGoods]");
	        var num = parseInt($div.attr("data-imgNum"));
	        var nextnum = parseInt(num - images.length);
	        $div.attr("data-imgNum", nextnum);
	        var $ul = $("[data-tid=" + topicId + "]").find("[data-node=imgUl]");
	        $ul.addClass("topic-imglist");
	        var imgsrt = $ul.attr("data-imgsrt");
	        var $li = $ul.children("[data-node=addMoreImg]");
	        var newImg = [];
	        if (imgsrt) {
	            arrImg.push(imgsrt);
	        }

	        for (var i = 0; i < images.length; i++) {
	            arrImg.push(images[i]);
	            newImg.push(images[i]);
	        }
	        var imgStr = {
	            images: newImg
	        };
	        var item = addImgTpl(imgStr);
	        $ul.removeClass("hide");
	        $li.before(item);

	        $ul.attr("data-imgsrt", arrImg);
	        var lengthImg = parseInt($ul.parent().attr("data-imgNum"));

	        if (lengthImg <= 0) {
	            $("[data-tid=" + topicId + "]").find("[data-node=addImg_btn]").addClass("disabled");
	            $ul.children("[data-node=addMoreImg]").addClass("hide");
	        }
	    } else {
	        return false;
	    }
	};

	module.exports = init;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/comment/addImgGoods/chooseImg',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,images=$data.images,value=$data.value,i=$data.i,$escape=$utils.$escape,$out='';$each(images,function(value,i){
	$out+=' <li data-node="deletImg" class="imgClass"> <a href="javascript:;" data-node=""> <img src="';
	$out+=$escape(value);
	$out+='" width=100 height=100 > <em class="icon-del" ></em> </a> </li> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	//var addBox = $('[data-node=addImgGoods]');
	var checkLoginStatus = __webpack_require__(47); //登陆判断
	var dialog = __webpack_require__(137);
	var Pubsub = __webpack_require__(48);
	var pubName = __webpack_require__(71);
	var goodsInTpl = __webpack_require__(300);
	var loginState = __webpack_require__(278);
	var curTopicId = "";

	var showGoodsBox = function showGoodsBox() {

	    Pubsub(pubName.setPubliser.changedItem).sub(setGoods);
	    $("body").on("click", "[data-node=addGoods_btn]", function () {

	        // 判断是否登陆，没登录，显示登录框
	        if (!checkLoginStatus()) {
	            loginState.popUnion();
	            return false;
	        }

	        var $comment_Msg = $(this).closest("[data-node=comment_Msg]");
	        curTopicId = $comment_Msg.attr("data-tid");
	        var $addImgGoods = $comment_Msg.find("[data-node=addImgGoods]");
	        if ($addImgGoods.hasClass("hasGoods") || $(this).hasClass("disabled")) {
	            return false;
	        } else {
	            var changedGoods = [];
	            dialog(changedGoods, 1);
	        }
	    });
	    //删除商品
	    $("body").on("click", "[data-node=deletGoods]", function () {
	        var $comment_Msg = $(this).closest("[data-node=comment_Msg]");
	        $comment_Msg.find("[data-node=addImgGoods]").removeClass("hasGoods").attr("data-goodStr", "");
	        $(this).parent().remove();
	        $comment_Msg.find("[data-node=addGoods_btn]").removeClass("disabled");
	    });
	};

	//
	var setGoods = function setGoods(data) {
	    //将商品添加到div
	    var goodsData = data;
	    var comment_Msg = $("[data-tid=" + curTopicId + "]");
	    var $addImgGoods = comment_Msg.children("[data-node=addImgGoods]");

	    for (var key in goodsData) {
	        var v = goodsData[key];
	        var strGood = {
	            "pid": v.PId,
	            "img": v.img,
	            "link": v.link,
	            "price": v.price,
	            "shopId": v.shopId,
	            "title": v.title
	        };
	    }

	    if (strGood != "undefined") {
	        $addImgGoods.attr("data-goodStr", JSON.stringify(strGood));
	    }

	    var item = goodsInTpl(strGood);
	    $addImgGoods.prepend(item).addClass("hasGoods");
	    comment_Msg.find("[data-node=addGoods_btn]").addClass("disabled");
	};

	module.exports = {
	    init: showGoodsBox
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/topicDetails/comment/addImgGoods/goodsIn',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,shopId=$data.shopId,pid=$data.pid,img=$data.img,title=$data.title,price=$data.price,link=$data.link,$out='';$out+=' <div data-node="goodsIn" class="reply-details" data-shopId ="';
	$out+=$escape(shopId);
	$out+='" data-itemId="';
	$out+=$escape(pid);
	$out+='" > <em class="iconn-7" data-node="deletGoods"></em> <div class="reply-picture"><img src="';
	$out+=$escape(img);
	$out+='" onerror="imgError(this, \'g\')"></div> <div class="reply-contxt"> <p>';
	$out+=$escape(title);
	$out+='</p> <p class="price-numb">￥<span>';
	$out+=$escape(price);
	$out+='</span></p> </div><a href="';
	$out+=$escape(link);
	$out+='" class="see-details pc-btn pc-btnw105 pc-btnh40" target="_blank">查看详情</a> </div> ';
	return new String($out);
	});

/***/ }

});