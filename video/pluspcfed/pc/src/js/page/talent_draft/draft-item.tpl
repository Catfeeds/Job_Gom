<li class="clearfix {{data.lastCls}}" data-id="{{data.topicId}}">
    <div class="list-title"> <a href="{{data.editUrl}}" target="_blank">{{data.name}}</a></div>
    <div class="list-time">
        <p class="time-day">{{data.addDate}}</p>
        <p class="time-second">{{data.time}}</p>
    </div>
    <div class="list-operate">
        <p><a href="javascript:void(0);" data-node="editorTopic" data-src="{{data.editUrl}}">编辑</a></p>
        <p><a href="javascript:void(0);" data-action="delTopic">删除</a></p>
    </div>
</li>