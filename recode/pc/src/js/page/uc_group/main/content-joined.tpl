{{each contents as content index}}
	<div class="circle-box" data-id="{{content.id}}">
		<em class="icon-del" data-action="del-circle"></em>
		<div class="mg-negative">
			<div class="list-img">
				<div class="author clearfix">
					<a target="_blank" href="{{contents.group_domain}}ta/{{content.user.id}}.html">
						<img src="{{content.user.facePicUrl}}" onerror="imgError(this, 'h')">
						<span>{{content.user.nickname}}</span>
					</a>
				</div>
				<a target="_blank" href="{{contents.group_domain}}circle/{{content.id}}.html">
					<img src="{{content.icon}}" onerror="imgError(this, 'g')">
				</a>
				<div class="list-box">
					<p class="list-title">
						<a target="_blank" href="{{contents.group_domain}}circle/{{content.id}}.html">{{content.name}}</a>
					</p>
					<div>
						<a target="_blank" href="{{contents.group_domain}}circle/{{content.id}}.html">
							<span class="marr28">成员：{{content.memberQuantity}}</span>
							<span>话题：{{content.topicQuantity}}</span>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="del-btn hide" data-node="delPopUp">
		    <div class="del-text">
		    	<a class="btn-close" href="javascript:;" data-action="cancelDel"></a>
		        <p>确定退出圈子？</p >
	            <div class="text-center">
	            	<a href="javascript:;" class="pc-btn pc-bj-fff" data-action="cancelDel">取消</a>
	            	<a href="javascript:;" class="pc-btn" data-action="delOne"  data-id="{{content.id}}">确定</a>
	            </div>
		    </div>
		</div>
	</div>
{{/each}}