<?php
    $csspath = 'allorders.css';
    $jspath = '/js/conf/uc_orders.js';
?>
<include file="Home@Front/Public:header" />
    <div class="wrap-box mart20 clearfix">
	  <include file="Front/Public/left" />
		<div class="order-right">
        <div class="order-state-nav clearfix" data-node="orderStateNav" data-status="<?=$statu;?>">
		<a href="<{$i_domain}>order/index" class="order-state-nav-a <?php if($statu==0){ ?>active<?php }?>">全部订单</a>
		<a href="<{$i_domain}>order/index?status=1" class="order-state-nav-a <?php if($statu==1){?>active <?php }?>">待付款<span data-node="dfkNum" data-count="<{$status.pendPayment}>"> <if condition="$status.pendPayment gt 0"><if condition="$status.pendPayment gt 9" >9+<else /><{$status.pendPayment}></if></if></span></a>
		<a href="<{$i_domain}>order/index?status=2" class="order-state-nav-a <?php if($statu==2){?>active <?php }?>">待发货<span data-node="dfhNum" data-count="<{$status.pendDelivery}>" > <if condition="$status.pendDelivery gt 0"><if condition="$status.pendDelivery gt 9">9+<else /><{$status.pendDelivery}></if></if></span></a>
		<a href="<{$i_domain}>order/index?status=3" class="order-state-nav-a <?php if($statu==3){?>active <?php }?>">待收货<span data-node="dshNum" data-count="<{$status.pendReceiving}>"> <if condition="$status.pendReceiving gt 0"><if condition="$status.pendReceiving gt 9">9+<else /><{$status.pendReceiving}></if></if></span></a>
		<a href="<{$i_domain}>order/index?status=4" class="order-state-nav-a <?php if($statu==4){?>active <?php }?>">待评价<span data-node="dpjNum" data-count="<{$status.pendComment}>"> <if condition="$status.pendComment gt 0"><if condition="$status.pendComment gt 9">9+<else /><{$status.pendComment}></if></if></span></a>
		<a href="<{$i_domain}>order/shine" class="order-state-nav-a">我要晒单</a>
        </div>
		<notempty name="list">
        <table class="order-prod-nav">
          <tbody>
            <tr class="order-prod-nav-bg">
              <th class="order-base-nav">
                <div class="prod-info">商品信息</div>
              </th>
              <th class="sin-price">单价（元）</th>
              <th class="count">数量</th>
              <th class="prod-opr">商品操作</th>
              <th class="trade-sum">交易金额(元)</th>
              <th class="trade-state">交易状态</th>
              <th class="order-opr">订单操作</th>
            </tr>
          </tbody>
        </table>
        <div data-node="orderList">
			<volist name="list" id="order_item" key="order_key">
	        <table class="order-prod-info">
	          <tr>
	            <td colspan="7" class="order-base-nav">
	              <ul class="clearfix">
	              	<li class="time"><{$order_item.orderTime}></li>
	                <li class="order-number">订单编号：<a href="javascript:;" class="color-default"><if condition="$order_item.status eq 0  "><{$order_item.mergerId}><else /><{$order_item.id}></if></a></li>
	                <if condition="$order_item.status eq 0 ">
					<li class="color-default">
					<!-- <em class="icon icon-platform">&#xe9df;</em>
					<a href="javascript:;">国美购物平台</a> -->

					</li>
					</if>
	              </ul>
	            </td>
	          </tr>
			  
	          <tr>
	            <td colspan="4" class="order-l clearfix">
				<volist name="order_item.orderItems" id="item_sku" key="sku_key" >
					<div class="order-l-list <?php if($sku_key ==$order_item['orderItemsCount']):?>bor-none<?php endif;?> clearfix">
					<a target="_blank" href="<{$item_sku.sku.item.id|productDetailUrlGen=$item_sku['mshop']['id'],###}>?skuid=<{$item_sku.sku.id}> "><img onerror="imgError(this)" src="<{$item_sku.sku.image|getResizeImg=###,80,80}>" class="order-img"></a>
					  <div class="parameter">
					  <a target="_blank" href="<{$item_sku.sku.item.id|productDetailUrlGen=$item_sku['mshop']['id'],###}>?skuid=<{$item_sku.sku.id}> "><{$item_sku.sku.item.shortName}></a>
						<p >
						<notempty name="item_sku.sku.attributes">
						<volist name="item_sku.sku.attributes" id="item_attributes" key="attributes_key" >
						<{$item_attributes.name}>：<{$item_attributes.value}>
						<?php if($attributes_key != count($item_sku['sku']['attributes'])):?>&emsp;<?php endif;?>
						</volist>
						</notempty>
						</p> 
					  </div>
					  <span class="s-price">￥<{$item_sku.sku.price}></span>
					  <span class="count-num"><{$item_sku.quantity}></span>
					  <div class="connect-shop more" data-node="connect-firm" data-rechange='{"orderid":<{$order_item.id}>,"skuid":<{$item_sku.sku.id}>,"goodsid":<{$item_sku.sku.item.id}>}'>
					  
					  <!--国美在线不显示联系商家-->
					  <!--<if condition="$order_item.status neq 0 ">
						  <if condition="$order_item.orderType neq 6 && $order_item.orderType neq 7 ">
						  
						  <a href="<?=imUrl('shop',$item_sku['mshop']['id'])?>" data-action="entryBtn" target="_blank" ><p>联系商家</p></a>
						  
						  <else />
						  <a href="javascript:;" class="gm-gray" >联系商家</a>
						  </if>
					  </if>-->
					  <notempty name="item_sku.afterSalesFlag">
					  <a href="<{$i_domain}>order/showDataInfo?orderid=<{$order_item.id}>&skuid=<{$item_sku.sku.id}>&goodid=<{$item_sku.sku.item.id}>" >申请售后</a>
					  </notempty>
					  </div>
					</div>
				</volist>
	            </td>
	            <td class="t-price"><span class="price">￥<{$order_item.paymentAmount}></span>
	              <p class="fare">（含运费：￥<{$order_item.shippingCost}>）</p>
	            </td>
	            <td class="trading-status">
					<span data-node="orderStauts"><{$order_item.statusDesc}></span>
					<a target="_blank" href="<{$i_domain}>order/detail?id=<if condition="$order_item.status eq 0 "><{$order_item.mergerId}>&type=1<else /><{$order_item.id}></if>">查看详情</a>
					<!--可以查看物流-->
					<if condition="$order_item.status eq 2 || $order_item.status eq 3 || $order_item.status eq -12 || $order_item.status eq -5 ">
						<if condition="$order_item.orderType neq 6 && $order_item.orderType neq 7 ">
						<notempty name="order_item.hasLogistics">
						<a target="_blank" href="<{$i_domain}>order/orderParcels?orderId=<{$order_item.id}>" >查看包裹</a>
						</notempty>
						<else />
						<a target="_blank" href="<{$i_domain}>order/orderParcels?orderId=<{$order_item.id}>" >查看包裹</a>
						</if>
					</if>
					
				</td>
	            <td class="order-operate">
					<!--待支付-->
					<if condition="$order_item.status eq 0">
						<a target="_blank" href="<{$order_domain}>order/payDetail?mergerId=<{$order_item.mergerId}>" class="order-blank-btn order-pay-btn marb14">立即支付</a>
						<a href="javascript:;" data-action="unPayCancel" class="order-blank-btn" data-id="<{$order_item.mergerId}>">取消订单</a>
					<!--已支付-->
					<elseif condition="$order_item.status eq 1" />
						<a class="order-blank-btn" data-action="payedCancel" href="javascript:;" data-id="<{$order_item.id}>" >取消订单</a>
					
					<elseif condition="$order_item.status eq -1" />
						<a class="order-blank-btn order-blank-btn-disabled" data-action="cancelling" href="javascript:;">取消订单</a>
					<!--已发货-->
					<elseif condition="$order_item.status eq 2" />
						
					
					<!--已收货-->
					<elseif condition="$order_item.status eq 3" />
						<empty name="order_item.hasComment">
						<a target="_blank" href="<{$i_domain}>order/showCommentInfo?orderid=<{$order_item.id}>" class="order-blank-btn">立即评价</a>
						</empty>
					<!--用户拒收-->
					<elseif condition="$order_item.status eq -12" />
					<!--拒收入库-->
					<elseif condition="$order_item.status eq -5" />
					<else />
					</if>
				</td>
	          </tr>
	        </table>
			</volist>
        </div>
		<if condition="$pageMore eq 1" >
		<div class="more-comments">
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
		</if>
		<else />
		<div data-node="orderList">
			<div class="no-order" data-node="orderList"><em class="iconn-63"></em>
	          <p>亲，您还没有订单，赶快 <a href="<{$mall_domain}>search">去逛逛 </a>吧</p>
	        </div>
		</div>
		</notempty>
		

		
      </div>
    </div>
<include file="Home@Front/Public:footer" />
