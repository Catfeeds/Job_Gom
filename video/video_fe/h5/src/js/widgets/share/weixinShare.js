// <script src=" https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

import {page} from 'util/phpCommon';

let getUrl = function(){
    var loc = window.location;
    return loc.protocol + '//' + loc.hostname + loc.pathname;
};
let weixinShare = function(){
    // $('head').append('<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>');
    wx.ready(function(){
        var defaultImg = 'https://js.meixincdn.com/m/vm/dist/imgs/public/logo.png';
        var title = page.title || '国美视频';
        var imgUrl = page.imageUrl || defaultImg;
        var link = page.link || getUrl();
        var desc = page.shareDesc || '汇聚精彩视频';

        wx.checkJsApi({
            jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
                console.log('取消分享给qq')
            }
        }); 
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () { 
            // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
                console.log('取消分享给微博')
            }
        });     
        wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () { 
            // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
                console.log('取消分享给qq空间')
            }
        });  
    });
}

export default weixinShare;