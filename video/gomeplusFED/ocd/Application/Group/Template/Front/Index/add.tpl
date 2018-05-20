<?php
    $jspath = 'Address/addAddress.js';
?>
<include file="Public:header" />
	<div class="page">
		<header class="header">
			<h1>新增地址
				<a class="w_goback" href="/address/index"></a>
			</h1>
		</header>
		<div class="compile_address_con">
			<h1>提示：将按此地址给您邮寄，请您确保信息准确啊！</h1>
			<p><input type="text" id="username" maxlength="20"   placeholder="请输入收件人姓名"></p>
			<p><input type="text" id="mobile" maxlength="11" placeholder="请输入收件人手机号"></p>
			<p class="w_addresses">
				<select name="" provinceId="0" id="province">
					<foreach name="list.provice" item="vo">
					<option value="<{$vo.id}>"><{$vo.name}></option>
					</foreach>
				</select>
				<select name="" cityId="0" id="city">
					<foreach name="list.city" item="vo">
						<option value="<{$vo.id}>"><{$vo.name}></option>
					</foreach>
				</select>
				<select name="" boroughId="0" id="borough">
					<foreach name="list.borough" item="vo">
						<option value="<{$vo.id}>"><{$vo.name}></option>
					</foreach>
				</select>
                <select name="" areaId="0" id="area">
					<foreach name="list.area" item="vo">
						<option value="<{$vo.id}>"><{$vo.name}></option>
					</foreach>
				</select>
			</p>
			<p><input type="text" id="address" maxlength="50" placeholder="详细地址"></p>
		</div>    
        <div class="btnbox compile_address_btn">
            <button class="saveAddress r_btn_a">保存</button>            
        </div>
	</div>
<include file="Public:footer" />
