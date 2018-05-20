define('conf/app-daren/daren.js',function (require,exports,module) {
    require('$');
    var AppInterface = require('utils/appInterface.js');
    var base64 = require('utils/base64.js');
    var Ajax = require('utils/ajax');
    var common = require('mods/common');
    var UI = require('UI/alert');
    var storage = require('mods/storage');
     var share = require('mods/share.js');
    var base64 = require('utils/base64.js');
    var Swiper = require('UI/swiper.min.js');   
    var appEvent = require('mods/appEvent'); 
    var isOpenApp = require('mods/isOpenApp');
    var H5Host = location.href.match(/^(http[s]?:\/\/(?:[^\/]*))\/.*$/)[1];
       wx.ready(function () {
        wx.hideAllNonBaseMenuItem();//隐藏所以的按钮
        wx.showMenuItems({         //显示需要的按钮
            menuList: ['menuItem:share:timeline','menuItem:share:appMessage','menuItem:favorite','menuItem:openWithSafari'] // 要显示的菜单项，所有menu项见附录3
        });
        wx.onMenuShareTimeline({     //分享到朋友圈
            title: shareTitle, // 分享标题
            link: shareOpWapUrl, // 分享链接
            desc: shareDesc, //分享描述
            imgUrl: shareImg, // 分享图标
            success: function () {
                //alert('成功分享到朋友圈');
            },
            cancel: function () {
                //alert('取消分享朋友圈');
            }
        });
        wx.onMenuShareAppMessage({   //分享给朋友
            title: shareTitle, // 分享标题
            link: shareOpWapUrl, // 分享链接
            desc: shareDesc, //分享描述
            imgUrl: shareImg, // 分享图标
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
            title: shareTitle, // 分享标题
            link: shareOpWapUrl, // 分享链接
            desc: shareDesc, //分享描述
            imgUrl: shareImg, // 分享图标
            success: function () {
                //alert('成功分享到QQ');
            },
            cancel: function () {
                //alert('取消分享到QQ');
            }
        });
    });
         var init = function (){
           $('.top').css({
            'margin-top': '60px'
            }); 
            $('.dl_clients').show();
          }
           init();
           $('.dl_close').on('click',function(e){
              $('.dl_clients').hide();
                $('.top').css({
                  'margin-top': '0'
                });
                var h = document.body.scrollTop;              
                e.stopPropagation(); 
                $('.dl_clients').addClass('clicked')
          })
           $('.dl_clients').click(function(){
              location.href='http://a.app.qq.com/o/simple.jsp?pkgname=cn.com.gome.meixin';
          })
           window.addEventListener('scroll', function() {
            var h = document.body.scrollTop;
            // console.log(h);
            if(!$('.dl_clients').hasClass('clicked')){
                if (h > 60) {
                $('.dl_clients').css({'display':'none'})
                $('.top').css({
                    'margin-top': '0'
                });
            } else {
                if (document.querySelector('.dl_clients')) {
                    $('.dl_clients').css({'display':'block'})
                    $('.top').css({
                        'margin-top': '60px'
                    });
                } else {
                    $('.top').css({
                        'margin-top': '0'
                    });
                }
            }
            }            
        }, false);
      $('body').on('click','.rule a,.top a,.daren a,.people a,.circle a',function(){      
        location.href='http://a.app.qq.com/o/simple.jsp?pkgname=cn.com.gome.meixin';
      })  

     
    })
    
       

    // $('body').on('click','.ban,.responsible a',function(){
    //       AppInterface.call('/common/getLoginStatus', function (data) {
    //           console.log(data);
    //         if (data.success) {
    //               storage.setCookie('userId', data.data.userId);
    //               storage.setCookie('token', data.data.token);
    //                location.href ='https://h5-pre.gomeplus.com/daren/privilege';
    //         }
    //         else{
    //              AppInterface.call('/common/logout', function (data) {
    //                   if (data.success) {
    //                         AppInterface.call('/common/login', function (data) {
    //                           if (data.success) {
    //                               storage.setCookie('userId', data.data.userId);
    //                               storage.setCookie('token', data.data.token);
    //                                // window.location.reload();
    //                               location.href = 'https://h5-pre.gomeplus.com/daren/privilege';
    //                           }
    //                         })
    //                     }
    //             })
    //         }
    //     })
    // $('.ban').click(function(){
    //     AppInterface.call('/common/getLoginStatus', function (data) {
    //           console.log(data);
    //         if (data.success) {
    //               storage.setCookie('userId', data.data.userId);
    //               storage.setCookie('token', data.data.token);
    //                location.href ='https://h5-pre.gomeplus.com/daren/privilege';
    //         }
    //         else{
    //              AppInterface.call('/common/logout', function (data) {
    //                   if (data.success) {
    //                         AppInterface.call('/common/login', function (data) {
    //                           if (data.success) {
    //                               storage.setCookie('userId', data.data.userId);
    //                               storage.setCookie('token', data.data.token);
    //                                // window.location.reload();
    //                               location.href = 'https://h5-pre.gomeplus.com/daren/privilege';
    //                           }
    //                         })
    //                     }
    //             })
    //         }
    //     })
    // })

      
      // $('.join').click(function(){
      //  AppInterface.call('/common/getLoginStatus', function (data) {
      //         console.log(data);
      //         if (data.success) {
      //             storage.setCookie('userId', data.data.userId);
      //             storage.setCookie('token', data.data.token);
      //             if(data.dare){
      //               storage.setCookie('');
      //             }
      //             // callback();
      //         } else {
      //             AppInterface.call('/common/logout', function (data) {
      //                 if (data.success) {
      //                     AppInterface.call('/common/login', function (data) {
      //                         if (data.success) {
      //                             // location.href = H5Host+'/op/followup/fans';
      //                             storage.setCookie('userId', data.data.userId);
      //                             storage.setCookie('token', data.data.token);
      //                              // window.location.reload();
      //                             location.href = H5Host+'/op/followup/fans';
      //                             // callback();
      //                                    }
      //                           });
      //                       }
      //                 });
      //               }
      //            })


