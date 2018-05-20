/**
 * 单选/全选商品、店铺、话题
 * @author QiaoLi
 */

var $collectList = $('[data-node=collectList]');
var $selectAll = $('[data-action=selectAll]');
var selectOne = '[data-action=selectOne]';
var $selectSpan = $('[data-action=selectAll] span');

var active = 'active';

//单选
var selectSingle = function() {
    var $this = $(this);
    if ($this.hasClass(active)) {
        $this.removeClass(active);
        $selectSpan.removeClass(active);
    } else {
        $this.addClass(active);
        if (!$('[data-action=selectOne]:not(.active)').length) {
            $selectSpan.addClass(active);
        }
    }
};

//全选
var selectAll = function() {
    if (!$selectSpan.hasClass(active)) {
        $(selectOne).addClass(active);
        $selectSpan.addClass(active);
    } else {
        $(selectOne).removeClass(active);
        $selectSpan.removeClass(active);
    }
};

var init = function() {
    $selectAll.on('click', selectAll);
    $collectList.on('click', selectOne, selectSingle);
};

module.exports = {
    init: init
};
