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
      <!-- 升级成功-->
      <div class="oac-result"><em class="iconn-20"></em>
        <div class="result-txt">
          <p class="txt-big">尊敬的<span class="bold"><{$userinfos.mobile}></span>恭喜您已经成功升级国美一账通账户！</p>
          <p class="txt-small">现在您只需要一个账户、一套密码、一次登录，即可轻松登录国美平台<span class="blue">国美在线</span>、<span class="blue">国美</span>、<span class="blue">来购</span>、<span class="blue">国美管家</span>、<span class="blue">三联手机</span>、<span class="blue">云智</span>、<span class="blue">华人金融</span>、<span class="blue">美易理财</span>、<span class="blue">国美基金</span>、<span class="blue">美易分</span>、<span class="blue">美借</span>、
            实现个人账户管理需求，享受一站式服务。
          </p>
          <p class="txt-turn">8s后自动跳转到首页，您也可以点击<a href="<{$main_domain}>">立刻跳转到首页</a><em class="iconn-9"></em></p>
        </div>
      </div>
    </div>
<include file="Public:protocol" />
<include file="Home@Front/Public/footer" />
