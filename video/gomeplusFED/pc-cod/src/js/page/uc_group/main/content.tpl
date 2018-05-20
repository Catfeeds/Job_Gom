{{each contents as content index}}
	<div class="circle-list" data-id="{{content.id}}">
		<div class="mg-negative">
			<div class="user-head"><a href="{{contents.group_domain}}circle/{{content.id}}.html" target="_blank"><img src="{{content.icon | showPic:'circle-default.png'}}" alt=""></a></div>
			<h3 class="user-name" data-node="user-name" data-id ="{{content.id}}" >{{content.name}}</h3>
			<div class="user-top-info">
				<ul class="clearfix">
					<li>
						<strong>{{content.memberQuantity}}</strong>
						<p>成员</p>
					</li>
					<li>
						<strong>{{content.topicQuantity}}</strong>
						<p>话题</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
{{/each}}