// var praise = require('module/praise');
var circle = require('module/joinCircle');
var loginPop = require('module/popup/login');
var alert = require('module/popup/alert');
var confirm = require('module/popup/confirm');
var tips = require("module/i18n").circle;

// 请见 module/joinCircle.js
var init = function() {
    // 加入圈子
    var $postTopic = $('[data-node=postTopic]'),
    	memberType = $GLOBAL_CONFIG['member_type'];

    $('[data-action=joinCircle]').each(function(){
		$(this).attr('data-membertype')==0 && $(this).removeAttr('data-action');
    })
    $('[data-action=joinGroup]').on('click',{
    	done:function(str, $els){
	        if( str == 'join' ){
	            $els.attr('data-membertype', 0);
	        }else if( str == 'exit'){
	            $els.attr('data-membertype', 1);
	        }else if( str == 'limit'){
        		$els.removeClass('c-t-l-join').addClass('c-t-l-limit');
	        }
	    },
	    word: { join : '加入圈子', focus : '退出圈子' }
	}, circle)
	$('[data-action=joinCircle]').on('click',{
    	done:function(str, $els){
	        if( str == 'join' ){
	            $els.attr('data-membertype', 0);
	            $els.removeAttr('data-action');
	            $els.off('click');
	            $els.addClass('circle-s-l-c-button-joined');
                $els.attr('href', $els.attr('data-href'));
	        }else if( str == 'joined' ){
	            $els.addClass('circle-s-l-c-button-joined');
        	}else if( str == 'joining' ){
	            $els.removeClass('circle-s-l-c-button-joined');
                $els.html('审核中');
            }else if( str == 'exit'){
	            $els.attr('data-membertype', 1);
	            $els.removeClass('circle-s-l-c-button-joined');
	        }
	    },
	    word: { join : '+ 加入圈子', focus : '&radic; 已加入' }
	}, circle)

	function reload() {
    	$_CONFIG['islogin'] = '1';
		window.location.href=window.location.href;
	}

	function checkMember(_this) {
    	memberType = $('[data-action=joinGroup]').attr('data-membertype');
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
	    	if($GLOBAL_CONFIG['member_type'] == '1000'){
	    		alert('该圈子人数已达上限，稍后再尝试');
	    	} else if($GLOBAL_CONFIG['member_type'] == '2') {
	    		alert('抱歉，该圈子在审核中');
	    	} else {
       			window.open($_CONFIG['group_domain']+JSON.parse($(_this).attr('bp-data'))['publish_url'])
	    	}
        }
	}

    $postTopic.on('click',function (){
        var _this = this;
        if($_CONFIG['islogin'] == '0'){
            loginPop(reload);
            return false;
        }else{
        	checkMember(_this);
        }
    })
}

module.exports = {
    init:init
}
