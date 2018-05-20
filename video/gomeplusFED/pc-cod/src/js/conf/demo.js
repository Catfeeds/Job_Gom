webpackJsonp([7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery, $) {/**
	 *  各公共组件的用法
	 *  包括:
	 *  	ajax
	 *  	pubsub
	 *  	dialog
	 *   	...
	 * 
	 */

	// 针对jQuery的ajax做了封装,使用方法和jQ的使用方法一致
	var fetch = __webpack_require__(2);
	// 利用jQuery的callbacks对象封装的pubsub模块
	var Pubsub = __webpack_require__(43);

	var url = __webpack_require__(28);

	// 字符串截取
	var truncate = __webpack_require__(49);
	var testStr = '喜欢你，abc受身蹲伏';
	console.log(truncate(testStr, 10));

	// 数字选择器
	var spinner = __webpack_require__(71);


	// 移除对话框时,记得清除对话框中绑定的事件
	// dialog使用方法
	// http://aui.github.io/artDialog/doc/index.html
	// 编辑收货人地址弹窗
	var deliveryAddrPop = __webpack_require__(44);
	/*var d = deliveryAddrPop.create({}, {
	  ok: function(){
	    console.log(this)
	  }
	});
	d.show();*/
	// d._$('header')
	// d._$('content')
	// d._$('footer');

	// 上传图片弹窗
	var uploadPop = __webpack_require__(116);
	/*var d = uploadPop.create({}, {
	  ok: function(){
	    alert(1221)
	  }
	});
	d.show();*/

	var circlePop = __webpack_require__(118);
	/*circlePop.create({

	}).show();*/

	// 
	var alert = __webpack_require__(36);
	// alert('你确定删除吗？');


	var confirm = __webpack_require__(53);
	// confirm('你确定删除吗？');


	// 分享
	var share = __webpack_require__(121);
	share.shareItem('[data-action=shareList]');

	/**
	 * 分享到 使用说明
	 * 在[data-action=shareto]节点上输出要获取的数据 data-shareInfo=
	 * {
	 *  url:'http://www.gomeplus.com',
	 *  title:'国美+',
	 *  pic:'http://gomeplus.com/1.jpg||http://gomeplus.com/1.jpg'
	 * }
	 * pic是要分享的图片绝对地址，多张图片用||隔开。
	 *
	 * 页面中在分享按钮加 [data-action=shareto] 自定义属性；
	 * 如果是分享当前页面的也要加shareInfo,值为当前页面对应的信息。格式都一样。
	 *
	 * 调用方法:
	 * var share = require 
	 * share.shareItem(要分享的区域父节点字符串e.g. 'data-node=shareList');
	 *
	 * shareto.weixin({shareInfo})
	 * shareto.qq({shareInfo})
	 * shareto.sina({shareInfo})
	 * shareto.qzone({shareInfo})
	 *
	 *
	 * share.share({shareInfo});这个shareInfo里要有type：[weixin,qq,sina,qzone]
	 */



	// 日期格式化,文档API
	// https://github.com/taylorhakes/fecha
	var dateFormat = __webpack_require__(123);
	console.log(dateFormat.format(Date.now(), 'YYYY-MM-DD'));

	// 发送get请求
	// 发送post请求,调用fetch.post即可
	/*
	fetch.get('test', {
		data: {
			a: 1,
			b: 2
		}
	}).done(function(data, textStatus, jqXHR) {

	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.log(arguments);
	}).always(function() {

	});
	*/

	// Pubsub使用示例
	var fn1 = function(data) {
	    console.log(data.title);
	  }
	  // 订阅一个事件
	Pubsub('mailArrived').sub(fn1);
	// 发布消息
	Pubsub('mailArrived').pub({
	  title: 'value from publish uu '
	});

	// 数字选择器
	console.log(__webpack_provided_window_dot_jQuery);
	$('[data-trigger=spinner]').spinner({
	  delay: 200,
	  min: 1,
	  max: 3,
	  beforeChange: function() {
	    console.log(this);
	    return false;
	  },
	  rangemin: function() {
	    console.log('range min');
	  },
	  rangemax: function() {
	    console.log('range max');
	  },
	  changed: function(e, newVal, oldVal) {
	    console.log(arguments);
	  }
	});
	// 获取实例,并设置最小值/最大值
	// var spinerInstance = $('[data-trigger=spinner]').data('spinner');
	// spinerInstance.spinning.value(3);
	// spinerInstance.spinning.setMin(3);
	// spinerInstance.spinning.setMax(3);

	// 瀑布流
	// var Tiles = require('tiles');
	// var tiles = new Tiles({}, '[data-node=tiles]');
	// console.log(tiles);

	// placeholder插件
	// require('placeholder');
	// $('input').placeholder();

	/*


	var userWidget = require('../../widget/user/user');
	require('../../plugin/jquery.unveil');


	console.log('--图片懒加载插件--')
	console.log($.fn.unveil);
	console.log('--cookie插件--')
	console.log($.cookie);


	// userWidget();


	// 对话框demo
	// var d = dialog({
	//     title: '消息',
	//     content: '<input id="property-returnValue-demo" value="1" />',
	//     ok: function () {
	//         var value = $('#property-returnValue-demo').val();
	//         this.close(value);
	//         this.remove();
	//     }
	// });
	d.addEventListener('close', function () {
	    alert(this.returnValue);
	});
	d.show();


	 */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(1)))

