define('conf/chocolate/chocolate.js', function (require) {
    require('$');
    require('mods/buried.js');
    var base64 = require('utils/base64.js');
    var Ajax = require('utils/ajax.js');
    var dropload = require('UI/dropload.js');
    //分享参数;
    var title='【国美Plus】浓情巧克力，享受夏日';
    var link=shareUrl;
    var desc='浪漫来袭，纵想甜蜜，更多优选爆品等你来！';
    var imgUrl=shareImgUrlPrefix+'/images/module/h5-chocolate/share.jpg';
    var coquetryUrl = encodeURIComponent(location.href);
    //页面加载就进行微信分享配置;
    //分享到微信;
    wx.ready(function () {
        wx.hideAllNonBaseMenuItem();//隐藏所以的按钮
        wx.showMenuItems({         //显示需要的按钮
            menuList: ['menuItem:share:timeline','menuItem:share:appMessage','menuItem:favorite','menuItem:openWithSafari'] // 要显示的菜单项，所有menu项见附录3
        });
        wx.onMenuShareTimeline({     //分享到朋友圈
            title: title, // 分享标题
            link: link, // 分享链接
            desc: desc, //分享描述
            imgUrl: imgUrl, // 分享图标
            success: function () {
                //alert('成功分享到朋友圈');
            },
            cancel: function () {
                //alert('取消分享朋友圈');
            }
        });
        wx.onMenuShareAppMessage({   //分享给朋友
            title:title, // 分享标题
            desc:desc, // 分享描述
            link:link, // 分享链接
            imgUrl:imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                //alert('成功分享到朋友');
            },
            cancel: function () {
                //alert('取消分享给朋友');
            }
        });
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                //alert('成功分享到QQ');
            },
            cancel: function () {
                //alert('取消分享到QQ');
            }
        });
    });
    //页面埋点js
    BP.send({event_id:'P714W001',url:ShareUrl,name:'活动页面',cook_id:'',user_id:''});
    $('body').on('click', '.chocolate-shop',function(){
        var productid = $(this).attr('productid');
        var shopid = $(this).attr('shopid');
        var producturl = $(this).attr('producturl');
        BP.send({
            event_id:'G714W001',
            url:coquetryUrl,
            name:'活动商品位',
            user_id:'',
            shop_id:base64.encode(shopid),
            produce_id:base64.encode(productid)
        });
        location.href = producturl;
    });
    $('body').on('click', '.activate',function(){
        var activateurl = $(this).attr('activateurl');
        BP.send({
            event_id:'B714W001',
            url:coquetryUrl,
            name:'活动商品位',
            cookid: '',
            user_id: ''
        });
        location.href = activateurl;
    });
    //下拉刷新
    var droploadUp = $('body').dropload({
        loadUpFn: function (me) {
            setTimeout(function () {
                me.resetload();
                location.reload(true);
            }, 500);
        }
    });
});