<?php
    $jspath = 'Address/editAddress.js';
?>
<include file="Public:header" />
	<div class="page">		
		<header class="header">
			<h1>编辑地址
				<span class="goback" id="goback"></span>
			</h1>
		</header>
		<div class="compile_address_con">
			<p><input id="username" type="text" value="<{$list.data.userName}>"></p>
			<p><input id="mobile" type="tel" value="<{$list.data.mobile}>"></p>
			<p>
				<select name="" id="province">
					<foreach name="list.provice" item="vo">
						<option <if condition="$list['data']['provinceId'] eq $vo['id']">selected = "selected"</if> value="<{$vo.id}>"><{$vo.name}></option>
					</foreach>
				</select>
				<select name="" id="city">
					<foreach name="list.city" item="vo">
						<option <if condition="$list['data']['cityId'] eq $vo['id']">selected = "selected"</if> value="<{$vo.id}>"><{$vo.name}></option>
					</foreach>
				</select>
				<select name="" id="borough">
					<foreach name="list.borough" item="vo">
						<option <if condition="$list['data']['boroughId'] eq $vo['id']">selected = "selected"</if> value="<{$vo.id}>"><{$vo.name}></option>
					</foreach>
				</select>
               <select name="" id="area">
					<?php if($list['area']){ ?>
				   <foreach name="list.area" item="vo">
					   <option <if condition="$list['data']['areaId'] eq $vo['id']">selected = "selected"</if> value="<{$vo.id}>"><{$vo.name}></option>
				   </foreach>
				   <?php }else{ ?>
						<option value=''>暂无数据</option>
				   <?php } ?>
			   </select>
			</p>
			<input type="hidden" id="userName" name="userName" value="<{$list.data.userName}>">
			<input type="hidden" id="isDefault" name="isDefault" value="<{$list.data.isDefault}>">
			<input type="hidden" id="addressId" name="addressId" value="<{$list.data.id}>">
			<p>
				<textarea name="" id="address" style="width:100%;"><{$list.data.address}></textarea>
			</p>
		</div>    
        <div class="btnbox compile_address_btn">
            <button id="editAddress" class="r_btn_a">保存</button>            
        </div>
	</div>
<include file="Public:footer" /> 
