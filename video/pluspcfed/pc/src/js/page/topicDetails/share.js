var share = require('module/share').shareto;
var shareBP = require('module/shareBP');

var init = function() {
    var $body = $("body");
    //var $wx = $('[data-node=wx]');
    // var $wb = $('[data-node=wb]');
    //var $qq = $('[data-node=qq]');
    //var $qzone = $('[data-node=qzone]');

    var gomeplusLogo = $_CONFIG.imgpath + '/images/public/down-logo.png';

    var getShareInfo = function($node) {
        var $ul = $node.closest('ul');
        var shareInfo = {
            url: $ul.data('surl'),
            title: $ul.data('stitle'),
            pic: $ul.data('spic') || gomeplusLogo,
            summary: $ul.data('content') || "这里有志趣相投的小伙伴，机智诙谐的猛料，还有你"
                //desc: $ul.data('content')
        };
        return shareInfo;
    };

    var shareTo = function(type) {
        return function() {
            var info = getShareInfo($(this));
            //console.log(info);
            var topicId = $(this).closest('.topic-conter').attr("data-conter-ul");
            //console.log(topicId);
            share[type](info);
            // analytic(type, topicId); // 发送统计数据
            var opts = {
                page: 'ht',
                shareTo: type,
                shareId: topicId
            }
            shareBP(opts);
            return false;
        };
    };

    var evtType = 'click';
    var $conf = $_CONFIG;

    /*var channels = {
        'wx': 'out-weixin',
        'sina': 'out-xlwb',
        'qq': 'out-QQ',
        'qzone': 'out-Qqzone'
    };
    var analytic = function(channel, topicId) {
        BP.send({
            event_id: 'G000P008',
            group_id: $conf.groupid,
            topic_id: topicId,
            circle_type: $conf.s_c,
            channel_id: channels[channel] || ''
        });
    };*/
    $body.on(evtType, "[data-node='wx']", function() {
        // 当前话题页所对应的wap页的地址
        // https://m-pre.gomeplus.com/group/topic?topicId=56dfeac86af14853711f4668
        var topicid = $(this).closest('.topic-conter').attr("data-conter-ul");
        share.weixin({
            url: $_CONFIG.wap_circle_url + '/topic-' + topicid + '.html'
                //url: "https://circle.m.gomeplus.com/topic-" + topicid + ".html"
        });

        // analytic('wx'); // 发送统计数据
        var opts = {
            page: 'ht',
            shareTo: 'wx',
            shareId: topicid
        };
        shareBP(opts); //发送统计数据
        return false;
    });
    $body.on(evtType, "[data-node='wb']", shareTo('wb'));
    $body.on(evtType, "[data-node='qq']", shareTo('qq'));
    $body.on(evtType, "[data-node='qzone']", shareTo('qz'));
};

module.exports = {
    init: init
}
