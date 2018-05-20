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
      <!-- 升级失败-->
      <div class="oac-result"><em class="iconn-49"></em>
        <div class="result-txt">
          <p class="txt-big">您未能成功升级一账通账户</p>
        </div>
        <div class="btnwrap"><a href="javascipt:;" class="pc-btn pc-btnh45">重新升级</a></div>
      </div>
    </div>
<include file="Public:protocol" />
<include file="Home@Front/Public/footer" />
