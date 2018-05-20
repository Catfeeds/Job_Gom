<?php
	$csspath = "/css/module/login.css";
	$jspath = "/js/conf/updateAccount.js";
?>
<include file="Public:header" />
<body class="opg lg-bg">
	<div class="lg-header">
	  <div class="lg-header-in">
        <h1 class="lg-logo"><a>国美</a><span>|</span>升级国美一账通账户</h1>
      </div>
	</div>
	<div class="wrap-box oac-main">
      <!-- 已升级页面-->
      <div class="oac-result"><em class="iconn-20"></em>
        <div class="result-txt">
          <p class="txt-big nowrap">您已是国美一账通账户，请直接返回首页</p>
          <p class="txt-turn">8s后自动跳转到首页，您也可以点击<a href="<{$main_domain}>">立刻跳转到首页</a><em class="iconn-9"></em></p>
        </div>
      </div>
    </div>
<include file="Public:protocol" />
<include file="Home@Front/Public/footer" />
