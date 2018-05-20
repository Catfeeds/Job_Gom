<ul class="meidian-naver">
	<li><a <?php if ($activeUrl== 'admin_index'){?> class="active" <?php } ?> href="/admin">我的美店</a></li>
	<notempty name="shopInfo.id">
	<li><a <?php if ($activeUrl== 'admin_addItem'){?> class="active" <?php } ?>href="/admin/addItem" >好货推荐</a></li>
	<li><a href="/shop-<{$shopInfo['id']}>.html" target="_blank">美店预览</a></li>
	</notempty>
</ul>
