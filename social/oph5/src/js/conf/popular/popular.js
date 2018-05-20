define('conf/popular/popular.js', function (require, exports, module) {
    require('$');
    require('vendors/lazyload.js');
    var UI = require('UI/alert');
    var common = require('mods/common');
    var storage = require('mods/storage');
    var share = require('mods/share.js');
    var base64 = require('utils/base64');
    var dropload = require('UI/dropload.js');
    var Swiper = require('UI/swiper.min');
    var title = '12.19礼嗨了!会玩的人在一起',
    desc = '国美Plus12.19大庆生，邀你一起玩！参与活动赢取iphone7、SK2、单反相机等超级大礼！更有国美Plus"会玩体验师"神秘线下大奖等你拿！',
    imgUrl = opcsspath +'/images/module/popular/share_60.png';
    
    var params={};
    params['url'] = location.href;
    params['userid'] = window.userId || 0;
    params['cookid'] = storage.getCookie('PHPSESSID') || 0;
    //活动id
    var opActiveIdN = typeof opActiveId == 'undefined' ? "" : opActiveId,
    opActiveCidN = typeof opActiveCid == 'undefined' ? "000000000" : opActiveCid,
    activeNo = opActiveIdN ? (opActiveIdN + opActiveCidN) : "";
    // alert(arrTop);
    var apploginUrl = location.hostname+'/login/index?redirect='+location.href;
    var appDownUrl = location.hostname+'/login/index?redirect='+location.href;
    var link = shareOpWapUrl;
    var popular = {
        init:function(){
            self = this;
            self.state();
        },    
        state:function(){
            if(userId == 0){
                location.href = sharelogin;
            }else{
                //分享到微信;
                wx.ready(function () {
                    wx.hideAllNonBaseMenuItem();//隐藏所以的按钮
                    wx.showMenuItems({         //显示需要的按钮
                        menuList: ['menuItem:share:timeline','menuItem:share:appMessage','menuItem:favorite','menuItem:openWithSafari'] // 要显示的菜单项，所有menu项见附录3
                    });
                    wx.onMenuShareTimeline({     //分享到朋友圈
                        title: title, // 分享标题
                        link: shareOpWapUrl, // 分享链接
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
                        link:shareOpWapUrl, // 分享链接
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
                        link: shareOpWapUrl, // 分享链接
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
                
                $('.tab-zone,.banner').click(function(){
                    location.href = downUrl;
                    console.log($(this))
                })
                // if($('.toast-rule').hide()){
                //     $('.wrap').click(function(){
                //         alert('1')
                //     })
                // }
                $('.btn-rule').on('click',function(){
                    $('.mask').show();
                    $('.toast-rule').show();
                })
                
                $('.mask,.toast-rule').on('click',function(){
                    $('.mask').hide();
                    $('.toast-rule').hide();
                })
            }
            
                

                
            
             // 埋点
             BP.send({event_id:'PA1214W01',url:link,name:'活动页面',cook_id: params.cookid,user_id: params.userid,activeNo:activeNo});
        }
      
    };

    popular.init();  
    
    
});