
define('conf/templet/templet.js', function (require, exports, module) {
    require('$');
    var common = require('mods/common');
    var storage = require('mods/storage');
    var share = require('mods/share.js');
    var base64 = require('utils/base64');
    var dropload = require('UI/dropload.js');
    var Swiper = require('UI/swiper.min');
    require('vendors/lazyload.js');
    //懒加载
    $("img").picLazyLoad({effect: "fadeIn"});
    //分享参数;
    var title=shareTitle;
    var link=shareLink;
    var desc=shareDesc;
    var imgUrl=shareImg.indexOf("https") != -1 ? shareImg.replace("https","http") : shareImg;
    var coquetryUrl = encodeURIComponent(location.href);
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
    BP.send({event_id:'P728W001',url:coquetryUrl,name:'活动页面',cook_id:'',user_id:''});
    var mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 4.5,
      // spaceBetween: 1, 
    })
    var mySwiper = new Swiper('.swiper-container2', {
     slidesPerView: 3.5,
     slidesPerView : 'auto',
     // roundLengths : true, 
    })
    var mySwiper = new Swiper('.swiper-container3', {
     direction : 'vertical',
     slidesPerView: 'auto',
     // roundLengths : true, 
    })
    var mySwiper = new Swiper('.swiper-container4', {
     direction : 'vertical',
     slidesPerView: 4,
     slidesPerView : 'auto',
     // roundLengths : true, 
    })
    $('.tem3-box nav').on('click','a',function(){
        var bg;
        $(".tem3-box nav a").each(function(){
            if($(this).hasClass("on")){
                bg = $(this).css("background");
            }
        })
        $(this).addClass('on').css("background", bg).siblings().removeClass('on').css("background", "none");
        $(this).find("strong").css("border-top-color", bg);
        var oNavTab = $('.nav-tab ul').eq($(this).index());
        oNavTab.show().siblings().hide();
    })

    $('.tem9-cont nav').on('click','a',function(){
        var bg;
        $(".tem9-cont nav a").each(function(){
            if($(this).hasClass("toShow")){
                bg = $(this).css("background");
            }
        })
        $(this).addClass('toShow').css("background", bg).siblings().removeClass('toShow').css("background", "#fff");
        var oNavTab = $('.main ul li').eq($(this).index());
        oNavTab.show().siblings().hide();
    })
    //广告位跳转
    $(".jumpRedirect").on("click",function(){
        var redirecturl = $(this).attr("redirecturl");
        BP.send({
            event_id:'B728W001',
            url:coquetryUrl,
            name:'更多活动位',
            cookid: '',
            user_id: ''
        });
        if(redirecturl != ""){
            redirecturl = redirecturl.indexOf("http") != -1 || redirecturl.indexOf("https") != -1 ? redirecturl : "http://" + redirecturl;
            location.href = redirecturl;
        }
    })
    //商品跳转
    $(".jumpProductDetail").on("click",function(){
        var productid = $(this).attr('productid');
        var shopid = $(this).attr('shopid');
        var producturl = $(this).attr('producturl');
        BP.send({
            event_id:'G728W001',
            url:coquetryUrl,
            name:'活动商品位',
            user_id:'',
            shop_id:base64.encode(shopid),
            produce_id:base64.encode(productid)
        });
        if(producturl != ""){
            location.href = producturl;
        }
    })

    //返回顶部
    var oTotop = $('.totop')[0];
     if(oTotop){
         oTotop.style.display='none';
         window.onscroll = function(){
             if(document.body.scrollTop>50){
                 oTotop.style.display='block';
             }else{
                 oTotop.style.display='none';
             }
         };
         oTotop.onclick=function(){
             // var docBody =;
             document.body.scrollTop = 0;
             //gotoTop( document.body,300)
         };
     }
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