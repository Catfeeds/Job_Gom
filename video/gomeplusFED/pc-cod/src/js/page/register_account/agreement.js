//确认协议
var maskShow = function () {
    $("[data-node='mask']").css("display", "block");
};
var onCheck = function () {
    $('[data-node=check_agreement]').toggleClass("lg-radio-true");
    if ($('[data-node=check_agreement]').hasClass('lg-radio-true')) {
        $('[data-node=complete]').css('background', '#e71246');
    } else {
        $('[data-node=complete]').css('background', '#CCC');
    }
};
$('[data-node=agreement]').on("click", maskShow);
$('[data-node=check_agreement]').on('click', onCheck);
$('[data-node=pc-btnh45]').on("click", function () {
    $('[data-node=mask]').css("display", "none");
    $('[data-node=check_agreement]').addClass("lg-radio-true");
    $('[data-node=complete]').css('background', '#e71246');
});
$('[data-node=close_mask]').on("click", function () {
    $('[data-node=mask]').css("display", "none");
    $('[data-node=check_agreement]').removeClass("lg-radio-true");
    $('[data-node=complete]').css('background', '#CCC');
});