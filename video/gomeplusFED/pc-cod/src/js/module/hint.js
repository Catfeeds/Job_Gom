/*
 * 弹层提示弹窗
 * zhaodonghong
 */



var $publicMask;
var $publicTips;
var timer;


var events = function() {

    $publicMask.off().on('click', function() {
        $publicMask.hide();
        $publicTips.hide();
    });

    $publicTips.off().on('click', function() {
        $publicMask.hide();
        $publicTips.hide();
    });
}


/**
 * msg string 提示信息
 * options object 
 * options.duration settimout消失时间
 * options.callback 提示消失的回调
*/
var init = function(msg, options) {
    var defaults = {
        duration: 2000,
        callback: function() {}
    };

    $.extend(defaults, options || {});

    clearTimeout(timer);
    $publicMask = $('[data-action="publicMask"]');
    $publicTips = $('[data-action="publicTips"]');

    if ($publicMask.length > 0) {

        $publicMask.show();
        $publicTips.show().text(msg);

    } else {

        $('body').append('<div data-action="publicMask" class="ordi-toast"></div><div class="ordi-toast-txt" data-action="publicTips">' + msg + '</div>');
        $publicMask = $('[data-action="publicMask"]');
        $publicTips = $('[data-action="publicTips"]');
        events();
    }

    $publicTips.css('margin', -$publicTips[0].offsetHeight / 2 + 'px 0 0 ' + -$publicTips.width() / 2 + 'px');

    timer = setTimeout(function() {

        $publicMask.hide();
        $publicTips.hide();

        defaults.callback();

    }, defaults.duration);
};



module.exports = {
    init: init,
    events: events
};