<div class="pluspc-drinks" <notempty name="topicArr.slot.image">style="background-image:url('<{$topicArr.slot.image}>')"</notempty>>
    <div class="clearfix pluspc-drinks-content">
        <div class="pluspc-drinks-left"  tpl-cms-node="alcoholdrinksclub" id="alcoholdrinksclub">
            <div class="pluspc-drinks-leftitle"><notempty name="topicArr.slot.name" ><{$topicArr.slot.name}><else />畅饮俱乐部</notempty></div>
            <ul class="clearfix J-drink-list">
                <volist name="topicArr.drinksClubs" id="topic" key="key" offset="0" length='3'>
                <li>
                    <div class="pluspc-drinks-list J-drinks-topicBox">
                        <div class="pluspc-drinks-img">
                            <a href="<{$topic.topic_id|topicDetailUrlGen}>" data-code="alcohol01001-<{$key}>" target="_blank">
                                <img src="<{$topic.cmsIcon|filterProtocol}>"/>
                            </a>
                        </div>
                        <div class="pluspc-drinks-user">
                            <a href="<{$topic.group_id|groupDetailUrlGen}>" data-code="alcohol01001-<{$key}>" target="_blank">
                                <img src="<{$topic['group_icon']|filterProtocol}>"/>
                                <span class="pluspc-drinks-topic J-drinks-topic">
                                    <span><{$topic['group_name']}></span>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="pluspc-drinks-listcon">
                        <div class="pluspc-drinks-listitle">
                            <a href="<{$topic.topic_id|topicDetailUrlGen}>" data-code="alcohol01001-<{$key}>" target="_blank" title="<{$topic['cmsName']}>"><{$topic['cmsName']}></a>
                        </div>
                        <p><a href="<{$topic.topic_id|topicDetailUrlGen}>" data-code="alcohol01001-<{$key}>" target="_blank" title="<{$topic['description']}>"><{$topic['description']}></a></p>
                        <div class="clearfix">
                            <span class="pluspc-love-icon"><{$topicDynamicArr[$topic['topic_id']]['likeQuantity']|num_format}></span>
                            <span class="pluspc-discuss-icon"><{$topicDynamicArr[$topic['topic_id']]['replyQuantity']|num_format}></span>
                        </div>
                    </div>
                </li>
                </volist>
            </ul>
        </div>
        <div class="pluspc-drinks-right" tpl-cms-node="alcoholinterestgroup" id="alcoholinterestgroup" <notempty name="groupArr.slot.image">style="background-image:url('<{$groupArr.slot.image}>')"</notempty>>
            <div class="pluspc-drinks-rightitle"><notempty name="groupArr.slot.name" ><{$groupArr.slot.name}><else />兴趣圈子</notempty></div>
            <div class="pluspc-drinks-tab J-pluspc-drinks">
                <div class="pluspc-slider-tabbox">
                    <ul class="pluspc-slider-tabcon">
                        <volist name="groupArr.interestGroups" id="interestGroup" key="groupKey" offset="0" length='3'>
                        <li>
                            <div class="pluspc-drinks-group">
                                <a href="<{$interestGroup.group_id|groupDetailUrlGen}>" data-code="alcohol01002-<{$groupKey}>" target="_blank">
                                    <img src="<{$interestGroup.cmsIcon|filterProtocol}>"/>
                                </a>
                            </div>
                            <div class="pluspc-drinks-rightcon">
                                <div class="pluspc-drinks-groupkind clearfix">
                                    <div class="clearfix">
                                        <span><?=mb_substr($interestGroup['category_name'],0,5)?></span>
                                        <a href="<{$interestGroup.group_id|groupDetailUrlGen}>" data-code="alcohol01002-<{$groupKey}>" target="_blank"><{$interestGroup['cmsName'],0,8|mb_substr}></a>

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
                                    <span>成员 <span><{$groupDynamicArr[$interestGroup['group_id']]['memberQuantity']|num_format}></span></span>
                                    <span>话题 <span><{$groupDynamicArr[$interestGroup['group_id']]['topicQuantity']|num_format}></span></span>
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
        </div>
    </div>
</div>