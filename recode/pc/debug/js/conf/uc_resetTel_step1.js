webpackJsonp([40],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {"use strict";
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var inputTip = __webpack_require__(83);
	var CountDown = __webpack_require__(199);
	var check = __webpack_require__(282);
	var limitLen = __webpack_require__(284);
	
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
	    sendMsgBtn.on('click', sendMsg);
	    msgCode.on({
	        "focus": inputFoc,
	        "keyup": inputKeyup,
	        "blur": inputBlur
	    });
	    nextStep.on('click', subFn);
	};
	
	initEvent();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Created by dongyukuan on 2016/7/4.
	 */
	var inputTip = {
	    tel: {
	        ept: '请填写11位手机号',
	        err: '手机号格式错误',
	        errBack: '该手机号已被注册'
	    },
	    msgCode: {
	        tipGet: '请获取短信验证码',
	        tipEpt: '请输入短信验证码',
	        tipErr: '验证码是6位数字,请重新输入',
	        tipErrEdit: '验证码错误',
	        tipWrong: '验证码有误,请重新输入',
	        checkCodeWrong: '验证码输入错误,请重新输入',
	        send: '验证码已发送，请注意查收',
	        tipSend: '验证码已发送您的手机，10分钟内输入有效',
	        tipDisabled: "验证码再次获取需间隔60s",
	        tipLimitEdit: '获取验证码超限，请稍后再试',
	        btnAfterSend: "秒后重新获取",
	        btnDefault: "获取验证码"
	    },
	    pwd: {
	        commonTip: '请输入6-20位英文字母,数字或符号'
	    },
	    pwdV: {
	        ept: '请再次输入密码',
	        err: '两次输入的密码不一致'
	    },
	    nickName: {
	        eptName: '请输入昵称！',
	        commonTip: '昵称只能输入2-20位字符、字母、数字、-、_',
	        existName: '此昵称太受欢迎了，已经有人抢了~',
	        sucSub: '资料修改成功！',
	        errLine: "网络超时!",
	        wrongName: '此昵称含有敏感词,请重新输入'
	    },
	    birthTip: {
	        tip: '生日不能重复设置'
	    },
	    refCode: {
	        err: '推荐码错误'
	    },
	    imgCode: {
	        ept: '请输入验证码',
	        err: '验证码输入错误，请重新输入'
	    },
	    login: {
	        errCode: '请输入验证码',
	        errNum: '请输入账号',
	        errPwd: '请输入密码',
	        agreement: '请同意协议并勾选'
	    },
	    createCircle: {
	        typeEmpty: '请选择圈子分类',
	        nameEmpty: '圈子名称不能为空',
	        upperLimit: '抱歉，您创建的圈子已经达到上限，暂不能创建！'
	    },
	    circle: {
	        login: '登录成功！',
	        unJoin: '需要先加入该圈子才能发布话题',
	        cannotJoin: '抱歉！该圈子不允许发布话题!',
	        review: '加入圈子审核中，请耐心等待!',
	        joinSuccess: '恭喜您已经加入圈子！',
	        joinSuccessPublic: '恭喜您已经加入圈子，快来发布话题吧！',
	        cannotJoinCircle: '抱歉！该圈子不允许任何人加入！',
	        exit: '您已经退出该圈子！',
	        dissolved: '抱歉！该圈子已被解散'
	    },
	    qrCodeTip: {
	        loseEffTip: '二维码已失效',
	        loseEffBtn: '点击刷新',
	        failGetTip: '二维码生成失败',
	        failGetBtn: '重新生成'
	    },
	    masterApply: {
	        nameLength: '姓名要2-20个字符',
	        nameType: '姓名仅限汉字和字母',
	        isIdCard: '请填写18位有效身份证号',
	        type: '请选择达人类别',
	        summary: '请输入自我介绍，2-100个字符'
	    },
	    upload: {
	        noUpload: '请上传图片',
	        uploadError: '请上传小于4M的图片，支持格式jpg、jpeg、png、gif！',
	        uploadFaild: '上传失败,请重新上传',
	        uploadError_Master: '请上传小于4M的图片，支持格式jpg、jpeg、png、gif!',
	        Q_EXCEED_NUM_LIMIT: '请上传小于4M的图片，支持格式jpg、jpeg、png、gif！',
	        Q_EXCEED_SIZE_LIMIT: '总文件大小超出限制',
	        Q_TYPE_DENIED: '文件类型错误',
	        F_EXCEED_SIZE: '请上传jpg、png格式且小于4M的图片！',
	        excess: '文件个数超出限制'
	    },
	    errLine: {
	        tip: '网络错误,请稍后再试！'
	    }
	};
	module.exports = inputTip;

/***/ }),

/***/ 199:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 282:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 284:
/***/ (function(module, exports) {

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

/***/ })

});
//# sourceMappingURL=uc_resetTel_step1.js.map