webpackJsonp([16],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(212).init();
	__webpack_require__(213).init();
	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('login');

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

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var qrTips = __webpack_require__(36);
	var alert = __webpack_require__(37);
	var loginForm = $('[data-node=userForm]');
	//登录方式切换按钮
	var qrCodeBtn = loginForm.find('[data-action=qrCodeBtn]');
	var accLoginBtn = loginForm.find('[data-action=accLoginBtn]');
	//扫码页面
	var qrCodeBox = loginForm.find('[data-node=qrCodeBox]');
	var qrCodeImg = qrCodeBox.find('[data-node=qrCodeImg]');

	var qrCodeFailBox = qrCodeBox.find('[data-node=qrCodeFailBox]');
	var qrCodeTip = qrCodeBox.find('[data-node=qrCodeTip]');
	var refQrCode = qrCodeBox.find('[data-action=refQrCode]');
	//扫码待手机确认登录页面
	var qrCodeSucBox = loginForm.find('[data-node=qrCodeSucBox]');
	var backToQrCode = qrCodeSucBox.find('[data-action=backToQrCode]');

	var tips = qrTips.qrCodeTip;
	var checkTime = 3000;
	var ssid = '';
	var ssidStatus;
	var checkTimer;

	var handleState = function handleState(status) {
	    //自定义显示方法(与接口无关，只控制显示状态)
	    if (status === 0) {
	        //扫码登录框全部隐藏
	        qrCodeBox.hide();
	        qrCodeFailBox.hide();
	        qrCodeSucBox.hide();
	    } else if (status === 1) {
	        //显示扫码
	        qrCodeBox.show();
	        qrCodeFailBox.hide();
	        qrCodeSucBox.hide();
	    } else if (status === 2) {
	        //显示扫码和刷新按钮
	        qrCodeBox.show();
	        qrCodeFailBox.show();
	        qrCodeSucBox.hide();
	    } else if (status === 3) {
	        //显示已扫码未登录
	        qrCodeBox.hide();
	        qrCodeFailBox.hide();
	        qrCodeSucBox.show();
	    }
	};
	//设置文案
	var setMsg = function setMsg(textTip, btnTip) {
	    qrCodeTip.text(textTip);
	    refQrCode.text(btnTip);
	};
	//获取二维码
	var getQrCode = function getQrCode() {
	    handleState(1);
	    qrCodeImg.attr('src', '');
	    return fetch.get(url.get('getQrCode')).done(function (data) {
	        if (data.success) {
	            ssid = data.data.ssid;
	            qrCodeImg.attr("src", data.data.genQrcode);
	        } else {
	            handleState(2);
	            setMsg(tips.failGetTip, tips.failGetBtn);
	        }
	    }).fail(function () {
	        handleState(2);
	        setMsg(tips.failGetTip, tips.failGetBtn);
	    });
	};
	//让二维码失效
	var abolishQrCode = function abolishQrCode() {
	    fetch.post(url.get('abolishQrCode'), {
	        data: {
	            "ssid": ssid
	        }
	    });
	};
	//监测扫描结果
	var monitorScan = function monitorScan() {
	    fetch.get(url.get('getSsidStatus'), {
	        data: {
	            "ssid": ssid
	        },
	        timeout: checkTime
	    }).done(function (data) {
	        var status = data.data.ssidStatus;
	        ssidStatus = status;
	        if (status === 0) {
	            return;
	        } else if (status === 1 || status === 3) {
	            handleState(2);
	            setMsg(tips.loseEffTip, tips.loseEffBtn);
	            cancelTimer();
	        } else if (status === 2) {
	            handleState(3);
	        } else if (status === 4) {
	            cancelTimer();
	            location.href = data.data.headerUrl;
	        } else {
	            alert('port change!');
	        }
	    }).fail(function () {
	        cancelTimer();
	    });
	};
	var initAccLogin = function initAccLogin() {
	    //初始化账号登录
	    qrCodeImg.attr("src", '');
	    cancelTimer();
	    handleState(0);
	    if (ssidStatus !== 1 & ssidStatus !== 3) {
	        abolishQrCode();
	    }
	};
	var initQrCode = function initQrCode() {
	    //初始化扫码登录
	    getQrCode().then(function () {
	        startTimer(checkTime);
	    });
	};
	var startTimer = function startTimer(delay) {
	    //启动定时器
	    cancelTimer();
	    checkTimer = setInterval(monitorScan, delay);
	};
	var cancelTimer = function cancelTimer() {
	    if (checkTimer) {
	        clearInterval(checkTimer);
	    }
	};
	var initQrCodeEvent = function initQrCodeEvent() {
	    qrCodeBtn.on("click", initQrCode);
	    refQrCode.on('click', initQrCode);
	    backToQrCode.on('click', initQrCode);
	    accLoginBtn.on("click", initAccLogin);
	};

	module.exports = {
	    init: initQrCodeEvent
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var crypto = __webpack_require__(40);
	var truncate = __webpack_require__(42);
	__webpack_require__(54);

	var CaptchaUrl = url.get('ajaxCaptcha') + '?setid=';
	var passDomain = $_CONFIG.passport_domain;
	CaptchaUrl = passDomain + CaptchaUrl + 'login&t=';

	var userForm = $('[data-node=userForm]');
	var userNum = userForm.find($('[data-node=userNum]'));
	var userPwd = userForm.find($('[data-node=userPwd]'));
	var errorLi = userForm.find($('[data-node=error]'));
	var errMes = errorLi.find('span');
	var userLogin = userForm.find($('[data-node=userLogin]'));
	var identifyPlace = $('[data-node=identifyplace]');
	var changeCode = $('[data-node=change-code]');
	var valCode = $('[data-node=code]');
	var emptyUser = userForm.find('[data-node=emptyUser]');
	var emptyPwd = userForm.find('[data-node=emptyPwd]');
	var flag = true;
	__webpack_require__(46);
	userNum.placeholder();
	userPwd.placeholder();

	//错误提示
	function showError(msg) {
	    errorLi.removeClass('none');
	    errMes.text(msg);
	}

	//表单验证
	var checkForm = function checkForm() {
	    // console.log(userNum.val() === "")
	    if (userNum.val() === "") {
	        //账号都为空
	        showError("请输入账号");
	        //errorLi.removeClass('none').find('span').text("请输入账号");
	        setWarnStyle(userNum);
	        return false;
	    } else if (userPwd.val() === "") {
	        //密码为空
	        // errorLi.removeClass('none').find('span').text("请输入密码");
	        showError("请输入密码");
	        setWarnStyle(userPwd);
	        return false;
	    } else {
	        //账号密码都输入的情况下
	        var verifyCode = valCode.val();
	        if (!identifyPlace.hasClass('none')) {
	            if (verifyCode == "") {
	                showError("请输入验证码");
	                valCode.css('border', '1px solid #f95353');
	                return;
	            }
	        }

	        var loginData = {
	            login_name: userNum.val(),
	            password: crypto(userPwd.val()),
	            verifyCode: verifyCode,
	            setid: "login",
	            csrf_token: $_CONFIG.csrf_token
	        };
	        if (flag == false) {
	            return false;
	        }
	        flag = false;
	        userLogin.find('span').text("登录中...");
	        fetch.post(url.get('loginData'), {
	            data: loginData,
	            headers: {
	                'Content-Type-Ctag': $.cookie('content_ctag') || ''
	            }
	        }).done(function (da) {
	            userLogin.find('span').text('登录');
	            if (da.success) {
	                var data = da.data;
	                if (data.user.isMobileActivated == false) {
	                    window.location.href = "/login/bindphonepage";
	                    return false;
	                }
	                if (data.isNeedReset) {
	                    window.location.href = "/regist/indexnickname"; //跳到完善昵称页
	                    return false;
	                }
	                window.location.href = $_CONFIG['redirect'];
	            } else {
	                if (da.data.is_code == 1) {
	                    changeCaptcha();
	                }
	                errorLi.removeClass('none').find('span').text(da.message);
	                /*
	                if (da.data.errorNum < 3) {
	                    errorLi.removeClass('none').find('span').text(da.message);
	                    identifyPlace.addClass('none');
	                } else if (da.data.errorNum >= 3) {
	                    identifyPlace.removeClass('none');
	                    if (valCode.val() == "") {
	                        errorLi.removeClass('none').find('span').text('请输入验证码');
	                        identifyPlace.find('.code-img').attr('src', "/ajax/login/captcha?t=" + new Date().getTime());
	                        valCode.val('');
	                    } else if (valCode.val() != "") {
	                        errorLi.removeClass('none').find('span').text(da.message);
	                        identifyPlace.find('.code-img').attr('src', "/ajax/login/captcha?t=" + new Date().getTime());
	                        valCode.val('');
	                    }
	                }
	                */
	            }
	        }).always(function () {
	            flag = true;
	        });
	    }
	};
	//更新验证码
	var changeCaptcha = function changeCaptcha() {
	    identifyPlace.removeClass('none').find('.code-img')
	    //.attr('src', CaptchaUrl + new Date().getTime());
	    .attr('src', CaptchaUrl + new Date().getTime());
	    valCode.val('');
	    changeCode.blur();
	};
	//绑定事件
	var fireEvent = function fireEvent() {
	    $(document).keydown(function (e) {
	        //键盘enter事件
	        if (e && e.keyCode == 13) {
	            e.preventDefault();
	            checkForm();
	        }
	    });
	    userLogin.on("click", function (e) {
	        // 登录点击事件
	        e.preventDefault();
	        checkForm();
	    });
	    userNum.on("focus", function () {
	        //账户focus事件
	        setStyle($(this));
	    });
	    userNum.on("keyup", function () {
	        //账户keyup事件
	        isEmpty(userNum, emptyUser);
	    });
	    userNum.on("blur", function () {
	        //账户blur事件
	        removeStyle($(this));
	    });
	    userPwd.on("focus", function () {
	        //密码focus事件
	        setStyle($(this));
	    });
	    userPwd.on("blur", function () {
	        //密码blur事件
	        removeStyle($(this));
	    });
	    userPwd.on("keyup", function () {
	        //账户keyup事件
	        isEmpty(userPwd, emptyPwd);
	    });
	    valCode.on('focus', function () {
	        //验证码获取焦点事件
	        valCode.css('border', '1px solid #e5e5e5');
	    });
	    changeCode.on("click", function () {
	        //identifyPlace.find('.code-img').attr('src', "/ajax/login/captcha?t=" + new Date().getTime());
	        identifyPlace.find('.code-img').attr('src', CaptchaUrl + new Date().getTime());
	        valCode.val('');
	    });
	    emptyUser.on("click", function () {
	        emptyInfo(userNum, emptyUser);
	    });
	    emptyPwd.on("click", function () {
	        emptyInfo(userPwd, emptyPwd);
	    });
	    valCode.on('textchange', function () {
	        var node = $(this);
	        if (node.val().length > 4) {
	            node.val(truncate(node.val(), 4));
	        }
	    });
	};
	var emptyInfo = function emptyInfo(obj, $target) {
	    obj.val('');
	    $target.addClass('none');
	};
	var isEmpty = function isEmpty(obj, $target) {
	    if (obj.val() !== "") {
	        $target.removeClass('none');
	    } else {
	        $target.addClass('none');
	    }
	};

	//设置样式
	var setStyle = function setStyle(obj) {
	    obj.parent().removeClass("land-error-it").addClass("land-focus");
	    errorLi.addClass('none');
	};
	//移除样式
	var removeStyle = function removeStyle(obj) {
	    obj.parent().removeClass("land-focus");
	};
	var setWarnStyle = function setWarnStyle(obj) {
	    obj.parent().addClass('land-error-it');
	};

	module.exports = {
	    init: fireEvent
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ }

});