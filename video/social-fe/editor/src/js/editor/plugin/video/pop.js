var Dialog = require('dialog');
var inputTpl = require('./input.tpl');
var dealVideo = require('./dealVideo');

function pop(editor) {
    var d = Dialog({
        fixed: true,
        title: '选择视频',
        modal: true,
        width: 610,
        content: inputTpl,
        className: 'pop-box',
        okValue: '确定',
        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
        btnWrapCls: 'insert-cancel',
        ok:function(){
        	var value = $.trim($('[data-node="videoValue"]').val());
        	var t = dealVideo({
        		data:value,
        		editor:editor
        	});
        	if(!t){
        		return false;
        	}
        },
        cancel: function() {
        }
    })
    d.show();
}

module.exports = pop;