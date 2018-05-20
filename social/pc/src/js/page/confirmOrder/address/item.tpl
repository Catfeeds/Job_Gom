<tr data-id="{{addressId}}" data-dft="{{isDefault}}">
    <td width="10%">
        <div class="name-box name-no-bor">{{userName}}</div>
    </td>
    <td width="65%" data-addr="{{pcbaStr}}">
        <span title="{{userName}}" class="consignee-name hide" data-node="name">{{userName}}</span>
        <span title="" class="ship-address" data-node="area">{{pcba}}</span>
        <span class="phone-numb" data-node="phone">{{mobile}}</span>
    </td>
    <td width="25%" class="text-aglin-r">
        <span class="default-address-bj {{if isDefault !== 1}}hide{{/if}}" data-node="dftAddr">默认地址</span>
        <a href="javascript:;" data-action="delAddr">删除</a>
        <a href="javascript:;" data-action="editAddr">编辑</a>
        <a href="javascript:;" data-action="setDft" {{if isDefault === 1}}style="visibility:hidden"{{/if}}>设置为默认地址</a>
    </td>
</tr>