/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {var tpl = __webpack_require__(45);
	var Dialog = __webpack_require__(22);
	var Pubsub = __webpack_require__(43);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var byteLen = __webpack_require__(46);
	var trim = __webpack_require__(47);
	var check = __webpack_require__(48);
	var truncate = __webpack_require__(49);
	var placeHolder = __webpack_require__(41);
	var areaSelect = __webpack_require__(50); // 区域四级联动
	var alert = __webpack_require__(36);

	__webpack_require__(52);

	var $content;
	var $name;
	var $nameTip;
	var $idCard;
	var $idCardTip;
	var $addr;
	var $addrTip;
	var $phone;
	var $phoneTip;
	var $areaTip;

	var initNodes = function() {
	    $content = this._$('content');
	    // 收货人
	    $name = $content.find('[data-node=name]');
	    $nameTip = $content.find('[data-node=nameTip]');
	    // 身份证信息
	    $idCard = $content.find('[data-node=idCard]');
	    $idCardTip = $content.find('[data-node=idCardTip]');
	    // 详细地址
	    $addr = $content.find('[data-node=addr]');
	    $addrTip = $content.find('[data-node=addrTip]');
	    // 电话号
	    $phone = $content.find('[data-node=phone]');
	    $phone.attr('maxlength', 12);
	    $phoneTip = $content.find('[data-node=phoneTip]');
	    // 设置为默认地址
	    $setDefault = $content.find('[data-node=setDefault]');

	    // 选择地区
	    $areaList = $content.find('[data-node=areaList]');
	    $province = $content.find('[data-node=province]');
	    $city = $content.find('[data-node=city]');
	    $borough = $content.find('[data-node=borough]');
	    $areaTip = $content.find('[data-node=areaTip]');
	};


	var initPlaceHolder = function() {
	    $name.placeholder();
	    $addr.placeholder();
	    $phone.placeholder();
	};

	var checkLength = function(str, max, min) {
	    var len = byteLen(str);
	    var ret = true;
	    if (len > max || len < min) {
	        ret = false;
	    }
	    return ret;
	};


	// 验证收货人
	var validateName = function() {
	    var val = trim($name.val());
	    $name.val(val);
	    var ret = true;
	    if (!checkLength(val, 20, 2)) {
	        ret = false;
	        $nameTip.show();
	    } else {
	        $nameTip.hide();
	    }
	    return ret;
	};

	// 验证身份证规则
	var validateIdCard = function() {
	    if ($_CONFIG.isCross != '1') {
	        return true;
	    }
	    var val = trim($idCard.val());
	    $idCard.val(val);
	    var ret = true;
	    if (!/^\d{17}[\dxX]$/.test(val)) {
	        ret = false;
	        $idCardTip.show();
	    } else {
	        $idCardTip.hide();
	    }
	    return ret;
	};


	// 验证详细地址
	var validateAddr = function() {
	    var val = trim($addr.val());
	    $addr.val(val);
	    var ret = true;
	    if (!checkLength(val, 60, 5)) {
	        ret = false;
	        $addrTip.show();
	    } else {
	        $addrTip.hide();
	    }
	    return ret;
	};


	// 验证电话号
	var validatePhone = function() {
	    var val = trim($phone.val());
	    var rule = /^0([0-9]{3,4}-)?[0-9]{10,12}$/;
	    var mobile = /^1[34578][0-9]{9}$/;
	    var ret = rule.test(val) || mobile.test(val);
	    if (ret) {
	        $phoneTip.hide();
	    } else {
	        $phoneTip.show();
	    }
	    return ret;
	};

	// 验证所在地区
	var validatePcba = function() {
	    var data = areaSelect.getData();
	    var ret = true;
	    if (!data.provinceId || !data.boroughId || !data.cityId) {
	        ret = false;
	        $areaTip.show();
	    } else {
	        $areaTip.hide();
	    }
	    return ret;
	};

	var validate = function() {
	    var ret = true;
	    if (!validateName()) {
	        ret = false;
	    }
	    if (!validateIdCard()) {
	        ret = false;
	    }
	    if (!validateAddr()) {
	        ret = false;
	    }
	    if (!validatePhone()) {
	        ret = false;
	    }
	    if (!validatePcba()) {
	        ret = false;
	    }
	    return ret;
	};

	//字符截取
	var intercept = function(str, max) {
	    var val = trim(str.val());
	    var len = byteLen(val);
	    if (len > max) {
	        str.val(truncate(val, max));
	    }
	};

	// 获取数据
	var getData = function() {
	    var isDefault = $setDefault.data('checked');
	    var idCardVal = $idCard.val() || '';
	    var hasIdCardVal = idCardVal.length === 18 ? true : false;
	    var data = {
	        userName: $name.val(),
	        idCard: idCardVal.toUpperCase(),
	        address: $addr.val(),
	        mobile: $phone.val(),
	        isDefault: !isDefault ? 0 : 1,
	        isCross: !!parseInt($_CONFIG.isCross),
	        hasIdCardVal: hasIdCardVal
	    };
	    var cities = areaSelect.getData();
	    if (cities.areaId) {
	        data.areaId = cities.areaId;
	        data.areaName = cities.areaName;
	    }
	    if (cities.provinceId) {
	        data.provinceId = cities.provinceId;
	        data.provinceName = cities.provinceName;
	    }
	    if (cities.cityId) {
	        data.cityId = cities.cityId;
	        data.cityName = cities.cityName;
	    }
	    if (cities.boroughId) {
	        data.boroughId = cities.boroughId;
	        data.boroughName = cities.boroughName;
	    }
	    return data;
	};

	// 四级联动
	var initAreaSelect = function() {
	    var p = $content.find('[data-node=province]');
	    var c = $content.find('[data-node=city]');
	    var b = $content.find('[data-node=borough]');
	    var a = $content.find('[data-node=area]');

	    areaSelect.init([p, c, b, a], ['选择省', '选择市', '选择区县', '选择街道'], {}, [{
	        content: '<span class="menu-add" data-node="checked">选择省</span>',
	        btn: '<span class="down-arrow"><em class="icon icon-down"></em></span>'
	    }, {
	        content: '<span class="menu-add" data-node="checked">选择市</span>',
	        btn: '<span class="down-arrow"><em class="icon icon-down"></em></span>'
	    }, {
	        content: '<span class="menu-add" data-node="checked">选择区县</span>',
	        btn: '<span class="down-arrow"><em class="icon icon-down"></em></span>'
	    }, {
	        content: '<span class="menu-add" style="margin-right:0" data-node="checked">选择街道</span>',
	        btn: '<span class="down-arrow"><em class="icon icon-down"></em></span>'
	    }]);
	};



	var bindHandler = function() {
	    $name.on('blur', function(e) {
	        validateName();
	    });
	    $name.on('textchange', function(e) {
	        var $this = $(this);
	        var dataName = $this.data('name');
	        if ($this.val() != dataName && '' !== dataName) {
	            $idCard.val('').prop('readonly', false);
	        }
	        intercept($name, 20);
	    });
	    $idCard.on('blur', function(e) {
	        validateIdCard();
	    });
	    $idCard.on('contextmenu', function(e) {
	        return false;
	    });
	    $idCard.on('keydown', function(e) {
	        var code = e.keyCode;

	        if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105) || code == 88 || code == 8 || code == 46 || (code >= 37 && code <= 40)) {
	            return true;
	        } else {
	            return false;
	        }
	    });
	    $idCard.on('textchange', function() {
	        var val = $(this).val();
	        var newVal = '';
	        if (!/^\d{1,18}$|^\d{17}[xX]$/.test(val)) {
	            newVal = $.trim(val.substr(0, val.length - 1));
	            $(this).val(newVal);
	        }
	    });
	    $addr.on('blur', function(e) {
	        validateAddr();
	    });
	    $addr.on('textchange', function(e) {
	        intercept($addr, 60);
	    });
	    $phone.on('blur', function() {
	        validatePhone();
	    });
	    $setDefault.on('click', function() {
	        var $this = $(this);
	        var radioBtn = $this.find('span');
	        var cls = 'menu-radio-checked';
	        if (radioBtn.hasClass(cls)) {
	            $this.data('checked', 0);
	            radioBtn.removeClass(cls);
	        } else {
	            $this.data('checked', 1);
	            radioBtn.addClass(cls);
	        }
	        return false;
	    });
	    $province.on('click', 'a', function() {
	        validatePcba();
	    });
	    $city.on('click', 'a', function() {
	        validatePcba();
	    });
	    $borough.on('click', 'a', function() {
	        validatePcba();
	    });
	};

	var unbindHandler = function() {
	    $name.off();
	    $idCard.off();
	    $addr.off();
	    $phone.off();
	    $setDefault.off();
	    // 销毁四级联动
	    areaSelect.destroy();
	};

	// 默认数据
	var defaultData = {
	    name: '',
	    phone: '',
	    addr: '',
	    province: '', // 省
	    city: '', // 市
	    borough: '', // 县
	    area: '', // 区
	    setDefault: true,
	    isCross: false // 是否有跨境
	};

	var create = function(data, options) {
	    var oldName = data.name;
	    // 显示编辑弹窗之前,需要传递拼装好的数据
	    var u = url.get('addAddress');
	    var channel = 'addr.add';
	    var addressId = data.addressId; // 地址id
	    if (addressId) {
	        u = url.get('editAddress');
	        channel = 'addr.edit';
	    }
	    var content = tpl(data || defaultData);
	    options = options || {};

	    var firing = false; // 是否已点击确认按钮
	    var defaults = {
	        title: '编辑收货地址',
	        modal: true,
	        fixed: true,
	        content: content,
	        className: 'pop-box',
	        okValue: '确定',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        ok: function() {
	            var self = this;

	            if (validate()) {

	                if (firing) {
	                    return false;
	                }
	                firing = true;

	                var formData = getData();
	                if ($_CONFIG.isCross === '0') {
	                    // 如果改名，删掉身份证ID；
	                    if (oldName != formData.userName && !!formData.idCard) {
	                        formData.idCard = '';
	                    }
	                }

	                if (addressId) { // 编辑的时候,需要addressId
	                    formData.addressId = addressId;
	                }
	                if (formData.areaId === undefined) {
	                    formData.areaId = '110114001';
	                    formData.areaName = '全部区域';
	                }
	                fetch.post(u, {
	                    data: formData
	                }).done(function(json) {
	                    var $userCardTips = $('[data-node=userCardTips]');
	                    var code = json.code;
	                    var data = json.data || {};
	                    if (code === 200) {
	                        if (data.addressId) { // 新增时,接口返回地址id
	                            formData.addressId = data.addressId;
	                        }
	                        Pubsub(channel).pub(formData);
	                        // 检测当前地址身份信息验证
	                        var $curAddr = $('[data-node=curAddr]');
	                        var $curAddrTr = $curAddr.closest('tr');
	                        if ($curAddr.length) {
	                            var curAddrIdCard = $curAddrTr.find('[data-node=addrInfos]').data('addr').idCard;
	                            var curHasIdCard = !!$.trim(curAddrIdCard);
	                            if ($userCardTips.length && curHasIdCard) {
	                                $userCardTips.remove();
	                                $curAddrTr.find('[data-action=editAddr]').closest('td').removeClass('hide-text');
	                            }
	                        }

	                        self.close();
	                        self.remove();
	                    } else {
	                        alert(json.message);
	                    }
	                }).fail(function() {

	                }).always(function() {
	                    firing = false;
	                });
	            }
	            return false; // 不允许关闭
	        },
	        onshow: function() {
	            // 初始化节点
	            initNodes.call(this);
	            // 初始化四级联动
	            initAreaSelect.call(this);
	            // 初始化placeHolder
	            initPlaceHolder();
	            // 绑定事件
	            bindHandler();
	        },
	        onclose: function() {
	            // 关闭时,解绑所有事件
	            unbindHandler();
	            firing = false;
	        }
	    };
	    $.extend(true, defaults, options);
	    var d = Dialog(defaults);
	    d.show();
	    return d;
	};

	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/deliveryAddr/content',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,name=$data.name,isCross=$data.isCross,idCard=$data.idCard,hasIdCardVal=$data.hasIdCardVal,provinceId=$data.provinceId,province=$data.province,cityId=$data.cityId,city=$data.city,boroughId=$data.boroughId,borough=$data.borough,areaId=$data.areaId,area=$data.area,addr=$data.addr,phone=$data.phone,isDefault=$data.isDefault,$out='';$out+='<div class="edit-add-box"> <dl class="receiver clearfix"> <dt>收货人:</dt> <dd> <input type="text" data-node="name" data-name="';
	$out+=$escape(name);
	$out+='" placeholder="请输入姓名" value="';
	$out+=$escape(name);
	$out+='"> </dd> </dl> <p class="warn-txt" data-node="nameTip">收货人姓名为2-20个字符</p> ';
	if(isCross){
	$out+=' <dl class="receiver clearfix"> <dt>身份证号:</dt> <dd> <input type="text" data-node="idCard" data-idcard="';
	$out+=$escape(idCard);
	$out+='" ';
	if(hasIdCardVal){
	$out+='readonly="true"';
	}
	$out+=' placeholder="请输入身份证号" value="';
	$out+=$escape(idCard);
	$out+='"> </dd> </dl> <p class="warn-txt" data-node="idCardTip">请填写与收货人姓名对应的身份证号码</p> ';
	}
	$out+=' <dl class="area clearfix"> <dt>所在地区:</dt> <dd data-node="areaList"> <div data-node="province" data-provinceId=';
	$out+=$escape(provinceId);
	$out+='>';
	$out+=$escape(province);
	$out+='</div> <div data-node="city" data-cityId=';
	$out+=$escape(cityId);
	$out+='>';
	$out+=$escape(city);
	$out+='</div> <div data-node="borough" data-boroughId=';
	$out+=$escape(boroughId);
	$out+='>';
	$out+=$escape(borough);
	$out+='</div> <div data-node="area" data-areaId=';
	$out+=$escape(areaId);
	$out+='>';
	$out+=$escape(area);
	$out+='</div> </dd> </dl> <p class="warn-txt" data-node="areaTip">请补充地址</p> <dl class="detail-add clearfix"> <dt>详细地址:</dt> <dd> <input type="text" data-node="addr" placeholder="请如实填写详细地址" value="';
	$out+=$escape(addr);
	$out+='"> </dd> </dl> <p class="warn-txt" data-node="addrTip">限制为5-60个字符</p> <dl class="phone clearfix"> <dt>电话/手机:</dt> <dd> <input type="text" data-node="phone" placeholder="请输入电话/手机号" value="';
	$out+=$escape(phone);
	$out+='"> </dd> </dl> <p class="warn-txt" data-node="phoneTip">请输入手机号/电话号码</p> <div class="set-default-add"> <label data-node="setDefault" data-checked="';
	if(isDefault === true){
	$out+='true';
	}else{
	$out+='false';
	}
	$out+='"> <span class="menu-radio ';
	if(isDefault === true){
	$out+='menu-radio-checked';
	}else{
	$out+='\'\'';
	}
	$out+='"></span>设置为默认地址 </label> </div> </div> ';
	return new String($out);
	});

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

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * [truncate 按字节截取字符串]
	 * @param  {[function]}  getLength [获取长度的方法]
	 * @param  {[string]}  string [截取的字符串]
	 * @param  {[number]}  byteLength [截取的长度]
	 * @return {string}           [返回截取后的字符串]
	 */
	var byteLen = __webpack_require__(46);

	function isHighSurrogate(codePoint) {
	    return codePoint >= 0xd800 && codePoint <= 0xdbff;
	}

	function isLowSurrogate(codePoint) {
	    return codePoint >= 0xdc00 && codePoint <= 0xdfff;
	}

	// Truncate string by size in bytes
	function truncate(string, byteLength) {
	    if (typeof string !== "string") {
	        throw new Error("Input must be string");
	    }

	    var charLength = string.length;
	    var curByteLength = 0;
	    var codePoint;
	    var segment;

	    for (var i = 0; i < charLength; i += 1) {
	        codePoint = string.charCodeAt(i);
	        segment = string[i];

	        if (isHighSurrogate(codePoint) && isLowSurrogate(string.charCodeAt(i + 1))) {
	            i += 1;
	            segment += string[i];
	        }

	        curByteLength += byteLen(segment);

	        if (curByteLength === byteLength) {
	            return string.slice(0, i + 1);
	        } else if (curByteLength > byteLength) {
	            return string.slice(0, i - segment.length + 1);
	        }
	    }

	    return string;
	}

	module.exports = truncate;


