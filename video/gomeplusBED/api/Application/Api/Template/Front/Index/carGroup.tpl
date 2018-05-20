<div class="pluspc-carGroup-wrap" data-small="pluspc-car-small" tpl-cms-node="carwonderfulgroup" id="carwonderfulgroup">
	<div class="pluspc-car-title"><notempty name="data.slot.name" ><{$data.slot.name}><else />精彩圈子</notempty></div>
	<ul class="clearfix pluspc-car-list">
		<volist name="data.wonderfulGroups" id="carGroup" key="k" offset="0" length="4">
		<li>
			<div class="pluspc-car-imgbox">
				<a href="<{$carGroup.group_id|groupDetailUrlGen}>" data-code="car01001-<{$k}>" target="_blank">
					<img src="<{$carGroup.cmsIcon|filterProtocol}>"/>
				</a>
			</div>
			<div class="pluspc-car-infobox clearfix">
				<span title="<{$carGroup['category_name']}>"><?=mb_substr($carGroup['category_name'],0,5)?></span>
				<a href="<{$carGroup.group_id|groupDetailUrlGen}>" data-code="car01001-<{$k}>" title="<{$carGroup['cmsName']}>" target="_blank"><?=mb_substr($carGroup['cmsName'],0,8)?></a>
			</div>
			<div class="pluspc-car-last">
				成员：<span><{$DynamicArr[$carGroup['group_id']]['memberQuantity']|num_format}></span>
				话题：<span><{$DynamicArr[$carGroup['group_id']]['topicQuantity']|num_format}></span>
			</div>
		</li>
		</volist>
	</ul>
</div>