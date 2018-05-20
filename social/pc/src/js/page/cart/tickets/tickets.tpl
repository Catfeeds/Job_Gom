{{each redPackList as v}}
<li class="padd-bon20">
  <div class="ticket-mn">￥<strong>{{v.money}}</strong></div>
  <div class="ticket-tip volume-margin8">
    <p>满{{v.baseMoney}}元可用</p>
    {{if v.timeType==0}}
    <span>{{v.bTime}} - {{v.eTime}}</span>
    {{else}}
    <span>领到券后{{v.timeLimit}}天内可用</span>
    {{/if}}
  </div>
  {{if v.quantities.remainingReceiveQuantity > 0}}
  <a data-action="getTicket" data-ticketid="{{v.id}}" href="javascript:;" class="btn-ticket">领取</a>
  {{else}}
  <a href="javascript:;" class="btn-ticket disabled">已领取</a>
  {{/if}}
</li>
{{/each}}