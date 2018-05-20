<?php
    $csspath = 'wxpay.css';
    $jspath = '/js/conf/weixinPayCode.js';
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><{$title}></title>
    <meta name="author" content="<{$author}>">
    <meta name="description" content="<{$description}>">
    <meta property="qc:admins" content="2401434660750256775504536375" />
    <meta name="keywords" content="<{$keywords}>">
    <link rel="stylesheet" type="text/css" href="<{$pccsspath}>/css/public/public.css?version=<?php echo C('CSS_VERSION'); ?>">
    <link rel="stylesheet" type="text/css" href="<{$pccsspath}>/css/module/shop/shoppublic.css?version=<?php echo C('CSS_VERSION'); ?>">
    <?php if(isset($csspath)){ ?>
    <link rel="stylesheet" type="text/css" href="<{$pccsspath}>/css/module/<{$csspath}>?version=<?php echo C('CSS_VERSION'); ?>">
    <?php } ?>
    <script>
        var $GLOBAL_CONFIG = {};
        $GLOBAL_CONFIG['current_url']= '<?php echo $current_url; ?>';//当前url
        $GLOBAL_CONFIG['islogin']= '<?php echo $userId ? 1 : 0; ?>';//是否登录
        $GLOBAL_CONFIG['userId'] = '<{$userId}>';
        $GLOBAL_CONFIG['nickName'] = '<{$nickName}>';
        $GLOBAL_CONFIG['main_domain']= '<?php echo $main_domain ; ?>';//主域名
        $GLOBAL_CONFIG['passport_domain']= '<?php echo $passport_domain ; ?>';//登录注册域名
        $GLOBAL_CONFIG['order_domain']= '<?php echo $order_domain; ?>';//订单域名
        $GLOBAL_CONFIG['group_domain']= '<?php echo $group_domain; ?>';//社交
        $GLOBAL_CONFIG['i_domain']= '<?php echo $i_domain; ?>';//用户中心
        $GLOBAL_CONFIG['mall_domain']= '<?php echo $mall_domain; ?>'//商城
        $GLOBAL_CONFIG['pcjspath'] = '<{$pcjspath}>';
        $GLOBAL_CONFIG['pccsspath'] = '<{$pccsspath}>';
        $GLOBAL_CONFIG['pcimgpath'] = '<{$pcimgpath}>';
    </script>
</head>
<script>
    $GLOBAL_CONFIG['mergerId'] = '<?php echo $mergerId;?>';
    $GLOBAL_CONFIG['tradeNo'] = '<?php echo $tradeNo;?>';
</script>
<body class="opg">
<div class="wxpay-header"> <img src="<{$pcimgpath}>/images/public/wxpay.png">微信支付</div>
<div class="wrap-box">
    <div class="code-content"><img data-node="payCodeImg" src="<?=$codeUrl?>">
        <div class="tip" data-node="tips">扫一扫<br>二维码以完成支付</div>
        <div class="bar clearfix"><span class="bar-l"></span><em class="iconn-5"></em><span class="bar-r"></span></div><span class="price">￥<?=$fee?></span>
    </div>
    <div class="order-content">
        <h2>美信</h2>
        <p>美信－订单<?=$mergerId?></p>
        <div class="clearfix"><span class="span-l">交易单号</span><span class="span-r"><?=$tradeNo?></span></div>
        <div class="clearfix"><span class="span-l">创建时间</span><span class="span-r"><?=$tradeDate?></span></div>
    </div>
</div>
<include file="Home@Front/Public/footer" />
