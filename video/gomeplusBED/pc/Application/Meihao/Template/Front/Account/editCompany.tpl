<?php
	$csspath = "createCompany.css";
	$jspath = "/js/conf/createCompany.js";
?>
  <include file="Account:header"/>
    <div class="perfect-company company">
      <div class="company-tempo clearfix">
        <p>选择账号类型</p>
        <p class="tempo-approve">完善企业认证信息</p>
        <p class="tempo-perfect">完善账号信息</p>
        <p class="tempo-success">开通成功</p>
      </div>
      <div class="company-info" data-node="companyInfo">
        <div class="info clearfix">
          <div class="info-left"><span class="red">*</span>企业名称</div>
          <div class="info-right">
            <input class="right-name" type="text" data-node="companyName" value="<{$info['enterpriseName']}>">
            <div class="right-term" data-node="tipsCompanyName">需与当地政府颁发的商业许可证书或企业注册证上的企业名称完全一致，信息审核审核成功后，企业名称不可修改</div>
          </div>
        </div>
        <div class="info clearfix">
          <div class="info-left"><span class="red">*</span>营业执照注册号</div>
          <div class="info-right">
            <input class="right-name" type="text" data-node="licenseNum" value="<{$info['businessLicenseNumber']}>">
            <div class="right-term" data-node="tipsLicense">请输入15位营业执照注册号或18位的统一社会信用代码</div>
          </div>
        </div>
        <div class="info clearfix">
          <div class="info-left info-head"><span class="red">*</span>营业执照</div>
          <div class="info-right">
            <div data-node="uploadBox" class="licensePic">
                <div class="upload-pic" data-node="upload">
                  <img src="<{$info['businessLicenseImageUrl']}>" alt="" type="1"></div>
                <div data-defaultaddFile="picker"><div class="img-again"><a href="javascript:;">重新上传</a></div></div>
            </div>
            <div class="right-term" data-node="tipsPic">大小不超过4M，支持.PNG .JPG  .JPEG格式</div>
          </div>
        </div>
        <div class="info clearfix">
          <div class="info-left"><span class="red">*</span>运营者姓名</div>
          <div class="info-right">
            <input class="right-name" type="text" data-node="userName" value="<{$info['operatorName']}>">
            <div class="right-term" data-node="tipsUserName">请填写该美号帐号运营者的姓名，如果名字包含分隔号“·”，请勿省略</div>
          </div>
        </div>
        <div class="info clearfix">
          <div class="info-left"><span class="red">*</span>运营者身份证号</div>
          <div class="info-right" data-node="tipsUserId">
            <input class="right-name" type="text" data-node="userId" value="<{$info['operatorIDNumber']}>" >
            <div class="right-term" data-node="tipsUserId">请输入该美号运营者的身份证号码</div>
          </div>
        </div>
        <div class="info clearfix">
          <div class="info-left"><span class="red">*</span>运营者手机号</div>
          <div class="info-right">
            <input class="right-name" type="text" data-node="phone" value="<{$info['operatorPhone']}>" >
            <div class="right-term" data-node="tipsPhone">请输入该美号运营者的手机号</div>
          </div>
        </div>
        <div class="info clearfix">
          <div class="info-left">QQ/微信/邮箱</div>
          <div class="info-right">
            <input class="right-name" type="text" data-node="email" value="<{$info['operatorContactInfo']}>" >
            <div class="right-term">请输入该美号运营者的QQ/微信/邮箱</div>
          </div>
        </div>
      </div>
      <div class="choose-btn clearfix">
        <div><a href="javascript:;" data-node="save">继续</a></div>
        <if condition="$info.status neq -1"><div class="back"><a href="/account/type">返回</a></div></if>
      </div>
    </div>
    <include file="Home@Public:mh_footer"/>

