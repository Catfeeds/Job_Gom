<div class="pluspc-grouponTopic" data-small="pluspc-grouponTopicS" tpl-cms-node="tuanwonderfultopic" id="tuanwonderfultopic" >
	<h3><notempty name="data.slot.name" ><{$data.slot.name}><else />精彩话题</notempty></h3>
	<ul class="grouponTopic-list clearfix" >
		<volist name="data.wonderfulTopics" id="wonderfulTopics" key="k" offset="0" length='12'>
		<li class="list-li">
			<div class="li-img">
				<a href="<{$wonderfulTopics.topic_id|topicDetailUrlGen}>" data-code="groupon01001-<{$k}>" target="_blank">
					<img src="<{$wonderfulTopics.cmsIcon|filterProtocol}>" width="100%">
				</a>
			</div>
			<div class="li-title">
				<a href="<{$wonderfulTopics.topic_id|topicDetailUrlGen}>" title="<{$wonderfulTopics.cmsName}>" data-code="groupon01001-<{$k}>" target="_blank"><{$wonderfulTopics.cmsName}></a>
			</div>
			<div class="li-amount clearfix">
				<span class="amount-assist"><{$dynamicArr[$wonderfulTopics['topic_id']]['likeQuantity']|num_format}></span>
				<span class="amount-discuss"><{$dynamicArr[$wonderfulTopics['topic_id']]['replyQuantity']|num_format}></span>
			</div>
		</li>
		</volist>
	</ul>
</div>