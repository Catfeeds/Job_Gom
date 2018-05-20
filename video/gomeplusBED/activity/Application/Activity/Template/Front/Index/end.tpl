<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="robots" content="noarchive">
    <meta name="Baiduspider" content="noarchive">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta name="applicable-device" content="pc,mobile">
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
    <title>何以驱寒，唯有朋友圈</title>
    <style type="text/css">
        body, html {
            width: 100%;
            height: 100%;
        }
        body{
            margin:0;
            padding: 0;
        }
        .outer{
            width: 100%;
            height: 100%;
            background: url("<{$imgpath}>/images/bg.jpg") no-repeat;
            background-size: cover;
            color: #fff;
        }
        }
        .hint {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            font-size: .28rem;
            line-height: .44rem
        }
        .hint .hint-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: .3
        }

        .hint .hint-end {
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -2.2rem 0 0 -2.99rem;
            width: 5.98rem;
            height: 4.39rem;
            background: url("<{$imgpath}>/images/hintEnd.png") no-repeat;
            background-size: cover
        }


        .hint-time{
            position: absolute;
            top: 20%;
            width: 100%;
            text-align: center;
            font-size: 0.32rem;
        }
    </style>
    <script type="text/javascript">
        (function() {
            /*rem*/
            function setFont() {
                var __rootrem;
                var clientWidth = (document.documentElement || document.body.parentNode).clientWidth;
                if ( clientWidth > 650) {
                    clientWidth = 640;
                }
                // 375尺寸的比例，换算成@1x设计稿后1px=0.01rem
                __rootrem = Math.floor(clientWidth * 100 / 640);
                (document.documentElement || document.body.parentNode).style.fontSize = __rootrem + "px";
            }
            setFont();
            window.addEventListener("resize", function() {
                setFont();
            });
        })();
    </script>
    <script type="text/javascript">
        var $GLOBAL_CONFIG = {};
        $GLOBAL_CONFIG["to_url"] = "<{$wap_url}>";
    </script>
</head>
<body>

<div class="outer">
    <div class="hint">
        <div class="hint-bg"></div>
        <div class="hint-end"></div>
        <div class="hint-time"><span id="time">3</span>s</div>
    </div>
</div>
<script type="text/javascript">
    (function(){
        var dom = document.querySelector("#time");
        var time = 3
        var id = setInterval(function(){
            dom.innerHTML = --time;
            if(time == 0){
                clearInterval(id);
                location.href = $GLOBAL_CONFIG["to_url"];
            }
        }, 1 * 1000);
    })();
</script>
</body>
</html>
