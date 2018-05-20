<div class="pluspc-carGroup-wrap" data-small="pluspc-car-small" tpl-cms-node="marketwonderfulgroup" id="marketwonderfulgroup">
	<div class="pluspc-car-title"><notempty name="data.slot.name" ><{$data.slot.name}><else />精彩圈子</notempty></div>
	<ul class="clearfix pluspc-car-list">
		<volist name="data.wonderfulGroups" id="wonderfulGroups" key="k" offset="0" length='4'>
		<li>
			<div class="pluspc-car-imgbox">
				<a href="<{$wonderfulGroups.group_id|groupDetailUrlGen}>" data-code="market01001-<{$k}>" target="_blank">
					<img src="<{$wonderfulGroups.cmsIcon|filterProtocol}>"/>
				</a>
			</div>
			<div class="pluspc-car-infobox clearfix">
				<span title="<{$wonderfulGroups['category_name']}>"><?=mb_substr($wonderfulGroups['category_name'],0,5)?></span>
				<a href="<{$wonderfulGroups.group_id|groupDetailUrlGen}>" title="<{$wonderfulGroups['cmsName']}>" data-code="market01001-<{$k}>" target="_blank"><?=mb_substr($wonderfulGroups['cmsName'],0,8)?></a>
			</div>
			<div class="pluspc-car-last">
				成员：<span><{$DynamicArr[$wonderfulGroups['group_id']]['memberQuantity']|num_format}></span>
				话题：<span><{$DynamicArr[$wonderfulGroups['group_id']]['topicQuantity']|num_format}></span>
			</div>
		</li>
		</volist>
	</ul>
</div>