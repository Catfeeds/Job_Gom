<?php
    $csspath = 'usercenter.css';
    $jspath = '/js/conf/uc_setPwd.js';  
?>
<include file="Home@Front/Public:header" />
<div class="wrap-box mart20 clearfix">
  <include file="Front/Public/left" />
  <div class="order-right h590" data-node="resetPwdBox">
        <div class="set-personal-title"><a href="javascript:;" class="active">修改登录密码</a></div>
        <div class="change-pasw" data-node="changeBox">

        <p class="prompt hide" data-node="publicErrBox">此昵称太受欢迎了，已经有人抢了</p>
          <ul>
            <li class="clearfix"><span class="label bind-m">当前绑定手机号：</span>
              <pan><{$mobile}></pan>
            </li>
            <li class="clearfix"><span class="label">短信验证码：</span>
              <div class="input-box error fl">
                <input type="text" placeholder="请输入短信验证码" data-node="msgCode"/>
                <a href="javascript:;" class="get-code" data-action="sendMsgBtn">获取验证码</a>
                <p class="error-txt hide" data-node="errorCode">验证码输入有误，请重新输入</p>
              </div>
            </li>
            <li class="clearfix"><span class="label">设置登陆密码：</span>
              <div class="input-box error fl">
                <input type="password" placeholder="请输入新密码" data-node="pwd"/>
                <div class="pass-level hide" data-node="pwdTip">
                    <span class="level-weak">弱</span>
                    <span>中</span>
                    <span>强</span>
                </div>
                <p class="error-txt hide" data-node="errorPwd">请输入6-20位英文字母,数字或符号</p>
              </div>
            </li>
            <li class="clearfix"><span class="label">确认登陆密码：</span>
              <div class="input-box error fl">
                <input type="password" placeholder="请再次输入新密码" data-node="surePwd"/>
                <p class="error-txt hide" data-node="errorSurePwd">两次输入的密码不一致</p>
              </div>
            </li>
          </ul>
          <a href="javascript:;" class="personal-save-btn" data-action="subBtn">保存</a>
        </div>
        <div class="modify-succeed clearfix hide" data-node="suc"><em class="iconn-20"></em>
      <div class="succeed-txt">
        <h2>修改成功</h2>
        <p>您的密码修改成功，请牢记新的登录密码！</p>
      </div>
        </div>
  </div>
</div>  
<include file="Home@Front/Public:footer" />