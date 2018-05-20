    <div class="interest-title clearfix">
        <h3 class="fl"><notempty name="slot.show_name" ><{$slot.show_name}><else />兴趣圈子</notempty></h3>
        <p class="fr ">
            <a class="interest-more"  href="<{$mx_domain.group}>channel/index" data-code="index01002-channel" target="_blank">更多></a>
        </p>
    </div>
    <div class="interest-cont">
        <div class="interest-wrap" data-node="interest-wrap">
            <ul class="clearfix interest-list" data-node="interest-list">
                <volist name="datalists" id="interestGroup" key="groupKey" offset="0" length='3'>
                    <li data-node="interest-listLi">
                        <div>
                            <a class="list-img"  href="<{$interestGroup.group_id|groupDetailUrlGen}>" data-code="index01002-<{$groupKey}>" target="_blank">
                                <img src="<{$interestGroup.icon}>">
                            </a>
                        </div>
                        <div class="list-txt-t clearfix">
                                <span class="txt-title">
                                    <span class="tag"><?=mb_substr($interestGroup['category_name'],0,5)?></span>
                                    <a target="_blank" href="<{$interestGroup.group_id|groupDetailUrlGen}>" data-code="index01002-<{$groupKey}>"><?=mb_substr($interestGroup['name'],0,8)?></a>
                                </span>
                            <span class="txt-num">
                                    成员<span class="list-txt-num">0</span>
                                    话题<span class="list-txt-num">0</span>
                                </span>
                        </div>
                        <volist name="interestGroup.selected_topics" id="item_topic" key="topic_key" offset="0" length='3'>
                            <p class="list-topic">
                                <a href="<{$item_topic.id|topicDetailUrlGen}>" data-code="index01002-<{$groupKey}>_<{$topic_key}>" target="_blank">
                                    <if condition="$item_topic.type eq 1 ">［话题］</if>
                                    <if condition="$item_topic.type eq 2 ">［活动］</if>
                                    <{$item_topic.name}>
                                </a>
                            </p>
                        </volist>

                    </li>
                </volist>
            </ul>
            <div class="list-btn clearfix" data-node="list-btn">
                <span href="javscript:;" class="active"><i></i></span><span href="javscript:;" ><i></i></span><span href="javscript:;" ><i></i></span>
            </div>
        </div>

    </div>
