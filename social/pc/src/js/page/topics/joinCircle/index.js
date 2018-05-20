// var praise = require('module/praise');
var circle = require('module/joinCircle');
var loginPop = require('module/popup/login');
var alert = require('module/popup/alert');
var tips = require("module/i18n").circle;

var init = function() {
    // 加入圈子
    var $postTopic = $('[data-node=postTopic]');
    $('[data-action=joinGroup]').on('click',{done:function(str){
        if( str == 'join' ){
            $_CONFIG['member_type'] = 0;
        }else if( str == 'exit'){
            $_CONFIG['member_type'] = 1;
        }
    }},circle);
    $postTopic.on('click',function (){
        var _this = this;
        var memberType = $_CONFIG['member_type'];
        if($_CONFIG['islogin'] == '0'){
            loginPop();
            return false;
        }else{
            if( memberType == '1' ){
                //未加入圈子
                if( $_CONFIG['approval_type'] == '2'){
                    alert(tips.cannotJoin);
                }else{
                    alert(tips.unJoin,{
                        okValue:'加入圈子',
                        ok:function (){
                            $('[data-action=joinGroup]').click();
                        }
                    });
                }
            }else if( memberType == '2' ){
                //加入圈子审核中
                alert(tips.review);
            }else{
                //跳转到发话题页面
                window.open($_CONFIG['group_domain']+JSON.parse($(_this).attr('bp-data'))['publish_url'])
            }
        }
    })
}

module.exports = {
    init:init
}