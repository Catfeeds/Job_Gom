webpackJsonp([33],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	//修改头像
	__webpack_require__(239).init();

	//出生日期
	__webpack_require__(240).init();
	//昵称事件
	__webpack_require__(242).init();
	//提交保存
	__webpack_require__(245).subInit();


/***/ },

/***/ 46:
/***/ function(module, exports) {

	var byteLen = function (str) {
	    if (str == null) return 0;
	    if (typeof str != "string") {
	        str += "";
	    }
	    return str.replace(/[^\x00-\xff]/g, "01").length;
	}

	module.exports = byteLen;


/***/ },

/***/ 47:
/***/ function(module, exports) {

	/**
	 * 删除字符串str的收尾空格
	 */

	var trim = function (str) {
	    return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
	};

	module.exports = trim;

/***/ },

/***/ 48:
/***/ function(module, exports) {

	/**
	 * Created by dongyukuan on 2016/5/20.
	 */
	var obj = {
	    checkVal: function(val, pattern) {
	        return pattern.test(val);
	    },
	    isMobileNum: function(mobile) {
	        return /^1[34578][0-9]{9}$/.test(mobile);
	    },
	    isEmail: function(email) {
	        return /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email);
	    },
	    isCertificate: function(certificate) {
	        return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(certificate);
	    },
	    isCID: function(cardNo) {
	        return /^(\d{16}|\d{19})$/.test(cardNo);
	    },
	    isCWord: function(word, start, end) {
	        var start = !isNaN(start) && start > 0 ? start : 1;
	        var end = !isNaN(end) && end > 0 ? end : '';
	        var reg = new RegExp('^[\\u4e00-\\u9fa5]{' + start + ',' + end + '}$');
	        //var regPunctuation = /[1-9<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，；‘’“”：'"\·`]/;
	        var regRes = reg.test(word);
	        //var pugRes = regPunctuation.test(word);
	        return reg.test(word);
	    },
	    isArray: function(arr) {
	        return Array.isArray(arr) || (arr instanceof Array);
	    },
	    passwordReg: function(val) {
	        var reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，\"\,\:\;；,\.‘’“”：'"\·`【】])|(?=.*?[A-Za-z])(?=.*?[<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，；‘’“”：'"\·`,\.【】]))[\dA-Za-z<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，；‘’“”：'"\·`,\.【】]{6,21}$/;
	        return reg.test(val);
	    },
	    checkSpace: function(val) {
	        var reg = /\s+/;
	        return reg.test(val);
	    },
	    checkRefCode: function(refCode) {
	        var reg = /^[0-9a-zA-Z]{8}$/;
	        return reg.test(refCode);
	    },
	    checkNickName: function(name) {
	        var nickNameReg = /^([\u4e00-\u9fa5]|[0-9a-zA-Z_-])+$/;
	        return nickNameReg.test(name);
	    },
	    isMsgCode: function(num) {
	        var reg = /^\d{6}$/;
	        return reg.test(num);
	    }
	};
	module.exports = obj;

/***/ },

