<?php
    $csspath = 'index/index.css';
    $jspath = '/js/conf/index.js';
?>
<include file="Public:header" />
<script type="text/javascript">	
	$GLOBAL_CONFIG['topAd']=<{$focus_ad_ids|json_encode}>;
	$GLOBAL_CONFIG['ggAd']=<{$guang_ad_ids|json_encode}>;
</script>
<script src="<{$adflight_url}>" ></script>
<script src="<{$admain_url}>" ></script>
    <div class="banner" >
      <ul data-node="banner">
		<foreach name="list.banner" item="item_banner" key="key">
		<!--话题-->
		<if condition="$item_banner.type eq 1">
		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|topicDetailUrlGen}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": "<{$key}>", "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		<!--圈子-->
		<elseif condition="$item_banner.type eq 2"/>
		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|groupDetailUrlGen}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		<!--商品-->
		<elseif condition="$item_banner.type eq 3"/>
		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$item_banner['shop_id'],###}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		<!--店铺--> 
		<elseif condition="$item_banner.type eq 4" />
		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		<!--pc Url--> 
		<elseif condition="$item_banner.type eq 5" />
		<li><a target="_blank" href="<{$item_banner.pc_url}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.pc_url}>", "banner_eq": <{$key}>, "banner_type": "href", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		</if>
		</foreach>
      </ul>
    </div>



    <div class="wrap-box">
      <div class="index-popular">
        <div class="index-title clearfix" >
          <h2 class="mx-recommend">美信推荐<span>Popular recommendation</span></h2>
        </div>
        <div class="index-popular-list"  data-action="shareBlock">
          <ul class="clearfix">
			<volist name="list.commend" id="item_recom" key="k">
            <li data-node="shareItem" data-id="<{$item_recom.tid}>" data-type="1" data-praise="false" data-count="<{$item_recom.voteNum}>">
              <div class="mg-negative">
	              <div class="img"><a target="_blank" href="<{$item_recom['tid'],C('sourceCode')['social_home_index_recommend']|topicDetailUrlGen}>" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>"}'><img src="<{$item_recom.origin_img_url}>"alt="<{$item_recom.name}>"></a></div>
	              <div class="img-box">
	              	  <volist name="item_recom.goods_ids" id="item_recom_list" key="list_key" offset="0" length='3'>
					  <if condition="$item_recom_list.type eq 'video' ">
		              	  <a target="_blank" href="<{$item_recom['tid'],C('sourceCode')['social_home_index_recommend']|topicDetailUrlGen}>#topicvideo" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>", "position": "video<{$list_key}>"}'>
						  <img src="<{$item_recom_list.coverImage|getResizeImg=###,120,85}>" alt="<{$item_recom_list.name}>">
						  <p class="hover"><em class="icon-play"></em></p>
						  </a>
					  <else />
						  <a target="_blank" href="<{$item_recom_list['productId'],C('sourceCode')['social_home_index_recommend']|productDetailUrlGen=$item_recom_list['shopId'],###}>" bp-data='{"event_id":"G000P001",  "product_id":"<{$item_recom_list['productId']}>", "shop_id": "<{$item_recom_list['shopId']}>", "section": "<{$k}>", "position": "product<{$list_key}>"}'>
						  <img src="<{$item_recom_list.mainImage|getResizeImg=###,120,85}>" alt="<{$item_recom_list.name}>">
						  <p class="hover">￥<span><{$item_recom_list.price}></span></p>
						  </a>
					  </if>
	                  </volist>
	              </div>
	              <div class="text"><span class="tag"><{$item_recom.category_name}></span><a target="_blank" href="<{$item_recom['tid'],C('sourceCode')['social_home_index_recommend']|topicDetailUrlGen}>" class="list-title" data-node="shareUrl" title="<{$item_recom.name}>" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>"}'><{$item_recom.short_name}></a>
	                <p class="gray"><{$item_recom.description}></p>
	                <div class="text-icon">
	                	<a  href="javascript:;" class="icon-collect"><em class="icon icon-collection">&#xeac9;</em><{$item_recom.voteNum}></a>
	                	<a href="javascript:;" class="a-share"><em class="icon icon-share">&#xeaca;</em><span><{$item_recom.replyQuantity}></span></a>
	                </div>
	              </div>
              </div>
            </li>
            </volist>
          </ul>
        </div>
      </div>
      <div class="index-circle">
        <div class="index-title clearfix">
          <h2 class="circle-topic">圈子话题<span>Circle topic</span></h2><a target="_blank" href="<{$group_domain}>topic/publiser" bp-data='{"event_id": "B000P006"}' data-node="publishTopic">发布话题</a>
        </div>
        <div class="index-circle-list" data-action="shareBlock">
          <ul class="clearfix">
            <notempty>
          	<foreach name="list.topics" item="topic" key="key">
            <li data-id="<{$topic.tid}>" data-node="shareItem">
	            <div class="mg-negative">
	            	  <div class="topic-tag"><a target="_blank" href="<{$topic.group_id|groupDetailUrlGen}>"><em class="icon-lysy"><img onerror="imgError(this, 'g')" src="<notempty name="topic.group_icon"><{$topic.group_icon|getResizeImg=###,80,80}><else /><{$pccsspath}>/images/public/down-logo.png</notempty>"></em><{$topic.group_name}></a></div>
		              <div class="img"><a target="_blank" href="<{$topic.tid|topicDetailUrlGen}>" bp-data='{"event_id":"G000P002", "url": "<{$topic.tid|topicDetailUrlGen}>", "topic_id": "<{$topic.tid}>", "group_id": "<{$topic.group_id}>", "position": "<{$key+1}>"}'><img src="<{$topic.origin_img_url}>" alt="<{$topic.name}>"></a></div>
		              <div class="text"><a target="_blank" href="<{$topic.tid|topicDetailUrlGen}>" data-node="shareUrl" class="list-title"><{$topic.name}></a>
		                <div class="text-icon">
		                	<a  href="javascript:;" class="icon-collect"><em class="icon icon-collection">&#xeac9;</em><{$topic.voteNum}></a>
		                	<a href="javascript:;" class="a-share"><em class="icon icon-share">&#xeaca;</em><span><{$topic.replyQuantity}></span></a>
		                </div>
		              </div>
	             </div>
            </li>
           </foreach>
           </notempty>
          </ul>
        </div>
      </div>
	  
	  <div class="index-shop">
        <div class="index-title clearfix">
          <h2 class="gg-goods">逛逛商品<span>Go shopping</span></h2><a target="_blank" href="<{$mall_domain}>search/index" bp-data='{"event_id": "B000P007"}'>更多商品</a>
        </div>
        <div class="index-shop-list">
          <table>
            <tr>
              <td rowspan="2">
			  <?php if(isset($list['goods']['goods']['0']) && $list['goods']['goods']['0']['select_type'] ==1 ):?>
                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][0]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][0]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][0]['tid']}>" ' href="<{$list['goods']['goods'][0]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][0]['shop_id'],###}>"><img src="<{$list['goods']['goods'][0]['origin_img_url']}>" width="300" height="420" alt="<{$list['goods']['goods'][0]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods']['0']) && $list['goods']['goods'][0]['select_type'] == 2):?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][0]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][0]['shop_id']}>" ' href="<{$list['goods']['goods'][0]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$list['goods']['goods'][0]['origin_img_url']}>" width="300" height="420" alt="<{$list['goods']['goods'][0]['name']}>"></a>
			  <?php else:?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][0]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "文字链", "value": "<{$list['goods']['goods']['0']['url']}>" ' href="<{$list['goods']['goods']['0']['url']}>"><img src="<{$list['goods']['goods'][0]['origin_img_url']}>" width="300" height="420"></a>
			  <?php endif;?>
			 
			  </td>
              <td rowspan="2">
                <div class="banner banner-s">
					<ul data-node="indexSmall">
						<?php foreach($list['goods']['banner'] as $ber):?>
						<?php if($ber['select_type'] ==1 ):?>
						<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=productDetailUrlGen($ber['shop_id'],$ber['tid'],C('sourceCode')['operative_home_index_focus']);?>", "type": "banner", "value": "<?=$ber['tid']?>" ' href="<?=productDetailUrlGen($ber['shop_id'],$ber['tid'],C('sourceCode')['operative_home_index_focus']);?>"><img src="<?=$ber['origin_img_url']?>" width="437" height="220" alt="<?=$ber['name']?>"></a></li>
						<?php elseif($ber['select_type'] == 2):?>
						<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=shopDetailUrlGen($ber['shop_id'],C('sourceCode')['operative_home_index_focus']);?>", "type": "banner", "value": "<?=$ber['shop_id']?>" ' href="<?=shopDetailUrlGen($ber['shop_id'],C('sourceCode')['operative_home_index_focus']);?>"><img src="<?=$ber['origin_img_url']?>" width="437" height="220" alt="<?=$ber['name']?>"></a></li>
						<?php elseif($ber['select_type'] == 3):?>
						<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=$ber['origin_img_url']?>", "type": "banner", "value": "<?=$ber['origin_img_url']?>" ' href="<?=$ber['url']?>"><img src="<?=$ber['origin_img_url']?>" width="437" height="220"></a></li>
						<?php endif;?>
						<?php endforeach;?>
					</ul>
                </div>
              </td>
              <td>
			  <?php if(isset($list['goods']['goods']['2']) && $list['goods']['goods']['2']['select_type'] ==1 ):?>
                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][2]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][2]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][2]['tid']}>" ' href="<{$list['goods']['goods'][2]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][2]['shop_id'],###}>"><img src="<{$list['goods']['goods'][2]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][2]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods']['2']) && $list['goods']['goods'][2]['select_type'] == 2):?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][2]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][2]['shop_id']}>" ' href="<{$list['goods']['goods'][2]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$list['goods']['goods'][2]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][2]['name']}>"></a>
			  <?php else:?>
					 <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['2']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['2']['url']}>" ' href="<{$list['goods']['goods']['2']['url']}>"><img src="<{$list['goods']['goods'][2]['origin_img_url']}>" width="230" height="210"></a>
			  <?php endif;?>
			  </td>
              <td>
			  <?php if(isset($list['goods']['goods']['3']) && $list['goods']['goods'][3]['select_type'] ==1 ):?>
                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][3]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][3]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][3]['tid']}>" ' href="<{$list['goods']['goods'][3]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][3]['shop_id'],###}>"><img src="<{$list['goods']['goods'][3]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][3]['name']}>"></a>
			  <?php elseif( isset($list['goods']['goods']['3']) && $list['goods']['goods'][3]['select_type'] == 2):?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][3]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][3]['shop_id']}>"'   href="<{$list['goods']['goods']['3']['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$list['goods']['goods'][3]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][3]['name']}>"></a>
			  <?php else:?>
					 <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['3']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['3']['url']}>" ' href="<{$list['goods']['goods']['3']['url']}>"><img src="<{$list['goods']['goods'][3]['origin_img_url']}>" width="230" height="210"></a>
			  <?php endif;?>
			  </td>
            </tr>
            <tr>
              <td>
			  <?php if(isset($list['goods']['goods']['4']) && $list['goods']['goods'][4]['select_type'] ==1 ):?>
                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][4]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][4]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][4]['tid']}>" ' href="<{$list['goods']['goods'][4]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][4]['shop_id'],###}>"><img src="<{$list['goods']['goods'][4]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][4]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods']['4']) && $list['goods']['goods'][4]['select_type'] == 2):?>
					 <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][4]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][4]['shop_id']}>"' href="<{$list['goods']['goods'][4]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$list['goods']['goods'][4]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][4]['name']}>"></a>
			  <?php else:?>
					 <a target="_blank"   bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['4']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['4']['url']}>" ' href="<{$list['goods']['goods']['4']['url']}>"><img src="<{$list['goods']['goods'][4]['origin_img_url']}>" width="230" height="210"></a>
			  <?php endif;?>
			  
			  </td>
              <td>
			  <?php if(isset($list['goods']['goods']['5']) && $list['goods']['goods'][5]['select_type'] ==1 ):?>
                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][5]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][5]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][5]['tid']}>" ' href="<{$list['goods']['goods'][5]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][5]['shop_id'],###}>"><img src="<{$list['goods']['goods'][5]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][5]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods']['5']) && $list['goods']['goods'][5]['select_type'] == 2):?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][5]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][5]['shop_id']}>"' href="<{$list['goods']['goods'][5]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$list['goods']['goods'][5]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][5]['name']}>"></a>
			  <?php else:?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['5']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['5']['url']}>"'  href="<{$list['goods']['goods'][5]['url']}>"><img src="<{$list['goods']['goods'][5]['origin_img_url']}>" width="230" height="210"></a>
			  <?php endif;?>
			  </td>
            </tr>
            <tr>
              <td>
                <div class="list-text">
                  <ul class="clearfix">
                  		<?php if( isset($list['goods']['keyword']) ): ?>
						<?php foreach($list['goods']['keyword'] as $kk=> $wd):?>
						<?php if($kk <=9 ):?>
						<?php if($wd['select_type']==1):?>
							<li><a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<?=productDetailUrlGen($wd['shop_id'],$wd['tid'],C('sourceCode')['operative_home_index_focus']);?>", "type": "文字链", "value": "<?=$wd['tid']?>"' href="<?=productDetailUrlGen($wd['shop_id'],$wd['tid'],C('sourceCode')['operative_home_index_focus']);?>" title="<?=$wd['keyword']?>" ><?=$wd['keyword']?></a></li>
						<?php elseif($wd['select_type']==2):?>
							<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=shopDetailUrlGen($wd['shop_id'],C('sourceCode')['operative_home_index_focus']);?>", "type": "文字链", "value": "<?=$wd['shop_id']?>"' href="<?=shopDetailUrlGen($wd['shop_id'],C('sourceCode')['operative_home_index_focus']);?>" title="<?=$wd['keyword']?>" ><?=$wd['keyword']?></a></li>
						<?php else:?>
						<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=$wd['url']?>", "type": "文字链", "value": "<?=$wd['url']?>"' href="<?=$wd['url']?>"  title="<?=$wd['keyword']?>"><?=$wd['keyword']?></a></li>
						<?php endif;?>
						<?php endif;?>
						<?php endforeach;?>
						<?php endif;?>
				  </ul>
                </div>
              </td>
              <td>
			  <?php if( isset($list['goods']['goods'][1]) && $list['goods']['goods'][1]['select_type'] ==1 ):?>
                    <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][1]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][1]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][1]['tid']}>" ' href="<{$list['goods']['goods'][1]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][1]['shop_id'],###}>"><img src="<{$list['goods']['goods'][1]['origin_img_url']}>" width="438" height="210" alt="<{$list['goods']['goods'][1]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods'][1])  && $list['goods']['goods'][1]['select_type'] == 2):?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][1]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][1]['shop_id']}>"' href="<{$list['goods']['goods'][1]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$list['goods']['goods'][1]['origin_img_url']}>" width="438" height="210" alt="<{$list['goods']['goods'][1]['name']}>"></a>
			  <?php else:?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['1']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['1']['url']}>"' href="<{$list['goods']['goods'][1]['url']}>"><img src="<{$list['goods']['goods'][1]['origin_img_url']}>" width="438" height="210"></a>
			  <?php endif;?>
			  
			  
			  </td>
              <td>
			  <?php if(isset($list['goods']['goods'][6])  && $list['goods']['goods'][6]['select_type'] ==1 ):?>
                    <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][6]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][6]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][6]['tid']}>" ' href="<{$list['goods']['goods'][6]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][6]['shop_id'],###}>"><img src="<{$list['goods']['goods'][6]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][6]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods'][6]) && $list['goods']['goods'][6]['select_type'] == 2):?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][6]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][6]['shop_id']}>"'  href="<{$list['goods']['goods'][6]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$list['goods']['goods'][6]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][6]['name']}>"></a>
			  <?php else:?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['6']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['6']['url']}>"' href="<{$list['goods']['goods'][6]['url']}>"><img src="<{$list['goods']['goods'][6]['origin_img_url']}>" width="230" height="210"></a>
			  <?php endif;?>
			  </td>
              <td>
			  <?php if(isset($list['goods']['goods'][7]) && $list['goods']['goods'][7]['select_type'] ==1 ):?>
                    <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][7]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][7]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][7]['tid']}>" ' href="<{$list['goods']['goods'][7]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][7]['shop_id'],###}>"><img src="<{$list['goods']['goods'][7]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][7]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods'][7]) && $list['goods']['goods'][7]['select_type'] == 2):?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][7]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][7]['shop_id']}>"'  href="<{$list['goods']['goods'][7]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$list['goods']['goods'][7]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][7]['name']}>"></a>
			  <?php else:?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['7']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['7']['url']}>"' href="<{$list['goods']['goods'][7]['url']}>"><img src="<{$list['goods']['goods'][7]['origin_img_url']}>" width="230" height="210"></a>
			  <?php endif;?>
			  </td>
            </tr>
          </table>
          
        </div>
      </div>
	  
      <div class="index-interest" data-node="interest">
        <div class="index-title clearfix">
          <h2 class="interest-circle">兴趣圈子<span>Interest circle</span></h2><a href="<{$group_domain}>index" target="_blank" bp-data='{"event_id": "B000P008"}'>更多圈子</a>
        </div>
        <div class="index-interest-list" data-action="shareBlock">
          <ul class="clearfix">
            <foreach name="list.groups" item="group" key="group_key">
            <li <if condition="$group_key lt 1">class="first"</if> data-node="shareItem" >
	            <div class="mg-negative">
	              <div class="img"><a target="_blank" href="<{$group.tid|groupDetailUrlGen}>" bp-data='{"event_id": "G000P004", "group_id": "<{$group.tid}>"}'><img src="<{$group.origin_img_url}>" alt="<{$group.name}>"></a></div>
	              <div class="text"><span class="tag"><{$group.category_name}></span><a target="_blank" href="<{$group.tid|groupDetailUrlGen}>" data-node="shareUrl" title="<{$group.name}>"><{$group.short_name}></a>
	                <div class="text-icon">
	                	<span class="fl"><em>成员：</em><{$group.memberQuantity}></span><span class="fl"><em>话题：</em><{$group.topicQuantity}></span>
	                </div>
	              </div>
	            </div>
            </li>
            </foreach>
          </ul>
        </div>
      </div>
      <div class="index-link">
        <div class="index-title clearfix">
          <h2 class="friend-link">友情链接<span>Friendship link</span></h2>
        </div>
        <div class="index-link-list clearfix">
        <notempty>
        	<volist name="list.friendLinks" id="link" >
        		<a target="_blank" href="<{$link.link}>"><{$link.keyword}></a>
        		<if condition="$i neq $linkSum">
        		<span>|</span>
        		</if>
        	</volist>
        </notempty>
        </div>
      </div>
    </div>

    <include file="Public:footer" />