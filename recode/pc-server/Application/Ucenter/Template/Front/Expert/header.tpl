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
		<link rel="stylesheet" href="<!--#include virtual='/n/common/<{$pro_num}>/style.html'-->">
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
			$GLOBAL_CONFIG['csrf_token'] = '';
			$GLOBAL_CONFIG['ss_service_gome'] = '<{$ss_gome}>';
			$GLOBAL_CONFIG['cart_service_gome'] = '<{$cart_service_gome}>';
			var userId = '<{$userId}>';
			$GLOBAL_CONFIG['dynSite']='<{$secure_gome}>';
			$GLOBAL_CONFIG['staSite']='<?php echo str_replace(APP_HTTP,"//",$main_domain_gome)?>';
			$GLOBAL_CONFIG['contextPath']='<{$context_path_gome}>';
			$GLOBAL_CONFIG['secureURL']='<{$secure_gome}>';
			$GLOBAL_CONFIG['cookieDomain']='<{$cookie_domain_gome}>';
			$GLOBAL_CONFIG['stageImageServer']= '//<{$stage_image_server}>';
			$GLOBAL_CONFIG['imgServer']='//<{$img_domain_gome}>/images';
			$GLOBAL_CONFIG['pictureserver']='//<{$img_domain_gome}>/image';
			$GLOBAL_CONFIG['stageCssServer']='//<{$css_domain_gome}>';
			$GLOBAL_CONFIG['cssserver']='//<{$css_domain_gome}>/css';
			$GLOBAL_CONFIG['stageJsServer']='//<{$js_domain_gome}>';
			$GLOBAL_CONFIG['jsserver']='//<{$js_domain_gome}>/js';
			$GLOBAL_CONFIG['js_net_server']='<{$js_net_domain_gome}>';
			$GLOBAL_CONFIG['protocol']='<?php echo str_replace("://","",APP_HTTP); ?>';
			$GLOBAL_CONFIG['versionData']='<?php echo C('JS_VERSION'); ?>';
			$GLOBAL_CONFIG['product_search_gome']='<{$product_search_gome}>';
			$GLOBAL_CONFIG['shop_search_gome']='<{$product_search_gome}>';
			$GLOBAL_CONFIG['product_item_gome']='<{$product_item_gome}>';
			$GLOBAL_CONFIG['ggckgd'] = '<{$modelPub['ggckgd']}>';  //埋点查看更多标示
			$GLOBAL_CONFIG['ggjzgd'] = '<{$modelPub['ggjzgd']}>';  //埋点加载更多标示
			window.page_id = "<?php echo isset($page_id) ? $page_id : ''?>";
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
	<body class="opg">
		<div class="dr-bg">