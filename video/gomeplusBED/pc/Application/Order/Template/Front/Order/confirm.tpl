<?php
    $csspath = 'order.css';
    $jspath = '/js/conf/orderDetails.js';
    $orderPayDetails = true;
?>
<include file="Front/Public/header" />
<script>
    $GLOBAL_CONFIG['fid'] = '<?php echo $fid;?>';
    $GLOBAL_CONFIG['orderDetail'] = <?php echo json_encode($orderDetail);?>;
</script>
<div class="wrap-box">
    <h2 class="title">订单信息</h2>
    <div class="order-state">
        <p class="attention">提示：请您在下单后3小时内完成支付，否则订单会自动取消</p>
        <dl class="clearfix">
            <dt>订单编号：</dt>
            <dd><?php echo $orderDetail['mergerId'];?></dd>
        </dl>
        <dl class="clearfix">
            <dt>支付金额：</dt>
            <dd><span>￥<{$orderDetail['mergerPayMoney']|convert_price=###}></span></dd>
        </dl>
        <dl class="clearfix">
            <dt>下单时间：</dt>
            <dd><?php echo $orderDetail['orderTime'];?></dd>
        </dl>
        <dl class="clearfix">
            <dt>寄 送 至：</dt>
            <dd>
                <?php
                    echo $orderDetail['recieverAddress'].' ';
                    echo $orderDetail['name'].' 收 ';
                    echo $orderDetail['mobile'];
                ?>
            </dd>
        </dl>
    </div>
    <h2 class="title">支付平台</h2>
    <div class="order-state" data-node="orderState">

	<if condition="$is_weixin">
        <form data-node="paySubmit" method="post" action="<?=$order_domain;?>order/paycode">
		<else />
        <form data-node="paySubmit" method="post" target="_blank" action="<?=$order_domain;?>order/paycode">
		</if>
            <label class="pay-way active">
                <input name="channel" type="radio" value="110004" checked="true"><span class="menu-radio menu-radio-checked" data-action="payRadio"></span><em class="icon-weixin"></em>
            </label>
			<input type="hidden" name="fid" value="<?php echo $fid ?>">
			<if condition="!$is_weixin">
            <label class="pay-way">
              <input name="channel" type="radio" value="210004"><span class="menu-radio" data-action="payRadio"></span><em class="icon-zfb"></em>
            </label>
			</if>

            <label class="pay-way">
                <input name="channel"  type="radio" value="410004"><span class="menu-radio" data-action="payRadio"></span><em class="icon-gm"></em>
            </label>




        </form>
        <div class="btn-box"><a data-action="paySubmit" href="javascript:;" class="pc-btn pc-bj-fc8753 pc-btnw120 pc-btnh45" data-action="subOrder">下一步</a></div>
    </div>
</div>
<include file="Home@Front/Public/footer" />
