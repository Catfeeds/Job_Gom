		<!--<{$dataStatus}>-->
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