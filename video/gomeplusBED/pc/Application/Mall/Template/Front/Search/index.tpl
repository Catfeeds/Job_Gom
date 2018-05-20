<?php
    $csspath = 'goods-list.css';
    $jspath = '/js/conf/normal.js';
?>
<include file="Home@Front/Public/header" />
<script>

window._page_name_ = '<?php echo $bpData['pagename'];?>';
window._page_id_ = '<?php echo $bpData['pageid'];?>';
</script>
<div class="wrap-box">
    <div class="totop" data-node="top" style="display:none"><a href="javascript:;"><em class="icon iconn-1"></em><span>返回顶部</span></a></div>
    <div class="shop-title clearfix">
        <div class="crumbs-box"><{$search_index|urldecode}></div>
		<notempty name="showSpellcheck">
		<div class="search-warning" data-node='search-warning'>为您显示“<span><{$search_data['spellcheck']['suggestWord']}></span>”相关商品，仍然搜索“<a href="<{$search_data['spellcheck']['originWordUrl']}>"><span><{$search_data['spellcheck']['originWord']}></span></a>”<em class="iconn-7" data-node='warning-icon'></em></div>
        </notempty>
		<div class="sort">
            <a href="<{$order_url.0}>" <?php if($search_params['sort']==0){echo 'class="active"';} ?>>综合</a>
            <a href="<{$order_url.1}>" <?php if($search_params['sort']==1){echo 'class="active"';} ?>>销量</a>
            <a href="<{$order_url.2}>" <?php if($search_params['sort']==2){echo 'class="active"';} ?>>价格<span <?php if($search_params['sort']==2 && $search_params['order']==0){echo 'class="asce"';}if($search_params['sort']==2 && $search_params['order']==1){echo 'class="desc"';}?> ><em class="icon-sort-asce"></em><em class="icon-sort-desc"></em></span></a>
            <a href="<{$order_url.3}>" <?php if($search_params['sort']==3){echo 'class="active"';} ?>>新品</a>
        </div>
    </div>
    <div class="shop-list">
        <ul class="clearfix">
            <volist name="search_data.list" id="vo">
            <li>
            <a target="_blank" href="<{$vo.id|productDetailUrlGen=$vo['shopId'],###,$sourceCode}>" bp-data='{"event_id": "G000P006", "s_word": "<{$selectWords.keyword}>", "product_id": "<{$vo.id}>", "shop_id": "<{$vo['shopId']}>", "s_type": "product"}'>
            	<?php if( isset($vo['promotionMarks']['itemProspectiveRebateAmount']) && $vo['promotionMarks']['itemProspectiveRebateAmount'] > 0 ):?>
            	<em class="icon-fan">返</em>
            	<?php elseif( isset($vo['discount']) && $vo['discount'] > 0) :?>
            	<em class="icon-fan icon-jiang">降</em>
            	<?php endif;?>
            	<img src="<{$vo.mainImage|getResizeImg=###,230,230}>" onerror="imgError(this, 'l')">
                <div class="text">￥<span><{$vo.salePrice|convert_price=###}></span>
                    <p title="<{$vo.name}>"><{$vo.name}></p>
                </div>
            </a>
            </li>
            </volist>
        </ul>
    </div>
    <div class="page"><{$link_url}></div>
</div>
<include file="Home@Front/Public/footer" />