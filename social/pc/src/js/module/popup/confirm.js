var Dialog = require('dialog');
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