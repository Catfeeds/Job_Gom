<?php
    $csspath='/css/module/login.css';
    $jspath = '/js/conf/relevancePhone.js';
?>
<include file="Public:header" />
<body class="opg lg-bg">
<script>
    $GLOBAL_CONFIG['whereFrom'] = '<{$whereFrom}>';
</script>
    <div class="lg-header">
      <div class="lg-header-in">
        <h1 class="lg-logo"><a href="<{$main_domain}>">国美</a></h1>
      </div>
    </div>
    <div class="lg-main oac-main">
      <div class="oacphone">
      <h4 class="lg-tip-title">关联手机号</h4>
      <div class="lg-form" data-node="snsBindPhone">
        <ul class="lg-form-list">
          <div class="lg-error-tip none clearfix" data-node="publicErrBox"><em class="iconn-12"></em><span data-node="publicErr"></span></div>
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
          <li class="clearfix lg-form-it lg-form-error none" data-node="errorBorderPwd">
            <label>设置密码</label>
            <div class="lg-form-cont">
              <input type="password" placeholder="设置密码" class="lg-input-it" data-node="pwd">
              <!--.active为隐藏密码-->
              <em class="icon-eyes active" data-action="pwdEye"></em><em class="iconn-20 lg-allright hide"></em>
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
          <li class="clearfix lg-form-it oac-agreement hide" data-node="oacAgreement">
            <label></label>
            <div class="lg-form-cont"><em class="iconn-20 lg-radio lg-radio-true" data-node="agreement"></em>
              <!--切换lg-radio-true-->
              <p class="lg-txt txt-small"><b>【审慎阅读】</b>注册协议已更新，您在点击同意前，应当认真阅读以下协议，尤其粗体标识的重要条款。请您务必审慎阅读、充分理解协议中相关条款内容。<br><b>【特别提示】</b>当您点击同意后，即表示您已充分阅读、理解并接受协议的全部内容。如您因平台服务与国美发生争议的，适用《国美平台服务协议》处理。<a target="_blank" href="/protocol/gomeagreement">《国美平台服务协议》</a><a target="_blank" href="/protocol/mfbagreement">《美付宝用户服务协议》</a></p><span class="lg-warm hide" data-node="tipAgree">请同意协议并勾选</span>
            </div>
          </li>
        </ul><a href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45 lg-mt"  data-action="submit">完 成</a>
      </div>
    </div>
    </div>
    <script type="text/javascript">
      var snsUserId = "<{$snsUserId}>";
      var unionId = "<{$unionId}>";
      //var state = "<{$Think.session.state | base64_decode}>";
    </script>
<include file="Home@Front/Public/footer" />

