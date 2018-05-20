<tr data-id="{{addressId}}" data-dft="{{isDefault}}">
	<td class="reciever">
		<span class="name" data-node="name">{{userName}}</span>
		<span class="default-addr {{if isDefault === 0}}set-default-hide{{/if}}" data-node="dftAddr">默认地址</span>
		<span class="default-addr set-default-addr set-default-hide" data-action="setDft">设为默认地址</span>
	</td>
	<td class="address" data-node="area" data-address="{{pcbaStr}}">{{pcba}}</td>
	<td class="detailed-addr" data-node="addr">{{address}}</td>
	<td class="tel" data-node="phone">{{mobile}}</td>
	<td>
		<a href="#" class="amend-link" data-action="editAddr">修改</a>
		<span>|</span>
		<a href="#" class="delete-link" data-action="delAddr">删除</a>
	</td>
</tr>