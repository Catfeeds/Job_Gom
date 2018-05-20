webpackJsonp([5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var address = __webpack_require__(95);
	__webpack_require__(99);
	var invoice = __webpack_require__(107);
	var buyersMsg = __webpack_require__(109);
	var submitOrder = __webpack_require__(110);

	// 初始化收货地址
	address.init();
	// 初始化发票选择
	invoice.init();
	// 提交订单
	submitOrder.init();

	// 买家留言
	buyersMsg.init();

	// 发送统计数据用
	var buriedPoint = __webpack_require__(56);
	buriedPoint.setPageData('confirmOrder');

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* 52 */
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
/* 53 */
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
/* 54 */
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
/* 55 */
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
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 日期时间格式化
	 * @author 	Zhengchun Fu
	 * @date 	2016-05-27
	 */

	var dateFormat = function dateFormat(time, template) {
		time = parseInt(time);
		var date = new Date(time);
		var Y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var i = date.getMinutes();
		var s = date.getSeconds();

		function leftPad(n) {
			if (n < 10) {
				return '0' + n;
			}
			return n + '';
		}

		var data = {
			Y: Y,
			y: Y.toString().substr(-2),
			M: leftPad(m),
			m: m,
			D: leftPad(d),
			d: d,
			H: leftPad(h),
			h: h,
			I: leftPad(i),
			i: i,
			S: leftPad(s),
			s: s
		};

		var reg = /([YMDHISymdhis])/g;
		return template.replace(reg, function (match, u1) {
			return data[u1];
		});
	};

	module.exports = dateFormat;

/***/ },
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/*
	 * 弹层提示弹窗
	 * zhaodonghong
	 */

	var $publicMask;
	var $publicTips;
	var timer;

	var events = function events() {

	    $publicMask.off().on('click', function () {
	        $publicMask.hide();
	        $publicTips.hide();
	    });

	    $publicTips.off().on('click', function () {
	        $publicMask.hide();
	        $publicTips.hide();
	    });
	};

	/**
	 * msg string 提示信息
	 * options object 
	 * options.duration settimout消失时间
	 * options.callback 提示消失的回调
	*/
	var init = function init(msg, options) {
	    var defaults = {
	        duration: 2000,
	        callback: function callback() {}
	    };

	    $.extend(defaults, options || {});

	    clearTimeout(timer);
	    $publicMask = $('[data-action="publicMask"]');
	    $publicTips = $('[data-action="publicTips"]');

	    if ($publicMask.length > 0) {

	        $publicMask.show();
	        $publicTips.show().text(msg);
	    } else {

	        $('body').append('<div data-action="publicMask" class="ordi-toast"></div><div class="ordi-toast-txt" data-action="publicTips">' + msg + '</div>');
	        $publicMask = $('[data-action="publicMask"]');
	        $publicTips = $('[data-action="publicTips"]');
	        events();
	    }

	    $publicTips.css('margin', -$publicTips[0].offsetHeight / 2 + 'px 0 0 ' + -$publicTips.width() / 2 + 'px');

	    timer = setTimeout(function () {

	        $publicMask.hide();
	        $publicTips.hide();

	        defaults.callback();
	    }, defaults.duration);
	};

	module.exports = {
	    init: init,
	    events: events
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var Pubsub = __webpack_require__(48);
	var deliveryAddrPop = __webpack_require__(49);
	var confirm = __webpack_require__(55);
	var alert = __webpack_require__(37);
	var toast = __webpack_require__(87).init;
	var tpl = __webpack_require__(96);
	var userCardTips = __webpack_require__(97);

	var $addrList = $('[data-node=addrList]');
	var $addrListBox = $addrList.parent(); // table父容器
	var $add = $('[data-action=addAddr]');
	var $expand = $('[data-action=expand]'); // 展开

	var $conf = $_CONFIG;

	// 刷新当前页面
	var reload = function reload() {
	    location.href = window.location.href;
	};

	// 判断并改变新增地址按钮状态
	var changeAddStatus = function changeAddStatus(num) {
	    if (num >= 20) {
	        $add.addClass('disabled');
	    } else {
	        $add.removeClass('disabled');
	    }
	};

	// 更新收货地址的计数
	var updateAddrNum = function updateAddrNum(num) {
	    var current = $add.data('count');
	    var count = current + num;
	    $add.data('count', count);
	    if (count === 1 && num === 1) {
	        // 新增第一条后,刷新当前页面
	        reload();
	        return;
	    }
	    // 删除全部地址时,刷新页面
	    if (count === 0) {
	        addAddr();
	        return;
	    }

	    changeAddStatus(count);

	    // 如果计数大于5,显示展开
	    if (count > 5) {
	        if ($expand.find('span').text() === '展开') {
	            $expand.show().click();
	        }
	        // $expand.find('span').text('收起');
	        // $expand.find('em').addClass('rotate90');
	        // $expand.show();
	    } else {
	        $expand.hide();
	    }
	};

	// 编辑收获地址
	var editAddr = function editAddr() {
	    var $item = $(this).closest('tr');
	    var isDefault = $item.data('dft') === 1 ? true : false;
	    var name = $item.find('[data-node=name]').text();
	    var phone = $item.find('[data-node=phone]').text();
	    var $pcba = $item.find('[data-addr]');
	    var json = $pcba.data('addr');
	    var id = $item.data('id');
	    var isCross = !!parseInt($_CONFIG.isCross);
	    var idCardStr = json.idCard || '';
	    var hasIdCard = idCardStr.length === 18 ? true : false;

	    deliveryAddrPop({
	        name: name,
	        idCard: json.idCard,
	        hasIdCardVal: hasIdCard,
	        addr: json.address,
	        isDefault: isDefault,
	        isCross: isCross,
	        phone: phone,
	        province: json.provinceName, // 省
	        provinceId: json.provinceId,
	        city: json.cityName, // 市
	        cityId: json.cityId,
	        borough: json.boroughName, // 县
	        boroughId: json.boroughId,
	        area: json.areaName,
	        areaId: json.areaId,
	        addressId: id
	    });
	    return false;
	};

	// 删除收货地址
	var delAddr = function delAddr() {
	    var $item = $(this).closest('tr');
	    confirm('确定删除收货地址吗？', {
	        content: '<p class="pay-pop-p del-pop-p"><em class="iconn-25"></em>您确定要删除收货地址吗</p>',
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
	                    // 删除的是收货地址,刷新页面
	                    if ($item.find('[data-node=curAddr]').hasClass('name-active')) {
	                        $('[data-node=userCardTips]').remove();
	                        reload();
	                        return;
	                    }
	                    $item.remove();
	                    // 更新计数
	                    updateAddrNum(-1);
	                } else {
	                    alert('删除失败');
	                }
	            });
	        }
	    });
	    return false;
	};

	// 新增收获地址
	var addAddr = function addAddr() {
	    var isCross = !!parseInt($_CONFIG.isCross);
	    if ($add.data('count') < 20) {
	        deliveryAddrPop({
	            isCross: isCross
	        }, {
	            title: '新增收货地址'
	        });
	    }
	    return false;
	};

	// 设为默认地址
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
	    return false;
	};

	// 移除默认地址标签
	var rmDefault = function rmDefault($ele) {
	    var $item = $ele || $addrList.find('[data-dft=1]');
	    // 还原属性
	    $item.attr('data-dft', 0);
	    // 设置默认地址标签隐藏
	    $item.find('[data-node=dftAddr]').addClass('hide');
	    $item.find('[data-action=setDft]').css('visibility', 'visible');
	};

	// 移除收货地址高亮
	var rmActive = function rmActive() {
	    // 移除active样式
	    $addrList.find('[data-node=lightName]').removeClass('name-active');
	};

	// 设置默认地址请求成功后
	var onSetDefaultDone = function onSetDefaultDone($current) {
	    // 设置data-dft属性,隐藏之前的默认地址标识,显示设置为默认地址标识
	    rmDefault();
	    // 显示默认地址
	    $current.find('[data-node=dftAddr]').removeClass('hide');
	    // 隐藏设为默认地址标签
	    $current.find('[data-action=setDft]').css('visibility', 'hidden');
	    $current.attr('data-dft', 1);
	    // 更新位置
	    $addrList.find('tr').eq(0).after($current);
	};

	// 展开,收起
	var toggle = function toggle() {
	    var $this = $(this);
	    if ($this.text() === '展开') {
	        $addrListBox.height('auto');
	        $this.find('span').text('收起');
	        $this.find('em').removeClass('iconn-45').addClass('iconn-37');
	    } else {
	        var $tr = $addrList.find('tr');
	        var len = $tr.length;
	        len = len > 5 ? 5 : len;

	        $addrListBox.height($tr.height() * len + 10 + 'px');
	        $this.find('span').text('展开');
	        $this.find('em').removeClass('iconn-37').addClass('iconn-45');
	    }
	    return false;
	};

	var showConfirm = function showConfirm(msg, opts) {
	    opts = opts || {};
	    confirm(msg, {
	        okValue: opts.okValue || '修改配送地址',
	        btnWrapCls: 'insert-cancel',
	        ok: opts.ok || function () {
	            document.body.scrollIntoView();
	        }
	    });
	};

	// 点击设为送货地址,检查当前地址是否可送达,并把地址id传递给server
	var setSelected = function setSelected() {
	    var $item = $(this);
	    var id = $item.data('id');
	    var provinceId = $item.children().eq(1).data('addr').provinceId;
	    // 移除之前的默认样式
	    rmActive();
	    // 添加激活样式
	    $item.find('[data-node=lightName]').addClass('name-active');
	    // 检查地址是否可送达
	    fetch.post(url.get('isAddrOk'), {
	        data: {
	            addressId: id,
	            addressProvinceId: provinceId,
	            skuList: JSON.stringify($_CONFIG['skuList']),
	            fid: $_CONFIG['fid']
	        }
	    }).done(function () {
	        // console.log(data);
	    }).fail(function () {}).always(function () {
	        reload();
	    });
	    return false;
	};

	// 提示完善身份验证信息
	var showConfirmUserCard = function showConfirmUserCard() {
	    var $curAddr = $('[data-node=curAddr]').closest('tr');
	    var $curEdit = $curAddr.find('[data-action=editAddr]');
	    var curAddrInfos = $curAddr.find('[data-node=addrInfos]').data('addr');
	    var offset = null;
	    var tipsHTML = '';

	    if (curAddrInfos && curAddrInfos.idCard === '') {
	        $curEdit.addClass('active');
	        $curEdit.closest('td').addClass('hide-text');
	        offset = $curEdit.offset();
	        tipsHTML = userCardTips({
	            left: offset.left - 200,
	            top: offset.top - 80
	        });
	        $('body').append($(tipsHTML));
	    }
	};

	var init = function init() {
	    var showStatus = !!+$_CONFIG.showStatus;
	    var deliverInfo = $conf.deliverInfo || {}; // 收获地址不可配送
	    var orderList = $conf.orderList || []; // 订单列表
	    // var curAddr = $conf.currentAddress || {}; // 当前收货地址

	    if (showStatus) {
	        toast('因配送地址变化，订单价格有变动，请留意');
	    }

	    if (deliverInfo.code !== 200) {

	        /*// 返回码改成了422
	        if (deliverInfo.code === 422) {
	            showConfirm('请添加收货地址', {
	                okValue: '新建收货地址',
	                ok: function() {
	                    addAddr();
	                }
	            });
	            return false;
	        }*/

	        // 判断商品中是否有库存不足或下架
	        if (deliverInfo.code === 881043) {
	            showConfirm(deliverInfo.message + '，请返回修改', {
	                okValue: '返回修改',
	                ok: function ok() {
	                    // location.href = $conf.order_domain + '/cart/';
	                    window.history.back();
	                }
	            });
	        } else {
	            showConfirm(deliverInfo.message);
	        }
	    } else if (!$addrList.find('tr').length) {
	        // 没有收货地址
	        showConfirm('请添加收货地址', {
	            okValue: '新建收货地址',
	            ok: function ok() {
	                addAddr();
	            }
	        });
	    } else if (!orderList.length) {
	        showConfirm('您购买的商品中包含无货或已下架商品，请返回修改', {
	            okValue: '返回修改',
	            ok: function ok() {
	                window.history.back();
	            }
	        });
	    }

	    // 检测是否有跨境商品
	    if ($_CONFIG.isCross == 1) {
	        showConfirmUserCard();
	    }

	    changeAddStatus($add.data('count'));
	    $add.on('click', addAddr);
	    $addrList.on('click', '[data-action=editAddr]', editAddr);
	    $addrList.on('click', '[data-action=delAddr]', delAddr);
	    $addrList.on('click', '[data-action=setDft]', setDefault);
	    $addrList.on('click', 'tr[data-id]', setSelected); // 设为送货地址
	    $expand.on('click', toggle); // 展开,收起
	    // 更新
	    Pubsub('addr.edit').sub(function (data) {

	        var $item = $addrList.find('[data-id=' + data.addressId + ']');
	        // 如果修改的是收货地址,则刷新当前页面
	        if ($item.find('[data-node=curAddr]').hasClass('name-active')) {
	            reload();
	            return;
	        }

	        var areaName = data.areaName ? data.areaName : '';
	        var pcba = data.provinceName + data.cityName + data.boroughName + areaName + data.address;
	        // 更新收货人
	        var userName = data.userName;
	        $item.find('[data-node=lightName]').text(userName);
	        $item.find('[data-node=name]').text(userName);
	        // 更新所在地址
	        var $addr = $item.find('[data-addr]');
	        $addr.data('addr', data);
	        // 更新详细地址
	        var $area = $item.find('[data-node=area]');
	        $area.text(pcba);
	        // 更新手机/电话
	        $item.find('[data-node=phone]').text(data.mobile);
	        // 更新默认地址状态
	        if (data.isDefault) {
	            onSetDefaultDone($item);
	        } else {
	            // $item.find('[data-action=setDft]').show();
	            // $item.find('[data-action=setDft]').css('visibility', 'visible');
	            rmDefault($item);
	        }
	    });
	    // 新增
	    Pubsub('addr.add').sub(function (data) {

	        var $oldDefault = $('[data-dft=1]');
	        var hasDefault = !!$oldDefault.length;

	        var isDefault = data.isDefault; // 是否默认地址
	        var areaName = data.areaName ? data.areaName : '';
	        var pcba = data.provinceName + data.cityName + data.boroughName + areaName + data.address;
	        var pcbaStr = JSON.stringify(data);
	        data.pcba = pcba;
	        data.pcbaStr = pcbaStr;

	        var position = 'after';

	        var $item = $(tpl(data));
	        if (hasDefault) {
	            if (isDefault) {
	                rmDefault(); // 移除原有的默认地址
	                position = 'before';
	            }
	            $oldDefault.closest('tr')[position]($item);
	        } else {
	            $addrList.find('tr').eq(0)[position]($item);
	        }

	        // 更新计数
	        updateAddrNum(1);
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/confirmOrder/address/item',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,addressId=$data.addressId,isDefault=$data.isDefault,userName=$data.userName,pcbaStr=$data.pcbaStr,pcba=$data.pcba,mobile=$data.mobile,$out='';$out+='<tr data-id="';
	$out+=$escape(addressId);
	$out+='" data-dft="';
	$out+=$escape(isDefault);
	$out+='"> <td width="10%"> <div class="name-box name-no-bor">';
	$out+=$escape(userName);
	$out+='</div> </td> <td width="65%" data-addr="';
	$out+=$escape(pcbaStr);
	$out+='"> <span title="';
	$out+=$escape(userName);
	$out+='" class="consignee-name hide" data-node="name">';
	$out+=$escape(userName);
	$out+='</span> <span title="" class="ship-address" data-node="area">';
	$out+=$escape(pcba);
	$out+='</span> <span class="phone-numb" data-node="phone">';
	$out+=$escape(mobile);
	$out+='</span> </td> <td width="25%" class="text-aglin-r"> <span class="default-address-bj ';
	if(isDefault !== 1){
	$out+='hide';
	}
	$out+='" data-node="dftAddr">默认地址</span> <a href="javascript:;" data-action="delAddr">删除</a> <a href="javascript:;" data-action="editAddr">编辑</a> <a href="javascript:;" data-action="setDft" ';
	if(isDefault === 1){
	$out+='style="visibility:hidden"';
	}
	$out+='>设置为默认地址</a> </td> </tr>';
	return new String($out);
	});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * 提示未完善验证身份信息
	 * @author Zhengchun Fu
	 */
	var tipsTpl = __webpack_require__(98);

	var positionTips = function positionTips(position, isEdit) {
		var tips = $(tipsTpl({
			hasLink: !!isEdit
		}));
		tips.css(position);
		var $wrap = $('<div></div>');
		$wrap.append(tips);
		return $wrap.html();
	};
	module.exports = positionTips;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/module/popup/userCardTips/userCardTips',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,hasLink=$data.hasLink,$out='';if(hasLink){
	$out+=' <div class="order-edit-box" data-node="editUserCardTips"> <div class="order-edit-text clearfix"><em class="iconn-12"></em><span>订单中含有跨境商品，需点击<br/><a href="javascript:;" data-action="editUserCard">编辑</a>完善身份信息！</span></div> <div class="order-edit-san"></div> </div> ';
	}else{
	$out+=' <div class="order-edit-box" data-node="userCardTips"> <div class="order-edit-text clearfix"><em class="iconn-12"></em><span>订单中含有跨境商品，需点击编辑完善身份信息！</span></div> <div class="order-edit-san"></div> </div> ';
	}
	return new String($out);
	});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	/**
	 * 使用优惠券
	 * @author Zhengchun Fu
	 */

	var fenToYuan = __webpack_require__(100);
	var ticketsTpl = __webpack_require__(101);
	var Dialog = __webpack_require__(22);
	var Pubsub = __webpack_require__(48);
	var channel = __webpack_require__(71);
	var findBestTicket = __webpack_require__(102);
	var gomeCoin = __webpack_require__(103);

	// tmod helpers
	__webpack_require__(106)();
	__webpack_require__(105)();

	var couponList = $_CONFIG.couponList;
	if (!couponList.shopList) {
	    couponList.shopList = [];
	}
	if (!couponList.platRedPackList) {
	    couponList.platRedPackList = [];
	}

	// 优惠券排序：时间由近及远，金额由小到大。
	function ticketsSort(list) {
	    list.sort(function (a, b) {
	        if (a.endTime / 1 < b.endTime / 1) {
	            return -1;
	        } else if (a.endTime / 1 == b.endTime / 1) {
	            return a.money / 1 < b.money / 1 ? -1 : 1;
	        } else {
	            return 1;
	        }
	    });
	}

	// 店铺优惠券根据订单列表顺序排序
	(function () {
	    var shopIdArr = [];
	    var orderShopInfoList = $('[data-node=shopInfo]');
	    var newShopList = [];

	    $.each(orderShopInfoList, function (i, v) {
	        shopIdArr.push($(v).data('shopid'));
	    });

	    $.each(shopIdArr, function (i, shopId) {
	        $.each(couponList.shopList, function (k, v) {
	            if (v.shopId == shopId) {
	                newShopList.push(couponList.shopList[k]);
	            }
	        });
	    });

	    couponList.shopList = newShopList;
	})();

	// 平台优惠券排序
	ticketsSort(couponList.platRedPackList);

	// 店铺优惠券排序
	(function () {
	    var shopList = couponList.shopList;
	    for (var i = 0; i < shopList.length; i++) {
	        var redPackList = shopList[i].redPackList;
	        ticketsSort(redPackList);
	    }
	})();

	// 判断是否有可用的优惠券
	var noTickets = true;
	if (couponList.shopList.length || couponList.platRedPackList && couponList.platRedPackList.length) {
	    noTickets = false;
	}

	/*--------------------页面加载后初始化各种价格--------------------*/
	// 此时单位为 分
	var shippingPrice = parseFloat($('[data-node=shippingPrice]').data('shippingprice'));
	var goodsTotalPrice = parseFloat($('[data-node=goodsTotalPrice]').data('goodstotalprice'));

	shippingPrice = isNaN(shippingPrice) ? 0 : shippingPrice;
	goodsTotalPrice = isNaN(goodsTotalPrice) ? 0 : goodsTotalPrice;

	var platFirst = {},
	    shopFirst = {},
	    defaultFirst = [],
	    submitCoupons = [],
	    // 要提交的优惠券列表
	shopCouponList = [],
	    // 要提交的店铺优惠券列表
	platMaxMoney = 0,
	    shopMaxMoneySum = 0,
	    defaultDiscount = 0,
	    // 初始化默认抵扣的金额
	gomeCoinDiscount = 0; // 国美币抵扣金额

	// 平台券最大金额
	if (couponList.platRedPackList && couponList.platRedPackList.length) {
	    platFirst = findBestTicket(couponList.platRedPackList, 'id');
	    platMaxMoney = platFirst.money / 1;
	}

	// 店铺券最大金额总和
	var shopList = couponList.shopList;
	$.each(shopList, function (i, v) {
	    if (v.redPackList.length) {
	        shopFirst = findBestTicket(v.redPackList, 'id');
	        shopMaxMoneySum += shopFirst.money / 1;
	        shopCouponList.push(shopFirst);
	    }
	});

	// 设置弹窗默认显示
	if (platMaxMoney > shopMaxMoneySum) {
	    if (couponList.platRedPackList && couponList.platRedPackList.length) {
	        couponList.platRedPackList[platFirst._index_].isFirst = true;
	        defaultFirst.push('p-' + platFirst._index_);
	    }
	    couponList.platShow = true;
	    couponList.shopShow = false;
	    defaultDiscount = platMaxMoney;
	    submitCoupons.push(platFirst);
	} else {
	    $.each(shopList, function (i, v) {
	        if (v.redPackList.length) {
	            shopFirst = findBestTicket(v.redPackList, 'id');
	            shopFirst.shopId = v.shopId;
	            v.redPackList[shopFirst._index_].isFirst = true;
	            defaultFirst.push('s-' + i + '-' + shopFirst._index_);
	            submitCoupons.push(shopFirst);
	        }
	    });
	    couponList.platShow = false;
	    couponList.shopShow = true;
	    defaultDiscount = shopMaxMoneySum;
	}

	// 要提交的优惠券列表
	function setSubmitCouponsData(data) {
	    $('[data-action=useTickets]').data('coupons', data);
	}

	setSubmitCouponsData(submitCoupons);

	// 设置默认折扣价格
	var orderDiscountPrice = goodsTotalPrice - defaultDiscount;

	// 调用国美币的方法
	// 国美币可抵扣金额
	gomeCoinDiscount = gomeCoin.initUseCoin(orderDiscountPrice);
	gomeCoin.bindEvents();

	/*------------------接收广播--------------------*/

	// 设置优惠券折扣金额展示
	Pubsub(channel.confirmOrder.changeUseTickets).sub(function (data) {
	    var $ticketsDiscountName = $('[data-node=ticketsDiscountName]');
	    var $ticketsDiscount = $('[data-node=ticketsDiscount]');
	    var price = data.ticketsDiscount;
	    if (price > 0) {
	        $ticketsDiscountName.text('已抵扣：');
	        $ticketsDiscount.html('￥' + fenToYuan(price));
	        return;
	    }
	    if (noTickets) {
	        $ticketsDiscountName.text('无可用优惠券');
	        $ticketsDiscount.html('');
	    } else {
	        $ticketsDiscountName.text('最高可抵用：');
	        $ticketsDiscount.html('￥' + fenToYuan(defaultDiscount));
	    }
	});

	// 设置最终结算价格展示
	Pubsub(channel.confirmOrder.setFinalPrice).sub(function (data) {
	    var price = data.ticketsDiscount || 0;
	    var gomeCoinDiscount = data.gomeCoinDiscount || 0;
	    var finalPrice = shippingPrice + goodsTotalPrice - price - gomeCoinDiscount;

	    // 使用优惠券
	    $('[data-node=useTicketsPrice]').text('￥' + fenToYuan(price));

	    // 设置国美币使用的金额
	    $('[data-node=useGomeCoinPrice]').text('￥' + fenToYuan(gomeCoinDiscount));

	    // 总的应付金额
	    $('[data-node=finalPrice]').text(fenToYuan(finalPrice));
	});

	/*-------------初始化优惠信息-----------------*/

	// 抛出初始化后的优惠信息
	Pubsub(channel.confirmOrder.changeUseTickets).pub({

	    // 优惠券已抵扣的金额
	    ticketsDiscount: defaultDiscount,

	    // 订单折扣后的金额：商品总价-优惠券抵扣的金额
	    orderDiscountPrice: orderDiscountPrice,

	    // 国美币已抵扣的金额
	    gomeCoinDiscount: gomeCoinDiscount
	});

	Pubsub(channel.confirmOrder.setGomeCoin).pub({

	    // 优惠券已抵扣的金额
	    ticketsDiscount: defaultDiscount,

	    // 订单折扣后的金额：商品总价-优惠券抵扣的金额
	    orderDiscountPrice: orderDiscountPrice,

	    // 国美币已抵扣的金额
	    gomeCoinDiscount: gomeCoinDiscount
	});

	// 初始化后抛出金额设置最终价。
	Pubsub(channel.confirmOrder.setFinalPrice).pub({

	    // 优惠券已抵扣的金额
	    ticketsDiscount: defaultDiscount,

	    // 订单折扣后的金额：商品总价-优惠券抵扣的金额
	    orderDiscountPrice: orderDiscountPrice,

	    // 国美币已抵扣的金额
	    gomeCoinDiscount: gomeCoinDiscount
	});

	/*-------------滑腻的分割线--下面是需要点击操作的----------------*/

	var ticketsShow = function ticketsShow(data, okfn) {
	    data = data || {};
	    okfn = okfn || function () {};

	    var defaults = {
	        modal: true,
	        fixed: true,
	        content: ticketsTpl(data),
	        className: 'pop-box',
	        okValue: '确定',
	        okCls: 'pc-btn coupon-btn',
	        ok: okfn
	    };
	    return Dialog(defaults).show();
	};

	// 保存使用优惠券
	var saveTickets = function saveTickets() {
	    var list = $('[data-action=ticketRadio].menu-radio-checked');
	    var price = 0; // 优惠券抵扣金额
	    var firstList = [];
	    var newSubmitCoupons = [];
	    $.each(list, function (i, e) {
	        price += $(e).data('discount') / 1;
	        firstList.push($(e).data('index'));
	        newSubmitCoupons.push($(e).data('info'));
	    });

	    // 订单折扣后的金额 = 商品总价 - 优惠券抵扣金额
	    orderDiscountPrice = goodsTotalPrice - price;

	    // 设置下次默认显示的选项
	    var whichshow = firstList.length ? firstList[0].charAt(0) : 'p';
	    switch (whichshow) {
	        case 's':
	            couponList.platShow = false;
	            couponList.shopShow = true;
	            break;
	        default:
	            couponList.platShow = true;
	            couponList.shopShow = false;
	    }

	    // 更新维护数组对象
	    // 直接取消初始最优isFirst
	    $.each(defaultFirst, function (i, o) {

	        // s-0-0, s-1-1  / p-1
	        var listArr = o.split('-');
	        if (listArr[0] == 'p') {

	            // 设置平台的选中项
	            couponList.platRedPackList[listArr[1]].isFirst = false;
	        } else {

	            // 设置店铺的选中项
	            couponList.shopList[listArr[1]].redPackList[listArr[2]].isFirst = false;
	        }
	    });

	    // 根据列表数据设置isFirst
	    $.each(firstList, function (i, o) {

	        // s-0-0, s-1-1  / p-1
	        var listArr = o.split('-');
	        if (listArr[0] == 'p') {

	            // 设置平台的选中项
	            var platNewFirst = couponList.platRedPackList[listArr[1]];
	            platNewFirst.isFirst = true;
	        } else {

	            // 设置店铺的选中项
	            var shopNewFirst = couponList.shopList[listArr[1]].redPackList[listArr[2]];
	            shopNewFirst.isFirst = true;
	            shopNewFirst.shopId = couponList.shopList[listArr[1]].shopId;
	        }
	    });

	    Pubsub(channel.confirmOrder.changeUseTickets).pub({

	        // 优惠券抵扣金额
	        ticketsDiscount: price,

	        // 订单折扣后的金额
	        orderDiscountPrice: orderDiscountPrice,

	        // 国美币可使用的金额
	        gomeCoinDiscount: gomeCoinDiscount
	    });

	    Pubsub(channel.confirmOrder.setGomeCoin).pub({

	        // 优惠券抵扣金额
	        ticketsDiscount: price,

	        // 订单折扣后的金额
	        orderDiscountPrice: orderDiscountPrice,

	        // 国美币可使用的金额
	        gomeCoinDiscount: gomeCoinDiscount
	    });

	    // 要提交的优惠券列表
	    setSubmitCouponsData(newSubmitCoupons);

	    // 把上一次的选择作为初始值
	    defaultFirst = firstList.splice(0);
	};

	// 显示优惠券弹窗
	$('[data-action=useTickets]').on('click', function () {

	    // 显示优惠券
	    ticketsShow(couponList, saveTickets);

	    $('[data-node=ticketsMenu]').on('click', 'a', function (e) {
	        var hasEm = $(this).children('em').length;
	        var index = $(this).index();
	        e.preventDefault();
	        $(this).addClass('active').siblings('a').removeClass('active');

	        if (!hasEm) {
	            $(this).append('<em class="up-arrow"></em>').siblings('a').children('em').remove();
	        }

	        $('[data-node=ticketsList] > div').eq(index).show().siblings().hide();
	    });
	});

	// 选择使用券
	$('body').on('click', '[data-action="ticketRadio"]', function () {
	    var checkedCls = 'menu-radio-checked';
	    var ticketRadioNode = '[data-action=ticketRadio]';
	    var $this = $(this);

	    if ($this.hasClass(checkedCls)) {
	        $this.removeClass(checkedCls);
	    } else {
	        $this.addClass(checkedCls).parent().parent().siblings().find(ticketRadioNode).removeClass(checkedCls);
	        $this.parents('[data-node=ticketsBox]').siblings('div').find(ticketRadioNode).removeClass(checkedCls);
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 分转化成元
	 * @param  {[Number]} val 要转换的值
	 * @return {[String]}     转换成元后精确到两位小数的字符串
	 */
	function fenToYuan(val) {
	  var newVal = (val / 100).toFixed(2);
	  newVal = newVal == '0.00' ? '0' : newVal;
	  return newVal;
	}

	module.exports = fenToYuan;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/confirmOrder/coupon/useTickets',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,platShow=$data.platShow,shopShow=$data.shopShow,platRedPackList=$data.platRedPackList,$each=$utils.$each,pp=$data.pp,i=$data.i,$escape=$utils.$escape,shopList=$data.shopList,sp=$data.sp,sprl=$data.sprl,j=$data.j,$out='';$out+='  <table class="ui-dialog-grid"> <tbody> <tr> <td class="ui-dialog-header"> <button i="close" title="取消" href="javascript:;" class="icon icon-close">&times;</button> <div data-node="ticketsMenu" class="ui-dialog-title coupon-title"> <a href="javascript:;" ';
	if(platShow){
	$out+='class="active"';
	}
	$out+='>平台优惠券';
	if(platShow){
	$out+='<em class="up-arrow"></em>';
	}
	$out+='</a> <a href="javascript:;" ';
	if(shopShow){
	$out+='class="active"';
	}
	$out+='>店铺优惠券';
	if(shopShow){
	$out+='<em class="up-arrow"></em>';
	}
	$out+='</a> </div> </td> </tr> <tr> <td data-node="ticketsList" class="ui-dialog-body">  <div data-node="ticketsBox" class="coupon-box" style="';
	if(shopShow){
	$out+='display: none;';
	}
	$out+='"> ';
	if(platRedPackList.length){
	$out+=' ';
	$each(platRedPackList,function(pp,i){
	$out+=' <div class="clearfix"> <label><span data-action="ticketRadio" data-index="p-';
	$out+=$escape(i);
	$out+='" data-discount="';
	$out+=$escape(pp.money);
	$out+='" data-ticketid="';
	$out+=$escape(pp.id);
	$out+='" data-info=\'{"id":';
	$out+=$escape(pp.id);
	$out+=',"planId":';
	$out+=$escape(pp.planId);
	$out+=',"couponPlat":0}\' class="menu-radio ';
	if(pp.isFirst){
	$out+='menu-radio-checked';
	}
	$out+='"></span>满';
	$out+=$escape($helpers. f2Y(pp.baseMoney ));
	$out+='减';
	$out+=$escape($helpers. f2Y(pp.money ));
	$out+='</label><span class="time">';
	$out+=$escape($helpers. dateFormat(pp.startTime , 'Y.M.D'));
	$out+='-';
	$out+=$escape($helpers. dateFormat(pp.endTime , 'Y.M.D'));
	$out+='</span> </div> ';
	});
	$out+=' ';
	}else{
	$out+=' <div class="clearfix"> 没有可用平台优惠券 </div> ';
	}
	$out+=' </div>  <div data-node="ticketsBox" class="coupon-box" style="';
	if(platShow){
	$out+='display: none;';
	}
	$out+='"> ';
	if(shopList.length){
	$out+=' ';
	$each(shopList,function(sp,i){
	$out+=' <div> <div class="shop"><em class="iconn-64"></em>';
	$out+=$escape(sp.shopName);
	$out+='</div> ';
	if(sp.redPackList.length){
	$out+=' ';
	$each(sp.redPackList,function(sprl,j){
	$out+=' <div class="clearfix"> <label><span data-action="ticketRadio" data-index="s-';
	$out+=$escape(i);
	$out+='-';
	$out+=$escape(j);
	$out+='" data-discount="';
	$out+=$escape(sprl.money);
	$out+='" data-shopid="';
	$out+=$escape(sp.providerId);
	$out+='" data-ticketid="';
	$out+=$escape(sprl.id);
	$out+='" data-info=\'{"id":';
	$out+=$escape(sprl.id);
	$out+=',"planId":';
	$out+=$escape(sprl.planId);
	$out+=',"couponPlat":0}\' class="menu-radio ';
	if(sprl.isFirst){
	$out+='menu-radio-checked';
	}
	$out+='"></span>满';
	$out+=$escape($helpers. f2Y(sprl.baseMoney ));
	$out+='减';
	$out+=$escape($helpers. f2Y(sprl.money ));
	$out+='</label><span class="time">';
	$out+=$escape($helpers. dateFormat(sprl.startTime , 'Y.M.D'));
	$out+='-';
	$out+=$escape($helpers. dateFormat(sprl.endTime , 'Y.M.D'));
	$out+='</span> </div> ';
	});
	$out+=' ';
	}
	$out+=' </div> ';
	});
	$out+=' ';
	}else{
	$out+=' <div class="clearfix"> 没有可用店铺优惠券 </div> ';
	}
	$out+=' </div> </td> </tr> </tbody> </table>';
	return new String($out);
	});

/***/ },
/* 102 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 查找最好的优惠券
	 * @param  {[Object]} data   要用于查找的对象数组
	 * @param  {[type]} unique 对象的唯一键 优惠券ID键名
	 * @return {[type]}        返回最好的优惠券对象
	 */
	var findBestTicket = function findBestTicket(data, unique) {
		var len = data.length;
		/*var best = data[0];
	 best._index_ = 0;
	 if (len > 1) {
	 	for (var i = 1; i < len; i++) {
	 		var next = data[i];
	 		best = compareMethod(best, next);
	 		if (best[unique] === next[unique]) {
	 			best._index_ = i;
	 		}
	 	}
	 }*/
		var best = data[len - 1];
		best._index_ = len - 1;
		if (len > 1) {
			for (var i = len - 2; i >= 0; i--) {
				var next = data[i];
				best = compareMethod(best, next);
				if (best[unique] === next[unique]) {
					best._index_ = i;
				}
			}
		}
		return best;

		function compareMethod(obj1, obj2) {
			var money1 = parseFloat(obj1.money);
			var money2 = parseFloat(obj2.money);
			var endDate1 = obj1.endTime;
			var endDate2 = obj2.endTime;

			if (money1 === money2) {
				if (endDate1 >= endDate2) {
					return obj2;
				} else {
					return obj1;
				}
			} else {
				if (money1 > money2) {
					return obj1;
				} else {
					return obj2;
				}
			}
		}
	};

	module.exports = findBestTicket;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($_CONFIG, $) {'use strict';

	/**
	 * @author Zhengchun Fu
	 * 确认订单页--优惠券--使用国美币
	 */
	var gomeCoinTpl = __webpack_require__(104);
	var Dialog = __webpack_require__(22);
	var Pubsub = __webpack_require__(48);
	var channel = __webpack_require__(71);
	var f2Y = __webpack_require__(100); // 分转成元

	// tmod helpers
	__webpack_require__(105)();

	var gomeCoin = $_CONFIG.gomeCoin;
	var total = parseFloat(gomeCoin.totalRebate);
	var useable = parseFloat(gomeCoin.useableRebate);

	var canUseCoinPrice = useable >= total ? total : useable;

	var useGomeCoin = {
	    canUse: 0,
	    checked: false,
	    bindTips: function bindTips(price) {

	        function setTips(str) {
	            $('[data-node=useGomeCoin]').html(str);
	        }

	        var basePrice = price - 100;
	        var tips = '';
	        var status = this.checked ? '已抵扣' : '当前可用';

	        basePrice = basePrice >= canUseCoinPrice ? canUseCoinPrice : basePrice;

	        if (basePrice <= 0) {
	            this.canUse = 0;
	            tips = '无可用国美币';
	        } else {
	            this.canUse = basePrice;
	            tips = status + '：<span class="looked-up">￥' + f2Y(basePrice) + '</span>';
	        }
	        setTips(tips);
	    },
	    initUseCoin: function initUseCoin(orderDiscountPrice) {
	        this.bindTips(orderDiscountPrice);
	        return 0;
	    },
	    showPop: function showPop(data, okfn) {
	        data = data || {};
	        okfn = okfn || function () {};

	        var defaults = {
	            modal: true,
	            fixed: true,
	            content: gomeCoinTpl(data),
	            className: 'pop-box',
	            okValue: '确定',
	            okCls: 'pc-btn coupon-btn',
	            ok: okfn
	        };
	        return Dialog(defaults).show();
	    },
	    bindEvents: function bindEvents() {
	        var _this = this;
	        var usePrice = 0;
	        var ticketsDiscount,
	            orderDiscountPrice,
	            gomeCoinDiscount = 0;

	        var saveGomeCoinData = function saveGomeCoinData(coins) {
	            $('[data-action=useGomeCoin]').data('gomeCoins', coins);
	        };

	        Pubsub(channel.confirmOrder.setGomeCoin).sub(function (data) {

	            // 抵扣的优惠券
	            ticketsDiscount = data.ticketsDiscount;

	            // 订单折扣后的价格：商品总价-抵扣的优惠券价格
	            orderDiscountPrice = data.orderDiscountPrice;

	            // 国美币抵扣价格
	            // gomeCoinDiscount = parseFloat(data.gomeCoinDiscount);
	            _this.bindTips(orderDiscountPrice);

	            gomeCoinDiscount = _this.canUse;
	            reUseGomeCoin();
	        });

	        // 修改优惠券使用后重新判断国美币的使用
	        var reUseGomeCoin = function reUseGomeCoin() {
	            if (_this.checked) {
	                usePrice = gomeCoinDiscount;
	            } else {
	                usePrice = 0;
	            }
	            saveGomeCoinData(usePrice);

	            Pubsub(channel.confirmOrder.setFinalPrice).pub({
	                // 优惠券抵扣金额
	                ticketsDiscount: ticketsDiscount,
	                // 订单折扣后的金额：商品总价-优惠券抵扣的金额
	                orderDiscountPrice: orderDiscountPrice,
	                // 国美币已抵扣的金额
	                gomeCoinDiscount: usePrice
	            });

	            // 更新国美币使用信息
	            Pubsub(channel.confirmOrder.gomeMoney).pub({
	                gomeMoney: usePrice
	            });
	        };

	        // 保存国美币使用情况
	        var saveGomeCoin = function saveGomeCoin() {
	            if ($('[data-action=gomeCoinRadio]').hasClass('menu-radio-checked')) {
	                usePrice = $('[data-action=gomeCoinRadio]').data('coin') / 1;
	                saveGomeCoinData(usePrice);
	                _this.checked = true;
	            } else {
	                usePrice = 0;
	                _this.checked = false;

	                saveGomeCoinData(0);
	            }

	            _this.bindTips(orderDiscountPrice);
	            Pubsub(channel.confirmOrder.setFinalPrice).pub({
	                // 优惠券抵扣金额
	                ticketsDiscount: ticketsDiscount,
	                // 订单折扣后的金额：商品总价-优惠券抵扣的金额
	                orderDiscountPrice: orderDiscountPrice,
	                // 国美币已抵扣的金额
	                gomeCoinDiscount: usePrice
	            });
	        };

	        // 弹窗显示
	        $('[data-action=useGomeCoin]').on('click', function () {
	            if (_this.canUse <= 0) {
	                return false;
	            }
	            var data = {
	                checked: _this.checked,
	                coinVal: _this.canUse
	            };
	            _this.showPop(data, saveGomeCoin);
	        });
	        // 选择是否使用国美币
	        $('body').on('click', '[data-action=gomeCoinRadio]', function () {
	            $(this).toggleClass('menu-radio-checked');
	        });
	    }
	};

	module.exports = useGomeCoin;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/confirmOrder/gomeCoin/gomeCoin',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,checked=$data.checked,$escape=$utils.$escape,coinVal=$data.coinVal,$out='';$out+='<table class="ui-dialog-grid"> <tbody> <tr> <td class="ui-dialog-header"> <button i="close" title="取消" href="javascript:;" class="icon icon-close">×</button> <div class="ui-dialog-title">国美币</div> </td> </tr> <tr> <td class="ui-dialog-body"> <div class="gome-coin-box clearfix"> <span class="menu-radio ';
	if(checked){
	$out+='menu-radio-checked';
	}
	$out+='" data-coin="';
	$out+=$escape(coinVal);
	$out+='" data-action="gomeCoinRadio"></span> <p>使用国美币（当前可用：￥<span class="coinVal">';
	$out+=$escape($helpers. f2Y(coinVal ));
	$out+='</span>）</p> </div> </td> </tr> </tbody> </table>';
	return new String($out);
	});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * f2Y  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var fenToYuan = __webpack_require__(100);

	module.exports = function () {
	  tmod.helper('f2Y', fenToYuan);
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * dateFormat  - tmod helpers
	 * @author Zhengchun Fu
	 */
	var tmod = __webpack_require__(26);
	var dateFormat = __webpack_require__(69);

	module.exports = function () {
	  tmod.helper('dateFormat', dateFormat);
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var confirm = __webpack_require__(55);
	var invoiceTpl = __webpack_require__(108);
	__webpack_require__(54);

	var hideCls = 'hide';
	var checkedCls = 'menu-radio-checked';
	var invoiceInfoNode = '[data-node=invoiceInfo]';

	var $invoice = $('[data-node=invoice]');

	var hasEA = !!+$_CONFIG.show_eceipt;

	// 显示弹窗
	var invoicePop = function invoicePop(content) {
	    confirm('', {
	        fixed: true,
	        modal: true,
	        title: '修改发票',
	        content: content,
	        className: 'pop-box pop-pad-btm65',
	        okCls: 'pc-btn pc-btnh40 pc-btnw120',
	        cancelCls: 'queren-btn pc-btnh40 pc-btnw120',
	        ok: saveInvoice,
	        okValue: '确认修改',
	        btnWrapCls: 'two-buttons'
	    });
	};

	// 保存发票信息
	var saveInvoice = function saveInvoice() {
	    // var $invoice = $('[data-node=invoice]');
	    var $type = $invoice.find('[data-node=invoiceType]');
	    var $title = $invoice.find('[data-node=invoiceTitle]');
	    var $details = $invoice.find('[data-node=invoiceDetail]');
	    var $titleParent = $title.parent();
	    var $detailsParent = $details.parent();

	    var $info = $(invoiceInfoNode);
	    var type = $info.data('type');
	    var name = $.trim($info.val());
	    var typeName = ['不开发票', '普通发票'];
	    var detailsStr = '明细';

	    // 如果为不开发票
	    if (!type) {
	        $invoice.data('t', type);
	        $invoice.data('n', '');
	        $type.text(typeName[0]);
	        $titleParent.addClass(hideCls);
	        $detailsParent.addClass(hideCls);
	        return true;
	    }

	    // 开发票，判断抬头内容
	    if (name === '') {
	        $info.addClass('input-error').parent().addClass('show-error');
	        return false;
	    }

	    $invoice.data('t', type);
	    $invoice.data('n', name);
	    $type.text(typeName[1]);
	    $title.text(name);
	    $details.text(detailsStr);

	    $titleParent.removeClass(hideCls);
	    $detailsParent.removeClass(hideCls);
	};

	// 绑定弹窗内部事件
	var bindEvent = function bindEvent() {
	    var $noInvoice = $('[data-node=noInvoice]');
	    var $openInvoice = $('[data-node=openInvoice]');
	    var $openInvoiceBox = $('[data-node=openInvoiceBox]');
	    var $clear = $('[data-action=clear]');
	    var $info = $(invoiceInfoNode);

	    // 不开发票
	    $noInvoice.on('click', function () {
	        if (hasEA) {
	            return false;
	        }
	        $(this).find('span').addClass(checkedCls);
	        $openInvoice.find('span').removeClass(checkedCls);
	        $openInvoiceBox.addClass(hideCls);
	        $info.data('type', 0);
	    });

	    // 普通发票
	    $openInvoice.on('click', function () {
	        var type;
	        $(this).find('span').addClass(checkedCls);
	        $noInvoice.find('span').removeClass(checkedCls);
	        $openInvoiceBox.removeClass(hideCls);
	        type = $openInvoiceBox.find('label > .menu-radio-checked').parent('label').data('type');
	        $info.data('type', type);
	    });

	    // 选择个人或单位
	    $openInvoiceBox.on('click', 'label', function () {
	        $(this).find('span').addClass(checkedCls).end().parent().siblings().find('span').removeClass(checkedCls);
	        $info.data('type', $(this).data('type'));
	    });

	    // 填写发票抬头
	    $info.on('textchange', function () {
	        var r = /[!@#$%^&*+~,.?:;"'！；：、，…。？￥]/g;
	        var val = $.trim(this.value);
	        var len = val.length;

	        if (r.test(val)) {
	            val = val.replace(r, function () {
	                return '';
	            });
	            this.value = val;
	        }

	        if (len > 50) {
	            val = val.substring(0, 50);
	            this.value = val;
	        }

	        if (len > 0) {
	            $clear.show();
	        } else {
	            $clear.hide();
	        }
	    });

	    // 清空text内容
	    $clear.on('click', function () {
	        $clear.hide();
	        $info.val('').focus();
	    });

	    $info.on('focus', function () {
	        var thisVal = $.trim($(this).val());
	        $(this).removeClass('input-error').parent().removeClass('show-error');
	        if (thisVal !== '') {
	            $clear.show();
	        }
	    });
	};

	var init = function init() {
	    // var $invoice = $('[data-node=invoice]');
	    var $update = $invoice.find('[data-action=updateInvoice]');

	    $update.on('click', function () {
	        var t = $invoice.data('t'); // 0,不开发票, 1 个人, 2 公司
	        var invoiceTitle = $invoice.data('n');
	        if (hasEA) {
	            if ($.trim(invoiceTitle) === '') {
	                invoiceTitle = '个人';
	            }
	        }
	        var content = invoiceTpl({
	            type: t,
	            title: invoiceTitle,
	            hasEA: hasEA
	        });

	        invoicePop(content);
	        bindEvent();
	        return false;
	    });
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(26);
	module.exports=template('src/js/page/confirmOrder/invoice/invoice',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,type=$data.type,$escape=$utils.$escape,title=$data.title,$out='';$out+='<div class="ui-body-box"> <div class="invoice-box"> <h3 class="radio-title">发票类型：</h3> <div class="invoice-flot-lft"> <label data-node="noInvoice" data-type="0" ';
	if(type>0){
	$out+='class="gm-gray"';
	}
	$out+='><span class="menu-radio ';
	if(type==0){
	$out+='menu-radio-checked';
	}
	$out+='"></span>不开票</label> </div> <div class="invoice-flot-lft"> <label data-node="openInvoice"><span class="menu-radio ';
	if(type>0){
	$out+='menu-radio-checked';
	}
	$out+='"></span>普通发票</label> </div> </div> <div data-node="openInvoiceBox" class="';
	if(type==0){
	$out+='hide';
	}
	$out+='"> <div class="invoice-box"> <h3 class="radio-title">发票抬头：</h3> <div class="invoice-flot-lft"> <label data-type="1"><span class="menu-radio ';
	if(type<2){
	$out+='menu-radio-checked';
	}
	$out+='"></span>个人</label> </div> <div class="invoice-flot-lft"> <label data-type="2"><span class="menu-radio ';
	if(type==2){
	$out+='menu-radio-checked';
	}
	$out+='"></span>单位</label> </div> </div> <div class="please-enter"><em data-action="clear" class="iconn-7"></em> <input data-node="invoiceInfo" data-type="';
	$out+=$escape(type);
	$out+='" type="text" value="';
	$out+=$escape(title);
	$out+='" placeholder="请输入发票抬头" class="input-error"> <p class="error"><em class="iconn-25"></em>请输入发票抬头信息</p> </div> <p class="invoice-content">发票内容：由供应商自行确定发票内容</p> </div> </div>';
	return new String($out);
	});

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	/**
	 * 买家留言
	 * @author Zhengchun Fu
	 */
	__webpack_require__(54);

	function checkBuyerMsg() {
	    var maxLen = 30;
	    var $buyerMsg = $('[data-node=buyerMsg]');
	    $buyerMsg.on('textchange', function () {
	        var $this = $(this);
	        var msg = $.trim($this.val());
	        var len = msg.length;
	        if (len > maxLen) {
	            $this.val(msg.substr(0, maxLen));
	        }
	    });
	}

	module.exports = {
	    init: checkBuyerMsg
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, $_CONFIG) {'use strict';

	var fetch = __webpack_require__(2);
	var url = __webpack_require__(28);
	var confirm = __webpack_require__(55);

	var userCardTips = __webpack_require__(97);

	var $submitOrder = $('[data-action=submitOrder]');

	/* "invoice":{                // Object，开发票，如下信息必须填写。
	     "type":1,                // Integer，发票类型1：普通发票  
	     "titleType":1,           // Integer，1：个人，2：单位
	     "title":"*公司",         // String，发票内容
	     "content":"键盘"         // String，发票明细
	 }*/

	var $conf = $_CONFIG;

	// 设置发票信息
	var getInvoiceData = function getInvoiceData() {
	    var $invoice = $('[data-node=invoice]');
	    var type = $invoice.data('t');
	    var title = $invoice.data('n');
	    if (type > 0) {
	        return {
	            hasInvoice: 1,
	            invoice: {
	                type: 1,
	                titleType: type,
	                title: title,
	                content: "明细"
	            }
	        };
	    }
	    return {
	        hasInvoice: 0,
	        invoice: {}
	    };
	};

	var getOrderData = function getOrderData() {
	    function makeData(list) {
	        var newList = [];
	        $.each(list, function (i, v) {
	            var data = {
	                "id": v.id,
	                "planId": v.planId,
	                "couponPlat": 0
	            };
	            newList.push(data);
	        });
	        return newList;
	    }
	    var productInfo = $conf.orderList;
	    var couponsList = $('[data-action=useTickets]').data('coupons');
	    var gomeMoneyVal = $('[data-action=useGomeCoin]').data('gomeCoins') || 0;
	    var buyerMsg = $('[data-node=buyerMsg]').val();
	    var invoiceData = getInvoiceData();
	    couponsList = makeData(couponsList);

	    return {
	        "addressId": $conf.currentAddress.id, // 收货地址ID
	        "payType": 4, // Integer,必填，默认为4，v2版本目前只能为4
	        "delivery": { // Object,必填，发货信息
	            "receivingTimeType": 1, // Integer，必填，送货时间类型,1:工作日，2：周末，3：全部
	            "needConfirmation": true, // Boolean,必填，默认false，送货前是否确认
	            "memo": buyerMsg // String，必填，送货备注
	        },
	        "hasInvoice": invoiceData.hasInvoice, // 是否开发票
	        "invoice": invoiceData.invoice, // 发票信息
	        "coupons": couponsList, // 优惠券使用列表
	        "gomeMoney": gomeMoneyVal, // 使用的国美币
	        "orders": productInfo, // 商品信息
	        "accoss": $_CONFIG.isCross // 跨境商品
	    };
	};

	var checkUserCardTips = function checkUserCardTips() {
	    var offset = $submitOrder.offset();
	    var tipsHTML = userCardTips({
	        left: offset.left - 120,
	        top: offset.top - 80
	    }, true);
	    var $tips = $(tipsHTML);
	    $('body').append($tips);

	    setTimeout(function () {
	        $tips.remove();
	    }, 6000);

	    $tips.on('click', 'a', function () {
	        $tips.remove();
	        $('body, html').scrollTop(0);
	        $('[data-node=curAddr]').parents('tr').find('[data-action=editAddr]').click();
	    });
	};

	var firing = false;
	// 提交订单
	var submit = function submit() {

	    if (firing) {
	        return;
	    }
	    firing = true;
	    $submitOrder.addClass('btn-default');

	    var orderData = getOrderData(); // 获取订单数据
	    // console.log(JSON.stringify(orderData));
	    // return false;
	    var fid = $conf.fid;
	    fetch.post(url.get('submitOrder') + '?fid=' + fid, {
	        data: {
	            proJson: JSON.stringify(orderData)
	        }
	    }).done(function (data) {
	        if (data && data.success === true) {
	            // 提交成功,进入支付页面
	            // return false;
	            location.href = $_CONFIG.order_domain + 'order/paydetail?fid=' + fid;
	        } else {
	            // var msg = data.msg;
	            var msg = data.message;
	            var code = data.code;
	            var regNoAddr = /\[881064\]/;
	            var regNoGoods = /\[881043\]/;
	            var newMsg = msg.substring(0, msg.indexOf('错误码[') - 1);

	            // 跨境商品信息核对
	            if (code == '100030') {
	                checkUserCardTips();
	                return false;
	            }

	            if (code == '881011') {
	                location.href = $_CONFIG.passport_domain + '/login/index';
	                return false;
	            }
	            if (regNoAddr.test(msg)) {
	                confirm(newMsg, {
	                    autofocus: false,
	                    okValue: '修改配送地址',
	                    ok: function ok() {
	                        $(document).scrollTop(0);
	                        firing = false;
	                        $submitOrder.removeClass('btn-default');
	                    },
	                    okCls: 'red',
	                    cancelValue: '取消'
	                });
	                return false;
	            }

	            if (regNoGoods.test(msg)) {
	                confirm(newMsg, {
	                    autofocus: false,
	                    okValue: '返回修改',
	                    ok: function ok() {
	                        window.history.back();
	                    },
	                    okCls: 'red',
	                    cancelValue: '取消'
	                });
	                return false;
	            }

	            /*if (msg === '购买商品中存在库存不足的商品' || msg === '购买商品中存在已下架的商品') {
	            	msg = '你购买的商品中包含无货或已下架的商品，请返回修改';
	            }*/
	            confirm(msg, {
	                okValue: '返回修改',
	                ok: function ok() {
	                    window.history.back();
	                },
	                okCls: 'red',
	                cancelValue: '取消'
	            });
	        }
	    }).fail(function () {}).always(function () {
	        firing = false;
	        $submitOrder.removeClass('btn-default');
	    });
	    return false;
	};

	var init = function init() {

	    // 绑定提交事件
	    if ($conf.deliverInfo.success === true && $conf.orderList.length) {
	        $submitOrder.on('click', submit);
	    } else {
	        // 提交订单按钮置灰,不可点击
	        $submitOrder.addClass('btn-default');
	    }
	};

	module.exports = {
	    init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }
]);