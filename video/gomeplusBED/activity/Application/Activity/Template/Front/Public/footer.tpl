        <div id="wShare" class="shareWx hide">
            <div class="share-bg"></div>
            <div class="share-title"></div>
        </div>
    </div>
        <script src="<{$pcjspath}>/vendor/js/zepto.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
        <script src="//js.gomein.net.cn/plus/js/game/base64.min.js"></script>
        <script src="//js.gomein.net.cn/plus/js/public/GomeJSBridge.min.js"></script>
        <script src="//js.gomein.net.cn/mobile/cms/prom/hybrid/p/cms/src/utils/gomeBridge.js?v=201710260103000"></script>
        <script type="text/javascript" src="//js.gomein.net.cn/plus/js/public/navigate.js"></script>
        <script src="//js.gomein.net.cn/sitemonitor/wap.js"></script>
        <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <if condition="!empty($jspath)">
        <script src="<{$pcjspath}><{$jspath}>?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
    </if>
<script>
    $GLOBAL_CONFIG['link_login'] = "<{$user_info['link_ta']}>";

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
            });
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
</body>
</html>