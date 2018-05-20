<?php
    $csspath = 'shop-detail.css';
    $jspath = '/js/conf/shopInfo.js';
    //var_dump($praise_num);exit;
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
    $GLOBAL_CONFIG['shop_icon']='<{$shop['icon']|getResizeImg=###,160,0}>';
    $GLOBAL_CONFIG['shop_name']='<{$shop['name']}>';
</script>
<div class="wrap-box">
    <include file="Public:tool" />
    <div class="shop-title clearfix">
        <div class="crumbs-box"><{$shop_crumbs}></div>
    </div>
    <div class="shop-list" data-action="sharePage" data-node="shopTop">
        <div class="list-name clearfix">
            <div class="img"><img onerror="imgError(this)" src="<{$shop['icon']|getResizeImg=###,120,120}>" alt="<{$shop['name']}>"></div>

            <h1><{$shop['name']}>
                <!--美店为vshopType=1不显示店铺等级及评分-->
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
            </h1>
            <p class="line2"><{$shop['description']}></p>
            <div class="clearfix">
                <div class="shop-score">
                        商品描述：<span><{$shop['shopLevel']['describeGrade']|default="0.0"}></span>
                        卖家服务：<span><{$shop['shopLevel']['serviceGrade']|default="0.0"}></span>
                        物流服务：<span><{$shop['shopLevel']['expressGrade']|default="0.0"}></span>
						营业执照：<span><a href="<{$mall_domain}>shop/lookpaper?shopId=<{$shopId}>"><img src="<{$pcimgpath}>/images/shop/icon-zhao.png"></a></span>

                    <div class="fl">手机逛店铺<em class="icon-down"></em>
                        <div class="down-ma">
                            <div class="sanjiao"></div><img src="<{$shopQrCode}>" width="150">
                            <p>扫一扫，手机逛店铺</p>
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
    <!--店铺商品分类-->
    <div class="fl <if condition="$type eq 6" >active</if>">
        <a href="javascript:;" data-action="shopSelector" <if condition="$type eq 6" >class="active" </if> >本店所有商品<em class="iconn-1"></em><em class="icon-down"></em></a>
        <div class="open-list" data-node="shopSelectList">
            <volist name="category" id='ca'>
            <a  <eq name="category_id" value="$ca['id']">class="active"</eq> href="<{$ca.url}>"><{$ca.name}></a>
            </volist>
        </div>
    </div>
    <a href="<{$mall_domain}>shop/<{$shopId}>.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" <if condition="$type eq 0" >class="active" </if> >店铺首页</a>
    <a bp-data='{"event_id": "B000P016", "shop_id": "<{$shopId}>"}' href="<{$mall_domain}>shop-<{$shopId}>-1.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" <if condition="$type eq 1" >class="active" </if> >全部商品</a>
    <a bp-data='{"event_id": "B000P017", "shop_id": "<{$shopId}>"}' href="<{$mall_domain}>shop-<{$shopId}>-2.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" <if condition="$type eq 2" >class="active" </if> >上新商品</a>
    <a bp-data='{"event_id": "", "shop_id": "<{$shopId}>"}' href="<{$mall_domain}>shop-<{$shopId}>-7.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" <if condition="$type eq 7" >class="active" </if> >热销商品</a>
    <div class="fr" data-node="searchBox">
        <input data-node="searchInput" type="text" value="<notempty name="shopWord"><{$shopWord}></notempty>" class="search-val">
        <input data-node="searchBtn" type="button" value="搜索" class="search-btn">
    </div>
</div>
</div>
</div>
<p data-node="shareBtnBox" class="share-down"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" href="javascript:;" class="icon-weixin"></em><em data-shareto="qq" href="javascript:;" class="icon-qq"></em><em data-shareto="sina" href="javascript:;" class="icon-sina"></em><em data-shareto="qzone" href="javascript:;" class="icon-qzone"></em></span></span></p>
