var fetch = require('io/fetch');
var url = require('io/url');
var Pubsub = require('io/pubsub');
var deliveryAddrPop = require('module/popup/deliveryAddr');
var confirm = require('module/popup/confirm');
var alert = require('module/popup/alert');
var tpl = require('./item.tpl');
var userCardTips = require('module/popup/userCardTips');

var $addrList = $('[data-node=addrList]');
var $addrListBox = $addrList.parent(); // table父容器
var $add = $('[data-action=addAddr]');
var $expand = $('[data-action=expand]'); // 展开

var $conf = $GLOBAL_CONFIG;

// 刷新当前页面
var reload = function() {
    location.href = window.location.href;
};

// 判断并改变新增地址按钮状态
var changeAddStatus = function(num) {
    if (num >= 20) {
        $add.addClass('disabled');
    } else {
        $add.removeClass('disabled');
    }
};

// 更新收货地址的计数
var updateAddrNum = function(num) {
    var current = $add.data('count');
    var count = current + num;
    $add.data('count', count);
    if (count === 1 && num === 1) { // 新增第一条后,刷新当前页面
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
var editAddr = function(e) {
    var $item = $(this).closest('tr');
    var isDefault = $item.data('dft') === 1 ? true : false;
    var name = $item.find('[data-node=name]').text();
    var phone = $item.find('[data-node=phone]').text();
    var $pcba = $item.find('[data-addr]');
    var json = $pcba.data('addr');
    var addr = $item.find('[data-node=area]').text();
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
var delAddr = function(e) {
    var $item = $(this).closest('tr');
    confirm('确定删除收货地址吗？', {
        content: '<p class="pay-pop-p del-pop-p"><em class="icon icon-warn">&#xe960;</em>您确定要删除收货地址吗</p>',
        title: '删除',
        okCls: '',
        ok: function() {
            fetch.post(url.get('delAddress'), {
                data: {
                    addressId: $item.data('id')
                }
            }).done(function(data) {
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
            })
        }
    });
    return false;
};

// 新增收获地址
var addAddr = function(e) {
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
var setDefault = function() {
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
    }).done(function(data) {
        if (data && data.code === 200) {
            onSetDefaultDone($item);
        } else {
            alert('设置失败');
        }
    }).fail(function() {
        alert('设置失败');
    }).always(function() {
        $this.data('firing', 0);
    });
    return false;
};

// 移除默认地址标签
var rmDefault = function($ele) {
    var $item = $ele || $addrList.find('[data-dft=1]');
    // 还原属性
    $item.attr('data-dft', 0);
    // 设置默认地址标签隐藏
    $item.find('[data-node=dftAddr]').addClass('hide');
    $item.find('[data-action=setDft]').css('visibility', 'visible');
};

// 移除收货地址高亮
var rmActive = function() {
    // 移除active样式
    $addrList.find('[data-node=lightName]').removeClass('name-active');
};

// 设置默认地址请求成功后
var onSetDefaultDone = function($current) {
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
var toggle = function() {
    var $this = $(this);
    if ($this.text() === '展开') {
        $addrListBox.height('auto');
        $this.find('span').text('收起');
        $this.find('em').addClass('rotate90');
    } else {
        var $tr = $addrList.find('tr');
        var len = $tr.length;
        len = len > 5 ? 5 : len;

        $addrListBox.height($tr.height() * len + 10 + 'px');
        $this.find('span').text('展开');
        $this.find('em').removeClass('rotate90');
    }
    return false;
};

var showConfirm = function(msg, opts) {
    opts = opts || {};
    confirm(msg, {
        okValue: opts.okValue || '修改配送地址',
        btnWrapCls: 'insert-cancel',
        ok: opts.ok || function() {
            document.body.scrollIntoView();
        }
    });
};

// 点击设为送货地址,检查当前地址是否可送达,并把地址id传递给server
var setSelected = function() {
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
            skuList: JSON.stringify($GLOBAL_CONFIG['skuList']),
            fid: $GLOBAL_CONFIG['fid']
        }
    }).done(function(data) {
        // console.log(data);
    }).fail(function() {

    }).always(function() {
        reload();
    });
    return false;
};

// 提示完善身份验证信息
var showConfirmUserCard = function() {
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

var init = function() {
    var deliverInfo = $conf.deliverInfo || {}; // 收获地址不可配送
    var orderList = $conf.orderList || []; // 订单列表
    var curAddr = $conf.currentAddress || {}; // 当前收货地址

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
                ok: function() {
                    // location.href = $conf.order_domain + '/cart/';
                    window.history.back();
                }
            });
        } else {
            showConfirm(deliverInfo.message);
        }


    } else if (!$addrList.find('tr').length) { // 没有收货地址
        showConfirm('请添加收货地址', {
            okValue: '新建收货地址',
            ok: function() {
                addAddr();
            }
        });
    } else if (!orderList.length) {
        showConfirm('您购买的商品中包含无货或已下架商品，请返回修改', {
            okValue: '返回修改',
            ok: function() {
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
    Pubsub('addr.edit').sub(function(data) {

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
    Pubsub('addr.add').sub(function(data) {

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