<div class="pluspc-topPic-box" data-small="pluspc-topPic-boxS">
    <div class="topPic-box-cont clearfix ">
        <div class="cont-hotTop fl" tpl-cms-node="gomehottopic" id="gomehottopic">
            <div class="hotTop-title clearfix">
                <h3 class="fl"><notempty name="hotArr.slot.name" ><{$hotArr.slot.name}><else />热门话题</notempty></h3>
                <p class="fr ">
                    <a class="hotTop-publish"  href="<{$mx_domain.group}>topic/publiser" data-code="index01001-publiser" target="_blank" >发布话题></a>
                </p>
            </div>
            <ul class="clearfix">
                <volist name="hotArr.hotTopics" id="hotTopic" key="key" offset="0" length='3'>
                <li>
                    <div class="hotTop-img" data-node="hotTop-img">
                        <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>" data-code="index01001-<{$key}>" class="hotTop-imgBig" target="_blank"><img class="img-pic" src="<{$hotTopic.cmsIcon|filterProtocol}>" ></a>
                        <a class="img-name" data-node="img-name" data-code="index01001-<{$key}>" href="<{$hotTopic.group_id|groupDetailUrlGen}>" target="_blank">
                            <span class="img-name-bg"></span>
                            <img src="<{$hotTopic.group_icon|filterProtocol}>"><em class="img-tag"><{$hotTopic.group_name}></em>
                        </a>
                    </div>
                    <div class="hotTop-matter">
                        <div class="matter-title">
                            <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>"  data-code="index01001-<{$key}>" target="_blank"><{$hotTopic.cmsName}></a>
                        </div>
                        <div class="matter-info">
                            <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>" data-code="index01001-<{$key}>" target="_blank"><{$hotTopic.description}></a>
                        </div>
                        <div class="matterData clearfix" >
                            <a class="matterData-assist" href="javascript:;"><{$hotDynamicArr[$hotTopic['topic_id']]['likeQuantity']|num_format}></a>
                            <a class="matterData-discuss" href="javascript:;"><{$hotDynamicArr[$hotTopic['topic_id']]['replyQuantity']|num_format}></a>
                        </div>
                    </div>
                </li>
                </volist>
            </ul>
        </div>
        <div class="cont-interest fr" tpl-cms-node="gomeinterestgroup" id="gomeinterestgroup">
            <div class="interest-title clearfix">
                <h3 class="fl"><notempty name="topicArr.slot.name" ><{$topicArr.slot.name}><else />兴趣圈子</notempty></h3>
                <p class="fr ">
                    <a class="interest-more"  href="<{$mx_domain.group}>channel/index" data-code="index01002-channel" target="_blank">更多></a>
                </p>
            </div>
            <div class="interest-cont">
                <div class="interest-wrap" data-node="interest-wrap">
                    <ul class="clearfix interest-list" data-node="interest-list">
                        <volist name="topicArr.interestGroups" id="interestGroup" key="groupKey" offset="0" length='3'>
                        <li data-node="interest-listLi">
                            <div>
                                <a class="list-img"  href="<{$interestGroup.group_id|groupDetailUrlGen}>" data-code="index01002-<{$groupKey}>" target="_blank">
                                    <img src="<{$interestGroup.cmsIcon|filterProtocol}>">
                                </a>
                            </div>
                            <div class="list-txt-t clearfix">
                                <span class="txt-title">
                                    <span class="tag"><?=mb_substr($interestGroup['category_name'],0,5)?></span>
                                    <a target="_blank" href="<{$interestGroup.group_id|groupDetailUrlGen}>" data-code="index01002-<{$groupKey}>"><?=mb_substr($interestGroup['cmsName'],0,8)?></a>
                                </span>
                                <span class="txt-num">
                                    成员<span class="list-txt-num"><{$topicDynamicArr[$interestGroup['group_id']]['memberQuantity']|num_format}></span>
                                    话题<span class="list-txt-num"><{$topicDynamicArr[$interestGroup['group_id']]['topicQuantity']|num_format}></span>
                                </span>
                            </div>
                            <volist name="interestGroup.topics" id="item_topic" key="topic_key" offset="0" length='3'>
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
        </div>
    </div>
</div>