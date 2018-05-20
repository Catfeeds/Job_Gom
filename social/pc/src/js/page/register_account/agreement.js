//确认协议
var tips = require("module/i18n").login;

var agreeTip = $('[data-node=tip_agreement]');

var maskShow = function () {
    $("[data-node='mask']").css("display", "block");
};
var onCheck = function () {
    $('[data-node=check_agreement]').toggleClass("lg-radio-true");
    if ($('[data-node=check_agreement]').hasClass('lg-radio-true')) {
        agreeTip.addClass('hide');
    } else {
        agreeTip.html(tips.agreement).removeClass('hide');
    }
};
$('[data-node=agreement]').on("click", maskShow);
$('[data-node=check_agreement]').on('click', onCheck);
$('[data-node=pc-btnh45]').on("click", function () {
    $('[data-node=mask]').css("display", "none");
    $('[data-node=check_agreement]').addClass("lg-radio-true");
    agreeTip.addClass('hide');
});
$('[data-node=close_mask]').on("click", function () {
    $('[data-node=mask]').css("display", "none");
    $('[data-node=check_agreement]').removeClass("lg-radio-true");
    agreeTip.html(tips.agreement).removeClass('hide');
});