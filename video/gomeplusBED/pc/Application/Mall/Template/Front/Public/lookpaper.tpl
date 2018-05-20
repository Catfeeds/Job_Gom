<?php
    $csspath = 'shop/shop-detail.css';
	$jspath  = '/js/conf/shopLicense.js';
?>
<include file="Home@Front/Public/header" xmlns="http://www.w3.org/1999/html"/>
<script>
    $GLOBAL_CONFIG['shopId'] = '<{$shopId}>';
    $GLOBAL_CONFIG['ownerUserId'] = '<?php echo ( isset($ownerUserId) ) ? $ownerUserId : '' ;?>';
    $GLOBAL_CONFIG['masteNickname'] = '<?php echo ( isset($masteNickname) ) ? $masteNickname : '' ;?>';
    $GLOBAL_CONFIG['type'] = '<{$type}>';
    $GLOBAL_CONFIG['word'] = '<?php echo ( isset($shopWord) ) ? $shopWord : '' ;?>';
    $GLOBAL_CONFIG['shoptype'] = '<{$vshop_type_num}>';
    $GLOBAL_CONFIG['isSearch'] = '<?php echo ( isset($isSearch) ) ? $isSearch : '' ;?>';
    $GLOBAL_CONFIG['weixin_share']='<{$wap_url}>shop-<{$shopId}>.html';
    $GLOBAL_CONFIG['shop_icon']='<{$shop['icon']|getResizeImg=###,120,120}>';
    $GLOBAL_CONFIG['shop_name']='<{$shop['name']}>';
    
</script>
<div class="wrap-box">
	<div class="shop-title clearfix">
		<div class="crumbs-box">
		   <a href="javescript:">首页</a><em>></em>
		   <a href="javescript:">商城</a><em>></em>
		   <a href="javescript:">店铺列表</a><em>></em>
		   <span class="crnmb-activ">美店详情</span>
		</div>
	</div>
    <div class="shop-list" data-action="sharePage" data-node="shopTop">
        <div class="list-name clearfix">
            <div class="img"><img onerror="imgError(this)" src="<{$shop['icon']|getResizeImg=###,120,120}>" alt="<{$shop['name']}>"></div>
            <h1><{$shop['name']}>
                <!--美店为vshopType=1不显示店铺等级及评分-->
                <if condition="$vshop_type_num eq 2" >
                    <eq name="level.medal" value="gold" >
                        <for start="0" end="$level.medalNum" >
                            <span class="vip3"></span>
                        </for>
                    </eq>
                    <eq name="level.medal" value="silver" >
                        <for start="0" end="$level.medalNum" >
                            <span class="vip2"></span>
                        </for>
                    </eq>
                    <eq name="level.medal" value="copper" >
                        <for start="0" end="$level.medalNum" >
                            <span class="vip1"></span>
                        </for>
                    </eq>
                </if>
            </h1>
            <p class="line2"><{$shop['description']}></p>
            <div class="clearfix">
                <div class="shop-score">
                    <if condition="$vshop_type_num eq 2" >
                        商品描述：<span><{$shop['shopLevel']['describeGrade']|default="0.0"}></span>
                        卖家服务：<span><{$shop['shopLevel']['serviceGrade']|default="0.0"}></span>
                        物流服务：<span><{$shop['shopLevel']['expressGrade']|default="0.0"}></span>
                    </if>
                    <div class="fl">手机逛美店<em class="icon-down"></em>
                        <div class="down-ma">
                            <div class="sanjiao"></div><img src="<{$shopQrCode}>" width="150">
                            <p>扫一扫，手机逛美店</p>
                        </div>
                    </div>
                </div>
                <eq name="shop.status" value="0">
                    <p class="function-icon clearfix">
                        <a href="javascript:;" class="clearfix">
                            <a href="javascript:;" class="clearfix" data-action="love" data-type="0" data-praise="<?php if($shop['like']['isLike']){echo 0;}else{echo 1;}?>" data-id="<{$shopId}>">
                    <em class="icon icon-like <if condition="$shop['like']['isLike']">active</if>"></em>
                    <span data-node="loveNum"><{$shop.like.userQuantity|default="0"}></span>
                    </a>
                    <a href="javascript:;" class="clearfix" data-collect="<if condition="$shop['isCollection']['result']"> collect </if>"  data-action="collect">
                        <em class="icon icon-save <if condition="$shop['isCollection']['result']"> active </if>"></em>
                        <span data-node="collectNum"><{$shop['shopCollectionQuantity']['quantity']|default="0"}></span>
                    </a>
                    <a href="javascript:;" class="clearfix"  data-action="shareto" data-surl="<{$current_url|base64_decode}>" data-stitle="<{$shop['name']}>" data-spic="<{$shop['icon']}>">
                        <em class="icon icon-share active"></em></a>
                    </p>
                </eq>
            </div>
    </div>
</div>

<p data-node="shareBtnBox" class="share-down"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" class="icon icon-weixin">&#xe937;</em><em data-shareto="qq" class="icon icon-qq">&#xe900;</em><em data-shareto="sina" class="icon icon-sina">&#xe935;</em><em data-shareto="qzone" class="icon icon-kongjian">&#xe902;</em></span></span></p>
