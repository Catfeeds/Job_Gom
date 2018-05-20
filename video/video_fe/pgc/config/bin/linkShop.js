(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["goods"] = factory(require("jQuery"));
	else
		root["goods"] = factory(root["jQuery"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*TMODJS:{}*/
!function () {
	function a(a, b) {
		return (/string|function/.test(typeof b) ? h : g)(a, b)
	}

	function b(a, c) {
		return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
	}

	function c(a) {
		return l[a]
	}

	function d(a) {
		return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
	}

	function e(a, b) {
		if (m(a))for (var c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
	}

	function f(a, b) {
		var c = /(\/)[^\/]+\1\.\.\1/, d = ("./" + a).replace(/[^\/]+$/, ""), e = d + b;
		for (e = e.replace(/\/\.\//g, "/"); e.match(c);)e = e.replace(c, "/");
		return e
	}

	function g(b, c) {
		var d = a.get(b) || i({filename: b, name: "Render Error", message: "Template not found"});
		return c ? d(c) : d
	}

	function h(a, b) {
		if ("string" == typeof b) {
			var c = b;
			b = function () {
				return new k(c)
			}
		}
		var d = j[a] = function (c) {
			try {
				return new b(c, a) + ""
			} catch (d) {
				return i(d)()
			}
		};
		return d.prototype = b.prototype = n, d.toString = function () {
			return b + ""
		}, d
	}

	function i(a) {
		var b = "{Template Error}", c = a.stack || "";
		if (c)c = c.split("\n").slice(0, 2).join("\n"); else for (var d in a)c += "<" + d + ">\n" + a[d] + "\n\n";
		return function () {
			return "object" == typeof console && console.error(b + "\n\n" + c), b
		}
	}

	var j = a.cache = {}, k = this.String, l = {
		"<": "&#60;",
		">": "&#62;",
		'"': "&#34;",
		"'": "&#39;",
		"&": "&#38;"
	}, m = Array.isArray || function (a) {
			return "[object Array]" === {}.toString.call(a)
		}, n = a.utils = {
		$helpers: {}, $include: function (a, b, c) {
			return a = f(c, a), g(a, b)
		}, $string: b, $escape: d, $each: e
	}, o = a.helpers = n.$helpers;
	a.get = function (a) {
		return j[a.replace(/^\.\//, "")]
	}, a.helper = function (a, b) {
		o[a] = b
	}, module.exports = a
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(34),
    toInteger = __webpack_require__(38);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it's used as the
 * offset from the end of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.indexOf([1, 2, 1, 2], 2);
 * // => 1
 *
 * // Search from the `fromIndex`.
 * _.indexOf([1, 2, 1, 2], 2, 2);
 * // => 3
 */
function indexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseIndexOf(array, value, index);
}

module.exports = indexOf;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var Dialog = __webpack_require__(13);



var create = function(options) {
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
        ok: function() {

        },
        onshow: function() {
            $('[i="title"]').hide();
        }
    };
    $.extend(true, defaults, options);
    return Dialog(defaults);
};


module.exports = {
    create: create
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var Dialog = __webpack_require__(13);
var noop = function() {};

var create = function(content, options) {
    content = content || '';
    options = options || {};
    var defaults = {
        fixed: true,
        modal: true,
        autofocus: false,
        content: '<p class="del-pop-p">' + content + '</p>',
        className: 'pop-box',
        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
        ok: noop
    };
    $.extend(true, defaults, options);
    var d = Dialog(defaults);

    var header = d._$('header');
    var title = d._$('title');
    if(!options.title){
        title.css('borderBottom', 'none');
    }
    header.show();
    d.show();
    return d;
};

module.exports = create;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

//判断对象非空
function isEmptyObject(obj) {
     for (var key in obj) {
        return false;
     }
     return true;
}

//封装数据，以兼容
function reWrap(result){
    var resultItems= result.items;  
    //空为好货推荐           
    var itemZero =  resultItems[0];
    var flag = isEmptyObject(itemZero && itemZero.item); 

    for(var i=0;i<resultItems.length;i++){
        var arr = resultItems[i];
        // skuId、pId、sUrl、name、salePrice
        //我的美店 商品
        if(!flag){
            //1skuId 有了
            //3sUrl 无
            var item = arr.item;
            arr.pId = item.id;
            arr.name = item.name;
            arr.salePrice = item.salePrice;
            arr.skuPrice = item.salePrice;
            arr.mainImage = item.mainImage;

        }else{
            arr.pId = arr.id;
            arr.skuId = arr.skuID;
            //2pId 无
            //3sUrl 无
            //4 name 有
            arr.salePrice = arr.price;  
            arr.skuPrice = arr.price;
            arr.mainImage = arr.imageUrl;                         
        }    
    }
    return result;
}

module.exports = {
	isEmptyObject:isEmptyObject,
	reWrap:reWrap
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/**
 * [使用方法]
 * http://api.jquery.com/jQuery.Callbacks/
 */
var topics = {};

//检测是否含有UE实例对象，有则添加到实例对象上
var checkInstance = function(){
    var ue;

    if(window.UE && !UE.utils.isEmptyObject(UE['instants'])){
        var instants = UE['instants'];
        for(var i in instants){
            if(instants.hasOwnProperty(i)){
                ue = instants[i];
                if(!ue.pubsub){
                    ue.pubsub = {};
                }
               
            }
        }

    }
    return ue;
}

var listener = function(topics,channel){
    var callbacks,
        topic = channel && topics[channel];

    if (!topic) {
        callbacks = jQuery.Callbacks();
        topic = {
            pub: callbacks.fire,
            sub: callbacks.add,
            unsub: callbacks.remove
        };
        if (channel) {
            topics[channel] = topic;
        }
    }
    
    return topic;

}


var Pubsub = function(channel) {

    var ue = checkInstance();

    if(ue){
        return listener(ue.pubsub,channel);
    }

    return listener(topics,channel);

    
};



module.exports = Pubsub;

/******原代码
var Pubsub = function(channel) {

   var callbacks,
        topic = channel && topics[channel];

    if (!topic) {
        callbacks = jQuery.Callbacks();
        topic = {
            pub: callbacks.fire,
            sub: callbacks.add,
            unsub: callbacks.remove
        };
        if (channel) {
            topics[channel] = topic;
        }
    }
    
    return topic;

    
};

********/
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var template=__webpack_require__(1);
module.exports=template('src/goods/tpl/goods/defaultItemContent',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,itemlist=$data.itemlist,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,indexof=$data.indexof,changedList=$data.changedList,$out='';$each(itemlist,function($value,$index){
$out+=' <dl class="merchant-item clearfix ';
$out+=$escape((indexof(changedList,$value.skuId) !== -1 ? 'chosed-mer-true':''));
$out+='" data-action="item" data-pId="';
$out+=$escape($value.pId);
$out+='" data-shopId="';
$out+=$escape($value.shopId);
$out+='" data-link="';
$out+=$escape($value.sUrl);
$out+='" data-skuId="';
$out+=$escape($value.skuId);
$out+='" > <dt><img src=';
$out+=$escape($value.mainImage);
$out+=' alt="" onerror="imgError(this,\'m\')"></dt> <dd> <h4 node-data="itemTitle">';
$out+=$escape($value.name);
$out+='</h4> <span class="itemPrice"><em>￥</em><span node-data="itemPrice">';
$out+=$escape($value.skuPrice);
$out+='</span></span> <!-- ';
if($value.rebate > 0){
$out+=' <div class="fan fan-s"> <em class="icon-fan-s"></em> <span>最高返';
$out+=$escape($value.rebate);
$out+='国美币</span> </div> ';
}
$out+=' --> </dd> </dl> ';
});
$out+=' ';
return new String($out);
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
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
        __webpack_require__(51);
    }
}


//var header = $EDITOR.GlobalVal.headerSet;

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

    /*if(header){
        defaults.headers = header;
    }*/
    

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var template=__webpack_require__(1);
module.exports=template('src/goods/tpl/searchBar/searchBar',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title=$data.title,$out='';$out+='<li class="search-box" data-node="addTopBox"> <input type="text" placeholder="';
$out+=$escape(title);
$out+='" data-action="addSearchInput"> <em class="icon-search-sw" data-action="addSearchBtn"></em> <dl class=\'history\' data-node=\'history\'> </dl> </li>';
return new String($out);
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var template=__webpack_require__(1);
module.exports=template('src/goods/tpl/collrect/collrect',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,showCollrect=$data.showCollrect,$escape=$utils.$escape,imgSrc=$data.imgSrc,getMoreItem=$data.getMoreItem,$out='';if(showCollrect ){
$out+=' <div class="ui-dialog-title" data-node="title">我收藏的商品</div> <p class="no-saving-txt" style="display:none;" data-node="searchNormal">暂无收藏的商品，可以搜索查找！</p> <div class="loading" data-node="searchLoading"><img src="';
$out+=$escape(imgSrc);
$out+='/images/public/loading.gif" alt=""></div> ';
}else if(getMoreItem){
$out+=' <p class="no-saving-txt" style="display:none;" data-node="searchNormal">暂无收藏的商品，可以搜索查找！</p> <div class="loading" data-node="searchLoading" style="display:none;"><img src="';
$out+=$escape(imgSrc);
$out+='/images/public/loading.gif" alt=""></div> <div style="height:40px;text-align:center" data-node="search-item-tips">请搜索商品</div> ';
}
return new String($out);
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var template=__webpack_require__(1);
module.exports=template('src/goods/tpl/box/searchBox',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,returnList=$data.returnList,imgSrc=$data.imgSrc,$out='';$out+='<p class="failed-txt" style="display:none;" data-node="searchFail">数据获取失败，点击重新加载！</p> <p class="no-saving-txt" style="display:none;" data-node="searchNormal">请搜索商品</p> <div style="display:';
$out+=$escape((returnList.length === 0 ? 'none':''));
$out+=';" data-node="searchResultBox"> <div class="merchant-list clearfix" > <div class="clearfix" data-node="searchResultList"></div> <div class="more-comments pop-more-com" data-action="moreItem" style="display:none;"> <span><img src="';
$out+=$escape(imgSrc);
$out+='/images/public/loading.gif">正在加载...</span> </div> </div> </div>';
return new String($out);
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/*
    create by linfei
    2017/12/10
*/

var dialog = __webpack_require__(3);
// var tpl = require('../tpl/content.tpl');
var itemlist = __webpack_require__(52);
var defaultItemlist = __webpack_require__(7);
// var addTpl = require('../tpl/addToMeidian.tpl');
var indexof = __webpack_require__(2);
var alert = __webpack_require__(4);

var env= __webpack_require__(53);

var commFunc = __webpack_require__(5);
var isEmptyObject = commFunc.isEmptyObject;
var reWrap = commFunc.reWrap;

var selectedGoods = null;
var changedList = null;
var maxlength = null;
var $listBox = null,
    $changeList = null,
    $changeNum = null,
    $tabBodyGoods = null,
    $tabRec = null,
    addDialog = null;


//var usePageNum = localPath.trId;    //推荐商品   门店账户 需要分页
var loadString;
var noMoreContent = '没有可加载内容';

function Card(args){
    this.args = args;
    this.imgpath = null;
    this.$obj = null;
    //搜索条容器
    this.$searchBarContainer = null;
    //tab标签容器
    this.$tabTitleContainer = null;
    //tab内容容器
    this.$tabContentContainer = null;

    this.pageNum = 1;

    this.keyWord = '';
    
    this.$searchNormal = null;
    this.$searchLoading = null;
    this.$searchFail = null;
    this.$searchResult = null;
    this.$searchList = null;
    this.$getMore = null;
    this.isCollrect = true;
    this.isGetMore = false;
    this.nodeName=null;
    this.link=null;
    //this.useShopId = args.trId ? 1:0; //推荐商品   门店账户 需要分页
    this.loadString = loadString;
    this.noMoreContent = noMoreContent;
    this.localStorage=null;

}

Card.prototype={
    constructor:Card,
    initGlobal:function(){
        selectedGoods = this.args.selectedGoods || '';
        changedList = this.args.changedList || [];
        loadString = '<img src="' + this.args.imgpath + '/images/public/loading.gif">正在加载...';
        $listBox = this.args.$listBox;
        $changeList = this.args.$changeList;
        $changeNum = this.args.$changeNum;
        $tabBodyGoods = this.args.$tabBodyGoods;
        $tabRec = this.args.$tabRec;
        maxlength = this.args.maxlength;
        addDialog = this.args.addDialog;
    },

    getGlobalNode:function(){
        //----------------------搜索条容器-------------------------//
        this.$searchBarContainer = $('[data-node="search-bar-container"]');
        //----------------------tab标签容器-------------------------//
        this.$tabTitleContainer = $('[data-node="tab-title-container"]');
        //----------------------tab内容容器-------------------------//
        this.$tabContentContainer = $('[data-node="tab-content-container"]');

        this.$listBox= $('[data-node="changedBox"]'); 
        this.$changeList= this.$listBox.find('[data-node="searchChangeList"]');
        this.$numPics = $('[data-node="numPics"]');
        this.$changeNum = $('[data-node="searchChangeNum"]');
        
    },


    renderTabTitle:function(title){
        var _btn;

        if(!title) {
            this.$tabBtn = {};
            return;
        }
        
        if(this.active){
            _btn = '<li class="active tab-btn">'+ title +'</li>';
        }else{
            _btn = '<li class="tab-btn">'+ title +'</li>';
        }
        
        this.$tabBtn = $(_btn);
        this.$tabTitleContainer.append(this.$tabBtn);   
    },


    //初始化进弹窗获取数据
    defaultItem:function(pagenum,link){
        var _this = this;
        pagenum = pagenum ? pagenum : 1;
        link = link?link : _this.link;
        _this.getItems(link,{
            data: {
                page: pagenum,
                pagesize: 10
            },
            done: function(result) {
                //result =  reWrap(result);
                if(!result.data.items.length){
                    _this.$searchNormal.show();
                }else{
                    _this.$searchNormal.hide();
                }
                var html = defaultItemlist({
                    itemlist: result.data.items,
                    changedList: changedList,
                    indexof: indexof
                });
                if (pagenum === 1) {
                    _this.$searchList.html(html);
                } else {
                    _this.$searchList.append(html);
                }
            }
        });
    },
    //ajax 
    getItems:function(link,options){
       throw Error("请在在子类中覆盖");
    },
    
    //获取更多商品
    moreItem:function(pageNum,keyword,options){
        
        var self = this;
        var data = {
            page: self.pageNum,
            pagesize: 10
        }

        keyword ? (data.word = keyword) : void 0;

        if(options){
            for(var i in options){
                if(options.hasOwnProperty(i)){
                    data[i] = options[i];
                }
            }
        }
        this.getItems(self.link, {
            data: data,
            done: function(result) {

                //result =  reWrap(result);
                result = result.data;
                var html = itemlist({
                    itemlist: result.items,
                    changedList: changedList,
                    indexof: indexof
                });
                if (result.pageCount != "1") {
                    self.$getMore.hide();
                }
                if (self.pageNum === 1) {
                    self.$searchList.html(html);
                } else {
                    self.$searchList.append(html);
                }
            }
        });
    },

    //重新获取
    reGet: function() {
        var _this = this;
        _this.$searchFail.on('click', function() {
            if (_this.pageNum === 1) {
                _this.$searchLoading.show();
                _this.$searchFail.hide();
                if (_this.isCollrect) {
                    _this.defaultItem(_this.pageNum);
                    _this.isCollrect = false;
                } else {
                    _this.moreItem(_this.pageNum);
                }
            }
        });
        _this.$getMore.on('click', '[node-action="reget"]', function() {
            $(this).parent().html(_this.loadString);
            if (_this.isCollrect) {
                _this.defaultItem(_this.pageNum);
                _this.isCollrect = false;
            } else {
                _this.moreItem(_this.pageNum);
            }
        });
    },

    //更新?
    bindGlobalEvent : function() {

        var _this = this;
        var self = this;
        if (_this.$changeList.children().length) {
            $('[i-id=ok]').removeClass('btn-default');
        }
        _this.$tabContent.on('click.editor', '[data-action="item"]', function() {
            var $this = $(this);

            var imgSrc = $this.find('img').attr('src'),
                pId = $this.attr('data-pId'),
                shopId = $this.attr('data-shopid'),
                itemLink = $this.attr('data-link'),
                skuId = $this.attr('data-skuId'),
                html = '',
                shopTag = $this.attr('data-rec-shoptag'),   //推荐商品标识
                identification = $this.attr('data-identification');

            var $pidNode = _this.$tabContentContainer.find("[data-pid="+pId + "]");

            if (maxlength == 1) { 
                if (_this.$changeList.children().length) {
                    _this.$changeList.empty();
                    _this.$searchList.children("dl").removeClass("chosed-mer-true");

                }
                $this.addClass("chosed-mer-true");
                if (_this.$changeList.children().length === 0) {
                    _this.$listBox.show();
                }
                changedList = [];
                changedList.push(skuId);
                selectedGoods = {};
                selectedGoods[skuId] = {
                    shopId: shopId,
                    skuId: skuId,
                    PId: pId,
                    title: $(this).find('[node-data="itemTitle"]').text(),
                    img: imgSrc,
                    price: $(this).find('[node-data="itemPrice"]').text(),
                    // link: $_CONFIG.mall_domain + 'product/' + $(this).attr('data-shopId') + '-' + pId + '.html'\
                    // 融合后的新商品链接
                    link: itemLink
                    //rebate: $(this).attr('data-rebate')
                };
                html = '<li data-skuId="' + skuId + '" data-pId="' + pId + '"><img src="' + imgSrc + '" alt=""><a href="javascript:;" data-action="delChanged"><em class="icon-del-pic"></em></a></li>';

                _this.$changeList.append(html);

                _this.$changeNum.text(_this.maxlength - _this.$changeList.children().length);
            } else {
                
                if (!$(this).hasClass('chosed-mer-true')) {
                    if (_this.$changeList.children().length >= maxlength) {
                        alert('最多可选取' + maxlength + '个商品');
                        return false;
                    }

                    changedList.push(skuId);
                    selectedGoods[skuId] = {
                        shopId: shopId,
                        skuId: skuId,
                        PId: pId,
                        title: $(this).find('[node-data="itemTitle"]').text(),
                        img: imgSrc,
                        price: $(this).find('[node-data="itemPrice"]').text(),
                        // link: $_CONFIG.mall_domain + 'product/' + $(this).attr('data-shopId') + '-' + pId + '.html'\
                        // 融合后的新商品链接
                        link: $(this).attr('data-link'),
                        shopTag:shopTag,
                        identification:identification
                        //rebate: $(this).attr('data-rebate')
                    };
                    // $(this).addClass('chosed-mer-true');
                    $pidNode.addClass('chosed-mer-true');
                    html = '<li data-skuId="' + skuId + '" data-pId="' + pId +  '"><img src="' + imgSrc + '" alt=""><a href="javascript:;" data-action="delChanged"><em class="icon-del-pic"></em></a></li>';

                    if (_this.$changeList.children().length === 0) {
                        _this.$listBox.show();
                    }

                    _this.$changeList.append(html);
                    _this.$changeNum.text(maxlength - _this.$changeList.children().length);
                } else {
                    var del = _this.$changeList.find('[data-skuId="' + skuId + '"]');
                    // $(this).removeClass('chosed-mer-true');
                    $pidNode.removeClass('chosed-mer-true');
                    del.remove();

                    var id = $(this).attr('data-skuId');
                    var index = changedList.indexOf(id);
                    if (index !== -1) {
                        changedList.splice(index, 1)
                    }
                    delete selectedGoods[id];
                    if (_this.$changeList.children().length === 0) {
                        _this.$listBox.hide();
                    }
                    _this.$changeNum.text(maxlength - _this.$changeList.children().length);
                }

            }

            if (_this.$changeList.children().length) {
                $('[i-id=ok]').removeClass('btn-default');
            } else {
                $('[i-id=ok]').addClass('btn-default');
            }

            addDialog.reset();
            _this.renderPicsNum();

        })

        _this.$listBox.on('click.editor', '[data-action="delChanged"]', function() {
            
            var id = $(this).closest('li').attr('data-skuId');
            var index = changedList.indexOf(id);
            if (index !== -1) {
                changedList.splice(index, 1)
            }
            //var _this = this;
            var $node = $('[data-skuId="' + $(this).parent().attr('data-skuId') + '"]');
            $node.removeClass('chosed-mer-true');

            //$searchList.find('[data-skuId="' + $(_this).parent().attr('data-skuId') + '"]').removeClass('chosed-mer-true');
            $(this).parents('li').remove();


            delete selectedGoods[id];
            if (_this.$changeList.children().length === 0) {
                _this.$listBox.hide();
                _this.renderPicsNum();
            }
            _this.$changeNum.text(maxlength - _this.$changeList.children().length);
            if (!_this.$changeList.children().length) {
                $('[i-id=ok]').addClass('btn-default');
            }
        });
        
        
    },
    //加载更多
    getMoreItem : function() {
        var _this = this;
        _this.$searchListBox.on('scroll.editor', function() {
            if (!_this.isGetMore && _this.$searchListBox.scrollTop() >= (_this.$searchList.height() - _this.$searchListBox.height())) {
                _this.isGetMore = true;
                _this.pageNum++;

                if (_this.isCollrect) {
                    _this.defaultItem(_this.pageNum);
                    _this.isCollrect = false;
                } else {
                    _this.moreItem(_this.pageNum);
                }
            }
        });
    },

    //获取localstorage
    getLocalStorage:function(name){
        var _storage = localStorage.getItem(name);

        return JSON.parse(_storage) || [];
    },
    //设置localstorage
    setLocalStorage:function(name,isUpdateArray){
        var self = this;
        var _storage = self.localStorage  || [];
        //没有第二个参数代表加入关键字，有第二个参数代表更新整个数组，主要是删除关键字后更新
        if(!isUpdateArray){
            var keyWord = self.$searchInput.val();
            if(!keyWord) return;
            //localstore没有此关键字
            if(_storage.indexOf(keyWord) == -1){
                if(_storage.length >= 10){
                    _storage.pop();   
                }
                _storage.unshift(keyWord);
                localStorage.setItem(name,JSON.stringify(_storage));
            }
        }else{
            localStorage.setItem(name,JSON.stringify(_storage));
        }    
    },
    //标签切换
    tab:function(){
        var self = this;
        //搜索栏
        self.$searchBar.show().siblings().hide();
        //标签
        self.$tabBtn.addClass('active').siblings().removeClass('active');
        //搜索内容

        self.$tabContent.addClass('show').siblings().removeClass('show');
    },
    //搜索商品
    searchGoods:function($input){    
        var self = this;  
        self.isCollrect = false;
        self.isGetMore = false;
        var keyWord = $.trim($input.val());

        if (keyWord !== '') {
            if (keyWord.length < 2) {
                alert('请输入两个字符以上关键词');
            } else {
                self.$getMore.find('span').html(self.loadString);
                self.pageNum = 1;
                self.$collrectTitle.hide();
                self.moreItem(self.pageNum, keyWord);
            }
        } else {
            alert('请输入关键词');
        }
    },
    //
    renderPicsNum:function(){
        if(this.args.changedList.length == 0){
            this.$numPics.hide();
        }else{
             this.$numPics.show();
        }
    }
}

module.exports = Card;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/*!
 * artDialog
 * Date: 2014-11-09
 * https://github.com/aui/artDialog
 * (c) 2009-2014 TangBin, http://www.planeArt.cn
 *
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
 */
var Popup = __webpack_require__(18);
var defaults = __webpack_require__(19);
// var css = defaults.cssUri;

/*
// css loader: RequireJS & SeaJS
if (css) {
    var fn = require[require.toUrl ? 'toUrl' : 'resolve'];
    if (fn) {
        css = fn(css);
        css = '<link rel="stylesheet" href="' + css + '" />';
        if ($('base')[0]) {
            $('base').before(css);
        } else {
            $('head').append(css);
        }
    }
}*/

var _count = 0;
var _expando = new Date() - 0; // Date.now()
var _isIE6 = !('minWidth' in $('html')[0].style);
var _isMobile = 'createTouch' in document && !('onmousemove' in document) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
var _isFixed = !_isIE6 && !_isMobile;

function artDialog(options, ok, cancel) {

    var originalOptions = options = options || {};

    if (typeof options === 'string' || options.nodeType === 1) {

        options = {
            content: options,
            fixed: !_isMobile
        };
    }

    options = $.extend(true, {}, artDialog.defaults, options);
    options.original = originalOptions;

    var id = options.id = options.id || _expando + _count;
    var api = artDialog.get(id);

    // 如果存在同名的对话框对象，则直接返回
    if (api) {
        return api.focus();
    }

    // 目前主流移动设备对fixed支持不好，禁用此特性
    if (!_isFixed) {
        options.fixed = false;
    }

    // 快捷关闭支持：点击对话框外快速关闭对话框
    if (options.quickClose) {
        options.modal = true;
        options.backdropOpacity = 0;
    }

    // 按钮组
    if (!$.isArray(options.button)) {
        options.button = [];
    }

    // 确定按钮
    if (ok !== undefined) {
        options.ok = ok;
    }

    if (options.ok) {
        options.button.push({
            id: 'ok',
            value: options.okValue,
            callback: options.ok,
            cls: options.okCls,
            autofocus: true
        });
    }

    // 取消按钮
    if (cancel !== undefined) {
        options.cancel = cancel;
    }

    if (options.cancel) {
        options.button.push({
            id: 'cancel',
            value: options.cancelValue,
            callback: options.cancel,
            cls: options.cancelCls,
            display: options.cancelDisplay
        });
    }

    return artDialog.list[id] = new artDialog.create(options);
};

var popup = function() {};
popup.prototype = Popup.prototype;
var prototype = artDialog.prototype = new popup();

artDialog.create = function(options) {
    var that = this;

    $.extend(this, new Popup());

    // var originalOptions = options.original;
    var $popup = $(this.node).html(options.innerHTML);
    var $backdrop = $(this.backdrop);

    this.options = options;
    this._popup = $popup;

    $.each(options, function(name, value) {
        if (typeof that[name] === 'function') {
            that[name](value);
        } else {
            that[name] = value;
        }
    });

    // 更新 zIndex 全局配置
    if (options.zIndex) {
        Popup.zIndex = options.zIndex;
    }

    // 设置 ARIA 信息
    $popup.attr({
        'aria-labelledby': this._$('title')
            .attr('id', 'title:' + this.id).attr('id'),
        'aria-describedby': this._$('content')
            .attr('id', 'content:' + this.id).attr('id')
    });

    // 关闭按钮
    this._$('close')
        .css('display', this.cancel === false ? 'none' : '')
        .attr('title', this.cancelValue)
        .on('click', function(event) {
            that._trigger('cancel');
            event.preventDefault();
        });

    // 添加视觉参数
    this._$('dialog').addClass(this.skin);
    this._$('body').css('padding', this.padding);

    // 点击任意空白处关闭对话框
    if (options.quickClose) {
        $backdrop
            .on(
                'onmousedown' in document ? 'mousedown' : 'click',
                function() {
                    that._trigger('cancel');
                    return false; // 阻止抢夺焦点
                });
    }

    // 遮罩设置
    this.addEventListener('show', function() {
        $backdrop.css({
            opacity: 0,
            background: options.backdropBackground
        }).animate({
            opacity: options.backdropOpacity
        }, 150);
    });

    // ESC 快捷键关闭对话框
    this._esc = function(event) {
        var target = event.target;
        var nodeName = target.nodeName;
        var rinput = /^input|textarea$/i;
        var isTop = Popup.current === that;
        var keyCode = event.keyCode;

        // 避免输入状态中 ESC 误操作关闭
        if (!isTop || rinput.test(nodeName) && target.type !== 'button') {
            return;
        }

        if (keyCode === 27) {
            that._trigger('cancel');
        }
    };

    $(document).on('keydown', this._esc);
    this.addEventListener('remove', function() {
        $(document).off('keydown', this._esc);
        delete artDialog.list[this.id];
    });

    _count++;

    artDialog.oncreate(this);

    return this;
};

artDialog.create.prototype = prototype;

$.extend(prototype, {

    /**
     * 显示对话框
     * @name artDialog.prototype.show
     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
     */

    /**
     * 显示对话框（模态）
     * @name artDialog.prototype.showModal
     * @param   {HTMLElement Object, Event Object}  指定位置（可选）
     */

    /**
     * 关闭对话框
     * @name artDialog.prototype.close
     * @param   {String, Number}    返回值，可被 onclose 事件收取（可选）
     */

    /**
     * 销毁对话框
     * @name artDialog.prototype.remove
     */

    /**
     * 重置对话框位置
     * @name artDialog.prototype.reset
     */

    /**
     * 让对话框聚焦（同时置顶）
     * @name artDialog.prototype.focus
     */

    /**
     * 让对话框失焦（同时置顶）
     * @name artDialog.prototype.blur
     */

    /**
     * 添加事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     * @name artDialog.prototype.addEventListener
     */

    /**
     * 删除事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     * @name artDialog.prototype.removeEventListener
     */

    /**
     * 对话框显示事件，在 show()、showModal() 执行
     * @name artDialog.prototype.onshow
     * @event
     */

    /**
     * 关闭事件，在 close() 执行
     * @name artDialog.prototype.onclose
     * @event
     */

    /**
     * 销毁前事件，在 remove() 前执行
     * @name artDialog.prototype.onbeforeremove
     * @event
     */

    /**
     * 销毁事件，在 remove() 执行
     * @name artDialog.prototype.onremove
     * @event
     */

    /**
     * 重置事件，在 reset() 执行
     * @name artDialog.prototype.onreset
     * @event
     */

    /**
     * 焦点事件，在 foucs() 执行
     * @name artDialog.prototype.onfocus
     * @event
     */

    /**
     * 失焦事件，在 blur() 执行
     * @name artDialog.prototype.onblur
     * @event
     */

    /**
     * 设置内容
     * @param    {String, HTMLElement}   内容
     */
    content: function(html) {

        var $content = this._$('content');

        // HTMLElement
        if (typeof html === 'object') {
            html = $(html);
            $content.empty('').append(html.show());
            this.addEventListener('beforeremove', function() {
                $('body').append(html.hide());
            });
            // String
        } else {
            $content.html(html);
        }

        return this.reset();
    },

    /**
     * 设置标题
     * @param    {String}   标题内容
     */
    title: function(text) {
        this._$('title').html(text);
        this._$('header')[text ? 'show' : 'hide']();
        return this;
    },

    /** 设置宽度 */
    width: function(value) {
        this._$('content').css('width', value);
        return this.reset();
    },

    /** 设置高度 */
    height: function(value) {
        this._$('content').css('height', value);
        return this.reset();
    },

    /**
     * 设置按钮组
     * @param   {Array, String}
     * Options: value, callback, autofocus, disabled
     */
    button: function(args) {
        args = args || [];
        var that = this;
        var html = '';
        var number = 0;
        this.callbacks = {};

        if (typeof args === 'string') {
            html = args;
            number++;
        } else {
            $.each(args, function(i, val) {

                var id = val.id = val.id || val.value;
                var style = '';
                var btnCls = val.cls || '';
                that.callbacks[id] = val.callback;

                if (val.display === false) {
                    style = ' style="display:none"';
                } else {
                    number++;
                }

                html +=
                    '<a' + ' href="javascript:;"' + ' i-id="' + id + '"' + style + (val.disabled ? ' disabled' : '')
                    // + (val.autofocus ? ' autofocus class="ui-dialog-autofocus"' : '')
                    + ' class="' + btnCls + '"' + '>' + val.value + '</a>';

                that._$('button').addClass(that.options.btnWrapCls)
                    .on('click', '[i-id=' + id + ']', function(event) {
                        var $this = $(this);
                        if (!$this.attr('disabled')) { // IE BUG
                            that._trigger(id);
                        }

                        event.preventDefault();
                    });

            });
        }

        this._$('button').html(html);
        this._$('footer')[number ? 'show' : 'hide']();

        return this;
    },

    statusbar: function(html) {
        this._$('statusbar')
            .html(html)[html ? 'show' : 'hide']();

        return this;
    },

    _$: function(i) {
        return this._popup.find('[i=' + i + ']');
    },

    // 触发按钮回调函数
    _trigger: function(id) {
        var fn = this.callbacks[id];

        return typeof fn !== 'function' || fn.call(this) !== false ?
            this.close().remove() : this;
    }

});

artDialog.oncreate = $.noop;

/** 获取最顶层的对话框API */
artDialog.getCurrent = function() {
    return Popup.current;
};

/**
 * 根据 ID 获取某对话框 API
 * @param    {String}    对话框 ID
 * @return   {Object}    对话框 API (实例)
 */
artDialog.get = function(id) {
    return id === undefined ? artDialog.list : artDialog.list[id];
};

artDialog.list = {};

/**
 * 默认配置
 */
artDialog.defaults = defaults;

module.exports = artDialog;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(44);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * $GLOBAL_CONFIG
 * @author Zhengchun Fu
 */
var indexOf = __webpack_require__(2);
var c = window.$GLOBAL_CONFIG || {};

var defaults = {
	main_domain: c.main_domain,
	passport_domain: c.passport_domain,
	order_domain: c.order_domain,
	group_domain: c.group_domain,
	i_domain: c.i_domain,
	mall_domain: c.mall_domain,
	js_domain: c.js_domain,
	jspath: c.pcjspath,
	csspath: c.pccsspath,
	imgpath: c.pcimgpath,
	wap_url: c.wap_url
};

var exclude = ['pcjspath', 'pccsspath', 'pcimgpath'];

for(var key in c){
	if(!defaults.hasOwnProperty[key] && indexOf(exclude, key) === -1){
		defaults[key] = c[key];
	}
}

module.exports = defaults;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var template=__webpack_require__(1);
module.exports=template('src/goods/tpl/searchBar/searchList',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(list,function($value,$index){
$out+=' <dd class="history-list clearfix" data-node=\'history-list\'> <p class="clearfix"> <span>';
$out+=$escape($value);
$out+='</span><b>x</b> </p> </dd> ';
});
return new String($out);
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/*
    create by linfei
    2017/12/10
*/

var dialog = __webpack_require__(3);
var url = __webpack_require__(20);
var Comm_Pubsub = __webpack_require__(6);
window.Comm_Pubsub = Comm_Pubsub;
// var tpl = require('../tpl/content.tpl');
var commTpl = __webpack_require__(32); //公共模板
//var tpl = require('../tpl/tpl.config')('meidianSearch');


//var itemlist = require('../tpl/itemContent.tpl');   //

//var defaultItemlist = require('../tpl/defaultItemContent.tpl');
//var addTpl = require('../tpl/addToMeidian.tpl');
var pubName = __webpack_require__(33);
var indexof = __webpack_require__(2);
var alert = __webpack_require__(4);

var commFunc = __webpack_require__(5);
var isEmptyObject = commFunc.isEmptyObject;
var reWrap = commFunc.reWrap;

var localPath = {};

//构造函数
//var CollTab = require('./CollTab');
//var RecTab = require('./RecTab');
//普通商品
var Normal = __webpack_require__(50);
var Myshop = __webpack_require__(54);
var Shops = __webpack_require__(55);
var Recomment = __webpack_require__(57);
//公共
var maxlength = 9;
var changedList = [];
var _options = {};
var addDialog;
var selectedGoods = {};

var $title = null,  //标题
    $searchBtn = null;  //搜索按钮
    $searchTop = null;  //搜索容器
    $tabTitleGoods = null,  //tab内容 切换容器
    $tabBodyGoods = null,   //tab内容 切换容器
    $listBox = null,    //搜索出来的商品容器
    $changeList = null, //搜索出来的商品列表
    $changeNum = null,  //可增加数量
    
    $tabRec = null, //  
    $addMeidian = null; //


//是否展示美店的节点
var $showShopBtn = $('[data-node="show-meidian"]').find('span');


function getGlobalNode(){
    //标题
    $title = $('[data-node="title"]');
    //搜索条
    $searchTop =  $('[data-node="addTopBox"]');
    $searchInput = $searchTop.find('[data-action="addSearchInput"]');
    $searchBtn = $searchTop.find('[data-action="addSearchBtn"]');

    //tab
    $tabTitleGoods = $('[data-node="tab-title-goods"]');
    $tabContentGoods = $('[data-node="tab-content-goods"]');

    //展示列表容器
    $listBox = $('[data-node="changedBox"]');
    //展示列表
    $changeList = $listBox.find('[data-node="searchChangeList"]');
    //可添加商品数
    $changeNum = $('[data-node="searchChangeNum"]');


   // $tabBodyGoods = $('[data-node="tab-body-goods"]');

    //$tabRec = $('[data-node="tab-rec"]');
    //$addMeidian = $("[data-node='add-to-meidian']");


}


var init = function(changedGoods, max,options  ) {
    options = options || {};
    var returnList = [];
    var imgpath;
    selectedGoods = {};

    var _Geditor = window._Geditor;
    var env;
    if(_Geditor){
        env  = window._Geditor.env;
    }else if(!$.isEmptyObject(options)){
        env = options.env;
    }
    window._Geditor = {};
    window._Geditor.env = env;

    if(env == 'dev'){
        options.imgpath = "http://js.dev.meixincdn.com:1314/CDN8053/dist"
    }

    $('body').addClass('opg-editor');
    for (var i in changedGoods) {
        changedList.push(i);
        returnList.push(changedGoods[i]);
    }
    
    maxlength = max || 9;
    selectedGoods = $.extend(true, selectedGoods, changedGoods);

    if (maxlength - returnList.length !== 0) {
        _options = {
            title: ' ',
            modal: true,
            fixed: true,
            width: 712,
            content: commTpl({
                imgSrc: options.imgpath,
                returnList: returnList,
                maxlength: maxlength,
                changeNum: maxlength - returnList.length,
                useMeidian:true,
                // myShop:options.myShop
                myShop:options.myShop || url.get('myShop')
            }),
            className: 'pop-box pop-comm',
            okValue: '插入商品',
            okCls: 'pc-btn pc-btnh35 circle-pop-btn btn-default',
            btnWrapCls: 'insert-cancel',
            ok: function() {
                if ($(this.node).find('[i-id=ok]').hasClass('btn-default')) {
                    return false;
                }

                if(options.pubsubName){

                    // window.Pubsub(options.pubName).pub(selectedGoods);
                    Comm_Pubsub(options.pubsubName).pub(selectedGoods);
                }else{
                    Comm_Pubsub(pubName.setPubliser.changedItem).pub(selectedGoods);
                }
                

                var $span = $("[data-node='add-to-meidian']").find('span');
                if($span.hasClass('add-checkbox-checked')){
                    // $EDITOR.GlobalVal.addToMeidian = 1;
                }else{
                    // $EDITOR.GlobalVal.addToMeidian = 0;
                }

                dialogClosed();
            },
            cancel: function() {
                dialogClosed();
            },
            onshow: function() {

                $('[i="title"]').hide();
                $(this.node).addClass("no-border-line meidian-pop");
                
                //var $popBox = $('.meidian-pop');
               // var _html = addTpl();
                //$popBox.find('.insert-cancel').append(_html);
                getGlobalNode();
                //$addMeidian.hide();
                var args = {
                    //----------------------------
                    changedList:changedList,
                    returnList: returnList,
                    selectedGoods:selectedGoods,
                    maxlength:maxlength,
                    //ajax-----------------------
                    //搜藏商品: 为空 不加载
                    showCollrect:options.getCollectItem =="" ? 0 :(options.getCollectItem || url.get('getCollectItem')),
                    //搜索商品
                    getMoreItem:options.getMoreItem || url.get('getMoreItem'),
                    //我的美店
                    myShop:options.myShop || url.get('myShop'),
                    //推荐商品
                    recomment:options.recomment || url.get('recomment'),
                    //美店商品
                    getShop:options.getShop || url.get('getShop'),
                    //具体美店商品
                    getShopItem:options.getShopItem || url.get('getShopItem'),


                    //对话框------------
                    addDialog:addDialog,


                    
                    /*$tabTitleGoods:$tabTitleGoods,
                    $tabContentGoods:$tabContentGoods,
                    $listBox :$listBox,
                    $changeList:$changeList,
                    $changeNum:$changeNum, 
                    $tabTitleGoods:$tabTitleGoods,
                    $tabBodyGoods:$tabBodyGoods,
                    $tabRec:$tabRec,
                    $addMeidian:$addMeidian,
                    maxlength:maxlength,*/
                    
                    
                    imgpath:options.imgpath
                    
                };
                //var obj_coll  = new CollTab($('[data-node="tab-coll"]'),args);
                //var obj_rec  = new RecTab($('[data-node="tab-rec"]'),args);

                /*if(localPath.myShop){
                    new CollTab($('[data-node="tab-coll"]'),args);
                }                
                new RecTab($('[data-node="tab-rec"]'),args);
                */
                //obj_coll.init();
                //obj_rec.init();
                new Normal(args,true);
                new Shops(args,false);
                 // new Myshop(args,true);
                 // new Recomment(args,false);


                $('body').css({
                    height: '100%',
                    overflowY: 'hidden'
                });
                
                /*$addMeidian.on('click',function(){
                    var $this = $(this);
                    var $span = $this.find('span');

                    if($span.hasClass('add-checkbox-checked')){
                        $span.removeClass('add-checkbox-checked').addClass('add-checkbox');
                    }else{
                        $span.addClass('add-checkbox-checked');                   
                    }
                    return false;
                })*/
            }
        };

    } else {
        _options = {};
    }

    addDialog = dialog.create(_options);
    setTimeout(function() {
        addDialog.show();
    }, 100)

};

//弹窗关闭
var dialogClosed = function() {
    $('body').css({
        height: 'auto',
        overflowY: 'auto'
    });

    changedList = [];
    $addMeidian = null;
    $(window).off('.editor');
};

module.exports = init;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/*!
 * PopupJS
 * Date: 2014-11-09
 * https://github.com/aui/popupjs
 * (c) 2009-2014 TangBin, http://www.planeArt.cn
 *
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
 */
// var _count = 0;
var _isIE6 = !('minWidth' in $('html')[0].style);
var _isFixed = !_isIE6;

function Popup() {

    this.destroyed = false;

    this.__popup = $('<div />')
        /*使用 <dialog /> 元素可能导致 z-index 永远置顶的问题(chrome)*/
        .css({
            display: 'none',
            position: 'absolute',
            /*
            left: 0,
            top: 0,
            bottom: 'auto',
            right: 'auto',
            margin: 0,
            padding: 0,
            border: '0 none',
            background: 'transparent'
            */
            outline: 0
        })
        .attr('tabindex', '-1')
        .html(this.innerHTML)
        .appendTo('body');

    this.__backdrop = this.__mask = $('<div />')
        .css({
            opacity: .7,
            background: '#000'
        });

    // 使用 HTMLElement 作为外部接口使用，而不是 jquery 对象
    // 统一的接口利于未来 Popup 移植到其他 DOM 库中
    this.node = this.__popup[0];
    this.backdrop = this.__backdrop[0];

    // _count ++;
}

$.extend(Popup.prototype, {

    /**
     * 初始化完毕事件，在 show()、showModal() 执行
     * @name Popup.prototype.onshow
     * @event
     */

    /**
     * 关闭事件，在 close() 执行
     * @name Popup.prototype.onclose
     * @event
     */

    /**
     * 销毁前事件，在 remove() 前执行
     * @name Popup.prototype.onbeforeremove
     * @event
     */

    /**
     * 销毁事件，在 remove() 执行
     * @name Popup.prototype.onremove
     * @event
     */

    /**
     * 重置事件，在 reset() 执行
     * @name Popup.prototype.onreset
     * @event
     */

    /**
     * 焦点事件，在 foucs() 执行
     * @name Popup.prototype.onfocus
     * @event
     */

    /**
     * 失焦事件，在 blur() 执行
     * @name Popup.prototype.onblur
     * @event
     */

    /** 浮层 DOM 素节点[*] */
    node: null,

    /** 遮罩 DOM 节点[*] */
    backdrop: null,

    /** 是否开启固定定位[*] */
    fixed: false,

    /** 判断对话框是否删除[*] */
    destroyed: true,

    /** 判断对话框是否显示 */
    open: false,

    /** close 返回值 */
    returnValue: '',

    /** 是否自动聚焦 */
    autofocus: true,

    /** 对齐方式[*] */
    align: 'bottom left',

    /** 内部的 HTML 字符串 */
    innerHTML: '',

    /** CSS 类名 */
    className: 'ui-popup',

    /**
     * 显示浮层
     * @param   {HTMLElement, Event}  指定位置（可选）
     */
    show: function(anchor) {

        if (this.destroyed) {
            return this;
        }

        // var that = this;
        var popup = this.__popup;
        var backdrop = this.__backdrop;

        this.__activeElement = this.__getActive();

        this.open = true;
        this.follow = anchor || this.follow;

        // 初始化 show 方法
        if (!this.__ready) {

            popup
                .addClass(this.className)
                .attr('role', this.modal ? 'alertdialog' : 'dialog')
                .css('position', this.fixed ? 'fixed' : 'absolute');

            if (!_isIE6) {
                $(window).on('resize', $.proxy(this.reset, this));
            }

            // 模态浮层的遮罩
            if (this.modal) {
                var backdropCss = {
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    userSelect: 'none',
                    zIndex: this.zIndex || Popup.zIndex
                };

                popup.addClass(this.className + '-modal');

                if (!_isFixed) {
                    $.extend(backdropCss, {
                        position: 'absolute',
                        width: $(window).width() + 'px',
                        height: $(document).height() + 'px'
                    });
                }

                backdrop
                    .css(backdropCss)
                    .attr({
                        tabindex: '0'
                    })
                    .on('focus', $.proxy(this.focus, this));

                // 锁定 tab 的焦点操作
                this.__mask = backdrop
                    .clone(true)
                    .attr('style', '')
                    .insertAfter(popup);

                backdrop
                    .addClass(this.className + '-backdrop')
                    .insertBefore(popup);

                this.__ready = true;
            }

            if (!popup.html()) {
                popup.html(this.innerHTML);
            }
        }

        popup
            .addClass(this.className + '-show')
            .show();

        backdrop.show();

        this.reset().focus();
        this.__dispatchEvent('show');

        return this;
    },

    /** 显示模态浮层。参数参见 show() */
    showModal: function() {
        this.modal = true;
        return this.show.apply(this, arguments);
    },

    /** 关闭浮层 */
    close: function(result) {

        if (!this.destroyed && this.open) {

            if (result !== undefined) {
                this.returnValue = result;
            }

            this.__popup.hide().removeClass(this.className + '-show');
            this.__backdrop.hide();
            this.open = false;
            this.blur(); // 恢复焦点，照顾键盘操作的用户
            this.__dispatchEvent('close');
        }

        return this;
    },

    /** 销毁浮层 */
    remove: function() {

        if (this.destroyed) {
            return this;
        }

        this.__dispatchEvent('beforeremove');

        if (Popup.current === this) {
            Popup.current = null;
        }

        // 从 DOM 中移除节点
        this.__popup.remove();
        this.__backdrop.remove();
        this.__mask.remove();

        if (!_isIE6) {
            $(window).off('resize', this.reset);
        }

        this.__dispatchEvent('remove');

        for (var i in this) {
            delete this[i];
        }

        return this;
    },

    /** 重置位置 */
    reset: function() {

        var elem = this.follow;

        if (elem) {
            this.__follow(elem);
        } else {
            this.__center();
        }

        this.__dispatchEvent('reset');

        return this;
    },

    /** 让浮层获取焦点 */
    focus: function() {

        var node = this.node;
        var popup = this.__popup;
        var current = Popup.current;
        var index = this.zIndex = Popup.zIndex++;

        if (current && current !== this) {
            current.blur(false);
        }

        // 检查焦点是否在浮层里面
        if (!$.contains(node, this.__getActive())) {
            var autofocus = popup.find('[autofocus]')[0];

            if (!this._autofocus && autofocus) {
                this._autofocus = true;
            } else {
                autofocus = node;
            }

            this.__focus(autofocus);
        }

        // 设置叠加高度
        popup.css('zIndex', index);
        //this.__backdrop.css('zIndex', index);

        Popup.current = this;
        popup.addClass(this.className + '-focus');

        this.__dispatchEvent('focus');

        return this;
    },

    /** 让浮层失去焦点。将焦点退还给之前的元素，照顾视力障碍用户 */
    blur: function() {

        var activeElement = this.__activeElement;
        var isBlur = arguments[0];

        if (isBlur !== false) {
            this.__focus(activeElement);
        }

        this._autofocus = false;
        this.__popup.removeClass(this.className + '-focus');
        this.__dispatchEvent('blur');

        return this;
    },

    /**
     * 添加事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     */
    addEventListener: function(type, callback) {
        this.__getEventListener(type).push(callback);
        return this;
    },

    /**
     * 删除事件
     * @param   {String}    事件类型
     * @param   {Function}  监听函数
     */
    removeEventListener: function(type, callback) {
        var listeners = this.__getEventListener(type);
        for (var i = 0; i < listeners.length; i++) {
            if (callback === listeners[i]) {
                listeners.splice(i--, 1);
            }
        }
        return this;
    },

    // 获取事件缓存
    __getEventListener: function(type) {
        var listener = this.__listener;
        if (!listener) {
            listener = this.__listener = {};
        }
        if (!listener[type]) {
            listener[type] = [];
        }
        return listener[type];
    },

    // 派发事件
    __dispatchEvent: function(type) {
        var listeners = this.__getEventListener(type);

        if (this['on' + type]) {
            this['on' + type]();
        }

        for (var i = 0; i < listeners.length; i++) {
            listeners[i].call(this);
        }
    },

    // 对元素安全聚焦
    __focus: function(elem) {
        // 防止 iframe 跨域无权限报错
        // 防止 IE 不可见元素报错
        try {
            // ie11 bug: iframe 页面点击会跳到顶部
            if (this.autofocus && !/^iframe$/i.test(elem.nodeName)) {
                elem.focus();
            }
        } catch (e) {
            // nothing
        }
    },

    // 获取当前焦点的元素
    __getActive: function() {
        try { // try: ie8~9, iframe #26
            var activeElement = document.activeElement;
            var contentDocument = activeElement.contentDocument;
            var elem = contentDocument && contentDocument.activeElement || activeElement;
            return elem;
        } catch (e) {
            // nothing
        }
    },

    // 居中浮层
    __center: function() {
        var popup = this.__popup;
        var $window = $(window);
        var $document = $(document);
        var fixed = this.fixed;
        var dl = fixed ? 0 : $document.scrollLeft();
        var dt = fixed ? 0 : $document.scrollTop();
        var ww = $window.width();
        var wh = $window.height();
        var ow = popup.width();
        var oh = popup.height();
        var left = (ww - ow) / 2 + dl;
        var top = (wh - oh) * 382 / 1000 + dt; // 黄金比例
        var style = popup[0].style;

        style.left = Math.max(parseInt(left), dl) + 'px';
        style.top = Math.max(parseInt(top), dt) + 'px';
    },

    // 指定位置 @param    {HTMLElement, Event}  anchor
    __follow: function(anchor) {

        var $elem = anchor.parentNode && $(anchor);
        var popup = this.__popup;

        if (this.__followSkin) {
            popup.removeClass(this.__followSkin);
        }

        // 隐藏元素不可用
        if ($elem) {
            var o = $elem.offset();
            if (o.left * o.top < 0) {
                return this.__center();
            }
        }

        var that = this;
        var fixed = this.fixed;

        var $window = $(window);
        var $document = $(document);
        var winWidth = $window.width();
        var winHeight = $window.height();
        var docLeft = $document.scrollLeft();
        var docTop = $document.scrollTop();

        var popupWidth = popup.width();
        var popupHeight = popup.height();
        var width = $elem ? $elem.outerWidth() : 0;
        var height = $elem ? $elem.outerHeight() : 0;
        var offset = this.__offset(anchor);
        var x = offset.left;
        var y = offset.top;
        var left = fixed ? x - docLeft : x;
        var top = fixed ? y - docTop : y;

        var minLeft = fixed ? 0 : docLeft;
        var minTop = fixed ? 0 : docTop;
        var maxLeft = minLeft + winWidth - popupWidth;
        var maxTop = minTop + winHeight - popupHeight;

        var css = {};
        var align = this.align.split(' ');
        var className = this.className + '-';
        var reverse = {
            top: 'bottom',
            bottom: 'top',
            left: 'right',
            right: 'left'
        };
        var name = {
            top: 'top',
            bottom: 'top',
            left: 'left',
            right: 'left'
        };

        var temp = [{
            top: top - popupHeight,
            bottom: top + height,
            left: left - popupWidth,
            right: left + width
        }, {
            top: top,
            bottom: top - popupHeight + height,
            left: left,
            right: left - popupWidth + width
        }];

        var center = {
            left: left + width / 2 - popupWidth / 2,
            top: top + height / 2 - popupHeight / 2
        };

        var range = {
            left: [minLeft, maxLeft],
            top: [minTop, maxTop]
        };

        // 超出可视区域重新适应位置
        $.each(align, function(i, val) {

            // 超出右或下边界：使用左或者上边对齐
            if (temp[i][val] > range[name[val]][1]) {
                val = align[i] = reverse[val];
            }

            // 超出左或右边界：使用右或者下边对齐
            if (temp[i][val] < range[name[val]][0]) {
                align[i] = reverse[val];
            }

        });

        // 一个参数的情况
        if (!align[1]) {
            name[align[1]] = name[align[0]] === 'left' ? 'top' : 'left';
            temp[1][align[1]] = center[name[align[1]]];
        }

        //添加follow的css, 为了给css使用
        className += align.join('-') + ' ' + this.className + '-follow';

        that.__followSkin = className;

        if ($elem) {
            popup.addClass(className);
        }

        css[name[align[0]]] = parseInt(temp[0][align[0]]);
        css[name[align[1]]] = parseInt(temp[1][align[1]]);
        popup.css(css);

    },

    // 获取元素相对于页面的位置（包括iframe内的元素）
    // 暂时不支持两层以上的 iframe 套嵌
    __offset: function(anchor) {

        var isNode = anchor.parentNode;
        var offset = isNode ? $(anchor).offset() : {
            left: anchor.pageX,
            top: anchor.pageY
        };

        anchor = isNode ? anchor : anchor.target;
        var ownerDocument = anchor.ownerDocument;
        var defaultView = ownerDocument.defaultView || ownerDocument.parentWindow;

        if (defaultView == window) { // IE <= 8 只能使用两个等于号
            return offset;
        }

        // {Element: Ifarme}
        var frameElement = defaultView.frameElement;
        var $ownerDocument = $(ownerDocument);
        var docLeft = $ownerDocument.scrollLeft();
        var docTop = $ownerDocument.scrollTop();
        var frameOffset = $(frameElement).offset();
        var frameLeft = frameOffset.left;
        var frameTop = frameOffset.top;

        return {
            left: offset.left + frameLeft - docLeft,
            top: offset.top + frameTop - docTop
        };
    }

});

/** 当前叠加高度 */
Popup.zIndex = 1024;

/** 顶层浮层的实例 */
Popup.current = null;

module.exports = Popup;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// artDialog - 默认配置

module.exports = {

    /* -----已注释的配置继承自 popup.js，仍可以再这里重新定义它----- */

    // 对齐方式
    //align: 'bottom left',
    
    // 是否固定定位
    //fixed: false,
    
    // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
    //zIndex: 1024,

    // 设置遮罩背景颜色
    backdropBackground: '#000',

    // 设置遮罩透明度
    backdropOpacity: 0.7,

    // 消息内容
    content: '<span class="ui-dialog-loading">Loading..</span>',
    
    // 标题
    title: '',

    // 对话框状态栏区域 HTML 代码
    statusbar: '',
    
    // 自定义按钮
    button: null,
    
    // 确定按钮回调函数
    ok: null,
    
    // 取消按钮回调函数
    cancel: null,

    // 确定按钮文本
    okValue: '确定',
    
    // 取消按钮文本
    cancelValue: '取消',

    cancelDisplay: true,
    
    // 内容宽度
    width: '',
    
    // 内容高度
    height: '',
    
    // 内容与边界填充距离
    padding: '',
    
    // 对话框自定义 className
    skin: '',

    // 是否支持快捷关闭（点击遮罩层自动关闭）
    quickClose: false,

    // css 文件路径，留空则不会使用 js 自动加载样式
    // 注意：css 只允许加载一个
    cssUri: '../css/ui-dialog.css',

    // 模板（使用 table 解决 IE7 宽度自适应的 BUG）
    // js 使用 i="***" 属性识别结构，其余的均可自定义
    innerHTML:
        '<div i="dialog" class="ui-dialog">'
        +       '<div class="ui-dialog-arrow-a"></div>'
        +       '<div class="ui-dialog-arrow-b"></div>'
        +       '<table class="ui-dialog-grid">'
        +           '<tr>'
        +               '<td i="header" class="ui-dialog-header">'
        +                   '<button i="close" class="ui-dialog-close icon icon-close" title="关闭">&#215;</button>'
        +                   '<div i="title" class="ui-dialog-title"></div>'
        +               '</td>'
        +           '</tr>'
        +           '<tr>'
        +               '<td i="body" class="ui-dialog-body">'
        +                   '<div i="content" class="ui-dialog-content"></div>'
        +               '</td>'
        +           '</tr>'
        +           '<tr>'
        +               '<td i="footer" class="ui-dialog-footer">'
        +                   '<div i="statusbar" class="ui-dialog-statusbar"></div>'
        +                   '<div i="button" class="ui-dialog-button"></div>'
        +               '</td>'
        +           '</tr>'
        +       '</table>'
        +'</div>'
    
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var passport = __webpack_require__(21);
var mall = __webpack_require__(22);
var group = __webpack_require__(23);
var order = __webpack_require__(24);
var ucenter = __webpack_require__(25);
var activity = __webpack_require__(26);
var other = __webpack_require__(27);
var talent = __webpack_require__(28);
var meihao = __webpack_require__(29);
var meidian = __webpack_require__(30);

var env = __webpack_require__(31);
// 方便输出调试信息
passport._name_ = 'passport';
mall._name_ = 'mall';
group._name_ = 'group';
order._name_ = 'order';
ucenter._name_ = 'ucenter';
activity._name_ = 'activity';
other._name_ = 'other';
talent._name_ = 'talent';
meihao._name_ = 'meihao';
meidian._name_ = 'meidian';

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

_extend(urls, passport, mall, group, order, ucenter, activity, other,talent,meidian,meihao);

if (repeat.length) {
    
    throw new Error('io/url模块中注册了重名的ajax请求地址,请根据错误提示信息修改');
}

var get = function(name) {
    var url = urls[name];
    if (url && url.length) {
        return env().domain + url;
    }
    throw new Error('请在js/io/url.js中注册请求地址-->' + name);
};

module.exports = {
    get: get,
    urls:urls
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * 用户注册登录接口
 */
module.exports = {

    //注册页面接口
    getVerificationCode: '/regist/firststep', //发送验证码
    registSubmit: '/regist/secondstep', //校验+提交
    checkNickname: '/regist/identifynickname', //校验昵称
    checkRecommendationCode: '/regist/identifyreferralcode', //校验推荐码
    thirdstep: '/regist/thirdstep', //完善信息

    // 找回密码接口
    postPhoneAndCode: '/forgetpwd/firstStep', // 第一步
    sendMsgCode: "/forgetpwd/sceondStep", //发送手机验证码
    postMsgCode: "/forgetpwd/thirdStep", //第二步
    postNewPwd: "/forgetpwd/fourthStep", //第三步

    //v2接口
    sendMsgCodeV2: '/forgetpwd/sendVerifitionCode',
    checkCode: '/forgetpwd/checkVerifycode',
    passwordReset: '/forgetpwd/passwordReset',

    //找回门店密码
    storePwd: '/shop/check',

    /*第三方登录-关联手机号*/
    snsSendCode: '/login/snsbindphonefirst',
    snsSubmitPhone: "/login/snsbindphonesecond",

    /*绑定手机号*/
    loginData: '/ajax/login/login',
    sendCode: 'bindphonefirst',
    loginErrorNum: '/login/errornum',
    bindPhone: '/login/bindphone',

    /*扫码登录*/
    getQrCode: '/ajax/login/getQrcodeInfo', //获取二维码
    abolishQrCode: '/ajax/login/delSsidInfo', //让二维码失效
    getSsidStatus: '/ajax/login/getSsidStatus', //检测扫码状态

    /*扫码登录*/
    ajaxGetQrCode: '/ajax/login/getQrcodeInfo', //获取二维码
    ajaxAbolishQrCode: '/ajax/login/delSsidInfo', //让二维码失效
    ajaxGetSsidStatus: '/ajax/login/getSsidStatus', //检测扫码状态

    /*绑定手机号*/
    ajaxLoginData: '/ajax/login/login',
    //ajaxCaptcha: '/ajax/login/captcha',
    ajaxCaptcha: 'index/code',

    /*记录第三方页面重定向session*/
    ajaxThirdRedirect: '/ajax/login/redirect_state',
    /*登录完成获取其他用户信息*/
    ajaxGetCurrInfo: '/ajax/login/getCurrInfo',
    // 请求验证码
    getCheckCode: 'index/code',
    // 升级到一账通
    accountUpgrade: '/ajax/user/accountUpgrade',
    /* 手机文件上传二维码*/
    // getUploadQrCode: '/topic/topicQrcode'
    getUploadQrCode: '/sweep/topicQrcode'

};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

/**
 * 商城相关接口
 */
module.exports = {
	shareGetGoodsKid: '/product/shareRebateId', // 分享到获取商品的kid
	//获取优惠券列表
	ticketList: '/product/coupons',
	//领取优惠券
	getTicket: '/ajax/user/getRedPacketV2',
	//店铺领取优惠券
	getShopTicket: '/ajax/user/getRedPacket',
	//商品详情页店内推荐
	shopChoose: '/product/shopRecom',
	//商品详情页商品推荐
	productChoose: '/product/recommend',
	//店铺内搜索加载更多
	searchGetMore:'shop/searchMoreList',
	//店铺动态页内容加载 
	dynamicGetData:'/ajax/topic/ta',
	//在线商品获取sku价格
	getCurrSkuInfo: '/product/getCurrSkuInfo',
	//在线商品切换地址获取价格
	getCurrItemInfo: '/ajax/address/getCurrItemInfo',
	//商品搜素
	searchGoods: '/search/productList',
	getBrand: '/search/productbrandfirstWordList',
	//店铺营业执照查看获取验证码
	getCodeOfBusiness:'/shop/getcode',
	//店铺营业执照查看发送数据监测验证码
	shopCodeCheck:'/shop/check'
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * 圈子社交相关接口
 */
module.exports = {
    praise: '/ajax/group/praised', // 赞/取消赞
    searchGroup: '/api/search_more', // 圈子搜索

    groupFace: '/publiser/faces', // 圈子表情接口
    groupPublishTopic: '/ajax/topic/create', // 圈子发布话题
    groupSaveTopic: '/expert/draftsSave', //圈子保存话题
    topics: '/api/topic_more', // 话题接口
    joinCircle: '/api/circle', // 加入圈子
    joinCircle1: '/ajax/group/circle', //融合加入圈子
    joinCircle2: 'ajax/group/circle', //融合加入圈子
    getIndexData: '/ajax/topic/api_ids', //圈子首页获取动态数据

    createCircle: '/publiser/circle', //创建圈子
    createCircle1: '/ajax/group/check', //融合加入圈子
    moreTopics: '/topic/more_topics', //最近话题加载更多
    follow: '/publiser/add_follow', //加关注
    unfollow: '/publiser/delete_follow', //取消关注
    commentFirst: '/ajax/topic/first', //一级回复  一级评论
    commentListUrl: '/api/reply_list',
    secondtopic: '/ajax/topic/second',
    getRelyList: '/api/second_reply_list',
    //commentFirstV2: '/ajax/topic/first_v2', //一级回复v2  一级评论
    //secondtopicV2: '/ajax/topic/second_v2', //
    //commentListUrlV2: '/api/reply_list_v2',
    //getRelyListV2: '/api/second_reply_list_v2',
    detail_infos: '/topic/detail_infos',
    //selectGroup: '/publiser/select_group', // 选择圈子
    selectGroup: '/ajax/topic/select_group', // 选择圈子

    commentFirstV2: '/ajax/topic/first_v2', //一级回复v2  一级评论
    secondtopicV2: '/ajax/topic/second_v2', //
    commentListUrlV2: '/ajax/api/reply_list_v2',
    getRelyListV2: '/api/second_reply_list_v2',

    getNextTopic: '/api/next_topic/', //下一个话题
    // handleimg: '/topic/handleimg ', //图片旋转
    handleimg: '/ajax/topic/handleimg ', //图片旋转
    pcStatus: '/topic/pcStatus',

    getNextTopic: '/api/next_topic/', //下一个话题
    topicDel: '/ajax/topic/del', //话题删除
    topicReport: '/ajax/topic/report', //话题举报
    //圈子列表
    categories: '/api/categories', //分类集合
    groupLists: '/api/group_lists', //列表信息
    recommendCircle: '/api/recommend',
    exitCircle: '/ajax/group/quit_circle', //退出圈子
    //话题图片处理
    // topicRotateImg: '/topic/handleImg', //旋转
    topicRotateImg: '/upload/rotate', //旋转
    // topListenImg: '/topic/checkinfo', //上传监听
    topListenImg: '/sweep/checkinfo', //上传监听
    //话题图片上传
    // topicUrlUpload: '/topic/url',
    topicBase64Upload: '/upload/paste',
    // topicuploadMax: '/topic/putMaxNum',
    topicuploadMax: '/sweep/putMaxNum',
    topicUrlUpload2: '/upload/url',
    //话题h5上传图片
    // h5TopicUpload: '/topic/upload', //h5上传图片
    h5TopicUpload: '/sweep/upload', //h5上传图片
    h5QruploadStatus: '/wap/statreport', //h5二维码状态监听
    h5QruploadMaxNum: '/wap/maxNum', //h5获取最大上传图片

    //话题回复图片上传地址
    // topicUrlUpload: 'topic/url',
    //topicUrlUpload: 'ajax/topic/url',

    //标签
    tagSearch: '/ajax/tag/search', //标签搜索
    tagCreate: '/ajax/tag/create', //用户自定义标签

    //话题敏感词过滤
    // sensitiveWord: '/topic/check'
    sensitiveWord: '/ajax/topic/check',

    //读取话题数据（草稿箱/话题）
    readTopicData: '/expert/publishedDetail', //话题
    readTopicDraftsData: '/expert/draftsDetail', //草稿

    //增加话题浏览量
    addVisitTopic: '/ajax/api/otherMissing',
    //获取视频地址
    getVideoPath: '/index/videoinfo',
    //置顶、加精
    setTop: '/ajax/topic/actopic',
    //分享返利kid
    shareKid: '/ajax/Mshop/getmshopKid',
    //编辑器页面初始配置数据
    extendConfig:'/sweep/pageConfig',
    //扫码主页
    h5QruploadIndex:'/wap/index',
    //生成二维码
    createQrcode:'/sweep/urlcode'

};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * 购物流程，生成订单相关接口
 */
module.exports = {

    // cartGetRedPacketList: '/ajax/car/getRedPacketList', // 购物车优惠券红包列表
    cartGetRedPacketList: '/ajax/coupons/shopCoupons', // 购物车优惠券红包列表V2
    // cartGetRedPacket: '/ajax/user/getRedPacket', // 购物车优惠券红包领取
    cartGetRedPacket: '/ajax/user/getRedPacketV2', // 购物车优惠券红包领取V2
    // cartUpdateGoods: '/ajax/car/update', // 购物车商品数量修改
    cartUpdateGoods: '/ajax/car/put', // 购物车商品数量修改v2
    // cartDelGoods: '/ajax/car/del', // 购物车删除商品
    cartDelGoods: '/ajax/car/del_v2', // 购物车删除商品v2
    cartOrderCheck: '/cart/orderdeliver', // 购物车结算检测
    cartFormSubmit: '/cart/checkout', // 购物车去结算地址

    cartGoodsCollect: '/cart/goodsCollect', // 购物车收藏的商品
    cartGoodsRecommend: '/cart/goodsRecom', // 购物车推荐的商品
    cartGoodsDetail: '/cart/goodsDetail', // 购物车添加收藏或推荐的商品详情

    unPayCancelOrder: '/order/mergerOrderCancel', //未付款取消订单
    payedCancelOrder: '/order/orderCancel', //已付款取消订单,待发货
    loadMoreOrder: '/Order/orderlist', // 加载更多订单接口
    confirmReceipt: '/order/confirm', // 确认收货
    delayReceipt: '/order/delayConfirm', // 延迟收货
    checkOrderPay: '/order/payCheck', // 检测订单支付是否可行
    showMyOrders: '/order/shineOrders', // 订单列表晒单接口

    subOrder: '/order/pay', //订单详情支付
    weixinPayStatus: '/order/checkPaySuccess', // 微信支付状态

    // 订单确认页面接口
    isAddrOk: '/cart/orderdeliver', // 当前地址是否可送达
    submitOrder: '/order/confirm', // 确认订单
    orderCheck: '/order/check', //检查是否是国美在线的
    orderSendGood: '/order/sendGood'

};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/**
 * 用户中心相关接口
 */
module.exports = {

    //个人中心
    getJoinedCircle: '/group/sendgroupData', //我的圈子
    getTopic: '/topic/getTopicByAjax', //我发布的话题
    canCreate: '/group/check', //检测是否能创建新的圈子
    getRecommendGoods: '/index/recommend', //换一组商品

    //uc-重置密码
    ucSendMsgCode: '/modpwd/sendPsw', //发送手机验证码
    subNewPwd: '/modpwd/checkPsw', //提交新密码
    //uc-设置个人信息
    checkName: '/ajax/user/identifynickname', //校验昵称
    subName: '/personal/modPersonalInfo',

    //达人申请
    getMasterTypeList: '/expert/expertCtgy', //初始化达人类型列表
    subMaster: '/expert/postExpert', //首次发送达人请求
    subMasterAgain: '/expert/putExpert', //再次发送达人请求

    getAddress: '/ajax/address/regionDivisionV2?parentId=', // 收货地址四级联动
    getRedList: '/shop/getRedPacketList', //详情页优惠券列表
    shopCollect: '/ajax/shop/collectShopV2', //收藏店铺
    unShopCollect: '/ajax/shop/uncollectShopV2', //取消收藏店铺
    addShopCar: '/ajax/car/add', //添加购物车
    getMoreDiscuss: '/product/getEvaluate', //获取更多评论
    getProduct: '/product/candeliver', //是否有货
    moreGoods: '/shop/moreList', //商铺详情获取更多数据
    productUnCollect: '/ajax/shop/uncollectProductV2', //取消商品收藏
    productCollect: '/ajax/shop/collectProductV2', //商品收藏

    getCollectItem: '/index/myCollectedItem', //我收藏的商品
    getMoreItem: '/index/searchItem', //圈子-获取更多商品
    
    searchTopics: '/search/topics_more', //获取话题列表
    searchLabel: '/ajax/tag/topic', //获取标签列表
    //commentFirstV2: '/ajax/topic/first_v2', //一级回复v2  一级评论
    //secondtopicV2: '/ajax/topic/second_v2', //
    //commentListUrlV2: '/api/reply_list_v2',
    //getRelyListV2: '/api/second_reply_list_v2',

    // 话题收藏/取消收藏
    collectTopic: '/ajax/group/topcollect',
    //删除收藏商品/店铺/话题
    delCollectGoods: '/collect/delGoods',
    delCollectShop: '/collect/delShop',
    delCollectTopic: '/topic/delTopic',
    //收藏-获取更多商品/店铺/话题
    getCollectGoods: '/collect/moreGoods',
    getCollectShop: '/collect/moreShop',
    getCollectTopic: '/topic/collectedTopic',
    //订单评价
    discussOrder: '/order/getCommentInfo',

    //退货换货
    getRefundInfo: '/order/getRefundInfo',
    // 收货地址
    addAddress: '/ajax/address/add', // 新增收货地址
    setDefaultAddr: '/ajax/address/setDefault', // 设置为默认收货地址
    editAddress: '/ajax/address/edit', // 修改收货地址
    delAddress: '/ajax/address/del', // 删除收货地址

    //售后服务
    afterServiceList: '/customerInfo/getBackData',
    logisticsList: '/customerInfo/getGoodsStreamInfo',
    sendGoods: '/customerInfo/sendGoods',
    buyCheckGoods: '/customerInfo/buyCheckGoods',
    //修改绑定手机号
    sendOldCode: '/bind/postVerifyCodeOld',
    checkOldCode: '/bind/checkVerifyCodeOld',
    sendNewCode: '/bind/postVerifyCodeNew',
    checkNewCode: '/bind/checkVerifyCodeNew',
    //意见反馈
    feedback: '/feed/info',
    //他人主页
    othersCircle: '/ta/circles',
    othersTopic: '/ta/topics',
    //个人中心首页确认收货
    confirmGoods: '/ajax/user/confirmRecv',
    //我发布的话题
    publishedTopic: '/topic/publishedTopic',
    hotTopic: '/topic/hotTopics',
    delPublishedTopic: '/ajax/topic/del',
    //我的圈子  退出圈子  解散圈子 查看是否能创建圈子
    getMyGroups: '/group/getMyGroups',
    quitCircle: '/ajax/group/quit_circle',
    delGroupByGid: '/group/delGroupByGid',
    groupCheck: '/ajax/group/check',
    //店铺管理  商品上下架  店铺管理页分页 好货推荐   获取kid
    soldInOut: '/ajax/Mshop/itemMangeInShop',
    shopMange: '/ajax/Mshop/index?pageNum=',
    hotGoods: '/ajax/Mshop/addItem?type=',
    getKid: '/ajax/Mshop/getKid',
    batchShelves: '/ajax/Mshop/itemMangeInShop',

    //图片上传
    cropImg:'/upload/origin'

    // groupCheck: '/ajax/group/check',

};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * 运营活动相关接口
 */
module.exports = {
    //红包
    getTotalAmount: '/api/getTotalAmount',
    getPrizesList: '/api/getPrizesList'
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * 未分类接口
 */
module.exports = {
    // 圈子首页不断寻觅
    getHomepageGoOn: '/channel/feedlist',
    //大首页不断寻觅
    getGoOn:'/index/feedlist',
    activity:'index/floatLayer',
    tabChannel:'/channel/floor_category'
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * 达人相关接口
 */
module.exports = {
    //删除已发话题
    delTopic: '/ajax/topic/del',
    //获取草稿列表
    draftsList:'/expert/draftsList',
    //删除草稿
    delDraft:'/expert/draftsDel',
    //草稿箱编辑
    draftsDetail:'/expert/draftsDetail',
    publishedDetail:'/expert/publishedDetail',
    
    //达人资料提交
    postExpert: '/expert/postExpert',
    //达人资料修改
    putExpert: '/expert/putExpert',
    //达人资料类别
    expertCtgy: '/expert/expertCtgy',
    //达人主页系统公告
    expertNotice: '/expert/notifications'
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * 美号相关接口
 */
module.exports = {
    createCompany: '/ajax/meihao/createCompany',   //创建企业资质信息
    editCompany: '/ajax/meihao/editCompany',       //编辑企业资质信息
    createPrivate: '/ajax/meihao/createMeihao',
    editPrivate: '/ajax/meihao/editMeihao',
    privateTag: '/ajax/meihao/taglist',
    privateCateList : '/ajax/meihao/cateList',
    privateNameCheck : '/ajax/meihao/nameCheck',
    readMeihaoTopicData:'/ajax/meihao/topicinfo',
    cancelModifySetting: '/ajax/meihao/cancelModifySetting',
    modifySetting: '/ajax/meihao/modifySetting',

    meihaoTitle: '/ajax/topic/check',
    meihaoName: '/ajax/meihao/nameCheck',

    groupRebind: '/ajax/meihao/groupRebind',
    articleList:'/index/articleList',	//首页读取文章列表
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/*
*@des:美店相关接口
*/
module.exports = {
	saveMshop:'/ajax/mshop/saveMshop',//创建美店接口
	editshop:'/ajax/mshop/editshop',//美店编辑保存
    itemBatchMangeInShop:'/ajax/mshop/itemBatchMangeInShop',//一键上架
    myMshop:'/mshop/myMshopItem',//我的美店
    myShop:'/mshop/myMshopItem',//我的美店
    recomment:'/mshop/goods',
    getShop:'/mshop/search',		//搜索美店
    getShopItem:'/mshop/searchItem'
}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (){
	var envPath;
	if(window._Geditor){
		switch(window._Geditor.env){
			case 'dev':
				envPath={
					domain:'http://gediter.dev.atguat.com.cn'
				}
				break;
			case 'pre':
				envPath = {
					domain:'http://gediter.dev.atguat.com.cn'
				}
				break;
			default:
				envPath = {
					domain:'http://gediter.dev.atguat.com.cn'
				}
				break;
		}
	}else{
		envPath = {
			domain:'http://gediter.dev.atguat.com.cn'
		}
	}

	return   envPath;
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var template=__webpack_require__(1);
module.exports=template('src/goods/tpl/meidianSearch/comm',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,returnList=$data.returnList,$each=$utils.$each,$value=$data.$value,$index=$data.$index,changeNum=$data.changeNum,maxlength=$data.maxlength,$out='';$out+=' <ul data-node="tab-title-container" class="tab-title-container clearfix"> </ul> <ul data-node="search-bar-container" class = "search-bar-container clearfix"> </ul>  <ul data-node="tab-content-container" class="tab-content-container clearfix"> </ul>  <div class="chosed-merchants" data-node="changedBox" style="display:';
$out+=$escape((returnList.length>0?'':'none'));
$out+='"> <ul class="merchants-list clearfix" data-node="searchChangeList"> ';
$each(returnList,function($value,$index){
$out+=' <li data-skuId="';
$out+=$escape($value.skuId);
$out+='" data-pid="';
$out+=$escape($value.PId);
$out+='"> <img src="';
$out+=$escape($value.img);
$out+='" alt="" onerror="imgError(this)"> <a href="javascript:;" data-action="delChanged"> <em class="icon-del-pic"></em> </a> </li> ';
});
$out+=' </ul> </div> <div class="num-pics" data-node="numPics">您可以添加 <span class="link-hover-red" data-node="searchChangeNum">';
$out+=$escape(changeNum);
$out+='</span>/<span class="deep-gray">';
$out+=$escape(maxlength);
$out+='</span>个商品</div> ';
return new String($out);
});

/***/ }),
/* 33 */
/***/ (function(module, exports) {

/**
 * 定义所有的页面的pub/sub通道
 */

var channels = {
    postTopic: {
        selectCircle: 'done' // 圈子选择完毕
    },
    //发话题
    setPubliser: {
        changedItem: 'changeItem', //选择商品弹窗
        changeImage: 'uploadImg', //图片上传弹窗
        delItem: 'delItem', // 删除已插入的商品
        wordUploader: 'wordUploader' // word中粘贴img图片上传
    },
    comment: {
        enableEditor: 'enableEditor'
    }
};

module.exports = channels;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(35),
    baseIsNaN = __webpack_require__(36),
    strictIndexOf = __webpack_require__(37);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var toFinite = __webpack_require__(39);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var toNumber = __webpack_require__(40);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(41),
    isSymbol = __webpack_require__(42);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(43),
    isObjectLike = __webpack_require__(49);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14),
    getRawTag = __webpack_require__(47),
    objectToString = __webpack_require__(48);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(45);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(46)))

/***/ }),
/* 46 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 49 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/*
    create by linfei
    2017/12/10
*/

var dialog = __webpack_require__(3);
var fetch = __webpack_require__(8);
var Pubsub = __webpack_require__(6);
var indexof = __webpack_require__(2);
var alert = __webpack_require__(4);
var commFunc = __webpack_require__(5);
var isEmptyObject = commFunc.isEmptyObject;
var reWrap = commFunc.reWrap;

var loop = function(){};
//搜索条
var searchBar = __webpack_require__(9);
var searchListTpl = __webpack_require__(16);
//我的收藏
var collrectTpl = __webpack_require__(10);
// var collrectTpl = require('../tpl/meidianSearch/collrect.tpl');
//搜索商品
var searchBoxTpl = __webpack_require__(11);

//商品列表
var defaultItemlist = __webpack_require__(7);

var Card = __webpack_require__(12);

//----------------------------------子类  我的美店选项卡------//
var Normal = function(args,active){
	Card.call(this,args);
	this.obj = null;
	this.args = args;
	this.active = active;

    //------------------搜索条相关------------------
    this.$searchBarBox = null;    //搜索容器
    this.$searchInput =null; //搜索框
    this.$searchBtn = null;  //搜索按钮
    this.keyWord = '';  //保存上次按下回车的数据
    this.searchItemTips = '';   //默认没有我的收藏页面出现的提示

	//tab按钮
	this.tabBtn = null;
	//tab内容
	this.$tabContent = null;
    //我的收藏标题
    this.$collrectTitle = null;

	this.link = args.getMoreItem;
    this.noItemsContent = "美店中暂无商品，可在好货推荐中添加！";
    this.decription = 'normalGoods';
    this.searchBarText = '搜索商品';
	this.init();
};


;(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Card.prototype;
  //将实例作为子类的原型
  Normal.prototype = new Super();
})();

Normal.prototype.constructor = Normal;


Normal.prototype.init = function(){
    this.initGlobal();
	this.getGlobalNode();
    //加载localstorage
    this.loadStorage();
    //渲染搜索条
    this.renderSearchBar();
	this.renderTabTitle('普通商品');
	this.renderTabContent();
    //寻找节点
    this.getSelfNode();
    //展示我的收藏
    this.showCollrect()
    
    //渲染icon节点
    this.renderPicsNum();
    //绑定事件
    this.bindGlobalEvent();
	this.bindEvent();
    
}

Normal.prototype.getSelfNode = function(){  
   
    this.$searchInput = this.$searchBar.find('[data-action="addSearchInput"]');
    this.$searchBtn = this.$searchBar.find('[data-action="addSearchBtn"]');
    this.$history = this.$searchBar.find('[data-node="history"]');
    this.$searchItemTips = this.$tabContent.find('[data-node="search-item-tips"]');
    
    var obj = this.$obj = this.$tabContent;
    //提示信息------------------------------------------
    this.$searchNormal = obj.find('[data-node="searchNormal"]');
    this.$searchLoading = obj.find('[data-node="searchLoading"]');
    this.$searchFail = obj.find('[data-node="searchFail"]');
    //盒子内容-----------------------------------------
    this.$collrectTitle = obj.find('[data-node="title"]');

    this.$searchResult = obj.find('[data-node="searchResultBox"]');
    this.$searchList = obj.find('[data-node="searchResultList"]');
    this.$searchListBox = this.$searchList.parent();
    //小图标区域
    this.$changeList = $listBox.find('[data-node="searchChangeList"]');
    //更多按钮
    this.$getMore = obj.find('[data-action="moreItem"]');
    this.nodeName = obj.attr('data-node');

}
Normal.prototype.showCollrect = function(){
    var self = this;
    if(!this.args.showCollrect){return false;}
    this.getItems(this.args.showCollrect, {
        data: {
            page: self.pageNum,
            pagesize: 10
        },
        done: function(result) {
            var html = defaultItemlist({
                itemlist: result.data.items,
                changedList: self.args.changedList,
                indexof: indexof
            });
            if (self.pageNum === 1) {
                self.$searchList.html(html);
            } else {
                self.$searchList.append(html);
            }
        }
    });
}

Normal.prototype.rendersearchFrame = function(){
    this.$historyFrame = $( searchListTpl({'list':this.localStorage}) );
    this.$history.html(this.$historyFrame);
}


Normal.prototype.renderSearchBar = function(){
    
    this.$searchBar = $(searchBar({title:this.searchBarText}));
    this.$searchBarContainer.append(this.$searchBar);
    this.$historyFrame = $( searchListTpl({'list':this.localStorage}) );
    this.$searchBar.find('[data-node="history"]').append(this.$historyFrame);

    if(!this.active){
        this.$searchBar.hide();
    }

    this.$searchBarContainer.addClass('show');
}


Normal.prototype.renderTabContent=function(){
	var args = this.args;
	var coll = collrectTpl({
		showCollrect:args.showCollrect,
		// showCollrect:1,
		imgSrc:args.imgpath
	});
	var searchBox = searchBoxTpl({
		returnList:args.returnList,
		imgSrc:args.imgpath
	}); 
    var $li = $('<li class="tab-content"></li>');
    $li.append(coll);
    $li.append(searchBox);

    this.$tabContent = $li;
	this.$tabContentContainer.append($li);

    if(this.active){
        this.$tabContent.addClass('show');
    }
    if(!args.showCollrect){
        this.$tabContent.find('[data-node="searchNormal"]').show();
    }

}

Normal.prototype.loadStorage = function(){
    this.localStorage = this.getLocalStorage(this.decription);
}

Normal.prototype.bindEvent = function(){
	var self = this;

    //-----------处理搜索记录用-------------//
    $(window).on('click.editor',function(e){
        var $parent = $(e.target).parents('[data-node="addTopBox"]') ;
        if(!$parent.length){
            self.$history.removeClass('show');
        }
    })

    self.$searchBtn.on('click.editor',function(e){
        self.$history.removeClass('show');
    })
    self.$searchInput.on('focus.editor',function(e){   
        var _story = self.getLocalStorage();
        self.$history.addClass('show');
    })

    self.$history.on('blur.editor',function(e){      
        self.$history.removeClass('show');
    })

    self.$history.on('click.editor','span',function(e){
        var text = $(this).text()
        self.$searchInput.val(text);
        self.$history.removeClass('show');
    })

    self.$history.on('mouseover.editor','p',function(e){
        $(this).find('b').addClass('show') 
    })
    self.$history.on('mouseout.editor','p',function(e){
        $(this).find('b').removeClass('show') 
    })
    self.$history.on('click.editor','b',function(e){
        var text = $(this).siblings('span').text();
        $(this).parents('dd').remove();
        var index = self.localStorage.indexOf(text);
        self.localStorage.splice(index,1);
        self.setLocalStorage(self.decription,true);
    })

    //-----------------重新获取数据----------------------------//


        self.$searchFail.on('click', function() {
            if (self.pageNum === 1) {
                self.$searchLoading.show();
                self.$searchFail.hide();
                if (self.isCollrect) {
                    self.defaultItem(self.pageNum);
                    self.isCollrect = false;
                } else {
                    self.moreItem(self.pageNum);
                }
            }
        });

        self.$getMore.on('click', '[node-action="reget"]', function() {
            $(this).parent().html(self.loadString);
            if (self.isCollrect) {
                self.defaultItem(self.pageNum);
                self.isCollrect = false;
            } else {
                self.moreItem(_this.pageNum);
            }
        });


    //--------------------------------------------------------------------//

    self.$searchInput.on('keyup.editor', function(e) {

        var keycode = e.which;
        self.isCollrect = false;
        self.isGetMore = false;

        //处理回车的情况
        var keyWord = $.trim(self.$searchInput.val());

        if (keycode === 13) {
            if (keyWord !== '') {
                if (keyWord.length < 2) {
                    alert('请输入两个字符以上关键词');
                } else {
                    self.keyWord = keyWord;
                    self.pageNum = 1;
                    self.$collrectTitle.hide();
                    self.$searchItemTips.hide();
                    self.$getMore.find('span').html(self.loadString);
                    self.moreItem(self.pageNum, keyWord);
                }
            } else {
                alert('请输入关键词');
            }
            self.$history.removeClass('show');
            return false;
        }

        

        if (keyWord === '') {
            
            self.pageNum = 1;
            //self.$title.show();
            

            if(self.args.showCollrect){
                self.$searchResult.children().eq(0).hide();
                //返回我收藏的商品列表
                self.isCollrect = true;
                self.$collrectTitle.show();
                self.defaultItem(self.pageNum,self.args.showCollrect); //默认输出收藏
            }
            /*else{
                self.$searchNormal.text('请搜索商品').show();
                // self.keyWord && self.moreItem(self.pageNum, self.keyWord); //默认输出商品                
            }*/
            

        }
    });

    this.$searchBtn.on('click.editor',function(){

        self.searchGoods(self.$searchInput);
    });

	this.$tabBtn.on('click.editor',function(){
        self.tab();
		
	})

    this.$getMore.on('click.editor',function() {
        if(self.isGetMore){
            return false;
        }

        $(this).html('<img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...');
        if (self.isCollrect) {
            self.$collrectTitle.show();
            self.defaultItem(self.pageNum,self.args.showCollrect);
        } else {
            self.$collrectTitle.hide();
            self.moreItem(self.pageNum, self.keyWord);
        }
    });

    this.$searchListBox.on('scroll.editor', function() {
        if (!self.isGetMore && self.$searchListBox.scrollTop() >= (self.$searchList.height() - self.$searchListBox.height())) {
            self.isGetMore = true;
            self.pageNum++;
            if (self.isCollrect) {
                self.defaultItem(self.pageNum,self.args.showCollrect);
            } else {
                self.moreItem(self.pageNum, self.keyWord);
            }
        }
    });
}

//ajax 
Normal.prototype.getItems=function(link,options){
    var self = this;
    var _this = this;
    if(this.pageNum === 1){
        this.$searchList.hide();
        this.$searchFail.hide();
        this.$searchLoading.show();
        this.$searchNormal.hide();
    }else{
        this.$getMore.show().find('span').html(this.loadString);
    }
    fetch.get(link, {
        data: options.data
    }).done(function(result) {
        self.setLocalStorage(self.decription);
        self.rendersearchFrame();
        self.$searchLoading.hide();
        self.$searchItemTips.hide();

        if (result.code === 200) {
            var resultItem = result.data.collections === undefined ? result.data.items : result.data.collections;
            if ((!resultItem || resultItem.length === 0) && _this.isCollrect) {
                if (_this.pageNum === 1) {
                    if(_this.showCollrect){
                        _this.$searchNormal.show().text('暂无收藏的商品，可以搜索查找！');
                    }else{
                        _this.$searchNormal.show().text('暂无商品，可以搜索查找！');
                    }
                    
                } else {
                    _this.$getMore.show().find('span').text('没有可加载内容');
                }
            } else if (!resultItem || resultItem.length === 0) {
                if (_this.pageNum === 1) {
                    _this.$searchNormal.show().text('没有找到相关产品');
                    _this.$searchResult.children().eq(0).hide();
                } else {
                    _this.$getMore.show().find('span').text('没有可加载内容');
                }
            } else {
                _this.$searchResult.show().children().eq(0).show();
                _this.$searchList.show();
                options.done.call(this, result);
                _this.$getMore.show().find('span').text('加载更多');
                _this.isGetMore = false;

                if (resultItem.length < 10 && _this.pageNum !== 1) {

                    _this.isGetMore = true;
                    _this.$getMore.show().find('span').text('没有可加载内容');
                }
            }

            // 重新定位弹窗位置
            // addDialog.reset();

        } else if (result.code === 881001) {
            if (_this.pageNum === 1) {
               _this.$searchNormal.show().text('没有找到相关产品');
                _this.$searchResult.children().eq(0).hide();
            } else {
                _this.$getMore.show().find('span').text('没有可加载内容');
            }
        } else {
            if (_this.pageNum === 1) {
                _this.$searchFail.show();
            } else {
                _this.$getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
            }
        }
        return false;
    }).fail(function() {
        self.$searchItemTips.hide();
        if (self.pageNum === 1) {
            self.$searchFail.show();
        } else {
            self.$getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
        }
    }).always(function() {

        self.$searchLoading.hide();
    });
}

Normal.prototype.localStorageCallBack = function(value){
    var self = this;
    self.$history.html()
};

module.exports = Normal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(15)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery-ajaxTransport-XDomainRequest - v1.0.4 - 2015-03-05
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2015 Jason Moon (@JSONMOON)
 * Licensed MIT (/blob/master/LICENSE.txt)
 */
(function(factory) {
  if (true) {
    // AMD. Register as anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
}(function($) {

// Only continue if we're on IE8/IE9 with jQuery 1.5+ (contains the ajaxTransport function)
if ($.support.cors || !$.ajaxTransport || !window.XDomainRequest) {
  return $;
}

var httpRegEx = /^(https?:)?\/\//i;
var getOrPostRegEx = /^get|post$/i;
var sameSchemeRegEx = new RegExp('^(\/\/|' + location.protocol + ')', 'i');

// ajaxTransport exists in jQuery 1.5+
$.ajaxTransport('* text html xml json', function(options, userOptions, jqXHR) {

  // Only continue if the request is: asynchronous, uses GET or POST method, has HTTP or HTTPS protocol, and has the same scheme as the calling page
  if (!options.crossDomain || !options.async || !getOrPostRegEx.test(options.type) || !httpRegEx.test(options.url) || !sameSchemeRegEx.test(options.url)) {
    return;
  }

  var xdr = null;

  return {
    send: function(headers, complete) {
      var postData = '';
      var userType = (userOptions.dataType || '').toLowerCase();

      xdr = new XDomainRequest();
      if (/^\d+$/.test(userOptions.timeout)) {
        xdr.timeout = userOptions.timeout;
      }

      xdr.ontimeout = function() {
        complete(500, 'timeout');
      };

      xdr.onload = function() {
        var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
        var status = {
          code: 200,
          message: 'success'
        };
        var responses = {
          text: xdr.responseText
        };
        try {
          if (userType === 'html' || /text\/html/i.test(xdr.contentType)) {
            responses.html = xdr.responseText;
          } else if (userType === 'json' || (userType !== 'text' && /\/json/i.test(xdr.contentType))) {
            try {
              responses.json = $.parseJSON(xdr.responseText);
            } catch(e) {
              status.code = 500;
              status.message = 'parseerror';
              //throw 'Invalid JSON: ' + xdr.responseText;
            }
          } else if (userType === 'xml' || (userType !== 'text' && /\/xml/i.test(xdr.contentType))) {
            var doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = false;
            try {
              doc.loadXML(xdr.responseText);
            } catch(e) {
              doc = undefined;
            }
            if (!doc || !doc.documentElement || doc.getElementsByTagName('parsererror').length) {
              status.code = 500;
              status.message = 'parseerror';
              throw 'Invalid XML: ' + xdr.responseText;
            }
            responses.xml = doc;
          }
        } catch(parseMessage) {
          throw parseMessage;
        } finally {
          complete(status.code, status.message, responses, allResponseHeaders);
        }
      };

      // set an empty handler for 'onprogress' so requests don't get aborted
      xdr.onprogress = function(){};
      xdr.onerror = function() {
        complete(500, 'error', {
          text: xdr.responseText
        });
      };

      if (userOptions.data) {
        postData = ($.type(userOptions.data) === 'string') ? userOptions.data : $.param(userOptions.data);
      }
      xdr.open(options.type, options.url);
      xdr.send(postData);
    },
    abort: function() {
      if (xdr) {
        xdr.abort();
      }
    }
  };
});

return $;

}));

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var template=__webpack_require__(1);
module.exports=template('src/goods/tpl/itemContent',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,itemlist=$data.itemlist,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,indexof=$data.indexof,changedList=$data.changedList,shopTag=$data.shopTag,$string=$utils.$string,$out='';$each(itemlist,function($value,$index){
$out+=' <dl class="merchant-item clearfix ';
$out+=$escape((indexof(changedList,$value.skuId) !== -1 ? 'chosed-mer-true':''));
$out+='" data-action="item" data-pId="';
$out+=$escape($value.pId);
$out+='" data-link="';
$out+=$escape($value.sUrl);
$out+='" data-skuId="';
$out+=$escape($value.skuId);
$out+='" ';
if(shopTag > 0 ){
$out+=' data-rec-shoptag="1" data-identification=';
$out+=$escape($value.identification);
$out+=' ';
}
$out+=' > <dt><img src=';
$out+=$escape($value.mainImage);
$out+=' alt="11111" onerror="imgError(this)"></dt> <dd> <h4 node-data="itemTitle">';
$out+=$string($value.name);
$out+='</h4> <span class="itemPrice"><em>￥</em><span node-data="itemPrice">';
$out+=$escape($value.salePrice !== null?$value.salePrice:'暂无售价');
$out+='</span></span> <!-- ';
if($value.rebateMoney > 0){
$out+=' <div class="fan fan-s"> <em class="icon-fan-s"></em> <span>最高返';
$out+=$escape($value.rebateMoney);
$out+='国美币</span> </div> ';
}
$out+=' --> </dd> </dl> ';
});
$out+=' ';
return new String($out);
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

function checkEnvPath(){
    var envPath;
    switch({"_":[],"help":false,"version":false,"config":"bin/dist.webpack.config.js","$0":"node_modules\\_webpack@3.10.0@webpack\\bin\\webpack.js"}.env){
        case 'mx-dev':
            envPath={
                jsDomain:'http://js.dev.meixincdnx.com:1314/',
                jspath:'http://js.dev.meixincdnx.com:1314/CDN8053/dist',
                csspath:'http://js.dev.meixincdnx.com:1314/CDN8053/dist',
                imgpath:'http://js.dev.meixincdnx.com:1314/CDN8053/dist'
            }
            break;
        case 'mx-pre':
            envPath = {
                jsDomain:'http://js.dev.meixincdn.com/',
                jspath:'http://js.dev.meixincdn.com/m/editor/dist',
                csspath:'http://js.dev.meixincdn.com/m/editor/dist',
                imgpath:'http://js.dev.meixincdn.com/m/editor/dist'
            }
            break;
        default:
            envPath = {
                jsDomain:'http://js.dev.meixincdn.com/',
                jspath:'http://js.dev.meixincdn.com/m/editor/dist',
                csspath:'http://js.dev.meixincdn.com/m/editor/dist',
                imgpath:'http://js.dev.meixincdn.com/m/editor/dist'
            }
            break;
    }

    return envPath;
}
module.exports = checkEnvPath();

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/*
    create by linfei
    2017/12/10
*/

var dialog = __webpack_require__(3);
var fetch = __webpack_require__(8);
var Pubsub = __webpack_require__(6);
var indexof = __webpack_require__(2);
var alert = __webpack_require__(4);
var commFunc = __webpack_require__(5);
var isEmptyObject = commFunc.isEmptyObject;
var reWrap = commFunc.reWrap;

//搜索条
var searchBar = __webpack_require__(9);

//我的收藏
var collrectTpl = __webpack_require__(10);
// var collrectTpl = require('../tpl/meidianSearch/collrect.tpl');
//搜索商品
var searchBoxTpl = __webpack_require__(11);
//商品列表
var defaultItemlist = __webpack_require__(7);

var Card = __webpack_require__(12);

var loadString = '';

//----------------------------------子类  我的美店选项卡------//
var Myshop = function(args,active){
	Card.call(this,args);
	this.obj = null;
	this.args = args;
	this.active = active;

    //------------------搜索条相关------------------
    this.$searchBarBox = null;    //搜索容器
    this.$searchInput =null; //搜索框
    this.$searchBtn = null;  //搜索按钮
    this.keyWord = '';  //保存上次按下回车的数据
    this.searchItemTips = '';   //默认没有我的收藏页面出现的提示

	//tab按钮
	this.tabBtn = null;
	//tab内容
	this.tabContent = null;
    //我的收藏标题
    this.$collrectTitle = null;

	this.link = args.myShop;
    this.$nodeTab = $('[data-node="coll"]');
    this.noItemsContent = "美店中暂无商品，可在好货推荐中添加！";
	this.init();
};


;(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Card.prototype;
  //将实例作为子类的原型
  Myshop.prototype = new Super();
})();

Myshop.prototype.constructor = Myshop;


Myshop.prototype.init = function(){
    this.initGlobal();
	this.getGlobalNode();
    //渲染搜索条
    // this.renderSearchBar();
	this.renderTabTitle('我的美店');
	this.renderTabContent();
    //寻找节点
    this.getSelfNode();
     //展示我的美店  默认激活才发请求
    if(this.active) { this.fetchMyShop() };
    //绑定事件
    this.changeItem();
	this.bindEvent();
    loadString = '<img src="' + this.args.imgpath + '/images/public/loading.gif">正在加载...';
}

Myshop.prototype.getSelfNode = function(){        
    this.$searchInput = this.$searchBarContainer.find('[data-action="addSearchInput"]');
    this.$searchBtn = this.$searchBarContainer.find('[data-action="addSearchBtn"]');
    this.$searchItemTips = this.$tabContentContainer.find('[data-node="search-item-tips"]');

    var obj = this.$obj = this.$tabContent;
    //提示信息------------------------------------------
    this.$searchNormal = obj.find('[data-node="searchNormal"]');
    this.$searchLoading = obj.find('[data-node="searchLoading"]');
    this.$searchFail = obj.find('[data-node="searchFail"]');
    //盒子内容-----------------------------------------
    this.$collrectTitle = obj.find('[data-node="title"]');

    this.$searchResult = obj.find('[data-node="searchResultBox"]');
    this.$searchList = obj.find('[data-node="searchResultList"]');
    this.$searchListBox = this.$searchList.parent();
    //小图标区域
    this.$changeList = $listBox.find('[data-node="searchChangeList"]');
    //更多按钮
    this.$getMore = obj.find('[data-action="moreItem"]');
    this.nodeName = obj.attr('data-node');

}
Myshop.prototype.fetchMyShop = function(){
    var self = this;
    this.getItems(this.args.myShop, {
        data: {
            page: self.pageNum,
            pagesize: 10
        },
        done: function(result) {
            var html = defaultItemlist({
                itemlist: result.items,
                changedList: self.args.changedList,
                indexof: indexof
            });
            if (self.pageNum === 1) {
                self.$searchList.html(html);
            } else {
                self.$searchList.append(html);
            }
        }
    });
}


Myshop.prototype.renderTabContent=function(){
	var args = this.args;
	var searchBox = searchBoxTpl({
		returnList:args.returnList,
		imgSrc:args.imgpath
	}); 
    var $li = $('<li class="tab-content"></li>');
    $li.append(searchBox);

    this.$tabContent = $li;
	this.$tabContentContainer.append($li);

    if(this.active){
       this.$tabContent.addClass('show');
    }
    //this.searchBox = this.args.$tabContentGoods.find('[data-node="searchResultBox"]');
    //console.log(this.searchBox,21)
}



Myshop.prototype.bindEvent = function(){
	var self = this;

    this.$tabBtn.on('click',function(){
        self.pageNum = 1;
        self.$tabContent.addClass('show').siblings().removeClass('show');
        self.fetchMyShop();

    })


    this.$getMore.on('click ',function() {
        if(self.isGetMore){
            return false;
        }

        $(this).html(self.loadString);
        if (self.isCollrect) {
            self.$collrectTitle.show();
            self.defaultItem(self.pageNum,self.args.showCollrect);
        } else {
            self.$collrectTitle.hide();
            self.moreItem(self.pageNum, self.keyWord);
        }
    });

    this.$searchListBox.on('scroll', function() {     
        if (!self.isGetMore && self.$searchListBox.scrollTop() >= (self.$searchList.height() - self.$searchListBox.height())) {
            self.isGetMore = true;
            self.pageNum++;
            self.moreItem(self.pageNum);
        }
    });
}

//ajax 
Myshop.prototype.getItems=function(link,options){
    var self = this;
    var _this = this;
    if(this.pageNum === 1){
        this.$searchList.hide();
        this.$searchFail.hide();
        this.$searchLoading.show();
        this.$searchNormal.hide();
    }else{
        this.$getMore.show().find('span').html(this.loadString);
    }

    fetch.get(link, {
        data: options.data
    }).done(function(result) {
        self.$searchLoading.hide();
        self.$searchItemTips.hide();

        var items = result.items;

        if(!items){
            if (self.pageNum !== 1){
                self.$getMore.show().find('span').text(self.noMoreContent);
            }else{
                self.$searchNormal.text(self.noItemsContent).show();
                self.$searchItemTips.show();
            }
            self.isGetMore = true;
            return false;
        }else{
            //result = reWrap(result);
            self.$searchResult.show().children().eq(0).show();
            self.$searchList.show();
            options.done.call(this, result);
            self.$getMore.show().find('span').text('加载更多');
            self.isGetMore = false;

            if(items.length < 10 ){
                self.$getMore.show().find('span').text(self.noMoreContent);
                self.isGetMore = true;
                return false;
            }
        
        }


        /*if (result.items.length < 10 && _this.pageNum !== 1) {

            _this.isGetMore = true;
            _this.$getMore.show().find('span').text('没有可加载内容');
        }*/
        return false;

        /*if (result.code === 200) {
            var resultItem = result.data.collections === undefined ? result.data.items : result.data.collections;
            if ((!resultItem || resultItem.length === 0) && _this.isCollrect) {
                if (_this.pageNum === 1) {
                    if(_this.showCollrect){
                        _this.$searchNormal.show().text('暂无收藏的商品，可以搜索查找！');
                    }else{
                        _this.$searchNormal.show().text('暂无商品，可以搜索查找！');
                    }
                    
                } else {
                    _this.$getMore.show().find('span').text('没有可加载内容');
                }
            } else if (!resultItem || resultItem.length === 0) {
                if (_this.pageNum === 1) {
                    _this.$searchNormal.show().text('没有找到相关产品');
                    _this.$searchResult.children().eq(0).hide();
                } else {
                    _this.$getMore.show().find('span').text('没有可加载内容');
                }
            } else {
                _this.$searchResult.show().children().eq(0).show();
                _this.$searchList.show();
                options.done.call(this, result);
                _this.$getMore.show().find('span').text('加载更多');
                _this.isGetMore = false;

                if (resultItem.length < 10 && _this.pageNum !== 1) {

                    _this.isGetMore = true;
                    _this.$getMore.show().find('span').text('没有可加载内容');
                }
            }

            // 重新定位弹窗位置
            // addDialog.reset();

        } else if (result.code === 881001) {
            if (_this.pageNum === 1) {
               _this.$searchNormal.show().text('没有找到相关产品');
                _this.$searchResult.children().eq(0).hide();
            } else {
                _this.$getMore.show().find('span').text('没有可加载内容');
            }
        } else {
            if (_this.pageNum === 1) {
                _this.$searchFail.show();
            } else {
                _this.$getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
            }
        }*/
        
    }).fail(function() {
        self.$searchItemTips.hide();
        if (self.pageNum === 1) {
            self.$searchFail.show();
        } else {
            self.$getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
        }
    }).always(function() {

        self.$searchLoading.hide();
    });
}


module.exports = Myshop;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/*
    create by linfei
    2017/12/10
*/

var dialog = __webpack_require__(3);
var fetch = __webpack_require__(8);
var Pubsub = __webpack_require__(6);
var indexof = __webpack_require__(2);
var alert = __webpack_require__(4);
var commFunc = __webpack_require__(5);
var isEmptyObject = commFunc.isEmptyObject;
var reWrap = commFunc.reWrap;

var loop = function(){};
//搜索条
var searchBar = __webpack_require__(9);
var searchListTpl = __webpack_require__(16);
//我的收藏
var collrectTpl = __webpack_require__(10);
// var collrectTpl = require('../tpl/meidianSearch/collrect.tpl');
//搜索商品
var searchBoxTpl = __webpack_require__(11);
//搜索店铺
var searchShopTpl = __webpack_require__(56);

//商品列表
var defaultItemlist = __webpack_require__(7);

var Card = __webpack_require__(12);

//----------------------------------子类  我的美店选项卡------//
var Normal = function(args,active){
    Card.call(this,args);
    this.obj = null;
    this.args = args;
    this.active = active;

    //------------------搜索条相关------------------
    this.$searchBarBox = null;    //搜索容器
    this.$searchInput =null; //搜索框
    this.$searchBtn = null;  //搜索按钮
    this.keyWord = '';  //保存上次按下回车的数据
    this.searchItemTips = '';   //默认没有我的收藏页面出现的提示

    //tab按钮
    this.tabBtn = null;
    //tab内容
    this.tabContent = null;
    //我的收藏标题
    this.$collrectTitle = null;

    this.link = args.getShopItem;
    this.$shopBox = null;
    this.noItemsContent = "美店中暂无商品，可在好货推荐中添加！";
    this.decription = 'shopGoods';
    this.searchBarText = '搜索商品';
    this.init();
};


;(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Card.prototype;
  //将实例作为子类的原型
  Normal.prototype = new Super();
})();

Normal.prototype.constructor = Normal;


Normal.prototype.init = function(){
    this.initGlobal();
    this.getGlobalNode();
    //加载localstorage
    this.loadStorage();
    //渲染搜索条
    this.renderSearchBar();
    this.renderTabTitle('美店商品');
    this.renderTabContent();
    //寻找节点
    this.getSelfNode();
    //展示我的收藏
    if(this.args.showCollrect){
        this.showCollrect()
    } 

    
    //绑定事件
    this.bindGlobalEvent();
    this.bindEvent();
    
}

Normal.prototype.getSelfNode = function(){  
   
    this.$searchInput = this.$searchBar.find('[data-action="addSearchInput"]');
    this.$searchBtn = this.$searchBar.find('[data-action="addSearchBtn"]');
    this.$history = this.$searchBar.find('[data-node="history"]');
    this.$searchItemTips = this.$tabContent.find('[data-node="search-item-tips"]');
    
    var obj = this.$obj = this.$tabContent;
    //提示信息------------------------------------------
    this.$searchNormal = obj.find('[data-node="searchNormal"]');
    this.$searchLoading = obj.find('[data-node="searchLoading"]');
    this.$searchFail = obj.find('[data-node="searchFail"]');
    //盒子内容-----------------------------------------
    this.$collrectTitle = obj.find('[data-node="title"]');
    //美店
    this.$shopBox = obj.find('[data-node="shop-box"]');
    this.$shopImg = this.$shopBox.find('img');
    this.$shopName = this.$shopBox.find('span');
    this.$shopBoxInput  = this.$shopBox.find('input');
    this.$shopBtn = this.$shopBox.find('em');

    //搜索商品结果
    this.$searchResult = obj.find('[data-node="searchResultBox"]');
    this.$searchList = obj.find('[data-node="searchResultList"]');

    this.$searchListBox = this.$searchList.parent();
    //小图标区域
    this.$changeList = $listBox.find('[data-node="searchChangeList"]');
    //更多按钮
    this.$getMore = obj.find('[data-action="moreItem"]');
    this.nodeName = obj.attr('data-node');

}
Normal.prototype.showCollrect = function(){
    var self = this;
    this.getItems(this.args.showCollrect, {
        data: {
            page: self.pageNum,
            pagesize: 10
        },
        done: function(result) {
            var html = defaultItemlist({
                itemlist: result.data.items,
                changedList: self.args.changedList,
                indexof: indexof
            });
            if (self.pageNum === 1) {
                self.$searchList.html(html);
            } else {
                self.$searchList.append(html);
            }
        }
    });
}

Normal.prototype.rendersearchFrame = function(){
    this.$historyFrame = $( searchListTpl({'list':this.localStorage}) );
    this.$history.html(this.$historyFrame);
}


Normal.prototype.renderSearchBar = function(){
    
    this.$searchBar = $(searchBar({title:this.searchBarText}));
    this.$searchBarContainer.append(this.$searchBar);
    this.$historyFrame = $( searchListTpl({'list':this.localStorage}) );
    this.$searchBar.find('[data-node="history"]').append(this.$historyFrame);

    if(!this.active){
        this.$searchBar.hide();
    }

   // this.$history.html(string).show();


    this.$searchBarContainer.addClass('show');
}


Normal.prototype.renderTabContent=function(){
    var args = this.args;
    var coll = collrectTpl({
        showCollrect:args.showCollrect,
        // showCollrect:1,
        imgSrc:args.imgpath
    });

    var searchShop = searchShopTpl({
        shopImg: '',
        shopName: '',
        shopTip: '搜索商品名称'
    });

    var searchBox = searchBoxTpl({
        returnList:args.returnList,
        imgSrc:args.imgpath
    }); 
    var $li = $('<li class="tab-content shops-good"></li>');
    $li.append(coll);
    $li.append(searchShop);
    $li.append(searchBox);

    this.$tabContent = $li;
    this.$tabContentContainer.append($li);

    if(this.active){
        this.$tabContent.addClass('show');
    }

    if(!args.showCollrect){
        this.$tabContent.find('[data-node="searchNormal"]').show();
    }
}

Normal.prototype.loadStorage = function(){
    this.localStorage = this.getLocalStorage(this.decription);
}

Normal.prototype.bindEvent = function(){
    var self = this;

    //-----------处理搜索记录用-------------//
    $(window).on('click.editor',function(e){
        var $parent = $(e.target).parents('[data-node="addTopBox"]') ;
        if(!$parent.length){
            self.$history.removeClass('show');
        }
    })

    self.$searchBtn.on('click.editor',function(e){
        self.$history.removeClass('show');
    })
    self.$shopBtn.on('click.editor',function(e){
        self.searchGoods(self.$shopBtn);
    })

    self.$searchInput.on('focus.editor',function(e){   
        var _story = self.getLocalStorage();
        self.$history.addClass('show');
    })

    self.$history.on('blur.editor',function(e){      
        self.$history.removeClass('show');
    })

    self.$history.on('click.editor','span',function(e){
        var text = $(this).text()
        self.$searchInput.val(text);
        self.$history.removeClass('show');
    })

    self.$history.on('mouseover.editor','p',function(e){
        $(this).find('b').addClass('show') 
    })
    self.$history.on('mouseout.editor','p',function(e){
        $(this).find('b').removeClass('show') 
    })
    self.$history.on('click.editor','b',function(e){
        var text = $(this).siblings('span').text();
        $(this).parents('dd').remove();
        var index = self.localStorage.indexOf(text);
        self.localStorage.splice(index,1);
        self.setLocalStorage(self.decription,true);
    })

    //---------------------------------------------//



    self.$searchInput.on('keyup.editor', function(e) {

        var keycode = e.which;
        self.isCollrect = false;
        self.isGetMore = false;

        //处理回车的情况
        var keyWord = $.trim(self.$searchInput.val());

        if (keycode === 13) {
            if (keyWord !== '') {
                if (keyWord.length < 2) {
                    alert('请输入两个字符以上关键词');
                } else {
                    self.keyWord = keyWord;
                    self.pageNum = 1;
                    self.$collrectTitle.hide();
                    self.$searchItemTips.hide();
                    self.$getMore.find('span').html(self.loadString);
                    //self.moreItem(self.pageNum, keyWord);
                    self.showShop(keyWord);
                    console.log(keyWord,9999)
                }
            } else {
                alert('请输入关键词');
            }
            self.$history.removeClass('show');
            return false;
        }

        

        /*if (keyWord === '') {
            self.$searchResult.children().eq(0).hide();
            self.pageNum = 1;
            //self.$title.show();
            

            if(self.args.showCollrect){
                //返回我收藏的商品列表
                self.isCollrect = true;
                self.$collrectTitle.show();
                self.defaultItem(self.pageNum,self.args.showCollrect); //默认输出收藏
            }else{
                self.keyWord && self.moreItem(self.pageNum, self.keyWord); //默认输出商品                
            }
            

        }*/
    });

    // this.$searchBtn.on('click',self.searchGoods);
    this.$searchBtn.on('click.editor',function(){
        self.searchShop(self.$searchInput);
    });

    this.$tabBtn.on('click.editor',function(){
        self.tab();

        
    })

    this.$getMore.on('click.editor ',function() {
        if(self.isGetMore){
            return false;
        }

        $(this).html('<img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...');
        if (self.isCollrect) {
            self.$collrectTitle.show();
            self.defaultItem(self.pageNum,self.args.showCollrect);
        } else {
            self.$collrectTitle.hide();
            self.moreItem(self.pageNum, self.keyWord);
        }
    });

    this.$searchListBox.on('scroll.editor', function() {
        if (!self.isGetMore && self.$searchListBox.scrollTop() >= (self.$searchList.height() - self.$searchListBox.height())) {
            self.isGetMore = true;
            self.pageNum++;
            if (self.isCollrect) {
                self.defaultItem(self.pageNum,self.args.showCollrect);
            } else {
                self.moreItem(self.pageNum, self.keyWord);
            }
        }
    });
}

//ajax 
Normal.prototype.getItems=function(link,options){
    var self = this;
    var _this = this;
    if(this.pageNum === 1){
        this.$searchList.hide();
        this.$searchFail.hide();
        this.$searchLoading.show();
        this.$searchNormal.hide();
    }else{
        this.$getMore.show().find('span').html(this.loadString);
    }

    fetch.get(link, {
        data: options.data
    }).done(function(result) {
        self.setLocalStorage(self.decription);
        self.rendersearchFrame();
        self.$searchLoading.hide();
        self.$searchItemTips.hide();

        self.renderPicsNum();
        if (result.code === 200) {
            var resultItem = result.data.collections === undefined ? result.data.items : result.data.collections;
            if ((!resultItem || resultItem.length === 0) && _this.isCollrect) {
                if (_this.pageNum === 1) {
                    if(_this.showCollrect){
                        _this.$searchNormal.show().text('暂无收藏的商品，可以搜索查找！');
                    }else{
                        _this.$searchNormal.show().text('暂无商品，可以搜索查找！');
                    }
                    
                } else {
                    _this.$getMore.show().find('span').text('没有可加载内容');
                }
            } else if (!resultItem || resultItem.length === 0) {
                if (_this.pageNum === 1) {
                    _this.$searchNormal.show().text('没有找到相关产品');
                    _this.$searchResult.children().eq(0).hide();
                } else {
                    _this.$getMore.show().find('span').text('没有可加载内容');
                }
            } else {
                _this.$searchResult.show().children().eq(0).show();
                _this.$searchList.show();
                options.done.call(this, result);
                _this.$getMore.show().find('span').text('加载更多');
                _this.isGetMore = false;

                if (resultItem.length < 10 && _this.pageNum !== 1) {

                    _this.isGetMore = true;
                    _this.$getMore.show().find('span').text('没有可加载内容');
                }
            }

            // 重新定位弹窗位置
            // addDialog.reset();

        } else if (result.code === 881001) {
            if (_this.pageNum === 1) {
               _this.$searchNormal.show().text('没有找到相关产品');
                _this.$searchResult.children().eq(0).hide();
            } else {
                _this.$getMore.show().find('span').text('没有可加载内容');
            }
        } else {
            if (_this.pageNum === 1) {
                _this.$searchFail.show();
            } else {
                _this.$getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
            }
        }
        return false;
    }).fail(function() {
        self.$searchItemTips.hide();
        if (self.pageNum === 1) {
            self.$searchFail.show();
        } else {
            self.$getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
        }
    }).always(function() {

        self.$searchLoading.hide();
    });
}



//搜索店铺
Normal.prototype.searchShop = function(){
    var self = this;      
    this.isCollrect = false;
    this.isGetMore = false;
    var keyWord = $.trim(self.$searchInput.val());

    if (keyWord !== '') {
        if (keyWord.length < 2) {
            alert('请输入两个字符以上关键词');
        } else {
            self.$getMore.find('span').html(self.loadString);
            self.pageNum = 1;
            self.$collrectTitle.hide();
            //self.moreItem(self.pageNum, keyWord);
            //显示店铺
            self.showShop(keyWord);
        }
    } else {
        alert('请输入关键词');
    }
}

//搜索商品
Normal.prototype.searchGoods = function(){
    var self = this;       
    this.isCollrect = false;
    this.isGetMore = false;
    var keyWord = $.trim(self.$shopBoxInput.val());

    if (keyWord !== '') {
        if (keyWord.length < 2) {
            alert('请输入两个字符以上关键词');
        } else {
            self.$getMore.find('span').html(self.loadString);
            self.pageNum = 1;
            self.$collrectTitle.hide();
            self.moreItem(self.pageNum, keyWord);
        }
    } else {
        alert('请输入关键词');
    }
}


//获取店铺
Normal.prototype.showShop=function(keyword){   
    var self = this;
    var data = {
        name: keyword,
    }
    // fetch.get(self.shopLink,{data:data})
    fetch.get(self.args.getShop,{data:data})
        .done(function(data){
            
            if(data.code == 200){

                if(data.data.mshops.length){
                    var result = data.data.mshops[0];
                    self.$shopBox.addClass('show');
                    self.$shopImg.attr('src',result.vshopIcon);
                    self.$shopName.text(result.vshopName);
                    self.vshopId = result.vshopId;                    
                    self.moreItem(1,'商品',{shopid:result.vshopId});
                }else{
                    self.$searchNormal.text('找不到该美店').show();
                }
                
            }else{
                self.$shopBox.removeClass('show');
                self.$searchResultList.hide();
                //self.$tabContent.html(data.msg);
            }
        })

}
module.exports = Normal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(15)))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var template=__webpack_require__(1);
module.exports=template('src/goods/tpl/shops/shops',function($data,$filename
/*``*/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,shopName=$data.shopName,shopTip=$data.shopTip,$out='';$out+='<div class="shop-box clearfix" data-node="shop-box"> <div class="img-wraper"> <img src=""/> </div> <span>';
$out+=$escape(shopName);
$out+='</span> <p> <input type="text" placeholder="';
$out+=$escape(shopTip);
$out+='" /><em data-node="search-shop-btn">搜本店</em> </p> </div>';
return new String($out);
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/*
    create by linfei
    2017/12/10
*/

var dialog = __webpack_require__(3);
var fetch = __webpack_require__(8);
var Pubsub = __webpack_require__(6);
var indexof = __webpack_require__(2);
var alert = __webpack_require__(4);
var commFunc = __webpack_require__(5);
var isEmptyObject = commFunc.isEmptyObject;
var reWrap = commFunc.reWrap;

//搜索条
var searchBar = __webpack_require__(9);

//我的收藏
var collrectTpl = __webpack_require__(10);
// var collrectTpl = require('../tpl/meidianSearch/collrect.tpl');
//搜索商品
var searchBoxTpl = __webpack_require__(11);
//商品列表
var defaultItemlist = __webpack_require__(7);

var Card = __webpack_require__(12);


//----------------------------------子类  我的美店选项卡------//
var Recomment = function(args,active){
    Card.call(this,args);
    this.obj = null;
    this.args = args;
    this.active = active;

    //------------------搜索条相关------------------

    //tab按钮
    this.tabBtn = null;
    //tab内容
    this.tabContent = null;
    //我的收藏标题
    this.$collrectTitle = null;

    this.link = args.recomment;
    this.$nodeTab = $('[data-node="coll"]');
    this.noItemsContent = "美店中暂无商品，可在好货推荐中添加！";
    //存放返回result的地方 因为数据是一次推送过来的
    this.goodsArray = null; 
    this.init();
};


;(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Card.prototype;
  //将实例作为子类的原型
  Recomment.prototype = new Super();
})();

Recomment.prototype.constructor = Recomment;


Recomment.prototype.init = function(){
    this.initGlobal();
    this.getGlobalNode();
    //渲染搜索条
    // this.renderSearchBar();
    this.renderTabTitle('推荐商品');
    this.renderTabContent();
    //寻找节点
    this.getSelfNode();
     //展示我的美店  默认激活才发请求
    if(this.active) { this.fetchRecomment() };
    //绑定事件
    this.changeItem();
    this.bindEvent();
    
}

Recomment.prototype.getSelfNode = function(){        

    var obj = this.$obj = this.$tabContent;
    //提示信息------------------------------------------
    this.$searchNormal = obj.find('[data-node="searchNormal"]');
    this.$searchLoading = obj.find('[data-node="searchLoading"]');
    this.$searchFail = obj.find('[data-node="searchFail"]');
    //盒子内容-----------------------------------------
    this.$collrectTitle = obj.find('[data-node="title"]');

    this.$searchResult = obj.find('[data-node="searchResultBox"]');
    this.$searchList = obj.find('[data-node="searchResultList"]');
    this.$searchListBox = this.$searchList.parent();
    //小图标区域
    this.$changeList = $listBox.find('[data-node="searchChangeList"]');
    //更多按钮
    this.$getMore = obj.find('[data-action="moreItem"]');
    this.nodeName = obj.attr('data-node');

}
Recomment.prototype.fetchRecomment = function(){
    var self = this;
    this.getItems(this.args.recomment, {
        data: {
            page: self.pageNum,
            pagesize: 10
        },
        done: function(result) {

            self.goodsArray = result;

            var _arr = [];
            for(var i = 0;i< Math.min(10,result.items.length);i++){

                _arr.push(result.items[i]);
            }

            var html = defaultItemlist({
                itemlist: _arr,
                changedList: self.args.changedList,
                indexof: indexof
            });

            if (self.pageNum === 1) {
                self.$searchList.html(html);
            } else {
                self.$searchList.append(html);
            }
        }
    });
}



Recomment.prototype.renderTabContent=function(){
    var args = this.args;
    var searchBox = searchBoxTpl({
        returnList:args.returnList,
        imgSrc:args.imgpath
    }); 
    var $li = $('<li class="tab-content"></li>');
    $li.append(searchBox);

    this.$tabContent = $li;
    this.$tabContentContainer.append($li);

    if(this.active){
        this.$tabContent.addClass('show');
    }
    //this.searchBox = this.args.$tabContentGoods.find('[data-node="searchResultBox"]');
    //console.log(this.searchBox,21)
}


Recomment.prototype.moreItem = function(){
    var self = this;
    if(self.isGetMore){
        return false;
    }
    result = self.goodsArray;
    

    /* var html = itemlist({
        itemlist: result.items,
        changedList: changedList,
        indexof: indexof
    });*/

    var num = (self.pageNum - 1) * 10;
    var MaxNum = num + 10;
    var _arr = [];


    for(var i = num;i < Math.min(MaxNum,result.items.length);i++){

        _arr.push(result.items[i]);
    }
    
    var html = defaultItemlist({
        itemlist: _arr,
        changedList: self.args.changedList,
        indexof: indexof
    });


    if(MaxNum >= result.items.length){

        self.$getMore.hide();
        self.isGetMore = true;
    }else{
        self.isGetMore = false;
    }

    self.$searchList.append(html);
    //self.pageNum++;

                /*if (result.pageCount != "1") {
                    
                }
                if (self.pageNum === 1) {
                    self.$searchList.html(html);
                } else {
                    self.$searchList.append(html);
                }*/

}

Recomment.prototype.bindEvent = function(){
    var self = this;

    this.$tabBtn.on('click',function(){
        self.pageNum = 1;
        self.$tabContent.addClass('show').siblings().removeClass('show');
        self.fetchRecomment();
    })

    this.$getMore.on('click ',function() {
        if(self.isGetMore){
            return false;
        }

        $(this).html(self.loadString);
        self.moreItem();
    });

    this.$searchListBox.on('scroll', function() {
     if (!self.isGetMore && self.$searchListBox.scrollTop() >= (self.$searchList.height() - self.$searchListBox.height())) {
            self.pageNum++;
            self.moreItem();
        }
    });
}

//ajax 
Recomment.prototype.getItems=function(link,options){
    var self = this;
    var _this = this;
    if(this.pageNum === 1){
        this.$searchList.hide();
        this.$searchFail.hide();
        this.$searchLoading.show();
        this.$searchNormal.hide();
    }else{
        this.$getMore.show().find('span').html(this.loadString);
    }

    fetch.get(link, {
        data: options.data
    }).done(function(result) {
        self.$searchLoading.hide();
        result = reWrap(result);
        var items = result.items;

        if(!items){
            if (self.pageNum !== 1){
                self.$getMore.show().find('span').text(self.noMoreContent);
            }else{
                self.$searchNormal.text(self.noItemsContent).show();
            }
            self.isGetMore = true;
            return false;
        }else{
            //result = reWrap(result);
            self.$searchResult.show().children().eq(0).show();
            self.$searchList.show();
            options.done.call(this, result);
            self.$getMore.show().find('span').text('加载更多');
            self.isGetMore = false;

            if(items.length < 10 ){
                self.$getMore.show().find('span').text(self.noMoreContent);
                self.isGetMore = true;
                return false;
            }
        
        }


        /*if (result.items.length < 10 && _this.pageNum !== 1) {

            _this.isGetMore = true;
            _this.$getMore.show().find('span').text('没有可加载内容');
        }*/
        return false;

        
        
    }).fail(function() {
        if (self.pageNum === 1) {
            self.$searchFail.show();
        } else {
            self.$getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
        }
    }).always(function() {

        self.$searchLoading.hide();
    });
}


module.exports = Recomment;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 58 */,
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
(function() {

// var single = require('./single');
// var multi = require('./multi');
var tabSearch = __webpack_require__(17);

module.exports = {
	// single:single,
	// multi:multi,
	tabSearch:tabSearch
}
}.call(window));

/***/ })
/******/ ]);
});