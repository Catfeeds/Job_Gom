webpackJsonp([29],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var changePwd = __webpack_require__(215);

	//修改门店密码
	changePwd.init();

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

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {/**
	 * 找回门店密码
	 * @author QiaoLi
	 */

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var trim = __webpack_require__(47);
	var check = __webpack_require__(48);
	var storeTip = __webpack_require__(35);

	var $storeList = $('[data-node=storeList]');
	var $storeLi = $storeList.find('li');
	var $storeName = $storeList.find('[data-node=storeName]');
	var $phone = $storeList.find('[data-node=phone]');
	var $nameTip = $storeList.find('[data-node=nameTip]');
	var $phoneTip = $storeList.find('[data-node=phoneTip]');
	var $errorTip = $storeList.find('[data-node=errorTip]');
	var $okTip = $storeList.find('[data-node=okTip]');
	var $reset = $('[data-action=reset]');

	var hide = 'hide';
	var borderLine = 'lg-form-error';
	var btnDefault = 'btn-default';
	$phone.attr({ maxlength: '11' });

	var emptyInput = function(name) {
	    name.text('');
	    hideBorder(name);
	};

	var showOkTip = function(name) {
	    name.parent($storeLi).find($okTip).removeClass(hide);
	};

	var hideOkTip = function(name) {
	    name.parent($storeLi).find($okTip).addClass(hide);
	};

	var showBorder = function(name) {
	    name.parent($storeLi).addClass(borderLine);
	};

	var hideBorder = function(name) {
	    name.parent($storeLi).removeClass(borderLine);
	};

	//验证门店账号
	var validateName = function() {
	    var val = $.trim($storeName.val());
	    var reg = /^[0-9a-zA-Z]+$/;
	    var ret = true;
	    if (val === '') {
	        ret = false;
	        $nameTip.text('请输入帐号');
	        showBorder($nameTip);
	    } else if (!reg.test(val)) {
	        ret = false;
	        $nameTip.text('门店帐号格式错误');
	        showBorder($nameTip);
	    } else {
	        emptyInput($storeName);
	        showOkTip($storeName);
	    }
	    return ret;
	};

	//验证手机号
	var validatePhone = function() {
	    var val = $.trim($phone.val());
	    var ret = true;
	    if (val === '') {
	        ret = false;
	        $phoneTip.text(storeTip.tel.ept);
	        showBorder($phoneTip);
	    } else if (!check.isMobileNum(val)) {
	        ret = false;
	        $phoneTip.text(storeTip.tel.err);
	        showBorder($phoneTip);
	    } else {
	        emptyInput($phone);
	        showOkTip($phone);
	    }
	    return ret;
	};

	//验证门店账号和手机号
	var validate = function() {
	    var ret = true;
	    if (!validateName()) {
	        ret = false;
	    } else if (!validatePhone()) {
	        ret = false;
	    }
	    return ret;
	};

	//重置
	var flag = false;
	var changePwd = function() {
	    if (validate()) {
	        if (flag) {
	            return;
	        }
	        flag = true;
	        $reset.text('重置中…');
	        fetch.get(url.get('storePwd'), {
	            data: {
	                carid: $storeName.val(),
	                mobile: $phone.val()
	            }
	        }).done(function(data) {
	            $reset.text('重置');
	            if (data.success === true) {
	                location.href = $_CONFIG['passport_domain'] + "shop/result";
	            } else {
	                $errorTip.removeClass(hide).find('span').text(data.message);
	            }
	        }).fail(function() {
	            $errorTip.removeClass(hide).find('span').text(data.message);
	        }).always(function() {
	            flag = false;
	        });
	    }
	    return false;
	};

	var init = function() {
	    $storeName.on({
	        blur: validateName,
	        focus: function() {
	            emptyInput($nameTip);
	            hideOkTip($storeName);
	        }
	    });
	    $phone.on({
	        blur: validatePhone,
	        focus: function() {
	            emptyInput($phoneTip);
	            hideOkTip($phone);
	        }
	    });
	    $reset.on('click', changePwd);
	};

	module.exports = {
	    init: init
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }

});