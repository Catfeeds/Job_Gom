var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var tips = require("module/i18n").circle;

// var popTpl = "<p data-node='alertTitle' class='dialog_p'>申请已发送，请耐心等待</p><img data-node='QRcode' src=''><p class='dialog_p'>下载国美PlusAPP随时关注</p>";

var join = function (event){
    var $els = event.data?event.data.selector||$(this):$(this);
    var done = event.data?event.data.done||function (){}:function (){};
    var groupId = $els.attr('data-groupid'),
        bpData = {
            event_id: $els.attr('event-id'), // 埋点数据
            group_id: groupId,
            circle_type: $_CONFIG['s_c'] // 2级分类
        };
    if ($_CONFIG['topicid']) {
        bpData.topic_id = $_CONFIG['topicid'];
    }
    // 发送统计数据
    if (window.BP !== undefined) {
        BP.send(bpData);
    }

    if ($els.attr('data-verif') == 1) {
        alert('您已提交申请，请等待审核');
        return;
    }
    var firing = $els.attr('data-firing');
    if (firing == 1) {
        return false;
    }
    $els.attr('data-firing', 1);
    var userid = $els.attr('data-userid');
    // var approvaltype = $els.attr('data-approvaltype');
    var noRefreshFetch = function() {
        fetch.post(url.get('joinCircle'), {
            validate: true,
            data: {
                groupid: groupId,
                imid: 'b_' + userid
            },
            onLogin: function (){
                $_CONFIG['islogin'] = '1';
                noRefreshFetch();
            }
        }).done(function(data/*, textStatus, jqXHR*/) {
            if (data && data.code === 200 && data.success) {
                if (data.data.status === 0) {
                    alert(tips.joinSuccess);
                    $els.html('退出圈子');
                } else if (data.data.status === 1) {
                    // alert('申请已发送，请耐心等待');
                    // var Dialog = alert('', {
                    //     width: "500px",
                    //     content: popTpl,
                    //     cancel: false
                    // });
                    $('[data-node=QRcode]').attr('src', $_CONFIG.imgpath + '/images/public/down-ma.png');
                    $('.dialog_p').css({
                        'text-align': 'center',
                        'margin': '10px 0px',
                        'font-size': '1.5em'
                    });
                    $('[data-node=QRcode]').css({
                        'margin-left': '173px'
                    });
                    $els.css('background', '#CCC').html('审核中').off();
                }
                done('join');
            } else {
                if (data.message == '圈子拒绝加入' || data.code === 403) {
                    alert(tips.cannotJoinCircle);
                } else if (data.code === 409) {
                    alert(data.message);
                    done('join');
                } else {
                    alert(data.message);
                }
            }
        }).fail(function(/*jqXHR, textStatus, errorThrown*/) {
            // console.log(arguments);
        }).always(function() {
            $els.attr('data-firing', 0);
        });
    };
    var exitCircle = function (){
        fetch.post(url.get('exitCircle'), {
            data: {
                groupid: groupId
            }
        }).done(function(data/*, textStatus, jqXHR*/) {
            if (data && data.code == 200 && data.success) {
                alert(tips.exit);
                $_CONFIG['member_type'] = 1;
                $els.html('加入圈子');
            }else{
                if( data.code == 410 ){
                    alert(tips.dissolved,{
                        ok:function (){
                            location.reload();
                        },
                        onclose:function (){
                            location.reload();
                        }
                    });
                }else if (data.code == 404){
                    location.reload();
                }
            }
        }).fail(function(/*jqXHR, textStatus, errorThrown*/) {
            // console.log(arguments);
        }).always(function() {
            $els.attr('data-firing', 0);
        });
    }
    if( $_CONFIG['member_type'] == 0 ){
        exitCircle();
    }else{
        noRefreshFetch();
    }
    return false;
}
module.exports = join;