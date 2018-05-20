webpackJsonp([14],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(158).init();
	__webpack_require__(159).init();
	// 发送统计数据用
	var buriedPoint = __webpack_require__(54);
	buriedPoint.setPageData('login');


/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var qrTips = __webpack_require__(35);
	var alert = __webpack_require__(36);
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

	var handleState = function(status) { //自定义显示方法(与接口无关，只控制显示状态)
	    if (status === 0) { //扫码登录框全部隐藏
	        qrCodeBox.hide();
	        qrCodeFailBox.hide();
	        qrCodeSucBox.hide();
	    } else if (status === 1) { //显示扫码
	        qrCodeBox.show();
	        qrCodeFailBox.hide();
	        qrCodeSucBox.hide();
	    } else if (status === 2) { //显示扫码和刷新按钮
	        qrCodeBox.show();
	        qrCodeFailBox.show();
	        qrCodeSucBox.hide();
	    } else if (status === 3) { //显示已扫码未登录
	        qrCodeBox.hide();
	        qrCodeFailBox.hide();
	        qrCodeSucBox.show();
	    }
	};
	//设置文案
	var setMsg = function(textTip, btnTip) {
	    qrCodeTip.text(textTip);
	    refQrCode.text(btnTip);
	};
	//获取二维码
	var getQrCode = function() {
	    handleState(1);
	    qrCodeImg.attr('src', '');
	    return fetch.get(url.get('getQrCode')).done(function(data) {
	        if (data.success) {
	            ssid = data.data.ssid;
	            qrCodeImg.attr("src", data.data.genQrcode);
	        } else {
	            handleState(2);
	            setMsg(tips.failGetTip, tips.failGetBtn);
	        }
	    }).fail(function() {
	        handleState(2);
	        setMsg(tips.failGetTip, tips.failGetBtn);
	    });
	};
	//让二维码失效
	var abolishQrCode = function() {
	    fetch.post(url.get('abolishQrCode'), {
	        data: {
	            "ssid": ssid
	        }
	    }).done(function(data) {

	    });
	};
	//监测扫描结果
	var monitorScan = function() {
	    fetch.get(url.get('getSsidStatus'), {
	        data: {
	            "ssid": ssid,
	        },
	        timeout: checkTime
	    }).done(function(data) {
	        var status = data.data.ssidStatus;
	        ssidStatus = status;
	        if (status === 0) {

	        } else if (status === 1 || status === 3) {
	            handleState(2);
	            setMsg(tips.loseEffTip, tips.loseEffBtn);
	            cancelTimer();
	            console.log(checkTimer);
	        } else if (status === 2) {
	            handleState(3);
	        } else if (status === 4) {
	            cancelTimer();
	            location.href = data.data.headerUrl;
	        } else {
	            alert('port change!');
	        }
	    }).fail(function(jqXHR, textStatus, errorThrown) {
	        cancelTimer();
	    });
	};
	var initAccLogin = function() { //初始化账号登录
	    qrCodeImg.attr("src", '');
	    cancelTimer();
	    handleState(0);
	    if (ssidStatus !== 1 & ssidStatus !== 3) {
	        abolishQrCode();
	    }
	};
	var initQrCode = function() { //初始化扫码登录
	    getQrCode().then(function() {
	        startTimer(checkTime);
	    });
	};
	var startTimer = function(delay) { //启动定时器
	    cancelTimer();
	    checkTimer = setInterval(monitorScan, delay);
	};
	var cancelTimer = function() {
	    if (checkTimer) {
	        clearInterval(checkTimer);
	    }
	};
	var initQrCodeEvent = function() {
	    qrCodeBtn.on("click", initQrCode);
	    refQrCode.on('click', initQrCode);
	    backToQrCode.on('click', initQrCode);
	    accLoginBtn.on("click", initAccLogin);
	};

	module.exports = {
	    init:initQrCodeEvent
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var crypto = __webpack_require__(39);

	var userForm = $('[data-node=userForm]');
	var userNum = userForm.find($('[data-node=userNum]'));
	var userPwd = userForm.find($('[data-node=userPwd]'));
	var errorLi = userForm.find($('[data-node=error]'));
	var userLogin = userForm.find($('[data-node=userLogin]'));
	var identifyPlace = $('[data-node=identifyplace]');
	var changeCode = $('[data-node=change-code]');
	var valCode = $('[data-node=code]');
	var emptyUser = userForm.find('[data-node=emptyUser]');
	var emptyPwd = userForm.find('[data-node=emptyPwd]');
	var flag = true;
	__webpack_require__(41);
	userNum.placeholder();
	userPwd.placeholder();


	//表单验证
	var checkForm = function() {
	    if (userNum.val() === "") { //账号都为空
	        errorLi.removeClass('none').find('span').text("请输入账号");
	        setWarnStyle(userNum);
	        return false;
	    } else if (userPwd.val() === "") { //密码为空
	        errorLi.removeClass('none').find('span').text("请输入密码");
	        setWarnStyle(userPwd);
	        return false;
	    } else { //账号密码都输入的情况下
	        var verifyCode = valCode.val();
	        if (!identifyPlace.hasClass('none')) {
	            if (verifyCode == "") {
	                valCode.css('border', '1px solid #f95353');
	                return;
	            }
	        }
	        var loginData = {
	            login_name: userNum.val(),
	            password: crypto(userPwd.val()),
	            verifyCode: verifyCode,
	            csrf_token: $GLOBAL_CONFIG.csrf_token
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
	        }).done(function(da) {
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
	                window.location.href = $GLOBAL_CONFIG['redirect'];
	            } else {
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
	        }).always(function() {
	            flag = true;
	        });
	    }
	};
	//绑定事件
	var fireEvent = function() {
	    $(document).keydown(function(e) { //键盘enter事件
	        if (e && e.keyCode == 13) {
	            e.preventDefault();
	            checkForm();
	        }
	    });
	    userLogin.on("click", function(e) { // 登录点击事件
	        e.preventDefault();
	        checkForm();
	    });
	    userNum.on("focus", function() { //账户focus事件
	        setStyle($(this));
	    });
	    userNum.on("keyup", function() { //账户keyup事件
	        isEmpty(userNum);
	    });
	    userNum.on("blur", function() { //账户blur事件
	        removeStyle($(this));
	    });
	    userPwd.on("focus", function() { //密码focus事件
	        setStyle($(this));
	    });
	    userPwd.on("blur", function() { //密码blur事件
	        removeStyle($(this));
	    });
	    userPwd.on("keyup", function() { //账户keyup事件
	        isEmpty(userPwd);
	    });
	    valCode.on('focus', function() { //验证码获取焦点事件
	        valCode.css('border', '1px solid #e5e5e5');
	    });
	    changeCode.on("click", function() {
	        identifyPlace.find('.code-img').attr('src', "/ajax/login/captcha?t=" + new Date().getTime());
	        valCode.val('');
	    });
	    emptyUser.on("click", function() {
	        emptyInfo(userNum);
	    });
	    emptyPwd.on("click", function() {
	        emptyInfo(userPwd);
	    });
	};
	var emptyInfo = function(obj) {
	    obj.val('');
	    obj.parent().find('em').addClass('none');
	};
	var isEmpty = function(obj) {
	    if (obj.val() !== "") {
	        obj.parent().find('em').removeClass('none');
	    } else {
	        obj.parent().find('em').addClass('none');
	    }
	};

	//设置样式
	var setStyle = function(obj) {
	    obj.parent().removeClass("land-error-it").addClass("land-focus");
	    errorLi.addClass('none');
	};
	//移除样式
	var removeStyle = function(obj) {
	    obj.parent().removeClass("land-focus");
	};
	var setWarnStyle = function(obj) {
	    obj.parent().addClass('land-error-it');
	};

	module.exports = {
	    init: fireEvent
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }

});