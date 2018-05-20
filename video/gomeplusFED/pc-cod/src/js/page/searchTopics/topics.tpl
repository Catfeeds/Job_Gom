{{each topics as topic index}}
{{if topic.topic}}
{{if topicFirstPic === ""}}
<div class="circle-box no-pic">
{{else}}
<div class="circle-box">
{{/if}}
    <div class="mg-negative">
        {{if topic.topic.topicFirstPic === ""}}
        <span class="topic-tag topic-tag-static">
        {{else}}
        <span class="topic-tag">
        {{/if}}
            <em class="icon-lysy">
                <img src="{{topic.user.userPic | showPic:'head-default.png'}}" title="{{topic.user.userName}}">
            </em>
            {{topic.user.userName}}
        </span>
        {{if topic.topic.topicFirstPic !== ""}}
        <div class="list-img">
            <a href="{{topics.group_domain}}topic/{{topic.topic.id}}.html" target="_blank">
                <!-- 话题详情展示 -->
                <img src="{{topic.topic.topicFirstPic}}" title="">
                {{if topic.topic.picType == 'video'}}
                    <em class="icon-play"></em>
                {{/if}}
            </a>
        </div>
        {{/if}}
        <div class="list-title">
            <p class="list-title-content">
                <a data-node="list_title" href="{{topics.group_domain}}topic/{{topic.topic.id}}.html" target="_blank">{{#topic.topic.name | truncateByteLen:'52'}}</a>
                <span class="list-title-time">{{topic.topic.time_str}}</span>
            </p>
        </div>
        <p data-node="list_description" class="list-description">{{#topic.topic.topicContent | truncateByteLen:'74'}}</p>
        <div class="text-icon">
            <a href="javascript:;" data-action="like" data-id="{{topic.id}}" data-type="1" data-praise="{{topic.like.isLike === false ? 1 : 0}}" data-count={{topic.like.userQuantity}}>
                <em class="icon icon-collection">&#xeac9;</em>
                {{topic.like.userQuantity}}
            </a>
            <a href="javascript:;" class="a-share">
                <em class="icon icon-share">&#xe9ed;</em>
                <span>{{topic.topic.topicReplyNum}}</span>
            </a>
            <!-- <a data-action="shareto" data-surl="{{topics.groupDomain}}topic/detail?tid={{topic.id}}" data-stitle="这儿有我们志趣相投的小伙伴，快加入我们吧" data-spic="" href="javascript:;" class="a-share">
                <em class="icon icon-share"></em>分享到
            </a> -->
        </div>
    </div>
</div>
{{/if}}
{{/each}}