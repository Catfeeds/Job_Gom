{{each topics as topic index}}
{{if topic.topic}}
{{if topicFirstPic === ""}}
<div class="circle-box no-pic">
{{else}}
<div modelid="{{topic.modelid}}" class="circle-box">
{{/if}}
    <div class="mg-negative">
        {{if topic.topic.topicFirstPic === ""}}
        <span class="topic-tag topic-tag-static">
        {{else}}
        <span class="topic-tag">
        {{/if}}
            {{if topic.user}}
            <a href="{{topic.user.id | othersLink}}" target="_blank">
            <em class="icon-lysy">
                <img src="{{topic.user.facePicUrl | showPic:'head-default.png'}}" title="{{topic.user.nickname}}"  onerror="imgError(this)">
            </em>
            {{topic.user.nickname}}
            </a>
            {{else}}
            <a href="javascript:;" style="cursor: default;">
            <em class="icon-lysy">
                <img src="" title=""  onerror="imgError(this)">
            </em>
            {{/if}}
        </span>
        {{if topic.topic.topicFirstPic !== ""}}
        <div class="list-img">
            <a href="{{topics.group_domain}}topic/{{topic.topic.id}}.html" target="_blank">
                <!-- 话题详情展示 -->
                <img src="{{topic.topic.topicFirstPic}}" title="" onerror="imgError(this);">
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
            {{if topic.like}}
            <a href="javascript:;" data-action="like" data-id="{{topic.id}}" data-type="1" data-praise="{{topic.like.isLike === false ? 1 : 0}}" data-count={{topic.like.userQuantity}}>
                <em class="icon-like"></em>
                {{topic.like.userQuantity}}
            </a>
            {{/if}}
            <a href="javascript:;" class="a-share">
                <em class="icon-discuss"></em>
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
