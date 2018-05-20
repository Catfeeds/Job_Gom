/**
 * 快速添加到购物车
 * @author Zhengchun Fu
 */
var fetch = require('io/fetch');
var url = require('io/url');
var Dialog = require('dialog');
var loadingTpl = require('./loading.tpl');
var tipsTpl = require('./tips.tpl');
var quikAddToCartTpl = require('./quikAddToCart.tpl');
var slider = require('module/noRepeatSlider');
var checkLoginStatus = require('module/checkLoginStatus');
var loginPop = require('module/popup/login');
var toast = require('module/hint').init;

// // tmod helpers
require('module/tmodHelper/substrLen')();

var $conf = $_CONFIG;
var tipsMsg = {
    success: '商品加入成功',
    fail: '添加失败，请稍后再试',
    netFail: '网络请求失败，请稍后重试',
    notSelectGoods: '请选择商品属性'
};

var skusAttrsNode = '[data-node=skusAttrs]';
var sliderListNode = '[data-node=sliderList]';
var sliderLeftNode = '[data-action=sliderLeft]';
var sliderRightNode = '[data-action=sliderRight]';
var quikAddBoxNode = '[data-node=quikAddBox]';
var quikAddPriceNode = '[data-node=quikAddPrice]';
var addCartNode = '[data-action=addCart]';

var hideCls = 'hide';
var activeCls = 'active';
var disabledCls = 'disabled';

var quikAddData = {
    mshopid: 0,
    skuid: 0,
    quantity: 1,
    kid: '',
    source_code: $conf.sourceCode
};

// 存放过滤后的数据
var itemData = {};
var skus = [];

// 处理过后的sku属性数据
var skusAttrData = {};
var afterFilterSkusArr = [];

// 显示弹窗
var goodsDetailPop = function(content, callback) {
    var d = Dialog({
        fixed: true,
        modal: true,
        title: '选择商品规格',
        content: content,
        className: 'pop-box pop-pad-btm65',
        okCls: 'pc-btn pc-btnh40 pc-btnw120',
        ok: addToCart,
        okValue: '添加到购物车',
        btnWrapCls: 'two-buttons',
        onshow: callback
    });
    d._$('header').hide();
    d._$('footer').hide();
    d.show();
    return d;
};

// 过滤库存为0的sku
function filterData(data) {
    var newSkus = [];
    $.each(data, function(i, v) {
        if (v.stock > 0) {
            v.chungeAddIndex = i;
            newSkus.push(v);
        }
    });

    // 售价由低到高排序
    newSkus.sort(function(a, b) {
        return a.salePrice - b.salePrice || a.chungeAddIndex - b.chungeAddIndex;
    });
    return newSkus;
}

// 转换适配数据
function getSkusAttrs(skus) {
    var skuAttrsStrData = {};
    var newData = {};
    var newArr = [];
    $.each(skus, function(i, v) {
        var skuAttrs = [];
        var skuStr = '';
        $.each(v.attributes, function(k, sv) {
            if (typeof newData[sv.name] === 'undefined') {
                newData[sv.name] = [sv.value];
            } else {
                if ($.inArray(sv.value, newData[sv.name]) < 0) {
                    newData[sv.name].push(sv.value);
                }
            }
            skuStr += sv.value;

            skuAttrs.push(sv.value);
        });
        skuAttrsStrData[skuStr] = v.id;
        newArr.push(skuAttrs);
    });
    return {
        skusAttrs: newData,
        skusArr: newArr,
        skuAttrsStrData: skuAttrsStrData
    };
}

// 加载显示商品详情
var loadGoodsDetail = function(ele) {
    $(ele).on('click', addCartNode, function() {
        var $this = $(this);
        var shopId = $this.data('shopid');
        var itemId = $this.data('itemid');
        var showHTML = '';
        var pop = null;

        if (!checkLoginStatus()) {
            loginPop();
            return false;
        }

        showHTML = loadingTpl($conf);
        pop = goodsDetailPop(showHTML, function() {
            fetch.get(url.get('cartGoodsDetail'), {
                data: {
                    shopId: shopId,
                    itemId: itemId
                }
            }).done(function(data) {
                var originItemData = data.data.item;
                if (data.success === true) {
                    if (data.data.mshop === null) {
                        quikAddData.mshopid = data.data.shop.id;
                    } else {
                        quikAddData.mshopid = data.data.mshop.id;
                    }
                    $.extend(itemData, originItemData);
                    itemData.skus = filterData(itemData.skus);
                    skus = itemData.skus;
                    skusAttrData = getSkusAttrs(originItemData.skus);
                    afterFilterSkusArr = getSkusAttrs(itemData.skus).skusArr;
                    itemData.skusAttrs = skusAttrData.skusAttrs;

                    pop._$('content').html(quikAddToCartTpl(itemData));
                    pop._$('header').show();
                    pop._$('footer').show();
                    pop.reset();

                    loadedInit();
                    slider({
                        element: quikAddBoxNode,
                        showLength: 1
                    });
                } else {

                    // 先要判断登录是否已经失效，失效弹出登录窗口
                    if (data.code === "881011") {
                        loginPop();
                        pop.remove();

                    } else {
                        popTips(data.message);
                    }
                }
            }).fail(function() {
                popTips(tipsMsg.netFail);
            });
        });

        function popTips(content) {
            var msg = tipsTpl({
                msg: content
            });
            pop._$('content').html(msg);
            pop.reset();
            setTimeout(function() {
                pop.remove();
            }, 2000);
        }
    });
};

