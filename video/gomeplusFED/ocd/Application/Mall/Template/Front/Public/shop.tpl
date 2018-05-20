<?php
    $csspath = 'shop/shop-detail.css';
    $jspath = '/js/conf/shopInfo.js';
    //var_dump($praise_num);exit;
?>
<include file="Home@Front/Public/header" xmlns="http://www.w3.org/1999/html"/>
<script>
    $GLOBAL_CONFIG['shopId'] = '<{$shopId}>';
    $GLOBAL_CONFIG['type'] = '<{$type}>';
    $GLOBAL_CONFIG['weixin_share']='<{$wap_url}>shop-<{$shopId}>.html';
</script>
<div class="wrap-box">
    <include file="Public:tool" />
    <div class="shop-title clearfix">
        <div class="crumbs-box"><{$shop_crumbs}></div>
    </div>
    <div class="shop-list" data-action="sharePage" data-node="shopTop">
        <div class="list-name clearfix">
            <div class="img"><img src="<{$shop['vshopTx']|getResizeImg=###,120,120}>" alt="<{$shop['vshopName']}>"></div>
            <h1><{$shop['vshopName']}>
                <!--美店为vshopType=1不显示店铺等级及评分-->
                <if condition="$shop['vshopType'] eq 2" >
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
            <p class="line2"><{$shop['vshopAdvert']}></p>
            <div class="clearfix">
                <if condition="$shop['vshopType'] eq 2" >
                <p class="shop-score">
                    商品描述：<span><{$shop['describeGrade']|default="0.0"}></span>
                    卖家服务：<span><{$shop['serviceGrade']|default="0.0"}></span>
                    物流服务：<span><{$shop['expressGrade']|default="0.0"}></span>
                </p>
                </if>
                <eq name="shop.status" value="0">
                    <p class="function-icon clearfix">
                        <a href="javascript:;" class="clearfix">
                            <a href="javascript:;" class="clearfix" data-action="love" data-type="0" data-praise="<?php if($praise['isLike']){echo 0;}else{echo 1;}?>" data-id="<{$shopId}>">
                    <em class="icon icon-like <if condition="$praise['isLike']">active</if>"></em>
                    <span data-node="loveNum"><{$praise.userQuantity|default="0"}></span>
                    </a>
                    <a href="javascript:;" class="clearfix" data-collect="<if condition="$shop['vshopCollect']"> collect </if>"  data-action="collect">
                        <em class="icon icon-save <if condition="$shop['vshopCollect']"> active </if>"></em>
                        <span data-node="collectNum"><{$shop['vshopCollectedNum']|default="0"}></span>
                    </a>
                    <a href="javascript:;" class="clearfix"  data-action="shareto" data-surl="<{$current_url|base64_decode}>" data-stitle="<{$shop['vshopName']}>" data-spic="<{$shop['vshopTx']}>">
                        <em class="icon icon-share active"></em></a>
                    </p>
                </eq>
            </div>
    </div>
</div>
<div class="detail-menu">
    <!--店铺商品分类-->
    <if condition="$shop['vshopType'] eq 2" >
    <div class="fl <if condition="$type eq 6" >active</if>">
        <a href="javascript:;" data-action="shopSelector" <if condition="$type eq 6" >class="active" </if> >本店所有商品<em class="icon icon-up">&#xea55;</em><em class="icon icon-down">&#xea57;</em></a>
        <div class="open-list" data-node="shopSelectList">
            <volist name="category" id='ca'>
            <a  <eq name="category_id" value="$ca['id']">class="active"</eq> href="<{$ca.url}>"><{$ca.name|htmlspecialchars}></a>
            </volist>
        </div>
    </div>
    </if>
    <eq name="shop.vshopType" value="2"><a href="<{$mall_domain}>shop/<{$shopId}>.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" <if condition="$type eq 0" >class="active" </if> >店铺首页</a></eq>
    <a bp-data='{"event_id": "B000P016", "shop_id": "<{$shopId}>"}' href="<{$mall_domain}>shop-<{$shopId}>-1.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" <if condition="$type eq 1" >class="active" </if> >全部商品</a>
    <a bp-data='{"event_id": "B000P017", "shop_id": "<{$shopId}>"}' href="<{$mall_domain}>shop-<{$shopId}>-2.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" <if condition="$type eq 2" >class="active" </if> >上新商品</a>
    <eq name="shop.vshopType" value="2"><a bp-data='{"event_id": "B000P018", "shop_id": "<{$shopId}>"}' href="<{$mall_domain}>shop-<{$shopId}>-3.html<neq name="sourceCode" value="0">?source=<{$sourceCode}></neq>" <if condition="$type eq 3" >class="active" </if> >店铺特惠</a></eq>
</div>
<p data-node="shareBtnBox" class="share-down"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" class="icon icon-weixin">&#xe937;</em><em data-shareto="qq" class="icon icon-qq">&#xe900;</em><em data-shareto="sina" class="icon icon-sina">&#xe935;</em><em data-shareto="qzone" class="icon icon-kongjian">&#xe902;</em></span></span></p>