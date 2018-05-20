{{each list as value}}
<li id="{{value.id}}" data-node="dataListBox">
    <div class="mg-negative">
        <em class="iconn-72 icon-del" data-action="showDelLayer"></em>
    	<a href="{{list.mallDomain}}product/{{value.shopId}}-{{value.itemId}}.html" target="_blank"><img src="{{value.item.mainImage}}" onerror="imgError(this)"></a>	
		<div class="btn-box">
			<a href="{{list.mallDomain}}product/{{value.shopId}}-{{value.itemId}}.html" target="_blank" class="pc-btn pc-btnh40">立即购买</a>
			<a href="{{list.mallDomain}}product/{{value.shopId}}-{{value.itemId}}.html" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a>
		</div>
		<div class="text">
		  <a href="{{list.mallDomain}}product/{{value.shopId}}-{{value.itemId}}.html" target="_blank">
			￥<span>{{value.item.salePrice}}</span>
			<p>{{value.item.name}}</p>
		  </a>
		</div>
	</div>	
	<div class="del-btn hide" data-node="delPopUp">
		<div class="del-text">
			<p>确定要删除？</p>
				<div class="text-center"><a href="javascript:;" class="pc-btn pc-bj-fff" data-action="cancelDel">取消</a><a href="javascript:;" class="pc-btn" data-action="delOne">确定</a>
				</div>
		</div>
	</div>
	<div class="del-all hide" data-node="selectLayer">
		<em class="icon-check" data-action="selectOne"></em>
	</div>    
</li>
{{/each}}