require('spinner');

var $stockBox = $('[data-node="stockBox"]');
var $repert = $('[data-node="repert"]');
var $min = $('[data-spin="down"]');
var $max = $('[data-spin="up"]');
var oSpinner = null;
var init = function() {
    var max = 20;
    if ($_CONFIG.prodType !== '1') {
        max = parseInt($stockBox.attr('data-sumstock'), 10) > 20 ? 20 : parseInt($stockBox.attr('data-sumstock'), 10);
    } else {
        max = parseInt($repert.text(), 10);
        max = max > 20 ? 20 : max;
    }
    $('[data-trigger=spinner]').spinner({
        delay: 200,
        min: 1,
        max: max,
        rangemin: function() {
            $min.addClass('disabled');
        },
        rangemax: function() {
            $max.addClass('disabled');
        },
        changed: function(e, newVal/*, oldVal*/) {
            if (newVal > 1) $min.removeClass('disabled');
            if (newVal === 1) $min.addClass('disabled');
            newVal === oSpinner.spinning.max || newVal > oSpinner.spinning.max ? $max.addClass('disabled') : $max.removeClass('disabled');
            if (oSpinner.spinning.max === 0) {
                oSpinner.spinning.setMax(1);
            }
            if (newVal === 0) {
                $('[data-node="count"]').val(1);
            }
        }
    });
    $('[data-node="count"]').val(1);
    oSpinner = $('[data-trigger=spinner]').data('spinner');
}

module.exports = {
    init: init
};
