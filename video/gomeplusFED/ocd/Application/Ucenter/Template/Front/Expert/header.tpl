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
		<meta name="keywords" content="国美+APP">
		<!-- 引入公共css  -->
		<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/public/public.css?version=<?php echo C('CSS_VERSION'); ?>">
		<!-- 引入每个页面的css -->
		<if condition="$csspath neq '' ">
			<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/<{$csspath}>?version=<?php echo C('CSS_VERSION'); ?>">
		</if>
		<script>
			var $GLOBAL_CONFIG = {};
			$GLOBAL_CONFIG['current_url']= '<?php echo $current_url; ?>';//当前url
			$GLOBAL_CONFIG['islogin']= '<?php echo $userId ? 1 : 0; ?>';//是否登录
			$GLOBAL_CONFIG['userId'] = '<{$userId}>';
			$GLOBAL_CONFIG['nickName'] = '<{$nickName}>';
			$GLOBAL_CONFIG['main_domain']= '<{$main_domain}>';//主域名
			$GLOBAL_CONFIG['passport_domain']= '<{$passport_domain}>';//登录注册域名
			$GLOBAL_CONFIG['order_domain']= '<{$order_domain}>';//订单域名
			$GLOBAL_CONFIG['group_domain']= '<{$group_domain}>';//社交
			$GLOBAL_CONFIG['i_domain']= '<{$i_domain}>';//用户中心
			$GLOBAL_CONFIG['mall_domain']= '<{$mall_domain}>';//商城
			$GLOBAL_CONFIG['js_domain'] = '<{$js_domain}>';
			$GLOBAL_CONFIG['pcjspath'] = '<{$pcjspath}>';
			$GLOBAL_CONFIG['pccsspath'] = '<{$pccsspath}>';
			$GLOBAL_CONFIG['pcimgpath'] = '<{$pcimgpath}>';
			$GLOBAL_CONFIG['wap_url'] = '<{$wap_url}>';
			$GLOBAL_CONFIG['prefix'] = '<{$cookie_prefix}>';
			$GLOBAL_CONFIG['cartProdNumReal'] = <{:cartProductNumReal()}>;
			var userId = '<{$userId}>';
		</script>
		<script>
			<!--图片加载错误触发-->
			window.imgError = function(img, type) {
				var imgs = {
					m: 'img-error.png',
					l: 'img-error-big.png',
					h: 'head-default.png',
					g: 'circle-default2.png'
				};
				var src = imgs[type];
				src = src ? src : imgs.m;
				img.onerror = '';
				img.src = $GLOBAL_CONFIG.pcimgpath + '/images/public/' + src;
			};
		</script>
		<script src="<{$js_domain}>/m/public/gomeplusJS/dist/bp/buriedPoint.min.js?version=<?php echo C('JS_VERSION'); ?>"></script>
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
	<body class="opg">
		<div class="dr-bg">