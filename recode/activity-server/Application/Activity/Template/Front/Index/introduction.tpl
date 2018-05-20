<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="full-screen" content="yes">
    <meta name="x5-fullscreen" content="true">
    <meta name="robots" content="noarchive">
    <meta name="Baiduspider" content="noarchive">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta name="applicable-device" content="pc,mobile">
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">

    <link rel="shortcut icon" href="./asset/favicon.ico">

    <script>
        var qq_zone_title = "天冷了，不暖你的朋友就赶紧断了吧";
        var qq_zone_desc = "不断还留着过年么？";
        var qq_zone_link = "<{$activity_domain}>warm/index?cmpid=fx_wap_{wx/wap}_yx_{用户ID}";
        var qq_zone_img = "<{$pcimgpath}>/20171212/images/share.jpg";

        var sina_title = "天冷了，不暖你的朋友就赶紧断了吧";
        var sina_desc = "不断还留着过年么？";
        var sina_link = "<{$activity_domain}>warm/index?";
        var sina_img = "<{$pcimgpath}>/20171212/images/share.jpg";

        var link_login = "<{$user_info['link_ta']}>";


    </script>


    <script src="<{$pcjspath}>/20171212/js/doublegame.js"></script>

    <link rel="stylesheet" type="text/css" href="<{$pccsspath}>/20171212/css/prism.css">
    <link rel="stylesheet" type="text/css" href="<{$pccsspath}>/20171212/css/doublegame.css">
    <title>送温暖</title>
