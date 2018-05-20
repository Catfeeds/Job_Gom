webpackJsonp([21],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {var placeholder = __webpack_require__(41);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var moduleTrim = __webpack_require__(47);
	var textchange = __webpack_require__(52);
	var alert = __webpack_require__(36);
	var inputTip = __webpack_require__(35);
	var encrypt = __webpack_require__(39);

	var modulePhoneNumber = __webpack_require__(194); //手机号输入
	var modulePassword = __webpack_require__(195); //密码输入
	var moduleCheckPassword = __webpack_require__(196); //确认密码
	var moduleAgrement = __webpack_require__(197); //确认协议
	__webpack_require__(198);

	// 发送统计数据用
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('register');
	// $Form.find();
	var $Form = $("[data-node=lg-form]");

	var phoneLi = $Form.find("[data-node='phone_number']");
	var phoneInput = $Form.find("[data-node='input_phone_number']");
	var phoneTip = $Form.find("[data-node='tip_phone_number']");

	var msgTestInput = $Form.find("[data-node='input_msg_test']");
	var spanCodes = $Form.find("[data-node='tip_msg_test']");
	var tipMsgTest = $Form.find('[data-node=tip_msg_test]');

	var pwdLi = $Form.find("[data-node='password']");
	var pwdInput = $Form.find("[data-node='input_password']");
	var pwdTip = $Form.find("[data-node='tip_pass']");

	var pwdConfirmLi = $Form.find("[data-node='password_confirm']");
	var pwdConfirmInput = $Form.find("[data-node='input_password_confirm']");

	var codeInput = $Form.find("[data-node='code_input']");
	var codeSkip = $Form.find("[data-node='code_skip']");
	var codeComplete = $Form.find("[data-node='code_complete']");
	var codeSpan = $Form.find('[data-node=code_span]');
	var codeAllright = $Form.find('[data-node=code_allright]');

	var completeBtn = $Form.find('[data-node=complete]');
	//设置placehoder
	$('[data-node=input_phone_number],[data-node=input_msg_test],[data-node=input_password],[data-node=input_password_confirm],[data-node=code_input]').placeholder();
	//设置注册按钮和协议;
	completeBtn.css('background', '#CCC');
	//完成按钮提交页面数据
	$.fn.extend({
	    tipVisible: function(str) {
	        var content = str || false;
	        if (this[0].nodeName == "SPAN") {
	            content ? $(this).html(content).css({
	                "visibility": "visible",
	                "color": "#F95353"
	            }) : $(this).css({
	                "visibility": "visible",
	                "color": "#F95353"
	            });
	        } else {
	            $(this).css('visibility', 'visible');
	        }
	    },
	    tipHide: function() {
	        $(this).css('visibility', 'hidden');
	    }
	});
	var complete = function() {
	    // BP.send({event_id: 'B000P021'}); // 发送统计数据
	    if (moduleTrim(phoneInput.val()) == "") {
	        return function() {
	            phoneLi.addClass("lg-form-error").attr("data-verification", "1");
	            phoneTip.tipVisible(inputTip.tel.ept);
	        }();
	    }
	    var phoneNumber = phoneLi.attr("data-verification");
	    var dataPass = pwdLi.attr("data-pass");
	    var dataPassconfirm = pwdConfirmLi.attr("data-passconfirm");
	    if (phoneNumber != 0) {
	        return;
	    }
	    if (phoneNumber == 0 && moduleTrim(msgTestInput.val()) == "") {
	        return tipMsgTest.tipVisible(inputTip.msgCode.tipEpt);
	    }
	    if (phoneNumber == 0 && !msgTestInput.val().length == 6) {
	        return tipMsgTest.tipVisible(inputTip.msgCode.tipErr);
	    }
	    if (moduleTrim(pwdInput.val()) == "" && phoneNumber == 0) {
	        return pwdTip.tipVisible();
	    }
	    if (moduleTrim(pwdConfirmInput.val()) == "") {
	        return $("[data-node='tip_password_confirm']").tipVisible(inputTip.pwdV.ept);
	    }
	    if (codeInput.attr('data-userid') === false) {
	        return alert('推荐码错误');
	    }
	    if (phoneNumber == 0 && dataPass == 0 && dataPassconfirm == 0 && $("[data-node='check_agreement']").hasClass("lg-radio-true") && (codeInput.attr('data-userid') == '' || codeInput.attr('data-userid') != false)) {
	        var data = {
	            "mobile": phoneInput.val(),
	            "password": encrypt(pwdInput.val()),
	            "verifyCode": msgTestInput.val()
	        };
	        if (codeInput.attr('data-code') == 0 && codeInput.attr('data-userId')) {
	            data.membershipRefereeCode = codeInput.val();
	        }
	        fetch.post(url.get("registSubmit"), {
	            data: data
	        }).done(function(data, textStatus, XHR) {
	            if (data.success) {
	                location.href = $_CONFIG.passport_domain + "regist/indexnickname";
	            } else if (data.code == "881006" || data.code == "100010") {
	                tipMsgTest.tipVisible(inputTip.msgCode.tipWrong);
	            } else if (data.code == '881007') {
	                pwdTip.html(data.message).show();
	                $('[data-node=password_allright]').tipHide();
	            } else if (data.code == 422) {
	                tipMsgTest.tipVisible(inputTip.msgCode.tipWrong);
	            } else {
	                alert(data.message);
	            }
	        }).fail(function(XHR, textStatus, errorThrown) {
	            alert("数据请求失败 请稍后尝试");
	        })
	    }
	};
	//验证码按钮
	var getCode = function() {
	    var phoneNumberCheck = phoneLi.attr("data-verification");
	    var tipMsgTest = $("[data-node='tip_msg_test']");
	    var getVerifycode = $("[data-node='get_verifyCode']");
	    if (phoneNumberCheck == "0") {
	        if (getVerifycode.html() != inputTip.msgCode.btnDefault) {
	            tipMsgTest.tipVisible(inputTip.msgCode.tipDisabled);
	            return;
	        } else {

	        }
	        var option = {
	            "mobile": $("[data-node = 'phone_number'] input[type = 'text']").val()
	        };
	        fetch.post(url.get("getVerificationCode"), {
	            data: option
	        }).done(function(data, textStatus, XHR) {
	            if (data.success) {
	                var i = 60;
	                getVerifycode.css("background", "#DDD").html(i + inputTip.msgCode.btnAfterSend);
	                spanCodes.html(inputTip.msgCode.tipSend).css({
	                    "visibility": "visible",
	                    "color": "#F95353"
	                });
	                var s = setInterval(function() {
	                    if (i == 1) {
	                        clearInterval(s);
	                        spanCodes.css("visibility", "hidden");
	                        getVerifycode.html(inputTip.msgCode.btnDefault);
	                        tipMsgTest.tipHide();
	                    } else {
	                        i--;
	                        getVerifycode.html(i + inputTip.msgCode.btnAfterSend);
	                    }
	                }, 1030);
	            } else {
	                //请求返回错误 - 提示信息
	                if (data.message == '该手机号已被注册') {
	                    phoneTip.tipVisible(inputTip.tel.errBack);
	                } else if (data.message == '发送次数超过限制') {
	                    tipMsgTest.tipVisible(inputTip.msgCode.tipLimitEdit);
	                } else if (data.message == '验证码错误') {
	                    tipMsgTest.tipVisible(inputTip.msgCode.tipWrong);
	                } else {
	                    tipMsgTest.tipVisible(data.message);
	                }
	                $('[data-node=phone_number_allright]').tipHide();
	            }
	        }).fail(function(XHR, textStatus, errorThrown) {
	            alert("数据请求失败 请稍后尝试");
	        })
	    } else {
	        if (phoneInput.val() == "") {
	            phoneTip.tipVisible(inputTip.tel.ept);
	        } else {
	            phoneTip.tipVisible(inputTip.tel.err);
	        }
	        phoneLi.addClass("lg-form-error");
	    }
	};

	msgTestInput.on("textchange", function() {
	    $("[data-node='tip_msg_test']").tipHide();
	});
	$("[data-node='get_verifyCode']").on("click", getCode);
	$('[data-node=input_msg_test]').on('textchange', function() {
	    var reg = /^[0-9]*$/;
	    if ($(this).val().length < 6 || !reg.test($(this).val())) {
	        if ($(this).val().length == 0) {
	            $('[data-node=tip_msg_test]').tipVisible(inputTip.msgCode.tipEpt);
	        } else {
	            $('[data-node=tip_msg_test]').tipVisible(inputTip.msgCode.tipErr);
	        }
	    }
	});
	completeBtn.unbind('input').on("click", complete);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

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

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * jQuery "splendid textchange" plugin
	 * http://benalpert.com/2013/06/18/a-near-perfect-oninput-shim-for-ie-8-and-9.html
	 *
	 * (c) 2013 Ben Alpert, released under the MIT license
	 */

	var testNode = document.createElement("input");
	var isInputSupported = "oninput" in testNode && 
	    (!("documentMode" in document) || document.documentMode > 9);

	var hasInputCapabilities = function(elem) {
	    // The HTML5 spec lists many more types than `text` and `password` on
	    // which the input event is triggered but none of them exist in IE 8 or
	    // 9, so we don't check them here.
	    // TODO: <textarea> should be supported too but IE seems to reset the
	    // selection when changing textarea contents during a selectionchange
	    // event so it's not listed here for now.
	    return elem.nodeName === "INPUT" &&
	        (elem.type === "text" || elem.type === "password");
	};

	var activeElement = null;
	var activeElementValue = null;
	var activeElementValueProp = null;

	/**
	 * (For old IE.) Replacement getter/setter for the `value` property that
	 * gets set on the active element.
	 */
	var newValueProp =  {
	    get: function() {
	        return activeElementValueProp.get.call(this);
	    },
	    set: function(val) {
	        activeElementValue = val;
	        activeElementValueProp.set.call(this, val);
	    }
	};

	/**
	 * (For old IE.) Starts tracking propertychange events on the passed-in element
	 * and override the value property so that we can distinguish user events from
	 * value changes in JS.
	 */
	var startWatching = function(target) {
	    activeElement = target;
	    activeElementValue = target.value;
	    activeElementValueProp = Object.getOwnPropertyDescriptor(
	            target.constructor.prototype, "value");

	    Object.defineProperty(activeElement, "value", newValueProp);
	    activeElement.attachEvent("onpropertychange", handlePropertyChange);
	};

	/**
	 * (For old IE.) Removes the event listeners from the currently-tracked
	 * element, if any exists.
	 */
	var stopWatching = function() {
	  if (!activeElement) return;

	  // delete restores the original property definition
	  delete activeElement.value;
	  activeElement.detachEvent("onpropertychange", handlePropertyChange);

	  activeElement = null;
	  activeElementValue = null;
	  activeElementValueProp = null;
	};

	/**
	 * (For old IE.) Handles a propertychange event, sending a textChange event if
	 * the value of the active element has changed.
	 */
	var handlePropertyChange = function(nativeEvent) {
	    if (nativeEvent.propertyName !== "value") return;

	    var value = nativeEvent.srcElement.value;
	    if (value === activeElementValue) return;
	    activeElementValue = value;

	    $(activeElement).trigger("textchange");
	};

	if (isInputSupported) {
	    $(document)
	        .on("input", function(e) {
	            // In modern browsers (i.e., not IE 8 or 9), the input event is
	            // exactly what we want so fall through here and trigger the
	            // event...
	            if (e.target.nodeName !== "TEXTAREA") {
	                // ...unless it's a textarea, in which case we don't fire an
	                // event (so that we have consistency with our old-IE shim).
	                $(e.target).trigger("textchange");
	            }
	        });
	} else {
	    $(document)
	        .on("focusin", function(e) {
	            // In IE 8, we can capture almost all .value changes by adding a
	            // propertychange handler and looking for events with propertyName
	            // equal to 'value'.
	            // In IE 9, propertychange fires for most input events but is buggy
	            // and doesn't fire when text is deleted, but conveniently,
	            // selectionchange appears to fire in all of the remaining cases so
	            // we catch those and forward the event if the value has changed.
	            // In either case, we don't want to call the event handler if the
	            // value is changed from JS so we redefine a setter for `.value`
	            // that updates our activeElementValue variable, allowing us to
	            // ignore those changes.
	            if (hasInputCapabilities(e.target)) {
	                // stopWatching() should be a noop here but we call it just in
	                // case we missed a blur event somehow.
	                stopWatching();
	                startWatching(e.target);
	            }
	        })

	        .on("focusout", function() {
	            stopWatching();
	        })

	        .on("selectionchange keyup keydown", function() {
	            // On the selectionchange event, e.target is just document which
	            // isn't helpful for us so just check activeElement instead.
	            //
	            // 90% of the time, keydown and keyup aren't necessary. IE 8 fails
	            // to fire propertychange on the first input event after setting
	            // `value` from a script and fires only keydown, keypress, keyup.
	            // Catching keyup usually gets it and catching keydown lets us fire
	            // an event for the first keystroke if user does a key repeat
	            // (it'll be a little delayed: right before the second keystroke).
	            // Other input methods (e.g., paste) seem to fire selectionchange
	            // normally.
	            if (activeElement && activeElement.value !== activeElementValue) {
	                activeElementValue = activeElement.value;
	                $(activeElement).trigger("textchange");
	            }
	        });
	}


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

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

/***/ 194:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {//手机号验证
	var moduleTrim = __webpack_require__(47);
	var inputTip = __webpack_require__(35);
	var setPhoneNumber = function () {
	    var reg = /^1[3|4|5|7|8][0-9]\d{8,8}$/g;
	    var wrongNumber = function (msg) {
	        $("[data-node='phone_number']").addClass("lg-form-error").attr("data-verification", "1");
	        $("[data-node='tip_phone_number']").html(msg).css("visibility", "visible");
	    };
	    var val = this.value;
	    if (moduleTrim(val) == "") {
	        // this.select();
	        return wrongNumber(inputTip.tel.ept);
	    } else if (!reg.test(val)) {
	        return wrongNumber(inputTip.tel.err)
	    } else {
	        $("[data-node='phone_number']").removeClass("lg-form-error").attr("data-verification", "0");
	        $("[data-node='tip_phone_number']").css("visibility", "hidden");
	        $("[data-node='phone_number_allright']").css("visibility", "visible");

	    }
	};
	$("[data-node='phone_number'] input[type = 'text']").on({
	    blur: setPhoneNumber,
	    focus: function () {
	        $("[data-node='phone_number']").removeClass("lg-form-error");
	        $("[data-node='phone_number_allright']").css("visibility", "hidden");
	        $("[data-node='tip_phone_number']").css("visibility", "hidden");
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {//密码校验
	var moduleTrim = __webpack_require__(47);
	var check = __webpack_require__(48);
	var modulesPwdStrength = __webpack_require__(129);
	var textchange = __webpack_require__(52);
	var inputTip = __webpack_require__(35);

	var liPassword = $("[data-node='password']");
	var inputPassword = $("[data-node='input_password']");
	var passwordAllright = $('[data-node=password_allright]');
	var inputPassConfirm = $('[data-node=input_password_confirm]');
	var passConfirmAllright = $('[data-node=password_confirm_allright]');
	var liPassConfirm = $('[data-node=password_confirm]');
	var tipPassConfirm = $('[data-node=tip_password_confirm]');
	var tipPass = $("[data-node='tip_pass']");

	$.fn.extend({
	    visible: function () {
	        $(this).css('visibility', 'visible');
	    },
	    hidden: function () {
	        $(this).css('visibility', 'hidden');
	    }
	});
	var inputEvent = {
	    onfocus: function () {
	        tipPass.css({"visibility": "visible", "color": "#F95353"});
	    },
	    input: function () {
	        var val = moduleTrim(inputPassword.val());
	        var checkVal = inputPassConfirm.val();
	        if (val != "") {
	            $("[data-node='pass_level']").css("display", "block");
	            if (modulesPwdStrength(val) < 60) {	//密码强度分数小于60
	                $("[data-node='level_strong'],[data-node='level_md']").css("background-color", "#CCC");
	                $("[data-node='level_weak']").css("background-color", "#e60012");
	                if (modulesPwdStrength(val) <= 27 || !check.passwordReg(val) || val.length < 6) {
	                    tipPass.html(inputTip.pwd.commonTip).show();
	                    liPassword.attr("data-pass", "1");
	                } else {
	                    tipPass.html(inputTip.pwd.commonTip).hide();
	                    liPassword.attr("data-pass", "0");
	                }
	            } else if (modulesPwdStrength(val) >= 60 && modulesPwdStrength(val) < 80) {
	                if (!check.checkSpace(inputPassword.val())) {
	                    $("[data-node='level_weak'],[data-node = 'level_strong']").css("background-color", "#CCC");
	                    $("[data-node='level_md']").css("background-color", "#f39800");
	                    liPassword.attr("data-pass", "0");
	                }
	            } else if (modulesPwdStrength(val) >= 80) {
	                if (!check.checkSpace(inputPassword.val())) {
	                    $("[data-node='level_weak'],[data-node = 'level_md']").css("background-color", "#CCC");
	                    $("[data-node='level_strong']").css("background-color", "#22ac38");
	                    liPassword.attr("data-pass", "0");
	                }
	            }
	            if (val.length >= 6 && val.length <= 20 && check.passwordReg(val)) {
	                if (modulesPwdStrength(val) > 27 && !check.checkSpace(inputPassword.val())) {
	                    passwordAllright.visible();
	                    liPassword.attr("data-pass", "0");
	                } else {
	                    if (check.checkSpace(inputPassword.val())) {
	                        passwordAllright.hidden();
	                        liPassword.attr("data-pass", "1");
	                        tipPass.html(inputTip.pwd.commonTip).show();
	                    }
	                }
	            } else {
	                passwordAllright.hidden();
	                liPassword.attr("data-pass", "1");
	            }
	            if (checkVal != val && liPassConfirm.attr('data-passconfirm') == 0 && !check.checkSpace(inputPassword.val())) {
	                liPassConfirm.attr('data-passconfirm', 1);
	                passConfirmAllright.hidden();
	                tipPassConfirm.visible();
	            } else if (checkVal == val && liPassConfirm.attr('data-passconfirm') == 1) {
	                if (passwordAllright.css('visibility') == 'visible') {
	                    liPassConfirm.attr('data-passconfirm', 0);
	                    passConfirmAllright.visible();
	                }
	                tipPassConfirm.hidden();
	            } else if (checkVal != val && liPassConfirm.attr('data-passconfirm') == 1 && check.checkSpace(inputPassword.val())) {
	                passConfirmAllright.hidden();
	                tipPassConfirm.hidden();
	            } else {
	                passConfirmAllright.hidden();
	            }
	        } else {
	            if (check.checkSpace(inputPassword.val())) {
	                tipPass.html(inputTip.pwd.commonTip).show();
	                if (checkVal == inputPassword.val()) {
	                    tipPassConfirm.hidden();
	                }
	            }
	            $("[data-node='pass_level']").css("display", "none");
	            tipPass.html(inputTip.pwd.commonTip).show();
	            liPassword.attr("data-pass", "1");
	        }
	    }
	};
	inputPassword.on({
	    focus: inputEvent.onfocus,
	    textchange: inputEvent.input
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var textchange = __webpack_require__(52);
	var check = __webpack_require__(48);
	var inputTip = __webpack_require__(35);
	var inputPassword = $("[data-node='input_password_confirm']");
	var tip = $("[data-node='tip_password_confirm']");
	var pwdAllright = $('[data-node=password_allright]');
	var standardVal = $("[data-node='input_password']").val();
	var passConfirm = $("[data-node='password_confirm']");
	var passAllright = $('[data-node=password_confirm_allright]');

	var inputEvent = {
		onfocus:function (){
			if( passConfirm.attr("data-passConfirm") == 1 && inputPassword.val() == "" ){
				tip.html(inputTip.pwdV.ept).css({'color':'#F95353','visibility':'visible'})
				passAllright.css('visibility','hidden');
			}
		},
		onblur:function (){
			var val = this.value;
			 standardVal = $("[data-node='input_password']").val();
			if( val == "" ){
				tip.css('visibility','hidden');
				passConfirm.attr("data-passConfirm","1");
				passAllright.css('visibility','hidden');
			}else{
				if( standardVal == val ){
					if( pwdAllright.css('visibility') == 'visible' ){
						tip.css('visibility','hidden');
						passConfirm.attr("data-passConfirm","0");
						passAllright.css('visibility','visible');
					}else{
						tip.hidden();
					}
				}else{
					tip.html(inputTip.pwdV.err).css('visibility','visible');
					passConfirm.attr("data-passConfirm","1");
					passAllright.css('visibility','hidden');
				}
			}
		},
		oninput:function (){
			var val = this.value;
			var standardVal = $("[data-node='input_password']").val();
			if( val == "" ){
				tip.html(inputTip.pwdV.ept);
				passConfirm.attr("data-passConfirm","1");
				passConfirm.attr("data-passConfirm","1");
			}else{
				if( standardVal == val ){
					if( pwdAllright.css('visibility') == 'visible' ){
						tip.css('visibility','hidden');
						passConfirm.attr("data-passConfirm","0");
						passAllright.css('visibility','visible');
					}else{
						tip.hidden();
					}
				}else{
					if( val == "" ){
						tip.html(inputTip.pwdV.ept);
						tip.css('visibility','visible');
					}else{
						if( !check.checkSpace(standardVal) ){
							tip.html(inputTip.pwdV.err);
							tip.css('visibility','visible');
						}
					}
					passAllright.css('visibility','hidden');
					passConfirm.attr("data-passConfirm","1");
				}
			}
		}
	};
	inputPassword.on({
		focus:inputEvent.onfocus,
		blur:inputEvent.onblur,
		textchange:inputEvent.oninput
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {//确认协议
	var maskShow = function () {
	    $("[data-node='mask']").css("display", "block");
	};
	var onCheck = function () {
	    $('[data-node=check_agreement]').toggleClass("lg-radio-true");
	    if ($('[data-node=check_agreement]').hasClass('lg-radio-true')) {
	        $('[data-node=complete]').css('background', '#e71246');
	    } else {
	        $('[data-node=complete]').css('background', '#CCC');
	    }
	};
	$('[data-node=agreement]').on("click", maskShow);
	$('[data-node=check_agreement]').on('click', onCheck);
	$('[data-node=pc-btnh45]').on("click", function () {
	    $('[data-node=mask]').css("display", "none");
	    $('[data-node=check_agreement]').addClass("lg-radio-true");
	    $('[data-node=complete]').css('background', '#e71246');
	});
	$('[data-node=close_mask]').on("click", function () {
	    $('[data-node=mask]').css("display", "none");
	    $('[data-node=check_agreement]').removeClass("lg-radio-true");
	    $('[data-node=complete]').css('background', '#CCC');
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var moduleTrim = __webpack_require__(47);

	var $Form = $("[data-node=lg-form]");
	var codeInput = $Form.find("[data-node='code_input']");
	var codeSkip = $Form.find("[data-node='code_skip']");
	var codeComplete = $Form.find("[data-node='code_complete']");
	var codeSpan = $Form.find('[data-node=code_span]');
	var codeAllright = $Form.find('[data-node=code_allright]');
	var inputTip = __webpack_require__(35);
	var codeEvents = {
	    onfocus: function () {
	        codeSpan.css("visibility", "hidden");
	        codeAllright.css("visibility", "hidden");
	    },
	    onblur: function () {
	        var val = codeInput.val();
	        if (moduleTrim(codeInput.val()) != "") {
	            fetch.post(url.get("checkRecommendationCode"), {data: {"referralCode": val}}).done(function (data, textStatus, XHR) {
	                if (data.success) {
	                    codeInput.attr({"data-code": "0", "data-userId": data.data.userId});
	                    codeAllright.css('visibility', 'visible');
	                } else {
	                    codeInput.attr({"data-code": "1", "data-userId": "false"});
	                    codeSpan.html(inputTip.refCode.err).css({"visibility": "visible", "color": "#F95353"});
	                    codeAllright.css("visibility", "hidden");
	                }
	            }).fail(function (XHR, textStatus, errorThrown) {
	                alert("数据请求失败 请稍后尝试");
	            });
	        } else {
	            codeInput.attr({"data-userId": ""});
	            if( codeInput.val().length>0 ){
	                codeSpan.html(inputTip.refCode.err).css({"visibility": "visible", "color": "#F95353"});
	            }
	        }
	    },
	    oninput: function () {
	        var val = codeInput.val();
	        if (moduleTrim(codeInput.val()) != "") {
	            codeInput.attr({"data-userId": val});
	        } else {
	            codeInput.attr({"data-userId": ""});
	        }
	    }
	};
	//推荐码输入框绑定事件
	var init = function (){
	    codeInput.on({
	        focus: codeEvents.onfocus,
	        blur: codeEvents.onblur,
	        input: codeEvents.oninput
	    });
	}
	module.exports = init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});