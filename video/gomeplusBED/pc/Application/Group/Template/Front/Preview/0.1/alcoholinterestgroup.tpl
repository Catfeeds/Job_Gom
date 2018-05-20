<div class="pluspc-drinks-rightitle"><notempty name="slot.show_name" ><{$slot.show_name}><else />兴趣圈子</notempty></div>
<div class="pluspc-drinks-tab J-pluspc-drinks">
    <div class="pluspc-slider-tabbox">
        <ul class="pluspc-slider-tabcon">
            <volist name="datalists" id="interestGroup" key="groupKey" offset="0" length='3'>
                <li>
                    <div class="pluspc-drinks-group">
                        <a href="<{$interestGroup.group_id|groupDetailUrlGen}>" data-code="alcohol01002-<{$groupKey}>" target="_blank">
                            <img src="<{$interestGroup.icon}>"/>
                        </a>
                    </div>
                    <div class="pluspc-drinks-rightcon">
                        <div class="pluspc-drinks-groupkind clearfix">
                            <div class="clearfix">
                                <span><?=mb_substr($interestGroup['category_name'],0,5)?></span>
                                <a href="<{$interestGroup.group_id|groupDetailUrlGen}>" data-code="alcohol01002-<{$groupKey}>" target="_blank"><{$interestGroup['name'],0,8|mb_substr}></a>

                            </div>
                        </div>
                        <ol>
                            <volist name="interestGroup.topics" id="item_topic" key="topic_key" offset="0" length='2'>
                                <li>
                                    <a href="<{$item_topic.id|topicDetailUrlGen}>" data-code="alcohol01002-<{$groupKey}>_<{$topic_key}>" target="_blank">
                                        <if condition="$item_topic.type eq 1 "> [话题]</if>
                                        <if condition="$item_topic.type eq 2 "> [活动]</if>
                                        <{$item_topic.name}>
                                    </a>
                                </li>
                            </volist>
                        </ol>
                        <div class="pluspc-drinks-rightbottom">
                            <span>成员 <span>0</span></span>
                            <span>话题 <span>0</span></span>
                        </div>
                    </div>
                </li>
            </volist>
        </ul>
    </div>
    <div class="pluspc-slider-iconbox J-pluspc-drinks-pager">
        <span class="active"></span>
        <span></span>
        <span></span>
    </div>
</div>