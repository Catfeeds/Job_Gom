var loginPop = require('module/popup/login'); //登录弹窗
var checkLoginStatus = require('module/checkLoginStatus');
var alert = require('module/popup/alert');
var fetch = require('io/fetch');
var url = require('io/url');

var $node = $("[data-node=createCircle]");
var LoginStatus = 0;
var gotoPage = function() {
    // var href = $node.attr("href");
    // location.href = href;
    var href = $node.attr("href").slice(1);
    fetch.post(url.get('createCircle1'), {
            // validate: true,
            // data: {
            //     groupid: groupId,
            //     imid: 'b_' + userid
            // }
            /*,
            onLogin: function (){
                $_CONFIG['islogin'] = '1';
                noRefreshFetch();
            }*/
            async: false
        }).done(function(data/*, textStatus, jqXHR*/) {
            if (data && data.success) {
                if (data.check === 0) {
                    if(LoginStatus == 1) {
                        alert("用户创建的圈子已达到上限");
                    } else if(LoginStatus == 2) {
                        alert("用户创建的圈子已达到上限", {
                            ok: function() {
                                window.location.reload();
                            }
                        });
                    }
                } else if (data.check === 1) {
                    if(LoginStatus == 1) {
                        window.open($_CONFIG['group_domain']+href);
                        window.location.reload();
                    } else if(LoginStatus == 2) {
                        window.open($_CONFIG['group_domain']+href);
                    }
                }
            }
        }).fail(function(/*jqXHR, textStatus, errorThrown*/) {
            // console.log(arguments);
        }).always(function() {
            // $els.attr('data-firing', 0);
        });
}

function init() {
    $node.on("click", function(event) {
        event.preventDefault();
        if (!checkLoginStatus()) {
            LoginStatus = 1;
            loginPop(gotoPage);
        } else {
            LoginStatus = 2;
            gotoPage();
        }
        return false;
    })
};

module.exports = {
    init: init
};
