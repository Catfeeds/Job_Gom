	<div class="pluspc-clothing-title"><notempty name="slot.show_name" ><{$slot.show_name}><else />热门推荐</notempty></div>
	<ul class="clearfix pluspc-clothing-list">
		<volist name="datalists" id="hotRecommend" key="k" offset="0" length='4'>
		<li>
			<div class="pluspc-clothing-user">
				<a href="<{$hotRecommend.create_user_id|userInfoUrlGen}>" data-code="clothes01001-<{$k}>_1"  class="pluspc-clothing-uImg" target="_blank">
					<img src="<{$hotRecommend.user_icon}>"/>
				</a>
				<a href="<{$hotRecommend.create_user_id|userInfoUrlGen}>" data-code="clothes01001-<{$k}>_1" class="pluspc-clothing-uname" target="_blank"><{$hotRecommend.user_nickname}></a>
			</div>
			<div class="pluspc-clothing-image">
				<a href="<{$hotRecommend.topic_id|topicDetailUrlGen}>" data-code="clothes01001-<{$k}>"  target="_blank">
					<img src="<{$hotRecommend.icon}>"/>
				</a>
			</div>
			<div>
				<a href="<{$hotRecommend.topic_id|topicDetailUrlGen}>" data-code="clothes01001-<{$k}>" title="<{$hotRecommend.name}>" class="pluspc-clothing-toptitle" target="_blank"><{$hotRecommend.name}></a>
			</div>
		</li>
		</volist>
	</ul>
