var $selector = $('[data-action="shopSelector"]');
var $selectList = $('[data-node="shopSelectList"]');
var timer;

var init = function(){

    $selector.on('mouseenter',function(){
        $selector.addClass('hover');
            $selectList.show();
    });

    $selector.on('mouseleave',function(){
        timer = setTimeout(function(){

            $selector.removeClass('hover');
            $selectList.hide();

        },200);
    });

    $selectList.on('mouseenter',function(){
        clearTimeout( timer );
    });

    $selectList.on('mouseleave',function(){
        $selector.removeClass('hover');
        $selectList.hide();
    });
}



module.exports = {
    init : init
}