	<!--<{$dataStatus}>-->
	<div class="index-shop">
        <div class="index-title clearfix">
          <h2 class="gg-goods">逛逛商品<span>Go shopping</span></h2><a target="_blank" href="<{$main_domain_gome}>" bp-data='{"event_id": "B000P007"}'>逛商城</a>
        </div>
        <div class="index-shop-list" modelid="<{$modelPage['hggsp']}>">
          <table>
            <tr>
              <td rowspan="2" num-tag='1'>
			  <?php if(isset($list['goods']['goods']['0']) && $list['goods']['goods']['0']['select_type'] ==1 ):?>
			  	<a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods'][0]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>", "type": "图片", "value": "<{$list['goods']['goods'][0]['tid']}>" ' href="<{$list['goods']['goods'][0]['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][0]['origin_img_url']}>" width="300" height="420" alt="<{$list['goods']['goods'][0]['name']}>"></a>
                    
			  <?php elseif(isset($list['goods']['goods']['0']) && $list['goods']['goods'][0]['select_type'] == 2):?>
				 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$list['goods']['goods']['0']['url']}>", "type": "文字链", "value": "<{$list['goods']['goods']['0']['url']}>" ' href="<{$list['goods']['goods']['0']['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$list['goods']['goods'][0]['origin_img_url']}>" width="300" height="420"></a>
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