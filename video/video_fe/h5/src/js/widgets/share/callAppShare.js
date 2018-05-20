import bridge from 'util/bridge';
import {page} from 'util/phpCommon';

let callAppShare = function(){
    var getUrl = function(){
        var loc = window.location;
        return loc.protocol + '//' + loc.hostname + loc.pathname;
    };
    bridge.ready(function(){
        // iOS下,location.href会在链接后面跟上一长串标识,在页面没有输出link的时候,这个很长的链接会导致微博分享失败,所以,单独拼装url
        bridge.setHeadBar({
            link: page.link || getUrl(),
            title: page.title || '国美视频',
            imageUrl: page.imageUrl || 'https://js.meixincdn.com/m/vm/dist/imgs/public/logo.png',
            shareDesc: page.shareDesc || '汇聚精彩视频'
        });
    });
};

export default callAppShare;
