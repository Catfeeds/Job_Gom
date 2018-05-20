/**
 * 选择留言类型
 * @author QiaoLi
 */

var $typeList = $('[data-node=typeList]');
var active = 'active';

//选择类型
var chooseType = function() {
    var $this = $(this);
    if ($this.hasClass(active)) {
        return false;
    } else {
        $typeList.find('a').removeClass(active);
        $this.addClass(active);
    }
};

var init = function() {
    $typeList.on('click', 'a', chooseType);
};

module.exports = {
    init: init
};
