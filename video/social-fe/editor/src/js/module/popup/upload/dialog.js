var tpl = require('./content.tpl');
var Dialog = require('dialog');

var create = function(data, options){
    var content = tpl(data || {}); // 显示编辑弹窗之前,需要自己拼装数据
    options = options || {};

    var defaults = {
        title: '选择图片',
        modal: true,
        fixed: true,
        content: content,
        className: 'pop-box',
        okValue: '插入图片',
        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
        cancalValue : '取消',
        btnWrapCls: 'insert-cancel'
        /*function () {
            // var value = $('#property-returnValue-demo').val();
            // this.close(value);
            // this.remove();
        }*/
    };
    $.extend(true, defaults, options);
    return Dialog(defaults);
};

module.exports = {
    create: create
};