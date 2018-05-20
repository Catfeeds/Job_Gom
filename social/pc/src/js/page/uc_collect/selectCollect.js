/**
 * 单选/全选商品、店铺、话题
 * @author QiaoLi
 */

var $collectList = $('[data-node=collectList]');
var $selectAll = $('[data-action=selectAll]');
var selectOne = '[data-action=selectOne]';

var active = 'active';

//单选
var selectSingle = function() {
    var $this = $(this);
    if ($this.hasClass(active)) {
        $this.removeClass(active);
        $selectAll.prop("checked", false);
    } else {
        $this.addClass(active);
        if (!$('[data-action=selectOne]:not(.active)').length) {
            $selectAll.prop("checked", true);
        }
    }
};

//全选
var selectAll = function() {
    if ($selectAll.prop("checked")) {
        $(selectOne).addClass(active);
    } else {
        $(selectOne).removeClass(active);
    }
};

var init = function() {
    $selectAll.on('click', selectAll);
    $collectList.on('click', selectOne, selectSingle);
};

module.exports = {
    init: init
};
