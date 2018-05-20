<include file="Home@Front/Public:header" />
<script>
    $GLOBAL_CONFIG['shopId'] = '<{$shopId}>';
</script>
<div class="meidian_header_new">
	<div class="meidian_header_box clearfix">
		<div class="meidian_logo_new fl">
			<a href="<{$meidian_domain}>"><img src="<{$pcimgpath}>/images/meidian/logo.png" /></a>
		</div>
		<?php if(!empty($top_banner)){ ?>
			<div class="meidian_header_ad fl">
				<a href="<{$top_banner['promsUrl']}>" target="_blank">
					<img src="<{$top_banner['imageUrl']|getResizeImg=###,120,60}>">
				</a>
			</div>
		<?php }?>
		<div class="meidian_menu_new fl">
			<ul class="clearfix">
				<li <?php if($activeUrl == 'channel_index'){ ?> class="on" <?php } ?> >
					<a href="<{$meidian_domain}>">首页</a>
				</li>
				<li <?php if($activeUrl == 'admin_addItem'){ ?> class="on" <?php } ?>>
					<a href="<{$meidian_domain}>admin/addItem">好货推荐</a>
				</li>
			</ul>
		</div>
		<div data-node="meidian_my" class="meidian_my fr
		<?php if($activeUrl != 'channel_index' && $activeUrl != 'admin_addItem'){ ?>
				on
		<?php } ?>
		">
			<img onerror="imgError(this, 'h')" src="<{$mshop_icon|getResizeImg=###,40,40}>">
			<span>我的美店</span>
		</div>
	</div>
</div>