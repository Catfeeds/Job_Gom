<li class="clearfix" data-groupid="{{groupId}}" data-topicid="{{topicId}}" data-node="topicItem">
	<a class="pic" target="_blank" href="{{link}}">
		<img src="{{pic}}" onerror="imgError(this, 'm')">
	</a>
	<a class="con" href="{{link}}">{{titleName}}</a>
	<div class="date">发布时间:{{updataTime}}</div>
	<div class="oparate">
  		<a class="edit" target="_blank" href="/article/publish?tid={{topicId}}&from=1">编辑</a>
  		<a class="delete" href="javascript:;" data-action="delTopic">删除</a>
  	</div>
</li>