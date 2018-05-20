var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');

var popTpl = "<p data-node='alertTitle' class='dialog_p'>申请已发送，请耐心等待</p><img data-node='QRcode' src=''><p class='dialog_p'>下载国美+APP随时关注</p>";
var noop = function() {};

var join = function(selector, done) {
    var $ele = $(selector);
    $ele.on('click', function() {
        var groupId = $ele.data('groupid');
        var bpData = {
            event_id: $ele.attr('event-id'), // 埋点数据
            group_id: groupId,
            circle_type: $GLOBAL_CONFIG['s_c'] // 2级分类
        };
        if ($GLOBAL_CONFIG['topicid']) {
            bpData.topic_id = $GLOBAL_CONFIG['topicid'];
        }
        // 发送统计数据
        if (window.BP !== undefined) {
            BP.send(bpData);
        }

        if ($ele.data('verif') == 1) {
            alert('您已提交申请，请等待审核');
            return;
        }
        var firing = $ele.data('firing');
        if (firing === 1) {
            return false;
        }
        $ele.data('firing', 1);
        var userid = $ele.data('userid');
        var approvaltype = $ele.data('approvaltype');

        var noRefreshFetch = function(){
             fetch.post(url.get('joinCircle'), {
                validate: true,
                data: {
                    groupid: groupId,
                    imid: 'b_' + userid
                },
                onLogin:noRefreshFetch
            }).done(function(data, textStatus, jqXHR) {
                if (data && data.code === 200 && data.success) {
                    if (data.data.status === 0) {
                        alert('恭喜您已经加入圈子！');
                        $ele.hide();
                    } else if (data.data.status === 1) {
                        // alert('申请已发送，请耐心等待');
                        var Dialog = alert('', {
                            width: "500px",
                            content: popTpl,
                            cancel: false
                        });
                        $('[data-node=QRcode]').attr('src', $_CONFIG.imgpath + '/images/public/down-ma.png');
                        $('.dialog_p').css({
                            'text-align': 'center',
                            'margin': '10px 0px',
                            'font-size': '1.5em'
                        });
                        $('[data-node=QRcode]').css({
                            'margin-left': '173px'
                        });
                        $ele.css('background', '#CCC').html('审核中').off();
                    }
                    done();
                } else {
                    if (data.message == '圈子拒绝加入' || data.code === 403) {
                        alert('抱歉！该圈子不允许任何人加入！');
                    } else if ( data.code === 409 ){
                        alert(data.message);
						$ele.hide();		
                        done();
                    } else {
                        alert(data.message);
                    }
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                // console.log(arguments);
            }).always(function() {
                $ele.data('firing', 0);
            });

        }
       noRefreshFetch();

        return false;
    });
};
module.exports = join;