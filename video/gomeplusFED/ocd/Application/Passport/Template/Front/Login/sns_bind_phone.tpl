<?php
    $csspath='/css/module/login/login.css';
    $jspath = '/js/conf/relevancePhone.js';
?>
<include file="Public:header" />
<body class="opg lg-bg">
<script>
    $GLOBAL_CONFIG['whereFrom'] = '<{$whereFrom}>';
</script>
    <div class="lg-header">
      <div class="lg-header-in">
        <h1 class="lg-logo"><a href="<{$main_domain}>">国美plus</a></h1>
      </div>
    </div>
    <div class="lg-main">
      <h4 class="lg-tip-title">关联手机号</h4>
      <div class="lg-form" data-node="snsBindPhone">
        <ul class="lg-form-list">
          <div class="lg-error-tip none clearfix" data-node="publicErrBox"><em class="icon icon-error">&#xe983;</em><span data-node="publicErr"></span></div>
          <li class="clearfix lg-form-it" data-node="errorBorderTel">
            <label>手机号</label>
            <div class="lg-form-cont">
              <input type="text" placeholder="请输入手机号码" class="lg-input-it" data-node="tel">
            </div><span class="lg-warm" data-node="errorTel"> </span>
          </li>
          <li class="clearfix lg-form-it" data-node="errorBorderMsgCode">
            <label>短信验证码</label>
            <div class="lg-form-cont"><a href="javascript:;" class="lg-codes" data-action="sendMsgCode">获取验证码</a>
              <input type="text" placeholder="请输入短信验证码" class="lg-input-it" data-node="msgCode" disabled="disabled">
            </div><span class="lg-warm" data-node="errorMsgCode"></span>
          </li>
          <li class="clearfix lg-form-it none" data-node="errorBorderPwd">
            <label>设置密码</label>
            <div class="lg-form-cont"><em class="lg-codes icon" data-action="pwdEye">&#xe993;</em>
              <!--点击之后 &#xe94e；-->
              <input type="password" placeholder="设置密码" class="lg-input-it" data-node="pwd">
            </div>
            <div class="pass-level none" data-node="pwdTip">
                <span class="level-weak">弱</span>
                <span>中</span>
                <span>强</span>
            </div>
            <span class="lg-warm" data-node="errorPwd"></span>
          </li>
          <li class="clearfix lg-form-it none" data-node="errorBorderRefCode">
            <label>推荐码</label>
            <div class="lg-form-cont">
              <input type="text" placeholder="推荐码（选填）" class="lg-input-it" data-node="referralCode">
            </div>
             <span class="lg-warm" data-node="errorRefCode"></span>
          </li>
        </ul><a href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45 lg-mt"  data-action="submit">完 成</a>
      </div>
    </div>
    <script type="text/javascript">
      var snsUserId = "<{$snsUserId}>";
      var unionId = "<{$unionId}>";
      //var state = "<{$Think.session.state | base64_decode}>";
    </script>
<include file="Home@Front/Public/footer" />

