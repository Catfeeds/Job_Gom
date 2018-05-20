<table class="ui-dialog-grid">
  <tbody>
    <tr>
      <td class="ui-dialog-header">
        <button i="close" title="取消" href="javascript:;" class="icon icon-close">×</button>
        <div class="ui-dialog-title">国美币</div>
      </td>
    </tr>
    <tr>
      <td class="ui-dialog-body">
        <div class="gome-coin-box clearfix">
        <span class="menu-radio {{if checked}}menu-radio-checked{{/if}}" data-coin="{{coinVal}}" data-action="gomeCoinRadio"></span>
	<p>使用国美币（当前可用：￥<span class="coinVal">{{coinVal | f2Y}}</span>）</p>
        </div>
      </td>
    </tr>
  </tbody>
</table>