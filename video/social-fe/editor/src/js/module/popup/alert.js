var Dialog = require('dialog');
var noop = function() {};

var create = function(content, options) {
    content = content || '';
    options = options || {};
    var defaults = {
        fixed: true,
        modal: true,
        autofocus: false,
        content: '<p class="del-pop-p">' + content + '</p>',
        className: 'pop-box',
        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
        ok: noop
    };
    $.extend(true, defaults, options);
    var d = Dialog(defaults);

    var header = d._$('header');
    var title = d._$('title');
    if(!options.title){
        title.css('borderBottom', 'none');
    }
    header.show();
    d.show();
    return d;
};

module.exports = create;
