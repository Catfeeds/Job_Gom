webpackJsonp([47],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {"use strict";

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var inputTip = __webpack_require__(36);
	var CountDown = __webpack_require__(65);
	var check = __webpack_require__(64);
	var limitLen = __webpack_require__(66);
	__webpack_require__(46);

	var msgTip = inputTip.msgCode;

	var formBox = $('[data-node=formBox]');
	var publicErr = formBox.find('[data-node=publicErr]');
	var errText = formBox.find('[data-node=errText]');

	var codeLi = formBox.find('[data-node=codeLi]');
	var sendMsgBtn = formBox.find('[data-action=sendMsg]');
	var msgCode = formBox.find('[data-node=msgCode]');
	var codeTip = formBox.find('[data-node=codeTip]');
	var codeIcon = formBox.find('[data-node=codeIcon]');
	var codeText = formBox.find('[data-node=codeText]');

	var nextStep = formBox.find('[data-action=nextStep]');

	var sendFlag = 1;

	var hideCls = 'hide';
	var lgFormError = 'lg-form-error';
	var codeTipCls = 'code-tip';
	var codeDisabled = 'code-disabled';
	var activeCls = 'active';

	//公共提示隐藏显示
	var hideErrBox = function hideErrBox() {
		publicErr.addClass(hideCls);
	};
	var showErrBox = function showErrBox(str) {
		publicErr.removeClass(hideCls);
		errText.text(str);
	};

	var sendMsg = function sendMsg() {
		if (!sendFlag) {
			return false;
		}
		sendFlag = 0;
		fetch.get(url.get('sendOldCode')).done(function (data) {
			if (data.success) {
				//input框下方提示
				codeTip.removeClass(hideCls);
				codeIcon.removeClass(hideCls);
				codeText.text(msgTip.send);
				//去掉li边框红色
				codeLi.removeClass(lgFormError).addClass(codeTipCls);
				//隐藏公共错误提示
				hideErrBox();

				new CountDown(60, {
					onChange: function onChange(num) {
						sendMsgBtn.text(num + inputTip.msgCode.btnAfterSend).addClass(codeDisabled);
					},
					onFinish: function onFinish() {
						sendFlag = 1;
						sendMsgBtn.text(inputTip.msgCode.btnDefault).removeClass(codeDisabled);
					}
				});
			} else {
				showErrBox(data.message);
				sendFlag = 1;
			}
		}).fail(function () {
			sendFlag = 1;
			showErrBox(inputTip.errLine.tip);
		});
		return false;
	};
	var inputFoc = function inputFoc() {
		if (codeLi.hasClass(lgFormError)) {
			codeTip.addClass(hideCls);
			//去掉li边框红色
			codeLi.removeClass(lgFormError).addClass(codeTipCls);
		}
		//隐藏公共错误提示
		hideErrBox();
	};
	var inputKeyup = function inputKeyup() {
		var codeVal = msgCode.val();
		var len = codeVal.length;
		if (len > 6) {
			msgCode.val(limitLen(codeVal, 6));
		}
		if (codeVal) {
			nextStep.addClass(activeCls);
		} else {
			nextStep.removeClass(activeCls);
		}
	};

	var inputBlur = function inputBlur() {
		var flag = true;
		var codeVal = msgCode.val();
		var len = codeVal.length;
		if (!check.isMsgCode(codeVal)) {
			flag = false;
			codeLi.removeClass(codeTipCls).addClass(lgFormError);
			codeTip.removeClass(hideCls);
			codeIcon.addClass(hideCls);
			if (!len) {
				codeText.text(msgTip.tipEpt);
			} else {
				codeText.text(msgTip.tipErr);
			}
		} else {
			flag = true;
		}
		return flag;
	};

	var subFn = function subFn() {
		var codeVal = msgCode.val();
		var flag = inputBlur();
		if (flag) {
			var subData = {
				verifyCode: codeVal
			};
			fetch.post(url.get('checkOldCode'), {
				data: subData
			}).done(function (data) {
				if (data.success) {
					location.href = $_CONFIG['i_domain'] + 'bind/secondStep';
				} else {
					showErrBox(data.message);
				}
			}).fail(function () {
				showErrBox(inputTip.errLine.tip);
			});
		}
	};

	var initEvent = function initEvent() {
		msgCode.placeholder();
		sendMsgBtn.on('click', sendMsg);
		msgCode.on({
			"focus": inputFoc,
			"keyup": inputKeyup,
			"blur": inputBlur
		});
		nextStep.on('click', subFn);
	};

	initEvent();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

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

/***/ }

});