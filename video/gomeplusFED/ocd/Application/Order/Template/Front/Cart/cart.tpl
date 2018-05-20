<?php
    $csspath = 'shop/shopcart.css';
    $jspath = '/js/conf/cart.js';
?>
<include file="Front/Public/header" />
<script>
    $GLOBAL_CONFIG['fid'] = '<?php echo $fid;?>';
</script>
<div class="wrap-box">
    <h1 class="shopcar">购物车</h1>
	<notempty name="cartList">
	<table class="shop-car-list" data-node="listHead">
		<tr class="bor-bom">
			<th class="width55">
				<div class="check-all">
					<input type="checkbox">
					<div class="shop-arl-check"><a data-node="checkAll" data-action="checkbox" href="javascript:;"></a></div><span>全选</span>
				</div>
				<div class="merchandise-news">商品信息</div>
			</th>
			<th>单价（元）</th>
			<th>数量</th>
			<th>金额（元）</th>
			<th>操作</th>
		</tr>
	</table>
	</notempty>
    <?php foreach($cartList as $shopId => $shop):?>
        <?php if(!empty($shop['list'])):?>
            <table class="shop-car-list over-inherit">
                <tr class="bor-bom">
                    <td colspan="5" class="align-left volume-pop">
                        <div class="check-all">
                            <input type="checkbox">
                            <div class="shop-arl-check martop3">

                            <a data-node="checkStore" data-action="checkbox" href="javascript:;"></a>
                            
                            </div><a href="<?php echo shopDetailUrlGen($shopId);?>" target="_blank"><span class="store-name-text"><?php echo $shop['title'];?></span></a>
                            <?php if($shop['hasCoupon']):?>
                                <a data-shopId="<?=$shopId;?>" data-action="showTickets" href="javascript:;" class="volume">领券<em class="icon volume-icon-down">&#xea57;</em></a>
                            <?php endif;?>
                        </div>
                        <?php if($shop['hasCoupon']):?>
                        <div data-node="tickets" class="tickets-more">
                          <div class="ticket-cont"><a data-action="close" href="javascript:;" class="icon icon-close close-x">×</a>
                            <ul data-node="redPackList" class="ticket-list">
                                <li>加载中。。。</li>
                            </ul>
                          </div>
                        </div>
                        <?php endif;?>
                    </td>
                </tr>

                <?php foreach($shop['list'] as $product):?>
                    <tr data-node="skuTr">
                        <td class="width55">
                            <div class="products-by">
                                <div class="shop-arl-check martop0">                                    
                                    <a data-deleteid="<{$product['id']}>" data-sourcecode='<{$product['sourceCode']}>' data-goodsid="<{$product['sku']['item']['id']}>" data-skuid="<{$product['sku']['id']}>" data-shopid="<?php echo $product['mshop']['id'];?>" data-kid="<?php echo $product['kid'];?>" data-node="checkGoods" data-action="checkbox" href="javascript:;"></a>
                                </div>
                                <div class="graphic">									
									<div class="product-bx">
										<a href="<?php echo productDetailUrlGen($product['mshop']['id'],$product['sku']['item']['id'],$product['urlSourceCode']);?>" target="_blank">
											<img onerror="imgError(this)" src="<{$product['sku']['image']|getResizeImg=###,80,80}>">
										</a>
									</div>                                        
									<div class="product-name">
										<h4 class="product-title"><a href="<?php echo productDetailUrlGen($product['mshop']['id'],$product['sku']['item']['id'],$product['urlSourceCode']);?>" target="_blank"><{$product['sku']['item']['name']}></a></h4>
										<p class="product-color">
											<volist name="product.sku.attributes" id="attr">
												<{$attr['name']}>:<{$attr['value']}>
											</volist>
										</p>
										<?php if($product['mshop']['id'] != $product['sku']['item']['shop']['id']):?>
											<p class="product-source"><span>商品来自美店：</span><{$product['mshop']['name']}></p>
										<?php endif;?>
									</div>
								</div>
                            </div>
                        </td>
                        <td><div data-node="unitPrice" class="new-border-bom"><?php echo convert_price($product['sku']['price']);?></div></td>
                        <td>
                            <div class="new-border-bom">
                                <div class="product-number" data-node="spinner">
                                    <a href="javascript:;" data-spin="down">-</a>
                                    <input autocomplete="off" data-stock="<{$product['sku']['stock']}>" data-node="count" type="text" value="<{$product['quantity']}>">
                                    <a href="javascript:;" data-spin="up">+</a>
                                </div>
                                <div data-node="overCount" class="over-count">单个商品购买数量已超载</div>
                            </div>
                        </td>
                        <td><div data-node="price" class="new-border-bom">
                                <?php
                                    $total_price = number_format($product['quantity'] * $product['sku']['price'],2,'.','');
                                    echo convert_price( $total_price );
                                ?>
                            </div></td>
                        <td><div class="new-border-bom"><a data-deleteid="<?=$product['id']?>" data-action="del" href="javascript:;">删除</a></div></td>
                    </tr>
                <?php endforeach;?>
            </table>
        <?php endif;?>
    <?php endforeach;?>
	
	<notempty name="cartListInva">
	<div data-node="loseGoodsList">
	<table class="shop-car-list <notempty name='cartList'> fail-title</notempty>">
		<tr class="bor-bom">
			<th class="width55">
				<div class="check-all"><span>失效商品</span></div>
			</th>
			<th>单价（元）</th>
			<th>数量</th>
			<th>金额（元）</th>
			<th>操作</th>
		</tr>
	</table>
	<assign name="prodCountInva" value="1"/>
	<assign name="tableHideFlag" value="0"/>
	
	<foreach name="cartListInva" key="shopIdInv" item="shopInva">
	<gt name='prodCountInva' value='3'><assign name="tableHideFlag" value="1"/></gt>
	<table class="shop-car-list shop-car-fail <eq name='tableHideFlag' value='1'>hide</eq> ">
		<tr class="bor-bom">
			<td colspan="5" class="align-left">
				<div class="check-all"><em class="icon icon-shop">&#xe90c;</em><a href="<{$shopIdInv|shopDetailUrlGen}>" target="_blank"><span class="store-name-text"><{$shopInva.title}></span></a></div>
			</td>
		</tr>		
		<foreach name="shopInva.list" item="itemInva">
		<tr data-node="loseSkuTr" <if condition="($prodCountInva gt 3) AND ($tableHideFlag eq 0)"> class="hide"</if> >
			<td class="width55">
				<div class="products-by">
					<div class="shop-fail-text">
						<p>失效</p>
					</div>
					<div class="graphic">						
						<div class="product-bx">
							<a href="<{$itemInva['mshop']['id']|productDetailUrlGen=###,$itemInva['sku']['item']['id'],$itemInva['urlSourceCode']}>" target="_blank">
								<img onerror="imgError(this)" src="<{$itemInva['sku']['image']|getResizeImg=###,80,80}>">
							</a>
							<!--<span class="off-shelf">已下架</span>-->
						</div>
						<div class="product-name">							
							<h4 class="product-title"><a href="<{$itemInva['mshop']['id']|productDetailUrlGen=###,$itemInva['sku']['item']['id'],$itemInva['urlSourceCode']}>" target="_blank"><{$itemInva['sku']['item']['name']}></a></h4>
							<p class="product-color">
								<volist name="itemInva.sku.attributes" id="attr">
									<{$attr['name']}>:<{$attr['value']}>
								</volist>
							</p>
							<p class="product-source">
								<neq name="itemInva.mshop.id" value="$itemInva.sku.item.shop.id">
								<span>商品来自美店：</span><{$itemInva.mshop.name}>
								<span class="red">
								<else/>
								<span class="red pl0">
								</neq>									
								<neq name="itemInva.sku.status" value="1">
								该商品已经下架了
								<else/>
								该商品已经无货了
								</neq>
								</span>
							</p>
						</div>
					</div>
				</div>
			</td>
			<td>
				<div class="new-border-bom"><{$itemInva.sku.price|convert_price}></div>
			</td>
			<td>
				<div class="new-border-bom"><{$itemInva.quantity}></div>
				<input type="hidden" data-node="count" value="<{$itemInva.quantity}>">
			</td>
			<td>
				<div class="new-border-bom"><{$itemInva['quantity']*$itemInva['sku']['price']|convert_price}></div>
			</td>
			<td>
				<div class="new-border-bom"><a data-deleteid="<{$itemInva.id}>" data-action="delLose" href="javascript:;">删除</a></div>
			</td>
		</tr>
		<assign name="prodCountInva" value="$prodCountInva+1"/>
		</foreach>
	</table>
	</foreach>	
	<gt name="prodCountInva" value="4"><div class="fail-more"><a href="javascript:;" data-action="showMore" class="btn">更多</a></div></gt>
	</div>
	</notempty>

    <!-- 记录选中的商品ID -->
    <input type="hidden" data-node="goodsInfo">
    <form data-node="submitForm" action="<?php echo $order_domain.'cart/checkout';?>" method="post">
        <input type="hidden" id="skuList" name="skuList">
    </form>
    <div data-node="submitBar" class="bor-top">
        <table class="shop-car-list">
            <tr class="bor-bom">
                <td colspan="5" class="align-left">
					<notempty name="cartList">
                    <div class="check-all" data-node="checkAllWrap">
                        <input type="checkbox">
                        <div class="shop-arl-check margtop16"><a data-node="checkAll" data-action="checkbox" href="javascript:;"></a></div><span class="store-name-text martop13">全选</span>
                    </div>
					<a href="javascript:;" class="delete-selecte-items martop13" data-action="delAll">删除选中的商品</a>
					</notempty>
					<notempty name="cartListInva">
					<a href="javascript:;" class="delete-selecte-items martop13" data-action="delLoseAll">删除全部失效商品</a>
					</notempty>
                    <div class="commodity-prices">已选商品<strong data-node="selectedGoodsCount">0</strong>件&nbsp;&nbsp;&nbsp;合计（不含运费）：<strong data-node="totalPrice" class="font-size20">￥0.00</strong><a data-action="cartSubmit" href="javascript:;" class="pc-btn pc-btnw120 pc-btnh40 btn-default">去结算</a></div>
                </td>
            </tr>
        </table>
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
