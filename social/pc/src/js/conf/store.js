webpackJsonp([36],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var changePwd = __webpack_require__(270);

	//修改门店密码
	changePwd.init();

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

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	/**
	 * 找回门店密码
	 * @author QiaoLi
	 */

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var check = __webpack_require__(64);
	var storeTip = __webpack_require__(36);

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
	var ok = 'iconn-20';
	var borderLine = 'lg-form-error';
	$phone.attr({
	    maxlength: '11'
	});

	var emptyInput = function emptyInput(name) {
	    name.text('');
	    hideBorder(name);
	};

	var showOkTip = function showOkTip(name) {
	    name.parent($storeLi).find($okTip).addClass(ok);
	};

	var hideOkTip = function hideOkTip(name) {
	    name.parent($storeLi).find($okTip).removeClass(ok);
	};

	var showBorder = function showBorder(name) {
	    name.parent($storeLi).addClass(borderLine);
	};

	var hideBorder = function hideBorder(name) {
	    name.parent($storeLi).removeClass(borderLine);
	};

	//验证门店账号
	var validateName = function validateName() {
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
	var validatePhone = function validatePhone() {
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
	var validate = function validate() {
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
	var changePwd = function changePwd() {
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
	        }).done(function (data) {
	            $reset.text('重置');
	            if (data.success === true) {
	                location.href = $_CONFIG['passport_domain'] + "shop/result";
	            } else {
	                $errorTip.removeClass(hide).find('span').text(data.message);
	            }
	        }).fail(function (data) {
	            $errorTip.removeClass(hide).find('span').text(data.message);
	        }).always(function () {
	            flag = false;
	        });
	    }
	    return false;
	};

	var init = function init() {
	    $storeName.on({
	        blur: validateName,
	        focus: function focus() {
	            emptyInput($nameTip);
	            hideOkTip($storeName);
	        }
	    });
	    $phone.on({
	        blur: validatePhone,
	        focus: function focus() {
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