/***/ 63:
/***/ function(module, exports) {

	/**
	 * Created by dongyukuan on 2016/5/28.
	 */
	function limitLen(str, len) {
	    if (str.length > len) {
	        return str.substr(0, len);
	    } else {
	        return str;
	    }
	}
	module.exports = limitLen;

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*
	 * 弹层提示弹窗
	 * zhaodonghong
	 */



	var $publicMask;
	var $publicTips;
	var timer;


	var events = function() {

	    $publicMask.off().on('click', function() {
	        $publicMask.hide();
	        $publicTips.hide();
	    });

	    $publicTips.off().on('click', function() {
	        $publicMask.hide();
	        $publicTips.hide();
	    });
	}


	/**
	 * msg string 提示信息
	 * options object 
	 * options.duration settimout消失时间
	 * options.callback 提示消失的回调
	*/
	var init = function(msg, options) {
	    var defaults = {
	        duration: 2000,
	        callback: function() {}
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

	    timer = setTimeout(function() {

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

/***/ 112:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var WebUploader = __webpack_require__(113);
	__webpack_require__(114);

	var $webUpLoader;
	var $noticeBox = $('[data-node="noticeBox"]');
	var $noticeInfo = $noticeBox.find('[data-node="noticeInfo"]');
	var $wrap = $('[data-node="cropWrap"]');
	var $cropImg = $wrap.find('img');
	var $preview = $('[data-node="avatrSelector"]');
	var $avatarSave = $('[data-action="avatarSave"]')
	var $progress = $noticeBox.find('[data-node="uploadProgress"]');
	var $error = $('[data-node="error"]');
	var $loadNotice = $noticeBox.find('[data-node="loadNotice"]');
	var $retry = $noticeBox.find('[data-action="retry"]');


	var avatarData = {};
	var files;
	var defaultImage = $cropImg.attr('data-default');
	var isUpload = false;
	var link = '';
	var isIE8 = !!!window.FormData;
	var key = false;


	var startCrop = function() {
	    isUpload = true;
	    $cropImg.cropper({
	        aspectRatio: 1,
	        preview: $preview.selector,
	        background: false,
	        guides: false
	    });
	};

	var preview = function(upload, cropper, callback) {
	    $webUpLoader = WebUploader.create(upload);
	    $webUpLoader.on('beforeFileQueued', function() {
	        isUpload = false;
	        $cropImg.cropper('destroy');
	        $error.hide();
	        files !== undefined && $webUpLoader.removeFile(files.id);
	    });

	    $webUpLoader.on('fileQueued', function(file) {
	            files = file;
	            if (isIE8 && !key) {
	                $webUpLoader.upload(files);
	                key = true;
	            } else {
	                $webUpLoader.makeThumb(file, function(error, ret) {
	                    if (error) {
	                        $webUpLoader.removeFile(files.id);
	                        $noticeBox.removeClass('load-ing').show();
	                    } else {
	                        $cropImg.attr('src', ret);
	                        startCrop(cropper);
	                        $avatarSave.addClass('active');
	                    }
	                });
	            }
	            $webUpLoader.md5File(file)
	                // 及时显示进度
	                .progress(function(percentage) {
	                    $loadNotice.text('图片加载中');
	                    $noticeBox.addClass('load-ing').show();
	                    $progress.css('width', percentage * 100 + '%');
	                })
	                // 完成
	                .then(function(val) {
	                    $noticeBox.hide();
	                    $progress.css('width', 0);
	                });
	        })
	        //报错
	    $webUpLoader.on('error', function(type) {
	        var errNotice = {
	            Q_EXCEED_NUM_LIMIT: '文件个数超出限制',
	            Q_EXCEED_SIZE_LIMIT: '总文件大小超出限制',
	            Q_TYPE_DENIED: '文件类型错误',
	            F_EXCEED_SIZE: '请上传jpg、png格式且小于4M的图片！'
	        }
	        $cropImg.attr('src', defaultImage);
	        $preview.find('img').attr('src', defaultImage);
	        $error.show().find('span').text('请上传小于4M的图片，支持格式jpg、jpeg、png！');
	        $avatarSave.removeClass('active');
	    });


	    //上传成功  
	    $webUpLoader.on('uploadSuccess', function(file, response) {

	        if (response.success && response.code === 200) {
	            if (key) {
	                $cropImg.attr('src', response.data[0]);
	                startCrop();
	                $noticeBox.hide();
	                key = false;
	                $avatarSave.addClass('active');
	            } else {
	                $cropImg.attr('src', response.data[0]);
	                $noticeBox.hide();
	                $cropImg.cropper('destroy');
	                $preview.find('img').attr('src', response.data[0]);
	                $webUpLoader.removeFile(files);
	                link = response.data[0];
	                callback.call(null, response.data[0]);
	                $avatarSave.removeClass('active');
	                files = undefined;
	            }
	        } else {
	            $('.cropper-crop-box').hide();
	            $noticeBox.removeClass('load-ing').show();
	            isUpload = true;
	        }

	    });

	    //上传失败  
	    $webUpLoader.on('uploadError', function(file, reason) {
	        $('.cropper-crop-box').hide();
	        $noticeBox.removeClass('load-ing').show();
	        isUpload = true;
	    });

	    //上传时
	    $webUpLoader.on('uploadProgress', function(file, percentage) {
	        $('.cropper-crop-box').hide();
	        $loadNotice.text('图片上传中');
	        $noticeBox.addClass('load-ing').show();
	        $progress.css('width', percentage * 100 + '%');
	        isUpload = false;
	    });

	}

	var submit = function() {
	    $avatarSave.on('click', function() {
	        if (isUpload && $(this).hasClass('active')) {
	            isUpload = false;
	            avatarData = $cropImg.cropper('getData');
	            avatarData.type = 'crop';
	            $webUpLoader.on('uploadBeforeSend', function(object, data, header) {
	                data = $.extend(data, avatarData);
	            });
	            $webUpLoader.upload(files);
	        }
	    });
	    $retry.on('click', function() {
	        if (isUpload && $(this).hasClass('active')) {
	            isUpload = false;
	            avatarData = $cropImg.cropper('getData');
	            avatarData.type = 'crop';
	            $webUpLoader.on('uploadBeforeSend', function(object, data, header) {
	                data = $.extend(data, avatarData);
	            });
	            $webUpLoader.retry(files);
	        }
	    });
	}

	var init = function(callback, uploadOptions, cropperOptions) {
	    $noticeBox = $('[data-node="noticeBox"]');
	    $noticeInfo = $noticeBox.find('[data-node="noticeInfo"]');
	    $wrap = $('[data-node="cropWrap"]');
	    $cropImg = $wrap.find('img');
	    $preview = $('[data-node="avatrSelector"]');
	    $avatarSave = $('[data-action="avatarSave"]')
	    $progress = $noticeBox.find('[data-node="uploadProgress"]');
	    $error = $('[data-node="error"]');
	    $loadNotice = $noticeBox.find('[data-node="loadNotice"]');
	    $retry = $noticeBox.find('[data-action="retry"]');
	    defaultImage = $cropImg.attr('data-default');
	    var fn = callback || function() {};
	    var defaultUpload = {
	        pick: {
	            id: '[data-defaultAddFile=picker]',
	            innerHTML: '<span>+</span>上传头像',
	            multiple: false
	        },
	        thumb: false,
	        compress: false,
	        accept: {
	            title: 'Images',
	            extensions: 'jpg,jpeg,png',
	            mimeTypes: 'image/*'
	        },
	        method: 'post',
	        // swf文件路径
	        swf: $_CONFIG.imgpath + '/images/swf/Uploader.swf',
	        disableGlobalDnd: true,
	        duplicate: true,
	        prepareNextFile: true,
	        chunked: true,
	        fileVal: 'avatar_file',
	        server: '/ajax/crop/crop_img',
	        fileNumLimit: 1,
	        fileSizeLimit: 4 * 1024 * 1024,
	        fileSingleSizeLimit: 4 * 1024 * 1024
	    };
	    var defaultCropper = {
	        aspectRatio: 1,
	        preview: $preview.selector,
	        background: false,
	        guides: false
	    };
	    var upload = $.extend(true, defaultUpload, uploadOptions);
	    var copper = $.extend(true, defaultCropper, cropperOptions);
	    preview(upload, copper, fn);

	    submit();

	    return {
	        webUpLoader: $webUpLoader, //webuploader实例对象

	        cropper: $cropImg //cropper实例对象
	    }
	}

	var destroy = function(callback) {
	    var callback = callback || function() {};
	    callback.call(null, {
	        webUpLoader: $webUpLoader, //webuploader实例对象
	        cropper: $cropImg //cropper实例对象
	    });
	    files = undefined;
	    $webUpLoader.destroy();
	    $cropImg.cropper('destroy');
	}

	var getData = function() {
	    return link;
	}

	module.exports = {
	    init: init,
	    getData: getData,
	    destroy: destroy
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 113:
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
	                    for (; (end0pos>0)&&(DU[end0pos]==0); end0pos--) {};
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
	    
	        };
	    
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
	            ret = !!raw ? this._state : hex(this._state);
	    
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
	    
	            return !!raw ? hash : hex(hash);
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
	    
	            return !!raw ? hash : hex(hash);
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
	            ret = !!raw ? this._state : hex(this._state);
	    
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
	    
	            return !!raw ? hash : hex(hash);
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

/***/ 114:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Cropper v0.9.2
	 * https://github.com/fengyuanchen/cropper
	 *
	 * Copyright (c) 2014-2015 Fengyuan Chen and contributors
	 * Released under the MIT license
	 *
	 * Date: 2015-04-18T04:35:01.500Z
	 */
	!function(a){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (a), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){"use strict";function b(a){return"number"==typeof a}function c(a){return"undefined"==typeof a}function d(a,c){var d=[];return b(c)&&d.push(c),d.slice.apply(a,d)}function e(a,b){var c=d(arguments,2);return function(){return a.apply(b,c.concat(d(arguments)))}}function f(a){var b=a.match(/^(https?:)\/\/([^\:\/\?#]+):?(\d*)/i);return b&&(b[1]!==o.protocol||b[2]!==o.hostname||b[3]!==o.port)}function g(a){var b="timestamp="+(new Date).getTime();return a+(-1===a.indexOf("?")?"?":"&")+b}function h(a,b){return b.left<0&&a.width<b.left+b.width&&b.top<0&&a.height<b.top+b.height}function i(a){return a?"rotate("+a+"deg)":"none"}function j(a,b){var c,d,e=R(a.degree)%180,f=(e>90?180-e:e)*Math.PI/180,g=S(f),h=T(f),i=a.width,j=a.height,k=a.aspectRatio;return b?(c=i/(h+g/k),d=c/k):(c=i*h+j*g,d=i*g+j*h),{width:c,height:d}}function k(b,c){var d=a("<canvas>")[0],e=d.getContext("2d"),f=c.naturalWidth,g=c.naturalHeight,h=c.rotate,i=j({width:f,height:g,degree:h});return h?(d.width=i.width,d.height=i.height,e.save(),e.translate(i.width/2,i.height/2),e.rotate(h*Math.PI/180),e.drawImage(b,-f/2,-g/2,f,g),e.restore()):(d.width=f,d.height=g,e.drawImage(b,0,0,f,g)),d}function l(b,c){this.$element=a(b),this.options=a.extend({},l.DEFAULTS,a.isPlainObject(c)&&c),this.ready=!1,this.built=!1,this.rotated=!1,this.cropped=!1,this.disabled=!1,this.canvas=null,this.cropBox=null,this.load()}var m=a(window),n=a(document),o=window.location,p=".cropper",q="preview"+p,r=/^(e|n|w|s|ne|nw|sw|se|all|crop|move|zoom)$/,s="cropper-modal",t="cropper-hide",u="cropper-hidden",v="cropper-invisible",w="cropper-move",x="cropper-crop",y="cropper-disabled",z="cropper-bg",A="mousedown touchstart",B="mousemove touchmove",C="mouseup mouseleave touchend touchleave touchcancel",D="wheel mousewheel DOMMouseScroll",E="dblclick",F="resize"+p,G="build"+p,H="built"+p,I="dragstart"+p,J="dragmove"+p,K="dragend"+p,L="zoomin"+p,M="zoomout"+p,N=a.isFunction(a("<canvas>")[0].getContext),O=Math.sqrt,P=Math.min,Q=Math.max,R=Math.abs,S=Math.sin,T=Math.cos,U=parseFloat,V={};V.load=function(b){var c,d,e,h,i=this.options,j=this.$element;if(!b)if(j.is("img")){if(!j.attr("src"))return;b=j.prop("src")}else j.is("canvas")&&N&&(b=j[0].toDataURL());b&&(e=a.Event(G),j.one(G,i.build).trigger(e),e.isDefaultPrevented()||(i.checkImageOrigin&&f(b)&&(c="anonymous",j.prop("crossOrigin")||(d=g(b))),this.$clone=h=a("<img>"),h.one("load",a.proxy(function(){var a=h.prop("naturalWidth")||h.width(),c=h.prop("naturalHeight")||h.height();this.image={naturalWidth:a,naturalHeight:c,aspectRatio:a/c,rotate:0},this.url=b,this.ready=!0,this.build()},this)).one("error",function(){h.remove()}).attr({src:d||b,crossOrigin:c}),h.addClass(t).insertAfter(j)))},V.build=function(){var b,c,d=this.$element,e=this.$clone,f=this.options;this.ready&&(this.built&&this.unbuild(),this.$cropper=b=a(l.TEMPLATE),d.addClass(u),e.removeClass(t),this.$container=d.parent().append(b),this.$canvas=b.find(".cropper-canvas").append(e),this.$dragBox=b.find(".cropper-drag-box"),this.$cropBox=c=b.find(".cropper-crop-box"),this.$viewBox=b.find(".cropper-view-box"),this.addListeners(),this.initPreview(),f.aspectRatio=U(f.aspectRatio)||0/0,f.autoCrop?(this.cropped=!0,f.modal&&this.$dragBox.addClass(s)):c.addClass(u),f.background&&b.addClass(z),f.highlight||c.find(".cropper-face").addClass(v),f.guides||c.find(".cropper-dashed").addClass(u),f.movable||c.find(".cropper-face").data("drag","move"),f.resizable||c.find(".cropper-line, .cropper-point").addClass(u),this.setDragMode(f.dragCrop?"crop":"move"),this.built=!0,this.render(),d.one(H,f.built).trigger(H))},V.unbuild=function(){this.built&&(this.built=!1,this.container=null,this.canvas=null,this.cropBox=null,this.removeListeners(),this.resetPreview(),this.$preview=null,this.$viewBox=null,this.$cropBox=null,this.$dragBox=null,this.$canvas=null,this.$container=null,this.$cropper.remove(),this.$cropper=null)},a.extend(V,{render:function(){this.initContainer(),this.initCanvas(),this.initCropBox(),this.renderCanvas(),this.cropped&&this.renderCropBox()},initContainer:function(){var a=this.$element,b=this.$container,c=this.$cropper,d=this.options;c.addClass(u),a.removeClass(u),c.css(this.container={width:Q(b.width(),U(d.minContainerWidth)||200),height:Q(b.height(),U(d.minContainerHeight)||100)}),a.addClass(u),c.removeClass(u)},initCanvas:function(){var b=this.container,c=b.width,d=b.height,e=this.image,f=e.aspectRatio,g={aspectRatio:f,width:c,height:d};d*f>c?g.height=c/f:g.width=d*f,g.oldLeft=g.left=(c-g.width)/2,g.oldTop=g.top=(d-g.height)/2,this.canvas=g,this.limitCanvas(!0,!0),this.initialImage=a.extend({},e),this.initialCanvas=a.extend({},g)},limitCanvas:function(b,c){var d,e,f=this.options,g=f.strict,h=this.container,i=h.width,j=h.height,k=this.canvas,l=k.aspectRatio,m=this.cropBox,n=this.cropped&&m;b&&(d=U(f.minCanvasWidth)||0,e=U(f.minCanvasHeight)||0,d?(g&&(d=Q(n?m.width:i,d)),e=d/l):e?(g&&(e=Q(n?m.height:j,e)),d=e*l):g&&(n?(d=m.width,e=m.height,e*l>d?d=e*l:e=d/l):(d=i,e=j,e*l>d?e=d/l:d=e*l)),a.extend(k,{minWidth:d,minHeight:e,maxWidth:1/0,maxHeight:1/0})),c&&(g?n?(k.minLeft=P(m.left,m.left+m.width-k.width),k.minTop=P(m.top,m.top+m.height-k.height),k.maxLeft=m.left,k.maxTop=m.top):(k.minLeft=P(0,i-k.width),k.minTop=P(0,j-k.height),k.maxLeft=Q(0,i-k.width),k.maxTop=Q(0,j-k.height)):(k.minLeft=-k.width,k.minTop=-k.height,k.maxLeft=i,k.maxTop=j))},renderCanvas:function(a){var b,c,d=this.options,e=this.canvas,f=this.image;this.rotated&&(this.rotated=!1,c=j({width:f.width,height:f.height,degree:f.rotate}),b=c.width/c.height,b!==e.aspectRatio&&(e.left-=(c.width-e.width)/2,e.top-=(c.height-e.height)/2,e.width=c.width,e.height=c.height,e.aspectRatio=b,this.limitCanvas(!0,!1))),(e.width>e.maxWidth||e.width<e.minWidth)&&(e.left=e.oldLeft),(e.height>e.maxHeight||e.height<e.minHeight)&&(e.top=e.oldTop),e.width=P(Q(e.width,e.minWidth),e.maxWidth),e.height=P(Q(e.height,e.minHeight),e.maxHeight),this.limitCanvas(!1,!0),e.oldLeft=e.left=P(Q(e.left,e.minLeft),e.maxLeft),e.oldTop=e.top=P(Q(e.top,e.minTop),e.maxTop),this.$canvas.css({width:e.width,height:e.height,left:e.left,top:e.top}),this.renderImage(),this.cropped&&d.strict&&!h(this.container,e)&&this.limitCropBox(!0,!0),a&&this.output()},renderImage:function(){var b,c=this.canvas,d=this.image;d.rotate&&(b=j({width:c.width,height:c.height,degree:d.rotate,aspectRatio:d.aspectRatio},!0)),a.extend(d,b?{width:b.width,height:b.height,left:(c.width-b.width)/2,top:(c.height-b.height)/2}:{width:c.width,height:c.height,left:0,top:0}),this.$clone.css({width:d.width,height:d.height,marginLeft:d.left,marginTop:d.top,transform:i(d.rotate)})},initCropBox:function(){var b=this.options,c=this.canvas,d=b.aspectRatio,e=U(b.autoCropArea)||.8,f={width:c.width,height:c.height};d&&(c.height*d>c.width?f.height=f.width/d:f.width=f.height*d),this.cropBox=f,this.limitCropBox(!0,!0),f.width=P(Q(f.width,f.minWidth),f.maxWidth),f.height=P(Q(f.height,f.minHeight),f.maxHeight),f.width=Q(f.minWidth,f.width*e),f.height=Q(f.minHeight,f.height*e),f.oldLeft=f.left=c.left+(c.width-f.width)/2,f.oldTop=f.top=c.top+(c.height-f.height)/2,this.initialCropBox=a.extend({},f)},limitCropBox:function(a,b){var c,d,e=this.options,f=e.strict,g=this.container,h=g.width,i=g.height,j=this.canvas,k=this.cropBox,l=e.aspectRatio;a&&(c=U(e.minCropBoxWidth)||0,d=U(e.minCropBoxHeight)||0,k.minWidth=P(h,c),k.minHeight=P(i,d),k.maxWidth=P(h,f?j.width:h),k.maxHeight=P(i,f?j.height:i),l&&(k.maxHeight*l>k.maxWidth?(k.minHeight=k.minWidth/l,k.maxHeight=k.maxWidth/l):(k.minWidth=k.minHeight*l,k.maxWidth=k.maxHeight*l)),k.minWidth=P(k.maxWidth,k.minWidth),k.minHeight=P(k.maxHeight,k.minHeight)),b&&(f?(k.minLeft=Q(0,j.left),k.minTop=Q(0,j.top),k.maxLeft=P(h,j.left+j.width)-k.width,k.maxTop=P(i,j.top+j.height)-k.height):(k.minLeft=0,k.minTop=0,k.maxLeft=h-k.width,k.maxTop=i-k.height))},renderCropBox:function(){var a=this.options,b=this.container,c=b.width,d=b.height,e=this.$cropBox,f=this.cropBox;(f.width>f.maxWidth||f.width<f.minWidth)&&(f.left=f.oldLeft),(f.height>f.maxHeight||f.height<f.minHeight)&&(f.top=f.oldTop),f.width=P(Q(f.width,f.minWidth),f.maxWidth),f.height=P(Q(f.height,f.minHeight),f.maxHeight),this.limitCropBox(!1,!0),f.oldLeft=f.left=P(Q(f.left,f.minLeft),f.maxLeft),f.oldTop=f.top=P(Q(f.top,f.minTop),f.maxTop),a.movable&&e.find(".cropper-face").data("drag",f.width===c&&f.height===d?"move":"all"),e.css({width:f.width,height:f.height,left:f.left,top:f.top}),this.cropped&&a.strict&&!h(b,this.canvas)&&this.limitCanvas(!0,!0),this.disabled||this.output()},output:function(){var a=this.options;this.preview(),a.crop&&a.crop.call(this.$element,this.getData())}}),V.initPreview=function(){var b=this.url;this.$preview=a(this.options.preview),this.$viewBox.html('<img src="'+b+'">'),this.$preview.each(function(){var c=a(this);c.data(q,{width:c.width(),height:c.height(),original:c.html()}).html('<img src="'+b+'" style="display:block;width:100%;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation: 0deg!important">')})},V.resetPreview=function(){this.$preview.each(function(){var b=a(this);b.html(b.data(q).original).removeData(q)})},V.preview=function(){var b=this.image,c=this.canvas,d=this.cropBox,e=b.width,f=b.height,g=d.left-c.left-b.left,h=d.top-c.top-b.top,j=b.rotate;this.cropped&&!this.disabled&&(this.$viewBox.find("img").css({width:e,height:f,marginLeft:-g,marginTop:-h,transform:i(j)}),this.$preview.each(function(){var b=a(this),c=b.data(q),k=c.width/d.width,l=c.width,m=d.height*k;m>c.height&&(k=c.height/d.height,l=d.width*k,m=c.height),b.width(l).height(m).find("img").css({width:e*k,height:f*k,marginLeft:-g*k,marginTop:-h*k,transform:i(j)})}))},V.addListeners=function(){var b=this.options;this.$element.on(I,b.dragstart).on(J,b.dragmove).on(K,b.dragend).on(L,b.zoomin).on(M,b.zoomout),this.$cropper.on(A,a.proxy(this.dragstart,this)).on(E,a.proxy(this.dblclick,this)),b.zoomable&&b.mouseWheelZoom&&this.$cropper.on(D,a.proxy(this.wheel,this)),n.on(B,this._dragmove=e(this.dragmove,this)).on(C,this._dragend=e(this.dragend,this)),b.responsive&&m.on(F,this._resize=e(this.resize,this))},V.removeListeners=function(){var a=this.options;this.$element.off(I,a.dragstart).off(J,a.dragmove).off(K,a.dragend).off(L,a.zoomin).off(M,a.zoomout),this.$cropper.off(A,this.dragstart).off(E,this.dblclick),a.zoomable&&a.mouseWheelZoom&&this.$cropper.off(D,this.wheel),n.off(B,this._dragmove).off(C,this._dragend),a.responsive&&m.off(F,this._resize)},a.extend(V,{resize:function(){var b,c,d,e=this.$container,f=this.container;this.disabled||(d=e.width()/f.width,(1!==d||e.height()!==f.height)&&(b=this.getCanvasData(),c=this.getCropBoxData(),this.render(),this.setCanvasData(a.each(b,function(a,c){b[a]=c*d})),this.setCropBoxData(a.each(c,function(a,b){c[a]=b*d}))))},dblclick:function(){this.disabled||this.setDragMode(this.$dragBox.hasClass(x)?"move":"crop")},wheel:function(a){var b=a.originalEvent,c=1;this.disabled||(a.preventDefault(),b.deltaY?c=b.deltaY>0?1:-1:b.wheelDelta?c=-b.wheelDelta/120:b.detail&&(c=b.detail>0?1:-1),this.zoom(.1*-c))},dragstart:function(b){var c,d,e,f=this.options,g=b.originalEvent,h=g&&g.touches,i=b;if(!this.disabled){if(h){if(e=h.length,e>1){if(!f.zoomable||!f.touchDragZoom||2!==e)return;i=h[1],this.startX2=i.pageX,this.startY2=i.pageY,c="zoom"}i=h[0]}if(c=c||a(i.target).data("drag"),r.test(c)){if(b.preventDefault(),d=a.Event(I,{originalEvent:g,dragType:c}),this.$element.trigger(d),d.isDefaultPrevented())return;this.dragType=c,this.cropping=!1,this.startX=i.pageX,this.startY=i.pageY,"crop"===c&&(this.cropping=!0,this.$dragBox.addClass(s))}}},dragmove:function(b){var c,d,e=this.options,f=b.originalEvent,g=f&&f.touches,h=b,i=this.dragType;if(!this.disabled){if(g){if(d=g.length,d>1){if(!e.zoomable||!e.touchDragZoom||2!==d)return;h=g[1],this.endX2=h.pageX,this.endY2=h.pageY}h=g[0]}if(i){if(b.preventDefault(),c=a.Event(J,{originalEvent:f,dragType:i}),this.$element.trigger(c),c.isDefaultPrevented())return;this.endX=h.pageX,this.endY=h.pageY,this.change()}}},dragend:function(b){var c,d=this.dragType;if(!this.disabled&&d){if(b.preventDefault(),c=a.Event(K,{originalEvent:b.originalEvent,dragType:d}),this.$element.trigger(c),c.isDefaultPrevented())return;this.cropping&&(this.cropping=!1,this.$dragBox.toggleClass(s,this.cropped&&this.options.modal)),this.dragType=""}}}),a.extend(V,{reset:function(){this.built&&!this.disabled&&(this.image=a.extend({},this.initialImage),this.canvas=a.extend({},this.initialCanvas),this.renderCanvas(),this.cropped&&(this.cropBox=a.extend({},this.initialCropBox),this.renderCropBox()))},clear:function(){this.cropped&&!this.disabled&&(a.extend(this.cropBox,{left:0,top:0,width:0,height:0}),this.cropped=!1,this.renderCropBox(),this.limitCanvas(),this.renderCanvas(),this.$dragBox.removeClass(s),this.$cropBox.addClass(u))},destroy:function(){var a=this.$element;this.ready?(this.unbuild(),a.removeClass(u)):this.$clone.off("load").remove(),a.removeData("cropper")},replace:function(a){!this.disabled&&a&&this.load(a)},enable:function(){this.built&&(this.disabled=!1,this.$cropper.removeClass(y))},disable:function(){this.built&&(this.disabled=!0,this.$cropper.addClass(y))},move:function(a,c){var d=this.canvas;this.built&&!this.disabled&&b(a)&&b(c)&&(d.left+=a,d.top+=c,this.renderCanvas(!0))},zoom:function(b){var c,d,e,f=this.canvas;if(b=U(b),b&&this.built&&!this.disabled&&this.options.zoomable){if(c=a.Event(b>0?L:M),this.$element.trigger(c),c.isDefaultPrevented())return;b=-1>=b?1/(1-b):1>=b?1+b:b,d=f.width*b,e=f.height*b,f.left-=(d-f.width)/2,f.top-=(e-f.height)/2,f.width=d,f.height=e,this.renderCanvas(!0),this.setDragMode("move")}},rotate:function(a){var b=this.image;a=U(a),a&&this.built&&!this.disabled&&this.options.rotatable&&(b.rotate=(b.rotate+a)%360,this.rotated=!0,this.renderCanvas(!0))},getData:function(){var b,c,d=this.cropBox,e=this.canvas,f=this.image;return this.built&&this.cropped?(c={x:d.left-e.left,y:d.top-e.top,width:d.width,height:d.height},b=f.width/f.naturalWidth,a.each(c,function(a,d){d/=b,c[a]=d})):c={x:0,y:0,width:0,height:0},c.rotate=f.rotate,c},getContainerData:function(){return this.built?this.container:{}},getImageData:function(){return this.ready?this.image:{}},getCanvasData:function(){var a,b=this.canvas;return this.built&&(a={left:b.left,top:b.top,width:b.width,height:b.height}),a||{}},setCanvasData:function(c){var d=this.canvas,e=d.aspectRatio;this.built&&!this.disabled&&a.isPlainObject(c)&&(b(c.left)&&(d.left=c.left),b(c.top)&&(d.top=c.top),b(c.width)?(d.width=c.width,d.height=c.width/e):b(c.height)&&(d.height=c.height,d.width=c.height*e),this.renderCanvas(!0))},getCropBoxData:function(){var a,b=this.cropBox;return this.built&&this.cropped&&(a={left:b.left,top:b.top,width:b.width,height:b.height}),a||{}},setCropBoxData:function(c){var d=this.cropBox,e=this.options.aspectRatio;this.built&&this.cropped&&!this.disabled&&a.isPlainObject(c)&&(b(c.left)&&(d.left=c.left),b(c.top)&&(d.top=c.top),e?b(c.width)?(d.width=c.width,d.height=d.width/e):b(c.height)&&(d.height=c.height,d.width=d.height*e):(b(c.width)&&(d.width=c.width),b(c.height)&&(d.height=c.height)),this.renderCropBox())},getCroppedCanvas:function(b){var c,d,e,f,g,h,i,j,l,m,n;if(this.built&&this.cropped&&N)return a.isPlainObject(b)||(b={}),n=this.getData(),c=n.width,d=n.height,j=c/d,a.isPlainObject(b)&&(g=b.width,h=b.height,g?(h=g/j,i=g/c):h&&(g=h*j,i=h/d)),e=g||c,f=h||d,l=a("<canvas>")[0],l.width=e,l.height=f,m=l.getContext("2d"),b.fillColor&&(m.fillStyle=b.fillColor,m.fillRect(0,0,e,f)),m.drawImage.apply(m,function(){var a,b,e,f,g,h,j=k(this.$clone[0],this.image),l=j.width,m=j.height,o=[j],p=n.x,q=n.y;return-c>=p||p>l?p=a=e=g=0:0>=p?(e=-p,p=0,a=g=P(l,c+p)):l>=p&&(e=0,a=g=P(c,l-p)),0>=a||-d>=q||q>m?q=b=f=h=0:0>=q?(f=-q,q=0,b=h=P(m,d+q)):m>=q&&(f=0,b=h=P(d,m-q)),o.push(p,q,a,b),i&&(e*=i,f*=i,g*=i,h*=i),g>0&&h>0&&o.push(e,f,g,h),o}.call(this)),l},setAspectRatio:function(a){var b=this.options;this.disabled||c(a)||(b.aspectRatio=U(a)||0/0,this.built&&(this.initCropBox(),this.cropped&&this.renderCropBox()))},setDragMode:function(a){var b=this.$dragBox,c=!1,d=!1;if(this.ready&&!this.disabled){switch(a){case"crop":this.options.dragCrop?(c=!0,b.data("drag",a)):d=!0;break;case"move":d=!0,b.data("drag",a);break;default:b.removeData("drag")}b.toggleClass(x,c).toggleClass(w,d)}}}),V.change=function(){var a,b=this.dragType,c=this.options,d=this.canvas,e=this.container,f=this.cropBox,g=f.width,h=f.height,i=f.left,j=f.top,k=i+g,l=j+h,m=0,n=0,o=e.width,p=e.height,q=!0,r=c.aspectRatio,s={x:this.endX-this.startX,y:this.endY-this.startY};switch(c.strict&&(m=f.minLeft,n=f.minTop,o=m+P(e.width,d.width),p=n+P(e.height,d.height)),r&&(s.X=s.y*r,s.Y=s.x/r),b){case"all":i+=s.x,j+=s.y;break;case"e":if(s.x>=0&&(k>=o||r&&(n>=j||l>=p))){q=!1;break}g+=s.x,r&&(h=g/r,j-=s.Y/2),0>g&&(b="w",g=0);break;case"n":if(s.y<=0&&(n>=j||r&&(m>=i||k>=o))){q=!1;break}h-=s.y,j+=s.y,r&&(g=h*r,i+=s.X/2),0>h&&(b="s",h=0);break;case"w":if(s.x<=0&&(m>=i||r&&(n>=j||l>=p))){q=!1;break}g-=s.x,i+=s.x,r&&(h=g/r,j+=s.Y/2),0>g&&(b="e",g=0);break;case"s":if(s.y>=0&&(l>=p||r&&(m>=i||k>=o))){q=!1;break}h+=s.y,r&&(g=h*r,i-=s.X/2),0>h&&(b="n",h=0);break;case"ne":if(r){if(s.y<=0&&(n>=j||k>=o)){q=!1;break}h-=s.y,j+=s.y,g=h*r}else s.x>=0?o>k?g+=s.x:s.y<=0&&n>=j&&(q=!1):g+=s.x,s.y<=0?j>0&&(h-=s.y,j+=s.y):(h-=s.y,j+=s.y);0>g&&0>h?(b="sw",h=0,g=0):0>g?(b="nw",g=0):0>h&&(b="se",h=0);break;case"nw":if(r){if(s.y<=0&&(n>=j||m>=i)){q=!1;break}h-=s.y,j+=s.y,g=h*r,i+=s.X}else s.x<=0?i>0?(g-=s.x,i+=s.x):s.y<=0&&n>=j&&(q=!1):(g-=s.x,i+=s.x),s.y<=0?j>0&&(h-=s.y,j+=s.y):(h-=s.y,j+=s.y);0>g&&0>h?(b="se",h=0,g=0):0>g?(b="ne",g=0):0>h&&(b="sw",h=0);break;case"sw":if(r){if(s.x<=0&&(m>=i||l>=p)){q=!1;break}g-=s.x,i+=s.x,h=g/r}else s.x<=0?i>0?(g-=s.x,i+=s.x):s.y>=0&&l>=p&&(q=!1):(g-=s.x,i+=s.x),s.y>=0?p>l&&(h+=s.y):h+=s.y;0>g&&0>h?(b="ne",h=0,g=0):0>g?(b="se",g=0):0>h&&(b="nw",h=0);break;case"se":if(r){if(s.x>=0&&(k>=o||l>=p)){q=!1;break}g+=s.x,h=g/r}else s.x>=0?o>k?g+=s.x:s.y>=0&&l>=p&&(q=!1):g+=s.x,s.y>=0?p>l&&(h+=s.y):h+=s.y;0>g&&0>h?(b="nw",h=0,g=0):0>g?(b="sw",g=0):0>h&&(b="ne",h=0);break;case"move":d.left+=s.x,d.top+=s.y,this.renderCanvas(!0),q=!1;break;case"zoom":this.zoom(function(a,b,c,d){var e=O(a*a+b*b),f=O(c*c+d*d);return(f-e)/e}(R(this.startX-this.startX2),R(this.startY-this.startY2),R(this.endX-this.endX2),R(this.endY-this.endY2))),this.startX2=this.endX2,this.startY2=this.endY2,q=!1;break;case"crop":s.x&&s.y&&(a=this.$cropper.offset(),i=this.startX-a.left,j=this.startY-a.top,g=f.minWidth,h=f.minHeight,s.x>0?s.y>0?b="se":(b="ne",j-=h):s.y>0?(b="sw",i-=g):(b="nw",i-=g,j-=h),this.cropped||(this.cropped=!0,this.$cropBox.removeClass(u)))}q&&(f.width=g,f.height=h,f.left=i,f.top=j,this.dragType=b,this.renderCropBox()),this.startX=this.endX,this.startY=this.endY},a.extend(l.prototype,V),l.DEFAULTS={aspectRatio:0/0,autoCropArea:.8,crop:null,preview:"",strict:!0,responsive:!0,checkImageOrigin:!0,modal:!0,guides:!0,highlight:!0,background:!0,autoCrop:!0,dragCrop:!0,movable:!0,resizable:!0,rotatable:!0,zoomable:!0,touchDragZoom:!0,mouseWheelZoom:!0,minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:200,minContainerHeight:100,build:null,built:null,dragstart:null,dragmove:null,dragend:null,zoomin:null,zoomout:null},l.setDefaults=function(b){a.extend(l.DEFAULTS,b)},l.TEMPLATE=function(a,b){return b=b.split(","),a.replace(/\d+/g,function(a){return b[a]})}('<0 6="5-container"><0 6="5-canvas"></0><0 6="5-2-9" 3-2="move"></0><0 6="5-crop-9"><1 6="5-view-9"></1><1 6="5-8 8-h"></1><1 6="5-8 8-v"></1><1 6="5-face" 3-2="all"></1><1 6="5-7 7-e" 3-2="e"></1><1 6="5-7 7-n" 3-2="n"></1><1 6="5-7 7-w" 3-2="w"></1><1 6="5-7 7-s" 3-2="s"></1><1 6="5-4 4-e" 3-2="e"></1><1 6="5-4 4-n" 3-2="n"></1><1 6="5-4 4-w" 3-2="w"></1><1 6="5-4 4-s" 3-2="s"></1><1 6="5-4 4-ne" 3-2="ne"></1><1 6="5-4 4-nw" 3-2="nw"></1><1 6="5-4 4-sw" 3-2="sw"></1><1 6="5-4 4-se" 3-2="se"></1></0></0>',"div,span,drag,data,point,cropper,class,line,dashed,box"),l.other=a.fn.cropper,a.fn.cropper=function(b){var e,f=d(arguments,1);return this.each(function(){var c,d=a(this),g=d.data("cropper");g||d.data("cropper",g=new l(this,b)),"string"==typeof b&&a.isFunction(c=g[b])&&(e=c.apply(g,f))}),c(e)?this:e},a.fn.cropper.Constructor=l,a.fn.cropper.setDefaults=l.setDefaults,a.fn.cropper.noConflict=function(){return a.fn.cropper=l.other,this}});

/***/ },

/***/ 239:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var cropper = __webpack_require__(112);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var hint = __webpack_require__(84);

	var $tabs = $('[data-node="editTab"] a');
	var $tabBoxs = $('[data-node="editBox"]');
	var $faceBox = $('[data-action="editFaceImg"]');

	var firstTab = true;


	var cropperInit = function() {

		cropper.init(function(src) {
			fetch.post(url.get('subName'), {
				data: {
					facePicUrl: src
				}
			}).done(function(result) {

				if (result && result.success && result.code === 200) {
					$faceBox.find('img').attr("src", src);
					$('[data-node="headImg"]').attr("src", src);
					hint.init('保存成功');
				} else {
					hint.init('保存失败');
				}

			}).fail(function() {
				hint.init('保存失败');
			});

		});
	}

	var Tab = function() {
		$(document).on('click', '[data-node="editTab"] a', function() {
			if (!$(this).hasClass('active')) {
				$('[data-node=comErrTip]').addClass('hide');
				var index = $tabs.index($(this));
				$tabs.removeClass('active').eq(index).addClass('active');
				$tabBoxs.hide().eq(index).show();
				if (index === 1 && firstTab) {
					firstTab = false;
					cropperInit();
				}
			}
		});
		$faceBox.on('click', function() {
			$('[data-node=comErrTip]').addClass('hide');
			$tabs.eq(1).click();
		});
	};



	var init = function() {
		Tab();
		if (window.location.href.indexOf('type=2') !== -1) {
			cropperInit();
		}

	};



	module.exports = {
		init: init
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var tips = __webpack_require__(35);
	var editBox = $('[data-node=editBox]').eq(0);
	var birTip = editBox.find('[data-node=birTip]');
	var hideCls = 'hide';

	var dateClick = function() {
	    editBox.on('click', '[data-node=showDate]', function() {
	        var dateDefault = $(this).attr('data-default');
	        if (dateDefault) {
	            birTip.removeClass(hideCls).text(tips.birthTip.tip);
	            return false;
	        }
	    });
	    var eTime = +$GLOBAL_CONFIG['curr_time'];
	    var option = {
	        endTime: eTime
	    };
	    __webpack_require__(241).initDate(option);
	};
	module.exports = {
	    init: dateClick
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * Created by dongyukuan on 2016/7/21.
	 */
	function ShowDate(option) {
	    this.startTime = option ? option.startTime : +new Date(1930, 1, 1);
	    this.endTime = option ? option.endTime : +new Date(2099, 12, 30);
	    this.dateReg = /^\d{4}-\d{1,2}-\d{1,2}$/;
	    this.yearErrTip = "请输入正确年份！";
	    this.monErrTip = "请输入正确月份！";
	    this.ymErrTip = "请填写正确的年和月！";
	}
	ShowDate.prototype.addZero = function(num) {
	    var n = /^\d$/;
	    var m;
	    if (n.test(num)) {
	        m = '0' + num;
	    } else {
	        m = num;
	    }
	    return m;
	};
	//获取内容或者写入内容
	ShowDate.prototype.handleVal = function($node, text) {
	    if (text) {
	        $node.text(text);
	    } else {
	        return $node.text();
	    }
	};
	//指定时间戳与当前时间戳做比较
	ShowDate.prototype.compareDate = function(date) {
	    var nowDate = this.endTime;
	    var ret = true;
	    if (date > nowDate) {
	        ret = false;
	    } else {
	        ret = true;
	    }
	    return ret;
	};
	//阿拉伯数字与大写数字的转换
	ShowDate.prototype.switchNum = function(num) {
	    var numAry = ['一',
	        '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'
	    ];
	    var upperNum;
	    if (/^\d+$/.test(num)) {
	        return numAry[num - 1];
	    } else {
	        $.each(numAry, function(index, value) {
	            if (value == num) {
	                upperNum = index + 1;
	            }
	        });
	        return upperNum;
	    }
	};
	ShowDate.prototype.init = function() {
	    var _self = this;
	    //将日历模板添加到盒子中
	    if ($('[data-node=data_box]').length === 0) {
	        var tplHtml = _self.tpl();
	        $('body').append(tplHtml);
	    }
	    _self.dateContainer = $('[data-node=data_box]');

	    _self.dateBox = _self.dateContainer.find('[data-node=sel_date]');

	    _self.yearBox = _self.dateContainer.find('[data-node=year]');
	    _self.mnBox = _self.dateContainer.find('[data-node=month]');
	    _self.ymBox = _self.dateContainer.find('[data-node=month],[data-node=year]');

	    _self.dataTable = _self.dateBox.find('[data-node=data_table]');
	    _self.tbody = _self.dateBox.find('[data-node=tBody]');
	    _self.td = _self.tbody.find('td');

	    _self.prevM = _self.dateBox.find('[data-node=prev_m]');
	    _self.nextM = _self.dateBox.find('[data-node=next_m]');
	    _self.monBtn = _self.dateBox.find('[data-node=prev_m],[data-node=next_m]');

	    _self.prevY = _self.dateBox.find('[data-node=prev_y]');
	    _self.nextY = _self.dateBox.find('[data-node=next_y]');
	    _self.yearBtn = _self.dateBox.find('[data-node=prev_y],[data-node=next_y]');

	    //显示日历
	    $(document).on('click', '[data-node=showDate]', function() {
	        _self.changeDefault($(this));
	        _self.show();
	        _self.dateText = $(this);
	        var topBtn = $(this).offset().top;
	        var leftBtn = $(this).offset().left;

	        _self.dateContainer.css('position', 'absolute').css({
	            top: topBtn + 50,
	            left: leftBtn
	        });
	        _self.dateBox.css('marginTop', 0);
	        return false;
	    });
	    //点击空白 隐藏日历
	    $(document).on('click', function(event) {
	        var Target = $(event.target);
	        _self.hide(event, Target, $(this));
	    });
	    //点击选择日期
	    _self.tbody.on('click', 'td', function() {
	        var newDd = +$(this).text();
	        var newYear = parseInt(_self.handleVal(_self.yearBox), 10);
	        var newMn = _self.switchNum(_self.handleVal(_self.mnBox));
	        var dateFlag = $(this).hasClass('grayClr');
	        var trIndex = $(this).parents('tr').index();
	        if (dateFlag) {
	            if (trIndex === 0) {
	                if (newMn === 1) {
	                    newYear--;
	                    newMn = 12;
	                } else {
	                    newMn--;
	                }
	            } else {
	                if (newMn === 12) {
	                    newYear++;
	                    newMn = 1;
	                } else {
	                    newMn++;
	                }
	            }
	        }
	        if (isNaN(newYear) || isNaN(newMn) || newYear < 1930 || newYear > 2099 || newMn < 1 || newMn > 12) { //如果td有值;
	            //alert(_self.ymErrTip);
	            return false;
	        }
	        var newDate = +new Date(newYear + "/" + newMn + "/" + newDd);
	        var dateComFlag = _self.compareDate(newDate);
	        if (!dateComFlag) {
	            //alert(_self.ymErrTip);
	            return false;
	        }
	        _self.dateText.val(newYear + "-" + _self.addZero(newMn) + "-" + _self.addZero(newDd));
	        _self.dateContainer.addClass('hide');
	        _self.dateBox.addClass("hide");
	    });
	    //点击切换月份
	    _self.monBtn.on('click', function() {
	        _self.changeMn($(this));
	        return $(this);
	    });
	    //点击切换年份
	    _self.yearBtn.on('click', function() {
	        _self.changeYr($(this));
	        return $(this);
	    });
	};
	//日历模板
	ShowDate.prototype.tpl = function() {
	    var str = '';
	    str += '<div class="data_box hide" data-node="data_box"> <div class="sel_date hide" data-node="sel_date"> <div class="date-nav clearfix"> <span class="icon prev_y fl" data-node="prev_y">&#xea72;</span> <span class="icon prev_m fl" data-node="prev_m">&#xe970;</span> <div class="show_mn fl"> <a href="javascript:;" data-node="month"> </a> <span class="ml5">月</span> <a href="javascript:;" data-node="year"></a> </div>  <span class="icon next_y fr" data-node="next_y">&#xea73;</span> <span class="icon next_m fr" data-node="next_m">&#xe98c;</span> </div> <table class="data_table" data-node="data_table" cellpadding="0" cellspacing="0"> <thead> <tr> <td>日</td> <td>一</td> <td>二</td> <td>三</td> <td>四</td> <td>五</td> <td>六</td> </tr> </thead> <tbody data-node="tBody"> <tr> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> </tr> <tr> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> </tr> <tr> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> </tr> <tr> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> </tr> <tr> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> </tr> <tr> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> <td><span></span></td> </tr> </tbody> </table> </div> </div>';
	    return str;
	};
	//点击切换月份
	ShowDate.prototype.changeMn = function(dateContainer) {
	    var _self = this;
	    var NewMn = _self.switchNum(_self.handleVal(_self.mnBox));
	    var newYear = parseInt(_self.handleVal(_self.yearBox), 10);
	    if (isNaN(NewMn) || isNaN(newYear)) {
	        alert(_self.ymErrTip);
	        return false;
	    }
	    if (dateContainer.hasClass('next_m')) {
	        NewMn++;
	    } else {
	        NewMn--;
	    }
	    if (NewMn < 1) {
	        NewMn = 12;
	        newYear--;
	    } else if (NewMn > 12) {
	        NewMn = 1;
	        newYear++;
	    }
	    _self.handleVal(_self.mnBox, _self.switchNum(NewMn));
	    _self.showNow(newYear, NewMn);
	};
	//点击切换年份
	ShowDate.prototype.changeYr = function(dateContainer) {
	    var _self = this;
	    var NewMn = _self.switchNum(_self.handleVal(_self.mnBox));
	    var newYear = parseInt(_self.handleVal(_self.yearBox), 10);
	    if (isNaN(NewMn) || isNaN(newYear)) {
	        alert(_self.ymErrTip);
	        return false;
	    }
	    if (dateContainer.hasClass('next_y')) {
	        newYear++;
	    } else {
	        newYear--;
	    }
	    if (newYear < 1900) {
	        newYear = 1900;
	    } else if (newYear > 2099) {
	        newYear = 2099;
	    }
	    _self.handleVal(_self.mnBox, _self.switchNum(NewMn));
	    _self.showNow(newYear, NewMn);
	};
	//文本框 清空初始值
	ShowDate.prototype.changeDefault = function(dateContainer) {
	    var _self = this;
	    var deVal = dateContainer.val();
	    var regExp = /^\s*$/g;
	    if (!_self.dateReg.test(deVal)) {
	        dateContainer.text("");
	        _self.showNow();
	    } else if (deVal.match(regExp) === null && _self.dateBox.hasClass('hide')) { //如果显示的是非空字符
	        var dayArr = deVal.match(/[0-9]{1,4}/g);
	        _self.showNow(dayArr[0], dayArr[1], dayArr[2]); //刷新日期
	    }
	};
	//文本框 还原初始值;
	ShowDate.prototype.changeDefault2 = function(dateContainer) {
	    var _self = this;
	    var deVal = dateContainer.text();
	    if (/^\s{0}$/.test(deVal)) {
	        dateContainer.text(_self.btnTxt);
	    }
	};
	//显示日历
	ShowDate.prototype.show = function() {
	    var _self = this;
	    _self.dateContainer.toggleClass('hide');
	    _self.dateBox.toggleClass('hide');
	};
	//隐藏日历
	ShowDate.prototype.hide = function(event, Target, dateContainer) {
	    var _self = this;
	    var oPare = Target;
	    var isChild = true;
	    if (oPare.parents('[data-node=data_box]').length === 0) {
	        isChild = false;
	    }
	    if (!isChild && !_self.dateBox.hasClass('hide')) {
	        _self.dateContainer.toggleClass('hide');
	        _self.dateBox.addClass('hide');
	        _self.changeDefault2(_self.dateText);
	    }
	};
	//填充年、月
	ShowDate.prototype.showNow = function(yr, mn, date) {
	    var _self = this;
	    var now = new Date(_self.endTime);
	    var year = yr || now.getFullYear();
	    var month = mn - 1 || now.getMonth();
	    var dd = date || now.getDate();
	    //填充 年 和 月
	    _self.handleVal(_self.yearBox, year);
	    _self.handleVal(_self.mnBox, (_self.switchNum(mn) || _self.switchNum(now.getMonth() + 1)));
	    //填充日期
	    _self.showAllDay(year, month, dd);
	};
	//获取每月多少天
	ShowDate.prototype.getDayLen = function(year, month) {
	    var d = new Date(year, month + 1);
	    d.setDate(0);
	    return d.getDate();
	};
	//填充当月的所有日期
	ShowDate.prototype.showAllDay = function(Yr, Mn, Dd) {
	    var _self = this;
	    var newDate = new Date(Yr, Mn, Dd);
	    var year = newDate.getFullYear();
	    var month = newDate.getMonth();
	    newDate.setDate(0);
	    var firstDay = newDate.getDay() + 1;
	    var monthPre, monthNext;
	    if (month === 0) {
	        monthPre = 11;
	        monthNext = 1;
	    } else if (month === 11) {
	        monthPre = 10;
	        monthNext = 0;
	    } else {
	        monthPre = month - 1;
	        monthNext = month + 1;
	    }
	    var dayLen = _self.getDayLen(year, month);
	    var dayLenPre = _self.getDayLen(year, monthPre);
	    var daylenNext = _self.getDayLen(year, monthNext);
	    //清空日期
	    _self.td.each(function(index) {
	        _self.td.eq(index).removeClass('active').find('span').text("");
	    });
	    //渲染日期排列
	    _self.td.removeClass('grayClr');
	    /*
	    针对2012-4，日历第一行皆置灰的处理 
	       if(firstDay >= 7){
	            firstDay -=7;
	        }
	    */
	    for (var i = 0, len = _self.td.length; i < len; i++) {
	        if (i < firstDay) {
	            _self.td.eq(i).addClass('grayClr').find('span').text(dayLenPre - firstDay + i + 1);
	        } else if (i >= firstDay && i < firstDay + dayLen) {
	            _self.td.eq(i).find('span').text(i - firstDay + 1);
	            if (i - firstDay + 1 == Dd && !_self.td.eq(i).hasClass("active")) {
	                _self.td.eq(i).addClass('active');
	            }
	        } else {
	            _self.td.eq(i).addClass('grayClr').find('span').text(i - firstDay - dayLen + 1);
	        }
	    }
	};
	//函数调用
	module.exports = {
	    initDate: function(option) {
	        var miniDate = new ShowDate(option);
	        miniDate.init();
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var verifyName = __webpack_require__(243);
	var limitLen = __webpack_require__(63);
	var editCls = __webpack_require__(244);
	var remCls = editCls.remCls;
	var addCls = editCls.addCls;

	var editBox = $('[data-node=editBox]').eq(0);
	var nickname = editBox.find('[data-node=nickname]');
	var nameErr = editBox.find('[data-node=nameErr]');
	var errBorder = editBox.find('[data-node=nameBorErr]');
	var comErr = editBox.find('[data-node=comErrTip]');

	var hideCls = 'hide';
	var borErrCls = 'nicknerror';
	var nameFoc = function() {
		remCls(errBorder, borErrCls);
		addCls(nameErr, hideCls);
		addCls(comErr, hideCls);
	};
	var nameKeyup = function() {
		var nameVal = nickname.val();
		var len = nameVal.length;
		if (len > 20) {
			nickname.val(limitLen(nameVal, 20));
		}
	};
	var initObj = {
		init: function() {
			nickname.on({
				blur: verifyName.checkNameRule,
				focus: nameFoc,
				keyup: nameKeyup
			});
		}
	};
	module.exports = initObj;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 243:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var check = __webpack_require__(48);
	var byteLen = __webpack_require__(46);
	var nickTips = __webpack_require__(35).nickName;


	var editCls = __webpack_require__(244);
	var remCls = editCls.remCls;
	var addCls = editCls.addCls;

	var editBox = $('[data-node=editBox]').eq(0);
	var nickname = editBox.find('[data-node=nickname]');
	var nameErr = editBox.find('[data-node=nameErr]');
	var errBorder = editBox.find('[data-node=nameBorErr]');

	var hideCls = 'hide';
	var borErrCls = 'nicknerror';
	var nameVal;

	var checkRule = function() {
	    var ret = true;
	    var nameVal = nickname.val();
	    var len = nameVal.length;
	    var lenFlag = !!(len >= 2 && len <= 20);
	    if (!nameVal) {
	        ret = false;
	        addCls(errBorder, borErrCls);
	        remCls(nameErr, hideCls).text(nickTips.eptName);
	    } else if (!check.checkNickName(nameVal) || !lenFlag) {
	        ret = false;
	        addCls(errBorder, borErrCls);
	        remCls(nameErr, hideCls).text(nickTips.commonTip);
	    } else {
	        ret = true;
	    }
	    return ret;
	};
	/*var nameExist = function() {
	    var nameVal = nickname.val();
	    var nameData = {
	        "nickname": nameVal
	    };
	    return fetch.get(url.get('checkName'), {
	        "data": nameData
	    }).done(function(data) {
	        if (data.success) {
	            remCls(errBorder, borErrCls);
	            addCls(nameErr, hideCls);
	        } else {
	            addCls(errBorder, borErrCls);
	            remCls(nameErr, hideCls).text(data.message);
	        }
	    }).fail(function() {
	        addCls(errBorder, borErrCls);
	        remCls(nameErr, hideCls).text(nickTips.errLine);
	    });
	};*/
	/*var checkName = function() {
	    var nameFlag = checkRule();
	    if (nameFlag) {
	        nameExist();
	    }
	};*/
	module.exports = {
	    /*"checkName": checkName,*/
	    "checkNameRule": checkRule
	   /* "checkExist": nameExist*/
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 244:
/***/ function(module, exports) {

	var remCls = function($node, cls) {
	    if ($node.hasClass(cls)) {
	        $node.removeClass(cls);
	    }
	    return $node;
	};
	var addCls = function($node, cls) {
	    if (!$node.hasClass(cls)) {
	        $node.addClass(cls);
	    }
	    return $node;
	};
	module.exports = {
	    remCls: remCls,
	    addCls: addCls
	};


/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var nameTips = __webpack_require__(35).nickName;
	var trim = __webpack_require__(47);

	var verifyName = __webpack_require__(243);

	var editBox = $('[data-node=editBox]').eq(0);
	var nickname = editBox.find('[data-node=nickname]');
	var sexBox = editBox.find('[data-node=sexBox]');
	var birthday = editBox.find('[data-node=showDate]');
	var subDate = editBox.find('[data-action=subDate]');
	var comTip = editBox.find('[data-node=comErrTip]');
	var nameBorErr = editBox.find('[data-node=nameBorErr]');
	var faceImg = editBox.find('[data-node=faceImg]');
	var birthTip = editBox.find('[data-node=birTip]');

	var header = $('[data-node=header]');
	var headImg = header.find('[data-node=headImg]');
	var headName = header.find('[data-node=headName]');

	var birthPre = birthday.attr('data-default');

	var dateReg = /^\d{4}-\d{1,2}-\d{1,2}$/;
	var hideCls = 'hide';
	var errBorCls = 'nicknerror';
	var sub = function() {
	    comTip.addClass(hideCls);
	    var nameVal = nickname.val();
	    var sexVal = sexBox.find('input:checked').val();
	    var birthVal = birthday.val();
	    birthVal = birthPre || (dateReg.test(birthVal) ? birthVal : '');
	    var faceImgUrl = faceImg.attr('src');
	    var nameFlag = verifyName.checkNameRule();
	    var errFlag = !nameBorErr.hasClass(errBorCls);
	    if (nameFlag && errFlag) {
	        // verifyName.checkExist().then(function(data) {
	        // if (data.success) {
	        var subData = {
	            "facePicUrl": faceImgUrl,
	            "birthday": birthVal,
	            "nickname": nameVal,
	            "gender": sexVal
	        };
	        fetch.post(url.get('subName'), {
	            data: subData
	        }).done(function(data) {
	            if (data.success) {
	                comTip.removeClass(hideCls).text(nameTips.sucSub);
	                headImg.attr('src', faceImgUrl);
	                headName.text(nameVal);
	                var birFlag = dateReg.test(birthVal);
	                if (birFlag && !birthPre) {
	                    birthday.attr('data-default', birthVal);
	                    birthTip.addClass(hideCls);
	                }
	            } else {
	                comTip.removeClass(hideCls).text(data.message);
	            }
	        }).fail(function() {
	            comTip.removeClass(hideCls).text(nameTips.errLine);
	        });
	    }
	    // });
	    // }
	};
	var subEvent = function() {
	    subDate.on('click', sub);
	};
	module.exports = {
	    subInit: subEvent
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});