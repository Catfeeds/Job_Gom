var alert = require('module/popup/alert');
var initDialog = require('module/popup/onekeydeliver');
var confirm = require('module/popup/confirm');
var url = require('io/url');
var fetch = require('io/fetch');


//判断是否屏蔽联系商家
if ($_CONFIG['type'] == 6 || $_CONFIG['type'] == 7) {
    $("[data-node=tell_buger]").addClass("disabled");
} else {
    $("[data-node=tell_buger]").on("click", function() {
        var imgPath = $_CONFIG['imgpath'];
        alert('<div class="sm-download"><img src="' + imgPath + '/images/public/ma1.jpg"><p>描二维码，下载国美PlusAPP查看消息</p></div>');
    });
}


$("[data-node=clickBtn]").on("click", function() {
    var id = $("[data-node=goods_id]").html();
    if ($(this).hasClass("sendgoods")) {
        initDialog(id, callBackFn);
    } else if ($(this).hasClass("getgoods")) {
        homeService(id);
    }
});

function callBackFn() {
    window.location.reload();
    return false;
}
// 上门取件弹出框
var homeService = function(id) {
    var pid = id;
    var pSpan = "确认商家已上门取货？";
    var titSpan = "商家取货后请点击“确定”按钮确认，以免耽误您的退款。";
    confirm('提示', {
        width: 600,
        //height:130,
        fixed: true,
        modal: true,
        title: '提示',
        content: '<h3 class="two-title" data-idShure=' + pid + ' data-node="shureP" >' + pSpan + '</h3><p class="pay-pop-p   pay-pop-text">' + titSpan + '</p><div data-node="togoleDiv"  style="text-align:center;font-size:12px;color:red;padding-bottom:10px;" ></div>',
        className: 'pop-box pop-pad-btm65',
        okCls: 'pc-btn pc-btnh40 pc-btnw120',
        cancelCls: 'queren-btn pc-btnh40 pc-btnw120',
        ok: function() {
            $("[data-node=togoleDiv]").html("");
            fetch.get(url.get('orderSendGood') + "?orderid=" + id).then(function(data) {
                if (data.success) {
                    //刷新页面
                    $("button[i=close]").click();
                    window.location.reload();
                } else {
                    $("[data-node=togoleDiv]").html("* 请求失败，请重新点击");
                    $("[data-node=togoleDiv]").removeClass("hide").addClass("show");
                }
            });
            return false;
        },
        btnWrapCls: 'two-buttons'
    });
}

// function addFn(){
// 	window.location.reload();
// }
