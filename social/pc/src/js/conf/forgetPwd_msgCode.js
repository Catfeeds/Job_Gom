webpackJsonp([10],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * Created by dongyukuan on 2016/5/23.
	 */
	var initEvent = __webpack_require__(167);
	__webpack_require__(46);
	$('input').placeholder();
	initEvent();

	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('forgetPwd');
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 64:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by dongyukuan on 2016/5/20.
	 */
	var obj = {
	    checkVal: function checkVal(val, pattern) {
	        return pattern.test(val);
	    },
	    isMobileNum: function isMobileNum(mobile) {
	        return (/^1[34578][0-9]{9}$/.test(mobile)
	        );
	    },
	    isEmail: function isEmail(email) {
	        return (/w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email)
	        );
	    },
	    isCertificate: function isCertificate(certificate) {
	        return (/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(certificate)
	        );
	    },
	    isCID: function isCID(cardNo) {
	        return (/^(\d{16}|\d{19})$/.test(cardNo)
	        );
	    },
	    isCWord: function isCWord(word, start, end) {
	        start = !isNaN(start) && start > 0 ? start : 1;
	        end = !isNaN(end) && end > 0 ? end : '';
	        var reg = new RegExp('^[\\u4e00-\\u9fa5]{' + start + ',' + end + '}$');
	        //var regPunctuation = /[1-9<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，；‘’“”：'"\·`]/;
	        // var regRes = reg.test(word);
	        //var pugRes = regPunctuation.test(word);
	        return reg.test(word);
	    },
	    isArray: function isArray(arr) {
	        return Array.isArray(arr) || arr instanceof Array;
	    },
	    passwordReg: function passwordReg(val) {
	        var reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，\"\,\:\;；,\.‘’“”：'"\·`【】])|(?=.*?[A-Za-z])(?=.*?[<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，；‘’“”：'"\·`,\.【】]))[\dA-Za-z<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，；‘’“”：'"\·`,\.【】]{6,21}$/;
	        return reg.test(val);
	    },
	    checkSpace: function checkSpace(val) {
	        var reg = /\s+/;
	        return reg.test(val);
	    },
	    checkRefCode: function checkRefCode(refCode) {
	        var reg = /^[0-9a-zA-Z]{8}$/;
	        return reg.test(refCode);
	    },
	    checkNickName: function checkNickName(name) {
	        var nickNameReg = /^([\u4e00-\u9fa5]|[0-9a-zA-Z_-])+$/;
	        return nickNameReg.test(name);
	    },
	    isMsgCode: function isMsgCode(num) {
	        var reg = /^\d{6}$/;
	        return reg.test(num);
	    },
	    isImgCode: function isImgCode(str) {
	        var reg = /^[0-9a-zA-Z]{4}$/;
	        return reg.test(str);
	    }
	};
	module.exports = obj;

/***/ },

