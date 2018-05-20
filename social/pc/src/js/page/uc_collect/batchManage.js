/**
 * 批量管理
 * @author QiaoLi
 */

var $showBatch = $('[data-node=showBatch]');
var $hideBatch = $('[data-node=hideBatch]');
var $batch = $('[data-action=batch]');
var $cancelBatch = $('[data-action=cancelBatch]');
var $selectAll = $('[data-action=selectAll]');
var selectOne = '[data-action=selectOne]';
var selectLayer = '[data-node=selectLayer]';
var dataListBox = '[data-node=dataListBox]';
var delPopUp = '[data-node=delPopUp]';

var hide = 'hide';
var active = 'active';
var removeDel = 'remove-del';

//批量管理
var batchManage = function() {
    $hideBatch.removeClass(hide);
    $showBatch.addClass(hide);
    $(selectLayer).removeClass(hide);
    $(dataListBox).addClass(removeDel);
    $(delPopUp).addClass(hide);
    $(selectOne).removeClass(active);
    $selectAll.prop("checked", false);
};

//取消批量管理
var cancelBatch = function() {
    $hideBatch.addClass(hide);
    $showBatch.removeClass(hide);
    $(selectLayer).addClass(hide);
    $(dataListBox).removeClass(removeDel);
};

var init = function() {
    $batch.on('click', batchManage);
    $cancelBatch.on('click', cancelBatch);
};

module.exports = {
    init: init
};
