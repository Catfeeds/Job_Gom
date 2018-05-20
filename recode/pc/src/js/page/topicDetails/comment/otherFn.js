
var getCommentList = require('./getCommentList'); //

//var $loadlist = $("[data-node=loadlist]");
//var $comment_Msg = $("[data-node=comment_Msg]");
//var $a_Submit = $("[data-node=a_Submit]");
//var $circleCom = $("[data-node=circleCom]");
var checkLoginStatus = require('module/checkLoginStatus'); //登陆判断
var DIVOBJ = $("[data-node='more-topic']");
var loginPop = require('module/popup/login');
var  lodingMore = function(){

    //加载更多

    //$("[data-node=loading]").css("display", "none");
    //$("[data-node=noload]").css("display", "none");

    DIVOBJ.on("click" ,"[data-node='loadlist']",function(){
        var hideDiv = $(this).parent("[data-node='hidDiv']")
        var topicId = hideDiv.attr("data-comtopicid");
        var userSubmits = hideDiv.find("[data-node='userSubmit']");
        var addmorepages = $(this).attr("data-addmorepages"); //当前页
        var listsize = $(this).attr("data-listsize"); //
        //var tootalPa = $(this).attr("data-tootlepa"); //总页数
        var toPage = parseInt(addmorepages) + 1;
        var nodelist = "nodelist";

        for(var i=0,len = userSubmits.length; i<len; i++){
            var $this = $(userSubmits[i]);
            $this.next('a').remove();
            $this.next('div').remove();
            $this.remove();
            
        }

        getCommentList(topicId,toPage, listsize, 5, nodelist);
        return false;
    });


}

// 点击评论图标页面滚动到评论区域
var goComment = function() {



    var $body = $('body');
    $body.on('click',"[data-action='goComment']", function() {
        if (!checkLoginStatus()) {
            loginPop();
            return false;
        }
        var id = $($(this).parents()[2]).attr("data-conter-ul");
        //console.log(id);
        if (window.BP) {
            BP.send({
                event_id: 'G000P008',
                group_id: $_CONFIG.groupid,
                topic_id: $_CONFIG.topicid,
                circle_type: $_CONFIG.s_c,
                channel_id: 'in-pinglun'
            });
        }

        var $topObj = $("[data-left='"+id+"']").children("[data-node='commentBox']");
        var offsetTop = $topObj.offset().top;
        $("[data-tid='"+id+"']").children("textarea").focus();
        $('html,body').animate({
            'scrollTop': offsetTop
        }, 200);


    });
}




module.exports = {
	lodingMore : lodingMore,
	goComment :goComment
}
