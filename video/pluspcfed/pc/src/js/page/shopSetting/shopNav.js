function init() {
    var $userList = $('[data-node="user-list"]');
    var offsetTop =$userList.offset().top;
    $(window).on('scroll',function(){ 
        var scrollTop = $(window).scrollTop();
        if(scrollTop < offsetTop  ){
            $userList.removeClass('nav-fixed');
        }else{
            $userList.addClass('nav-fixed');
        }
    });
};
module.exports = {
    init: init
};