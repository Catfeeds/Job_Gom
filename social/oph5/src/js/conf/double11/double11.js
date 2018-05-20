define('conf/double11/double11.js', function (require, exports, module) {
    require('$');
    require('vendors/lazyload.js');
    var UI = require('UI/alert');
    var common = require('mods/common');
    var storage = require('mods/storage');
    var share = require('mods/share.js');
    var base64 = require('utils/base64');
    var dropload = require('UI/dropload.js');
    var Swiper = require('UI/swiper.min');
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
    //活动id
    var opActiveIdN = typeof opActiveId == 'undefined' ? "" : opActiveId,
    opActiveCidN = typeof opActiveCid == 'undefined' ? "000000000" : opActiveCid,
    activeNo = opActiveIdN ? (opActiveIdN + opActiveCidN) : "";
    // alert(arrTop);
    var arrTop = [0,0,0];
    var double11 = {
        init:function(){
            self = this;
            self.state();
            self.goclick();
        },    
        state:function(){
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
            //懒加载
            $("img").picLazyLoad({effect: "fadeIn"});
            //优惠卷滑动
            var mySwiper5 = new Swiper('.swiper-container5', {
                slidesPerView: 'auto',
                freeMode : true,
                freeModeFluid : true
            });
            // 商品滑动
            var mySwiper = new Swiper('.swiper-container', {
               slidesPerView: 4.5,
               freeMode : true,
               freeModeFluid : true
              // spaceBetween: 1, 
            });
            //图片滑动
            var mySwiper2 = new Swiper('.swiper-container2', {
               slidesPerView: 'auto',
               freeMode : true,
               freeModeFluid : true
             // roundLengths : true, 
            });
            // 商品上下滑动
            var mySwiper3 = new Swiper('.swiper-container3', {
             direction : 'vertical',
             slidesPerView: 'auto',
             // roundLengths : true, 
            });
            // 图片上下滑动
            var mySwiper4 = new Swiper('.swiper-container4', {
             direction : 'vertical',
             slidesPerView: 4,
             slidesPerView : 'auto',
             // roundLengths : true, 
            });
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
                     // 首屏时在页面位置
                     var oTop = document.body.scrollTop;
                     var obj = getHashObject(location.hash);
                     location.hash = '#tab='+obj['tab']+'&h='+oTop;
                     arrTop[new Number(obj['tab'])] = oTop;
                 };
                 oTotop.onclick=function(){
                    document.body.scrollTop = 0;
                 };
             }
             
             // 埋点
             BP.send({event_id:'PA1111W01',url:coquetryUrl,name:'活动页面',cook_id: params.cookid,user_id: params.userid,activeNo:activeNo});
        },
        goclick:function(){
            //3个模快切换
            $('.tem-nav li').click(function(){ 
                //设置当前位置 
                var oIndex;
                $(this).addClass('current').siblings().removeClass('current');
                oIndex = $('.opg-templet').eq($(this).index());
                oIndex.show().siblings(".opg-templet").hide();
                var index=$(this).index();
                var oTotop = $('.totop')[0];
                if(oTotop){
                    oTotop.style.display='none';
                    window.onscroll = function(){
                        var oTop = document.body.scrollTop;
                        
                        if(oTop>50){
                            oTotop.style.display='block';
                        }else{
                            oTotop.style.display='none';
                        }       
                        var oTop = document.body.scrollTop;
                        var obj = getHashObject(location.hash);
                        location.hash = '#tab='+obj['tab']+'&h='+oTop;
                        arrTop[new Number(obj['tab'])] = oTop;
                    };
                    oTotop.onclick=function(){
                       document.body.scrollTop = 0;
                    };
                }
                self.setScrollTop(arrTop[index]);
                // 当前高度等于页面高度
                // document.body.scrollTop = arrTop[index];
                console.log(arrTop)
                self.oBpIndex = $(this).index();
                var aHash =['#tab=0&h=0','#tab=1&h=0','#tab=2&h=0'];
                location.hash = aHash[self.oBpIndex];
                oArr1 = ['BA1111W01','BA1111W02','BA1111W03'];
                oArr2 = ['主会场按钮1','促销活动按钮2','分类导航按钮3']; 
                BP.send({event_id:oArr1[self.oBpIndex],
                    url:coquetryUrl,
                    name:oArr2[self.oBpIndex],
                    cook_id: params.cookid,
                    user_id: params.userid,
                    activeNo:activeNo
                });
            });
            // 设置默认背景色
            var oBg = $('.tem3-box .on').attr("cotest");
            $('.tem3-box .on').css("background",oBg);
            $('.tem3-box .on strong').css("border-top-color",oBg)
            $('.tem3-box nav').on('click','a',function(){
                var bg;
                bg = $('.tem3-box nav a').eq($(this).index()).attr("cotest");
                // console.log($(this).index() , bg)
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
                    event_id:'GP1111W10',
                    url:coquetryUrl,
                    name:'活动商品位',
                    user_id: params.userid,
                    shop_id:base64.encode(shopid),
                    produce_id:base64.encode(productid)
                });
                if(producturl != ""){
                    location.href = producturl;
                }
            });
            //店铺跳转
            $('.tem-new-3 .cont4 a').click(function(){
                var oShopid = $(this).attr('shopid'); 
                BP.send({event_id:'GP1111H08',url:coquetryUrl,name:'进入店铺',cook_id: params.cookid,user_id: params.userid,shop_id:oShopid,activeNo:activeNo});
                location.href = location.origin+'/shop/'+oShopid+'.html';
                
            })
            // 进入会场搜索跳转
            $('.tem-new-4 .cont5 a').click(function(){
                var oSouUrl = $(this).attr('categoryname');
                BP.send({event_id:'GP1111H09',url:coquetryUrl,name:'进入会场',cook_id: params.cookid,user_id: params.userid,search_id:oSouUrl,activeNo:activeNo});
                location.href = location.origin+'/cate/detail?searchwords='+oSouUrl+'&type=0';
            });
            //拼团详情 
            // var oGroupbuy = https://h5-pre.gomeplus.com/groupbuy/index
            $('.tem-new-2 ul a').click(function(){
                var oGroupId = $(this).attr('groupbuyid'),
                oGroupUrl = location.origin +'/groupbuy/detail?groupBuyItemId='+oGroupId;
                console.log(oGroupUrl)
                // AppInterface.call('/common/localJump',{url:encodeURIComponent(base64.encode(oGroupUrl))})
                BP.send({event_id:'GP1111H06',url:coquetryUrl,name:'去开团',cook_id: params.cookid,user_id: params.userid,group_id:oGroupId,activeNo:activeNo});
                location.href = oGroupUrl;
            });
                // 查看更多
            $('.tem-new-2 .tem-more').click(function(){
                var oGroupMore = location.origin+'/groupbuy/index';
                BP.send({event_id:'GP1111H07',url:coquetryUrl,name:'查看更多',cook_id: params.cookid,user_id: params.userid,group_url:oGroupMore,activeNo:activeNo});
                location.href = oGroupMore;
            });
            //促销活动
            $('.show-list .cont6 li').click(function(){
                var data = $(this).attr('datatype')
                    shareTitle = $(this).attr('activitytitle') ? $(this).attr('activitytitle') : title ,
                    shareDesc = $(this).attr('activitydesc') ? $(this).attr('activitydesc') : desc ,
                    shareImg = $(this).attr('activityimg') ? $(this).attr('activityimg') : imgUrl ,
                    shareOpWapUrl = $(this).attr('activitylink') ? $(this).attr('activitylink') : link ; 
                var oParr1 =['促销专题吃','促销专题喝','促销专题玩','促销专题乐'],
                oParr2 = ['GP1111W01','GP1111W02','GP1111W03','GP1111W04'],
                oIndex = $(this).index()
                console.log(oParr1[oIndex] , oParr2[oIndex])
                BP.send({event_id:oParr1[oIndex],url:coquetryUrl,name:oParr2[oIndex],cook_id: params.cookid,user_id: params.userid,activeNo:activeNo});
                switch (data){
                    case "2" :
                        location.href = shareOpWapUrl
                        break;
                    case "6" :
                        location.href = shareOpWapUrl
                        break;
                    // default :
                    //     AppInterface.toast('此活动已下线');
                    //     break;   
                }
            });
            // 领取优惠劵
            $('.tem-new-1 .cont2 a').click(function(){
                oCouponSn = $(this).attr('couponbatchsn');
                oCouponNa = $(this).attr('couponbatchname');
                if(userId == 0 ){
                    var href=base64.encode(location.href)
                    location.href = location.origin+'/login/index?redirect='+href;
                    // location.reload(true);
                    if(userId != 0){
                        self.toCoupon();  
                    }
                }else{
                    self.toCoupon();  
                }
            });
        },
        toCoupon:function(){
            console.log(oCouponSn)
            var pData = {
                sn : oCouponSn
            }
            $.ajax({
                type:"get",
                url:"/share/coupon/receiveCoupon",
                data:pData,
                dataType:"json",
                success:function(data){
                    console.log(data.data.userRemainingAvailableQuantity)
                    if ((typeof(data.data) != 'undefined') && (typeof(data.data.userRemainingAvailableQuantity) != 'undefined')) {
                        console.log('领取成功')
                        // AppInterface.toast('领取成功!');
                        UI.alerter('优惠券领取成功');
                        BP.send({event_id:'GP1111W05',url:coquetryUrl,name:'优惠券',cook_id: params.cookid,user_id: params.userid,coupon_sn:oCouponSn,
                            coupon_na:oCouponNa,activeNo:activeNo});
                    } else {
                        // AppInterface.toast('已达领取上限!');
                        UI.alerter('已达领取上限!');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // AppInterface.toast('领取失败!');
                    UI.alerter('领取失败!');
                }
            })
        },
        setScrollTop:function (scroll_top) {
            document.documentElement.scrollTop = scroll_top;
            window.pageYOffset = scroll_top;
            document.body.scrollTop = scroll_top;
        },
        removeCookie:function(name){              //删除键值对（通过设置过期时间）
           //var date=new Date().getTime()-1;
            document.cookie=name+"="+escape(name)+";expires="+new Date(-1).toUTCString()+";path=/";
        },
      
    };

    function getHashObject(hash){
        if(hash){
            var obj={};
            hash = hash.slice(1);
            var hasharr = hash.split("&");
            hasharr.forEach(function(item){
                var itemarr = item.split('=');
                obj[itemarr[0]] = itemarr[1];
            });
            return obj;
        }else{
            return {tab:1,h:0}
        }
        
    }

    function oHash(){
        // alert(location.hash)
            if(location.hash === ''){
               document.body.scrollTop = 0;
                location.hash = '#tab=0&h=0';
            }else if(/#tab=0\&h/g.test(location.hash)){
                var obj = getHashObject(location.hash);
                 document.body.scrollTop = obj['h'];
                 location.hash = '#tab=0&h='+obj['h'];
                 arrTop[new Number(obj['tab'])] = new Number(obj['h']);
            }else{
                document.body.scrollTop = 0;
                location.hash = '#tab=0&h=0'; 
            }
    }     
    oHash();
    double11.init();  

});