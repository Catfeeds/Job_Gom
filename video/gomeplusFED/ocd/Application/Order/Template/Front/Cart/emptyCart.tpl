<?php
    $csspath = 'shop/shopcart.css';
    $jspath = '/js/conf/cart.js';
?>
<include file="Home@Front/Public/header" />
<div class="wrap-box">
	<div class="search-result top30">
		<div class="result-text clearfix"><em class="icon">&#xe915;</em>
			<p class="text-left">您的购物车还是空的，去看看心仪的商品吧~<br><a href="<?=$main_domain?>">去购物</a><em>》</em></p>
		</div>
	</div>
	<!-- v1.1.1 bof-->
	<div data-node="myCollectWrap"></div>
    <div data-node="recommendWrap"></div>
	<!-- v1.1.1 eof-->
</div>
<script>
	$GLOBAL_CONFIG['sourceCode'] = '<{$sourceCode}>';
</script>
<include file="Home@Front/Public/footer" />
