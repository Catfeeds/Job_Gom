<?php
   $csspath = '/css/module/login/login.css';;
    $jspath = '/js/conf/forgetPwd_newPwd.js';
?>
<include file="Public:header" />
<body class="opg lg-bg">
    <div class="lg-header">
      <div class="lg-header-in">
        <h1 class="lg-logo"><a href="<{$main_domain}>">国美plus</a></h1>
      </div>
    </div>
    <div class="lg-main">
      <!--步骤 开始-->
      <ul class="lg-steps clearfix">
        <li class="active"><em>1</em>填写用户名</li>
        <li class="active"><em>2</em>验证身份</li>
        <li class="active"><em>3</em>设置新密码</li>
        <li class="active"><em>4</em>重置完成</li>
      </ul>
      <!--步骤 结束-->
      <div class="lg-form">
        <h4 class="lg-succ-top"><img src="<{$pcimgpath}>/images/login/lg-all-big.png">更新成功！</h4><span class="congratulation">恭喜您！您的新密码已设置成功，为保证您购物安全，建议您定期更改密码以保护账户安全。</span><a href="<{$passport_domain}>login" class="lg-btn-bor marg" data-action="skipPage">去登录</a>
      </div>
    </div>
<include file="Home@Front/Public/footer" />
