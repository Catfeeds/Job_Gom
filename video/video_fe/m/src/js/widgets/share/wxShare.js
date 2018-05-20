import {page} from 'util/phpCommon';

let getUrl = function(){
    var loc = window.location;
    return loc.protocol + '//' + loc.hostname + loc.pathname;
};
let weixinShare = function(){
    // var script = document.createElement('script');
    // script.onload = function(){
    if(window.wx && wx.ready && wx.checkJsApi){
        wx.ready(function(){
            var title = page.title || '国美视频'; // 分享标题
            var desc = page.shareDesc || '汇聚精彩视频'; // 分享描述
            var link = page.link || getUrl();  // 分享链接
            var imgUrl = page.imageUrl || 'http://js.meixincdn.com/m/vm/dist/imgs/public/logo.png'; // 分享图标

            var success = function(){};// 用户确认分享后执行的回调函数
            var cancel = function(){}; // 用户取消分享后执行的回调函数

            var shareParam = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                success: success,
                cancel: cancel
            };

            wx.checkJsApi({
                jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            });
            wx.onMenuShareTimeline({
                title: title,
                link: link,
                imgUrl: imgUrl,
                success: success,
                cancel: cancel
            });
            wx.onMenuShareAppMessage({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: success,
                cancel: cancel
            });
            wx.onMenuShareQQ(shareParam); 
            wx.onMenuShareWeibo(shareParam);     
            wx.onMenuShareQZone(shareParam);
        });
    }
    // };
    // script.src = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js';
    // $('head').append(script);
}

export default weixinShare();
