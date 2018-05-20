	<div class="index-shop">
        <div class="index-title clearfix">
          <h2 class="gg-goods">逛逛商品<span>Go shopping</span></h2><a target="_blank" href="{{staSite}}" bp-data='{"event_id": "B000P007"}'>逛商城</a>
        </div>
        <div class="index-shop-list" modelid="{{bp_hggsp}}">
          <table>
            <tr>
              <td rowspan="2" num-tag='1'>
				 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "{{goodsList[0].url}}", "type": "文字链", "value": "{{goodsList[0].url}}" ' href="{{goodsList[0].url}}"><img src="{{imgpath}}/images/public/img-error.png" data-original="{{goodsList[0].origin_img_url}}" width="300" height="420" onerror="imgError(this)"></a>
			  </td>
              <td rowspan="2" num-tag='2'>
                <div class="banner banner-s">
					<ul data-node="indexSmall">
						{{each goodsBanner as item index}}
						<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "{{item.origin_img_url}}", "type": "banner", "value": "{{item.origin_img_url}}" ' href="{{item.url}}"><img src="{{imgpath}}/images/public/img-error.png" data-original="{{item.origin_img_url}}" width="437" height="220" onerror="imgError(this)"></a></li>
						{{/each}}
					</ul>
                </div>
              </td>
              <td num-tag='3'>
					 <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "{{goodsList[2].url}}", "type": "文字链", "value": "{{goodsList[2].url}}" ' href="{{goodsList[2].url}}">
					 <img src="{{imgpath}}/images/public/img-error.png" data-original="{{goodsList[2].origin_img_url}}" width="230" height="210" onerror="imgError(this)"></a>
			  </td>
              <td num-tag='4'>
			  		 <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "{{goodsList[3].url}}", "type": "文字链", "value": "{{goodsList[3].url}}" ' href="{{goodsList[3].url}}">
					 <img src="{{imgpath}}/images/public/img-error.png" data-original="{{goodsList[3].origin_img_url}}" width="230" height="210" onerror="imgError(this)"></a>	 
			  </td>
            </tr>
            <tr>
              <td num-tag='5'>
					<a target="_blank"  bp-data='{"event_id":"G000P003", "url": "{{goodsList[4].url}}", "type": "文字链", "value": "{{goodsList[4].url}}" ' href="{{goodsList[4].url}}">
					 <img src="{{imgpath}}/images/public/img-error.png" data-original="{{goodsList[4].origin_img_url}}" width="230" height="210" onerror="imgError(this)"></a>
			  </td>
              <td num-tag='6'>
					<a target="_blank"  bp-data='{"event_id":"G000P003", "url": "{{goodsList[5].url}}", "type": "文字链", "value": "{{goodsList[5].url}}" ' href="{{goodsList[5].url}}">
					 <img src="{{imgpath}}/images/public/img-error.png" data-original="{{goodsList[5].origin_img_url}}" width="230" height="210" onerror="imgError(this)"></a>
			  </td>
            </tr>
            <tr>
              <td num-tag='7'>
                <div class="list-text">
                  <ul class="clearfix">
                  	{{each keyword as word index}}
						<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "{{word.url}}", "type": "文字链", "value": "{{word.url}}"' href="{{word.url}}"  title="{{word.keyword}}">{{word.keyword}}</a></li>
                  	{{/each}}
				  </ul>
                </div>
              </td>
              <td num-tag='8'>
					 <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "{{goodsList[1].url}}", "type": "文字链", "value": "{{goodsList[1].url}}" ' href="{{goodsList[1].url}}">
					 <img src="{{imgpath}}/images/public/img-error.png" data-original="{{goodsList[1].origin_img_url}}" width="438" height="210" onerror="imgError(this)"></a>
			  </td>
              <td num-tag='9'>
				    <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "{{goodsList[6].url}}", "type": "文字链", "value": "{{goodsList[6].url}}" ' href="{{goodsList[6].url}}">
					 <img src="{{imgpath}}/images/public/img-error.png" data-original="{{goodsList[6].origin_img_url}}" width="230" height="210" onerror="imgError(this)"></a>
			  </td>
              <td num-tag='10'>
					 <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "{{goodsList[7].url}}", "type": "文字链", "value": "{{goodsList[7].url}}" ' href="{{goodsList[7].url}}">
					 <img src="{{imgpath}}/images/public/img-error.png" data-original="{{goodsList[7].origin_img_url}}" width="230" height="210" onerror="imgError(this)"></a>
			  </td>
            </tr>
          </table>
        </div>
     </div>
	 

	 <div class="index-interest" data-node="interest">
        <div class="index-title clearfix">
          <h2 class="interest-circle">兴趣圈子<span>Interest circle</span></h2><a href="{{group_domain}}index" target="_blank" bp-data='{"event_id": "B000P008"}'>更多圈子</a>
        </div>
        <div modelid="{{bp_hxqqz}}" class="index-interest-list" data-action="shareBlock">
          <ul class="clearfix">
            {{each groups as group group_key}}
            <li data-node="shareItem" class = "{{group_key === 0 ? 'first':''}}" >
	            <div class="mg-negative">
	              <div class="img">
	                <a target="_blank" href="{{group.href}}" bp-data='{"event_id": "G000P004", "group_id": "{{group.tid}}"}'>
	                <img src="{{imgpath}}/images/public/img-error.png" data-original="{{group.origin_img_url}}" alt="{{group.name}}" onerror="imgError(this)">
	                </a>
	              </div>
	              <div class="text">
		              <span class="tag">{{group.category_name}}</span>
		              <a target="_blank" href="{{group.href}}" data-node="shareUrl" title="{{group.name}}">{{group.short_name}}</a>
		              <div class="text-icon">
		                <span class="fl"><em>成员：</em>{{group.memberQuantity}}</span><span class="fl"><em>话题：</em>{{group.topicQuantity}}</span>
		              </div>
	              </div>
	            </div>
            </li>
            {{/each}}
          </ul>
        </div>
     </div>