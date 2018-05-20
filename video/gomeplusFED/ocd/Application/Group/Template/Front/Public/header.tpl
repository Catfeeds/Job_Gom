<!DOCTYPE html>
<html <?php if(isset($dataUserRem)){ echo ' data-use-rem='.$dataUserRem; } ?>>
<head>
	 <script>
      var BPConfig = {
			startTime:new Date().valueOf()
		};
    </script> 
	<script>
		var userId = <?php echo isset($userId) ? $userId : 0; ?>;
		var alertIsLogin = <?php echo isset($alertIsLogin) ? $alertIsLogin : 0; ?>;
		var _PUBLIC_ = '<?php echo $wapjspath;?>';
    </script>  
<meta charset="UTF-8">
	<title><?php echo isset($title) ? $title : '国美+'; ?></title>
	<meta name="keywords" content="<?php echo isset($keywords) ? $keywords : '国美+,国美Plus'; ?>" />
	<meta name="description" content="<?php echo isset($description) ? $description : '国美+,国美Plus'; ?>" />
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<!--	<meta name="apple-mobile-web-app-capable" content="yes">-->
<!--	<meta name="apple-mobile-web-app-status-bar-style" content="black">-->
	<meta name="format-detection" content="telephone=no, email=no" />
	<meta name="google" value="notranslate">
	<meta name="description" content="" />
	<meta name="author" content="Administrator" />
	<meta name="apple-itunes-app" content="app-id=123131232132" />
	<meta name="HandheldFriendly" content="true">
	<meta name="MobileOptimized" content="320">
	<meta name="x5-orientation" content="portrait">
	<meta name="full-screen" content="yes">
	<meta name="x5-fullscreen" content="true">
	<meta name="browsermode" content="application">
	<meta name="x5-page-mode" content="app">
    <meta name="apple-mobile-web-app-title" content="美信">
	<meta name="x5-page-mode" content="default"/>
	<link rel="shortcut icon" href="<?php echo $wapcsspath;?>/images/favicon.ico" />
	<link rel="bookmark" href="<?php echo $wapcsspath;?>/images/favicon.ico" type="image/x-icon"　/>
	<link rel="stylesheet" type="text/css" href="<?php echo $wapcsspath;?>/css/public/public.css?version=<?php echo C('CSS_VERSION'); ?>">
	<?php if(isset($csspath)){ ?>
	<link rel="stylesheet" type="text/css" href="<?php echo $wapcsspath;?>/css/module/<{$csspath}>?version=<?php echo C('CSS_VERSION'); ?>">
	<?php } ?>
	<script>
    	BPConfig.headEndTime = new Date().valueOf();
		BPConfig.serverTime = <?php echo time();?>;
		<?php
		//埋点数据输出到js变量
		if( isset($BPConfigData) && is_array($BPConfigData) && !empty($BPConfigData) ){
			foreach($BPConfigData as $key=>$val){
				echo 'BPConfig.' . $key . '=' . (is_string($val)?"'$val'":$val) . ';';
			}
		}
		?>
    </script>
    <script crossorigin src="<?php echo $wapjspath;?>/buriedPoint.min.js?version=<?php echo C('JS_VERSION'); ?>"></script>
</head>
<body>
