<?php
  $csspath = "/css/module/login/login.css";
?>
<include file="Public:header" />
<script>
window._page_name_ = '注册完成';
window._page_id_ = 'E004';
</script>
<body class="opg lg-bg">
    <div class="lg-header">
      <div class="lg-header-in">
        <h1 class="lg-logo"><a href="<{$main_domain}>">国美plus</a></h1>
      </div>
    </div>
    <div class="lg-main">
      <!--步骤 开始-->
      <ul class="lg-steps clearfix">
        <li class="active"><em>1</em>设置账号、密码</li>
        <li class="active"><em>2</em>填写昵称、推荐码</li>
        <li class="active"><em>3</em>注册完成</li>
      </ul>
      <!--步骤 结束-->
      <div class="lg-form clearfix">
        <div class="lg-succ-left"><img src="<{$pcimgpath}>/images/login/code-erw.jpg">
          <p class="lg-scan">扫描下载 <a>国美+</a>手机客户端</p>
        </div>
        <div class="lg-succ-right">
          <h4 class="lg-succ-tl">注册成功！</h4>
          <p class="lg-succ-para">恭喜您，您的国美+账号：<span data-node = "user_id" ><{$mobile}> <br></span>可用于登录国美+APP / wap / pc端 </p><a data-node = "btn_next" href="<?php echo $passport_domain.'login/index'; ?>" class="lg-btn-bor">去登录</a>
        </div>
      </div>
    </div>
<include file="Home@Front/Public/footer" />
