<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <script>
    var BPConfig = {
        startTime: new Date().valueOf()
    };
    </script>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <link rel="shortcut icon" href="<{$main_domain}>favicon.ico">
    <meta http-equiv="expires" content="0">
    <title>
        <if condition="!empty($title)"><{$title}><else />美信网络技术有限公司</if>
    </title>
    <meta name="author" content="美信网络技术有限公司">
    <meta name="description" content="国美">
    <meta name="keywords" content="国美 APP">
	<!-- 引入公共css  -->
	<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/public/public.css?version=<?php echo C('CSS_VERSION'); ?>">
	<!-- 引入每个页面的css -->
    <if condition="$csspath neq '' ">
        <link type="text/css" rel="stylesheet" href="<{$pccsspath}><?php echo $csspath; ?>?version=<?php echo C('CSS_VERSION'); ?>">
    </if>
    <script>
    var $GLOBAL_CONFIG = {};
    $GLOBAL_CONFIG['islogin']= '<?php echo $userId ? 1 : 0; ?>';//是否登录
    $GLOBAL_CONFIG['passport_domain'] = '<{$passport_domain}>';
    $GLOBAL_CONFIG['main_domain'] = '<{$main_domain}>';
    $GLOBAL_CONFIG['redirect'] = '<{$Think.session.state | base64_decode}>';
	$GLOBAL_CONFIG['csrf_token'] = '';
    $GLOBAL_CONFIG['prefix'] = '<{$cookie_prefix}>';
    </script>
    <script src="<{$js_domain}>/m/public/gomeplusJS/dist/bp/buriedPoint.min.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
    <?php if(APP_STATUS ==='pro'){ ?>
    <!--统计-->
    <script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?4d914dda44888419a4588c6a4be8edcc";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
    </script>
    <?php } ?>
</head>