// loadedInit
var loadedInit = function() {
    var $first = $(skusAttrsNode).find('a.active');
    $.each($first, function(i, v) {
        ctrlAttrShow($(v));
    });
    checkSkuSelect();
    bindEvent();
};

// 控制属性的选择
function ctrlAttrShow($first) {
    var $skusAttrs = $(skusAttrsNode);
    var skusArr = afterFilterSkusArr;
    var $attrs = $skusAttrs.find('a');
    var $dl = $skusAttrs.find('dl');
    var firstAttr = $.trim($first.data('val'));
    var $otherAttrs = $first.parents('dl').siblings('dl').find('a');

    function changeClass($v, flag) {
        if (flag) {
            $v.removeClass(activeCls).addClass(disabledCls);
        } else {
            $v.removeClass(disabledCls);
        }
    }
    if ($dl.length > 1) {
        $.each($otherAttrs, function(i, v) {
            var attrStr = $.trim($(v).data('val'));
            var flag = true;
            var isRepeatAttr = false;
            var repeatAttr = '';
            if (firstAttr === attrStr) {
                isRepeatAttr = true;
                repeatAttr = firstAttr + attrStr + '';
            }

            $.each(skusArr, function(k, vv) {
                if ($.inArray(attrStr, vv) >= 0 && $.inArray(firstAttr, vv) >= 0) {

                    // 不同属性的值可能一样的，需要判断。
                    if (isRepeatAttr && repeatAttr !== vv.join('')) {
                        flag = true;
                    } else {
                        flag = false;
                    }
                }
            });
            changeClass($(v), flag);
        });
    } else {
        $.each($attrs, function(i, v) {
            var attrStr = $.trim($(v).data('val'));
            var flag = true;
            $.each(skusArr, function(k, vv) {
                if ($.inArray(attrStr, vv) >= 0) {
                    flag = false;
                }
            });
            changeClass($(v), flag);
        });
    }
}

// 取消控制属性选择
function cancelCtrlAttr() {
    var a_disabledCls = 'a.disabled';
    var $skusAttrs = $(skusAttrsNode);
    var $first = $skusAttrs.find('a.active');
    $first.parents('dl').find(a_disabledCls).removeClass(disabledCls);
    if (!$first.length) {
        $skusAttrs.find(a_disabledCls).removeClass(disabledCls);
    }
    ctrlAttrShow($first);
}

// 绑定属性选择事件
var bindEvent = function() {
    $(skusAttrsNode).on('click', 'a', function() {
        var $this = $(this);
        var skuId = 0;
        var skuData;
        if ($this.hasClass(disabledCls)) {
            return false;
        }
        if ($this.hasClass(activeCls)) {
            $this.removeClass(activeCls);
            cancelCtrlAttr();
        } else {
            $this.addClass(activeCls).siblings('a').removeClass(activeCls);
            ctrlAttrShow($this);
            skuId = checkSkuSelect();
            if (~~skuId) {
                skuData = getSkuById(skuId);
                repaintHTML(skuData);
            }
        }
    });
};

// 取消绑定
var offEvent = function() {
    $(skusAttrsNode).off();
};

// get sku's data
function getSkuById(id) {
    var sku = null;
    $.each(skus, function(i, v) {
        if (v.id == id) {
            sku = v;
            return;
        }
    });
    return sku;
}

// check that is full sku
function checkSkuSelect() {
    var $selecteds = $(skusAttrsNode).find('a.active');
    var skuStr = '';
    var skuId = 0;
    $.each($selecteds, function(i, v) {
        skuStr += $.trim($(v).data('val'));
    });

    skuId = skusAttrData.skuAttrsStrData[skuStr];
    quikAddData.skuid = skuId;
    return skuId;
}

// 添加选择的商品到购物车
var addToCart = function() {
    var skuId = checkSkuSelect();
    if (!skuId) {
        toast(tipsMsg.notSelectGoods);
        return false;
    }
    fetch.get(url.get('addShopCar'), {
        data: quikAddData
    }).done(function(data) {
        if (data.success === true) {

            // 清空变量存储的值
            itemData = {};
            skus = [];
            skusAttrData = {};
            afterFilterSkusArr = [];

            // 提示并刷新当前页
            toast(tipsMsg.success, {
                callback: function() {
                    location.reload();
                }
            });
        } else {
            toast(data.message);
        }
    }).fail(function() {
        toast(tipsMsg.fail);
    });

    offEvent();
};

// 根据选择的sku重绘商品信息
var repaintHTML = function(data) {
    var $popBox = $(quikAddBoxNode);
    var images = data.images.length ? data.images : itemData.images;
    var imgHTML = '';
    var priceName = itemData.isDiscount ? '促销价' : '价格';
    var priceHTML = '<p>' + priceName + '：<span><em>￥</em>' + data.salePrice + '</span></p>';
    var originalPriceHTML = '<p class="del">价格：￥' + data.price + '</p>';

    // 重置图片列表
    $popBox.find(sliderListNode).css('left', 0);
    $.each(images, function(i, img) {
        imgHTML += '<li><img onerror="imgError(this)" src="' + img + '"></li>';
    });
    $popBox.find(sliderListNode).html(imgHTML);
    $popBox.find(sliderLeftNode).addClass(hideCls);

    if (images.length < 2) {
        $popBox.find(sliderRightNode).addClass(hideCls);
    } else {
        $popBox.find(sliderRightNode).removeClass(hideCls);
    }

    // 重置价格
    if (itemData.isDiscount) {
        priceHTML += originalPriceHTML;
    }
    $(quikAddPriceNode).html(priceHTML);

};

module.exports = loadGoodsDetail;