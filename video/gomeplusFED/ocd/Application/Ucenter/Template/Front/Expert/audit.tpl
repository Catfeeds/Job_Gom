<?php
    $csspath = 'usercenter/usercenter.css';
?>
<include file="header" />
<a href="<{$main_domain}>" class="back-to-index" target="_blank"></a>
<ul class="info-steps">
	<li class="bar"><span class="active"></span><span></span></li>
	<li class="step1 active"><span class="step-num"><em>1</em></span><span class="step-txt">填写资料</span></li>
	<li class="step2 active"><span class="step-num"><em>2</em></span><span class="step-txt">审核</span></li>
	<li class="step3"><span class="step-num"><em>3</em></span><span class="step-txt">审核结果</span></li>
</ul>
<div class="dr-review">
	<div class="dr-sprites dr-review-bg"></div>
	<p><span>您的申请我们正在认真审核哦~</span><span>审核需要1-2个工作日请您耐心等待</span></p>
</div>
<a href="<{$i_domain}>index" class="pc-btn pc-btnh45 dr-btn dr-back-btn">返回首页</a>
<include file="footer" />