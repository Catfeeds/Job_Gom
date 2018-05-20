var tpl = require('./content.tpl');
var Dialog = require('dialog');
var Pubsub = require('io/pubsub');
var fetch = require('io/fetch');
var url = require('io/url');
var byteLen = require('utils/byteLen');
var trim = require('utils/trim');
var check = require('utils/check');
var truncate = require('utils/truncate');
var placeHolder = require('placeholder');
var areaSelect = require('module/address'); // 区域四级联动
var alert = require('module/popup/alert');

require('textchange');

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