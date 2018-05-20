	<h3><notempty name="slot.show_name" ><{$slot.show_name}><else />精彩话题</notempty></h3>
	<ul class="grouponTopic-list clearfix" >
		<volist name="datalists" id="wonderfulTopics" key="k" offset="0" length='12'>
		<li class="list-li">
			<div class="li-img">
				<a href="<{$wonderfulTopics.topic_id|topicDetailUrlGen}>" data-code="groupon01001-<{$k}>" target="_blank">
					<img src="<{$wonderfulTopics.icon}>" width="100%">
				</a>
			</div>
			<div class="li-title">
				<a href="<{$wonderfulTopics.topic_id|topicDetailUrlGen}>" title="<{$wonderfulTopics.name}>" data-code="groupon01001-<{$k}>" target="_blank"><{$wonderfulTopics.name}></a>
			</div>
			<div class="li-amount clearfix">
				<span class="amount-assist">0</span>
				<span class="amount-discuss">0</span>
			</div>
		</li>
		</volist>
	</ul>
