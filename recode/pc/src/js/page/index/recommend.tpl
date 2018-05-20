		<div class="index-title clearfix" >
	      <h2 class="mx-recommend">品质生活<span>Quality life</span></h2>
	    </div>
	    <div class="index-popular-list"  data-action="shareBlock">
	      <ul class="clearfix">
			{{each commend as item_recom k}}
	        <li modelid="{{bp_hmxtj}}000{{k+1}}" data-node="shareItem" data-id="{{item_recom.tid}}" data-type="1" data-praise="false" data-count="{{item_recom.voteNum}}">
	          <div class="mg-negative">
	              <div class="img"><a target="_blank" href="{{item_recom.href}}" bp-data='{"event_id":"G000P001", "topic_id": "{{item_recom.tid}}", "group_id": "{{item_recom.group_id}}", "section": "{{k}}"}'><img src="{{imgpath}}/images/public/img-error.png" data-original="{{item_recom.origin_img_url}}"alt="{{item_recom.name}}" onerror="imgError(this, 'm')"></a></div>
	              <div class="img-box">
	              	  {{each item_recom.goods_ids as item_recom_list list_key}}
		              	  {{if list_key < 3}}
							  	{{if item_recom_list.type == 'video'}}
				              	  <a target="_blank" href="{{item_recom.href}}#topicvideo" bp-data='{"event_id":"G000P001", "topic_id": "{{item_recom.tid}}", "group_id": "{{item_recom.group_id}}", "section": "{{k}}", "position": "video{{list_key}}"}'>
								  <img src="{{imgpath}}/images/public/img-error.png" data-original="{{item_recom.image}}" alt="{{item_recom_list.name}}" onerror="imgError(this, 'm')">
								  <p class="hover"><em class="icon-play"></em></p>
								  </a>
							  	{{else}}
								  <a target="_blank" href="{{item_recom_list.href}}" bp-data='{"event_id":"G000P001",  "product_id":"{{item_recom_list.productId}}", "shop_id": "{{item_recom_list.shopId}}", "section": "{{k}}
								  ", "position": "product{{list_key}}"}'>
								  <img src="{{imgpath}}/images/public/img-error.png" data-original="{{item_recom_list.image}}" alt="{{item_recom_list.name}}" onerror="imgError(this, 'm')">
								  <p class="hover">￥<span>{{item_recom_list.price||'0.00'}}</span></p>
								  </a>
							  	{{/if}}
						   {{/if}}
					  {{/each}}
	              </div>
	              <div class="text"><span class="tag">{{item_recom.category_name}}</span><a target="_blank" href="{{item_recom.href}}" class="list-title" data-node="shareUrl" title="{{item_recom.name}}" bp-data='{"event_id":"G000P001", "topic_id": "{{item_recom.tid}}", "group_id": "{{item_recom.group_id}}", "section": "{{k}}"}'>{{item_recom.short_name}}</a>
	                <p class="gray">{{item_recom.description}}</p>
	                <div class="text-icon">
	                	<a href="javascript:;" class="icon-collect"><em class="icon iconn-10"></em>{{item_recom.voteNum}}</a>
	                	<a href="javascript:;" class="a-share"><em class="icon iconn-11"></em><span>{{item_recom.sumQuantity}}</span></a>
	                </div>
	              </div>
	          </div>
	        </li>
	        {{/each}}
	     </ul>
	    </div>