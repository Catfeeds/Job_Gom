webpackJsonp([28],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	//删除话题
	__webpack_require__(232);
	//编辑校验话题是否被删除
	__webpack_require__(233);

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var Dialog = __webpack_require__(37);
	var noop = function noop() {};
	
	var create = function create(content, options) {
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
	    if (!options.title) {
	        title.css('borderBottom', 'none');
	    }
	    header.show();
	    d.show();
	    return d;
	};
	
	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var Dialog = __webpack_require__(37);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var toast = __webpack_require__(43).init;
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var confirm = __webpack_require__(64);
	
	var $releasedList = $('[data-node=releasedList]');
	var $noTopic = $('[data-node=noTopic]');
	
	if ($.cookie('scroll_top')) {
	    $(document).scrollTop($.cookie('scroll_top'));
	}
	//删除话题
	$releasedList.on('click', '[data-action=delTopic]', function () {
	    var $topicItem = $(this).parents('[data-node=topicItem]');
	    var topicId = $topicItem.data('topicid');
	    var groupId = $topicItem.data('groupid');
	    var da = {
	        "tid": topicId,
	        "gid": groupId
	    };
	    confirm('确认删除此条话题吗？', {
	        okCls: 'pc-btn pc-btnh35',
	        title: '提示',
	        ok: function ok() {
	            fetch.get(url.get('delTopic'), {
	                data: da
	            }).done(function (result) {
	                if (result.code == 200) {
	                    var scrollTop = $(document).scrollTop();
	                    $.cookie('scroll_top', scrollTop);
	                    toast('话题已删除！', {
	                        callback: function callback() {
	                            window.location.href = window.location;
	                        }
	                    });
	                } else if (result.code == 404) {
	                    toast(result.message, {
	                        callback: function callback() {
	                            window.location.href = window.location;
	                        }
	                    });
	                } else {
	                    toast(result.message);
	                }
	            });
	        }
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var alert = __webpack_require__(36);
	
	var $releasedList = $('[data-node=releasedList]');
	$releasedList.on('click', '[data-node=editorTopic]', function () {
	    var tid = $(this).parents('li').attr('data-topicId');
	    var _src = $(this).attr('data-src');
	    fetch.get(url.get('publishedDetail'), {
	        data: {
	            tid: tid
	        },
	        async: false
	    }).done(function (result) {
	        if (result.code == 200) {
	            window.open(_src, '_blank');
	        } else if (result.code == 404) {
	            alert(result.message, {
	                title: '提示',
	                ok: function ok() {
	                    window.location.href = window.location;
	                }
	            });
	        }
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })

});
//# sourceMappingURL=talent_released.js.map