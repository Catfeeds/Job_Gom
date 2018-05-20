{{each list as value}}
<li id="{{value.id}}">
    <div class="img">
    	<a href="{{list.groupDomain}}topic/{{value.id}}.html" target="_blank" title="{{value.name}}">
    		<img src="{{value.imageShow}}" alt="" onerror="imgError(this)">
		</a>
    </div>
    <div class="text">
    	<a href="{{list.groupDomain}}topic/{{value.id}}.html" target="_blank" title="{{value.name}}">{{value.name}}</a>
    	<span><em class="icon-like"></em>{{value.like.userQuantity}}</span>
    	<span><em class="icon-discuss"></em>{{value.replyShow}}</span>
    </div>
</li>
{{/each}}


