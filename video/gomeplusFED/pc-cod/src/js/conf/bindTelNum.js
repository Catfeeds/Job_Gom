webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * Created by dongyukuan on 2016/5/23.
	 */
	var initEvent = __webpack_require__(61);
	__webpack_require__(41);
	$('input').placeholder();
	initEvent();

	// 发送统计数据用
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('bindTelNum');

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

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/**
	 * Created by dongyukuan on 2016/5/23.
	 */
	var check = __webpack_require__(48);
	var CountDown = __webpack_require__(62);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var inputTip = __webpack_require__(35);
	var trim = __webpack_require__(47);
	var limitLen = __webpack_require__(63);
	__webpack_require__(41);

	var bindPhoneForm = $('[data-node="bindPhoneForm"]');

	var sendMsgBtn = bindPhoneForm.find('[data-action="sendMsgCode"]');
	var phone = bindPhoneForm.find('[data-node="telNum"]');
	var msgCode = bindPhoneForm.find('[data-node="msgCode"]');
	var errorBorderTel = bindPhoneForm.find('[data-node="errorBorderTel"]');
	var errTel = bindPhoneForm.find('[data-node="errorTel"]');
	var errorMsgCode = bindPhoneForm.find('[data-node="errorMsgCode"]');
	var errorBorderCode = bindPhoneForm.find('[data-node="errorBorderCode"]');
	var sureBind = bindPhoneForm.find('[data-action="sureBind"]');

	var publicErrBox = bindPhoneForm.find('[data-node=publicErrBox]');
	var publicErr = bindPhoneForm.find('[data-node=publicErr]');

	var jumpFlag = $_CONFIG['isMobileActivated'];
	var passportDomain = $_CONFIG.passport_domain;
	var mainDomain = $_CONFIG['redirect'];
	var unified = $_CONFIG['unified'];
	var unifiedUrl = $_CONFIG['unified_url'];

	var checkTel = function(telNum) {
	    var ret = true;
	    if (!telNum) {
	        errorBorderTel.addClass('lg-form-error');
	        errTel.text(inputTip.tel.ept);
	        ret = false;
	    } else if (!check.isMobileNum(telNum)) {
	        errorBorderTel.addClass('lg-form-error');
	        errTel.text(inputTip.tel.err);
	        ret = false;
	    } else {
	        errorBorderTel.removeClass('lg-form-error');
	        errTel.text('');
	        ret = true;
	    }
	    return ret;
	};
	var checkCode = function(codeVal) {
	    var ret = true;
	    if (!codeVal) {
	        errorBorderCode.addClass("lg-form-error");
	        errorMsgCode.text(inputTip.msgCode.tipEpt);
	        ret = false;
	    } else if (!/^\d{6}$/.test(codeVal)) {
	        errorBorderCode.addClass("lg-form-error");
	        errorMsgCode.text(inputTip.msgCode.tipErr);
	        ret = false;
	    } else {
	        ret = true;
	    }
	    return ret;
	};
	var limitCodeLen = function() {
	    var len = (msgCode.val() + "").length;
	    if (len > 6) {
	        msgCode.val(limitLen(msgCode.val() + "", 6));
	    }
	};
	//dfghgjtretr
	function initEvent() {
	    phone.placeholder();
	    msgCode.placeholder();

	    var flag = 1;
	    var token = "";
	    phone.on({
	        blur: function() {
	            var telNum = phone.val();
	            checkTel(telNum);
	        },
	        focus: function() {
	            errorBorderTel.removeClass('lg-form-error');
	            errTel.text('');
	            publicErrBox.addClass('none');
	            publicErr.text("");

	        },
	        keyup: function() {
	            var len = (phone.val() + "").length;
	            if (len > 11) {
	                phone.val(limitLen(phone.val() + "", 11));
	            }
	        }
	    });
	    msgCode.on({
	        focus: function() {
	            errorBorderCode.removeClass('lg-form-error');
	            errorMsgCode.text('');
	            publicErrBox.addClass('none');
	            publicErr.text("");
	        },
	        blur: function() {
	            var codeVal = msgCode.val();
	            checkCode(codeVal);
	        },
	        keyup: limitCodeLen
	    });
	    sendMsgBtn.on("click", function() {
	        if (flag === 0) {
	            return false;
	        }
	        var telNum = phone.val();
	        var telFlag = checkTel(telNum);
	        if (!telFlag) {
	            return false;
	        }
	        flag = 0;
	        msgCode.removeAttr('disabled');
	        var telData = {
	            "mobile": telNum
	        };
	        fetch.post(url.get('sendCode'), {
	            "data": telData
	        }).then(function(data) {
	            if (data.success) {
	                errorBorderTel.removeClass('lg-form-error');
	                errTel.text("");
	                errorMsgCode.text(inputTip.msgCode.tipSend).css("color", "#f95353");
	                token = data.data.token;
	                new CountDown(60, {
	                    onChange: function(num) {
	                        sendMsgBtn.text(num + inputTip.msgCode.btnAfterSend).addClass('code-disabled');
	                    },
	                    onFinish: function() {
	                        flag = 1;
	                        sendMsgBtn.text(inputTip.msgCode.btnDefault).removeClass('code-disabled');
	                    }
	                });
	            } else {
	                publicErrBox.removeClass('none');
	                publicErr.text(data.message);
	                flag = 1;
	            }
	        }).fail(function() {
	            flag = 1;
	            publicErrBox.removeClass('none');
	            publicErr.text(inputTip.errLine.tip);
	        });
	    });
	    sureBind.on("click", function() {
	        var telNum = trim(phone.val() + "");
	        var msgCodeNum = trim(msgCode.val() + "");
	        var telFlag = checkTel(telNum);
	        var codeFlag = checkCode(msgCodeNum);
	        if (!telFlag) {
	            return false;
	        }
	        if (!codeFlag) {
	            return false;
	        }
	        var subData = {
	            "mobile": telNum,
	            "verifyCode": msgCodeNum,
	            "token": token
	        };
	        fetch.post(url.get('bindPhone'), {
	            "data": subData
	        }).done(function(data) {
	            if (data.success) {
	                publicErrBox.addClass('none');
	                errorBorderCode.removeClass('lg-form-error');
	                errorMsgCode.text("");
	                if (unified) {
	                    location.href = unifiedUrl;
	                } else {
	                    if (jumpFlag) {
	                        location.href = mainDomain;
	                    } else {
	                        location.href = passportDomain + 'regist/indexnickname';
	                    }
	                }
	            } else {
	                publicErrBox.removeClass('none');
	                publicErr.text(data.message);
	            }
	        }).fail(function() {
	            publicErrBox.removeClass('none');
	            publicErr.text(inputTip.errLine.tip);
	        });
	    });
	}
	module.exports = initEvent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

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

/***/ }

});