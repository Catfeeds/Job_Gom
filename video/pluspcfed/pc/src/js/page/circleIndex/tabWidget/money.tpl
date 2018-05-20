
{{each data as v i}}
	<li class="slider-item-container" data-id="{{v.product_id}}">
		<!-- 商品详情页url -->
		<a href="{{v._product_url}}"  target="_blank" title="{{v.cmsName}}">
			<div  class="backgroundImg" style="width: 600px;height:390px">
				<img src="{{v.cmsImage}}">
			</div>
		</a>
		<div class="item-big-one-bottom clearfixclass="item-big-one-price"">
			<p class="item-big-one-price">
			<!-- 商品详情页url -->
				<a href="{{v._product_url}}" target="_blank">
					<span class="item-b-o-title overflow-one">
					{{v.cmsName}}</span>
				</a>
			</p>
			<p class="item-b-o-p">
				<!-- 是否有返利 -->
				{{if v.mostRebate > 0}}
				<span class="item-b-o-rebate">
				 	<i>返利</i>
				</span>
				{{/if}}
				<span class="item-b-o-price">{{v.salePrice}}</span>
				<em>¥</em>
			</p>
		</div>
	</li>
{{/each}}
