<?php
    $csspath = 'shop-detail.css';
    $jspath = '/js/conf/shopInfo.js';
    //var_dump($praise_num);exit;
?>
<include file="Home@Front/Public/header" xmlns="http://www.w3.org/1999/html"/>
<script>
    $GLOBAL_CONFIG['shopId'] = '<{$shopId}>';
    $GLOBAL_CONFIG['type'] = '<{$type}>';
    $GLOBAL_CONFIG['word'] = '<?php echo ( isset($shopWord) ) ? $shopWord : '' ;?>';
    $GLOBAL_CONFIG['isSearch'] = '<?php echo ( isset($isSearch) ) ? $isSearch : '' ;?>';
    $GLOBAL_CONFIG['weixin_share']='<{$weixin_share}>';
</script>
<div class="wrap-box">
    <include file="Public:tool" />
    <div class="shop-title clearfix">
        <div class="crumbs-box"><{$shop_crumbs}></div>
    </div>
    <div class="shop-list" data-action="sharePage" data-node="shopTop">
        <div class="list-name clearfix">
            <div class="img"><img onerror="imgError(this)" src="<{$shop['icon']|getResizeImg=###,120, 120}>" alt="<{$shop['name']}>"></div>
            <h1><{$shop['name']}></h1>
            <p class="line2"><{$shop['description']|default=''}></p>
            <div class="clearfix">
                <div class="shop-score">
                    <div class="fl">
                        <em class="icon-phone"></em>
                        <span>手机逛美店</span>
                        <em class="icon-down"></em>
                        <div class="down-ma">
                            <div class="sanjiao"></div><img src="<{$shopQrCode}>" width="150">
                            <p>扫一扫，手机逛美店</p>
                        </div>
                    </div>
                </div>
                <eq name="shop.status" value="0">
				<p class="function-icon clearfix">
					<a href="javascript:;" class="clearfix <if condition="$shop['like']['isLike']">active</if>" data-action="love" data-type="0" data-praise="<?php if($shop['like']['isLike']){echo 0;}else{echo 1;}?>" data-id="<{$shopId}>">
						<em class="icon-like"></em>
						<span data-node="loveNum"><{$shop.like.userQuantity|default="0"}></span>
					</a>
					<a href="javascript:;" class="clearfix <if condition="$shop['isCollection']['result']"> active </if>" data-collect="<if condition="$shop['isCollection']['result']"> collect </if>"  data-action="collect">
						<em class="icon-save"></em>
						<span data-node="collectNum"><{$shop['shopCollectionQuantity']['quantity']|default="0"}></span>
					</a>
					<a href="javascript:;" class="clearfix  active"  data-action="shareto" data-surl="<{$current_url|base64_decode}>" data-stitle="<{$shop['name']}>" data-spic="<{$shop['icon']}>">
						<em class="icon-share"></em>
					</a>
				</p>
                </eq>
            </div>
    </div>
</div>
<div data-node="fixMenu">
<div class="wrap-box">
<div class="detail-menu" data-node="detail-menu">
    <a bp-data='{"event_id": "B000P016", "shop_id": "<{$shopId}>"}' href="<{$meidian_domain}>shop-<{$shopId}>-1.html" <if condition="$type eq 1" >class="active" </if> >全部商品</a>
    <a bp-data='{"event_id": "B000P017", "shop_id": "<{$shopId}>"}' href="<{$meidian_domain}>shop-<{$shopId}>-2.html" <if condition="$type eq 2" >class="active" </if> >上新商品</a>
    <div class="fr" data-node="searchBox">
        <input data-node="searchInput" type="text" value="<notempty name="shopWord"><{$shopWord}></notempty>" class="search-val">
        <input data-node="searchBtn" type="button" value="搜索" class="search-btn">
    </div>
</div>
</div>
</div>
<p data-node="shareBtnBox" class="share-down"><span class="share-box"><span class="icon icon-up-arrow"></span><u>分享给好友</u><span class="icon-box"><em data-shareto="weixin" href="javascript:;" class="icon-weixin"></em><em data-shareto="qq" href="javascript:;" class="icon-qq"></em><em data-shareto="sina" href="javascript:;" class="icon-sina"></em><em data-shareto="qzone" href="javascript:;" class="icon-qzone"></em></span></span></p>
