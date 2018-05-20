webpackJsonp([25],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var changeRatio = __webpack_require__(219);
	var validation = __webpack_require__(220);
	var talentPopup = __webpack_require__(221);
	
	changeRatio.init();
	validation.init();
	talentPopup.init();

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

/***/ 184:
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * 将str中的html符号转义,将转义“'，&，<，"，>”五个字符
	 * @method unhtml
	 * @param { String } str 需要转义的字符串
	 * @return { String } 转义后的字符串
	 * @example
	 * ```javascript
	 * var html = '<body>&</body>';
	 *
	 * //output: &lt;body&gt;&amp;&lt;/body&gt;
	 * console.log( UE.utils.unhtml( html ) );
	 *
	 * ```
	 */
	var unhtml = function unhtml(str, reg) {
	    return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
	        if (b) {
	            return a;
	        } else {
	            return {
	                '<': '&lt;',
	                '&': '&amp;',
	                '"': '&quot;',
	                '>': '&gt;',
	                "'": '&#39;'
	            }[a];
	        }
	    }) : '';
	};
	/**
	 * 将url中的html字符转义， 仅转义  ', ", <, > 四个字符
	 * @param  { String } str 需要转义的字符串
	 * @param  { RegExp } reg 自定义的正则
	 * @return { String }     转义后的字符串
	 */
	var unhtmlForUrl = function unhtmlForUrl(str, reg) {
	    return str ? str.replace(reg || /[<">']/g, function (a) {
	        return {
	            '<': '&lt;',
	            '&': '&amp;',
	            '"': '&quot;',
	            '>': '&gt;',
	            "'": '&#39;'
	        }[a];
	    }) : '';
	};
	
	/**
	 * 将str中的转义字符还原成html字符
	 * @see UE.utils.unhtml(String);
	 * @method html
	 * @param { String } str 需要逆转义的字符串
	 * @return { String } 逆转义后的字符串
	 * @example
	 * ```javascript
	 *
	 * var str = '&lt;body&gt;&amp;&lt;/body&gt;';
	 *
	 * //output: <body>&</body>
	 * console.log( UE.utils.html( str ) );
	 *
	 * ```
	 */
	var html = function html(str) {
	    return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
	        return {
	            '&lt;': '<',
	            '&amp;': '&',
	            '&quot;': '"',
	            '&gt;': '>',
	            '&#39;': "'",
	            '&nbsp;': ' '
	        }[m];
	    }) : '';
	};
	
	module.exports = {
	    unhtml: unhtml,
	    unhtmlForUrl: unhtmlForUrl,
	    html: html
	};

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var init = {
		ratio: function ratio() {
			$(document).ready(function () {
				$(window).resize();
			});
			$(window).resize(function () {
				if ($(window).width() > 1360) {
					$('body').removeClass("wrap-box-S");
				} else {
					$('body').addClass("wrap-box-S");
				}
			});
		}
	};
	
	module.exports = {
		init: init.ratio
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var fetch = __webpack_require__(21);
	var urls = __webpack_require__(24);
	var checkLabelHtml = __webpack_require__(184);
	var toast = __webpack_require__(43).init;
	
	var initialize = {
		elements: {
			$talentname: '[data-node=talentname]',
			$talentmobile: '[data-node=talentmobile]',
			$talenttype: '[data-node=talenttype]',
			$talenttypediv: '[data-node=talenttypediv]',
			$talenttypepul: '[data-active=talenttypepul]',
			$talentsearch: '[data-node=talentsearch]',
			$talentlists: '[data-node=talentlists]',
			$talentarea: '[data-node=talentarea]',
			$talentareaKeyin: '[data-node=talentarea-keyin]',
			$talentcheck: '.talent-p-check',
			$talentuncheck: '.talent-p-uncheck',
			$talentsubmit: '.talent-p-submit'
		},
		data: {
			realName: '',
			mobile: '',
			categoryId: '',
			introduction: '',
			randStr: ''
		},
		timer: 0,
		agreeFlag: 1,
		init: function init() {
			var _this2 = this;
	
			this.touchIpt();
			this.countIpt();
			if ($GLOBAL_CONFIG['xm_tag'] == '1') {
				this.needFetchPull('get', 'expertCtgy', function (data) {
					$(_this2.elements.$talentsearch).append(data.data.expertCategories.map(function (item) {
						return '<li class="talentlists" data-id="' + item.id + '" data-node="talentlists">' + item.name + '</li>';
					}).join(""));
				});
			}
		},
		removeSpace: function removeSpace(val) {
			return val.replace(/\s+/gm, '');
		},
		needFetchPull: function needFetchPull(method, paths, successCallback, faultCallback) {
			fetch[method](urls.get(paths), {
				// xhr: () => {
				// 	var xhr = $.ajaxSettings.xhr();
				// if(this.onprogress && xhr.upload) {
				//   xhr.upload.addEventListener("progress" , this.onprogress, false);
				//   return xhr;
				// }
				// }
			}).done(function (data) {
				if (data.success === true) {
					successCallback && successCallback(data);
					// console.log(data);
				} else {
					faultCallback && faultCallback(data);
					console.log(data.message);
				}
			}).fail(function (error) {
				console.error(error);
			});
		},
		touchIpt: function touchIpt() {
			var _this = this;
			$(this.elements.$talentname).on('blur', function () {
				$(this).val(_this.removeSpace($(this).val()));
				if (/^[\u4E00-\u9FA5aa-zA-Z]{2,20}$/.test(_this.removeSpace($(this).val()))) {
					initialize.data.realName = _this.removeSpace($(this).val());
					$(this).nextAll('span').hide();
				} else {
					initialize.data.realName = '';
					$(this).nextAll('span').html('请输入真实姓名').show();
				}
			});
			$(this.elements.$talentmobile).on('blur', function () {
				$(this).val(_this.removeSpace($(this).val()));
				if (_this.removeSpace($(this).val()).length != 0) {
					if (/^1[3|4|5|7|8][0-9]{9}$/.test(_this.removeSpace($(this).val()))) {
						initialize.data.mobile = _this.removeSpace($(this).val());
						$(this).nextAll('span').hide();
					} else {
						initialize.data.mobile = '';
						$(this).nextAll('span').html('请输入正确的手机号码').show();
					}
				} else {
					initialize.data.mobile = '';
					$(this).nextAll('span').html('请输入手机号').show();
				}
			});
			$(this.elements.$talenttype).on('blur', function () {
				if ($(this).val().length != 0) {
					initialize.data.categoryId = $(this).val();
					$(this).nextAll('span').hide();
				} else {
					initialize.data.categoryId = '';
					$(this).nextAll('span').html('请选择达人类别').show();
				}
			});
			$(this.elements.$talentarea).on('blur', function () {
				if ($(this).val().length != 0) {
					if ($(this).val().length >= 2 && $(this).val().length <= 100) {
						initialize.data.introduction = $(this).val();
						$(this).nextAll('span').hide();
					} else {
						initialize.data.introduction = '';
						$(this).nextAll('span').html('请填写2--100个字符以内').show();
					}
				} else {
					$(this).nextAll('span').html('请填写个人介绍').show();
				}
			});
			$(this.elements.$talenttypediv).on('click', function (event) {
				if ($(event.target).attr('data-node') == 'talentlists') {
					$(_this.elements.$talentsearch).hide();
					$(_this.elements.$talenttype).nextAll('span').hide();
					$(_this.elements.$talenttype).attr('value', $(event.target).attr('data-id'));
					initialize.data.categoryId = $(_this.elements.$talenttype).val();
					// css('talenttype-font-color')
					$(this).parent().find('p').html($(event.target).text());
				} else {
					if ($(_this.elements.$talentsearch).is(":visible")) {
						$(_this.elements.$talentsearch).hide();
					} else {
						$(_this.elements.$talentsearch).show();
					}
				}
			});
			$(this.elements.$talenttypepul).on('click', function () {
				if ($(_this.elements.$talentsearch).is(":visible")) {
					$(_this.elements.$talentsearch).hide();
				} else {
					$(_this.elements.$talentsearch).show();
				}
			});
			$(this.elements.$talentarea).on('keyup', function () {
				$(_this.elements.$talentareaKeyin).html($(this).val().length);
			}).on('paste', function () {
				$(_this.elements.$talentareaKeyin).html($(this).val().length);
			}).on('cut', function () {
				$(_this.elements.$talentareaKeyin).html($(this).val().length);
			}).on('copy', function () {
				$(_this.elements.$talentareaKeyin).html($(this).val().length);
			});
			$(this.elements.$talentsearch).on('mouseover', function (event) {
				if ($(event.target).attr('data-node') == 'talentlists') {
					$(event.target).addClass('active');
				}
			}).on('mouseout', function (event) {
				if ($(event.target).attr('data-node') == 'talentlists') {
					$(event.target).removeClass('active');
				}
			});
			$(this.elements.$talentcheck).on('click', function () {
				$(this).hide();
				initialize.agreeFlag = 0;
				$(_this.elements.$talentuncheck).show();
			});
			$(this.elements.$talentuncheck).on('click', function () {
				$(this).hide();
				initialize.agreeFlag = 1;
				$(_this.elements.$talentcheck).show();
			});
			$(this.elements.$talentsubmit).on('click', function () {
				return _this.checkData(initialize.data);
			});
		},
		ajaxSubmit: function ajaxSubmit(paths) {
			/* 修改调用接口 */
			console.log(paths);
			var _this = this;
			fetch.post(urls.get(paths), {
				data: initialize.data
			}).done(function (data) {
				if (data.success === true && data.code == 200) {
					console.log(data);
					toast('申请达人成功', {
						callback: function callback() {
							//回跳到国美我的圈子
							window.location.href = $GLOBAL_CONFIG['i_domain'] + 'expert/index';
						}
					});
				} else {
					console.log(data.message);
					data.message = data.message ? data.message : '亲，您的手机网络不太顺畅喔～';
					toast(data.message, {
						callback: function callback() {
							//回跳到国美我的圈子
							window.location.href = $GLOBAL_CONFIG['i_domain'] + 'expert/index';
						}
					});
				}
			}).fail(function (error) {
				console.error(error);
				toast('亲，您的手机网络不太顺畅喔～');
			});
		},
		checkData: function checkData(data) {
			var _this = this;
			var flag = false;
			var flagArray = [];
			if (!initialize.agreeFlag) {
				toast('请同意《达人用户协议》');
			}
	
			if (/^[\u4E00-\u9FA5aa-zA-Z]{2,20}$/.test(_this.removeSpace($(_this.elements.$talentname).val()))) {
				initialize.data.realName = _this.removeSpace($(_this.elements.$talentname).val());
			} else {
				initialize.data.realName = '';
			}
			if (_this.removeSpace($(_this.elements.$talentmobile).val()).length != 0) {
				if (/^1[3|4|5|7|8][0-9]{9}$/.test(_this.removeSpace($(_this.elements.$talentmobile).val()))) {
					initialize.data.mobile = _this.removeSpace($(_this.elements.$talentmobile).val());
				} else {
					initialize.data.mobile = '';
				}
			} else {
				initialize.data.mobile = '';
			}
			if ($(_this.elements.$talenttype).val().length != 0) {
				initialize.data.categoryId = $(_this.elements.$talenttype).val();
			} else {
				initialize.data.categoryId = '';
			}
			if ($(_this.elements.$talentarea).val().length != 0) {
				if ($(_this.elements.$talentarea).val().length >= 2 && $(_this.elements.$talentarea).val().length <= 100) {
					initialize.data.introduction = $(_this.elements.$talentarea).val();
				} else {
					initialize.data.introduction = '';
				}
			} else {
				initialize.data.introduction = '';
			}
	
			initialize.data.randStr = $('#randStr').val();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var keys = _step.value;
	
					if (data[keys] != '') {
						flag = true;
						flagArray.push(flag);
					} else {
						this.checkAlert(keys);
						flag = false;
						flagArray.push(flag);
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
	
			if (flagArray.indexOf(false) != -1) {
				this.countIpt();
				return false;
			} else {
				if (initialize.agreeFlag) {
					clearInterval(this.timer);
					console.log($GLOBAL_CONFIG['apply']);
					if ($GLOBAL_CONFIG['apply'] == '0') {
						this.ajaxSubmit('postExpert');
					} else if ($GLOBAL_CONFIG['apply'] == '1') {
						this.ajaxSubmit('putExpert');
					}
				}
				return false;
			}
		},
		checkAlert: function checkAlert(keys) {
			switch (keys) {
				case 'realName':
					$(initialize.elements.$talentname).nextAll('span').show();
					break;
				case 'mobile':
					$(initialize.elements.$talentmobile).nextAll('span').show();
					break;
				case 'categoryId':
					$(initialize.elements.$talenttype).nextAll('span').show();
					break;
				case 'introduction':
					$(initialize.elements.$talentarea).nextAll('span').show();
					break;
			}
		},
		countIpt: function countIpt() {
			var _this = this;
			clearInterval(_this.timer);
			_this.timer = setInterval(function () {
				$(_this.elements.$talentarea).val() && $(_this.elements.$talentareaKeyin).html($(_this.elements.$talentarea).val().length);
			}, 80);
		}
	};
	module.exports = initialize;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var talentScroll = __webpack_require__(222);
	function init() {
	    var $manage = $('[data-node=manage]');
	    var $agreement = $('[data-node=agreement]');
	    var $applicationPopup = $('[data-node=application-popup]');
	    var $popupManage = $applicationPopup.find('[data-node=popup-manage]');
	    var $popupAgreement = $applicationPopup.find('[data-node=popup-agreement]');
	    $manage.on('click', function () {
	        $applicationPopup.show();
	        $popupManage.show();
	        talentScroll.init($popupManage);
	    });
	    $applicationPopup.find('[data-node=manage-close]').on('click', function () {
	        $applicationPopup.hide();
	        $popupManage.hide();
	    });
	    $agreement.on('click', function () {
	        $applicationPopup.show();
	        $popupAgreement.show();
	        talentScroll.init($popupAgreement);
	    });
	    $applicationPopup.find('[data-node=agreement-close]').on('click', function () {
	        $applicationPopup.hide();
	        $popupAgreement.hide();
	    });
	}
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var init = function init($els) {
	    /**
	     * 滚动条
	     */
	    var $cont = $els.find('[data-node="popup-cont"]');
	    var $wrap = $els.find('[data-node="popup-box"]');
	    var $scrollBar = $els.find('[data-node="bar"]');
	    var $wrapScrollBar = $els.find('[data-node="scroll_bar"]');
	    console.log($cont, $wrap, $scrollBar, $wrapScrollBar);
	    var $ch = $cont.height();
	    var $wh = $wrap.height();
	    //设置滚动按钮宽度
	    $scrollBar.height($wh * $wh / $ch);
	
	    var $sh = $scrollBar.height();
	    var disY = 0;
	    //滚动条拖动事件
	    $scrollBar.mousedown(function (event) {
	        disY = event.pageY - $(this).position().top;
	        if (this.setCapture) {
	            $(this).mousemove(function (event) {
	                fnChangePos(event.pageY - disY);
	            });
	            this.setCapture(); //设置捕获范围
	            $scrollBar.mouseup(function () {
	                $(this).unbind('mousemove mouseup');
	                this.releaseCapture(); //取消捕获范围
	            });
	        } else {
	            $(document).mousemove(function (event) {
	                fnChangePos(event.pageY - disY);
	            });
	            $(document).mouseup(function () {
	                $(document).unbind('mousemove mouseup');
	            });
	        }
	        return false;
	    });
	    function fnChangePos(data) {
	        if (data < 0) data = 0;else if (data > $wh - $sh) data = $wh - $sh;
	        $scrollBar.css('top', data);
	        $cont.css('top', -($ch - $wh) * data / ($wh - $sh));
	    }
	
	    //鼠标在滚动条上点击或滚动滚轮单次移动的距离
	    var cMoveDis = 160;
	    //滚动条单击事件注册
	    $wrapScrollBar.click(function (event) {
	        var relDisY = event.pageY - $(this).offset().top;
	        if (relDisY > $scrollBar.position().top + $sh) {
	            fnChangePos($scrollBar.position().top + cMoveDis);
	        } else if (relDisY < $scrollBar.position().top) {
	            fnChangePos($scrollBar.position().top - cMoveDis);
	        };
	    });
	    //阻止事件冒泡
	    $scrollBar.click(function (event) {
	        event.stopPropagation();
	    });
	
	    //滚动条鼠标滚轮事件注册
	    if ($wrap[0].addEventListener) {
	        //for firefox
	        $wrap[0].addEventListener("DOMMouseScroll", fnMouseWheel);
	    }
	    $wrap[0].onmousewheel = fnMouseWheel; // for other browser
	
	    //鼠标在滚动条上点击或滚动滚轮单次移动的距离
	    var sMoveDis = 30;
	    //鼠标滚轮事件处理函数
	    function fnMouseWheel(e) {
	        var evt = e || window.event;
	        var wheelDelta = evt.wheelDelta || evt.detail; //鼠标滚动值，可由此判断鼠标滚动方向
	        if (wheelDelta == -120 || wheelDelta == 3) fnChangePos($scrollBar.position().top + sMoveDis);else if (wheelDelta == 120 || wheelDelta == -3) fnChangePos($scrollBar.position().top - sMoveDis);
	        return false;
	    }
	};
	
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })

});
//# sourceMappingURL=talentApplication.js.map