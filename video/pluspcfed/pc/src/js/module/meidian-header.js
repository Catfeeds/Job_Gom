var loginPop = require('module/popup/login');
var init = function() {
    // 点击我的美店
    $('[data-node="meidian_my"]').off('click').on('click', function (){
        myMeidian({
            refresh: false
        });
    });
    function myMeidian(options){
        var isLogin = parseInt($GLOBAL_CONFIG['islogin']);
        if(isLogin){
            if(location.pathname == '/admin'){
                location.reload();
            }else{
                window.open($GLOBAL_CONFIG['meidian_domain'] + 'admin', '_blank');
            }
        }else{
            // 去登陆 再跳转
            loginPop(function (){
                location.reload();
            });
        }
    }
};

init();