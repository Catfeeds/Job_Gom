<?php
    $csspath = '/css/module/login.css';
    $jspath = '/js/conf/forgetPwd_msgCode.js';
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
        <li class="active"><em>1</em>验证身份</li>
        <li><em>2</em>设置新密码</li>
        <li><em>3</em>重置完成</li>
      </ul>
      <!--步骤 结束-->
      <div class="lg-form" data-node="forgetPwdStepTwo">
        <!--<div class="lg-back-tl">您正在找回登录名为 <span><?php echo $mobileOrEmail;?> </span>的登录密码请点击“获取验证码”</div>-->
        <ul class="lg-form-list">
        <div class="lg-error-tip none clearfix" data-node="publicErrBox"><em class="iconn-12"></em><span data-node="publicErr"></span></div>
		 <li class="clearfix lg-form-it" data-node="errorBorderTel">
            <label>手机号</label>
            <div class="lg-form-cont">
              <em class="lg-allright"></em>
              <input id="phoneoremail"  name="phoneoremail" type="text" placeholder="请输入11位有效手机号" class="lg-input-it" data-node="tel">
            </div><span class="lg-warm" data-node="errorTel"> </span>
          </li>
          <li class="clearfix lg-form-it" data-node="errorBorderImgCode">
            <label>验证码</label>
            <div class="lg-form-cont">
              <input type="text" placeholder="请输入验证码" class="lg-input-it lg-input-short" data-node="imgCode"><img src="<{$passport_domain}>index/code?setid=getpassword&timeStamp=<{:time()}>" class="img-code" data-node='codeImg'><a href="javascript:;" class="change-txt" data-action="imgChangeBtn">换一张</a>
            </div><span class="lg-warm none" data-node="errImgCode"></span>
          </li>
          <li class="clearfix lg-form-it" data-node="errorBorderCode">
            <label>短信验证码</label>
            <div class="lg-form-cont"><a href="javascript:;" class="lg-codes" data-action="sendMsgBtn">获取验证码</a>
              <input name="verifyCode" id="verifyCode" type="text" placeholder="请输入短信验证码" class="lg-input-it" data-node="msgCode">
            </div><span class="lg-warm" data-node="errorCode"> </span>
          </li>
        </ul><a id="a_third" href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45 lg-mt" data-action="nextStep">下一步</a>
	  <a href="/shop/index" class="find-shop-psw">找回门店密码</a>
      </div>
    </div>
<include file="Home@Front/Public/footer" />
