<?php
    $csspath = '/css/module/login/login.css';
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
        <li class="active"><em>1</em>验证身份</li>
        <li class="active"><em>2</em>设置新密码</li>
        <li><em>3</em>重置完成</li>
      </ul>
      <!--步骤 结束-->
      <div class="lg-form" data-node="forgetPwdStepThree">
        <ul class="lg-form-list">
          <div class="lg-error-tip none clearfix" data-node="publicErrBox"><em class="icon icon-error">
            </em><span data-node="publicErr"></span></div>
          <li class="clearfix lg-form-it" data-node="errorBorderPwd">
            <label>设置密码</label>
            <div class="lg-form-cont">
              <em data-node="rightTip" class="lg-allright hide"></em>
              <input type="password" id="setpwd" placeholder="设置密码"  class="lg-input-it" data-node="pwd">
            </div>
            <div class="pass-level hide" data-node="pwdTip"> <span class="level-weak">弱</span><span>中</span><span>强</span></div><span class="lg-warm" data-node="errorPwd"></span>
          </li>
          <li class="clearfix lg-form-it" data-node="errorBorderSurePwd">
            <label>确认密码</label>
            <div class="lg-form-cont">
             <em data-node="sureRightTip" class="lg-allright hide"></em>
              <input type="password" id="setpwd2" placeholder="请再次输入密码" class="lg-input-it" data-node="surePwd">
            </div><span class="lg-warm" data-node="errorSurePwd"></span>
          </li>
        </ul><a id="a_fourth" href="javascript:;" class="pc-btn pc-btnw300 pc-btnh45 lg-mt" data-action="sureBtn">确 定</a>
      </div>
    </div>
<include file="Home@Front/Public/footer" />
