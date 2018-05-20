{{each topics as topic index}}
{{if topic.new_components && topic.user}}
{{if topic.new_components.shop}}
<div class="circle-box shop2">
{{else if !topic.new_components.item && !topic.new_components.image && !topic.new_components.video}}
<div class="circle-box no-pic">
{{else}}
<div class="circle-box">
{{/if}}
    <div class="mg-negative">
        {{if topic.new_components.shop || (!topic.new_components.item && !topic.new_components.image && !topic.new_components.video)}}
        <span class="topic-tag topic-tag-static">
        {{else}}
        <span class="topic-tag">
        {{/if}}
            <em class="icon-lysy">
                <img src="{{topic.user.facePicUrl}}" title="{{topic.user.nickname}}">
            </em>
            {{topic.user.nickname}}
        </span>
        <!-- 显示顺序: 商品,图片,店铺 -->
        {{if topic.new_components.item}}
        <div class="list-img">
            <a href="{{topics.groupDomain}}topic/{{topic.id}}.html" target="_blank" bp-data='{"event_id": "{{topics.event_id}}", "group_id": "{{topics.group_id}}", "topic_id": "{{topic.id}}"}'>
                <!-- 话题详情展示 -->
                <img src="{{topic.new_components.item.item.mainImage}}" title="">
            </a>
        </div>
        <p class="list-price">
            ¥   <span>{{topic.new_components.item.item.salePrice}}</span>
            {{if topic.new_components.item.item.rebateSummary && topic.new_components.item.item.rebateSummary.refRebateMoney > 0}} 
            <em class="fan-tag">返</em>
            {{/if}}
        </p>
        {{else if topic.new_components.image}}
        <div class="list-img">
            <a href="{{topics.groupDomain}}topic/{{topic.id}}.html" target="_blank" bp-data='{"event_id": "{{topics.event_id}}", "group_id": "{{topics.group_id}}", "topic_id": "{{topic.id}}"}'><img src="{{topic.new_components.image.url}}" title=""></a>
        </div>
        {{else if topic.new_components.video}}
         <div class="list-img">
            <a href="{{topics.groupDomain}}topic/{{topic.id}}.html" target="_blank" bp-data='{"event_id": "{{topics.event_id}}", "group_id": "{{topics.group_id}}", "topic_id": "{{topic.id}}"}'>
                <img src="{{topic.new_components.video.coverImage}}"  title="">
                <em class="icon-play"></em>
            </a>
        </div>
        {{else if topic.new_components.shop && topic.new_components.shop.shop}}
        <dl class="list-shop">
            <dt>
                <a href="{{topics.groupDomain}}topic/{{topic.id}}.html" target="_blank" bp-data='{"event_id": "{{topics.event_id}}", "group_id": "{{topics.group_id}}", "topic_id": "{{topic.id}}"}'>
                    <img src="{{topic.new_components.shop.shop.icon}}" alt="">
                </a>
            </dt>
            <dd>
                <a href="{{topics.mallDomain}}shop-{{topic.new_components.shop.id}}.html">{{topic.new_components.shop.shop.name}}</a>
                {{if topic.new_components.shop.shop.promotionMark && topic.new_components.shop.shop.promotionMark.hasCouponPlan}}
                <em class="coupon-tag">优惠券</em>
                {{/if}}
            </dd>
        </dl>
        {{/if}}
        <div class="list-title">
            <p class="list-title-content" data-node="list_nav">
                {{if topic.isUpper}}
                <em class="set-top">置顶</em>
                {{/if}}
                {{if topic.isEssence}}
                <em class="set-spark">精品</em>
                {{/if}}
                {{if topic.style === 1}}
                <em class="set-access">专访</em>
                {{/if}}
                <a data-node="list_title" href="{{topics.groupDomain}}topic/{{topic.id}}.html" target="_blank" bp-data='{"event_id": "{{topics.event_id}}", "group_id": "{{topics.group_id}}", "topic_id": "{{topic.id}}"}'>{{#{str:topic.name,isEssence:topic.isEssence,isUpper:topic.isUpper} | truncateLenByJson:'52'}}</a>
                <span class="list-title-time">{{topic.time_str}}</span>
            </p>
        </div>
        {{if topic.new_components.text}}
        <!-- topic.new_components.text.text -->
        <p data-node="list_description" class="list-description" >{{#{str:topic.new_components.text.text} | truncateLenByJson:'74'}}</p>
        {{else if topic.new_components.item}}
        <!-- topic.new_components.item.text -->
        <p data-node="list_description" class="list-description" >{{#{str:topic.new_components.item.text} | truncateLenByJson:'74'}}</p>
        {{else if topic.new_components.image}}
        <!-- topic.new_components.image.text -->
        <p data-node="list_description" class="list-description" >{{#{str:topic.new_components.image.text} | truncateLenByJson:'74'}}</p>
        {{else if topic.new_components.shop}}
        <!-- topic.new_components.shop.text -->
        <p data-node="list_description" class="list-description" >{{#{str:topic.new_components.shop.text} | truncateLenByJson:'74'}}</p>
        {{/if}}
        <div class="text-icon">
            <a href="javascript:;" data-action="like" data-id="{{topic.id}}" data-type="1" data-praise="{{topic.like.isLike === false ? 1 : 0}}" data-count={{topic.like.userQuantity}}>
                <em class="icon icon-collection">&#xeac9;</em>
                {{topic.like.userQuantity}}
            </a>
            <a href="javascript:;" class="a-share">
                <em class="icon icon-share">&#xe9ed;</em>
                {{if topic.replyQuantity === 0}}
                    <span>0</span>
                {{else}}
                    <span>{{topic.replyQuantity+topic.subReplyQuantity}}</span>
                {{/if}}
            </a>
            <!-- <a data-action="shareto" data-surl="{{topics.groupDomain}}topic/detail?tid={{topic.id}}" data-stitle="这儿有我们志趣相投的小伙伴，快加入我们吧" data-spic="" href="javascript:;" class="a-share">
                <em class="icon icon-share"></em>分享到
            </a> -->
        </div>
    </div>
</div>
{{/if}}
{{/each}}