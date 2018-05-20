{{each contents as content index}}
	<div class="circle-box" data-id="{{content.id}}">
		<em class="icon-del"></em>
		<div class="mg-negative">
			<div class="list-img"><a href="javascript:;"><img src="https://i6.meixincdn.com/v1/img/T1GRYTB7KT1R4cSCrK.png"></a>
				<div class="list-box">
					<p class="list-title"><a href="#">空想家</a></p>
					<div><span class="marr28">成员：110</span><span>话题：238</span></div>
				</div>
			</div>
		</div>
	</div>



	<!-- <div class="circle-list" data-id="{{content.id}}">
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
	</div> -->
{{/each}}