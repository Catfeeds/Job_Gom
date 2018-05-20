webpackJsonp([11],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {"use strict";

	/**
	 * Created by dongyukuan on 2016/5/23.
	 */
	var trim = __webpack_require__(51);
	var getCount = __webpack_require__(168);
	var limitLen = __webpack_require__(66);
	var check = __webpack_require__(64);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var inputTip = __webpack_require__(36);
	var encrypt = __webpack_require__(40);
	__webpack_require__(46);
	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('newPwd');

	var forgetPwdStepThree = $('[data-node="forgetPwdStepThree"]');

	var pwd = forgetPwdStepThree.find('[data-node="pwd"]');
	var surePwd = forgetPwdStepThree.find('[data-node="surePwd"]');

	var rightTip = forgetPwdStepThree.find('[data-node=rightTip]');
	var sureRightTip = forgetPwdStepThree.find('[data-node=sureRightTip]');

	var errorBorderPwd = forgetPwdStepThree.find('[data-node="errorBorderPwd"]');
	var errorBorderSurePwd = forgetPwdStepThree.find('[data-node="errorBorderSurePwd"]');

	var pwdTip = forgetPwdStepThree.find('[data-node="pwdTip"]');
	var errorPwd = forgetPwdStepThree.find('[data-node="errorPwd"]');
	var errorSurePwd = forgetPwdStepThree.find('[data-node="errorSurePwd"]');

	var sureBtn = forgetPwdStepThree.find('[data-action="sureBtn"]');

	var publicErr = forgetPwdStepThree.find('[data-node=publicErr]');
	var publicErrBox = forgetPwdStepThree.find('[data-node=publicErrBox]');

	var loFormErr = 'lg-form-error';
	var hideCls = 'hide';
	var noneCls = 'none';
	var pwdWeak = "level-weak";
	var pwdMd = "level-md";
	var pwdStrong = "level-strong";

	var pwdFoc = function pwdFoc() {
	    errorPwd.text(inputTip.pwd.commonTip).css('color', "#f95353");
	    rightTip.addClass(hideCls);
	    publicErrBox.addClass(noneCls);
	};
	var pwdBlur = function pwdBlur() {
	    var pwdVal = pwd.val();
	    var pwdCount = getCount(pwdVal);
	    if (pwdVal.length === 0) {
	        errorBorderPwd.addClass(loFormErr);
	        errorPwd.show().text(inputTip.pwd.commonTip).css('color', "#f95353");
	        rightTip.addClass(hideCls);
	        return false;
	    }
	    if (!check.passwordReg(pwdVal) || check.checkSpace(pwdVal)) {
	        errorBorderPwd.addClass(loFormErr);
	        errorPwd.show().text(inputTip.pwd.commonTip);
	        rightTip.addClass(hideCls);
	        return false;
	    }
	    if (pwdCount < 27) {
	        errorBorderPwd.addClass(loFormErr);
	        errorPwd.show().text(inputTip.pwd.commonTip);
	        rightTip.addClass(hideCls);
	        return false;
	    } else {
	        rightTip.removeClass(hideCls);
	        errorBorderPwd.removeClass(loFormErr);
	        errorPwd.hide().text('');
	    }
	};
	var pwdKeyup = function pwdKeyup() {
	    var pwdVal = pwd.val();
	    var surePwdVal = surePwd.val();
	    var len = pwd.val().length;
	    var pwdLevelSpan = pwdTip.find('span');
	    // pwdTip.removeClass(hideCls);
	    if (len > 20) {
	        pwd.val(limitLen(pwd.val(), 20));
	    }
	    var score = getCount(pwdVal);
	    errorBorderPwd.removeClass(loFormErr);
	    if (score > 27 && check.passwordReg(pwdVal) && !check.checkSpace(pwdVal)) {
	        pwdTip.removeClass(hideCls);
	        errorPwd.hide();
	    } else {
	        errorPwd.show().text(inputTip.pwd.commonTip);
	        return false;
	    }
	    if (score < 60) {
	        pwdLevelSpan.eq(0).addClass(pwdWeak);
	        pwdLevelSpan.eq(1).removeClass(pwdMd);
	        pwdLevelSpan.eq(2).removeClass(pwdStrong);
	    } else if (score >= 60 && score < 80) {
	        pwdLevelSpan.eq(0).removeClass(pwdWeak);
	        pwdLevelSpan.eq(1).addClass(pwdMd);
	        pwdLevelSpan.eq(2).removeClass(pwdStrong);
	    } else {
	        pwdLevelSpan.eq(0).removeClass(pwdWeak);
	        pwdLevelSpan.eq(1).removeClass(pwdMd);
	        pwdLevelSpan.eq(2).addClass(pwdStrong);
	    }
	    if (surePwdVal !== "") {
	        if (surePwdVal !== pwdVal) {
	            errorBorderSurePwd.addClass(loFormErr);
	            errorSurePwd.text(inputTip.pwdV.err);
	            sureRightTip.addClass(hideCls);
	        } else {
	            errorBorderSurePwd.removeClass(loFormErr);
	            errorSurePwd.text('');
	            sureRightTip.removeClass(hideCls);
	        }
	    }
	};
	var sPwdBlur = function sPwdBlur() {
	    var pwdVal = pwd.val();
	    var surePwdVal = surePwd.val();
	    if (surePwdVal.length === 0) {
	        sureRightTip.addClass(hideCls);
	        return false;
	    }
	    if (errorBorderPwd.hasClass(loFormErr)) {
	        sureRightTip.addClass(hideCls);
	        return false;
	    }
	    if (pwdVal !== surePwdVal) {
	        errorBorderSurePwd.addClass(loFormErr);
	        errorSurePwd.text(inputTip.pwdV.err);
	        sureRightTip.addClass(hideCls);
	    } else {
	        errorBorderSurePwd.removeClass(loFormErr);
	        errorSurePwd.text('');
	        sureRightTip.removeClass(hideCls);
	    }
	};
	var sPwdKeyup = function sPwdKeyup() {
	    publicErrBox.addClass(noneCls);
	    var len = surePwd.val().length;
	    if (len > 20) {
	        surePwd.val(limitLen(surePwd.val(), 20));
	    }
	};
	var submit = function submit() {
	    var pwdVal = trim(pwd.val());
	    var surePwdVal = trim(surePwd.val());
	    // var pwdData = { 'newPassword': encodeURIComponent(encrypt.encrypt($.trim(pwd.val())).toString()) };
	    var pwdEncrypt = encrypt(pwdVal);
	    var pwdData = {
	        // 'newPassword': encodeURIComponent($.trim(pwd.val()))
	        'newPassword': pwdEncrypt
	    };
	    publicErrBox.addClass(noneCls);
	    if (!pwdVal && !surePwdVal) {
	        errorPwd.text(inputTip.pwd.commonTip);
	        errorBorderPwd.addClass(loFormErr);
	        rightTip.addClass(hideCls);
	        errorSurePwd.text(inputTip.pwdV.ept);
	        errorBorderSurePwd.addClass(loFormErr);
	        sureRightTip.addClass(hideCls);
	        return false;
	    }
	    if (!pwdVal) {
	        errorPwd.text(inputTip.pwd.commonTip);
	        errorBorderPwd.addClass(loFormErr);
	        rightTip.addClass(hideCls);
	        return false;
	    } else if (errorBorderPwd.hasClass(loFormErr)) {
	        return false;
	    } else {
	        errorPwd.text('');
	        errorBorderPwd.removeClass(loFormErr);
	    }
	    if (!surePwdVal) {
	        errorSurePwd.text(inputTip.pwdV.ept);
	        errorBorderSurePwd.addClass(loFormErr);
	        sureRightTip.addClass(hideCls);
	        return false;
	    } else {
	        errorSurePwd.text('');
	        errorBorderSurePwd.removeClass(loFormErr);
	        sureRightTip.removeClass(hideCls);
	    }
	    if (surePwdVal !== pwdVal) {
	        errorBorderSurePwd.addClass(loFormErr);
	        errorSurePwd.text(inputTip.pwdV.err);
	        sureRightTip.addClass(hideCls);
	    } else {
	        fetch.post(url.get('passwordReset'), {
	            "data": pwdData
	        }).done(function (data) {
	            if (data.success) {
	                errorBorderSurePwd.removeClass(loFormErr);
	                errorBorderPwd.removeClass(loFormErr);
	                errorSurePwd.text("");
	                errorPwd.text("");
	                location.href = $_CONFIG['passport_domain'] + "forgetpwd/step3";
	            } else {
	                sureRightTip.addClass(hideCls);
	                rightTip.addClass(hideCls);
	                publicErrBox.removeClass(noneCls);
	                publicErr.text(data.message);
	            }
	        }).fail(function () {
	            alert('请求错误！');
	        });
	    }
	};
	var initEvent = function initEvent() {
	    pwd.placeholder();
	    surePwd.placeholder();
	    surePwd.on({
	        keyup: sPwdKeyup,
	        blur: sPwdBlur
	    });
	    pwd.on({
	        keyup: pwdKeyup,
	        blur: pwdBlur,
	        focus: pwdFoc
	    });
	    sureBtn.on('click', submit);
	};

	initEvent();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 51:
/***/ function(module, exports) {

	'use strict';

	/**
	 * 删除字符串str的收尾空格
	 */

	var trim = function trim(str) {
	  return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
	};

	module.exports = trim;

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

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by dongyukuan on 2016/5/25.
	 * 密码强度验证
	 */
	var byteLen = __webpack_require__(43);
	function getCount(str) {
	    var count = 0;
	    var len = byteLen(str);
	    if (!str) return 0;
	    count += len <= 6 ? 5 : len >= 11 ? 25 : 10;
	    count += !str.match(/[a-z]/i) ? 0 : str.match(/[a-z]/) && str.match(/[A-Z]/) ? 20 : 10;
	    count += !str.match(/[0-9]/) ? 0 : str.match(/[0-9]/g).length >= 3 ? 20 : 10;
	    count += !str.match(/\W/) ? 0 : str.match(/\W/g).length > 1 ? 25 : 10;
	    count += !str.match(/[0-9]/) || !str.match(/[a-z]/i) ? 0 : !str.match(/\W/) ? 2 : !str.match(/[a-z]/) || !str.match(/[A-Z]/) ? 3 : 5;
	    return count;
	}
	module.exports = getCount;

/***/ }

});