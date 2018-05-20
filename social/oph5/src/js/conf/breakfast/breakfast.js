define('conf/breakfast/breakfast.js', function (require) {
    require('$');
    require('mods/buried.js');
    var base64 = require('utils/base64.js');
    var Ajax = require('utils/ajax.js');
    var dropload = require('UI/dropload.js');
    //分享参数;
    var title='元气早餐';
    var link=shareUrl;
    var desc='清晨，一顿元气快手早餐，能够带给我们活力和健康，让我们精彩地度过美好的一天！点开吧，你喜欢的元气早餐在这里！';
    var imgUrl=shareImgUrlPrefix+'/images/module/h5-breakfast/share.jpg';
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
    BP.send({event_id:'P727W001',url:coquetryUrl,name:'活动页面',cook_id:'',user_id:''});
    $('body').on('click', '.breakfast-shop',function(){
        var productid = $(this).attr('productid');
        var shopid = $(this).attr('shopid');
        var producturl = $(this).attr('producturl');
        BP.send({
            event_id:'G727W001',
            url:coquetryUrl,
            name:'活动商品位',
            user_id:'',
            shop_id:base64.encode(shopid),
            produce_id:base64.encode(productid)
        });
        location.href = producturl;
    });
    $('.activate').on('click',function(){
        var activateurl = $(this).attr('activateurl');
        BP.send({
            event_id:'B727W001',
            url:coquetryUrl,
            name:'活动商品位',
            cookid: '',
            user_id: ''
        });
        location.href = activateurl;
    })    
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