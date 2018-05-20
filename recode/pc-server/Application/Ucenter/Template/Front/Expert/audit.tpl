<?php
    $csspath = 'talentApplication.css';
    $jspath = '/js/conf/talentApplication.js';
    $bg_style = 'examining';
?>
<include file="Home@Public:common_header"/>
<script type="text/javascript">
	$GLOBAL_CONFIG['xm_tag'] = '<{$xm_tag}>';
</script>
<link type="text/css" rel="stylesheet" href="<{$pccsspath}>/css/module/talentExamining.css?version=<?php echo C('JS_VERSION'); ?>">
<div class="talent-top">
	<div class="talent-t-cover"></div>
</div>
<div class="talent-middle">
	<div class="talent-banner">审核中</div>
</div>
<div class="talent-result">
	<div class="talent-result-info talent-middle">
		<div class="talent-result-details">
			<p>您的申请我们正在认真审核哦~</p>
			<p>审核需要5-7个工作日请您耐心等待 </p>
		</div>
		<div class="talent-result-steps talent-tool step2">
			<ol class="talent-b-tool">
				<li class="talent-b-t-item talent-b-t-item1">
					<div class="talent-b-t-i-count talent-b-t-i-count1">1</div>
					<p class="talent-b-t-i-title">填写资料</p>
				</li>
				<li class="talent-b-t-item item-margin talent-b-t-item2">
					<div class="talent-b-t-i-count talent-b-t-i-count2">2</div>
					<p class="talent-b-t-i-title">审核</p>
				</li>
				<li class="talent-b-t-item talent-b-t-item3">
					<div class="talent-b-t-i-count talent-b-t-i-count3">3</div>
					<p class="talent-b-t-i-title">审核结果</p>
				</li>
				<li class="talent-b-t-linner"></li>
			</ol>
		</div>
	</div>
</div>
<div class="talent-content">
	<div class="talent-content-info">
		<ul>
			<li class="clearfix">
				<i class="icon_t icon-username"></i>
				<span>真实姓名 :</span>
				<strong><{$result['realName']}></strong>
			</li>
			<li class="clearfix">
				<i class="icon_t icon-phone"></i>
				<span>联系方式 :</span>
				<strong><{$result['mobile']}></strong>
			</li>
			<li class="clearfix">
				<i class="icon_t icon-talent-type"></i>
				<span>达人类别 :</span>
				<strong><{$result['category']['name']}></strong>
			</li>
			<li class="clearfix">
				<i class="icon_t icon-introduce"></i>
				<span>个人介绍 :</span>
				<strong class="introduce"><{$result['introduction']}></strong>
			</li>
		</ul>
	</div>
</div>
<include file="Home@Public:footer"/>

