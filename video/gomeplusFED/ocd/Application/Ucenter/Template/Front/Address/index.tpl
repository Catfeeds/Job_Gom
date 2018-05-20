<?php
    $csspath = 'usercenter/shipaddress.css';
    $jspath = '/js/conf/address.js';
?>
<include file="Home@Front/Public/header" />

<div class="wrap-box marg-t20">
	<include file="Front/Public/left" />
	<div class="ship-addr-right" style="width:963px;">   	
        <div class="new-add-addr <if condition="($num eq 0)">hide</if>" data-node="addrNew">
            <a href="javascript:" class="pc-btn pc-btnw130 pc-btnh35 <if condition="($num egt $maxNum )">btn-default</if>" data-action="addAddr">新增收货地址</a>&nbsp;&nbsp;&nbsp;您已创建<span data-node="addrNum"><{$num}></span>个收货地址，最多可创建<{$maxNum}>个
        </div>
        <table class="ship-addr-table <if condition="($num eq 0)">hide</if>"  data-node="addressList">
            <tr>
                <th width="17%">收货人</th>
                <th width="28%">所在地址</th>
                <th width="25%">详细地址</th>
                <th width="17%">手机/电话</th>
                <th width="13%">操作</th>
            </tr>
            <foreach name="list" item="address_item" key="address_key">
		    <tr data-id="<{$address_item.id}>" <if condition="($address_item.isDefault eq '1' )">data-dft="1"</if>>
                <td class="reciever">
                    <span class="name" data-node="name"><{$address_item.userName}></span>
                    <if condition="($address_item.isDefault == '1' )">
                    <span class="default-addr" data-node="dftAddr">默认地址</span>
                    <span class="default-addr set-default-addr set-default-hide" data-action="setDft">设为默认地址</span>
                    <else />
                    <span class="default-addr set-default-hide" data-node="dftAddr">默认地址</span>
                    <span class="default-addr set-default-addr set-default-hide" data-action="setDft">设为默认地址</span>
                    </if>
                </td>
                <td class="address" data-node="area" data-address='{"provinceId":"<{$address_item.provinceId}>","provinceName":"<{$address_item.provinceName}>","cityId":"<{$address_item.cityId}>","cityName":"<{$address_item.cityName}>","boroughId":"<{$address_item.boroughId}>","boroughName":"<{$address_item.boroughName}>","areaId":"<{$address_item.areaId}>","areaName":"<{$address_item.areaName}>","idCard":"<{$address_item.idCard}>"}'><{$address_item.provinceName}><{$address_item.cityName}><{$address_item.boroughName}><{$address_item.areaName}></td>
                <td class="detailed-addr" data-node="addr"><{$address_item.address}></td>
                <td class="tel" data-node="phone"><{$address_item.mobile}></td>
                <td>
                    <a href="javascript:;" class="amend-link" data-action="editAddr">修改</a>
                    <span>|</span>
                    <a href="javascript:;" class="delete-link" data-action="delAddr">删除</a>
                </td>
            </tr>
            </foreach>
        </table>
        <div class="no-address <if condition="($num gt 0)">hide</if>" data-node="addrNo">
          <img src="<{$pcimgpath}>/images/public/circle-disband-bg.png" width="192" height="100">
          <p>您还未设置收货地址，请点击下方按钮设置您的收货地址</p> <a href="javascript:;" class="pc-btn pc-btnw130 pc-btnh35" data-action="addAddr">新增收货地址</a>
        </div>
    </div>
</div>
<include file="Home@Front/Public:footer" />