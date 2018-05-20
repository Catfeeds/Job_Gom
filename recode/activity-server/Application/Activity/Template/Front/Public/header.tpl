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
    <title>送温暖</title>
    <link rel="stylesheet" type="text/css" href="<{$pccsspath}>/20171212/css/double12.css?version=<?php echo C('CSS_VERSION'); ?>">

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
        $GLOBAL_CONFIG['activity_domain'] = '<{$activity_domain}>';
        $GLOBAL_CONFIG['cookie_prefix'] = '<{$cookie_prefix}>';
        $GLOBAL_CONFIG['user_id'] = <empty name="user_info.userId">0<else/><{$user_info['userId']}></empty>;
    </script>
</head>
<body>