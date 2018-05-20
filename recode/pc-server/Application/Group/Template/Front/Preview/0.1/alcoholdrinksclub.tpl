<div class="pluspc-drinks-leftitle"><notempty name="slot.show_name" ><{$slot.show_name}><else />畅饮俱乐部</notempty></div>
<ul class="clearfix J-drink-list">
    <volist name="datalists" id="topic" key="key" offset="0" length='3'>
        <li>
            <div class="pluspc-drinks-list J-drinks-topicBox">
                <div class="pluspc-drinks-img">
                    <a href="<{$topic.topic_id|topicDetailUrlGen}>" data-code="alcohol01001-<{$key}>" target="_blank">
                        <img src="<{$topic.icon}>"/>
                    </a>
                </div>
                <div class="pluspc-drinks-user">
                    <a href="<{$topic.group_id|groupDetailUrlGen}>" data-code="alcohol01001-<{$key}>" target="_blank">
                        <img src="<{$topic['group_icon']}>"/>
                        <span class="pluspc-drinks-topic J-drinks-topic">
                            <span><{$topic['group_name']}></span>
                        </span>
                    </a>
                </div>
            </div>
            <div class="pluspc-drinks-listcon">
                <div class="pluspc-drinks-listitle">
                    <a href="<{$topic.topic_id|topicDetailUrlGen}>" data-code="alcohol01001-<{$key}>" target="_blank" title="<{$topic['name']}>"><{$topic['name']}></a>
                </div>
                <p><a href="<{$topic.topic_id|topicDetailUrlGen}>" data-code="alcohol01001-<{$key}>" target="_blank" title="<{$topic['description']}>"><{$topic['description']}></a></p>
                <div class="clearfix">
                    <span class="pluspc-love-icon">0</span>
                    <span class="pluspc-discuss-icon">0</span>
                </div>
            </div>
        </li>
    </volist>
</ul>