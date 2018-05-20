<div data-node="loading" style="display:none" class="loading"><img src="{{'loading' | randomShowPic}}" alt=""></div>
<p data-node="reload" style="display:none" class="failed-txt">数据获取失败，点击重新加载！</p>
<ul class="chosed-circle-box">
    {{if created.length > 0}}
    <li class="clearfix">
        <h4>我创建的圈子</h4>
        {{each created as group}}
        <dl data-id="{{group.id}}" data-name="{{group.name}}">
            <dt>
            {{if group.icon && group.icon.length > 0}}
                <img src="{{group.icon}}" title="{{group.name}}">
            {{else}}
                <img src="{{'face' | randomShowPic}}" title="{{group.name}}">
            {{/if}}
            </dt>
            <dd><a href="javascript:;">{{group.name}}</a></dd>
        </dl>
        {{/each}}
    </li>
    {{/if}}
    {{if joined.length > 0}}
    <li class="clearfix">
        <h4>我加入的圈子</h4>
        {{each joined as group}}
        <dl data-id="{{group.id}}" data-name="{{group.name}}">
            <dt>
            {{if group.icon && group.icon.length > 0}}
                <img src="{{group.icon}}" title="{{group.name}}">
            {{else}}
                <img src="{{'face' | randomShowPic}}" title="{{group.name}}">
            {{/if}}
            </dt>
            <dd><a href="javascript:;">{{group.name}}</a></dd>
        </dl>
        {{/each}}
    </li>
    {{/if}}
    {{if recommend.length > 0}}
    <li class="clearfix">
        <h4>推荐圈子</h4>
        {{each recommend as group}}
        <dl data-id="{{group.id}}" data-name="{{group.name}}">
            <dt>
            {{if group.icon && group.icon.length > 0}}
                <img src="{{group.icon}}" title="{{group.name}}">
            {{else}}
                <img src="{{'face' | randomShowPic}}" title="{{group.name}}">
            {{/if}}
            </dt>
            <dd><a href="javascript:;">{{group.name}}</a></dd>
        </dl>
        {{/each}}
    </li>
    {{/if}}
</ul>
