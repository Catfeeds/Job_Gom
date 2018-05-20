<?php
    $csspath = 'talentPrivilege.css';
?>
<include file="Home@Public:common_header"/>
<div class="talent-top">
	<div class="talent-t-cover"></div>
	<div class="talent-t-slogan"></div>
</div>
<div class="talent-middle">
	<div class="talent-m-privilege"></div>
	<?php if(!empty($buttonInfo)){ ?>
	<div class="talent-m-cricle">
		<a class="talent-m-c-button" target="_blank" href="<{$buttonInfo['url']}>"><{$buttonInfo['text']|htmlentities}></a>
		<p class="talent-m-c-detail"><{$buttonInfo['noteText']|htmlentities}></p>
	</div>
	<?php } ?>
	<div class="talent-m-linner"></div>
</div>
<?php if(!$isAuth['data']['result']){ ?>
	<div class="talent-join clearfix">
		<span class="talent-j-detail">实名认证，成为有身份的达人</span>
		<a class="talent-j-approve" target="_blank" href="<{$auth_url}>">立即认证&nbsp;></a></div>
<?php } ?>
<include file="Home@Public:footer"/>