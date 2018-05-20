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
        var $GLOBAL_CONFIG = {};
        $GLOBAL_CONFIG['activity_domain'] = '<{$activity_domain}>';
        $GLOBAL_CONFIG['pcimgpath'] = '<{$pcimgpath}>';
        $GLOBAL_CONFIG['user_id'] = <empty name="user_info.userId">0<else/><{$user_info['userId']}></empty>;
        $GLOBAL_CONFIG['link_login'] = '<{$user_info['link_ta']}>';

        var qq_zone_title = "用力！摩擦我，温暖我心窝！";
        var qq_zone_desc = "我要！不要停，给我你全部的力气和爱！";
        var qq_zone_link = "<{$share_weixin['url']}>";
        var qq_zone_img = "<{$pcimgpath}>/20171212/images/share.jpg?v=1";

        var sina_title = "用力！摩擦我，温暖我心窝！";
        var sina_desc = "我要！不要停，给我你全部的力气和爱！";
        var sina_link = "<{$share_weixin['url']}>";
        var sina_img = "<{$pcimgpath}>/20171212/images/share.jpg?v=1";

        var link_login = "<{$user_info['link_ta']}>";
        var weixin_appid = "<{$share_weixin['appid']}>";
        var weixin_noncestr = "<{$share_weixin['noncestr']}>";
        var weixin_url = "<{$share_weixin['url']}>";
        var weixin_signature = "<{$share_weixin['signature']}>";
        var weixin_timestamp = "<{$share_weixin['timestamp']}>";
    </script>


    <script src="<{$pcjspath}>/20171212/js/doublegame.js"></script>

    <link rel="stylesheet" type="text/css" href="<{$pccsspath}>/20171212/css/prism.css?version=<?php echo C('CSS_VERSION'); ?>">
    <link rel="stylesheet" type="text/css" href="<{$pccsspath}>/20171212/css/doublegame.css?version=<?php echo C('CSS_VERSION'); ?>">
    <title>何以驱寒，唯有朋友圈</title>
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
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="<{$pcjspath}>/20171212/js/prism.js?version=<?php echo C('JS_VERSION'); ?>"></script>
    <script src="<{$pcjspath}>/20171212/js/build.js?version=<?php echo C('JS_VERSION'); ?>"></script>


    <script>
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
                        link: weixin_url + '?cmpid=fx_wap_wx_yx_' + $GLOBAL_CONFIG['user_id'],
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
                        link: weixin_url + '?cmpid=fx_wap_pyq_yx_' + $GLOBAL_CONFIG['user_id'],
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
                        link: sina_link + '?cmpid=fx_wap_qq_yx_' + $GLOBAL_CONFIG['user_id'],
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
                        link: sina_link + '?cmpid=fx_wap_qqkj_yx_' + $GLOBAL_CONFIG['user_id'],
                        imgUrl: sina_img ,
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                })
            }else if( UA.indexOf('gome') !== -1 ){
                $g.ready().then(function() {
                    var obj = {
                        type:'share',
                        icon:'file://share',
                        shareInfo:{
                            title: qq_zone_title,
                            shareDesc: qq_zone_desc,
                            shareImageUrl: qq_zone_img,
                            shareUrl: qq_zone_link + '?cmpid=fx_wap_gm_yx_' + $GLOBAL_CONFIG['user_id'],
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
</body>
</html>
