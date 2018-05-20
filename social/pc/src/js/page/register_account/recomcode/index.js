var fetch = require("io/fetch");
var url = require('io/url');
var moduleTrim = require("utils/trim");
var inputTip = require("module/i18n");

var $Form = $("[data-node=lg-form]");
var codeLi = $Form.find("[data-node='code_li']");
var codeInput = $Form.find("[data-node='code_input']");
var codeSkip = $Form.find("[data-node='code_skip']");
var codeComplete = $Form.find("[data-node='code_complete']");
var codeSpan = $Form.find('[data-node=code_span]');
var codeAllright = $Form.find('[data-node=code_allright]');

var codeopen = $Form.find('[data-node=recommend_open]');
var codeopenIcon = $Form.find('[data-node=recommend_icon]');

var codeEvents = {
    onfocus: function () {
        codeSpan.css("visibility", "hidden");
        codeAllright.css("visibility", "hidden");
    },
    onblur: function () {
        var val = codeInput.val();
        if (moduleTrim(codeInput.val()) != "") {
            fetch.post(url.get("checkRecommendationCode"), {data: {"referralCode": val}}).done(function (data, textStatus, XHR) {
                if (data.success) {
                    codeInput.attr({"data-code": "0", "data-userId": data.data.userId});
                    codeAllright.css('visibility', 'visible');
                } else {
                    codeInput.attr({"data-code": "1", "data-userId": "false"});
                    codeSpan.html(inputTip.refCode.err).css({"visibility": "visible", "color": "#F95353"});
                    codeAllright.css("visibility", "hidden");
                }
            }).fail(function (XHR, textStatus, errorThrown) {
                alert("数据请求失败 请稍后尝试");
            });
        } else {
            codeInput.attr({"data-userId": ""});
            if( codeInput.val().length>0 ){
                codeSpan.html(inputTip.refCode.err).css({"visibility": "visible", "color": "#F95353"});
            }
        }
    },
    oninput: function () {
        var val = codeInput.val();
        if (moduleTrim(codeInput.val()) != "") {
            codeInput.attr({"data-userId": val});
        } else {
            codeInput.attr({"data-userId": ""});
        }
    }
};
//推荐码输入框绑定事件
var init = function (){
    codeInput.on({
        focus: codeEvents.onfocus,
        blur: codeEvents.onblur,
        input: codeEvents.oninput
    });
}

//展开/关闭推荐码输入框v
var codeopenFn = function (){
    if( codeLi.hasClass('hide') ){
        codeLi.removeClass('hide');
        codeopenIcon.attr('class','iconn-1');
    }else{
        codeLi.addClass('hide');
        codeopenIcon.attr('class','iconn-2');
    }
} 
codeopen.on('click',codeopenFn);
codeopenIcon.on('click',codeopenFn);

module.exports = init();