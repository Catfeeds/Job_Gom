webpackJsonp([52],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var isLogin = __webpack_require__(47);
	var modulesso = __webpack_require__(244);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(37);

	//验证表单
	var checkForm = __webpack_require__(44);
	//更新校验码
	var changeCaptcha = __webpack_require__(45);
	var crypto = __webpack_require__(40);
	var truncate = __webpack_require__(42);
	//账号升级
	var update = __webpack_require__(354);
	var unloginUpdate = __webpack_require__(356);

	var $userForm = $('[data-node=userForm]');
	var $loginBtn = $userForm.find('[data-node=userLogin]');

	var $identifyPlace = $userForm.find('[data-node=identifyplace]');
	var $valCode = $userForm.find('[data-node=code]');
	var $changeCode = $userForm.find('[data-node=change-code]');
	var $error = $userForm.find('[data-node=error]');

	var $loginDom = $userForm.find('[data-node=userLogin]');

	var $remainTime = $('[data-node=remainTime]');

	//限制验证码4位
	function textchange(node) {
	    if (node.val().length > 4) {
	        node.val(truncate(node.val(), 4));
	    }
	}

	function updateAccount() {
	    //协议校验
	    if (!modulesso.valid()) {
	        alert("你没有通过协议,请刷新页面重试");
	        return false;
	    }
	    //表单校验
	    if (!checkForm($userForm)) {
	        return false;
	    }

	    //是否登陆校验

	    if (isLogin()) {
	        update($userForm);
	    } else {
	        unloginUpdate($userForm);
	    }
	    return false;
	}

	function initEvent() {

	    if (isLogin()) {
	        modulesso.init($_CONFIG.main_domain);
	    } else {
	        modulesso.init();
	    }

	    $loginBtn.on('click', updateAccount);

	    $valCode.on('textchange', function () {
	        textchange($(this));
	    });

	    $changeCode.on('click', function () {
	        changeCaptcha($identifyPlace, $valCode, $changeCode);
	    });

	    $valCode.on('keydown', function () {
	        $error.addClass('none');
	    });
	}

	initEvent();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

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

/***/ 354:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var alert = __webpack_require__(37);
	var confirmPopUp = __webpack_require__(355);

	var firing = false;

	function update($userForm) {
	    var $loginDom = $userForm.find('[data-node=userLogin]');

	    if (firing) {
	        return;
	    }
	    firing = true;

	    $loginDom.text("升级中...");

	    fetch.get(url.get('accountUpgrade'))
	    //fetch.get('1.json')
	    .done(function (json) {
	        if (json && json.success) {
	            if (json.code == 200) {
	                confirmPopUp('升级成功');
	            } else {
	                alert(json.message);
	            }
	        } else {
	            alert(json.message);
	        }
	    }).fail(function (json) {
	        alert(json.message);
	    }).always(function () {
	        $loginDom.text("升级一账通账户");
	        firing = false;
	    });
	}
	module.exports = update;

/***/ },

/***/ 355:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';

	var alert = __webpack_require__(37);

	function popUp(content) {
	    alert(content, {
	        okValue: "回到首页",
	        cancel: false,
	        ok: function ok() {
	            window.location.href = $_CONFIG['main_domain'];
	        }
	    });
	}

	module.exports = popUp;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 356:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);

	var changeCaptcha = __webpack_require__(45);
	var crypto = __webpack_require__(40);
	var confirmPopUp = __webpack_require__(355);

	var passDomain = $_CONFIG.passport_domain;

	var firing = false;

	function unloginUpdate($userForm) {

	    if (firing) {
	        return;
	    }

	    firing = true;

	    var $loginBtn = $userForm.find('[data-node=userLogin]');

	    var $identifyPlace = $userForm.find('[data-node=identifyplace]');
	    var $valCode = $userForm.find('[data-node=code]');
	    var $changeCode = $userForm.find('[data-node=change-code]');

	    var $userNum = $userForm.find($('[data-node=userNum]'));
	    var $userPwd = $userForm.find($('[data-node=userPwd]'));

	    var $loginDom = $userForm.find('[data-node=userLogin]');
	    var $errorLi = $userForm.find('[data-node=error]');
	    var $errMes = $userForm.find('[data-node=error-message]');

	    var loginData = {
	        login_name: $userNum.val(),
	        password: crypto($userPwd.val()),
	        setid: "login",
	        verifyCode: $valCode.val(),
	        csrf_token: $GLOBAL_CONFIG.csrf_token,
	        isAuthorized: true
	    };

	    //错误提示
	    function showError(msg) {
	        $errorLi.removeClass('none');
	        $errMes.text(msg);
	    }

	    $loginDom.text("升级中...");

	    fetch.post(url.get('ajaxLoginData'), {
	        //fetch.get('1.json', {//调试用
	        async: false,
	        data: loginData,
	        headers: {
	            'Content-Type-Ctag': $.cookie('content_ctag') || ''
	        }
	    }).done(function (json) {

	        if (json && json.success) {
	            var aliasData = json.data;
	            if (aliasData.user.isMobileActivated == false) {
	                window.location.href = passDomain + "login/bindphonepage";
	                // window.location.href = "/login/bindphonepage";
	                return;
	            }
	            if (aliasData.isNeedReset) {
	                window.location.href = passDomain + "regist/indexnickname"; //跳到完善昵称页
	                return;
	            }
	            confirmPopUp(json.data.authorizedMessage);
	        } else {
	            if (json.data.is_code == 1) {
	                changeCaptcha($identifyPlace, $valCode, $changeCode);
	            }
	            showError(json.message);
	        }
	    }).always(function () {
	        firing = false;
	        $loginDom.text('升级一账通账户');
	    });
	    return false;
	}

	module.exports = unloginUpdate;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ }

});