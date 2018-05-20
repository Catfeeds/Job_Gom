webpackJsonp([34],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var main = __webpack_require__(286);
	// 发送统计数据用
	var buriedPoint = __webpack_require__(40);
	buriedPoint.setPageData('uc_circle');
	main.init();

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

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var fetch = __webpack_require__(21);
	var urlLib = __webpack_require__(24);
	var alert = __webpack_require__(36);
	var tip = __webpack_require__(83);
	
	__webpack_require__(166)();
	
	var tplCreated = __webpack_require__(287);
	var tplJoined = __webpack_require__(288);
	var no_created = __webpack_require__(289);
	var no_joined = __webpack_require__(290);
	
	var init = function init() {
		var $tabBox = $('.user-content.new-user-content'),
		    $tabBtn = $tabBox.find('[data-action="tab-switch"]'),
		    $tabContent = $tabBox.find('.content-tab'),
		    $contentInfo = $tabBox.find('.content-info'),
		    $content = $('.user-content.new-user-content'),
		    $createdCircle = $content.find('[data-node=createdCircle]'),
		    $joinedCircle = $content.find('[data-node=joinedCircle]'),
		    joinedLength = 0,
		    createdLength = 0;
		// $loading = $content.find('[data-node=loading]'),
		// $noMore = $content.find('[data-node=noMore]');
		$('body').css('width', 'auto');
		//切换 我创建的圈子 我加入的圈子
		$tabBtn.off('click').on('click', function () {
			$(this).addClass('active').siblings('a').removeClass('active');
			$tabContent.hide();
			$tabContent.eq($(this).index()).show();
		});
	
		// 渲染我创建的圈子列表 我加入的圈子列表
		var contentInit = function contentInit(obj, type) {
			if (obj.length === 0) {
				// $loading.hide();
				showNoData(type);
			} else {
				// $loading.hide();
				obj.group_domain = $GLOBAL_CONFIG['group_domain'];
				if (type === 'created') {
					createdLength = obj.length;
					$tabContent.eq(0).find('.circle-index-list').html(tplCreated({
						contents: obj
					})).show();
					deleteCircle('disbandCircle');
				} else if (type === 'joined') {
					joinedLength = obj.length;
					$tabContent.eq(1).find('.circle-index-list').html(tplJoined({
						contents: obj
					})).show();
					deleteCircle('exitCircle');
				}
			}
		};
	
		// 暂无数据
		var showNoData = function showNoData(type) {
			if (type === 'joined') {
				$contentInfo.eq(1).html(no_joined({
					url_domain: $_CONFIG.group_domain + 'channel/index'
				}));
			} else if (type === 'created') {
				$contentInfo.eq(0).html(no_created({
					url_domain: $_CONFIG.group_domain + 'index/create'
				}));
			}
		};
		// 请求我创建的圈子 我加入圈子
		function renderContent() {
			fetch.get(urlLib.get('getMyGroups'), {
				async: true
			}).done(function (data) {
				if (data.success) {
					var created = data.imaster;
					var joined = data.imember;
					contentInit(created, 'created');
					contentInit(joined, 'joined');
				} else {
					alert("数据请求失败 请稍后尝试");
					// $loading.hide();
					// $noMore.show();
				}
			}).fail(function () /*jqXHR, textStatus, errorThrown*/{
				alert("数据请求失败 请稍后尝试");
			});
		}
		renderContent();
	
		//删除
		function deleteCircle(types) {
			var dialog,
			    dialogs,
			    obj,
			    url,
			    type,
			    key,
			    tips,
			    dom,
			    len,
			    timer = null;
			if (types === 'disbandCircle') {
				//解散圈子
				obj = $tabContent.eq(0), url = urlLib.get('delGroupByGid'), type = 'get', key = 'groupId', tips = '解散成功', dom = 'created', len = createdLength;
			} else if (types === 'exitCircle') {
				//退出圈子
				obj = $tabContent.eq(1), url = urlLib.get('exitCircle'), type = 'post', key = 'groupid', tips = '退出成功', dom = 'joined', len = joinedLength;
			}
			// 点击删除
			obj.on('click', '[data-action="del-circle"]', function () {
				dialog = $(this).parent('.circle-box').find('[data-node="delPopUp"]'), dialogs = $('[data-node="delPopUp"]');
				dialogs.addClass('hide');
				dialog.removeClass('hide');
			});
			// 点击取消
			obj.on('click', '[data-action="cancelDel"]', function () {
				dialog.addClass('hide');
			});
			// 点击确定删除
			obj.on('click', '[data-action="delOne"]', function () {
				clearTimeout(timer);
				var _this = $(this);
				var $parent = $(this).parents('.circle-index-list');
				fetch[type](url, {
					data: _defineProperty({}, key, $(this).attr('data-id'))
				}).done(function (data) {
					if (data.code) {
						alert(tips);
						$('.pop-box-modal').css({
							left: '50%',
							top: '50%',
							margin: '-90px 0 0 -175px'
						});
						timer = setTimeout(function () {
							$('.pc-btnh35.circle-pop-btn').length && $('.pc-btnh35.circle-pop-btn').trigger('click');
						}, 3000);
						_this.parents('.circle-box').remove();
						if (!$parent.find('.circle-box').length) {
							showNoData(dom);
						}
					} else {
						alert("数据请求失败 请稍后尝试");
						// $loading.hide();
						// $noMore.show();
					}
				}).fail(function () /*jqXHR, textStatus, errorThrown*/{
					alert("数据请求失败 请稍后尝试");
				});
			});
		}
	
		//点击创建圈子
		function bClickCreate() {
			$('[data-action="create-circle"]').off('click').on('click', function (event) {
				var $this = $(this);
				event.preventDefault();
				fetch.get(urlLib.get('groupCheck'), {
					async: /msie [678]/i.test(navigator.userAgent) ? 1 : 0
				}).done(function (data) {
					if (data.success) {
						if (data.check) {
							window.open($this.attr('data-href'));
						} else {
							alert('您所创建的圈子数已达上限，请删除部分后再创建。');
							$('.pop-box-modal').css({
								left: '50%',
								top: '50%',
								margin: '-90px 0 0 -210px'
							});
						}
					} else {
						alert("数据请求失败 请稍后尝试");
					}
				}).fail(function () {
					alert("数据请求失败 请稍后尝试");
				});
			});
		}
		bClickCreate();
	
		// 判断宽窄屏
		screenChange();
		window.onresize = function () {
			screenChange();
		};
	};
	// 判断宽窄屏
	var screenChange = function screenChange() {
		$(window).width() > 1000 ? $('body').removeClass('w1000') : $('body').addClass('w1000');
	};
	
	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(3)))

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uc_group/main/content-create',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,contents=$data.contents,content=$data.content,index=$data.index,$escape=$utils.$escape,$out='';$each(contents,function(content,index){
	$out+=' <div class="circle-box" data-id="';
	$out+=$escape(content.id);
	$out+='"> <em class="icon-del" data-action="del-circle"></em> <div class="mg-negative"> <div class="list-img"> <a target="_blank" href="';
	$out+=$escape(contents.group_domain);
	$out+='circle/';
	$out+=$escape(content.id);
	$out+='.html"> <img src="';
	$out+=$escape(content.icon);
	$out+='" onerror="imgError(this, \'g\')"> </a> <div class="list-box"> <p class="list-title"> <a target="_blank" href="';
	$out+=$escape(contents.group_domain);
	$out+='circle/';
	$out+=$escape(content.id);
	$out+='.html">';
	$out+=$escape(content.name);
	$out+='</a> </p> <div> <a target="_blank" href="';
	$out+=$escape(contents.group_domain);
	$out+='circle/';
	$out+=$escape(content.id);
	$out+='.html"> <span class="marr28">成员：';
	$out+=$escape(content.memberQuantity);
	$out+='</span> <span>话题：';
	$out+=$escape(content.topicQuantity);
	$out+='</span> </a> </div> </div> </div> </div> <div class="del-btn hide" data-node="delPopUp"> <div class="del-text"> <a class="btn-close" href="javascript:;" data-action="cancelDel"></a> <p>确定解散圈子？</p > <div class="text-center"> <a href="javascript:;" class="pc-btn pc-bj-fff" data-action="cancelDel">取消</a> <a href="javascript:;" data-id="';
	$out+=$escape(content.id);
	$out+='" class="pc-btn" data-action="delOne">确定</a> </div> </div> </div> </div> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uc_group/main/content-joined',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,contents=$data.contents,content=$data.content,index=$data.index,$escape=$utils.$escape,$out='';$each(contents,function(content,index){
	$out+=' <div class="circle-box" data-id="';
	$out+=$escape(content.id);
	$out+='"> <em class="icon-del" data-action="del-circle"></em> <div class="mg-negative"> <div class="list-img"> <div class="author clearfix"> <a target="_blank" href="';
	$out+=$escape(contents.group_domain);
	$out+='ta/';
	$out+=$escape(content.user.id);
	$out+='.html"> <img src="';
	$out+=$escape(content.user.facePicUrl);
	$out+='" onerror="imgError(this, \'h\')"> <span>';
	$out+=$escape(content.user.nickname);
	$out+='</span> </a> </div> <a target="_blank" href="';
	$out+=$escape(contents.group_domain);
	$out+='circle/';
	$out+=$escape(content.id);
	$out+='.html"> <img src="';
	$out+=$escape(content.icon);
	$out+='" onerror="imgError(this, \'g\')"> </a> <div class="list-box"> <p class="list-title"> <a target="_blank" href="';
	$out+=$escape(contents.group_domain);
	$out+='circle/';
	$out+=$escape(content.id);
	$out+='.html">';
	$out+=$escape(content.name);
	$out+='</a> </p> <div> <a target="_blank" href="';
	$out+=$escape(contents.group_domain);
	$out+='circle/';
	$out+=$escape(content.id);
	$out+='.html"> <span class="marr28">成员：';
	$out+=$escape(content.memberQuantity);
	$out+='</span> <span>话题：';
	$out+=$escape(content.topicQuantity);
	$out+='</span> </a> </div> </div> </div> </div> <div class="del-btn hide" data-node="delPopUp"> <div class="del-text"> <a class="btn-close" href="javascript:;" data-action="cancelDel"></a> <p>确定退出圈子？</p > <div class="text-center"> <a href="javascript:;" class="pc-btn pc-bj-fff" data-action="cancelDel">取消</a> <a href="javascript:;" class="pc-btn" data-action="delOne" data-id="';
	$out+=$escape(content.id);
	$out+='">确定</a> </div> </div> </div> </div> ';
	});
	return new String($out);
	});

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uc_group/main/no_created',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,url_domain=$data.url_domain,$out='';$out+='<div class="no_circle"> <span>你还没有创建圈子，快</span> <a href="';
	$out+=$escape(url_domain);
	$out+='" target="_blank">创建圈子</a> <span>吧～</span> </div>';
	return new String($out);
	});

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uc_group/main/no_joined',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,url_domain=$data.url_domain,$out='';$out+='<div class="no_circle"> <span>你还没有加入任何圈子，赶快</span> <a href="';
	$out+=$escape(url_domain);
	$out+='" target="_blank">去逛逛</a> <span>吧～</span> </div>';
	return new String($out);
	});

/***/ })

});
//# sourceMappingURL=uc_group.js.map