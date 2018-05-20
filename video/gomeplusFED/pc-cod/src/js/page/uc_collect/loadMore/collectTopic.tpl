{{each list as value}}
{{if !value.topic.new_components.item && !value.topic.new_components.image && !value.topic.new_components.video}}
<div class="circle-box no-pic" data-node="dataListBox" id="{{value.id}}">
{{else}}
<div class="circle-box" data-node="dataListBox" id="{{value.id}}">
{{/if}}
    <div class="mg-negative">
        <em class="icon icon-del" data-action="showDelLayer">&#xea05;</em>
        {{if !value.topic.new_components.item && !value.topic.new_components.image && !value.topic.new_components.video}}
        <span class="topic-tag topic-tag-static">
        {{else}}
        <span class="topic-tag">
        {{/if}}
            <em class="icon-lysy">
                <img src="{{value.topic.user.facePicUrl}}" onerror="imgError(this)" title="{{value.topic.user.nickname}}">
            </em>
            {{value.topic.user.nickname}}
        </span>
        <!-- 显示顺序: 商品,图片,店铺 -->
        {{if value.topic.new_components.item}}
        <div class="list-img">
            <a href="{{list.groupDomain}}topic/{{value.topicId}}.html" target="_blank">
                <!-- 话题详情展示 -->
                <img src="{{value.topic.new_components.item.item.mainImage}}" onerror="imgError(this)" title="">
            </a>
        </div>
        <p class="list-price">
            ¥   <span>{{value.topic.new_components.item.item.salePrice}}</span>
            {{if value.topic.new_components.item.item.rebateSummary && value.topic.new_components.item.item.rebateSummary.refRebateMoney > 0}} 
            <em class="fan-tag">返</em>
            {{/if}}
        </p>
        {{else if value.topic.new_components.image}}
        <div class="list-img">
            <a href="{{list.groupDomain}}topic/{{value.topicId}}.html" target="_blank"><img src="{{value.topic.new_components.image.url}}" title=""></a>
        </div>
        {{else if value.topic.new_components.video}}
         <div class="list-img">
            <a href="{{list.groupDomain}}topic/{{value.topicId}}.html" target="_blank">
                <img src="{{value.topic.new_components.video.coverImage}}" onerror="imgError(this)" title="">
                <em class="icon-play"></em>
            </a>
        </div>
        {{/if}}
        <div class="list-title">
            <p class="list-title-content" data-node="list_nav">
                {{if value.topic.isUpper}}
                <em class="set-top">置顶</em>
                {{/if}}
                {{if value.topic.isEssence}}
                <em class="set-spark">精品</em>
                {{/if}}
                {{if value.topic.style === 1}}
                <em class="set-access">专访</em>
                {{/if}}
                <a data-node="list_title" href="{{list.groupDomain}}topic/{{value.topicId}}.html" target="_blank">{{#{str:value.topic.name,isEssence:value.topic.isEssence,isUpper:value.topic.isUpper} | truncateLenByJson:'52'}}</a>
                <span class="list-title-time">{{value.collectedTimeStr}}</span>
            </p>
        </div>
    </div>
    <div class="del-btn hide" data-node="delPopUp">
        <div class="del-text">
            <p>确定要删除？</p>
                <div class="text-center"><a href="javascript:;" class="pc-btn pc-bj-fff" data-action="cancelDel">取消</a><a href="javascript:;" class="pc-btn" data-action="delOne">确定</a>
                </div>
        </div>
    </div>
    <div class="del-all hide" data-node="selectLayer">
        <em class="icon-check" data-action="selectOne"></em>
    </div>
</div>
{{/each}}