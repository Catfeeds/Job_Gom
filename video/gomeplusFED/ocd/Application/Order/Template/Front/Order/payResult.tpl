<?php
    $csspath = 'shop/searchresultnone.css';
    $jspath = '/js/conf/payresult.js';
?>
<include file="Front/Public/header" />
    <div class="wrap-box">
      <div class="paystate top30 clearfix">
	  <if condition="!empty($paySuccess['success']) && !empty($paySuccess['data']['payState'])">
        <h2 class="clearfix"><em class="icon icon-suc">&#xea52;</em>支付成功</h2>
	  <else />
        <h2 class="clearfix"><em class="icon icon-shib">&#xeab3;</em>支付失败!</h2>
	  </if>
        <div class="pay-left">
          <dl class="clearfix">
            <dt>寄送至：</dt>
			<dd>
			<?php
				echo $orderDetail['recieverAddress'];
				echo $orderDetail['name'].' 收 ';
				echo $orderDetail['mobile'];
			?>
			</dd>
          </dl>
          <dl class="clearfix">
            <dt>订单号：</dt>
			<dd><?php echo $orderDetail['mergerId'];?></dd>
          </dl>
          <dl class="clearfix">
            <dt>实付款：</dt>
			<dd><span>￥<?php echo $orderDetail['mergerPayMoney'];?></span></dd>
          </dl>

		<if condition="!empty($paySuccess['success']) && !empty($paySuccess['data']['payState'])">
		<else />
			<a href="/order/paydetail?fid=<{$fid}>" class="pc-btn failed-btn">重新支付</a>
		</if>
        </div><img src="<{$pcimgpath}>/images/shop/ma2.png" class="gome-code">
      </div>
    <?php if(!empty($recommendList)):?>
        <h2 class="title">为您推荐</h2>
        <div class="shop-list">
            <ul class="clearfix">
                <?php foreach($recommendList as $recommend):?>
                <li>
                    <a href="<?php echo productDetailUrlGen($recommend['shopId'],$recommend['id'],$source_code);?>" target="_blank">
                        <?php if(!empty($recommend['rebate']['isRebate'])):?>
                        <em class="icon-fan">返</em>
                        <?php endif;?>
                        <img src="<?=$recommend['mainImage']?>">
                        <div class="text">￥<span><?=number_format(ceil($recommend['salePrice'])/100,2)?></span>
                            <p><?=$recommend['name']?></p>
                        </div>
                    </a>
                </li>
                <?php endforeach;?>
            </ul>
        </div>
    <?php endif;?>
    </div>
<include file="Home@Front/Public/footer" />
