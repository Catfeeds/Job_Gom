<?php
    $jspath = 'Password/setpwd.js';
?>
<include file="Public:header" />
<div class="slogin-back">
	<div class="page container-fluid">
		<header class="header">
			<h1>设置登录密码
				<span onclick="history.go(-1)" class="goback" ></span>
			</h1>
		</header>
		<p class="p">请输入6-20位英文字母、数字或符号</p>
		<div class="input_text">
			<input type="password" maxlength="20" id="setpwd" placeholder="请输入登录密码" class="r_input_a"/>
		</div>
	<!--	<div class="input_text" style="border-top:0;">
			<input type="test" maxlength="20" id="repwd" placeholder="请再次输入登录密码">
		</div>-->
		<div class="hidpsd" id="ycxs">
			<div>&nbsp;</div>
			<div><span class="r_autologin" style="background-position: 0px 0px;">隐藏密码</span></div>
		</div>
		<div class="btnbox slogin-back">
			<button disabled="disabled" id="setpwdBtn" class="r_btn_a">完成</button>
		</div>
		<input type="hidden" id="showpwd" value="1">
	</div>
</div>
<include file="Home@Front/Public/footer" />
