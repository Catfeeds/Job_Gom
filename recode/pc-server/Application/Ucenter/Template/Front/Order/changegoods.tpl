<?php
    $csspath = 'changegoods.css';
    $jspath  = '/js/conf/returnReplacement.js';
?>
<include file="Home@Front/Public:header" />
<script>
	$GLOBAL_CONFIG['order_id'] = <{$shop_info.order_id}>;
	$GLOBAL_CONFIG['orderType'] = <{$orderType}>;
	$GLOBAL_CONFIG['showPriv'] = <{$showPriv}>;
</script>
    <div class="wrap-box">
      <div class="crumbs-box"><a href="javascript:;">我的订单</a><em>></em><a href="javascript:;">售后管理</a><em>></em><span class="crnmb-activ">
	  申请售后
	  </span></div>
      <div class="progress-box progress-return">
        <ol class="clearfix">
          <li class="first actived"><span class="number">01</span>买家申请换货退款</li>
          <li class="second active"><span class="number">02</span>卖家处理退货申请</li>
          <li class="third"><span class="number">03</span>买家退货给卖家</li>
          <li class="fourth"><span class="number">04</span>卖家确认收货，退款成功</li>
        </ol>
      </div>
      <table class="change-box">
        <tr>
          <th>
            <div class="apply-title clearfix">
              <h2>申请服务:</h2>
            </div>
          </th>
          <th>
            <p class="order-num">订单号 :<span data-node="orderNum" ><{$shop_info.big_orderid}></span></p>
          </th>
          <th>
            <p class="mark">*为必填项</p>
          </th>
        </tr>
        <tr>

		 
          <td class="bordr">
			<foreach name="goods_info" item = "vo" key = "key">
            <div class="product-info borb"><a href="<{$vo['good_id']|productDetailUrlGen=$vo['shop_id'],###}>?skuid=<{$vo.skuid}>" data-goodid="<{$vo.good_id}>" target="_blank"><img src="<{$vo.good_image|getResizeImg=###,80,80}>" class="product-img"  onerror="imgError(this)" ></a><a href="<{$vo['good_id']|productDetailUrlGen=$vo['shop_id'],###}>?skuid=<{$vo.skuid}>" class="prod-title" target="_blank"><{$vo.good_name|htmlspecialchars}></a>
			<foreach name="vo.attributes" item = "attr" key = "k">
              <p class="spec"><{$attr.name}>：<{$attr.value}></p>&nbsp&nbsp
			</foreach>

              <p class="price"><span class="price-l">实付金额：</span><span>￥<{$vo.paymentAmount}></span></p>
              <p class="price"><span class="price-l">运费：</span><span>￥<{$vo.shippingCost}></span></p>
			  <a href="<{$mall_domain}>shop/<{$shop_info['shop_id']}>.html" class="shop-info" target="_blank"><em class="icon icon-shop">&#xe9df;</em>
				<span data-goodid="<{$shop_info.shop_id}>"><{$shop_info.shop_name}></span>
			  </a>
			  <a href="<?=imUrl('shop',$shop_info['shop_id'])?>" target="_blank" data-action="entryBtn" class="connect-shop"  >联系商家</a>
            </div>
			</foreach>

          </td>
          <td class="bordr">
            <ul class="input-apllication">
			<li class="clearfix">
				<label>申请类型:</label>
				<div class="trade-state-radio" data-btn='goodOption'>
					<span class="radio" data-node="extGoBtn"><em class="menu-radio menu-radio-checked "></em>换货</span>
					<span class="radio" data-node="returnGoBtn"><em class="menu-radio"></em>退货</span>
				</div>
			</li>
              <li class="clearfix">
                <label data-node="reasionLabel"><em class="red-star"></em><span>换货原因：</span></label>
                <div class="trade-state-select" data-none = "returnReason" >
				  <span class="select-txt">尺寸问题</span><em class="icon icon-down icon-up"></em>
                  <div class="trade-state-select-list" data-node = "reasonList" ><a href="javascript:;">1</a><a href="javascript:;">2</a><a href="javascript:;">3</a></div>
                </div>
              </li>
              <li class="clearfix">
                <label data-node="descLabel"><em class="red-star"></em><span>换货描述：</span></label>
                <div class="textarea">
                  <textarea placeholder="请输入详细原因" data-node= "reasonDescribe" ></textarea>
                  <p class="txt-count"><span>200</span>/200</p>
                </div>
              </li>
			  <li class="clearfix">
                <label>申请数量：</label>
                <div class="goods-num">
                	<span class="num-add disabled" data-node="reduceNum" >-</span>
                  	<input type="text" class="input" value="1" data-node="inputChooseNum" data-goodsMaxNum="<{$skuNum}>">
                  	<span class="num-minus <?php if($skuNum==1):?>disabled<?php endif;?>" data-node="addNum">+</span>
                </div>
                <div class="num-text" data-node="markedWordNum">您可提交的数量最多为<{$skuNum}>个，该功能只能操作一次，数量请您斟酌</div>
              </li>
			<li class="button"><a href="javascript:;" class="w120-h40 order-btn-red" data-node="sendMsg" >提交发送</a><a href="javascript:;" class="w120-h40 order-btn-gray" data-node="cancelMsg" >取消返回</a></li>
			</ul>
			</td>
			<td>
			<div class="service-intro">
				<h3>服务介绍</h3>
				<h4>1. 退换货申请</h4>
				<p>用户需收到商品并点击确认收货后，页面出现“申请售后”按钮，点击相应按钮进入“退货”和“换货页面；</p>
				<h4>2. 退货退款</h4>
				<p>若为商品问题，或不想要了且与商家达成一致退货，请选择“退货”选项；退货后请保留物流底单，选择快递公司及填写快递单号，信息点击确认发货，商家收到退回的货物后再进行退款操作；</p>
				<p>退货流程：1.申请退货 >2.卖家发送退货地址给买家 >3.买家退货并填写退货物流信息 >4.卖家确认收货，退款成功；</p>
				<p>退款周期为15个工作日，退款方式为原路支付方式；</p>
				<h4>3. 换货</h4>
				<p>若用户与商家协商一致换货，请选择“换货”选项，退货后请保留物流底单，选择快递公司及填写快递单号，信息点击确认发货，商家收到退回的货物后再进行发新货操作；</p>
				<p>换货流程：1.申请换货 >2.卖家发送退货地址给买家 >3.买卖家线下完成换货 >4.买家线上确认完成；</p>
				<h4>4. 退换货未处理</h4>
				<p>商家未受理用户”退换货“申请，则用户端显示”审核失败“，显示审核失败后，您可再次申请”退换货“；</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
<p class="ordi-toast-txt hide" data-bigToast="toast"></p>
<include file="Home@Front/Public:footer" />
