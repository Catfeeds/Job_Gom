webpackJsonp([9],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * Created by dongyukuan on 2016/5/23.
	 */
	var initEvent=__webpack_require__(128);
	__webpack_require__(41);
	$('input').placeholder();
	initEvent();

	// 发送统计数据用
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('forgetPwd');
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

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

/***/ 62:
/***/ function(module, exports) {

	/**
	 * Created by dongyukuan on 2016/5/20.
	 * 参数：
	 *      num:从num开始倒计时
	 *      options:{onChange:倒计时过程中执行，onFinish:倒计时结束执行}
	 * 调用方式：new CountDown(num,{function onChange(num){},function onFinish(){}})
	 */
	var noop = function () {
	};
	var CountDown = function (count, options) {
	    this.onChange = options.onChange || noop;
	    this.onFinish = options.onFinish || noop;
	    this.count = count || 60;
	    this.start();
	};
	CountDown.prototype.start = function () {
	    var self = this;
	    setTimeout(function () {
	        self.onChange(self.count);
	        self.count--;
	        if (self.count <= 0) {
	            self.onFinish();
	        } else {
	            self.start();
	        }
	    }, 1000);
	};
	module.exports = CountDown;


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

/***/ 128:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/**
	 * Created by dongyukuan on 2016/5/23.
	 */
	var trim = __webpack_require__(47);
	var CountDown = __webpack_require__(62);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var toast = __webpack_require__(84).init;
	var inputTip = __webpack_require__(35);
	var limitLen = __webpack_require__(63);
	var check = __webpack_require__(48);
	__webpack_require__(41);

	var forgetPwdStepTwo = $('[data-node="forgetPwdStepTwo"]');
	var sendMsgBtn = forgetPwdStepTwo.find('[data-action="sendMsgBtn"]');
	var nextStep = forgetPwdStepTwo.find('[data-action="nextStep"]');
	var errorCode = forgetPwdStepTwo.find('[data-node="errorCode"]');
	var msgCode = forgetPwdStepTwo.find('[data-node="msgCode"]');
	var errorBorderCode = forgetPwdStepTwo.find('[data-node="errorBorderCode"]');

	var tel = forgetPwdStepTwo.find('[data-node="tel"]');
	var errorTel = forgetPwdStepTwo.find('[data-node="errorTel"]');
	var errorBorderTel = forgetPwdStepTwo.find('[data-node="errorBorderTel"]');

	var publicErrBox = forgetPwdStepTwo.find('[data-node=publicErrBox]');
	var publicErr = forgetPwdStepTwo.find('[data-node=publicErr]');

	var errCls = 'lg-form-error';
	var disabledCls = 'code-disabled';
	var noneCls = 'none';
	var flag = 1;
	var telVal;

	var passport_domain = $_CONFIG['passport_domain'];

	//验证手机号
	var checkTel = function() {
	    var telNum = tel.val();
	    var telTrueFalse = check.isMobileNum(telNum);
	    var ret = true;
	    if (!telNum) {
	        errorBorderTel.addClass(errCls);
	        errorTel.text(inputTip.tel.ept);
	        ret = false;
	    } else if (!telTrueFalse) {
	        errorBorderTel.addClass(errCls);
	        errorTel.text(inputTip.tel.err);
	        ret = false;
	    } else {
	        errorBorderTel.removeClass(errCls);
	        errorTel.text('');
	    }
	    return ret;
	};
	var limitTelLen = function() {
	    var len = (tel.val() + "").length;
	    if (len > 11) {
	        tel.val(limitLen(tel.val() + "", 11));
	    }
	};
	var telFoc = function() {
	    errorBorderTel.removeClass(errCls);
	    errorTel.text('');
	    publicErrBox.addClass(noneCls);
	    publicErr.text("");
	};
	var checkCode = function() {
	    var codeVal = msgCode.val();
	    var ret = 1;
	    if (!codeVal) {
	        errorBorderCode.addClass(errCls);
	        errorCode.text(inputTip.msgCode.tipEpt);
	        ret = 0;
	    } else if (!/^\d{6}$/.test(codeVal)) {
	        errorBorderCode.addClass(errCls);
	        errorCode.text(inputTip.msgCode.tipErr);
	        ret = 0;
	    } else {
	        ret = 1;
	    }
	    return ret;
	};
	var limitCodeLen = function() {
	    var len = (msgCode.val() + "").length;
	    if (len > 6) {
	        msgCode.val(limitLen(msgCode.val() + "", 6));
	    }
	};
	var codeFoc = function() {
	    errorBorderCode.removeClass(errCls);
	    errorCode.text("");
	    publicErrBox.addClass(noneCls);
	    publicErr.text("");
	};
	var sendMsg = function() {
	    var telFlag = checkTel();
	    if (!flag || !telFlag) {
	        return false;
	    }
	    telVal = tel.val();
	    var telData = {
	        "mobileOrEmail": telVal
	    };
	    fetch.post(url.get('sendMsgCodeV2'), {
	        "data": telData
	    }).then(function(data) {
	        if (data.success) {
	            if (data.data.isStoreUser) {
	                //增加toast提示，后跳转
	                toast('您是门店会员，将为您跳转至门店重置密码页', {
	                    callback: function() {
	                        location.href = passport_domain + '/shop/index';
	                    }
	                });
	                return false;
	            }
	            publicErrBox.addClass(noneCls);
	            publicErr.text("");
	            errorBorderCode.removeClass(errCls);
	            errorCode.text(inputTip.msgCode.tipSend).css("color", "#f95353");
	            new CountDown(60, {
	                onChange: function(num) {
	                    flag = 0;
	                    sendMsgBtn.text(num + inputTip.msgCode.btnAfterSend).addClass(disabledCls);
	                },
	                onFinish: function() {
	                    flag = 1;
	                    sendMsgBtn.text(inputTip.msgCode.btnDefault).removeClass(disabledCls);
	                }
	            });
	        } else {
	            publicErrBox.removeClass(noneCls);
	            publicErr.text(data.message);
	        }
	    });
	    //return false;
	};
	var submit = function() {
	    var code = msgCode.val();
	    var telNum = tel.val();
	    var telFlag = checkTel();
	    var codeFlag = checkCode();
	    if (!telFlag || !codeFlag) {
	        return false;
	    }
	    var msgCodeData = {
	        "verifycode": code,
	        "mobileOrEmail": telNum
	    };
	    fetch.post(url.get('checkCode'), {
	        "data": msgCodeData
	    }).then(function(data) {
	        if (data.success) {
	            errorBorderCode.removeClass(errCls);
	            errorCode.text("");
	            location.href = passport_domain + "/forgetpwd/step2";
	        } else {
	            publicErrBox.removeClass(noneCls);
	            publicErr.text(data.message);
	        }
	    });
	};

	function initEvent() {
	    msgCode.placeholder();
	    tel.placeholder();

	    tel.on({
	        blur: checkTel,
	        focus: telFoc,
	        keyup: limitTelLen
	    });
	    sendMsgBtn.on("click", sendMsg);
	    msgCode.on({
	        focus: codeFoc,
	        blur: checkCode,
	        keyup: limitCodeLen
	    });
	    nextStep.on("click", submit);
	}
	module.exports = initEvent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }

});