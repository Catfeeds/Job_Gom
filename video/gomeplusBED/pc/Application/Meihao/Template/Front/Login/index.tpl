<?php
	$csspath = "meihaoLoading.css";
	$jspath = "/js/conf/login.js";
?>
<include file="Account:header"/>

	<div class="sofort">
	  <div class="sofort-load">
		<div class="load">
		  <p>欢迎使用美号创作平台，请先登录</p>
		  <div><a href="javascript:;" data-node="login-btn">立即登录</a></div>
		</div>
	  </div>

	</div>
   <notempty name="messageList">
	<div class="notice clearfix">
		<div class="notice-cont">系统公告</div>
		<div class="notice-info"> <a href="<{$messageList['notifications'][0]['landingPageUrl']}>" target="_blank"><{$messageList['notifications'][0]['title']}></a></div>
		<div class="notice-btn"><a href="/message/index" target="_blank">查看更多</a></div>
	</div>
   </notempty>
<include file="Home@Public:mh_footer"/>