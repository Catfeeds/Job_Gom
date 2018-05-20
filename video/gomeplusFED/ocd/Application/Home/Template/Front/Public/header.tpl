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
 		<meta http-equiv="X-UA-Compatible" content="IE=EDGE">
		<title><empty name="title">国美+APP边玩边分享，购物不孤单 - 国美+官网<else /><{$title}></empty></title>
		<meta name="author" content="美信网络技术有限公司">
		<meta name="description" content="<notempty name="description"><{$description}></notempty>">
        <meta property="qc:admins" content="2401434660750256775504536375" />
        <meta name="keywords" content="<notempty name="keywords"><{$keywords}></notempty>">
		<meta property="wb:webmaster" content="46b8fee80ab9d092" />
		<link rel="shortcut icon" href="<{$main_domain}>favicon.ico">
		<link rel="stylesheet" type="text/css" href="<{$pccsspath}>/css/public/public.css?version=<?php echo C('CSS_VERSION'); ?>">
		<?php if(isset($csspath)){ ?>
		<link rel="stylesheet" type="text/css" href="<{$pccsspath}>/css/module/<{$csspath}>?version=<?php echo C('CSS_VERSION'); ?>">
		<?php } ?>
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
		$GLOBAL_CONFIG['csrf_token'] = '<{$csrf_token}>';
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
  		<div data-node="header">
	    	<div class="header">
	      		<div class="wrap-box clearfix">
					<?php if( isset($nowurl) && $nowurl =='home/index'):?>
	        		<h1 class="fl"><a href="<{$main_domain}>" title="国美+app" bp-data='{"event_id":"B000P001"}'><img src="<{$pcimgpath}>/images/public/logo.png"></a></h1>
					<?php else:?>
					<div class="fl"><a href="<{$main_domain}>" title="国美+app" bp-data='{"event_id":"B000P001"}'><img src="<{$pcimgpath}>/images/public/logo.png"></a></div>
					<?php endif;?>
		        	<div class="search">
		          		<div class="search-val">
			            	<p data-node="selectbtn">
			            		<span data-node="selected" data-selected="<{$selectWords.selectkey}>"><{$selectWords.name}></span>
			            		<em class="icon icon-down">&#xea57;</em>
			            	</p>
			            	<div class="search-list" data-node="selectList">
								<?php foreach($selectList as $k=>$v):?>
								<a href="javascript:;" data-node="selector" data-selector="<?=$k?>" ><?=$v?></a>
								<?php endforeach;?>
			            	</div>
		          		</div>

		          		<input type="text" name="" value="<{$selectWords.keyword}>" data-node="selector"  placeholder="请输入关键词" autocomplete="off"><em class="icon icon-search" data-node="searchbtn">&#xe9a5;</em>
		        	</div>
					<div class="shop-car">
						<a href="javascript:;" data-action="codeDialog" data-value="扫描二维码，下载国美+APP查看个人信息">
							<em class="icon icon-car">&#xe991;</em>消息<span>0</span>条
						</a>
						<a href="<?php echo $order_domain.'cart';?>" target="_blank" rel="nofollow" data-node="_cart_">
							<em class="icon icon-car">&#xe915;</em>购物车<span data-node="buycar"><?=cartProductNum()?></span>件
						</a>
					</div>
	      		</div>
	    	</div>

		    <div class="menu">
		      	<div class="wrap-box clearfix">
		        	<div class="nav">
		        		<a href="<{$main_domain}>" <if condition="!isset($nav_active)||empty($nav_active)"> bp-data='{"event_id":"B000P002"}' class="active"</if> rel="nofollow">首页</a>
						<a href="<{$group_domain}>index" <if condition="isset($nav_active) && !empty($nav_active)"><eq name="nav_active" value="4">class="active"</eq></if> rel="nofollow" target="_blank">精彩圈子</a>

                        <a href="<{$mall_domain}>search/index?sort=1&order=1&page=1" <if condition="isset($nav_active) && !empty($nav_active)"><eq name="nav_active" value="1">class="active"</eq></if> rel="nofollow" target="_blank">热销商品</a>
						<a href="<{$mall_domain}>search/shop?sort=0&order=1&page=1" <if condition="isset($nav_active) && !empty($nav_active)"><eq name="nav_active" value="3">class="active"</eq></if> rel="nofollow" target="_blank">好店推荐</a>
						<a href="<{$main_domain}>others/process.html" rel="nofollow" target="_blank">商家入驻</a>
		        		<a href="<{$main_domain}>others/download.html" title="国美+app下载" target="_blank" data-node="dlQRCode">APP下载
			            	<div class="down-ma">
			              		<div class="sanjiao"></div><img src="<{$pccsspath}>/images/public/ma1.jpg" width="150">
			              		<p>扫一扫，快速加入国美+</p>
			            	</div>
		            	</a>
		       		</div>
		
		        <?php if(! $userId || $userId == 0){ ?>
			        <div class="index-regist" data-node="indexRegist">
			        	<a href="<{$passport_domain}>regist/index" rel="nofollow" bp-data='{"event_id":"B000P004"}'>注册</a>|<a href="<{$passport_domain}>login/index" rel="nofollow" bp-data='{"event_id":"B000P005"}'>登录</a>
			        </div>
		        <?php }else{ ?>
			        <div class="index-login">
						<a href="<{$i_domain}>index" class="name-color">
						<div class="index-login-head">
							<if condition="!empty($userinfos['imagePath'])">
								<if condition="$userinfos['isExpert']">
									<em class="icon-daren"></em>
								</if>
								<img src="<?php echo getResizeImg( $userinfos['imagePath'],80,80 )?>" data-node="headImg">
							<else />
								<img src="<{$pcimgpath}>/images/public/head-default.png" data-node="headImg">
							</if>
						</div>
						<span data-node="headName"><{$nickName}></span>
						</a>
			          	<div class="login-link">
			            	<div class="sanjiao"></div>
							<a href="<{$i_domain}>order" target="_blank" >我的订单</a>
							<a href="<{$i_domain}>topic" target="_blank">我的话题</a>
							<a href="<{$i_domain}>expert" target="_blank">
								<if condition="$userinfos['isExpert']">达人特权<else/>达人申请</if>
							</a>
							<a href="<{$i_domain}>group" target="_blank">我的圈子</a>
							<a href="<{$i_domain}>collect" target="_blank">我的收藏</a>
							<a href="<{$i_domain}>address" target="_blank">收货地址</a>
							<a href="<{$i_domain}>customerInfo" target="_blank">我的售后</a>
							<a href="<{$i_domain}>coupon" target="_blank">我的优惠券</a>
			            	<a href="<{$passport_domain}>login/logout" data-node>退出</a>
			          	</div>
			        </div>
		        <?php } ?>
		      	</div>
		    </div>
    	</div>

