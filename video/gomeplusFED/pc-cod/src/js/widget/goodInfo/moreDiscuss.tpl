
{{each data}}
<dl data-node="comments" class="clearfix">
  <dt><img src={{data[$index].creater.facePicUrl}} onerror="imgError(this)"/></dt>
  <dd> 
    <div class="list-name"><a href="javascript:;">{{data[$index].creater.nickname}}</a><span>{{data[$index].createTime}}</span></div>
    <p>{{data[$index].content === '' ? '收到宝贝了，还不错' : data[$index].content }}</p>
    <!-- <div class="list-state"><span>颜色：白色</span><span>尺码：27</span></div> -->
    <div data-node="imgPreviewList" class="list-img clearfix">
    	
    	{{each data[$index].images}}
        <a href="javascript:;">
    		  <img src={{$value}} alt=""/>
        </a>
		{{/each}}
    </div>
    {{if data[$index].replyContent }}
    <div class="list-name shop-keeper"><a>商家回复</a><span>{{data[$index].replyTime}}</span></div>
    <p>{{data[$index].replyContent}}</p>
    {{/if}}
  </dd>
</dl>
{{/each}}