/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(51);
	var fetch = __webpack_require__(2),
	    url = __webpack_require__(28),
	    address = {},
	    Pubsub = __webpack_require__(43),
	    addressList = [],
	    selectors;
	//nodeSelector  四级联动select选择器  array   
	//placeHolder   默认选项  array || string    如果是数组   保持length与nodeSelector长度一致
	//options       selecct选项
	//node          select内容（文字部分/按钮部分）  node.btn 按钮部分  string(html) node.content文字部分 string(html)
	var init = function(nodeSelector, placeHolder, options, node) {
	    var nodeSelector = nodeSelector,
	        isString = false,
	        addressType = [
	            ['provinceId', 'provinceName'],
	            ['cityId', 'cityName'],
	            ['boroughId', 'boroughName'],
	            ['areaId', 'areaName']
	        ],
	        defaultOptions = {},
	        defaultNode = {},
	        isObject = (node instanceof Array) ? false : true,
	        options = $.extend({}, defaultOptions, options);
	    selectors = nodeSelector;
	    if (typeof placeHolder === 'string') {
	        isString = true;
	    }
	    for (var i = 0; i < selectors.length; i++) {
	        //初始化address
	        var pleaseTxt = isString ? placeHolder : placeHolder[i];
	        if (pleaseTxt !== selectors[i].text()) {
	            address[addressType[i][0]] = selectors[i].attr('data-' + [addressType[i][0]]);
	            address[addressType[i][1]] = selectors[i].text();
	        }

	        var pId = ((i - 1) >= 0 ? selectors[i - 1].attr('data-' + [addressType[i - 1][0]]) : 0);

	        (function(index) {
	            //初始化select
	            var provinceOptions = options;
	            provinceOptions.please = isString ? placeHolder : placeHolder[index];
	            provinceOptions.onChanged = function(changeDate) {
	                var id = changeDate.value,
	                    isClicked = false;
	                if (id === undefined) {
	                    isClicked = true;
	                }else{
	                    address[addressType[index][0]] = changeDate.value;
	                    address[addressType[index][1]] = changeDate.text;
	                    if( index + 1 <= selectors.length - 1 ){

	                        addAjax(~~id, function(data) {
	                            nodeSelector[ index+1 ].setList({
	                                data: data.nodes,
	                                please: isString ? placeHolder : placeHolder[index+1],
	                                textName: 'name',
	                                valueName: 'id'
	                            });
	                        })
	                    }
	                }
	                delAddress(index, isClicked);


	            }
	            nodeSelector[index].selects((isObject ? node : node[index]), provinceOptions);
	            /*初始化列表*/
	            if (pId !== '') {
	                addAjax(pId, function(result) {
	                    selectors[index].setList({
	                        data: result.nodes,
	                        please: isString ? placeHolder : placeHolder[index],
	                        textName: 'name',
	                        valueName: 'id',
	                        checked: selectors[0].find('div').children().eq(0).text()
	                    });

	                })
	            }
	        })(i);


	    }
	    function addAjax(id, callback) {
	        if( window.localStorage ){
	            var local = JSON.parse( localStorage.getItem( 'address' + id ) );
	            var isLose = local !== null && local.hasOwnProperty( 'time' ) ?  local.time < +new Date() : true; 
	            if( isLose ){
	                fetch.get(url.get('getAddress') + id, {}).done(function(result) {
	                    if (result.code === 200) {
	                        callback.call(null, result.data);
	                        var addressLocal = {
	                            data : result.data,
	                            time : +new Date() + 604800000
	                        }
	                        localStorage.removeItem( 'address' + id );
	                        localStorage.setItem( 'address' + id, JSON.stringify( addressLocal ) );
	                    }
	                }).fail(function(xhr, error) {
	                    console.log(xhr, error);
	                });
	            }else{
	                callback.call(null, local.data );
	            }
	        }else{
	            fetch.get(url.get('getAddress') + id, {}).done(function(result) {
	                if (result.code === 200) {
	                    callback.call(null, result.data);
	                }
	            }).fail(function(xhr, error) {
	                console.log(xhr, error);
	            });
	        }
	    }

	    function delAddress(i, listClciked) {
	        var num = i;
	        if (!listClciked) {
	            num++;
	            nodeSelector[i].find('div').children().eq(0).text(address[addressType[i][1]]);
	        }
	        for (var j = num, len = nodeSelector.length; j < len; j++) {
	            if (address[addressType[j][0]] !== undefined) {
	                delete address[addressType[j][0]];
	                delete address[addressType[j][1]];
	            }
	            nodeSelector[j].find('div').children().eq(0).text((isString ? placeHolder : placeHolder[j]));
	            if( j!=num)nodeSelector[j].find('ul').html('');
	        }

	    }
	};

	var destroy = function() {

	    for (var i = 0, len = selectors.length; i < len; i++) {

	        selectors[i].off();
	    }

	}
	var getData = function() {
	    return address;
	}
	module.exports = {
	    init: init,
	    destroy: destroy,
	    getData: getData
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {$.fn.extend({
		selects : function( node, options ){
			var selfs = this,
				defaultNode = {
					content : '<span class="span1">' + $( selfs ).text() + '</span>',
					btn : '<span class="span2"></span>'
				},
				selfsText = $.trim( $( selfs ).text() ),
				defaultOptions = {
					data : [],						//列表数据
					checked : selfsText, 	//默认选中文字
					please : '请选择',				//默认提示文字
					textName : 'text',				//数据文字key名
					valueName : 'value',			//数据value  key名
					selectdCls : 'active',			//slect点击添加class
					checkText : true,				//下拉列表是否收起  默认收起
					checkedCls : 'active',			//列表选中class
					disable : 'disable',			//是否禁用
					onChanged : function(){}		//选择后的回调
				},
				node = $.extend({}, defaultNode, node ),
				options = $.extend({}, defaultOptions, options ),
				$contentBox = $('<div></div>').appendTo( $(selfs).empty()).height( $(selfs).height() );
				$content = $( node.content ).text( ( selfsText ==='' ? options.please : selfsText ) ).appendTo( $contentBox ).attr('data-node', 'checked');
				$btn = $( node.btn ).appendTo( $contentBox ),
				value = null;


			var $checked,
				result,
				html = '<ul data-node="selectList"><li><a href="javascript:;">' + options.please + '</a></li>',
				$ul,
				$parent = options.parent ? $(options.parent) : this,
				$selector = options.parent ? this.selector : undefined;

			for ( var i = 0, len = options.data.length; i<len; i++ ) {
				value = options.data[i][options.valueName] !== undefined ? options.data[i][options.valueName] : i;
				html += '<li class="' + (options.data[i].checked === value ? options.checkedCls : '') + '"><a href="javascript:;" data-value="' + value + '" data-index="' + i + '">' + options.data[i][options.textName] + '</a></li>'
			}
			html  += '</ul>';
			$ul = $( html ).appendTo( $(selfs) );
			$parent.on( 'click', $selector, function( e ){
				e.stopPropagation();
				$( 'ul[data-node="selectList"]' ).hide();
				if ( options.data.length === 0 && $( this ).attr( 'data-refresh' ) !== 'running' ) return;
				if($(this).hasClass( options.disable )) return;
				$(this).addClass(  options.selectdCls ); 
				if( $(this).find( 'ul li' ).length !== 0 ) $(this).find( 'ul' ).show();
			});

			$parent.on( 'click', 'ul[data-node="selectList"] a', function( e ){
				e.stopPropagation();
				$checked = $(this).parents( 'ul' ).parent().find( '[data-node="checked"]' );
				if( $checked.text() !== $(this).text() ){
					result = {
						text : ( $(this).text() !== options.please ? $(this).text() : '' ),
						value : $(this).attr( 'data-value' ),
						index : $(this).attr( 'data-index' )
					}
					options.checkText && $checked.text( $(this).text() );//.attr( 'data-value', $(this).attr('data-value') );
					if ( options.checkedCls !== undefined ){
						$(this).parent().addClass( options.checkedCls ).siblings().removeClass( options.checkedCls );
					}
					options.onChanged.call( this, result );

				}
				$(this).parents( 'ul' ).hide();
				return false;
			});

			$(document).on( 'click', function(){
				selfs.find( 'ul' ).hide();
			});
			return this;
		},
		setList : function( options ){
			$( this ).attr( 'data-refresh', 'running' );
			var selfs = this,
				defaultOptions = {
					data : [],
					textName : 'text',
					checked : '',
					valueName : 'value',
					please : '请选择',	
					checkedCls : 'active'
				},
				options = $.extend({}, defaultOptions, options ),
				html = '<li><a href="javascript:;">' + options.please + '</a></li>';
			if( options.data.length !==0 ) {
				for ( var i = 0, len = options.data.length; i<len; i++ ) {
					value = options.data[i][options.valueName] !== undefined ? options.data[i][options.valueName] : i;
					html += '<li class="' + ( options.checked === options.data[i][options.textName] ? options.checkedCls : '') + '"><a href="javascript:;" data-value="' + value + '">' + options.data[i][options.textName] + '</a></li>'
				}
			}
			$( selfs ).find( '[data-node="selectList"]' ).html( html );
			return this;
		}
	})
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

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

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var Dialog = __webpack_require__(22);
	var noop = function() {};

	var create = function(content, options) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*
	 * jquery.spinner
	 * https://github.com/vsn4ik/jquery.spinner
	 * Copyright 2013-2016 vsn4ik
	 * Licensed under the MIT license
	 */

	'use strict';


	var spinningTimer;
	var Spinner;
	var Spinning = function($element, options) {
	    this.$el = $element;
	    this.options = $.extend({}, Spinning.rules.defaults, Spinning.rules[options.rule] || {}, options);
	    this.min = Number(this.options.min) || 0;
	    this.max = Number(this.options.max) || 0;

	    this.$el.on({
	        'focus.spinner': $.proxy(function(e) {
	            e.preventDefault();
	            // $(document).trigger('mouseup.spinner');
	            this.oldValue = this.value();
	        }, this),
	        'change.spinner': $.proxy(function(e) {
	            e.preventDefault();
	            this.value(this.$el.val());
	        }, this),
	        'keydown.spinner': $.proxy(function(e) {
	            var dir = {
	                38: 'up',
	                40: 'down'
	            }[e.which];

	            if (dir) {
	                e.preventDefault();
	                this.spin(dir);
	            }
	        }, this)
	    });

	    //init input value
	    this.oldValue = this.value();
	    this.value(this.$el.val());
	    return this;
	};

	Spinning.rules = {
	    defaults: {
	        min: null,
	        max: null,
	        step: 1,
	        precision: 0
	    },
	    currency: {
	        min: 0.00,
	        max: null,
	        step: 0.01,
	        precision: 2
	    },
	    quantity: {
	        min: 1,
	        max: 999,
	        step: 1,
	        precision: 0
	    },
	    percent: {
	        min: 1,
	        max: 100,
	        step: 1,
	        precision: 0
	    },
	    month: {
	        min: 1,
	        max: 12,
	        step: 1,
	        precision: 0
	    },
	    day: {
	        min: 1,
	        max: 31,
	        step: 1,
	        precision: 0
	    },
	    hour: {
	        min: 0,
	        max: 23,
	        step: 1,
	        precision: 0
	    },
	    minute: {
	        min: 1,
	        max: 59,
	        step: 1,
	        precision: 0
	    },
	    second: {
	        min: 1,
	        max: 59,
	        step: 1,
	        precision: 0
	    }
	};

	Spinning.prototype = {
	    spin: function(dir) {
	        /************ fuzhengchun begin *************/
	        if (this.$el.prop('disabled')) {
	            return;
	        }

	        if (this.$el.siblings('[data-spin=' + dir + ']').hasClass('disabled')) {
	            return;
	        }

	        /************ fuzhengchun end *************/

	        this.oldValue = this.value();
	        var step = $.isFunction(this.options.step) ? this.options.step.call(this, dir) : this.options.step;
	        var multipler = dir === 'up' ? 1 : -1;

	        var beforeChange = this.options.beforeChange || function() {};
	        if (beforeChange.call(this, this.oldValue, dir) !== false) {
	            this.value(this.oldValue + Number(step) * multipler);
	        }
	    },

	    value: function(v) {
	        if (v === null || v === undefined) {
	            return this.numeric(this.$el.val());
	        }
	        v = this.numeric(v);

	        var valid = this.validate(v);
	        if (valid !== 0) {
	            if (valid === -1) {
	                v = this.min;
	                this.$el.trigger('rangemin.spinner');
	            } else {
	                v = this.max;
	                this.$el.trigger('rangemax.spinner');
	            }
	            // v = (valid === -1) ? this.min : this.max;
	            // this.$el.trigger('rangeout.spinner');
	        }
	        this.$el.val(v.toFixed(this.options.precision));

	        if (this.oldValue !== this.value()) {
	            // changing.spinner
	            this.$el.trigger('changing.spinner', [this.value(), this.oldValue]);

	            // lazy changed.spinner
	            clearTimeout(spinningTimer);
	            spinningTimer = setTimeout($.proxy(function() {
	                this.$el.trigger('changed.spinner', [this.value(), this.oldValue]);
	            }, this), Spinner.delay);
	        }
	    },

	    numeric: function(v) {
	        v = this.options.precision > 0 ? parseFloat(v, 10) : parseInt(v, 10);

	        // If the variable is a number
	        if (isFinite(v)) {
	            return v;
	        }

	        return v || this.options.min || 0;
	    },

	    validate: function(val) {
	        if (this.options.min !== null && val < this.min) {
	            return -1;
	        }

	        if (this.options.max !== null && val > this.max) {
	            return 1;
	        }

	        return 0;
	    },

	    setMin: function(val) {
	        var min = this.min = this.numeric(val);
	        this.options.min = min;
	    },

	    setMax: function(val) {
	        var max = this.max = this.numeric(val);
	        this.options.max = max;
	    }
	};

	Spinner = function(element, options) {
	    this.$el = $(element);
	    this.$spinning = this.$el.find('[data-spin="spinner"]');

	    if (this.$spinning.length === 0) {
	        this.$spinning = this.$el.find(':input[type="text"]');
	    }

	    options = $.extend({}, options, this.$spinning.data());

	    this.spinning = new Spinning(this.$spinning, options);

	    this.$el
	        .on('click.spinner', '[data-spin="up"], [data-spin="down"]', $.proxy(this, 'spin'))
	        /*.on('mousedown.spinner', '[data-spin="up"], [data-spin="down"]', $.proxy(this, 'spin'))*/;

	    /*$(document).on('mouseup.spinner', $.proxy(function() {
	        clearTimeout(this.spinTimeout);
	        clearInterval(this.spinInterval);
	    }, this));*/

	    if (options.delay) {
	        this.delay(options.delay);
	    }

	    if (options.changed) {
	        this.changed(options.changed);
	    }

	    if (options.changing) {
	        this.changing(options.changing);
	    }

	    if (options.rangemin) {
	        this.rangemin(options.rangemin);
	    }

	    if (options.rangemax) {
	        this.rangemax(options.rangemax);
	    }
	};

	Spinner.delay = 500;

	Spinner.prototype = {
	    constructor: Spinner,

	    spin: function(e) {
	        var dir = $(e.currentTarget).data('spin');

	        switch (e.type) {
	            case 'click':
	                e.preventDefault();
	                this.spinning.spin(dir);
	                break;
	            /*case 'mousedown':
	                if (e.which === 1) {
	                    this.spinTimeout = setTimeout($.proxy(this, 'beginSpin', dir), 300);
	                }
	                break;*/
	        }
	    },

	    delay: function(ms) {
	        var delay = Number(ms);

	        if (delay >= 0) {
	            this.constructor.delay = delay + 100;
	        }
	    },

	    value: function() {
	        return this.spinning.value();
	    },

	    changed: function(fn) {
	        this.bindHandler('changed.spinner', fn);
	    },

	    changing: function(fn) {
	        this.bindHandler('changing.spinner', fn);
	    },

	    rangemax: function(fn) {
	        this.bindHandler('rangemax.spinner', fn);
	    },

	    rangemin: function(fn) {
	        this.bindHandler('rangemin.spinner', fn);
	    },

	    bindHandler: function(t, fn) {
	        if ($.isFunction(fn)) {
	            this.$spinning.on(t, fn);
	        } else {
	            this.$spinning.off(t);
	        }
	    },

	    beginSpin: function(dir) {
	        this.spinInterval = setInterval($.proxy(this.spinning, 'spin', dir), 100);
	    }
	};

	var old = $.fn.spinner;

	$.fn.spinner = function(options, value) {
	    return this.each(function() {
	        var data = $.data(this, 'spinner');

	        if (!data) {
	            data = new Spinner(this, options);

	            $.data(this, 'spinner', data);
	        }
	        if (options === 'delay' || options === 'changed' || options === 'changing') {
	            data[options](value);
	        } else if (options === 'step' && value) {
	            data.spinning.step = value;
	        } else if (options === 'spin' && value) {
	            data.spinning.spin(value);
	        }
	    });
	};

	$.fn.spinner.Constructor = Spinner;
	$.fn.spinner.noConflict = function() {
	    $.fn.spinner = old;
	    return this;
	};

	// $(function() {
	//     $('[data-trigger="spinner"]').spinner();
	// });

	module.exports = $.fn.spinner;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var tpl = __webpack_require__(117);
	var Dialog = __webpack_require__(22);

	var create = function(data, options){
	    var content = tpl(data || {}); // 显示编辑弹窗之前,需要自己拼装数据
	    options = options || {};

	    var defaults = {
	        title: '选择图片',
	        modal: true,
	        fixed: true,
	        content: content,
	        className: 'pop-box',
	        okValue: '插入图片',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        cancalValue : '取消',
	        btnWrapCls: 'insert-cancel'
	        /*function () {
	            // var value = $('#property-returnValue-demo').val();
	            // this.close(value);
	            // this.remove();
	        }*/
	    };
	    $.extend(true, defaults, options);
	    return Dialog(defaults);
	};

	module.exports = {
	    create: create
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/upload/content',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,maxlength=$data.maxlength,$out='';$out+='<div data-node="uploadBox"> <div class="pics-list-wrap clearfix"> <ul class="pics-list clearfix" data-node="uploadList"> <li data-defaultAddFile=\'picker\'></li> </ul> </div> <div class="num-pics">您可以添加 <span class="link-hover-red" data-node="addNum">';
	$out+=$escape(maxlength);
	$out+='</span><span class="deep-gray">/';
	$out+=$escape(maxlength);
	$out+=' </span>张图片</div> </div>';
	return new String($out);
	});

/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {var Dialog = __webpack_require__(22);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var Pubsub = __webpack_require__(43);
	var channel = __webpack_require__(68);
	var tpl = __webpack_require__(119);
	var alert = __webpack_require__(36);
	var truncate = __webpack_require__(49);
	var byteLen = __webpack_require__(46);

	__webpack_require__(120)();

	//  TODO: (待完成事项)
	//  圈子名称截断
	//  圈子加载失败(超时)时是否重新加载

	var $selected; // 已选中的圈子
	var activeCls = 'active';
	var selectedGroup = {}; // 选中的圈子信息
	var loading = '<div data-node="loading" class="loading"><img src="' + $_CONFIG.imgpath + '/images/public/loading.gif"></div>';
	var reload = '<p data-node="reload" class="failed-txt">数据获取失败，点击<a data-node="btn_reload" href="javascript:;" style="color:#f95353">重新加载</a>！</p>';


	var getGroups = function() {
	    return fetch.get(url.get('selectGroup'));
	};

	var select = function(e) {
	    var $current = $(this);
	    var id = $current.data('id');
	    // if (selectedGroup && selectedGroup.id !== id && selectedGroup.id) {
	    if ($selected) {
	        $selected.removeClass(activeCls);
	    }
	    $current.addClass(activeCls);
	    // } else {
	    //     $current.addClass(activeCls);
	    // }
	    $selected = $current;
	    selectedGroup = {
	        id: id,
	        name: $selected.data('name')
	    };
	    return false;
	};

	var unselect = function() {
	    return false;
	};

	var bindHandler = function(bool) {
	    var $content = this._$('content');
	    $content[bool ? 'off' : 'on']('click', 'dl', select);
	};


	var create = function(options) {
	    options = options || {};
	    var defaults = {
	        title: '选择圈子',
	        modal: true,
	        fixed: true,
	        content: loading,
	        className: 'pop-box',
	        okValue: '确定',
	        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
	        btnWrapCls: 'insert-cancel',
	        ok: function() {
	            if (!selectedGroup.id) {
	                alert('请选择一个圈子');
	                return false;
	            }
	            Pubsub(channel.postTopic.selectCircle).pub(selectedGroup);
	            //selectedGroup就是抛出来的数据
	            //将需要的数据拼好
	        },
	        cancel: function() {
	            bindHandler.call(this, true);
	        },
	        onshow: function() {
	            var self = this;
	            var groupid;
	            if ($('[data-action=selectGroup]').attr('data-groupid')) {
	                groupid = $('[data-action=selectGroup]').attr('data-groupid');
	            }
	            getGroups().done(function(json) {
	                // TODO: 隐藏loading
	                if (json && json.code === 200) {
	                    // 处理数据
	                    var data = json.data || {};
	                    var relatedGroups = data.myRelatedGroups || {};
	                    var created = relatedGroups.imaster || [];
	                    var joined = relatedGroups.imember || [];

	                    var recommendGroups = data.recommendGroups || {};
	                    var recommend = recommendGroups.peas || [];
	                    //添加推荐圈子数量限制和查重
	                    var usedObj = created.concat(joined);
	                    //数组去重
	                    function dupRemove(useObj, contrastObj) {
	                        var arr = [];
	                        var dup = 0;
	                        for (var i = 0; i < useObj.length; i++) {
	                            for (var j = 0; j < contrastObj.length; j++) {
	                                if (contrastObj[j].id == useObj[i].id) {
	                                    dup = 1;
	                                    break;
	                                } else {
	                                    dup = 0;
	                                }
	                            }
	                            if (arr.length < 12) {
	                                if (dup == 0) {
	                                    arr.push(useObj[i]);
	                                }
	                            } else {
	                                return arr;
	                            }
	                        }
	                        return arr;
	                    }
	                    var newObj = dupRemove(recommend, usedObj)
	                    var data = {
	                        created: created,
	                        joined: joined,
	                        recommend: newObj
	                    };
	                    // 生成字符串
	                    var html = tpl(data);
	                    // 设置内容
	                    self.content(html);
	                    // 绑定事件
	                    if (groupid && $('[data-id=' + groupid + ']')) {
	                        $('[data-id=' + groupid + ']').addClass('active');
	                        $selected = $('[data-id=' + groupid + ']');
	                    }
	                    bindHandler.call(self);
	                } else {
	                    self.content(reload);
	                    $('[data-node=btn_reload]').on('click', function() {
	                        create();
	                    })
	                }
	            }).fail(function() {
	                self.content(reload);
	            }).always(function() {

	            });
	        },
	        onclose: function() {
	            bindHandler.call(this, true);
	        }
	    };

	    $.extend(true, defaults, options);
	    var d = Dialog(defaults);
	    d.show();
	    return d;
	};

	//测试数据
	Pubsub(channel.postTopic.selectCircle).sub(function(group) {
	    console.log(group);
	})

	module.exports = create;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/circle/content',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,created=$data.created,$each=$utils.$each,group=$data.group,$index=$data.$index,joined=$data.joined,recommend=$data.recommend,$out='';$out+='<div data-node="loading" style="display:none" class="loading"><img src="';
	$out+=$escape($helpers. randomShowPic('loading' ));
	$out+='" alt=""></div> <p data-node="reload" style="display:none" class="failed-txt">数据获取失败，点击重新加载！</p> <ul class="chosed-circle-box"> ';
	if(created.length > 0){
	$out+=' <li class="clearfix"> <h4>我创建的圈子</h4> ';
	$each(created,function(group,$index){
	$out+=' <dl data-id="';
	$out+=$escape(group.id);
	$out+='" data-name="';
	$out+=$escape(group.name);
	$out+='"> <dt> ';
	if(group.icon && group.icon.length > 0){
	$out+=' <img src="';
	$out+=$escape(group.icon);
	$out+='" title="';
	$out+=$escape(group.name);
	$out+='"> ';
	}else{
	$out+=' <img src="';
	$out+=$escape($helpers. randomShowPic('face' ));
	$out+='" title="';
	$out+=$escape(group.name);
	$out+='"> ';
	}
	$out+=' </dt> <dd><a href="javascript:;">';
	$out+=$escape(group.name);
	$out+='</a></dd> </dl> ';
	});
	$out+=' </li> ';
	}
	$out+=' ';
	if(joined.length > 0){
	$out+=' <li class="clearfix"> <h4>我加入的圈子</h4> ';
	$each(joined,function(group,$index){
	$out+=' <dl data-id="';
	$out+=$escape(group.id);
	$out+='" data-name="';
	$out+=$escape(group.name);
	$out+='"> <dt> ';
	if(group.icon && group.icon.length > 0){
	$out+=' <img src="';
	$out+=$escape(group.icon);
	$out+='" title="';
	$out+=$escape(group.name);
	$out+='"> ';
	}else{
	$out+=' <img src="';
	$out+=$escape($helpers. randomShowPic('face' ));
	$out+='" title="';
	$out+=$escape(group.name);
	$out+='"> ';
	}
	$out+=' </dt> <dd><a href="javascript:;">';
	$out+=$escape(group.name);
	$out+='</a></dd> </dl> ';
	});
	$out+=' </li> ';
	}
	$out+=' ';
	if(recommend.length > 0){
	$out+=' <li class="clearfix"> <h4>推荐圈子</h4> ';
	$each(recommend,function(group,$index){
	$out+=' <dl data-id="';
	$out+=$escape(group.id);
	$out+='" data-name="';
	$out+=$escape(group.name);
	$out+='"> <dt> ';
	if(group.icon && group.icon.length > 0){
	$out+=' <img src="';
	$out+=$escape(group.icon);
	$out+='" title="';
	$out+=$escape(group.name);
	$out+='"> ';
	}else{
	$out+=' <img src="';
	$out+=$escape($helpers. randomShowPic('face' ));
	$out+='" title="';
	$out+=$escape(group.name);
	$out+='"> ';
	}
	$out+=' </dt> <dd><a href="javascript:;">';
	$out+=$escape(group.name);
	$out+='</a></dd> </dl> ';
	});
	$out+=' </li> ';
	}
	$out+=' </ul> ';
	return new String($out);
	});

