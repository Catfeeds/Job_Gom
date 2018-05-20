
{{if data.length > 0 }}

	<ul class="clearfix" >
		{{each data}}
			<li data-node="comments">
                <div class="fr">
                	<a href="javascript:;">
                		<img src="{{$value.creater.facePicUrl}}" onerror="imgError(this)">{{$value.creater.nickname}}
                	</a>
                    <div class="star-box">
                    	{{each $value.solid}}
                    		<em class="iconn-43 active"></em>
                    	{{/each}}
                    	{{each $value.hollow}}
                    		<em class="iconn-43"></em>
                    	{{/each}}
                    </div>
                    <p><!-- 下单3天后评论<br> -->{{$value.createTime}}</p>
                </div>
                <div class="list-con">{{$value.content === '' ? '收到宝贝了，还不错' : $value.content }}</div>
                {{if $value.images.length > 0}}
	                <div class="list-img clearfix" data-node="imgPreviewList">
	                	{{ each $value.images }}
		                  	<a data-imgorigin="{{$value.origin}}" href="javascript:;">
		                  		<img src="{{$value.small}}">
		                  	</a>
	                  	{{/each}}
	                </div>
                {{/if}}
                <!-- <div class="list-img-big">
                	<span>
                		<em class="icon-narrow"></em>
                		<img src="https://i6.meixincdn.com/v1/img/T1GRYTB7KT1R4cSCrK.png">
                	</span>
                </div> -->
                {{if $value.replyContent !== undefined}}
                <div class="list-shop clearifx">
                	<span>商家回复</span>{{$value.replyContent}}
                </div>
                {{/if}}
            </li>
		{{/each}}
	</ul>
{{else}}
	<div class="comments-none">此商品暂无评论</div>
{{/if}}
