var share = require('module/share').shareto;

var init = function() {
    var $wx = $('[data-node=wx]');
    var $wb = $('[data-node=wb]');
    var $qq = $('[data-node=qq]');
    var $qzone = $('[data-node=qzone]');

    var gomeplusLogo = $_CONFIG.imgpath + '/images/public/down-logo.png';

    var getShareInfo = function($node) {
        var $ul = $node.closest('ul');
        var shareInfo = {
            url: $ul.data('surl'),
            title: $ul.data('stitle'),
            pic: $ul.data('spic') || gomeplusLogo,
            desc: $ul.data('content')
        };
        return shareInfo;
    };

    var shareTo = function(type) {
        return function() {
            var info = getShareInfo($(this));
            share[type](info);
            analytic(type); // 发送统计数据
            return false;
        };
    };

    var evtType = 'click';
    var $conf = $GLOBAL_CONFIG;

    var channels = {
        'wx': 'out-weixin',
        'sina': 'out-xlwb',
        'qq': 'out-QQ',
        'qzone': 'out-Qqzone'
    };
    var analytic = function(channel) {
        BP.send({
            event_id: 'G000P008',
            group_id: $conf.groupid,
            topic_id: $conf.topicid,
            circle_type: $conf.s_c,
            channel_id: channels[channel] || ''
        });
    };
    $wx.on(evtType, function() {
        // 当前话题页所对应的wap页的地址
        // https://m-pre.gomeplus.com/group/topic?topicId=56dfeac86af14853711f4668
        share.weixin({
            url: $_CONFIG.wap_url + 'group/topic?topicId=' + $conf.topicid
        });
        analytic('wx'); // 发送统计数据
        return false;
    });
    $wb.on(evtType, shareTo('sina'));
    $qq.on(evtType, shareTo('qq'));
    $qzone.on(evtType, shareTo('qzone'));
};

module.exports = {
    init: init
}