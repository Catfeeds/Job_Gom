webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var Pubsub = __webpack_require__(48);
	var deliveryAddrPop = __webpack_require__(49);
	var confirm = __webpack_require__(55);
	var alert = __webpack_require__(37);
	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('uc_address');

	var tpl = __webpack_require__(57);

	var dftAddrCls = 'set-default-hide';

	var $addrNo = $('[data-node=addrNo]');
	var $addrNew = $('[data-node=addrNew]');
	var $addressList = $('[data-node=addressList]');
	var $add = $('[data-action=addAddr]');
	var $addrNum = $('[data-node=addrNum]'); // 收货地址计数
	$addrNum.data('count', +$addrNum.text()); // 存储计数


	// 更新收货地址的计数
	var updateAddrNum = function updateAddrNum(num) {
	    var current = $addrNum.data('count');
	    var count = current + num;
	    $addrNum.text(count);
	    $addrNum.data('count', count);
	    if (count >= 20) {
	        $add.addClass('btn-default');
	    } else {
	        $add.removeClass('btn-default');
	    }
	    if (count > 0) {
	        $addrNo.addClass('hide');
	        $addrNew.removeClass('hide');
	        $addressList.removeClass('hide');
	    } else {
	        $addrNo.removeClass('hide');
	        $addrNew.addClass('hide');
	        $addressList.addClass('hide');
	    }
	};

	// 编辑收获地址
	var editAddr = function editAddr() {
	    var $item = $(this).closest('tr');
	    var isDefault = $item.attr('data-dft') == 1 ? true : false;
	    var name = $item.find('[data-node=name]').text();
	    var phone = $item.find('[data-node=phone]').text();
	    var $pcba = $item.find('[data-node=area]');
	    var addr = $item.find('[data-node=addr]').text();
	    var json = $pcba.data('address');
	    var id = $item.data('id');
	    deliveryAddrPop({
	        name: name,
	        addr: addr,
	        isDefault: isDefault,
	        phone: phone,
	        province: json.provinceName, // 省
	        provinceId: json.provinceId,
	        city: json.cityName, // 市
	        cityId: json.cityId,
	        borough: json.boroughName, // 县
	        boroughId: json.boroughId,
	        area: json.areaName,
	        areaId: json.areaId,
	        addressId: id,
	        idCard: json.idCard
	    });
	    return false;
	};

	// 删除收货地址
	var delAddr = function delAddr() {
	    var $item = $(this).closest('tr');
	    confirm('确定删除收货地址吗？', {
	        content: '<p class="pay-pop-p del-pop-p"><em class="iconn-12"></em>您确定要删除收货地址吗</p>',
	        title: '删除',
	        okCls: '',
	        ok: function ok() {
	            fetch.post(url.get('delAddress'), {
	                data: {
	                    addressId: $item.data('id')
	                }
	            }).done(function (data) {
	                var code = data.code;
	                if (code === 200) {
	                    // 更新计数
	                    updateAddrNum(-1);
	                    $item.remove();
	                } else {
	                    alert('删除失败');
	                }
	            });
	        }
	    });
	};

	// 新增收获地址
	var addAddr = function addAddr() {
	    var addrCount = $addrNum.length ? $addrNum.data('count') : 0;
	    if (addrCount < 20) {
	        deliveryAddrPop({}, {
	            title: '新增收货地址'
	        });
	    }
	    return false;
	};

	var showDefault = function showDefault() {
	    var $this = $(this);
	    if ($this.attr('data-dft') != 1) {
	        $this.find('[data-action=setDft]').removeClass(dftAddrCls);
	    }
	    return false;
	};

	var hideDefault = function hideDefault() {
	    $(this).children().eq(0).find('[data-action=setDft]').addClass(dftAddrCls);
	    return false;
	};

	// 移除默认地址标签
	var rmDefault = function rmDefault() {
	    var $item = $addressList.find('tr[data-dft=1]').attr('data-dft', 0);
	    $item.find('[data-node=dftAddr]').addClass(dftAddrCls);
	};

	var setDefault = function setDefault() {
	    var $this = $(this);
	    var firing = $this.data('firing');
	    if (firing) {
	        return false;
	    }
	    $this.data('firing', 1);
	    var $item = $this.closest('tr');
	    fetch.post(url.get('setDefaultAddr'), {
	        data: {
	            addressId: $item.data('id')
	        }
	    }).done(function (data) {
	        if (data && data.code === 200) {
	            onSetDefaultDone($item);
	        } else {
	            alert('设置失败');
	        }
	    }).fail(function () {
	        alert('设置失败');
	    }).always(function () {
	        $this.data('firing', 0);
	    });
	};

	// 设置默认地址请求成功后
	var onSetDefaultDone = function onSetDefaultDone($current) {
	    // 设置data-dft属性,隐藏之前的默认地址标识
	    rmDefault();
	    // 显示默认地址
	    $current.find('[data-node=dftAddr]').removeClass(dftAddrCls);
	    // 隐藏设为默认地址标签
	    $current.find('[data-action=setDft]').addClass(dftAddrCls);
	    $current.attr('data-dft', 1);
	    // 更新位置
	    $addressList.find('tr').eq(0).after($current);
	};

	var init = function init() {
	    $add.on('click', addAddr);
	    $addressList.on('click', '[data-action=editAddr]', editAddr);
	    $addressList.on('click', '[data-action=delAddr]', delAddr);
	    $addressList.on('mouseenter', 'tr[data-id]', showDefault);
	    $addressList.on('mouseleave', 'tr[data-id]', hideDefault);
	    $addressList.on('click', '[data-action=setDft]', setDefault);
	    // 更新
	    Pubsub('addr.edit').sub(function (data) {
	        var $item = $addressList.find('[data-id=' + data.addressId + ']');
	        var areaName = data.areaName ? data.areaName : '';
	        var pcba = data.provinceName + data.cityName + data.boroughName + areaName;
	        // 更新收货人
	        $item.find('[data-node=name]').text(data.userName);
	        // 更新所在地址
	        var $area = $item.find('[data-node=area]');
	        $area.data('address', data);
	        $area.text(pcba);
	        // 更新详细地址
	        $item.find('[data-node=addr]').text(data.address);
	        // 更新手机/电话
	        $item.find('[data-node=phone]').text(data.mobile);
	        // 更新默认地址状态
	        var $receiver = $item.children().eq(0);
	        if (data.isDefault) {
	            onSetDefaultDone($item);
	        } else {
	            $item.removeAttr('data-dft');
	            if ($addressList.find('tr[data-dft=1]').length > 0) {
	                $addressList.find('tr').eq(1).after($item);
	            } else {
	                $addressList.find('tr').eq(0).after($item);
	            }
	            $receiver.find('[data-node=dftAddr]').addClass(dftAddrCls);
	        }
	    });
	    // 新增
	    Pubsub('addr.add').sub(function (data) {

	        var isDefault = data.isDefault; // 是否默认地址
	        var areaName = data.areaName ? data.areaName : '';
	        var pcba = data.provinceName + data.cityName + data.boroughName + areaName;
	        var pcbaStr = JSON.stringify(data);
	        data.pcba = pcba;
	        data.pcbaStr = pcbaStr;

	        var position = 0;
	        // var count = $addrNum.data('count');
	        if (isDefault) {
	            rmDefault(); // 移除原有的默认地址
	            position = 0;
	        } else {
	            if ($addressList.find('tr[data-dft=1]').length > 0) {
	                position = 1;
	            } else {
	                position = 0;
	            }
	        }
	        var item = tpl(data);
	        $addressList.find('tr').eq(position).after($(item));
	        // 更新计数
	        updateAddrNum(1);
	    });
	};

	init();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	var tpl = __webpack_require__(50);
	var Dialog = __webpack_require__(22);
	var Pubsub = __webpack_require__(48);
	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var byteLen = __webpack_require__(43);
	var trim = __webpack_require__(51);
	var truncate = __webpack_require__(42);
	var areaSelect = __webpack_require__(52); // 区域四级联动
	var alert = __webpack_require__(37);
	__webpack_require__(46);
	__webpack_require__(54);

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
	var $setDefault;
	var $province;
	var $city;
	var $borough;

	var initNodes = function initNodes() {
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
	    $province = $content.find('[data-node=province]');
	    $city = $content.find('[data-node=city]');
	    $borough = $content.find('[data-node=borough]');
	    $areaTip = $content.find('[data-node=areaTip]');
	};

	var initPlaceHolder = function initPlaceHolder() {
	    $name.placeholder();
	    $addr.placeholder();
	    $phone.placeholder();
	};

	var checkLength = function checkLength(str, max, min) {
	    var len = byteLen(str);
	    var ret = true;
	    if (len > max || len < min) {
	        ret = false;
	    }
	    return ret;
	};

	// 验证收货人
	var validateName = function validateName() {
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
	var validateIdCard = function validateIdCard() {
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
	var validateAddr = function validateAddr() {
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
	var validatePhone = function validatePhone() {
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
	var validatePcba = function validatePcba() {
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

	var validate = function validate() {
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
	var intercept = function intercept(str, max) {
	    var val = trim(str.val());
	    var len = byteLen(val);
	    if (len > max) {
	        str.val(truncate(val, max));
	    }
	};

	// 获取数据
	var getData = function getData() {
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
	var initAreaSelect = function initAreaSelect() {
	    var p = $content.find('[data-node=province]');
	    var c = $content.find('[data-node=city]');
	    var b = $content.find('[data-node=borough]');
	    var a = $content.find('[data-node=area]');

	    areaSelect.init([p, c, b, a], ['选择省', '选择市', '选择区县', '选择街道'], {}, [{
	        content: '<span class="menu-add" data-node="checked">选择省</span>',
	        btn: '<span class="down-arrow"><em class="iconn-2"></em></span>'
	    }, {
	        content: '<span class="menu-add" data-node="checked">选择市</span>',
	        btn: '<span class="down-arrow"><em class="iconn-2"></em></span>'
	    }, {
	        content: '<span class="menu-add" data-node="checked">选择区县</span>',
	        btn: '<span class="down-arrow"><em class="iconn-2"></em></span>'
	    }, {
	        content: '<span class="menu-add" data-node="checked">选择街道</span>',
	        btn: '<span class="down-arrow"><em class="iconn-2"></em></span>'
	    }]);
	};

	var bindHandler = function bindHandler() {
	    $name.on('blur', function () {
	        validateName();
	    });
	    $name.on('textchange', function () {
	        var $this = $(this);
	        var dataName = $this.data('name');
	        if ($this.val() != dataName && '' !== dataName) {
	            $idCard.val('').prop('readonly', false);
	        }
	        intercept($name, 20);
	    });
	    $idCard.on('blur', function () {
	        validateIdCard();
	    });
	    $idCard.on('contextmenu', function () {
	        return false;
	    });
	    $idCard.on('keydown', function (e) {
	        var code = e.keyCode;

	        if (code >= 48 && code <= 57 || code >= 96 && code <= 105 || code == 88 || code == 8 || code == 46 || code >= 37 && code <= 40) {
	            return true;
	        } else {
	            return false;
	        }
	    });
	    $idCard.on('textchange', function () {
	        var val = $(this).val();
	        var newVal = '';
	        if (!/^\d{1,18}$|^\d{17}[xX]$/.test(val)) {
	            newVal = $.trim(val.substr(0, val.length - 1));
	            $(this).val(newVal);
	        }
	    });
	    $addr.on('blur', function () {
	        validateAddr();
	    });
	    $addr.on('textchange', function () {
	        intercept($addr, 60);
	    });
	    $phone.on('blur', function () {
	        validatePhone();
	    });
	    $setDefault.on('click', function () {
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
	    $province.on('click', 'a', function () {
	        validatePcba();
	    });
	    $city.on('click', 'a', function () {
	        validatePcba();
	    });
	    $borough.on('click', 'a', function () {
	        validatePcba();
	    });
	};

	var unbindHandler = function unbindHandler() {
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

	var create = function create(data, options) {
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
	        ok: function ok() {
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

	                if (addressId) {
	                    // 编辑的时候,需要addressId
	                    formData.addressId = addressId;
	                }
	                if (formData.areaId === undefined) {
	                    formData.areaId = '110114001';
	                    formData.areaName = '全部区域';
	                }
	                fetch.post(u, {
	                    data: formData
	                }).done(function (json) {
	                    var $userCardTips = $('[data-node=userCardTips]');
	                    var code = json.code;
	                    var data = json.data || {};
	                    if (code === 200) {
	                        if (data.addressId) {
	                            // 新增时,接口返回地址id
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
	                }).fail(function () {}).always(function () {
	                    firing = false;
	                });
	            }
	            return false; // 不允许关闭
	        },
	        onshow: function onshow() {
	            // 初始化节点
	            initNodes.call(this);
	            // 初始化四级联动
	            initAreaSelect.call(this);
	            // 初始化placeHolder
	            initPlaceHolder();
	            // 绑定事件
	            bindHandler();
	        },
	        onclose: function onclose() {
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

/***/ 50:
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

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	__webpack_require__(53);
	var fetch = __webpack_require__(2),
	    url = __webpack_require__(28),
	    address = {},

	// Pubsub = require('io/pubsub'),
	// addressList = [],
	selectors;
	//nodeSelector  四级联动select选择器  array   
	//placeHolder   默认选项  array || string    如果是数组   保持length与nodeSelector长度一致
	//options       selecct选项
	//node          select内容（文字部分/按钮部分）  node.btn 按钮部分  string(html) node.content文字部分 string(html)
	var init = function init(nodeSelector, placeHolder, options, node) {
	    var nodeSelector = nodeSelector,
	        isString = false,
	        addressType = [['provinceId', 'provinceName'], ['cityId', 'cityName'], ['boroughId', 'boroughName'], ['areaId', 'areaName']],
	        defaultOptions = {},

	    // defaultNode = {},
	    isObject = node instanceof Array ? false : true;
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

	        var pId = i - 1 >= 0 ? selectors[i - 1].attr('data-' + [addressType[i - 1][0]]) : 0;

	        (function (index) {
	            //初始化select
	            var provinceOptions = options;
	            provinceOptions.please = isString ? placeHolder : placeHolder[index];
	            provinceOptions.onChanged = function (changeDate) {
	                var id = changeDate.value,
	                    isClicked = false;
	                if (id === undefined) {
	                    isClicked = true;
	                } else {
	                    address[addressType[index][0]] = changeDate.value;
	                    address[addressType[index][1]] = changeDate.text;
	                    if (index + 1 <= selectors.length - 1) {

	                        addAjax(~~id, function (data) {
	                            nodeSelector[index + 1].setList({
	                                data: data.nodes,
	                                please: isString ? placeHolder : placeHolder[index + 1],
	                                textName: 'name',
	                                valueName: 'id'
	                            });
	                        });
	                    }
	                }
	                delAddress(index, isClicked);
	            };
	            nodeSelector[index].selects(isObject ? node : node[index], provinceOptions);
	            /*初始化列表*/
	            if (pId !== '') {
	                addAjax(pId, function (result) {
	                    selectors[index].setList({
	                        data: result.nodes,
	                        please: isString ? placeHolder : placeHolder[index],
	                        textName: 'name',
	                        valueName: 'id',
	                        checked: selectors[0].find('div').children().eq(0).text()
	                    });
	                });
	            }
	        })(i);
	    }
	    function addAjax(id, callback) {
	        if (window.localStorage) {
	            var local = JSON.parse(localStorage.getItem('address' + id));
	            var isLose = local !== null && local.hasOwnProperty('time') ? local.time < +new Date() : true;
	            if (isLose) {
	                fetch.get(url.get('getAddress') + id, {}).done(function (result) {
	                    if (result.code === 200) {
	                        callback.call(null, result.data);
	                        var addressLocal = {
	                            data: result.data,
	                            time: +new Date() + 604800000
	                        };
	                        localStorage.removeItem('address' + id);
	                        localStorage.setItem('address' + id, JSON.stringify(addressLocal));
	                    }
	                }).fail(function (xhr, error) {
	                    console.log(xhr, error);
	                });
	            } else {
	                callback.call(null, local.data);
	            }
	        } else {
	            fetch.get(url.get('getAddress') + id, {}).done(function (result) {
	                if (result.code === 200) {
	                    callback.call(null, result.data);
	                }
	            }).fail(function (xhr, error) {
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
	            nodeSelector[j].find('div').children().eq(0).text(isString ? placeHolder : placeHolder[j]);
	            if (j != num) nodeSelector[j].find('ul').html('');
	        }
	    }
	};

	var destroy = function destroy() {

	    for (var i = 0, len = selectors.length; i < len; i++) {

	        selectors[i].off();
	    }
	};
	var getData = function getData() {
	    return address;
	};
	module.exports = {
	    init: init,
	    destroy: destroy,
	    getData: getData
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	$.fn.extend({
	    selects: function selects(node, options) {
	        var selfs = this,
	            defaultNode = {
	            content: '<span class="span1">' + $(selfs).text() + '</span>',
	            btn: '<span class="span2"></span>'
	        },
	            selfsText = $.trim($(selfs).text()),
	            defaultOptions = {
	            data: [], //列表数据
	            checked: selfsText, //默认选中文字
	            please: '请选择', //默认提示文字
	            textName: 'text', //数据文字key名
	            valueName: 'value', //数据value  key名
	            selectdCls: 'active', //slect点击添加class
	            checkText: true, //下拉列表是否收起  默认收起
	            checkedCls: 'active', //列表选中class
	            disable: 'disable', //是否禁用
	            onChanged: function onChanged() {} //选择后的回调
	        };
	        node = $.extend({}, defaultNode, node);
	        options = $.extend({}, defaultOptions, options);
	        var $contentBox = $('<div></div>').appendTo($(selfs).empty()).height($(selfs).height());
	        $(node.content).text(selfsText === '' ? options.please : selfsText).appendTo($contentBox).attr('data-node', 'checked');
	        $(node.btn).appendTo($contentBox);
	        var value = null;

	        var $checked,
	            result,
	            html = '<ul data-node="selectList"><li><a href="javascript:;">' + options.please + '</a></li>',
	            $parent = options.parent ? $(options.parent) : this,
	            $selector = options.parent ? this.selector : undefined;

	        for (var i = 0, len = options.data.length; i < len; i++) {
	            value = options.data[i][options.valueName] !== undefined ? options.data[i][options.valueName] : i;
	            html += '<li class="' + (options.data[i].checked === value ? options.checkedCls : '') + '"><a href="javascript:;" data-value="' + value + '" data-index="' + i + '">' + options.data[i][options.textName] + '</a></li>';
	        }
	        html += '</ul>';
	        $(html).appendTo($(selfs));
	        $parent.on('click', $selector, function (e) {
	            e.stopPropagation();
	            $('ul[data-node="selectList"]').hide();
	            if (options.data.length === 0 && $(this).attr('data-refresh') !== 'running') return;
	            if ($(this).hasClass(options.disable)) return;
	            $(this).addClass(options.selectdCls);
	            if ($(this).find('ul li').length !== 0) $(this).find('ul').show();
	        });

	        $parent.on('click', 'ul[data-node="selectList"] a', function (e) {
	            e.stopPropagation();
	            $checked = $(this).parents('ul').parent().find('[data-node="checked"]');
	            if ($checked.text() !== $(this).text()) {
	                result = {
	                    text: $(this).text() !== options.please ? $(this).text() : '',
	                    value: $(this).attr('data-value'),
	                    index: $(this).attr('data-index')
	                };
	                options.checkText && $checked.text($(this).text()); //.attr( 'data-value', $(this).attr('data-value') );
	                if (options.checkedCls !== undefined) {
	                    $(this).parent().addClass(options.checkedCls).siblings().removeClass(options.checkedCls);
	                }
	                options.onChanged.call(this, result);
	            }
	            $(this).parents('ul').hide();
	            return false;
	        });

	        $(document).on('click', function () {
	            selfs.find('ul').hide();
	        });
	        return this;
	    },
	    setList: function setList(options) {
	        $(this).attr('data-refresh', 'running');
	        var selfs = this,
	            value,
	            defaultOptions = {
	            data: [],
	            textName: 'text',
	            checked: '',
	            valueName: 'value',
	            please: '请选择',
	            checkedCls: 'active'
	        };
	        options = $.extend({}, defaultOptions, options);
	        var html = '<li><a href="javascript:;">' + options.please + '</a></li>';
	        if (options.data.length !== 0) {
	            for (var i = 0, len = options.data.length; i < len; i++) {
	                value = options.data[i][options.valueName] !== undefined ? options.data[i][options.valueName] : i;
	                html += '<li class="' + (options.checked === options.data[i][options.textName] ? options.checkedCls : '') + '"><a href="javascript:;" data-value="' + value + '">' + options.data[i][options.textName] + '</a></li>';
	            }
	        }
	        $(selfs).find('[data-node="selectList"]').html(html);
	        return this;
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

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

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Dialog = __webpack_require__(22);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/address/addrItem',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,addressId=$data.addressId,isDefault=$data.isDefault,userName=$data.userName,pcbaStr=$data.pcbaStr,pcba=$data.pcba,address=$data.address,mobile=$data.mobile,$out='';$out+='<tr data-id="';
	$out+=$escape(addressId);
	$out+='" data-dft="';
	$out+=$escape(isDefault);
	$out+='"> <td class="reciever"> <span class="name" data-node="name">';
	$out+=$escape(userName);
	$out+='</span> <span class="default-addr ';
	if(isDefault === 0){
	$out+='set-default-hide';
	}
	$out+='" data-node="dftAddr">默认地址</span> <span class="default-addr set-default-addr set-default-hide" data-action="setDft">设为默认地址</span> </td> <td class="address" data-node="area" data-address="';
	$out+=$escape(pcbaStr);
	$out+='">';
	$out+=$escape(pcba);
	$out+='</td> <td class="detailed-addr" data-node="addr">';
	$out+=$escape(address);
	$out+='</td> <td class="tel" data-node="phone">';
	$out+=$escape(mobile);
	$out+='</td> <td> <a href="#" class="amend-link" data-action="editAddr">修改</a> <span>|</span> <a href="#" class="delete-link" data-action="delAddr">删除</a> </td> </tr>';
	return new String($out);
	});

/***/ }

});