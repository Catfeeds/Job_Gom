//手机号验证
var moduleTrim = require("utils/trim");
var inputTip = require("module/i18n");
var setPhoneNumber = function () {
    var reg = /^1[3|4|5|7|8][0-9]\d{8,8}$/g;
    var wrongNumber = function (msg) {
        $("[data-node='phone_number']").addClass("lg-form-error").attr("data-verification", "1");
        $("[data-node='tip_phone_number']").html(msg).css("visibility", "visible");
    };
    var val = this.value;
    if (moduleTrim(val) == "") {
        // this.select();
        return wrongNumber(inputTip.tel.ept);
    } else if (!reg.test(val)) {
        return wrongNumber(inputTip.tel.err)
    } else {
        $("[data-node='phone_number']").removeClass("lg-form-error").attr("data-verification", "0");
        $("[data-node='tip_phone_number']").css("visibility", "hidden");
        $("[data-node='phone_number_allright']").css("visibility", "visible");

    }
};
$("[data-node='phone_number'] input[type = 'text']").on({
    blur: setPhoneNumber,
    focus: function () {
        $("[data-node='phone_number']").removeClass("lg-form-error");
        $("[data-node='phone_number_allright']").css("visibility", "hidden");
        $("[data-node='tip_phone_number']").css("visibility", "hidden");
    }
});