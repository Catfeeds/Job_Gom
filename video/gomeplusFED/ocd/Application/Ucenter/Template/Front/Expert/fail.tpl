<?php
    $csspath = 'usercenter/usercenter.css';
?>
<include file="header" />
<a href="<{$main_domain}>" class="back-to-index" target="_blank"></a>
<ul class="info-steps">
	<li class="bar"><span class="active"></span><span class="active"></span></li>
	<li class="step1 active"><span class="step-num"><em>1</em></span><span class="step-txt">填写资料</span></li>
	<li class="step2 active"><span class="step-num"><em>2</em></span><span class="step-txt">审核</span></li>
	<li class="step3 failed"><span class="step-num"><em>3</em></span><span class="step-txt">审核失败</span></li>
</ul>
<div class="fail-bg-box">
	<div class="dr-sprites review-fail-bg"></div>
</div>
<p class="review-txt"><span class="txt1">失败原因：<{$expertInfo.auditFailReason}></span></p>
<a href="<{$i_domain}>expert/dealStatus?apply=1" class="pc-btn pc-btnh45 dr-btn dr-create-btn">修改</a>
<div class="fail-info">
	<p><span>真实姓名：</span><span><{$expertInfo.realName}></span></p>
	<p><span>身份证号：</span><span><{$expertInfo.idCardNo}></span></p>
	<p>实名认证（身份证正反面照，手持身份证件照）：</p>
	<ul class="id-pics">
		<li><img src="<{$expertInfo.idcardFrontImageUrl}>"></li>
		<li><img src="<{$expertInfo.idcardBackImageUrl}>"></li>
		<li><img src="<{$expertInfo.idcardPersonImageUrl}>"></li>
	</ul>
	<p><span>达人类别：</span><span><{$expertInfo.category.name}></span></p>
	<p><span>个人介绍：</span><span class="intro"><{$expertInfo.introduction}></span></p>
</div>
<include file="Home@Front/Public:footer" />