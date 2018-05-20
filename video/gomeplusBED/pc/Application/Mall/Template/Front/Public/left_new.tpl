<ul class="meidian-naver">
	<li <?php if ($activeUrl== 'admin_index'){ ?> class="active" <?php } ?> ><a href="/admin">我的美店</a></li>
	<li><a href="/admin/addItem" >好货推荐</a></li>
	<li <?php if ($activeUrl== 'admin_topics'){ ?> class="active" <?php } ?>><a href="/admin/topics" >美店说</a></li>
	<notempty name="shopInfo.id">
		<li><a href="/shop-<{$shopInfo['id']}>.html" target="_blank">美店预览</a></li>
	</notempty>

	<notempty name="left_banner">
		<li class="left-ad">
			<a href="<{$left_banner['promsUrl']}>" target="_blank">
				<img src="<{$left_banner['imageUrl']}>" style="width: 180px;">
			</a >
		</li>
	</notempty>
</ul>
