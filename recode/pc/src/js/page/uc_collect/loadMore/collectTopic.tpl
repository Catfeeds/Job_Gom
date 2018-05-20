
{{each list as value}}
{{if !value.newComponents.item && !value.newComponents.image && !value.newComponents.video}}
<div class="circle-box no-pic" data-node="dataListBox" id="{{value.id}}" groupId="{{value.groupId}}" delId="{{value.delId}}">
{{else}}
<div class="circle-box" data-node="dataListBox" id="{{value.id}}" groupId="{{value.groupId}}" delId="{{value.delId}}">
{{/if}}
    <div class="mg-negative">
        <em class="icon-del" data-action="showDelLayer"></em>
        {{if list.type == 'collect'}}
	        {{if value.newComponents.item || value.newComponents.image || value.newComponents.video}}
	        <span class="topic-tag" data-node="userName">
	        	<em class="icon-lysy"><img src="{{value.user.facePicUrl}}" alt=""></em>{{value.user.nickname}}
			</span>
			{{/if}}
		{{/if}}
        <!-- 显示顺序: 商品,图片,店铺 -->
        {{if value.newComponents.item}}
        <div class="list-img">
            <a href="{{list.groupDomain}}topic/{{value.id}}.html" target="_blank">
                <!-- 话题详情展示 -->
                <img src="{{value.imageShow}}" onerror="imgError(this)" title="">
            </a>
        </div>
        {{else if value.newComponents.image}}
        <div class="list-img">
            <a href="{{list.groupDomain}}topic/{{value.id}}.html" target="_blank"><img src="{{value.imageShow}}" title=""></a>
        </div>
        {{else if value.newComponents.video}}
         <div class="list-img">
            <a href="{{list.groupDomain}}topic/{{value.id}}.html" target="_blank">
                <img src="{{value.imageShow}}" onerror="imgError(this)" title="">
                <em class="icon-play"></em>
            </a>
        </div>
        {{/if}}
        <div class="list-box">
        	{{if list.type == 'collect'}}
	        	{{if !value.newComponents.item && !value.newComponents.image && !value.newComponents.video}}
	            <span class="topic-tag topic-tag-static" data-node="userName">
	            	<em class="icon-lysy"><img src="{{value.user.facePicUrl}}" alt=""></em>{{value.user.nickname}}
				</span>
	            {{/if}}
            {{/if}}
	        <p class="list-title">
                {{if value.isUpper}}
                <em class="set-top">置顶</em>
                {{/if}}
                {{if value.isEssence}}
                <em class="set-spark">精品</em>
                {{/if}}
                {{if value.style === 1}}
                <em class="set-access">专访</em>
                {{/if}}
                <a data-node="list_title" href="{{list.groupDomain}}topic/{{value.id}}.html" target="_blank">{{#{str:value.nameShow,isEssence:value.isEssence,isUpper:value.isUpper} | truncateLenByJson:'52'}}</a>
	        </p>
	        <p class="text-icon clearfix">
	        	<span><em class="icon-like"></em>{{value.like.userQuantity}}</span>
	        	<span><em class="icon-discuss"></em>{{value.replyShow}}</span>
	        </p>
	        {{if value.textShow !== ""}}
	        <p class="list-description"><a href="{{list.groupDomain}}topic/{{value.id}}.html" target="_blank">{{#value.textShow | truncateByteLen:'52'}}</a></p>
	        {{/if}}
	        <p class="list-time">{{value.createTimeStr}}</p>
	        <p class="list-tag">来自圈子 ：<a href="{{list.groupDomain}}circle/{{value.groupId}}.html" target="_blank">{{value.group.name}}</a></p>
        </div>
    </div>
    <div class="del-btn hide" data-node="delPopUp">
        <div class="del-text">
        	<a class="btn-close" href="javascript:;" data-action="cancelDel"></a>
            <p>确定要删除？</p>
                <div class="text-center">
                	<a href="javascript:;" class="pc-btn" data-action="delOne">确定</a>
                	<a href="javascript:;" class="pc-btn pc-bj-fff" data-action="cancelDel">取消</a>
                </div>
        </div>
    </div>
    <div class="del-all hide" data-node="selectLayer">
        <em class="icon-check" data-action="selectOne"></em>
    </div>
</div>
{{/each}}

