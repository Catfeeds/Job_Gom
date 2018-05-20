/**
 * 商品左右滑动切换
 * @author Zhengchun Fu
 */
var slider = function(options) {
    var defaults = {
        element: '#slider',
        leftBtn: '[data-action=sliderLeft]',
        rightBtn: '[data-action=sliderRight]',
        list: '[data-node=sliderList]',
        tabDot: '[data-node=sliderTabDot]',
        children: 'li',
        speed: 200,
        showLength: 5,
        moveLength: 1,
        showTab: false
    };
    $.extend(defaults, options);
    var speed = defaults.speed;
    var index = 0;
    var tabDotIndex = 0;
    var $slider = $(defaults.element);
    var hideCls = 'hide';

    var getTabDotHTML = function(len) {
        // show tab
        var tabHTML = '';
        var activeStr = 'class="active"';
        for (var i = 0; i < len; i++) {
            activeStr = i === 0 ? activeStr : '';
            tabHTML += '<a href="javascript:;" ' + activeStr + '>' + i + '</a>';
        }
        return tabHTML;
    };

    $.each($slider, function(i, o) {
        var $left = $(o).find(defaults.leftBtn);
        var $right = $(o).find(defaults.rightBtn);
        var $list = $(o).find(defaults.list);
        var $li = $list.children(defaults.children);

        var liLen = $li.length;
        var liW = $li.outerWidth(true);
        var overIndex = defaults.showLength;

        var tabDotHTML;

        $list.css({
            width: liW * liLen
        });

        if (defaults.showTab) {
            tabDotHTML = getTabDotHTML(Math.ceil(liLen / defaults.showLength));
            $(o).find(defaults.tabDot).html(tabDotHTML);
        }

        $(o).on('click', defaults.leftBtn, function() {
            var left = 0;
            index -= defaults.moveLength;
            left = -liW * index;
            if (defaults.showTab) {
                tabDotIndex--;
                $(o).find(defaults.tabDot).find('a').eq(tabDotIndex).addClass('active').siblings('a').removeClass('active');
            }

            if (index <= 0) {
                $left.addClass(hideCls);
            }
            if (index <= liLen - overIndex) {
                $right.removeClass(hideCls);
            }

            $list.stop().animate({
                'left': left
            }, speed, function() {});
        });

        $(o).on('click', defaults.rightBtn, function() {
            var left = 0;
            if (defaults.showTab) {
                tabDotIndex++;
                $(o).find(defaults.tabDot).find('a').eq(tabDotIndex).addClass('active').siblings('a').removeClass('active');
            }
            index += defaults.moveLength;
            left = -liW * index;
            if (index >= liLen - overIndex) {
                $right.addClass(hideCls);
            }
            if (index > 0) {
                $left.removeClass(hideCls);
            }
            $list.stop().animate({
                'left': left
            }, speed, function() {});
        });
    });
};

module.exports = slider;