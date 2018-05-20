<?php
    $csspath = 'recruit.css';
?>
<include file="Home@Public:common_header"/>
<div class="talent-recruit">
	<div class="recruit-banner">           </div>
	<div class="recruit-privilege"></div>
	<div class="recruit-norm"></div>
	<div class="recruit-aptitude">
		<div class="aptitude">
			<div class="aptitude-info clearfix">
				<p><strong>1. 完善个人资料 :  </strong>完整的昵称、头像、性别信息</p>
				<?php if($result['isPersonalInfoCompleted'] === true){ ?>
					<p class="info-state"><a class="finish" href="javascritp:;" >已完成</a></p>
				<?php }else{ ?>
					<p class="info-state"><a class="unfinished" href="/member/profile" target="_blank">去完成&nbsp;&nbsp;&nbsp;&gt;</a></p>
				<?php } ?>
			</div>
			<div class="aptitude-info clearfix">
				<p><strong>2. 发布至少2篇话题 : </strong>原创高质量内容更容易通过</p>
				<?php if($result['isMeetTheNeedsOfTopic'] === true){ ?>
				<p class="info-state"><a class="finish" href="javascritp:;" >已完成</a></p>
				<?php }else{ ?>
				<p class="info-state"><a class="unfinished" href="<{$group_domain}>topic/publiser" target="_blank">去完成&nbsp;&nbsp;&nbsp;&gt;</a></p>
				<?php } ?>
			</div>
		</div>

		<div class="aptitude-apply">
			<?php if($result['isMeetTheNeedsOfTopic'] === true && $result['isPersonalInfoCompleted'] === true){ ?>
				<a class="apply" href="/expert/index?apply=0" target="_blank">开始申请</a>
			<?php }else { ?>
				<a href="javascritp:;" >开始申请</a>
				<p>需完成上面两个任务才可以申请</p>
			<?php } ?>

		</div>
	</div>
</div>
<include file="Home@Public:footer"/>