<?php
$csspath='/css/module/login.css';
$jspath='/js/conf/login.js';
?>
<include file="Public:header" />
<style type="text/css">
.opg .footer{
    background-color: #fff;
    margin-top: 0;
}
.opg .footer .wrap-box{
  background-color: #fff;
}
.opg .footer dl.link-list dt{
    color: #333;
}
</style>

<body class="opg lg-bg">
    <div class="lg-header">
      <div class="lg-header-in">
        <h1 class="lg-logo"><a href="<{$main_domain}>">国美</a></h1>
      </div>
    </div>
    <div class="land-main">
      <div class="lg-main land-bg">
        <div class="lg-land-main" data-node="userForm">
        <a href="javascript:;" class="lg-saoma" data-action="qrCodeBtn"></a>
          <h4 class="lg-land-tl">欢迎登录</h4>
           <div class="lg-error-tip none clearfix" data-node="error"> <em class="iconn-12"></em><span data-node="error-message"></span></div>

          <div class="land-form">
            <div class="land-form-it">
              <em class="iconn-13 none" data-node="emptyUser"></em>
              <em class="iconn-14"></em>
              <input type="txt" placeholder="手机号 / 国美在线账号" class="land-input-md" data-node="userNum">
            </div>
            <div class="land-form-it">
              <em class="iconn-13 none" data-node="emptyPwd"></em>
              <em class="iconn-15"></em>
              <input type="password" placeholder="密码" class="land-input-md" data-node="userPwd">
            </div>
            <div class="land-form-cell none" data-node="identifyplace">
              <input type="txt" placeholder="请输入验证码" data-node="code"  class="land-input-short"><img src="" class="code-img"><a href="javascript:;" class="chage-code" data-node="change-code">换一张</a>
            </div>
          </div>

          <div class="land-forget-txt">
            <a href="/forgetpwd" class="forget-ps-word">忘记密码</a><a href="/regist" class="rapid-log">立即注册</a>
          </div>

          <a href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45" data-node="userLogin">登 录</a>
          <a href="/protocol/authorize" class="oac-btn">升级国美一账通账户</a>
          <p class="land-types">
            <span>第三方登录：</span>
            <a class="iconn-16" href="/login/connect_qq" alt="QQ"></a>
            <a class="iconn-17" href="/login/connect_wechat" alt="微信"></a>
            <a class="iconn-18" href="/login/connect_wb" alt="微博"></a>
            <a class="icon icon-gm" href="/login/connect_gm" alt="美付宝">&#xe936;</a>
            <a class="icon icon-gj" href="/login/connect_jx" alt="极信通信">&#xe936;</a>
          </p>

          <div style="display:none" class="lg-code-main" data-node="qrCodeBox">
              <a href="javascript:;" class="lg-saoma" data-action="accLoginBtn"></a>
              <h5 class="land-title">手机扫码，安全登录</h5>
              <div class="land-code-img">
                <img src="" data-node="qrCodeImg">
                <div style="display:none" class="sm-failed" data-node="qrCodeFailBox">
                  <span data-node="qrCodeTip">二维码已失效</span>
                  <a href="javascript:;" data-action="refQrCode">点击刷新</a>
                </div>
              </div>
              <div class="land-bottom clearfix"><em class="iconn-19"></em>
                <p>打开 <span>国美 APP<br></span>扫一扫登录</p>
              </div>
          </div>

          <div style="display:none" class="lg-code-main" data-node="qrCodeSucBox">
              <a href="javascript:;" class="lg-saoma" data-action="accLoginBtn"></a>
              <h5 class="land-title">手机扫码，安全登录</h5>
              <div class="sm-success">
                <img src="<{$pcimgpath}>/images/login/sm-success.jpg" class="sm-succes-img">
                <span>扫描成功</span>
                <p>请在手机上确认登录</p>
                <!-- <a href="javascript:;" data-action="backToQrCode">返回二维码登录</a> -->
              </div>
          </div>

        </div>
      </div>
    </div>
<include file="Home@Front/Public/footer" />
