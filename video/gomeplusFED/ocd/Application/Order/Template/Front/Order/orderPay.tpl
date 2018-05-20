<?php
    $csspath = 'shop/searchresultnone.css';
?>
<include file="Home@Front/Public:header" />
    <div class="wrap-box">
      <div class="paystate top30 clearfix">
	   <h2 class="clearfix"><em class="icon icon-zhif">&#xeaba;</em>订单已支付
			<p>请返回“我的订单”查看</p>
		</h2>
        <div class="pay-left">
		<if condition="!empty($data)" >
          <dl class="clearfix">
            <dt>寄送至：</dt>
            <dd><{$data.baseinfo.address}> <{$data.baseinfo.name}>收 <{$data.baseinfo.mobile}></dd>
          </dl>
          <dl class="clearfix">
            <dt>订单号：</dt>
            <dd><{$data.orderid}></dd>
          </dl>
          <dl class="clearfix">
            <dt>实付款：</dt>
            <dd><span>￥<{$data.paymentAmount}></span></dd>
          </dl>
		</if>
		<div class="btn-box clearfix">
			<a href="<{$i_domain}>order/index" class="pc-btn failed-btn order-btn-red">我的订单</a>
		  </div>
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
<include file="Home@Front/Public:footer" />
