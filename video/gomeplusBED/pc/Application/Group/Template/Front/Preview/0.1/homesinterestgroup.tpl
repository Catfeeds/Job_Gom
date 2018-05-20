    <div class="interest-title clearfix">
        <h3 class="fl">
            兴趣圈子
        </h3>
        <p class="fr ">
            <a class="interest-more"  href="<{$mx_domain.group}>" target="_blank" data-code="home01002-channel">更多></a>
        </p>
    </div>
    <div class="interest-cont">
        <div class="interest-wrap" data-node="interest-wrap">
            <ul class="clearfix interest-list" data-node="interest-list">
                <volist name="datalists" id="interestGroup" key="groupKey" offset="0" length='3'>
                    <li data-node="interest-listLi">
                        <div>
                            <a class="list-img"  href="<{$interestGroup.group_id|groupDetailUrlGen}>" target="_blank" data-code="home01002-<{$groupKey+1}>">
                                <img src="<{$interestGroup.icon}>" width="100%">
                            </a>
                        </div>
                        <div class="list-txt-t clearfix">
                                <span class="txt-title">
                                    <span class="tag" title="<{$interestGroup.category_name}>"><?=mb_substr($interestGroup['category_name'],0,5)?></span>
                                    <a target="_blank" href="<{$interestGroup.group_id|groupDetailUrlGen}>" title="<{$interestGroup.name}>" data-code="home01002-<{$groupKey+1}>"><?=mb_substr($interestGroup['name'],0,8)?></a>
                                </span>
                            <span class="txt-num">
                                    成员<span class="list-txt-num">0</span>
                                    话题<span class="list-txt-num">0</span>
                                </span>
                        </div>
                        <foreach name="interestGroup.selected_topics" item="itemTopic" key="topicKey">
                            <p class="list-topic">
                                <a href="<{$itemTopic.id|topicDetailUrlGen}>" target="_blank" title="<{$itemTopic.name}>" data-code="home01002-<{$groupKey+1}>_<{$topicKey+1}>">
                                    <if condition="$itemTopic.type eq 1 ">［话题］</if>
                                    <if condition="$itemTopic.type eq 2 ">［活动］</if>
                                    <{$itemTopic.name}>
                                </a>
                            </p>
                        </foreach>
                    </li>
                </volist>
            </ul>
            <div class="list-btn clearfix" data-node="list-btn">
                <span href="javscript:;" class="active"><i></i></span><span href="javscript:;" ><i></i></span><span href="javscript:;" ><i></i></span>
            </div>
        </div>
    </div>
