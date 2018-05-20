
var fetch = require('io/fetch');
var hint = require('module/hint');
var url = require('io/url');
var checkLoginStatus = require('module/checkLoginStatus');
var loginPop = require('module/popup/login');
function init() {
    var $tabBox = $('[data-node="tabBox"]');
    var offsetTop =$tabBox.offset().top;
    var hasSlide = $tabBox.hasClass('top20');//是否有轮播
    $(window).on('scroll',function(){         
        var scrollTop = $(window).scrollTop();
        if(scrollTop < offsetTop  ){
            $tabBox.removeClass('user-fixed').addClass('top20');
        }else{
            $tabBox.addClass('user-fixed').removeClass('top20');
        }
    });
    var $rapidPutaway = $('[data-node="rapid-putaway"]');
    var flag = false;
    $('[data-node="good-sold"]').each(function(){
        var _status = $(this).attr('data-status');
        if(_status == 0){
            flag = true;            
        }
    });
    if(flag){
    }else{
        $rapidPutaway.addClass('putaway');
    }
    $rapidPutaway.on('click',function(){
        var _this = $(this);
        var soldFn = function(_this){
            if(_this.hasClass('putaway')) return;
            _this.text('正在上架中...');
            var $soldUp = $('[data-node="good-sold"]');
            var _items = [];
            $soldUp.each(function(){
                var _status = $(this).attr('data-status');
                if(_status == 0){
                    $(this).text('上架中...') ;      
                    var _itemId = $(this).attr('data-itemid');
                    var _skuId = $(this).attr('data-skuid');
                    var _identification = $(this).attr('data-identification');
                    var json = {
                        itemId: _itemId,
                        skuId:_skuId,
                        identification:_identification 
                    }
                    _items.push(json);
                }           
            });
            fetch.post(url.get('itemBatchMangeInShop'), {
                data: {
                    shopId: $_CONFIG.shopId,
                    items: _items
                }
            }).done(function(result) {
                if( result&&result.code === 200 ){
                    $rapidPutaway.addClass('putaway');
                    $soldUp.text('已上架').removeClass('user-goods-up').addClass('user-goods-down').attr('data-status','1');
                }else if(result.code == 713001 ){
                    window.location.href = $GLOBAL_CONFIG['meidian_domain']+'admin';
                }else{
                    hint.init('抱歉，操作失败，请重试');
                    $soldUp.text('上架');
                }
                $rapidPutaway.text('一键上架');
            });
        }
        if(!checkLoginStatus()){
            loginPop(function(){
                soldFn(_this);
            })
        }else{
            soldFn(_this);
        }
          
    });
};
module.exports = {
    init: init
};