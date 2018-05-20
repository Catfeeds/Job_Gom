<div class="pluspc-forestallTopic-box " data-small="pluspc-forestallTopic-boxS">
    <div class="homeTopic-box-cont clearfix ">
        <div class="cont-hotTop fl" tpl-cms-node="newhottopic" id="newhottopic">
            <div class="hotTop-title clearfix">
                <h3 class="fl"><{$newTopicSlot.name}></h3>
                <p class="fr ">
                    <a class="hotTop-publish"  href="<{$mx_domain.group}>topic/publiser" target="_blank" data-code="fresh01001-publiser">发布话题></a>
                </p>
            </div>
            <ul class="clearfix">
                <foreach name="newHotTopic" item="hotTopic" key="topicKey">
                <li>
                    <div class="hotTop-img" data-node="hotTop-img">
                        <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>" class="hotTop-imgBig" target="_blank" data-code="fresh01001-<{$topicKey+1}>">
                            <img class="img-pic" src="<{$hotTopic.cmsIcon|filterProtocol}>" width="100%">
                        </a>
                        <a class="img-name" data-node="img-name" href="<{$hotTopic.group_id|groupDetailUrlGen}>" target="_blank" data-code="fresh01001-<{$topicKey+1}>">
                            <span class="img-name-bg"></span>
                            <img src="<{$hotTopic.group_icon|filterProtocol}>"><em class="img-tag"><{$hotTopic.group_name}></em>
                        </a>
                    </div>
                    <div class="hotTop-matter">
                        <div class="matter-title">
                            <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>" target="_blank" title="<{$hotTopic.cmsName}>" data-code="fresh01001-<{$topicKey+1}>"><{$hotTopic.cmsName}></a>
                        </div>
                        <div class="matter-info">
                            <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>" target="_blank" title="<{$hotTopic.description}>" data-code="fresh01001-<{$topicKey+1}>"><{$hotTopic.description}></a>
                        </div>
                        <div class="matterData clearfix" >
                            <a class="matterData-assist" href="javascript:;"><{$hotTopic.likeQuantity|num_format}></a>
                            <a class="matterData-discuss" href="javascript:;"><{$hotTopic.replyQuantity|num_format}></a>
                        </div>
                    </div>
                </li>
                </foreach>
            </ul>
        </div>
        <div class="cont-interest fr" tpl-cms-node="newinterestgroup" id="newinterestgroup">
            <div class="interest-title clearfix">
                <h3 class="fl"><{$newGroupSlot.name}></h3>
                <p class="fr ">
                    <a class="interest-more"  href="<{$mx_domain.group}>channel/index" target="_blank" data-code="fresh01002-channel">更多></a>
                </p>
            </div>
            <div class="interest-cont">
                <div class="interest-wrap" data-node="interest-wrap">
                    <ul class="clearfix interest-list" data-node="interest-list">
                        <foreach name="newInterestGroup" item="interestGroup" key="groupKey">
                        <li data-node="interest-listLi">
                            <div>
                                <a class="list-img"  href="<{$interestGroup.group_id|groupDetailUrlGen}>" target="_blank" data-code="fresh01002-<{$groupKey+1}>">
                                    <img src="<{$interestGroup.cmsIcon|filterProtocol}>" width="100%">
                                </a>
                            </div>
                            <div class="list-txt-t clearfix">
                                <span class="txt-title">
                                    <span class="tag" title="<{$interestGroup.category_name}>"><?=mb_substr($interestGroup['category_name'],0,5)?></span>
                                    <a target="_blank" href="<{$interestGroup.group_id|groupDetailUrlGen}>" title="<{$interestGroup.cmsName}>" data-code="fresh01002-<{$groupKey+1}>"><?=mb_substr($interestGroup['cmsName'],0,8)?></a>
                                </span>
                                <span class="txt-num">
                                    成员<span class="list-txt-num"><{$interestGroup.memberQuantity|num_format}></span>
                                    话题<span class="list-txt-num"><{$interestGroup.topicQuantity|num_format}></span>
                                </span>
                            </div>
                            <foreach name="interestGroup.topics" item="itemTopic" key="topicKey">
                            <p class="list-topic">
                                <a href="<{$itemTopic.id|topicDetailUrlGen}>" target="_blank" title="<{$itemTopic.name}>" data-code="fresh01002-<{$groupKey+1}>_<{$topicKey+1}>">
                                    <if condition="$itemTopic.type eq 1 ">［话题］</if>
                                    <if condition="$itemTopic.type eq 2 ">［活动］</if>
                                    <{$itemTopic.name}>
                                </a>
                            </p>
                            </foreach>
                        </li>
                        </foreach>
                    </ul>
                    <div class="list-btn clearfix" data-node="list-btn">
                        <span href="javscript:;" class="active"><i></i></span><span href="javscript:;" ><i></i></span><span href="javscript:;" ><i></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>