</head>
<body>

    <div id="app">
        <div id="wShare" class="shareWx hide">
            <div class="share-bg"></div>
            <div class="share-title"></div>
        </div>
    </div>

    <script src="//js.gomein.net.cn/plus/js/public/GomeJSBridge.min.js?version=<?php echo C('JS_VERSION'); ?>"></script>
    <script src="//js.gomein.net.cn/mobile/cms/prom/hybrid/p/cms/src/utils/gomeBridge.js?version=<?php echo C('JS_VERSION'); ?>"></script>
    <script src="//js.gomein.net.cn/eccms/js/topics_js/181/6745723906.min.js?version=<?php echo C('JS_VERSION'); ?>"></script>
    <script src="//js.gomein.net.cn/plus/js/public/navigate.js?version=<?php echo C('JS_VERSION'); ?>"></script>
    <script src="<{$pcjspath}>/vendor/js/zepto.js"></script>
    <script src="//js.gomein.net.cn/plus/js/game/base64.min.js?version=<?php echo C('JS_VERSION'); ?>"></script>
    <script src="//js.gomein.net.cn/plus/js/game/share.js?version=<?php echo C('JS_VERSION'); ?>"></script>
    <script src="//js.gomein.net.cn/sitemonitor/wap.js?version=<?php echo C('JS_VERSION'); ?>"></script>
    <script src="<{$pcjspath}>/20171212/js/prism.js"></script>
    <script src="<{$pcjspath}>/20171212/js/build.js"></script>
    <script>

  var qq_zone_title = "用力！摩擦我，温暖我心窝！";
  var qq_zone_desc = "我要！不要停，给我你全部的力气和爱！";
  var qq_zone_link = "http://activity.m.gome.com.cn/warm/ta?u=73080164978&t=2f14229e913c7518f62ae8516ddd8570";
  var qq_zone_img = "http://js.meixincdn.com/m/activity/dist/20171212/images/share.jpg";

  var sina_title = "用力！摩擦我，温暖我心窝！";
  var sina_desc = "我要！不要停，给我你全部的力气和爱！";
  var sina_link = "http://activity.m.gome.com.cn/warm/ta?u=73080164978&t=2f14229e913c7518f62ae8516ddd8570";
  var sina_img = "http://js.meixincdn.com/m/activity/dist/20171212/images/share.jpg";

  var link_login = "http://activity.m.gome.com.cn/warm/ta?u=73080164978&t=2f14229e913c7518f62ae8516ddd8570";

  var weixin_appid = "wx1f241d88ae09735c";
  var weixin_noncestr = "uOY8CY75mbCRxKcN";
  var weixin_url = "http://activity.m.gome.com.cn/warm/ta?u=73080164978&t=2f14229e913c7518f62ae8516ddd8570";
  var weixin_signature = "8847d9030452dfd4606a4acb6dfac47701453782";
  var weixin_timestamp = "1512822695";

  (function(){
      var UA = window.navigator.userAgent.toLocaleLowerCase();
      if( UA.indexOf('micromessenger') !== -1 ){
          /*
           * 注意：
           * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
           * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
           * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
           *
           * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
           * 邮箱地址：weixin-open@qq.com
           * 邮件主题：【微信JS-SDK反馈】具体问题
           * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
           */
          wx.config({
              debug: false,
              appId: weixin_appid,
              timestamp: weixin_timestamp,
              nonceStr: weixin_noncestr ,
              signature: weixin_signature ,
              jsApiList: [
                  'checkJsApi',
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'hideOptionMenu',
                  'showOptionMenu',
                  'onMenuShareQQ',
                  'onMenuShareQZone',
              ]
          });
          wx.ready(function () {

              wx.checkJsApi({
                  jsApiList: [
                      'getNetworkType',
                      'previewImage',
                      'onMenuShareAppMessage',
                      'onMenuShareTimeline',
                      'hideOptionMenu',
                      'showOptionMenu',
                      'onMenuShareQQ',
                      'onMenuShareQZone',
                  ],
                  success: function (res) {
                      //   alert(JSON.stringify(res));
                  }
              });
              wx.showOptionMenu();

              // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
              wx.onMenuShareAppMessage({
                  title: sina_title,
                  desc: sina_desc,
                  link: weixin_url,
                  imgUrl: sina_img ,

                  trigger: function (res) {
                      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                      //  alert('用户点击发送给朋友');
                  },
                  success: function (res) {
                      // alert('已分享');
                      game.shareover();
                  },
                  cancel: function (res) {
                      // alert('已取消');
                  },
                  fail: function (res) {
                      //  alert(JSON.stringify(res));
                  }
              });

              // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
              wx.onMenuShareTimeline({
                  title: sina_title,
                  link: weixin_url,
                  imgUrl: sina_img ,
                  trigger: function (res) {
                      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                      // alert('用户点击分享到朋友圈');
                  },
                  success: function (res) {
                      // alert('已分享');
                      game.shareover();
                  },
                  cancel: function (res) {
                      //alert('已取消');
                  },
                  fail: function (res) {
                      // alert(JSON.stringify(res));
                  }
              });

              // 分享到QQ
              wx.onMenuShareQQ({
                  title: sina_title,
                  desc: sina_desc,
                  link: sina_link ,
                  imgUrl: sina_img ,
                  success: function () {
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                      // 用户取消分享后执行的回调函数
                  }
              });

              // 分享到QQ空间
              wx.onMenuShareQZone({
                  title: sina_title,
                  desc: sina_desc,
                  link: sina_link ,
                  imgUrl: sina_img ,
                  success: function () {
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                      // 用户取消分享后执行的回调函数
                  }
              });
          })




          setTimeout(function(){
              wx.onMenuShareAppMessage({
                  title: '1111111111',
                  desc: '222222',
                  link: weixin_url,
                  imgUrl: sina_img ,

                  trigger: function (res) {
                      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                      //  alert('用户点击发送给朋友');
                  },
                  success: function (res) {
                      // alert('已分享');
                      game.shareover();
                  },
                  cancel: function (res) {
                      // alert('已取消');
                  },
                  fail: function (res) {
                      //  alert(JSON.stringify(res));
                  }
              });

              // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
              wx.onMenuShareTimeline({
                  title: '222222222',
                  link: weixin_url,
                  imgUrl: sina_img ,
                  trigger: function (res) {
                      // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                      // alert('用户点击分享到朋友圈');
                  },
                  success: function (res) {
                      // alert('已分享');
                      game.shareover();
                  },
                  cancel: function (res) {
                      //alert('已取消');
                  },
                  fail: function (res) {
                      // alert(JSON.stringify(res));
                  }
              });

              // 分享到QQ
              wx.onMenuShareQQ({
                  title: '45453535',
                  desc: 'tettertertert',
                  link: sina_link ,
                  imgUrl: sina_img ,
                  success: function () {
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                      // 用户取消分享后执行的回调函数
                  }
              });

              // 分享到QQ空间
              wx.onMenuShareQZone({
                  title: '34353454353',
                  desc: 'rwrwrwerwewr',
                  link: sina_link ,
                  imgUrl: sina_img ,
                  success: function () {
                      // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                      // 用户取消分享后执行的回调函数
                  }
              });
          }, 15000);
      }else if( UA.indexOf('gome') !== -1 ){
          $g.ready().then(function() {
              var obj = {
                  type:'share',
                  icon:'file://share',
                  shareInfo:{
                      title: qq_zone_title,
                      shareDesc: qq_zone_desc,
                      shareImageUrl: qq_zone_img,
                      shareUrl: qq_zone_link,
                      platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'],
                  },
              };
              if ($g.env.app) {
                  $g.setHeadBar({
                      menus:{
                          isShowCloseMenu:'Y',
                          rightMenus:[
                              obj
                          ]
                      },
                  });
              }
          });
      }
  })();
    </script>

    <script>
      (function(){
          $g.ready().then(function() {
              var obj = {
                  type:'share',
                  icon:'file://share',
                  shareInfo:{
                      title: qq_zone_title,
                      shareDesc: qq_zone_desc,
                      shareImageUrl: qq_zone_img,
                      shareUrl: qq_zone_link,
                      platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'],
                  },
              };
              if ($g.env.app) {
                  $g.setHeadBar({
                      menus:{
                          isShowCloseMenu:'Y',
                          rightMenus:[
                              obj
                          ]
                      },
                  });
              }
          });

          // if(access_terminal) {
          //     if(access_terminal == 'weixin') {
          //         $('#wShare').show();
          //     } else if(access_terminal == 'app') {
          //         var param = {
          //             title: qq_zone_title,
          //             shareDesc: qq_zone_desc,
          //             shareImageUrl: qq_zone_img,
          //             shareUrl: qq_zone_link,
          //             platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'],
          //         };
          //         $g.callShareComp(param);
          //     } else if(access_terminal == 'wap') {
          //         var dom = document.getElementById("browser-share");
          //         if(dom){
          //             dom.style.display = "-webkit-box";
          //             dom.style.display = "-webkit-flex";
          //             dom.style.display = "flex";
          //         }else{
          //             $("body").append('<div id="browser-share" style="position: fixed; z-index: 999; bottom: 20%; width: 100%; display:-webkit-box;display:-webkit-flex;display: flex; -webkit-box-pack: center; justify-content: center;"><div style="max-width: 60px; padding: 10px; border: 1px solid rgb(0, 0, 0); background: rgb(0, 0, 0); opacity: 0.5; text-align: center; color: rgb(255, 255, 255); font-size: 12px;">请用浏览器自带分享功能分享</div></div>');
          //         }
          //     }
          // }
          //
          // setTimeout(function(){
          //     $("#browser-share").hide();
          // }, 3 * 1000);
      })();
    </script>
</body>
</html>
