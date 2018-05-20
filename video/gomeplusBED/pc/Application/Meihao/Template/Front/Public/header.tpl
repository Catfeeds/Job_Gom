<include file="Home@Public:mh_header"/>
<div id="header-meihao">
	<div class="meihao-container clearfix">
		<div class="logo"> </div>
		<?php if(!empty($mh_info)){ ?>
		<div class="meihao-message">
			<img class="pic" onerror="imgError(this, 'h')" src="<{$mh_info['imageUrl']}>">
			<div class="status clearfix">
				<div class="name"><{$mh_info['name']}></div>
				<div class="type">
					<?php if($mh_info['type'] === 0){ ?>
						个人号
					<?php }elseif($mh_info['type'] == 1){ ?>
						企业号
					<?php }?>
				</div>
				<div class="line">|</div>
				<div class="logout"><a href="<?php echo '//'.C('GOME')['URL']['LOGIN_URL'].'?type=logout' ?>"> 退出</a></div>
			</div>
		</div>
		<?php } ?>
	</div>
</div>