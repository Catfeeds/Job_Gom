{{each groups as group index}}
<div class="shop-list" data-node='groupList' data-id='{{group.id}}'>
    <div class="mg-negative">
        <!--<a data-node="share" href="javascript:;" class="a-share search-circle-share" data-surl="topic/index?gid={{group.groupId}}" data-stitle="{{group.name}}" data-spic="{{group.groupIcon | showPic}}"> <em class="icon icon-share"></em>分享到</a> -->
        <div class="user-head">
            <a target="_blank" href="/circle/{{group.id}}.html" bp-data='{"event_id": "G000P006", "s_word": "{{groups.keyword}}", "group_id": "{{group.id}}", "s_type": "group"}'><img src="{{group.icon | showPic:'circle-default.png'}}" title="{{group.category.name}}"></a>
        </div>
        <h3 class="user-name">{{group.name}}</h3>
        <div><span class="pc-btn pc-bj-fc8753 circle-type">{{group.category.name}}</span></div>
        <div class="user-top-info">
            <ul class="clearfix">
                <li>成员：<span>{{group.memberQuantity}}</span></li>
                <li>话题：<span>{{group.topicQuantity}}</span></li>
            </ul>
        </div>
    </div>
</div>
{{/each}}