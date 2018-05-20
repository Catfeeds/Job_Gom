    <div class="topPic-box-cont clearfix ">
        <div class="cont-hotTop fl">
            <div class="hotTop-title clearfix">
                <h3 class="fl">热门话题</h3>
                <p class="fr ">
                    <a class="hotTop-publish"  href="<{$mx_domain.group}>topic/publiser" data-code="index01001-publiser" target="_blank" >发布话题></a>
                </p>
            </div>
            <ul class="clearfix">
                <volist name="datalists" id="hotTopic" key="key" offset="0" length='3'>
                <li>
                    <div class="hotTop-img" data-node="hotTop-img">
                        <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>" data-code="index01001-<{$key}>" class="hotTop-imgBig" target="_blank"><img class="img-pic" src="<{$hotTopic.icon}>" ></a>
                        <a class="img-name" data-node="img-name" data-code="index01001-<{$key}>" href="<{$hotTopic.group_id|groupDetailUrlGen}>" target="_blank">
                            <span class="img-name-bg"></span>
                            <img src="<{$hotTopic.group_icon}>"><em class="img-tag"><{$hotTopic.group_name}></em>
                        </a>
                    </div>
                    <div class="hotTop-matter">
                        <div class="matter-title">
                            <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>"  data-code="index01001-<{$key}>" target="_blank"><{$hotTopic.name}></a>
                        </div>
                        <div class="matter-info">
                            <a href="<{$hotTopic.topic_id|topicDetailUrlGen}>" data-code="index01001-<{$key}>" target="_blank"><{$hotTopic.description}></a>
                        </div>
                        <div class="matterData clearfix" >
                            <a class="matterData-assist" href="javascript:;">0</a>
                            <a class="matterData-discuss" href="javascript:;">0</a>
                        </div>
                    </div>
                </li>
                </volist>
            </ul>
        </div>

    </div>