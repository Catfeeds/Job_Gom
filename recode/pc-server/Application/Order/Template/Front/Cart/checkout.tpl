<?php
    $csspath = 'sureorder.css';
    $jspath = '/js/conf/confirmOrder.js';
?>
<include file="Front/Public/header" />
<script>
    $GLOBAL_CONFIG['couponList'] = <?php echo json_encode($couponList);?>;
    $GLOBAL_CONFIG['gomeCoin'] = <?php echo json_encode($gomeCoin);?>;
    $GLOBAL_CONFIG['deliverInfo'] = <?php echo json_encode($deliverInfo);?>;
    $GLOBAL_CONFIG['skuList'] = <?php echo json_encode($skuList);?>;
    $GLOBAL_CONFIG['passwordVerify'] = <?php echo (int)$passwordVerify;?>;
    $GLOBAL_CONFIG['currentAddress'] = <?php echo json_encode($currentAddress);?>;
    $GLOBAL_CONFIG['orderList'] = <?php echo json_encode($orderList);?>;
    $GLOBAL_CONFIG['fid'] = '<?php echo $fid;?>';
    $GLOBAL_CONFIG['isCross'] = '<?php echo $isCross;?>';
    $GLOBAL_CONFIG['show_eceipt'] = '<?php echo $show_eceipt;?>';
    $GLOBAL_CONFIG['showStatus'] = '<?php echo $showStatus;?>';
