/**
 *  商品搜索页面--价格区间
 * @author Qiaoli
 */

var newUrl = require('./url');
var loading = require('./loading');
require('textchange');

var $minPrice = $('[data-node=minPrice]');
var $maxPrice = $('[data-node=maxPrice]');
var $submit = $('[data-action=submit]');

//不能输入字母
var validateKey = function() {
    var key = event.keyCode;
    if (key >= 48 && key <= 57) {
        return true;
    } else {
        return false;
    }
};

//输入非数字置为0
var validatePrice = function(name) {
    var val = name.val();
    var reg = /^[0-9]+$/;
    if (!reg.test(val)) {
        name.val("");
    }
};

//截取长度
var maxLen = 8;
var setLength = function() {
    var $this = $(this);
    var val = $.trim($this.val());
    var len = val.length;
    var reg = /^[0-9]+$/;
    if (reg.test(val) && len > maxLen) {
        $this.val(val.substr(0, maxLen));
    }
    return false;
};

//比较大小
var compareVal = function() {
    var min = $minPrice.val();
    var max = $maxPrice.val();
    if (Number(min) > Number(max)) {
        if (max === '') {
            $minPrice.val(min);
            $maxPrice.val("");
        } else {
            $minPrice.val(max);
            $maxPrice.val(min);
        }
    }
    if (min == 0 && max == 0) {
        $minPrice.val(min);
        $maxPrice.val("");
    }
    return {
        min: $minPrice.val(),
        max: $maxPrice.val()
    }
};

var setPrice = function() {
    var val = compareVal();
    loading();
    newUrl({
        minPrice: val.min,
        maxPrice: val.max
    })
};

var init = function() {
    $minPrice.on('keypress', validateKey);
    $maxPrice.on('keypress', validateKey);
    $minPrice.on('textchange', setLength);
    $maxPrice.on('textchange', setLength);
    $minPrice.on('blur', function() {
        validatePrice($minPrice);
    });
    $maxPrice.on('blur', function() {
        validatePrice($maxPrice);
    });
    $submit.on('click', setPrice);
};

module.exports = {
    init: init
};