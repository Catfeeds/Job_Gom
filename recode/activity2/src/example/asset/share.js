
        var qq_zone_title = "天冷了，不暖你的朋友就赶紧断了吧";
        var qq_zone_desc = "不断还留着过年么？";
        var qq_zone_link = "http://activity-dev.m.atguat.com.cn:8083/warm/index";
        var qq_zone_img = "http://js.dev.meixincdn.com:1314/CDN8176/dist/20171212/images/share.jpg";

        var sina_title = "天冷了，不暖你的朋友就赶紧断了吧";
        var sina_desc = "不断还留着过年么？";
        var sina_link = "http://activity-dev.m.atguat.com.cn:8083/warm/index";
        var sina_img = "http://js.dev.meixincdn.com:1314/CDN8176/dist/20171212/images/share.jpg";

        var link_login = "http://activity-dev.m.atguat.com.cn:8083/warm/ta?u=100037482545&t=f54cf5e5643667dceab8a4af0309a193";

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

            if(access_terminal) {
                if(access_terminal == 'weixin') {
                    $('#wShare').show();
                } else if(access_terminal == 'app') {
                    var param = {
                        title: qq_zone_title,
                        shareDesc: qq_zone_desc,
                        shareImageUrl: qq_zone_img,
                        shareUrl: qq_zone_link,
                        platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'],
                    };
                    $g.callShareComp(param);
                } else if(access_terminal == 'wap') {
                    var dom = document.getElementById("browser-share");
                    if(dom){
                        dom.style.display = "-webkit-box";
                        dom.style.display = "-webkit-flex";
                        dom.style.display = "flex";
                    }else{
                        $("body").append('<div id="browser-share" style="position: fixed; z-index: 999; bottom: 20%; width: 100%; display:-webkit-box;display:-webkit-flex;display: flex; -webkit-box-pack: center; justify-content: center;"><div style="max-width: 60px; padding: 10px; border: 1px solid rgb(0, 0, 0); background: rgb(0, 0, 0); opacity: 0.5; text-align: center; color: rgb(255, 255, 255); font-size: 12px;">请用浏览器自带分享功能分享</div></div>');
                    }
                }
            }

            setTimeout(function(){
                $("#browser-share").hide();
            }, 3 * 1000);
        })();
