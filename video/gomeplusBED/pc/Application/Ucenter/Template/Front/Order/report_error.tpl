<?php
    $csspath = 'allorders.css';
    $jspath = '/js/conf/uc_orders.js';
?>
<include file="Home@Front/Public:header" />
    <div class="wrap-box clearfix">
	  <include file="Front/Public/left" />
		<div class="order-right">

			<div data-node="orderList">
				<div class="no-order" data-node="orderList"><em class="icon icon-order">&#xe96c;</em>
				  <p><{$message}> </p>
				</div>
			</div>
      </div>
    </div>
<include file="Home@Front/Public:footer" />
