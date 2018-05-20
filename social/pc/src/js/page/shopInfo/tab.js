var $fixMenu = $('[data-node=fixMenu]');
var $detailMenu = $('[data-node=detail-menu]');
var $menuTab = $('[data-node=detail-menu] a');
var $searchBox = $('[data-node=searchBox]');

var fix = 'fixed-menu';
var active = 'active';

var offsetTop = $detailMenu.offset().top;
var wScrollTop = $(window).scrollTop();

//menu定位到顶部
var elementFixed = function() {
    if (wScrollTop >= offsetTop) {
        $fixMenu.addClass(fix);
        $searchBox.hide();
    } else {
        $fixMenu.removeClass(fix);
        $searchBox.show();
    }
};

//点击menu a标签增加选中标签
var changeContent = function(t) {
    var $this = $(t);
    var index = $menuTab.index($this);
    $menuTab.removeClass(active).eq(index).addClass(active);
};

var init = function() {
    elementFixed();
    $(window).on('scroll', function() {
        wScrollTop = $(window).scrollTop();
        elementFixed();
    });
    $detailMenu.on('click', 'a', function() {
        changeContent(this);
    });

};

module.exports = {
    init: init
};
