<?php
    $csspath = 'usercenter/usercenter.css';
?>
<include file="Home@Front/Public:header" />
<div class="wrap-box mart20 clearfix">
	<include file="Front/Public/left" />
	<div class="order-right">
        <div class="bind-phone-nav"><a href="javascript:;" class="bind-phone-nav-a">修改绑定手机号</a></div>
		<ul class="lg-steps bind-phone-steps clearfix">
			<li class="active"><em>1</em>验证身份</li>
			<li class="active"><em>2</em>修改手机号</li>
			<li class="active"><em>3</em>修改成功</li>
		</ul>
        <div class="lg-form bind-phone-form">
			<h4 class="lg-succ-top"><em class="icon">&#xea52;</em>修改成功！</h4>
			<p class="congratulation">当前绑定手机号码为<span><{$mobile}></span></p>
        </div>
	</div>
</div>
<include file="Home@Front/Public:footer" />