/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {/**
	 * randomShowPic  - tmod helpers
	 * 社交部分显示随机图片
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var randomShowPic = function(type) {
		// var num;
		if (type == 'face') {
			return $_CONFIG.imgpath + '/images/public/circle-default.png';
		} else if (type == 'loading') {
			return $_CONFIG.imgpath + '/images/public/loading.gif';
		}
	};

	module.exports = function() {
		tmod.helper('randomShowPic', randomShowPic);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * 分享到 微信，QQ，微博，空间
	 * @author Zhengchun Fu
	 */
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var getQRCode = __webpack_require__(122);
	var checkLoginStatus = __webpack_require__(42);


	var APIS = {
	    qq: "http://connect.qq.com/widget/shareqq/index.html",
	    sina: "http://v.t.sina.com.cn/share/share.php",
	    qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"
	};

	var defaultInfo = {
	    url: 'http://www.gomeplus.com',
	    title: '国美+APP边玩边分享，购物不孤单',
	    pic: 'http://www.gomeplus.com/images/logo.png', // logo图片地址
	    summary: '国美+APP边玩边分享，购物不孤单'
	};

	var open = function(url) {
	    window.open(url);
	};

	// 分享按钮渲染
	var hasShareBtnsHTML = false;
	var initShareBtns = function() {
	    var shareBtns = '<p data-node="shareBtnBox" class="share-down" style="z-index:21;"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" class="icon icon-weixin">&#xe937;</em><em data-shareto="qq" class="icon icon-qq">&#xe900;</em><em data-shareto="sina" class="icon icon-sina">&#xe935;</em><em data-shareto="qzone" class="icon icon-kongjian">&#xe902;</em></span></span></p>';
	    $('body').append(shareBtns);
	    hasShareBtnsHTML = true;
	};
	var showShareToBtns = function(style) {
	    !hasShareBtnsHTML && initShareBtns();
	    $('[data-node=shareBtnBox]').css({
	        left: style.x,
	        top: style.y
	    }).show();
	};

	// 微信弹层渲染
	var hasWeixinHTML = false;
	var initWeixinHTML = function() {

	    var weixinBox = '<div class="share-weixin"><div class="wx-mask"></div><div class="wx-main"><div class="wx-code"><span></span><img data-node="shareWeixinCode" alt="分享到微信" /></div><p>打开微信扫一扫，即可分享</p><a href="javascript:;" title="点击关闭" class="wx-close">×</a></div></div>';
	    $('body').append(weixinBox);
	    hasWeixinHTML = true;
	};

	// pics: 图片参数是否为pics，默认是pic。
	var formatParams = function(p, pics) {
	    var s = [];
	    var data = {
	        title: p.title,
	        url: p.url,
	        summary: p.summary,
	        desc: p.desc,
	        site: p.site
	    };
	    if (pics) {
	        data.pics = p.pic;
	    } else {
	        data.pic = p.pic;
	    }
	    for (var i in data) {
	        s.push(i + '=' + encodeURIComponent(data[i] || ''));
	    }
	    return s.join('&');
	};

	// 单个调用方法
	// 分享的图片多个用||隔开。
	var shareTo = {
	    weixin: function(options) {
	        var link = getQRCode(options.url)
	        !hasWeixinHTML && initWeixinHTML();

	        $('[data-node=shareWeixinCode]')[0].src = link;
	        $('.share-weixin').show();
	        $('.wx-close').on('click', function() {
	            $('.share-weixin').hide();
	        });
	    },
	    qq: function(options) {
	        var link = APIS.qq + '?' + formatParams(options, true);
	        open(link);
	    },
	    sina: function(options) {
	        var link = APIS.sina + '?' + formatParams(options);
	        open(link);
	    },
	    qzone: function(options) {
	        var link = APIS.qzone + '?' + formatParams(options, true);
	        open(link);
	    }
	};

	// share with kid
	var shareWithKid = function(args) {
	    var isRebate = args.isRebate === '0' ? false : true;
	    fetch.get(url.get('shareGetGoodsKid'), {
	        validate: isRebate,
	        data: {
	            skuId: args.skuId,
	            itemId: args.itemId,
	            parentKid: args.parentKid,
	        },
	        async: false // 防止新窗口被拦截
	    }).done(function(data) {
	        if (data.success === true) {
	            var kid = data.data.kid;
	            var shareInfo = args.shareInfo;
	            // 替换分享链接
	            // 规则：mall_domain+product/shopid-productId.html?onlineUserId=xxxx&kid=xxxx
	            var url = shareInfo.url;
	            var index = url.indexOf('?');
	            if (index > 0) {
	                url = url.substring(0, index);
	            }
	            shareInfo.url = url + '?onlineUserId=' + shareInfo.onlineUserId + '&kId=' + kid;
	            shareTo[args.shareto](shareInfo);
	        } else {
	            shareTo[args.shareto](args.shareInfo);
	        }
	    }).fail(function(data) {
	        if(isRebate){
	             if(checkLoginStatus ()){
	                shareTo[args.shareto](args.shareInfo);
	            }
	        }else{
	           shareTo[args.shareto](args.shareInfo); 
	        }
	    });
	};

	// 统一方法
	var go = function(obj) {
	    // {type:x,title:x,url:x,pic:x}
	    var info = {
	        title: obj.title || defaultInfo.title,
	        url: obj.url || defaultInfo.url,
	        pic: obj.pic || defaultInfo.pic,
	        summary: obj.summary || '',
	        desc: obj.desc || ''
	    };

	    !!shareTo[obj.type] && shareTo[obj.type](info);

	};


	/**
	 * 简化分享
	 * @param  {str} [parent] [容器节点]
	 * @param {str} [selector] [子节点选择器]
	 */
	var shareItem = function(parent, selector, beforeShare) {
	    var shareInfo = null;
	    $item = typeof parent === 'string' ? $(parent) : parent;
	    selector = selector || '[data-action=shareto]';
	    // 显示分享按钮
	    $item.on('mouseenter', selector, function(e) {
	        var shareUrl = $(this).data('surl');
	        var shareTitle = $(this).data('stitle');
	        var sharePic = $(this).data('spic');

	        shareInfo = {
	            url: shareUrl,
	            title: shareTitle,
	            pic: sharePic
	        };

	        var pw = $(this).width();
	        var ph = $(this).height();
	        var px = ($(this).offset().left / 1 + pw / 2 - 80) + 'px';
	        var py = ($(this).offset().top / 1 + (ph - 1)) + 'px';

	        showShareToBtns({
	            x: px,
	            y: py
	        });
	        return false;
	    });
	    // 隐藏分享按钮
	    $item.on('mouseleave', selector, function(e) {
	        $('[data-node=shareBtnBox]').hide();
	        return false;
	    });

	    $('body').on('click', '[data-shareto]', function(e) {
	        e.preventDefault();
	        shareType = $(this).data('shareto');
	        shareInfo.type = shareType;
	        beforeShare = beforeShare || function() {};
	        beforeShare.call(null, shareInfo);
	        // console.log(shareInfo);
	        go(shareInfo);
	    });

	    $('body').on('mouseenter', '[data-node=shareBtnBox]', function() {
	        $(this).show();
	    });
	    $('body').on('mouseleave', '[data-node=shareBtnBox]', function() {
	        $(this).hide();
	    });
	};


	module.exports = {
	    share: go,
	    shareto: shareTo,
	    shareItem: shareItem,
	    shareWithKid: shareWithKid
	};

	/**
	 * 分享到 使用说明
	 * 在[data-action=shareto]节点上输出要获取的数据 
	 * data-surl,data-stitle,data-spic
	 * url要是绝对地址，带https?://的
	 * pic是要分享的图片绝对地址，多张图片用||隔开。
	 *
	 * 页面中在分享按钮加 [data-action=shareto] 自定义属性；
	 * 如果是分享当前页面的也要加shareInfo,值为当前页面对应的信息。格式都一样。
	 *
	 * 调用方法:
	 * var share = require(..);
	 * share.shareItem(要分享的区域父节点字符串e.g. 'data-node=shareList');
	 *
	 * shareto.weixin({shareInfo})
	 * shareto.qq({shareInfo})
	 * shareto.sina({shareInfo})
	 * shareto.qzone({shareInfo})
	 *
	 *
	 * share.share({shareInfo});这个shareInfo里要有type：[weixin,qq,sina,qzone]
	 */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG) {// 根据字符串生成二维码
	var getQRCode = function(url) {
		return $_CONFIG.wap_url + 'q.php?t=' + encodeURIComponent(url);
	};

	module.exports = getQRCode;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 123:
/***/ function(module, exports) {

	/**
	 * Parse or format dates
	 * @class fecha
	 */
	var fecha = {};
	var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
	var twoDigits = /\d\d?/;
	var threeDigits = /\d{3}/;
	var fourDigits = /\d{4}/;
	var word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
	var noop = function() {};

	function shorten(arr, sLen) {
	    var newArr = [];
	    for (var i = 0, len = arr.length; i < len; i++) {
	        newArr.push(arr[i].substr(0, sLen));
	    }
	    return newArr;
	}

	function monthUpdate(arrName) {
	    return function(d, v, i18n) {
	        var index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());
	        if (~index) {
	            d.month = index;
	        }
	    };
	}

	function pad(val, len) {
	    val = String(val);
	    len = len || 2;
	    while (val.length < len) {
	        val = '0' + val;
	    }
	    return val;
	}

	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var monthNamesShort = shorten(monthNames, 3);
	var dayNamesShort = shorten(dayNames, 3);
	fecha.i18n = {
	    dayNamesShort: dayNamesShort,
	    dayNames: dayNames,
	    monthNamesShort: monthNamesShort,
	    monthNames: monthNames,
	    amPm: ['am', 'pm'],
	    DoFn: function DoFn(D) {
	        return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10];
	    }
	};

	var formatFlags = {
	    D: function(dateObj) {
	        return dateObj.getDate();
	    },
	    DD: function(dateObj) {
	        return pad(dateObj.getDate());
	    },
	    Do: function(dateObj, i18n) {
	        return i18n.DoFn(dateObj.getDate());
	    },
	    d: function(dateObj) {
	        return dateObj.getDay();
	    },
	    dd: function(dateObj) {
	        return pad(dateObj.getDay());
	    },
	    ddd: function(dateObj, i18n) {
	        return i18n.dayNamesShort[dateObj.getDay()];
	    },
	    dddd: function(dateObj, i18n) {
	        return i18n.dayNames[dateObj.getDay()];
	    },
	    M: function(dateObj) {
	        return dateObj.getMonth() + 1;
	    },
	    MM: function(dateObj) {
	        return pad(dateObj.getMonth() + 1);
	    },
	    MMM: function(dateObj, i18n) {
	        return i18n.monthNamesShort[dateObj.getMonth()];
	    },
	    MMMM: function(dateObj, i18n) {
	        return i18n.monthNames[dateObj.getMonth()];
	    },
	    YY: function(dateObj) {
	        return String(dateObj.getFullYear()).substr(2);
	    },
	    YYYY: function(dateObj) {
	        return dateObj.getFullYear();
	    },
	    h: function(dateObj) {
	        return dateObj.getHours() % 12 || 12;
	    },
	    hh: function(dateObj) {
	        return pad(dateObj.getHours() % 12 || 12);
	    },
	    H: function(dateObj) {
	        return dateObj.getHours();
	    },
	    HH: function(dateObj) {
	        return pad(dateObj.getHours());
	    },
	    m: function(dateObj) {
	        return dateObj.getMinutes();
	    },
	    mm: function(dateObj) {
	        return pad(dateObj.getMinutes());
	    },
	    s: function(dateObj) {
	        return dateObj.getSeconds();
	    },
	    ss: function(dateObj) {
	        return pad(dateObj.getSeconds());
	    },
	    S: function(dateObj) {
	        return Math.round(dateObj.getMilliseconds() / 100);
	    },
	    SS: function(dateObj) {
	        return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
	    },
	    SSS: function(dateObj) {
	        return pad(dateObj.getMilliseconds(), 3);
	    },
	    a: function(dateObj, i18n) {
	        return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
	    },
	    A: function(dateObj, i18n) {
	        return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
	    },
	    ZZ: function(dateObj) {
	        var o = dateObj.getTimezoneOffset();
	        return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
	    }
	};

	var parseFlags = {
	    D: [twoDigits, function(d, v) {
	        d.day = v;
	    }],
	    M: [twoDigits, function(d, v) {
	        d.month = v - 1;
	    }],
	    YY: [twoDigits, function(d, v) {
	        var da = new Date(),
	            cent = +('' + da.getFullYear()).substr(0, 2);
	        d.year = '' + (v > 68 ? cent - 1 : cent) + v;
	    }],
	    h: [twoDigits, function(d, v) {
	        d.hour = v;
	    }],
	    m: [twoDigits, function(d, v) {
	        d.minute = v;
	    }],
	    s: [twoDigits, function(d, v) {
	        d.second = v;
	    }],
	    YYYY: [fourDigits, function(d, v) {
	        d.year = v;
	    }],
	    S: [/\d/, function(d, v) {
	        d.millisecond = v * 100;
	    }],
	    SS: [/\d{2}/, function(d, v) {
	        d.millisecond = v * 10;
	    }],
	    SSS: [threeDigits, function(d, v) {
	        d.millisecond = v;
	    }],
	    d: [twoDigits, noop],
	    ddd: [word, noop],
	    MMM: [word, monthUpdate('monthNamesShort')],
	    MMMM: [word, monthUpdate('monthNames')],
	    a: [word, function(d, v, i18n) {
	        var val = v.toLowerCase();
	        if (val === i18n.amPm[0]) {
	            d.isPm = false;
	        } else if (val === i18n.amPm[1]) {
	            d.isPm = true;
	        }
	    }],
	    ZZ: [/[\+\-]\d\d:?\d\d/, function(d, v) {
	        var parts = (v + '').match(/([\+\-]|\d\d)/gi),
	            minutes;

	        if (parts) {
	            minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
	            d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
	        }
	    }]
	};
	parseFlags.dd = parseFlags.d;
	parseFlags.dddd = parseFlags.ddd;
	parseFlags.Do = parseFlags.DD = parseFlags.D;
	parseFlags.mm = parseFlags.m;
	parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
	parseFlags.MM = parseFlags.M;
	parseFlags.ss = parseFlags.s;
	parseFlags.A = parseFlags.a;


	// Some common format strings
	fecha.masks = {
	    'default': 'ddd MMM DD YYYY HH:mm:ss',
	    shortDate: 'M/D/YY',
	    mediumDate: 'MMM D, YYYY',
	    longDate: 'MMMM D, YYYY',
	    fullDate: 'dddd, MMMM D, YYYY',
	    shortTime: 'HH:mm',
	    mediumTime: 'HH:mm:ss',
	    longTime: 'HH:mm:ss.SSS'
	};

	/***
	 * Format a date
	 * @method format
	 * @param {Date|number} dateObj
	 * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
	 */
	fecha.format = function(dateObj, mask, i18nSettings) {
	    var i18n = i18nSettings || fecha.i18n;

	    if (typeof dateObj === 'number') {
	        dateObj = new Date(dateObj);
	    }

	    if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
	        throw new Error('Invalid Date in fecha.format');
	    }

	    mask = fecha.masks[mask] || mask || fecha.masks['default'];

	    return mask.replace(token, function($0) {
	        return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
	    });
	};

	/**
	 * Parse a date string into an object, changes - into /
	 * @method parse
	 * @param {string} dateStr Date string
	 * @param {string} format Date parse format
	 * @returns {Date|boolean}
	 */
	fecha.parse = function(dateStr, format, i18nSettings) {
	    var i18n = i18nSettings || fecha.i18n;

	    if (typeof format !== 'string') {
	        throw new Error('Invalid format in fecha.parse');
	    }

	    format = fecha.masks[format] || format;

	    // Avoid regular expression denial of service, fail early for really long strings
	    // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
	    if (dateStr.length > 1000) {
	        return false;
	    }

	    var isValid = true;
	    var dateInfo = {};
	    format.replace(token, function($0) {
	        if (parseFlags[$0]) {
	            var info = parseFlags[$0];
	            var index = dateStr.search(info[0]);
	            if (!~index) {
	                isValid = false;
	            } else {
	                dateStr.replace(info[0], function(result) {
	                    info[1](dateInfo, result, i18n);
	                    dateStr = dateStr.substr(index + result.length);
	                    return result;
	                });
	            }
	        }

	        return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
	    });

	    if (!isValid) {
	        return false;
	    }

	    var today = new Date();
	    if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
	        dateInfo.hour = +dateInfo.hour + 12;
	    } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
	        dateInfo.hour = 0;
	    }

	    var date;
	    if (dateInfo.timezoneOffset != null) {
	        dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
	        date = new Date(Date.UTC(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
	            dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0));
	    } else {
	        date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
	            dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0);
	    }
	    return date;
	};

	module.exports = fecha;


/***/ }

});