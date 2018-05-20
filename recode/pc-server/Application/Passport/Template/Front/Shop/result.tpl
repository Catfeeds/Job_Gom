<?php
   $csspath='/css/module/usercenter.css';
   $jspath  = '/js/conf/store.js';
?>
<include file="Public:header" />
  <body class="opg lg-bg">
    <div class="lg-header">
      <div class="lg-header-in">
        <h1 class="lg-logo"><a href="<{$main_domain}>">国美</a></h1>
      </div>
    </div>
    <div class="lg-main">
      <!--步骤 开始-->
      <ul class="lg-steps clearfix">
        <li class="active"><em>1</em>填写门店信息</li>
        <li class="active"><em>2</em>重置完成</li>
      </ul>
      <!--步骤 结束-->
      <div class="lg-form">
        <!--重置完成-->
        <h4 class="lg-succ-top"><em class="iconn-20"></em>门店会员密码重置成功！</h4>
        <p class="congratulation">已下发至“<span><{$mobile}></span>”手机，请查收短信，马上<a href="/login">登录</a></p>
      </div>
    </div>
<include file="Home@Front/Public/footer" />
