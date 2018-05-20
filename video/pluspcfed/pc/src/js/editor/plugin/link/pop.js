var Dialog = require('dialog');
var inputTpl = require('./input.tpl');
var dealLink = require('./dealLink');
//var grepLocal = /( src=["'])https?:(\/\/.*?((meixincdn\.com)|(((atguat)|(gomein))\.net\.cn)))/gi;

var domainReg = /((\w+):\/\/)?([^/]+)/;
var grepLocal=/((\.gome\.com\.cn)|(meixincdn\.com)|(atguat.com.cn)|(((atguat)|(gomein))\.net\.cn))$/i;


function checkVal(that,$btn,$msg){
    var value = that.val();
    if(value.length){
        var arr = value.match(domainReg)[0];
        if( grepLocal.test(arr) ){
            $btn.removeClass('btn-default');
            $msg.text('');
        }else{
            $btn.addClass('btn-default');
        }
    }else{
         $btn.addClass('btn-default');
    }
}


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
            dialogClosed();
        },
        cancel: function() {
            dialogClosed();
        },
        onshow:function(){
            dialogShow();
        }
    })
    
   
    var $node = $(d.node);
    var $btn = $node.find('.circle-pop-btn');
    var $msg = $node.find('[data-node="link-msg"]');
    if( url == "" ){
        $btn.addClass('btn-default');
    }

    $('[data-node="link-value"]')
        .on("keyup",function(){
             
            var $this = $(this);
            checkVal($this,$btn,$msg);    
        })
        .on("paste cut",function(){
            var $this = $(this);
            setTimeout(function(){
                checkVal($this,$btn,$msg);   
            },200)
        })


     d.show();
}

//弹窗开启
var dialogShow = function() {
    $('body').css({
        height: '100%',
        overflowY: 'hidden'
    });
};

//弹窗关闭
var dialogClosed = function() {
    $('body').css({
        height: 'auto',
        overflowY: 'auto'
    });
};
module.exports = pop;