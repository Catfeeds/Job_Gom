webpackJsonp([13],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var circleList = __webpack_require__(179);
	
	//他的圈子列表
	circleList.init();

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

	/*TMODJS:{}*/
	!function () {
		function a(a, b) {
			return (/string|function/.test(typeof b) ? h : g)(a, b)
		}
	
		function b(a, c) {
			return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
		}
	
		function c(a) {
			return l[a]
		}
	
		function d(a) {
			return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
		}
	
		function e(a, b) {
			if (m(a))for (var c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
		}
	
		function f(a, b) {
			var c = /(\/)[^\/]+\1\.\.\1/, d = ("./" + a).replace(/[^\/]+$/, ""), e = d + b;
			for (e = e.replace(/\/\.\//g, "/"); e.match(c);)e = e.replace(c, "/");
			return e
		}
	
		function g(b, c) {
			var d = a.get(b) || i({filename: b, name: "Render Error", message: "Template not found"});
			return c ? d(c) : d
		}
	
		function h(a, b) {
			if ("string" == typeof b) {
				var c = b;
				b = function () {
					return new k(c)
				}
			}
			var d = j[a] = function (c) {
				try {
					return new b(c, a) + ""
				} catch (d) {
					return i(d)()
				}
			};
			return d.prototype = b.prototype = n, d.toString = function () {
				return b + ""
			}, d
		}
	
		function i(a) {
			var b = "{Template Error}", c = a.stack || "";
			if (c)c = c.split("\n").slice(0, 2).join("\n"); else for (var d in a)c += "<" + d + ">\n" + a[d] + "\n\n";
			return function () {
				return "object" == typeof console && console.error(b + "\n\n" + c), b
			}
		}
	
		var j = a.cache = {}, k = this.String, l = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		}, m = Array.isArray || function (a) {
				return "[object Array]" === {}.toString.call(a)
			}, n = a.utils = {
			$helpers: {}, $include: function (a, b, c) {
				return a = f(c, a), g(a, b)
			}, $string: b, $escape: d, $each: e
		}, o = a.helpers = n.$helpers;
		a.get = function (a) {
			return j[a.replace(/^\.\//, "")]
		}, a.helper = function (a, b) {
			o[a] = b
		}, module.exports = a
	}();

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var Dialog = __webpack_require__(37);
	var noop = function noop() {};
	
	var create = function create(content, options) {
	    content = content || '';
	    options = options || {};
	    var defaults = {
	        fixed: true,
	        modal: true,
	        autofocus: false,
	        content: '<p class="del-pop-p">' + content + '</p>',
	        className: 'pop-box',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        ok: noop
	    };
	    $.extend(true, defaults, options);
	    var d = Dialog(defaults);
	
	    var header = d._$('header');
	    var title = d._$('title');
	    if (!options.title) {
	        title.css('borderBottom', 'none');
	    }
	    header.show();
	    d.show();
	    return d;
	};
	
	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var Dialog = __webpack_require__(37);
	var noop = function noop() {};
	
	var create = function create(content, options) {
	    var defaults = {
	        fixed: true,
	        modal: true,
	        content: '<p class="del-pop-p">' + content + '</p>',
	        className: 'pop-box',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        ok: noop,
	        cancel: noop,
	        btnWrapCls: 'two-buttons'
	    };
	    $.extend(true, defaults, options);
	
	    var d = Dialog(defaults);
	
	    // var header = d._$('header');
	    // var title = d._$('title');
	    // title.css('borderBottom', 'none');
	    // header.show();
	
	    d.show();
	    return d;
	};
	
	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

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

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {'use strict';
	
	/**
	 * showPic  - tmod helpers
	 * 社交部分显示默认图片
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(34);
	var showPic = function showPic(pic, defaultpic) {
		if (pic === '') {
			return $_CONFIG.imgpath + '/images/public/' + defaultpic;
		} else {
			return pic;
		}
	};
	
	module.exports = function () {
		tmod.helper('showPic', showPic);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	/**
	 * Ta的主页 右侧列表
	 * @author QiaoLi
	 */
	
	__webpack_require__(166)();
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var circle = __webpack_require__(180);
	var alert = __webpack_require__(36);
	var $circleList = $('[data-node=circleList]');
	var $page = $('[data-node=page]');
	var $pre = $('[data-action=pre]');
	var $next = $('[data-action=next]');
	
	var hide = 'hide';
	var disabled = 'disabled';
	
	var index = 1;
	var total = $_CONFIG.qzsl;
	var maxLength = $circleList.length;
	var getIndex = function getIndex(index) {
	    if (total < 9) {
	        $page.addClass(hide);
	    } else {
	        if (index === 1) {
	            $pre.addClass(disabled);
	            $next.removeClass(disabled);
	        } else if (index === maxLength) {
	            $pre.removeClass(disabled);
	            $next.addClass(disabled);
	        } else {
	            $pre.removeClass(disabled);
	            $next.removeClass(disabled);
	        }
	    }
	};
	
	// 切换圈子列表 翻页
	var changeContent = function changeContent(t, num) {
	    var $this = $(t);
	    if ($this.hasClass(disabled)) {
	        return false;
	    } else {
	        index = index + num;
	        $circleList.hide();
	        $circleList.eq(index - 1).show();
	        getIndex(index);
	    }
	    return false;
	};
	
	var init = function init() {
	    getIndex(1);
	
	    //圈子列表按钮 上一页
	    $pre.on('click', function () {
	        changeContent(this, -1);
	    });
	    //圈子列表按钮 下一页
	    $next.on('click', function () {
	        changeContent(this, 1);
	    });
	
	    // 点击加入圈子
	    $('[data-action="joinCircle"]').on('click', {
	        done: function done(str, $els) {
	            var $this = $(this);
	            if (str == 'join') {
	                $els.attr('data-membertype', 0);
	                $els.removeAttr('data-action');
	                $els.off('click');
	                $els.addClass('joined');
	                $els.attr('href', $els.attr('data-href'));
	            } else if (str == 'joined') {
	                $els.addClass('joined');
	                $els.attr('href', $els.attr('data-href'));
	                $els.attr('target', '_blank');
	                $els.off('click');
	            } else if (str == 'joining') {
	                $els.addClass('joined');
	                $els.html('审核中');
	            } else if (str == 'exit') {
	                $els.attr('data-membertype', 1);
	                $els.removeClass('joined');
	            }
	        },
	        word: { join: '+ 加入圈子', focus: '<i></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已加入' }
	    }, circle);
	
	    // 判断宽窄屏
	    /*screenChange();
	    window.onresize = function (){
	        screenChange();
	    };*/
	};
	// 判断宽窄屏
	/*var screenChange = function(){
	    $(window).width() > 1000 ? $('.wrap-box').removeClass('wrap-boxS') : $('.wrap-box').addClass('wrap-boxS');
	};
	*/
	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var alert = __webpack_require__(36);
	var confirm = __webpack_require__(64);
	var tips = __webpack_require__(83).circle;
	var checkLoginStatus = __webpack_require__(23);
	var loginPop = __webpack_require__(22);
	
	// var popTpl = "<p data-node='alertTitle' class='dialog_p'>申请已发送，请耐心等待</p><img data-node='QRcode' src=''><p class='dialog_p'>下载国美APP随时关注</p>";
	
	var join = function join(event) {
		var $els = event.data ? event.data.selector || $(this) : $(this);
		var $action = $els.attr('data-action');
		var done = event.data ? event.data.done || function () {} : function () {};
		var word = event.data ? event.data.word || { join: '加入圈子', focus: '退出圈子' } : { join: '加入圈子', focus: '退出圈子' };
		var groupId = $els.attr('data-groupid'),
		    memberType = $els.attr('data-membertype'),
		    bpData = {
			event_id: $els.attr('event-id'), // 埋点数据
			group_id: groupId,
			circle_type: $_CONFIG['s_c'] // 2级分类
		};
		if ($_CONFIG['topicid']) {
			bpData.topic_id = $_CONFIG['topicid'];
		}
		// 发送统计数据
		if (window.BP !== undefined) {
			BP.send(bpData);
		}
	
		if ($els.attr('data-verif') == 1) {
			alert('您已提交申请，请等待审核');
			return;
		}
		/*var firing = $els.attr('data-firing');
	 if (firing == 1) {
	 	return false;
	 }
	 $els.attr('data-firing', 1);*/
		var userid = $els.attr('data-userid');
		// var approvaltype = $els.attr('data-approvaltype');
	
	
		var newWeb = '';
		var noRefreshFetch = function noRefreshFetch(flag) {
			fetch.post(url.get('joinCircle'), {
				// validate: true,
				data: {
					groupid: groupId,
					imid: 'b_' + userid /*,
	                        onLogin: function (){
	                        $_CONFIG['islogin'] = '1';
	                        noRefreshFetch();
	                        }*/
				} }).done(function (data /*, textStatus, jqXHR*/) {
				if (data && data.code === 200 && data.success) {
					if (data.data.status === 0) {
						if ($action && $action == 'joinGroup' && !flag) {
							confirm(tips.joinSuccessPublic, {
								className: 'pop-box',
								okValue: '暂不发布',
								cancelValue: '立即发布话题',
								okCls: 'pc-btn pc-btnh35 circle-pop-btn circle-cancel-btn',
								cancelCls: 'pc-btn pc-btnh35 circle-pop-btn',
								content: '<button data-active="close-join" class="ui-dialog-close icon icon-close" title="取消">×</button><div i="title" class="ui-dialog-title" style="border-bottom: none;"></div><p class="del-pop-p">' + tips.joinSuccessPublic + '</p>',
								ok: function ok() {},
								cancel: function cancel() {
									// var $postTopic = $('[data-node=postTopic]');
									var url = 'topic/publiser?gid=' + $els.attr('data-groupid');
									window.open($_CONFIG['group_domain'] + url);
								}
							});
						} else if ($action && $action == 'joinCircle') {
							alert(tips.joinSuccess);
						} else {
							alert(tips.joinSuccess);
						}
						$('[data-active=close-join]').on('click', function () {
							$('.pop-box-backdrop').hide();
							$('[role=alertdialog]').hide();
						});
						$els.html(word.focus);
					} else if (data.data.status === 1) {
						// alert('申请已发送，请耐心等待');
						// var Dialog = alert('', {
						//     width: "500px",
						//     content: popTpl,
						//     cancel: false
						// });
						$('[data-node=QRcode]').attr('src', $_CONFIG.imgpath + '/images/public/down-ma.png');
						$('.dialog_p').css({
							'text-align': 'center',
							'margin': '10px 0px',
							'font-size': '1.5em'
						});
						$('[data-node=QRcode]').css({
							'margin-left': '173px'
						});
						// $els.css('background', '#CCC').html('审核中').off();
						// $els.html(word.join);
						alert('您已申请加入圈子，请等待圈主审核');
						done("joining", $els);
						setTimeout(function () {
							flag && location.reload();
						}, 1500);
					}
					done("join", $els);
				} else {
					if (data.code === 403 || data.message == '圈子拒绝加入') {
						alert(tips.cannotJoinCircle);
					} else if (data.code === 409) {
						$els.html(word.join);
						if (data.error) {
							if (data.error.code === '2' || data.message === '该圈子人数已达上限') {
								alert(data.message);
								done("limit", $els);
							} else if (data.error.code === '3' || data.message === '您已申请加入圈子，请等待圈主审核') {
								alert(data.message);
								done("joining", $els);
							} else if (data.error.code === '1' || data.message === '您已加入该圈子！') {
								alert(data.message);
								done("joined", $els);
								$els.html(word.focus);
								// location.reload();
							}
						}
					} else {
						alert(data.message);
					}
				}
			}).fail(function () /*jqXHR, textStatus, errorThrown*/{
				// console.log(arguments);
			}).always(function () {
				// $els.attr('data-firing', 0);
			});
		};
		var exitCircle = function exitCircle() {
			fetch.post(url.get('exitCircle'), {
				data: {
					groupid: groupId
				}
			}).done(function (data /*, textStatus, jqXHR*/) {
				if (data && data.code == 200 && data.success) {
					alert(tips.exit);
					$els.attr('data-membertype', 1);
					$els.html(word.join);
					done("exit", $els);
				} else {
					if (data.code == 410) {
						alert(tips.dissolved, {
							ok: function ok() {
								location.reload();
							},
							onclose: function onclose() {
								location.reload();
							}
						});
					} else if (data.code == 404) {
						location.reload();
					}
				}
			}).fail(function () /*jqXHR, textStatus, errorThrown*/{
				// console.log(arguments);
			}).always(function () {
				$els.attr('data-firing', 0);
			});
		};
		if (!checkLoginStatus()) {
			loginPop(function () {
				$_CONFIG['islogin'] = '1';
				noRefreshFetch(1);
				setTimeout(function () {
					window.location.href = window.location;
				}, 1500);
			});
			return;
		}
		if (memberType == 0) {
			exitCircle();
		} else {
			noRefreshFetch();
		}
		return false;
	};
	module.exports = join;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ })

});
//# sourceMappingURL=other_index.js.map