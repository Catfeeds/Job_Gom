var tpl = require('./content.tpl');
var Dialog = require('dialog');

var create = function(data, options) {
    var content = tpl(data || {}); // 显示编辑弹窗之前,需要自己拼装数据
    options = options || {};
    var defaults = {
        fixed: true,
        modal: true,
        content: content,
        className: 'pop-box',
        okValue: '确定',
        okCls: 'pc-btn pc-btnh35 circle-pop-btn'
    };
    $.extend(true, defaults, options);
    var d = Dialog(defaults);

    var header = d._$('header');
    var title = d._$('title');
    title.css('borderBottom', 'none');
    header.show();
    return d;
};

module.exports = {
    create: create
};