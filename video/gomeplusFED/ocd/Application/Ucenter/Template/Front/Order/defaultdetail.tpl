<?php
    $csspath = 'shop/orderdetail.css';
    $jspath = '/js/conf/uc_orderDetails.js';
?>
<include file="Home@Front/Public:header" />
    <div class="crumbs-box"><a href="javascript:;">我的订单</a><em>></em><a href="javascript:;"><{$list.statusDesc}></a><em>></em><span class="crnmb-activ">订单详情</span></div>
    <div class="wrap-box">
      <div class="bg-white" data-node="orderDetail">
        <div class="order-detail-box">
          <h2 class="order-detail-title">订单详情</h2>
          <ul class="order-detail">
            <li class="clearfix">
              <label>订单编号：</label>
              <p><{$orderId}></p>
            </li>
            <li class="clearfix">
              <label>收货信息：</label>
              <p><span><{$list.consignee.name}> <{$list.consignee.mobile}></span><span><{$list.consignee.address}></span></p>
            </li>
            <li class="clearfix">
              <label>订单状态：</label>
              <p data-node="orderStauts" class="order-state"><{$list.statusDesc}></p>
            </li>
            <li class="clearfix">
              <label>下单时间：</label>
              <p class="time"><span><{$list.orderTime_time}> </span><span class="clock"><{$list.orderTime_clock}></span></p>
            </li>
			
			<if condition="$list.status neq 0 and $list.status neq -6">
            <li class="clearfix">
              <label>付款时间：</label>
              <p class="time"><span><{$list.paymentTime_time}> </span><span class="clock"><{$list.paymentTime_clock}></span></p>
            </li>
			</if>
			
			<if condition="$list.status eq 2 or $list.status eq 3 or $list.status eq -12 or $list.status eq -5">
            <li class="clearfix">
              <label>发货时间：</label>
              <p class="time"><span><{$list.deliveryTime_time}> </span><span class="clock"><{$list.deliveryTime_clock}></span></p>
            </li>
			</if>
			
			<if condition="$list.status eq 3">
            <li class="clearfix">
              <label>确认收货：</label>
              <p class="time"><span><{$list.confirmationTime_time}> </span><span class="clock"><{$list.confirmationTime_clock}></span></p>
            </li>
			</if>
			
			
          </ul>
		  <if condition="$list.hasInvoice eq 1">
          <h2 class="order-detail-title">发票信息</h2>
          <ul class="order-detail">
            <li class="clearfix">
              <label>发票类型：</label>
              <p><{$list.invoice.typeDesc}></p>
            </li>
            <li class="clearfix">
              <label>发票抬头：</label>
              <p><{$list.invoice.title|htmlspecialchars}></p>
            </li>
            <li class="clearfix">
              <label>发票内容：</label>
              <p><{$list.invoice.content}></p>
            </li>
          </ul>
		  </if>
        </div>
		<!--已发货-->
		
        <div class="button-box">
		<if condition="$list.status eq 2" >
          <div class="count-down">
            <p class="time">
			<em class="icon icon-clock">&#xe9ab;</em>
			<span data-node="time" data-time="<{$list.remainingDay}>-<{$list.remainingHour}>-<{$list.remainingMinute}>"><{$list.remainingTime}></span>
			</p>
            <p class="txt-in">后系统将自动确认收货</p>
          </div>
		</if>
		<notempty name="list.hasLogistics">
		<a target="_blank" href="<{$i_domain}>order/orderLogistics?orderId=<{$orderId}>&statu=<{$list.status}>" class="order-blank-btn" >查看物流</a>
		</notempty>
			<!--未支付-->
		<if condition="$list.status eq 0">
			<a target="_blank" href="<{$order_domain}>order/payDetail?mergerId=<{$orderId}>" class="order-blank-btn order-pay-btn">立即支付</a>
			<a href="javascript:;" data-action="unPayCancel" class="order-blank-btn" data-id="<{$orderId}>" >取消订单</a>
			<!--已支付-->
		<elseif condition="$list.status eq 1" />
			<a class="order-blank-btn" href="javascript:;" data-action="payedCancel" data-id="<{$orderId}>">取消订单</a>

		<elseif condition="$list.status eq -1" />
			<a class="order-blank-btn order-blank-btn-disabled" data-action="cancelling" href="javascript:;" >取消订单</a>
			<!--已发货-->		
		<elseif condition="$list.status eq 2" />
			<a href="javascript:;" class="order-blank-btn order-orange-btn" data-action="confirmReceipt" data-id="<{$orderId}>" >确认收货</a>
			<if condition="$list.allowDelayConfirm eq 1">
			<a href="javascript:;" class="order-blank-btn" data-action="delayReceipt" data-id="<{$orderId}>">延迟收货</a>
			</if>
			<!--已收货-->
		<elseif condition="$list.status eq 3" />
			<if condition="$list.hasComment eq 0  ">
			<a target="_blank" href="<{$i_domain}>order/showCommentInfo?orderid=<{$orderId}>" class="order-blank-btn order-orange-btn">立即评价</a>
			</if>
		<else />
		</if>
		</div>
      </div>
	  
	  <volist name="list.orders" id="item_orders" key="orders_key" >
      <table  class="shop-car-list order-information">
        <tr class="bor-none">
          <th class="width660">
            <div class="merchandise-news margi-left20">商品信息</div>
          </th>
          <th>单价 (元)</th>
          <th>数量</th>
          <th></th>
          <th></th>
        </tr>
      </table>
      <table  data-node="orderList" class="shop-car-list order-information">
        <tr>
          <td colspan="3" class="align-left">
            <div class="check-all">
              <div class="shop-arl-check icon-fontsize"><em class="icon">&#xe9df;</em></div><a target="_blank" href="<{$item_orders.shop.id|shopDetailUrlGen}>" class="store-name-text"><{$item_orders.shop.name}></a><a data-action="ContactMerchant" href="javascript:;" class="connect-shop">联系商家</a>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
		   <volist name="item_orders.orderItems" id="item_sku" key="sku_key" >
            <div class="products-by <?php if( $sku_key != $item_orders['orderItemsCount'] ){ echo 'borb';}?>">
                <div class="graphic clearfix">
				<a href="<{$item_sku.sku.item.id|productDetailUrlGen=$item_sku['mshop']['id'],###}>?skuid=<{$item_sku.sku.id}>" target="_blank">
                  <div class="product-bx"><img onerror="imgError(this)" src="<{$item_sku.sku.image}>"></div>
                  <div class="product-name">
                    <a target="_blank" href="<{$item_sku.sku.item.id|productDetailUrlGen=$item_sku['mshop']['id'],###}>?skuid=<{$item_sku.sku.id}>" class="product-title"><{$item_sku.sku.item.shortName}></a>
                    
					<notempty name="item_sku.sku.attributes">
					<p class="product-color">					
					<volist name="item_sku.sku.attributes" id="item_attributes" key="attributes_key" >
					<{$item_attributes.name}>：<{$item_attributes.value}><?php if($attributes_key != count($item_sku['sku']['attributes'])):?>&emsp;<?php endif;?>
					</volist>
					</p>
					</notempty>
					<if condition="$item_sku['mshop']['id'] neq $item_orders['shop']['id']">
                    <p class="product-source">来自美店：<span><{$item_sku.mshop.name}></span></p>
                    </if>
                  </div>
				 </a>
				</div>
				<span class="price-count">￥<{$item_sku.sku.price}></span>
				<span class="price-count"><{$item_sku.quantity}></span>
            </div>
			</volist>
          </td>
          <td >
          </td>
          <td>
          </td>
        </tr>
      </table>
	  </volist>
	  
      <div class="items-total">
        <p><span class="goods-together"><strong class="numb"><{$list.itemsCount}> </strong>件商品，商品合计：</span><span>￥<{$list.itemsMoney}></span></p>
        <p><span class="goods-together">运费：</span><span>￥<{$list.shippingCost}></span></p>
		<if condition="$list.platformCouponMoney neq '0.00'">
        <p><span class="goods-together">平台优惠券：</span><span>￥<{$list.platformCouponMoney}></span></p>
		</if>
		<if condition="$list.shopCouponMoney neq '0.00'">
		<p><span class="goods-together">店铺优惠券：</span><span>￥<{$list.shopCouponMoney}></span></p>
		</if>
		<if condition="$list.gomeMoney neq '0.00'">
        <p><span class="goods-together">使用国美币：</span><span>￥<{$list.gomeMoney}></span></p>
		</if>
		<p><span class="goods-together">订单总金额：</span><span>￥<{$list.paymentAmount}></span></p>
      </div>
    </div>
<include file="Home@Front/Public:footer" />
