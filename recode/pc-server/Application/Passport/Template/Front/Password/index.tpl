<?php
    $csspath = 'Login/index.css';
    $jspath = '/js/conf/forgetPwd_mobile.js';
?>
<include file="Public:header" />
<div class="page">
		<header class="header">
			<h1>重置密码
				<span onclick="history.go(-1)" class="goback"></span>
			</h1>
		</header>
		<div class="heiasd"></div>
		<div class="input_text gapup">
			<input id="phoneoremail" type="text" placeholder="请输入手机号" class="r_input_a">
		</div>
		<div class="yzm_pwd">
			<div class="text_input gapup">
				<input id="yzmpwd" type="text" placeholder="请输入验证码"  class="r_input_b">
				<button class="changecode  r_btn_c"><img id="identify_code" src="" alt="验证码"></button>
			</div>
			<a class="changecode" href="javascript:void(0)" id="changeimg">看不清？点击更换验证码</a>
		</div>
		<div class="btnbox">
			<button disabled="disabled" id="forget_pwd" class="r_btn_a">下一步</button>
		</div>
	</div>
<include file="Home@Front/Public/footer" />
