<?php
	$csspath = "/css/module/login.css";
  $jspath = "/js/conf/register_account.js";
?>
<include file="Public:header" />
<body class="opg lg-bg">
	<div class="lg-header">
      <div class="lg-header-in">
        <h1 class="lg-logo"><a href="<{$main_domain}>" >国美</a><span>|</span>欢迎注册</h1>
        <p>已有国美账号，请直接 <a href="/login" bp-data='{"event_id": "B000P022"}'>登录 </a><em class="iconn-9"></em></p>
      </div>
  </div>
  <div class="wrap-box">
      <!--步骤 开始-->
      <!--步骤 结束-->
      <div class="lg-form" data-node="lg-form">
        <ul class="lg-form-list">
          <li data-node = "phone_number" data-verification = "1" class="clearfix lg-form-it">
            <label></label>
            <div class="lg-form-cont"><em data-node = "phone_number_allright" class="iconn-20 lg-allright" style="visibility:hidden"></em>
              <input data-node = "input_phone_number" type="text" placeholder="手机号码" class="lg-input-it" maxLength = 11> 
            </div><span data-node = "tip_phone_number" class="lg-warm" style="visibility:hidden"></span>
          </li>
		  <li class="clearfix lg-form-it" data-node="check_code_li"><!-- lg-form-error -->
            <label></label>
            <div class="lg-form-cont">
              <input data-node="check_code_input" type="text" placeholder="验证码" class="lg-input-it lg-input-short"><img src="<{$passport_domain}>index/code?setid=register&timeStamp=<{:time()}>" class="img-code" data-node="check_code_img"><a href="javascript:;" class="change-txt" data-node="check_code_change">换一张</a>
            </div><span data-node="check_code_tip" class="lg-warm" style="visibility:hidden">验证码填写错误，请重新输入</span>
          </li>
          <li data-node = "msg_test" class="clearfix lg-form-it">
            <label></label>
            <div class="lg-form-cont"><a data-node = "get_verifyCode" class="lg-codes">获取验证码</a>
              <input data-node = "input_msg_test" type="text" placeholder="短信验证码" class="lg-input-it" maxLength = 6>
            </div><span data-node = "tip_msg_test" class="lg-warm" style="visibility:hidden">验证码已发送您的手机，请查收，请勿泄漏</span>
          </li>
          <li data-node = "password" data-pass = "1" class="clearfix lg-form-it">
            <label></label>
            <div class="lg-form-cont">
              <!--点击之后 &#xe94e；-->
              <input data-node = "input_password" type="password" placeholder="设置密码" class="lg-input-it" maxLength = 20>
              <em class="icon-eyes active" data-node="password_eyes"></em><em data-node = "password_allright" class="iconn-20 lg-allright" style="visibility:hidden"></em>
            </div>
            <div data-node = "pass_level" class="pass-level" style="display:none"> <span data-node = "level_weak" class="level-weak">弱</span><span data-node = "level_md" class="level-md">中</span><span data-node = "level_strong" class="level-strong">强</span></div><span data-node = "tip_pass" class="lg-warm" style="visibility:hidden">请输入6-20位英文字母,数字或符号</span>
          </li>
          <li class="clearfix lg-form-it">
            <label> </label>
            <div class="lg-form-cont">
              <p>我有推荐人，<span data-node="recommend_open">添加推荐码</span>帮助好友赚取收入<em class="iconn-2" data-node="recommend_icon"></em></p>
            </div>
          </li>
          <li class="clearfix lg-form-it add-code hide" data-node="code_li">
            <label></label>
            <div class="lg-form-cont">
              <em data-node = "code_allright" class="iconn-20 lg-allright" style="visibility:hidden"></em>
              <input data-node= "code_input" data-code = "1" <?php if(session('onlineUserId')):?>value="<?=session('onlineUserId')?>"<?php endif;?> data-userId = "" type="text" placeholder="推荐人ID（选填）" class="lg-input-it" maxLength='8'>
            </div><span data-node = "code_span" class="lg-warm"></span>
          </li>

        </ul>
        <a href="javascript:;" data-node = "complete" style="cursor:hand;cursor: pointer;" class="pc-btn pc-btnw300 pc-btnh45 lg-mt">立即注册</a>
      </div>
     <!-- 协议弹层-->
      <div class="black-mask" data-node="ssoMask" style="display:block"></div>
      <div class="prompt-box" data-node="ssoMain" style="display:block"><em class="icon-btn"></em>
        <h3>服务协议</h3>
        <p><span>【审慎阅读】注册协议已更新，您在点击同意前，应当认真阅读以下协议，尤其粗体标识的重要条款。请您务必审慎阅读、充分理解            协议中相关条款内容。</span><span>【特别提示】当您点击同意后，即表示您已充分阅读、理解并接受协议的全部内容。如您因平台服务与国美发生争议的，适用《国美   平台服务协议》处理。</span></p><a href="/protocol/gomeagreement" target="_blank" class="agreement">《国美平台服务协议》</a><a href="/protocol/mfbagreement"  target="_blank" class="agreement">《美付宝用户服务协议》</a><a href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45">同意协议</a>
      </div>
  </div>
<include file="Home@Front/Public/footer" />
