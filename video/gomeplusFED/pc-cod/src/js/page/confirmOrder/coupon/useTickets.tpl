<!--确认订单-优惠券-->
<!-- 
  <div class="ui-dialog-arrow-a"></div>
  <div class="ui-dialog-arrow-b"></div> -->
  <table class="ui-dialog-grid">
    <tbody>
      <tr>
        <td class="ui-dialog-header">
          <button i="close" title="取消" href="javascript:;" class="icon icon-close">&times;</button>
          <div data-node="ticketsMenu" class="ui-dialog-title coupon-title">
            <a href="javascript:;" {{if platShow}}class="active"{{/if}}>平台优惠券{{if platShow}}<em class="up-arrow"></em>{{/if}}</a>
            <a href="javascript:;" {{if shopShow}}class="active"{{/if}}>店铺优惠券{{if shopShow}}<em class="up-arrow"></em>{{/if}}</a>
          </div>
        </td>
      </tr>
      <tr>
        <td data-node="ticketsList" class="ui-dialog-body">
          <!-- 平台优惠券 -->
          <div data-node="ticketsBox" class="coupon-box" style="{{if shopShow}}display: none;{{/if}}">
          {{if platRedPackList.length}}
          {{each platRedPackList as pp i}}
            <div class="clearfix">
              <label><span data-action="ticketRadio" data-index="p-{{i}}" data-discount="{{pp.money}}" data-ticketid="{{pp.id}}" data-info='{"id":{{pp.id}},"planId":{{pp.planId}},"couponPlat":0}' class="menu-radio {{if pp.isFirst}}menu-radio-checked{{/if}}"></span>满{{pp.baseMoney | f2Y}}减{{pp.money | f2Y}}</label><span class="time">{{pp.startTime | dateFormat:'Y.M.D'}}-{{pp.endTime | dateFormat:'Y.M.D'}}</span>
            </div>
          {{/each}}
          {{else}}
            <div class="clearfix">
              没有可用平台优惠券
            </div>
          {{/if}}
            
          </div>
          <!-- 店铺优惠券 -->
          <div data-node="ticketsBox" class="coupon-box" style="{{if platShow}}display: none;{{/if}}">
          {{if shopList.length}}
            {{each shopList as sp i}}
            <div>
              <div class="shop"><em class="icon icon-shop">&#xe9df;</em>{{sp.shopName}}</div>
                {{if sp.redPackList.length}}
                  {{each sp.redPackList as sprl j}}
                    <div class="clearfix">
                      <label><span data-action="ticketRadio" data-index="s-{{i}}-{{j}}" data-discount="{{sprl.money}}" data-shopid="{{sp.providerId}}" data-ticketid="{{sprl.id}}" data-info='{"id":{{sprl.id}},"planId":{{sprl.planId}},"couponPlat":0}' class="menu-radio {{if sprl.isFirst}}menu-radio-checked{{/if}}"></span>满{{sprl.baseMoney | f2Y}}减{{sprl.money | f2Y}}</label><span class="time">{{sprl.startTime | dateFormat:'Y.M.D'}}-{{sprl.endTime | dateFormat:'Y.M.D'}}</span>
                    </div>
                  {{/each}}
                {{/if}}
            </div>
            {{/each}}
          {{else}}
            <div class="clearfix">
              没有可用店铺优惠券
            </div>
          {{/if}}

          </div>
        </td>
      </tr>
    </tbody>
  </table>