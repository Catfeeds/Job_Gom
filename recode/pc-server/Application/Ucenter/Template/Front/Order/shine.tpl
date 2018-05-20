<?php
    $csspath = 'allorders.css';
    $jspath = '/js/conf/uc_showMyOrders.js';
?>
<include file="Home@Front/Public:header" />
<div class="wrap-box mart20 clearfix">
	<include file="Front/Public/left" />
	<div class="order-right">
		<div class="order-state-nav clearfix" data-node="orderStateNav" data-status="5">
			<a href="<{$i_domain}>order/index" class="order-state-nav-a">全部订单</a>
			<a href="<{$i_domain}>order/index?status=1" class="order-state-nav-a">待付款<span data-node="dfkNum" data-count="<{$status.pendPayment}>"> <if condition="$status.pendPayment gt 0"><if condition="$status.pendPayment gt 9" >9+<else /><{$status.pendPayment}></if></if></span></a>
			<a href="<{$i_domain}>order/index?status=2" class="order-state-nav-a">待发货<span data-node="dfhNum" data-count="<{$status.pendDelivery}>" > <if condition="$status.pendDelivery gt 0"><if condition="$status.pendDelivery gt 9">9+<else /><{$status.pendDelivery}></if></if></span></a>
			<a href="<{$i_domain}>order/index?status=3" class="order-state-nav-a">待收货<span data-node="dshNum" data-count="<{$status.pendReceiving}>"> <if condition="$status.pendReceiving gt 0"><if condition="$status.pendReceiving gt 9">9+<else /><{$status.pendReceiving}></if></if></span></a>
			<a href="<{$i_domain}>order/index?status=4" class="order-state-nav-a">待评价<span data-node="dpjNum" data-count="<{$status.pendComment}>"> <if condition="$status.pendComment gt 0"><if condition="$status.pendComment gt 9">9+<else /><{$status.pendComment}></if></if></span></a>
			<a href="<{$i_domain}>order/shine" class="order-state-nav-a active">我要晒单</a>
		</div>
		<div data-node="orderList">
			<div class="loading-box" style="height: 400px;">
				<div class="loading-img">
					<img src="<{$pcimgpath}>/images/public/loading.gif">
					<p>加载中...</p>
				</div>
			</div>
		</div>
		<div data-node="pageLoadBtn" class="more-comments" style="display: none;">
			<a data-node="pageMore" href="javascript:;" class="clearfix">
				<span>
					<img src="<{$pcimgpath}>/images/circle/small-logo.png?v=<?php echo C('JS_VERSION'); ?>">点击加载更多
					<em class="icon icon-right">&#xe98c;</em>
				</span>
			</a>
			<a data-node="pageLoading" href="javascript:;" class="disabled clearfix" style="display: none;">
				<span>
					<img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...
				</span>
			</a>
			<a data-node="pageNothing" href="javascript:;" class="disabled clearfix" style="display: none;">
				<span>没有可加载内容</span>
			</a>
		</div>
	</div>
</div>
<include file="Home@Front/Public:footer" />
