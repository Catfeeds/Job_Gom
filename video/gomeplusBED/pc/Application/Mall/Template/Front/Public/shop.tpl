<?php
    $csspath = ($type == 3) ? 'speakPreview.css' : 'shop-detail.css' ;
    $jspath = '/js/conf/shopInfo.js';
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
        <div class="list-name clearfix" <notempty name="shop.vshopBgimageUrlPc">style="background:url(<{$shop.vshopBgimageUrlPc|getResizeImg=###,1000, 200}>) 0 0 no-repeat;background-size: cover;"<else />style="background:url(<{$pcimgpath}>/images/meidian/bg-big<{$shop.backgroundIndex}>.png) 0 0 no-repeat;background-size: cover;"</notempty>  >
            <div class="img">
                <img class="shop-avatar" onerror="imgError(this)" src="<{$shop['icon']|getResizeImg=###,120, 120}>" alt="<{$shop['name']}>"/>
                <notempty name="shop.isStaff">
                <img class="shop-staff" src="<{$pcimgpath}>/images/meidian/shop-waiter.png"/>
                </notempty>
            </div>
            <h1><{$shop['name']}>
                <if condition="($shop['mshopLevel']['score'] egt 0) AND ($shop['mshopLevel']['score'] lt 50)">
                    <img src="<{$pcimgpath}>/images/user/level/level1.png">
                <elseif condition="($shop['mshopLevel']['score'] egt 50) AND ($shop['mshopLevel']['score'] lt 200)"/>
                    <img src="<{$pcimgpath}>/images/user/level/level2.png">
                <elseif condition="($shop['mshopLevel']['score'] egt 200) AND ($shop['mshopLevel']['score'] lt 900)"/>
                    <img src="<{$pcimgpath}>/images/user/level/level3.png">
                <elseif condition="($shop['mshopLevel']['score'] egt 900) AND ($shop['mshopLevel']['score'] lt 1800)"/>
                    <img src="<{$pcimgpath}>/images/user/level/level4.png">
                <elseif condition="($shop['mshopLevel']['score'] egt 1800) AND ($shop['mshopLevel']['score'] lt 3600)"/>
                    <img src="<{$pcimgpath}>/images/user/level/level5.png">
                <elseif condition="($shop['mshopLevel']['score'] egt 3600) AND ($shop['mshopLevel']['score'] lt 5400)"/>
                    <img src="<{$pcimgpath}>/images/user/level/level6.png">
                <elseif condition="($shop['mshopLevel']['score'] egt 5400) AND ($shop['mshopLevel']['score'] lt 7200)"/>
                    <img src="<{$pcimgpath}>/images/user/level/level7.png">
                <elseif condition="($shop['mshopLevel']['score'] egt 7200) AND ($shop['mshopLevel']['score'] lt 9000)"/>
                    <img src="<{$pcimgpath}>/images/user/level/level8.png">
                <elseif condition="($shop['mshopLevel']['score'] egt 9000) AND ($shop['mshopLevel']['score'] lt 11800)"/>
                    <img src="<{$pcimgpath}>/images/user/level/level9.png">
                <elseif condition="$shop['mshopLevel']['score'] egt 10800"/>
                    <img src="<{$pcimgpath}>/images/user/level/level10.png">
                </if>
            </h1>
            <div class="md-des">
                <p class="line2">
                    <notempty name="shop.description">
                        <{$shop['description']}>
                    <else />
                        欢迎光临本店，祝您购物愉快。
                    </notempty>
                </p>
            </div>
            <div class="clearfix shop-bottom">
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
    <a bp-data='{"event_id": "B000P018", "shop_id": "<{$shopId}>"}' href="<{$meidian_domain}>shop-<{$shopId}>-3.html" <if condition="$type eq 3" >class="active" </if> >美店说</a>
    <div class="fr" data-node="searchBox">
        <input data-node="searchInput" type="text" value="<notempty name="shopWord"><{$shopWord}></notempty>" class="search-val" placeholder="搜索本店商品">
        <input data-node="searchBtn" type="button" value="搜索" class="search-btn">
    </div>
</div>
</div>
</div>
<p data-node="shareBtnBox" class="share-down"><span class="share-box"><span class="icon icon-up-arrow"></span><u>分享给好友</u><span class="icon-box"><em data-shareto="weixin" href="javascript:;" class="icon-weixin"></em><em data-shareto="qq" href="javascript:;" class="icon-qq"></em><em data-shareto="sina" href="javascript:;" class="icon-sina"></em><em data-shareto="qzone" href="javascript:;" class="icon-qzone"></em></span></span></p>
