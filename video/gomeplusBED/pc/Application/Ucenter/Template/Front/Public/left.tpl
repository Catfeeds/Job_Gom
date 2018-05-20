<div modelid="<{$modelPage['grwdzy']|default=""}>" class="order-side-bar">
	<h3><a href="/index">我的主页</a></h3>
	<h3>社交</h3>
	<ul>
		<li><a href="/group"  <?php if ($activeUrl== '/group/index'){?> class="active" <?php } ?> >我的圈子</a></li>
		<li><a href="/topic" <?php if ($activeUrl== '/topic/index'){?> class="active" <?php } ?> >我的话题</a></li>
	</ul>
	<h3>购物</h3>
	<ul>
		<li><a href="<{$i_domain_gome}>member/myOrder" target="_blank">我的订单</a></li>
		<li><a href="<{$i_domain_gome}>member/gomeMyCoupon" target="_blank">我的优惠券</a></li>
	</ul>
	<h3>收藏</h3>
	<ul>
		<li><a href="<{$i_domain_gome}>member/myFavorites" target="_blank">收藏的商品</a></li>
		<li><a href="<{$i_domain_gome}>member/myFavorites?#shop" target="_blank">收藏的店铺</a></li>
		<li><a href="<{$i_domain}>collect/topic" <?php if($activeUrl == $i_domain.'collect/topic'){ ?> class="active" <?php } ?>>收藏的话题</a></li>
	</ul>
	<h3>设置</h3>
	<ul>
		<li><a href="<{$i_domain_gome}>member/profile" target="_blank">个人信息</a></li>
		<li><a href="<{$i_domain_gome}>member/accountSecurity?atc=1" target="_blank">登录密码修改</a></li>
		<li><a href="<{$i_domain_gome}>member/accountSecurity?atc=23" target="_blank">修改绑定手机号</a></li>
		<li><a href="<{$i_domain_gome}>member/addressPage" target="_blank">收货地址管理</a></li>
	</ul>
	<h3>售后服务</h3>
	<ul>
		<li><a href="<{$i_domain_gome}>member/myReturnGoodList" target="_blank">退款/售后</a></li>
	</ul>
</div>
