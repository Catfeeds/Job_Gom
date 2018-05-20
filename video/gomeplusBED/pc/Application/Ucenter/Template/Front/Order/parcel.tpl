<?php
    $csspath = 'usercenter.css';
    $jspath = '/js/conf/uc_package.js';
?>
<include file="Home@Front/Public:header" />
      <div class="wrap-box">
      <div class="crumbs-box"><a href="<{$i_domain}>order/index">我的订单</a><em>></em><span class="crnmb-activ">查看包裹</span></div>
      <div class="pracel-box">
        <table class="pracel-list" data-node="orderList">
          <thead>
            <tr class="list-title">
              <th class="order-l">商品信息</th>
              <th class="t-price">单价（元）</th>
              <th class="num">数量</th>
              <th class="prod-opr">商品操作</th>
              <th class="count-s">交易状态</th>
              <th class="count-op">订单操作</th>
            </tr>
          </thead>
          <tbody>
			<notempty name="list">
			<volist name="list" id="order_item" key="order_key">
					<tr>
					  <td colspan="6" class="title-name">包裹<{$order_key}></td>
					</tr>
					<if condition="count($order_item['orderItems']) eq 1">
					<volist name="order_item.orderItems" id="item_li" key="item_key" >
					<tr>
					 <td class="order-l">
						<a href="javascript:;" class="fl"><img src="<{$item_li.sku.image|getResizeImg=###,80,80}>" class="order-img" onerror="imgError(this)"></a>
						<div class="parameter">
						  <a href="javascript:;"><{$item_li.sku.item.name}></a>
						  <p>
						  <notempty name="item_li.sku.attributes">
							<volist name="item_li.sku.attributes" id="item_attributes" key="attributes_key" >
							<{$item_attributes.name}>：<{$item_attributes.value}>
							<?php if($attributes_key != count($item_sku['sku']['attributes'])):?>&emsp;<?php endif;?>
							</volist>
						  </notempty>
						  </p>
						</div>
					  </td>
					  <td class="t-price f16"><span class="price">￥<{$item_li.sku.price|convert_price=###}></span></td>
					  <td class="num"><{$item_li.quantity}></td>
					  <td class="prod-opr">
						  <if condition="$order_item.type neq 6 && $order_item.type neq 7 ">
						  <a href="<?=imUrl('shop',$shopid)?>" data-action="entryBtn" target="_blank"><p>联系商家</p></a>
						  <else />
						  <a href="javascript:;" class="gm-gray" >联系商家</a>
						  </if>
					  </td>

					  <td class="count-s">
						<div class="active" data-node="orderStauts"><{$order_item.statusDesc}></div>
						<if condition="$order_item.type neq 6 && $order_item.type neq 7 ">
						<a href="<{$i_domain}>order/orderLogistics?orderId=<{$orderId}>&logid=<{$order_item.id}>" target="_blank">查看物流</a>
						</if>
					  </td>
					  <td class="count-op">
					   <!--国美在线已妥投-->
						<if condition="( $order_item.type eq 6 || $order_item.type eq 7 ) && $order_item.status eq 'DELIVERYED'">
						<a href="javascript:;" data-action="confirmReceipt" class="w120-h40 order-btn-red" data-orderid="<{$orderId}>" data-postid="<{$order_item.id}>">确认收货</a>
						<br />
						</if>
					  <!--国美+已发货-->
						<if condition="( $order_item.type neq 6 && $order_item.type neq 7 ) && $order_item.status eq 'SENDED'">
						<a href="javascript:;" data-action="confirmReceipt" class="w120-h40 order-btn-red" data-orderid="<{$orderId}>" data-postid="<{$order_item.id}>">确认收货</a>
						<br />
						</if>
						
					   <!--国美+延迟收货-->
						<if condition="( $order_item.type neq 6 && $order_item.type neq 7 ) &&  $confirm">
						<a href="javascript:;" class="w120-h40 order-btn-red" data-action="delayReceipt" data-id="<{$orderId}>">延迟收货</a>
						</if>	
					  </td>
					</tr>
					</volist>
				<else />
				<!--多个商品-->
				<volist name="order_item.orderItems" id="item_li" key="item_key" >
					<if condition="$item_key eq 1">
					<tr>
					  <td class="order-l">
						<a href="javascript:;" class="fl"><img src="<{$item_li.sku.image|getResizeImg=###,80,80}>" class="order-img" onerror="imgError(this)"></a>
						<div class="parameter">
						  <a href="javascript:;"><{$item_li.sku.item.name}></a>
						  <p>
						  <notempty name="item_li.sku.attributes">
							<volist name="item_li.sku.attributes" id="item_attributes" key="attributes_key" >
							<{$item_attributes.name}>：<{$item_attributes.value}>
							<?php if($attributes_key != count($item_sku['sku']['attributes'])):?>&emsp;<?php endif;?>
							</volist>
						  </notempty>
						  </p>
						</div>
					  </td>
					  <td class="t-price f16"><span class="price">￥<{$item_li.sku.price|convert_price=###}></span></td>
					  <td class="num"><{$item_li.quantity}></td>
					  <td class="prod-opr">
						  <if condition="$order_item.type neq 6 && $order_item.type neq 7 ">
						  <a href="<?=imUrl('shop',$shopid)?>" data-action="entryBtn" target="_blank"><p>联系商家</p></a>
						  <else />
						  <a href="javascript:;" class="gm-gray" >联系商家</a>
						  </if>
					  </td>

					  <td rowspan="<{$order_item.orderItems|count}>" class="count-s">
						<div class="active"><{$order_item.statusDesc}></div>
						<if condition=" $order_item.type neq 6 && $order_item.type neq 7 ">
						<a href="<{$i_domain}>order/orderLogistics?orderId=<{$orderId}>&logid=<{$order_item.id}>" target="_blank">查看物流</a>
						</if>
					  </td>
					  <td rowspan="<{$order_item.orderItems|count}>" class="count-op">
					  <!--国美在线已妥投-->
						<if condition="( $order_item.type eq 6 || $order_item.type eq 7 ) && $order_item.status eq 'DELIVERYED'">
						<a href="javascript:;" data-action="confirmReceipt" class="w120-h40 order-btn-red" data-orderid="<{$orderId}>" data-id="<{$order_item.id}>">确认收货</a>
						<br />
						</if>
					  <!--国美+已发货-->
						<if condition="( $order_item.type neq 6 && $order_item.type neq 7 ) && $order_item.status eq 'SENDED'">
						<a href="javascript:;" data-action="confirmReceipt" class="w120-h40 order-btn-red" data-orderid="<{$orderId}>" data-id="<{$order_item.id}>">确认收货</a>
						<br />
						</if>
						
					   <!--国美+延迟收货-->
						<if condition="( $order_item.type neq 6 && $order_item.type neq 7 ) && $confirm">
						<a href="javascript:;" class="w120-h40 order-btn-red" data-action="delayReceipt" data-id="<{$orderId}>">延迟收货</a>
						</if>	
					  </td>
					</tr>
					<else />
					<tr>
						<td class="order-l">
							<a href="javascript:;" class="fl"><img src="<{$item_li.sku.image|getResizeImg=###,80,80}>" class="order-img" onerror="imgError(this)"></a>
							<div class="parameter"><a href="javascript:;"><{$item_li.sku.item.name}></a>
							  <p>
							  <notempty name="item_li.sku.attributes">
								<volist name="item_li.sku.attributes" id="item_attributes" key="attributes_key" >
								<{$item_attributes.name}>：<{$item_attributes.value}>
								<?php if($attributes_key != count($item_sku['sku']['attributes'])):?>&emsp;<?php endif;?>
								</volist>
							  </notempty>
							  </p>
							</div>
						</td>
						<td class="t-price f16"><span class="price">￥<{$item_li.sku.price|convert_price=###}></span></td>
						<td class="num"><{$item_li.quantity}></td>
						<td class="prod-opr">
						<if condition="$order_item.type neq 6 && $order_item.type neq 7 ">
						  <a href="<?=imUrl('shop',$shopid)?>" data-action="entryBtn" target="_blank"><p>联系商家</p></a>
						  <else />
						  <a href="javascript:;" class="gm-gray" >联系商家</a>
						</if>
						</td>
					</tr>
					</if>
				</volist>	
			</if>
			</volist>
			</notempty>
          </tbody>
        </table>
      </div>
    </div>
<include file="Home@Front/Public:footer" />
