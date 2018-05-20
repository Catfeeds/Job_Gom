<div class="ui-body-box">
  <div class="invoice-box">
    <h3 class="radio-title">发票类型：</h3>
    <div class="invoice-flot-lft">
      <label data-node="noInvoice" data-type="0"><span class="menu-radio {{if type==0}}menu-radio-checked{{/if}}"></span>不开票</label>
    </div>
    <div class="invoice-flot-lft">
      <label data-node="openInvoice"><span class="menu-radio {{if type>0}}menu-radio-checked{{/if}}"></span>普通发票</label>
    </div>
  </div>
  <div data-node="openInvoiceBox" class="{{if type==0}}hide{{/if}}">
  	<div class="invoice-box">
      <h3 class="radio-title">发票抬头：</h3>
  	  <div class="invoice-flot-lft">
  	    <label data-type="1"><span class="menu-radio {{if type<2}}menu-radio-checked{{/if}}"></span>个人</label>
  	  </div>
  	  <div class="invoice-flot-lft">
  	    <label data-type="2"><span class="menu-radio {{if type==2}}menu-radio-checked{{/if}}"></span>单位</label>
  	  </div>
  	</div>
  	<div class="please-enter"><em data-action="clear" class="icon close">&#xea5a;</em>
  	  <input data-node="invoiceInfo" data-type="{{type}}" type="text" value="{{title}}" placeholder="请输入发票抬头" class="input-error">
  	  <p class="error"><em class="icon">&#xe961;</em>请输入发票抬头信息</p>
  	</div>
  	<p class="invoice-content">发票内容：由供应商自行确定发票内容</p>
  </div>
</div>