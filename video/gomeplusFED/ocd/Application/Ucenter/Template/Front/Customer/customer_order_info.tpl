<?php
    $csspath = 'shop/returns.css';
    $jspath  = '/js/conf/showCustomerInfo.js';
?>
<include file="Home@Front/Public:header" />
    <div class="crumbs-box"><a href="/customerInfo/index">退款售后</a><em>></em><a href="/customerInfo/index">退款管理</a><em>></em><a href="javascript:;">申请的退换货</a><em>></em><span class="crnmb-activ">查看详情</span></div>
    <div class="wrap-box">
      <div class="bg-white">
        <div class="order-detail-box">
          <h2 class="order-detail-title">订单详情</h2>
          <ul class="order-detail clearfix">
            <li class="clearfix">
              <label>服务类型：</label>
              <p><{$senddata.order_info.typeDesc}></p>
            </li>
			<?php
				if(in_array($senddata['order_info']['type'],array(2,4,5))){	//退款
			?>
            <li class="clearfix">
              <label>退款原因：</label>
			  <if condition="empty($senddata['order_info']['reason'])">
				<p>取消订单</p>
			  <else />
				<p><{$senddata.order_info.reason}></p>
			  </if>
            </li>
			<?php
				}else{	//换货
			?>
			<li class="clearfix">
              <label>换货原因：</label>
			  <if condition="empty($senddata['order_info']['reason'])">
				<p></p>
			  <else />
				<p><{$senddata.order_info.reason}></p>
			  </if>
            </li>
			<?php
				}		
			?>

			<?php
				if(in_array($senddata['order_info']['type'],array(2,4,5))){	//退款
			?>
            <li class="clearfix">
              <label>退款编号：</label>
              <p><{$senddata.order_info.money_id}></p>
            </li>
            <li class="clearfix">
              <label>退款金额：</label>
				<p>￥<{$senddata.order_info.returnMoney}></p>
            </li>
			<?php
				}else{	
			?>
			<li class="clearfix">
              <label>换货编号：</label>
              <p><{$senddata.order_info.money_id}></p>
            </li>
            <li class="clearfix">
              <label>交易金额：</label>
				<p>￥<{$senddata.order_info.returnMoney}></p>
            </li>
			<?php 
				}	
			?>

            <li class="clearfix">
              <label>处理进度：</label>
              <p class="order-state"><{$senddata.order_info.statusDesc}></p>
            </li>
          </ul>
        </div>
      </div>
      <table class="shop-car-list order-information">
        <tr class="bor-none">
          <th class="width660">
            <div class="merchandise-news margi-left20">商品信息</div>
          </th>
          <th>单价 (元)</th>
          <th>数量</th>
          <th>优惠</th>
          <th>运费</th>
        </tr>
      </table>


