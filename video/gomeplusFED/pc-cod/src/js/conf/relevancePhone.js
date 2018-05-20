webpackJsonp([23],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by dongyukuan on 2016/5/23.
	 */
	var initEvent = __webpack_require__(203);
	initEvent();

	// 发送统计数据用
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('relevancePhone');

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

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by dongyukuan on 2016/5/25.
	 * 密码强度验证
	 */
	var byteLen = __webpack_require__(46);
	function getCount(str) {
	    var count = 0;
	    var len = byteLen(str);
	    if (!str)return 0;
	    count += len <= 6 ? 5 : (len >= 11 ? 25 : 10);
	    count += !str.match(/[a-z]/i) ? 0 : (str.match(/[a-z]/) && str.match(/[A-Z]/) ? 20 : 10);
	    count += !str.match(/[0-9]/) ? 0 : (str.match(/[0-9]/g).length >= 3 ? 20 : 10);
	    count += !str.match(/\W/) ? 0 : (str.match(/\W/g).length > 1 ? 25 : 10);
	    count += !str.match(/[0-9]/) || !str.match(/[a-z]/i) ? 0 : (!str.match(/\W/) ? 2 : (!str.match(/[a-z]/) || !str.match(/[A-Z]/) ? 3 : 5));
	    return count;
	}
	module.exports = getCount;

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/**
	 * Created by dongyukuan on 2016/5/23.
	 */
	var check = __webpack_require__(48);
	var trim = __webpack_require__(47);
	var CountDown = __webpack_require__(62);
	var pwdStrength = __webpack_require__(129);
	var limitLen = __webpack_require__(63);
	var encrypt = __webpack_require__(39);
	var inputTip = __webpack_require__(35);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	__webpack_require__(41);

	var snsBindPhone = $('[data-node=snsBindPhone]');

	var tel = snsBindPhone.find('[data-node=tel]');
	var msgCode = snsBindPhone.find('[data-node=msgCode]');
	var sendMsgCode = snsBindPhone.find('[data-action="sendMsgCode"]');
	var submit = snsBindPhone.find('[data-action="submit"]');

	var pwdEye = snsBindPhone.find('[data-action="pwdEye"]');

	var pwd = snsBindPhone.find('[data-node="pwd"]');
	var pwdTip = snsBindPhone.find('[data-node="pwdTip"]');
	var referralCode = snsBindPhone.find('[data-node="referralCode"]');

	var errorTel = snsBindPhone.find('[data-node="errorTel"]');
	var errorPwd = snsBindPhone.find('[data-node="errorPwd"]');

	var errorBorderTel = snsBindPhone.find('[data-node="errorBorderTel"]');
	var errorBorderMsgCode = snsBindPhone.find('[data-node="errorBorderMsgCode"]');
	var errorMsgCode = snsBindPhone.find('[data-node=errorMsgCode]');
	var errorBorderPwd = snsBindPhone.find('[data-node="errorBorderPwd"]');
	var errorBorderRefCode = snsBindPhone.find('[data-node="errorBorderRefCode"]');
	var errorRefCode = snsBindPhone.find('[data-node=errorRefCode]');

	var publicErrBox = snsBindPhone.find('[data-node=publicErrBox]');
	var publicErr = snsBindPhone.find('[data-node=publicErr]');

	var errBorderCls = "lg-form-error";
	var inputTxt = '请输入6-20位英文字母、数字或符号';
	var noneCls = "none";

	var mainDomain = $GLOBAL_CONFIG['redirect'];
	var passportDomain = $_CONFIG.passport_domain;
	var whereFrom = $GLOBAL_CONFIG['whereFrom'];
	var countFlag = 1, //发送验证码开关
	    backType = 1, //密码、推荐码是否显示标示
	    token;

	//手机号
	var checkTel = function() {
	    var telNum = tel.val();
	    var flag = check.isMobileNum(telNum);
	    var ret = true;
	    if (!telNum) {
	        errorBorderTel.addClass(errBorderCls);
	        errorTel.text(inputTip.tel.ept);
	        ret = false;
	    } else if (!flag) {
	        errorBorderTel.addClass(errBorderCls);
	        errorTel.text(inputTip.tel.err);
	        ret = false;
	    } else {
	        errorBorderTel.removeClass(errBorderCls);
	        errorTel.text("");
	        ret = true;
	    }
	    return ret;
	};
	var telFoc = function() {
	    errorBorderTel.removeClass(errBorderCls);
	    errorTel.text("");
	    publicErrBox.addClass(noneCls);
	    publicErr.text("");
	};
	var telKeyUp = function() {
	    var len = (tel.val()).length;
	    if (len > 11) {
	        tel.val(limitLen(tel.val() + "", 11));
	    }
	};
	//验证码
	var sendCode = function() {
	    var telNum = tel.val();
	    var telFlag = checkTel();
	    var disabledCls = 'code-disabled';
	    if (!countFlag || !telFlag) {
	        return false;
	    }
	    countFlag = 0;
	    msgCode.removeAttr('disabled');
	    var telData = {
	        "mobile": telNum,
	        "type": whereFrom
	    };
	    fetch.post(url.get('snsSendCode'), {
	        "data": telData
	    }).then(function(data) {
	        if (data.success) {
	            errorMsgCode.text(inputTip.msgCode.tipSend).css("color", "#f95353");
	            new CountDown(60, {
	                onChange: function(num) {
	                    sendMsgCode.text(num + inputTip.msgCode.btnAfterSend).addClass(disabledCls);
	                },
	                onFinish: function() {
	                    countFlag = 1;
	                    sendMsgCode.text(inputTip.msgCode.btnDefault).removeClass(disabledCls);
	                }
	            });
	            token = data.data.token;
	            backType = data.data.mobileType;
	            if (backType === 1) { //不显示密码推荐码
	                errorBorderRefCode.addClass(noneCls);
	                errorBorderPwd.addClass(noneCls);
	            } else if (backType === 2) { //只显示推荐码
	                errorBorderRefCode.removeClass(noneCls);
	                errorBorderPwd.addClass(noneCls);
	            } else if (backType == 3) { //密码推荐码都显示
	                errorBorderRefCode.removeClass(noneCls);
	                errorBorderPwd.removeClass(noneCls);
	            }
	        } else {
	            errorMsgCode.text('');
	            publicErrBox.removeClass(noneCls);
	            publicErr.text(data.message);
	            countFlag = 1;
	        }
	    }).fail(function() {
	        countFlag = 1;
	        publicErrBox.removeClass(noneCls);
	        publicErr.text(inputTip.errLine.tip);
	    });
	    return false;
	};
	var codeFoc = function() {
	    errorBorderMsgCode.removeClass(errBorderCls);
	    errorMsgCode.text('');
	    publicErrBox.addClass(noneCls);
	    publicErr.text("");
	};
	var codeKeyUp = function() {
	    var len = (msgCode.val()).length;
	    if (len > 6) {
	        msgCode.val(limitLen(msgCode.val() + "", 6));
	    }
	};
	var checkCode = function() {
	    var msgCodeVal = msgCode.val() + "";
	    var ret = true;
	    var disabled = (msgCode.attr('disabled') == 'disabled');
	    if (disabled) {
	        errorBorderMsgCode.addClass(errBorderCls);
	        errorMsgCode.text(inputTip.msgCode.tipGet);
	        ret = false;
	    } else if (!msgCodeVal) {
	        errorBorderMsgCode.addClass(errBorderCls);
	        errorMsgCode.text(inputTip.msgCode.tipEpt);
	        ret = false;
	    } else if (!/^\d{6}$/.test(msgCodeVal)) {
	        errorBorderMsgCode.addClass(errBorderCls);
	        errorMsgCode.text(inputTip.msgCode.tipErr);
	        ret = false;
	    } else {
	        ret = true;
	    }
	    return ret;
	};
	//密码
	var checkPwd = function() {
	    var ret = true;
	    var pwdVal = pwd.val() + "";
	    var score = pwdStrength(pwdVal);
	    if (!pwdVal) {
	        pwdTip.addClass(noneCls);
	        errorBorderPwd.addClass(errBorderCls);
	        errorPwd.show().text(inputTip.pwd.commonTip);
	        ret = false;
	    } else if (!check.passwordReg(pwdVal)) {
	        pwdTip.addClass(noneCls);
	        errorBorderPwd.addClass(errBorderCls);
	        errorPwd.show().text(inputTip.pwd.commonTip);
	        ret = false;
	    } else if (check.checkSpace(pwdVal)) {
	        pwdTip.addClass(noneCls);
	        errorBorderPwd.addClass(errBorderCls);
	        errorPwd.show().text(inputTip.pwd.commonTip);
	        ret = false;
	    } else if (score < 27) {
	        pwdTip.addClass(noneCls);
	        errorBorderPwd.addClass(errBorderCls);
	        errorPwd.show().text(inputTip.pwd.commonTip);
	        ret = false;
	    } else {
	        errorBorderPwd.removeClass(errBorderCls);
	        errorPwd.hide().text('');
	        ret = true;
	    }
	    return ret;
	};
	var pwdKeyUp = function() {
	    pwdTip.removeClass(noneCls);
	    errorBorderPwd.removeClass(errBorderCls);
	    var passTipSpan = pwdTip.find('span');
	    var pwdCount = pwd.val();
	    var score = pwdStrength(pwdCount);
	    var levelWeak = "level-weak";
	    var levelMd = "level-md";
	    var levelStrong = "level-strong";
	    if (score > 27 && check.passwordReg(pwdCount)) {
	        errorPwd.hide().text('');
	    } else {
	        errorPwd.show().text(inputTip.pwd.commonTip).css('color', "red");
	    }
	    if (score < 60) {
	        passTipSpan.eq(0).addClass(levelWeak);
	        passTipSpan.eq(1).removeClass(levelMd);
	        passTipSpan.eq(2).removeClass(levelStrong);
	    } else if (score >= 60 && score < 80) {
	        passTipSpan.eq(0).removeClass(levelWeak);
	        passTipSpan.eq(1).addClass(levelMd);
	        passTipSpan.eq(2).removeClass(levelStrong)
	    } else {
	        passTipSpan.eq(0).removeClass(levelWeak);
	        passTipSpan.eq(1).removeClass(levelMd);
	        passTipSpan.eq(2).addClass(levelStrong)
	    }
	    var len = (pwd.val() + "").length;
	    if (len > 20) {
	        pwd.val(limitLen(pwd.val() + "", 20));
	    }
	};
	var pwdFoc = function() {
	    publicErrBox.addClass(noneCls);
	    publicErr.text("");
	};
	var pwdEyeStatus = function() {
	    var inputType = 'type';
	    if (pwd.attr(inputType) == 'text') {
	        pwd.attr(inputType, 'password');
	        $(this).css('color', "#e5e5e5");
	    } else {
	        pwd.attr(inputType, "text");
	        $(this).css('color', "#f95353");
	    }
	};
	//推荐码
	var checkRefCode = function() {
	    var refCode = referralCode.val();
	    var ret = true;
	    if (refCode !== "" && !check.checkRefCode(refCode)) {
	        errorBorderRefCode.addClass(errBorderCls);
	        errorRefCode.text(inputTip.refCode.err);
	        ret = false;
	    } else {
	        errorBorderRefCode.removeClass(errBorderCls);
	        errorRefCode.text('');
	        ret = true;
	    }
	    return ret;
	};
	var refCodeFoc = function() {
	    errorBorderRefCode.removeClass(errBorderCls);
	    errorRefCode.text('');
	    publicErrBox.addClass(noneCls);
	    publicErr.text("");
	};
	var refCodeKeyUp = function() {
	    var refVal = referralCode.val();
	    var len = (refVal + "").length;
	    if (len > 8) {
	        referralCode.val(limitLen(refVal, 8));
	    }
	};
	//placeholder
	var initPlaceHolder = function() {
	    tel.placeholder();
	    msgCode.placeholder();
	    pwd.placeholder();
	    referralCode.placeholder();
	};
	//提交
	var submitEvent = function() {
	    var telNum = tel.val();
	    var msgCodeVal = msgCode.val();
	    var telFlag = checkTel();
	    var codeFlag = checkCode(msgCodeVal);
	    var retRef;
	    if (!codeFlag || !telFlag) {
	        return false;
	    }
	    var subData = {
	        "mobile": telNum,
	        "verifyCode": msgCodeVal,
	        "type": whereFrom,
	        "mobileType": backType,
	        "activityNo": "",
	        "snsUserId": snsUserId,
	        "unionId": unionId,
	        "token": token
	    };
	    if (backType === 1) {

	    } else if (backType === 2) {
	        retRef = checkRefCode();
	        if (!retRef) {
	            return false;
	        }
	        subData.recommendCode = referralCode.val() || "";
	    } else if (backType === 3) {
	        var retPwd = checkPwd();
	        retRef = checkRefCode();
	        if (!retPwd || !retRef) {
	            return false;
	        }
	        subData.password = encrypt(pwd.val());
	        subData.recommendCode = referralCode.val() || "";
	    }
	    fetch.post(url.get('snsSubmitPhone'), {
	        data: subData
	    }).then(function(data) {
	        if (data.success) {
	            publicErrBox.addClass(noneCls);
	            if (data.data.isNeedReset) {
	                location.href = passportDomain + 'regist/indexnickname'; //跳到完善昵称页
	            } else {
	                var date = new Date();
	                date.setTime(date.getTime() + 10 * 1000); //10表示10秒钟
	                $.cookie('temp_nick_name', 'true', {
	                    expires: date,
	                    path: '/',
	                    domain: '.gomeplus.com'
	                });
	                location.href = mainDomain;
	            }
	        } else {
	            publicErrBox.removeClass(noneCls);
	            publicErr.text(data.message);
	            return false;
	        }
	    }).fail(function() {
	        publicErrBox.removeClass(noneCls);
	        publicErr.text(inputTip.errLine.tip);
	    });
	};

	//初始化事件
	function initEvent() {
	    initPlaceHolder();
	    pwdEye.on('click', pwdEyeStatus);
	    tel.on({
	        blur: checkTel,
	        focus: telFoc,
	        keyup: telKeyUp
	    });
	    sendMsgCode.on('click', sendCode);
	    msgCode.on({
	        focus: codeFoc,
	        blur: checkCode,
	        keyup: codeKeyUp
	    });
	    pwd.on({
	        keyup: pwdKeyUp,
	        blur: checkPwd,
	        focus: pwdFoc
	    });
	    referralCode.on({
	        focus: refCodeFoc,
	        keyup: refCodeKeyUp,
	        blur: checkRefCode
	    });
	    submit.on("click", submitEvent);
	}
	module.exports = initEvent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }

});