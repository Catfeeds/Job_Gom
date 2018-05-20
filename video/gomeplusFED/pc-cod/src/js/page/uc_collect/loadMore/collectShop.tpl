{{each list as value}}
<li id="{{value.id}}" data-node="dataListBox">
    <div class="mg-negative">
        <em class="icon icon-del" data-action="showDelLayer">&#xea05;</em>
    	<a href="{{list.mallDomain}}shop/{{value.shopId}}.html" target="_blank"><img src="{{value.shop.icon}}" onerror="imgError(this)"></a>	
		<div class="text-store">
			<a href="{{list.mallDomain}}shop/{{value.shopId}}.html" target="_blank">{{value.shop.name}}</a>
			<p>收藏时间：{{value.collectedTimeStr}}</p>
			<p>收藏人数：{{value.shopCollectionQuantity.quantity}}</p>
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