</script>
<div class="wrap-box">
    <h1 class="shopcar">确认订单信息<a href="javascript:;" data-action="addAddr" data-count="<?php echo count($addressList);?>">新增收货地址</a></h1>
    <div class="address-editor" >
        <p class="addre-send">寄送至:</p>
        <div class="addre-box" style="<?php if(count($addressList) > 5) echo 'height:216px;';?>">
            <table width="100%" class="table" data-node="addrList">
                <?php foreach($addressList as $address):?>
                    <tr data-id="<?=$address['id']?>"  <?php if(!empty($address['isDefault'])):?>data-dft="1" <?php endif;?>>
                        <td width="10%">
                            <?php if(!empty($address['currentAddress'])):?>
                                <div class="name-box name-active" data-node="curAddr"><?php echo $address['userName'];?></div>
                            <?php else:?>
                                <div class="name-box name-no-bor" data-node="lightName"><?php echo $address['userName'];?></div>
                            <?php endif;?>
                        </td>
                        <td width="65%" data-node="addrInfos" data-addr='<{$address|json_encode}>'>
                            <span title="<?php echo $address['userName'];?>" class="consignee-name hide" data-node="name"><?php echo $address['userName'];?></span>
                            <span title="" class="ship-address" data-node="area">
                                <?php
                                    echo $address['provinceName'];
                                    echo $address['cityName'];
                                    echo $address['boroughName'];
                                    echo $address['areaName'];
                                    echo $address['address'];
                                ?>
                            </span>
                            <span class="phone-numb" data-node="phone"><?php echo $address['mobile'];?></span>
                        </td>
                        <td width="25%" class="text-aglin-r">
                            <?php if(!empty($address['isDefault'])):?>
                            <span class="default-address-bj" data-node="dftAddr">默认地址</span>
                            <?php else:?>
                            <span class="default-address-bj hide" data-node="dftAddr">默认地址</span>
                            <?php endif;?>
                            <a href="javascript:;" data-action="delAddr">删除</a>
                            <a href="javascript:;" data-action="editAddr">编辑</a>
                            <a href="javascript:;" data-action="setDft" <?php if(!empty($address['isDefault'])):?>style="visibility:hidden"<?php endif;?> >设置为默认地址</a>
                            <!-- <?php if(empty($address['isDefault'])):?>
                            <?php endif;?> -->
                        </td>
                    </tr>
                <?php endforeach;?>
            </table>
        </div>
        <p class="unfold-bx">
            <a href="javascript:;" style="<?php if(count($addressList) <= 5) echo 'display:none;' ; ?>" data-action="expand"><span>展开</span><em class="iconn-45"></em></a>
        </p>
    </div>
    <h1 class="shopcar">确认订单信息</h1>
    <table class="shop-car-list order-information">
        <tr>
            <th class="width55">
                <div class="merchandise-news margi-left20">商品信息</div>
            </th>
            <th>单价（元）</th>
            <th>数量</th>
            <th>金额（元）</th>
        </tr>
    </table>
    <?php
        $orderTotal = $productNumTotal= 0;
        foreach($orderList as $order):
            $shopTotal = 0;
    ?>
    <div data-node="shopItem">
        <table class="shop-car-list order-information" data-node="shopInfo" data-shopid="<{$order['shop']['id']}>" >
        <tr class="bor-bom">
            <td colspan="4" class="align-left">
                <div class="check-all">
                    <div class="shop-arl-check icon-fontsize">
                        <em class="iconn-44"></em>
                    </div>
                    <span class="store-name-text"><{$order['shop']['name']}></span>
                </div>
            </td>
        </tr>
        <volist name="order.orderItems" id="vo">
		<?php
            $productInfo = array(
                                'shopId' => $vo['mshop']['id'],
                                'skuId' => $vo['sku']['id'],
                                'rebateId' => $vo['kid'],
                                'proNum' => $vo['quantity'],
                            );
		?>
            <tr class="bor-bom">
                <td class="width55">
                    <div class="products-by margi-left20">
                        <input type="checkbox">
                        <div class="graphic">
                            <a href="javascript:;">
                                <div class="product-bx">
                                    <img onerror="imgError(this)" src="<{$vo['sku']['image']|getResizeImg=###,80,80}>">
                                </div>
                                <div class="product-name">
                                    <h4 class="product-title"><{$vo['sku']['item']['name']}></h4>
                                    <?php $show_attr=''; foreach($vo['sku']['attributes'] as $sku_attr){ $show_attr .= $sku_attr['name'].':'.$sku_attr['value'].' '; } ?>
                                    <p class="product-color"><{$show_attr|rtrim}></p>

                                    <?php if($order['shop']['id'] != $vo['mshop']['id']):?>
                                        <p class="product-source"><span>商品来自美店：</span><{$vo['mshop']['name']}></p>
                                    <?php endif;?>
                                </div>
                            </a>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="new-border-bom"><{$vo['sku']['price']|convert_price=###}></div>
                </td>
                <td>
                    <div class="new-border-bom"><{$vo['quantity']}></div>
                </td>
                <?php
                    $productTotal = $vo['sku']['price'] * $vo['quantity'];
                    $shopTotal += $productTotal;
                    $productNumTotal += $vo['quantity'];
                ?>
                <td>
                    <div class="new-border-bom"><{$productTotal|convert_price=###}></div>
                </td>
            </tr>
        </volist>
        </table>

        <table class="shop-car-list order-information">
            <tr>
                <td colspan="4" class="align-left total-price" data-node="shop" data-shoptotalprice="<{$shopTotal|convert_price=###}>">
                    <div class="commodity-prices">运费：<strong><if condition="!$order['shippingCost']">免运费<else />￥<{$order['shippingCost']|convert_price=###}></if></strong>&nbsp;&nbsp;&nbsp;店铺合计（含运费）:<strong>￥<{$shopTotal + $order['shippingCost']|convert_price=###}></strong></div>
                </td>
            </tr>
        </table>
    </div>
    <?php
        $orderTotal += $shopTotal;
        endforeach;
    ?>
    <h1 class="shopcar">买家留言</h1>
    <div class="address-editor">
    <input data-node="buyerMsg" type="text" placeholder="给商家留言（30字内）" class="order-message">
    </div>    


<if condition="$show_eceipt eq 1" >
    <h1 class="shopcar">发票明细</h1>
    <div class="address-editor">
        <div class="invoice-details" data-node="invoice" data-n="个人" data-t="1">
            <p class="invoice-txt">发票类型：<span data-node="invoiceType">普通发票</span></p>
            <p class="invoice-txt">发票抬头：<span data-node="invoiceTitle">个人</span></p>
            <p class="invoice-txt">发票内容：<span data-node="invoiceDetail">明细</span></p>
            <a class="modify" data-action="updateInvoice" href="javascript:;">修改</a>
        </div>
    </div>
<else />
    <h1 class="shopcar">发票明细</h1>
    <div class="address-editor">
        <div class="invoice-details" data-node="invoice" data-n="" data-t="0">
            <p class="invoice-txt">发票类型：<span data-node="invoiceType">不开发票</span></p>
            <p class="invoice-txt hide">发票抬头：<span data-node="invoiceTitle">个人</span></p>
            <p class="invoice-txt hide">发票内容：<span data-node="invoiceDetail">明细</span></p>
            <a class="modify" data-action="updateInvoice" href="javascript:;">修改</a>
        </div>
    </div>
</if>


    <h1 class="shopcar">优惠信息</h1>
    <div class="address-editor marg-b20">
        <div class="invoice-details">
            <p class="invoice-txt marg-r10"><a data-action="useTickets" href="javascript:;"><span class="looked-up">使用优惠券</span><em class="iconn-2"></em></a></p>
            <p class="invoice-txt"><span data-node="ticketsDiscountName">已抵扣：</span><span data-node="ticketsDiscount" class="looked-up">￥0</span></p>
            <p class="invoice-txt marg-r10"><a data-action="useGomeCoin" href="javascript:;"><span class="looked-up">使用国美币</span><em class="iconn-2" data-node="gomeicon"></em></a></p>
            <p class="invoice-txt" data-node="useGomeCoin">无可用国美币</p>
        </div>
    </div>
    <div class="address-editor marg-b20 pad0">
        <div class="items-total">
            <p><strong class="numb"><{$total['total_quantity']}></strong>件商品，商品合计：<span data-node="goodsTotalPrice" data-goodstotalprice="<{$total['goodsCost']}>">￥<{$total['goodsCost']|convert_price=###}></span></p>
            <p>运费：<span data-node="shippingPrice" data-shippingprice="<{$total['totalShippingCost']}>">￥<{$total['totalShippingCost']|convert_price=###}></span></p>
            <p>使用优惠券：<span data-node="useTicketsPrice">￥0</span></p>
            <p>使用国美币：<span class="coinVal" data-node="useGomeCoinPrice">￥0</span></p>
        </div>
        <div class="submit-order-bx">
            <p class="submit-order-txt">应付金额：<span><strong>￥</strong><span data-node="finalPrice"><{$total['totalPaymentMoney']|convert_price=###}></span></span></p>
            <p class="submit-order-txt"><span class="info">寄送至：<?php echo $currentAddress['address'];?><span></p>
			<p class="submit-order-txt" ><span class="info">收货人: <?php echo $currentAddress['userName'];?> <?php echo $currentAddress['mobile'];?></span></p>
            <div class="submit-btn"><a href="javascript:;" data-action="submitOrder" class="pc-btn pc-btnw160 pc-btnh50 pc-no-radius">提交订单</a></div>
        </div>
    </div>
</div>
<include file="Home@Front/Public/footer" />


