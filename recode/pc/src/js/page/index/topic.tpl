		<div class="index-circle">
			<div class="index-title clearfix">
			<h2 class="circle-topic">圈子话题<span>Circle topic</span></h2><a target="_blank" href="{{group_domain}}topic/publiser" bp-data='{"event_id": "B000P006"}' data-node="publishTopic">发布话题</a>
			</div>
			<div class="index-circle-list" data-action="shareBlock">
				<ul class="clearfix">
				{{each topics as topic key}}
				<li modelid="{{key < 9 ? 'PSYQZHTlt000'+(key+1):'PSYQZHTlt00'+(key+1)}}" data-id="{{topic.tid}}" data-node="shareItem">
				    <div class="mg-negative">
				    	  <div class="topic-tag"><a target="_blank" href="{{topic.group_href}}">
				    	  <em class="icon-lysy">
				    	  <img src="{{imgpath}}/images/public/img-error.png" 
				    	  data-original="{{topic.group_icon}}" onerror="imgError(this)">
				    	  </em>{{topic.group_name}}</a></div>
				          <div class="img"><a target="_blank" href="{{topic.topic_href}}" bp-data='{"event_id":"G000P002", "url": "{{topic.topic_href}}", "topic_id": "{{topic.tid}}", "group_id": "{{topic.group_id}}", "position": "{{key+1}}"}'><img src="{{imgpath}}/images/public/img-error.png" data-original="{{topic.origin_img_url}}" alt="{{topic.name}}" onerror="imgError(this)"></a></div>
				          <div class="text"><a target="_blank" href="{{topic.topic_href}}" data-node="shareUrl" class="list-title">{{topic.name}}</a>
				            <div class="text-icon">
				            	<a  href="javascript:;" class="icon-collect"><em class="icon iconn-10"></em>{{topic.voteNum}}</a>
				            	<a href="javascript:;" class="a-share"><em class="icon iconn-11"></em><span>{{topic.sumQuantity}}</span></a>
				            </div>
				          </div>
				     </div>
				</li>
				{{/each}}
				</ul>
			</div>
		</div>