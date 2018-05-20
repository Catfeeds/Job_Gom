

	<div data-node="tTicketBox" style="display: {{tDisplay}}">
		
		<h3>可领取优惠券</h3>
	    <ul class="clearfix">
	        	
			{{each ticketList}}
				<li>
	              	<h4>{{shopName}}</h4>
	              	<p>
	              		<span data-node="ticketMoney">{{ticketList[$index].money}}</span>元
	              		<em  style="display:{{ticketList[$index].quantities[0].show}}"><span data-node="tTicketNum">{{ticketList[$index].quantities[0].remainingReceiveQuantity}}</span>张</em>
	              	</p>
	              	<p>满<strong data-node="ticketMin">{{ticketList[$index].usageRule.minAmount}}</strong>元可用</p>
	              	<div class="quan-time">
	              		有效期：
	              		{{if !ticketList[$index].showDay}}
	              			<span data-node="tStart">{{ticketList[$index].useStartTime}}</span>-<span data-node="tEnd">{{ticketList[$index].useEndTime}}</span>
	              		{{else}}
	              			领到券后{{ticketList[$index].timeLong}}天内可用
	              		{{/if}}
	              	</div>
	              	<a href="javascript:;" data-id="{{ticketList[$index].batchSn}}" data-action="getTicket" data-type="{{ticketList[$index].timeType}}"  data-second="{{ticketList[$index].timeLimit}}">点击领取</a>
	              	<div class="small-mask" data-node="coupon-mask">您还可以领取2张</div>
	            </li>
			{{/each}}
	    </ul>
	</div>
	
	
	<div data-node="mTicketBox" style="display: {{display}}">
		
		<h3 data-node="myTicketTitle">已领取</h3>
		<ul class="clearfix" data-node="myTicketList">
			{{if show}}
				{{each myTickets}}
					<li data-node="{{myTickets[$index].batchSn}}">
		                <h4>{{shopName}}</h4>
		                <p><span>{{myTickets[$index].batch.money}}</span>元
		                <em style="display:{{myTickets[$index].show}}"><span data-node="mTicketNum">{{myTickets[$index].couponsQuantity}}</span>张</em>
		                </p>
		                <p>消费<strong>{{myTickets[$index].batch.usageRule.minAmount}}</strong>元可用</p>
		                <div class="quan-time">有效期：<span data-node="mStart">{{myTickets[$index].validStartTime}}</span>—<span data-node="mEnd">{{myTickets[$index].validEndTime}}</span></div><em class="icon-quan"></em>
		            </li>
				{{/each}}
			{{/if}}
		</ul>
	</div>

