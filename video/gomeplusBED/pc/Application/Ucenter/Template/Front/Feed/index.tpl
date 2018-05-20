<?php
	$jspath = '/js/conf/feedback.js';
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <title>意见反馈-国美</title>
    <meta name="author" content="美信网络技术有限公司">
    <meta name="description" content="<{$desc}>">
    <meta name="keywords" content="<{$title}>">
    <link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/public/public.css">
    <link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/feedback.css">
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
    var userId = '<{$userId}>';
    </script>
</head>
<body class="opg">
    <div class="header">
      <div class="wrap-box clearfix">
        <h1 class="fl"><a href="<{$main_domain}>"><img src="<{$pcimgpath}>/images/public/logo.png"></a></h1>
      </div>
    </div>
    <div class="wrap-box bg-fff">
      <div class="w902">
        <h2>“国美” 用户反馈</h2>
        <div class="feed-error hide" data-node="tipError">bs接口返回错误</div>
        <div class="welcome">尊敬的用户：<br>您好！为了给您提供更好的服务，请大声说出您的建议或问题。对您的配合和支持表示衷心的感谢！</div>
        <h3><span class="red">*</span><strong>留言类型</strong><span class="red hide" data-node="typeTip">（请选择留言类型）</span></h3>
        <div class="type clearfix" data-node="typeList">
		<volist name="typeList" id="item">
		  <a href="javascript:;" data-index=<{$item.type}>> <{$item.name}> </a>
		</volist>
		</div>
        <h3><span class="red">*</span><strong>留言</strong><span class="red hide" data-node="messageTip">（请输入5-200个字符）</span></h3>
        <div class="textarea-box">
          <textarea data-node="message" placeholder="请输入您的建议和问题，以便我们为您提供更好的服务！"></textarea><div class="pa"><span data-node="messageNum">0</span>/200</div>
        </div>
        <h3><strong>上传截图</strong><span>（最多上传3张，仅支持JPG、PNG格式，图片大小不超过4M）</span></h3>
        <div class="clearfix" data-node="uploadList">
          <div class="upload add" data-add="picker"></div>
        </div>
        <div class="btn-box"><a href="javascript:;" class="pc-btn pc-btnh45" data-node="btnSubmit">提交</a></div>
      </div>
    </div>
<include file="Home@Front/Public:footer" />