/***/ 65:
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by dongyukuan on 2016/5/20.
	 * 参数：
	 *      num:从num开始倒计时
	 *      options:{onChange:倒计时过程中执行，onFinish:倒计时结束执行}
	 * 调用方式：new CountDown(num,{function onChange(num){},function onFinish(){}})
	 */
	var noop = function noop() {};
	var CountDown = function CountDown(count, options) {
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

/***/ 66:
/***/ function(module, exports) {

	"use strict";

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

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {"use strict";

	/**
	 * Created by dongyukuan on 2016/5/23.
	 */
	var CountDown = __webpack_require__(65);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var toast = __webpack_require__(87).init;
	var inputTip = __webpack_require__(36);
	var limitLen = __webpack_require__(66);
	var check = __webpack_require__(64);
	__webpack_require__(46);

	var forgetPwdStepTwo = $('[data-node="forgetPwdStepTwo"]');
	var sendMsgBtn = forgetPwdStepTwo.find('[data-action="sendMsgBtn"]');
	var nextStep = forgetPwdStepTwo.find('[data-action="nextStep"]');
	var errorCode = forgetPwdStepTwo.find('[data-node="errorCode"]');
	var msgCode = forgetPwdStepTwo.find('[data-node="msgCode"]');
	var errorBorderCode = forgetPwdStepTwo.find('[data-node="errorBorderCode"]');

	var tel = forgetPwdStepTwo.find('[data-node="tel"]');
	var errorTel = forgetPwdStepTwo.find('[data-node="errorTel"]');
	var errorBorderTel = forgetPwdStepTwo.find('[data-node="errorBorderTel"]');

	var errorBorderImgCode = forgetPwdStepTwo.find('[data-node=errorBorderImgCode]');
	var imgCode = forgetPwdStepTwo.find('[data-node=imgCode]');
	var imgChangeBtn = forgetPwdStepTwo.find('[data-action=imgChangeBtn]');
	var errImgCode = forgetPwdStepTwo.find('[data-node=errImgCode]');
	var codeImg = forgetPwdStepTwo.find('[data-node=codeImg]');

	var publicErrBox = forgetPwdStepTwo.find('[data-node=publicErrBox]');
	var publicErr = forgetPwdStepTwo.find('[data-node=publicErr]');

	var errCls = 'lg-form-error';
	var disabledCls = 'code-disabled';
	var noneCls = 'none';
	var flag = 1;
	var telVal;
	var imgTips = inputTip.imgCode;

	var passport_domain = $_CONFIG['passport_domain'];

	//验证手机号
	var checkTel = function checkTel() {
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
	var limitTelLen = function limitTelLen() {
	    var len = (tel.val() + "").length;
	    if (len > 11) {
	        tel.val(limitLen(tel.val() + "", 11));
	    }
	};
	var telFoc = function telFoc() {
	    errorBorderTel.removeClass(errCls);
	    errorTel.text('');
	    publicErrBox.addClass(noneCls);
	    publicErr.text("");
	};
	var checkCode = function checkCode() {
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
	var limitCodeLen = function limitCodeLen() {
	    var len = (msgCode.val() + "").length;
	    if (len > 6) {
	        msgCode.val(limitLen(msgCode.val() + "", 6));
	    }
	};
	var codeFoc = function codeFoc() {
	    if (errorBorderCode.hasClass(errCls)) {
	        errorBorderCode.removeClass(errCls);
	        errorCode.text("");
	        publicErrBox.addClass(noneCls);
	        publicErr.text("");
	    }
	};
	var sendMsg = function sendMsg() {
	    var telFlag = checkTel();
	    var imgCodeVal = imgCode.val();

	    if (!flag || !telFlag) return;
	    var imgCodeFlag = imgCodeBlur();
	    if (!imgCodeFlag) return;
	    telVal = tel.val();
	    var telData = {
	        "mobileOrEmail": telVal,
	        "code": imgCodeVal,
	        "setid": "getpassword"
	    };
	    fetch.post(url.get('sendMsgCodeV2'), {
	        "data": telData
	    }).then(function (data) {
	        if (data.success) {
	            if (data.data.isStoreUser) {
	                //增加toast提示，后跳转
	                toast('您是门店会员，将为您跳转至门店重置密码页', {
	                    callback: function callback() {
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
	                onChange: function onChange(num) {
	                    flag = 0;
	                    sendMsgBtn.text(num + inputTip.msgCode.btnAfterSend).addClass(disabledCls);
	                },
	                onFinish: function onFinish() {
	                    flag = 1;
	                    sendMsgBtn.text(inputTip.msgCode.btnDefault).removeClass(disabledCls);
	                }
	            });
	        } else {
	            switchImgCode();
	            if (data.code == 9111912) {
	                errorBorderImgCode.addClass(errCls);
	                errImgCode.text(imgTips.err);
	                return;
	            }
	            publicErrBox.removeClass(noneCls);
	            publicErr.text(data.message);
	        }
	    });
	    //return false;
	};
	var submit = function submit() {
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
	    }).then(function (data) {
	        if (data.success) {
	            errorBorderCode.removeClass(errCls);
	            errorCode.text("");
	            location.href = passport_domain + "/forgetpwd/step2";
	        } else {
	            switchImgCode();
	            publicErrBox.removeClass(noneCls);
	            publicErr.text(data.message);
	        }
	    });
	};

	var imgCodeFoc = function imgCodeFoc() {
	    errorBorderImgCode.removeClass(errCls);
	    errImgCode.text('');
	    publicErrBox.addClass(noneCls);
	    publicErr.text("");
	};
	var imgCodeKeyup = function imgCodeKeyup() {
	    var imgCodeVal = imgCode.val();
	    var len = imgCodeVal.length;
	    if (len > 4) {
	        imgCode.val(limitLen(imgCodeVal, 4));
	    }
	};
	var imgCodeBlur = function imgCodeBlur() {
	    var imgCodeVal = imgCode.val();
	    var len = imgCodeVal.length;
	    var imgCodeFlag = check.isImgCode(imgCodeVal);
	    var flag = 0;
	    if (!len) {
	        //显示'请先输入验证码'
	        flag = 0;
	        errorBorderImgCode.addClass(errCls);
	        errImgCode.text(imgTips.ept);
	    } else if (!imgCodeFlag) {
	        //图片验证码错误
	        flag = 0;
	        errorBorderImgCode.addClass(errCls);
	        errImgCode.text(imgTips.err);
	    } else {
	        flag = 1;
	        errorBorderImgCode.removeClass(errCls);
	        errImgCode.text('');
	    }
	    return flag;
	};
	var switchImgCode = function switchImgCode() {
	    var imgSrc = codeImg.attr('src') + '&timeStamp=' + new Date().getTime();
	    codeImg.attr('src', imgSrc);
	    errorBorderImgCode.removeClass(errCls);
	    errImgCode.text('');
	    publicErrBox.addClass(noneCls);
	    publicErr.text("");
	    imgCode.val('');
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
	    imgCode.on({
	        focus: imgCodeFoc,
	        blur: imgCodeBlur,
	        keyup: imgCodeKeyup
	    });
	    imgChangeBtn.on('click', switchImgCode);
	    nextStep.on("click", submit);
	}
	module.exports = initEvent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }

});