var fetch = require('io/fetch');
var url = require('io/url');
var Pubsub = require('io/pubsub');
var deliveryAddrPop = require('module/popup/deliveryAddr');
var confirm = require('module/popup/confirm');
var alert = require('module/popup/alert');
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('uc_address');

var tpl = require('./addrItem.tpl');

var dftAddrCls = 'set-default-hide';

var $addrNo = $('[data-node=addrNo]');
var $addrNew = $('[data-node=addrNew]');
var $addressList = $('[data-node=addressList]');
var $add = $('[data-action=addAddr]');
var $addrNum = $('[data-node=addrNum]'); // 收货地址计数
$addrNum.data('count', +$addrNum.text()); // 存储计数



// 更新收货地址的计数
var updateAddrNum = function(num) {
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
var editAddr = function() {
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
var delAddr = function() {
    var $item = $(this).closest('tr');
    confirm('确定删除收货地址吗？', {
        content: '<p class="pay-pop-p del-pop-p"><em class="iconn-12"></em>您确定要删除收货地址吗</p>',
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
                    // 更新计数
                    updateAddrNum(-1);
                    $item.remove();
                } else {
                    alert('删除失败');
                }
            })
        }
    });
};

// 新增收获地址
var addAddr = function() {
    var addrCount = $addrNum.length ? $addrNum.data('count') : 0;
    if (addrCount < 20) {
        deliveryAddrPop({}, {
            title: '新增收货地址'
        });
    }
    return false;
};

var showDefault = function() {
    var $this = $(this);
    if ($this.attr('data-dft') != 1) {
        $this.find('[data-action=setDft]').removeClass(dftAddrCls);
    }
    return false;
};

var hideDefault = function() {
    $(this).children().eq(0).find('[data-action=setDft]').addClass(dftAddrCls);
    return false;
};

// 移除默认地址标签
var rmDefault = function() {
    var $item = $addressList.find('tr[data-dft=1]').attr('data-dft', 0);
    $item.find('[data-node=dftAddr]').addClass(dftAddrCls);
};

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
};

// 设置默认地址请求成功后
var onSetDefaultDone = function($current) {
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

var init = function() {
    $add.on('click', addAddr);
    $addressList.on('click', '[data-action=editAddr]', editAddr);
    $addressList.on('click', '[data-action=delAddr]', delAddr);
    $addressList.on('mouseenter', 'tr[data-id]', showDefault);
    $addressList.on('mouseleave', 'tr[data-id]', hideDefault);
    $addressList.on('click', '[data-action=setDft]', setDefault);
    // 更新
    Pubsub('addr.edit').sub(function(data) {
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
            if($addressList.find('tr[data-dft=1]').length > 0){
               $addressList.find('tr').eq(1).after($item);
            }else {
               $addressList.find('tr').eq(0).after($item);
            }        
            $receiver.find('[data-node=dftAddr]').addClass(dftAddrCls);
        }
    });
    // 新增
    Pubsub('addr.add').sub(function(data) {

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
            if($addressList.find('tr[data-dft=1]').length > 0){
                position = 1;
            }else {
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
