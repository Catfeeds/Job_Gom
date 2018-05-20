<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<script>
      	var BPConfig = {
			startTime: new Date().valueOf()
		};
        var $GLOBAL_CONFIG = {};
        $GLOBAL_CONFIG['appId']= '<{$ImConf.appId}>';//appId
        $GLOBAL_CONFIG['imUserId']= <{$ImConf.imUserId}>;//uid
        $GLOBAL_CONFIG['token']= '<{$ImConf.token}>';//token
        $GLOBAL_CONFIG['imagePath']= '<?php echo getResizeImg( $userinfos['imagePath'],80,80 )?>';//imagePath
        $GLOBAL_CONFIG['nickName']= '<{$nickName}>';//nickName
        $GLOBAL_CONFIG['imIconUrl']= '<{$ImConf.imIconUrl}>';//imIconUrl
        $GLOBAL_CONFIG['imSdkUrl']= '<{$ImConf.imSdkUrl}>';//imSdkUrl
        $GLOBAL_CONFIG['imExpUrl']= '<{$ImConf.imExpUrl}>';//imExpUrl
        $GLOBAL_CONFIG['mall_domain']= '<{$mall_domain}>';//商城
        $GLOBAL_CONFIG['ucenter_domain']= '<{$i_domain}>';//用户中心
        $GLOBAL_CONFIG['imType']= '<{$imtype}>';//被聊天对象的类型
        $GLOBAL_CONFIG['imId']= '<{$imid}>';//被聊天对象（imtype是店铺就是店铺id，imtype是用户就是用户id，imtype是小美可以没有id）
    	</script>
    	<script>
    	var imgs = {
			m: 'img-error.png',
			l: 'img-error-big.png',
			h: 'head-default.png'
		};

		window.imgError = function(img, type) {
			var imgOrigin = imgs[type];
			imgOrigin = imgOrigin ? imgOrigin : imgs.m;
			img.onerror = '';
			img.src = $GLOBAL_CONFIG['imIconUrl']+'/src/images/error-avatar.png';
		};
		</script>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit">    
 		<meta http-equiv="X-UA-Compatible" content="IE=EDGE">
		<title><empty name="title">国美网页版<else /><{$title}></empty></title>
		<meta name="author" content="美信网络技术有限公司">
		<meta name="description" content="<notempty name="description"><{$description}></notempty>">
        <meta property="qc:admins" content="2401434660750256775504536375" />
        <meta name="keywords" content="<notempty name="keywords"><{$keywords}></notempty>">
		<meta property="wb:webmaster" content="46b8fee80ab9d092" />
		<link rel="stylesheet" href="<{$ImConf.imStaticPath.CSS}>css/global.css?version=<?php echo C('CSS_VERSION'); ?>">
		<link rel="stylesheet" href="<{$ImConf.imStaticPath.JS}>js/conf/app.css?version=<?php echo C('CSS_VERSION'); ?>">
	
	</head>
  	<body class="opg">
		<div id="app">
			<app></app>
		</div>
  		<script type="text/javascript" src="<{$ImConf.imStaticPath.JS}>js/im/vendorIm/jquery.min.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
		<script type="text/javascript" src="<{$ImConf.imStaticPath.JS}>js/im/vendorIm/IMConf.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
		<script type="text/javascript" src="<{$ImConf.imStaticPath.JS}>js/im/vendorIm/common.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
		<script type="text/javascript" src="<{$ImConf.imStaticPath.JS}>js/im/vendorIm/event.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
		<script type="text/javascript" src="<{$ImConf.imStaticPath.JS}>js/im/vendorIm/IMUtils.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
		<script type="text/javascript" src="<{$ImConf.imStaticPath.JS}>js/im/vendorIm/md5.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
		<script type="text/javascript" src="<{$ImConf.imStaticPath.JS}>js/im/vendorIm/protoIm.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
		<script type="text/javascript" src="<{$ImConf.imStaticPath.JS}>js/conf/im.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
		<script type="text/javascript" src="<{$ImConf.imStaticPath.JS}>js/im/vendorIm/amrnb.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
		<script type="text/javascript" src="<{$ImConf.imStaticPath.JS}>js/conf/app.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>

  	</body>
</html>
  		