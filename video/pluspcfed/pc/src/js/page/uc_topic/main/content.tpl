{{each contents.content as content index}}
	{{if content.title && content.title.length}}
	<li><a href="{{contents.groupDomain}}topic/{{content.topid}}.html" class="title" target="_blank">{{content.title | truncateLen:'40'}}</a><span>{{content.time}}</span>
	<p>发表自圈子: <a href="{{contents.groupDomain}}circle/{{content.groupid}}.html" target="_blank">{{content.groupName}}</a></p>
	</li>
	{{/if}}
{{/each}}