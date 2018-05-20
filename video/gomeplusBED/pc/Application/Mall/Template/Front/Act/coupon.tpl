<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <title>过新年 怼红包 - 国美</title>
    <meta name="author" content="美信网络技术有限公司">
    <meta name="description" content="国美 APP是全新的社交电商平台，整合国美优质商家，以兴趣圈子为基础，达人为核心的社交购物社区，用户快乐分享同时轻松赚取返利佣金！赶快下载国美 APP！">
    <meta name="keywords" content="国美 APP,国美 APP下载,国美官网,国美iso版下载,国美Android版下载">
	<link rel="stylesheet" type="text/css" href="<{$pccsspath}>/css/redpacket/index.css?version=<?php echo C('CSS_VERSION'); ?>">
</head>
    <body>
      <div class="count">
        <p>￥<span data-node="total"><{$data['data']['total_amount']}></span>.00</p>
      </div>
      <div class="info">
        <div class="info-list">
          <div class="prizesList">
          <if condition="!empty($prizeList['data'])">
	           <ul class="clearfix" data-node="prizesList">
		           <volist name="prizeList.data" id="item">
		             <li><{$item['message']}></li>
		           </volist>
	           </ul>
           <elseif  condition="!empty($prizeList['message']) && $prizeList['code'] == 10005" />
				<h2>活动即将火爆开启！</h2>
           </if>
          </div> 
          <p><img src="<{$pcimgpath}>/images/redpacket/face.gif"></p>
        </div>        
      </div>
      <div class="step"></div>
      <div class="rule"><p></p></div>
      <div class="code"></div>
      <script src="<{$pcjspath}>/js/conf/vendor.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
	  <script src="<{$pcjspath}>/js/conf/redpacket.js?version=<?php echo C('JS_VERSION'); ?>" crossorigin></script>
	<?php if(APP_STATUS ==='pro'){ ?>
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
      
    </body>

</html>