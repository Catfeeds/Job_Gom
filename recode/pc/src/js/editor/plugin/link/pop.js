var Dialog = require('dialog');
var inputTpl = require('./input.tpl');
var dealLink = require('./dealLink');
//var grepLocal = /( src=["'])https?:(\/\/.*?((meixincdn\.com)|(((atguat)|(gomein))\.net\.cn)))/gi;

var domainReg = /((\w+):\/\/)?([^/]+)/;
var grepLocal=/((\.gome\.com\.cn)|(meixincdn\.com)|(atguat.com.cn)|(((atguat)|(gomein))\.net\.cn))$/i;

function pop(editor,url,num) {
    var d = Dialog({
        fixed: true,
        title: '插入超链接',
        modal: true,
        width: 500,
        content: inputTpl({'url':url}),
        className: 'pop-box pop-links',
        okValue: '插入',
        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
        btnWrapCls: 'insert-cancel',
        ok:function(){
        	var value = $('[data-node="link-value"]').val();
            if(value == ''){
                $('[data-node="link-msg"]').text('链接地址不能为空');
                return false;
            }else{
                var arr = value.match(domainReg)[0];
                if( grepLocal.test(arr) ){
                //if( true ){
                    dealLink(editor,value,num);
                }else{
                    $('[data-node="link-msg"]').text('不支持非gome站内链接地址，请重新输入');
                    return false;
                }
            }

        },
        cancel: function() {
        }
    })
    
   

    var $btn = $(d.node).find('.circle-pop-btn');

    if( url == "" ){
        $btn.addClass('btn-default');
    }

    $('[data-node="link-value"]').on("keyup",function(){
        var $this = $(this);
        var value = $this.val();
        if(value.length){
            var arr = value.match(domainReg)[0];
            if( grepLocal.test(arr) ){
                $btn.removeClass('btn-default');
            }else{
                $btn.addClass('btn-default');
            }
        }
        
    })

     d.show();
}

module.exports = pop;