var fetch = require('io/fetch');
var url = require('io/url');
var hint = require('module/hint');
var checkLoginStatus = require('module/checkLoginStatus');
var loginPop = require('module/popup/login');

var isCollect = false;
var collectUrl;
var init = function(elementSelector, onChanged) {
    var $select = elementSelector.parent ? $(elementSelector.parent) : $(elementSelector.selector),
        $selector = elementSelector.parent ? elementSelector.selector : undefined;

    $select.on('click', $selector, function() {
        var _this = this,
            isAdd = true,
            changed = onChanged || function() {};

        var objs = {
            // validate: true,
            data: {
                shopId: $_CONFIG.shopId
            }
        }

        //无刷新登录
        function noRefreshFetch(refreshFlag) {
            fetch.post(collectUrl, objs).done(function(result) {
                if (result.code === 200) {
                    if (isAdd) {
                        $(_this).addClass('active').attr('data-collect', 'collect');
                    } else {
                        $(_this).removeClass('active').attr('data-collect', '');
                    }
                    if(!refreshFlag){
                        changed.call(_this, isAdd);
                    }
                } else {
                    hint.init(result.message)
                }
            }).fail(function() {
                if (checkLoginStatus()) {
                    hint.init('店铺收藏失败');
                }
            }).always(function() {
                isCollect = false;
                if(refreshFlag){
                    window.location.reload();
                }
            });
        }

        if (!isCollect) {
            isCollect = true;
            if ($(_this).attr('data-collect') === '') {
                collectUrl = url.get('shopCollect');
                isAdd = true;
            } else {
                collectUrl = url.get('unShopCollect');
                isAdd = false;
            }
        }else{
            return;
        }

        if(checkLoginStatus()){
            noRefreshFetch();
        }else{
            loginPop(function(){
                noRefreshFetch(1);
            })
        }
        return false;
    });

}
module.exports = init;