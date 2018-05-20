var Dialog = require('dialog');



var create = function(options) {
    options = options || {};
    var defaults = {
        title: ' ',
        modal: true,
        fixed: true,
        width: 350,
        content: '<p class="del-pop-p">您最多能添加9个商品哦！</p>',
        className: 'pop-box',
        okValue: '确定',
        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
        ok: function() {

        },
        onshow: function() {
            $('[i="title"]').hide();
        }
    };
    $.extend(true, defaults, options);
    return Dialog(defaults);
};


module.exports = {
    create: create
};