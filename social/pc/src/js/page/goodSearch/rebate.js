/**
 *  商品搜索页面--返利、直降
 * @author Qiaoli
 */

var newUrl = require('./url');
var loading = require('./loading');

var $rebate = $('[data-action=rebate]');
var $drop = $('[data-action=drop]');
var active = 'active';

var isSelected = function(t) {
    var $this = $(t);
    console.log($this.text());
    if (!$this.hasClass(active)) {
        $this.addClass(active);
    } else {
        $this.removeClass(active);
    }
    loading();
    newUrl({
        rebate: !$rebate.hasClass(active) ? 0 : 1,
        drop: !$drop.hasClass(active) ? 0 : 1
    });
};

var init = function() {
    $rebate.on('click', function() {
        isSelected(this);
    });
    $drop.on('click', function() {
        isSelected(this);
    });
    $('[data-node=warning-icon]').on('click', function() {
        $('[data-node=search-warning]').hide();
    })
};

module.exports = {
    init: init
};