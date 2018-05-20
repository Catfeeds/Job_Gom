    <div class="hotTop-title clearfix">
        <h3 class="fl"><{$slot.show_name}></h3>
        <p class="fr ">
            <a class="hotTop-publish"  href="<{$mx_domain.group}>topic/publiser" target="_blank" data-code="home01001-publiser">发布话题></a>
        </p>
    </div>
    <ul class="clearfix">
            <volist name="datalists" id="hotTopic" key="topicKey" offset="0" length='3'>
            <li>
                <div class="hotTop-img" data-node="hotTop-img">
                    <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>" class="hotTop-imgBig" target="_blank" data-code="home01001-<{$topicKey+1}>">
                        <img class="img-pic" src="<{$hotTopic.icon}>" width="100%">
                    </a>
                    <a class="img-name" data-node="img-name" href="<{$hotTopic.group_id|groupDetailUrlGen}>" target="_blank" data-code="home01001-<{$topicKey+1}>">
                        <span class="img-name-bg"></span>
                        <img src="<{$hotTopic.group_icon}>"><em class="img-tag"><{$hotTopic.group_name}></em>
                    </a>
                </div>
                <div class="hotTop-matter">
                    <div class="matter-title">
                        <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>" target="_blank" title="<{$hotTopic.name}>" data-code="home01001-<{$topicKey+1}>"><{$hotTopic.name}></a>
                    </div>
                    <div class="matter-info">
                        <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>" target="_blank" title="<{$hotTopic.description}>" data-code="home01001-<{$topicKey+1}>"><{$hotTopic.description}></a>
                    </div>
                    <div class="matterData clearfix" >
                        <a class="matterData-assist" href="javascript:;">0</a>
                        <a class="matterData-discuss" href="javascript:;">0</a>
                    </div>
                </div>
            </li>
            </volist>
    </ul>
