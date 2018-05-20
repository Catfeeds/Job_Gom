<?php
    $csspath = 'shop-list.css';
	$jspath = '/js/conf/normal.js';
?>
<include file="Home@Front/Public/header" />
<script>
window._page_name_ = '店铺搜索';
window._page_id_ = 'D009';
</script>
<div class="wrap-box">
    <div class="totop" data-node="top" style="display:none"><a href="javascript:;"><em class="icon iconn-1"></em><span>返回顶部</span></a></div>
    <div class="shop-title clearfix">
    </div>
	<volist name="recomArr" id="vo">
    <div class="shop-list">
        <div class="list-name clearfix">
            <a href="<{$shopArr[$vo['shopid']]['shop_url']}>" target="_blank" class="pc-btn pc-btnw120 pc-btnh40">
                进入店铺
            </a>
            <div class="img">
              <a href="<{$shopArr[$vo['shopid']]['shop_url']}>" target="_blank">
                  <img onerror="imgError(this, 'm')" src="<{$shopArr[$vo['shopid']]['icon']|default=''|handleUrl=###}>">
              </a>
            </div>
            <h2>
		        <a target="_blank" href="<{$shopArr[$vo['shopid']]['shop_url']}>"><{$shopArr[$vo['shopid']]['name']}></a>
		    </h2>
        </div>

		<ul class="clearfix">
			<volist name="vo.lst" id="items">
			<li>
				<a href="<{$items['purl']}>" target="_blank" title="<{$items['pn']}>">

					<img src="<{$items['iurl']}>" alt="<{$items['pn']}>" onerror="imgError(this, 'm')">
					<div class="text">￥<span><{$items['price']}></span>
					<p title="<{$items['pn']}>"><{$items['pn']}></p>
					</div>
				</a>
			</li>
           </volist>
        </ul>
      </div>
      </volist>

      <div class="page"  modelid="<?php echo $modelPub['ggfy']?>" ><{$link_url}></div>
</div>
<include file="Home@Front/Public/footer" />
