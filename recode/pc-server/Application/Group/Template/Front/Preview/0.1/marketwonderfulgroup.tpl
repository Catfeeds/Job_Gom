	<div class="pluspc-car-title"><notempty name="slot.show_name" ><{$slot.show_name}><else />精彩圈子</notempty></div>
	<ul class="clearfix pluspc-car-list">
		<volist name="datalists" id="wonderfulGroups" key="k" offset="0" length='4'>
		<li>
			<div class="pluspc-car-imgbox">
				<a href="<{$wonderfulGroups.group_id|groupDetailUrlGen}>" data-code="market01001-<{$k}>" target="_blank">
					<img src="<{$wonderfulGroups.icon}>"/>
				</a>
			</div>
			<div class="pluspc-car-infobox clearfix">
				<span title="<{$wonderfulGroups['category_name']}>"><?=mb_substr($wonderfulGroups['category_name'],0,5)?></span>
				<a href="<{$wonderfulGroups.group_id|groupDetailUrlGen}>" title="<{$wonderfulGroups['name']}>" data-code="market01001-<{$k}>" target="_blank"><?=mb_substr($wonderfulGroups['name'],0,8)?></a>
			</div>
			<div class="pluspc-car-last">
				成员：<span>0</span>
				话题：<span>0</span>
			</div>
		</li>
		</volist>
	</ul>