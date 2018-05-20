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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" >
    <title>何以驱寒，唯有朋友圈</title>
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
        $GLOBAL_CONFIG['pcimgpath'] = '<{$pcimgpath}>';
        $GLOBAL_CONFIG['cookie_prefix'] = '<{$cookie_prefix}>';
        $GLOBAL_CONFIG['user_id'] = <empty name="user_info.userId">0<else/><{$user_info['userId']}></empty>;
    </script>
</head>
<body>