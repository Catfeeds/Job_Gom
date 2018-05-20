<?php
	$csspath = "/css/module/login/login.css";
  $jspath = "/js/conf/register_account.js";
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
        <li class="active"><em>1</em>设置帐号、密码</li>
        <li><em>2</em>填写昵称</li>
        <li><em>3</em>注册完成</li> 
      </ul>
      <!--步骤 结束-->
      <div class="lg-form" data-node="lg-form">
        <ul class="lg-form-list">
          <li data-node = "phone_number" data-verification = "1" class="clearfix lg-form-it">
            <label>手机号</label>
            <div class="lg-form-cont"><em data-node = "phone_number_allright" class="lg-allright" style="visibility:hidden"></em>
              <input data-node = "input_phone_number" type="text" placeholder="请输入11位手机号码" class="lg-input-it" maxLength = 11> 
            </div><span data-node = "tip_phone_number" class="lg-warm" style="visibility:hidden"></span>
          </li>
          <li data-node = "msg_test" class="clearfix lg-form-it">
            <label>短信验证码</label>
            <div class="lg-form-cont"><a data-node = "get_verifyCode" class="lg-codes">获取验证码</a>
              <input data-node = "input_msg_test" type="text" placeholder="请输入6位短信验证码" class="lg-input-it" maxLength = 6>
            </div><span data-node = "tip_msg_test" class="lg-warm" style="visibility:hidden">验证码已发送您的手机，请查收，请勿泄漏</span>
          </li>
          <li data-node = "password" data-pass = "1" class="clearfix lg-form-it">
            <label>设置密码</label>
            <div class="lg-form-cont"><em data-node = "password_allright" class="lg-allright" style="visibility:hidden"></em>
              <!--点击之后 &#xe94e；-->
              <input data-node = "input_password" type="password" placeholder="设置密码" class="lg-input-it" maxLength = 20>
            </div>
            <div data-node = "pass_level" class="pass-level" style="display:none"> <span data-node = "level_weak" class="level-weak">弱</span><span data-node = "level_md" class="level-md">中</span><span data-node = "level_strong" class="level-strong">强</span></div><span data-node = "tip_pass" class="lg-warm" style="visibility:hidden">请输入6-20位英文字母,数字或符号</span>
          </li>
          <li data-node = "password_confirm" data-passConfirm = "1" class="clearfix lg-form-it">
            <label>确认密码</label>
            <div class="lg-form-cont"><em data-node = "password_confirm_allright" class="lg-allright" style="visibility:hidden"></em>
              <input data-node = "input_password_confirm" type="password" placeholder="请再次输入登录密码" class="lg-input-it" maxLength = 20>
            </div><span data-node = "tip_password_confirm" class="lg-warm" style="visibility:hidden">请再次输入密码</span>
          </li>
          <li class="clearfix lg-form-it">
            <label>推荐码</label>
            <div class="lg-form-cont"><em data-node = "code_allright" class="lg-allright" style="visibility:hidden"></em>
              <input data-node= "code_input" data-code = "1" data-userId = "" type="text" placeholder="推荐人ID（选填）" class="lg-input-it" maxLength='8'>
            </div><span data-node = "code_span" class="lg-warm"></span>
          </li>
          <li class="clearfix lg-form-it">
            <label> <em data-node = "check_agreement" class="lg-radio"></em>
            </label>
            <div class="lg-form-cont">
              <p class="lg-txt">我已阅读并同意<a data-node = "agreement" href="javascript:;">《国美+用户使用协议》</a></p>
            </div>
          </li>
        </ul><a data-node = "complete" class="pc-btn pc-btnw300 pc-btnh45 lg-mt" style="cursor:hand;cursor: pointer;">下一步</a>
        <p class="lg-txt txt-center">如果您已有国美+账号，请直接<a href="/login" bp-data='{"event_id": "B000P022"}'>登录</a></p>
      </div>
    </div>
<include file="Public:protocol" />
<include file="Home@Front/Public/footer" />
