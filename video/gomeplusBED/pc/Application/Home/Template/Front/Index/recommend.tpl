		<!--<{$dataStatus}>-->
		<div class="index-title clearfix" >
	      <h2 class="mx-recommend">品质生活<span>Quality life</span></h2>
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