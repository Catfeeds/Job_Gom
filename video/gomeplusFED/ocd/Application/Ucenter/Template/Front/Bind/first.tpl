<?php
	$csspath = 'usercenter/usercenter.css';
	$jspath = '/js/conf/uc_resetTel_step1.js';	
?>
<include file="Home@Front/Public:header" />
<div class="wrap-box mart20 clearfix">
	<include file="Front/Public/left" />
	<div class="order-right">
		<div class="bind-phone-nav">
			<a href="javascript:;" class="bind-phone-nav-a">修改绑定手机号</a>
		</div>
		<ul class="lg-steps bind-phone-steps clearfix">
			<li class="active"><em>1</em>验证身份</li>
			<li><em>2</em>修改手机号</li>
			<li><em>3</em>修改成功</li>
		</ul>
		<div class="lg-form bind-phone-form" data-node="formBox">
			<ul class="lg-form-list">
				<div class="lg-error-tip clearfix hide" data-node="publicErr">
					<em class="icon icon-error">&#xe983;</em>
					<span data-node="errText">您已三次输入错误，请输入验证码</span>
				</div>
				<li class="clearfix lg-form-it">
					<label>已验证手机：</label>
					<span class="verified-phone"><{$mobile}></span>
				</li>
				<li class="clearfix lg-form-it code-tip" data-node="codeLi">
					<label>短信验证码：</label>
					<div class="lg-form-cont">
						<a href="javascript:;" class="lg-codes " data-action="sendMsg">获取验证码</a>
						<input type="text" placeholder="请输入6位短信验证码" class="lg-input-it" data-node="msgCode">
					</div>
					<span class="lg-warm hide" data-node="codeTip">
						<em class="icon" data-node="codeIcon">&#xea52;</em>
						<span data-node="codeText">验证码短信已发出，请注意查收</span>
					</span>
				</li>
				<li class="clearfix lg-form-it lg-form-error hide">
					<label>短信验证码：</label>
					<div class="lg-form-cont">
						<a href="javascript:;" class="lg-codes code-disabled">20s</a>
						<input type="text" placeholder="请输入6位短信验证码" class="lg-input-it">
					</div>
					<span class="lg-warm">验证码输入错误，请重新输入</span>
				</li>
			</ul>
			<a href="javascript:;" class="pc-btn pc-btnh45 bind-phone-btn" data-action="nextStep">下一步</a>
		</div>
	</div>
</div>
<include file="Home@Front/Public:footer" />