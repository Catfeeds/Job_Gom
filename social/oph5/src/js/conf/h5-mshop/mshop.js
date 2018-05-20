define('conf/h5-mshop/mshop.js',function (require,exports,module) {
    require('$');
    require('vendors/lazyload.js');
    var AppInterface = require('utils/appInterface.js');
    var base64 = require('utils/base64.js');
    var common = require('mods/common');
    var UI = require('UI/alert');
    var storage = require('mods/storage');
     var share = require('mods/share.js');
    var base64 = require('utils/base64.js');
    var Swiper = require('UI/swiper.min.js');   
    var appEvent = require('mods/appEvent'); 
    var isOpenApp = require('mods/isOpenApp');
    var H5Host = location.href.match(/^(http[s]?:\/\/(?:[^\/]*))\/.*$/)[1];
    // 分项参数
	var title = shareTitle,
    desc = shareDesc,
    imgUrl = shareImg.replace('https','http'), 
    link = shareOpWapUrl,
    oGroupbuy = location.origin +'/groupbuy/detail?groupBuyItemId=';
    var coquetryUrl = encodeURIComponent(location.href);
    var params={};
    params['url'] = location.href;
    params['userid'] = window.userId || 0;
    params['cookid'] = storage.getCookie('PHPSESSID') || 0;

   
    // 图片懒加载
    $("img").picLazyLoad({effect: "fadeIn"});
    //活动id
    var opActiveIdN = typeof opActiveId == 'undefined' ? "" : opActiveId,
    opActiveCidN = typeof opActiveCid == 'undefined' ? "000000000" : opActiveCid,
    activeNo = opActiveIdN ? (opActiveIdN + opActiveCidN) : "";


    // 页面埋点
    BP.send({event_id:'PA1201W01',name:'活动页面',url:coquetryUrl,cook_id:params.cookid,user_id:params.userid,activeNo:activeNo});
   
    $('.dl_close').on('click',function(e){
      $('.dl_clients').hide();
      $('.tem1-box').css({'margin-top':'0px'});
       e.stopPropagation();     
    })
    // 顶部悬浮
    $('.dl_clients').on('click',function(){
         // setCookie('history');        
         BP.send({
            event_id:'BA1201W01',
            name:'活动页面',
            url:coquetryUrl,
            cook_id:params.cookid,
            user_id:params.userid,
            activeNo:activeNo
        });         
          location.href='http://a.app.qq.com/o/simple.jsp?pkgname=cn.com.gome.meixin';
    })
    // banner
    $('.swiper-slide a').on('click',function(){
    	 BP.send({
            event_id:'GP1201W02',
            name:'活动页面',
            url:coquetryUrl,
            cook_id:params.cookid,
            user_id:params.userid,
            activeNo:activeNo
        });
        
    })
    // 活动商品位跳转  
    $('body').on('click', '.tem2-list a,.cont a',function(){
        var productid = $(this).attr('productid');
        var shopid = $(this).attr('shopid');
        var producturl = $(this).attr('producturl');
        BP.send({
            event_id:'GP1201W01',
            name:'活动页面',
            url:coquetryUrl,
            cook_id:params.cookid,
            user_id:params.userid,
            activeNo:activeNo,
            shop_id:base64.encode(shopid),
            produce_id:base64.encode(productid)
        });
        location.href = producturl;
       
    });
    // 活动banner
    $('body').on('click','.tem5-box a,.tem6-box',function(){
    	 BP.send({
            event_id:'GP1201W03',
            name:'活动页面',
            url:coquetryUrl,
            cook_id:params.cookid,
            user_id:params.userid,
            activeNo:activeNo
        });
    })
    if($(".swiper-container .swiper-slide").length != 1){
        var mySwiper = new Swiper ('.swiper-container', {
        loop:true,
        direction:"horizontal",/*横向滑动*/
        pagination:".swiper-pagination",/*分页器*/  
        autoplay:3000/*每隔3秒自动播放*/ 
    })
    }
})
