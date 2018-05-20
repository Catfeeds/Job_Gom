define('conf/hometextile/hometextile.js', function (require, exports, module) {
    require('$');
    require('mods/buried.js');
    var base64 = require('utils/base64.js');
    var Ajax = require('utils/ajax.js');
    var dropload = require('UI/dropload.js');
    //分享参数;
    var title='【国美Plus】品质生活 精致家纺的奥义';
    var link=shareUrl;
    var desc='跟着睡眠五部曲来一起领略精致家装的奥义吧！';
    var imgUrl=shareImgUrlPrefix+'/images/module/h5-hometextile/share.jpg';
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
    BP.send({event_id:'P630W001',url:coquetryUrl,name:'活动页面',cook_id:'',user_id:''});
    /*AppInterface.call('/common/statistics', {
        code:'P630W001',
        desc:'活动页面',
        url:coquetryUrl,
        cook_id:'',
        user_id:''
    });*/
    $('body').on('click', '.hometextile-shop',function(){

        if(location.href.indexOf("m.gomeplus.com") != -1){
            var productid = $(this).attr('productid');
            var shopid = $(this).attr('shopid');
            var producturl = "https://m.gomeplus.com/" + $(this).attr('producturl');
        }else{
            var productid = $(this).attr('test_productid');
            var shopid = $(this).attr('test_shopid');
            var producturl = "https://m-pre.gomeplus.com/" + $(this).attr('test_producturl');
        }
        /*AppInterface.queue(function(){
            AppInterface.call('/common/statistics', {
                code: 'G630W001',
                name: '活动商品位',
                url: coquetryUrl,
                user_id: '',
                shop_id: base64.encode(shopid),
                product_id: base64.encode(productid)
            });
        });*/
        BP.send({
            event_id:'G630W001',
            url:coquetryUrl,
            name:'活动商品位',
            user_id:'',
            shop_id:base64.encode(shopid),
            produce_id:base64.encode(productid)
        });
        location.href = producturl;
    });
    $('body').on('click', '.activate',function(){
        if(location.href.indexOf("m.gomeplus.com") != -1){
            var activateurl = "https://m.gomeplus.com/" + $(this).attr('activateurl');
        }else{
            var activateurl = "https://m-pre.gomeplus.com/" + $(this).attr('activateurl');
        }
        /*AppInterface.queue(function(){
            AppInterface.call('/common/statistics', {
                code: 'G630W002',
                name: '更多活动位',
                url: coquetryUrl,
                cookid: '',
                user_id: ''
            });
        });*/
        BP.send({
            event_id:'G630W002',
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