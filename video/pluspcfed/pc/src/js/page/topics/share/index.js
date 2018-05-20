var share = require('module/share').shareto;
var shareBP = require('module/shareBP');
var groupId = $_CONFIG['group_id'];
var init = function() {
    var $body = $("body"),
        groupPicSrc = $('[data-node=groupPic]').attr('src');

    function isPic(groupPicSrc) {
        var reg = /\w+\.(jpg|gif|bmp|png)$/;
        if (groupPicSrc == $_CONFIG.imgpath + '/images/public/circle-default.png') {
            groupPicSrc = false;
        }
        return reg.test(groupPicSrc);
    }

    var getShareInfo = function() {
        var shareInfo = {
            url: location.href,
            title: $('[data-node=groupName]').html(),
            pic: isPic(groupPicSrc) ? groupPicSrc : $_CONFIG.imgpath + '/images/public/logo.jpg',
            summary: '这儿有我们志趣相投的小伙伴，快加入我们吧！',
            site: '国美'
        };
        return shareInfo;
    };

    var shareTo = function(type) {
        return function() {
            var info = getShareInfo();
            share[type](info);
            var opts = {
                    page: 'qz',
                    shareTo: type,
                    shareId: groupId
                }
            shareBP(opts);
                // analytic(type); // 发送统计数据
            return false;
        };
    };

    /*var channels = {
        'wx': 'out-weixin',
        'sina': 'out-xlwb',
        'qq': 'out-QQ',
        'qzone': 'out-Qqzone'
    };
    var analytic = function(channel) {
        BP.send({
            event_id: 'G000P007',
            group_id: $GLOBAL_CONFIG['group_id'],
            channel_id: channels[channel] || '',
            circle_type: $GLOBAL_CONFIG['s_c']
        });
    };*/
    $body.on('click', "[data-node=wx]", function() {
            // https://m.gomeplus.com/group/topic?topicId=575f7ed91940eb5c2587f56a
        share.weixin({
            url: "https://circle.m.gomeplus.com/circle-" + groupId + ".html"
        });
        var opts = {
            page: 'qz',
            shareTo: 'wx',
            shareId: groupId
        }
        shareBP(opts); //发送统计数据
        // analytic('wx'); // 发送统计数据        
    });
    $body.on('click', "[data-node=wb]", shareTo('wb'));
    $body.on('click', "[data-node=qq]", shareTo('qq'));
    $body.on('click', "[data-node=qzone]", shareTo('qz'));
}

module.exports = {
    init: init
}
