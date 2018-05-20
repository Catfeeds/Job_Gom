<div class="pluspc-clothing-wrap" data-small="pluspc-clothing-small" tpl-cms-node="fashionhotrecommend" id="fashionhotrecommend">
	<div class="pluspc-clothing-title"><notempty name="topicArr.slot.name" ><{$data.slot.name}><else />热门推荐</notempty></div>
	<ul class="clearfix pluspc-clothing-list">
		<volist name="data.hotRecommend" id="hotRecommend" key="k" offset="0" length='4'>
		<li>
			<div class="pluspc-clothing-user">
				<a href="<{$hotRecommend.create_user_id|userInfoUrlGen}>" data-code="clothes01001-<{$k}>_1"  class="pluspc-clothing-uImg" target="_blank">
					<img src="<{$hotRecommend.user_icon|filterProtocol}>"/>
				</a>
				<a href="<{$hotRecommend.create_user_id|userInfoUrlGen}>" data-code="clothes01001-<{$k}>_1" class="pluspc-clothing-uname" target="_blank"><{$hotRecommend.user_nickname}></a>
			</div>
			<div class="pluspc-clothing-image">
				<a href="<{$hotRecommend.topic_id|topicDetailUrlGen}>" data-code="clothes01001-<{$k}>"  target="_blank">
					<img src="<{$hotRecommend.cmsIcon|filterProtocol}>"/>
				</a>
			</div>
			<div>
				<a href="<{$hotRecommend.topic_id|topicDetailUrlGen}>" data-code="clothes01001-<{$k}>" title="<{$hotRecommend.cmsName}>" class="pluspc-clothing-toptitle" target="_blank"><{$hotRecommend.cmsName}></a>
			</div>
		</li>
		</volist>
	</ul>
</div>