<div class="tab-quan clearfix">
	<a href="javascript:;" class="active" data-action="ticketTab">未领取</a>
	<a href="javascript:;" data-action="ticketTab">已领取</a>
</div>
<div class="tab-list">
	<div data-node="ticketLoading" class="tab-loading" >
		<img src="{{imgUrl}}/images/public/loading.gif" alt="">
	</div>
	<div data-node="ticketBox" style="display:none;">
		<div class="tab-message" data-node="ticketFail">数据加载失败，点击重新加载</div>
		<ul class="clearfix" data-node="ticketList"></ul>
		<div class="tab-message" data-node="ticketLose" >优惠券已失效</div>
	</div>
	<div data-node="ticketBox" style="display:none;">
		<div class="tab-message" data-node="ticketFail">数据加载失败，点击重新加载</div>
		<div class="tab-message" data-node="ticketNormal">您还没有优惠券，点击去<a href="javascript:;" data-action="toGetTicket">领取</a>吧！</div>
		<ul class="clearfix" data-node="ticketList"></ul>
	</div>
</div>