var praise = require('module/praise');

var $praiseClick = $("[data-node=praiseClick]");

 if($praiseClick.children("em").hasClass("active")){
    	$praiseClick.children("span").html("取消点赞");
    }

var init = function(){
    praise('[data-node=ulFloat]', '[data-node=praiseClick]', {
        mode: 'normal'
    });
   /* praise('[data-node=hot_topics]', '[data-action=like]', {
        mode: 'normal'
    });
    */
   
    return false;
};

module.exports = {
    init: init
};
