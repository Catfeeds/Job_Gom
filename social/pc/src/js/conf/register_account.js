webpackJsonp([26],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	__webpack_require__(46);
	__webpack_require__(54);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var moduleTrim = __webpack_require__(51);
	var alert = __webpack_require__(37);
	var inputTip = __webpack_require__(36);
	var encrypt = __webpack_require__(40);
	var truncate = __webpack_require__(42);

	__webpack_require__(242); //手机号输入
	__webpack_require__(243); //密码输入
	var modulesso = __webpack_require__(244);
	__webpack_require__(245);

	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('register');
	// $Form.find();
	var $Form = $("[data-node=lg-form]");

	var phoneLi = $Form.find("[data-node='phone_number']");
	var phoneInput = $Form.find("[data-node='input_phone_number']");
	var phoneTip = $Form.find("[data-node='tip_phone_number']");

	var checkCodeLi = $Form.find("[data-node='check_code_li']");
	var checkCodeInput = $Form.find("[data-node='check_code_input']");
	var checkCodeTip = $Form.find("[data-node='check_code_tip']");
	// var checkCodeAllright = $Form.find("[data-node='check_code_allright']");
	var checkCodeImg = $Form.find("[data-node='check_code_img']");
	var checkCodeChange = $Form.find("[data-node='check_code_change']");

	var msgTestInput = $Form.find("[data-node='input_msg_test']");
	var spanCodes = $Form.find("[data-node='tip_msg_test']");
	var tipMsgTest = $Form.find('[data-node=tip_msg_test]');

	var pwdLi = $Form.find("[data-node='password']");
	var pwdInput = $Form.find("[data-node='input_password']");
	var pwdTip = $Form.find("[data-node='tip_pass']");

	var codeInput = $Form.find("[data-node='code_input']");
	// var codeSkip = $Form.find("[data-node='code_skip']");
	// var codeComplete = $Form.find("[data-node='code_complete']");
	// var codeSpan = $Form.find('[data-node=code_span]');
	// var codeAllright = $Form.find('[data-node=code_allright]');

	var completeBtn = $Form.find('[data-node=complete]');

	modulesso.init();

	//设置placehoder
	$('[data-node=input_phone_number],[data-node=input_msg_test],[data-node=input_password],[data-node=input_password_confirm],[data-node=code_input]').placeholder();
	//设置注册按钮和协议;
	//完成按钮提交页面数据
	$.fn.extend({
	    tipVisible: function tipVisible(str) {
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
	    tipHide: function tipHide() {
	        $(this).css('visibility', 'hidden');
	    }
	});

	//点击更换验证码
	var imgChange = function imgChange(data) {
	    var state = data || true;
	    if (state != 'keep') {
	        checkCodeImg.attr('src', $_CONFIG.passport_domain + url.get('getCheckCode') + '?setid=register&num=' + new Date().getTime());
	        checkCodeInput.val("");
	    }
	};

	var codeChange = function codeChange() {
	    imgChange();
	    checkCodeTip.tipHide();
	    checkCodeLi.removeClass('lg-form-error');
	};

	//完成按钮
	var complete = function complete() {
	    // BP.send({event_id: 'B000P021'}); // 发送统计数据
	    if (moduleTrim(phoneInput.val()) == "") {
	        imgChange();
	        return function () {
	            phoneLi.addClass("lg-form-error").attr("data-verification", "1");
	            phoneTip.tipVisible(inputTip.tel.ept);
	        }();
	    }
	    var phoneNumber = phoneLi.attr("data-verification");
	    var dataPass = pwdLi.attr("data-pass");
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
	    if (codeInput.attr('data-userid') === false) {
	        return alert('推荐码错误');
	    }
	    // if( !$("[data-node='check_agreement']").hasClass("lg-radio-true") ){
	    //     return;
	    // }
	    if (phoneNumber == 0 && dataPass == 0 && (codeInput.attr('data-userid') == '' || codeInput.attr('data-userid') != false)) {
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
	        }).done(function (data /*, textStatus, XHR*/) {
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
	            imgChange();
	        }).fail(function () /*XHR, textStatus, errorThrown*/{
	            imgChange();
	            alert("数据请求失败 请稍后尝试");
	        });
	    }
	};
	//验证码按钮
	var getCode = function getCode() {
	    var phoneNumberCheck = phoneLi.attr("data-verification");
	    var tipMsgTest = $("[data-node='tip_msg_test']");
	    var getVerifycode = $("[data-node='get_verifyCode']");
	    if (phoneNumberCheck == "0") {
	        if (getVerifycode.html() != inputTip.msgCode.btnDefault) {
	            tipMsgTest.tipVisible(inputTip.msgCode.tipDisabled);
	            return;
	        } else {}
	        if (moduleTrim(checkCodeInput.val()).length == 0) {
	            return function () {
	                checkCodeLi.addClass('lg-form-error');
	                checkCodeTip.tipVisible('请先输入验证码');
	            }();
	        }
	        var option = {
	            "mobile": $("[data-node = 'phone_number'] input[type = 'text']").val(),
	            "code": checkCodeInput.val(),
	            "setid": "register"
	        };
	        fetch.post(url.get("getVerificationCode"), {
	            data: option
	        }).done(function (data, textStatus, XHR) {
	            if (data.success) {
	                var i = 60;
	                getVerifycode.css("background", "#DDD").html(i + inputTip.msgCode.btnAfterSend);
	                checkCodeLi.removeClass('lg-form-error');
	                checkCodeTip.tipHide();
	                imgChange('keep');
	                spanCodes.html(inputTip.msgCode.tipSend).css({
	                    "visibility": "visible",
	                    "color": "#F95353"
	                });
	                var s = setInterval(function () {
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
	                } else if (data.message == '验证码输入错误,请重新输入' || data.code == "9111912") {
	                    checkCodeLi.addClass('lg-form-error');
	                    imgChange();
	                    checkCodeTip.tipVisible(inputTip.msgCode.checkCodeWrong);
	                } else if (data.message == '验证码错误') {
	                    tipMsgTest.tipVisible(inputTip.msgCode.tipWrong);
	                } else {
	                    tipMsgTest.tipVisible(data.message);
	                }
	            }
	        }).fail(function (XHR, textStatus, errorThrown) {
	            alert("数据请求失败 请稍后尝试");
	        });
	    } else {
	        if (phoneInput.val() == "") {
	            phoneTip.tipVisible(inputTip.tel.ept);
	        } else {
	            phoneTip.tipVisible(inputTip.tel.err);
	        }
	        phoneLi.addClass("lg-form-error");
	    }
	};

	//bindEvent
	msgTestInput.on("textchange", function () {
	    $("[data-node='tip_msg_test']").tipHide();
	});
	$("[data-node='get_verifyCode']").on("click", getCode);
	$('[data-node=input_msg_test]').on('textchange', function () {
	    var reg = /^[0-9]*$/;
	    if ($(this).val().length < 6 || !reg.test($(this).val())) {
	        if ($(this).val().length == 0) {
	            $('[data-node=tip_msg_test]').tipVisible(inputTip.msgCode.tipEpt);
	        } else {
	            $('[data-node=tip_msg_test]').tipVisible(inputTip.msgCode.tipErr);
	        }
	    }
	});
	checkCodeInput.on('textchange', function () {
	    var node = $(this);
	    checkCodeLi.removeClass('lg-form-error');
	    checkCodeTip.tipHide();
	    if (moduleTrim(node.val()).length > 4) {
	        node.val(truncate(node.val(), 4));
	    }
	});
	checkCodeChange.on('click', codeChange);
	completeBtn.unbind('input').on("click", complete);
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

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	/**
	 * jQuery "splendid textchange" plugin
	 * http://benalpert.com/2013/06/18/a-near-perfect-oninput-shim-for-ie-8-and-9.html
	 *
	 * (c) 2013 Ben Alpert, released under the MIT license
	 */

	var testNode = document.createElement("input");
	var isInputSupported = "oninput" in testNode && (!("documentMode" in document) || document.documentMode > 9);

	var hasInputCapabilities = function hasInputCapabilities(elem) {
	    // The HTML5 spec lists many more types than `text` and `password` on
	    // which the input event is triggered but none of them exist in IE 8 or
	    // 9, so we don't check them here.
	    // TODO: <textarea> should be supported too but IE seems to reset the
	    // selection when changing textarea contents during a selectionchange
	    // event so it's not listed here for now.
	    return elem.nodeName === "INPUT" && (elem.type === "text" || elem.type === "password");
	};

	var activeElement = null;
	var activeElementValue = null;
	var activeElementValueProp = null;

	/**
	 * (For old IE.) Replacement getter/setter for the `value` property that
	 * gets set on the active element.
	 */
	var newValueProp = {
	    get: function get() {
	        return activeElementValueProp.get.call(this);
	    },
	    set: function set(val) {
	        activeElementValue = val;
	        activeElementValueProp.set.call(this, val);
	    }
	};

	/**
	 * (For old IE.) Starts tracking propertychange events on the passed-in element
	 * and override the value property so that we can distinguish user events from
	 * value changes in JS.
	 */
	var startWatching = function startWatching(target) {
	    activeElement = target;
	    activeElementValue = target.value;
	    activeElementValueProp = Object.getOwnPropertyDescriptor(target.constructor.prototype, "value");

	    Object.defineProperty(activeElement, "value", newValueProp);
	    activeElement.attachEvent("onpropertychange", handlePropertyChange);
	};

	/**
	 * (For old IE.) Removes the event listeners from the currently-tracked
	 * element, if any exists.
	 */
	var stopWatching = function stopWatching() {
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
	var handlePropertyChange = function handlePropertyChange(nativeEvent) {
	    if (nativeEvent.propertyName !== "value") return;

	    var value = nativeEvent.srcElement.value;
	    if (value === activeElementValue) return;
	    activeElementValue = value;

	    $(activeElement).trigger("textchange");
	};

	if (isInputSupported) {
	    $(document).on("input", function (e) {
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
	    $(document).on("focusin", function (e) {
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
	    }).on("focusout", function () {
	        stopWatching();
	    }).on("selectionchange keyup keydown", function () {
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

/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	//手机号验证
	var moduleTrim = __webpack_require__(51);
	var inputTip = __webpack_require__(36);
	var setPhoneNumber = function setPhoneNumber() {
	    var reg = /^1[3|4|5|7|8][0-9]\d{8,8}$/g;
	    var wrongNumber = function wrongNumber(msg) {
	        $("[data-node='phone_number']").addClass("lg-form-error").attr("data-verification", "1");
	        $("[data-node='tip_phone_number']").html(msg).css("visibility", "visible");
	    };
	    var val = this.value;
	    if (moduleTrim(val) == "") {
	        // this.select();
	        return wrongNumber(inputTip.tel.ept);
	    } else if (!reg.test(val)) {
	        return wrongNumber(inputTip.tel.err);
	    } else {
	        $("[data-node='phone_number']").removeClass("lg-form-error").attr("data-verification", "0");
	        $("[data-node='tip_phone_number']").css("visibility", "hidden");
	        $("[data-node='phone_number_allright']").css("visibility", "visible");
	    }
	};
	$("[data-node='phone_number'] input[type = 'text']").on({
	    blur: setPhoneNumber,
	    focus: function focus() {
	        $("[data-node='phone_number']").removeClass("lg-form-error");
	        $("[data-node='phone_number_allright']").css("visibility", "hidden");
	        $("[data-node='tip_phone_number']").css("visibility", "hidden");
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 243:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	//密码校验
	var moduleTrim = __webpack_require__(51);
	var check = __webpack_require__(64);
	var modulesPwdStrength = __webpack_require__(168);
	__webpack_require__(54);
	var inputTip = __webpack_require__(36);

	var liPassword = $("[data-node='password']");
	var inputPassword = $("[data-node='input_password']");
	var passwordAllright = $('[data-node=password_allright]');
	var inputPassConfirm = $('[data-node=input_password_confirm]');
	var passConfirmAllright = $('[data-node=password_confirm_allright]');
	var liPassConfirm = $('[data-node=password_confirm]');
	var tipPassConfirm = $('[data-node=tip_password_confirm]');
	var tipPass = $("[data-node='tip_pass']");

	var pwdEyes = liPassword.find('[data-node=password_eyes]');

	$.fn.extend({
	    visible: function visible() {
	        $(this).css('visibility', 'visible');
	    },
	    hidden: function hidden() {
	        $(this).css('visibility', 'hidden');
	    }
	});
	var inputEvent = {
	    onfocus: function onfocus() {
	        tipPass.css({ "visibility": "visible", "color": "#F95353" });
	    },
	    input: function input() {
	        var val = moduleTrim(inputPassword.val());
	        var checkVal = inputPassConfirm.val();
	        if (val != "") {
	            $("[data-node='pass_level']").css("display", "block");
	            if (modulesPwdStrength(val) < 60) {
	                //密码强度分数小于60
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

	//隐藏/显示密码
	var eyes = function eyes() {
	    if ($(this).hasClass('active')) {
	        inputPassword.attr('type', 'text');
	        $(this).removeClass('active');
	    } else {
	        inputPassword.attr('type', 'password');
	        $(this).addClass('active');
	    }
	};
	pwdEyes.on('click', eyes);

	inputPassword.on({
	    focus: inputEvent.onfocus,
	    textchange: inputEvent.input
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 244:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	//一账通用户协议
	//遮罩层添加 data-node="ssoMask"
	//协议层添加 data-node="ssoMain"
	//验证是否同意弹层协议  module.valid() - true/false

	var ssoMask = $('[data-node=ssoMask]'),
	    ssoMain = $('[data-node=ssoMain]'),
	    btnClose = ssoMain.find('em.icon-btn'),
	    btnAgree = ssoMain.find('a.pc-btnw300.pc-btn.pc-btnh45'),
	    isAuthorized = false;

	var init = function init(url) {
		var _url = url || false;
		var agree = function agree() {
			ssoMask.addClass('hide');
			ssoMain.addClass('hide');
			isAuthorized = true;
		};
		var close = function close() {
			if (_url) {
				location.href = _url;
				return false;
			}
			if (document.referrer == "") {
				location.href = $_CONFIG.main_domain;
			} else {
				location.href = document.referrer;
			}
		};
		btnAgree.on('click', agree);
		btnClose.on('click', close);
	};

	var valid = function valid() {
		return isAuthorized;
	};

	module.exports = {
		init: init,
		valid: valid
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var moduleTrim = __webpack_require__(51);
	var inputTip = __webpack_require__(36);

	var $Form = $("[data-node=lg-form]");
	var codeLi = $Form.find("[data-node='code_li']");
	var codeInput = $Form.find("[data-node='code_input']");
	var codeSkip = $Form.find("[data-node='code_skip']");
	var codeComplete = $Form.find("[data-node='code_complete']");
	var codeSpan = $Form.find('[data-node=code_span]');
	var codeAllright = $Form.find('[data-node=code_allright]');

	var codeopen = $Form.find('[data-node=recommend_open]');
	var codeopenIcon = $Form.find('[data-node=recommend_icon]');

	var codeEvents = {
	    onfocus: function onfocus() {
	        codeSpan.css("visibility", "hidden");
	        codeAllright.css("visibility", "hidden");
	    },
	    onblur: function onblur() {
	        var val = codeInput.val();
	        if (moduleTrim(codeInput.val()) != "") {
	            fetch.post(url.get("checkRecommendationCode"), { data: { "referralCode": val } }).done(function (data, textStatus, XHR) {
	                if (data.success) {
	                    codeInput.attr({ "data-code": "0", "data-userId": data.data.userId });
	                    codeAllright.css('visibility', 'visible');
	                } else {
	                    codeInput.attr({ "data-code": "1", "data-userId": "false" });
	                    codeSpan.html(inputTip.refCode.err).css({ "visibility": "visible", "color": "#F95353" });
	                    codeAllright.css("visibility", "hidden");
	                }
	            }).fail(function (XHR, textStatus, errorThrown) {
	                alert("数据请求失败 请稍后尝试");
	            });
	        } else {
	            codeInput.attr({ "data-userId": "" });
	            if (codeInput.val().length > 0) {
	                codeSpan.html(inputTip.refCode.err).css({ "visibility": "visible", "color": "#F95353" });
	            }
	        }
	    },
	    oninput: function oninput() {
	        var val = codeInput.val();
	        if (moduleTrim(codeInput.val()) != "") {
	            codeInput.attr({ "data-userId": val });
	        } else {
	            codeInput.attr({ "data-userId": "" });
	        }
	    }
	};
	//推荐码输入框绑定事件
	var init = function init() {
	    codeInput.on({
	        focus: codeEvents.onfocus,
	        blur: codeEvents.onblur,
	        input: codeEvents.oninput
	    });
	};

	//展开/关闭推荐码输入框v
	var codeopenFn = function codeopenFn() {
	    if (codeLi.hasClass('hide')) {
	        codeLi.removeClass('hide');
	        codeopenIcon.attr('class', 'iconn-1');
	    } else {
	        codeLi.addClass('hide');
	        codeopenIcon.attr('class', 'iconn-2');
	    }
	};
	codeopen.on('click', codeopenFn);
	codeopenIcon.on('click', codeopenFn);

	module.exports = init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});