<?php
	if($senddata['total']['total_goods'] == 1){
?>
      <table class="shop-car-list order-information">
        <tr>
          <td colspan="5" class="align-left">
            <div class="check-all">
              <div class="shop-arl-check icon-fontsize"><em class="icon">&#xe9df;</em></div>
			  <a href="<{$senddata['order_info']['show_shop_name']['id']|shopDetailUrlGen}>" target="_blank"  class="store-name-text"><{$senddata.order_info.show_shop_name.name}></a>
			  <a href="javascript:;" class="connect-shop" data-node="tell_buger">联系商家</a>
            </div>
          </td>
        </tr>
		<foreach name="senddata.goods_info" item="vo" key = "k">
        <tr>
          <td colspan="3">
            <div class="products-by">
              <div class="graphic clearfix">
			  <a href="<{$vo['good_id']|productDetailUrlGen=$vo['shopid'],###}>" target="_blank">
                  <div class="product-bx"><img src="<{$vo.good_image|getResizeImg=###,80,80}>"></div>
                  <div class="product-name"><a href="<{$vo['good_id']|productDetailUrlGen=$vo['shopid'],###}>?skuid=<{$vo['skuid']}>" class="product-title" target="_blank"><{$vo.good_name}></a>
				  <p class="product-color">
					<foreach name="vo.attribute" item = "attr" key = "attr_key">
						<span><{$attr.name}>:<{$attr.value}></span>&nbsp&nbsp&nbsp
					</foreach>
					</p>
					<if condition= "$vo['shop_type'] eq 1">
						<p class="product-source"><span></span></p>
					<else />
						<p class="product-source"><span>来自美店:<{$vo.xpopname}></span></p>
					</if>
                  </div></a></div>
				  <span class="price-count">￥<{$vo.good_price}></span>
				  <span class="price-count"><{$vo.good_total}></span>
            </div>
          </td>
          <td class="bor-r">
            <div class="new-border-bom">￥<{$senddata.total.promation}></div>
          </td>
          <td>
            <div class="new-border-bom">￥<{$senddata.total.total_const}></div>
          </td>
        </tr>
		</foreach>
      </table>
	  <?php
		}else{
	  ?>
      <table class="shop-car-list order-information">
        <tr>
          <td colspan="5" class="align-left">
            <div class="check-all">
              <div class="shop-arl-check icon-fontsize"><em class="icon">&#xe9df;</em></div>
			  <a href="<{$senddata['order_info']['show_shop_name']['id']|shopDetailUrlGen}>" target="_blank"  class="store-name-text"><{$senddata.order_info.show_shop_name.name}></a>
			  <a href="javascript:;" class="connect-shop" data-node="tell_buger" >联系商家</a>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="3">
		<foreach name="senddata.goods_info" item="vo" key = "k">
            <div class="products-by">
              <div class="graphic clearfix">
			  <a href="<{$vo['good_id']|productDetailUrlGen=$vo['shopid'],###}>?skuid=<{$vo['skuid']}>" target="_blank">
                  <div class="product-bx"><img src="<{$vo.good_image|getResizeImg=###,80,80}>"></div>
                  <div class="product-name"><a href="<{$vo['good_id']|productDetailUrlGen=$vo['shopid'],###}>?skuid=<{$vo['skuid']}>" class="product-title" target="_blank"><{$vo.good_name}></a>
				  <p class="product-color">
					<foreach name="vo.attribute" item = "attr" key = "attr_key">
						<span><{$attr.name}>:<{$attr.value}></span>&nbsp&nbsp&nbsp
					</foreach>
					</p>
					<if condition= "$vo['shop_type'] eq 1"><!--是xpoo店-->
						<p class="product-source"><span></span></p>
					<else />
						<p class="product-source"><span>来自美店:<{$vo.xpopname}></span></p>
					</if>
                  </div></a></div>
				  <span class="price-count">￥<{$vo.good_price}></span>
				  <span class="price-count"><{$vo.good_total}></span>
            </div>
		</foreach>
          </td>
          <td class="bor-r">
            <div class="new-border-bom">￥<{$senddata.total.promation}></div>
          </td>
          <td>
            <div class="new-border-bom">￥<{$senddata.total.total_const}></div>
          </td>
        </tr>
      </table>
	  <?php
			} 
	  ?>
      <div class="items-total">
        <p><span class="goods-together"><strong class="numb"><{$senddata.total.total_goods}> </strong>件商品，商品合计：</span><span>￥<{$senddata.total.money_total}></span></p>
        <p><span class="goods-together">运费：</span><span>￥<{$senddata.total.total_const}></span></p>
        <p><span class="goods-together">使用优惠券：</span><span>￥<{$senddata.total.promation}></span></p>
        <p><span class="goods-together">使用国美币：</span><span>￥<{$senddata.total.gome_moeny_total}></span></p>
        <p><span class="goods-together">订单总计：</span><span>￥<{$senddata.total.order_total_money}></span></p>
      </div>
    </div>
<include file="Home@Front/Public:footer" />
