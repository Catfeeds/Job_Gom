<?php
	$csspath = "/css/module/login.css";
	$jspath = "/js/conf/updateAccount.js";
?>
<include file="Public:header" />
<body class="opg lg-bg">
	<div class="lg-header">
      <div class="lg-header-in">
        <h1 class="lg-logo"><a href="<{$main_domain}>" >国美</a><span>|</span>升级国美一账通账户</h1>
        <p>已有国美账号，请直接 <a href="/login" bp-data='{"event_id": "B000P022"}'>登录 </a><em class="iconn-9"></em></p>
      </div>
	</div>
    <div class="wrap-box oac-main">
      <div class="login-txt">
        <p>服务介绍：国美目前可提供在线销售、售后服务、金融以及其他各项服务。国美一账通是国美互联网生态系列网站、社区以及专业系统联合推出的用户服务模式，您只需要拥有一个一账通账户，即可通行于国美互联网生态支持一账通账户的各站点，无需重复注册，即可获得高效的服务体验。</p>
        <p>服务特点：登录国美互联网生态相关网站更为简单；登录和支付认证分离，登录防护技术升级，安全性更高；后续随着系统升级可合并和增加用户使用账户，便捷和私密随心所欲。</p>
      </div>
      <div class="login" data-node="userForm">
        <!-- 登录 - 协议 - 同意-->
        <ul class="lg-form-list">
          <li class="clearfix lg-form-it lg-form-error">
            <label></label>
            <div class="lg-error-tip none clearfix" data-node='error'><em class="iconn-12"></em><span data-node="error-message">您已三次输入错误，请输入验证码</span></div>
          </li>
          <li class="clearfix lg-form-it">
            <label>手机号：</label>
            <div class="lg-form-cont">
              <input type="text" placeholder="手机/国美在线账号" class="lg-input-it" data-node="userNum">
            </div><span class="lg-warm"></span>
          </li>
          <li class="clearfix lg-form-it">
            <label>密码：</label>
            <div class="lg-form-cont">
              <input type="password" placeholder="请输入密码" class="lg-input-it" data-node="userPwd">
            </div><span class="lg-warm"></span>
          </li>
          <li class="clearfix lg-form-it none" data-node="identifyplace">
            <label>验证码：</label>
            <div class="lg-form-cont land-form-cell">
              <input type="txt" placeholder="请输入验证码" class="lg-input-it land-input-short" data-node="code"><img src="" class="code-img"><a href="javascript:;" class="chage-code" data-node='change-code'>换一张</a>
            </div><span class="lg-warm"></span>
          </li>
        </ul><a href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45 lg-mt" data-node="userLogin">升级一账通账户</a>
		<a href="/forgetpwd/index" class="forget-pw">忘记密码</a>
       
      </div>
      <!-- 协议弹层-->
      <div class="black-mask" data-node="ssoMask" style="display:block"></div>
      <div class="prompt-box" data-node="ssoMain" style="display:block"><em class="icon-btn"></em>
        <h3>服务协议</h3>
        <p><span>【审慎阅读】注册协议已更新，您在点击同意前，应当认真阅读以下协议，尤其粗体标识的重要条款。请您务必审慎阅读、充分理解            协议中相关条款内容。</span><span>【特别提示】当您点击同意后，即表示您已充分阅读、理解并接受协议的全部内容。如您因平台服务与国美发生争议的，适用《国美   平台服务协议》处理。</span></p><a href="<{$passport_domain}>protocol/gomeagreement" target="_blank" class="agreement">《国美平台服务协议》</a><a href="<{$passport_domain}>protocol/mfbagreement"  target="_blank" class="agreement">《美付宝用户服务协议》</a><a href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45">同意协议</a>
      </div>
    </div>
<include file="Home@Front/Public/footer" />
