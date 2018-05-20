{{if data.data.topTopics.length != 0 || data.data.topics.length != 0}}
	<div class="circle-lists-cell">
      <ul class="circle-l-c-wrap clearfix">
      {{if data.data.topTopics.length != 0}}
      	{{each data.data.topTopics as key}}
	        <li class="circle-l-c-w-minute " modelid="PQZQBHTlt0002">
				<div class="circle-l-c-w-m-wrap clearfix">
					<div class="circle-l-c-w-m-user clearfix">
						<a target="_blank" href="{{domain}}ta/{{key.user.id}}.html"><img class="circle-l-c-w-m-u-icon" onerror="imgError(this, 'h')" src="{{key.user.facePicUrl}}"></a>
						<a target="_blank" href="{{domain}}ta/{{key.user.id}}.html"><span class="circle-l-c-w-m-u-name">{{key.user.nickname}}</span></a>
					</div>
					<div class="circle-l-c-w-m-title clearfix">
						<span class="circle-l-c-w-m-titlewrap">
						{{if key.isUpper}}
						<i class="circle-l-c-w-m-titletop">置顶</i>
						{{/if}}
						{{if key.isEssence}}
						<i class="circle-l-c-w-m-titlequality">精品</i>
						{{/if}}
						{{if key.style == "1"}}
						<i class="circle-l-c-w-m-titleinterview">专访</i>
						{{/if}}
						</span>
						<a target="_blank" title="{{key.name}}" href="{{domain}}topic/{{key.id}}.html"><h3>{{#key.name | truncateByteLen:'78'}}</h3></a>
					</div>

						<div class="circle-l-c-w-m-paper"><p><a target="_blank" title="{{key.name}}" href="{{domain}}topic/{{key.id}}.html">{{#key.text | truncateByteLen:'150'}}</a></p></div>
						{{if key.images_lst.length != 0}}
						<div class="circle-l-c-w-m-imagepreview clearfix">
						{{each key.images_lst as val}}
							{{if val.type == "image"}}
								<a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="{{val.name}}" href="{{domain}}topic/{{key.id}}.html">
								<div class="circle-imagepreview-img"><img onerror="imgError(this, 'm')" alt="{{val.name}}" src="{{val.mainImage}}"></div>
								</a>
							{{/if}}
							{{if val.type == "video"}}
								<a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="{{val.name}}" href="{{domain}}topic/{{key.id}}.html">
		                        <div class="circle-imagepreview-img circle-imagepreview-play"><img src="{{val.mainImage}}" alt="{{val.name}}">
		                          <div class="circle-i-p-icon"></div>
		                        </div></a>
							{{/if}}
							{{if val.type == "item"}}
								<a class="circle-l-c-w-m-imagepreviewhover" target="_blank" href="{{domain}}topic/{{key.id}}.html">
								<div class="circle-imagepreview-goods">
								<img onerror="imgError(this, 'm')" alt="{{val.name}}" src="{{val.mainImage}}">
								<div class="circle-i-goodsmask clearfix">
								<div class="circle-i-g-price"><span class="circle-i-g-p-currency">￥</span><span class="circle-i-g-p-pricecount">{{val.salePrice !== null?val.salePrice:'暂无售价'}}</span></div>
								<div class="circle-i-g-icon">
								<i class="circle-i-g-i-icon"></i>
								</div></div>
								<div class="circle-i-goodstitle"><span>{{val.name}}</span></div>
								</div>
								</a>
							{{/if}}
						{{/each}}
								</div>
						{{/if}}
										<div class="circle-l-c-w-m-state clearfix">
						<div class="circle-l-c-w-m-s-left"><em class="iconn-75"></em><span class="circle-l-c-w-m-s-l-timedate">{{key.time_str}}</span></div>
						<div class="circle-l-c-w-m-s-right">
							<ul class="circle-l-c-w-m-s-r-tool">
								<li><em class="icon iconn-10"></em><span class="circle-l-c-w-m-s-r-islikecount">{{key.like.userQuantity}}</span></li>
								<li><em class="icon iconn-11"></em><span class="circle-l-c-w-m-s-r-iscommetcount">{{key.replyQuantity}}</span></li>
								<li><em class="icon iconn-57"></em><span class="circle-l-c-w-m-s-r-isstarcount">{{key.topicCollectionQuantity}}</span></li>
							</ul>
						</div>
					</div>
				</div>
			</li>
	      {{/each}}
        {{/if}}
        {{if data.data.topics.length != 0}}
      	{{each data.data.topics as key}}
	        <li class="circle-l-c-w-minute " modelid="PQZQBHTlt0002">
				<div class="circle-l-c-w-m-wrap clearfix">
					<div class="circle-l-c-w-m-user clearfix">
						<a target="_blank" href="{{domain}}ta/{{key.user.id}}.html"><img class="circle-l-c-w-m-u-icon" onerror="imgError(this, 'h')" src="{{key.user.facePicUrl}}"></a>
						<a target="_blank" href="{{domain}}ta/{{key.user.id}}.html"><span class="circle-l-c-w-m-u-name">{{key.user.nickname}}</span></a>
					</div>
					<div class="circle-l-c-w-m-title clearfix">
						<span class="circle-l-c-w-m-titlewrap">
						{{if key.isUpper}}
						<i class="circle-l-c-w-m-titletop">置顶</i>
						{{/if}}
						{{if key.isEssence}}
						<i class="circle-l-c-w-m-titlequality">精品</i>
						{{/if}}
						{{if key.style == "1"}}
						<i class="circle-l-c-w-m-titleinterview">专访</i>
						{{/if}}
						</span>
						<a target="_blank" title="{{key.name}}" href="{{domain}}topic/{{key.id}}.html"><h3>{{#key.name | truncateByteLen:'78'}}</h3></a>
					</div>

						<div class="circle-l-c-w-m-paper"><p><a target="_blank" title="{{key.name}}" href="{{domain}}topic/{{key.id}}.html">{{#key.text | truncateByteLen:'150'}}</a></p></div>
						{{if key.images_lst.length != 0}}
						<div class="circle-l-c-w-m-imagepreview clearfix">
						{{each key.images_lst as val}}
							{{if val.type == "image"}}
								<a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="{{val.name}}" href="{{domain}}topic/{{key.id}}.html">
								<div class="circle-imagepreview-img"><img onerror="imgError(this, 'm')" alt="{{val.name}}" src="{{val.mainImage}}"></div>
								</a>
							{{/if}}
							{{if val.type == "video"}}
								<a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="{{val.name}}" href="{{domain}}topic/{{key.id}}.html">
		                        <div class="circle-imagepreview-img circle-imagepreview-play"><img src="{{val.mainImage}}" alt="{{val.name}}">
		                          <div class="circle-i-p-icon"></div>
		                        </div></a>
							{{/if}}
							{{if val.type == "item"}}
								<a class="circle-l-c-w-m-imagepreviewhover" target="_blank" href="{{domain}}topic/{{key.id}}.html">
								<div class="circle-imagepreview-goods">
								<img onerror="imgError(this, 'm')" alt="{{val.name}}" src="{{val.mainImage}}">
								<div class="circle-i-goodsmask clearfix">
								<div class="circle-i-g-price"><span class="circle-i-g-p-currency">￥</span><span class="circle-i-g-p-pricecount">{{val.salePrice !== null?val.salePrice:'暂无售价'}}</span></div>
								<div class="circle-i-g-icon">
								<i class="circle-i-g-i-icon"></i>
								</div></div>
								<div class="circle-i-goodstitle"><span>{{val.name}}</span></div>
								</div>
								</a>
							{{/if}}
						{{/each}}
								</div>
						{{/if}}
										<div class="circle-l-c-w-m-state clearfix">
						<div class="circle-l-c-w-m-s-left"><em class="iconn-75"></em><span class="circle-l-c-w-m-s-l-timedate">{{key.time_str}}</span></div>
						<div class="circle-l-c-w-m-s-right">
							<ul class="circle-l-c-w-m-s-r-tool">
								<li><em class="icon iconn-10"></em><span class="circle-l-c-w-m-s-r-islikecount">{{key.like.userQuantity}}</span></li>
								<li><em class="icon iconn-11"></em><span class="circle-l-c-w-m-s-r-iscommetcount">{{key.replyQuantity}}</span></li>
								<li><em class="icon iconn-57"></em><span class="circle-l-c-w-m-s-r-isstarcount">{{key.topicCollectionQuantity}}</span></li>
							</ul>
						</div>
					</div>
				</div>
			</li>
	      {{/each}}
        {{/if}}
      </ul>
    </div>
{{/if}}
{{if data.data.topTopics.length == 0 && data.data.topics.length == 0 && data.data.totalTopicQuantity == 0}}
	{{if type == 0}}
		<div class="circle-nonetopic">
	      	<div class="circle-nt-center">
	        	<div class="circle-nt-c-left"></div>
	        	<div class="circle-nt-c-right"><span>暂无话题，快来抢占沙发，</span>发布话题<span>&nbsp;吧！</span></div>
	        </div>
        </div>
    {{/if}}
    {{if type == 1}}
		<div class="circle-nonequality">
            <div class="circle-nq-center">
                <div class="circle-nq-c-left"></div>
                <div class="circle-nq-c-right"><span>还没有精选话题</span></div>
            </div>
        </div>
    {{/if}}
{{/if}}
{{if !data.data.topTopics && !data.data.topics}}
	<div class="circle-nonetopic">
	  	<div class="circle-nt-center">
	    	<div class="circle-nt-c-left"></div>
	    	<div class="circle-nt-c-right"><span>暂无话题，快来抢占沙发，</span>发布话题<span>&nbsp;吧！</span></div>
	    </div>
	</div>
{{/if}}

