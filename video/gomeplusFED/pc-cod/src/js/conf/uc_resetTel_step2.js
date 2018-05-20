webpackJsonp([40],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(264).initTel();
	__webpack_require__(265).initCode();
	__webpack_require__(266).initSub();

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

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var telTip = __webpack_require__(35).tel;
	var CountDown = __webpack_require__(62);
	var check = __webpack_require__(48);
	var limitLen = __webpack_require__(63);
	__webpack_require__(41);

	var formBox = $('[data-node=formBox]');

	var telInput = formBox.find('[data-node=telInput]');

	var publicErr = formBox.find('[data-node=publicErr]');
	var rightFlag = formBox.find('[data-node=rightFlag]');
	var telErrTip = formBox.find('[data-node=telErrTip]');

	var telLi = formBox.find('[data-node=telLi]');

	var hideCls = 'hide';
	var lgFormError = 'lg-form-error';
	var codeTipCls = 'code-tip';

	var telFoc = function() {
		telLi.removeClass(lgFormError).addClass(codeTipCls);
		publicErr.addClass(hideCls);
		rightFlag.addClass(hideCls);
		telErrTip.addClass(hideCls);
	};
	var telKeyup = function() {
		var telVal = telInput.val();
		var len = telVal.length;
		if (len > 11) {
			telInput.val(limitLen(telVal, 11));
		}
	};
	var telBlur = function() {
		var telVal = telInput.val();
		var len = telVal.length;
		var flag = true;
		if (!check.isMobileNum(telVal)) {
			flag = false;
			telLi.removeClass(codeTipCls).addClass(lgFormError);
			telErrTip.removeClass(hideCls);
			if (!len) {
				telErrTip.text(telTip.ept);
			} else {
				telErrTip.text(telTip.err);
			}
		} else {
			flag = true;
			rightFlag.removeClass(hideCls);
		}
		return flag;
	};
	var telEvent = function() {
		telInput.placeholder();
		telInput.on({
			'focus': telFoc,
			'keyup': telKeyup,
			'blur': telBlur
		});
	};
	module.exports = {
		initTel: telEvent,
		checkTel: telBlur
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var inputTip = __webpack_require__(35);
	var msgTip = inputTip.msgCode;
	var CountDown = __webpack_require__(62);
	var check = __webpack_require__(48);
	var limitLen = __webpack_require__(63);
	__webpack_require__(41);

	var checkTel = __webpack_require__(264).checkTel;

	var formBox = $('[data-node=formBox]');
	var publicErr = formBox.find('[data-node=publicErr]');
	var errText = formBox.find('[data-node=errText]');

	var telInput = formBox.find('[data-node=telInput]');

	var sendMsgBtn = formBox.find('[data-action=sendMsg]');
	var msgCode = formBox.find('[data-node=msgCode]');
	var codeLi = formBox.find('[data-node=codeLi]');
	var codeTip = formBox.find('[data-node=codeTip]');
	var codeIcon = formBox.find('[data-node=codeIcon]');
	var codeText = formBox.find('[data-node=codeText]');

	var sendFlag = 1;

	var hideCls = 'hide';
	var lgFormError = 'lg-form-error';
	var codeTipCls = 'code-tip';
	var codeDisabled = 'code-disabled';

	//公共提示隐藏显示
	var hideErrBox = function() {
		publicErr.addClass(hideCls);
	};
	var showErrBox = function(str) {
		publicErr.removeClass(hideCls);
		errText.text(str);
	};

	var sendMsg = function() {
		if (!sendFlag) {
			return false;
		}
		var telFlag = checkTel();
		if (!telFlag) {
			return false;
		}
		var telVal = telInput.val();
		var sendData = {
			"mobile": telVal
		};
		sendFlag = 0;
		fetch.get(url.get('sendNewCode'), {
			data: sendData
		}).done(function(data) {
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
					onChange: function(num) {
						sendMsgBtn.text(num + inputTip.msgCode.btnAfterSend).addClass(codeDisabled);
					},
					onFinish: function() {
						sendFlag = 1;
						sendMsgBtn.text(inputTip.msgCode.btnDefault).removeClass(codeDisabled);
					}
				});
			} else {
				sendFlag = 1;
				showErrBox(data.message);
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			sendFlag = 1;
			showErrBox(inputTip.errLine.tip);
		});
		return false;
	};
	var inputFoc = function() {
		hideErrBox();
		if (codeLi.hasClass(lgFormError)) {
			codeLi.removeClass(lgFormError).addClass(codeTipCls);
			codeTip.addClass(hideCls);
		}
	};
	var inputKeyup = function() {
		var codeVal = msgCode.val();
		var len = codeVal.length;
		if (len > 6) {
			msgCode.val(limitLen(codeVal, 6));
		}
		// if (codeVal) {
		// 	nextStep.addClass(activeCls);
		// } else {
		// 	nextStep.removeClass(activeCls);
		// }
	};
	var inputBlur = function() {
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
	var initCode = function() {
		msgCode.placeholder();
		sendMsgBtn.on('click', sendMsg);
		msgCode.on({
			"focus": inputFoc,
			"keyup": inputKeyup,
			"blur": inputBlur
		});
	};
	module.exports = {
		initCode: initCode,
		checkCode: inputBlur
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var check = __webpack_require__(48);
	var limitLen = __webpack_require__(63);
	var errLineTip = __webpack_require__(35).errLine.tip;

	var checkTel = __webpack_require__(264).checkTel;
	var checkCode = __webpack_require__(265).checkCode;

	var formBox = $('[data-node=formBox]');
	var telInput = formBox.find('[data-node=telInput]');
	var codeInput = formBox.find('[data-node=msgCode]');
	var nextStep = formBox.find('[data-action=nextStep]');

	var publicErr = formBox.find('[data-node=publicErr]');
	var errText = formBox.find('[data-node=errText]');

	var inputs = $('input');
	var activeCls = 'active';
	var hideCls = 'hide';

	//显示公共错误提示
	var showErrBox = function(str) {
		publicErr.removeClass(hideCls);
		errText.text(str);
	};

	var btnActive = function() {
		var telVal = telInput.val();
		var codeVal = codeInput.val();
		if (telVal.length && codeVal.length) {
			nextStep.addClass(activeCls);
		} else {
			nextStep.removeClass(activeCls);
		}
	};
	var submit = function() {
		var telFlag = checkTel();
		var codeFlag = checkCode();
		if (telFlag && codeFlag) {
			var telVal = telInput.val();
			var codeVal = codeInput.val();
			var subData = {
				"verifyCode": codeVal,
				"mobile": telVal
			};
			fetch.post(url.get('checkNewCode'), {
				data: subData
			}).done(function(data) {
				if (data.success) {
					location.href = $_CONFIG['i_domain'] + 'bind/thirdStep';
				} else {
					showErrBox(data.message);
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				showErrBox(errLineTip);
			});
		}
	};

	var initSub = function() {
		inputs.on('keyup', btnActive);
		nextStep.on('click', submit);
	};
	module.exports = {
		initSub: initSub
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }

});