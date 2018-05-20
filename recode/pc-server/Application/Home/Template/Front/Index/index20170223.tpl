<?php
    $csspath = 'index.css';
    $jspath = '/js/conf/index.js';
?>
<include file="Public:header" />
<script type="text/javascript">	
	$GLOBAL_CONFIG['topAd']=<{$focus_ad_ids|json_encode}>;
	$GLOBAL_CONFIG['ggAd']=<{$guang_ad_ids|json_encode}>;
	$GLOBAL_CONFIG['hbdxm']='<{$modelPage['hbdxm']}>';

</script>
<script src="<{$adflight_url}>" crossorigin></script>
<script src="<{$admain_url}>" crossorigin></script>
    <div class="banner" modelid="<?php echo $modelPage['hbanner']?>" >
      <ul data-node="banner">
		<foreach name="list.banners" item="item_banner" key="key">
		<!--店铺--> 
		<if condition="$item_banner.type eq 1">
		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		
		<!--pc Url-->
		<elseif condition="$item_banner.type eq 2"/>
		<li><a target="_blank" href="<{$item_banner.pc_url}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.pc_url}>", "banner_eq": <{$key}>, "banner_type": "href", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		
		<!--话题-->
		<elseif condition="$item_banner.type eq 7" />
		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|topicDetailUrlGen}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": "<{$key}>", "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
 		
 		<!--圈子-->
		<elseif condition="$item_banner.type eq 8" />
		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|groupDetailUrlGen}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		
		<!--商品-->
		<else />
		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$item_banner['shop_id'],###}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		</if>
		</foreach>
      </ul>
    </div>
	<div class="wrap-box">
	  <div class="index-popular">
	    <div class="index-title clearfix">
	      <h2 class="hot-topic">热门话题<span>Hot Topic</span></h2>
	    </div>
	    <div class="hot-topic-list" modelid="<?php echo $modelPage['hrmht']?>" >
	    	<foreach name="list.hotTopic" item="item_hot" key="key">
		    <a href="<{$item_hot['id'],C('sourceCode')['operative_home_index_focus']|topicDetailUrlGen}><{$item_hot.}>" title="<{$item_hot.dataTitle}>" target="_blank"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$item_hot.dataPic}>"></a>
		    </foreach>
	    </div>
	    <div class="index-title clearfix">
	      <h2 class="joinus">加入圈子<span>Join Us</span></h2>
	    </div>
	    <ul class="joinus" >
		  <?php $m=1;?>
	      <?php foreach($list['groupsJ'] as $item_join){ ?>
			  <?php if( !empty($myGroupData) &&  in_array($item_join['group_id'],$myGroupData)  ){ ?>
				  <li  modelid="<?php echo $modelPage['hjrqz'].str_pad($m,4,'0',STR_PAD_LEFT); ?>" class="circle-list" data-node="gotoGroup"><a href="<?=groupDetailUrlGen($item_join['group_id'],C('sourceCode')['operative_home_index_focus'])?>" target="_blank"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<?=$item_join['cmsIcon']?>"><span class="title" title="<?=$item_join['cmsName'],0,10?>"><?=mb_substr($item_join['cmsName'],0,10)?></span></a><a href="javascript:void(0)" data-groupId="<?=$item_join['group_id']?>" data-url="<?=groupDetailUrlGen($item_join['group_id'])?>" class="join-btn join-suc"><em class="iconn-20"></em><span>已加入</span> <em class="iconn-50 hide"></em></a></li>
			  <?php }else{ ?>
		          <li  modelid="<?php echo $modelPage['hjrqz'].str_pad($m,4,'0',STR_PAD_LEFT); ?>" class="circle-list" data-node="joinGroup"><a href="<?=groupDetailUrlGen($item_join['group_id'],C('sourceCode')['operative_home_index_focus'])?>" target="_blank"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<?=$item_join['cmsIcon']?>"><span class="title" title="<?=$item_join['cmsName'],0,10?>"><?=mb_substr($item_join['cmsName'],0,10)?></span></a><a href="javascript:void(0)" data-groupId="<?=$item_join['group_id']?>" data-url="<?=groupDetailUrlGen($item_join['group_id'])?>" class="join-btn"><em class="iconn-20 hide"></em> <span>加入圈子</span> <em class="iconn-50"></em></a></li>
			  <?php }?>
		      <?php $m++;?>
	      <?php }?>
	    </ul>
	    <div class="index-title clearfix" >
	      <h2 class="mx-recommend">美信推荐<span>Popular recommendation</span></h2>
	    </div>
	    <div class="index-popular-list"  data-action="shareBlock">
	      <ul class="clearfix">
			<?php $n=1;?>
			<volist name="list.commend" id="item_recom" key="k">
	        <li modelid="<?php echo $modelPage['hmxtj'].str_pad($n,4,'0',STR_PAD_LEFT); ?>" data-node="shareItem" data-id="<{$item_recom.tid}>" data-type="1" data-praise="false" data-count="<{$item_recom.voteNum}>">
	          <div class="mg-negative">
	              <div class="img"><a target="_blank" href="<{$item_recom['tid'],C('sourceCode')['social_home_index_recommend']|topicDetailUrlGen}>" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>"}'><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$item_recom.origin_img_url}>"alt="<{$item_recom.name}>" onerror="imgError(this, 'm')"></a></div>
	              <div class="img-box">
	              	  <volist name="item_recom.goods_ids" id="item_recom_list" key="list_key" offset="0" length='3'>
					  <if condition="$item_recom_list.type eq 'video' ">
		              	  <a target="_blank" href="<{$item_recom['tid'],C('sourceCode')['social_home_index_recommend']|topicDetailUrlGen}>#topicvideo" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>", "position": "video<{$list_key}>"}'>
						  <img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$item_recom_list.image|getResizeImg=###,120,85}>" alt="<{$item_recom_list.name}>" onerror="imgError(this, 'm')">
						  <p class="hover"><em class="icon-play"></em></p>
						  </a>
					  <else />
						  <a target="_blank" href="<{$item_recom_list['productId'],C('sourceCode')['social_home_index_recommend']|productDetailUrlGen=$item_recom_list['shopId'],###}>" bp-data='{"event_id":"G000P001",  "product_id":"<{$item_recom_list['productId']}>", "shop_id": "<{$item_recom_list['shopId']}>", "section": "<{$k}>", "position": "product<{$list_key}>"}'>
						  <img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$item_recom_list.image|getResizeImg=###,120,85}>" alt="<{$item_recom_list.name}>" onerror="imgError(this, 'm')">
						  <p class="hover">￥<span><{$item_recom_list.price}></span></p>
						  </a>
					  </if>
	                  </volist>
	              </div>
	              <div class="text"><span class="tag"><{$item_recom.category_name}></span><a target="_blank" href="<{$item_recom['tid'],C('sourceCode')['social_home_index_recommend']|topicDetailUrlGen}>" class="list-title" data-node="shareUrl" title="<{$item_recom.name}>" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>"}'><{$item_recom.short_name}></a>
	                <p class="gray"><{$item_recom.description}></p>
	                <div class="text-icon">
	                	<a href="javascript:;" class="icon-collect"><em class="icon iconn-10"></em><{$item_recom.voteNum}></a>
	                	<a href="javascript:;" class="a-share"><em class="icon iconn-11"></em><span><{$item_recom.sumQuantity}></span></a>
	                </div>
	              </div>
	          </div>
	        </li>
			<?php $n++;?>
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
				<notempty name="list.topics" >
					<?php $g=1;?>
					<foreach name="list.topics" item="topic" key="key">
				<li modelid="<?php echo $modelPage['hqzht'].str_pad($g,4,'0',STR_PAD_LEFT); ?>" data-id="<{$topic.tid}>" data-node="shareItem">
				    <div class="mg-negative">
				    	  <div class="topic-tag"><a target="_blank" href="<{$topic.group_id|groupDetailUrlGen}>"><em class="icon-lysy"><img onerror="imgError(this, 'g')" src="<{$pcimgpath}>/images/public/img-error.png" data-original="<notempty name="topic.group_icon"><{$topic.group_icon|getResizeImg=###,80,80}><else /><{$pccsspath}>/images/public/down-logo.png</notempty>"></em><{$topic.group_name}></a></div>
				          <div class="img"><a target="_blank" href="<{$topic.tid|topicDetailUrlGen}>" bp-data='{"event_id":"G000P002", "url": "<{$topic.tid|topicDetailUrlGen}>", "topic_id": "<{$topic.tid}>", "group_id": "<{$topic.group_id}>", "position": "<{$key+1}>"}'><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$topic.origin_img_url}>" alt="<{$topic.name}>"></a></div>
				          <div class="text"><a target="_blank" href="<{$topic.tid|topicDetailUrlGen}>" data-node="shareUrl" class="list-title"><{$topic.name}></a>
				            <div class="text-icon">
				            	<a  href="javascript:;" class="icon-collect"><em class="icon iconn-10"></em><{$topic.voteNum}></a>
				            	<a href="javascript:;" class="a-share"><em class="icon iconn-11"></em><span><{$topic.sumQuantity}></span></a>
				            </div>
				          </div>
				     </div>
				</li>
				<?php $g++;?>
				</foreach>
				</notempty>
				</ul>
			</div>
		</div>

	  <div class="index-shop">
        <div class="index-title clearfix">
          <h2 class="gg-goods">逛逛商品<span>Go shopping</span></h2><a target="_blank" href="<{$main_domain_gome}>" bp-data='{"event_id": "B000P007"}'>逛商城</a>
        </div>
        <div class="index-shop-list">
          <table>
            <tr>
              <td rowspan="2" num-tag='1'>
			  <?php if(isset($list['goods']['goods']['0']) && $list['goods']['goods']['0']['select_type'] ==1 ):?>
			  	<a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][0]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][0]['tid']}>" ' href="<{$list['goods']['goods'][0]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][0]['origin_img_url']}>" width="300" height="420" alt="<{$list['goods']['goods'][0]['name']}>"></a>
                    
			  <?php elseif(isset($list['goods']['goods']['0']) && $list['goods']['goods'][0]['select_type'] == 2):?>
				 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][0]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "文字链", "value": "<{$list['goods']['goods']['0']['url']}>" ' href="<{$list['goods']['goods']['0']['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][0]['origin_img_url']}>" width="300" height="420"></a>
			  <?php else:?>
			  	<a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][0]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][0]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][0]['tid']}>" ' href="<{$list['goods']['goods'][0]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][0]['shop_id'],###}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][0]['origin_img_url']}>" width="300" height="420" alt="<{$list['goods']['goods'][0]['name']}>"></a>
					 
			  <?php endif;?>
			 
			  </td>
              <td rowspan="2" num-tag='2'>
                <div class="banner banner-s">
					<ul data-node="indexSmall">
						<?php foreach($list['goods']['banner'] as $ber):?>
						<?php if($ber['select_type'] ==1 ):?>
						<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=shopDetailUrlGen($ber['tid'],C('sourceCode')['operative_home_index_focus']);?>", "type": "banner", "value": "<?=$ber['shop_id']?>" ' href="<?=shopDetailUrlGen($ber['tid'],C('sourceCode')['operative_home_index_focus']);?>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<?=$ber['origin_img_url']?>" width="437" height="220" alt="<?=$ber['name']?>"></a></li>
						<?php elseif($ber['select_type'] == 2):?>
						<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=$ber['origin_img_url']?>", "type": "banner", "value": "<?=$ber['origin_img_url']?>" ' href="<?=$ber['url']?>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<?=$ber['origin_img_url']?>" width="437" height="220"></a></li>
						<?php else:?>
						<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=productDetailUrlGen($ber['shop_id'],$ber['tid'],C('sourceCode')['operative_home_index_focus']);?>", "type": "banner", "value": "<?=$ber['tid']?>" ' href="<?=productDetailUrlGen($ber['shop_id'],$ber['tid'],C('sourceCode')['operative_home_index_focus']);?>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<?=$ber['origin_img_url']?>" width="437" height="220" alt="<?=$ber['name']?>"></a></li>
						<?php endif;?>
						<?php endforeach;?>
					</ul>
                </div>
              </td>
              <td num-tag='3'>
			  <?php if(isset($list['goods']['goods']['2']) && $list['goods']['goods']['2']['select_type'] ==1 ):?>
                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][2]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][2]['tid']}>" ' href="<{$list['goods']['goods'][2]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][2]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][2]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods']['2']) && $list['goods']['goods'][2]['select_type'] == 2):?>
					 <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['2']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['2']['url']}>" ' href="<{$list['goods']['goods']['2']['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][2]['origin_img_url']}>" width="230" height="210"></a>
			  <?php else:?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][2]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][2]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][2]['tid']}>" ' href="<{$list['goods']['goods'][2]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][2]['shop_id'],###}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][2]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][2]['name']}>"></a>
			  <?php endif;?>
			  </td>
              <td num-tag='4'>
			  <?php if(isset($list['goods']['goods']['3']) && $list['goods']['goods'][3]['select_type'] ==1 ):?>
                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][3]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片1", "value": "<{$list['goods']['goods'][3]['tid']}>"'   href="<{$list['goods']['goods']['3']['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][3]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][3]['name']}>"></a>
			  <?php elseif( isset($list['goods']['goods']['3']) && $list['goods']['goods'][3]['select_type'] == 2):?>
			  		<a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['3']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['3']['url']}>" ' href="<{$list['goods']['goods']['3']['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][3]['origin_img_url']}>" width="230" height="210"></a>	 
			  <?php else:?>
			  		<a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][3]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][3]['shop_id'],###}>", "type": "图片2", "value": "<{$list['goods']['goods'][3]['tid']}>" ' href="<{$list['goods']['goods'][3]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][3]['shop_id'],###}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][3]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][3]['name']}>"></a>
			  <?php endif;?>
			  </td>
            </tr>
            <tr>
              <td num-tag='5'>
			  <?php if(isset($list['goods']['goods']['4']) && $list['goods']['goods'][4]['select_type'] ==1 ):?>
                    <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][4]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][4]['tid']}>"' href="<{$list['goods']['goods'][4]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][4]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][4]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods']['4']) && $list['goods']['goods'][4]['select_type'] == 2):?>
					 <a target="_blank"   bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['4']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['4']['url']}>" ' href="<{$list['goods']['goods']['4']['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][4]['origin_img_url']}>" width="230" height="210"></a>
			  <?php else:?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][4]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][4]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][4]['tid']}>" ' href="<{$list['goods']['goods'][4]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][4]['shop_id'],###}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][4]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][4]['name']}>"></a>
			  <?php endif;?>
			  </td>

              <td num-tag='6'>
			  <?php if(isset($list['goods']['goods']['5']) && $list['goods']['goods'][5]['select_type'] ==1 ):?>
                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][5]['shop_id'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][5]['tid']}>"' href="<{$list['goods']['goods'][5]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][5]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][5]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods']['5']) && $list['goods']['goods'][5]['select_type'] == 2):?>
					<a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['5']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['5']['url']}>"'  href="<{$list['goods']['goods'][5]['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][5]['origin_img_url']}>" width="230" height="210"></a>
			  <?php else:?>
					<a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][5]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][5]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][5]['tid']}>" ' href="<{$list['goods']['goods'][5]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][5]['shop_id'],###}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][5]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][5]['name']}>"></a>
			  <?php endif;?>
			  </td>
            </tr>
            <tr>
              <td num-tag='7'>
                <div class="list-text">
                  <ul class="clearfix">
                  		<?php if( isset($list['goods']['keyword']) ): ?>
						<?php foreach($list['goods']['keyword'] as $kk=> $wd):?>
						<?php if($kk <=9 ):?>
						<?php if($wd['select_type']==1):?>
							<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=shopDetailUrlGen($wd['tid'],C('sourceCode')['operative_home_index_focus']);?>", "type": "文字链", "value": "<?=$wd['shop_id']?>"' href="<?=shopDetailUrlGen($wd['tid'],C('sourceCode')['operative_home_index_focus']);?>" title="<?=$wd['keyword']?>" ><?=$wd['keyword']?></a></li>
						<?php elseif($wd['select_type']==2):?>
							<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=$wd['url']?>", "type": "文字链", "value": "<?=$wd['url']?>"' href="<?=$wd['url']?>"  title="<?=$wd['keyword']?>"><?=$wd['keyword']?></a></li>
						<?php else:?>
							<li><a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<?=productDetailUrlGen($wd['shop_id'],$wd['tid'],C('sourceCode')['operative_home_index_focus']);?>", "type": "文字链", "value": "<?=$wd['tid']?>"' href="<?=productDetailUrlGen($wd['shop_id'],$wd['tid'],C('sourceCode')['operative_home_index_focus']);?>" title="<?=$wd['keyword']?>" ><?=$wd['keyword']?></a></li>
						<?php endif;?>
						<?php endif;?>
						<?php endforeach;?>
						<?php endif;?>
				  </ul>
                </div>
              </td>
              <td num-tag='8'>
			  <?php if( isset($list['goods']['goods'][1]) && $list['goods']['goods'][1]['select_type'] ==1 ):?>
                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][1]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][1]['tid']}>"' href="<{$list['goods']['goods'][1]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][1]['origin_img_url']}>" width="438" height="210" alt="<{$list['goods']['goods'][1]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods'][1])  && $list['goods']['goods'][1]['select_type'] == 2):?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['1']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['1']['url']}>"' href="<{$list['goods']['goods'][1]['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][1]['origin_img_url']}>" width="438" height="210"></a>
			  <?php else:?>
                     <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][1]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][1]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][1]['tid']}>" ' href="<{$list['goods']['goods'][1]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][1]['shop_id'],###}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][1]['origin_img_url']}>" width="438" height="210" alt="<{$list['goods']['goods'][1]['name']}>"></a>
			  <?php endif;?>
			  </td>
              <td num-tag='9'>
			  <?php if(isset($list['goods']['goods'][6])  && $list['goods']['goods'][6]['select_type'] ==1 ):?>
			  		<a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][6]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][6]['tid']}>"'  href="<{$list['goods']['goods'][6]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][6]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][6]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods'][6]) && $list['goods']['goods'][6]['select_type'] == 2):?>
				    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['6']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['6']['url']}>"' href="<{$list['goods']['goods'][6]['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][6]['origin_img_url']}>" width="230" height="210"></a>
			  <?php else:?>
					<a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][6]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][6]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][6]['tid']}>" ' href="<{$list['goods']['goods'][6]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][6]['shop_id'],###}>"><img src="<{$pcimgpath}>/images/public/img-error.png"  data-original="<{$list['goods']['goods'][6]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][6]['name']}>"></a>
			  <?php endif;?>
			  </td>
              <td num-tag='10'>
			  <?php if(isset($list['goods']['goods'][7]) && $list['goods']['goods'][7]['select_type'] ==1 ):?>
                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][7]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][7]['tid']}>"'  href="<{$list['goods']['goods'][7]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][7]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][7]['name']}>"></a>
			  <?php elseif(isset($list['goods']['goods'][7]) && $list['goods']['goods'][7]['select_type'] == 2):?>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['7']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['7']['url']}>"' href="<{$list['goods']['goods'][7]['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][7]['origin_img_url']}>" width="230" height="210"></a>
			  <?php else:?>
					 <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][7]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][7]['shop_id'],###}>", "type": "图片", "value": "<{$list['goods']['goods'][7]['tid']}>" ' href="<{$list['goods']['goods'][7]['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$list['goods']['goods'][7]['shop_id'],###}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][7]['origin_img_url']}>" width="230" height="210" alt="<{$list['goods']['goods'][7]['name']}>"></a>
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
        <div modelid="<?php echo $modelPage['hxqqz']?>" class="index-interest-list" data-action="shareBlock">
          <ul class="clearfix">
            <foreach name="list.groups" item="group" key="group_key">
            <if  condition="$group_key lt 7">
            <li <if condition="$group_key lt 1">class="first"</if> data-node="shareItem" >
	            <div class="mg-negative">
	              <div class="img"><a target="_blank" href="<{$group.tid|groupDetailUrlGen}>" bp-data='{"event_id": "G000P004", "group_id": "<{$group.tid}>"}'><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$group.origin_img_url}>" alt="<{$group.name}>" onerror="imgError(this, 'm')"></a></div>
	              <div class="text"><span class="tag"><{$group.category_name}></span><a target="_blank" href="<{$group.tid|groupDetailUrlGen}>" data-node="shareUrl" title="<{$group.name}>"><{$group.short_name}></a>
	                <div class="text-icon">
	                	<span class="fl"><em>成员：</em><{$group.memberQuantity}></span><span class="fl"><em>话题：</em><{$group.topicQuantity}></span>
	                </div>
	              </div>
	            </div>
            </li>
            </if>
            </foreach>
          </ul>
        </div>
      </div>
      <!--不断寻觅-->

    </div>

    <include file="Public:footer" />
    <!--<{$dataStatus}>-->