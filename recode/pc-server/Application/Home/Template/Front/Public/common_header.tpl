<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="UTF-8">
		<meta name="renderer" content="webkit">
 		<meta http-equiv="X-UA-Compatible" content="IE=EDGE">
		<meta http-equiv="Cache-Control" content="no-transform " />
		<meta http-equiv="Cache-Control" content="no-siteapp">
		<title><empty name="title">国美 APP边玩边分享，购物不孤单 - 国美官网<else /><{$title}></empty></title>
		<meta name="author" content="美信网络技术有限公司">
		<meta name="description" content="<notempty name="description"><{$description}></notempty>">
        <meta property="qc:admins" content="2401434660750256775504536375" />
        <meta name="keywords" content="<notempty name="keywords"><{$keywords}></notempty>">
		<meta property="wb:webmaster" content="46b8fee80ab9d092" />
		<link rel="canonical" href="<?=curCanonicalURL()?>">
		<link rel="shortcut icon" href="<{$group_domain}>favicon.ico">
		<link rel="stylesheet" href="<!--#include virtual='/n/common/<{$pro_num}>/style.html'-->">
		<link rel="stylesheet" type="text/css" href="<{$pccsspath}>/css/public/public.css?version=<?php echo C('CSS_VERSION'); ?>">
		<?php if(isset($csspath)){ ?>
		<link rel="stylesheet" type="text/css" href="<{$pccsspath}>/css/module/<{$csspath}>?version=<?php echo C('CSS_VERSION'); ?>">
		<?php } ?>
		<script>
		var BPConfig = {
			startTime: new Date().valueOf()
		};
		var $GLOBAL_CONFIG = {};
		$GLOBAL_CONFIG['current_url']= '<?php echo $current_url; ?>';//当前url
		$GLOBAL_CONFIG['islogin']= '<?php echo ($userinfos['loginStatus'] == 3) ? 1 : 0;?>';//是否登录
		$GLOBAL_CONFIG['userId'] = '<{$userId}>';
		$GLOBAL_CONFIG['nickName'] = '<?php echo addslashes( $nickName );?>';
		$GLOBAL_CONFIG['main_domain']= '<{$main_domain}>';//主域名
		$GLOBAL_CONFIG['passport_domain']= '<{$passport_domain}>';//登录注册域名
		$GLOBAL_CONFIG['order_domain']= '<{$order_domain}>';//订单域名
		$GLOBAL_CONFIG['group_domain']= '<{$group_domain}>';//社交
		$GLOBAL_CONFIG['i_domain']= '<{$i_domain}>';//用户中心
		$GLOBAL_CONFIG['mall_domain']= '<{$mall_domain}>';//商城
        $GLOBAL_CONFIG['meidian_domain']= '<{$meidian_domain}>';//美店
		$GLOBAL_CONFIG['js_domain'] = '<{$js_domain}>';
		$GLOBAL_CONFIG['pcjspath'] = '<{$pcjspath}>';
		$GLOBAL_CONFIG['pccsspath'] = '<{$pccsspath}>';
		$GLOBAL_CONFIG['pcimgpath'] = '<{$pcimgpath}>';
		$GLOBAL_CONFIG['wap_url'] = '<{$wap_url}>';
		$GLOBAL_CONFIG['wap_circle_url'] = '<{$wap_circle_url}>';
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
			img.src = $GLOBAL_CONFIG.pcimgpath + '/images/public/' + src + '?v='+$GLOBAL_CONFIG['versionData'];
		};
		</script>
		<!-- 大数据埋点统一由商城公共头提供
		<script src="<{$js_domain}><{$uba_sdk_uri}>?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
        <script src="<{$js_domain}><{$bigdata_uri}>?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
        -->
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

	<!--[if IE 9]>
		<style>
			body {
				padding-top: 46px !important;
			}
			.low-v-warn {
				position: fixed !important;
			}
		</style>
	<![endif]-->
	<!--[if IE 8]>
		<style>
			body {
				padding-top: 46px !important;
			}
			.low-v-warn {
				position: fixed !important;
			}
		</style>
	<![endif]-->
	<!--[if IE 7]>
		<style>
			body {
				padding-top: 46px !important;
			}
			.low-v-warn {
				position: fixed !important;
			}
		</style>
	<![endif]-->
  	<body class="opg <?php echo isset($bg_style) ? $bg_style:''; ?>">

	<div class="gome-head-wrap"><!--#include virtual="/n/common/<{$pro_num}>/head.html"--></div>

		<!--[if IE 8]>
			<div class="low-v-warn" data-node="lowVersionWarn">
				<p>为了保障良好的社交购物体验，建议您
				  	<a href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads" target="_blank" rel="nofollow">升级IE浏览器</a>
					，或下载
					<a href="<{$main_domain}>others/download.html" target="_blank" rel="nofollow">国美 APP</a>
				</p>
			</div>
		<![endif]-->
		<!--[if IE 7]>
			<div class="low-v-warn" data-node="lowVersionWarn">
				<p>为了保障良好的社交购物体验，建议您
				  	<a href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads" target="_blank" rel="nofollow">升级IE浏览器</a>
					，或下载
					<a href="<{$main_domain}>others/download.html" target="_blank" rel="nofollow">国美 APP</a>
				</p>
			</div>
		<![endif]-->


	
