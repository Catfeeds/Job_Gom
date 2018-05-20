<div class="index-login" data-node="index-login">
	<a href={{iDomain}}index class="name-color">
		<div class="index-login-head">
			{{if isExpert === true }}
				<em class="icon-daren"></em>
			{{/if}}
			<img src="" data-node="headImg"/>
		</div>
		<span data-node="headName"></span>
	</a>
	<div class="login-link">
		<div class="sanjiao"></div>
		<a href={{iDomain}}order target="_blank">我的订单</a>
		<a href={{iDomain}}topic target="_blank">我的话题</a>
		<a href={{iDomain}}expert target="_blank">{{daren}}</a>
		<a href={{iDomain}}group target="_blank">我的圈子</a>
		<a href={{iDomain}}collect target="_blank">我的收藏</a>
		<a href={{iDomain}}address target="_blank">收货地址</a>
		<a href={{iDomain}}customerInfo target="_blank">我的售后</a>
		<a href={{iDomain}}coupon target="_blank">我的优惠券</a>
		<a href={{passDomain}}login/logout data-node="">退出</a>
	</div>
</div>