<ul class="shipping-input">
  <li>
    <label>选择快递公司：</label>
    <div class="express-select-box">
      <div class="express-select active" data-node="showLogistics" >
        
        <div class="selected" data-node="insertBox">请选择</div><em class="icon icon-down icon-up"></em>
      </div>
      <ul class="select-list" data-node="addMsgUL" style="max-height:140px;overflow-y:scroll">
        
      </ul>
       <p class="error-txt" data-node="addMsgNull"></p>
    </div>
  </li>
  <li>
    <label>选择快递单号：</label>
    <input type="text" placeholder="请输入20字以内的快递单号" class="express-number" data-node="logisticNo">
    <p class="error-txt" data-node="orderNumNull"></p>
  </li>
</ul>