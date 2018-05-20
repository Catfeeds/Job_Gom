<?php
    $csspath = 'usercenter.css';
?>
<include file="Home@Front/Public:header" />
<script>
window._page_name_ = '个人中心-我的优惠券';
window._page_id_ = 'F005';
</script>
<div class="wrap-box mart20 clearfix">
	  <include file="Front/Public/left" />
      <div class="user-right">
		<!--
        <div class="coupons-tab"><a href="javascript:;" class="active">未使用<span>（5）</span></a><a href="javascript:;">以使用<span>（5）</span></a><a href="javascript:;">已过期<span>（5）</span></a></div>
		-->
        <div class="coupons-tab">
		<if condition="$status eq 1">
			<a href="/coupon/index?status=1" class="active">未使用<span></span></a>
		<else />
			<a href="/coupon/index?status=1" >未使用<span></span></a>
		</if>

		<if condition="$status eq 2">
			<a href="/coupon/index?status=2" class="active">已使用<span></span></a>
		 <else />
			<a href="/coupon/index?status=2">已使用<span></span></a>
		</if>

		<if condition="$status eq 4">
			<a href="/coupon/index?status=4" class="active">已过期<span></span></a>
		<else />
			<a href="/coupon/index?status=4">已过期<span></span></a>
		</if>

		 </div>
		<if condition="!empty($data)">
        <div class="user-coupons">
          <ul class="clearfix">
			<foreach  name="data" item = "info" key = "k">
			<if condition="$info.batchType eq 1"><!--店铺-->
				<if condition="($status eq 4) or ($status eq 2)">
					<if condition="$status eq 2">
						<li class="overdue">
					<else />
						<li class="fail">
					</if>
				<else />
					<li>
				</if>
			<else /><!--平台-->
				<if condition ="($status eq 4) or ($status eq 2)">
					<if condition="$status eq 2">
						<li class="overdue">
					<else />
						<li class="fail">
					</if>
				<else />
					<li class="red">
				</if>
			</if>

			<if condition="($status eq 4) or ($status eq 2)">
				<em class="icon-weigq"></em>
			<else />
				<if condition="$info['show'] eq 1">
					<em class="icon-weigq"></em>
				</if>
			</if>
			 <if condition ="$info.batchType eq 1"> <!--店铺-->
              <div class="img-head">
				<a href="<?php echo  $info['batchType'] == 1 ? shopDetailUrlGen($info['shop_id']) : $mall_domain.'search' ?> " target="_blank"><img src="<{$info.shop_icon}>" alt="" onerror="imgError(this,'h')"></a>
				<em>￥ </em><span><{$info.money}> </span><p class="pa">店铺券</p>
			  </div>
			<else /> <!--平台-->
              <div class="img-head">
				<a href=" <?php echo  $info['batchType'] == 1 ? shopDetailUrlGen($info['shop_id']) : $mall_domain.'search' ?>" target="_blank"><img src="<{$pcimgpath}>/images/public/down-logo.png" alt="" onerror="imgError(this,'h')"></a>
				<em>￥ </em><span><{$info.money}> </span><p class="pa">平台券</p>
			  </div>
			</if>
              <div class="coupons-text">
					<p>发行店铺：<a href="<?php echo  $info['batchType'] == 1 ? shopDetailUrlGen($info['shop_id']) : $mall_domain.'search' ?>" target="_blank"><{$info['shop_name'] ? $info['shop_name'] : '国美平台'}></a></p>
                <p>使用条件：<span>在本店购物满<{$info.minAmount}>元可用</span></p>
                <p>有效期：<span><{$info.start_time}>－<{$info.end_time}></span></p>
              </div>
			  <if condition="$status eq 1">
				<div class="cover"></div>
			  </if>
              <div class="bg-head"></div>
            </li>
			</foreach>
          </ul>
        </div>
		<else />
        <div class="no-topic">
          <div class="txt clearfix"><em class="iconn-58"></em>
            <p> <span>暂时没有国美优惠券哦~</span></p>
          </div>
        </div>
		</if>
	 <div class="page">
	  <{$link_url}>
	  </div>
	     
      </div>
    </div>
<include file="Home@Front/Public:footer" />
