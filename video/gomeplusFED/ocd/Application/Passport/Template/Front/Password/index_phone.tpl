<?php
    $jspath = 'Password/phone.js';
?>
<include file="Public:header" />
	<div class="page">
		<header class="header">
			<h1>重置密码
				<span class="goback" onclick="history.go(-1)" ></span>
			</h1>
		</header>
		<p class="p"><!-- <span id="w_nickname"></span>， -->您好，已验证手机号：<span id="w_ph"></span></p>
		<div class="text_input">
			<input type="text" id="sjyzm" maxlength="6" placeholder="请输入验证码" class="r_input_b">
			<button id="gtyzm" class="r_btn_c">获取验证码</button>
		</div>
		<div class="btnbox">
			<button disabled="disabled" id="sjnext" class="r_btn_a">下一步</button>
		</div>
	</div>
<include file="Home@Front/Public/footer" />
